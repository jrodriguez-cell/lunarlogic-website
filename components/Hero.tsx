"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    text: "Invoice #1042 created for Acme Corp",
    meta: "Slack → QuickBooks",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    ),
  },
  {
    text: "Reminder sent, Day 7 follow-up",
    meta: "Delivered",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
    ),
  },
  {
    text: "Payment matched, $4,200.00",
    meta: "97% confidence",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    ),
  },
  {
    text: "QuickBooks updated automatically",
    meta: "0 manual entry",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    ),
  },
];

function CheckBadge() {
  return (
    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function StepIcon({ path, state }: { path: React.ReactNode; state: "pending" | "active" | "done" }) {
  return (
    <div className="relative flex-shrink-0">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors duration-300 ${
          state === "done"
            ? "bg-green-500/15 border-green-500/40 text-green-400"
            : state === "active"
            ? "bg-blue-500/15 border-blue-400/50 text-blue-400"
            : "bg-slate-800 border-slate-700 text-slate-600"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          {path}
        </svg>
      </div>
      {state === "active" && (
        <span className="absolute inset-0 rounded-full border-2 border-blue-400/40 animate-ping" />
      )}
      {state === "done" && (
        <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-green-500 flex items-center justify-center border-2 border-slate-900">
          <CheckBadge />
        </span>
      )}
    </div>
  );
}

function AutomationPipelineCard() {
  const [doneCount, setDoneCount] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) {
      setDoneCount(STEPS.length);
      return;
    }

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const wait = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        if (!cancelled) fn();
      }, ms);
      timeouts.push(t);
    };

    function typeStep(idx: number) {
      if (cancelled) return;
      if (idx >= STEPS.length) {
        wait(() => {
          setDoneCount(0);
          setTypedText("");
          typeStep(0);
        }, 2600);
        return;
      }
      const text = STEPS[idx].text;
      let i = 0;
      const typeChar = () => {
        if (cancelled) return;
        i++;
        setTypedText(text.slice(0, i));
        if (i < text.length) {
          wait(typeChar, 16 + Math.random() * 18);
        } else {
          wait(() => {
            setDoneCount(idx + 1);
            setTypedText("");
            typeStep(idx + 1);
          }, 600);
        }
      };
      typeChar();
    }

    typeStep(0);
    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="w-full max-w-sm bg-slate-900/90 backdrop-blur border border-slate-700/60 rounded-2xl shadow-2xl shadow-blue-500/10 p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="url(#feedMoonGrad)" />
            <defs>
              <linearGradient id="feedMoonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Automation Pipeline</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">Live</span>
        </div>
      </div>

      {/* Pipeline */}
      <div>
        {STEPS.map((step, i) => {
          const isDone = i < doneCount;
          const isActive = !reducedMotion && i === doneCount;
          const state = isDone ? "done" : isActive ? "active" : "pending";
          const isLast = i === STEPS.length - 1;
          return (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <StepIcon path={step.icon} state={state} />
                {!isLast && (
                  <div className="w-px flex-1 my-1 bg-slate-700 relative overflow-hidden" style={{ minHeight: "22px" }}>
                    <div
                      className={`absolute inset-x-0 top-0 bg-green-500/60 transition-[height] duration-500 ease-out ${
                        isDone ? "h-full" : "h-0"
                      }`}
                    />
                  </div>
                )}
              </div>
              <div className={`min-w-0 pt-1.5 ${isLast ? "pb-0" : "pb-4"}`}>
                <p className={`text-sm font-medium leading-snug transition-colors duration-300 ${state === "pending" ? "text-slate-600" : "text-slate-200"}`}>
                  {state === "done" ? step.text : state === "active" ? typedText : step.text}
                  {state === "active" && (
                    <span className="inline-block w-[2px] h-[13px] bg-blue-400 ml-0.5 align-middle animate-pulse" />
                  )}
                </p>
                <p
                  className={`text-xs text-slate-500 mt-0.5 transition-opacity duration-300 ${
                    state === "done" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {step.meta}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer stat */}
      <div className="mt-1 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs">
        <span className="text-slate-500">13 actions today</span>
        <span className="text-blue-400 font-semibold">0 manual</span>
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const cardLayerRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  // Scroll-driven handoff: the card racks focus and recedes as it scrolls
  // past, while a shared CSS variable ramps up the demo video section's
  // glow to meet it. Tied to the visual's own position (not the whole
  // hero section) so it can't start receding before the card has even
  // scrolled into view, which is what happened on mobile's taller,
  // stacked layout.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const visual = visualRef.current;
    if (!visual) return;

    let raf: number | null = null;
    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

    const update = () => {
      const rect = visual.getBoundingClientRect();
      const progress = clamp01(-rect.top / (rect.height * 0.85));

      if (glowLayerRef.current) {
        glowLayerRef.current.style.transform = `translateY(${(-progress * 10).toFixed(1)}px)`;
        glowLayerRef.current.style.opacity = (1 - progress * 0.5).toFixed(3);
      }
      if (cardLayerRef.current) {
        const scale = 1 - progress * 0.08;
        cardLayerRef.current.style.transform = `translateY(${(-progress * 34).toFixed(1)}px) scale(${scale.toFixed(3)})`;
        cardLayerRef.current.style.opacity = (1 - progress * 0.55).toFixed(3);
        cardLayerRef.current.style.filter = `blur(${(progress * 4).toFixed(2)}px)`;
      }
      document.documentElement.style.setProperty("--hero-exit", progress.toFixed(3));
      raf = null;
    };

    const onScroll = () => {
      if (raf === null) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf !== null) cancelAnimationFrame(raf);
      document.documentElement.style.setProperty("--hero-exit", "0");
    };
  }, []);

  // Magnetic pull on the primary CTA, scoped to the hero section.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    let raf: number | null = null;
    let x = 0;
    let y = 0;

    const apply = () => {
      if (ctaRef.current) {
        const btnRect = ctaRef.current.getBoundingClientRect();
        const sectionRect = section.getBoundingClientRect();
        const cx = btnRect.left - sectionRect.left + btnRect.width / 2;
        const cy = btnRect.top - sectionRect.top + btnRect.height / 2;
        const dx = x - cx;
        const dy = y - cy;
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(btnRect.width, btnRect.height) / 2 + 70;
        if (dist < radius) {
          const pull = (1 - dist / radius) * 0.32;
          ctaRef.current.style.transform = `translate(${(dx * pull).toFixed(1)}px, ${(dy * pull).toFixed(1)}px) scale(${(1 + pull * 0.12).toFixed(3)})`;
        } else {
          ctaRef.current.style.transform = "translate(0px, 0px) scale(1)";
        }
      }
      raf = null;
    };

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (raf === null) raf = requestAnimationFrame(apply);
    };

    section.addEventListener("mousemove", onMove);
    return () => {
      section.removeEventListener("mousemove", onMove);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-slate-950 pt-20 pb-20 sm:pt-28 sm:pb-28"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-8 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
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
                ref={ctaRef}
                href="/contact"
                className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-[background-color,transform] duration-200 ease-out shadow-lg shadow-blue-500/25"
                style={{ willChange: "transform" }}
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

          {/* Automation pipeline visual */}
          <div
            ref={visualRef}
            className="relative flex items-center justify-center min-h-[320px] sm:min-h-[360px] lg:min-h-[440px]"
          >
            {/* Glow (background layer) */}
            <div ref={glowLayerRef} aria-hidden="true" className="absolute" style={{ willChange: "transform, opacity" }}>
              <div className="w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            {/* Pipeline card (foreground layer, racks focus on scroll) */}
            <div
              ref={cardLayerRef}
              className="relative rotate-[-1.5deg]"
              style={{ willChange: "transform, opacity, filter" }}
            >
              <AutomationPipelineCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
