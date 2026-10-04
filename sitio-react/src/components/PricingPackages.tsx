import React from 'react';
import { Check, Clock, MessageCircle, Receipt, ArrowRight, Zap } from 'lucide-react';
import { siteData, formatGs } from '../siteData';

export const PricingPackages: React.FC = () => {
  return (
    <section id="precios" className="w-full py-20 lg:py-24 bg-arena">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-fiordo"></span>
              <span>Precios</span>
            </div>
            <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
              Tres tipos de web, <span className="text-fiordo">un precio claro</span> para cada una
            </h2>
          </div>

          <div className="inline-flex items-center gap-2 bg-nieve px-4 py-2 rounded-full text-sm text-grafito border border-linea shadow-suave">
            <Receipt className="w-4 h-4 text-fiordo" />
            <span className="font-medium">Todos los precios incluyen IVA.</span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {siteData.packages.map((pkg) => {
            const isFeatured = pkg.isFeatured;
            const waUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(pkg.whatsappMessage)}`;

            return (
              <div
                key={pkg.id}
                className={`relative rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-fiordo text-bruma border border-fiordo shadow-suave lg:-translate-y-2'
                    : 'bg-bruma border border-linea card-hover-glow shadow-suave text-grafito'
                }`}
              >
                {/* Floating "Más elegido" badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-arcilla text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-suave">
                    {pkg.badge || 'Más elegido'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span></span>
                    <span className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full ${
                      isFeatured 
                        ? 'bg-fiordo-900 text-bruma border border-linea/20' 
                        : 'bg-arena text-pizarra border border-linea'
                    }`}>
                      <Clock className="w-3.5 h-3.5" />
                      <span>{pkg.deliveryDays}</span>
                    </span>
                  </div>

                  <h3 className={`font-syne font-bold text-2xl mb-2 ${isFeatured ? 'text-bruma' : 'text-grafito'}`}>
                    {pkg.name}
                  </h3>

                  <p className={`text-sm mb-6 min-h-[44px] ${isFeatured ? 'text-bruma/80' : 'text-pizarra'}`}>
                    {pkg.subtitle}
                  </p>

                  <div className={`mb-6 pb-6 border-b ${isFeatured ? 'border-linea/20' : 'border-linea'}`}>
                    <span className={`font-syne font-extrabold text-3xl sm:text-4xl block leading-none ${isFeatured ? 'text-bruma' : 'text-grafito'}`}>
                      {formatGs(pkg.price)}
                    </span>
                    <span className={`text-xs mt-1.5 block ${isFeatured ? 'text-bruma/70' : 'text-pizarra'}`}>
                      Precio cerrado · {pkg.revisions}
                    </span>
                  </div>

                  {/* Feature List: check salvia, on fiordo text bruma */}
                  <ul className={`space-y-3 mb-8 text-sm ${isFeatured ? 'text-bruma' : 'text-grafito'}`}>
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-salvia shrink-0 mt-0.5 stroke-current" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA Button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isFeatured ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                >
                  <span>Quiero esta web</span>
                  {isFeatured ? <Zap className="w-4 h-4 fill-none stroke-current" /> : <ArrowRight className="w-4 h-4" />}
                </a>

              </div>
            );
          })}
        </div>

        {/* Nota aclaratoria sobre dominio y hosting */}
        <p className="text-xs text-pizarra mb-6 px-1 leading-relaxed">
          * Dominio .com incluido por 1 año si aún no tienes uno. Si ya tienes dominio, el precio no cambia: no hay descuento por traer el tuyo.
        </p>

        {/* Commercial Payment Terms Box */}
        <div className="w-full bg-nieve rounded-[24px] p-6 sm:p-8 border border-linea flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-suave">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-salvia-100 flex items-center justify-center text-salvia shrink-0">
              <Receipt className="w-6 h-6 stroke-current fill-none" />
            </div>
            <div>
              <span className="text-xs text-fiordo uppercase tracking-wider block font-semibold mb-1">
                Cómo se paga
              </span>
              <p className="text-sm sm:text-base text-grafito">
                <strong className="font-bold text-fiordo">Se paga en 2 partes:</strong> 50% al empezar y 50% al entregar. Los plazos cuentan desde que me envías todos los materiales (textos, logo y fotos).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-pizarra shrink-0 bg-arena px-3.5 py-2 rounded-full border border-linea">
            <span className="w-2 h-2 rounded-full bg-salvia"></span>
            <span>Con contrato y factura electrónica</span>
          </div>
        </div>

      </div>
    </section>
  );
};
