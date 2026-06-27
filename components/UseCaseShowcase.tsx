"use client";

import { useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface UseCase {
  number: string;
  problem: string;
  snapshot: string;        // 1-2 sentences for desktop sticky
  situation: string;       // full version for mobile
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

// ── Accent colors ─────────────────────────────────────────────────────────────

const ACCENTS: Record<string, { icon: string; badge: string; dot: string; metric: string; border: string }> = {
  blue:    { icon: "text-blue-400 bg-blue-500/10",     badge: "text-blue-400 bg-blue-500/10 border-blue-500/20",     dot: "bg-blue-400",    metric: "text-blue-400",    border: "border-blue-500/20" },
  indigo:  { icon: "text-indigo-400 bg-indigo-500/10", badge: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20", dot: "bg-indigo-400", metric: "text-indigo-400", border: "border-indigo-500/20" },
  emerald: { icon: "text-emerald-400 bg-emerald-500/10", badge: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", dot: "bg-emerald-400", metric: "text-emerald-400", border: "border-emerald-500/20" },
  violet:  { icon: "text-violet-400 bg-violet-500/10", badge: "text-violet-400 bg-violet-500/10 border-violet-500/20", dot: "bg-violet-400", metric: "text-violet-400", border: "border-violet-500/20" },
  cyan:    { icon: "text-cyan-400 bg-cyan-500/10",     badge: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",     dot: "bg-cyan-400",    metric: "text-cyan-400",    border: "border-cyan-500/20" },
  orange:  { icon: "text-orange-400 bg-orange-500/10", badge: "text-orange-400 bg-orange-500/10 border-orange-500/20", dot: "bg-orange-400", metric: "text-orange-400", border: "border-orange-500/20" },
  yellow:  { icon: "text-yellow-400 bg-yellow-500/10", badge: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", dot: "bg-yellow-400", metric: "text-yellow-400", border: "border-yellow-500/20" },
  rose:    { icon: "text-rose-400 bg-rose-500/10",     badge: "text-rose-400 bg-rose-500/10 border-rose-500/20",     dot: "bg-rose-400",    metric: "text-rose-400",    border: "border-rose-500/20" },
  teal:    { icon: "text-teal-400 bg-teal-500/10",     badge: "text-teal-400 bg-teal-500/10 border-teal-500/20",     dot: "bg-teal-400",    metric: "text-teal-400",    border: "border-teal-500/20" },
};

// ── Suite data ─────────────────────────────────────────────────────────────────

const SUITES: Suite[] = [
  {
    id: "ar",
    phase: "01",
    name: "AR Automation Suite",
    tagline: "Invoice-to-cash. Running without you.",
    status: "Production",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
    description:
      "Accounts receivable is where most service businesses leak cash without realizing it. Money is legally owed — but it sits uncollected because no one has a reliable system for getting it in. The AR suite closes that gap end to end.",
    useCases: [
      {
        number: "01",
        problem: "Invoices leave late — or not at all",
        snapshot: "Jobs get completed but billing lags days or weeks behind. On a busy month, some invoices simply don't go out — the client doesn't bring it up, and the cash is already a month behind before anyone notices.",
        situation:
          "For most service businesses, invoicing is a manual task that competes with everything else on the owner's plate. Jobs get completed, but billing follows days later — sometimes weeks. On a busy month, some invoices simply don't go out. The client doesn't bring it up. The owner eventually notices. By then, the cash is already a month behind.",
        context: "Every day an invoice sits unsent is a day added to DSO before the payment clock even starts. A business invoicing 3 days late on Net 30 terms is effectively running Net 33 — before the client pays late on top of it.",
        fix: [
          "Invoice generation triggered automatically when a job is completed, a contract date hits, or a recurring billing cycle fires — no manual initiation required",
          "Each invoice validated against the client record in your accounting system before it leaves — correct address, correct terms, correct GL codes",
          "Same-day delivery for every billing event, regardless of how busy the week is",
          "Missed-billing alerts surface any client who should have been invoiced but wasn't",
        ],
        outcomes: [
          { value: "84%", label: "faster invoice processing" },
          { value: "Same-day", label: "invoices out on every billing event" },
          { value: "Zero", label: "missed billing cycles since go-live" },
        ],
        accent: "blue",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>,
      },
      {
        number: "02",
        problem: "Outstanding invoices with no follow-up system",
        snapshot: "Once an invoice is sent, it disappears. Follow-up only happens when someone remembers — usually when cash gets tight. By then the invoice is 45 days overdue and the client has mentally moved on.",
        situation:
          "Once an invoice is sent, it disappears into the void. Follow-up only happens when someone remembers — usually when cash gets tight. By then the invoice is 45 days overdue, the client has mentally moved on, and the conversation is already uncomfortable. The single biggest driver of high DSO in service businesses is not late-paying clients — it is the absence of a consistent reminder cadence.",
        context: "Clients pay faster when reminded on a schedule. Most businesses simply don't have one.",
        fix: [
          "5-touch automated reminder sequence at Day 3, 7, 14, 21, and 30 past due — every time, on every overdue invoice, without anyone initiating it",
          "Tone and timing calibrated by client tier: long-standing accounts get a lighter touch, newer or high-balance invoices escalate faster",
          "Every reminder sent professionally from the business — not a generic template, not from a collections agency",
          "Owner surfaced only when a specific account hits a threshold that requires personal judgment",
          "AI Dispute Monitor flags any account paying significantly outside their own historical pattern",
        ],
        outcomes: [
          { value: "~40%", label: "reduction in average days-to-payment" },
          { value: "5-touch", label: "automated sequence per overdue invoice" },
          { value: "Zero", label: "manual follow-up required from the owner" },
        ],
        accent: "indigo",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
      },
      {
        number: "03",
        problem: "Bad debt written off as a cost of doing business",
        snapshot: "Every year, a few invoices get written off — $10K, $15K, $20K. It becomes normalized. But bad debt is what happens when at-risk accounts are caught too late, not an industry constant.",
        situation:
          "Every year, some AR gets written off. The amount becomes a line on the P&L and it becomes accepted — $10K, $15K, $20K is just the cost of doing business. It is not. It is what happens when at-risk accounts are caught too late, after the window for easy collection has closed. The difference between a collectible invoice and a write-off is almost always timing.",
        context: "Accounts caught at 30 days overdue pay. Accounts caught at 90 days often don't. The system needs to surface the risk at 30 days — not after the owner notices at quarter-end.",
        fix: [
          "AI Dispute Monitor analyzes each account's payment pattern against their own history — flagging accounts paying materially outside their norm",
          "High-confidence flags surfaced with context: days late, reminders sent, historical behavior — and a recommended escalation path",
          "Escalation sequences tighten automatically as invoices age — the system doesn't wait for someone to notice",
          "Complete communication audit trail maintained for every account, usable in any formal dispute or collections process",
        ],
        outcomes: [
          { value: "$0", label: "bad debt written off after go-live" },
          { value: "$18K", label: "average annual write-off eliminated" },
          { value: "Early", label: "at-risk detection before accounts go cold" },
        ],
        accent: "emerald",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      },
      {
        number: "04",
        problem: "The owner is the de facto collections department",
        snapshot: "Nobody else follows up consistently, so the owner does it — personal calls, uncomfortable emails, 4–6 hours a week. Every hour chasing a $3,000 invoice is an hour not spent closing a $30,000 contract.",
        situation:
          "In most owner-operated businesses, AR follow-up defaults to the person at the top. Nobody else has the authority, the client relationship, or the willingness to push. So the owner does it — personal calls, uncomfortable emails to clients they also need to retain. It works, but it costs 4–6 hours a week, creates relationship friction, and takes the owner away from the work that actually grows the business.",
        context: "The owner's time has the highest opportunity cost in the organization. Every hour spent chasing a $3,000 invoice is an hour not spent closing a $30,000 contract.",
        fix: [
          "Entire reminder sequence runs from the business, professionally toned, without owner involvement — clients receive communication that feels personal without requiring personal time",
          "Daily AR summary pushed to Slack or Teams every morning — the owner sees the number in 10 seconds without logging into anything",
          "Escalations surface only the accounts that genuinely need a personal call — a handful per month, clearly prioritized",
          "Client tier awareness means high-value relationships get appropriately deferential messaging while chronic late-payers get appropriate pressure",
        ],
        outcomes: [
          { value: "4–6 hrs", label: "reclaimed per week by the owner" },
          { value: "Zero", label: "personal collections calls needed" },
          { value: "Daily", label: "AR digest in Slack or Teams" },
        ],
        accent: "violet",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      },
      {
        number: "05",
        problem: "No real-time visibility into what's owed",
        snapshot: "Getting a picture of AR means running a report, exporting it, and interpreting aging buckets manually — once a week if it happens at all. At-risk accounts age in silence between those checks.",
        situation:
          "Getting a clear picture of AR means running a report, exporting it, and interpreting aging buckets by hand. That process happens once a week if it happens at all — and by the time the data is reviewed, it's already several days stale. A business running $500K/month in AR with a 45-day DSO has roughly $750K outstanding at any given time. Managing that blind is like driving without a dashboard.",
        context: "At-risk accounts age in silence between weekly checks. Flags that would have been easy to act on at Day 30 become write-offs by Day 75.",
        fix: [
          "Live AR dashboard with DSO trend, aging buckets, and overdue flags — updated in real time from your accounting system",
          "Daily automated summary pushed to Slack or Teams each morning — key numbers without requiring anyone to log in",
          "At-risk account flags surface before invoices age into write-off territory, not after",
          "DSO trend line annotated with go-live date — the impact of LunarLogic is visible on the chart, not just in a spreadsheet",
        ],
        outcomes: [
          { value: "Real-time", label: "AR visibility, no manual exports" },
          { value: "Daily", label: "automated digest, no login required" },
          { value: "Proactive", label: "at-risk alerts before accounts go cold" },
        ],
        accent: "cyan",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      },
      {
        number: "06",
        problem: "Cash flow is unpredictable month to month",
        snapshot: "Revenue looks healthy on the P&L but actual cash arriving varies wildly. When DSO fluctuates between 28 and 55 days, planning for payroll, equipment, or growth is guesswork.",
        situation:
          "Revenue looks healthy on paper but actual cash arriving varies wildly. Payroll, equipment, and growth decisions all require knowing when money comes in — but when DSO fluctuates between 28 and 55 days month to month, planning is guesswork. Unpredictable cash flow is almost always a DSO problem: when the gap between invoicing and collection varies by weeks, the business can't plan.",
        context: "Compressing DSO to a consistent, predictable range changes this — not just the average, but the variance. Businesses stop asking when money arrives and start knowing.",
        fix: [
          "Consistent reminder cadence compresses DSO into a predictable, repeatable range — clients pay within a consistent window because they're always reminded within a consistent window",
          "DSO trend tracking makes month-to-month cash arrival projectable for the first time",
          "Working capital trapped in aging AR released on a reliable schedule — cash already earned starts arriving when expected",
          "AR dashboard surfaces projected cash inflow from outstanding invoices — a forward-looking view, not just historical",
        ],
        outcomes: [
          { value: "~40%", label: "typical DSO compression" },
          { value: "Predictable", label: "monthly cash arrival window" },
          { value: "60 days", label: "to material, measurable improvement" },
        ],
        accent: "orange",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      },
    ],
  },

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
        snapshot: "Bills arrive via email, paper, vendor portal, and occasionally a text. There's no single place where payables live. Things get paid late, paid twice, or overlooked until a vendor follows up.",
        situation:
          "Bills arrive via email, paper invoice, vendor portal, and occasionally a text from a supplier. There is no single place where payables live. Some get forwarded to a shared inbox. Some get filed manually. Some get overlooked until a vendor follows up — or until a service is cut off. The same problem that plagues AR on the way in exists on the AP side too: no system, no visibility, no follow-through.",
        fix: [
          "Automated bill capture from vendor email, PDF attachments, and connected vendor portals — normalized into a single AP queue regardless of format or source",
          "Duplicate detection catches the same bill arriving through multiple channels before it creates a double-payment",
          "Aging alerts surface bills approaching due dates, prioritized by amount and vendor relationship",
          "Every bill coded to the correct GL account and cost center before it reaches the approver — no manual categorization required",
        ],
        outcomes: [
          { value: "Zero", label: "bills missed from inbox overload" },
          { value: "Single", label: "intake queue regardless of source" },
          { value: "Automatic", label: "GL coding before approval routing" },
        ],
        accent: "yellow",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
      },
      {
        number: "02",
        problem: "Payments go out without proper review or approval",
        snapshot: "In many small businesses, the person who processes payables also approves them. Bills get paid because someone entered them — not because a decision-maker reviewed and authorized them.",
        situation:
          "In many small businesses, the person who processes payables is also the person who approves them. Bills get paid because someone entered them and clicked pay — not because a decision-maker reviewed and authorized them. This is a controls gap that exposes the business to errors, fraud, and cash flow surprises. At scale — 20 to 40 vendor bills per month — the cumulative financial exposure from unreviewed payables is significant.",
        fix: [
          "Approval routing configured by rule: vendor tier, bill amount, GL category, or any combination — routine bills route differently than large one-time vendor payments",
          "Approvers receive a Slack or Teams notification with one-click approve or reject — no login to the accounting system required",
          "If an approval is not acted on within a configurable window, the bill escalates automatically to the next approver",
          "Every payment carries a complete audit trail: who received the bill, who approved it, when it was scheduled, and when it was paid",
        ],
        outcomes: [
          { value: "100%", label: "of bills reviewed before payment" },
          { value: "Same-day", label: "approval on routine bills via Slack" },
          { value: "Full", label: "audit trail on every payment" },
        ],
        accent: "rose",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      },
      {
        number: "03",
        problem: "Paying late — or early — with no payment schedule",
        snapshot: "Without a payment schedule tied to cash position, bills get paid when someone gets to them. Early-payment discounts go uncaptured. Occasionally something goes late, and the penalty follows.",
        situation:
          "Without a payment schedule tied to cash position and due dates, bills get paid when someone gets to them. Sometimes that means paying early and losing the use of cash unnecessarily. Sometimes it means paying late and incurring penalties or damaging vendor relationships. Early-payment discounts — often 1–2% for paying within 10 days — go uncaptured. For a business with $50K/month in payables, that's $10,000–$20,000 in annual cash impact.",
        fix: [
          "Payment scheduling optimized against due dates, available cash, and early-payment discount windows — the system recommends the most cash-efficient payment timing",
          "Early-payment discount opportunities flagged automatically when the discount exceeds the cost of paying early",
          "Scheduled payments batched and executed without manual intervention — approved once, paid on schedule",
          "Cash impact of the full payment queue projected forward so the business sees what its cash position will be, not just what it is today",
        ],
        outcomes: [
          { value: "1–2%", label: "cost savings from captured early-pay discounts" },
          { value: "Zero", label: "late-payment penalties" },
          { value: "Optimized", label: "payment timing against cash position" },
        ],
        accent: "orange",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      },
      {
        number: "04",
        problem: "No visibility into what the business owes — or when",
        snapshot: "Knowing what's owed to vendors requires logging into the accounting system and running reports manually. Cash planning is done without a clear AP picture — which means the plan is incomplete.",
        situation:
          "The AP picture is just as important as the AR picture, but gets even less attention. Most businesses have a vague sense of what they owe based on what they can recall, not what a system tells them. Vendor calls come as surprises. Cash planning for payroll or equipment is done without accounting for outstanding payables. Running AR and AP in parallel — knowing what comes in and what goes out — is the prerequisite for genuine cash flow management.",
        fix: [
          "Live AP dashboard showing every outstanding bill, due date, approval status, and scheduled payment — updated in real time",
          "The AP view sits alongside the AR dashboard — incoming and outgoing cash visible in a single pane",
          "Daily push summary includes AP obligations alongside AR receivables so the owner sees net cash impact every morning",
          "Projected cash position calculated from scheduled payments and expected receivables — forward-looking, not just historical",
        ],
        outcomes: [
          { value: "Real-time", label: "AP visibility alongside AR" },
          { value: "Combined", label: "cash position forecast from both sides" },
          { value: "Zero", label: "vendor surprises from missed bills" },
        ],
        accent: "teal",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      },
    ],
  },

  {
    id: "full",
    phase: "03",
    name: "Full Accounting Suite",
    tagline: "The entire financial operating layer — running without you.",
    status: "Coming Soon",
    statusColor: "text-slate-400 bg-slate-700 border-slate-600",
    description:
      "With AR and AP automated, the remaining friction is in the connective tissue: month-end close, cash flow forecasting, and financial reporting. The full suite completes the loop — the entire financial backbone runs automatically, and the owner gets accurate, real-time financial intelligence without the manual work that usually produces it.",
    useCases: [
      {
        number: "01",
        problem: "Month-end close takes two weeks of manual work",
        snapshot: "Every month-end: reconcile bank against accounting system, chase missing receipts, correct miscodes, produce a P&L that's already stale. The process takes 10–14 days of staff time.",
        situation:
          "Every month, the same ritual: reconcile the bank statement against the accounting system, chase down missing receipts, correct GL miscodes, and produce a P&L that is already stale by the time anyone reads it. The process takes 10–14 days, consumes staff time that could go toward revenue-generating work, and produces a snapshot of the past rather than a view of the present. When AR and AP are automated, the vast majority of transactions are already categorized, matched, and recorded in real time — close becomes validation rather than reconstruction.",
        fix: [
          "With AR and AP transactions recorded automatically as they occur, reconciliation is reduced to anomaly review — not line-by-line matching",
          "Bank feed integration flags discrepancies between recorded transactions and actual bank activity in real time, not at month-end",
          "GL coding applied at transaction origination means corrections are rare rather than routine",
          "Month-end package — P&L, balance sheet, cash flow statement — generated automatically with one-click review",
        ],
        outcomes: [
          { value: "3 days", label: "month-end close (vs. 14-day manual)" },
          { value: "Real-time", label: "P&L, not month-old snapshots" },
          { value: "Zero", label: "manual reconciliation required" },
        ],
        accent: "blue",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      },
      {
        number: "02",
        problem: "Cash flow forecasting is built on guesswork",
        snapshot: "Projecting next month's cash position means combining remembered invoices with estimated payables and a rough sense of revenue. The output might be right to within $20,000.",
        situation:
          "Projecting next month's cash position means combining what you remember about outstanding invoices with what you think you owe vendors, adjusted for payroll timing, with a rough estimate of what the month's revenue will look like. The output is a number that might be right to within $20,000. Planning for equipment, hiring, or growth on that basis is inherently risky. A business with automated AR and AP is already generating the data required for an accurate forecast — the forecast builds itself from data that already exists.",
        fix: [
          "90-day rolling cash flow forecast built from actual AR pipeline, AP payment schedule, and bank balance — not estimates",
          "Expected receipts projected based on historical payment patterns and outstanding invoice ages",
          "Scheduled AP payments pulled directly from the payment queue — no manual input required",
          "Sensitivity scenarios modeled automatically: what the cash position looks like if 10% of outstanding AR pays 30 days late",
        ],
        outcomes: [
          { value: "90-day", label: "rolling cash forecast from real data" },
          { value: "Confident", label: "planning for growth, hiring, equipment" },
          { value: "Automatic", label: "no spreadsheet required" },
        ],
        accent: "violet",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
      },
      {
        number: "03",
        problem: "Financial reporting is always behind — and never quite accurate",
        snapshot: "Reports reach the owner a week after month-end, built from exported data that was stale when it was pulled. Decisions about the present are made using data from the past.",
        situation:
          "Reports reach the owner a week after month-end, built from exported data that was already stale when it was pulled. The process involves manual adjustments, restatements, and corrections that introduce their own errors. By the time a decision is made, two more weeks have passed. Owners of service businesses typically spend fewer than 2 hours per month reviewing financial data — not because they don't care, but because access to current, reliable financial information requires too much friction. Remove the friction and the data gets used.",
        fix: [
          "Real-time P&L, cash flow, and AR/AP dashboards built from live transaction data — no export, no manual adjustment, no lag",
          "Owner-facing summary pushed daily alongside the AR digest — key financial metrics in a 30-second read",
          "Custom report templates for the business's specific needs: margin by client, revenue by service line, cost by project",
          "Accountant access to the same real-time data — eliminating the year-end data-gathering exercise before tax preparation",
        ],
        outcomes: [
          { value: "Real-time", label: "financials, not month-old snapshots" },
          { value: "Daily", label: "financial digest alongside AR summary" },
          { value: "Zero", label: "manual report preparation required" },
        ],
        accent: "emerald",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function shortLabel(problem: string): string {
  return problem.split("—")[0].split(".")[0].split(",")[0].trim().split(" ").slice(0, 3).join(" ");
}


// ── Desktop sticky suite ───────────────────────────────────────────────────────

function DesktopSuite({
  suite,
  sectionRef,
}: {
  suite: Suite;
  sectionRef: (el: HTMLDivElement | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const currentIdxRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
      const newIdx = Math.min(suite.useCases.length - 1, Math.floor(progress * suite.useCases.length));
      if (newIdx === currentIdxRef.current) return;
      currentIdxRef.current = newIdx;
      setVisible(false);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setActiveIdx(newIdx);
        setVisible(true);
      }, 160);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [suite.useCases.length]);

  const uc = suite.useCases[activeIdx];
  const colors = ACCENTS[uc.accent];

  const scrollToUseCase = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const scrollTarget =
      containerTop +
      (idx / suite.useCases.length) * (container.offsetHeight - window.innerHeight) +
      10;
    window.scrollTo({ top: scrollTarget, behavior: "smooth" });
  };

  return (
    <div
      ref={(el) => { containerRef.current = el; sectionRef(el); }}
      id={suite.id}
      style={{ height: `${suite.useCases.length * 100}vh` }}
    >
      {/* sticky panel sits below nav (64px) + suite tab bar (~48px) */}
      <div
        className="sticky bg-slate-950 flex flex-col overflow-hidden"
        style={{ top: "112px", height: "calc(100vh - 112px)" }}
      >

        {/* Suite header strip */}
        <div className="flex-shrink-0 border-b border-slate-800 px-6 lg:px-10 py-3 flex items-center gap-3">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phase {suite.phase}</span>
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${suite.statusColor}`}>
            {suite.status}
          </span>
          <span className="text-sm font-semibold text-white">{suite.name}</span>
          <span className="ml-auto text-xs text-slate-500">
            {activeIdx + 1} / {suite.useCases.length}
          </span>
        </div>

        {/* Main content */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-10 grid grid-cols-5 gap-10 xl:gap-16 items-center min-h-0">

          {/* Left: problem + fix */}
          <div className="col-span-3 flex flex-col justify-center">
            <div
              className="transition-all duration-[160ms] ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                  {uc.icon}
                </div>
                <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colors.badge}`}>
                  Use Case {uc.number}
                </span>
              </div>

              <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-4">
                {uc.problem}
              </h2>
              <p className="text-base xl:text-lg text-slate-400 leading-relaxed mb-5 max-w-xl">
                {uc.snapshot}
              </p>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                How LunarLogic addresses it
              </p>
              <ul className="space-y-2.5">
                {uc.fix.slice(0, 3).map((item, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                    <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: outcome card */}
          <div className="col-span-2 flex items-center justify-center">
            <div
              className="w-full transition-all duration-[160ms] ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "scale(1)" : "scale(0.97)",
              }}
            >
              <div className={`bg-slate-800/50 border rounded-2xl p-6 ${colors.border}`}>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">The outcome</p>
                <div className="space-y-4">
                  {uc.outcomes.map((outcome, oi) => (
                    <div
                      key={oi}
                      className={`pb-4 ${oi < uc.outcomes.length - 1 ? "border-b border-slate-700/60" : ""}`}
                    >
                      <p className={`text-2xl font-extrabold mb-0.5 ${colors.metric}`}>{outcome.value}</p>
                      <p className="text-sm text-slate-400">{outcome.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex-shrink-0 pb-5 flex items-center justify-center gap-5 xl:gap-8">
          {suite.useCases.map((u, i) => (
            <button
              key={i}
              onClick={() => scrollToUseCase(i)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <div
                className={`h-0.5 rounded-full transition-all duration-300 ${
                  i === activeIdx ? "w-8 bg-blue-400" : "w-4 bg-slate-700 group-hover:bg-slate-500"
                }`}
              />
              <span
                className={`text-xs transition-colors whitespace-nowrap ${
                  i === activeIdx
                    ? "text-blue-400 font-semibold"
                    : "text-slate-600 group-hover:text-slate-400"
                }`}
              >
                {i === activeIdx ? shortLabel(u.problem) : `0${i + 1}`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile suite (scroll-linked sliding stack) ────────────────────────────────

function MobileSuite({
  suite,
  sectionRef,
}: {
  suite: Suite;
  sectionRef: (el: HTMLDivElement | null) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const contentAreaRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const currentIdxRef = useRef(0);

  // Keep each card's height equal to the visible content area
  useEffect(() => {
    const syncHeights = () => {
      const area = contentAreaRef.current;
      const stack = stackRef.current;
      if (!area || !stack) return;
      const h = area.offsetHeight;
      if (h === 0) return;
      Array.from(stack.children).forEach((child) => {
        (child as HTMLElement).style.height = `${h}px`;
      });
    };
    const raf = requestAnimationFrame(syncHeights);
    window.addEventListener("resize", syncHeights);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", syncHeights); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const stack = stackRef.current;
      const area = contentAreaRef.current;
      if (!container || !stack || !area) return;

      const rect = container.getBoundingClientRect();
      const scrollableHeight = container.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));

      const n = suite.useCases.length;
      const exactPos = progress * n;

      // Slide the entire stack — directly tied to scroll, no threshold
      stack.style.transform = `translateY(-${exactPos * area.offsetHeight}px)`;

      // Update dot indicator
      const newIdx = Math.min(n - 1, Math.floor(exactPos));
      if (newIdx !== currentIdxRef.current) {
        currentIdxRef.current = newIdx;
        setActiveIdx(newIdx);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [suite.useCases.length]);

  const scrollToUseCase = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const containerTop = container.getBoundingClientRect().top + window.scrollY;
    const target = containerTop + (idx / suite.useCases.length) * (container.offsetHeight - window.innerHeight) + 10;
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <div
      ref={(el) => { containerRef.current = el; sectionRef(el); }}
      id={`${suite.id}-mobile`}
      style={{ height: `${suite.useCases.length * 100}vh` }}
    >
      <div
        className="sticky bg-slate-950 flex flex-col overflow-hidden"
        style={{ top: "112px", height: "calc(100vh - 112px)" }}
      >
        {/* Suite header strip */}
        <div className="flex-shrink-0 border-b border-slate-800 px-4 sm:px-6 py-2.5 flex items-center gap-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phase {suite.phase}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${suite.statusColor}`}>
            {suite.status}
          </span>
          <span className="text-xs font-semibold text-white ml-1 truncate">{suite.name}</span>
          <span className="ml-auto text-xs text-slate-500 flex-shrink-0">{activeIdx + 1} / {suite.useCases.length}</span>
        </div>

        {/* Sliding window — overflow hidden clips to one card at a time */}
        <div ref={contentAreaRef} className="flex-1 relative overflow-hidden min-h-0">
          <div ref={stackRef} className="absolute inset-x-0 top-0" style={{ willChange: "transform" }}>
            {suite.useCases.map((uc) => {
              const colors = ACCENTS[uc.accent];
              return (
                <div key={uc.number} className="overflow-hidden px-4 sm:px-6 py-5 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                      {uc.icon}
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border ${colors.badge}`}>
                      Use Case {uc.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-white leading-tight mb-3">{uc.problem}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{uc.snapshot}</p>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">
                    How LunarLogic addresses it
                  </p>
                  <ul className="space-y-2 mb-4">
                    {uc.fix.slice(0, 2).map((item, fi) => (
                      <li key={fi} className="flex items-start gap-2.5">
                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                        <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className={`bg-slate-900/60 border rounded-xl p-3.5 ${colors.border}`}>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">The outcome</p>
                    <div className="grid grid-cols-3 gap-2">
                      {uc.outcomes.map((outcome, oi) => (
                        <div key={oi} className="text-center">
                          <p className={`text-base font-extrabold leading-tight ${colors.metric}`}>{outcome.value}</p>
                          <p className="text-xs text-slate-500 mt-0.5 leading-tight">{outcome.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dot navigation */}
        <div className="flex-shrink-0 pb-4 pt-1 flex items-center justify-center gap-5">
          {suite.useCases.map((u, i) => (
            <button
              key={i}
              onClick={() => scrollToUseCase(i)}
              aria-label={`Use case ${i + 1}: ${u.problem}`}
              className="flex flex-col items-center gap-1 py-1"
            >
              <div className={`h-1 rounded-full transition-all duration-300 ${
                i === activeIdx ? "w-6 bg-blue-400" : "w-3 bg-slate-700"
              }`} />
              <span className={`text-xs transition-colors ${
                i === activeIdx ? "text-blue-400 font-semibold" : "text-slate-600"
              }`}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile showcase with sticky suite tabs ─────────────────────────────────────

function MobileShowcase() {
  const [activeTab, setActiveTab] = useState(SUITES[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.35;
      let current = SUITES[0].id;
      for (const suite of SUITES) {
        const el = sectionRefs.current[suite.id];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollMid) current = suite.id;
        }
      }
      setActiveTab(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSuite = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div>
      {/* Sticky suite tab selector */}
      <div className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="flex justify-center gap-1.5 px-4 sm:px-6 py-3 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          {SUITES.map((suite) => {
            const label = suite.id === "full"
              ? "Full Accounting"
              : suite.name.replace(" Automation", "");
            return (
              <button
                key={suite.id}
                onClick={() => scrollToSuite(suite.id)}
                className={`flex-none px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
                  activeTab === suite.id
                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    : "text-slate-500 border border-transparent hover:text-slate-300"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Suite sections — each one sticky-scrolls through its use cases */}
      {SUITES.map((suite) => (
        <MobileSuite
          key={suite.id}
          suite={suite}
          sectionRef={(el) => { sectionRefs.current[suite.id] = el; }}
        />
      ))}
    </div>
  );
}

// ── Desktop showcase with sticky suite tabs ───────────────────────────────────

function DesktopShowcase() {
  const [activeTab, setActiveTab] = useState(SUITES[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.35;
      let current = SUITES[0].id;
      for (const suite of SUITES) {
        const el = sectionRefs.current[suite.id];
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (top <= scrollMid) current = suite.id;
        }
      }
      setActiveTab(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSuite = (id: string) => {
    const el = sectionRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <div>
      {/* Sticky suite tab bar */}
      <div className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-center gap-3 py-2">
          {SUITES.map((suite) => (
            <button
              key={suite.id}
              onClick={() => scrollToSuite(suite.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors whitespace-nowrap ${
                activeTab === suite.id
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "text-slate-500 border border-transparent hover:text-slate-300"
              }`}
            >
              {suite.name}
            </button>
          ))}
        </div>
      </div>

      {/* Suite sections */}
      {SUITES.map((suite) => (
        <DesktopSuite
          key={suite.id}
          suite={suite}
          sectionRef={(el) => { sectionRefs.current[suite.id] = el; }}
        />
      ))}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function UseCaseShowcase() {
  return (
    <>
      {/* Mobile */}
      <div className="lg:hidden">
        <MobileShowcase />
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <DesktopShowcase />
      </div>
    </>
  );
}
