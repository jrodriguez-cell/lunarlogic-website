import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { Plan } from "@/lib/trainer/types";

export const runtime = "nodejs";

// Save plan edits (nutrition/workout text) and the clearance acknowledgment.
// needs_clearance is never mutated here — it can only be satisfied via the
// explicit clearance_acknowledged flag, per the product spec.
export async function PATCH(
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
    .select("id, status")
    .eq("id", params.planId)
    .maybeSingle();
  const plan = planRow as Pick<Plan, "id" | "status"> | null;

  if (!plan) {
    return NextResponse.json({ error: "Plan not found." }, { status: 404 });
  }
  if (plan.status === "sent") {
    return NextResponse.json(
      { error: "This plan has already been sent and is read-only." },
      { status: 409 },
    );
  }

  const update: Record<string, unknown> = {};
  if (typeof body.nutrition_plan_text === "string")
    update.nutrition_plan_text = body.nutrition_plan_text;
  if (typeof body.workout_plan_text === "string")
    update.workout_plan_text = body.workout_plan_text;
  if (typeof body.clearance_acknowledged === "boolean")
    update.clearance_acknowledged = body.clearance_acknowledged;

  if (Object.keys(update).length === 0) {
    return NextResponse.json({ error: "Nothing to update." }, { status: 400 });
  }

  const { error } = await supabase
    .from("plans")
    .update(update)
    .eq("id", params.planId);

  if (error) {
    return NextResponse.json(
      { error: "Could not save plan." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
