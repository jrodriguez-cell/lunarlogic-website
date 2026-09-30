import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { DEFAULT_DISCLAIMER, TASK_THRESHOLDS, type TaskThresholds } from "@/config/tasks";
import { GUARDRAIL_DEFAULTS, type GuardrailLimits } from "@/config/guardrails";
import { DEFAULT_DEFICIT, UNCERTAINTY } from "@/config/energy";
import type { GoalCategory } from "@/config/goal-templates";

export interface AppSettings {
  disclaimer: string;
  task_thresholds: TaskThresholds;
  guardrail_limits: GuardrailLimits;
  default_deficits: Record<GoalCategory, number>;
  uncertainty: { formula: number; measured: number; calibrated: number };
}

export const SETTINGS_DEFAULTS: AppSettings = {
  disclaimer: DEFAULT_DISCLAIMER,
  task_thresholds: TASK_THRESHOLDS,
  guardrail_limits: GUARDRAIL_DEFAULTS,
  default_deficits: { ...DEFAULT_DEFICIT },
  uncertainty: { ...UNCERTAINTY },
};

export async function getSettings(db: SupabaseClient): Promise<AppSettings> {
  const { data } = await db.from("settings").select("key, value");
  const map = new Map((data ?? []).map((r: { key: string; value: unknown }) => [r.key, r.value]));
  const obj = <T extends object>(k: keyof AppSettings, d: T): T => ({ ...d, ...((map.get(k) as Partial<T>) ?? {}) });
  return {
    disclaimer: (map.get("disclaimer") as string) || SETTINGS_DEFAULTS.disclaimer,
    task_thresholds: obj("task_thresholds", SETTINGS_DEFAULTS.task_thresholds),
    guardrail_limits: obj("guardrail_limits", SETTINGS_DEFAULTS.guardrail_limits),
    default_deficits: obj("default_deficits", SETTINGS_DEFAULTS.default_deficits),
    uncertainty: obj("uncertainty", SETTINGS_DEFAULTS.uncertainty),
  };
}
