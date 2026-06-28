import type { Metadata } from "next";
import PricingCard from "@/components/PricingCard";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "LunarLogic AR automation pricing. Essentials $697/mo, Professional $1,497/mo, Business $2,497/mo. No setup fees for annual commitments.",
};

const tiers = [
  {
    name: "Essentials",
    price: 697,
    invoiceLimit: 150,
    features: [
      "150 invoices/month",
      "Accounting system integration",
      "Slack-based invoice approvals",
      "Automated payment reminders",
      "AR aging dashboard",
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
      "Automated cash application",
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
      "Multiple workspaces",
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
    a: "Overage invoices are billed at $5 per invoice. We'll notify you before you hit your limit so there are no surprises at billing.",
  },
  {
    q: "Do I need to change my accounting software?",
    a: "No. LunarLogic connects to the accounting system you already use: QuickBooks, NetSuite, Sage Intacct, Xero, and others. Your existing customers, chart of accounts, and historical data stay exactly where they are.",
  },
  {
    q: "How does the approval workflow work?",
    a: "Your team uses Slack or Microsoft Teams as the input device. When a job is marked complete, LunarLogic generates the invoice, validates the client and line items, then routes it to you for one-click approval. Nothing goes to a client without your sign-off.",
  },
  {
    q: "How long does onboarding take?",
    a: "Most clients are fully live within 2–3 weeks. We handle the integration setup, configure your reminder sequences, and train your team on the approval workflow. You don't need to involve IT.",
  },
  {
    q: "Is there a referral program?",
    a: "Yes. LunarLogic pays 20% recurring MRR for every client you refer, for as long as they remain a customer. Referral fees are paid monthly.",
  },
];

export default function PricingPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Pricing</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Transparent, predictable pricing
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              No per-seat fees. No surprise charges. Pay for the invoices you process, with the workflows you need.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {tiers.map((tier, i) => (
              <ScrollReveal key={tier.name} animation="fade-up" delay={i * 100}>
                <PricingCard {...tier} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal animation="fade-in" delay={200}>
            <div className="text-center text-sm text-slate-400">
              All plans billed monthly. Annual commitment waives the $2,500 implementation fee.
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 bg-slate-900 border-t border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl font-bold text-white text-center mb-10">Full Feature Comparison</h2>
          </ScrollReveal>
          <ScrollReveal animation="fade-in" delay={80}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left text-slate-400 font-medium pb-4 pr-6 w-1/2">Feature</th>
                    <th className="text-center text-slate-300 font-semibold pb-4 px-4">Essentials</th>
                    <th className="text-center text-blue-400 font-semibold pb-4 px-4">Professional</th>
                    <th className="text-center text-slate-300 font-semibold pb-4 px-4">Business</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { feature: "Monthly invoice limit", essentials: "150", professional: "250", business: "400" },
                    { feature: "Accounting system integration", essentials: true, professional: true, business: true },
                    { feature: "Human-in-the-loop approvals", essentials: true, professional: true, business: true },
                    { feature: "Automated payment reminders", essentials: true, professional: true, business: true },
                    { feature: "AR aging dashboard", essentials: true, professional: true, business: true },
                    { feature: "Audit & activity logging", essentials: true, professional: true, business: true },
                    { feature: "Automated cash application", essentials: false, professional: true, business: true },
                    { feature: "VIP customer exemption list", essentials: false, professional: true, business: true },
                    { feature: "Custom reminder schedules", essentials: false, professional: true, business: true },
                    { feature: "Multi-path invoice workflows", essentials: false, professional: true, business: true },
                    { feature: "Multiple workspaces", essentials: false, professional: false, business: true },
                    { feature: "Custom workflow nodes", essentials: false, professional: false, business: true },
                    { feature: "Dedicated onboarding specialist", essentials: false, professional: false, business: true },
                    { feature: "SLA-backed support", essentials: false, professional: false, business: true },
                    { feature: "Quarterly business reviews", essentials: false, professional: false, business: true },
                    { feature: "Support level", essentials: "Email", professional: "Priority", business: "SLA-backed" },
                  ].map((row) => (
                    <tr key={row.feature} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-3.5 pr-6 text-slate-300">{row.feature}</td>
                      {(["essentials", "professional", "business"] as const).map((tier) => {
                        const val = row[tier];
                        return (
                          <td key={tier} className="py-3.5 px-4 text-center">
                            {typeof val === "boolean" ? (
                              val ? (
                                <svg className="w-5 h-5 text-blue-400 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              ) : (
                                <span className="text-slate-600">–</span>
                              )
                            ) : (
                              <span className={tier === "professional" ? "text-blue-400 font-medium" : "text-slate-300"}>{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Overage & Implementation */}
      <section className="py-16 bg-slate-900 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "$5", label: "Per Overage Invoice", sub: "Billed monthly for invoices above your plan limit" },
              { value: "$2,500", label: "Implementation Fee", sub: "Waived with any 12-month commitment" },
              { value: "20%", label: "Referral Fee", sub: "Recurring MRR for referred clients, paid monthly" },
            ].map((item, i) => (
              <ScrollReveal key={item.label} animation="zoom-in" delay={i * 80}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                  <p className="text-3xl font-extrabold text-white mb-1">{item.value}</p>
                  <p className="text-sm text-blue-400 font-semibold mb-2">{item.label}</p>
                  <p className="text-xs text-slate-400">{item.sub}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <ScrollReveal key={faq.q} animation="slide-left" delay={i * 60}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
                  <h3 className="text-white font-semibold mb-2">{faq.q}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </ScrollReveal>
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
