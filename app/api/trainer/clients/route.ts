import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateIntakeToken } from "@/lib/trainer/token";
import { sendIntakeLinkEmail } from "@/lib/trainer/email";

export const runtime = "nodejs";

function appUrl(): string {
  return (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").replace(
    /\/$/,
    "",
  );
}

export async function POST(request: Request) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { name?: string; email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  if (!name || !email) {
    return NextResponse.json(
      { error: "Name and email are required." },
      { status: 400 },
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // Create the client row.
  const { data: client, error: clientErr } = await supabase
    .from("clients")
    .insert({ name, email })
    .select("id")
    .single();

  if (clientErr || !client) {
    return NextResponse.json(
      { error: "Could not create client." },
      { status: 500 },
    );
  }

  // Create an intake link with a unique token (retry once on the rare collision).
  let token = generateIntakeToken();
  let linkErr = (
    await supabase
      .from("intake_links")
      .insert({ client_id: client.id, token, status: "pending" })
  ).error;

  if (linkErr) {
    token = generateIntakeToken();
    linkErr = (
      await supabase
        .from("intake_links")
        .insert({ client_id: client.id, token, status: "pending" })
    ).error;
  }

  if (linkErr) {
    return NextResponse.json(
      { error: "Could not create intake link." },
      { status: 500 },
    );
  }

  const intakeUrl = `${appUrl()}/intake/${token}`;

  // Send the invite. If email fails, keep the client/link and report it so the
  // trainer can copy the link manually.
  let emailSent = true;
  try {
    await sendIntakeLinkEmail({ to: email, clientName: name, intakeUrl });
  } catch (err) {
    emailSent = false;
    console.error("Intake link email failed:", err);
  }

  return NextResponse.json({
    clientId: client.id,
    token,
    intakeUrl,
    emailSent,
  });
}
