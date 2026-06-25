"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  company: string;
  invoiceVolume: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    invoiceVolume: "",
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
    // Simulate submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-10 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h2 className="text-xl font-bold text-white mb-2">Request Received</h2>
        <p className="text-slate-400">
          Thanks, {formData.name}! Jonathan will be in touch within one business day to schedule your demo.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 space-y-5">
      <h2 className="text-lg font-semibold text-white mb-6">Tell us about your firm</h2>

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

      <div>
        <label className="block text-xs font-medium text-slate-400 mb-1.5" htmlFor="invoiceVolume">
          Monthly Invoice Volume
        </label>
        <select
          id="invoiceVolume"
          name="invoiceVolume"
          value={formData.invoiceVolume}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="" disabled>Select approximate volume</option>
          <option value="under-50">Under 50 invoices/month</option>
          <option value="50-150">50–150 invoices/month</option>
          <option value="150-250">150–250 invoices/month</option>
          <option value="250-400">250–400 invoices/month</option>
          <option value="400+">400+ invoices/month</option>
        </select>
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
          placeholder="Tell us about your current AR process, pain points, or what you're hoping to solve..."
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
