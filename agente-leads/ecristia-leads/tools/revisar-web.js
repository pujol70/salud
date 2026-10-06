// Revisa una o varias webs y devuelve datos técnicos verificables en JSON.
// Uso: node tools/revisar-web.js https://ejemplo.com.py otra-web.com
// No guarda nada: solo imprime el resultado.

const LIMITE_BYTES = 2 * 1024 * 1024;
const TIEMPO_MS = 20000;
const AGENTE =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

async function descargar(url) {
  const r = await fetch(url, {
    redirect: 'follow',
    signal: AbortSignal.timeout(TIEMPO_MS),
    headers: { 'User-Agent': AGENTE, 'Accept-Language': 'es-PY,es;q=0.9' },
  });
  let html = '';
  if (r.body) {
    const lector = r.body.getReader();
    const dec = new TextDecoder('utf-8');
    let total = 0;
    for (;;) {
      const { done, value } = await lector.read();
      if (done) break;
      total += value.length;
      html += dec.decode(value, { stream: true });
      if (total > LIMITE_BYTES) {
        await lector.cancel();
        break;
      }
    }
  }
  return { codigo: r.status, url_final: r.url, html };
}

const unicos = (lista) => [...new Set(lista.filter(Boolean))];

function analizar(html) {
  const anios = [];
  const reAnio = /(?:©|&copy;|&#169;|copyright|derechos reservados)[^0-9]{0,60}((?:19|20)\d{2})(?:\s*(?:-|–|&ndash;)\s*((?:19|20)\d{2}))?/gi;
  for (const m of html.matchAll(reAnio)) {
    anios.push(Number(m[1]));
    if (m[2]) anios.push(Number(m[2]));
  }
  const enlaces = [...html.matchAll(/href\s*=\s*["']([^"']+)["']/gi)].map((m) => m[1].trim());
  const titulo = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1];
  const generador = (html.match(/<meta[^>]+name=["']?generator["']?[^>]*content=["']([^"']+)["']/i) || [])[1];

  return {
    titulo: titulo ? titulo.replace(/\s+/g, ' ').trim().slice(0, 150) : '',
    viewport: /<meta[^>]+name\s*=\s*["']?viewport/i.test(html),
    whatsapp: /wa\.me\/|api\.whatsapp\.com|web\.whatsapp\.com|whatsapp:\/\//i.test(html),
    anio_copyright: anios.length ? Math.max(...anios) : null,
    generador: generador || '',
    telefonos: unicos(
      enlaces.filter((h) => /^tel:/i.test(h)).map((h) => decodeURIComponent(h.slice(4)).replace(/[^\d+]/g, ''))
    ).slice(0, 5),
    whatsapp_numeros: unicos(
      enlaces.map((h) => (h.match(/wa\.me\/(\d+)|whatsapp\.com\/send\/?\?phone=(\d+)/i) || []).slice(1).find(Boolean))
    ).slice(0, 5),
    correos: unicos(
      enlaces.filter((h) => /^mailto:/i.test(h)).map((h) => decodeURIComponent(h.slice(7)).split('?')[0].trim())
    ).slice(0, 5),
    instagram: enlaces.find((h) => /instagram\.com\/[^/?#]+/i.test(h)) || '',
    facebook: enlaces.find((h) => /facebook\.com\/[^/?#]+/i.test(h)) || '',
  };
}

async function revisar(entrada) {
  const base = { url: entrada, carga: false, codigo: null, url_final: '', https: false, error: '' };
  const intentos = /^https?:\/\//i.test(entrada) ? [entrada] : ['https://' + entrada, 'http://' + entrada];
  for (const url of intentos) {
    try {
      const d = await descargar(url);
      const carga = d.codigo >= 200 && d.codigo < 400;
      return {
        ...base,
        carga,
        codigo: d.codigo,
        url_final: d.url_final,
        https: d.url_final.startsWith('https://'),
        ...(carga ? analizar(d.html) : {}),
      };
    } catch (e) {
      base.error = (e.cause && (e.cause.code || e.cause.message)) || e.message;
    }
  }
  return base;
}

(async () => {
  const urls = process.argv.slice(2).filter((u) => !u.startsWith('-'));
  if (!urls.length) {
    console.error('Uso: node tools/revisar-web.js <url> [url2 ...]');
    process.exit(1);
  }
  const resultados = [];
  for (const u of urls.slice(0, 10)) resultados.push(await revisar(u));
  console.log(JSON.stringify(resultados, null, 1));
})();
