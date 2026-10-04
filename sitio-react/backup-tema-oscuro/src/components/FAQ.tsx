import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { siteData } from '../siteData';

export const FAQ: React.FC = () => {
  // First item open by default like the imported Stitch design
  const [openId, setOpenId] = useState<string>('faq-1');

  const toggleItem = (id: string) => {
    setOpenId(openId === id ? '' : id);
  };

  return (
    <section id="preguntas" className="w-full py-20 lg:py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#F97316] uppercase tracking-wider font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TRANSPARENCIA TÉCNICA TOTAL</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Preguntas <span className="text-[#F97316]">frecuentes</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9CA3AF]">
            Respuestas directas, sin rodeos comerciales ni letra chica.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="max-w-4xl space-y-4" role="region" aria-label="Preguntas frecuentes">
          {siteData.faqs.map((faq, idx) => {
            const isOpen = openId === faq.id;
            const indexStr = (idx + 1).toString().padStart(2, '0');

            return (
              <div
                key={faq.id}
                className="bg-[#374151] rounded-xl border border-[#4B5563] overflow-hidden transition-colors duration-200"
              >
                {/* Question Header Button */}
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-[#F97316]"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[#F97316] font-bold">
                      {indexStr}.
                    </span>
                    <span className="font-syne font-bold text-base sm:text-lg text-white group-hover:text-[#F97316] transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-[#9CA3AF] shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180 text-[#F97316]' : 'group-hover:text-white'
                    }`}
                  />
                </button>

                {/* Smooth Animated Collapsible Answer Area */}
                <div
                  id={`faq-answer-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${faq.id}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none ${
                    isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="flex items-center justify-start py-6 px-5 sm:px-6 border-t border-[#4B5563]/50">
                      <div className="w-full p-4 rounded-lg bg-[#1F2937] border border-[#4B5563]/50 font-mono text-xs sm:text-sm text-[#D1D5DB] leading-relaxed text-left">
                        <span className="text-[#F97316] font-bold">&gt;&nbsp;</span>
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
