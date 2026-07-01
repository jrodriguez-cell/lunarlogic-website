"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

// ── Data generation ───────────────────────────────────────────────────────────

const CUSTOMERS = [
  "Apex Building Group", "Summit Properties LLC", "Metro Commercial Services",
  "Riverside Holdings", "Pinnacle Management", "Harbor Group LLC",
  "Clearview Properties", "Eastside Industrial", "Northern Commercial Co",
  "Pacific Services Group", "Westgate Holdings", "Central Business Corp",
  "Diamond Properties", "Keystone Services Inc", "Atlas Commercial LLC",
];

const STATUSES = [
  "Overdue", "Overdue", "Sent", "Paid", "Overdue",
  "Paid", "Overdue", "Sent", "Paid", "Overdue",
  "Draft", "Overdue", "Sent", "Paid", "Overdue",
] as const;

type InvoiceStatus = "Overdue" | "Sent" | "Paid" | "Draft";

interface Invoice {
  id: string;
  customer: string;
  amount: number;
  status: InvoiceStatus;
  dueDaysAgo: number;
  daysOverdue: number;
  reminderCount: number;
}

const VALUE_MULTS = [1.0, 1.4, 0.7, 2.1, 0.5, 1.2, 0.9, 1.7, 1.1, 0.8, 1.5, 0.6, 1.3, 1.9, 1.0];
const DUE_DAYS_AGO = [5, 12, 35, -3, 8, 22, 45, 18, -5, 28, 55, 3, 15, 40, 62];
const REMINDER_COUNTS = [1, 2, 0, 0, 3, 0, 1, 0, 0, 2, 0, 1, 0, 0, 3];

function generateInvoices(volume: number, avg: number): Invoice[] {
  const count = Math.min(Math.max(volume, 8), 15);
  return Array.from({ length: count }, (_, i) => {
    const amount = Math.round(avg * VALUE_MULTS[i % VALUE_MULTS.length]);
    const dueDaysAgo = DUE_DAYS_AGO[i % DUE_DAYS_AGO.length];
    const status = STATUSES[i % STATUSES.length];
    const daysOverdue = status === "Overdue" && dueDaysAgo > 0 ? dueDaysAgo : 0;
    return {
      id: `INV-${1001 + i}`,
      customer: CUSTOMERS[i % CUSTOMERS.length],
      amount,
      status,
      dueDaysAgo,
      daysOverdue,
      reminderCount: REMINDER_COUNTS[i % REMINDER_COUNTS.length],
    };
  });
}

function generateDSOPoints(currentDSO: number, projectedDSO: number): number[] {
  const drop = currentDSO - projectedDSO;
  return [
    currentDSO + 2,
    currentDSO + 1,
    currentDSO,        // month 3 = go-live
    currentDSO - Math.round(drop * 0.25),
    currentDSO - Math.round(drop * 0.60),
    projectedDSO,
  ];
}

function formatDueDate(dueDaysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - dueDaysAgo);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Toast({ message, type }: { message: string; type: "success" | "info" }) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border text-sm font-medium transition-all ${
      type === "success"
        ? "bg-green-500/15 border-green-500/30 text-green-300"
        : "bg-blue-500/15 border-blue-500/30 text-blue-300"
    }`}>
      {type === "success" ? (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      {message}
    </div>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const styles = {
    Overdue: "bg-red-500/15 text-red-400 border-red-500/25",
    Sent:    "bg-blue-500/15 text-blue-400 border-blue-500/25",
    Paid:    "bg-green-500/15 text-green-400 border-green-500/25",
    Draft:   "bg-slate-700 text-slate-400 border-slate-600",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "Overdue" ? "bg-red-400" :
        status === "Sent"    ? "bg-blue-400 animate-pulse" :
        status === "Paid"    ? "bg-green-400" :
        "bg-slate-500"
      }`} />
      {status}
    </span>
  );
}

// ── DSO Trend chart ───────────────────────────────────────────────────────────

function DSOChart({ points, currentDSO, projectedDSO }: { points: number[]; currentDSO: number; projectedDSO: number }) {
  const W = 560; const H = 130; const PAD = { t: 16, r: 20, b: 32, l: 40 };
  const chartW = W - PAD.l - PAD.r;
  const chartH = H - PAD.t - PAD.b;
  const minY = Math.min(...points) - 5;
  const maxY = Math.max(...points) + 5;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const xs = points.map((_, i) => PAD.l + (i / (points.length - 1)) * chartW);
  const ys = points.map((v) => PAD.t + ((maxY - v) / (maxY - minY)) * chartH);
  const pathD = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x},${ys[i]}`).join(" ");
  const areaD = `${pathD} L${xs[xs.length - 1]},${PAD.t + chartH} L${xs[0]},${PAD.t + chartH} Z`;
  const goLiveX = xs[2];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="chartArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => {
        const y = PAD.t + t * chartH;
        const val = Math.round(maxY - t * (maxY - minY));
        return (
          <g key={t}>
            <line x1={PAD.l} y1={y} x2={PAD.l + chartW} y2={y} stroke="#1e293b" strokeWidth="1" />
            <text x={PAD.l - 6} y={y + 4} fill="#475569" fontSize="10" textAnchor="end">{val}</text>
          </g>
        );
      })}

      {/* Go-live marker */}
      <line x1={goLiveX} y1={PAD.t} x2={goLiveX} y2={PAD.t + chartH} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3" />
      <text x={goLiveX + 4} y={PAD.t + 10} fill="#22c55e" fontSize="9">Go-live</text>

      {/* Area fill */}
      <path d={areaD} fill="url(#chartArea)" />

      {/* Line */}
      <path d={pathD} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Data points */}
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#60a5fa" stroke="#020617" strokeWidth="1.5" />
      ))}

      {/* Month labels */}
      {months.map((m, i) => (
        <text key={m} x={xs[i]} y={H - 6} fill="#475569" fontSize="10" textAnchor="middle">{m}</text>
      ))}

      {/* Before/after labels */}
      <text x={xs[0] + 8} y={ys[0] - 8} fill="#94a3b8" fontSize="10">{currentDSO}d</text>
      <text x={xs[xs.length - 1] - 8} y={ys[ys.length - 1] - 8} fill="#4ade80" fontSize="10" textAnchor="end">{projectedDSO}d</text>
    </svg>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

type Tab = "overview" | "action-plan" | "invoices" | "reminders" | "reports";

// ── Main dashboard ────────────────────────────────────────────────────────────

export default function DemoDashboard() {
  const searchParams = useSearchParams();

  const company    = searchParams.get("co")    || "Your Company";
  const industry   = searchParams.get("ind")   || "Professional Services";
  const volume     = Number(searchParams.get("vol"))   || 50;
  const avg        = Number(searchParams.get("avg"))   || 2500;
  const terms      = Number(searchParams.get("terms")) || 30;
  const over       = Number(searchParams.get("over"))  || 10;
  const firstName  = (searchParams.get("name") || "").split(" ")[0] || "there";

  const currentDSO   = terms + over;
  const projectedDSO = Math.round(currentDSO * 0.6);
  const dsoDrop      = currentDSO - projectedDSO;
  const monthlyAR    = volume * avg;
  const cashUnlocked = Math.round(monthlyAR * dsoDrop / 30);

  const invoices = generateInvoices(volume, avg);
  const dsoPoints = generateDSOPoints(currentDSO, projectedDSO);

  const overdueInvoices = invoices.filter((i) => i.status === "Overdue");
  const totalOverdueAR  = overdueInvoices.reduce((s, i) => s + i.amount, 0);

  const agingBuckets = [
    { label: "Current",   pct: 45, color: "bg-blue-500" },
    { label: "1–30 days", pct: 28, color: "bg-yellow-500" },
    { label: "31–60",     pct: 16, color: "bg-orange-500" },
    { label: "61–90",     pct: 8,  color: "bg-red-500" },
    { label: "90+",       pct: 3,  color: "bg-red-700" },
  ].map((b) => ({ ...b, amount: Math.round(monthlyAR * b.pct / 100) }));

  const disputeInvoices = overdueInvoices
    .filter((inv) => inv.daysOverdue > 25)
    .sort((a, b) => b.daysOverdue - a.daysOverdue);

  const dsoCompressionIfCollected = Math.round(totalOverdueAR / (monthlyAR || 1) * 30);

  const [activeTab, setActiveTab]         = useState<Tab>("overview");
  const [statusFilter, setStatusFilter]   = useState<"All" | InvoiceStatus>("All");
  const [paidIds, setPaidIds]             = useState<Set<string>>(new Set());
  const [dismissedIds, setDismissedIds]   = useState<Set<string>>(new Set());
  const [toast, setToast]                 = useState<{ msg: string; type: "success" | "info" } | null>(null);

  const showToast = (msg: string, type: "success" | "info" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const markPaid = (id: string) => {
    setPaidIds((prev) => new Set(Array.from(prev).concat(id)));
    showToast("Invoice marked as paid and synced to your accounting system.");
  };

  const visibleInvoices = invoices
    .map((inv) => paidIds.has(inv.id) ? { ...inv, status: "Paid" as InvoiceStatus } : inv)
    .filter((inv) => statusFilter === "All" || inv.status === statusFilter);

  const TABS: { id: Tab; label: string; badge?: number }[] = [
    { id: "overview",    label: "Overview" },
    { id: "action-plan", label: "Action Plan", badge: disputeInvoices.length },
    { id: "invoices",    label: `Invoices (${invoices.length})` },
    { id: "reminders",   label: `Reminders (${overdueInvoices.length})` },
    { id: "reports",     label: "Reports" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Demo banner */}
      <div className="bg-blue-600/10 border-b border-blue-500/20 px-4 py-2.5 flex items-center justify-between gap-4">
        <p className="text-xs text-blue-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" />
          <span>
            <strong>Demo mode</strong>: This dashboard is populated with data based on your inputs.
            Numbers are illustrative of what LunarLogic delivers.
          </span>
        </p>
        <Link
          href="/contact"
          className="flex-shrink-0 text-xs font-semibold text-blue-300 hover:text-white bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 px-3 py-1.5 rounded-lg transition-colors"
        >
          Book Real Demo →
        </Link>
      </div>

      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="url(#demoMoon)" />
              <defs>
                <linearGradient id="demoMoon" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#818CF8" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-logo font-bold text-sm hidden sm:inline">
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">lunarlogic</span>
              <span className="text-white/60">.ai</span>
            </span>
          </Link>
          <span className="text-slate-600 hidden sm:block">/</span>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{company}</p>
            <p className="text-xs text-slate-500">{industry} · Get-Paid Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
            Demo
          </span>
          <Link
            href="/contact"
            className="hidden sm:block bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Welcome */}
      <div className="bg-slate-900/50 border-b border-slate-800 px-4 sm:px-6 py-4">
        <p className="text-sm text-slate-300">
          Hey {firstName}, here&apos;s what LunarLogic would look like for{" "}
          <span className="text-white font-semibold">{company}</span> based on your numbers.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-blue-400 text-blue-400"
                  : "border-transparent text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
              {tab.badge !== undefined && tab.badge > 0 && (
                <span className="text-xs font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* ── OVERVIEW ── */}
        {activeTab === "overview" && (
          <>
            {/* KPI cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  label: "Days to Get Paid",
                  value: `${currentDSO} days`,
                  sub: "Before LunarLogic",
                  color: "text-white",
                  icon: "clock",
                },
                {
                  label: "With LunarLogic",
                  value: `${projectedDSO} days`,
                  sub: `↓ ${dsoDrop} days sooner`,
                  color: "text-green-400",
                  icon: "trending-down",
                },
                {
                  label: "Cash to Unlock",
                  value: `$${cashUnlocked.toLocaleString()}`,
                  sub: "per month",
                  color: "text-blue-400",
                  icon: "dollar",
                },
                {
                  label: "Unpaid Invoices",
                  value: `$${totalOverdueAR.toLocaleString()}`,
                  sub: `${overdueInvoices.length} overdue invoices`,
                  color: "text-orange-400",
                  icon: "alert",
                },
              ].map((card) => (
                <div key={card.label} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{card.label}</p>
                  <p className={`text-2xl sm:text-3xl font-extrabold mb-1 ${card.color}`}>{card.value}</p>
                  <p className="text-xs text-slate-500">{card.sub}</p>
                </div>
              ))}
            </div>

            {/* DSO chart + AR aging */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Days to Get Paid</p>
                    <p className="text-sm text-slate-400">6-month projection · LunarLogic starts at month 3</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-0.5 bg-blue-400 inline-block" />Days to get paid</span>
                    <span className="flex items-center gap-1.5 text-slate-400"><span className="w-3 h-px border-t border-dashed border-green-400 inline-block" />Go-live</span>
                  </div>
                </div>
                <DSOChart points={dsoPoints} currentDSO={currentDSO} projectedDSO={projectedDSO} />
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">Who Still Owes You</p>
                <div className="space-y-4">
                  {agingBuckets.map((b) => (
                    <div key={b.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-400">{b.label}</span>
                        <span className="text-slate-200 font-medium">${b.amount.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className={`h-full ${b.color} rounded-full`} style={{ width: `${b.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Total owed to you</span>
                    <span className="text-white font-semibold">${monthlyAR.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent invoices preview */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
                <p className="text-sm font-semibold text-white">Recent Invoices</p>
                <button onClick={() => setActiveTab("invoices")} className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  View all →
                </button>
              </div>
              <div className="divide-y divide-slate-700/50">
                {invoices.slice(0, 5).map((inv) => (
                  <div key={inv.id} className="flex items-center gap-4 px-6 py-3.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{inv.customer}</p>
                      <p className="text-xs text-slate-500">{inv.id} · Due {formatDueDate(inv.dueDaysAgo)}</p>
                    </div>
                    <span className="text-sm font-semibold text-white">${inv.amount.toLocaleString()}</span>
                    <StatusBadge status={paidIds.has(inv.id) ? "Paid" : inv.status} />
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-8 text-center">
              <p className="text-xl font-extrabold text-white mb-2">
                ${(cashUnlocked * 12).toLocaleString()} you&apos;ve already earned, just waiting to be collected.
              </p>
              <p className="text-slate-400 text-sm mb-6">
                This dashboard is built on your numbers. The real version runs live against your accounting software.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Book a Real Demo →
              </Link>
            </div>
          </>
        )}

        {/* ── ACTION PLAN ── */}
        {activeTab === "action-plan" && (
          <>
            {/* Summary stats row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5">
                <p className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">Needs Attention</p>
                <p className="text-3xl font-extrabold text-white mb-1">{disputeInvoices.length}</p>
                <p className="text-xs text-slate-500">invoices past 25 days overdue</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
                <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">Days You Could Save</p>
                <p className="text-3xl font-extrabold text-white mb-1">{dsoCompressionIfCollected}d</p>
                <p className="text-xs text-slate-500">if every overdue invoice were collected this month</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
                <p className="text-xs font-semibold text-green-400 uppercase tracking-wider mb-2">Days to Get Paid After</p>
                <p className="text-3xl font-extrabold text-green-400 mb-1">{projectedDSO}d</p>
                <p className="text-xs text-slate-500">vs. {currentDSO}d today</p>
              </div>
            </div>

            {/* Working Capital at Stake */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Cash Tied Up in Late Invoices</p>
                  <p className="text-2xl font-extrabold text-white">${totalOverdueAR.toLocaleString()}</p>
                  <p className="text-sm text-slate-400 mt-1">{overdueInvoices.length} overdue invoices · about {dsoCompressionIfCollected} extra days of waiting in these alone</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500 mb-1">Best Case: Days to Get Paid</p>
                  <p className="text-3xl font-extrabold text-green-400">{projectedDSO}d</p>
                  <p className="text-xs text-slate-500 mt-0.5">↓ {dsoDrop} days from today</p>
                </div>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-400 rounded-full"
                  style={{ width: `${Math.min((totalOverdueAR / (monthlyAR || 1)) * 100, 100)}%` }}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                Late invoices as a share of what you invoice each month
              </p>
            </div>

            {/* AI Dispute Monitor */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <h2 className="text-base font-bold text-white">AI Dispute Monitor</h2>
                </div>
                <span className="text-xs font-semibold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {disputeInvoices.length} flagged
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-5">
                Invoices past 25 days overdue are analyzed for payment patterns. LunarLogic surfaces which accounts need direct intervention vs. those that just need another reminder.
              </p>

              {disputeInvoices.length === 0 ? (
                <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-6 text-center">
                  <p className="text-green-400 font-semibold">No disputes flagged</p>
                  <p className="text-slate-400 text-sm mt-1">Every late invoice is still within a normal range — nothing to worry about yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {disputeInvoices.map((inv, i) => {
                    const isDismissed = dismissedIds.has(inv.id);
                    const urgencyMultiplier = (1.2 + (i * 0.3)).toFixed(1);
                    const callRequired = inv.daysOverdue > 40;
                    return (
                      <div
                        key={inv.id}
                        className={`bg-slate-800/50 border rounded-2xl p-5 transition-opacity ${
                          isDismissed ? "opacity-40 border-slate-700" : "border-red-500/20"
                        }`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <p className="text-sm font-semibold text-white">{inv.customer}</p>
                              <span className="font-mono text-xs text-slate-500">{inv.id}</span>
                              <span className="text-xs font-bold text-blue-300 bg-blue-500/15 border border-blue-500/25 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                HIGH CONFIDENCE
                              </span>
                              {callRequired && (
                                <span className="text-xs font-bold text-red-300 bg-red-500/15 border border-red-500/25 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                  Call Required
                                </span>
                              )}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400 mb-3">
                              <span className="text-white font-semibold">${inv.amount.toLocaleString()}</span>
                              <span className="text-red-400 font-medium">{inv.daysOverdue} days overdue</span>
                              <span>{inv.reminderCount} reminder{inv.reminderCount !== 1 ? "s" : ""} sent, no response</span>
                            </div>
                            <p className="text-xs text-slate-400 bg-slate-900/60 rounded-lg px-3 py-2 border border-slate-700/50">
                              <span className="text-blue-300 font-semibold">AI analysis:</span>{" "}
                              This account is paying {urgencyMultiplier}× their historical average delay.{" "}
                              {callRequired
                                ? "Pattern suggests a billing dispute or cash flow issue. Direct call recommended before escalation."
                                : "Escalated reminder with revised payment schedule offer has highest predicted response rate."}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            <button
                              onClick={() => {
                                markPaid(inv.id);
                                setDismissedIds((prev) => new Set(Array.from(prev).concat(inv.id)));
                              }}
                              className="text-xs font-semibold text-green-400 hover:text-white bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                              Mark Collected
                            </button>
                            <button
                              onClick={() => showToast(`Escalated reminder queued for ${inv.customer}.`)}
                              className="text-xs font-semibold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
                            >
                              Take Action
                            </button>
                            {!isDismissed && (
                              <button
                                onClick={() => {
                                  setDismissedIds((prev) => new Set(Array.from(prev).concat(inv.id)));
                                  showToast(`${inv.customer} snoozed for 7 days.`, "info");
                                }}
                                className="text-xs text-slate-500 hover:text-slate-300 transition-colors text-center"
                              >
                                Snooze 7d
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Path to best possible DSO */}
            <div className="bg-gradient-to-r from-blue-600/15 to-indigo-600/15 border border-blue-500/20 rounded-2xl p-6">
              <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">Your Path to Getting Paid Faster</p>
              <div className="flex items-center gap-3 mb-4">
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-white">{currentDSO}d</p>
                  <p className="text-xs text-slate-500 mt-0.5">Today</p>
                </div>
                <div className="flex-1 flex items-center gap-1">
                  {[0.25, 0.5, 0.75, 1].map((t) => (
                    <div key={t} className="flex-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-green-400 opacity-60" />
                  ))}
                  <svg className="w-3 h-3 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-extrabold text-green-400">{projectedDSO}d</p>
                  <p className="text-xs text-slate-500 mt-0.5">With LunarLogic</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {[
                  { label: "Paid sooner by", value: `${dsoDrop} days` },
                  { label: "Monthly cash freed", value: `$${cashUnlocked.toLocaleString()}` },
                  { label: "Over a year", value: `$${(cashUnlocked * 12).toLocaleString()}` },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-900/40 rounded-xl p-3 text-center">
                    <p className="text-slate-500 mb-1">{s.label}</p>
                    <p className="font-bold text-white">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── INVOICES ── */}
        {activeTab === "invoices" && (
          <>
            {/* Filter bar */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl p-1">
                {(["All", "Overdue", "Sent", "Paid", "Draft"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      statusFilter === f
                        ? "bg-blue-500 text-white"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
              <div className="ml-auto flex items-center gap-2">
                <span className="text-xs text-slate-500">{volume} invoices/mo · showing {visibleInvoices.length}</span>
                <button
                  onClick={() => showToast("CSV export available in the full version.", "info")}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export CSV
                </button>
              </div>
            </div>

            {/* Invoice table */}
            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <th className="text-left px-5 py-3.5">Invoice</th>
                      <th className="text-left px-4 py-3.5 hidden md:table-cell">Customer</th>
                      <th className="text-right px-4 py-3.5">Amount</th>
                      <th className="text-left px-4 py-3.5 hidden lg:table-cell">Due Date</th>
                      <th className="text-left px-4 py-3.5">Status</th>
                      <th className="text-left px-4 py-3.5 hidden lg:table-cell">Days Late</th>
                      <th className="text-right px-5 py-3.5">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {visibleInvoices.map((inv) => {
                      const status = paidIds.has(inv.id) ? "Paid" : inv.status;
                      return (
                        <tr key={inv.id} className="hover:bg-slate-700/20 transition-colors">
                          <td className="px-5 py-3.5">
                            <p className="font-mono text-xs text-slate-300">{inv.id}</p>
                            <p className="text-xs text-slate-500 md:hidden mt-0.5 truncate max-w-[120px]">{inv.customer}</p>
                          </td>
                          <td className="px-4 py-3.5 hidden md:table-cell">
                            <span className="text-slate-300">{inv.customer}</span>
                          </td>
                          <td className="px-4 py-3.5 text-right">
                            <span className="font-semibold text-white">${inv.amount.toLocaleString()}</span>
                          </td>
                          <td className="px-4 py-3.5 text-slate-400 text-xs hidden lg:table-cell">
                            {formatDueDate(inv.dueDaysAgo)}
                          </td>
                          <td className="px-4 py-3.5">
                            <StatusBadge status={status} />
                          </td>
                          <td className="px-4 py-3.5 hidden lg:table-cell">
                            {inv.daysOverdue > 0 && status !== "Paid" ? (
                              <span className="text-red-400 text-xs font-medium">{inv.daysOverdue}d overdue</span>
                            ) : (
                              <span className="text-slate-600 text-xs">–</span>
                            )}
                          </td>
                          <td className="px-5 py-3.5">
                            <div className="flex items-center justify-end gap-2">
                              {status === "Overdue" && (
                                <>
                                  <button
                                    onClick={() => showToast(`Reminder sent to ${inv.customer}.`)}
                                    className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors whitespace-nowrap"
                                  >
                                    Send Reminder
                                  </button>
                                  <button
                                    onClick={() => markPaid(inv.id)}
                                    className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors whitespace-nowrap"
                                  >
                                    Mark Paid
                                  </button>
                                </>
                              )}
                              {status === "Sent" && (
                                <button
                                  onClick={() => markPaid(inv.id)}
                                  className="text-xs text-green-400 hover:text-green-300 font-medium transition-colors"
                                >
                                  Mark Paid
                                </button>
                              )}
                              {status === "Paid" && (
                                <span className="text-xs text-slate-600">–</span>
                              )}
                              {status === "Draft" && (
                                <button
                                  onClick={() => showToast(`Invoice ${inv.id} approved and sent.`)}
                                  className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                                >
                                  Approve & Send
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="px-5 py-3 border-t border-slate-700 flex justify-between items-center">
                <span className="text-xs text-slate-500">
                  Showing {visibleInvoices.length} of {volume} this month
                </span>
                <span className="text-xs text-slate-500">
                  Total: ${visibleInvoices.reduce((s, i) => s + i.amount, 0).toLocaleString()}
                </span>
              </div>
            </div>
          </>
        )}

        {/* ── REMINDERS ── */}
        {activeTab === "reminders" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Active Reminder Queue</h2>
                <p className="text-sm text-slate-400 mt-0.5">
                  Sequences run automatically every weekday. Zero manual effort.
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-extrabold text-blue-400">{overdueInvoices.length}</p>
                <p className="text-xs text-slate-500">active sequences</p>
              </div>
            </div>

            <div className="space-y-3">
              {overdueInvoices.map((inv) => {
                const stages = [
                  { label: "Day 3: Friendly nudge",    nextLabel: "Day 7 follow-up",    days: 3 },
                  { label: "Day 7: Follow-up",          nextLabel: "Day 14 escalation",  days: 7 },
                  { label: "Day 14: Escalation",        nextLabel: "Day 21 urgent",      days: 14 },
                  { label: "Day 21: Urgent notice",     nextLabel: "Final notice",       days: 21 },
                  { label: "Day 30: Final notice",      nextLabel: "Escalate to owner",  days: 30 },
                ];
                const stageIdx = Math.min(Math.floor(inv.daysOverdue / 7), 4);
                const stage = stages[stageIdx];
                const daysUntilNext = 7 - (inv.daysOverdue % 7);

                return (
                  <div key={inv.id} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="text-sm font-semibold text-white">{inv.customer}</p>
                          <span className="font-mono text-xs text-slate-500">{inv.id}</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span className="text-white font-semibold">${inv.amount.toLocaleString()}</span>
                          <span className="text-red-400">{inv.daysOverdue} days overdue</span>
                          <span>{inv.reminderCount} reminder{inv.reminderCount !== 1 ? "s" : ""} sent</span>
                        </div>
                      </div>
                      <button
                        onClick={() => showToast(`Manual reminder sent to ${inv.customer}.`)}
                        className="flex-shrink-0 text-xs font-semibold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 px-3 py-2 rounded-lg transition-colors"
                      >
                        Send Now
                      </button>
                    </div>

                    {/* Sequence progress */}
                    <div className="mt-4 flex items-center gap-1.5">
                      {stages.map((s, si) => (
                        <div key={si} className="flex-1 flex flex-col items-center gap-1">
                          <div className={`w-full h-1 rounded-full ${
                            si < stageIdx ? "bg-blue-500" :
                            si === stageIdx ? "bg-blue-400 animate-pulse" :
                            "bg-slate-700"
                          }`} />
                          <span className={`text-xs hidden sm:block whitespace-nowrap ${
                            si === stageIdx ? "text-blue-400" : "text-slate-600"
                          }`}>
                            {`D${s.days}`}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                      <span className="text-blue-400 font-medium">{stage.label}</span>
                      <span>Next: {stage.nextLabel} in {daysUntilNext}d</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-800/30 border border-slate-700 rounded-2xl p-5 text-center">
              <p className="text-sm text-slate-400">
                <span className="text-white font-semibold">$0 manual effort.</span>{" "}
                All reminders above run automatically on weekday mornings. You get notified only when a payment arrives or a VIP customer is flagged.
              </p>
            </div>
          </>
        )}

        {/* ── REPORTS ── */}
        {activeTab === "reports" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  title: "Days to Get Paid",
                  current: `${currentDSO} days`,
                  projected: `${projectedDSO} days`,
                  change: `↓ ${dsoDrop} days sooner`,
                  changeColor: "text-green-400",
                },
                {
                  title: "Invoiced Each Month",
                  current: `$${monthlyAR.toLocaleString()}`,
                  projected: `$${Math.round(monthlyAR * 1.08).toLocaleString()}`,
                  change: "+8% collected",
                  changeColor: "text-blue-400",
                },
                {
                  title: "Cash Unlocked",
                  current: "Baseline: $0",
                  projected: `$${cashUnlocked.toLocaleString()}/mo`,
                  change: `$${(cashUnlocked * 12).toLocaleString()} annually`,
                  changeColor: "text-green-400",
                },
                {
                  title: "Invoice Processing",
                  current: "~19 min avg",
                  projected: "~3 min avg",
                  change: "84% faster",
                  changeColor: "text-blue-400",
                },
              ].map((r) => (
                <div key={r.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">{r.title}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-xs text-slate-500 mb-1">Before</p>
                      <p className="text-lg font-bold text-slate-300">{r.current}</p>
                    </div>
                    <svg className="w-5 h-5 text-green-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">With LunarLogic</p>
                      <p className="text-lg font-bold text-white">{r.projected}</p>
                    </div>
                  </div>
                  <div className={`mt-3 text-xs font-semibold ${r.changeColor}`}>{r.change}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm font-semibold text-white">Full Report</p>
                <button
                  onClick={() => showToast("Full reports available in the live dashboard.", "info")}
                  className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg cursor-not-allowed opacity-60"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Export PDF: Full Version
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                {[
                  { label: "Days to get paid now", value: `${currentDSO}d` },
                  { label: "With LunarLogic",      value: `${projectedDSO}d` },
                  { label: "Monthly cash",         value: `$${cashUnlocked.toLocaleString()}` },
                  { label: "Over a year",          value: `$${(cashUnlocked * 12).toLocaleString()}` },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-900 rounded-xl p-4">
                    <p className="text-xs text-slate-500 mb-1">{s.label}</p>
                    <p className="text-xl font-extrabold text-blue-400">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-2xl p-8 text-center">
              <p className="text-xl font-extrabold text-white mb-2">Ready to see this with live data?</p>
              <p className="text-slate-400 text-sm mb-6">
                Book a 30-minute demo. We&apos;ll walk through your real numbers and show you exactly how much faster you&apos;d get paid.
              </p>
              <Link
                href="/contact"
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all hover:scale-105 shadow-lg shadow-blue-500/25"
              >
                Book a Real Demo →
              </Link>
            </div>
          </>
        )}
      </main>

      {toast && <Toast message={toast.msg} type={toast.type} />}
    </div>
  );
}
