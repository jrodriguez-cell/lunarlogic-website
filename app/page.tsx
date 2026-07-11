import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import CTASection from "@/components/CTASection";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "LunarLogic: Custom Accounting Automation, Built Around Your Business",
  description:
    "LunarLogic builds custom accounting automation for owner-operated service businesses. Accounts receivable, accounts payable, and full back-office automation are common examples of what we build.",
};

const EXAMPLE_SUITES = [
  {
    id: "ar",
    name: "AR Automation",
    status: "Production",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
    description:
      "Invoicing, payment follow-up, and cash application, running without anyone chasing a client.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z" />
      </svg>
    ),
  },
  {
    id: "ap",
    name: "AP Automation",
    status: "In Development",
    statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    description:
      "Vendor bills captured, routed for approval, and paid on schedule, no more surprise due dates.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "full",
    name: "Full Accounting Suite",
    status: "Coming Soon",
    statusColor: "text-slate-400 bg-slate-700 border-slate-600",
    description:
      "Cash flow forecasting, faster month-end close, and real-time reporting, the whole back office on autopilot.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Product Demo Video — top of page */}
      <section className="bg-slate-950 pt-12 sm:pt-16 pb-14 sm:pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">See It In Action</p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              A week of accounts receivable work. Done automatically.
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Invoices sent, late payments chased, cash matched, without anyone on your team lifting a finger. This is
              one example of the custom automations we build.
            </p>
          </div>
          <div className="relative">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-blue-500/20 blur-3xl rounded-[2rem] pointer-events-none"
            />
            <div className="relative rounded-2xl overflow-hidden border border-blue-500/25 shadow-2xl shadow-blue-500/20">
              <video
                className="w-full h-auto block"
                width={1440}
                height={810}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster="/video/lunarlogic-demo-poster.png"
                aria-label="Animated demo of an example LunarLogic accounts receivable automation"
              >
                <source src="/video/lunarlogic-demo.webm" type="video/webm" />
                <source src="/video/lunarlogic-demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </section>

      <Hero />

      {/* What We Automate — AR / AP / Full Suite as examples */}
      <section className="bg-slate-900 border-y border-slate-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal animation="fade-up">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Example Solutions</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Not a fixed product. A custom build.
              </h2>
              <p className="text-lg text-slate-400">
                Every LunarLogic automation is tailored to how your business actually runs. These are the problems we
                solve most often, offered here as examples of what a custom build can look like.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {EXAMPLE_SUITES.map((suite, i) => (
              <ScrollReveal key={suite.id} animation="zoom-in" delay={i * 90}>
                <Link
                  href={`/use-cases#${suite.id}`}
                  className="group block h-full bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 rounded-2xl p-6 transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                      {suite.icon}
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${suite.statusColor}`}>
                      {suite.status}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{suite.name}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">{suite.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
                    See the use cases
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal animation="fade-in" delay={280}>
            <p className="text-center text-slate-500 text-sm mt-10">
              Your bottleneck lives somewhere else in your books?{" "}
              <Link href="/contact" className="text-blue-400 hover:text-blue-300 transition-colors">
                Tell us about it.
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Problem / Why It Matters */}
      <section className="py-24 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal animation="slide-left">
              <div>
                <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">The Problem</p>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
                  Every business has a bottleneck in its books.
                </h2>
                <p className="text-lg text-slate-400 mb-6">
                  For some businesses it&apos;s getting invoices out the door. For others it&apos;s chasing late
                  payments, approving vendor bills, or closing the books each month. Off-the-shelf software handles
                  the easy 80%. The last 20%, the part that actually costs you hours every week, gets left to whoever
                  has time.
                </p>
                <p className="text-lg text-slate-400 mb-8">
                  LunarLogic builds the automation for that last 20%: tailored to your workflow, your accounting
                  system, and the specific way your business runs.
                </p>
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  See how a LunarLogic build comes together
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </ScrollReveal>
            <div className="space-y-4">
              {[
                {
                  title: "Invoices go out late, or not at all",
                  body: "A common AR bottleneck: billing competes with everything else on the owner's plate, so it slips.",
                },
                {
                  title: "No consistent follow-up on what's owed",
                  body: "Whether it's client payments or vendor bills, work without a system to track it ages in silence.",
                },
                {
                  title: "Manual work is invisible until it isn't",
                  body: "The cost of a missing automation doesn't show up until a deadline is missed or cash runs short.",
                },
                {
                  title: "The fix has to fit how you already work",
                  body: "Generic software rarely matches your process exactly. A custom build is made to fit it.",
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} animation="slide-right" delay={i * 90}>
                  <div className="flex items-start gap-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4">
                    <div className="w-2 h-2 mt-2 rounded-full bg-blue-400 flex-shrink-0" />
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Kaptain Clean Case Study Teaser */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal animation="fade-up">
            <p className="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3">Case Study</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              How a custom AR build freed $65,000 for Kaptain Clean
            </h2>
          </ScrollReveal>
          <ScrollReveal animation="zoom-in" delay={100}>
            <blockquote className="bg-slate-800/50 border border-slate-700 rounded-2xl p-5 sm:p-8 text-left mb-8">
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                &ldquo;I don&apos;t know how to explain this, but I feel like I finally own my business again.&rdquo;
              </p>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Payments started arriving 19 days faster on average. Invoice processing time fell 84%. Over $65,000 in
                cash freed up, not from new revenue, but from money that was already earned and sitting uncollected.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-400 font-bold text-sm">KC</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Kaptain Clean LLC</p>
                  <p className="text-slate-400 text-xs">Commercial Cleaning, Charlotte, NC</p>
                </div>
              </div>
            </blockquote>
          </ScrollReveal>
          <ScrollReveal animation="fade-up" delay={150}>
            <Link
              href="/case-studies"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              Read the full case study
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
