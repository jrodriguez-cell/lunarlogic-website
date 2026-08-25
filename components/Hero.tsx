"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import AutomationPipeline, { PipelineStep } from "@/components/AutomationPipeline";

const BUILD_STEPS: PipelineStep[] = [
  {
    text: "Discovery call — found the real bottleneck",
    meta: "process walkthrough",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.2-5.2m2.2-5.3a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
    ),
  },
  {
    text: "Custom build scoped to your workflow",
    meta: "not a template",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.88-5.88m-3.7 3.8a4.5 4.5 0 01-5.98-5.98l3.28 3.28a3 3 0 002.25-2.25L7.94 6.94a4.5 4.5 0 016.34 4.49" />
    ),
  },
  {
    text: "Shadow-tested against your process",
    meta: "runs in parallel first",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    ),
  },
  {
    text: "Entries prepared for your review",
    meta: "you approve & post",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

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
                Custom, Discovery-First Automation
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
              LunarLogic isn&apos;t a fixed product or an AR tool. We start with a conversation, find the bottleneck
              that&apos;s actually costing you time, and build the custom accounting system that fixes it, inside the
              QuickBooks you already run. AR, AP, and month-end close are just common places that conversation leads.
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
              <AutomationPipeline
                label="How a build comes together"
                steps={BUILD_STEPS}
                footerLeft="Discovery-first"
                footerRight="you stay in control"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
