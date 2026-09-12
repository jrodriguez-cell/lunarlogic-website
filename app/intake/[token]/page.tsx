import { createAdminClient } from "@/lib/supabase/admin";
import IntakeForm from "./IntakeForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Client Intake",
};

function UsedOrInvalid({ title, message }: { title: string; message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md text-center">
        <div className="text-2xl font-bold text-slate-900 font-sans">{title}</div>
        <p className="mt-3 text-slate-500">{message}</p>
      </div>
    </div>
  );
}

export default async function IntakePage({
  params,
}: {
  params: { token: string };
}) {
  const supabase = createAdminClient();
  const { data: link } = await supabase
    .from("intake_links")
    .select("id, status")
    .eq("token", params.token)
    .maybeSingle();

  if (!link) {
    return (
      <UsedOrInvalid
        title="Link not found"
        message="This intake link isn't valid. Please check with your trainer for a new one."
      />
    );
  }

  if (link.status !== "pending") {
    return (
      <UsedOrInvalid
        title="This link has already been used"
        message="Your intake has been submitted. Your trainer will be in touch with your plan. If you think this is a mistake, reach out to them."
      />
    );
  }

  return <IntakeForm token={params.token} />;
}
