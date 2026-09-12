"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser Supabase client — used by the login page for email/password auth.
// Only the public anon key is exposed here.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
