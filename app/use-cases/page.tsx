import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import UseCaseShowcase from "@/components/UseCaseShowcase";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Every AR, AP, and accounting problem LunarLogic was built to solve, and what the business looks like after.",
};

const SUITE_NAV = [
  { id: "ar",   name: "AR Automation Suite",    status: "Production",     statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "ap",   name: "AP Automation Suite",    status: "In Development", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "full", name: "Full Accounting Suite",  status: "Coming Soon",    statusColor: "text-slate-400 bg-slate-700 border-slate-600" },
];

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Use Cases</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-balance">
              Examples of the problems a custom build solves.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              LunarLogic builds custom accounting automation for owner-operated service businesses. AR, AP, and full
              accounting automation are the problems we solve most often, laid out below as examples of what a
              tailored build looks like and what changes once it&apos;s live.
            </p>
          </ScrollReveal>

          {/* Suite nav chips */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {SUITE_NAV.map((suite) => (
                <a
                  key={suite.id}
                  href={`#${suite.id}`}
                  className="group flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-xl transition-colors"
                >
                  <span>{suite.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${suite.statusColor}`}>
                    {suite.status}
                  </span>
                </a>
              ))}
            </div>
          </ScrollReveal>
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
        heading="See your numbers in a live dashboard."
        subheading="Answer 4 questions about your invoice volume and payment terms. Get a personalized AR dashboard showing your DSO, your cash gap, and what changes when LunarLogic runs."
        ctaText="Calculate My DSO →"
        ctaHref="/calculate"
      />
    </>
  );
}
