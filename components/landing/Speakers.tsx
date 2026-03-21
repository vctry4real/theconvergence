"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Mic, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const speakers = [
  {
    name: "Leye Falade",
    position: "MD NLNG",
    image: "/assets/speakers/leye_falade.webp",
    bio: "Leye Falade is a General Manager for Production at Nigeria Liquefied Natural Gas Company (NLNG). An experienced senior business leader with a demonstrated history of working in the oil & energy industry, he has worked across upstream and midstream assets in 7 different countries across Europe, Asia, the Middle East, Russia, and Africa. Skilled in Gas, Petroleum, Product Optimization, Engineering, business improvement, and change management, Leye is a strong energy professional with an engineering degree and an MBA from Henley Business School, UK.",
  },
  {
    name: "Gbite Falade",
    position: "Aradel Holdings",
    image: "/assets/speakers/gbite_falade.webp",
    bio: "Gbite Falade is the MD/CEO of Aradel Holdings. A business-focused leader and results-driven energy professional (Oil, Gas & Power) with significant experience across the industry value chain in multi-regions including Africa, Europe, and North America. He brings great experience in leading functional and multi-disciplinary teams, managing projects and transactions geared towards improving company business and financial performance. He is now focused on commercial and development aspects of energy transactions. His specialties include Leadership, P&L Accountabilities, Operations, Strategy, Business Development, Economics Analysis, Project Management, and Systems/Process Design and Delivery.",
  },
  {
    name: "Kemi Adeosun",
    position: "Former Minister of Finance, Nigeria",
    image: "/assets/speakers/kemi_adeosun.webp",
    bio: "Kemi Adeosun is a philanthropist and social impact advocate focused on building accountable, community-driven solutions for vulnerable children, youth, and women. Through her work, she prioritises transparency, governance, and long-term impact over short-term visibility. One of the ways she delivers this work is as Convener of the DashMe Foundation. Her background in public finance and governance as the former Finance Minister of Nigeria continues to inform how she approaches service, sustainability, and institutional integrity in the social impact space.",
  },
  {
    name: "Tope Aladenusi",
    position: "Deloitte Africa",
    image: "/assets/speakers/tope_aladenusi.webp",
    bio: "Tope Aladenusi is the Partner and Cyber Leader for Deloitte Africa, with over 20 years of multidisciplinary leadership experience. A Harvard Business School alumnus, he has advised clients across more than 35 countries. He previously served as Risk Advisory Leader for Deloitte West Africa, overseeing key areas including Cybersecurity, Data Analytics, IT & Internal Audit, ESG, and Risk Management. He pioneered and led Deloitte West Africa's Cyber Risk Services, building it into the largest information security team in the market and the top African team at the Global Cyberlympics. He also held concurrent roles as Chief Strategy Officer and Chief HR Officer, earning Deloitte recognition as Nigeria's \"Best Company to Work For.\" He is a member of Deloitte's Global Leader Advisory Council (2024/25), represents Africa on the ISC2 Global DEI Council, and is the founder of Christ Lifeline Ministry.",
  },
  {
    name: "Segun Zacchaeus",
    position: "Chief Economist",
    image: "/assets/speakers/segun_zaccheaus.webp",
    bio: "Segun Zaccheaus is a management consultant with several years of experience in advising regulators, major corporate organisations, and new entities in financial services, the consumer market, and the public sector. He covers topics that include enterprise, growth and operations strategy, as well as macro and sectorial policy issues and their impact. He also leads economic discourse on global, African, and Nigerian macro developments. He is keenly focused on ideas, insights, and strategies to drive Africa's economic and financial system progress.",
  },
  {
    name: "Lanre Oluseye",
    position: "CEO, Business Leader, Pastor",
    image: "/assets/speakers/lanre_oluseye.webp",
    bio: "Lanre Oluseye is a passionate architect and visionary leader known for his ability to motivate and inspire audiences as a conference speaker. With an Executive MBA from the esteemed Metropolitan Business School in the United Kingdom, he complements his architectural expertise with advanced business acumen. He is an alumnus of several prestigious institutions, including the Graduate School of Business at the University of Cape Town, the Dale Carnegie Institute, and the London School of Economics and Political Science. Lanre is a Certified International Project Manager (CIPM) and a Fellow of the American Academy of Project Managers (FAAPM). He has also qualified as a Certified Emotional Intelligence Specialist, enabling him to harness the power of emotional intelligence to drive positive change within organizations.",
  },
];

const col1 = speakers.slice(0, 3);
const col2 = speakers.slice(3, 6);

// ── Speaker Bio Modal ────────────────────────────────────────────────────────

function SpeakerBioModal({
  initialIndex,
  onClose,
}: {
  initialIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const speaker = speakers[index];

  const goPrev = () =>
    setIndex((i) => (i - 1 + speakers.length) % speakers.length);
  const goNext = () => setIndex((i) => (i + 1) % speakers.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-4xl max-h-[90vh] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 bg-white hover:bg-gray-100 flex items-center justify-center rounded-full shadow transition-colors"
          aria-label="Close"
        >
          <X size={16} />
        </button>

        {/* ── Two-column body ── */}
        <div className="flex flex-col sm:flex-row flex-1 min-h-0">
          {/* Left — image column */}
          <div className="relative w-full sm:w-2/5 shrink-0 h-64 sm:h-auto bg-gray-100">
            <Image
              key={speaker.image}
              src={speaker.image}
              alt={speaker.name}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-black/25" />

            {/* Prev / Next over image */}
            <button
              onClick={goPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 hover:bg-black/55 border border-white/30 text-white flex items-center justify-center transition-colors"
              aria-label="Previous speaker"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/35 hover:bg-black/55 border border-white/30 text-white flex items-center justify-center transition-colors"
              aria-label="Next speaker"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Right — bio column */}
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto p-6 sm:p-8">
            {/* Name & position */}
            <div className="mb-5">
              <p className="text-gray-900 font-black text-xl sm:text-2xl leading-tight">
                {speaker.name}
              </p>
              <p className="text-teal-600 font-semibold text-sm mt-1">
                {speaker.position}
              </p>
            </div>

            <div className="w-10 h-0.5 bg-teal-500 mb-5" />

            {/* Bio */}
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-1">
              {speaker.bio}
            </p>

            {/* Dot navigation + counter */}
            <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-100">
              <div className="flex gap-1.5">
                {speakers.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`View ${speakers[i].name}`}
                    className={`rounded-full transition-all duration-200 ${
                      i === index
                        ? "w-5 h-2 bg-teal-500"
                        : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400 text-xs font-mono">
                {String(index + 1).padStart(2, "0")} /{" "}
                {String(speakers.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Speaker Card (marquee tile) ──────────────────────────────────────────────

function SpeakerCard({
  speaker,
  onOpenBio,
}: {
  speaker: (typeof speakers)[0];
  onOpenBio: () => void;
}) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden h-64 sm:h-72 w-full mb-4 shrink-0 cursor-pointer group"
      onClick={onOpenBio}
    >
      <Image
        src={speaker.image}
        alt={speaker.name}
        fill
        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4 sm:p-5">
        <p className="text-white font-black text-base sm:text-lg leading-tight">
          {speaker.name}
        </p>
        <p className="text-gray-300 text-xs sm:text-sm mt-0.5">
          {speaker.position}
        </p>
      </div>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export default function Speakers() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  return (
    <section id="speakers" className="bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-12 items-center py-16 sm:py-24">
          {/* Left — text */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <span className="w-8 h-px bg-blue-400" />
                <p className="text-blue-400 font-bold text-xs tracking-[0.3em] uppercase">
                  Featured Speakers
                </p>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05]">
                Meet the Voices
                <br />
                <span className="text-white/30">Shaping Prosperity.</span>
              </h2>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 max-w-sm">
              <Mic
                className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 mb-3 sm:mb-4"
                strokeWidth={1.5}
              />
              <p className="text-gray-400 text-sm leading-relaxed">
                Leaders, executives, economists, and innovators defining the
                path to prosperity in business and beyond.
              </p>
            </div>

            <Button
              onClick={() => setModalIndex(0)}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 sm:px-7 py-4 sm:py-5 rounded-full text-sm tracking-wide"
            >
              Know More About Our Speakers
            </Button>
          </div>

          {/* Right — marquee columns */}
          <div className="h-80 sm:h-[480px] lg:h-[580px] overflow-hidden">
            {/* Mobile: single column */}
            <div className="flex lg:hidden gap-4 h-full overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col"
                >
                  {[...speakers, ...speakers].map((speaker, i) => (
                    <SpeakerCard
                      key={`mob-${i}`}
                      speaker={speaker}
                      onOpenBio={() => setModalIndex(i % speakers.length)}
                    />
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Desktop: two columns */}
            <div className="hidden lg:flex gap-4 h-full overflow-hidden">
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col"
                >
                  {[...col1, ...col1].map((speaker, i) => (
                    <SpeakerCard
                      key={`c1-${i}`}
                      speaker={speaker}
                      onOpenBio={() =>
                        setModalIndex(speakers.indexOf(col1[i % col1.length]))
                      }
                    />
                  ))}
                </motion.div>
              </div>
              <div className="flex-1 overflow-hidden">
                <motion.div
                  animate={{ y: ["-50%", "0%"] }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="flex flex-col"
                >
                  {[...col2, ...col2].map((speaker, i) => (
                    <SpeakerCard
                      key={`c2-${i}`}
                      speaker={speaker}
                      onOpenBio={() =>
                        setModalIndex(speakers.indexOf(col2[i % col2.length]))
                      }
                    />
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Modal */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div
            key="bio-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <SpeakerBioModal
              initialIndex={modalIndex}
              onClose={() => setModalIndex(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
