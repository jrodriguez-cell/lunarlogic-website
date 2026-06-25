import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import PricingCard from "@/components/PricingCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "LunarLogic — Cut Your DSO. Get Paid Faster. Automate Your AR.",
  description:
    "LunarLogic automates the full Order-to-Cash cycle for professional services firms. Proven 19-day DSO improvement with Kaptain Clean LLC.",
};

const features = [
  {
    icon: "⚡",
    title: "Instant Invoice Creation",
    description:
      "Drop a PDF or send a Slack message — LunarLogic parses it with AI, validates the customer in QuickBooks, and creates a draft invoice in seconds.",
  },
  {
    icon: "📬",
    title: "Automated Payment Reminders",
    description:
      "Scheduled daily reminders sent via Outlook to the right customers at the right time. VIP clients are automatically exempt.",
  },
  {
    icon: "📊",
    title: "Live AR Aging Dashboard",
    description:
      "Real-time visibility into your AR aging buckets, DSO trend, and customer payment behavior — all in one bookmarkable URL.",
  },
  {
    icon: "🔗",
    title: "QuickBooks Native Integration",
    description:
      "Reads and writes directly to QuickBooks Online. Your books stay accurate without double-entry or manual reconciliation.",
  },
  {
    icon: "💬",
    title: "Slack-Powered Approvals",
    description:
      "Human-in-the-loop approvals happen inside Slack. Approve invoices, new customers, and large transactions without leaving your workflow.",
  },
  {
    icon: "🏦",
    title: "Automated Cash Application",
    description:
      "Plaid webhook catches incoming payments, fuzzy-matches them to open invoices, and applies them automatically above 90% confidence.",
  },
];

const pricingTiers = [
  {
    name: "Essentials",
    price: 697,
    invoiceLimit: 150,
    features: [
      "150 invoices/month",
      "QuickBooks Online integration",
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
      "Multiple Slack workspaces",
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
              { value: "19 days", label: "Avg DSO Reduction" },
              { value: "84%", label: "Faster Invoice Processing" },
              { value: "60-day", label: "Satisfaction Guarantee" },
              { value: "$0", label: "Implementation Fee (annual)" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl sm:text-3xl font-extrabold text-blue-400">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Everything AR. Fully Automated.
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              From the moment a sales order comes in to the moment cash hits your bank — LunarLogic handles it.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Teaser */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Workflow</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                Order-to-Cash on autopilot
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Your team sends a PDF or types a Slack command. LunarLogic takes it from there — parsing, validating,
                creating, and sending — with Slack-based human approval checkpoints at every critical step.
              </p>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                See the full workflow
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { step: "01", title: "Receive sales order via Slack", sub: "PDF upload or text command" },
                { step: "02", title: "AI parses and validates", sub: "Claude extracts data, QuickBooks confirms customer" },
                { step: "03", title: "Approval in Slack", sub: "One-click approve or flag for review" },
                { step: "04", title: "Invoice created and sent", sub: "QuickBooks invoice dispatched instantly" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                  <span className="text-blue-400 font-bold text-sm shrink-0">{item.step}</span>
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-slate-400 text-xs mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kaptain Clean Case Study Teaser */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Case Study</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            How Kaptain Clean cut DSO by 19 days
          </h2>
          <blockquote className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-left mb-8">
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              &ldquo;Before LunarLogic, invoicing was a full afternoon of manual work. Now our sales orders go straight from
              Slack to QuickBooks in minutes. We&apos;re collecting faster, our books are cleaner, and I can see exactly
              where every dollar is at a glance.&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold text-sm">KC</span>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Kaptain Clean LLC</p>
                <p className="text-slate-400 text-xs">Professional Services Client</p>
              </div>
            </div>
          </blockquote>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
          >
            Read the full case study
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Simple, predictable pricing</h2>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              No setup fees for annual commitments. $5/invoice overage. 60-day satisfaction guarantee.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} ctaText="Get Started" />
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-8">
            Annual commitment waives the $2,500 implementation fee.{" "}
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300">
              See full pricing details
            </Link>
          </p>
        </div>
      </section>

      <CTASection />
    </>
  );
}
