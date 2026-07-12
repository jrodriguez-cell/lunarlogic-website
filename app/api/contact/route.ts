import { NextRequest, NextResponse } from "next/server";

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

  const html = `
    <h2>New Demo Request — LunarLogic</h2>
    <table cellpadding="8" style="border-collapse:collapse">
      <tr><td><strong>Name</strong></td><td>${name}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      <tr><td><strong>Company</strong></td><td>${company}</td></tr>
      <tr><td><strong>Automation Focus</strong></td><td>${automationFocus || "Not specified"}</td></tr>
      <tr><td><strong>Current Software</strong></td><td>${currentSoftware || "Not specified"}</td></tr>
      <tr><td><strong>Message</strong></td><td>${message || "Not specified"}</td></tr>
    </table>
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
      subject: `Demo Request: ${company} (${name})`,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
