"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowLayerRef = useRef<HTMLDivElement>(null);
  const ring1LayerRef = useRef<HTMLDivElement>(null);
  const ring2LayerRef = useRef<HTMLDivElement>(null);
  const moonLayerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const [spotlightOn, setSpotlightOn] = useState(false);

  // Scroll-driven handoff: the moon graphic racks focus and recedes in
  // depth-ordered layers as the hero scrolls past, while a shared CSS
  // variable ramps up the demo video section's glow to meet it.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    let raf: number | null = null;
    const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

    const update = () => {
      const rect = section.getBoundingClientRect();
      const progress = clamp01(-rect.top / (rect.height * 0.85));

      if (glowLayerRef.current) {
        glowLayerRef.current.style.transform = `translateY(${(-progress * 8).toFixed(1)}px)`;
        glowLayerRef.current.style.opacity = (1 - progress * 0.5).toFixed(3);
      }
      if (ring1LayerRef.current) {
        ring1LayerRef.current.style.transform = `translateY(${(-progress * 24).toFixed(1)}px)`;
        ring1LayerRef.current.style.opacity = (1 - progress * 0.55).toFixed(3);
      }
      if (ring2LayerRef.current) {
        ring2LayerRef.current.style.transform = `translateY(${(-progress * 16).toFixed(1)}px)`;
        ring2LayerRef.current.style.opacity = (1 - progress * 0.5).toFixed(3);
      }
      if (moonLayerRef.current) {
        const scale = 1 - progress * 0.14;
        moonLayerRef.current.style.transform = `translateY(${(-progress * 46).toFixed(1)}px) scale(${scale.toFixed(3)})`;
        moonLayerRef.current.style.opacity = (1 - progress * 0.6).toFixed(3);
        moonLayerRef.current.style.filter = `blur(${(progress * 6).toFixed(2)}px)`;
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

  // Cursor-reactive spotlight + magnetic pull on the primary CTA, both
  // scoped to the hero section so they only engage while hovering here.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const section = sectionRef.current;
    if (!section) return;

    let raf: number | null = null;
    let x = 0;
    let y = 0;

    const apply = () => {
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate(${(x - 280).toFixed(1)}px, ${(y - 280).toFixed(1)}px)`;
      }
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
      onMouseEnter={() => setSpotlightOn(true)}
      onMouseLeave={() => setSpotlightOn(false)}
      className="relative overflow-hidden bg-slate-950 pt-20 pb-20 sm:pt-28 sm:pb-28"
    >
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

          {/* Moon visual */}
          <div
            className="relative flex items-center justify-center h-[280px] sm:h-[360px] lg:h-[440px]"
            aria-hidden="true"
          >
            {/* Cursor spotlight */}
            <div
              ref={spotlightRef}
              className={`absolute left-0 top-0 w-[560px] h-[560px] rounded-full pointer-events-none transition-opacity duration-500 ${
                spotlightOn ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle, rgba(148,180,250,0.16) 0%, rgba(96,165,250,0.06) 40%, transparent 70%)",
                willChange: "transform",
              }}
            />

            {/* Glow (background layer) */}
            <div ref={glowLayerRef} className="absolute" style={{ willChange: "transform, opacity" }}>
              <div className="w-[260px] h-[260px] lg:w-[340px] lg:h-[340px] bg-blue-500/20 rounded-full blur-3xl" />
            </div>

            {/* Orbit ring — outer */}
            <div ref={ring2LayerRef} className="absolute" style={{ willChange: "transform, opacity" }}>
              <div
                className="w-[340px] h-[340px] lg:w-[460px] lg:h-[460px] rounded-full border border-indigo-400/15 animate-spin-slow"
              />
            </div>

            {/* Orbit ring — inner, plus stars */}
            <div ref={ring1LayerRef} className="absolute" style={{ willChange: "transform, opacity" }}>
              <div
                className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full border border-blue-400/15"
                style={{ transform: "rotate(-14deg) scaleY(0.86)" }}
              />
              <span className="absolute top-10 right-10 lg:right-6 w-1.5 h-1.5 rounded-full bg-blue-300/70" />
              <span className="absolute bottom-16 left-4 lg:left-0 w-1 h-1 rounded-full bg-indigo-300/60 animate-pulse" />
              <span className="absolute top-24 left-10 lg:left-8 w-1 h-1 rounded-full bg-white/40" />
            </div>

            {/* Crescent moon (foreground layer, racks focus on scroll) */}
            <div ref={moonLayerRef} className="relative" style={{ willChange: "transform, opacity, filter" }}>
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
      </div>
    </section>
  );
}
