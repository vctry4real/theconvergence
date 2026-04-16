"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Why Attend", href: "#why-attend" },
  { label: "Speakers", href: "#speakers" },
  { label: "Details", href: "#details" },
  { label: "Programme", href: "/programme" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-white/95 backdrop-blur-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Logo variant="dark" />

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5 lg:gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-gray-600 hover:text-blue-600 transition-colors whitespace-nowrap"
            >
              {l.label}
            </a>
          ))}
          <Link href="/register">
            <Button className="bg-teal-600 hover:bg-teal-700 text-white text-sm px-5">
              Register Now
            </Button>
          </Link>
        </div>

        {/* Mobile: register + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <Link href="/register">
            <Button
              size="sm"
              className="bg-teal-600 hover:bg-teal-700 text-white text-xs px-3 h-8"
            >
              Register
            </Button>
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
            aria-label="Toggle menu"
          >
            {open ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
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
              className="block px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
