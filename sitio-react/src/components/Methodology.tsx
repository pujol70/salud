import React from 'react';
import { MessageSquare, FileText, Code2, Rocket, ArrowRight } from 'lucide-react';
import { siteData } from '../siteData';

export const Methodology: React.FC = () => {
  const stepIcons = [
    <MessageSquare className="w-5 h-5 text-salvia stroke-current fill-none" key="1" />,
    <FileText className="w-5 h-5 text-salvia stroke-current fill-none" key="2" />,
    <Code2 className="w-5 h-5 text-salvia stroke-current fill-none" key="3" />,
    <Rocket className="w-5 h-5 text-salvia stroke-current fill-none" key="4" />,
  ];

  return (
    <section className="w-full py-20 lg:py-24 bg-bruma">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-3">
            <span>Cómo trabajo</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
            Cuatro pasos, <span className="text-fiordo">sin vueltas</span>
          </h2>
          <p className="mt-3 text-base sm:text-lg text-pizarra">
            Un proceso simple, con fechas claras y sin palabras técnicas que no entiendas.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteData.methodologySteps.map((step, idx) => (
            <div
              key={idx}
              className="bg-nieve p-6 sm:p-7 rounded-[24px] border border-linea flex flex-col justify-between card-hover-glow shadow-suave"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-syne font-extrabold text-2xl text-fiordo">
                    {step.number}
                  </span>
                  <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia">
                    {stepIcons[idx]}
                  </div>
                </div>

                <h3 className="font-syne font-bold text-lg text-grafito mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-pizarra leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-linea">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-arena text-xs text-grafito border border-linea">
                  <span className="w-1.5 h-1.5 rounded-full bg-fiordo"></span>
                  <span>{step.channel}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-[24px] bg-nieve border border-linea shadow-suave flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h4 className="font-syne font-bold text-xl text-grafito">
              Empecemos con una conversación de 30 minutos
            </h4>
            <p className="text-sm text-pizarra mt-1">
              Cuéntame sobre tu negocio y recibe una propuesta con alcance y precio por escrito.
            </p>
          </div>

          <a
            href={`${siteData.contact.whatsappLink}?text=${encodeURIComponent("Hola, quiero agendar la entrevista inicial de 30 minutos.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full md:w-auto text-sm shrink-0"
          >
            <span>Agendar la entrevista</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
