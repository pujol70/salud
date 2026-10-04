import React from 'react';
import { MessageSquare, FileText, Code2, Rocket, ArrowRight } from 'lucide-react';
import { siteData } from '../siteData';

export const Methodology: React.FC = () => {
  const stepIcons = [
    <MessageSquare className="w-5 h-5 text-[#F97316]" key="1" />,
    <FileText className="w-5 h-5 text-[#F97316]" key="2" />,
    <Code2 className="w-5 h-5 text-[#F97316]" key="3" />,
    <Rocket className="w-5 h-5 text-[#F97316]" key="4" />,
  ];

  return (
    <section className="w-full py-20 lg:py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F97316]/10 text-[#F97316] text-xs font-mono uppercase tracking-wider font-semibold mb-3">
            <span>// METODOLOGÍA ÁGIL</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Cuatro pasos, <span className="text-[#F97316]">sin vueltas</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9CA3AF]">
            Un proceso directo y predecible de punta a punta, sin reuniones interminables ni jerga técnica innecesaria.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.methodologySteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#374151] p-6 sm:p-7 rounded-xl border border-[#4B5563] flex flex-col justify-between card-hover-glow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-syne font-extrabold text-2xl text-[#F97316]">
                    {step.number}
                  </span>
                  <div className="w-9 h-9 rounded-lg bg-[#1F2937] flex items-center justify-center">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="font-syne font-bold text-lg text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-[#D1D5DB] leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#4B5563]/60">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1F2937] text-xs font-mono text-[#D1D5DB]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]"></span>
                  <span>{step.channel}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-[#1F2937] border border-[#4B5563] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-bold text-xl text-white">
              Iniciemos con una conversación de 30 minutos
            </h4>
            <p className="text-sm text-[#9CA3AF] mt-1">
              Contame sobre tu negocio y recibí una propuesta clara con alcance y precio cerrado por escrito.
            </p>
          </div>

          <a
            href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola ECRISTIA, quiero agendar la entrevista inicial de 30 minutos.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full md:w-auto text-sm shrink-0"
          >
            <span>Agendar Entrevista Inicial</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
