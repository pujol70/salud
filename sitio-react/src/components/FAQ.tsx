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
    <section id="preguntas" className="w-full py-20 lg:py-24 bg-arena">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-fiordo" />
            <span>Dudas comunes</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
            Preguntas <span className="text-fiordo">frecuentes</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-pizarra">
            Las preguntas que más me hacen, con respuestas claras.
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
                className="bg-nieve rounded-[24px] border border-linea overflow-hidden shadow-suave transition-colors duration-200"
              >
                {/* Question Header Button */}
                <button
                  type="button"
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer select-none group focus:outline-none focus:ring-2 focus:ring-arcilla-700"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-fiordo font-bold">
                      {indexStr}.
                    </span>
                    <span className="font-syne font-bold text-base sm:text-lg text-grafito group-hover:text-fiordo transition-colors">
                      {faq.question}
                    </span>
                  </div>

                  <ChevronDown
                    className={`w-5 h-5 text-fiordo shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                      isOpen ? 'rotate-180' : ''
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
                    <div className="flex items-center justify-start py-6 px-5 sm:px-6 border-t border-linea">
                      <div className="w-full p-4 rounded-[14px] bg-arena/60 border border-linea text-sm sm:text-base text-grafito leading-relaxed text-left">
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
