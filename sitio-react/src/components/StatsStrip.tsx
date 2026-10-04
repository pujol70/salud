import React from 'react';

const stats = [
  {
    value: '7 a 20',
    title: 'días hábiles de entrega',
    text: 'Te digo la fecha de entrega antes de empezar.',
  },
  {
    value: '3',
    title: 'tipos de web con precio publicado',
    text: 'Sabes cuánto vas a pagar desde la primera conversación.',
  },
  {
    value: '3',
    title: 'planes de mantenimiento mensual',
    text: 'Incluyen copias de seguridad, actualizaciones y horas de cambios cada mes.',
  },
];

export const StatsStrip: React.FC = () => {
  return (
    <section className="w-full bg-arena py-10 border-y border-linea">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="p-6 sm:p-8 rounded-[24px] bg-nieve border border-linea card-hover-glow shadow-suave"
            >
              <div className="font-syne font-extrabold text-4xl sm:text-5xl text-arcilla tracking-tight">
                {stat.value}
              </div>
              <p className="font-syne font-bold text-lg text-grafito mt-2">{stat.title}</p>
              <p className="text-sm text-pizarra mt-1">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
