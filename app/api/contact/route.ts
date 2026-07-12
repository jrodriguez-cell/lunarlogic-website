import { NextRequest, NextResponse } from "next/server";

const AUTOMATION_LABELS: Record<string, string> = {
  ar: "Accounts receivable (invoicing, collections)",
  ap: "Accounts payable (bills, approvals)",
  full: "Full accounting suite (close, reporting, forecasting)",
  unsure: "Not sure yet / multiple areas",
};

const SOFTWARE_LABELS: Record<string, string> = {
  "quickbooks-online": "QuickBooks Online",
  "quickbooks-desktop": "QuickBooks Desktop",
  "sage-intacct": "Sage Intacct",
  netsuite: "NetSuite",
  xero: "Xero",
  other: "Other / not sure",
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, automationFocus, currentSoftware, message } = body;

  if (!name || !email || !company) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const firstName = String(name).split(" ")[0];
  const focusLabel = AUTOMATION_LABELS[automationFocus] || "Not specified";
  const softwareLabel = SOFTWARE_LABELS[currentSoftware] || "Not specified";

  // ── Internal notification ─────────────────────────────────────────────────────

  const internalHtml = `
    <h2>New Demo Request — LunarLogic</h2>
    <table cellpadding="8" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Company</strong></td><td>${company}</td></tr>
      <tr><td><strong>Automation Focus</strong></td><td>${focusLabel}</td></tr>
      <tr><td><strong>Current Software</strong></td><td>${softwareLabel}</td></tr>
      <tr><td><strong>Message</strong></td><td>${message || "Not specified"}</td></tr>
    </table>
  `;

  // ── Requester confirmation ─────────────────────────────────────────────────────

  const customerHtml = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
    <body style="margin:0;padding:0;background:#020617;font-family:system-ui,-apple-system,sans-serif">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#020617;padding:40px 16px">
        <tr><td align="center">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">

            <!-- Logo -->
            <tr><td style="padding-bottom:32px">
              <p style="margin:0;font-size:18px;font-weight:700;color:#ffffff;letter-spacing:-0.3px">
                <span style="color:#60a5fa">lunarlogic</span><span style="color:#ffffff99">.ai</span>
              </p>
            </td></tr>

            <!-- Headline -->
            <tr><td style="padding-bottom:8px">
              <p style="margin:0;font-size:13px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:1px">Request Received</p>
            </td></tr>
            <tr><td style="padding-bottom:24px">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2">
                Thanks, ${firstName}. We've got your request.
              </h1>
            </td></tr>

            <!-- Body copy -->
            <tr><td style="padding-bottom:24px">
              <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.6">
                Our team will be in touch within one business day to schedule a 30-minute call about ${company}.
              </p>
            </td></tr>

            <!-- What to expect -->
            <tr><td style="padding-bottom:32px">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #1e293b">
                <tr style="background:#0f172a"><td style="padding:16px 20px">
                  <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">What to expect</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#cbd5e1;line-height:1.5">Review of your current accounting workflow</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#cbd5e1;line-height:1.5">A live walkthrough of a custom automation built for it</p>
                  <p style="margin:0 0 8px;font-size:14px;color:#cbd5e1;line-height:1.5">An estimate of the time and cash it would free up</p>
                  <p style="margin:0;font-size:14px;color:#cbd5e1;line-height:1.5">No obligation, no hard sell</p>
                </td></tr>
              </table>
            </td></tr>

            <!-- Submission summary -->
            <tr><td style="padding-bottom:32px">
              <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">What you told us</p>
              <p style="margin:0;font-size:14px;color:#94a3b8;line-height:1.6">
                Looking to automate: ${focusLabel}<br>
                Current software: ${softwareLabel}
              </p>
            </td></tr>

            <!-- CTA -->
            <tr><td style="padding-bottom:32px;text-align:center">
              <p style="margin:0;font-size:13px;color:#475569">
                Need to add anything before we talk? Just reply directly to this email.
              </p>
            </td></tr>

            <!-- Divider -->
            <tr><td style="border-top:1px solid #1e293b;padding-top:24px">
              <p style="margin:0;font-size:12px;color:#334155;line-height:1.6">
                You received this because you requested a demo at lunarlogic.ai. We won't add you to any mailing list.
                Questions? Reply here or email <a href="mailto:support@lunarlogic.ai" style="color:#60a5fa">support@lunarlogic.ai</a>.
              </p>
            </td></tr>

          </table>
        </td></tr>
      </table>
    </body>
    </html>
  `;

  // Send both emails — fire in parallel, fail independently
  const [internalRes, customerRes] = await Promise.all([
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "LunarLogic Website <onboarding@resend.dev>",
        to: ["support@lunarlogic.ai"],
        reply_to: email,
        subject: `Demo Request: ${company} (${name})`,
        html: internalHtml,
      }),
    }),
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "LunarLogic Website <onboarding@resend.dev>",
        to: [email],
        reply_to: "support@lunarlogic.ai",
        subject: "We've got your request, thanks for reaching out to LunarLogic",
        html: customerHtml,
      }),
    }),
  ]);

  if (!internalRes.ok) {
    console.error("Resend internal error:", await internalRes.text());
  }
  if (!customerRes.ok) {
    console.error("Resend customer error:", await customerRes.text());
  }

  // Return success as long as the request itself was valid — email delivery is best-effort
  return NextResponse.json({ success: true });
}
