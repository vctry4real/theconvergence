"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const SLIDES = [
  "/assets/slideshow/conference1.webp",
  "/assets/slideshow/conference2.webp",
  "/assets/slideshow/conference3.webp",
  "/assets/slideshow/conference4.webp",
];

const INTERVAL_MS = 5500;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [next]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* ── Slideshow background images (cross-fade) ── */}
      {SLIDES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${src}')`,
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* ── Reduced dark overlay so slideshow photos are clearly visible ── */}
      <div className="absolute inset-0 bg-black/45" />

      {/* ── Slide counter (top-right) ── */}
      <div className="absolute top-20 right-6 z-20">
        <span className="font-mono text-[11px] tracking-widest text-white/50">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(SLIDES.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-10 sm:pb-16 flex flex-col lg:flex-row items-end justify-between gap-8 sm:gap-12 min-h-screen">
        {/* Left — headline */}
        <div className="flex-1 flex flex-col justify-end pb-4 sm:pb-8 lg:pb-20">
          <div className="inline-flex w-fit items-center gap-2 mb-4 sm:mb-5">
            <span className="w-2 h-2 rounded-full bg-teal-400" />
            <p className="text-teal-300 font-semibold text-xs sm:text-sm tracking-[0.3em] uppercase">
              Faith · Business · Leadership
            </p>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-none tracking-tight uppercase mb-4 sm:mb-6">
            <span className="text-white">The</span>
            <br />
            <span className="text-teal-400">Convergence</span>
            <br />
            <span className="text-3xl sm:text-5xl lg:text-7xl text-white/70">
              2026
            </span>
          </h1>

          <p className="text-white/70 text-sm sm:text-base max-w-xs sm:max-w-sm leading-relaxed mb-7 sm:mb-9">
            A premier gathering for entrepreneurs, executives, and scaling
            professionals ready to position themselves for prosperity.
          </p>

          <a
            href="#about"
            className="relative inline-flex items-center gap-2 text-white font-bold text-xs sm:text-sm tracking-widest uppercase pb-1.5 w-fit hover:text-teal-300 transition-colors group"
          >
            Discover More
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M7 17L17 7M17 7H7M17 7v10"
              />
            </svg>
            <span className="absolute bottom-0 left-0 h-0.5 w-full bg-teal-400" />
          </a>
        </div>

        {/* Right — event card */}
        <div className="w-full sm:w-auto lg:w-[420px] shrink-0 self-end lg:mb-16">
          <div className="flex justify-end mb-0">
            <div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-500"
              style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }}
            />
          </div>

          <div className="bg-white shadow-2xl overflow-hidden">
            <div className="h-1.5 w-full bg-teal-500" />

            <div className="p-5 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight mb-3 sm:mb-4">
                The Convergence 2026
              </h2>
              <div className="space-y-1 mb-3 sm:mb-4">
                <p className="text-xs font-black text-gray-700 tracking-widest uppercase">
                  Saturday, 18th April 2026
                </p>
                <p className="text-xs font-black text-gray-700 tracking-widest uppercase">
                  Heritage House GRA Phase III, Port Harcourt
                </p>
              </div>

              <div className="w-12 h-0.5 bg-gray-200 mb-4 sm:mb-5" />

              <p className="text-gray-500 text-sm leading-relaxed mb-5 sm:mb-6">
                Driving Sustainable Growth, Long-Term Impact, and Scalable
                Success — 2026 and Beyond. A curated, screened gathering of
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
      </div>

      {/* ── Slideshow controls (bottom-center) ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full border border-white/30 text-white/70 flex items-center justify-center hover:border-teal-400 hover:text-teal-400 transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft size={14} />
        </button>

        <div className="flex items-center gap-2">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-teal-400"
                  : "w-2 h-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-8 h-8 rounded-full border border-white/30 text-white/70 flex items-center justify-center hover:border-teal-400 hover:text-teal-400 transition-all"
          aria-label="Next slide"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </section>
  );
}
