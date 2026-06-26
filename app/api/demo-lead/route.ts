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

  const html = `
    <h2 style="color:#1e293b">New DSO Calculator Lead — LunarLogic</h2>
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

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "LunarLogic Website <onboarding@resend.dev>",
      to: ["support@lunarlogic.ai"],
      reply_to: email,
      subject: `DSO Lead: ${company} — ${currentDSO}→${projectedDSO} day DSO, $${cashUnlocked.toLocaleString()}/mo opportunity`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error:", await res.text());
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
