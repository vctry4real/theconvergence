"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { RegistrationStatus } from "@/lib/validations";

const STATUSES: { value: RegistrationStatus; label: string }[] = [
  { value: "pending",     label: "Pending"     },
  { value: "approved",    label: "Approved"    },
  { value: "paid",        label: "Paid"        },
  { value: "invite_sent", label: "Invite Sent" },
];

export default function StatusUpdater({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: RegistrationStatus;
}) {
  const [status, setStatus]   = useState(currentStatus);
  const [saving, setSaving]   = useState(false);
  const [, startTransition]   = useTransition();
  const router                = useRouter();

  const handleChange = async (newStatus: RegistrationStatus) => {
    setSaving(true);
    setStatus(newStatus);
    try {
      await fetch(`/api/registrations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      startTransition(() => router.refresh());
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative">
      <select
        value={status}
        onChange={(e) => handleChange(e.target.value as RegistrationStatus)}
        disabled={saving}
        className={`appearance-none cursor-pointer pl-3 pr-8 py-2 rounded-xl text-xs font-semibold border bg-white text-gray-700 border-gray-200 hover:border-teal-400 focus:outline-none focus:border-teal-500 transition-colors ${saving ? "opacity-50" : ""}`}
      >
        {STATUSES.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <svg className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
}
