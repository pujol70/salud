/* Comportamiento del sitio principal. Los datos de contacto salen de config.js. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var gs = new Intl.NumberFormat("es-PY");
  var fmt = function (n) { return "Gs " + gs.format(n); };

  function waLink(msg) {
    return "https://wa.me/" + S.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  }

  /* ---------- Medición (GA4 opcional) ---------- */
  if (S.ga4) {
    var g = document.createElement("script");
    g.async = true; g.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4;
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", S.ga4);
  }
  function track(name, params) { if (window.gtag) window.gtag("event", name, params || {}); }

  /* ---------- Datos de contacto ---------- */
  $$("[data-brand]").forEach(function (el) { el.textContent = S.nombre; });
  $$("[data-phone]").forEach(function (el) { el.textContent = S.whatsappVisible; });
  $$("[data-ruc]").forEach(function (el) { el.textContent = S.ruc; });
  $$("[data-email]").forEach(function (el) {
    el.textContent = S.email;
    if (el.tagName === "A") el.href = "mailto:" + S.email;
  });
  $$("[data-mailto]").forEach(function (el) { el.href = "mailto:" + S.email; });
  $$("[data-wa]").forEach(function (el) {
    el.href = waLink(el.getAttribute("data-wa"));
    el.target = "_blank"; el.rel = "noopener";
  });
  $$("[data-social]").forEach(function (el) {
    var url = S[el.getAttribute("data-social")];
    if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener"; } else { el.parentElement.hidden = true; }
  });
  var y = $("#year"); if (y) y.textContent = new Date().getFullYear();
  document.title = document.title.replace("[MARCA]", S.nombre);

  /* ---------- Clics medidos ---------- */
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-track]");
    if (t) track(t.getAttribute("data-track"), { label: t.getAttribute("data-label") || t.textContent.trim().slice(0, 40) });
  });

  /* ---------- Navegación ---------- */
  var nav = $(".nav"), toggle = $(".nav__toggle"), links = $(".nav__links");
  var onScroll = function () { nav.classList.toggle("is-scrolled", window.scrollY > 8); };
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
      toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) { links.classList.remove("is-open"); toggle.setAttribute("aria-expanded", "false"); }
    });
  }
  // Enlace activo según la sección visible
  var map = {};
  $$('.nav__links a[href^="#"]').forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var a = map[en.target.id];
        if (a && en.isIntersecting) {
          $$(".nav__links a.is-active").forEach(function (x) { x.classList.remove("is-active"); });
          a.classList.add("is-active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    Object.keys(map).forEach(function (id) { var s = document.getElementById(id); if (s) spy.observe(s); });

    /* ---------- Animación de entrada ---------- */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal").forEach(function (el, i) {
      var sib = el.parentElement.querySelectorAll(":scope > .reveal");
      el.style.setProperty("--d", (Array.prototype.indexOf.call(sib, el) % 4) * 90 + "ms");
      io.observe(el);
    });
  } else {
    $$(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Cotizador (lee los precios de las tarjetas) ---------- */
  var selP = $("#q-proyecto"), selM = $("#q-plan");
  if (selP && selM) {
    var proyectos = $$(".plan[data-key]").map(function (c) {
      return { key: c.dataset.key, name: c.dataset.name, price: +c.dataset.price, free: true };
    });
    proyectos.push({ key: "rescate", name: "Rescate de web existente", price: 400000, free: false });
    var planes = $$(".care__card[data-key]").map(function (c) {
      return { key: c.dataset.key, name: c.dataset.name, price: +c.dataset.price };
    });
    selP.innerHTML = proyectos.map(function (p) {
      return '<option value="' + p.key + '">' + p.name + " · " + fmt(p.price) + "</option>";
    }).join("");
    selM.innerHTML = '<option value="none">Sin mantenimiento por ahora</option>' + planes.map(function (p) {
      return '<option value="' + p.key + '">' + p.name + " · " + fmt(p.price) + "/mes</option>";
    }).join("");
    selP.value = "profesional"; selM.value = "pro";

    var outInit = $("#q-inicial"), outMes = $("#q-mensual"), outNote = $("#q-nota"), outBtn = $("#q-wa");
    var calc = function () {
      var p = proyectos.filter(function (x) { return x.key === selP.value; })[0];
      var m = planes.filter(function (x) { return x.key === selM.value; })[0];
      outInit.innerHTML = fmt(p.price) + " <small>IVA incl.</small>";
      var msg = "Hola, quiero cotizar: " + p.name + " (" + fmt(p.price) + ")";
      if (m) {
        outMes.textContent = fmt(m.price) + " por mes";
        outNote.textContent = p.free ? "El primer mes de mantenimiento es gratis. Se cobra desde el segundo mes, con contrato mínimo de 6 meses."
                                      : "Contrato mínimo de 6 meses. Cobro por adelantado.";
        msg += " con el plan de mantenimiento " + m.name + " (" + fmt(m.price) + "/mes)";
      } else {
        outMes.textContent = "Sin cuota mensual";
        outNote.textContent = "Puedes sumar el mantenimiento más adelante.";
      }
      outBtn.href = waLink(msg + ". ¿Podemos hablar?");
      outBtn.target = "_blank"; outBtn.rel = "noopener";
    };
    selP.addEventListener("change", function () {
      if (selP.value === "rescate" && selM.value === "none") selM.value = "pro";
      calc();
    });
    selM.addEventListener("change", calc);
    calc();
  }

  /* ---------- Formulario de auditoría ---------- */
  var form = $("#form-auditoria");
  if (form) {
    var status = $(".form-status", form);
    var setStatus = function (cls, text) { status.className = "form-status " + cls; status.textContent = text; };
    var rules = {
      nombre: function (v) { return v.trim().length >= 2; },
      negocio: function (v) { return v.trim().length >= 2; },
      rubro: function (v) { return v !== ""; },
      whatsapp: function (v) { return v.replace(/\D/g, "").length >= 8; }
    };
    Object.keys(rules).forEach(function (n) {
      var inp = form.elements[n];
      inp.addEventListener("input", function () {
        if (inp.closest(".field").classList.contains("has-error") && rules[n](inp.value)) {
          inp.closest(".field").classList.remove("has-error"); inp.removeAttribute("aria-invalid");
        }
      });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.elements.empresa && form.elements.empresa.value) return; // trampa anti-spam
      var bad = null;
      Object.keys(rules).forEach(function (n) {
        var inp = form.elements[n], ok = rules[n](inp.value);
        inp.closest(".field").classList.toggle("has-error", !ok);
        if (!ok) { inp.setAttribute("aria-invalid", "true"); bad = bad || inp; } else inp.removeAttribute("aria-invalid");
      });
      if (bad) { bad.focus(); setStatus("is-err", "Revisa los campos marcados y vuelve a enviar."); return; }

      var d = {
        nombre: form.elements.nombre.value.trim(), negocio: form.elements.negocio.value.trim(),
        rubro: form.elements.rubro.value, web: form.elements.web.value.trim(),
        whatsapp: form.elements.whatsapp.value.trim(), mensaje: form.elements.mensaje.value.trim()
      };
      var msg = "Hola, quiero la auditoría gratuita de mi web.\n" +
        "Nombre: " + d.nombre + "\nNegocio: " + d.negocio + " (" + d.rubro + ")\n" +
        (d.web ? "Web o Instagram: " + d.web + "\n" : "") +
        "Mi WhatsApp: " + d.whatsapp + (d.mensaje ? "\nMensaje: " + d.mensaje : "");
      track("form_auditoria_enviado", { rubro: d.rubro });

      if (S.formEndpoint) {
        var btn = $('button[type="submit"]', form); btn.disabled = true;
        fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); form.reset(); setStatus("is-ok", "Recibido. Te escribo por WhatsApp en menos de 24 horas."); })
          .catch(function () { setStatus("is-err", "No se pudo enviar. Escríbeme directo por WhatsApp o a " + S.email + "."); })
          .then(function () { btn.disabled = false; });
      } else {
        window.open(waLink(msg), "_blank", "noopener");
        setStatus("is-ok", "Se abrió WhatsApp con tus datos. Envía el mensaje y te respondo en menos de 24 horas. Si no se abrió, escríbeme a " + S.email + ".");
      }
    });
  }
})();
