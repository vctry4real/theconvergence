import type { RegistrationStatus } from "@/lib/validations";

const config: Record<RegistrationStatus, { label: string; dot: string; className: string }> = {
  pending:     { label: "Pending",     dot: "bg-yellow-400", className: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  approved:    { label: "Approved",    dot: "bg-blue-400",   className: "bg-blue-50   text-blue-700   border border-blue-200"   },
  paid:        { label: "Paid",        dot: "bg-green-400",  className: "bg-green-50  text-green-700  border border-green-200"  },
  invite_sent: { label: "Invite Sent", dot: "bg-teal-400",   className: "bg-teal-50   text-teal-700   border border-teal-200"   },
};

export default function StatusBadge({ status }: { status: RegistrationStatus }) {
  const c = config[status] ?? config.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${c.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
