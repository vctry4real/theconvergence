"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What is The Convergence conference about?",
    answer:
      "It is a high-impact, paid strategic growth experience designed for professionals, business owners, and emerging leaders focused on scaling, profitability, and structured growth.",
  },
  {
    question: "Is it a faith-based conference?",
    answer: "No, it is not a religious conference.",
  },
  {
    question: "Who can attend?",
    answer: null,
    list: [
      "Business owners & entrepreneurs",
      "Corporate professionals",
      "Executives & decision-makers",
      "Emerging leaders seeking structured growth",
    ],
  },
  {
    question: "How do I register?",
    answer:
      "You can register online via theconvergencephc.com. Click the register button on this page to get started.",
  },
  {
    question: "Is registration compulsory?",
    answer:
      "Yes. This is a paid, curated experience and access is strictly by registration.",
  },
  {
    question: "Will I be able to register on site?",
    answer: "Yes, but still online and subject to availability.",
  },
  {
    question: "Are there different ticket categories?",
    answer: "Yes, there are three tiers:",
    list: [
      "ACCESS – ₦100,000",
      "EXECUTIVE – ₦300,000",
      "PREMIER – ₦500,000",
    ],
    listNote:
      "Each tier offers increasing levels of access, proximity, and strategic value.",
  },
  {
    question: "Can I upgrade my ticket after registration?",
    answer: "Yes, upgrades are allowed subject to availability.",
  },
  {
    question: "Is there a dress code?",
    answer: "Business or corporate.",
  },
  {
    question: "Is the conference open to sponsorship and partnerships?",
    answer:
      "Yes, available in three categories: Diamond, Gold, and Silver. Contact us at 09039893477.",
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
        isOpen
          ? "border-blue-200 bg-blue-50/50"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-7 py-5 sm:py-6 text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <span
            className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-colors duration-300 ${
              isOpen
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-400"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-bold text-sm sm:text-base leading-snug transition-colors duration-300 ${
              isOpen ? "text-blue-700" : "text-gray-900"
            }`}
          >
            {faq.question}
          </span>
        </div>
        <span
          className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-300 ${
            isOpen
              ? "bg-blue-600 text-white"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {isOpen ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-5 sm:px-7 pb-5 sm:pb-6 pl-[3.75rem] sm:pl-[4.75rem]">
              {faq.answer && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </p>
              )}
              {faq.list && (
                <ul className="mt-2 space-y-1.5">
                  {faq.list.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-gray-600 text-sm sm:text-base"
                    >
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {faq.listNote && (
                <p className="mt-3 text-gray-500 text-xs sm:text-sm italic">
                  {faq.listNote}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const half = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, half);
  const col2 = faqs.slice(half);

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <span className="w-8 h-px bg-blue-600" />
              <p className="text-blue-600 font-bold text-xs tracking-[0.3em] uppercase">
                FAQ
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.05]">
              Got Questions?
              <br />
              <span className="text-blue-600">We've Got Answers.</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs leading-relaxed lg:text-right text-sm">
            Everything you need to know before joining The Convergence 2026.
          </p>
        </div>

        {/* Two-column grid on desktop, single column on mobile */}
        <div className="hidden lg:grid grid-cols-2 gap-4 items-start">
          <div className="space-y-3">
            {col1.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
          <div className="space-y-3">
            {col2.map((faq, i) => (
              <FAQItem
                key={i + half}
                faq={faq}
                index={i + half}
                isOpen={openIndex === i + half}
                onToggle={() => toggle(i + half)}
              />
            ))}
          </div>
        </div>

        {/* Single column on mobile */}
        <div className="lg:hidden space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
