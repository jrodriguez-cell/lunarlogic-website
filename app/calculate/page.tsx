"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  "Commercial Cleaning",
  "HVAC",
  "Plumbing & Mechanical",
  "Landscaping",
  "IT Services",
  "Consulting",
  "Construction",
  "Professional Services",
  "Other",
];

const TERMS_OPTIONS = [
  { label: "Net 15", value: 15 },
  { label: "Net 30", value: 30 },
  { label: "Net 45", value: 45 },
  { label: "Net 60", value: 60 },
];

const OVERDUE_OPTIONS = [
  { label: "Less than 1 week late", value: 4 },
  { label: "1–2 weeks late", value: 10 },
  { label: "2–3 weeks late", value: 18 },
  { label: "3–4 weeks late", value: 25 },
  { label: "More than a month late", value: 40 },
];

type FormData = {
  company: string;
  industry: string;
  monthlyInvoices: string;
  avgInvoiceValue: string;
  paymentTerms: number;
  overdueDays: number;
  name: string;
  email: string;
};

export default function CalculatePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormData>({
    company: "",
    industry: "",
    monthlyInvoices: "",
    avgInvoiceValue: "",
    paymentTerms: 30,
    overdueDays: 10,
    name: "",
    email: "",
  });

  const update = (field: keyof FormData, value: string | number) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const canAdvance = () => {
    if (step === 1) return form.company.trim().length > 0 && form.industry.length > 0;
    if (step === 2) return form.monthlyInvoices.length > 0 && form.avgInvoiceValue.length > 0;
    if (step === 3) return true;
    if (step === 4) return form.name.trim().length > 0 && form.email.includes("@");
    return false;
  };

  const currentDSO = form.paymentTerms + form.overdueDays;
  const projectedDSO = Math.round(currentDSO * 0.6);
  const monthlyAR = (Number(form.monthlyInvoices) || 0) * (Number(form.avgInvoiceValue) || 0);
  const cashUnlocked = Math.round(monthlyAR * (currentDSO - projectedDSO) / 30);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      await fetch("/api/demo-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          industry: form.industry,
          monthlyInvoices: form.monthlyInvoices,
          avgInvoiceValue: form.avgInvoiceValue,
          paymentTerms: form.paymentTerms,
          overdueDays: form.overdueDays,
          currentDSO,
        }),
      });
    } catch {
      // Don't block the demo if email fails
    }

    const params = new URLSearchParams({
      co: form.company,
      ind: form.industry,
      vol: form.monthlyInvoices,
      avg: form.avgInvoiceValue,
      terms: String(form.paymentTerms),
      over: String(form.overdueDays),
      name: form.name,
    });
    router.push(`/demo?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Progress bar */}
      <div className="w-full bg-slate-900 h-1">
        <div
          className="h-1 bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-500"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg">
          <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">Step {step} of 4</p>

          {/* Step 1 */}
          {step === 1 && (
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Tell us about your business</h1>
              <p className="text-slate-400 mb-8">We&apos;ll use this to personalize your dashboard.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => update("company", e.target.value)}
                    placeholder="Acme Services LLC"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Industry</label>
                  <div className="grid grid-cols-2 gap-2">
                    {INDUSTRIES.map((ind) => (
                      <button
                        key={ind}
                        onClick={() => update("industry", ind)}
                        className={`px-3 py-2.5 rounded-xl text-sm font-medium border transition-all text-left ${
                          form.industry === ind
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Your invoice volume</h1>
              <p className="text-slate-400 mb-8">Estimates are fine — we&apos;ll use these to size your dashboard.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Invoices sent per month</label>
                  <input
                    type="number"
                    value={form.monthlyInvoices}
                    onChange={(e) => update("monthlyInvoices", e.target.value)}
                    placeholder="e.g. 75"
                    min="1"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Average invoice value</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">$</span>
                    <input
                      type="number"
                      value={form.avgInvoiceValue}
                      onChange={(e) => update("avgInvoiceValue", e.target.value)}
                      placeholder="e.g. 2500"
                      min="1"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-8 pr-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-3">Payment terms you offer</label>
                  <div className="grid grid-cols-4 gap-2">
                    {TERMS_OPTIONS.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => update("paymentTerms", t.value)}
                        className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                          form.paymentTerms === t.value
                            ? "bg-blue-500/20 border-blue-500 text-blue-300"
                            : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">How late do customers pay?</h1>
              <p className="text-slate-400 mb-8">On average, how long after the due date do you actually receive payment?</p>
              <div className="space-y-3 mb-6">
                {OVERDUE_OPTIONS.map((o) => (
                  <button
                    key={o.value}
                    onClick={() => update("overdueDays", o.value)}
                    className={`w-full px-5 py-4 rounded-xl text-sm font-medium border transition-all text-left flex items-center justify-between ${
                      form.overdueDays === o.value
                        ? "bg-blue-500/20 border-blue-500 text-white"
                        : "bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600"
                    }`}
                  >
                    <span>{o.label}</span>
                    {form.overdueDays === o.value && (
                      <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Your estimated current DSO</p>
                <p className="text-4xl font-extrabold text-white mb-1">
                  {currentDSO} <span className="text-xl font-normal text-slate-400">days</span>
                </p>
                <p className="text-xs text-slate-500">Net {form.paymentTerms} terms + ~{form.overdueDays} days late on average</p>
              </div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <h1 className="text-3xl font-extrabold text-white mb-2">Where should we send your results?</h1>
              <p className="text-slate-400 mb-8">Your dashboard generates instantly. We&apos;ll also send you a copy of your figures.</p>
              <div className="space-y-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Your name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Work email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              {/* Summary */}
              <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-5 space-y-3">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Your dashboard preview</p>
                {[
                  { label: "Company", value: form.company },
                  { label: "Current DSO", value: `${currentDSO} days` },
                  { label: "Projected DSO with LunarLogic", value: `${projectedDSO} days`, green: true },
                  { label: "Monthly AR", value: `$${monthlyAR.toLocaleString()}` },
                  { label: "Cash to unlock / month", value: `$${cashUnlocked.toLocaleString()}`, green: true },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">{row.label}</span>
                    <span className={`font-semibold ${row.green ? "text-green-400" : "text-white"}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep((s) => s - 1)}
                className="text-slate-400 hover:text-white text-sm font-medium transition-colors"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                Continue →
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canAdvance() || submitting}
                className="bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-7 py-3 rounded-xl text-sm font-semibold transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
              >
                {submitting ? "Generating…" : "See My Dashboard →"}
              </button>
            )}
          </div>

          <p className="text-center text-xs text-slate-600 mt-6">No credit card. No commitment. Just your numbers.</p>
        </div>
      </div>
    </div>
  );
}
