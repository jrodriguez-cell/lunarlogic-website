import type { Metadata } from "next";
import PricingCard from "@/components/PricingCard";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "LunarLogic AR automation pricing. Essentials $697/mo, Professional $1,497/mo, Business $2,497/mo. 60-day satisfaction guarantee.",
};

const tiers = [
  {
    name: "Essentials",
    price: 697,
    invoiceLimit: 150,
    features: [
      "150 invoices/month",
      "QuickBooks Online integration",
      "Slack-based invoice approvals",
      "Automated payment reminders",
      "AR aging dashboard",
      "Google Sheets logging",
      "Email support",
    ],
    ctaText: "Start with Essentials",
  },
  {
    name: "Professional",
    price: 1497,
    invoiceLimit: 250,
    features: [
      "250 invoices/month",
      "Everything in Essentials",
      "Automated cash application (Plaid)",
      "VIP customer exemption list",
      "Custom reminder schedules",
      "Multi-path invoice workflows",
      "Priority support",
    ],
    highlighted: true,
    ctaText: "Start with Professional",
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
      "Dedicated onboarding specialist",
      "SLA-backed support",
      "Quarterly business reviews",
    ],
    ctaText: "Start with Business",
  },
];

const faqs = [
  {
    q: "Is there an implementation fee?",
    a: "There is a one-time $2,500 implementation fee for month-to-month contracts. This fee is waived entirely for 12-month commitments.",
  },
  {
    q: "What happens if I exceed my invoice limit?",
    a: "Overage invoices are billed at $5 per invoice. We'll notify you when you're approaching your limit so there are no surprises.",
  },
  {
    q: "What does the 60-day guarantee cover?",
    a: "If LunarLogic doesn't measurably reduce your DSO or invoice processing time within 60 days, we'll refund your subscription fees in full — no questions asked.",
  },
  {
    q: "Do I need to change my accounting software?",
    a: "No. LunarLogic integrates natively with QuickBooks Online. Your existing chart of accounts, customers, and invoices stay exactly where they are.",
  },
  {
    q: "How does the Slack integration work?",
    a: "Your team uses Slack as the input device — uploading PDFs or typing commands. Approvals also happen in Slack with a single button click. No new tools to learn.",
  },
  {
    q: "Is there a referral program?",
    a: "Yes. LunarLogic pays 20% recurring MRR for every client you refer, for as long as they remain a customer.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Transparent, predictable pricing
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            No per-seat fees. No surprise charges. Pay for the invoices you process, with the workflows you need.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {tiers.map((tier) => (
              <PricingCard key={tier.name} {...tier} />
            ))}
          </div>
          <div className="text-center text-sm text-slate-400">
            All plans billed monthly. Annual commitment waives the $2,500 implementation fee.
          </div>
        </div>
      </section>

      {/* Overage & Implementation */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-white mb-1">$5</p>
              <p className="text-sm text-blue-400 font-semibold mb-2">Per Overage Invoice</p>
              <p className="text-xs text-slate-400">Billed monthly for invoices above your plan limit</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-white mb-1">$2,500</p>
              <p className="text-sm text-blue-400 font-semibold mb-2">Implementation Fee</p>
              <p className="text-xs text-slate-400">Waived with any 12-month commitment</p>
            </div>
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <p className="text-3xl font-extrabold text-white mb-1">20%</p>
              <p className="text-sm text-blue-400 font-semibold mb-2">Referral Fee</p>
              <p className="text-xs text-slate-400">Recurring MRR for referred clients, paid monthly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h2 className="text-2xl font-bold text-white mb-3">60-Day Satisfaction Guarantee</h2>
            <p className="text-slate-300 leading-relaxed">
              If LunarLogic doesn&apos;t measurably reduce your DSO or invoice processing time within the first 60 days,
              we&apos;ll refund your subscription in full. No questions asked, no lock-in.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Ready to get started?"
        subheading="Book a 30-minute demo. We'll show you the full workflow and estimate your DSO reduction potential."
        ctaText="Book a Demo"
      />
    </>
  );
}
