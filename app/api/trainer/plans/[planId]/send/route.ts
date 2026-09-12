import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generatePlanPdf } from "@/lib/trainer/pdf";
import { sendPlanEmail } from "@/lib/trainer/email";
import type { Plan, IntakeSubmission, IntakeLink, Client } from "@/lib/trainer/types";

export const runtime = "nodejs";
export const maxDuration = 60;

// Approve & Send: persist the latest edits, generate a PDF, email the client
// the HTML plan + PDF attachment, and mark the plan sent.
export async function POST(
  request: Request,
  { params }: { params: { planId: string } },
) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    nutrition_plan_text?: unknown;
    workout_plan_text?: unknown;
    clearance_acknowledged?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { data: planRow } = await supabase
    .from("plans")
    .select("*")
    .eq("id", params.planId)
    .maybeSingle();
  const plan = planRow as Plan | null;

  if (!plan) {
    return NextResponse.json({ error: "Plan not found." }, { status: 404 });
  }
  if (plan.status === "sent") {
    return NextResponse.json(
      { error: "This plan has already been sent." },
      { status: 409 },
    );
  }

  // Resolve the latest edited text (fall back to what's stored).
  const nutrition =
    typeof body.nutrition_plan_text === "string"
      ? body.nutrition_plan_text
      : plan.nutrition_plan_text;
  const workout =
    typeof body.workout_plan_text === "string"
      ? body.workout_plan_text
      : plan.workout_plan_text;
  const acknowledged =
    typeof body.clearance_acknowledged === "boolean"
      ? body.clearance_acknowledged
      : plan.clearance_acknowledged;

  // Enforce the clearance gate server-side using the DB's needs_clearance.
  if (plan.needs_clearance && !acknowledged) {
    return NextResponse.json(
      {
        error:
          "Physician clearance must be acknowledged before this plan can be sent.",
      },
      { status: 400 },
    );
  }

  // Resolve client (name + email) via submission → link → client.
  const { data: subRow } = await supabase
    .from("intake_submissions")
    .select("*")
    .eq("id", plan.intake_submission_id)
    .maybeSingle();
  const submission = subRow as IntakeSubmission | null;
  if (!submission) {
    return NextResponse.json(
      { error: "Intake data not found." },
      { status: 404 },
    );
  }

  const { data: linkRow } = await supabase
    .from("intake_links")
    .select("*")
    .eq("id", submission.intake_link_id)
    .maybeSingle();
  const link = linkRow as IntakeLink | null;

  const { data: clientRow } = link
    ? await supabase
        .from("clients")
        .select("*")
        .eq("id", link.client_id)
        .maybeSingle()
    : { data: null };
  const client = clientRow as Client | null;

  if (!client?.email) {
    return NextResponse.json(
      { error: "No client email on file to send to." },
      { status: 400 },
    );
  }

  // Persist edits + acknowledgment and mark approved before sending.
  const { error: approveErr } = await supabase
    .from("plans")
    .update({
      nutrition_plan_text: nutrition,
      workout_plan_text: workout,
      clearance_acknowledged: acknowledged,
      status: "approved",
    })
    .eq("id", plan.id);
  if (approveErr) {
    return NextResponse.json(
      { error: "Could not save plan before sending." },
      { status: 500 },
    );
  }

  // Generate PDF and email it. If this fails, the plan stays 'approved' (not
  // 'sent') so the trainer can retry.
  try {
    const pdf = await generatePlanPdf({
      clientName: client.name,
      nutritionPlanText: nutrition,
      workoutPlanText: workout,
      needsClearance: plan.needs_clearance,
      generatedAt: plan.generated_at,
    });

    await sendPlanEmail({
      to: client.email,
      clientName: client.name,
      nutritionPlanText: nutrition,
      workoutPlanText: workout,
      pdf,
    });
  } catch (err) {
    console.error("Plan send failed:", err);
    return NextResponse.json(
      { error: "Could not email the plan. Please try again." },
      { status: 502 },
    );
  }

  const { error: sentErr } = await supabase
    .from("plans")
    .update({ status: "sent", sent_at: new Date().toISOString() })
    .eq("id", plan.id);
  if (sentErr) {
    // Email went out but the status update failed — surface it so the trainer
    // knows not to resend.
    return NextResponse.json(
      {
        error:
          "The plan was emailed, but its status could not be updated. Do not resend.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
