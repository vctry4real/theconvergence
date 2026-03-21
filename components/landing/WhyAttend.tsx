"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft, ChevronRight,
  BrainCircuit, Users, Handshake, DoorOpen, Banknote, Globe,
  Award, Lightbulb, BookOpen, Star, UserPlus, Megaphone, Globe2,
} from "lucide-react";

const CARDS = [
  { id: 1,  title: "Strategic Intelligence for the Future",        Icon: BrainCircuit, description: "Gain decision-grade insights into the forces shaping business, markets, and the global economy — including future market outlooks, industry transformation forecasts, AI disruption insights, and global economic signals affecting Africa." },
  { id: 2,  title: "An Elite Networking Ecosystem",                Icon: Users,        description: "Connect with a curated ecosystem of the most important players and decision makers across industries — founders, CEOs, investors, venture capitalists, policy influencers, and corporate decision makers." },
  { id: 3,  title: "Structured B2B Deal-Making",                   Icon: Handshake,    description: "Convergence is designed to create transactions, not just conversations. Benefit from structured B2B matchmaking, strategic partnership introductions, supplier connections, investor introductions, and collaboration opportunities." },
  { id: 4,  title: "Exclusive Deal Rooms",                         Icon: DoorOpen,     description: "Specially designed private environments for serious business conversations. Use these spaces to pitch investors, negotiate partnerships, discuss acquisitions, explore joint ventures, and close strategic deals." },
  { id: 5,  title: "Direct Access to Capital",                     Icon: Banknote,     description: "Connect with the investment networks that fuel business growth — venture capital firms, private equity investors, angel investors, strategic corporate investors, and institutional investment representatives." },
  { id: 6,  title: "Market Expansion Opportunities",               Icon: Globe,        description: "Position your business to grow beyond your current markets. Identify new distribution channels, explore regional and international partnerships, discover expansion markets, and build cross-border alliances." },
  { id: 7,  title: "Career & Leadership Elevation",                Icon: Award,        description: "A powerful platform for professionals seeking growth. Gain career advancement insights, leadership development exposure, access to executive recruiters, mentorship opportunities, and connections with senior industry leaders." },
  { id: 8,  title: "Access to Influential Thought Leaders",        Icon: Lightbulb,    description: "Interact with high-level thinkers, innovators, and practitioners who shape industries and influence policy — exposing you to global business frameworks, strategic thinking models, and leadership philosophies." },
  { id: 9,  title: "Curated Learning Experiences",                 Icon: BookOpen,     description: "Actionable frameworks and real-world insights you can apply immediately. Gain strategic playbooks for growth, business operating models, leadership and management frameworks, and real business case studies." },
  { id: 10, title: "Visibility & Personal Brand Positioning",      Icon: Star,         description: "Platforms to increase your professional visibility and influence. Position yourself as an industry voice, share ideas publicly, engage with media platforms, and build influence networks that outlast the conference." },
  { id: 11, title: "Talent & Recruitment Opportunities",           Icon: UserPlus,     description: "Companies can connect with skilled professionals and rising industry leaders. Professionals can meet employers, founders, venture builders, and corporate recruiters actively looking for top talent." },
  { id: 12, title: "Business Exposure & Market Visibility",        Icon: Megaphone,    description: "Showcase your company, innovations, and solutions to a curated, high-value audience. Present your business, demonstrate products, showcase innovations, and gain the kind of market exposure that accelerates growth." },
  { id: 13, title: "Global Perspective & Cross-Border Collaboration", Icon: Globe2,    description: "The future of business is global. Convergence exposes participants to international markets, global business trends, cross-border collaboration opportunities, and international partnership possibilities." },
];

const OUTCOMES = ["New Knowledge", "New Relationships", "New Opportunities"];

function CardContent({ card, isActive }: { card: typeof CARDS[0]; isActive: boolean }) {
  return (
    <>
      {isActive && <div className="absolute top-0 left-0 right-0 h-0.5 bg-white/40" />}
      <div>
        <div className="flex items-center gap-3 mb-4 sm:mb-5">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
            <card.Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={1.5} />
          </div>
          <span className="text-xs font-black tracking-widest text-white/30">
            {String(card.id).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-lg sm:text-xl font-black mb-2 sm:mb-3 leading-snug text-white">
          {card.title}
        </h3>
        <p className="text-sm leading-relaxed text-white/70">{card.description}</p>
      </div>
      <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mt-4">
        The Convergence 2026
      </div>
    </>
  );
}

interface NavControlsProps {
  currentIndex: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
}

function NavControls({ currentIndex, total, onPrev, onNext }: NavControlsProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-gray-600 text-xs font-mono tracking-widest">
        {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <div className="flex gap-2">
        <button onClick={onPrev} disabled={currentIndex === 0}
          className="w-10 h-10 sm:w-11 sm:h-11 border border-white/20 text-white flex items-center justify-center hover:border-teal-400 hover:text-teal-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-xl">
          <ChevronLeft size={16} />
        </button>
        <button onClick={onNext} disabled={currentIndex === total - 1}
          className="w-10 h-10 sm:w-11 sm:h-11 border border-white/20 text-white flex items-center justify-center hover:border-teal-400 hover:text-teal-400 disabled:opacity-20 disabled:cursor-not-allowed transition-all rounded-xl">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

export default function WhyAttend() {
  const [currentIndex, setCurrentIndex] = useState(2);

  const handleNext = () => { if (currentIndex < CARDS.length - 1) setCurrentIndex((p) => p + 1); };
  const handlePrev = () => { if (currentIndex > 0) setCurrentIndex((p) => p - 1); };

  const card = CARDS[currentIndex];

  return (
    <section id="why-attend" className="py-16 sm:py-28 bg-gray-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-10 sm:mb-16">
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="w-8 h-px bg-blue-400" />
            <p className="text-blue-400 font-bold text-xs tracking-[0.3em] uppercase">Why Attend</p>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 sm:gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] mb-4 sm:mb-6">
                Positioning for<br />
                <span className="text-teal-400">Prosperity</span>{" "}
                <span className="text-white/30">2026</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6 sm:mb-8 max-w-xl text-sm sm:text-base">
                A strategic gathering for entrepreneurs, executives, investors,
                policymakers, and ambitious professionals. Every participant
                leaves with three guaranteed outcomes:
              </p>
              <div className="flex flex-wrap gap-px bg-white/10 rounded-2xl overflow-hidden">
                {OUTCOMES.map((o, i) => (
                  <div key={o} className="flex-1 min-w-28 bg-gray-950 px-4 sm:px-5 py-3 sm:py-4 hover:bg-white/5 transition-colors">
                    <p className="font-black text-xl sm:text-2xl mb-1 text-teal-400">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <p className="text-white font-semibold text-xs sm:text-sm">{o}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop nav controls */}
            <div className="hidden lg:flex flex-col items-end gap-4 shrink-0">
              <div className="w-32 h-px bg-white/10 relative">
                <div className="absolute inset-y-0 left-0 bg-teal-400 transition-all duration-500"
                  style={{ width: `${((currentIndex + 1) / CARDS.length) * 100}%` }} />
              </div>
              <NavControls currentIndex={currentIndex} total={CARDS.length} onPrev={handlePrev} onNext={handleNext} />
            </div>
          </div>
        </div>

        {/* ── Mobile: single card (no absolute positioning) ── */}
        <div className="lg:hidden">
          <div className="relative flex flex-col justify-between p-6 rounded-2xl overflow-hidden shadow-xl bg-teal-600 border border-teal-500 min-h-72">
            <CardContent card={card} isActive />
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex-1 h-px bg-white/10 relative mr-4">
              <div className="absolute inset-y-0 left-0 bg-teal-400 transition-all duration-500"
                style={{ width: `${((currentIndex + 1) / CARDS.length) * 100}%` }} />
            </div>
            <NavControls currentIndex={currentIndex} total={CARDS.length} onPrev={handlePrev} onNext={handleNext} />
          </div>
        </div>

        {/* ── Desktop: horizontal stacking cards ── */}
        <div className="hidden lg:block relative w-full h-77.5">
          {CARDS.map((c, index) => {
            const isCollapsed = index < currentIndex;
            const isActive    = index === currentIndex;

            const STACK_OFFSET_PX = 20;
            const CARD_WIDTH_PX   = 520;
            const GAP_PX          = 16;

            let xPosition = 0;
            if (isCollapsed || isActive) {
              xPosition = index * STACK_OFFSET_PX;
            } else {
              const activeCardRightEdge = currentIndex * STACK_OFFSET_PX + CARD_WIDTH_PX;
              const upcomingOffset = (index - currentIndex - 1) * (CARD_WIDTH_PX + GAP_PX);
              xPosition = activeCardRightEdge + GAP_PX + upcomingOffset;
            }

            // Blue = past/done, Teal = active/present, Blue-dark = upcoming
            const cardClasses = isActive
              ? "bg-teal-500 border border-teal-400"
              : isCollapsed
                ? "bg-blue-900 border border-blue-800"
                : "bg-blue-800 border border-blue-700";

            return (
              <motion.div
                key={c.id}
                initial={false}
                animate={{ x: xPosition, zIndex: isCollapsed ? index : 50 - index }}
                transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                className={`absolute top-0 bottom-0 flex flex-col justify-between p-8 w-[520px] rounded-2xl origin-left overflow-hidden shadow-xl ${cardClasses}`}
              >
                <CardContent card={c} isActive={isActive} />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
