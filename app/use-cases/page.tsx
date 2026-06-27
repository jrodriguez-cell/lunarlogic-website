import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Use Cases",
  description:
    "Every AR, AP, and accounting problem LunarLogic was built to solve — and what the business looks like after.",
};

// ── Types ─────────────────────────────────────────────────────────────────────

interface UseCase {
  number: string;
  problem: string;
  situation: string;
  context?: string;
  fix: string[];
  outcomes: { value: string; label: string }[];
  accent: string;
  icon: React.ReactNode;
}

interface Suite {
  id: string;
  phase: string;
  name: string;
  tagline: string;
  status: "Production" | "In Development" | "Coming Soon";
  statusColor: string;
  description: string;
  useCases: UseCase[];
}

// ── Accent color map ──────────────────────────────────────────────────────────

const ACCENTS: Record<string, { icon: string; badge: string; dot: string; metric: string; border: string; ring: string }> = {
  blue:    { icon: "text-blue-400 bg-blue-500/10",    badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",    dot: "bg-blue-400",    metric: "text-blue-400",    border: "border-blue-500/20",    ring: "ring-blue-500/20" },
  indigo:  { icon: "text-indigo-400 bg-indigo-500/10", badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", dot: "bg-indigo-400", metric: "text-indigo-400", border: "border-indigo-500/20", ring: "ring-indigo-500/20" },
  emerald: { icon: "text-emerald-400 bg-emerald-500/10", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", metric: "text-emerald-400", border: "border-emerald-500/20", ring: "ring-emerald-500/20" },
  violet:  { icon: "text-violet-400 bg-violet-500/10", badge: "text-violet-400 bg-violet-500/10 border-violet-500/20", dot: "bg-violet-400", metric: "text-violet-400", border: "border-violet-500/20", ring: "ring-violet-500/20" },
  cyan:    { icon: "text-cyan-400 bg-cyan-500/10",    badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",    dot: "bg-cyan-400",    metric: "text-cyan-400",    border: "border-cyan-500/20",    ring: "ring-cyan-500/20" },
  orange:  { icon: "text-orange-400 bg-orange-500/10", badge: "text-orange-400 bg-orange-500/10 border-orange-500/20", dot: "bg-orange-400", metric: "text-orange-400", border: "border-orange-500/20", ring: "ring-orange-500/20" },
  yellow:  { icon: "text-yellow-400 bg-yellow-500/10", badge: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", dot: "bg-yellow-400", metric: "text-yellow-400", border: "border-yellow-500/20", ring: "ring-yellow-500/20" },
  rose:    { icon: "text-rose-400 bg-rose-500/10",    badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",    dot: "bg-rose-400",    metric: "text-rose-400",    border: "border-rose-500/20",    ring: "ring-rose-500/20" },
  teal:    { icon: "text-teal-400 bg-teal-500/10",    badge: "text-teal-400 bg-teal-500/10 border-teal-500/20",    dot: "bg-teal-400",    metric: "text-teal-400",    border: "border-teal-500/20",    ring: "ring-teal-500/20" },
};

// ── Suite data ────────────────────────────────────────────────────────────────

const SUITES: Suite[] = [
  // ─── AR Automation Suite ────────────────────────────────────────────────────
  {
    id: "ar",
    phase: "01",
    name: "AR Automation Suite",
    tagline: "Invoice-to-cash. Running without you.",
    status: "Production",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
    description:
      "Accounts receivable is where most service businesses leak cash without realizing it. Money is owed, legally, by clients who already agreed to pay — but it sits uncollected because no one has a reliable system for getting it in. The AR suite closes that gap end to end.",
    useCases: [
      {
        number: "01",
        problem: "Invoices leave late — or not at all",
        situation:
          "For most service businesses, invoicing is a manual task that competes with everything else on the owner's plate. Jobs get completed, but billing follows days later — sometimes weeks. On a busy month, some invoices simply don't go out. The client doesn't bring it up. The owner eventually notices. By then, the cash is already a month behind.",
        context:
          "Every day an invoice sits unsent is a day added to DSO before the payment clock even starts. A business invoicing 3 days late on Net 30 terms is effectively running Net 33 — before the client pays late on top of it.",
        fix: [
          "Invoice generation triggered automatically when a job is completed, a contract date hits, or a recurring billing cycle fires — no manual initiation required",
          "Each invoice is validated against the client record in your accounting system before it leaves — correct address, correct terms, correct GL codes",
          "Same-day delivery for every billing event, regardless of how busy the week is",
          "Missed-billing alerts surface any client who should have been invoiced but wasn't, so nothing falls through",
        ],
        outcomes: [
          { value: "84%", label: "faster invoice processing" },
          { value: "Same-day", label: "invoices out on every billing event" },
          { value: "Zero", label: "missed billing cycles since go-live" },
        ],
        accent: "blue",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>,
      },
      {
        number: "02",
        problem: "Outstanding invoices with no follow-up system",
        situation:
          "The invoice goes out. Then it waits. There is no system — just the hope that the client pays on time. When they don't, follow-up depends on whoever remembers. That might be the owner, a part-time bookkeeper, or nobody. The result is the same: invoices age, relationships get awkward, and cash stays uncollected.",
        context:
          "The single biggest driver of high DSO in small service businesses is not late-paying clients — it is the absence of a consistent reminder cadence. Clients pay faster when reminded on a schedule. Most businesses simply don't have one.",
        fix: [
          "A 5-touch automated reminder sequence fires at Day 3, 7, 14, 21, and 30 past the due date — every time, on every overdue invoice, without anyone initiating it",
          "Tone and timing are calibrated by client tier: long-standing accounts get a lighter touch at Day 3; newer clients or high-balance invoices escalate faster",
          "Every reminder is professionally written and sent from the business — not a generic template, and not from a collections agency",
          "The owner is only surfaced when a specific account hits a threshold that requires personal judgment — everything below that runs without them",
          "AI Dispute Monitor flags any account paying significantly outside their own historical pattern before the invoice ages past easy collection",
        ],
        outcomes: [
          { value: "~40%", label: "reduction in average days-to-payment" },
          { value: "5-touch", label: "automated sequence per overdue invoice" },
          { value: "Zero", label: "manual follow-up required from the owner" },
        ],
        accent: "indigo",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
      },
      {
        number: "03",
        problem: "Bad debt written off as a cost of doing business",
        situation:
          "Every year, a few invoices go uncollected. The amount gets written off. It becomes a line on the P&L. Over time, this becomes accepted — $10K, $15K, $20K is just the cost of doing business in the service sector. It is not. It is what happens when at-risk accounts are caught too late, after the window for easy collection has closed.",
        context:
          "The difference between a collectible invoice and a write-off is almost always timing. Accounts that are caught at Day 30 overdue pay. Accounts caught at Day 90 often don't. The system needs to surface the risk at Day 30 — not after the owner notices at quarter-end.",
        fix: [
          "AI Dispute Monitor analyzes each account's payment pattern against their own history — flagging accounts that are paying materially outside their norm",
          "High-confidence flags are surfaced to the owner with context: how many days late, how many reminders sent, what their historical behavior looked like",
          "Escalation path is recommended based on pattern — some accounts respond to a revised payment plan offer; others require a direct call",
          "Complete communication audit trail is maintained for every account, usable in any formal dispute or collections process",
          "Reminder sequences escalate automatically as invoices age — the system does not wait for someone to notice",
        ],
        outcomes: [
          { value: "$0", label: "bad debt written off after go-live" },
          { value: "$18K", label: "average annual write-off eliminated" },
          { value: "Early", label: "at-risk detection, not after-the-fact" },
        ],
        accent: "emerald",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      },
      {
        number: "04",
        problem: "The owner is the de facto collections department",
        situation:
          "In most owner-operated businesses, AR follow-up defaults to the person at the top. Nobody else has the authority, the client relationship, or the willingness to push. So the owner does it — personal calls, uncomfortable emails, chasing people they also need to retain as clients. It works, but it costs 4–6 hours a week, creates relationship friction, and takes the owner away from the work that actually grows the business.",
        context:
          "This is the most expensive way to run collections. The owner's time has the highest opportunity cost in the organization. Every hour spent chasing a $3,000 invoice is an hour not spent closing a $30,000 contract.",
        fix: [
          "The entire reminder sequence runs from the business, professionally toned, without the owner's involvement — clients receive communication that feels personal without requiring personal time",
          "A daily AR summary is pushed to Slack or Teams every morning — the owner sees the number in 10 seconds without logging into anything",
          "Escalations surface only the specific accounts that genuinely require a personal call — a handful per month, clearly prioritized",
          "Client tier awareness means that high-value relationships get appropriately deferential messaging while chronic late-payers get appropriate pressure",
        ],
        outcomes: [
          { value: "4–6 hrs", label: "reclaimed per week by the owner" },
          { value: "Zero", label: "personal collections calls needed" },
          { value: "Daily", label: "AR digest in Slack or Teams" },
        ],
        accent: "violet",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      },
      {
        number: "05",
        problem: "No real-time visibility into what's owed",
        situation:
          "Getting a clear picture of AR means running a report, exporting it, and interpreting aging buckets by hand. That process happens once a week if it happens at all — and by the time the data is reviewed, it is already several days stale. At-risk accounts age in silence. Decisions are made without the full picture.",
        context:
          "A business running $500K/month in AR with a 45-day DSO has roughly $750K outstanding at any given time. Managing that blind — checking it weekly via exported spreadsheets — is like driving without a dashboard.",
        fix: [
          "A live AR dashboard shows DSO trend, aging buckets, overdue flags, and at-risk accounts — updated in real time from your accounting system",
          "A daily automated summary is pushed to Slack or Teams each morning — the key numbers without requiring anyone to log in or pull a report",
          "At-risk account flags surface before invoices age into write-off territory, not after",
          "DSO trend is visualized with the go-live date annotated — so the impact of LunarLogic is visible on the line, not just in a spreadsheet",
        ],
        outcomes: [
          { value: "Real-time", label: "AR visibility, no manual exports" },
          { value: "Daily", label: "automated digest, no login required" },
          { value: "Proactive", label: "at-risk alerts before accounts go stale" },
        ],
        accent: "cyan",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      },
      {
        number: "06",
        problem: "Cash flow is unpredictable month to month",
        situation:
          "Revenue looks healthy on the P&L but actual cash arriving varies wildly. Payroll, equipment purchases, and growth decisions all require knowing when money comes in — but when DSO fluctuates between 28 and 55 days depending on the month, that planning is guesswork. The business is profitable on paper and cash-constrained in practice.",
        context:
          "Unpredictable cash flow is almost always a DSO problem. When the gap between invoicing and collection varies by weeks, the business can't plan. Compressing DSO to a consistent, predictable range changes this — not just the average, but the variance.",
        fix: [
          "A consistent reminder cadence compresses DSO into a predictable, repeatable range — clients pay within a consistent window because they are always reminded within a consistent window",
          "DSO trend tracking makes month-to-month cash arrival projectable for the first time — the business stops guessing when money comes in",
          "Working capital trapped in aging AR is released on a reliable schedule — cash that was already earned starts arriving when expected",
          "The AR dashboard surfaces the projected cash inflow from outstanding invoices, giving a forward-looking view not just a historical one",
        ],
        outcomes: [
          { value: "~40%", label: "typical DSO compression" },
          { value: "Predictable", label: "monthly cash arrival window" },
          { value: "60 days", label: "to material, measurable improvement" },
        ],
        accent: "orange",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      },
    ],
  },

  // ─── AP Automation Suite ─────────────────────────────────────────────────────
  {
    id: "ap",
    phase: "02",
    name: "AP Automation Suite",
    tagline: "Outgoing cash — organized, approved, and on schedule.",
    status: "In Development",
    statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    description:
      "Once AR is running automatically, the same principle applies to the other side of the ledger. The AP suite brings the same discipline to outgoing cash — bills captured, routed, approved, and paid on a schedule that matches cash position. Nothing paid twice. Nothing paid late. Nothing paid without the right sign-off.",
    useCases: [
      {
        number: "01",
        problem: "Vendor bills scattered across inboxes with no central intake",
        situation:
          "Bills arrive via email, paper invoice, vendor portal, and occasionally a text from a supplier. There is no single place where payables live. Some get forwarded to a shared inbox. Some get filed manually. Some get overlooked until a vendor follows up — or until a service is cut off. The business has no reliable picture of what it owes.",
        context:
          "The same problem that plagues AR on the way in — no system, no visibility, no follow-through — exists on the AP side too. Bills that aren't captured consistently can't be managed consistently.",
        fix: [
          "Automated bill capture from vendor email, PDF attachments, and connected vendor portals — normalized into a single AP queue regardless of format or source",
          "Duplicate detection catches the same bill arriving through multiple channels before it creates a double-payment",
          "Aging alerts surface bills approaching due dates, prioritized by amount and vendor relationship",
          "Every bill is coded to the correct GL account and cost center before it reaches the approver — no manual categorization required",
        ],
        outcomes: [
          { value: "Zero", label: "bills missed from inbox overload" },
          { value: "Single", label: "intake queue regardless of source" },
          { value: "Automatic", label: "GL coding before approval routing" },
        ],
        accent: "yellow",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
      },
      {
        number: "02",
        problem: "No approval process — payments go out without oversight",
        situation:
          "In many small businesses, the person who processes payables is also the person who approves them. Bills get paid because someone entered them and clicked pay — not because a decision-maker reviewed and authorized them. This is a controls gap that exposes the business to errors, fraud, and cash flow surprises.",
        context:
          "A bill approved without review is a cost incurred without consent. At scale — 20, 30, 40 vendor bills per month — the cumulative financial exposure from unreviewed payables is significant.",
        fix: [
          "Approval routing configured by rule: vendor tier, bill amount, GL category, or any combination — routine utility bills route differently than large one-time vendor payments",
          "Approvers receive a Slack or Teams notification with a one-click approve or reject — no login to the accounting system required",
          "If an approval is not acted on within a configurable window, the bill escalates automatically to the next approver",
          "Every payment carries a complete audit trail: who received the bill, who approved it, when it was scheduled, and when it was paid",
        ],
        outcomes: [
          { value: "100%", label: "of bills reviewed before payment" },
          { value: "Same-day", label: "approval on routine bills via Slack" },
          { value: "Full", label: "audit trail on every payment" },
        ],
        accent: "rose",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      },
      {
        number: "03",
        problem: "Paying vendors late — or early — with no payment schedule",
        situation:
          "Without a payment schedule tied to cash position and due dates, bills get paid when someone gets to them. Sometimes that means paying early and losing the use of cash unnecessarily. Sometimes it means paying late and incurring penalties or damaging vendor relationships. Early-payment discounts — often 1–2% for paying within 10 days — go uncaptured.",
        context:
          "For a business with $50K/month in payables, capturing available early-payment discounts and eliminating late-payment penalties represents $10,000–$20,000 in annual cash impact. The difference between capturing it and missing it is a payment schedule.",
        fix: [
          "Payment scheduling optimized against due dates, available cash, and early-payment discount windows — the system recommends the most cash-efficient payment timing",
          "Early-payment discount opportunities are flagged automatically when the discount exceeds the cost of paying early",
          "Scheduled payments are batched and executed without manual intervention — approved once, paid on schedule",
          "Cash impact of the full payment queue is projected forward so the business sees what its cash position will be, not just what it is today",
        ],
        outcomes: [
          { value: "1–2%", label: "cost savings from captured early-pay discounts" },
          { value: "Zero", label: "late-payment penalties" },
          { value: "Optimized", label: "payment timing against cash position" },
        ],
        accent: "orange",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      },
      {
        number: "04",
        problem: "No visibility into what the business owes — or when",
        situation:
          "The AP picture is just as important as the AR picture, but it gets even less attention. Most businesses have a vague sense of what they owe based on what they can recall, not what a system tells them. Vendor calls come as surprises. Cash planning for payroll or equipment is done without accounting for outstanding payables.",
        context:
          "Running AR and AP in parallel — knowing what comes in and what goes out — is the prerequisite for genuine cash flow management. Either side alone is incomplete. Together, they make the business's cash position visible and plannable.",
        fix: [
          "A live AP dashboard shows every outstanding bill, due date, approval status, and scheduled payment — in one place, updated in real time",
          "The AP dashboard sits alongside the AR dashboard — incoming and outgoing cash visible in a single view",
          "A daily push summary includes AP obligations alongside AR receivables so the owner sees net cash impact every morning",
          "Projected cash position is calculated from scheduled payments and expected receivables — forward-looking, not just historical",
        ],
        outcomes: [
          { value: "Real-time", label: "AP visibility alongside AR" },
          { value: "Combined", label: "cash position forecast from both sides" },
          { value: "Zero", label: "vendor surprises from missed bills" },
        ],
        accent: "teal",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      },
    ],
  },

  // ─── Full Accounting Suite ────────────────────────────────────────────────────
  {
    id: "full",
    phase: "03",
    name: "Full Accounting Suite",
    tagline: "The entire financial operating layer — running without you.",
    status: "Coming Soon",
    statusColor: "text-slate-400 bg-slate-700 border-slate-600",
    description:
      "With AR and AP automated, the remaining friction is in the connective tissue: month-end close, cash flow forecasting, payroll reconciliation, and financial reporting. The full suite completes the loop — the business's entire financial operating layer runs automatically, and the owner gets accurate, real-time financial intelligence without any of the manual work that usually produces it.",
    useCases: [
      {
        number: "01",
        problem: "Month-end close takes two weeks of manual reconciliation",
        situation:
          "Every month, the same ritual: someone reconciles the bank statement against the accounting system, chases down missing receipts, corrects GL miscodes, and produces a P&L that is already stale by the time anyone reads it. The process takes 10–14 days, consumes staff time that could go toward revenue-generating work, and produces a snapshot of the past rather than a view of the present.",
        context:
          "When AR and AP are automated, the vast majority of transactions are already categorized, matched, and recorded in real time. Month-end close becomes validation rather than reconstruction — and that changes the timeline from weeks to days.",
        fix: [
          "With AR and AP transactions recorded automatically as they occur, reconciliation is reduced to anomaly review — not line-by-line matching",
          "Bank feed integration flags discrepancies between recorded transactions and actual bank activity in real time, not at month-end",
          "GL coding applied at transaction origination means corrections are rare rather than routine",
          "Month-end package — P&L, balance sheet, cash flow statement — generated automatically with one-click review by the owner or accountant",
        ],
        outcomes: [
          { value: "3 days", label: "month-end close (vs. 14-day manual)" },
          { value: "Real-time", label: "P&L, not month-old snapshots" },
          { value: "Zero", label: "manual reconciliation required" },
        ],
        accent: "blue",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      },
      {
        number: "02",
        problem: "Cash flow forecasting is built on guesswork",
        situation:
          "Projecting next month's cash position means combining what you remember about outstanding invoices with what you think you owe vendors, adjusted for payroll timing, with a rough estimate of what the month's revenue will look like. The output is a number that might be right to within $20,000. Planning for equipment, hiring, or growth on that basis is inherently risky.",
        context:
          "A business with automated AR and AP is already generating the data required for an accurate cash flow forecast — expected receivables from the AR queue, scheduled payables from the AP queue, and actual bank balances from the feed. The forecast builds itself from data that already exists.",
        fix: [
          "A 90-day rolling cash flow forecast built from actual AR pipeline, AP payment schedule, and bank balance — not estimates",
          "Expected receipts from the AR queue are projected based on historical payment patterns and outstanding invoice ages",
          "Scheduled AP payments are pulled directly from the payment queue — no manual input required",
          "Sensitivity scenarios modeled automatically: what the cash position looks like if 10% of outstanding AR pays 30 days late",
        ],
        outcomes: [
          { value: "90-day", label: "rolling cash flow forecast from real data" },
          { value: "Confident", label: "planning for growth, hiring, and equipment" },
          { value: "Automatic", label: "no spreadsheet required" },
        ],
        accent: "violet",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
      },
      {
        number: "03",
        problem: "Financial reporting is always behind — and never quite accurate",
        situation:
          "Reports reach the owner a week after month-end, built from exported data that was already stale when it was pulled. The process involves manual adjustments, restatements, and corrections that introduce their own errors. By the time a decision is made based on the report, two more weeks have passed. The business is always making decisions about the present using data from the past.",
        context:
          "Owners of service businesses typically spend fewer than 2 hours per month actually reviewing financial data — not because they don't care, but because access to current, reliable financial information requires too much friction. Remove the friction and the data gets used.",
        fix: [
          "Real-time P&L, cash flow, and AR/AP dashboards built from live transaction data — no export, no manual adjustment, no lag",
          "Owner-facing summary pushed daily alongside the AR digest — key financial metrics in a 30-second read",
          "Custom report templates for the business's specific needs: margin by client, revenue by service line, cost by project",
          "Accountant access to the same real-time data — eliminating the end-of-year data-gathering exercise that typically precedes tax preparation",
        ],
        outcomes: [
          { value: "Real-time", label: "financials, not month-old snapshots" },
          { value: "Daily", label: "financial digest alongside AR summary" },
          { value: "Zero", label: "manual report preparation required" },
        ],
        accent: "emerald",
        icon: <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      },
    ],
  },
];

// ── Use Case Card ─────────────────────────────────────────────────────────────

function UseCaseCard({ uc, index }: { uc: UseCase; index: number }) {
  const colors = ACCENTS[uc.accent];
  return (
    <ScrollReveal animation="fade-up" delay={index * 60}>
      <div className={`grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 items-start py-10 ${index > 0 ? "border-t border-slate-800" : ""}`}>
        {/* Left */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
              {uc.icon}
            </div>
            <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colors.badge}`}>
              Use Case {uc.number}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight mb-4">
            {uc.problem}
          </h3>

          <p className="text-slate-400 leading-relaxed mb-4">{uc.situation}</p>

          {uc.context && (
            <div className="bg-slate-800/40 border-l-2 border-blue-500/40 pl-4 py-2 mb-6 rounded-r-lg">
              <p className="text-sm text-slate-400 italic leading-relaxed">{uc.context}</p>
            </div>
          )}

          <div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
              How LunarLogic addresses it
            </p>
            <ul className="space-y-3">
              {uc.fix.map((item, fi) => (
                <li key={fi} className="flex items-start gap-3">
                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right */}
        <div className="lg:col-span-2">
          <div className={`bg-slate-800/50 border rounded-2xl p-6 ${colors.border}`}>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">
              The outcome
            </p>
            <div className="space-y-4">
              {uc.outcomes.map((outcome, oi) => (
                <div key={oi} className={`pb-4 ${oi < uc.outcomes.length - 1 ? "border-b border-slate-700/60" : ""}`}>
                  <p className={`text-2xl font-extrabold mb-0.5 ${colors.metric}`}>{outcome.value}</p>
                  <p className="text-sm text-slate-400">{outcome.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}

// ── Suite Section ─────────────────────────────────────────────────────────────

function SuiteSection({ suite }: { suite: Suite }) {
  return (
    <section id={suite.id} className="scroll-mt-20 py-16 sm:py-20 border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          {/* Suite header */}
          <div className="mb-12 pb-10 border-b border-slate-800">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phase {suite.phase}</span>
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${suite.statusColor}`}>
                {suite.status}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{suite.name}</h2>
            <p className="text-blue-400 font-semibold mb-5">{suite.tagline}</p>
            <p className="text-slate-400 leading-relaxed max-w-3xl">{suite.description}</p>
          </div>
        </ScrollReveal>

        {/* Use cases */}
        <div>
          {suite.useCases.map((uc, i) => (
            <UseCaseCard key={uc.number} uc={uc} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UseCasesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Use Cases</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 text-balance">
              Every accounting problem we were built to solve.
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              LunarLogic automates the financial operating layer of owner-operated service businesses — module by module,
              starting with AR — until the entire cycle runs without manual intervention. These are the problems that make
              that necessary, and what changes when each one is solved.
            </p>
          </ScrollReveal>

          {/* Suite nav */}
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {SUITES.map((suite) => (
                <a
                  key={suite.id}
                  href={`#${suite.id}`}
                  className="group flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white bg-slate-800/60 border border-slate-700 hover:border-slate-600 px-4 py-2 rounded-xl transition-colors"
                >
                  <span>{suite.name}</span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${suite.statusColor}`}>
                    {suite.status}
                  </span>
                </a>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Suite sections */}
      <div className="bg-slate-950">
        {SUITES.map((suite) => (
          <SuiteSection key={suite.id} suite={suite} />
        ))}
      </div>

      {/* Proof bridge */}
      <section className="py-16 bg-slate-900 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Real Results</p>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              These aren&apos;t hypotheticals.
            </h2>
            <p className="text-slate-400 mb-8 max-w-xl mx-auto">
              The AR use cases above map directly to live client outcomes — with real company names, real timelines,
              and real numbers. Read the case studies to see them in practice.
            </p>
            <Link
              href="/case-studies"
              className="inline-block border border-blue-500/40 hover:border-blue-400 text-blue-300 hover:text-blue-200 px-8 py-3.5 rounded-xl font-semibold text-sm transition-all"
            >
              Read Client Case Studies →
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CTASection
        heading="See your numbers in a live dashboard."
        subheading="Answer 4 questions about your invoice volume and payment terms. Get a personalized AR dashboard showing your DSO, your cash gap, and what changes when LunarLogic runs."
        ctaText="Calculate My DSO →"
        ctaHref="/calculate"
      />
    </>
  );
}
