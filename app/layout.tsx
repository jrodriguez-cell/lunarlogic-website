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
    "LunarLogic builds custom accounting automation for owner-operated service businesses, tailored to your workflow. Accounts receivable, accounts payable, and full back-office automation are common examples of what we build.",
  keywords: ["accounting automation", "custom automation", "accounts receivable automation", "accounts payable automation", "QuickBooks automation", "business process automation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lunarlogic.ai",
    siteName: "LunarLogic",
    title: "LunarLogic: Custom Accounting Automation, Built Around Your Business",
    description:
      "Tailored automation for the accounting work eating your week, accounts receivable, accounts payable, and beyond. Proven with real service businesses.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-clip">
      <body className="antialiased bg-slate-950 text-white min-h-screen flex flex-col overflow-x-clip">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
