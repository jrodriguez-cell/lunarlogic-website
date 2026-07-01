import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, company, industry, monthlyInvoices, avgInvoiceValue, paymentTerms, overdueDays, currentDSO } = body;

  if (!name || !email) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not configured");
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }

  const projectedDSO = Math.round(currentDSO * 0.6);
  const monthlyAR = (Number(monthlyInvoices) || 0) * (Number(avgInvoiceValue) || 0);
  const cashUnlocked = Math.round(monthlyAR * (currentDSO - projectedDSO) / 30);
  const firstName = name.split(" ")[0];

  // ── Internal lead notification ────────────────────────────────────────────────

  const internalHtml = `
    <h2 style="color:#1e293b">New Calculator Lead: LunarLogic</h2>
    <table cellpadding="8" style="border-collapse:collapse;width:100%;max-width:520px;font-family:sans-serif;font-size:14px">
      <tr style="background:#f1f5f9"><td style="width:200px"><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td><a href="mailto:${email}">${email}</a></td></tr>
      <tr style="background:#f1f5f9"><td><strong>Company</strong></td><td>${company}</td></tr>
      <tr><td><strong>Industry</strong></td><td>${industry}</td></tr>
      <tr style="background:#f1f5f9"><td><strong>Monthly Invoices</strong></td><td>${monthlyInvoices}</td></tr>
      <tr><td><strong>Avg Invoice Value</strong></td><td>$${Number(avgInvoiceValue).toLocaleString()}</td></tr>
      <tr style="background:#f1f5f9"><td><strong>Payment Terms</strong></td><td>Net ${paymentTerms}</td></tr>
      <tr><td><strong>Avg Days Late</strong></td><td>~${overdueDays} days</td></tr>
      <tr style="background:#dbeafe;border-top:2px solid #93c5fd"><td><strong>Current DSO</strong></td><td><strong>${currentDSO} days</strong></td></tr>
      <tr style="background:#dcfce7"><td><strong>Projected DSO</strong></td><td><strong style="color:#16a34a">${projectedDSO} days</strong></td></tr>
      <tr style="background:#dcfce7"><td><strong>Monthly Cash to Unlock</strong></td><td><strong style="color:#16a34a">$${cashUnlocked.toLocaleString()}</strong></td></tr>
      <tr style="background:#dcfce7"><td><strong>Annual Cash to Unlock</strong></td><td><strong style="color:#16a34a">$${(cashUnlocked * 12).toLocaleString()}</strong></td></tr>
    </table>
    <p style="margin-top:16px;font-family:sans-serif;font-size:13px;color:#64748b">
      This lead came through the DSO Calculator on lunarlogic.ai.
    </p>
  `;

  // ── Customer confirmation email ───────────────────────────────────────────────

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
              <p style="margin:0;font-size:13px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:1px">Your Results</p>
            </td></tr>
            <tr><td style="padding-bottom:24px">
              <h1 style="margin:0;font-size:28px;font-weight:800;color:#ffffff;line-height:1.2">
                Here's what LunarLogic would do for ${company}, ${firstName}.
              </h1>
            </td></tr>

            <!-- Numbers -->
            <tr><td style="padding-bottom:24px">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:12px;overflow:hidden;border:1px solid #1e293b">
                <tr style="background:#0f172a">
                  <td style="padding:16px 20px;border-bottom:1px solid #1e293b">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">Days to get paid now</p>
                    <p style="margin:0;font-size:32px;font-weight:800;color:#ffffff">${currentDSO} <span style="font-size:16px;font-weight:400;color:#94a3b8">days</span></p>
                  </td>
                  <td style="padding:16px 20px;border-bottom:1px solid #1e293b;border-left:1px solid #1e293b">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">Projected with LunarLogic</p>
                    <p style="margin:0;font-size:32px;font-weight:800;color:#4ade80">${projectedDSO} <span style="font-size:16px;font-weight:400;color:#94a3b8">days</span></p>
                  </td>
                </tr>
                <tr style="background:#052e16">
                  <td colspan="2" style="padding:16px 20px">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#4ade80;text-transform:uppercase;letter-spacing:1px">Cash you could unlock</p>
                    <p style="margin:0;font-size:28px;font-weight:800;color:#4ade80">$${cashUnlocked.toLocaleString()}<span style="font-size:15px;font-weight:400;color:#86efac"> / month</span></p>
                    <p style="margin:4px 0 0;font-size:13px;color:#86efac">$${(cashUnlocked * 12).toLocaleString()} a year, from money you have already earned</p>
                  </td>
                </tr>
              </table>
            </td></tr>

            <!-- Body copy -->
            <tr><td style="padding-bottom:32px">
              <p style="margin:0 0 16px;font-size:15px;color:#94a3b8;line-height:1.6">
                These figures are based on your inputs: ${monthlyInvoices} invoices/month at $${Number(avgInvoiceValue).toLocaleString()} average on Net ${paymentTerms} terms, with payments arriving roughly ${overdueDays} days past due.
              </p>
              <p style="margin:0;font-size:15px;color:#94a3b8;line-height:1.6">
                LunarLogic gets you paid faster by handling the whole process for you: same-day invoices, a set schedule of reminders on late payments, and payments matched to the right invoice automatically. The $${cashUnlocked.toLocaleString()} a month is money you have already earned and are simply waiting on, not new revenue.
              </p>
            </td></tr>

            <!-- CTA -->
            <tr><td style="padding-bottom:32px;text-align:center">
              <a href="https://www.lunarlogic.ai/contact"
                 style="display:inline-block;background:#3b82f6;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 32px;border-radius:10px">
                Talk to us about your numbers
              </a>
              <p style="margin:16px 0 0;font-size:13px;color:#475569">
                Or reply directly to this email. We read every one.
              </p>
            </td></tr>

            <!-- Divider -->
            <tr><td style="border-top:1px solid #1e293b;padding-top:24px">
              <p style="margin:0;font-size:12px;color:#334155;line-height:1.6">
                You received this because you used the get-paid calculator at lunarlogic.ai. We won't add you to any mailing list.
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
        subject: `New lead: ${company} (${currentDSO} to ${projectedDSO} days to get paid, $${cashUnlocked.toLocaleString()}/mo opportunity)`,
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
        subject: `Your results: getting paid in ${projectedDSO} days instead of ${currentDSO}, freeing $${cashUnlocked.toLocaleString()}/mo`,
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
