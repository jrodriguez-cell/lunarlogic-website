import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { generatePlan } from "@/lib/trainer/anthropic";
import { PARQ_KEYS } from "@/lib/trainer/parq";
import type { IntakeSubmission } from "@/lib/trainer/types";

export const runtime = "nodejs";
export const maxDuration = 60; // allow time for the Anthropic call

function str(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

function int(v: unknown): number | null {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? Math.trunc(n) : null;
}

export async function POST(
  request: Request,
  { params }: { params: { token: string } },
) {
  const supabase = createAdminClient();

  // 1. Validate the token: must exist and be pending.
  const { data: link } = await supabase
    .from("intake_links")
    .select("id, status")
    .eq("token", params.token)
    .maybeSingle();

  if (!link) {
    return NextResponse.json({ error: "Invalid link." }, { status: 404 });
  }
  if (link.status !== "pending") {
    return NextResponse.json(
      { error: "This link has already been used." },
      { status: 409 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // 2. Validate + normalize required fields.
  const purpose_goal_tag = str(body.purpose_goal_tag);
  const purpose_goal_text = str(body.purpose_goal_text);
  const purpose_success_90d = str(body.purpose_success_90d);
  const pref_location = str(body.pref_location);
  const pref_days_per_week = int(body.pref_days_per_week);
  const pref_session_length = str(body.pref_session_length);
  const pref_training_style = str(body.pref_training_style);
  const pref_communication = str(body.pref_communication);
  const status_activity_level = str(body.status_activity_level);
  const status_training_history = str(body.status_training_history);
  const nutrition_pattern = str(body.nutrition_pattern);
  const nutrition_meals_per_day = int(body.nutrition_meals_per_day);
  const nutrition_cooking_time = str(body.nutrition_cooking_time);

  if (
    !purpose_goal_tag ||
    !purpose_goal_text ||
    !purpose_success_90d ||
    !pref_location ||
    !pref_session_length ||
    !pref_training_style ||
    !pref_communication ||
    !status_activity_level ||
    !status_training_history ||
    !nutrition_pattern ||
    !nutrition_cooking_time ||
    pref_days_per_week === null ||
    pref_days_per_week < 1 ||
    pref_days_per_week > 7 ||
    nutrition_meals_per_day === null ||
    nutrition_meals_per_day < 1
  ) {
    return NextResponse.json(
      { error: "Please complete all required fields." },
      { status: 400 },
    );
  }

  // Normalize PAR-Q answers to a strict boolean map keyed by known keys only.
  const rawParq = (body.parq_answers ?? {}) as Record<string, unknown>;
  const parq_answers: Record<string, boolean> = {};
  for (const key of PARQ_KEYS) parq_answers[key] = rawParq[key] === true;

  // 3. Insert the submission. parq_flagged is set by the DB trigger.
  const { data: submission, error: subErr } = await supabase
    .from("intake_submissions")
    .insert({
      intake_link_id: link.id,
      purpose_goal_tag,
      purpose_goal_text,
      purpose_success_90d,
      purpose_timeline: str(body.purpose_timeline),
      pref_location,
      pref_days_per_week,
      pref_session_length,
      pref_training_style,
      pref_communication,
      status_activity_level,
      status_training_history,
      status_injuries: str(body.status_injuries),
      status_height: str(body.status_height),
      status_weight: str(body.status_weight),
      status_age: int(body.status_age),
      status_sex: str(body.status_sex),
      parq_answers,
      nutrition_pattern,
      nutrition_allergies: str(body.nutrition_allergies),
      nutrition_dislikes: str(body.nutrition_dislikes),
      nutrition_meals_per_day,
      nutrition_cooking_time,
      nutrition_supplements: str(body.nutrition_supplements),
    })
    .select("*")
    .single();

  if (subErr || !submission) {
    console.error("Submission insert failed:", subErr);
    return NextResponse.json(
      { error: "Could not save your intake. Please try again." },
      { status: 500 },
    );
  }

  // 4. Mark the link submitted (also closes the door on double submits).
  await supabase
    .from("intake_links")
    .update({ status: "submitted" })
    .eq("id", link.id);

  // 5. Generate the AI draft plan. If generation fails, still create an empty
  //    draft so the trainer sees the client in "draft" state and can write the
  //    plan manually rather than losing the intake.
  const typedSubmission = submission as IntakeSubmission;
  let nutrition = "";
  let workout = "";
  try {
    const generated = await generatePlan(typedSubmission);
    nutrition = generated.nutritionPlanText;
    workout = generated.workoutPlanText;
  } catch (err) {
    console.error("Plan generation failed:", err);
  }

  const { error: planErr } = await supabase.from("plans").insert({
    intake_submission_id: typedSubmission.id,
    nutrition_plan_text: nutrition,
    workout_plan_text: workout,
    needs_clearance: typedSubmission.parq_flagged,
    status: "draft",
  });

  if (planErr) {
    console.error("Plan insert failed:", planErr);
    // The intake is saved; the trainer can still create a plan. Report success
    // to the client since their part is complete.
  }

  return NextResponse.json({ ok: true });
}
