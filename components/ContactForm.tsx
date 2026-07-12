"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  automationFocus: string;
  currentSoftware: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    automationFocus: "",
    currentSoftware: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("submission failed");
      setSubmitted(true);
    } catch {
      alert("Something went wrong. Please email us at support@lunarlogic.ai.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center justify-center">
            <svg className="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Request Received</h2>
        <p className="text-slate-400">
          Thanks, {formData.name}! Our team will be in touch within one business day to schedule your demo.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 space-y-5">
      <h2 className="text-lg font-semibold text-white mb-6">Tell us about your business</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="name">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="email">
            Work Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@yourfirm.com"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="company">
          Company Name *
        </label>
        <input
          id="company"
          name="company"
          type="text"
          required
          value={formData.company}
          onChange={handleChange}
          placeholder="Acme Professional Services"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="automationFocus">
            What are you looking to automate?
          </label>
          <select
            id="automationFocus"
            name="automationFocus"
            value={formData.automationFocus}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>Select an area</option>
            <option value="ar">Accounts receivable (invoicing, collections)</option>
            <option value="ap">Accounts payable (bills, approvals)</option>
            <option value="full">Full accounting suite (close, reporting, forecasting)</option>
            <option value="unsure">Not sure yet / multiple areas</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="currentSoftware">
            Current accounting software
          </label>
          <select
            id="currentSoftware"
            name="currentSoftware"
            value={formData.currentSoftware}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="" disabled>Select a platform</option>
            <option value="quickbooks-online">QuickBooks Online</option>
            <option value="quickbooks-desktop">QuickBooks Desktop</option>
            <option value="sage-intacct">Sage Intacct</option>
            <option value="netsuite">NetSuite</option>
            <option value="xero">Xero</option>
            <option value="other">Other / not sure</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="message">
          Anything else we should know?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell us about your current process, what's not working, or what prompted you to look into this..."
          className={inputClass + " resize-none"}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 text-white py-3.5 rounded-xl font-semibold text-sm transition-all"
      >
        {submitting ? "Sending..." : "Request a Demo"}
      </button>

      <p className="text-xs text-slate-500 text-center">
        We will respond within one business day. No spam, no auto-enroll.
      </p>
    </form>
  );
}
