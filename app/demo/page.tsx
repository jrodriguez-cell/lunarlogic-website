import { Suspense } from "react";
import DemoDashboard from "./DemoDashboard";

export const metadata = {
  title: "Your DSO Dashboard — LunarLogic",
  description: "A personalized AR dashboard built from your inputs.",
};

export default function DemoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <DemoDashboard />
    </Suspense>
  );
}
