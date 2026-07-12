import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-20 sm:pt-28 sm:pb-28">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="w-6 h-px bg-blue-400/50" />
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-[0.14em]">
                Custom Accounting Automation
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.35rem] font-extrabold text-white leading-[1.08] tracking-tight text-balance">
              We build the automation{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                your accounting actually needs
              </span>
              .
            </h1>

            <p className="mt-6 text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Every business loses hours somewhere to accounting busywork: chasing payments, entering bills, closing
              the books. LunarLogic builds a custom automation for wherever yours does. Accounts receivable and
              accounts payable are just two common places we start.
            </p>

            <p className="mt-4 text-base text-slate-500 italic max-w-xl mx-auto lg:mx-0">
              So the work gets done, even when no one&apos;s watching it happen.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-center justify-center lg:justify-start gap-6">
              <Link
                href="/contact"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Get a Demo
              </Link>
              <Link
                href="/use-cases"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white font-semibold text-base transition-colors"
              >
                See Example Automations
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Moon visual */}
          <div
            className="relative flex items-center justify-center h-[280px] sm:h-[360px] lg:h-[440px]"
            aria-hidden="true"
          >
            {/* Glow */}
            <div className="absolute w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] bg-blue-500/20 rounded-full blur-3xl" />

            {/* Orbit rings */}
            <div
              className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-blue-400/15"
              style={{ transform: "rotate(-14deg) scaleY(0.86)" }}
            />
            <div
              className="absolute w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] rounded-full border border-indigo-400/15 animate-spin-slow"
              style={{ transform: "rotate(10deg) scaleY(0.78)" }}
            />

            {/* Stars */}
            <span className="absolute top-10 right-10 lg:right-6 w-1.5 h-1.5 rounded-full bg-blue-300/70" />
            <span className="absolute bottom-16 left-4 lg:left-0 w-1 h-1 rounded-full bg-indigo-300/60 animate-pulse" />
            <span className="absolute top-24 left-10 lg:left-8 w-1 h-1 rounded-full bg-white/40" />

            {/* Crescent moon */}
            <svg
              width="200"
              height="200"
              viewBox="0 0 24 24"
              fill="none"
              className="relative w-[160px] h-[160px] lg:w-[210px] lg:h-[210px] drop-shadow-[0_0_60px_rgba(96,165,250,0.35)]"
            >
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="url(#heroMoonGrad)" />
              <defs>
                <linearGradient id="heroMoonGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
