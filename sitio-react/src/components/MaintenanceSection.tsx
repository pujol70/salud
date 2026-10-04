import React from 'react';
import { Check, ShieldAlert, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { siteData, formatGs } from '../siteData';

export const MaintenanceSection: React.FC = () => {
  // Only display the 3 active subscription plans
  const plans = siteData.maintenancePlans.filter(p => p.id !== 'sin_plan');

  return (
    <section id="mantenimiento" className="w-full py-20 lg:py-24 bg-bruma">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-salvia-100 text-fiordo text-xs uppercase tracking-wider font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5 text-fiordo stroke-current fill-none" />
            <span>Mantenimiento</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-grafito tracking-tight">
            Tu web, <span className="text-fiordo">cuidada</span> todos los meses
          </h2>
          <p className="mt-3 text-base sm:text-lg text-pizarra">
            Una web sin mantenimiento se desactualiza, se vuelve lenta y es más fácil de atacar. Con un plan mensual, yo me ocupo.
          </p>
        </div>

        {/* 3 Maintenance Plan Cards: nieve, 24px */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => {
            const isFeatured = plan.isFeatured;
            const waUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(plan.whatsappMessage)}`;

            return (
              <div
                key={plan.id}
                className={`relative rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 bg-nieve border ${
                  isFeatured
                    ? 'border-fiordo shadow-suave lg:-translate-y-2'
                    : 'border-linea card-hover-glow shadow-suave'
                }`}
              >
                {/* Floating "MÁS CONVENIENTE" badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-arcilla text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-suave">
                    {plan.badge || 'MÁS CONVENIENTE'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span></span>
                    {isFeatured ? (
                      <Zap className="w-4 h-4 text-fiordo stroke-current fill-none" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-pizarra" />
                    )}
                  </div>

                  <h3 className="font-syne font-bold text-2xl text-grafito mb-2">
                    {plan.name === 'Pro' ? 'Plan Pro' : plan.name}
                  </h3>

                  <p className="text-sm text-pizarra mb-6 min-h-[44px]">
                    {plan.subtitle}
                  </p>

                  <div className="mb-6 pb-6 border-b border-linea">
                    <div className="flex items-baseline gap-2">
                      <span className="font-syne font-extrabold text-3xl sm:text-4xl text-grafito">
                        {formatGs(plan.price)}
                      </span>
                      <span className="text-sm text-pizarra">/ mes</span>
                    </div>
                  </div>

                  {/* Feature list: check salvia */}
                  <ul className="space-y-3 mb-8 text-sm text-grafito">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-salvia shrink-0 mt-0.5 stroke-current" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={isFeatured ? "btn-primary w-full text-center" : "btn-secondary w-full text-center"}
                >
                  <span>Elegir {plan.name === 'Pro' ? 'Plan Pro' : plan.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

              </div>
            );
          })}
        </div>

        {/* Clear Terms Ticker */}
        <div className="p-4 sm:p-5 bg-nieve rounded-[24px] border border-linea flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-center text-xs sm:text-sm text-pizarra shadow-suave">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fiordo"></span>
            <span>{siteData.commercialRules.maintenanceMinTerm}</span>
          </span>
          <span className="text-linea hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fiordo"></span>
            <span>{siteData.commercialRules.billingDay}</span>
          </span>
          <span className="text-linea hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fiordo"></span>
            <span>{siteData.commercialRules.hoursRule}</span>
          </span>
          <span className="text-linea hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2 text-fiordo font-bold">
            <Sparkles className="w-3.5 h-3.5 stroke-current fill-none" />
            <span>{siteData.commercialRules.firstMonthFreeCondition}</span>
          </span>
        </div>

      </div>
    </section>
  );
};
