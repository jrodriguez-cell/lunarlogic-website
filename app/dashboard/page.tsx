import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import {
  CLIENT_STAGE_LABEL,
  type ClientStage,
  type Client,
  type IntakeLink,
} from "@/lib/trainer/types";
import NewClientForm from "./NewClientForm";

export const dynamic = "force-dynamic";

interface ClientRow {
  client: Client;
  stage: ClientStage;
  planId: string | null;
}

const STAGE_BADGE: Record<ClientStage, string> = {
  no_link: "bg-slate-100 text-slate-600",
  link_sent: "bg-amber-100 text-amber-700",
  intake_submitted: "bg-blue-100 text-blue-700",
  plan_draft: "bg-violet-100 text-violet-700",
  plan_sent: "bg-emerald-100 text-emerald-700",
};

async function loadClientRows(): Promise<ClientRow[]> {
  const supabase = createClient();

  const [clientsRes, linksRes, subsRes, plansRes] = await Promise.all([
    supabase.from("clients").select("*").order("created_at", { ascending: false }),
    supabase.from("intake_links").select("id, client_id, token, status, created_at"),
    supabase.from("intake_submissions").select("id, intake_link_id"),
    supabase.from("plans").select("id, intake_submission_id, status"),
  ]);

  const clients = (clientsRes.data ?? []) as Client[];
  const links = (linksRes.data ?? []) as IntakeLink[];
  const subs = (subsRes.data ?? []) as { id: string; intake_link_id: string }[];
  const plans = (plansRes.data ?? []) as {
    id: string;
    intake_submission_id: string;
    status: string;
  }[];

  // Latest link per client.
  const latestLinkByClient = new Map<string, IntakeLink>();
  for (const link of links) {
    const existing = latestLinkByClient.get(link.client_id);
    if (!existing || link.created_at > existing.created_at) {
      latestLinkByClient.set(link.client_id, link);
    }
  }

  const subByLink = new Map(subs.map((s) => [s.intake_link_id, s]));
  const planBySub = new Map(plans.map((p) => [p.intake_submission_id, p]));

  return clients.map((client) => {
    const link = latestLinkByClient.get(client.id);
    let stage: ClientStage = "no_link";
    let planId: string | null = null;

    if (link) {
      if (link.status === "pending" || link.status === "expired") {
        stage = "link_sent";
      } else if (link.status === "submitted") {
        const sub = subByLink.get(link.id);
        const plan = sub ? planBySub.get(sub.id) : undefined;
        if (plan) {
          planId = plan.id;
          stage = plan.status === "sent" ? "plan_sent" : "plan_draft";
        } else {
          stage = "intake_submitted";
        }
      }
    }

    return { client, stage, planId };
  });
}

export default async function DashboardPage() {
  const rows = await loadClientRows();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-sans text-slate-900">Clients</h1>
          <p className="text-sm text-slate-500 mt-1">
            {rows.length} {rows.length === 1 ? "client" : "clients"}
          </p>
        </div>
        <NewClientForm />
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <p className="text-slate-500">
            No clients yet. Add your first client to send an intake link.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-left text-slate-500">
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ client, stage, planId }) => (
                <tr
                  key={client.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {client.name}
                  </td>
                  <td className="px-4 py-3 text-slate-500">{client.email}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STAGE_BADGE[stage]}`}
                    >
                      {CLIENT_STAGE_LABEL[stage]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {planId ? (
                      <Link
                        href={`/dashboard/plans/${planId}`}
                        className="text-indigo-600 font-medium hover:text-indigo-800"
                      >
                        {stage === "plan_sent" ? "View plan" : "Review plan"}
                      </Link>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
