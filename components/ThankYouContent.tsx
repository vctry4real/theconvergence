"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PAYMENT_URL = "https://selar.com/77n5328h53";
const COUNTDOWN_SECONDS = 10;

const STEPS = [
  {
    number: "01",
    title: "Application Review",
    body: "Our team will carefully review your application against our screening criteria.",
  },
  {
    number: "02",
    title: "Confirmation Email",
    body: "If selected, you'll receive a confirmation email within 48 hours.",
  },
  {
    number: "03",
    title: "Secure Your Spot",
    body: "Payment details will be in your confirmation — or proceed to pay now below.",
  },
];

export default function ThankYouContent() {
  const [countdown, setCountdown] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (countdown <= 0) {
      window.location.href = PAYMENT_URL;
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const progress = (countdown / COUNTDOWN_SECONDS) * 100;

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <header className="border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-black text-white tracking-tight">The Convergence</span>
            <span className="text-[9px] tracking-[0.2em] text-gray-500 uppercase mt-0.5">
              Faith · Business · Leadership
            </span>
          </Link>
          <span className="text-xs text-gray-600 hidden sm:block">April 18, 2026 · Port Harcourt</span>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-16">
        <div className="max-w-2xl w-full">
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

          <div className="text-center mb-10 sm:mb-12">
            <p className="text-teal-400 text-xs font-bold tracking-[0.2em] uppercase mb-3">
              Application Submitted
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
              You&apos;re in the queue.
            </h1>
            <p className="text-gray-400 leading-relaxed max-w-md mx-auto text-sm sm:text-base">
              Your application has been received and is under review. Selected participants
              will be notified within{" "}
              <span className="text-white font-semibold">48 hours</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden mb-8 sm:mb-10">
            {STEPS.map((s) => (
              <div key={s.number} className="bg-gray-900 p-5 sm:p-6">
                <p className="text-teal-500 font-black text-xs tracking-widest mb-3">{s.number}</p>
                <p className="text-white font-bold text-sm mb-1.5">{s.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900 border border-white/5 rounded-2xl p-5 sm:p-6">
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-gray-500">
                  Redirecting to payment in{" "}
                  <span className="font-black text-white tabular-nums">{countdown}</span>s
                </p>
                <span className="text-xs text-gray-600">{Math.round(progress)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={PAYMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 h-11 bg-teal-600 hover:bg-teal-500 text-white text-sm font-bold rounded-xl transition-colors"
              >
                Proceed to Payment Now
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link
                href="/"
                className="flex items-center justify-center h-11 px-6 border border-white/10 hover:border-white/20 text-gray-400 hover:text-white text-sm font-semibold rounded-xl transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>

          <p className="text-center text-gray-700 text-xs mt-8">
            The Convergence 2026 · Saturday, 18th April · Heritage House, Port Harcourt
          </p>
        </div>
      </div>
    </div>
  );
}
