import Link from "next/link";

interface PricingCardProps {
  name: string;
  price: number;
  invoiceLimit: number;
  features: string[];
  highlighted?: boolean;
  ctaText?: string;
}

export default function PricingCard({
  name,
  price,
  invoiceLimit,
  features,
  highlighted = false,
  ctaText = "Get Started",
}: PricingCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-8 flex flex-col transition-all hover:-translate-y-1 ${
        highlighted
          ? "bg-blue-600 border-2 border-blue-400 shadow-xl shadow-blue-500/30"
          : "bg-slate-800/50 border border-slate-700"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-400 to-indigo-400 text-white text-xs font-bold px-4 py-1 rounded-full">
          MOST POPULAR
        </div>
      )}

      <div className="mb-6">
        <h3 className={`text-lg font-semibold mb-1 ${highlighted ? "text-white" : "text-slate-200"}`}>{name}</h3>
        <p className={`text-sm ${highlighted ? "text-blue-100" : "text-slate-400"}`}>
          Up to {invoiceLimit.toLocaleString()} invoices/mo
        </p>
      </div>

      <div className="mb-8">
        <span className={`text-4xl font-extrabold ${highlighted ? "text-white" : "text-white"}`}>
          ${price.toLocaleString()}
        </span>
        <span className={`text-sm ml-1 ${highlighted ? "text-blue-100" : "text-slate-400"}`}>/month</span>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <svg
              className={`w-5 h-5 mt-0.5 flex-shrink-0 ${highlighted ? "text-blue-200" : "text-blue-400"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className={`text-sm ${highlighted ? "text-blue-50" : "text-slate-300"}`}>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`block text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all ${
          highlighted
            ? "bg-white text-blue-600 hover:bg-blue-50"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {ctaText}
      </Link>
    </div>
  );
}
