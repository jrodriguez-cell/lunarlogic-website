"use client";

import { useEffect, useRef, useState } from "react";

// ── DSO Chart mockup ──────────────────────────────────────────────────────────

function DSOChart({
  before,
  after,
  color,
  goLiveAt,
  variant = 0,
}: {
  before: number;
  after: number;
  color: string;
  goLiveAt: number;
  variant?: number;
}) {
  const total = 12;
  const pts = Array.from({ length: total + 1 }, (_, i) => {
    const t = i / total;
    if (t < goLiveAt) {
      if (variant === 0) {
        // KC: volatile/bouncy before go-live — inconsistent payment behavior
        return before + Math.sin(i * 2.4) * 3.2 + Math.cos(i * 1.1) * 1.6;
      } else if (variant === 1) {
        // MF: slow upward drift — DSO gradually worsening before intervention
        const drift = (t / goLiveAt) * 5;
        return before - 5 + drift + Math.sin(i * 1.6 + 0.8) * 1.4;
      } else {
        // HC: flat and elevated — consistent but chronically late payers
        return before + Math.sin(i * 0.8 + 2.0) * 1.3 + Math.cos(i * 1.9) * 0.6;
      }
    }
    const progress = (t - goLiveAt) / (1 - goLiveAt);
    let eased: number;
    if (variant === 0) {
      // KC: quick steep drop then stabilizes
      eased = 1 - Math.pow(1 - progress, 2);
    } else if (variant === 1) {
      // MF: more gradual, linear-ish recovery
      eased = 1 - Math.pow(1 - progress, 1.4);
    } else {
      // HC: fast initial drop, very clean
      eased = 1 - Math.pow(1 - progress, 2.8);
    }
    const postJitter = variant === 0
      ? Math.sin(i * 1.7) * 0.9
      : variant === 1
      ? Math.sin(i * 2.3 + 1.2) * 1.1
      : Math.sin(i * 1.1 + 3.0) * 0.4;
    return before - (before - after) * eased + postJitter;
  });

  const minY = after - 4;
  const maxY = before + 8;
  const range = maxY - minY;
  const svgH = 64;
  const svgW = 200;

  const toX = (i: number) => (i / total) * svgW;
  const toY = (v: number) => svgH - ((v - minY) / range) * svgH;

  const pathD = pts.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i).toFixed(1)},${toY(v).toFixed(1)}`).join(" ");
  const areaD = `${pathD} L${svgW},${svgH} L0,${svgH} Z`;
  const glX = (goLiveAt * svgW).toFixed(1);
  const glXPct = `${(goLiveAt * 100).toFixed(1)}%`;

  return (
    <div className="relative h-16">
      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(59,130,246)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="rgb(59,130,246)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#grad-${color})`} />
        <path d={pathD} fill="none" stroke="rgb(59,130,246)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1={glX} y1="0" x2={glX} y2={svgH} stroke="rgb(34,197,94)" strokeWidth="1" strokeDasharray="3,2" />
      </svg>
      {/* Label outside SVG — avoids stretch from preserveAspectRatio="none" */}
      <div
        className="absolute top-0.5 text-green-400 font-medium leading-none"
        style={{ left: `calc(${glXPct} + 3px)`, fontSize: "9px" }}
      >
        Go-live
      </div>
    </div>
  );
}

// ── Client mockup cards ───────────────────────────────────────────────────────

function KaptainCleanMockup() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <span className="text-blue-400 font-bold text-sm">KC</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Kaptain Clean LLC</p>
            <p className="text-slate-400 text-xs">Commercial Cleaning · Charlotte, NC</p>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Days to Get Paid</p>
        <DSOChart before={52} after={33} color="kc" goLiveAt={0.4} variant={0} />
        <div className="flex justify-between text-xs mt-2">
          <span className="text-slate-500">Before: 52 days</span>
          <span className="text-blue-400 font-semibold">After: 33 days</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "84%", label: "faster invoicing" },
          { value: "$65K", label: "cash freed from AR" },
        ].map((m) => (
          <div key={m.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-blue-400">{m.value}</p>
            <p className="text-xs text-slate-400 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
        <p className="text-xs text-slate-300 italic leading-relaxed">
          &ldquo;I feel like I finally own my business again.&rdquo;
        </p>
        <p className="text-xs text-slate-500 mt-2">- Kaptain Clean LLC</p>
      </div>
    </div>
  );
}

function MeridianMockup() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
            <span className="text-emerald-400 font-bold text-sm">MF</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Meridian Field Services</p>
            <p className="text-slate-400 text-xs">Environmental Consulting · NetSuite</p>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Days to Get Paid</p>
        <DSOChart before={61} after={37} color="mf" goLiveAt={0.45} variant={1} />
        <div className="flex justify-between text-xs mt-2">
          <span className="text-slate-500">Before: 61 days</span>
          <span className="text-emerald-400 font-semibold">After: 37 days</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "24 days", label: "faster to get paid" },
          { value: "$112K", label: "working capital freed" },
        ].map((m) => (
          <div key={m.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-emerald-400">{m.value}</p>
            <p className="text-xs text-slate-400 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
        <p className="text-xs text-slate-300 italic leading-relaxed">
          &ldquo;Project managers were spending Fridays chasing invoices instead of closing new work. That stopped the week we went live.&rdquo;
        </p>
        <p className="text-xs text-slate-500 mt-2">- Operations Director, Meridian Field Services</p>
      </div>
    </div>
  );
}

function HalloranMockup() {
  return (
    <div className="w-full max-w-sm mx-auto space-y-3">
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center">
            <span className="text-violet-400 font-bold text-sm">HC</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">Halloran Consulting Group</p>
            <p className="text-slate-400 text-xs">HR & Compliance · Sage Intacct</p>
          </div>
        </div>

        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Days to Get Paid</p>
        <DSOChart before={48} after={32} color="hc" goLiveAt={0.5} variant={2} />
        <div className="flex justify-between text-xs mt-2">
          <span className="text-slate-500">Before: 48 days</span>
          <span className="text-violet-400 font-semibold">After: 32 days</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { value: "78%", label: "faster invoicing" },
          { value: "$0", label: "bad debt (was $18K/yr)" },
        ].map((m) => (
          <div key={m.label} className="bg-slate-800/60 border border-slate-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-violet-400">{m.value}</p>
            <p className="text-xs text-slate-400 mt-1">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-800/40 border border-slate-700 rounded-xl p-4">
        <p className="text-xs text-slate-300 italic leading-relaxed">
          &ldquo;We had $18,000 written off last year. This year we haven&apos;t written off a dollar.&rdquo;
        </p>
        <p className="text-xs text-slate-500 mt-2">- Managing Partner, Halloran Consulting Group</p>
      </div>
    </div>
  );
}

// ── Chapter data ───────────────────────────────────────────────────────────────

const chapters = [
  {
    index: "01",
    label: "Kaptain Clean LLC",
    industry: "Commercial Cleaning",
    title: "19 days faster to get paid. In 60 days.",
    body: "Manual invoicing, no systematic follow-up, growing client base. Payments were taking 52 days to arrive on average. LunarLogic deployed a custom AR automation and within two billing cycles, $65,000 in cash was permanently freed from outstanding receivables, not from new revenue but from money already owed.",
    stat: { value: "19 days", label: "faster to get paid" },
    mockup: <KaptainCleanMockup />,
  },
  {
    index: "02",
    label: "Meridian Field Services",
    industry: "Environmental Consulting",
    title: "Project managers stopped chasing invoices.",
    body: "Complex project billing, inconsistent follow-up, 90-day receivables sitting unaddressed. LunarLogic integrated with NetSuite, standardized the reminder cadence across all projects, and automated cash application. Payments arrived 24 days faster within the first two billing cycles.",
    stat: { value: "$112K", label: "working capital freed" },
    mockup: <MeridianMockup />,
  },
  {
    index: "03",
    label: "Halloran Consulting Group",
    industry: "HR & Compliance Consulting",
    title: "$18,000 in bad debt. Then zero.",
    body: "Invoices going out days late, no reminders on retainer clients, $18K written off the previous year. After LunarLogic: same-day invoicing, tiered reminder sequences by client tier, and a daily Slack AR summary. Bad debt went to zero.",
    stat: { value: "$0", label: "bad debt since go-live" },
    mockup: <HalloranMockup />,
  },
];

// ── Mobile card ───────────────────────────────────────────────────────────────

function MobileChapterCard({ chapter }: { chapter: typeof chapters[number] }) {
  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl px-4 py-5">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Case {chapter.index}</span>
        <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-2.5 py-0.5 rounded-full">
          {chapter.industry}
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
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Client Results</p>
        </div>

        <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-8 grid grid-cols-2 gap-12 items-center min-h-0">
          <div className="flex flex-col justify-center pr-8">
            <div
              className="transition-all duration-300 ease-out"
              style={{ opacity: transitioning ? 0 : 1, transform: transitioning ? "translateY(16px)" : "translateY(0)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Case {chapter.index}</span>
                <span className="text-xs font-semibold text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full">
                  {chapter.industry}
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
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function CaseStudyShowcase() {
  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="lg:hidden bg-slate-950 py-16 space-y-6">
        <div className="text-center mb-8">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest">Client Results</p>
        </div>
        {chapters.map((chapter) => (
          <MobileChapterCard key={chapter.index} chapter={chapter} />
        ))}
      </div>

      {/* Desktop: sticky scroll */}
      <div className="hidden lg:block">
        <DesktopShowcase />
      </div>
    </>
  );
}
