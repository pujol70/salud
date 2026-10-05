# Ajustes del sitio para Claude Code

Documento de trabajo para aplicar en `sitio-react/` (React + Vite + Tailwind). Los datos comerciales viven en `src/siteData.ts`.
Estado: **solo especificación. Nada de esto está aplicado todavía.**

## Reglas para Claude Code

1. **No inventes nada.** Si falta un dato o una decisión, marca el punto como `[PENDIENTE]` y pregunta al usuario antes de escribirlo en el sitio.
2. Español neutro con tuteo. **Sin voseo** ("sabés", "contame", "recibí", "podés", "tenés"...).
3. Todos los precios se muestran **en guaraníes con IVA incluido**.
4. No cambies la paleta nórdica, las fuentes (Syne e Inter), la foto del hero ni el pie de página ("Contacto | Políticas").
5. La marca sigue siendo **ECRISTIA** de forma provisional. Se cambia solo en `siteData.ts` (constante `BRAND`) y en `index.html`.
6. No menciones herramientas de IA en el sitio. El usuario decidió que no hace falta.
7. Antes de entregar: `npm run build`, `npx tsc --noEmit`, y revisar a 320, 390, 768, 1024 y 1280 px que no haya desplazamiento horizontal.

## 1. Decisiones comerciales cerradas

| Tema | Decisión |
|---|---|
| Tarifa por hora | Gs 225.000 **con IVA incluido** (neto: Gs 204.545). Ajustable más adelante. |
| Facturación | En guaraníes, factura electrónica. |
| Planes de mantenimiento | Esencial (1 h), Pro (2 h), Crecimiento (5 h). Precios actuales **se mantienen**: Gs 250.000, 450.000 y 950.000 al mes. |
| Hosting y dominio | Incluidos (1 año) solo en los 3 tipos de web. Los planes de mantenimiento **no** los incluyen: el cliente ya debe tener hosting y dominio. |
| Primer mes gratis | Si contrata una web, el primer mes del plan que le corresponde: Presencia con Esencial, Profesional con Pro, Tienda con Crecimiento. |
| Contrato de mantenimiento | 6 meses, con renovación automática por otros 6 meses. Pasados los primeros 6 meses, el cliente puede cancelar cuando quiera con 30 días de preaviso. |
| Mora | Interés moratorio sobre el saldo vencido y suspensión del servicio al mes sin pago (texto en la sección 3). |
| Pedidos de cambios | Por formulario web (que abre WhatsApp) y por WhatsApp. |
| Tecnologías que se mantienen | WordPress, Shopify y código a medida. |
| Complementos | Vigilancia de competencia como complemento. Newsletter solo a pedido. |
| Reporte de Salud Digital | Se integra en los planes Pro (versión Base) y Crecimiento (versión ampliada). No se vende suelto a clientes Esencial: deben pasar a Pro. |

## 2. Cambios en el sitio

### A. Datos y textos (`src/siteData.ts` y componentes)

- **A1. Plan Esencial.**
  - Cambiar "30 minutos de cambios al mes" por **"1 hora de cambios al mes"**.
  - Quitar "Hosting y certificado de seguridad (SSL)".
  - Cambiar "Actualizaciones de WordPress y plugins" por "Actualizaciones de tu web (WordPress, Shopify o código a medida)".
- **A2. Requisito de los 3 planes.** Mostrar "Requiere que tu web ya tenga hosting y dominio propios" en la sección Mantenimiento (nota bajo las tarjetas), en el cotizador cuando se elija un plan, y en Políticas.
- **A3. Informe en Pro.** Cambiar "Informe mensual de visitas y consultas" por "Informe mensual de salud digital: visitas, Google y redes". `[PENDIENTE]` No prometer "consultas" hasta que el usuario decida cómo se miden (por ejemplo, con un evento de clic en el botón de WhatsApp).
- **A4. Informe en Crecimiento.** Añadir "Informe mensual ampliado: incluye las búsquedas que te traen visitas y, si tienes anuncios, sus resultados". Revisar que no se solape con "Ajustes de SEO local cada mes".
- **A5. Pregunta frecuente de hosting (`faq-3`).** Quitar la frase "Pasado el primer año, el hosting sigue con un plan de mantenimiento", que contradice la decisión. `[PENDIENTE]` El usuario definirá más adelante qué decir después del primer año (puede afiliarse a un proveedor de hosting con comisión). No escribas nada sobre eso. Repetir el cambio en el bloque de datos para Google de `index.html`.
- **A6. Pregunta frecuente de contrato (`faq-contrato`).** Ampliar con: "Los planes de mantenimiento duran 6 meses y se renuevan solos. Después de los primeros 6 meses puedes cancelar cuando quieras avisando con 30 días de anticipación." Repetir en `index.html`.
- **A7. Franja de condiciones del mantenimiento.**
  - "Contrato mínimo de 6 meses" pasa a "Contrato de 6 meses, con renovación automática".
  - Añadir "Cancelas con 30 días de aviso".
- **A8. Sección Complementos (nueva, bajo Mantenimiento).**
  - Vigilancia de competencia con 2, 4 o 6 competidores.
  - Newsletter "a pedido", con cotización por WhatsApp.
  - Precios de referencia en la sección 4. `[PENDIENTE]` El usuario debe confirmar si se publican esos precios o solo "cotiza por WhatsApp".
  - Cada complemento lleva su botón de WhatsApp con mensaje precargado, como los planes.
- **A9. Nueva página de pedidos de cambios (`/pedir-cambio`).**
  - Formulario con nombre, sitio web, qué cambio necesitas, si el sitio está caído (sí o no) y WhatsApp.
  - Al enviar, abre WhatsApp con los datos escritos, igual que el formulario de contacto actual. Sin servidor.
  - `[PENDIENTE]` ¿Dónde se enlaza? No va en el pie de página. Propuesta: desde Políticas, en un apartado "Cómo pedir cambios".
- **A10. Cotizador.** Mostrar el requisito de hosting y dominio al elegir un plan. El resto no cambia.

### B. Políticas (`src/pages/Politicas.tsx`)

Reemplazar el apartado "Mantenimiento mensual" y añadir los siguientes (textos en la sección 3).

## 3. Textos listos para Políticas

**Mantenimiento mensual**
> El mantenimiento se paga por adelantado cada mes, el día 5. Las horas de cambios que no uses no se acumulan al mes siguiente. Si contratas una web, el primer mes del plan de mantenimiento que le corresponde es gratis: Esencial con Web Presencia, Pro con Web Profesional y Crecimiento con Tienda online. Los planes de mantenimiento no incluyen hosting ni dominio: tu web ya debe tenerlos.

**Duración, renovación y cancelación**
> El mantenimiento dura 6 meses y se renueva automáticamente por otros 6 meses. Pasados los primeros 6 meses, puedes cancelar cuando quieras avisándome con 30 días de anticipación, por WhatsApp o por correo.

**Pagos atrasados**
> Si un pago se atrasa, se cobra un interés moratorio del 24% anual, calculado por día sobre el saldo vencido y sin capitalizar, dentro de los límites que fija la ley (Ley 489/95, art. 44, modificada por la Ley 2339/03, o la norma que la reemplace). Si pasa un mes sin pago, el servicio se suspende hasta regularizar la deuda.

**Cómo pedir cambios**
> Puedes pedir cambios con el formulario de esta página o por WhatsApp. Cada pedido queda registrado antes de ejecutarse.

Notas para quien revise el texto de mora:
- La ley no fija una tasa única. Pone un tope: el interés moratorio no puede superar el pactado, el punitorio adicional no puede pasar del 30% del moratorio, no se capitalizan intereses, y es usuraria la tasa que excede en 30% el promedio de créditos de consumo que publica el BCP cada mes. El último tope que se encontró (prensa) fue 30,17% anual en guaraníes para octubre.
- El 24% anual es una elección por debajo de ese tope, no un dato de la ley. Debe validarlo el contador o el abogado.
- El sitio del BCP cita ahora la Ley 7609/26 (art. 240). No se pudo leer. `[PENDIENTE]` Confirmar cuál norma rige.
- `[PENDIENTE]` Consultar con el contador cómo se factura el interés y si lleva IVA.

## 4. Números

Con la tarifa de Gs 225.000 por hora (IVA incluido) y los tiempos de los manuales internos. La rutina mensual (≈ 45 min) es una estimación.

**Planes actuales (precios sin cambios).** Rendimiento si el cliente usa todo el cupo:

| Plan | Horas de trabajo | Precio (con IVA) | Por hora, con IVA | Por hora, sin IVA |
|---|---|---|---|---|
| Esencial | ≈ 1,75 | 250.000 | ≈ 143.000 | ≈ 130.000 |
| Pro | ≈ 3,9 | 450.000 | ≈ 116.000 | ≈ 106.000 |
| Crecimiento | ≈ 7,5 (más landing y SEO local) | 950.000 | ≈ 127.000 | ≈ 115.000 |

La meta es Gs 204.545 por hora sin IVA. Los planes quedan por debajo. Se mantienen por decisión del usuario; conviene medir horas reales a los 60 o 90 días.

**Complementos (precios de referencia, IVA incluido).** Cálculo: horas × Gs 225.000, redondeado a Gs 5.000.

| Complemento | Horas | Referencia |
|---|---|---|
| Vigilancia, 2 competidores | 1,5 | Gs 340.000 |
| Vigilancia, 4 competidores | 3 | Gs 675.000 |
| Vigilancia, 6 competidores | 5 | Gs 1.125.000 |
| Newsletter, 1 edición mensual | 1,25 | Gs 280.000 |
| Newsletter, 1 edición con más contenido | 1,75 | Gs 395.000 |
| Newsletter, 2 ediciones al mes | 4,2 | Gs 950.000 |

El Reporte de Salud Digital suelto (referencia: Gs 250.000, 395.000 y 620.000) no se vende a clientes Esencial.

## 5. Pendientes que Claude Code debe consultar, no resolver

1. Nombre definitivo de la marca y dominio `.com`. Después, `og:url`, dirección canónica e imagen para compartir.
2. Texto sobre hosting y dominio después del primer año (y posible afiliación con comisión, que pediría una línea de aclaración en Políticas).
3. Si los precios de los complementos se publican.
4. Dónde se enlaza `/pedir-cambio`.
5. Validación legal de la cláusula de mora y del contrato definitivo.
6. Cómo se mide "consultas" en el informe.
7. Cobertura exacta del mantenimiento para Shopify y código a medida (los manuales internos solo cubren WordPress).
8. Texto de "Quién soy" y el detalle de la foto del hero.

## 6. Criterios de aceptación

- [ ] `npm run build` y `npx tsc --noEmit` sin errores.
- [ ] Ningún texto con voseo (buscar: sabés, podés, tenés, contame, recibí, avisame, escribíme).
- [ ] Ningún texto menciona IA.
- [ ] El plan Esencial dice "1 hora" y no menciona hosting en ningún lugar de la oferta de mantenimiento.
- [ ] Los datos para Google de `index.html` coinciden con las preguntas frecuentes visibles.
- [ ] Sin desplazamiento horizontal a 320, 390, 768, 1024 y 1280 px.
- [ ] El pie de página sigue siendo solo "Contacto | Políticas".
