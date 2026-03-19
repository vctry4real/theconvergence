"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { RegistrationStatus } from "@/lib/validations";

export default function StatusUpdater({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: RegistrationStatus;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [saving, setSaving] = useState(false);
  const [, startTransition] = useTransition();
  const router = useRouter();

  const handleChange = async (newStatus: string | null) => {
    if (!newStatus) return;
    setSaving(true);
    setStatus(newStatus as RegistrationStatus);
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
    <Select value={status} onValueChange={handleChange} disabled={saving}>
      <SelectTrigger className="w-40 h-9 text-sm border-gray-200">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="approved">Approved</SelectItem>
        <SelectItem value="paid">Paid</SelectItem>
        <SelectItem value="invite_sent">Invite Sent</SelectItem>
      </SelectContent>
    </Select>
  );
}
