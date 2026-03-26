import Link from "next/link";
import { Button } from "@/components/ui/button";

const details = [
  {
    label: "Date",
    primary: "18th April",
    secondary: "Saturday, 2026",
    sub: null,
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    label: "Time",
    primary: "8:00 AM",
    secondary: "Prompt",
    sub: "Doors open 7:30 AM",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Venue",
    primary: "House on the Rock",
    secondary: "GRA Phase III, Port Harcourt",
    sub: "Plot F/23 Sani Abacha Road",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export default function EventDetails() {
  return (
    <section id="details" className="py-16 sm:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-px bg-blue-600" />
              <p className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase">
                Event Details
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
              Mark Your
              <br />
              <span className="text-blue-600">Calendar.</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs leading-relaxed lg:text-right text-sm">
            One day. One room. The decisions you make here will define the next
            decade.
          </p>
        </div>

        {/* Detail cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {details.map((d) => (
            <div
              key={d.label}
              className="group flex items-start gap-4 sm:gap-5 bg-white border border-gray-100 rounded-2xl p-5 sm:p-7 hover:border-blue-200 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {d.icon}
              </div>
              <div>
                <p className="text-xs font-bold tracking-[0.2em] uppercase text-gray-400 mb-1">
                  {d.label}
                </p>
                <p className="text-gray-900 font-black text-xl sm:text-2xl leading-none">
                  {d.primary}
                </p>
                <p className="text-blue-600 font-semibold text-sm mt-1">
                  {d.secondary}
                </p>
                {d.sub && (
                  <p className="text-gray-400 text-xs mt-0.5">{d.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-900">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-teal-600 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-blue-600 rounded-full opacity-25 blur-3xl" />

          <div className="relative z-10 px-6 py-10 sm:px-10 sm:py-14 lg:px-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 sm:gap-8">
            <div>
              <span className="inline-block text-[10px] font-bold tracking-[0.25em] uppercase text-blue-400 bg-blue-400/10 border border-blue-400/20 px-3 py-1 rounded-full mb-3 sm:mb-4">
                Screened Admission
              </span>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight mb-2 sm:mb-3">
                Driving Sustainable Growth, Long-Term Impact,{" "}
                <br className="hidden sm:block" /> and Scalable Success
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-lg">
                Applications are reviewed within 48 hours. Selected participants
                will receive confirmation and payment details by email.
              </p>
            </div>

            <div className="shrink-0 flex flex-col items-start lg:items-end gap-3 w-full sm:w-auto">
              <Link href="/register" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-bold text-base px-8 sm:px-10 py-5 sm:py-6 rounded-xl"
                >
                  Apply to Attend
                </Button>
              </Link>
              <p className="text-gray-600 text-xs">
                Saturday, 18th April 2026 · Port Harcourt
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
