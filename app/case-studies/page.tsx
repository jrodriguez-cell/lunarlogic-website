import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import CaseStudyShowcase from "@/components/CaseStudyShowcase";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Real results from custom LunarLogic automation builds, faster payments, cash freed up, and bad debt eliminated.",
};

export default function CaseStudiesPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Client Results</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Real businesses. Real automations.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              These are results from real custom AR automation builds, not hypotheticals. Every number below is live
              in production. AR is one example of what a custom build looks like once it is running.
            </p>
          </ScrollReveal>

          {/* Summary stats strip */}
          <ScrollReveal animation="zoom-in" delay={100}>
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { value: "19 days", label: "Faster to get paid" },
                { value: "$112K", label: "Cash freed from receivables" },
                { value: "84%", label: "Faster invoice processing" },
                { value: "$0", label: "Bad debt (Halloran)" },
              ].map((s) => (
                <div key={s.label} className="bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <p className="text-xl font-extrabold text-blue-400">{s.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Case Study Showcase — sticky scroll on desktop, cards on mobile */}
      <CaseStudyShowcase />

      {/* Your Firm Next */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Your business could be next</h2>
            <p className="text-slate-400 mb-8">
              Owner-operated service businesses with 8 to 20 employees are the right fit, regardless of which
              accounting platform you run or which part of the books is costing you the most time. We can walk
              through what a custom build would look like before you ever spend a dollar.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold transition-all hover:scale-105"
            >
              Get a Demo
            </Link>
          </ScrollReveal>
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
