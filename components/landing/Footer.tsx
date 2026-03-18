import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg">The Convergence 2026</p>
            <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mt-0.5">Faith · Business · Leadership</p>
            <p className="text-gray-500 text-sm mt-2">Positioning for Prosperity — 2026 and Beyond</p>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
            <a href="#details" className="hover:text-white transition-colors">Details</a>
            <Link href="/register" className="text-teal-400 hover:text-teal-300 font-semibold transition-colors">
              Register
            </Link>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-600">
          &copy; 2026 The Convergence. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
