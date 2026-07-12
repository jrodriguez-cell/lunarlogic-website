"use client";

import { useEffect, useState } from "react";

export interface PipelineStep {
  text: string;
  meta: string;
  icon: React.ReactNode;
}

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

export default function AutomationPipeline({
  label,
  steps,
  footerLeft,
  footerRight,
}: {
  label: string;
  steps: PipelineStep[];
  footerLeft: string;
  footerRight: string;
}) {
  const [doneCount, setDoneCount] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReduced);
    if (prefersReduced) {
      setDoneCount(steps.length);
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
      if (idx >= steps.length) {
        wait(() => {
          setDoneCount(0);
          setTypedText("");
          typeStep(0);
        }, 2600);
        return;
      }
      const text = steps[idx].text;
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
  }, [steps]);

  return (
    <div className="w-full max-w-sm bg-slate-900/90 backdrop-blur border border-slate-700/60 rounded-2xl shadow-2xl shadow-blue-500/10 p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="url(#pipelineMoonGrad)" />
            <defs>
              <linearGradient id="pipelineMoonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#818CF8" />
              </linearGradient>
            </defs>
          </svg>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-green-400">Live</span>
        </div>
      </div>

      {/* Pipeline */}
      <div>
        {steps.map((step, i) => {
          const isDone = i < doneCount;
          const isActive = !reducedMotion && i === doneCount;
          const state = isDone ? "done" : isActive ? "active" : "pending";
          const isLast = i === steps.length - 1;
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
        <span className="text-slate-500">{footerLeft}</span>
        <span className="text-blue-400 font-semibold">{footerRight}</span>
      </div>
    </div>
  );
}
