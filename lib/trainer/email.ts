import "server-only";

import { Resend } from "resend";

import { markdownToHtml } from "./markdown";

// Resend transactional email. Two messages:
//   1. The intake-link invitation sent when a client is created.
//   2. The finished plan (HTML body + PDF attachment) on Approve & Send.

function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("Missing RESEND_API_KEY env var.");
  return new Resend(key);
}

function fromAddress(): string {
  return (
    process.env.RESEND_FROM_EMAIL ??
    "LunarLogic Training <onboarding@resend.dev>"
  );
}

function shell(title: string, inner: string): string {
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
<div style="max-width:600px;margin:0 auto;padding:24px;">
<div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;">
<div style="font-weight:800;font-size:18px;color:#4f46e5;margin-bottom:20px;">${title}</div>
${inner}
</div>
<div style="text-align:center;color:#94a3b8;font-size:12px;padding:16px;">Sent by your personal trainer via LunarLogic.</div>
</div></body></html>`;
}

export async function sendIntakeLinkEmail(params: {
  to: string;
  clientName: string;
  intakeUrl: string;
}): Promise<void> {
  const { to, clientName, intakeUrl } = params;
  const inner = `
<p style="font-size:15px;line-height:1.6;">Hi ${escape(clientName)},</p>
<p style="font-size:15px;line-height:1.6;">Welcome aboard! To build your personalized nutrition and workout plan, I need a few details about your goals, preferences, and health background. It takes about 5–10 minutes.</p>
<p style="text-align:center;margin:28px 0;">
  <a href="${intakeUrl}" style="background:#4f46e5;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:700;font-size:15px;display:inline-block;">Start your intake form</a>
</p>
<p style="font-size:13px;line-height:1.6;color:#64748b;">Or paste this link into your browser:<br><span style="color:#4f46e5;">${intakeUrl}</span></p>`;

  const { error } = await resend().emails.send({
    from: fromAddress(),
    to,
    subject: "Your intake form — let's build your plan",
    html: shell("Let's get started", inner),
  });
  if (error) throw new Error(`Resend error: ${error.message ?? String(error)}`);
}

export async function sendPlanEmail(params: {
  to: string;
  clientName: string;
  nutritionPlanText: string;
  workoutPlanText: string;
  pdf: Uint8Array;
}): Promise<void> {
  const { to, clientName, nutritionPlanText, workoutPlanText, pdf } = params;

  const inner = `
<p style="font-size:15px;line-height:1.6;">Hi ${escape(clientName)},</p>
<p style="font-size:15px;line-height:1.6;">Your personalized plan is ready. The full plan is below and attached as a PDF you can save or print.</p>
<div style="font-size:14px;line-height:1.6;color:#1e293b;border-top:1px solid #e2e8f0;margin-top:20px;padding-top:8px;">
${markdownToHtml(nutritionPlanText)}
${markdownToHtml(workoutPlanText)}
</div>
<p style="font-size:12px;line-height:1.6;color:#94a3b8;border-top:1px solid #e2e8f0;margin-top:20px;padding-top:12px;">This plan is for general fitness guidance and is not medical advice. Consult a physician before starting any new exercise or nutrition program.</p>`;

  const { error } = await resend().emails.send({
    from: fromAddress(),
    to,
    subject: "Your personalized nutrition & workout plan",
    html: shell("Your plan is ready", inner),
    attachments: [
      {
        filename: "your-plan.pdf",
        content: Buffer.from(pdf),
      },
    ],
  });
  if (error) throw new Error(`Resend error: ${error.message ?? String(error)}`);
}

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
