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
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 className="text-xs font-bold tracking-[0.15em] uppercase text-gray-500">{title}</h2>
      </div>
      <div className="divide-y divide-gray-50">{children}</div>
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="flex items-start justify-between gap-6 px-6 py-3.5">
      <span className="text-sm text-gray-400 shrink-0 w-44">{label}</span>
      <span className="text-sm text-gray-800 font-medium text-right">{value}</span>
    </div>
  );
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  individual: { label: "Individual Professional", color: "text-purple-700 bg-purple-50 border border-purple-200" },
  business:   { label: "Business Owner",          color: "text-orange-700 bg-orange-50 border border-orange-200" },
  corporate:  { label: "Corporate Team",          color: "text-blue-700   bg-blue-50   border border-blue-200"   },
};

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
    .maybeSingle();

  if (error) {
    console.error("Registrant fetch error:", error);
    throw new Error(`Failed to load registrant: ${error.message}`);
  }

  if (!data) notFound();

  const typeStyle = TYPE_LABELS[data.registration_type] ?? {
    label: data.registration_type,
    color: "text-gray-600 bg-gray-100 border border-gray-200",
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Back */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-teal-600 transition-colors"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Registrants
      </Link>

      {/* Header card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeStyle.color}`}>
                {typeStyle.label}
              </span>
              <StatusBadge status={data.status as RegistrationStatus} />
            </div>
            <h1 className="text-2xl font-black text-gray-900">{data.full_name}</h1>
            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
              <span className="text-sm text-gray-500">{data.email}</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">{data.phone}</span>
              <span className="text-gray-300">·</span>
              <span className="text-sm text-gray-500">{data.organization}</span>
            </div>
          </div>
          <div className="shrink-0">
            <p className="text-xs text-gray-400 mb-2">Update Status</p>
            <StatusUpdater id={data.id} currentStatus={data.status as RegistrationStatus} />
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-5 pt-5 border-t border-gray-100 flex flex-wrap gap-6">
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Applied</p>
            <p className="text-sm text-gray-700 font-medium">
              {new Date(data.created_at).toLocaleString("en-GB", {
                day: "numeric", month: "long", year: "numeric",
                hour: "2-digit", minute: "2-digit",
              })}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">City / State</p>
            <p className="text-sm text-gray-700 font-medium">{data.city_state}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-0.5">Industry</p>
            <p className="text-sm text-gray-700 font-medium">
              {data.industry === "Other" ? `Other — ${data.industry_other}` : data.industry}
            </p>
          </div>
          {data.linkedin && (
            <div>
              <p className="text-xs text-gray-400 mb-0.5">LinkedIn</p>
              <a
                href={data.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors"
              >
                View Profile →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Individual */}
      {data.registration_type === "individual" && (
        <Section title="Individual Professional">
          <Field label="Job Title"              value={data.job_title} />
          <Field label="Department"             value={data.department} />
          <Field label="Years of Experience"    value={data.years_experience} />
          <Field label="Career Level"           value={data.career_level} />
          <Field label="Salary Bracket"         value={data.salary_bracket} />
          <Field label="Career Challenge"       value={data.career_challenge} />
          <Field label="Goals from Convergence" value={data.individual_convergence_goal} />
        </Section>
      )}

      {/* Business */}
      {data.registration_type === "business" && (
        <Section title="Business Owner">
          <Field label="Business Name"          value={data.business_name} />
          <Field label="Business Stage"         value={data.business_stage} />
          <Field label="Employee Count"         value={data.employee_count} />
          <Field label="Annual Revenue"         value={data.annual_revenue} />
          <Field label="Primary Market"         value={data.primary_market} />
          <Field label="Scaling Challenge"      value={data.scaling_challenge} />
          <Field label="Goals from Convergence" value={data.business_convergence_goal} />
        </Section>
      )}

      {/* Corporate */}
      {data.registration_type === "corporate" && (
        <Section title="Corporate Team">
          <Field label="Company Size"    value={data.company_size ? `${data.company_size} employees` : null} />
          <Field label="Annual Revenue"  value={data.corporate_revenue} />
          <Field label="Number of Staff" value={data.staff_count} />
          <Field label="Why Attending"   value={data.corporate_reason} />
          {data.staff_list && Array.isArray(data.staff_list) && data.staff_list.length > 0 && (
            <div className="px-6 py-4">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Staff Members</p>
              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      {["Name", "Job Title", "Department", "Email"].map((h) => (
                        <th key={h} className="text-left px-4 py-2.5 text-xs font-semibold text-gray-500">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(data.staff_list as Staff[]).map((s, i) => (
                      <tr key={i} className="border-t border-gray-50">
                        <td className="px-4 py-2.5 font-medium text-gray-800">{s.name}</td>
                        <td className="px-4 py-2.5 text-gray-500">{s.job_title}</td>
                        <td className="px-4 py-2.5 text-gray-500">{s.department}</td>
                        <td className="px-4 py-2.5 text-gray-500">{s.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </Section>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <Section title="Strategic Screening">
          <Field label="Current Focus"       value={data.current_focus} />
          <Field label="Attended Conference" value={data.attended_conference} />
          <Field label="Decision Authority"  value={data.decision_authority} />
        </Section>

        <Section title="Commitment & Source">
          <Field label="Willing to Network" value={data.willing_to_network} />
          <Field label="Heard From"         value={data.heard_from} />
        </Section>
      </div>
    </div>
  );
}
