"use client";

import { useEffect, useRef, useState } from "react";

// ── Mockup: AR Suite ──────────────────────────────────────────────────────────

function ARMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    const t1 = setTimeout(() => setStep(1), 900);
    const t2 = setTimeout(() => setStep(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">How Getting Paid Works</p>
        {[
          { label: "Job comes in", sub: "via Slack or email", done: step >= 0 },
          { label: "Invoice created & sent", sub: "in about 90 seconds", done: step >= 1 },
          { label: "Reminders go out", sub: "on a set schedule", done: step >= 1 },
          { label: "Payment matched to invoice", sub: "marked paid for you", done: step >= 2 },
        ].map((s, i) => (
          <div key={i} className="flex items-start gap-3 mb-3 last:mb-0">
            <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${s.done ? "bg-blue-500" : "bg-slate-700"}`}>
              {s.done ? (
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium transition-colors ${s.done ? "text-white" : "text-slate-500"}`}>{s.label}</p>
              <p className="text-xs text-slate-500">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={`transition-all duration-700 ${step >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl p-4 flex items-center gap-4">
          <div>
            <p className="text-3xl font-extrabold text-blue-400">19</p>
            <p className="text-xs text-slate-400">days sooner paid</p>
          </div>
          <div className="flex-1 h-px bg-blue-500/20" />
          <div>
            <p className="text-3xl font-extrabold text-blue-400">$65K</p>
            <p className="text-xs text-slate-400">cash freed up</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Mockup: AP Suite ──────────────────────────────────────────────────────────

function APMockup() {
  const bills = [
    { vendor: "Apex Supplies Co.", amount: "$2,340", due: "Due in 8 days", status: "pending" },
    { vendor: "TechTools Inc.", amount: "$780", due: "Due in 14 days", status: "approved" },
    { vendor: "Fleet Maintenance LLC", amount: "$4,120", due: "Due in 21 days", status: "scheduled" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Bill Queue</p>
          <span className="text-xs font-semibold text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
            In Development
          </span>
        </div>
        <div className="space-y-2">
          {bills.map((b) => (
            <div key={b.vendor} className="flex items-center gap-3 bg-slate-900/60 border border-slate-700/50 rounded-xl p-3">
              <div className="w-8 h-8 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{b.vendor}</p>
                <p className="text-slate-500 text-xs">{b.due}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-slate-200 text-xs font-bold">{b.amount}</p>
                <span className={`text-xs font-semibold ${
                  b.status === "approved" ? "text-blue-400" :
                  b.status === "scheduled" ? "text-green-400" :
                  "text-yellow-400"
                }`}>
                  {b.status === "pending" ? "Pending" : b.status === "approved" ? "Approved" : "Scheduled"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Cash Impact</p>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-400">Bills due this week</span>
          <span className="text-slate-200 font-bold">$7,240</span>
        </div>
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-slate-400">Scheduled for payment</span>
          <span className="text-green-400 font-bold">$4,120</span>
        </div>
        <div className="flex justify-between text-xs pt-2 border-t border-slate-700">
          <span className="text-slate-400">Projected cash position</span>
          <span className="text-blue-400 font-bold">$124K</span>
        </div>
      </div>
    </div>
  );
}

// ── Mockup: Full Suite ────────────────────────────────────────────────────────

function FullSuiteMockup() {
  const months = ["Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
  const actuals = [68, 72, 79, 85, 91, 98, null, null];
  const forecasts = [null, null, null, null, null, null, 104, 112];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cash Flow Forecast</p>
          <span className="text-xs font-semibold text-slate-400 bg-slate-700 border border-slate-600 px-2 py-0.5 rounded-full">
            Coming Soon
          </span>
        </div>

        <div className="flex items-end gap-1 h-16 mb-3">
          {months.map((m, i) => (
            <div key={m} className="flex-1 flex flex-col items-center gap-1">
              {actuals[i] !== null ? (
                <div
                  className="w-full rounded-t bg-blue-500/60"
                  style={{ height: `${((actuals[i] as number) / 112) * 56}px` }}
                />
              ) : (
                <div
                  className="w-full rounded-t border border-dashed border-blue-400/40 bg-blue-500/20"
                  style={{ height: `${((forecasts[i] as number) / 112) * 56}px` }}
                />
              )}
              <span className={`text-[9px] ${forecasts[i] !== null ? "text-blue-400/50" : "text-slate-500"}`}>{m}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm bg-blue-500/60" />
            <span className="text-slate-400">Actual</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-sm border border-dashed border-blue-400/40 bg-blue-500/20" />
            <span className="text-slate-400">Forecast</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Closing the books", value: "3 days", sub: "was 14 days" },
          { label: "Your numbers", value: "Up to date", sub: "not once a month" },
        ].map((m) => (
          <div key={m.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 text-center">
            <p className="text-lg font-extrabold text-blue-400">{m.value}</p>
            <p className="text-xs text-slate-300 font-medium mt-0.5">{m.label}</p>
            <p className="text-xs text-slate-500">{m.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Chapter data ───────────────────────────────────────────────────────────────

const chapters = [
  {
    phase: "01",
    status: "Production",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
    label: "Getting Paid",
    title: "Getting paid, handled from start to finish.",
    body: "From the moment a job is done to the money landing in your account, every step runs on its own. Invoices go out in seconds, reminders go out every week, and payments are matched to the right invoice for you. No one chasing customers, no uncomfortable calls, and nothing to type up.",
    stat: { value: "40%", label: "faster to get paid" },
    mockup: <ARMockup />,
  },
  {
    phase: "02",
    status: "In Development",
    statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    label: "Paying Bills",
    title: "Your bills: sorted, approved, and paid on time.",
    body: "The bills you owe are collected in one place, sent to the right person to approve, and paid on schedule. The money going out becomes just as predictable as the money coming in. Nothing paid too early, nothing paid late, and nothing paid without approval.",
    stat: { value: "0", label: "bills you have to enter by hand" },
    mockup: <APMockup />,
  },
  {
    phase: "03",
    status: "Coming Soon",
    statusColor: "text-slate-400 bg-slate-700 border-slate-600",
    label: "Full Accounting",
    title: "Your whole back office, running without you.",
    body: "Once the money in and the money out are handled, everything else falls into place: a clear view of your cash for the months ahead, books that close in days instead of weeks, payroll that stays in sync, and up-to-date numbers whenever you want them. The financial side of your business, running on its own.",
    stat: { value: "3 days", label: "to close the books (was 14)" },
    mockup: <FullSuiteMockup />,
  },
];

// ── Mobile card layout ────────────────────────────────────────────────────────

function MobileChapterCard({ chapter }: { chapter: typeof chapters[number] }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl px-4 py-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phase {chapter.phase}</span>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${chapter.statusColor}`}>
          {chapter.status}
        </span>
      </div>
      <p className="text-sm font-semibold text-blue-400 mb-2">{chapter.label}</p>
      <h3 className="text-xl font-extrabold text-white leading-tight mb-3">{chapter.title}</h3>
      <p className="text-sm text-slate-400 leading-relaxed mb-5">{chapter.body}</p>
      <div className="mb-5">{chapter.mockup}</div>
      <div className="inline-flex items-baseline gap-2 bg-blue-500/5 border border-blue-500/15 rounded-xl px-4 py-3">
        <span className="text-2xl font-extrabold text-blue-400">{chapter.stat.value}</span>
        <span className="text-sm text-slate-400">{chapter.stat.label}</span>
      </div>
    </div>
  );
}

// ── Desktop sticky scroll ─────────────────────────────────────────────────────

function DesktopShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      setScrollProgress(progress);
      const newChapter = Math.min(chapters.length - 1, Math.floor(progress * chapters.length));
      setActiveChapter(prev => {
        if (prev !== newChapter) {
          setTransitioning(true);
          setTimeout(() => setTransitioning(false), 400);
        }
        return newChapter;
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const chapter = chapters[activeChapter];

  return (
    <div ref={containerRef} style={{ height: `${chapters.length * 70}vh` }}>
      <div className="relative sticky top-0 h-screen overflow-hidden bg-slate-950 flex flex-col">
        <div className="flex-shrink-0 pt-10 pb-4 text-center">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">The Platform</p>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-2 gap-12 items-center min-h-0">
          <div className="flex flex-col justify-center pr-8">
            <div
              className="transition-all duration-300 ease-out"
              style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(16px)" : "translateY(0)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phase {chapter.phase}</span>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${chapter.statusColor}`}>
                  {chapter.status}
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-400 mb-2">{chapter.label}</p>
              <h2 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-5">{chapter.title}</h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">{chapter.body}</p>
              <div className="inline-flex items-baseline gap-2 bg-blue-500/5 border border-blue-500/15 rounded-2xl px-5 py-4">
                <span className="text-3xl font-extrabold text-blue-400">{chapter.stat.value}</span>
                <span className="text-sm text-slate-400">{chapter.stat.label}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div
              className="w-full transition-all duration-300 ease-out"
              style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "scale(0.97)" : "scale(1)" }}
            >
              {chapter.mockup}
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 pb-6 flex items-center justify-center gap-6">
          {chapters.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                const container = containerRef.current;
                if (!container) return;
                const scrollTarget = container.offsetTop + (i / chapters.length) * (container.offsetHeight - window.innerHeight) + 10;
                window.scrollTo({ top: scrollTarget, behavior: "smooth" });
              }}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div className={`h-0.5 rounded-full transition-all duration-300 ${i === activeChapter ? "w-8 bg-blue-400" : "w-4 bg-slate-600 group-hover:bg-slate-500"}`} />
              <span className={`text-xs transition-colors ${i === activeChapter ? "text-blue-400 font-semibold" : "text-slate-600 group-hover:text-slate-500"}`}>
                {c.label}
              </span>
            </button>
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800 pointer-events-none">
          <div className="h-full bg-blue-500" style={{ width: `${scrollProgress * 100}%`, transition: "width 80ms linear" }} />
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function SuiteShowcase() {
  return (
    <>
      {/* Mobile: stacked cards with reveal animations */}
      <div className="lg:hidden bg-slate-950 py-16 space-y-6">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">The Platform</p>
        </div>
        {chapters.map((chapter) => (
          <MobileChapterCard key={chapter.phase} chapter={chapter} />
        ))}
      </div>

      {/* Desktop: sticky scroll */}
      <div className="hidden lg:block">
        <DesktopShowcase />
      </div>
    </>
  );
}
