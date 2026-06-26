import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import SuiteShowcase from "@/components/SuiteShowcase";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "LunarLogic automates the full accounting cycle for owner-operated service businesses — module by module, starting with AR. Platform-agnostic. Works with the tools you already use.",
};

const integrationCategories = [
  {
    category: "Accounting & ERP",
    items: [
      { name: "QuickBooks Online", note: "Live" },
      { name: "QuickBooks Desktop", note: "" },
      { name: "Sage Intacct", note: "Live" },
      { name: "NetSuite", note: "Live" },
      { name: "Xero", note: "" },
      { name: "Microsoft Dynamics 365", note: "" },
      { name: "Acumatica", note: "" },
      { name: "Sage 50", note: "" },
    ],
  },
  {
    category: "Communication & Approval",
    items: [
      { name: "Slack", note: "Live" },
      { name: "Microsoft Teams", note: "Live" },
      { name: "Outlook / Microsoft 365", note: "Live" },
      { name: "Gmail / Google Workspace", note: "" },
    ],
  },
  {
    category: "Payments & Banking",
    items: [
      { name: "Stripe", note: "Live" },
      { name: "Plaid", note: "Live" },
      { name: "ACH / Bank Transfer", note: "" },
      { name: "Bill.com", note: "" },
      { name: "Square", note: "" },
    ],
  },
  {
    category: "Productivity & Data",
    items: [
      { name: "Google Sheets", note: "Live" },
      { name: "Airtable", note: "" },
      { name: "Salesforce", note: "" },
      { name: "HubSpot CRM", note: "" },
      { name: "Gusto Payroll", note: "" },
      { name: "ADP", note: "" },
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Platform</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Module by module. Starting with AR.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              LunarLogic modernizes the accounting infrastructure of owner-operated service businesses — one suite at a
              time — until the entire financial operating layer runs automatically. Works with the platforms you already use.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Suite Showcase — sticky scroll on desktop, cards on mobile */}
      <SuiteShowcase />

      {/* Integrations */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Platform Agnostic</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Works with the tools you already use
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                LunarLogic is not tied to any single accounting platform. We connect to your existing ERP or accounting
                software and build the automation layer on top — no migration, no rip-and-replace, no retraining.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationCategories.map((cat, i) => (
              <ScrollReveal key={cat.category} animation="fade-up" delay={i * 80}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full">
                  <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">{cat.category}</h3>
                  <ul className="space-y-2.5">
                    {cat.items.map((item) => (
                      <li key={item.name} className="flex items-center justify-between gap-2">
                        <span className="text-sm text-slate-300">{item.name}</span>
                        {item.note === "Live" && (
                          <span className="text-xs font-semibold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                            Live
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-in" delay={200}>
            <p className="text-center text-slate-500 text-sm mt-8">
              Don&apos;t see your platform? We connect to any system with an API.{" "}
              <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">Ask us about your stack.</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Why AR First */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Why AR First</p>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              AR is not an arbitrary starting point. The pain is immediate and personal to the owner, the ROI is
              visible within weeks not months, and the trust established by delivering measurable working capital
              release in the first 90 days removes every barrier to expanding into AP and beyond.
            </p>
            <p className="text-slate-400 leading-relaxed">
              A client whose DSO has compressed from 50 to 22 days and whose cash flow is now predictable does not
              ask whether LunarLogic can handle their AP workflow. They already know the answer.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="See the AR suite running live"
        subheading="Book a 30-minute demo. We will walk through the full platform with your actual data and estimate your DSO reduction potential."
        ctaText="Book a Demo"
      />
    </>
  );
}
