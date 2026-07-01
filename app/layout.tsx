import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "LunarLogic: Get Paid Faster, Automatically",
    template: "%s | LunarLogic",
  },
  description:
    "LunarLogic sends your invoices, chases late payments, and matches the money to the right invoice — so your service business gets paid faster without the busywork.",
  keywords: ["get paid faster", "invoice automation", "payment reminders", "QuickBooks", "small business cash flow"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lunarlogic.ai",
    siteName: "LunarLogic",
    title: "LunarLogic: Get Paid Faster, Automatically",
    description:
      "LunarLogic gets service businesses paid faster — invoices out on time, reminders sent for you, payments matched automatically. Kaptain Clean got paid 19 days sooner.",
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
