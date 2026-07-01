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
  status: "Available Now" | "In the Works" | "Coming Soon";
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
    name: "Getting Paid",
    tagline: "Getting paid, handled for you.",
    status: "Available Now",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
    description:
      "Getting paid is where most service businesses quietly lose money. The work is done and the money is owed, but it sits there because nobody is reliably collecting it. This is the part LunarLogic handles first, from invoice to money in the bank.",
    useCases: [
      {
        number: "01",
        problem: "Invoices go out late, or not at all",
        snapshot: "The job gets done, but the invoice goes out days or weeks later. In a busy month, some never go out at all. The customer is not going to remind you, and by the time you notice, the money is already a month behind.",
        situation:
          "For most service businesses, invoicing is a manual task that competes with everything else on the owner's plate. Jobs get completed, but billing follows days later, sometimes weeks. On a busy month, some invoices simply don't go out. The client doesn't bring it up. The owner eventually notices. By then, the cash is already a month behind.",
        context: "Every day an invoice sits unsent is a day added to DSO before the payment clock even starts. A business invoicing 3 days late on Net 30 terms is effectively running Net 33, before the client pays late on top of it.",
        fix: [
          "Invoices go out on their own the moment a job is done or a recurring bill is due, so you never have to remember to send anything",
          "Every invoice is double-checked against your customer's details first: right address, right amount, right terms",
          "Invoices go out the same day, every day, no matter how busy the week gets",
          "If a customer should have been billed but wasn't, you get an alert",
        ],
        outcomes: [
          { value: "84%", label: "faster invoicing" },
          { value: "Same-day", label: "invoices out every time" },
          { value: "Zero", label: "invoices forgotten" },
        ],
        accent: "blue",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" /></svg>,
      },
      {
        number: "02",
        problem: "Nobody follows up on unpaid invoices",
        snapshot: "Once an invoice is sent, it is out of sight. Someone only follows up when they happen to remember, usually when cash gets tight. By then it is 45 days late and the customer has long moved on.",
        situation:
          "Once an invoice is sent, it disappears into the void. Follow-up only happens when someone remembers, usually when cash gets tight. By then the invoice is 45 days overdue, the client has mentally moved on, and the conversation is already uncomfortable. The single biggest driver of high DSO in service businesses is not late-paying clients, it is the absence of a consistent reminder cadence.",
        context: "Clients pay faster when reminded on a schedule. Most businesses simply don't have one.",
        fix: [
          "Courteous reminders go out automatically on day 3, 7, 14, 21, and 30, on every late invoice, without anyone lifting a finger",
          "The tone fits the customer: your loyal regulars get a lighter touch, while consistently late payers get a firmer one",
          "Every reminder looks like it came from you, not a template and not a collections agency",
          "You only get pulled in when an invoice really needs a personal touch",
        ],
        outcomes: [
          { value: "~40%", label: "faster to get paid" },
          { value: "5", label: "reminders sent for you, every time" },
          { value: "Zero", label: "follow-up you have to do yourself" },
        ],
        accent: "indigo",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
      },
      {
        number: "03",
        problem: "Writing off unpaid invoices as \"just part of business\"",
        snapshot: "Every year a few invoices never get paid: $10K, $15K, $20K written off. It starts to feel normal. But that is usually what happens when a late-paying customer is caught too late. It is not something you have to accept.",
        situation:
          "Every year, some AR gets written off. The amount becomes a line on the P&L and it becomes accepted: $10K, $15K, $20K is just the cost of doing business. It doesn't have to be. It is what happens when at-risk accounts are caught too late, after the window for easy collection has closed. The difference between a collectible invoice and a write-off is almost always timing.",
        context: "Accounts caught at 30 days overdue pay. Accounts caught at 90 days often don't. The system needs to surface the risk at 30 days, not after the owner notices at quarter-end.",
        fix: [
          "LunarLogic watches how each customer usually pays and flags the ones who are suddenly paying slower than normal",
          "You see exactly why a customer is flagged: how late they are, what has been sent, and what to do next",
          "The reminders get firmer on their own as an invoice ages, instead of waiting for you to notice",
          "Every message to every customer is saved, so you have a clear record if it ever comes to that",
        ],
        outcomes: [
          { value: "$0", label: "written off since starting" },
          { value: "$18K", label: "a year no longer lost" },
          { value: "Early", label: "warning before a customer goes quiet" },
        ],
        accent: "emerald",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
      },
      {
        number: "04",
        problem: "You are the one chasing every payment",
        snapshot: "No one else does it consistently, so it falls to you: personal calls, uncomfortable emails, 4 to 6 hours a week. Every hour spent chasing a $3,000 invoice is an hour you are not spending to win a $30,000 job.",
        situation:
          "In most owner-operated businesses, AR follow-up defaults to the person at the top. Nobody else has the authority, the client relationship, or the willingness to push. So the owner does it: personal calls, uncomfortable emails to clients they also need to retain. It works, but it costs 4–6 hours a week, creates relationship friction, and takes the owner away from the work that actually grows the business.",
        context: "The owner's time has the highest opportunity cost in the organization. Every hour spent chasing a $3,000 invoice is an hour not spent closing a $30,000 contract.",
        fix: [
          "All the reminders go out for you, sounding like you, so customers feel looked after without taking any of your time",
          "A quick summary lands in Slack or Teams each morning, so you see where you stand in 10 seconds, without logging in",
          "You are only handed the few customers who genuinely need a personal call, clearly sorted by priority",
          "Your best customers get a lighter touch while consistently late payers get a firmer one, automatically",
        ],
        outcomes: [
          { value: "4–6 hrs", label: "back in your week" },
          { value: "Zero", label: "chasing calls you have to make" },
          { value: "Daily", label: "update in Slack or Teams" },
        ],
        accent: "violet",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
      },
      {
        number: "05",
        problem: "No clear picture of who owes you what",
        snapshot: "Seeing what you are owed means running a report, exporting it, and sorting through it by hand, once a week if that. In between, late-paying customers slip further behind without anyone noticing.",
        situation:
          "Getting a clear picture of AR means running a report, exporting it, and interpreting aging buckets by hand. That process happens once a week if it happens at all, and by the time the data is reviewed, it's already several days stale. A business running $500K/month in AR with a 45-day DSO has roughly $750K outstanding at any given time. Managing that blind is like driving without a dashboard.",
        context: "At-risk accounts age in silence between weekly checks. Flags that would have been easy to act on at Day 30 become write-offs by Day 75.",
        fix: [
          "A live dashboard shows how fast you are getting paid, who still owes you, and what is overdue, updated automatically",
          "A short summary lands in Slack or Teams each morning, so you get the key numbers without logging in anywhere",
          "You get advance notice on slow-paying customers early, while it is still easy to fix",
          "The dashboard marks the day you started, so you can see the moment things began turning around",
        ],
        outcomes: [
          { value: "Live", label: "view of who owes you, always current" },
          { value: "Daily", label: "summary, no login needed" },
          { value: "Early", label: "alerts before a customer goes quiet" },
        ],
        accent: "cyan",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
      },
      {
        number: "06",
        problem: "You never know how much cash is coming this month",
        snapshot: "Business looks healthy on paper, but the actual cash coming in varies widely. When customers might pay in 28 days or 55, planning for payroll, equipment, or growth becomes guesswork.",
        situation:
          "Revenue looks healthy on paper but actual cash arriving varies wildly. Payroll, equipment, and growth decisions all require knowing when money comes in, but when DSO fluctuates between 28 and 55 days month to month, planning is guesswork. Unpredictable cash flow is almost always a DSO problem: when the gap between invoicing and collection varies by weeks, the business can't plan.",
        context: "Compressing DSO to a consistent, predictable range changes this, not just the average but the variance. Businesses stop asking when money arrives and start knowing.",
        fix: [
          "Because customers are always reminded on the same schedule, they start paying on a predictable schedule too",
          "You can finally see, month to month, roughly when the money will land",
          "Cash that used to sit in unpaid invoices starts arriving when you expect it",
          "The dashboard shows what's likely to come in from invoices you haven't been paid on yet",
        ],
        outcomes: [
          { value: "~40%", label: "faster to get paid" },
          { value: "Steady", label: "cash coming in each month" },
          { value: "60 days", label: "to a real, visible difference" },
        ],
        accent: "orange",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
      },
    ],
  },

  {
    id: "ap",
    phase: "02",
    name: "Paying Bills",
    tagline: "Your bills, sorted and paid on time.",
    status: "In the Works",
    statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    description:
      "Once the money coming in is handled, the same idea works for the money going out. The bills you owe are gathered in one place, sent to the right person to approve, and paid on a schedule that fits your cash. Nothing paid twice, nothing paid late, and nothing paid without approval.",
    useCases: [
      {
        number: "01",
        problem: "Bills scattered everywhere, with no single place they live",
        snapshot: "Bills show up by email, on paper, through a vendor's website, sometimes even a text. There's no one place they all land. So things get paid late, paid twice, or missed until a vendor calls to ask.",
        situation:
          "Bills arrive via email, paper invoice, vendor portal, and occasionally a text from a supplier. There is no single place where payables live. Some get forwarded to a shared inbox. Some get filed manually. Some get overlooked until a vendor follows up, or until a service is cut off. The same problem that plagues AR on the way in exists on the AP side too: no system, no visibility, no follow-through.",
        fix: [
          "Bills get pulled in automatically from email, PDFs, and vendor sites, and land in one tidy list no matter how they arrived",
          "If the same bill comes in twice, it gets caught before you accidentally pay it twice",
          "You get advance notice as due dates get close, with the biggest and most important bills first",
          "Each bill is sorted into the right category before it reaches you, with no manual filing",
        ],
        outcomes: [
          { value: "Zero", label: "bills lost in the inbox" },
          { value: "One", label: "place every bill lands" },
          { value: "Automatic", label: "sorting before it reaches you" },
        ],
        accent: "yellow",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>,
      },
      {
        number: "02",
        problem: "Bills get paid without anyone really checking them",
        snapshot: "In many small businesses, the person entering the bills is also the one paying them. Bills get paid because someone typed them in, not because anyone actually reviewed and approved them.",
        situation:
          "In many small businesses, the person who processes payables is also the person who approves them. Bills get paid because someone entered them and clicked pay, not because a decision-maker reviewed and authorized them. This is a controls gap that exposes the business to errors, fraud, and cash flow surprises. At scale, 20 to 40 vendor bills per month, the cumulative financial exposure from unreviewed payables is significant.",
        fix: [
          "You decide the rules for who approves what: small routine bills can go one way, larger ones another",
          "Whoever needs to approve gets a Slack or Teams message and approves or declines with one tap, without logging into the accounting software",
          "If someone doesn't respond in time, the bill moves on to the next person automatically",
          "Every payment keeps a clear record: who received the bill, who approved it, and when it was paid",
        ],
        outcomes: [
          { value: "100%", label: "of bills checked before paying" },
          { value: "Same-day", label: "sign-off on routine bills" },
          { value: "Full", label: "record on every payment" },
        ],
        accent: "rose",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
      },
      {
        number: "03",
        problem: "Paying too late, or too early, with no real plan",
        snapshot: "With no plan tied to how much cash you have, bills just get paid whenever someone gets to them. Discounts for paying early slip by. Every so often one goes late, and the late fee follows.",
        situation:
          "Without a payment schedule tied to cash position and due dates, bills get paid when someone gets to them. Sometimes that means paying early and losing the use of cash unnecessarily. Sometimes it means paying late and incurring penalties or damaging vendor relationships. Early-payment discounts, often 1–2% for paying within 10 days, go uncaptured. For a business with $50K/month in payables, that's $6,000–$12,000 in annual cash left on the table.",
        fix: [
          "LunarLogic chooses the best time to pay each bill, factoring in the due date, your cash, and any early-payment discount",
          "When paying early actually saves you money, it flags the chance so you don't miss it",
          "Once you have approved them, bills get paid on schedule on their own, with no going back in to click pay",
          "You can see what your cash will look like after upcoming bills, not just what it is today",
        ],
        outcomes: [
          { value: "1–2%", label: "saved by catching early-pay discounts" },
          { value: "Zero", label: "late fees" },
          { value: "Smart", label: "timing that protects your cash" },
        ],
        accent: "orange",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      },
      {
        number: "04",
        problem: "No clear view of what you owe, or when it's due",
        snapshot: "Knowing what you owe means logging into the accounting software and running reports by hand. So cash planning happens without a clear picture of the bills coming up, which leaves the plan incomplete.",
        situation:
          "The AP picture is just as important as the AR picture, but gets even less attention. Most businesses have a vague sense of what they owe based on what they can recall, not what a system tells them. Vendor calls come as surprises. Cash planning for payroll or equipment is done without accounting for outstanding payables. Running AR and AP in parallel, knowing what comes in and what goes out, is the prerequisite for genuine cash flow management.",
        fix: [
          "A live view shows every bill you owe, when it is due, whether it has been approved, and when it is set to be paid",
          "The bills you owe sit right next to the money coming in, so cash out and cash in are on one screen",
          "Your morning summary covers both, so you see the full picture of your cash every day",
          "You can see where your cash is headed, based on upcoming bills and payments you're expecting",
        ],
        outcomes: [
          { value: "Live", label: "view of what you owe" },
          { value: "One", label: "screen for money in and money out" },
          { value: "Zero", label: "surprise bills from vendors" },
        ],
        accent: "teal",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>,
      },
    ],
  },

  {
    id: "full",
    phase: "03",
    name: "Full Accounting",
    tagline: "Your whole back office, running on its own.",
    status: "Coming Soon",
    statusColor: "text-slate-400 bg-slate-700 border-slate-600",
    description:
      "With the money in and the money out handled, the last of the manual work is the part in between: closing the books each month, knowing where your cash is headed, and getting clear numbers. Full Accounting ties it all together, so the financial side of your business runs on its own and you always have up-to-date numbers without the manual work.",
    useCases: [
      {
        number: "01",
        problem: "Closing the books eats up two weeks every month",
        snapshot: "Every month it is the same routine: match the books to the bank, track down missing receipts, fix miscategorized items, and produce numbers that are already out of date. It consumes 10 to 14 days of someone's time.",
        situation:
          "Every month, the same ritual: reconcile the bank statement against the accounting system, chase down missing receipts, correct GL miscodes, and produce a P&L that is already stale by the time anyone reads it. The process takes 10–14 days, consumes staff time that could go toward revenue-generating work, and produces a snapshot of the past rather than a view of the present. When AR and AP are automated, the vast majority of transactions are already categorized, matched, and recorded in real time: close becomes validation rather than reconstruction.",
        fix: [
          "Because money in and money out are already recorded as they happen, closing becomes a quick check instead of a rebuild",
          "Your books are matched to your bank as you go, so mismatches are caught right away, not at month-end",
          "Everything is sorted into the right category from the start, so fixes are rare",
          "Your month-end reports are put together for you, ready to glance over and approve",
        ],
        outcomes: [
          { value: "3 days", label: "to close the books (was 14)" },
          { value: "Up to date", label: "numbers recorded as they happen" },
          { value: "Zero", label: "manual matching to the bank" },
        ],
        accent: "blue",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>,
      },
      {
        number: "02",
        problem: "Guessing at how much cash you'll have next month",
        snapshot: "Working out next month's cash means piecing together the invoices you remember, the bills you think are coming, and a rough guess at sales. The answer might be off by $20,000 either way.",
        situation:
          "Projecting next month's cash position means combining what you remember about outstanding invoices with what you think you owe vendors, adjusted for payroll timing, with a rough estimate of what the month's revenue will look like. The output is a number that might be right to within $20,000. Planning for equipment, hiring, or growth on that basis is inherently risky. A business with automated AR and AP is already generating the data required for an accurate forecast: the forecast builds itself from data that already exists.",
        fix: [
          "A 90-day cash outlook built from your real invoices, real upcoming bills, and real bank balance, not a spreadsheet guess",
          "It predicts when customers will actually pay, based on how they've paid before",
          "Your upcoming bill payments feed in automatically, with nothing to type up",
          "It even shows what happens to your cash if some customers pay a month late",
        ],
        outcomes: [
          { value: "90-day", label: "cash outlook from real numbers" },
          { value: "Confident", label: "planning for hiring and growth" },
          { value: "Automatic", label: "no spreadsheet needed" },
        ],
        accent: "violet",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
      },
      {
        number: "03",
        problem: "Your numbers are always late and never quite right",
        snapshot: "Reports land a week after month-end, built from data that was already old when it was pulled. So you end up making today's decisions with last month's numbers.",
        situation:
          "Reports reach the owner a week after month-end, built from exported data that was already stale when it was pulled. The process involves manual adjustments, restatements, and corrections that introduce their own errors. By the time a decision is made, two more weeks have passed. Owners of service businesses typically spend fewer than 2 hours per month reviewing financial data, not because they don't care, but because access to current, reliable financial information requires too much friction. Remove the friction and the data gets used.",
        fix: [
          "Live dashboards built from up-to-date numbers mean finished, reviewed reports in days, not weeks",
          "A short daily summary gives you the key numbers in a 30-second read",
          "Reports can be built around what you care about: profit by customer, sales by service, cost by job",
          "Your accountant can see the same up-to-date numbers, which makes tax time far less of a scramble",
        ],
        outcomes: [
          { value: "Days, not weeks", label: "to finished reports" },
          { value: "Daily", label: "summary of your numbers" },
          { value: "Zero", label: "reports to build by hand" },
        ],
        accent: "emerald",
        icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}><path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
      },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

function shortLabel(problem: string): string {
  return problem.split(".")[0].split(",")[0].trim().split(" ").slice(0, 3).join(" ");
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
  const [scrollProgress, setScrollProgress] = useState(0);
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
      setScrollProgress(progress);
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
      style={{ height: `${suite.useCases.length * 70}vh` }}
    >
      {/* sticky panel sits below nav (64px) + suite tab bar (~48px) */}
      <div
        className="relative sticky bg-slate-950 flex flex-col overflow-hidden"
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

        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800 pointer-events-none">
          <div className="h-full bg-blue-500" style={{ width: `${scrollProgress * 100}%`, transition: "width 80ms linear" }} />
        </div>
      </div>
    </div>
  );
}

// ── Mobile suite — accordion ──────────────────────────────────────────────────

function MobileSuite({
  suite,
  sectionRef,
}: {
  suite: Suite;
  sectionRef: (el: HTMLDivElement | null) => void;
}) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div ref={sectionRef} id={`${suite.id}-mobile`} className="bg-slate-950">
      {/* Suite header */}
      <div className="px-4 pt-8 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Phase {suite.phase}</span>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${suite.statusColor}`}>
            {suite.status}
          </span>
        </div>
        <h2 className="text-lg font-extrabold text-white">{suite.name}</h2>
        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{suite.tagline}</p>
      </div>

      {/* Use case accordions */}
      <div className="space-y-2 pb-6">
        {suite.useCases.map((uc, i) => {
          const colors = ACCENTS[uc.accent];
          const isOpen = openIdx === i;
          return (
            <div
              key={uc.number}
              className={`border rounded-2xl overflow-hidden transition-colors duration-200 ${
                isOpen ? "border-blue-500/30 bg-blue-500/5" : "border-slate-700 bg-slate-800/40"
              }`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenIdx(isOpen ? -1 : i)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${colors.icon}`}>
                  {uc.icon}
                </div>
                <span className={`text-sm font-semibold flex-1 leading-snug ${isOpen ? "text-white" : "text-slate-300"}`}>
                  {uc.problem}
                </span>
                <svg
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-400" : "text-slate-500"}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Smooth expand */}
              <div
                style={{
                  display: "grid",
                  gridTemplateRows: isOpen ? "1fr" : "0fr",
                  transition: "grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="overflow-hidden">
                  <div className="px-4 pb-5 space-y-3">
                    <p className="text-sm text-slate-400 leading-relaxed">{uc.snapshot}</p>
                    <div>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                        How LunarLogic addresses it
                      </p>
                      <ul className="space-y-2">
                        {uc.fix.slice(0, 3).map((item, fi) => (
                          <li key={fi} className="flex items-start gap-2.5">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${colors.dot}`} />
                            <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className={`bg-slate-900/60 border rounded-xl p-3.5 ${colors.border}`}>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">The outcome</p>
                      <div className="grid grid-cols-3 gap-2">
                        {uc.outcomes.map((outcome, oi) => (
                          <div key={oi} className="text-center">
                            <p className={`text-sm font-extrabold leading-tight ${colors.metric}`}>{outcome.value}</p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-tight">{outcome.label}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
