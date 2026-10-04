import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { StatsStrip } from './components/StatsStrip';
import { Diagnostic } from './components/Diagnostic';
import { ServicesBento } from './components/ServicesBento';
import { PricingPackages } from './components/PricingPackages';
import { MaintenanceSection } from './components/MaintenanceSection';
import { EstimatorCalculator } from './components/EstimatorCalculator';
import { Methodology } from './components/Methodology';
import { TargetAudienceAndDemos } from './components/TargetAudienceAndDemos';
import { PilotProgram } from './components/PilotProgram';
import { FAQ } from './components/FAQ';
import { AuditForm } from './components/AuditForm';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { DentalClinicDemo } from './demos/DentalClinicDemo';
import { RealEstateDemo } from './demos/RealEstateDemo';

export default function App() {
  // Support both browser pathname and hash / in-memory navigation
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path === '/demo/clinica' || path === '/demo/inmobiliaria') {
        return path;
      }
      const hash = window.location.hash;
      if (hash === '#/demo/clinica' || hash === '#demo-clinica') return '/demo/clinica';
      if (hash === '#/demo/inmobiliaria' || hash === '#demo-inmobiliaria') return '/demo/inmobiliaria';
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/demo/clinica' || path === '/demo/inmobiliaria') {
        setCurrentPath(path);
      } else {
        const hash = window.location.hash;
        if (hash === '#/demo/clinica' || hash === '#demo-clinica') setCurrentPath('/demo/clinica');
        else if (hash === '#/demo/inmobiliaria' || hash === '#demo-inmobiliaria') setCurrentPath('/demo/inmobiliaria');
        else setCurrentPath('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    setCurrentPath(path);
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Render Demos if path matches
  if (currentPath === '/demo/clinica') {
    return (
      <div className="min-h-screen bg-[#0f172a] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white">
        <DentalClinicDemo onBack={() => navigateTo('/')} />
      </div>
    );
  }

  if (currentPath === '/demo/inmobiliaria') {
    return (
      <div className="min-h-screen bg-[#111827] text-white font-sans selection:bg-amber-500 selection:text-slate-900">
        <RealEstateDemo onBack={() => navigateTo('/')} />
      </div>
    );
  }

  // Main Landing Page
  return (
    <div className="min-h-screen bg-[#111827] text-[#D1D5DB] font-sans selection:bg-[#F97316] selection:text-[#111827]">
      {/* Navigation */}
      <Header onNavigateHome={() => navigateTo('/')} />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero & Value Proposition */}
        <Hero />

        {/* 2. Key Reality Check Metrics (No fake claims) */}
        <StatsStrip />

        {/* 3. Diagnostic / Problems solved */}
        <Diagnostic />

        {/* 4. Services (Bento Grid) */}
        <ServicesBento />

        {/* 5. Pricing Packages */}
        <PricingPackages />

        {/* 6. Continuous Maintenance & Support */}
        <MaintenanceSection />

        {/* 7. Interactive Estimator / Cotizador */}
        <EstimatorCalculator />

        {/* 8. Methodology */}
        <Methodology />

        {/* 9. Target Audience & Interactive Demos */}
        <TargetAudienceAndDemos onNavigateToDemo={(route: string) => navigateTo(route)} />

        {/* 10. Pilot Program */}
        <PilotProgram />

        {/* 11. Frequently Asked Questions */}
        <FAQ />

        {/* 12. Free Audit Form */}
        <AuditForm />
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Floating WhatsApp button */}
      <FloatingWhatsApp />
    </div>
  );
}
