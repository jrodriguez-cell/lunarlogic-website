import "server-only";

import Anthropic from "@anthropic-ai/sdk";

import { PARQ_QUESTIONS } from "./parq";
import type { IntakeSubmission } from "./types";

const SYSTEM_PROMPT = `You are assisting a certified personal trainer (ISSA-CPT) in drafting a personalized nutrition and workout plan from a client intake form. Produce a DRAFT for the trainer to review and edit — never a final, unreviewed deliverable. Base the plan strictly on the intake data provided. If any PAR-Q health screening answer is 'yes', begin your response with a clear flag recommending physician clearance before the client begins training, but still draft a conservative, low-risk starting plan. Structure your response as two clearly separated sections: NUTRITION PLAN (estimated daily calorie range and macro split, meal structure appropriate to their cooking time/pattern, and notes on their stated allergies/dislikes) and WORKOUT PLAN (a weekly split matching their days/week and location/equipment access, with exercises, sets, reps, and brief progression notes). Keep the tone practical and specific to this client, not generic.

Format requirement: output GitHub-flavored Markdown. Use exactly these two level-2 headers, verbatim and each on its own line, to open the two sections:

## NUTRITION PLAN

## WORKOUT PLAN

If a PAR-Q item is flagged, put the physician-clearance note ABOVE the "## NUTRITION PLAN" header so it introduces the whole plan. Do not add any other level-2 (##) headers.`;

export interface GeneratedPlan {
  nutritionPlanText: string;
  workoutPlanText: string;
  /** The full raw model output, kept for debugging / fallback. */
  raw: string;
}

/**
 * Builds a readable snapshot of the PAR-Q answers (question text → Yes/No) so
 * the model reasons over the actual questions, not opaque keys.
 */
function parqSummary(answers: Record<string, boolean>) {
  return PARQ_QUESTIONS.map((q) => ({
    question: q.text,
    answer: answers?.[q.key] === true ? "Yes" : "No",
  }));
}

/**
 * Splits the model's markdown into the nutrition and workout sections on the
 * "## WORKOUT PLAN" boundary. Any physician-clearance preamble stays attached
 * to the nutrition section (it opens the plan) — the clearance gate itself is
 * driven by parq_flagged from the database, not by parsing text.
 */
function splitSections(raw: string): {
  nutritionPlanText: string;
  workoutPlanText: string;
} {
  const workoutHeader = /^\s*##\s+WORKOUT PLAN\s*$/im;
  const match = raw.match(workoutHeader);

  if (match && match.index !== undefined) {
    const nutrition = raw.slice(0, match.index).trim();
    const workout = raw.slice(match.index).trim();
    return { nutritionPlanText: nutrition, workoutPlanText: workout };
  }

  // Fallback: couldn't find the boundary — hand the whole draft to the trainer
  // in the nutrition field rather than silently dropping content.
  return { nutritionPlanText: raw.trim(), workoutPlanText: "" };
}

export async function generatePlan(
  submission: IntakeSubmission,
): Promise<GeneratedPlan> {
  const client = new Anthropic();

  // Structured intake payload for the model. parq_answers is expanded to
  // readable question/answer pairs.
  const intakeForModel = {
    ...submission,
    parq_answers_readable: parqSummary(submission.parq_answers),
  };

  const userMessage = `Here is the client intake submission as JSON. Draft the plan based strictly on this data.\n\n${JSON.stringify(
    intakeForModel,
    null,
    2,
  )}`;

  const stream = client.messages.stream({
    model: "claude-opus-5",
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const message = await stream.finalMessage();

  const raw = message.content
    .filter((b): b is Anthropic.TextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();

  const { nutritionPlanText, workoutPlanText } = splitSections(raw);
  return { nutritionPlanText, workoutPlanText, raw };
}
