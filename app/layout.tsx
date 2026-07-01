import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LunarLogic: AI Accounting Automation for Service Businesses",
    template: "%s | LunarLogic",
  },
  description:
    "LunarLogic is AI accounting automation for service businesses. It sends invoices, follows up on late payments, and matches payments to the right invoice, so you get paid faster with far less manual work.",
  keywords: [
    "AI accounting automation",
    "accounting automation software",
    "AI accounts receivable automation",
    "invoice automation",
    "automated payment reminders",
    "QuickBooks automation",
    "accounts receivable software",
    "get paid faster",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lunarlogic.ai",
    siteName: "LunarLogic",
    title: "LunarLogic: AI Accounting Automation for Service Businesses",
    description:
      "AI accounting automation that gets service businesses paid faster. Invoices go out on time, late payments are followed up automatically, and payments are matched for you. Kaptain Clean was paid 19 days sooner.",
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
