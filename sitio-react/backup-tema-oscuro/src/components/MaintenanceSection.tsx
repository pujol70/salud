import React from 'react';
import { Check, ShieldAlert, Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import { siteData, formatGs } from '../siteData';

export const MaintenanceSection: React.FC = () => {
  // Only display the 3 active subscription plans
  const plans = siteData.maintenancePlans.filter(p => p.id !== 'sin_plan');

  return (
    <section id="mantenimiento" className="w-full py-20 lg:py-24 bg-[#111827]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#F97316]/10 text-[#F97316] text-xs font-mono uppercase tracking-wider font-semibold mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>// MANTENIMIENTO CONTINUO & SOPORTE</span>
          </div>
          <h2 className="font-syne font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight">
            Tu web, <span className="text-[#F97316]">cuidada</span> todos los meses
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#9CA3AF]">
            Una web sin mantenimiento se desactualiza, se vuelve lenta y queda expuesta. Con un plan fijo, no tienes que pensar en eso.
          </p>
        </div>

        {/* 3 Maintenance Plan Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => {
            const isFeatured = plan.isFeatured;
            const waUrl = `${siteData.contact.whatsappLink}?text=${encodeURIComponent(plan.whatsappMessage)}`;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isFeatured
                    ? 'bg-[#374151] border-2 border-[#F97316] shadow-[0_0_32px_rgba(249,115,22,0.25)] lg:-translate-y-2'
                    : 'bg-[#374151] border border-[#4B5563] card-hover-glow'
                }`}
              >
                {/* Floating "MÁS CONVENIENTE" badge */}
                {isFeatured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F97316] text-[#111827] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-md">
                    {plan.badge || 'MÁS CONVENIENTE'}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-[#9CA3AF] uppercase tracking-wider">
                      {isFeatured ? '// RECOMENDADO' : '// PLAN MENSUAL'}
                    </span>
                    {isFeatured ? (
                      <Zap className="w-4 h-4 text-[#F97316] fill-current" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-[#9CA3AF]" />
                    )}
                  </div>

                  <h3 className="font-syne font-bold text-2xl text-white mb-2">
                    {plan.name === 'Pro' ? 'Plan Pro' : plan.name}
                  </h3>

                  <p className="text-sm text-[#D1D5DB] mb-6 min-h-[44px]">
                    {plan.subtitle}
                  </p>

                  <div className="mb-6 pb-6 border-b border-[#4B5563]/60">
                    <div className="flex items-baseline gap-2">
                      <span className="font-syne font-extrabold text-3xl sm:text-4xl text-white">
                        {formatGs(plan.price)}
                      </span>
                      <span className="text-sm font-mono text-[#9CA3AF]">/ mes</span>
                    </div>
                  </div>

                  {/* Feature list */}
                  <ul className="space-y-3 mb-8 text-sm text-[#D1D5DB]">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#F97316] shrink-0 mt-0.5" />
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
        <div className="p-4 sm:p-5 bg-[#1F2937] rounded-xl border border-[#4B5563] flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-center text-xs sm:text-sm font-mono text-[#9CA3AF]">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
            <span>{siteData.commercialRules.maintenanceMinTerm}</span>
          </span>
          <span className="text-[#4B5563] hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F97316]"></span>
            <span>{siteData.commercialRules.billingDay}</span>
          </span>
          <span className="text-[#4B5563] hidden sm:inline">•</span>
          <span className="inline-flex items-center gap-2 text-[#F97316] font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{siteData.commercialRules.firstMonthFreeCondition}</span>
          </span>
        </div>

      </div>
    </section>
  );
};
