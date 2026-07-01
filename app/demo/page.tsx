import { Suspense } from "react";
import DemoDashboard from "./DemoDashboard";

export const metadata = {
  title: "Your Get-Paid Dashboard: LunarLogic",
  description: "A personalized AI accounting automation dashboard built from your numbers, showing how much faster you could get paid.",
};

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <DemoDashboard />
    </Suspense>
  );
}
