import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LunarLogic: Custom Accounting Automation for Service Businesses",
    template: "%s | LunarLogic",
  },
  description:
    "LunarLogic builds custom accounting automation on QuickBooks for owner-operated service businesses and the bookkeepers and fractional CFOs who manage their books. Discovered through direct process analysis, built around the actual bottleneck.",
  keywords: ["accounting automation", "custom automation", "accounts receivable automation", "accounts payable automation", "QuickBooks automation", "bookkeeper automation", "fractional CFO", "business process automation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lunarlogic.ai",
    siteName: "LunarLogic",
    title: "LunarLogic: Discovery-First Custom Accounting Automation on QuickBooks",
    description:
      "Not a fixed product or an AR tool. LunarLogic runs a discovery-first process and builds the custom accounting system each business needs on QuickBooks. Proven with real service businesses.",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://lunarlogic.ai/#organization",
      name: "LunarLogic",
      url: "https://lunarlogic.ai",
      email: "support@lunarlogic.ai",
      slogan:
        "We build the accounting system your business needs — discovered through real conversation, not sold off a shelf.",
      description:
        "LunarLogic builds custom accounting automation on QuickBooks for owner-operated service businesses and the bookkeepers and fractional CFOs who manage their books. Every engagement starts with discovery, and the build is scoped to the actual bottleneck.",
      areaServed: [
        { "@type": "City", name: "Charlotte", address: { "@type": "PostalAddress", addressRegion: "NC", addressCountry: "US" } },
        { "@type": "Country", name: "United States" },
      ],
      knowsAbout: [
        "QuickBooks automation",
        "Accounts receivable automation",
        "Accounts payable automation",
        "Month-end close automation",
        "Bank reconciliation automation",
        "EBITDA adjustment and consolidation",
        "Debt schedule management",
        "Cash flow forecasting",
        "Accounting workflow automation for small business",
      ],
    },
    {
      "@type": "Service",
      "@id": "https://lunarlogic.ai/#service",
      name: "Custom Accounting Automation",
      serviceType: "Custom accounting automation built on QuickBooks",
      provider: { "@id": "https://lunarlogic.ai/#organization" },
      areaServed: [
        { "@type": "City", name: "Charlotte" },
        { "@type": "Country", name: "United States" },
      ],
      audience: [
        {
          "@type": "BusinessAudience",
          name: "Owner-operated service businesses",
          description:
            "Owner-operated service businesses with $750K–$10M in annual revenue, running on QuickBooks Online or Desktop with no dedicated in-house accounting staff. Target verticals: commercial cleaning and janitorial, landscaping and lawn care, HVAC/plumbing/electrical, staffing and temporary labor, marketing and creative agencies, IT managed service providers, and commercial property maintenance.",
        },
        {
          "@type": "BusinessAudience",
          name: "Bookkeepers, fractional CFOs, and QuickBooks ProAdvisors",
          description:
            "Bookkeeping practices, fractional CFOs, and QuickBooks ProAdvisors managing a book of QuickBooks clients — the primary channel and highest-leverage buyer.",
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-clip">
      <body className="antialiased bg-slate-950 text-white min-h-screen flex flex-col overflow-x-clip">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
