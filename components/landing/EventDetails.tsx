import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function EventDetails() {
  return (
    <section id="details" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-blue-600 font-semibold text-sm tracking-widest uppercase mb-3">Event Details</p>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            Mark Your Calendar
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-2">Date</p>
            <p className="text-gray-900 font-bold text-xl">Saturday</p>
            <p className="text-blue-700 font-black text-3xl">18th April</p>
            <p className="text-gray-500 font-semibold text-lg">2026</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-2">Time</p>
            <p className="text-teal-600 font-black text-3xl">8:00 AM</p>
            <p className="text-gray-500 font-semibold text-lg">Prompt</p>
            <p className="text-gray-400 text-sm mt-1">Doors open at 7:30 AM</p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-50 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-5">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm mb-2">Venue</p>
            <p className="text-gray-900 font-bold text-xl">Heritage House</p>
            <p className="text-gray-500 text-sm mt-1">Plot F/23 Sani Abacha Road</p>
            <p className="text-gray-500 text-sm">GRA Phase III, Port Harcourt</p>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="relative bg-blue-700 rounded-3xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-400 opacity-10 rounded-full -translate-x-1/4 translate-y-1/4" />
          <div className="relative px-10 py-14 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-teal-300 font-semibold text-sm tracking-widest uppercase mb-2">Screened Admission</p>
              <h3 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                Ready to Position Yourself <br className="hidden lg:block" /> for Prosperity?
              </h3>
              <p className="text-blue-200 mt-3 max-w-lg">
                Applications are reviewed within 48 hours. Selected participants will receive confirmation and payment details.
              </p>
            </div>
            <Link href="/register" className="shrink-0">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-bold text-base px-10 py-6">
                Apply to Attend
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
