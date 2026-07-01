import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import FeatureShowcase from "@/components/FeatureShowcase";

export const metadata: Metadata = {
  title: "LunarLogic: We turn what you have already earned into cash in your bank account.",
  description:
    "LunarLogic gets service businesses paid faster — invoices out on time, late payments chased for you, and the money matched to the right invoice. On average, customers get paid 40% sooner.",
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
              { value: "40%", label: "Faster to Get Paid" },
              { value: "84%", label: "Faster Invoicing" },
              { value: "500+ hrs", label: "Saved Every Year" },
              { value: "70%", label: "Less Money Written Off" },
            ].map((stat, i) => (
              <ScrollReveal key={stat.label} animation="zoom-in" delay={i * 80}>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / Why It Matters */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Problem</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  Making money and having money aren&apos;t the same thing.
                </h2>
                <p className="text-lg text-slate-400 mb-6">
                  You finish the job and send the invoice. But the cash doesn&apos;t show up for weeks — sometimes months.
                  Until then, money you&apos;ve already earned is just sitting there, unpaid. The longer that takes, the
                  less cash you actually have on hand to run the business.
                </p>
                <p className="text-lg text-slate-400 mb-8">
                  Meanwhile, payroll, rent, and your own bills are due on time, every time. So even a busy, profitable
                  business can feel broke — not because the work isn&apos;t there, but because the money is stuck in
                  invoices nobody is chasing.
                </p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  See how LunarLogic gets you paid faster
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {[
                {
                  title: "Invoices go out late — so they get paid late",
                  body: "Every day between finishing the job and sending the invoice is a day added to how long you wait for the money. Slow billing means slow paydays.",
                },
                {
                  title: "Nobody is following up",
                  body: "Once an invoice is sent, it's easy to forget. Without someone reminding customers on a schedule, your invoices get paid after the ones from businesses that do follow up.",
                },
                {
                  title: "You don't see a problem until cash gets tight",
                  body: "By the time you notice, an invoice has often been unpaid for 45–60 days. Seeing it early turns a cash-flow scare into a quick nudge.",
                },
                {
                  title: "Your cash is stuck in unpaid invoices",
                  body: "Money tied up in invoices customers haven't paid can't cover payroll, bills, or growth. The problem isn't the work — it's how long the money takes to arrive.",
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

      {/* Feature Showcase — sticky scroll */}
      <FeatureShowcase />

      {/* Kaptain Clean Case Study Teaser */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Case Study</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              How Kaptain Clean started getting paid 19 days sooner
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="zoom-in" delay={100}>
            <blockquote className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 sm:p-8 text-left mb-8">
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                &ldquo;I don&apos;t know how to explain this, but I feel like I finally own my business again.&rdquo;
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                They started getting paid 19 days sooner. Invoices went out 84% faster. And over $65,000 in cash showed
                up — not from new work, but from money they&apos;d already earned and were just waiting on.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">KC</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Kaptain Clean LLC</p>
                  <p className="text-slate-400 text-xs">Commercial Cleaning, Charlotte, NC</p>
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
