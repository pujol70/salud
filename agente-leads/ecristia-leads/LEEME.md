# ECRISTIA Leads

App local para Windows. Escribes el rubro, la ciudad y la cantidad, pulsas **Buscar** y Claude Code busca y califica negocios que podrían contratar una web. El resultado queda en un Excel dentro de la carpeta `leads`, con un borrador de mensaje en "usted" para cada negocio.

**La app no contacta a nadie: los mensajes los envías tú, a mano.**

## Contenido

| Archivo | Para qué |
|---|---|
| `iniciar.cmd` | Abre la app en el navegador (doble clic) |
| `app/` | La app: servidor local, pantalla y generador del Excel |
| `.claude/agents/buscador-leads.md` | El agente: reglas, puntaje y formato |
| `.claude/settings.json` | Permisos para que Claude Code trabaje sin pedir confirmación |
| `tools/revisar-web.js` | Revisa la web de cada negocio: si carga, https, versión para celular, WhatsApp, año del copyright y contactos publicados |
| `tools/buscar-places.ps1` | Consulta a Google Places API (New), solo si marcas la casilla |
| `leads/` | Excel generados, `historial.csv` y `no-contactar.csv` |
| `ejecutar-semanal.cmd` | Búsqueda semanal automática: 15 clínicas, 10 inmobiliarias, 5 otros |

## 1. Requisitos (una sola vez)

1. **Claude Code** instalado, actualizado y con sesión iniciada. Para comprobarlo, abre una terminal y escribe `claude --version`. Para actualizarlo: `claude update`.
2. **Node.js LTS**. Descárgalo de https://nodejs.org, instálalo con las opciones por defecto y comprueba con `node -v` en una terminal nueva.
3. Copia la carpeta `ecristia-leads` donde quieras, por ejemplo `C:\Proyectos\ecristia-leads`.
4. **Marca la carpeta como confiable** para Claude Code. Abre una terminal dentro de la carpeta (en el Explorador: clic derecho en un espacio vacío > «Abrir en Terminal»), escribe `claude` y responde «Yes, proceed» a la pregunta de confianza. Sal con `/exit`. Sin este paso, Claude Code ignora los permisos del proyecto y la búsqueda no funciona. Si mueves la carpeta a otro lugar, repítelo.

## 2. Usar la app

1. Haz doble clic en `iniciar.cmd`. La primera vez instala lo necesario (tarda un minuto) y abre el navegador en `http://127.0.0.1:5178`.
2. Completa:
   - **Rubro**: por ejemplo "Clínicas odontológicas".
   - **Ciudad o zona**: por ejemplo "San Lorenzo".
   - **Cantidad**: leads A o B que quieres en el Excel, de 1 a 30.
   - **Usar Google Places**: viene desmarcada. Desmarcada, busca solo con el buscador web. Marcada, usa tu clave de Google Cloud (punto 3).
3. Pulsa **Buscar**. Una búsqueda puede tardar varios minutos; la pantalla muestra el avance. Puedes cancelarla.
4. Al terminar, pulsa **Abrir Excel**. El archivo queda en `leads\`, con nombre `AAAA-MM-DD_HHMM_rubro_ciudad.xlsx`.
5. Mientras uses la app, deja abierta la ventana negra. Para salir, ciérrala.

Solo corre una búsqueda a la vez. La app solo acepta conexiones desde tu propia computadora.

## 3. Google Places (opcional)

Solo hace falta si vas a marcar la casilla.

1. En la consola de Google Cloud, elige o crea un proyecto.
2. Habilita **Places API (New)**.
3. Crea una **clave de API** y restríngela a Places API (New).
4. Configura una **alerta de presupuesto** y un **límite diario de cuota** para esa API. El costo depende de la cantidad de consultas y de los campos pedidos; revisa la página de precios de Google Maps Platform antes de empezar.
5. Guarda la clave en Windows (nunca en archivos del proyecto). En una terminal:
   ```
   setx GOOGLE_PLACES_API_KEY "TU_CLAVE"
   ```
6. Cierra la app y vuelve a abrirla con `iniciar.cmd` para que tome la clave. Si marcas la casilla sin clave, la app te avisa y no busca.
7. Para probar la clave sin la app, en PowerShell dentro de la carpeta:
   ```
   powershell -NoProfile -ExecutionPolicy Bypass -File tools\buscar-places.ps1 -Consulta "clinica odontologica Asuncion" -Cantidad 5
   ```
   Debe crear `leads\places-ultima-busqueda.json` con 5 negocios.

## 4. El Excel

- Hoja **Leads**: un negocio por fila, ordenados por puntaje. Columnas: estado, categoría, puntaje, negocio, rubro, ciudad, dirección, teléfono, correo, web, Instagram, fuente del contacto, reseñas y calificación de Google (solo con Places), servicio sugerido, motivo, señales, borrador de mensaje, notas con las fuentes, fecha y place_id.
- La columna **Estado** empieza en "nuevo" y tiene una lista para elegir: nuevo, contactado, respondió, reunión, propuesta, ganado, perdido.
- Hoja **Revisados C**: los negocios que el agente revisó pero no llegaron a 50 puntos, con el motivo y las fuentes. Sirven para ver qué buscó y por qué los descartó.
- Hoja **Búsqueda**: los datos que usaste y los totales.
- En la hoja Leads van las categorías A (70 puntos o más) y B (50 a 69). Solo los A y B se anotan en el historial.
- Si el agente no devuelve ningún negocio, no se crea el Excel y la pantalla muestra su resumen.

### Puntaje

| Señal | Puntos |
|---|---|
| Sin web propia (verificado con 2 búsquedas) | +40 |
| Web caída o con error | +40 |
| Web sin versión para celular | +25 |
| Web sin https | +15 |
| Web sin enlace a WhatsApp | +10 |
| Copyright de 2022 o anterior | +10 |
| Clínica, consultorio o inmobiliaria | +10 |
| Varias sedes | +10 |
| Varios profesionales o agentes | +10 |
| Reseñas en Google (solo con Places): 100 o más / 30 a 99 | +10 / +5 |
| Teléfono o WhatsApp comercial publicado | +15 |
| Correo comercial publicado | +5 |

Necesidad suma como máximo 50, capacidad 30 y contacto 20. Ejemplo: una clínica sin web propia y con teléfono publicado suma 65 (B).

### Con o sin Google Places

Sin Google Places, el agente usa el buscador web y directorios. Encuentra menos negocios por consulta que Google Maps, por eso hace muchas consultas por especialidad y por barrio. Con Google Places recibe listas de negocios activos con teléfono, web y reseñas, que es lo más parecido a lo que ves en Google Maps.

## 5. Repetidos y "no contactar"

- Cada negocio guardado se anota en `leads\historial.csv`. Las búsquedas siguientes no lo vuelven a incluir (compara place_id, nombre, web y teléfono).
- Si alguien pide no ser contactado, agrégalo a `leads\no-contactar.csv` ese mismo día, con este formato:
  ```
  negocio;place_id;web;telefono;fecha;motivo
  ```
- Si borras `historial.csv`, las búsquedas pueden repetir negocios ya enviados.

## 6. Primera búsqueda (calibración)

Haz una búsqueda chica sin Google Places, por ejemplo "Clínicas odontológicas", "Asunción", 5. Revisa cada fila del Excel: datos, puntaje y mensaje. Si algo está mal, corrige `.claude/agents/buscador-leads.md` antes de pasar a búsquedas grandes.

El agente usa el modelo Sonnet. Cada búsqueda consume uso de tu plan de Claude.

## 7. Búsqueda semanal automática

1. Haz doble clic en `ejecutar-semanal.cmd` una vez y verifica que genera los Excel en `leads\`. Los errores quedan en `leads\registro.log`.
2. Prográmala con el Programador de tareas, o con este comando (lunes 08:00; cambia la ruta):
   ```
   schtasks /Create /SC WEEKLY /D MON /ST 08:00 /TN "ECRISTIA leads" /TR "C:\Proyectos\ecristia-leads\ejecutar-semanal.cmd"
   ```
   La computadora debe estar encendida y con sesión iniciada a esa hora.
3. Para cambiar rubros, ciudades o cantidades, edita las líneas `node app\buscar.js ...` del archivo. Para usar Google Places en una línea, agrega `--places` antes de `2>>`.

## Reglas de uso

- Revisa cada fila antes de escribir. El agente puede equivocarse aunque cite la fuente.
- Escribe solo a contactos comerciales publicados por el negocio. Nunca envíos masivos.
- Las condiciones de Google Maps Platform limitan cuánto tiempo puedes guardar los datos que vienen de Places (el `place_id` sí se puede guardar). Revísalas. El agente prefiere los datos de contacto de la web oficial del negocio y marca cuándo vienen de Google.
- No escribas a nadie hasta tener tu web publicada: el mensaje ofrece una revisión y remite a tu sitio.

## Si algo falla

| Mensaje | Qué hacer |
|---|---|
| No se encontró Node.js | Instala Node.js LTS y vuelve a abrir `iniciar.cmd` |
| No se encontró Claude Code | Instala Claude Code y comprueba `claude --version` en una terminal |
| Claude Code no tiene la sesión iniciada o la sesión venció | En una terminal: `claude`, luego `/login`, inicia sesión y sal con `/exit` |
| Claude Code no confía todavía en esta carpeta | Haz el paso 4 de la sección 1 |
| Claude Code terminó con error | Abre una terminal, ejecuta `claude` y revisa que tengas sesión iniciada. Mira `leads\registro.log` |
| Claude Code terminó sin crear el archivo de resultados | Mira `leads\registro.log`; suele ser un permiso que faltó o una búsqueda interrumpida |
| Falta la variable GOOGLE_PLACES_API_KEY | Haz el punto 3 o desmarca la casilla |
| La app ya está abierta | Ya hay una ventana de la app; usa esa o ciérrala y vuelve a abrir |
