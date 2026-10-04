import React from 'react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { siteData } from '../siteData';

export const PilotProgram: React.FC = () => {
  const waUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(siteData.pilotProgram.whatsappMessage)}`;

  return (
    <section className="w-full py-20 lg:py-24 bg-bruma">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="relative rounded-[24px] p-8 sm:p-12 lg:p-14 bg-nieve border-2 border-arcilla shadow-suave overflow-hidden">
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-salvia-100 text-fiordo border border-linea">
                  Programa piloto
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-4 my-2">
                <span className="font-syne font-extrabold text-4xl sm:text-6xl text-arcilla tracking-tight">
                  30% de descuento
                </span>
                <h3 className="font-syne font-bold text-2xl sm:text-3xl text-grafito">
                  {siteData.pilotProgram.title}
                </h3>
              </div>

              <p className="mt-4 text-base sm:text-lg text-pizarra leading-relaxed">
                {siteData.pilotProgram.conditions}
              </p>

              {/* Slots Available Counter */}
              <div className="mt-8 flex items-center gap-4 bg-arena px-4 py-3 rounded-[14px] border border-linea w-fit">
                <div className="flex items-center gap-2" aria-hidden="true">
                  {Array.from({ length: siteData.pilotProgram.totalSlots }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-full ${i < siteData.pilotProgram.remainingSlots ? 'bg-arcilla' : 'bg-linea'}`}
                    ></span>
                  ))}
                </div>
                <span className="text-sm text-grafito">
                  <strong className="text-arcilla-700 font-bold">
                    {siteData.pilotProgram.remainingSlots === 1
                      ? '1 cupo disponible'
                      : `${siteData.pilotProgram.remainingSlots} cupos disponibles`}
                  </strong>
                </span>
              </div>
            </div>

            {/* CTA Column */}
            <div className="flex flex-col w-full sm:w-auto shrink-0 gap-3">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-base py-4 px-8 text-center"
              >
                <span>Quiero un cupo</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <span className="text-xs text-pizarra text-center flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-arcilla-700" />
                <span>Te respondo por WhatsApp</span>
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
