"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Why Attend", href: "#why-attend" },
  { label: "Speakers",   href: "#speakers"   },
  { label: "Details",    href: "#details"    },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="font-bold text-base sm:text-lg text-teal-600 tracking-tight">The Convergence</span>
          <span className="text-[9px] tracking-[0.2em] text-gray-400 uppercase">Faith · Business · Leadership</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {NAV_LINKS.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-gray-600 hover:text-teal-600 transition-colors whitespace-nowrap">
              {l.label}
            </a>
          ))}
          <Link href="/register">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-5">Register Now</Button>
          </Link>
        </div>

        {/* Mobile: register button + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/register">
            <Button size="sm" className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 h-8">Register</Button>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 text-gray-600 hover:text-teal-600 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
