import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import SuiteShowcase from "@/components/SuiteShowcase";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how LunarLogic's AI accounting automation works. It takes the money side of your service business off your plate, one piece at a time, starting with getting you paid. Works with the tools you already use.",
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
              One piece at a time. Starting with getting you paid.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              LunarLogic is AI accounting automation that takes the money side of your business off your plate, one
              piece at a time, until the whole thing runs on its own. It works with the tools you already use.
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
                LunarLogic isn&apos;t tied to any one accounting program. We connect to whatever you already use and do the
                work on top of it, with no switching software, nothing ripped out, and no relearning.
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
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-4">Why Start With Getting Paid</p>
            <p className="text-lg text-slate-300 leading-relaxed mb-4">
              Getting paid is where the money is closest to your pocket. You&apos;ve already done the work. The invoices
              already exist. The money is already owed to you. The only thing standing between you and a fuller bank
              account is someone reliably collecting it, and that&apos;s exactly what LunarLogic does first.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Most owners are getting paid noticeably faster within 60 days. Once the cash is coming in like clockwork,
              taking the rest of the manual work off your plate is an easy next step.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="See exactly what LunarLogic would do for your numbers"
        subheading="Answer 4 quick questions and get a personalized dashboard showing how much faster you'd get paid and how much cash that frees up, built from your own numbers, in seconds."
        ctaText="See How Fast You'd Get Paid →"
        ctaHref="/calculate"
      />
    </>
  );
}
