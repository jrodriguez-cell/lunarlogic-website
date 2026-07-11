import Link from "next/link";

interface CTASectionProps {
  heading?: string;
  subheading?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function CTASection({
  heading = "Ready to automate the busywork?",
  subheading = "Join service businesses using custom LunarLogic automations to run their accounting, AR, AP, and beyond, without the manual work.",
  ctaText = "Get a Demo",
  ctaHref = "/contact",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{heading}</h2>
        <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">{subheading}</p>
        <Link
          href={ctaHref}
          className="inline-block bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-xl text-base font-bold transition-all hover:scale-105 shadow-lg"
        >
          {ctaText}
        </Link>
        <p className="mt-4 text-sm text-blue-200">No long-term lock-in required.</p>
      </div>
    </section>
  );
}
