import Link from "next/link";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-0 pb-12 relative overflow-hidden">
      {/* Blue→teal gradient top border */}
      <div className="h-1 w-full bg-teal-600" />

      {/* Ambient blue glow */}
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-800 rounded-full opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo (light variant) */}
          <div>
            <Logo variant="light" />
            <p className="text-gray-500 text-sm mt-3 ml-13">
              Positioning for Prosperity — 2026 and Beyond
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
            <a href="#details" className="hover:text-white transition-colors">Details</a>
            <Link
              href="/register"
              className="font-semibold text-blue-400 hover:text-teal-400 transition-colors"
            >
              Register
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>&copy; 2026 The Convergence. All rights reserved.</span>
          <a
            href="mailto:Info@theconvergencephc.com"
            className="text-gray-500 hover:text-teal-400 transition-colors"
          >
            Info@theconvergencephc.com
          </a>
        </div>
      </div>
    </footer>
  );
}
