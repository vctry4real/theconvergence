import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/convergence_hero.webp')" }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-blue-950/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10 sm:pb-16 flex flex-col lg:flex-row items-end justify-between gap-8 sm:gap-12 min-h-screen">

        {/* Left — headline */}
        <div className="flex-1 flex flex-col justify-end pb-4 sm:pb-8 lg:pb-16">
          <p className="text-teal-400 font-semibold text-xs sm:text-sm tracking-[0.3em] uppercase mb-3 sm:mb-4">
            Faith · Business · Leadership
          </p>
          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight uppercase mb-4 sm:mb-6">
            The<br />
            Conver<span className="text-teal-400">g</span>ence<br />
            <span className="text-3xl sm:text-5xl lg:text-7xl text-white/80">2026</span>
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-xs sm:max-w-sm leading-relaxed mb-6 sm:mb-8">
            A premier gathering for entrepreneurs, executives, and scaling professionals
            ready to position themselves for prosperity.
          </p>
          <a
            href="#about"
            className="inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm tracking-widest uppercase border-b-2 border-teal-400 pb-1 w-fit hover:text-teal-400 transition-colors"
          >
            Discover More
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>

        {/* Right — event card */}
        <div className="w-full sm:w-auto lg:w-105 shrink-0 self-end lg:mb-16">
          <div className="flex justify-end mb-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-400" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
          </div>
          <div className="bg-white p-5 sm:p-8 shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight mb-3 sm:mb-4">
              The Convergence 2026
            </h2>
            <div className="space-y-1 mb-3 sm:mb-4">
              <p className="text-xs font-black text-gray-700 tracking-widest uppercase">
                Saturday, 18th April 2026
              </p>
              <p className="text-xs font-black text-gray-700 tracking-widest uppercase">
                Heritage House, GRA Phase III, Port Harcourt
              </p>
            </div>
            <div className="w-12 h-0.5 bg-gray-200 mb-3 sm:mb-4" />
            <p className="text-gray-500 text-sm leading-relaxed mb-5 sm:mb-6">
              Positioning for Prosperity — 2026 and Beyond. A curated, screened gathering of
              mid-level professionals and scaling business leaders.
            </p>
            <Link href="/register">
              <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold tracking-wide uppercase text-sm py-5">
                Apply to Attend
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
