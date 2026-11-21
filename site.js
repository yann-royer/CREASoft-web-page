// Menu sur petit écran
(function () {
  var bouton = document.querySelector(".menu-bouton");
  var menu = document.getElementById("menu");
  if (!bouton || !menu) return;
  bouton.addEventListener("click", function () {
    var ouvert = menu.classList.toggle("ouvert");
    bouton.setAttribute("aria-expanded", ouvert ? "true" : "false");
  });
  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      menu.classList.remove("ouvert");
      bouton.setAttribute("aria-expanded", "false");
    }
  });
})();

// Élévation d'exemple : un mur droit de 7,20 m sur trois rangs de 60 cm.
// Les joints du rang 2 sont décalés d'un demi-bloc par rapport aux rangs 1 et 3.
(function () {
  var zone = document.querySelector("[data-elevation]");
  if (!zone) return;
  var svg = zone.querySelector("[data-svg]");
  var legende = zone.querySelector("[data-legende]");
  var NS = "http://www.w3.org/2000/svg";

  var TYPES = {
    "180": { nom: "180-60", dims: "180 × 60 × 60 cm", couleur: "#c62828", ergots: 6 },
    "90": { nom: "90-60", dims: "90 × 60 × 60 cm", couleur: "#ef6c00", ergots: 3 }
  };
  var RANGS = [
    [180, 180, 180, 180],
    [90, 180, 180, 180, 90],
    [180, 180, 180, 180]
  ];

  var X0 = 110, ECHELLE = 0.85, H = 60 * ECHELLE, BAS = 232;

  function el(nom, attrs, parent) {
    var n = document.createElementNS(NS, nom);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    (parent || svg).appendChild(n);
    return n;
  }

  var groupes = [];
  RANGS.forEach(function (rang, i) {
    var g = el("g", { "data-rang": String(i + 1) });
    var y = BAS - (i + 1) * H;
    var x = X0;
    rang.forEach(function (longueur) {
      var w = longueur * ECHELLE;
      var t = TYPES[String(longueur)];
      el("rect", { x: x, y: y, width: w, height: H, fill: t.couleur, "fill-opacity": ".72", "class": "bloc" }, g);
      // ergots sur le dessus du rang du haut
      if (i === RANGS.length - 1) {
        var pas = w / t.ergots;
        for (var e = 0; e < t.ergots; e++) {
          var cx = x + pas * (e + 0.5);
          el("path", { d: "M" + (cx - 8) + " " + y + "l3 -8h10l3 8z", "class": "ergot-e" }, g);
        }
      }
      x += w;
    });
    var etiquette = el("text", { x: X0 + 720 * ECHELLE + 12, y: y + H / 2 + 5, "class": "etiquette-rang" }, g);
    etiquette.textContent = "Rang " + (i + 1);
    groupes.push(g);
  });

  // Cote de longueur sous le mur
  var yc = BAS + 26, xa = X0, xb = X0 + 720 * ECHELLE;
  el("line", { x1: xa, y1: BAS + 6, x2: xa, y2: yc + 8, "class": "cote" });
  el("line", { x1: xb, y1: BAS + 6, x2: xb, y2: yc + 8, "class": "cote" });
  el("line", { x1: xa + 8, y1: yc, x2: xb - 8, y2: yc, "class": "cote" });
  el("path", { d: "M" + xa + " " + yc + "l10 -5v10z", "class": "fleche" });
  el("path", { d: "M" + xb + " " + yc + "l-10 -5v10z", "class": "fleche" });
  var mx = (xa + xb) / 2;
  el("rect", { x: mx - 34, y: yc - 13, width: 68, height: 26, rx: 13, "class": "bulle" });
  var tl = el("text", { x: mx, y: yc + 5, "text-anchor": "middle", "class": "bulle-texte" });
  tl.textContent = "7,20 m";

  // Cote de hauteur à gauche
  var xh = X0 - 50, ya = BAS, yb = BAS - 3 * H;
  el("line", { x1: X0 - 6, y1: ya, x2: xh - 8, y2: ya, "class": "cote" });
  el("line", { x1: X0 - 6, y1: yb, x2: xh - 8, y2: yb, "class": "cote" });
  el("line", { x1: xh, y1: ya - 8, x2: xh, y2: yb + 8, "class": "cote" });
  el("path", { d: "M" + xh + " " + ya + "l-5 -10h10z", "class": "fleche" });
  el("path", { d: "M" + xh + " " + yb + "l-5 10h10z", "class": "fleche" });
  var my = (ya + yb) / 2;
  el("rect", { x: xh - 30, y: my - 13, width: 60, height: 26, rx: 13, "class": "bulle" });
  var th = el("text", { x: xh, y: my + 5, "text-anchor": "middle", "class": "bulle-texte" });
  th.textContent = "1,80 m";

  // Les bulles de cote s'adaptent à la taille du texte (plus grand sur téléphone)
  var bulles = [];
  svg.querySelectorAll(".bulle").forEach(function (r) {
    bulles.push({ r: r, t: r.nextSibling, cx: +r.getAttribute("x") + +r.getAttribute("width") / 2,
      cy: +r.getAttribute("y") + +r.getAttribute("height") / 2 });
  });
  function ajusterBulles() {
    bulles.forEach(function (b) {
      var taille = parseFloat(getComputedStyle(b.t).fontSize) || 14;
      var w = b.t.getComputedTextLength() + taille * 1.4, h = taille * 1.85;
      b.r.setAttribute("x", b.cx - w / 2); b.r.setAttribute("width", w);
      b.r.setAttribute("y", b.cy - h / 2); b.r.setAttribute("height", h); b.r.setAttribute("rx", h / 2);
      b.t.setAttribute("y", b.cy + taille * 0.36);
    });
  }
  ajusterBulles();
  window.addEventListener("resize", ajusterBulles);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajusterBulles);

  function compter(choix) {
    var total = {};
    RANGS.forEach(function (rang, i) {
      if (choix !== "tous" && String(i + 1) !== choix) return;
      rang.forEach(function (l) { total[l] = (total[l] || 0) + 1; });
    });
    return total;
  }

  function afficher(choix) {
    groupes.forEach(function (g) {
      var actif = choix === "tous" || g.getAttribute("data-rang") === choix;
      Array.prototype.forEach.call(g.querySelectorAll(".bloc, .ergot-e"), function (n) {
        n.classList.toggle("estompe", !actif);
      });
    });
    var total = compter(choix);
    var html = "";
    var somme = 0;
    ["180", "90"].forEach(function (k) {
      if (!total[k]) return;
      somme += total[k];
      html += '<span><i style="background:' + TYPES[k].couleur + 'b8"></i>' +
        TYPES[k].nom + " (" + TYPES[k].dims + ") : <b>" + total[k] + "</b></span>";
    });
    html += "<span>Total" + (choix === "tous" ? " du mur" : " du rang " + choix) + " : <b>" + somme + " blocs</b></span>";
    legende.innerHTML = html;
    Array.prototype.forEach.call(zone.querySelectorAll("[data-rang].puce, .puce"), function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-rang") === choix ? "true" : "false");
    });
  }

  zone.addEventListener("click", function (e) {
    var b = e.target.closest(".puce");
    if (b) afficher(b.getAttribute("data-rang"));
  });
  afficher("tous");
})();
