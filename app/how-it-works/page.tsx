import type { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "See how LunarLogic automates your full Order-to-Cash cycle — from Slack sales orders to QuickBooks invoices to automated payment reminders.",
};

const workflows = [
  {
    id: "WF1",
    status: "Production",
    statusColor: "green",
    title: "Sales Order Processing & Invoice Creation",
    subtitle: "Workflow 1A/1B — 92 nodes",
    description:
      "The core workflow. Accepts sales orders via Slack (PDF or text), processes them with AI, validates against QuickBooks, and fires invoices — all with human-in-the-loop approval at each critical step.",
    paths: [
      {
        label: "Path A — PDF Upload",
        steps: [
          "Slack PDF upload detected",
          "PDF extracted and parsed by Claude AI",
          "Customer validated in QuickBooks",
          "New customers approved via Slack (if applicable)",
          "QuickBooks Estimate created with milestone matching",
          "Sales order sent for Slack approval",
          "Invoice created in QuickBooks",
          "Invoice sent via QuickBooks email",
        ],
      },
      {
        label: "Path B — Text Command",
        steps: [
          "Slack text command received",
          "OpenAI classifies invoice intent",
          "QuickBooks customer lookup",
          "Invoice draft generated",
          "Slack approval requested",
          "Invoice sent via QuickBooks email",
        ],
      },
    ],
    integrations: ["Slack", "QuickBooks Online", "Claude (Anthropic)", "OpenAI", "Google Sheets"],
  },
  {
    id: "WF2",
    status: "Production",
    statusColor: "green",
    title: "Proactive Payment Reminders",
    subtitle: "Workflow 2 — 36 nodes",
    description:
      "Runs every weekday at 9 AM. Queries QuickBooks for unpaid invoices, filters to active pilot customers (excluding VIPs), and sends personalized reminder emails via Outlook. Posts AR aging summary to Slack.",
    paths: [
      {
        label: "Daily Automation",
        steps: [
          "Scheduled trigger at 9 AM Mon–Fri",
          "OAuth tokens refreshed from Google Sheets",
          "QuickBooks queried for all unpaid invoices",
          "Pilot customer filter applied",
          "VIP exemption list checked",
          "Personalized reminder emails sent via Outlook",
          "AR aging summary posted to Slack",
          "Results logged to Google Sheets",
        ],
      },
    ],
    integrations: ["QuickBooks Online", "Outlook / Microsoft Graph API", "Slack", "Google Sheets"],
  },
  {
    id: "WF3",
    status: "Coming Soon",
    statusColor: "yellow",
    title: "Payment Receipt & Cash Application",
    subtitle: "Workflow 3 — In Design",
    description:
      "The final piece of the Order-to-Cash loop. Plaid webhooks detect incoming bank payments, fuzzy-match them to open QuickBooks invoices, and auto-apply with 90%+ confidence. Ambiguous bulk payments trigger a Slack prompt.",
    paths: [
      {
        label: "Payment Application Flow",
        steps: [
          "Plaid webhook fires on incoming payment",
          "Transaction parsed for amount, payer, date",
          "Fuzzy match run against all open QB invoices",
          "Auto-applied if confidence score > 90%",
          "Slack prompt sent for ambiguous matches",
          "QuickBooks updated with payment application",
          "Default rule: apply to oldest open invoice first",
          "Result logged to Google Sheets",
        ],
      },
    ],
    integrations: ["Plaid", "QuickBooks Online", "Slack", "Google Sheets"],
  },
  {
    id: "WF4",
    status: "In Progress",
    statusColor: "blue",
    title: "AR Aging Dashboard",
    subtitle: "Workflow 4 — Active Development",
    description:
      "Interactive React dashboard replacing the static Google Sheets AR aging output. Clients get a single bookmarkable URL showing DSO trend, aging buckets, invoice status, and customer payment behavior.",
    paths: [
      {
        label: "Dashboard Modules",
        steps: [
          "AR Aging waterfall (Current / 1-30 / 31-60 / 61-90 / 90+ days)",
          "DSO trend line — 90-day rolling with go-live annotation",
          "Invoice status board (Sent / Viewed / Overdue / Paid)",
          "Customer payment behavior table",
          "15-minute live data refresh from QuickBooks",
          "Mobile responsive, dark mode",
        ],
      },
    ],
    integrations: ["QuickBooks Online", "React", "Recharts", "Vercel"],
  },
];

const statusBadge: Record<string, string> = {
  green: "bg-green-500/10 text-green-400 border-green-500/20",
  yellow: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

export default function HowItWorksPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Platform</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Full Order-to-Cash Automation
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Four interconnected workflows covering every step from sales order intake to cash application. Each runs
            in production, each feeds the next.
          </p>
        </div>
      </section>

      {/* Workflow Sections */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {workflows.map((wf, idx) => (
            <div key={wf.id} className="relative">
              {idx !== workflows.length - 1 && (
                <div className="absolute left-6 top-full w-px h-20 bg-slate-700 hidden sm:block" />
              )}
              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 border-b border-slate-700">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{wf.id}</span>
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBadge[wf.statusColor]}`}
                        >
                          {wf.status}
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">{wf.title}</h2>
                      <p className="text-sm text-slate-400 mt-1">{wf.subtitle}</p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">{wf.description}</p>
                </div>

                {/* Paths */}
                <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {wf.paths.map((path) => (
                    <div key={path.label}>
                      <h3 className="text-sm font-semibold text-blue-400 mb-4">{path.label}</h3>
                      <ol className="space-y-2.5">
                        {path.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-bold flex items-center justify-center mt-0.5">
                              {i + 1}
                            </span>
                            <span className="text-sm text-slate-300">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  ))}

                  {/* Integrations */}
                  <div className="md:col-span-2 pt-4 border-t border-slate-700">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Integrations</p>
                    <div className="flex flex-wrap gap-2">
                      {wf.integrations.map((integration) => (
                        <span
                          key={integration}
                          className="text-xs bg-slate-700/50 text-slate-300 border border-slate-600 px-3 py-1 rounded-full"
                        >
                          {integration}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        heading="See the workflows running live"
        subheading="Schedule a demo and we'll walk through the full Order-to-Cash stack with your actual data."
        ctaText="Book a Demo"
      />
    </>
  );
}
