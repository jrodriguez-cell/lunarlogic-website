import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Only run the auth session refresh on the trainer dashboard. The public
  // marketing site and the public intake page are intentionally excluded.
  matcher: ["/dashboard/:path*"],
};
