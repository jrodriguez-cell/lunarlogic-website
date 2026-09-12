import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

// Server Supabase client bound to the request cookies. Reads the trainer's
// auth session so RLS runs as the authenticated user. Use inside Server
// Components, Route Handlers, and Server Actions.
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` is called from a Server Component render, where cookies
            // are read-only. The middleware refreshes the session cookie, so
            // this can be safely ignored.
          }
        },
      },
    },
  );
}
