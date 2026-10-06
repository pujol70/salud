# ecristia-leads: agente de búsqueda de clientes

Busca y califica negocios de Asunción y Gran Asunción (clínicas, inmobiliarias y otros) con Google Places y las webs de los negocios. Deja la lista en `leads/` con un borrador de mensaje en "usted". **No contacta a nadie: los mensajes los envías tú, a mano.**

## Contenido

| Archivo | Para qué |
|---|---|
| `.claude/agents/buscador-leads.md` | El agente: reglas, puntaje y formato |
| `.claude/commands/buscar-leads.md` | Comando `/buscar-leads rubro, zona, cantidad` |
| `.claude/settings.json` | Permisos para que trabaje sin pedir confirmación en cada paso |
| `tools/buscar-places.ps1` | Consulta a Google Places API (New) |
| `leads/PLANTILLA.csv` | Encabezado de las listas |
| `leads/no-contactar.csv` | Negocios que pidieron no ser contactados |
| `ejecutar-semanal.cmd` | Búsqueda semanal: 15 clínicas, 10 inmobiliarias, 5 otros |

## 1. Google Cloud (una sola vez)

1. En la consola de Google Cloud, elige o crea un proyecto.
2. Habilita **Places API (New)**.
3. Crea una **clave de API** y restríngela a Places API (New).
4. Configura una **alerta de presupuesto** y un **límite diario de cuota** para esa API. El costo depende de la cantidad de consultas y de los campos pedidos; revisa la página de precios de Google Maps Platform antes de empezar.
5. Guarda la clave en Windows (no en archivos del proyecto). En una terminal:
   ```
   setx GOOGLE_PLACES_API_KEY "TU_CLAVE"
   ```
   Cierra y vuelve a abrir la terminal y Claude Code para que tome la variable.

## 2. Instalar el proyecto

1. Copia la carpeta `ecristia-leads` donde quieras, por ejemplo `C:\Proyectos\ecristia-leads`.
2. Prueba el script en PowerShell, dentro de esa carpeta:
   ```
   powershell -NoProfile -ExecutionPolicy Bypass -File tools\buscar-places.ps1 -Consulta "clinica odontologica Asuncion" -Cantidad 5
   ```
   Debe crear `leads\places-ultima-busqueda.json` con 5 negocios. Si da error, copia el mensaje y revísalo antes de seguir.

## 3. Primera búsqueda (calibración)

1. Abre una terminal en la carpeta y ejecuta `claude`.
2. Escribe `/agents` y confirma que aparece `buscador-leads`.
3. Ejecuta una búsqueda chica:
   ```
   /buscar-leads clínicas odontológicas, Asunción, 5
   ```
4. Abre el CSV generado en `leads\` y revisa cada fila: datos, puntaje y mensaje. Si algo está mal, corrige el agente antes de pasar a búsquedas grandes.

Modelo: Sonnet (definido en el agente). Esfuerzo: medio; súbelo con `/effort` si los resultados vienen pobres.

## 4. Abrir los resultados en Excel

`Datos > Obtener datos > Desde texto/CSV`, elige el archivo, origen **UTF-8** y delimitador **punto y coma**. Si lo abres con doble clic, los acentos pueden verse mal.

## 5. Búsqueda semanal automática

1. Haz doble clic en `ejecutar-semanal.cmd` una vez y verifica que corre sin pedir permisos. El detalle queda en `leads\registro.log`.
2. Prográmala con el Programador de tareas, o con este comando (lunes 08:00; cambia la ruta):
   ```
   schtasks /Create /SC WEEKLY /D MON /ST 08:00 /TN "ECRISTIA leads" /TR "C:\Proyectos\ecristia-leads\ejecutar-semanal.cmd"
   ```
   La computadora debe estar encendida y con sesión iniciada a esa hora.

La cantidad de cada búsqueda es de leads A o B. El agente revisa hasta 3 veces esa cantidad de candidatos y se detiene.

## Reglas de uso

- Revisa cada fila antes de escribir. El agente puede equivocarse aunque cite la fuente.
- Escribe solo a contactos comerciales publicados por el negocio. Nunca envíos masivos.
- Si alguien pide no ser contactado, agrégalo a `leads\no-contactar.csv` ese mismo día.
- Actualiza la columna `estado` a mano: nuevo, contactado, respondió, reunión, propuesta, ganado, perdido.
- Las condiciones de Google Maps Platform limitan cuánto tiempo puedes guardar los datos que vienen de Places (el `place_id` sí se puede guardar). Revísalas. El agente prefiere los datos de contacto de la web oficial del negocio y marca cuándo vienen de Google.
- No escribas a nadie hasta tener tu web publicada: el mensaje ofrece una revisión y remite a tu sitio.
