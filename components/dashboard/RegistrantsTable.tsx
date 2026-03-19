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
  status: RegistrationStatus;
};

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  individual: { label: "Individual", color: "text-purple-700 bg-purple-50 border border-purple-200" },
  business:   { label: "Business",   color: "text-orange-700 bg-orange-50 border border-orange-200" },
  corporate:  { label: "Corporate",  color: "text-blue-700   bg-blue-50   border border-blue-200"   },
};

const STATUSES = ["all", "pending", "approved", "paid", "invite_sent"] as const;
const TYPES    = ["all", "individual", "business", "corporate"] as const;

const STATUS_LABELS: Record<string, string> = {
  all: "All Statuses", pending: "Pending", approved: "Approved",
  paid: "Paid", invite_sent: "Invite Sent",
};
const TYPE_LABEL_MAP: Record<string, string> = {
  all: "All Types", individual: "Individual", business: "Business", corporate: "Corporate",
};

export default function RegistrantsTable({ data }: { data: Registration[] }) {
  const [search, setSearch]         = useState("");
  const [statusFilter, setStatus]   = useState("all");
  const [typeFilter, setType]       = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [, startTransition]         = useTransition();
  const router                      = useRouter();

  const filtered = data.filter((r) => {
    const q = search.toLowerCase();
    return (
      (r.full_name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.organization.toLowerCase().includes(q)) &&
      (statusFilter === "all" || r.status === statusFilter) &&
      (typeFilter   === "all" || r.registration_type === typeFilter)
    );
  });

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
      {/* Filters */}
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

        <select
          value={statusFilter}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setType(e.target.value)}
          className="h-9 px-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:border-teal-500 transition-colors"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{TYPE_LABEL_MAP[t]}</option>
          ))}
        </select>

        <p className="text-xs text-gray-400 self-center sm:ml-auto">
          {filtered.length} / {data.length} registrants
        </p>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {["Applicant", "Organisation", "Type", "Applied", "Status", ""].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center text-gray-400 py-16 text-sm">
                  No registrants found.
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const typeStyle = TYPE_LABELS[r.registration_type] ?? { label: r.registration_type, color: "text-gray-600 bg-gray-100 border border-gray-200" };
                return (
                  <tr key={r.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors group">
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
                    <td className="px-4 py-3.5 text-gray-400 text-xs tabular-nums">
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
