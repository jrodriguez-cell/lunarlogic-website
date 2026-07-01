import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import UseCaseShowcase from "@/components/UseCaseShowcase";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "The accounting problems LunarLogic's AI automation was built to solve: getting paid, paying bills, and running the books. See what changes once each one is handled for you.",
};

const SUITE_NAV = [
  { id: "ar",   name: "Getting Paid",     status: "Available Now",  statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "ap",   name: "Paying Bills",     status: "In the Works",   statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "full", name: "Full Accounting",  status: "Coming Soon",    statusColor: "text-slate-400 bg-slate-700 border-slate-600" },
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
              Every money headache we were built to fix.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              LunarLogic is AI accounting automation that takes the money side of your business off your plate, one piece
              at a time, starting with getting you paid, until the whole thing runs on its own. Here are the everyday
              problems that make that worth it, and what changes once each one is handled.
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
              The problems above map straight to real customers, with real company names, real timelines, and real
              numbers. Read the stories to see them in action.
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
        subheading="Answer 4 quick questions about your invoices. Get a personalized dashboard showing how long you wait to get paid today, how much cash is stuck, and what changes once LunarLogic takes over."
        ctaText="See How Fast You'd Get Paid →"
        ctaHref="/calculate"
      />
    </>
  );
}
