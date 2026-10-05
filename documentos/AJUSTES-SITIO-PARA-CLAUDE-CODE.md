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
| Hosting y dominio | Incluidos (1 año) solo en los 3 tipos de web. Después los paga el cliente: el dominio una vez al año, el hosting una vez al año o cada mes. El cliente paga directo al proveedor, o el usuario lo paga y se lo refactura **más IVA**. Los planes de mantenimiento **no incluyen su costo**; pueden incluir su administración. |
| Informe de Pro y Crecimiento | Cuenta visitas, Google, redes y toques en el botón de WhatsApp (evento de Google Analytics configurado al entregar cada web). **Confirmado.** |
| Pedidos de cambios | Página `/pedido-de-cambios`, enlazada desde Políticas. **Confirmado.** |
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
- **A2. Hosting y dominio en los planes de mantenimiento.** Los planes **no incluyen el costo** de hosting ni de dominio. Mostrar en la sección Mantenimiento (nota bajo las tarjetas), en el cotizador cuando se elija un plan, y en Políticas:
  > El mantenimiento no incluye hosting ni dominio: su costo lo pagas tú. El dominio se paga una vez al año. El hosting se paga una vez al año o, si el plan del proveedor lo permite, cada mes. Puedes pagarlo directamente al proveedor, o yo lo pago y te lo paso: en ese caso te lo facturo por el monto del proveedor más IVA. Tu web debe tener hosting y dominio activos; si quieres, los administro dentro de tu plan de mantenimiento.

  Esta es la **única excepción** a la regla "precios con IVA incluido": el hosting y el dominio que el usuario paga y refactura se facturan **más IVA**. `[PENDIENTE]` No escribas montos: dependen del proveedor y del plan que se elija. Consultar con el contador cómo se refactura (por ejemplo, el comprobante del proveedor).
- **A3. Informe en Pro.** Cambiar "Informe mensual de visitas y consultas" por "Informe mensual de salud digital: visitas, Google, redes y toques en el botón de WhatsApp". El informe cuenta cuántas personas tocaron el botón de WhatsApp (no cuántos mensajes llegaron). Para eso, al entregar cada web hay que configurar en Google Analytics un evento de clic en ese botón. `[PENDIENTE]` El usuario debe confirmar esta propuesta; mientras tanto no escribas la palabra "consultas".
- **A4. Informe en Crecimiento.** Añadir "Informe mensual ampliado: incluye las búsquedas que te traen visitas y, si tienes anuncios, sus resultados". Revisar que no se solape con "Ajustes de SEO local cada mes".
- **A5. Pregunta frecuente de hosting (`faq-3`).** Reemplazar la respuesta por:
  > Todos los tipos de web incluyen hosting por 1 año. El dominio .com también, si todavía no tienes uno. Si ya tienes dominio, puedes usarlo, pero el precio es el mismo. Pasado el primer año, el hosting y el dominio los pagas tú: el dominio se paga una vez al año, y el hosting una vez al año o cada mes, según el plan del proveedor. Puedes pagarlo directamente al proveedor, o yo lo pago y te lo paso, facturado por el monto del proveedor más IVA. Si quieres, yo los administro dentro de tu plan de mantenimiento, pero su costo lo pagas tú.

  Repetir el cambio en el bloque de datos para Google de `index.html`, y en Políticas, apartado "Dominio y hosting" (añadir las mismas frases finales). `[PENDIENTE]` La afiliación con un proveedor de hosting (comisión) no se menciona todavía.
- **A6. Pregunta frecuente de contrato (`faq-contrato`).** Ampliar con: "Los planes de mantenimiento duran 6 meses y se renuevan solos. Después de los primeros 6 meses puedes cancelar cuando quieras avisando con 30 días de anticipación." Repetir en `index.html`.
- **A7. Franja de condiciones del mantenimiento.**
  - "Contrato mínimo de 6 meses" pasa a "Contrato de 6 meses, con renovación automática".
  - Añadir "Cancelas con 30 días de aviso".
- **A8. Sección Complementos (nueva, bajo Mantenimiento).**
  - Vigilancia de competencia con 2, 4 o 6 competidores.
  - Newsletter "a pedido", con cotización por WhatsApp.
  - **Los precios se publican** (decisión del usuario): los de la sección 4, con IVA incluido. Newsletter se marca "A pedido".
  - Cada complemento lleva su botón de WhatsApp con mensaje precargado, como los planes.
- **A9. Página "Pedir cambios en mi web" (`/pedido-de-cambios`).** No es un cambio de plan. Es el formulario que usa un cliente que **ya tiene mantenimiento** para pedir un cambio en su web: cambiar un texto o un precio, subir una foto, corregir un error. Cada pedido gasta las horas de su plan.
  - Campos: nombre, sitio web, qué cambio necesitas, si el sitio está caído (sí o no) y WhatsApp.
  - Al enviar, abre WhatsApp con los datos escritos, igual que el formulario de contacto actual. Sin servidor.
  - `[PENDIENTE]` ¿Dónde se enlaza? No va en el pie de página. Propuesta: desde Políticas, en un apartado "Cómo pedir cambios".
- **A11. Sección "Quién soy" (nueva).** Texto en la sección 3. Ubicación propuesta: después de "Cómo trabajo". Sin foto por ahora (no hay foto del usuario; no uses una imagen genérica). El texto no debe incluir cifras, universidades ni clientes que el usuario no haya dado. `[PENDIENTE]` Si el usuario quiere sumar años de experiencia, estudios o una foto, los aporta él.
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
> Si tienes un plan de mantenimiento, puedes pedir cambios en tu web con el formulario "Pedir cambios en mi web" o por WhatsApp. Cada pedido queda registrado antes de ejecutarse.

**Dominio y hosting** (añadir al apartado existente)
> Pasado el primer año, el hosting y el dominio los pagas tú. El dominio se paga una vez al año; el hosting, una vez al año o cada mes, según el plan del proveedor. Puedes pagarlo directamente al proveedor, o yo lo pago y te lo paso: en ese caso te lo facturo por el monto del proveedor más IVA. Si quieres, también los administro dentro de tu plan de mantenimiento, pero su costo lo pagas tú.

**Quién soy** (sección nueva del sitio, no de Políticas)
> Soy Erasmo Cristia, ingeniero en telecomunicaciones y especialista en sistemas informáticos. Llevo muchos años diseñando y desarrollando sitios web con herramientas avanzadas, y hoy hago webs para clínicas, inmobiliarias, estudios y comercios de Asunción y Gran Asunción.
>
> Yo mismo hablo contigo, diseño y programo tu web, y después me encargo de mantenerla. Sabes desde el principio cuánto pagas y cuándo la recibes, y puedes escribirme por WhatsApp cuando necesites algo.

Versión corta (para una tarjeta o para el hero, si hace falta):
> Ingeniero en telecomunicaciones y especialista en sistemas informáticos, con muchos años diseñando y desarrollando webs.

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

**Complementos (precios publicados en el sitio, IVA incluido).** Cálculo: horas × Gs 225.000, redondeado a Gs 5.000.

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

1. Nombre definitivo de la marca y dominio `.com` (por ahora se mantiene ECRISTIA). Después, `og:url`, dirección canónica e imagen para compartir.
2. Proveedor de hosting y dominio, montos y posible afiliación con comisión (que pediría una línea de aclaración en Políticas). Cómo se refactura el costo con IVA: consultar al contador.
3. Validación legal de la cláusula de mora y del contrato definitivo.
4. Cobertura exacta del mantenimiento para Shopify y código a medida (los manuales internos solo cubren WordPress).
5. Si el usuario quiere añadir a "Quién soy" años de experiencia, estudios o una foto.
6. Foto del hero: se deja la actual hasta ver el sitio publicado.

## 6. Criterios de aceptación

- [ ] `npm run build` y `npx tsc --noEmit` sin errores.
- [ ] Ningún texto con voseo (buscar: sabés, podés, tenés, contame, recibí, avisame, escribíme).
- [ ] Ningún texto menciona IA.
- [ ] El plan Esencial dice "1 hora" y no menciona hosting en ningún lugar de la oferta de mantenimiento.
- [ ] Los datos para Google de `index.html` coinciden con las preguntas frecuentes visibles.
- [ ] Sin desplazamiento horizontal a 320, 390, 768, 1024 y 1280 px.
- [ ] El pie de página sigue siendo solo "Contacto | Políticas".
- [ ] "Quién soy" no contiene cifras, estudios ni clientes que el usuario no haya dado.
- [ ] Los precios de los complementos coinciden con la sección 4.
- [ ] El texto de hosting y dominio dice "más IVA" solo en el caso en que el usuario lo paga y lo refactura; el resto de los precios sigue con IVA incluido.
