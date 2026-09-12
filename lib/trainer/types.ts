// Database row types mirroring supabase/migrations/0001_init.sql.

export type IntakeLinkStatus = "pending" | "submitted" | "expired";
export type PlanStatus = "draft" | "approved" | "sent";

export interface Client {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export interface IntakeLink {
  id: string;
  client_id: string;
  token: string;
  status: IntakeLinkStatus;
  created_at: string;
}

export interface IntakeSubmission {
  id: string;
  intake_link_id: string;

  purpose_goal_tag: string;
  purpose_goal_text: string;
  purpose_success_90d: string;
  purpose_timeline: string | null;

  pref_location: string;
  pref_days_per_week: number;
  pref_session_length: string;
  pref_training_style: string;
  pref_communication: string;

  status_activity_level: string;
  status_training_history: string;
  status_injuries: string | null;
  status_height: string | null;
  status_weight: string | null;
  status_age: number | null;
  status_sex: string | null;

  parq_answers: Record<string, boolean>;
  parq_flagged: boolean;

  nutrition_pattern: string;
  nutrition_allergies: string | null;
  nutrition_dislikes: string | null;
  nutrition_meals_per_day: number;
  nutrition_cooking_time: string;
  nutrition_supplements: string | null;

  submitted_at: string;
}

export interface Plan {
  id: string;
  intake_submission_id: string;
  nutrition_plan_text: string;
  workout_plan_text: string;
  needs_clearance: boolean;
  clearance_acknowledged: boolean;
  status: PlanStatus;
  generated_at: string;
  sent_at: string | null;
}

/** Per-client status shown on the dashboard. */
export type ClientStage =
  | "no_link"
  | "link_sent"
  | "intake_submitted"
  | "plan_draft"
  | "plan_sent";

export const CLIENT_STAGE_LABEL: Record<ClientStage, string> = {
  no_link: "No link sent",
  link_sent: "Link sent — awaiting intake",
  intake_submitted: "Intake submitted",
  plan_draft: "Plan draft ready",
  plan_sent: "Plan sent",
};
