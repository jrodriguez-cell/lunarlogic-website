"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// The marketing site and the trainer app share one Next.js root layout but need
// different chrome. This client wrapper picks based on the current path:
//   * Trainer app routes (/login, /dashboard, /intake) render a clean, light
//     surface with no marketing navigation or footer.
//   * Everything else renders the marketing chrome (dark theme, nav, footer,
//     and the organization JSON-LD), exactly as before.
// The nav/footer/schema are passed in as slots from the server layout so they
// can remain server components.

const APP_PREFIXES = ["/login", "/dashboard", "/intake"];

function isAppRoute(pathname: string): boolean {
  return APP_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

export default function SiteChrome({
  children,
  nav,
  footer,
  schema,
}: {
  children: ReactNode;
  nav: ReactNode;
  footer: ReactNode;
  schema: ReactNode;
}) {
  const pathname = usePathname() ?? "/";

  if (isAppRoute(pathname)) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        {children}
      </div>
    );
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col">
      {schema}
      {nav}
      <main className="flex-1">{children}</main>
      {footer}
    </div>
  );
}
