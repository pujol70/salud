/* Comportamiento de las páginas de demo. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // "Quiero una web así" abre tu WhatsApp real
  $$("[data-wa]").forEach(function (el) {
    el.href = "https://wa.me/" + S.whatsapp + "?text=" + encodeURIComponent(el.getAttribute("data-wa"));
    el.target = "_blank"; el.rel = "noopener";
  });

  // Avisos de demo
  var toast = document.createElement("div");
  toast.className = "toast"; toast.setAttribute("role", "status");
  document.body.appendChild(toast);
  var timer;
  function say(msg) {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(timer); timer = setTimeout(function () { toast.classList.remove("is-on"); }, 4200);
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-demo]");
    if (t) { e.preventDefault(); say(t.getAttribute("data-demo")); }
  });
  $$("form[data-demo-form]").forEach(function (f) {
    f.addEventListener("submit", function (e) {
      e.preventDefault();
      say("Es una demo: en tu web real, este formulario te llega por correo o WhatsApp.");
    });
  });

  // Animación de entrada
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    $$(".reveal").forEach(function (el) { io.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("is-in"); }); }

  // Filtros de la inmobiliaria
  var fTipo = $("#f-tipo"), fZona = $("#f-zona"), fPrecio = $("#f-precio");
  if (fTipo) {
    var props = $$(".prop"), empty = $(".empty");
    var apply = function () {
      var n = 0, max = +fPrecio.value || Infinity;
      props.forEach(function (p) {
        var ok = (!fTipo.value || p.dataset.tipo === fTipo.value) &&
                 (!fZona.value || p.dataset.zona === fZona.value) &&
                 (+p.dataset.precio <= max);
        p.hidden = !ok; if (ok) n++;
      });
      empty.classList.toggle("is-on", n === 0);
      $("#count").textContent = n + (n === 1 ? " propiedad" : " propiedades");
    };
    [fTipo, fZona, fPrecio].forEach(function (s) { s.addEventListener("change", apply); });
    $("#f-reset").addEventListener("click", function () { fTipo.value = fZona.value = fPrecio.value = ""; apply(); });
    apply();
  }
})();
