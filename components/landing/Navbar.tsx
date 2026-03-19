import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex flex-col leading-none">
            <span className="font-bold text-lg text-blue-700 tracking-tight">
              The Convergence
            </span>
            <span className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
              Faith · Business · Leadership
            </span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#about"
            className="text-sm text-gray-600 hover:text-blue-700 transition-colors hidden sm:block"
          >
            About
          </a>
          <a
            href="#why-attend"
            className="text-sm text-gray-600 hover:text-blue-700 transition-colors hidden sm:block"
          >
            Why Attend
          </a>
          <a
            href="#speakers"
            className="text-sm text-gray-600 hover:text-blue-700 transition-colors hidden sm:block"
          >
            Speakers
          </a>
          <a
            href="#details"
            className="text-sm text-gray-600 hover:text-blue-700 transition-colors hidden sm:block"
          >
            Details
          </a>
          <Link href="/register">
            <Button className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-5">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
