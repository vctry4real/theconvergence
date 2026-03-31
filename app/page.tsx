import type { Metadata } from "next";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import WhyAttend from "@/components/landing/WhyAttend";
import Speakers from "@/components/landing/Speakers";
import EventDetails from "@/components/landing/EventDetails";
import FAQ from "@/components/landing/FAQ";
import Footer from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "The Convergence 2026 | Faith · Business · Leadership",
  description:
    "A premier leadership and business conference in Port Harcourt, Nigeria. Join executives, entrepreneurs, and scaling professionals on Saturday, 18th April 2026 at Heritage House, GRA Phase III.",
  alternates: { canonical: "/" },
};

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "The Convergence 2026",
  description:
    "A premier gathering for entrepreneurs, executives, and scaling professionals — positioning for prosperity in 2026 and beyond.",
  startDate: "2026-04-18T08:00:00+01:00",
  endDate: "2026-04-18T18:00:00+01:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Heritage House",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot F/23 Sani Abacha Road",
      addressLocality: "Port Harcourt",
      addressRegion: "Rivers State",
      addressCountry: "NG",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "The Convergence",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://theconvergence.ng",
  },
  image: `${process.env.NEXT_PUBLIC_SITE_URL || "https://theconvergence.ng"}/assets/convergence_hero.webp`,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://theconvergence.ng",
  offers: {
    "@type": "Offer",
    name: "Application to Attend",
    url: `${process.env.NEXT_PUBLIC_SITE_URL || "https://theconvergence.ng"}/register`,
    availability: "https://schema.org/InStock",
    validFrom: "2026-01-01",
  },
  performer: [
    { "@type": "Person", name: "Leye Falade",    jobTitle: "Incoming CEO, NLNG"                },
    { "@type": "Person", name: "Gbite Falade",   jobTitle: "Aradel Holdings"                  },
    { "@type": "Person", name: "Kemi Adeosun",   jobTitle: "Former Minister of Finance"        },
    { "@type": "Person", name: "Tope Aladenusi", jobTitle: "Deloitte Africa"                   },
    { "@type": "Person", name: "Segun Zacchaeus",jobTitle: "Chief Economist"                   },
    { "@type": "Person", name: "Lanre Oluseye",  jobTitle: "CEO, Business Leader, Pastor"      },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <main>
        <Navbar />
        <Hero />
        <About />
        <WhyAttend />
        <Speakers />
        <EventDetails />
        <FAQ />
        <Footer />
      </main>
    </>
  );
}
