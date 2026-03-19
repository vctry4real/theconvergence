import { supabaseAdmin } from "@/lib/supabase-admin";
import RegistrantsTable from "@/components/dashboard/RegistrantsTable";
import StatusBadge from "@/components/dashboard/StatusBadge";
import type { RegistrationStatus } from "@/lib/validations";

export const dynamic = "force-dynamic";

async function getStats() {
  const { data } = await supabaseAdmin
    .from("registrations")
    .select("status, registration_type");

  if (!data) return { total: 0, pending: 0, approved: 0, paid: 0, invite_sent: 0 };

  return {
    total: data.length,
    pending: data.filter((r) => r.status === "pending").length,
    approved: data.filter((r) => r.status === "approved").length,
    paid: data.filter((r) => r.status === "paid").length,
    invite_sent: data.filter((r) => r.status === "invite_sent").length,
  };
}

async function getRegistrants() {
  const { data } = await supabaseAdmin
    .from("registrations")
    .select("id, created_at, full_name, email, phone, organization, registration_type, status")
    .order("created_at", { ascending: false });

  return data ?? [];
}

export default async function DashboardPage() {
  const [stats, registrants] = await Promise.all([getStats(), getRegistrants()]);

  const statCards = [
    { label: "Total Applications", value: stats.total, color: "text-gray-900" },
    { label: "Pending Review", value: stats.pending, status: "pending" as RegistrationStatus },
    { label: "Approved", value: stats.approved, status: "approved" as RegistrationStatus },
    { label: "Paid", value: stats.paid, status: "paid" as RegistrationStatus },
    { label: "Invite Sent", value: stats.invite_sent, status: "invite_sent" as RegistrationStatus },
  ];

  return (
    <div className="space-y-8">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-black text-gray-900">Registrants</h1>
        <p className="text-gray-400 text-sm mt-0.5">The Convergence 2026 · Applications</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-5">
            <p className="text-3xl font-black text-gray-900">{card.value}</p>
            <div className="mt-2 flex items-center gap-2">
              {card.status && <StatusBadge status={card.status} />}
              {!card.status && <p className="text-xs text-gray-500 font-medium">{card.label}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <RegistrantsTable data={registrants} />
      </div>
    </div>
  );
}
