import { Badge } from "@/components/ui/badge";
import type { RegistrationStatus } from "@/lib/validations";

const config: Record<RegistrationStatus, { label: string; className: string }> = {
  pending:     { label: "Pending",     className: "bg-gray-100 text-gray-600 hover:bg-gray-100" },
  approved:    { label: "Approved",    className: "bg-blue-100 text-blue-700 hover:bg-blue-100" },
  paid:        { label: "Paid",        className: "bg-green-100 text-green-700 hover:bg-green-100" },
  invite_sent: { label: "Invite Sent", className: "bg-teal-100 text-teal-700 hover:bg-teal-100" },
};

export default function StatusBadge({ status }: { status: RegistrationStatus }) {
  const { label, className } = config[status] ?? config.pending;
  return (
    <Badge className={`text-xs font-semibold border-0 ${className}`}>
      {label}
    </Badge>
  );
}
