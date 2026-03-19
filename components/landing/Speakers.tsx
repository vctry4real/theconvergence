"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

const speakers = [
  { name: "Leye Falade",      position: "Incoming CEO, NLNG",                  image: "/assets/speakers/leye_falade.webp"     },
  { name: "Gbite Falade",     position: "Aradel Holdings",                     image: "/assets/speakers/gbite_falade.webp"    },
  { name: "Kemi Adeosun",     position: "Former Minister of Finance, Nigeria",  image: "/assets/speakers/kemi_adeosun.webp"    },
  { name: "Tope Aladenusi",   position: "Deloitte Africa",                     image: "/assets/speakers/tope_aladenusi.webp"  },
  { name: "Segun Zacchaeus",  position: "Chief Economist",                     image: "/assets/speakers/segun_zaccheaus.webp" },
  { name: "Lanre Oluseye",    position: "CEO, Business Leader, Pastor",        image: "/assets/speakers/lanre_oluseye.webp"   },
];

const col1 = speakers.slice(0, 3);
const col2 = speakers.slice(3, 6);

function SpeakerCard({ speaker }: { speaker: typeof speakers[0] }) {
  return (
    <div className="relative rounded-2xl overflow-hidden h-64 sm:h-72 w-full mb-4 shrink-0">
      <Image
        src={speaker.image}
        alt={speaker.name}
        fill
        className="object-cover object-top"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-5">
        <p className="text-white font-black text-base sm:text-lg leading-tight">{speaker.name}</p>
        <p className="text-gray-300 text-xs sm:text-sm mt-0.5">{speaker.position}</p>
      </div>
    </div>
  );
}

export default function Speakers() {
  return (
    <section id="speakers" className="bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 items-center py-16 sm:py-24">

          {/* Left — text */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="w-8 h-px bg-teal-400" />
                <p className="text-teal-400 font-bold text-xs tracking-[0.3em] uppercase">Featured Speakers</p>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05]">
                Meet the Voices<br />
                <span className="text-white/30">Shaping Prosperity.</span>
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 max-w-sm">
              <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-teal-400 mb-3 sm:mb-4" strokeWidth={1.5} />
              <p className="text-gray-400 text-sm leading-relaxed">
                Leaders, executives, economists, and innovators defining the path to
                prosperity in business and beyond.
              </p>
            </div>

            <Link href="/register">
              <Button className="bg-teal-500 hover:bg-teal-400 text-white font-bold px-6 sm:px-7 py-4 sm:py-5 rounded-full text-sm tracking-wide">
                Apply to Attend →
              </Button>
            </Link>
          </div>

          {/* Right — marquee columns */}
          {/* Mobile: single column; Desktop: two columns */}
          <div className="h-80 sm:h-[480px] lg:h-[580px] overflow-hidden">

            {/* Mobile: one column marquee */}
            <div className="flex lg:hidden gap-4 h-full overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col"
                >
                  {[...speakers, ...speakers].map((speaker, i) => (
                    <SpeakerCard key={`mob-${i}`} speaker={speaker} />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Desktop: two columns */}
            <div className="hidden lg:flex gap-4 h-full overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col"
                >
                  {[...col1, ...col1].map((speaker, i) => (
                    <SpeakerCard key={`c1-${i}`} speaker={speaker} />
                  ))}
                </motion.div>
              </div>
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                  className="flex flex-col"
                >
                  {[...col2, ...col2].map((speaker, i) => (
                    <SpeakerCard key={`c2-${i}`} speaker={speaker} />
                  ))}
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
