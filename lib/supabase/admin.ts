import "server-only";

import { createClient } from "@supabase/supabase-js";

// Service-role Supabase client. Bypasses Row Level Security — SERVER ONLY.
// Used for the public intake flow (writing submissions / plans without an
// authenticated session) and trainer server actions that need to act on
// behalf of the app. Never import this into a client component.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env vars.",
    );
  }

  return createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}
