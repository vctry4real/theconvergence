import { supabaseAdmin } from "@/lib/supabase-admin";
import RegistrantsTable from "@/components/dashboard/RegistrantsTable";
import type { RegistrationStatus } from "@/lib/validations";

export const dynamic = "force-dynamic";

async function getStats() {
  const { data } = await supabaseAdmin
    .from("registrations")
    .select("status, registration_type, ticket_type");

  if (!data) return { total: 0, pending: 0, approved: 0, paid: 0, invite_sent: 0, access: 0, executive: 0, premier: 0 };

  return {
    total:       data.length,
    pending:     data.filter((r) => r.status === "pending").length,
    approved:    data.filter((r) => r.status === "approved").length,
    paid:        data.filter((r) => r.status === "paid").length,
    invite_sent: data.filter((r) => r.status === "invite_sent").length,
    access:      data.filter((r) => r.ticket_type === "access").length,
    executive:   data.filter((r) => r.ticket_type === "executive").length,
    premier:     data.filter((r) => r.ticket_type === "premier").length,
  };
}

async function getRegistrants() {
  const { data } = await supabaseAdmin
    .from("registrations")
    .select("id, created_at, full_name, email, phone, organization, registration_type, ticket_type, status")
    .order("created_at", { ascending: false });

  return data ?? [];
}

const STAT_CARDS: {
  key: keyof Awaited<ReturnType<typeof getStats>>;
  label: string;
  accent: string;
  border: string;
}[] = [
  { key: "total",       label: "Total",       accent: "text-gray-900",   border: "border-gray-200"  },
  { key: "pending",     label: "Pending",     accent: "text-yellow-600", border: "border-yellow-200" },
  { key: "approved",    label: "Approved",    accent: "text-blue-600",   border: "border-blue-200"  },
  { key: "paid",        label: "Paid",        accent: "text-green-600",  border: "border-green-200" },
  { key: "invite_sent", label: "Invite Sent", accent: "text-teal-600",   border: "border-teal-200"  },
];

const TICKET_STAT_CARDS: {
  key: keyof Awaited<ReturnType<typeof getStats>>;
  label: string;
  accent: string;
  border: string;
}[] = [
  { key: "access",    label: "Access (₦100k)",    accent: "text-gray-700",   border: "border-gray-200"   },
  { key: "executive", label: "Executive (₦300k)", accent: "text-blue-700",   border: "border-blue-200"   },
  { key: "premier",   label: "Premier (₦500k)",   accent: "text-purple-700", border: "border-purple-200" },
];

export default async function DashboardPage() {
  const [stats, registrants] = await Promise.all([getStats(), getRegistrants()]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">
            Admin Dashboard
          </p>
          <h1 className="text-3xl font-black text-gray-900">Registrants</h1>
        </div>
        <p className="text-xs text-gray-400 hidden sm:block">
          The Convergence 2026 · April 18
        </p>
      </div>

      {/* Status stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className={`bg-white border rounded-2xl p-5 ${card.border}`}>
            <p className={`text-4xl font-black tabular-nums ${card.accent}`}>{stats[card.key]}</p>
            <p className="text-xs text-gray-400 font-medium mt-2">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Ticket tier stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {TICKET_STAT_CARDS.map((card) => (
          <div key={card.key} className={`bg-white border rounded-2xl p-5 ${card.border}`}>
            <p className={`text-4xl font-black tabular-nums ${card.accent}`}>{stats[card.key]}</p>
            <p className="text-xs text-gray-400 font-medium mt-2">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="text-sm font-bold text-gray-900">All Applications</h2>
        </div>
        <div className="p-6">
          <RegistrantsTable data={registrants} />
        </div>
      </div>
    </div>
  );
}
