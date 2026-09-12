// The 7 standard PAR-Q (Physical Activity Readiness Questionnaire) questions.
// A "Yes" to any question flags the client for recommended physician clearance.
// Keys are stable identifiers stored in intake_submissions.parq_answers (jsonb).

export type ParqKey =
  | "heart_condition"
  | "chest_pain_activity"
  | "chest_pain_rest"
  | "dizziness_balance"
  | "bone_joint_problem"
  | "bp_heart_meds"
  | "other_reason";

export interface ParqQuestion {
  key: ParqKey;
  text: string;
}

export const PARQ_QUESTIONS: ParqQuestion[] = [
  {
    key: "heart_condition",
    text: "Has your doctor ever said that you have a heart condition and that you should only do physical activity recommended by a doctor?",
  },
  {
    key: "chest_pain_activity",
    text: "Do you feel pain in your chest when you do physical activity?",
  },
  {
    key: "chest_pain_rest",
    text: "In the past month, have you had chest pain when you were not doing physical activity?",
  },
  {
    key: "dizziness_balance",
    text: "Do you lose your balance because of dizziness, or do you ever lose consciousness?",
  },
  {
    key: "bone_joint_problem",
    text: "Do you have a bone or joint problem that could be made worse by a change in your physical activity?",
  },
  {
    key: "bp_heart_meds",
    text: "Is your doctor currently prescribing drugs (for example, water pills) for your blood pressure or heart condition?",
  },
  {
    key: "other_reason",
    text: "Do you know of any other reason why you should not do physical activity?",
  },
];

export const PARQ_KEYS: ParqKey[] = PARQ_QUESTIONS.map((q) => q.key);

/** True if any PAR-Q answer is "yes" (true). */
export function isParqFlagged(answers: Record<string, boolean>): boolean {
  return PARQ_KEYS.some((k) => answers[k] === true);
}
