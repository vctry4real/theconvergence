import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theconvergence.ng";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "The Convergence 2026 | Faith · Business · Leadership",
    template: "%s | The Convergence 2026",
  },
  description:
    "A premier leadership and business conference in Port Harcourt, Nigeria. Positioning for Prosperity — 2026 and Beyond. Saturday, 18th April 2026 · Heritage House, GRA Phase III.",
  keywords: [
    "The Convergence 2026",
    "business conference Nigeria",
    "leadership conference Port Harcourt",
    "faith business leadership",
    "entrepreneurship conference",
    "executive conference Nigeria",
    "networking event Port Harcourt",
    "positioning for prosperity",
    "Rivers State business event",
  ],
  authors: [{ name: "The Convergence" }],
  creator: "The Convergence",
  publisher: "The Convergence",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: SITE_URL,
    siteName: "The Convergence 2026",
    title: "The Convergence 2026 | Faith · Business · Leadership",
    description:
      "A premier leadership and business conference. Positioning for Prosperity — 2026 and Beyond. Saturday, 18th April · Heritage House, Port Harcourt.",
    images: [
      {
        url: "/assets/convergence_hero.webp",
        width: 1200,
        height: 630,
        alt: "The Convergence 2026 — Faith · Business · Leadership — Port Harcourt, Nigeria",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Convergence 2026 | Faith · Business · Leadership",
    description:
      "A premier leadership and business conference. April 18, 2026 · Heritage House, Port Harcourt.",
    images: ["/assets/convergence_hero.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/assets/logo/logo.webp",
    apple: "/assets/logo/logo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
