import React from 'react';
import { 
  Building2, 
  Stethoscope, 
  Briefcase, 
  ShoppingBag, 
  ExternalLink, 
  Eye, 
  Smartphone, 
  Layers, 
  MapPin, 
  Send 
} from 'lucide-react';
import { siteData } from '../siteData';

interface TargetAudienceAndDemosProps {
  onNavigateToDemo: (demoPath: string) => void;
}

export const TargetAudienceAndDemos: React.FC<TargetAudienceAndDemosProps> = ({ onNavigateToDemo }) => {
  const nicheIcons = [
    <Stethoscope className="w-5 h-5 text-salvia stroke-current fill-none" key="1" />,
    <Building2 className="w-5 h-5 text-salvia stroke-current fill-none" key="2" />,
    <Briefcase className="w-5 h-5 text-salvia stroke-current fill-none" key="3" />,
    <ShoppingBag className="w-5 h-5 text-salvia stroke-current fill-none" key="4" />
  ];

  return (
    <div id="demos" className="w-full bg-arena">
      
      {/* ==================== SECCIÓN: PARA QUIÉN TRABAJO ==================== */}
      <section className="w-full py-20 lg:py-24 border-t border-linea">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-14">
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
              Para quién <span className="text-fiordo">trabajo</span>
            </h2>
            <p className="mt-3 text-base sm:text-lg text-pizarra">
              Trabajo con negocios y profesionales de Asunción y Gran Asunción que quieren recibir más consultas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {siteData.targetNiches.map((niche, idx) => (
              <div
                key={idx}
                className="bg-nieve rounded-[24px] p-6 sm:p-7 border border-linea flex flex-col justify-between card-hover-glow shadow-suave group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia group-hover:scale-110 transition-transform">
                      {nicheIcons[idx]}
                    </div>
                    <span className="text-[11px] uppercase px-2.5 py-0.5 rounded-full bg-salvia-100 text-fiordo border border-linea">
                      {niche.badge}
                    </span>
                  </div>

                  <h3 className="font-syne font-bold text-lg text-grafito mb-2 group-hover:text-fiordo transition-colors">
                    {niche.title}
                  </h3>

                  <p className="text-sm text-pizarra leading-relaxed">
                    {niche.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ==================== SECCIÓN: MIRA CÓMO SE VERÍA TU WEB ==================== */}
      <section className="w-full py-20 lg:py-24 border-t border-linea bg-arena">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-2">
              <Eye className="w-3.5 h-3.5 text-fiordo" />
              <span>Ejemplos</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
              Mira cómo <span className="text-fiordo">se vería</span> tu web
            </h2>
            <p className="mt-3 text-base sm:text-lg text-pizarra">
              Dos ejemplos con datos ficticios, para que veas cómo puede quedar tu web en el celular y en la computadora.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* DEMO 1: Clínica Dental Ejemplo */}
            <div className="bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-salvia-100 text-fiordo font-semibold border border-linea">
                    Ejemplo
                  </span>
                </div>

                <h3 className="font-syne font-bold text-2xl text-grafito mb-4">
                  Clínica Dental Ejemplo
                </h3>

                {/* Simulated Device Frame */}
                <div className="relative w-full bg-arena rounded-[14px] overflow-hidden p-4 border border-linea mb-6 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-pizarra pb-2 mb-3 border-b border-linea">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="truncate max-w-[200px]">tuweb.com</span>
                    <div className="w-4"></div>
                  </div>

                  {/* Mock content */}
                  <div className="bg-nieve rounded-[14px] p-4 space-y-3 border border-linea">
                    <div className="flex justify-between items-center text-xs font-bold text-grafito">
                      <span>CLÍNICA DENTAL · EJEMPLO</span>
                      <span className="text-fiordo text-[10px]">Villa Morra</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-fiordo font-semibold uppercase tracking-wider block">
                        Odontología Digital en Villa Morra
                      </span>
                      <p className="font-syne font-bold text-base text-grafito mt-1 leading-snug">
                        Cuidamos tu sonrisa con tecnología moderna y trato humano
                      </p>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <div className="px-3.5 py-1.5 rounded-full bg-fiordo text-bruma text-xs font-semibold">
                        Agendar Turno
                      </div>
                      <div className="px-3.5 py-1.5 rounded-full bg-arena text-pizarra text-xs border border-linea">
                        Especialistas
                      </div>
                    </div>
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 text-xs text-pizarra mb-6">
                  <span className="px-3 py-1 rounded-full bg-arena border border-linea flex items-center gap-1.5">
                    <Smartphone className="w-3.5 h-3.5 text-fiordo" /> Pensada para el celular
                  </span>
                  <span className="px-3 py-1 rounded-full bg-arena border border-linea flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-fiordo" /> Con ficha de Google
                  </span>
                  <span className="px-3 py-1 rounded-full bg-arena border border-linea flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-fiordo" /> Turnos en línea
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToDemo('/demo/clinica')}
                className="btn-primary w-full text-center"
              >
                <span>Explorar Demo de Clínica Dental</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

            {/* DEMO 2: Inmobiliaria Ejemplo */}
            <div className="bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col justify-between card-hover-glow shadow-suave">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase px-2.5 py-0.5 rounded-full bg-salvia-100 text-fiordo font-semibold border border-linea">
                    Ejemplo
                  </span>
                </div>

                <h3 className="font-syne font-bold text-2xl text-grafito mb-4">
                  Inmobiliaria Ejemplo
                </h3>

                {/* Simulated Device Frame */}
                <div className="relative w-full bg-arena rounded-[14px] overflow-hidden p-4 border border-linea mb-6 shadow-inner">
                  <div className="flex items-center justify-between text-xs text-pizarra pb-2 mb-3 border-b border-linea">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    </div>
                    <span className="truncate max-w-[200px]">tuweb.com</span>
                    <div className="w-4"></div>
                  </div>

                  {/* Mock content */}
                  <div className="bg-nieve rounded-[14px] p-4 space-y-3 border border-linea">
                    <div className="flex justify-between items-center text-xs font-bold text-grafito">
                      <span>INMOBILIARIA EJEMPLO</span>
                      <span className="text-fiordo text-[10px]">Asunción, PY</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-arena p-2.5 rounded-[10px] border border-linea">
                        <div className="text-[11px] font-bold text-grafito">Torre Santa Teresa</div>
                        <div className="text-[10px] text-fiordo font-semibold">USD 295.000</div>
                      </div>
                      <div className="bg-arena p-2.5 rounded-[10px] border border-linea">
                        <div className="text-[11px] font-bold text-grafito">Residencias Central</div>
                        <div className="text-[10px] text-fiordo font-semibold">USD 89.000</div>
                      </div>
                    </div>
                    <div className="text-[10px] text-pizarra bg-arena px-2 py-1 rounded-[8px] border border-linea">
                      Filtros activos por zona: Villa Morra, Santa Teresa, Carmelitas
                    </div>
                  </div>
                </div>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-2 text-xs text-pizarra mb-6">
                  <span className="px-3 py-1 rounded-full bg-arena border border-linea flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-fiordo" /> Filtros por zona y precio
                  </span>
                  <span className="px-3 py-1 rounded-full bg-arena border border-linea flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-fiordo" /> Una página por edificio
                  </span>
                  <span className="px-3 py-1 rounded-full bg-arena border border-linea flex items-center gap-1.5">
                    <Send className="w-3.5 h-3.5 text-fiordo" /> Ficha para inversores
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onNavigateToDemo('/demo/inmobiliaria')}
                className="btn-primary w-full text-center"
              >
                <span>Ver ejemplo de inmobiliaria</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
