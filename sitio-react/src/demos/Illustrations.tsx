import React from 'react';

/**
 * Ilustraciones simples (SVG propio) para las demos.
 * No dependen de imágenes externas ni de fotos reales.
 */

interface IllustrationProps {
  className?: string;
  label?: string;
}

/** Consultorio odontológico: ventana, sillón, lámpara y planta. */
export const ClinicIllustration: React.FC<IllustrationProps> = ({ className, label = 'Ilustración de un consultorio odontológico' }) => (
  <svg viewBox="0 0 400 300" className={className} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
    <rect width="400" height="300" fill="#E3F2F0" />
    <rect y="214" width="400" height="86" fill="#CBE0E3" />
    <rect y="210" width="400" height="6" fill="#B5D0D5" />
    {/* ventana */}
    <rect x="36" y="38" width="118" height="118" rx="6" fill="#BFE3EE" stroke="#0F3846" strokeWidth="5" />
    <line x1="95" y1="38" x2="95" y2="156" stroke="#0F3846" strokeWidth="4" />
    <line x1="36" y1="97" x2="154" y2="97" stroke="#0F3846" strokeWidth="4" />
    <circle cx="124" cy="68" r="14" fill="#FDE9A9" />
    <ellipse cx="62" cy="126" rx="20" ry="8" fill="#FFFFFF" opacity="0.85" />
    {/* cuadro con diente */}
    <rect x="176" y="46" width="52" height="42" rx="4" fill="#FFFFFF" stroke="#0F3846" strokeWidth="3" />
    <path d="M190 58c0-5 4-8 8-8 3 0 4 1 6 1s3-1 6-1c4 0 8 3 8 8 0 7-4 8-5 16-.4 3-3 3-4 0-1-4-2-7-5-7s-4 3-5 7c-1 3-3 3-4 0-1-8-5-9-5-16z" fill="#19A394" transform="translate(-5 -2) scale(1.1)" />
    {/* lámpara */}
    <line x1="268" y1="0" x2="268" y2="38" stroke="#5B7C8A" strokeWidth="5" />
    <line x1="268" y1="38" x2="236" y2="72" stroke="#5B7C8A" strokeWidth="5" />
    <ellipse cx="232" cy="78" rx="30" ry="10" fill="#FFFFFF" stroke="#5B7C8A" strokeWidth="3" />
    <polygon points="208,86 256,86 292,206 176,206" fill="#FFF3C4" opacity="0.38" />
    {/* sillón */}
    <ellipse cx="256" cy="262" rx="62" ry="9" fill="#0F3846" opacity="0.18" />
    <rect x="248" y="216" width="14" height="40" fill="#5B7C8A" />
    <rect x="212" y="252" width="88" height="10" rx="5" fill="#3B5A68" />
    <rect x="198" y="196" width="112" height="26" rx="13" fill="#19A394" />
    <rect x="300" y="138" width="30" height="92" rx="15" fill="#19A394" transform="rotate(14 315 184)" />
    <rect x="304" y="120" width="38" height="22" rx="11" fill="#0F7F73" transform="rotate(14 323 131)" />
    <rect x="176" y="204" width="30" height="10" rx="5" fill="#0F7F73" />
    {/* mueble */}
    <rect x="30" y="178" width="118" height="68" rx="6" fill="#DCEAEC" stroke="#B5D0D5" strokeWidth="3" />
    <line x1="89" y1="178" x2="89" y2="246" stroke="#B5D0D5" strokeWidth="3" />
    <circle cx="80" cy="212" r="3" fill="#5B7C8A" />
    <circle cx="98" cy="212" r="3" fill="#5B7C8A" />
    <rect x="46" y="162" width="22" height="16" rx="3" fill="#FFFFFF" stroke="#B5D0D5" strokeWidth="2" />
    {/* planta */}
    <rect x="352" y="232" width="26" height="36" rx="4" fill="#C9A98A" />
    <ellipse cx="365" cy="222" rx="10" ry="26" fill="#3E9B6B" transform="rotate(-24 365 222)" />
    <ellipse cx="365" cy="220" rx="10" ry="28" fill="#4FB07C" />
    <ellipse cx="365" cy="222" rx="10" ry="26" fill="#3E9B6B" transform="rotate(24 365 222)" />
  </svg>
);

/** Edificio residencial con torres y árboles. */
export const ResidentialIllustration: React.FC<IllustrationProps> = ({ className, label = 'Ilustración de un edificio residencial' }) => {
  const cols = [0, 1, 2];
  const rows = [0, 1, 2, 3, 4, 5];
  const lit = new Set(['1-1', '3-2', '4-0', '2-1', '5-2']);
  return (
    <svg viewBox="0 0 480 330" className={className} role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="inmo-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F6D9CC" />
          <stop offset="1" stopColor="#FFF4EE" />
        </linearGradient>
      </defs>
      <rect width="480" height="330" fill="url(#inmo-sky)" />
      <circle cx="400" cy="64" r="26" fill="#FBE3B5" />
      <ellipse cx="90" cy="60" rx="40" ry="12" fill="#FFFFFF" opacity="0.8" />
      <ellipse cx="130" cy="72" rx="30" ry="9" fill="#FFFFFF" opacity="0.7" />
      {/* edificio izquierdo */}
      <rect x="52" y="130" width="88" height="170" fill="#C98F6E" />
      {[0, 1, 2, 3].map((r) => [0, 1].map((c) => (
        <rect key={`l-${r}-${c}`} x={66 + c * 36} y={146 + r * 36} width="22" height="20" rx="2" fill="#FFF8F6" />
      )))}
      {/* torre central */}
      <rect x="162" y="40" width="130" height="262" fill="#D9B9A6" />
      <rect x="156" y="34" width="142" height="10" fill="#B85D38" />
      {rows.map((r) => cols.map((c) => (
        <rect key={`t-${r}-${c}`} x={178 + c * 38} y={58 + r * 38} width="24" height="22" rx="2" fill={lit.has(`${r}-${c}`) ? '#F5D39A' : '#FFF8F6'} />
      )))}
      <rect x="208" y="268" width="38" height="34" rx="3" fill="#8A5A44" />
      {/* edificio derecho */}
      <rect x="314" y="102" width="100" height="198" fill="#E8CDBE" />
      {[0, 1, 2, 3, 4].map((r) => [0, 1].map((c) => (
        <rect key={`r-${r}-${c}`} x={330 + c * 40} y={118 + r * 34} width="24" height="18" rx="2" fill="#FFF8F6" />
      )))}
      {/* suelo y árboles */}
      <rect y="300" width="480" height="30" fill="#A9B58C" />
      <rect x="20" y="268" width="8" height="34" fill="#7A5C46" />
      <circle cx="24" cy="260" r="24" fill="#6F9A64" />
      <rect x="436" y="272" width="8" height="30" fill="#7A5C46" />
      <circle cx="440" cy="264" r="22" fill="#7FAB72" />
    </svg>
  );
};

/** Ilustración pequeña para las tarjetas de propiedades. */
export const PropertyIllustration: React.FC<IllustrationProps & { type: string }> = ({ type, className, label }) => {
  if (type === 'casas') {
    return (
      <svg viewBox="0 0 160 100" className={className} role="img" aria-label={label ?? 'Ilustración de una casa'}>
        <rect x="14" y="84" width="132" height="6" rx="3" fill="#A9B58C" />
        <rect x="46" y="44" width="68" height="42" fill="#E8CDBE" />
        <polygon points="38,46 80,16 122,46" fill="#B85D38" />
        <rect x="72" y="60" width="16" height="26" rx="2" fill="#8A5A44" />
        <rect x="52" y="54" width="14" height="12" rx="2" fill="#FFF8F6" />
        <rect x="94" y="54" width="14" height="12" rx="2" fill="#FFF8F6" />
        <rect x="130" y="64" width="5" height="22" fill="#7A5C46" />
        <circle cx="132" cy="58" r="14" fill="#6F9A64" />
      </svg>
    );
  }
  if (type === 'penthouse') {
    return (
      <svg viewBox="0 0 160 100" className={className} role="img" aria-label={label ?? 'Ilustración de un penthouse'}>
        <rect x="14" y="88" width="132" height="6" rx="3" fill="#A9B58C" />
        <rect x="48" y="38" width="64" height="52" fill="#D9B9A6" />
        <rect x="40" y="22" width="80" height="18" rx="2" fill="#B85D38" />
        <rect x="46" y="26" width="68" height="10" rx="1" fill="#FFF8F6" opacity="0.85" />
        <line x1="40" y1="20" x2="120" y2="20" stroke="#8A5A44" strokeWidth="2" />
        {[0, 1].map((r) => [0, 1, 2].map((c) => (
          <rect key={`${r}-${c}`} x={56 + c * 18} y={48 + r * 18} width="10" height="11" rx="1.5" fill="#FFF8F6" />
        )))}
        <ellipse cx="80" cy="12" rx="22" ry="4" fill="#9CD3E0" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 160 100" className={className} role="img" aria-label={label ?? 'Ilustración de un edificio de departamentos'}>
      <rect x="14" y="88" width="132" height="6" rx="3" fill="#A9B58C" />
      <rect x="52" y="14" width="56" height="76" fill="#D9B9A6" />
      <rect x="48" y="10" width="64" height="6" fill="#B85D38" />
      {[0, 1, 2, 3].map((r) => [0, 1].map((c) => (
        <rect key={`${r}-${c}`} x={62 + c * 22} y={24 + r * 16} width="12" height="9" rx="1.5" fill="#FFF8F6" />
      )))}
      <rect x="74" y="72" width="12" height="18" rx="2" fill="#8A5A44" />
      <rect x="24" y="50" width="24" height="40" fill="#C98F6E" />
      <rect x="112" y="40" width="26" height="50" fill="#E8CDBE" />
    </svg>
  );
};
