import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { FloatingWhatsApp } from '../components/FloatingWhatsApp';

interface PoliticasProps {
  onNavigateHome: () => void;
  onNavigate: (path: string) => void;
}

export const Politicas: React.FC<PoliticasProps> = ({ onNavigateHome, onNavigate }) => {
  return (
    <div className="min-h-screen bg-bruma text-grafito font-sans selection:bg-arcilla selection:text-white flex flex-col justify-between">
      {/* Mismo menú superior */}
      <Header onNavigateHome={onNavigateHome} />

      {/* Contenido principal */}
      <main className="w-full flex-1 pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          
          {/* Enlace Volver al inicio */}
          <div className="mb-8">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-sm font-medium text-pizarra hover:text-fiordo hover:underline decoration-1 underline-offset-4 transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Volver al inicio</span>
            </button>
          </div>

          <h1 className="font-syne font-extrabold text-3xl sm:text-4xl text-grafito tracking-tight mb-6">
            Políticas
          </h1>

          {/* Contenido de Políticas */}
          <div className="bg-white rounded-2xl border border-linea p-8 sm:p-12 shadow-sm space-y-10">
            
            {/* 1. Pagos de proyectos */}
            <section className="space-y-3 border-b border-linea/60 pb-8">
              <h2 className="font-syne font-bold text-2xl text-fiordo tracking-tight">
                Pagos de proyectos
              </h2>
              <p className="text-grafito/85 leading-relaxed text-base">
                El proyecto se paga en dos partes: 50% al comenzar y 50% al entregar. Los precios están en guaraníes con IVA incluido.
              </p>
            </section>

            {/* Contrato */}
            <section className="space-y-3 border-b border-linea/60 pb-8">
              <h2 className="font-syne font-bold text-2xl text-fiordo tracking-tight">
                Contrato
              </h2>
              <p className="text-grafito/85 leading-relaxed text-base">
                Cuando apruebas el presupuesto, te envío un contrato simple. Puedes devolverlo firmado o confirmar tu aceptación por WhatsApp.
              </p>
            </section>

            {/* 2. Mantenimiento mensual */}
            <section className="space-y-3 border-b border-linea/60 pb-8">
              <h2 className="font-syne font-bold text-2xl text-fiordo tracking-tight">
                Mantenimiento mensual
              </h2>
              <p className="text-grafito/85 leading-relaxed text-base">
                El contrato tiene una duración mínima de 6 meses. El pago se realiza por adelantado, los días 5 de cada mes. Las horas de cambios no usadas no se acumulan al mes siguiente. Si contratas una web, el primer mes del plan de mantenimiento que le corresponde es gratis: Esencial con Web Presencia, Pro con Web Profesional y Crecimiento con Tienda online.
              </p>
            </section>

            {/* 3. Dominio y hosting */}
            <section className="space-y-3 border-b border-linea/60 pb-8">
              <h2 className="font-syne font-bold text-2xl text-fiordo tracking-tight">
                Dominio y hosting
              </h2>
              <p className="text-grafito/85 leading-relaxed text-base">
                Cada tipo de web incluye hosting por 1 año. El dominio .com se incluye por 1 año solo si todavía no tienes uno; si ya tienes tu propio dominio, no se aplica descuento.
              </p>
            </section>

            {/* 4. Privacidad */}
            <section className="space-y-3">
              <h2 className="font-syne font-bold text-2xl text-fiordo tracking-tight">
                Privacidad
              </h2>
              <p className="text-grafito/85 leading-relaxed text-base">
                Los datos que escribes en el formulario (nombre, negocio, rubro, web o Instagram, número de WhatsApp y mensaje) llegan a mí por WhatsApp y los uso solo para responder tu consulta. Este sitio no los guarda y no los comparto con terceros.
              </p>
            </section>

          </div>

        </div>
      </main>

      {/* Mismo footer */}
      <Footer onNavigate={onNavigate} />

      {/* Botón flotante de WhatsApp */}
      <FloatingWhatsApp />
    </div>
  );
};
