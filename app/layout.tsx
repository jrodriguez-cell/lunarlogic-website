import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LunarLogic: AR Automation for Professional Services",
    template: "%s | LunarLogic",
  },
  description:
    "LunarLogic automates your Accounts Receivable: invoice creation, payment reminders, and cash application, reducing DSO for small professional services firms.",
  keywords: ["AR automation", "accounts receivable", "DSO reduction", "QuickBooks", "invoice automation"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lunarlogic.ai",
    siteName: "LunarLogic",
    title: "LunarLogic: Cut Your DSO. Get Paid Faster.",
    description:
      "AR automation platform for professional services firms. 19-day DSO improvement proven with Kaptain Clean LLC.",
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
