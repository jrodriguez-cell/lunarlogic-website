"use client";

import { useState } from "react";
import {
  GOAL_OPTIONS,
  LOCATION_OPTIONS,
  SESSION_LENGTH_OPTIONS,
  TRAINING_STYLE_OPTIONS,
  COMMUNICATION_OPTIONS,
  ACTIVITY_LEVEL_OPTIONS,
  TRAINING_HISTORY_OPTIONS,
  SEX_OPTIONS,
  NUTRITION_PATTERN_OPTIONS,
  COOKING_TIME_OPTIONS,
} from "@/lib/trainer/options";
import { PARQ_QUESTIONS, type ParqKey } from "@/lib/trainer/parq";

// ── Small field primitives ──────────────────────────────────────────────────
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-slate-900 font-sans">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function Label({
  children,
  optional,
}: {
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {children}
      {optional && <span className="text-slate-400 font-normal"> (optional)</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none";

function Select({
  value,
  onChange,
  options,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
  required?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
      className={inputClass}
    >
      <option value="" disabled>
        Select…
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

// ── The form ────────────────────────────────────────────────────────────────
type Fields = {
  purpose_goal_tag: string;
  purpose_goal_text: string;
  purpose_success_90d: string;
  purpose_timeline: string;
  pref_location: string;
  pref_days_per_week: string;
  pref_session_length: string;
  pref_training_style: string;
  pref_communication: string;
  status_activity_level: string;
  status_training_history: string;
  status_injuries: string;
  status_height: string;
  status_weight: string;
  status_age: string;
  status_sex: string;
  nutrition_pattern: string;
  nutrition_allergies: string;
  nutrition_dislikes: string;
  nutrition_meals_per_day: string;
  nutrition_cooking_time: string;
  nutrition_supplements: string;
};

const EMPTY: Fields = {
  purpose_goal_tag: "",
  purpose_goal_text: "",
  purpose_success_90d: "",
  purpose_timeline: "",
  pref_location: "",
  pref_days_per_week: "",
  pref_session_length: "",
  pref_training_style: "",
  pref_communication: "",
  status_activity_level: "",
  status_training_history: "",
  status_injuries: "",
  status_height: "",
  status_weight: "",
  status_age: "",
  status_sex: "",
  nutrition_pattern: "",
  nutrition_allergies: "",
  nutrition_dislikes: "",
  nutrition_meals_per_day: "",
  nutrition_cooking_time: "",
  nutrition_supplements: "",
};

export default function IntakeForm({ token }: { token: string }) {
  const [f, setF] = useState<Fields>(EMPTY);
  const [parq, setParq] = useState<Partial<Record<ParqKey, boolean>>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: keyof Fields) => (v: string) =>
    setF((prev) => ({ ...prev, [k]: v }));

  function validate(): string | null {
    if (!f.purpose_goal_tag) return "Please select your primary goal.";
    if (f.purpose_goal_tag === "Other" && !f.purpose_goal_text.trim())
      return "Please describe your goal.";
    if (!f.purpose_success_90d.trim())
      return "Please describe what success looks like in 90 days.";
    if (!f.pref_location) return "Please select where you'll train.";
    const days = Number(f.pref_days_per_week);
    if (!days || days < 1 || days > 7)
      return "Days per week must be between 1 and 7.";
    if (!f.pref_session_length) return "Please select a session length.";
    if (!f.pref_training_style) return "Please select a training style.";
    if (!f.pref_communication)
      return "Please select how you'd like to hear from your trainer.";
    if (!f.status_activity_level) return "Please select your activity level.";
    if (!f.status_training_history)
      return "Please select your training history.";
    for (const q of PARQ_QUESTIONS) {
      if (parq[q.key] === undefined)
        return "Please answer all health screening questions.";
    }
    if (!f.nutrition_pattern) return "Please select your dietary pattern.";
    const meals = Number(f.nutrition_meals_per_day);
    if (!meals || meals < 1) return "Please enter your meals per day.";
    if (!f.nutrition_cooking_time)
      return "Please select your cooking time/ability.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);

    const parqAnswers: Record<string, boolean> = {};
    for (const q of PARQ_QUESTIONS) parqAnswers[q.key] = parq[q.key] === true;

    const payload = {
      purpose_goal_tag: f.purpose_goal_tag,
      purpose_goal_text:
        f.purpose_goal_tag === "Other"
          ? f.purpose_goal_text.trim()
          : f.purpose_goal_tag,
      purpose_success_90d: f.purpose_success_90d.trim(),
      purpose_timeline: f.purpose_timeline.trim() || null,
      pref_location: f.pref_location,
      pref_days_per_week: Number(f.pref_days_per_week),
      pref_session_length: f.pref_session_length,
      pref_training_style: f.pref_training_style,
      pref_communication: f.pref_communication,
      status_activity_level: f.status_activity_level,
      status_training_history: f.status_training_history,
      status_injuries: f.status_injuries.trim() || null,
      status_height: f.status_height.trim() || null,
      status_weight: f.status_weight.trim() || null,
      status_age: f.status_age ? Number(f.status_age) : null,
      status_sex: f.status_sex || null,
      parq_answers: parqAnswers,
      nutrition_pattern: f.nutrition_pattern,
      nutrition_allergies: f.nutrition_allergies.trim() || null,
      nutrition_dislikes: f.nutrition_dislikes.trim() || null,
      nutrition_meals_per_day: Number(f.nutrition_meals_per_day),
      nutrition_cooking_time: f.nutrition_cooking_time,
      nutrition_supplements: f.nutrition_supplements.trim() || null,
    };

    try {
      const res = await fetch(`/api/trainer/intake/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submission failed.");
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-slate-900 font-sans">Thanks!</h1>
          <p className="mt-3 text-slate-500">
            Your intake is in. Your trainer will be in touch with your
            personalized plan shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 font-sans">
          Client intake
        </h1>
        <p className="mt-2 text-slate-500">
          Tell us about your goals and background so we can build a plan that
          fits you. Takes about 5–10 minutes.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Your Goals */}
        <Section title="Your Goals">
          <div>
            <Label>Primary goal</Label>
            <Select
              value={f.purpose_goal_tag}
              onChange={set("purpose_goal_tag")}
              options={GOAL_OPTIONS}
              required
            />
          </div>
          {f.purpose_goal_tag === "Other" && (
            <div>
              <Label>Please describe your goal</Label>
              <input
                className={inputClass}
                value={f.purpose_goal_text}
                onChange={(e) => set("purpose_goal_text")(e.target.value)}
              />
            </div>
          )}
          <div>
            <Label>What does success look like in 90 days?</Label>
            <textarea
              rows={3}
              className={inputClass}
              value={f.purpose_success_90d}
              onChange={(e) => set("purpose_success_90d")(e.target.value)}
            />
          </div>
          <div>
            <Label optional>Target timeline or event driving this</Label>
            <input
              className={inputClass}
              value={f.purpose_timeline}
              onChange={(e) => set("purpose_timeline")(e.target.value)}
            />
          </div>
        </Section>

        {/* Your Preferences */}
        <Section title="Your Preferences">
          <div>
            <Label>Where will you train?</Label>
            <Select
              value={f.pref_location}
              onChange={set("pref_location")}
              options={LOCATION_OPTIONS}
              required
            />
          </div>
          <div>
            <Label>Days per week available</Label>
            <input
              type="number"
              min={1}
              max={7}
              className={inputClass}
              value={f.pref_days_per_week}
              onChange={(e) => set("pref_days_per_week")(e.target.value)}
            />
          </div>
          <div>
            <Label>Typical session length</Label>
            <Select
              value={f.pref_session_length}
              onChange={set("pref_session_length")}
              options={SESSION_LENGTH_OPTIONS}
              required
            />
          </div>
          <div>
            <Label>Preferred training style</Label>
            <Select
              value={f.pref_training_style}
              onChange={set("pref_training_style")}
              options={TRAINING_STYLE_OPTIONS}
              required
            />
          </div>
          <div>
            <Label>Preferred way to hear from your trainer</Label>
            <Select
              value={f.pref_communication}
              onChange={set("pref_communication")}
              options={COMMUNICATION_OPTIONS}
              required
            />
          </div>
        </Section>

        {/* Where You're Starting From */}
        <Section title="Where You're Starting From">
          <div>
            <Label>Current activity level</Label>
            <Select
              value={f.status_activity_level}
              onChange={set("status_activity_level")}
              options={ACTIVITY_LEVEL_OPTIONS}
              required
            />
          </div>
          <div>
            <Label>Training history</Label>
            <Select
              value={f.status_training_history}
              onChange={set("status_training_history")}
              options={TRAINING_HISTORY_OPTIONS}
              required
            />
          </div>
          <div>
            <Label optional>Any current injuries or movement limitations?</Label>
            <textarea
              rows={2}
              className={inputClass}
              value={f.status_injuries}
              onChange={(e) => set("status_injuries")(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label optional>Height</Label>
              <input
                className={inputClass}
                value={f.status_height}
                onChange={(e) => set("status_height")(e.target.value)}
              />
            </div>
            <div>
              <Label optional>Weight</Label>
              <input
                className={inputClass}
                value={f.status_weight}
                onChange={(e) => set("status_weight")(e.target.value)}
              />
            </div>
            <div>
              <Label optional>Age</Label>
              <input
                type="number"
                min={0}
                className={inputClass}
                value={f.status_age}
                onChange={(e) => set("status_age")(e.target.value)}
              />
            </div>
            <div>
              <Label optional>Sex</Label>
              <Select
                value={f.status_sex}
                onChange={set("status_sex")}
                options={SEX_OPTIONS}
              />
            </div>
          </div>
        </Section>

        {/* Health Screening */}
        <Section
          title="Health Screening"
          description="These are standard pre-exercise screening questions used by certified trainers."
        >
          <div className="space-y-4">
            {PARQ_QUESTIONS.map((q, i) => (
              <div
                key={q.key}
                className="rounded-lg border border-slate-200 p-4"
              >
                <p className="text-sm text-slate-800">
                  <span className="font-medium text-slate-400 mr-1">
                    {i + 1}.
                  </span>
                  {q.text}
                </p>
                <div className="mt-3 flex gap-6">
                  {[
                    { label: "Yes", val: true },
                    { label: "No", val: false },
                  ].map((opt) => (
                    <label
                      key={opt.label}
                      className="inline-flex items-center gap-2 text-sm text-slate-700 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={q.key}
                        required
                        checked={parq[q.key] === opt.val}
                        onChange={() =>
                          setParq((prev) => ({ ...prev, [q.key]: opt.val }))
                        }
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Nutrition */}
        <Section title="Nutrition">
          <div>
            <Label>Dietary pattern</Label>
            <Select
              value={f.nutrition_pattern}
              onChange={set("nutrition_pattern")}
              options={NUTRITION_PATTERN_OPTIONS}
              required
            />
          </div>
          <div>
            <Label optional>Allergies or intolerances</Label>
            <textarea
              rows={2}
              className={inputClass}
              value={f.nutrition_allergies}
              onChange={(e) => set("nutrition_allergies")(e.target.value)}
            />
          </div>
          <div>
            <Label optional>Foods you dislike or won&apos;t eat</Label>
            <textarea
              rows={2}
              className={inputClass}
              value={f.nutrition_dislikes}
              onChange={(e) => set("nutrition_dislikes")(e.target.value)}
            />
          </div>
          <div>
            <Label>Meals per day currently</Label>
            <input
              type="number"
              min={1}
              max={12}
              className={inputClass}
              value={f.nutrition_meals_per_day}
              onChange={(e) => set("nutrition_meals_per_day")(e.target.value)}
            />
          </div>
          <div>
            <Label>Cooking time/ability</Label>
            <Select
              value={f.nutrition_cooking_time}
              onChange={set("nutrition_cooking_time")}
              options={COOKING_TIME_OPTIONS}
              required
            />
          </div>
          <div>
            <Label optional>Current supplements, if any</Label>
            <textarea
              rows={2}
              className={inputClass}
              value={f.nutrition_supplements}
              onChange={(e) => set("nutrition_supplements")(e.target.value)}
            />
          </div>
        </Section>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-md bg-indigo-600 text-white text-sm font-semibold py-3 hover:bg-indigo-700 disabled:opacity-60 transition"
          >
            {submitting ? "Submitting — building your plan…" : "Submit intake"}
          </button>
          {submitting && (
            <p className="mt-3 text-center text-xs text-slate-400">
              This can take up to a minute. Please don&apos;t close this page.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
