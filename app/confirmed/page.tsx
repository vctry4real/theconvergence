import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Registration Confirmed — The Convergence 2026",
  description: "Your registration for The Convergence 2026 is confirmed.",
  robots: { index: false, follow: false },
};

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo variant="light" />
          <span className="text-xs text-gray-600 hidden sm:block">April 18, 2026 · Port Harcourt</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-xl w-full">

          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <svg className="w-9 h-9 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-full bg-teal-500/10 blur-xl -z-10" />
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Payment Received
            </p>
            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
              Registration Confirmation
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              Thank you for completing your registration for{" "}
              <span className="text-white font-semibold">The Convergence 2026</span>.
            </p>
          </div>

          {/* Info card */}
          <div className="bg-gray-900 border border-white/5 rounded-2xl p-6 sm:p-8 mb-6 space-y-5">
            {/* QR / ID notice */}
            <div className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8V5a2 2 0 012-2h3M3 16v3a2 2 0 002 2h3m10-18h3a2 2 0 012 2v3m0 8v3a2 2 0 01-2 2h-3
                       M8 8h.01M12 8h.01M16 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h.01M12 16h.01M16 16h.01" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Your access credentials are on their way</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A confirmation email containing your unique <span className="text-white font-medium">QR Code</span> and{" "}
                  <span className="text-white font-medium">Identification Number (ID No.)</span> will be sent to your
                  registered email address. These will serve as your official access credentials for the event.
                </p>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Spam notice */}
            <div className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Check your inbox (and spam folder)</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Kindly ensure you check your email — including your{" "}
                  <span className="text-white font-medium">spam / junk folder</span> — shortly. You will be required
                  to present your QR Code and/or ID Number for entry at the venue.
                </p>
              </div>
            </div>

            <div className="border-t border-white/5" />

            {/* Contact */}
            <div className="flex gap-4">
              <div className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
                <svg className="w-4.5 h-4.5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536
                       M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm mb-1">Need help?</p>
                <p className="text-gray-400 text-sm">
                  Reach us at{" "}
                  <a
                    href="mailto:Info@theconvergencephc.com"
                    className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
                  >
                    Info@theconvergencephc.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <Link
            href="/"
            className="flex items-center justify-center w-full h-11 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Back to Home
          </Link>

          <p className="text-center text-gray-700 text-xs mt-8">
            The Convergence 2026 · Saturday, 18th April · Heritage House, Port Harcourt
          </p>
        </div>
      </div>
    </div>
  );
}
