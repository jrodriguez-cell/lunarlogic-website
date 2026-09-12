"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { PlanStatus } from "@/lib/trainer/types";

export default function PlanEditor({
  planId,
  initialNutrition,
  initialWorkout,
  needsClearance,
  initialClearanceAcknowledged,
  status,
  sentAt,
  clientEmail,
}: {
  planId: string;
  initialNutrition: string;
  initialWorkout: string;
  needsClearance: boolean;
  initialClearanceAcknowledged: boolean;
  status: PlanStatus;
  sentAt: string | null;
  clientEmail: string | null;
}) {
  const router = useRouter();
  const [nutrition, setNutrition] = useState(initialNutrition);
  const [workout, setWorkout] = useState(initialWorkout);
  const [acknowledged, setAcknowledged] = useState(
    initialClearanceAcknowledged,
  );
  const [localStatus, setLocalStatus] = useState<PlanStatus>(status);

  const [saving, setSaving] = useState(false);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isSent = localStatus === "sent";
  const clearanceBlocks = needsClearance && !acknowledged;
  const canSend = !isSent && !clearanceBlocks && !!clientEmail;

  const textareaClass =
    "w-full min-h-[280px] rounded-md border border-slate-300 px-3 py-2 text-sm font-mono leading-relaxed focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none disabled:bg-slate-50 disabled:text-slate-500";

  async function save() {
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/trainer/plans/${planId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nutrition_plan_text: nutrition,
          workout_plan_text: workout,
          clearance_acknowledged: acknowledged,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not save.");
      setMessage("Saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save.");
    } finally {
      setSaving(false);
    }
  }

  async function approveAndSend() {
    if (!canSend) return;
    setSending(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(`/api/trainer/plans/${planId}/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nutrition_plan_text: nutrition,
          workout_plan_text: workout,
          clearance_acknowledged: acknowledged,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Could not send.");
      setLocalStatus("sent");
      setMessage("Plan approved and emailed to the client.");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="space-y-6">
      {needsClearance && (
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-xl leading-none">⚠️</span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-900">
                This client flagged a PAR-Q item — physician clearance
                recommended before training begins
              </p>
              <label className="mt-3 flex items-start gap-2 text-sm text-amber-900 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acknowledged}
                  disabled={isSent}
                  onChange={(e) => setAcknowledged(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-amber-400 text-amber-600 focus:ring-amber-500"
                />
                <span>
                  I have reviewed this and am proceeding appropriately.
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {(message || error) && (
        <div
          className={`rounded-md px-4 py-3 text-sm ${
            error
              ? "bg-red-50 border border-red-200 text-red-700"
              : "bg-emerald-50 border border-emerald-200 text-emerald-700"
          }`}
        >
          {error || message}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-slate-900">
            Nutrition plan
          </label>
          <span className="text-xs text-slate-400">Markdown supported</span>
        </div>
        <textarea
          className={textareaClass}
          value={nutrition}
          disabled={isSent}
          onChange={(e) => setNutrition(e.target.value)}
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-sm font-semibold text-slate-900">
            Workout plan
          </label>
          <span className="text-xs text-slate-400">Markdown supported</span>
        </div>
        <textarea
          className={textareaClass}
          value={workout}
          disabled={isSent}
          onChange={(e) => setWorkout(e.target.value)}
        />
      </div>

      {isSent ? (
        <div className="rounded-md bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-800">
          Sent to {clientEmail}
          {sentAt ? ` on ${new Date(sentAt).toLocaleString()}` : ""}. This plan
          is now read-only.
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
          <button
            onClick={save}
            disabled={saving || sending}
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save draft"}
          </button>
          <button
            onClick={approveAndSend}
            disabled={!canSend || sending || saving}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
            title={
              clearanceBlocks
                ? "Acknowledge the clearance notice to enable sending."
                : !clientEmail
                  ? "No client email on file."
                  : undefined
            }
          >
            {sending ? "Sending…" : "Approve & Send"}
          </button>
          {clearanceBlocks && (
            <span className="text-xs text-amber-700">
              Acknowledge the clearance notice above to enable sending.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
