import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import FeatureShowcase from "@/components/FeatureShowcase";

export const metadata: Metadata = {
  title: "LunarLogic — We turn what you have already earned into cash in your bank account.",
  description:
    "LunarLogic automates the full Order-to-Cash cycle for owner-operated service businesses. 40% average DSO reduction. Proven with Kaptain Clean LLC.",
};


export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Stats Strip */}
      <section className="bg-slate-900 border-y border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "40%", label: "Average DSO Reduction" },
              { value: "84%", label: "Faster Invoice Processing" },
              { value: "500+ hrs", label: "Saved Annually Per Firm" },
              { value: "70%", label: "Bad Debt Improvement" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} animation="zoom-in" delay={i * 80}>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase — sticky scroll */}
      <FeatureShowcase />

      {/* Problem / Why It Matters */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Problem</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  Revenue is recognized. Cash is the reality.
                </h2>
                <p className="text-lg text-slate-400 mb-6">
                  82% of small business failures are caused by cash flow problems — not lack of revenue. The money is
                  already earned. It is legally owed. It is sitting in your aging report instead of your bank account.
                </p>
                <p className="text-lg text-slate-400 mb-8">
                  The AR problem is not a technology problem. The tools have existed for years. What has not existed
                  is a partner willing to go into a service business and deploy that technology permanently — without
                  ongoing consulting involvement.
                </p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  See how LunarLogic closes the gap
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {[
                {
                  title: "No dedicated AR staff",
                  body: "At the $1M–$10M level, nobody owns collections. Invoices go out when someone has time. Follow-up happens when someone remembers.",
                },
                {
                  title: "Billing disconnected from delivery",
                  body: "Every day between job completion and invoice delivery is a day added to your DSO before the clock even starts.",
                },
                {
                  title: "No systematic follow-up",
                  body: "Businesses without consistent, escalating follow-up always get paid last — regardless of relationship or invoice size.",
                },
                {
                  title: "No real-time visibility",
                  body: "You discover a cash flow problem when payroll is due. By then the 60-day AR has been sitting there for six weeks.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} animation="slide-right" delay={i * 90}>
                  <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kaptain Clean Case Study Teaser */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Case Study</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              How Kaptain Clean cut DSO by 19 days
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="zoom-in" delay={100}>
            <blockquote className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-left mb-8">
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                &ldquo;I don&apos;t know how to explain this, but I feel like I finally own my business again.&rdquo;
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                DSO dropped 19 days. Invoice processing time fell 84%. Over $65,000 in cash freed from outstanding
                receivables — not from new revenue, but from money that was already earned and sitting uncollected.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">KC</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Kaptain Clean LLC</p>
                  <p className="text-slate-400 text-xs">Commercial Cleaning — Charlotte, NC</p>
                </div>
              </div>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Read the full case study
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
