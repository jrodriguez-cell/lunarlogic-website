import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "The AR problems LunarLogic was built to solve — and what changes when the solution is in place.",
};

const USE_CASES = [
  {
    number: "01",
    problem: "Invoices leave late — or not at all",
    situation:
      "Work gets completed but billing lags behind. Invoices are created manually days after job completion, sit in a queue, or slip through entirely on a busy week. Every day of billing delay adds to DSO before the clock even starts.",
    fix: [
      "Invoice generation triggered automatically on job completion, contract date, or recurring billing schedule",
      "Same-day delivery to every client, every cycle — no manual steps, no queue",
      "Missed-billing alerts surface any account that hasn't been invoiced on schedule",
    ],
    outcomes: [
      { value: "84%", label: "faster invoice processing" },
      { value: "Same-day", label: "invoices out after job completion" },
      { value: "Zero", label: "missed billing cycles since go-live" },
    ],
    accent: "blue",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
  },
  {
    number: "02",
    problem: "Outstanding invoices with no follow-up system",
    situation:
      "Once an invoice is sent, it disappears. Follow-up only happens when someone remembers — usually when cash gets tight. By then the invoice is 45 days overdue and the client has mentally moved on.",
    fix: [
      "5-touch automated reminder sequence at Day 3, 7, 14, 21, and 30 past due",
      "Tone and timing calibrated by client tier — long-term accounts get a lighter touch, newer clients escalate faster",
      "Owner is looped in only when a specific account requires personal judgment",
    ],
    outcomes: [
      { value: "~40%", label: "reduction in days-to-payment" },
      { value: "5-touch", label: "automated reminder cadence" },
      { value: "Zero", label: "manual follow-up required" },
    ],
    accent: "indigo",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
      </svg>
    ),
  },
  {
    number: "03",
    problem: "Bad debt written off as inevitable",
    situation:
      "Every year, some AR gets written off. $10K, $15K, $20K — it becomes normalized as a cost of doing business. But bad debt is a symptom of catching at-risk accounts too late, not an industry constant.",
    fix: [
      "AI Dispute Monitor flags accounts paying significantly later than their own historical average",
      "High-risk invoices surface before they age past the point of easy collection",
      "Complete communication audit trail maintained for any formal dispute or escalation",
    ],
    outcomes: [
      { value: "$0", label: "bad debt after go-live" },
      { value: "$18K", label: "average prior annual write-off" },
      { value: "Early", label: "at-risk detection before it's too late" },
    ],
    accent: "emerald",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    number: "04",
    problem: "The owner is the de facto collections department",
    situation:
      "Nobody else follows up consistently, so the owner does it. Personal calls, awkward emails to clients they also need to retain. It works — but it costs 4–6 hours a week and creates friction in relationships that should stay focused on the next project.",
    fix: [
      "Fully automated sequences run from the business, professionally toned, without owner involvement",
      "Daily AR summary pushed to Slack or Teams — a 10-second read every morning, no dashboard login needed",
      "Escalations surface only the specific accounts that genuinely need a personal call",
    ],
    outcomes: [
      { value: "4–6 hrs", label: "reclaimed per week by the owner" },
      { value: "Zero", label: "personal collections calls required" },
      { value: "Daily", label: "automated AR summary in Slack or Teams" },
    ],
    accent: "violet",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    number: "05",
    problem: "No real-time visibility into what's owed",
    situation:
      "Getting a picture of outstanding AR means running a report, exporting it, and interpreting aging buckets manually. By the time you know what's happening, the data is already stale — and the at-risk accounts have aged another week.",
    fix: [
      "Live AR dashboard with aging breakdown, overdue flags, and DSO trend line updated in real time",
      "Daily push summary delivered to Slack or Teams — key numbers at a glance, no login required",
      "At-risk account flags surface early, before accounts age into write-off territory",
    ],
    outcomes: [
      { value: "Real-time", label: "AR visibility, no manual exports" },
      { value: "Daily", label: "automated AR digest" },
      { value: "Proactive", label: "at-risk alerts before accounts go stale" },
    ],
    accent: "cyan",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    number: "06",
    problem: "Cash flow is unpredictable month to month",
    situation:
      "Revenue looks fine on the P&L but actual cash arriving varies wildly. Planning for payroll, equipment, or growth requires guesswork because DSO is inconsistent and hard to project month to month.",
    fix: [
      "Consistent reminder cadence compresses DSO into a predictable, repeatable range",
      "DSO trend tracking makes month-to-month cash arrival projectable for the first time",
      "Working capital trapped in aging AR gets released on a reliable, foreseeable schedule",
    ],
    outcomes: [
      { value: "~40%", label: "typical DSO reduction" },
      { value: "Predictable", label: "monthly cash arrival window" },
      { value: "60 days", label: "to material improvement, typically" },
    ],
    accent: "orange",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
  },
];

const ACCENT_COLORS: Record<string, { icon: string; badge: string; dot: string; metric: string; border: string }> = {
  blue:    { icon: "text-blue-400 bg-blue-500/10",   badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",   dot: "bg-blue-400",    metric: "text-blue-400",    border: "border-blue-500/20" },
  indigo:  { icon: "text-indigo-400 bg-indigo-500/10", badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", dot: "bg-indigo-400", metric: "text-indigo-400", border: "border-indigo-500/20" },
  emerald: { icon: "text-emerald-400 bg-emerald-500/10", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", metric: "text-emerald-400", border: "border-emerald-500/20" },
  violet:  { icon: "text-violet-400 bg-violet-500/10", badge: "text-violet-400 bg-violet-500/10 border-violet-500/20", dot: "bg-violet-400", metric: "text-violet-400", border: "border-violet-500/20" },
  cyan:    { icon: "text-cyan-400 bg-cyan-500/10",   badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",   dot: "bg-cyan-400",    metric: "text-cyan-400",    border: "border-cyan-500/20" },
  orange:  { icon: "text-orange-400 bg-orange-500/10", badge: "text-orange-400 bg-orange-500/10 border-orange-500/20", dot: "bg-orange-400", metric: "text-orange-400", border: "border-orange-500/20" },
};

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Use Cases</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              The problems we were built to solve.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Most AR problems aren&apos;t unique — they follow the same patterns across every owner-operated service business.
              Here&apos;s what we see most often, and exactly what changes when LunarLogic is in place.
            </p>
          </ScrollReveal>

          {/* Quick-jump nav */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="mt-10 flex flex-wrap justify-center gap-2">
              {USE_CASES.map((uc) => (
                <a
                  key={uc.number}
                  href={`#uc-${uc.number}`}
                  className="text-xs font-medium text-slate-400 hover:text-white bg-slate-800/60 border border-slate-700 hover:border-slate-600 px-3 py-1.5 rounded-full transition-colors"
                >
                  {uc.problem.split(" ").slice(0, 4).join(" ")}…
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Use cases */}
      <div className="bg-slate-950">
        {USE_CASES.map((uc, i) => {
          const colors = ACCENT_COLORS[uc.accent];
          return (
            <section
              key={uc.number}
              id={`uc-${uc.number}`}
              className={`py-16 sm:py-20 border-b border-slate-800 ${i % 2 === 1 ? "bg-slate-900/40" : ""}`}
            >
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <ScrollReveal animation="fade-up">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-start">

                    {/* Left — problem + solution */}
                    <div className="lg:col-span-3">
                      <div className="flex items-center gap-3 mb-5">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                          {uc.icon}
                        </div>
                        <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colors.badge}`}>
                          Problem {uc.number}
                        </span>
                      </div>

                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight mb-4">
                        {uc.problem}
                      </h2>

                      <p className="text-slate-400 leading-relaxed mb-8">
                        {uc.situation}
                      </p>

                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                          How LunarLogic fixes it
                        </p>
                        <ul className="space-y-3">
                          {uc.fix.map((item, fi) => (
                            <li key={fi} className="flex items-start gap-3">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                              <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Right — outcomes */}
                    <div className="lg:col-span-2">
                      <div className={`bg-slate-800/50 border rounded-2xl p-6 ${colors.border}`}>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
                          The outcome
                        </p>
                        <div className="space-y-4">
                          {uc.outcomes.map((outcome, oi) => (
                            <div key={oi} className={`pb-4 ${oi < uc.outcomes.length - 1 ? "border-b border-slate-700/60" : ""}`}>
                              <p className={`text-2xl font-extrabold mb-0.5 ${colors.metric}`}>
                                {outcome.value}
                              </p>
                              <p className="text-sm text-slate-400">{outcome.label}</p>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-5 border-t border-slate-700/60">
                          <Link
                            href="/calculate"
                            className="block text-center text-sm font-semibold text-white bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-500/40 px-4 py-3 rounded-xl transition-colors"
                          >
                            Calculate your own numbers →
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </ScrollReveal>
              </div>
            </section>
          );
        })}
      </div>

      {/* Proof bridge */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">See It In Practice</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              These aren&apos;t hypotheticals.
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              Every use case above maps to a live client result. Read the case studies to see the same problems — with real company names, real timelines, and real numbers attached.
            </p>
            <Link
              href="/case-studies"
              className="inline-block border border-blue-500/40 hover:border-blue-400 text-blue-300 hover:text-blue-200 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            >
              Read Client Case Studies →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="Which of these sounds like your business?"
        subheading="Answer 4 questions and get a personalized dashboard showing your DSO, your cash gap, and what changes when LunarLogic is running."
        ctaText="Calculate My DSO →"
        ctaHref="/calculate"
      />
    </>
  );
}
