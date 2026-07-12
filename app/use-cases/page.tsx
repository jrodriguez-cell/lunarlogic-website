import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import UseCaseShowcase from "@/components/UseCaseShowcase";
import AutomationPipeline, { PipelineStep } from "@/components/AutomationPipeline";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Every AR, AP, and accounting problem LunarLogic was built to solve, and what the business looks like after.",
};

const SUITE_NAV = [
  { id: "ar",   name: "AR Automation Suite" },
  { id: "ap",   name: "AP Automation Suite" },
  { id: "full", name: "Full Accounting Suite" },
];

const AP_STEPS: PipelineStep[] = [
  {
    text: "Bill captured from Apex Supplies Co.",
    meta: "Email → AP queue",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
    ),
  },
  {
    text: "Routed for approval, $2,340",
    meta: "Slack → Ops Manager",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
  {
    text: "Approved, one click in Slack",
    meta: "Same-day",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    ),
  },
  {
    text: "Payment scheduled and paid",
    meta: "0 manual entry",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    ),
  },
];

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1.08fr_0.92fr] gap-12 lg:gap-8 items-center">
            {/* Copy */}
            <div className="text-center lg:text-left">
              <ScrollReveal animation="fade-up">
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Use Cases</p>
                <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-balance">
                  Examples of the problems a custom build solves.
                </h1>
                <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  LunarLogic builds custom accounting automation for owner-operated service businesses. AR, AP, and full
                  accounting automation are the problems we solve most often, laid out below as examples of what a
                  tailored build looks like and what changes once it&apos;s live.
                </p>
              </ScrollReveal>

              {/* Suite nav chips */}
              <ScrollReveal animation="fade-up" delay={100}>
                <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-3">
                  {SUITE_NAV.map((suite) => (
                    <a
                      key={suite.id}
                      href={`#${suite.id}`}
                      className="text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-xl transition-colors"
                    >
                      {suite.name}
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* AP automation pipeline visual */}
            <ScrollReveal animation="zoom-in" delay={150}>
              <div className="relative flex items-center justify-center min-h-[320px] sm:min-h-[360px] lg:min-h-[440px]">
                <div aria-hidden="true" className="absolute">
                  <div className="w-[280px] h-[280px] lg:w-[360px] lg:h-[360px] bg-indigo-500/20 rounded-full blur-3xl" />
                </div>
                <div className="relative rotate-[1.5deg]">
                  <AutomationPipeline
                    label="AP Automation Pipeline"
                    steps={AP_STEPS}
                    footerLeft="8 bills this week"
                    footerRight="0 late payments"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Sticky-scroll suite showcase */}
      <div className="bg-slate-950">
        <UseCaseShowcase />
      </div>

      {/* Proof bridge */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Real Results</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              These aren&apos;t hypotheticals.
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              The AR use cases above map directly to live client outcomes, with real company names, real timelines,
              and real numbers. Read the case studies to see them in practice.
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
        heading="Which of these looks like your business?"
        subheading="Book a short call and we will walk through your current workflow, where the manual work is, and what a custom automation would look like for it."
        ctaText="Get a Demo"
        ctaHref="/contact"
      />
    </>
  );
}
