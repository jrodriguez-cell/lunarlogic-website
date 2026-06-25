import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "See how LunarLogic clients are cutting DSO and automating AR. Kaptain Clean LLC: 19-day DSO improvement, 84% faster invoice processing.",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Client Results</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Real numbers. Real firms.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            LunarLogic clients are not cutting days off their DSO in theory — these results are live in production.
          </p>
        </div>
      </section>

      {/* Kaptain Clean — Featured */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-3xl overflow-hidden">
            {/* Badge */}
            <div className="bg-blue-600 px-6 py-2 text-xs font-bold text-white uppercase tracking-widest w-max">
              Featured Client
            </div>

            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-blue-500/20 rounded-2xl flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-lg">KC</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Kaptain Clean LLC</h2>
                  <p className="text-slate-400 text-sm">Professional Services — Live on LunarLogic</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600">
                  <p className="text-4xl font-extrabold text-blue-400 mb-1">19</p>
                  <p className="text-sm text-slate-300 font-medium">Days DSO Reduced</p>
                  <p className="text-xs text-slate-500 mt-1">vs. pre-LunarLogic baseline</p>
                </div>
                <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600">
                  <p className="text-4xl font-extrabold text-blue-400 mb-1">84%</p>
                  <p className="text-sm text-slate-300 font-medium">Faster Invoice Processing</p>
                  <p className="text-xs text-slate-500 mt-1">from sales order to sent invoice</p>
                </div>
                <div className="bg-slate-700/30 rounded-2xl p-6 text-center border border-slate-600">
                  <p className="text-4xl font-extrabold text-blue-400 mb-1">0</p>
                  <p className="text-sm text-slate-300 font-medium">Manual Reminder Calls</p>
                  <p className="text-xs text-slate-500 mt-1">fully automated follow-up</p>
                </div>
              </div>

              {/* Story */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">The Challenge</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Kaptain Clean is a growing professional services firm with a high volume of recurring service invoices.
                    Before LunarLogic, every invoice required manual data entry into QuickBooks, followed by email or phone
                    follow-ups on overdue payments. The AR function was consuming multiple staff hours per week, and DSO was
                    creeping upward as the client base expanded.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">The Solution</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    LunarLogic deployed Workflow 1A/1B for invoice creation and Workflow 2 for automated payment reminders.
                    Sales orders now arrive via Slack (PDF or text), are parsed by Claude AI, validated against QuickBooks,
                    and routed for one-click approval — all in Slack. Overdue reminders are sent automatically via Outlook
                    every weekday morning.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">The Results</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    Within 60 days of go-live, invoice processing time dropped 84%. DSO fell by 19 days — a cash flow
                    improvement that compounded every billing cycle. Staff time previously spent on invoicing and collections
                    was redirected to billable work.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Workflows Deployed</h3>
                  <ul className="space-y-2">
                    {[
                      "WF1A/1B — Sales Order & Invoice Creation",
                      "WF2 — Proactive Payment Reminders",
                      "WF4 — AR Aging Dashboard (in progress)",
                    ].map((wf) => (
                      <li key={wf} className="flex items-center gap-2.5 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {wf}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="mt-10 border-l-4 border-blue-500 pl-6">
                <p className="text-lg text-slate-300 italic leading-relaxed">
                  &ldquo;Before LunarLogic, invoicing was a full afternoon of manual work. Now our sales orders go straight
                  from Slack to QuickBooks in minutes. We&apos;re collecting faster, our books are cleaner, and I can see
                  exactly where every dollar is at a glance.&rdquo;
                </p>
                <footer className="mt-3 text-sm text-slate-400">— Kaptain Clean LLC</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Gualapack */}
      <section className="py-12 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 sm:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                <span className="text-indigo-400 font-bold">GP</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Gualapack</h2>
                <p className="text-slate-400 text-sm">Live on WF2 — Proactive Payment Reminders</p>
              </div>
              <span className="ml-auto text-xs font-semibold bg-green-500/10 text-green-400 border border-green-500/20 px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Gualapack deployed Workflow 2 for automated payment reminders sent via Outlook. Daily AR aging summaries
              are posted to their Slack channel every weekday morning, giving the finance team full visibility without
              manual reporting.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Automated Payment Reminders", "Outlook / Graph API", "Daily Slack AR Summary"].map((tag) => (
                <span key={tag} className="text-xs bg-slate-700 text-slate-300 border border-slate-600 px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Your Firm Next */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Your firm could be next</h2>
          <p className="text-slate-400 mb-8">
            Every professional services firm with 8–20 employees running QuickBooks Online and Slack is a fit. If
            that&apos;s you, we can estimate your DSO improvement before we ever charge you a dollar.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
          >
            Get a DSO Estimate
          </Link>
        </div>
      </section>

      <CTASection
        heading="Ready to write your own case study?"
        subheading="Book a demo and we will show you exactly how LunarLogic would work for your firm."
        ctaText="Book a Demo"
      />
    </>
  );
}
