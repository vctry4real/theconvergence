import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-white flex items-center overflow-hidden pt-16">
      {/* Background geometric shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-700 rounded-full opacity-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-20 right-16 w-48 h-48 border-4 border-teal-500 rounded-full opacity-30" />
      <div className="absolute top-1/3 right-10 w-24 h-24 bg-teal-500 opacity-20 rotate-45" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-700 opacity-5 -translate-x-1/4 translate-y-1/4 rounded-full" />

      <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left content */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 text-sm px-4 py-1.5 rounded-full font-medium">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
            Saturday, 18th April 2026 · 8AM Prompt
          </div>

          <div>
            <p className="text-blue-600 font-semibold text-lg mb-2 tracking-wide">The</p>
            <h1 className="text-7xl lg:text-8xl font-black text-blue-700 leading-none tracking-tight">
              Conver<span className="text-teal-500">g</span>ence
            </h1>
            <div className="inline-block bg-blue-700 text-white text-2xl font-bold px-4 py-1 mt-2">
              2026
            </div>
          </div>

          <p className="text-gray-600 text-xl leading-relaxed max-w-lg">
            Positioning for Prosperity — 2026 and Beyond.
          </p>

          <div className="flex items-center gap-3 text-gray-500 text-sm">
            <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Heritage House, Plot F/23 Sani Abacha Road, GRA Phase III, Port Harcourt</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button size="lg" className="bg-blue-700 hover:bg-blue-800 text-white text-base px-8 py-6 w-full sm:w-auto">
                Apply to Attend
              </Button>
            </Link>
            <a href="#about">
              <Button size="lg" variant="outline" className="border-blue-700 text-blue-700 hover:bg-blue-50 text-base px-8 py-6 w-full sm:w-auto">
                Learn More
              </Button>
            </a>
          </div>
        </div>

        {/* Right — event detail card */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-700 rounded-3xl translate-x-3 translate-y-3 opacity-10" />
          <div className="relative bg-gradient-to-br from-blue-700 to-blue-900 rounded-3xl p-10 text-white space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Date</p>
                <p className="text-white font-bold text-lg">Saturday, 18th April 2026</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Time</p>
                <p className="text-white font-bold text-lg">8:00 AM Prompt</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                <svg className="w-8 h-8 text-teal-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-blue-200 text-sm">Venue</p>
                <p className="text-white font-bold text-lg">Heritage House</p>
                <p className="text-blue-200 text-sm">Port Harcourt</p>
              </div>
            </div>

            <div className="border-t border-white/20 pt-6">
              <p className="text-blue-200 text-sm mb-1">Admission</p>
              <p className="text-teal-300 font-semibold">Screened · By Application Only</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
