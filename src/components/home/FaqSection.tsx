"use client";

import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FaqSection(): React.JSX.Element {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "How secure is my personal diagnostic and profile data?",
      answer: "Absolutely secure. We utilize encrypted authentication tokens to restrict medical data. Your scheduling logs are private and strictly shared with your designated clinician."
    },
    {
      question: "Can I easily cancel or reschedule an active booking slot?",
      answer: "Yes. Simply navigate to your private Dashboard and trigger 'Cancel Booking'. You can search the active listings to register an alternative timing slot immediately."
    },
    {
      question: "Are there hidden consultation charges or scheduling fees?",
      answer: "No hidden layers. The fee designated on each clinical card is set directly by the practitioner. Our booking ledger does not modify or tack on transactional service fees."
    }
  ];

  const toggleFaq = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 mx-auto max-w-7xl border-t border-white/5 bg-brand-surface/40">
      <div className="max-w-3xl mx-auto space-y-12">
        
        {/* Centered Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold tracking-widest text-brand-teal uppercase">Help Station</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">Frequently Questions</h2>
          <p className="text-xs text-brand-muted max-w-md mx-auto leading-relaxed">
            Quick, technical explanations resolving common queries regarding booking processes, cancel rules, and security.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-3">
          {faqs.map((faq: FAQItem, idx: number) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="rounded-2xl border border-white/5 bg-brand-surface overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.01] transition-colors focus:outline-none hover:cursor-pointer"
                >
                  <span className="text-xs font-bold text-white tracking-tight pr-4">
                    {faq.question}
                  </span>
                  <span className={`text-xs text-brand-teal font-medium transform transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}>
                    ＋
                  </span>
                </button>
                
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-40 border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-[11px] text-brand-muted leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}