import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  /** "dark" = original logo (for light backgrounds like Navbar)
   *  "light" = inverted to white (for dark backgrounds like Footer/Hero) */
  variant?: "dark" | "light";
  className?: string;
}

export default function Logo({ variant = "dark", className = "" }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center group ${className}`}>
      <Image
        src="/assets/logo/logo.webp"
        alt="The Convergence"
        width={180}
        height={48}
        className={`h-10 w-auto object-contain transition-opacity group-hover:opacity-80 ${
          variant === "light" ? "brightness-0 invert" : ""
        }`}
        priority
      />
    </Link>
  );
}
