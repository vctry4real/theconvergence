import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { supabaseAdmin } from "@/lib/supabase-admin";
import Logo from "@/components/Logo";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabaseAdmin
    .from("registrations")
    .select("full_name")
    .eq("id", id)
    .maybeSingle();

  return {
    title: data ? `${data.full_name} — The Convergence 2026` : "Ticket — The Convergence 2026",
    robots: { index: false, follow: false },
  };
}

const TICKET_CONFIG: Record<string, {
  label: string;
  price: string;
  accentBg: string;
  accentText: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
}> = {
  access: {
    label: "Access Ticket",
    price: "₦100,000",
    accentBg: "from-slate-800 to-slate-900",
    accentText: "text-slate-300",
    accentBorder: "border-slate-600",
    badgeBg: "bg-slate-700",
    badgeText: "text-slate-200",
    icon: "🎟️",
  },
  executive: {
    label: "Executive Ticket",
    price: "₦300,000",
    accentBg: "from-blue-900 to-slate-900",
    accentText: "text-blue-300",
    accentBorder: "border-blue-700",
    badgeBg: "bg-blue-800",
    badgeText: "text-blue-200",
    icon: "💼",
  },
  premier: {
    label: "Premier Ticket",
    price: "₦500,000",
    accentBg: "from-purple-900 to-slate-900",
    accentText: "text-purple-300",
    accentBorder: "border-purple-700",
    badgeBg: "bg-purple-800",
    badgeText: "text-purple-200",
    icon: "👑",
  },
};

const TYPE_LABELS: Record<string, string> = {
  individual: "Individual Professional",
  business:   "Business Owner",
  corporate:  "Corporate Team",
};

export default async function TicketPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data } = await supabaseAdmin
    .from("registrations")
    .select("id, full_name, email, phone, organization, ticket_type, registration_type, status, city_state")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();

  const shortId = data.id.replace(/-/g, "").slice(-8).toUpperCase();
  const ticket  = TICKET_CONFIG[data.ticket_type ?? ""] ?? TICKET_CONFIG["access"];
  const isPaid  = data.status === "paid" || data.status === "invite_sent";

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-4 sm:p-6">

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-teal-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-900/15 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-sm">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo variant="light" />
        </div>

        {/* ─── Main ticket card ─────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10">

          {/* Header */}
          <div className={`bg-gradient-to-br ${ticket.accentBg} px-6 pt-7 pb-6`}>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className={`text-[10px] font-bold tracking-[0.25em] uppercase mb-1.5 ${ticket.accentText}`}>
                  The Convergence 2026
                </p>
                <h1 className="text-white font-black text-xl sm:text-2xl leading-tight">
                  {data.full_name}
                </h1>
                <p className="text-white/50 text-sm mt-1">{data.organization}</p>
                {data.city_state && (
                  <p className="text-white/30 text-xs mt-0.5">{data.city_state}</p>
                )}
              </div>
              {/* Verification badge */}
              {isPaid ? (
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              ) : (
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Ticket tier pill */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold border ${ticket.badgeBg} ${ticket.badgeText} ${ticket.accentBorder}`}>
                <span>{ticket.icon}</span>
                {ticket.label}
              </span>
              <span className={`text-xs font-semibold ${ticket.accentText}`}>{ticket.price}</span>
            </div>
          </div>

          {/* Dashed perforation line */}
          <div className="bg-gray-900 flex items-center gap-0">
            <div className="w-5 h-5 rounded-full bg-gray-950 -ml-2.5 flex-shrink-0" />
            <div className="flex-1 border-t-2 border-dashed border-white/10" />
            <div className="w-5 h-5 rounded-full bg-gray-950 -mr-2.5 flex-shrink-0" />
          </div>

          {/* Body */}
          <div className="bg-gray-900 px-6 py-5 space-y-4">

            {/* ID + type row */}
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">ID Number</p>
                <p className="text-white font-black text-xl tracking-widest tabular-nums">{shortId}</p>
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">Category</p>
                <p className="text-white font-semibold text-sm">{TYPE_LABELS[data.registration_type] ?? data.registration_type}</p>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Date + venue */}
            <div className="flex gap-4">
              <div className="flex-1">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">Date</p>
                <p className="text-white font-semibold text-sm">18th April 2026</p>
                <p className="text-gray-400 text-xs">Saturday</p>
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">Venue</p>
                <p className="text-white font-semibold text-sm">Heritage House</p>
                <p className="text-gray-400 text-xs">Port Harcourt</p>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Contact */}
            <div>
              <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">Email</p>
              <p className="text-gray-300 text-sm">{data.email}</p>
            </div>

            <div className="border-t border-white/5" />

            {/* Status row */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-gray-500 mb-1">Status</p>
                {isPaid ? (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 text-xs font-bold border border-teal-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
                    Confirmed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-500/15 text-yellow-400 text-xs font-bold border border-yellow-500/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
                    {data.status.charAt(0).toUpperCase() + data.status.slice(1).replace("_", " ")}
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-[10px] font-mono">{shortId}</p>
            </div>
          </div>

          {/* Footer band */}
          <div className="bg-gray-950 border-t border-white/5 px-6 py-4 text-center">
            <p className="text-gray-600 text-[10px] tracking-[0.2em] uppercase">
              Faith · Business · Leadership
            </p>
          </div>
        </div>

        {/* Help text */}
        <p className="text-center text-gray-600 text-xs mt-6 leading-relaxed">
          Present this page at the venue entrance.
          <br />
          <a href="mailto:Info@theconvergencephc.com" className="text-gray-500 hover:text-teal-400 transition-colors">
            Info@theconvergencephc.com
          </a>
        </p>
      </div>
    </div>
  );
}
