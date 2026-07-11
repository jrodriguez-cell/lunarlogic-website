import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                  fill="url(#footerMoonGrad)"
                />
                <defs>
                  <linearGradient id="footerMoonGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#818CF8" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-logo text-lg font-bold tracking-wide">
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  lunarlogic
                </span>
                <span className="text-white/70 font-semibold">.ai</span>
              </span>
            </Link>
            <p className="mt-3 text-sm text-slate-400 max-w-xs">
              Custom accounting automation for service businesses, from AR and AP to the full financial back office.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h3>
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Sales</p>
            <a
              href="mailto:support@lunarlogic.ai"
              className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              support@lunarlogic.ai
            </a>
            <div className="mt-4">
              <Link
                href="/contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
              >
                Get a Demo
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-800 text-center">
          <p className="text-sm text-slate-500">
            &copy; 2026 LunarLogic. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
