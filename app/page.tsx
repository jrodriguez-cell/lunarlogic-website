import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";
import FeatureShowcase from "@/components/FeatureShowcase";

export const metadata: Metadata = {
  title: "LunarLogic — We turn what you have already earned into cash in your bank account.",
  description:
    "LunarLogic automates the full Order-to-Cash cycle for owner-operated service businesses. 40% average DSO reduction. Proven with Kaptain Clean LLC.",
};

const features = [
  {
    iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
    title: "Invoices Out in 90 Seconds",
    description:
      "The moment a job is approved, an invoice is created and sent — automatically. No manual entry, no delay. The clock starts while the work is still fresh in your client's mind.",
  },
  {
    iconPath: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Reminders That Run Without You",
    description:
      "A systematic multi-touch reminder sequence fires automatically based on invoice age — professional, consistent, and calibrated to your client relationships. No awkward calls.",
  },
  {
    iconPath: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    title: "Your DSO. Live. Always.",
    description:
      "Real-time visibility into AR aging, DSO trend, and which clients are trending late. A monthly report is a rearview mirror. LunarLogic is a windshield.",
  },
  {
    iconPath: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    title: "Platform Agnostic",
    description:
      "No migration. No new platform. No retraining your bookkeeper. LunarLogic connects to the accounting system you already use and automates what it should be doing but isn't.",
  },
  {
    iconPath: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    title: "Human Approval, Zero Friction",
    description:
      "Every critical decision stays with you — approvals happen with a single click. The system handles everything else so you focus on clients, not paperwork.",
  },
  {
    iconPath: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    title: "Payments Applied Automatically",
    description:
      "Incoming payments are matched to open invoices by AI. Above 90% confidence they are applied instantly. Below that threshold, you get a one-click prompt. Phantom AR is eliminated.",
  },
];

const pricingTiers = [
  {
    name: "Essentials",
    price: 697,
    invoiceLimit: 150,
    features: [
      "150 invoices/month",
      "Accounting system integration",
      "Slack-based approvals",
      "Automated payment reminders",
      "AR aging dashboard",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: 1497,
    invoiceLimit: 250,
    features: [
      "250 invoices/month",
      "Everything in Essentials",
      "Automated cash application",
      "VIP customer exemptions",
      "Custom reminder schedules",
      "Priority support",
    ],
    highlighted: true,
  },
  {
    name: "Business",
    price: 2497,
    invoiceLimit: 400,
    features: [
      "400 invoices/month",
      "Everything in Professional",
      "Multiple workspaces",
      "Custom workflow nodes",
      "Dedicated onboarding",
      "SLA-backed support",
    ],
  },
];

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
                  Revenue is a promise. Cash is the reality.
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
                DSO dropped 19 days. Invoice processing time fell 84%. Over $65,000 in working capital permanently
                unlocked — not from new revenue, but from money that was already earned and sitting uncollected.
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

      {/* Pricing Preview */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Simple, predictable pricing</h2>
              <p className="text-lg text-slate-400 max-w-xl mx-auto">
                No setup fees for annual commitments. $5/invoice overage. 60-day satisfaction guarantee.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, i) => (
              <ScrollReveal key={tier.name} animation="fade-up" delay={i * 100}>
                <PricingCard {...tier} ctaText="Get Started" />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal animation="fade-in" delay={200}>
            <p className="text-center text-slate-400 text-sm mt-8">
              Annual commitment waives the $2,500 implementation fee.{" "}
              <Link href="/pricing" className="text-blue-400 hover:text-blue-300">
                See full pricing details
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
