import type { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "LunarLogic automates the full accounting cycle for owner-operated service businesses — module by module, starting with AR. Platform-agnostic. Works with the tools you already use.",
};

const suites = [
  {
    phase: "01",
    status: "Production",
    statusColor: "green",
    name: "AR Automation Suite",
    tagline: "The complete invoice-to-cash cycle. Running automatically.",
    description:
      "LunarLogic's AR suite covers every step from sales order intake to cash collected — deployed, configured, and run on your behalf inside the accounting infrastructure you already use. No migration, no new platform, no AR clerk required.",
    outcomes: [
      {
        title: "Invoices created and sent automatically",
        body: "Sales orders arrive via your team's existing communication channel. AI validates the customer, extracts line items, and dispatches the invoice to your accounting system — with a human approval checkpoint before anything goes out.",
      },
      {
        title: "Systematic payment reminders that never stop",
        body: "A multi-touch reminder sequence runs on its own, every weekday, calibrated by client type and invoice age. Your key relationships are protected. Your collections do not depend on anyone remembering to follow up.",
      },
      {
        title: "Incoming payments matched and applied",
        body: "When a payment arrives, AI matches it to the correct open invoice. Above 90% confidence it is applied automatically. Below that threshold, you get a one-click prompt. Phantom AR is eliminated.",
      },
      {
        title: "Real-time AR visibility — not a monthly report",
        body: "A live dashboard shows your DSO trend, aging buckets, and customer payment behavior. You see where every dollar is, updated continuously — not at month-end when it is too late to act.",
      },
    ],
    metrics: [
      { value: "40%", label: "Average DSO reduction" },
      { value: "84%", label: "Faster invoice processing" },
      { value: "70%", label: "Bad debt improvement" },
      { value: "500+", label: "Hours saved annually" },
    ],
  },
  {
    phase: "02",
    status: "In Development",
    statusColor: "yellow",
    name: "AP Automation Suite",
    tagline: "Your payables — organized, approved, and paid on schedule.",
    description:
      "The AP suite closes the other side of the cash cycle. Vendor bills are captured automatically, routed for approval, and scheduled for payment — so your outgoing cash is just as organized and predictable as your incoming cash.",
    outcomes: [
      {
        title: "Automated bill intake",
        body: "Vendor invoices arriving via email or upload are parsed, categorized, and entered into your accounting system automatically — no manual data entry.",
      },
      {
        title: "Structured approval workflows",
        body: "Bills are routed to the right approver based on amount, vendor, and category. Approvals happen with a single click. Nothing is paid without the right sign-off.",
      },
      {
        title: "Payment scheduling with timing control",
        body: "Pay on time, every time — without over-extending cash. Payment runs are scheduled around your cash position and vendor terms so you never pay early and never pay late.",
      },
      {
        title: "Vendor management and history",
        body: "Full visibility into vendor payment history, outstanding balances, and terms across your entire supplier base — in one place, always current.",
      },
    ],
    metrics: [],
  },
  {
    phase: "03",
    status: "Coming Soon",
    statusColor: "slate",
    name: "Full Accounting Suite",
    tagline: "The entire financial operating layer. Running without you.",
    description:
      "The long-term vision: a complete, automated accounting infrastructure built specifically for the $1M–$10M service business. By the time a client's AR and AP are running automatically, the expansion into the full suite is a natural next step — not a new project.",
    outcomes: [
      {
        title: "Cash flow forecasting",
        body: "Forward-looking cash position built from AR aging, AP schedules, and historical collection patterns — so you make decisions based on where cash is going, not where it has been.",
      },
      {
        title: "Month-end close acceleration",
        body: "Automated reconciliation, categorization, and close checklists compress a 14-day manual close to under 3 days — without adding accounting headcount.",
      },
      {
        title: "Payroll integration",
        body: "Payroll synced directly with your accounting system, eliminating duplicate entry and giving you real-time labor cost visibility against your revenue.",
      },
      {
        title: "Financial reporting",
        body: "The P&L, balance sheet, and cash flow statement your business actually needs — current, accurate, and readable without an accountant in the room.",
      },
    ],
    metrics: [],
  },
];

const statusBadge: Record<string, string> = {
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  slate: "bg-slate-500/10 text-slate-400 border-slate-500/20",
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
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Platform</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Module by module. Starting with AR.
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            LunarLogic modernizes the accounting infrastructure of owner-operated service businesses — one suite at a
            time — until the entire financial operating layer runs automatically, without manual intervention, and
            without a consultant. Works with the platforms you already use.
          </p>
        </div>
      </section>

      {/* Suite Sections */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {suites.map((suite, idx) => (
            <div key={suite.phase} className="relative">
              {idx !== suites.length - 1 && (
                <div className="absolute left-6 top-full w-px h-20 bg-slate-700 hidden sm:block" />
              )}
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-700">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phase {suite.phase}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBadge[suite.statusColor]}`}>
                          {suite.status}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">{suite.name}</h2>
                      <p className="text-sm text-blue-400 mt-1">{suite.tagline}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{suite.description}</p>
                </div>

                {/* Outcomes */}
                <div className="p-6 sm:p-8">
                  <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-5">What It Delivers</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {suite.outcomes.map((outcome) => (
                      <div key={outcome.title} className="bg-slate-900/60 border border-slate-700/50 rounded-xl p-5">
                        <p className="text-white font-semibold text-sm mb-2">{outcome.title}</p>
                        <p className="text-slate-400 text-sm leading-relaxed">{outcome.body}</p>
                      </div>
                    ))}
                  </div>

                  {suite.metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {suite.metrics.map((m) => (
                        <div key={m.label} className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 text-center">
                          <p className="text-2xl font-extrabold text-blue-400">{m.value}</p>
                          <p className="text-xs text-slate-400 mt-1">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-slate-900 border-y border-slate-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {integrationCategories.map((cat) => (
              <div key={cat.category} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
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
            ))}
          </div>

          <p className="text-center text-slate-500 text-sm mt-8">
            Don&apos;t see your platform? We connect to any system with an API.{" "}
            <a href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">Ask us about your stack.</a>
          </p>
        </div>
      </section>

      {/* Why AR First */}
      <section className="py-16 bg-slate-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
