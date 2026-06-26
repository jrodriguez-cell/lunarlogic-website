import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with LunarLogic to book a demo or ask about AR automation for your professional services firm.",
};

export default function ContactPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-slate-950 py-20 border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Get in Touch</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Book a Demo</h1>
            <p className="text-lg text-slate-400 max-w-xl mx-auto">
              30 minutes. We will walk through your current AR process, show you the LunarLogic workflow live, and give
              you a DSO reduction estimate.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Form */}
            <div className="lg:col-span-3">
              <ScrollReveal animation="slide-left">
                <ContactForm />
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <ScrollReveal animation="slide-right" delay={80}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">Direct Contact</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Sales</p>
                      <a
                        href="mailto:support@lunarlogic.ai"
                        className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                      >
                        support@lunarlogic.ai
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-right" delay={160}>
                <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6">
                  <h3 className="text-white font-semibold mb-4">What to Expect</h3>
                  <ul className="space-y-3">
                    {[
                      "Review your current AR process",
                      "Live walkthrough of LunarLogic workflows",
                      "Custom DSO reduction estimate",
                      "Pricing recommendation for your volume",
                      "No obligation — no hard sell",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="slide-right" delay={240}>
                <div className="bg-blue-600/10 border border-blue-500/30 rounded-2xl p-6">
                  <p className="text-sm text-blue-300">
                    <span className="font-semibold text-blue-400">No lock-in.</span> Month-to-month contracts available.
                    Annual commitments waive the implementation fee.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
