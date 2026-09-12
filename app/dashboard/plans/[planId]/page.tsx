import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PARQ_QUESTIONS } from "@/lib/trainer/parq";
import type {
  Plan,
  IntakeSubmission,
  IntakeLink,
  Client,
} from "@/lib/trainer/types";
import PlanEditor from "./PlanEditor";

export const dynamic = "force-dynamic";

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-slate-800 whitespace-pre-wrap">
        {value || <span className="text-slate-400">—</span>}
      </dd>
    </div>
  );
}

function IntakeSummary({ s }: { s: IntakeSubmission }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Your Goals</h3>
        <dl className="space-y-3">
          <Field label="Primary goal" value={s.purpose_goal_tag} />
          {s.purpose_goal_text !== s.purpose_goal_tag && (
            <Field label="Goal detail" value={s.purpose_goal_text} />
          )}
          <Field label="Success in 90 days" value={s.purpose_success_90d} />
          <Field label="Timeline / event" value={s.purpose_timeline} />
        </dl>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Preferences
        </h3>
        <dl className="space-y-3">
          <Field label="Location" value={s.pref_location} />
          <Field label="Days per week" value={String(s.pref_days_per_week)} />
          <Field label="Session length" value={s.pref_session_length} />
          <Field label="Training style" value={s.pref_training_style} />
          <Field label="Communication" value={s.pref_communication} />
        </dl>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Starting Point
        </h3>
        <dl className="space-y-3">
          <Field label="Activity level" value={s.status_activity_level} />
          <Field label="Training history" value={s.status_training_history} />
          <Field label="Injuries / limitations" value={s.status_injuries} />
          <Field label="Height" value={s.status_height} />
          <Field label="Weight" value={s.status_weight} />
          <Field
            label="Age"
            value={s.status_age !== null ? String(s.status_age) : null}
          />
          <Field label="Sex" value={s.status_sex} />
        </dl>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">
          Health Screening (PAR-Q)
        </h3>
        <ul className="space-y-2">
          {PARQ_QUESTIONS.map((q) => {
            const yes = s.parq_answers?.[q.key] === true;
            return (
              <li key={q.key} className="flex items-start gap-2 text-sm">
                <span
                  className={`mt-0.5 inline-flex h-5 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    yes
                      ? "bg-red-100 text-red-700"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {yes ? "Yes" : "No"}
                </span>
                <span className="text-slate-700">{q.text}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-3">Nutrition</h3>
        <dl className="space-y-3">
          <Field label="Dietary pattern" value={s.nutrition_pattern} />
          <Field label="Allergies / intolerances" value={s.nutrition_allergies} />
          <Field label="Dislikes" value={s.nutrition_dislikes} />
          <Field
            label="Meals per day"
            value={String(s.nutrition_meals_per_day)}
          />
          <Field label="Cooking time" value={s.nutrition_cooking_time} />
          <Field label="Supplements" value={s.nutrition_supplements} />
        </dl>
      </div>
    </div>
  );
}

export default async function PlanPage({
  params,
}: {
  params: { planId: string };
}) {
  const supabase = createClient();

  const { data: planRow } = await supabase
    .from("plans")
    .select("*")
    .eq("id", params.planId)
    .maybeSingle();

  if (!planRow) notFound();
  const plan = planRow as Plan;

  const { data: subRow } = await supabase
    .from("intake_submissions")
    .select("*")
    .eq("id", plan.intake_submission_id)
    .maybeSingle();
  const submission = subRow as IntakeSubmission | null;

  let client: Client | null = null;
  if (submission) {
    const { data: linkRow } = await supabase
      .from("intake_links")
      .select("*")
      .eq("id", submission.intake_link_id)
      .maybeSingle();
    const link = linkRow as IntakeLink | null;
    if (link) {
      const { data: clientRow } = await supabase
        .from("clients")
        .select("*")
        .eq("id", link.client_id)
        .maybeSingle();
      client = clientRow as Client | null;
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="text-sm text-slate-500 hover:text-slate-800"
        >
          ← Back to clients
        </Link>
        <div className="mt-2 flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900 font-sans">
            {client?.name ?? "Plan"}
          </h1>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
              plan.status === "sent"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-violet-100 text-violet-700"
            }`}
          >
            {plan.status === "sent" ? "Sent" : "Draft"}
          </span>
        </div>
        {client && (
          <p className="mt-1 text-sm text-slate-500">{client.email}</p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Intake context (read-only) */}
        <aside className="rounded-xl border border-slate-200 bg-white p-5 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          <h2 className="text-base font-semibold text-slate-900 mb-4 font-sans">
            Intake details
          </h2>
          {submission ? (
            <IntakeSummary s={submission} />
          ) : (
            <p className="text-sm text-slate-400">Intake data unavailable.</p>
          )}
        </aside>

        {/* Editable plan */}
        <PlanEditor
          planId={plan.id}
          initialNutrition={plan.nutrition_plan_text}
          initialWorkout={plan.workout_plan_text}
          needsClearance={plan.needs_clearance}
          initialClearanceAcknowledged={plan.clearance_acknowledged}
          status={plan.status}
          sentAt={plan.sent_at}
          clientEmail={client?.email ?? null}
        />
      </div>
    </div>
  );
}
