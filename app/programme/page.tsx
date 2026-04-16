"use client";

import Link from "next/link";
import { Download, Clock, Music, Users, Mic2 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";

// ── Types ────────────────────────────────────────────────────────────────────

type SessionType = "session" | "interlude" | "networking" | "special";

interface Session {
  time: string;
  title: string;
  subtitle?: string;
  speaker?: string;
  detail?: string;
  type?: SessionType;
  concurrent?: boolean;
}

interface Block {
  section: string;
  label: string;
  accentColor: "teal" | "blue" | "gold";
  sessions: Session[];
}

// ── Programme Data ────────────────────────────────────────────────────────────

const programme: Block[] = [
  {
    section: "Morning — Arrival & Registration",
    label: "08:00 – 09:50 AM",
    accentColor: "teal",
    sessions: [
      {
        time: "8:00 – 9:00 AM",
        title: "Registration & Executive Networking Breakfast",
        subtitle:
          "Colour-coded tags · Professional headshots · Fireside booth interviews",
        detail:
          "Light breakfast · Background jazz/saxophone · Networking prompt cards on tables",
        type: "networking",
      },
      {
        time: "9:00 – 9:30 AM",
        title: "Opening Ceremony",
        subtitle:
          "Compere's Welcome & Introduction of Speakers and Special Invitees",
        detail:
          "Convener's pre-recorded video · Rundown of events · Modalities for deal room/business funding participation · Collaboration prompts · Port Harcourt story picture art exhibition tour",
        type: "special",
      },
      {
        time: "9:30 – 9:50 AM",
        title: "Convener's Address",
        subtitle:
          "Break the Middle Barrier: Professionals and Business Leaders Ready for the Next Level",
        speaker: "Pastor Lanre Oluseye",
        type: "session",
      },
    ],
  },
  {
    section: "Morning Sessions — Business, Career Insight & Leadership",
    label: "09:50 AM – 12:50 PM",
    accentColor: "blue",
    sessions: [
      {
        time: "9:50 – 10:30 AM",
        title:
          "Keynote 1: Operating at Scale – Decisions That Sustain Performance",
        subtitle:
          "How World-Class Operators Build Resilient, High-Performance Systems in Uncertainty",
        speaker: "Leye Falade · MD, NLNG",
        detail: "40-min presentation",
        type: "session",
      },
      {
        time: "10:30 – 11:30 AM",
        title:
          "Keynote 2: Strategy to Unlock the Next Level of Business Expansion",
        subtitle:
          "Expand Your Influence, Access New Markets, and Build at Scale",
        speaker: "Gbite Falade · MD/CEO, Aradel Holdings Plc",
        detail:
          "40-min presentation + 20-min combined fireside exchange (Keynotes 1 & 2)",
        type: "session",
      },
      {
        time: "11:30 – 11:45 AM",
        title: "Reflections & Musical Interlude",
        speaker: "Timi Dakolo",
        type: "interlude",
      },
      {
        time: "11:45 AM – 12:40 PM",
        title: "Keynote 3: Financial Insight – Capital, Policy & Power",
        subtitle:
          "The Financial Levers: Smart Positioning for Advantage in Unstable Economies",
        speaker: "Kemi Adeosun · Former Minister of Finance, Nigeria",
        detail: "40-min presentation + 15-min fireside exchange",
        type: "session",
      },
      {
        time: "12:40 – 12:50 PM",
        title: "MG VowGas Group Presentation",
        subtitle:
          "Vendor Registration & Employment Offer for Engineering First Class Graduates",
        speaker:
          "Engr. Chidiebere Okorie · GM Projects & Infrastructure, MG VowGas",
        detail: "10-min presentation",
        type: "special",
      },
      {
        time: "12:50 – 1:00 PM",
        title: "Deal Room Offering: Euro Exim Bank Financial Instruments",
        subtitle:
          "Access $500,000 to $2,000,000,000 in Funding for Your Business",
        speaker: "Micheal Adesina · Sales Consultant, Euro Exim Bank",
        detail: "10-min presentation & Q/A",
        type: "special",
      },
    ],
  },
  {
    section: "Midday — Networking Lunch & Deal Room Pitch",
    label: "1:00 – 1:50 PM",
    accentColor: "teal",
    sessions: [
      {
        time: "1:00 – 1:50 PM",
        title: "Networking Lunch",
        subtitle:
          "Structured table conversations · Deal introductions · Industry peer connections",
        detail: "Networking prompt cards · Background Music",
        type: "networking",
      },
      {
        time: "1:00 – 1:50 PM",
        title: "Exhibition Walk Through",
        subtitle: "Tell the Port Harcourt Story – Picture Art Exhibition Tour",
        detail: "Exhibitor interactions · Photography · Refreshments",
        type: "networking",
        concurrent: true,
      },
      {
        time: "1:20 – 1:50 PM",
        title: "Deal Room – Pitch & Opportunity Exchange",
        subtitle: "5 curated themes · 2-min pitch & 3-min Q&A per presenter",
        detail:
          "Businesses seeking capital · Strategic partnerships · Market expansion opportunities · Audience interest captured via QR form",
        type: "special",
        concurrent: true,
      },
    ],
  },
  {
    section: "Afternoon Sessions — Financial Strategy, Panel & Deals",
    label: "1:50 – 4:20 PM",
    accentColor: "blue",
    sessions: [
      {
        time: "1:50 – 2:30 PM",
        title: 'Keynote 4: "The Plateau Problem"',
        subtitle:
          "What Global Trends in Business Growth & Career Progression is Exposing",
        speaker: "Tope Aladenusi · Deloitte Africa",
        detail:
          "40-min presentation — Understanding the Operating Model Shift Required for Scale",
        type: "session",
      },
      {
        time: "2:30 – 3:30 PM",
        title: "Keynote 5: Deals, Partnerships and Value Creation",
        subtitle:
          "How Smart Businesses & Careers Scale Through Strategic Alliances",
        speaker: "Segun Zaccheaus · Chief Economist",
        detail:
          "40-min presentation + 20-min combined fireside exchange (Keynotes 3 & 4)",
        type: "session",
      },
      {
        time: "3:30 – 3:40 PM",
        title: "Musical Interlude",
        speaker: "Timi Dakolo",
        type: "interlude",
      },
      {
        time: "3:40 – 4:20 PM",
        title:
          "Panel Discussion: The Growth Gap – Why Promising Businesses & Careers Plateau After the Early Years",
        subtitle:
          "The Real Accelerators Across Sectors, Businesses and Experience Levels",
        speaker: "Viola Graham Douglas · Obi Imemba · Olakunle Soriyan",
        detail: "40-min discussion with live audience Q&A via Menti",
        type: "session",
      },
      {
        time: "3:40 – 4:20 PM",
        title: "Deal Room Networking – Private Tables",
        subtitle: "Investors & Partners Meet — 10-minute rotations",
        speaker:
          "Perez Araka (Chairman, Premium Trust Bank) · Senthil Kumar (Euro Exim Bank) · Kate Festus-Abibo (VP, FCMB Limited)",
        detail:
          "Pre-assigned table format · Investors · Business Owners · Strategic Partners",
        type: "special",
        concurrent: true,
      },
    ],
  },
  {
    section: "Closing — Commitments, Vision & Reception",
    label: "4:20 – 6:00 PM",
    accentColor: "gold",
    sessions: [
      {
        time: "4:20 – 4:30 PM",
        title: "Closing Keynote & Call to Action: From Success to Significance",
        subtitle:
          "Recap – What does it mean to break the middle and rise to significance?",
        speaker: "Pastor Lanre Oluseye · Convener",
        detail: "Commitments · Follow-up pathways · Convergence community",
        type: "session",
      },
      {
        time: "5:00 – 6:00 PM",
        title: "Executive Networking Reception (Optional)",
        subtitle: "Networking · Live music · Curated drinks",
        detail: "Deeper conversations · Partnership follow-ups · Photography",
        type: "networking",
      },
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const accentClasses = {
  teal: {
    line: "bg-teal-500",
    label: "text-teal-600",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
    dot: "bg-teal-500",
    sectionBorder: "border-teal-200",
    interludeBg: "bg-teal-50 border-teal-100",
  },
  blue: {
    line: "bg-blue-500",
    label: "text-blue-600",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    dot: "bg-blue-500",
    sectionBorder: "border-blue-200",
    interludeBg: "bg-blue-50 border-blue-100",
  },
  gold: {
    line: "bg-amber-500",
    label: "text-amber-600",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
    dot: "bg-amber-500",
    sectionBorder: "border-amber-200",
    interludeBg: "bg-amber-50 border-amber-100",
  },
};

function SessionCard({
  session,
  accent,
}: {
  session: Session;
  accent: keyof typeof accentClasses;
}) {
  const ac = accentClasses[accent];

  if (session.type === "interlude") {
    return (
      <div className={`flex items-center gap-4 py-3 px-5 rounded-xl border ${ac.interludeBg}`}>
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ac.dot}`} />
        <Music className="w-3.5 h-3.5 text-gray-400 shrink-0" />
        <span className="text-gray-400 text-xs font-semibold tracking-widest uppercase">
          {session.time}
        </span>
        <span className="w-px h-4 bg-gray-200 shrink-0" />
        <span className="text-gray-600 text-sm font-medium">
          {session.title}
        </span>
        {session.speaker && (
          <>
            <span className="w-px h-4 bg-gray-200 shrink-0 hidden sm:block" />
            <span className={`text-xs font-semibold hidden sm:block ${ac.label}`}>
              {session.speaker}
            </span>
          </>
        )}
      </div>
    );
  }

  const isKeynote = session.title.toLowerCase().startsWith("keynote");
  const isDealOrSpecial = session.type === "special";
  const isNetworking = session.type === "networking";

  return (
    <div
      className={`group rounded-2xl border transition-all duration-200 overflow-hidden ${
        isKeynote
          ? "bg-white border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300"
          : isDealOrSpecial
            ? "bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200"
            : "bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200"
      }`}
    >
      {/* Top accent line on keynotes */}
      {isKeynote && <div className={`h-0.5 w-full ${ac.line}`} />}

      <div className="p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Time badge */}
          <div
            className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold tracking-wide ${ac.badge}`}
          >
            <Clock className="w-3 h-3 opacity-70" />
            <span>{session.time}</span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {session.concurrent && (
              <span className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-1.5">
                Concurrent
              </span>
            )}
            <h3
              className={`font-bold leading-snug mb-1 ${
                isKeynote
                  ? "text-gray-900 text-base sm:text-lg"
                  : "text-gray-800 text-sm sm:text-base"
              }`}
            >
              {session.title}
            </h3>

            {session.subtitle && (
              <p className="text-sm mb-3 leading-relaxed text-gray-500 italic">
                {session.subtitle}
              </p>
            )}

            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {session.speaker && (
                <div className="flex items-center gap-1.5">
                  <Mic2 className={`w-3 h-3 shrink-0 ${ac.label}`} />
                  <span className={`text-xs font-semibold ${ac.label}`}>
                    {session.speaker}
                  </span>
                </div>
              )}
              {isNetworking && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-3 h-3 shrink-0 text-gray-400" />
                  <span className="text-xs text-gray-400 font-medium">
                    Open networking
                  </span>
                </div>
              )}
            </div>

            {session.detail && (
              <p className="mt-2.5 text-xs text-gray-400 leading-relaxed">
                {session.detail}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Programme() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Hero ── */}
        <section className="relative bg-gray-950 pt-32 pb-16 sm:pt-40 sm:pb-20 overflow-hidden">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          {/* Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-600 rounded-full opacity-20 blur-3xl pointer-events-none" />
          <div className="absolute -top-20 right-0 w-80 h-80 bg-blue-600 rounded-full opacity-15 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
              {/* Left */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-8 h-px bg-teal-400" />
                  <p className="text-teal-400 font-bold text-xs tracking-[0.3em] uppercase">
                    Saturday, 18th April 2026
                  </p>
                </div>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-none tracking-tight mb-4">
                  Conference
                  <br />
                  <span className="text-teal-400">Programme</span>
                </h1>
                <p className="text-white/50 text-base sm:text-lg max-w-lg leading-relaxed mt-4">
                  House on the Rock, GRA Phase III, Port Harcourt · Rivers
                  State, Nigeria. All times are approximate and subject to minor
                  adjustments.
                </p>
              </div>

              {/* Download card */}
              <div className="shrink-0">
                <div className="bg-white/6 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-sm max-w-xs w-full">
                  <p className="text-white/40 text-xs tracking-widest uppercase font-bold mb-1">
                    Full Programme
                  </p>
                  <p className="text-white font-black text-xl mb-1">
                    Download PDF
                  </p>
                  <p className="text-white/40 text-xs leading-relaxed mb-5">
                    Save the programme to your device for offline reference.
                  </p>
                  <a
                    href="/assets/CONVERGENCE_2026_Programme_Final.pdf"
                    download="CONVERGENCE_2026_Programme.pdf"
                    className="block"
                  >
                    <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-wide uppercase text-sm py-5 gap-2">
                      <Download className="w-4 h-4" />
                      Download Programme
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Schedule ── */}
        <section className="bg-white pt-14 sm:pt-20 pb-24 sm:pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-14 sm:space-y-20">
            {programme.map((block) => {
              const ac = accentClasses[block.accentColor];
              return (
                <div key={block.section}>
                  {/* Section header */}
                  <div
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-7 border-b ${ac.sectionBorder}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-1 h-8 rounded-full shrink-0 ${ac.line}`}
                      />
                      <div>
                        <p
                          className={`text-[10px] font-bold tracking-[0.3em] uppercase mb-0.5 ${ac.label}`}
                        >
                          {block.label}
                        </p>
                        <h2 className="text-gray-900 font-black text-lg sm:text-2xl leading-tight">
                          {block.section}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Sessions */}
                  <div className="space-y-3">
                    {block.sessions.map((session, i) => (
                      <SessionCard
                        key={i}
                        session={session}
                        accent={block.accentColor}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-gray-50 border-t border-gray-200 py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-gray-900 font-black text-2xl sm:text-3xl mb-1">
                Ready to attend?
              </p>
              <p className="text-gray-500 text-sm">
                Secure your place at The Convergence 2026.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/assets/CONVERGENCE_2026_Programme_Final.pdf"
                download="CONVERGENCE_2026_Programme.pdf"
              >
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Programme
                </Button>
              </a>
              <Link href="/register">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-wide uppercase text-sm px-7 py-5">
                  Register Now
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
