"use client";

import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/ScrollReveal";

// ── Mockup: Invoice Creation ──────────────────────────────────────────────────

function InvoiceMockup() {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    setSent(false);
    const t = setTimeout(() => setSent(true), 1800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* Slack-style intake card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 bg-purple-500/20 rounded-lg flex items-center justify-center">
            <span className="text-purple-400 text-xs font-bold">#</span>
          </div>
          <div>
            <p className="text-slate-300 text-xs font-semibold">invoices</p>
            <p className="text-slate-500 text-xs">just now</p>
          </div>
        </div>

        <p className="text-white font-semibold text-sm mb-1">New Sales Order — Acme Corp</p>
        <div className="border-l-2 border-blue-500/40 pl-3 mb-4 space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Monthly service</span>
            <span className="text-slate-200">$3,500.00</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">Setup fee</span>
            <span className="text-slate-200">$700.00</span>
          </div>
          <div className="flex justify-between text-xs font-bold pt-1 border-t border-slate-700">
            <span className="text-white">Total</span>
            <span className="text-white">$4,200.00</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors">
            ✓ Approve &amp; Send
          </button>
          <button className="px-3 bg-slate-700 text-slate-300 text-xs font-semibold py-2 rounded-lg">
            Edit
          </button>
        </div>
      </div>

      {/* Processing indicator */}
      <div className={`transition-all duration-500 ${sent ? "opacity-0 h-0 overflow-hidden" : "opacity-100"}`}>
        <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 flex items-center gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 150}ms` }} />
            ))}
          </div>
          <p className="text-slate-400 text-xs">Validating customer in accounting system…</p>
        </div>
      </div>

      {/* Sent confirmation */}
      <div className={`transition-all duration-500 ${sent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-4 flex items-center gap-3">
          <div className="w-9 h-9 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="text-green-400 font-semibold text-sm">Invoice #1042 sent</p>
            <p className="text-slate-400 text-xs">billing@acmecorp.com · 2 min 47 sec</p>
          </div>
        </div>
      </div>

      {/* Time label */}
      <div className="text-center">
        <span className="text-xs text-slate-500">Average processing time: </span>
        <span className="text-xs font-semibold text-blue-400">2 min 47 sec</span>
        <span className="text-xs text-slate-500"> (was 19 min)</span>
      </div>
    </div>
  );
}

// ── Mockup: Payment Reminders ─────────────────────────────────────────────────

function ReminderMockup() {
  const reminders = [
    { day: "Day 3",  label: "Friendly nudge",        status: "sent",   time: "Mon 9:02 AM" },
    { day: "Day 7",  label: "Follow-up",              status: "sent",   time: "Fri 9:01 AM" },
    { day: "Day 14", label: "Escalation",             status: "sent",   time: "Fri 9:03 AM" },
    { day: "Day 21", label: "Urgent — past due",      status: "queued", time: "Next Mon" },
    { day: "Day 30", label: "Final notice",           status: "future", time: "—" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* Email preview card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl mb-1">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 bg-blue-500/20 rounded-lg flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-slate-300 text-xs font-semibold">Automated Reminder · Day 7</p>
            <p className="text-slate-500 text-xs">To: billing@acmecorp.com</p>
          </div>
        </div>
        <p className="text-slate-300 text-xs leading-relaxed">
          Hi Sarah, this is a friendly follow-up on Invoice #1042 for <span className="text-white font-medium">$4,200.00</span>, due 7 days ago…
        </p>
        <div className="mt-3 pt-3 border-t border-slate-700 flex items-center gap-2">
          <span className="text-xs text-slate-500">Sent automatically by LunarLogic</span>
          <span className="ml-auto text-xs text-green-400 font-medium">Delivered ✓</span>
        </div>
      </div>

      {/* Sequence timeline */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Reminder Sequence</p>
        {reminders.map((r, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
              r.status === "sent" ? "bg-green-400" :
              r.status === "queued" ? "bg-blue-400 animate-pulse" :
              "bg-slate-600"
            }`} />
            <div className="flex-1 flex items-center justify-between">
              <div>
                <span className="text-xs font-medium text-slate-300">{r.day}</span>
                <span className="text-xs text-slate-500 ml-2">{r.label}</span>
              </div>
              <span className={`text-xs ${r.status === "sent" ? "text-green-400" : r.status === "queued" ? "text-blue-400" : "text-slate-600"}`}>
                {r.status === "sent" ? "Sent" : r.status === "queued" ? "Queued" : r.time}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <span className="text-xs text-slate-500">Runs every weekday. </span>
        <span className="text-xs font-semibold text-blue-400">Zero manual effort.</span>
      </div>
    </div>
  );
}

// ── Mockup: AR Dashboard ──────────────────────────────────────────────────────

function DashboardMockup() {
  const buckets = [
    { label: "Current",  amount: 24800, pct: 72, color: "bg-blue-500" },
    { label: "1–30 days", amount: 6200,  pct: 40, color: "bg-yellow-500" },
    { label: "31–60",    amount: 3100,  pct: 22, color: "bg-orange-500" },
    { label: "61–90",    amount: 1200,  pct: 10, color: "bg-red-500" },
    { label: "90+",      amount: 0,     pct: 0,  color: "bg-red-700" },
  ];

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* DSO Hero */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Current DSO</p>
        <div className="flex items-end gap-3 mb-3">
          <p className="text-5xl font-extrabold text-white">33</p>
          <div className="mb-1.5">
            <span className="text-green-400 text-sm font-bold">↓ 19 days</span>
            <p className="text-slate-500 text-xs">vs. 90 days ago</p>
          </div>
        </div>

        {/* Sparkline */}
        <div className="relative h-12">
          <svg viewBox="0 0 200 48" className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(59,130,246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(59,130,246)" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Area fill */}
            <path d="M0,8 L40,10 L80,14 L100,24 L130,30 L155,20 L175,12 L200,6 L200,48 L0,48 Z" fill="url(#lineGrad)" />
            {/* Line */}
            <path d="M0,8 L40,10 L80,14 L100,24 L130,30 L155,20 L175,12 L200,6" fill="none" stroke="rgb(59,130,246)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Go-live marker */}
            <line x1="100" y1="0" x2="100" y2="48" stroke="rgb(34,197,94)" strokeWidth="1" strokeDasharray="3,2" />
            <text x="103" y="10" fill="rgb(34,197,94)" fontSize="7" fontFamily="sans-serif">Go-live</text>
          </svg>
        </div>
      </div>

      {/* AR Aging Buckets */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-2.5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">AR Aging</p>
        {buckets.map((b) => (
          <div key={b.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">{b.label}</span>
              <span className="text-slate-200 font-medium">${b.amount.toLocaleString()}</span>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full ${b.color} rounded-full transition-all duration-1000`} style={{ width: `${b.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Mockup: Cash Application ──────────────────────────────────────────────────

function CashMockup() {
  const [matched, setMatched] = useState(false);

  useEffect(() => {
    setMatched(false);
    const t = setTimeout(() => setMatched(true), 1400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      {/* Incoming payment */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Incoming Payment</p>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">$4,200.00 ACH</p>
            <p className="text-slate-400 text-xs">Acme Corp · Ref: INV-1042-PAY</p>
          </div>
        </div>

        {/* Match animation */}
        <div className={`transition-all duration-500 ${matched ? "opacity-100" : "opacity-40"}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-slate-700" />
            <div className={`text-xs font-bold px-2 py-0.5 rounded-full transition-colors ${matched ? "bg-green-500/20 text-green-400" : "bg-slate-700 text-slate-400"}`}>
              {matched ? "97% match" : "matching…"}
            </div>
            <div className="flex-1 h-px bg-slate-700" />
          </div>

          <div className={`flex items-center gap-3 bg-slate-700/40 rounded-xl p-3 border transition-colors ${matched ? "border-green-500/30" : "border-slate-600"}`}>
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${matched ? "bg-green-400" : "bg-slate-500"}`} />
            <div>
              <p className="text-slate-200 text-xs font-medium">Invoice #1042 — $4,200.00</p>
              <p className="text-slate-500 text-xs">Acme Corp · Due Mar 15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className={`transition-all duration-600 ${matched ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <div className="bg-green-500/10 border border-green-500/25 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-4 h-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-green-400 font-semibold text-sm">Auto-applied — no action needed</p>
          </div>
          <p className="text-slate-400 text-xs">Invoice #1042 marked paid. QuickBooks updated automatically.</p>
        </div>
      </div>

      <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 flex justify-between text-xs">
        <span className="text-slate-400">Auto-applied this month</span>
        <span className="text-blue-400 font-semibold">91% of payments</span>
      </div>
    </div>
  );
}

// ── Chapter data ───────────────────────────────────────────────────────────────

const chapters = [
  {
    step: "01",
    label: "Invoice Creation",
    title: "Job complete. Invoice out.",
    body: "The moment a job is marked complete, LunarLogic generates the invoice, pulls the correct client details, and sends it — automatically. No manual entry, no delay, no billing that slips through the cracks because someone was busy.",
    stat: { value: "84%", label: "faster invoice processing" },
    mockup: <InvoiceMockup />,
  },
  {
    step: "02",
    label: "Payment Reminders",
    title: "Stop sending the same email. Again.",
    body: "Every overdue invoice triggers an automatic reminder sequence — Day 3, 7, 14, 21 — professionally worded, sent from your business. Clients who always pay late get pressure. Long-standing relationships get a lighter touch. You get out of the follow-up business entirely.",
    stat: { value: "0", label: "manual follow-up calls" },
    mockup: <ReminderMockup />,
  },
  {
    step: "03",
    label: "Cash Application",
    title: "Payments matched and applied by AI.",
    body: "When a payment arrives, AI matches it to the correct open invoice. Above 90% confidence — applied automatically, your accounting system updated, done. Below that threshold, you get a one-click prompt. Phantom AR is eliminated.",
    stat: { value: "91%", label: "of payments auto-applied" },
    mockup: <CashMockup />,
  },
  {
    step: "04",
    label: "AR Dashboard",
    title: "Your DSO — live, not at month-end.",
    body: "A real-time dashboard shows your DSO trend, aging buckets, and which clients are drifting late. The go-live date is annotated on the trend line so you see exactly when the curve started bending down. That line is the ROI.",
    stat: { value: "19", label: "day DSO reduction (Kaptain Clean)" },
    mockup: <DashboardMockup />,
  },
];

// ── Mobile card ───────────────────────────────────────────────────────────────

function MobileChapterCard({ chapter }: { chapter: typeof chapters[number] }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Step {chapter.step}</span>
        <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-0.5 rounded-full">
          {chapter.label}
        </span>
      </div>
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

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
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
    <div ref={containerRef} style={{ height: `${chapters.length * 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-slate-950 flex flex-col">
        <div className="flex-shrink-0 pt-10 pb-4 text-center">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">How It Works</p>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-2 gap-12 items-center min-h-0">
          <div className="flex flex-col justify-center pr-8">
            <div
              className="transition-all duration-300 ease-out"
              style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(16px)" : "translateY(0)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Step {chapter.step}</span>
                <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                  {chapter.label}
                </span>
              </div>
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

        <div className="flex-shrink-0 pb-6 flex items-center justify-center gap-4 sm:gap-6">
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
      </div>
    </div>
  );
}

// ── Mobile showcase with scroll animations ────────────────────────────────────

function MobileShowcase() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { threshold: 0.4 }
      );
      obs.observe(card);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return (
    <div className="lg:hidden bg-slate-950 py-16 px-4 sm:px-6">
      <div className="text-center mb-10">
        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">How It Works</p>
      </div>

      {/* Sticky step-progress pill */}
      <div className="sticky top-[64px] z-10 flex justify-center mb-8 pointer-events-none">
        <div className="flex items-center gap-3 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 rounded-full px-5 py-2.5 shadow-xl">
          {chapters.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <div
                className={`rounded-full transition-all duration-300 ${
                  i === activeStep ? "w-6 h-1.5 bg-blue-400" : "w-1.5 h-1.5 bg-slate-600"
                }`}
              />
              {i === activeStep && (
                <span className="text-xs text-blue-400 font-semibold whitespace-nowrap">{c.label}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {chapters.map((chapter, i) => (
          <div key={chapter.step} ref={(el) => { cardRefs.current[i] = el; }}>
            <ScrollReveal animation={i % 2 === 0 ? "slide-left" : "slide-right"}>
              <MobileChapterCard chapter={chapter} />
            </ScrollReveal>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function FeatureShowcase() {
  return (
    <>
      {/* Mobile: scroll-animated cards */}
      <MobileShowcase />

      {/* Desktop: sticky scroll */}
      <div className="hidden lg:block">
        <DesktopShowcase />
      </div>
    </>
  );
}
