# Respaldo del Tema Oscuro (Dark Theme) - ECRISTIA

Este directorio contiene una copia completa, exacta y sin modificaciones del estado actual del código del sitio web antes de la aplicación de cambios de tema o estilo. 

- **Propósito:** Respaldo de seguridad del código fuente, configuración, componentes, textos y estilos del tema oscuro actual.
- **Aislamiento:** Esta carpeta `/backup-tema-oscuro/` no está importada en ninguna parte de la aplicación activa ni forma parte del bundle de compilación en producción.
- **Archivos respaldados:** 27 archivos (15 componentes, 2 demos interactivas, estilos globales, configuración de build y Tailwind, index.html, datos comerciales y metadatos).

---

## 1. Inventario de Archivos Respaldados

| Categoría | Archivos |
| :--- | :--- |
| **Entrada y Configuración** | `index.html`, `vite.config.ts`, `package.json`, `tsconfig.json`, `metadata.json`, `README.md` |
| **Punto de Entrada & Estilos** | `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/siteData.ts` |
| **Componentes Principales (15)** | `src/components/Header.tsx`<br>`src/components/Hero.tsx`<br>`src/components/StatsStrip.tsx`<br>`src/components/ServicesBento.tsx`<br>`src/components/PricingPackages.tsx`<br>`src/components/MaintenanceSection.tsx`<br>`src/components/Diagnostic.tsx`<br>`src/components/EstimatorCalculator.tsx`<br>`src/components/PilotProgram.tsx`<br>`src/components/TargetAudienceAndDemos.tsx`<br>`src/components/Methodology.tsx`<br>`src/components/FAQ.tsx`<br>`src/components/AuditForm.tsx`<br>`src/components/Footer.tsx`<br>`src/components/FloatingWhatsApp.tsx` |
| **Demos Interactivas (2)** | `src/demos/DentalClinicDemo.tsx`<br>`src/demos/RealEstateDemo.tsx` |

---

## 2. Tabla Maestra de Colores del Sitio Web

Esta tabla documenta todos los valores hexadecimales, clases Tailwind y canales RGBA utilizados en el sitio web actual, especificando su rol visual, contexto de uso (fondo, tarjeta, texto, botón, borde, icono) y los archivos en los que están presentes.

### 2.1 Colores Principales del Sistema (Tema Oscuro ECRISTIA)

| Valor Hex / Clase | Nombre / Función | Dónde se usa | Archivos donde aparece |
| :--- | :--- | :--- | :--- |
| `#111827` | **Canvas Oscuro (Fondo base)** | Fondo principal del sitio, fondos de sección, pie de página, texto sobre botones primarios naranja, fondo de inputs | `src/index.css`, `index.html`, `src/App.tsx`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/StatsStrip.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx`, `src/components/FloatingWhatsApp.tsx` |
| `#1F2937` | **Surface Oscuro Elevado** | Fondo de tarjetas (`cards`), contenedor de inputs, bloques de cálculo, tarjetas de testimonios y pasos | `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Header.tsx` |
| `#374151` | **Surface Intermedio / Botón Secundario** | Fondo de botón secundario (`.btn-secondary`), bordes activos, tarjetas secundarias, selector de tabs | `src/index.css`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx` |
| `#404b5c` | **Surface Hover** | Estado hover de botones secundarios y chips interactivos | `src/index.css`, `src/components/ServicesBento.tsx`, `src/components/EstimatorCalculator.tsx` |
| `#4B5563` | **Borde Estándar (Slate Border)** | Bordes de tarjetas, líneas separadoras, contorno de inputs, botones secundarios | `src/index.css`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/StatsStrip.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx` |
| `#6B7280` | **Gris Medio (Texto Muted)** | Números de paso, iconos decorativos tenues, textos auxiliares, separadores discretos | `src/components/StatsStrip.tsx`, `src/components/ServicesBento.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx` |
| `#9CA3AF` | **Gris Claro (Texto Secundario)** | Texto descriptivo secundario, subtítulos, etiquetas mono (`// TAG`), placeholders, iconos | `src/index.css`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/StatsStrip.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx` |
| `#D1D5DB` | **Gris Lectura (Texto Principal de Cuerpo)** | Texto de párrafos en `body`, listas de características, respuestas del FAQ, descripciones | `src/index.css`, `src/components/Hero.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx` |
| `#FFFFFF` / `text-white` | **Blanco Puro** | Títulos de nivel 1, 2 y 3, números de estadísticas, precios destacados, iconos activos | `src/index.css`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/StatsStrip.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx` |
| `#F9FAFB` | **Blanco Suave Frío** | Texto de botones secundarios (`.btn-secondary`), fondos en chips destacados | `src/index.css`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/MaintenanceSection.tsx` |
| `#F97316` | **Naranja Acento ECRISTIA (Brand Accent)** | Botón primario (`.btn-primary`), badges de precio, palabras destacadas en títulos, iconos de acento, bordes destacados, hover en enlaces | `src/index.css`, `index.html`, `src/components/Header.tsx`, `src/components/Hero.tsx`, `src/components/StatsStrip.tsx`, `src/components/ServicesBento.tsx`, `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/EstimatorCalculator.tsx`, `src/components/PilotProgram.tsx`, `src/components/TargetAudienceAndDemos.tsx`, `src/components/Methodology.tsx`, `src/components/FAQ.tsx`, `src/components/AuditForm.tsx`, `src/components/Footer.tsx`, `src/components/FloatingWhatsApp.tsx` |

---

### 2.2 Colores Semánticos y de Retroalimentación

| Valor Hex / Clase | Nombre / Función | Dónde se usa | Archivos donde aparece |
| :--- | :--- | :--- | :--- |
| `#10B981` | **Verde Esmeralda (Éxito / Incluido)** | Iconos de verificación (Checkmarks) de características incluidas en precios y planes, indicador de estado online de WhatsApp, badges de disponibilidad | `src/components/PricingPackages.tsx`, `src/components/MaintenanceSection.tsx`, `src/components/Diagnostic.tsx`, `src/components/PilotProgram.tsx`, `src/components/FloatingWhatsApp.tsx`, `src/components/EstimatorCalculator.tsx` |
| `#EF4444` | **Rojo Alerta (Error / Diagnóstico Crítico)** | Iconos de alerta en diagnóstico web, mensajes de error en validación de formularios, badges de problemas detectados | `src/components/Diagnostic.tsx`, `src/components/AuditForm.tsx` |
| `#F59E0B` / `bg-amber-500` | **Ámbar / Naranja Dorado (Atención / Calificación)** | Estrellas de puntuación, badges de advertencia moderada en auditoría técnica | `src/components/Diagnostic.tsx`, `src/components/AuditForm.tsx` |
| `#14B8A6` / `bg-cyan-500` | **Teal / Cian (Tecnología / Badge)** | Badges complementarios, acentos secundarios en servicios | `src/components/ServicesBento.tsx`, `src/components/TargetAudienceAndDemos.tsx` |
| `#0F172A` / `#0D131F` | **Negro Azulado Profundo** | Sombras pesadas de modales, fondo del backdrop de demos interactivas | `src/components/TargetAudienceAndDemos.tsx`, `src/components/FloatingWhatsApp.tsx` |
| `rgba(0,0,0,0.4)` | **Overlay Oscuro Semitransparente** | Fondo de superposición para ventanas modales y drawers | `src/components/TargetAudienceAndDemos.tsx`, `src/components/Header.tsx` |

---

### 2.3 Efectos de Luz, Sombras y Brillo (Glows RGBA)

| Valor RGBA | Función | Dónde se usa | Archivos donde aparece |
| :--- | :--- | :--- | :--- |
| `rgba(249, 115, 22, 0.5)` | **Borde Luminoso (Hover Glow)** | Efecto hover de contorno en tarjetas `.card-hover-glow` | `src/index.css` |
| `rgba(249, 115, 22, 0.15)` | **Sombra Luminosa Difusa (Card Halo)** | Difusión de sombra exterior en tarjetas `.card-hover-glow:hover` | `src/index.css` |
| `rgba(249, 115, 22, 0.25)` | **Glow de Botón Primario** | Sombra base del botón `.btn-primary` y anillos de foco | `src/index.css`, `src/components/Hero.tsx`, `src/components/PricingPackages.tsx` |
| `rgba(249, 115, 22, 0.4)` | **Glow Intenso de Botón (Hover)** | Resplandor del botón `.btn-primary:hover` | `src/index.css` |
| `rgba(249, 115, 22, 0.18)` | **Fondo Tenue de Badge** | Fondos sutiles translúcidos en badges y píldoras informativas | `src/components/Hero.tsx`, `src/components/PilotProgram.tsx` |
| `rgba(249, 115, 22, 0.35)` | **Borde de Badge Destacado** | Contorno luminoso de la tarjeta recomendada en Precios | `src/components/PricingPackages.tsx` |

---

### 2.4 Paletas de Color en Demos Interactivas

Las demos interactivas incrustadas en el sitio utilizan paletas temáticas propias para simular identidades visuales reales de clientes:

#### A. Demo Clínica Dental (`src/demos/DentalClinicDemo.tsx`)
| Valor Hex | Función en la Demo | Dónde se usa |
| :--- | :--- | :--- |
| `#006F64` / `#006B5F` | Verde azulado médico oscuro | Cabecera, botones de reserva de turno, títulos principales |
| `#0F3846` / `#164E63` | Azul petróleo profundo | Fondo de secciones secundarias, tarjetas médicas |
| `#6EF9E2` | Aguamarina menta brillante | Iconos de especialidad, acento y badges de tecnología dental |
| `#CCFBF1` / `#F0FDFA` | Menta suave y blanco dental | Fondos limpios de consulta, badges y chips de servicios |
| `#F2F4F6` / `#E2E8F0` | Grises clínicos claros | Bordes de tarjetas de doctores y divisores de horarios |
| `#41484B` / `#71787C` | Texto médico gris neutro | Párrafos y descripciones clínicas |

#### B. Demo Sector Inmobiliario (`src/demos/RealEstateDemo.tsx`)
| Valor Hex | Función en la Demo | Dónde se usa |
| :--- | :--- | :--- |
| `#B85D38` / `#994522` | Terracota / Teja cálido | Botones de agendar visita, precios de propiedades, acentos |
| `#201A18` / `#2A2421` | Carbón cálido tierra | Cabeceras de propiedades, fondos oscuros de lujo |
| `#55433C` / `#825430` | Marrón arcilla arquitectónico | Etiquetas de tipología (Casa / Dúplex / Terreno), bordes |
| `#F8EBE6` / `#F2E6E1` | Crema cálido de fondo | Fondo general de tarjetas de propiedades, fichas técnicas |
| `#DBC1B8` / `#E5DDD0` | Borde cálido sutil | Divisores de ambientes, contornos de inputs de búsqueda |
| `#FFB59A` / `#FFF8F6` | Blanco marfil y durazno claro | Fondo de tarjetas y estados seleccionados |

---

## 3. Comprobación y Verificación

1. Todos los archivos de código fuente, plantillas de texto, estilos CSS y configuraciones de compilación han sido respaldados íntegramente dentro de esta carpeta.
2. Ningún archivo fuera de `/backup-tema-oscuro/` ha sido modificado durante la creación de este respaldo.
3. El sitio web en producción compila con éxito (`npm run build` / `compile_applet`) y pasa sin advertencias (`tsc --noEmit` / `lint_applet`).
