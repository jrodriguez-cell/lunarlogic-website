"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrollY = window.scrollY;
      const scale = 1 + scrollY * 0.0003;
      const opacity = Math.max(0, 1 - scrollY * 0.002);
      bgRef.current.style.transform = `scale(${scale})`;
      bgRef.current.style.opacity = String(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-slate-950 pt-20 pb-24 sm:pt-28 sm:pb-32">
      {/* Background gradient — parallax zoom on scroll */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none transition-none"
        style={{ transformOrigin: "center top", willChange: "transform, opacity" }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <span className="text-sm text-blue-300 font-medium">AI-Powered Accounting Automation</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight text-balance">
          Turn what you have{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            already earned
          </span>
          {" "}into cash in your bank account.
        </h1>

        {/* Subheadline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          The money is already there — legally owed, sitting in your aging report. LunarLogic collects it. No manual follow-up. No chasing.
        </p>

        {/* Tagline */}
        <p className="mt-4 text-base text-slate-500 italic max-w-xl mx-auto">
          So you can rest assured — your accounting is working while you sleep.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
          >
            Get a Demo
          </Link>
          <Link
            href="/calculate"
            className="w-full sm:w-auto border border-blue-500/40 hover:border-blue-400 text-blue-300 hover:text-blue-200 px-8 py-3.5 rounded-xl text-base font-semibold transition-all"
          >
            Calculate My DSO →
          </Link>
        </div>

        {/* Social Proof Bar */}
        <div className="mt-16 inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 bg-slate-800/60 border border-slate-700 rounded-2xl px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <span className="text-blue-400 text-sm font-bold">KC</span>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">Kaptain Clean LLC</p>
              <p className="text-sm font-semibold text-white">19-day DSO improvement</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-8 bg-slate-700" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-xs text-slate-400">Invoice Processing</p>
              <p className="text-sm font-semibold text-white">84% faster processing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
