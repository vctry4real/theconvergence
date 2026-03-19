import { notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabase-admin";
import StatusBadge from "@/components/dashboard/StatusBadge";
import StatusUpdater from "@/components/dashboard/StatusUpdater";
import type { RegistrationStatus } from "@/lib/validations";

export const dynamic = "force-dynamic";

type Staff = { name: string; job_title: string; department: string; email: string };

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-2 gap-4 py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-sm text-gray-800 font-medium">{value}</span>
    </div>
  );
}

export default async function RegistrantDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await supabaseAdmin
    .from("registrations")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const TYPE_LABELS: Record<string, string> = {
    individual: "Individual Professional",
    business: "Business Owner / Entrepreneur",
    corporate: "Corporate Team",
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back + header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            ← Back to Registrants
          </Link>
          <h1 className="text-2xl font-black text-gray-900 mt-2">{data.full_name}</h1>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-sm text-gray-400">{data.email}</span>
            <span className="text-gray-200">·</span>
            <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
              {TYPE_LABELS[data.registration_type] ?? data.registration_type}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={data.status as RegistrationStatus} />
          <StatusUpdater id={data.id} currentStatus={data.status as RegistrationStatus} />
        </div>
      </div>

      {/* Basic info */}
      <Section title="Basic Information">
        <Field label="Full Name" value={data.full_name} />
        <Field label="Email" value={data.email} />
        <Field label="Phone" value={data.phone} />
        <Field label="City / State" value={data.city_state} />
        <Field label="Organisation" value={data.organization} />
        <Field label="Industry" value={data.industry === "Other" ? `Other — ${data.industry_other}` : data.industry} />
        <Field label="LinkedIn" value={data.linkedin} />
        <Field label="Applied On" value={new Date(data.created_at).toLocaleString("en-GB")} />
      </Section>

      {/* Individual */}
      {data.registration_type === "individual" && (
        <Section title="Individual Professional">
          <Field label="Job Title" value={data.job_title} />
          <Field label="Department" value={data.department} />
          <Field label="Years of Experience" value={data.years_experience} />
          <Field label="Career Level" value={data.career_level} />
          <Field label="Salary Bracket" value={data.salary_bracket} />
          <Field label="Scaling Challenge" value={data.career_challenge} />
          <Field label="Goals from Convergence" value={data.individual_convergence_goal} />
        </Section>
      )}

      {/* Business */}
      {data.registration_type === "business" && (
        <Section title="Business Owner">
          <Field label="Business Name" value={data.business_name} />
          <Field label="Business Stage" value={data.business_stage} />
          <Field label="Employee Count" value={data.employee_count} />
          <Field label="Annual Revenue" value={data.annual_revenue} />
          <Field label="Primary Market" value={data.primary_market} />
          <Field label="Scaling Challenge" value={data.scaling_challenge} />
          <Field label="Goals from Convergence" value={data.business_convergence_goal} />
        </Section>
      )}

      {/* Corporate */}
      {data.registration_type === "corporate" && (
        <Section title="Corporate Team">
          <Field label="Company Size" value={data.company_size ? `${data.company_size} employees` : null} />
          <Field label="Annual Revenue" value={data.corporate_revenue} />
          <Field label="Number of Staff" value={data.staff_count} />
          <Field label="Why Attending" value={data.corporate_reason} />
          {data.staff_list && Array.isArray(data.staff_list) && data.staff_list.length > 0 && (
            <div className="pt-2">
              <p className="text-sm text-gray-400 mb-3">Staff Members</p>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Name", "Job Title", "Department", "Email"].map((h) => (
                        <th key={h} className="text-left px-4 py-2 text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(data.staff_list as Staff[]).map((s, i) => (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="px-4 py-2 font-medium text-gray-800">{s.name}</td>
                        <td className="px-4 py-2 text-gray-500">{s.job_title}</td>
                        <td className="px-4 py-2 text-gray-500">{s.department}</td>
                        <td className="px-4 py-2 text-gray-500">{s.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Section>
      )}

      {/* Screening */}
      <Section title="Strategic Screening">
        <Field label="Current Focus" value={data.current_focus} />
        <Field label="Attended Conference (2 yrs)" value={data.attended_conference} />
        <Field label="Decision Authority" value={data.decision_authority} />
      </Section>

      {/* Commitment */}
      <Section title="Commitment & Source">
        <Field label="Willing to Network" value={data.willing_to_network} />
        <Field label="Heard From" value={data.heard_from} />
      </Section>
    </div>
  );
}
