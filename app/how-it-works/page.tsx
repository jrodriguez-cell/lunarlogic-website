import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import SuiteShowcase from "@/components/SuiteShowcase";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "LunarLogic automates the full accounting cycle for owner-operated service businesses, module by module, starting with AR. Platform-agnostic. Works with the tools you already use.",
};

const integrationCategories = [
  {
    category: "Accounting Platform",
    items: [
      { name: "QuickBooks Online", note: "Live" },
      { name: "QuickBooks Desktop", note: "Live" },
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
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">How It Works</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
              Custom automation, built around your business.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              LunarLogic builds tailored accounting automation for owner-operated service businesses and the
              bookkeepers and fractional CFOs who manage their books. AR and AP are common starting points, examples of
              the kind of custom build we deliver, not a fixed product roadmap. Built on the QuickBooks you already run.
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
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Built Around QuickBooks</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Built on the QuickBooks you already run
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                LunarLogic builds the automation layer on top of QuickBooks Online or Desktop, and connects the tools
                around it: no migration, no new platform to learn, no rip-and-replace. We build what QuickBooks should
                be able to do but isn&apos;t.
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
              Run QuickBooks and use a tool that isn&apos;t listed? We connect to most systems with an API.{" "}
              <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">Ask us about your stack.</a>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Discovery First */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Discovery First, Always</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Every build starts with a conversation, not a menu.
              </h2>
              <p className="text-slate-400 max-w-2xl mx-auto">
                We don&apos;t start with an answer. We sit down with the person doing the work, find the real
                bottleneck, and build the specific thing that fixes it. No scope, no proposal, and no pricing exists
                before discovery, because discovery is the design phase of the build.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Discovery",
                body: "A working session with the person who owns the books, looking at where the time actually goes and where the process is held together with spreadsheets.",
              },
              {
                step: "02",
                title: "Diagnosis",
                body: "We map the real bottleneck: collections, close, reconciliation, consolidation, or something QuickBooks was never built to produce. Often it's more than one thing.",
              },
              {
                step: "03",
                title: "Custom Scope",
                body: "A build scoped to exactly what discovery found, priced to the actual work, then shadow-tested in parallel with your existing process before it's trusted to run alone.",
              },
            ].map((s, i) => (
              <ScrollReveal key={s.step} animation="fade-up" delay={i * 90}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 h-full">
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Stage {s.step}</span>
                  <h3 className="text-lg font-bold text-white mt-2 mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{s.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-in" delay={280}>
            <p className="text-center text-slate-500 text-sm mt-10 max-w-2xl mx-auto">
              AR is a common place to start because the cash is already earned and closest to the surface, but where a
              build begins depends entirely on what discovery finds, not a fixed order.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="See exactly what LunarLogic would build for your business"
        subheading="Book a short call and we will walk through your current workflow, where the manual work is, and what a custom automation would look like for it."
        ctaText="Get a Demo"
        ctaHref="/contact"
      />
    </>
  );
}
