"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import StatusBadge from "./StatusBadge";
import type { RegistrationStatus } from "@/lib/validations";

type Registration = {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone: string;
  organization: string;
  registration_type: string;
  ticket_type: string | null;
  status: RegistrationStatus;
};

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  individual: { label: "Individual", color: "text-purple-700 bg-purple-50 border border-purple-200" },
  business:   { label: "Business",   color: "text-orange-700 bg-orange-50 border border-orange-200" },
  corporate:  { label: "Corporate",  color: "text-blue-700 bg-blue-50 border border-blue-200" },
};

const TICKET_LABELS: Record<string, { label: string; color: string }> = {
  access:    { label: "Access",    color: "text-gray-700 bg-gray-100 border border-gray-200" },
  executive: { label: "Executive", color: "text-blue-700 bg-blue-50 border border-blue-200" },
  premier:   { label: "Premier",   color: "text-purple-700 bg-purple-50 border border-purple-200" },
};

const STATUSES  = ["all", "pending", "approved", "paid", "invite_sent"] as const;
const TYPES     = ["all", "individual", "business", "corporate"] as const;
const TICKETS   = ["all", "access", "executive", "premier"] as const;
const SORT_OPTS = ["newest", "oldest", "name_asc", "name_desc", "ticket"] as const;

const STATUS_LABELS: Record<string, string> = {
  all: "All Statuses", pending: "Pending", approved: "Approved",
  paid: "Paid", invite_sent: "Invite Sent",
};
const TYPE_LABEL_MAP: Record<string, string> = {
  all: "All Types", individual: "Individual", business: "Business", corporate: "Corporate",
};
const TICKET_LABEL_MAP: Record<string, string> = {
  all: "All Tickets", access: "Access (₦100k)", executive: "Executive (₦300k)", premier: "Premier (₦500k)",
};
const SORT_LABEL_MAP: Record<string, string> = {
  newest: "Newest first", oldest: "Oldest first",
  name_asc: "Name A–Z", name_desc: "Name Z–A", ticket: "Ticket tier",
};

export default function RegistrantsTable({ data }: { data: Registration[] }) {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");
  const [typeFilter, setType]       = useState("all");
  const [ticketFilter, setTicket]   = useState("all");
  const [sortBy, setSortBy]         = useState<typeof SORT_OPTS[number]>("newest");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [, startTransition]         = useTransition();
  const router                      = useRouter();

  const TICKET_ORDER: Record<string, number> = { access: 0, executive: 1, premier: 2 };

  const filtered = data
    .filter((r) => {
      const q = search.toLowerCase();
      return (
        (r.full_name.toLowerCase().includes(q) ||
          r.email.toLowerCase().includes(q) ||
          r.organization.toLowerCase().includes(q)) &&
        (statusFilter === "all" || r.status === statusFilter) &&
        (typeFilter   === "all" || r.registration_type === typeFilter) &&
        (ticketFilter === "all" || r.ticket_type === ticketFilter)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case "name_asc":  return a.full_name.localeCompare(b.full_name);
        case "name_desc": return b.full_name.localeCompare(a.full_name);
        case "ticket":    return (TICKET_ORDER[a.ticket_type ?? ""] ?? 99) - (TICKET_ORDER[b.ticket_type ?? ""] ?? 99);
        default:          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

  const exportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Organisation", "Type", "Ticket", "Status", "Registered", "Ticket URL"];
    const rows = filtered.map((r) => [
      r.full_name,
      r.email,
      r.phone,
      r.organization,
      r.registration_type,
      r.ticket_type ?? "",
      r.status,
      new Date(r.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      `${window.location.origin}/ticket/${r.id}`,
    ]);

    const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(escape).join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `convergence-registrants-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      startTransition(() => router.refresh());
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Row 1: search + count */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search name, email, organisation…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 h-9 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-teal-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-3 sm:ml-auto">
          <p className="text-xs text-gray-400 self-center">
            {filtered.length} / {data.length} registrants
          </p>
          <button
            onClick={exportCSV}
            disabled={filtered.length === 0}
            className="flex items-center gap-1.5 h-9 px-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-xl transition-colors whitespace-nowrap"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Row 2: filters + sort */}
      <div className="flex flex-wrap gap-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
        >
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setType(e.target.value)}
          className="h-9 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
        >
          {TYPES.map((t) => <option key={t} value={t}>{TYPE_LABEL_MAP[t]}</option>)}
        </select>

        <select
          value={ticketFilter}
          onChange={(e) => setTicket(e.target.value)}
          className="h-9 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
        >
          {TICKETS.map((t) => <option key={t} value={t}>{TICKET_LABEL_MAP[t]}</option>)}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof SORT_OPTS[number])}
          className="h-9 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
        >
          {SORT_OPTS.map((s) => <option key={s} value={s}>{SORT_LABEL_MAP[s]}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-100 overflow-x-auto">
        <table className="w-full text-sm min-w-[700px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Applicant", "Organisation", "Type", "Ticket", "Applied", "Status", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-16 text-sm">
                  No registrants found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const typeStyle   = TYPE_LABELS[r.registration_type]   ?? { label: r.registration_type,   color: "text-gray-600 bg-gray-100 border border-gray-200" };
                const ticketStyle = TICKET_LABELS[r.ticket_type ?? ""] ?? { label: r.ticket_type ?? "—",  color: "text-gray-400 bg-gray-50 border border-gray-200" };
                return (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors">
                    <td className="px-4 py-3.5">
                      <p className="font-semibold text-gray-900 text-sm leading-none">{r.full_name}</p>
                      <p className="text-gray-400 text-xs mt-1">{r.email}</p>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 text-sm">{r.organization}</td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeStyle.color}`}>
                        {typeStyle.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${ticketStyle.color}`}>
                        {ticketStyle.label}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-gray-400 text-xs tabular-nums whitespace-nowrap">
                      {new Date(r.created_at).toLocaleDateString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="relative inline-block">
                        <select
                          value={r.status}
                          onChange={(e) => handleStatusChange(r.id, e.target.value)}
                          disabled={updatingId === r.id}
                          className="absolute inset-0 w-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                        >
                          <option value="pending">Pending</option>
                          <option value="approved">Approved</option>
                          <option value="paid">Paid</option>
                          <option value="invite_sent">Invite Sent</option>
                        </select>
                        <StatusBadge status={r.status} />
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Link
                        href={`/dashboard/${r.id}`}
                        className="text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors flex items-center gap-1"
                      >
                        View
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
