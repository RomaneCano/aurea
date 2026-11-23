/* Auréa v7 : en-tête organisé avec couleurs par rubrique, calendrier chrétien. */

const RUBRIQUES = {
  prier: ["Prier", "prier"], chapelet: ["Prier", "prier"],
  chemin: ["Parcours", "chemin"], reperes: ["Parcours", "chemin"], bases: ["Parcours", "chemin"], priere: ["Parcours", "chemin"], bible: ["Parcours", "chemin"], plans: ["Parcours", "chemin"], jesus: ["Parcours", "chemin"], evangile: ["Parcours", "chemin"], messe: ["Parcours", "chemin"], messe1: ["Parcours", "chemin"], contact: ["Parcours", "chemin"], sacrements: ["Parcours", "chemin"], courants: ["Parcours", "chemin"], activite: ["Parcours", "chemin"], pelerinages: ["Parcours", "chemin"], communaute: ["Parcours", "chemin"],
  lire: ["La Bible", "lire"], figures: ["Figures de la foi", "figures"], jesuscarte: ["Cartes", "jesuscarte"], calendrier: ["Calendrier", "calendrier"],
  journal: ["Journal", "journal"], carnet: ["Journal", "journal"], faq: ["Questions", "faq"], ressources: ["Ressources", "ressources"], videos: ["Ressources", "ressources"], ponts: ["Ressources", "ressources"],
  groupes: ["Communauté", "groupes"], jeu: ["Quiz", "jeu"], profil: ["Mon compagnon", "profil"], reglages: ["Réglages", "profil"]
};
const MENU_PRINCIPAL = [["prier", "Prier"], ["chemin", "Parcours"], ["lire", "La Bible"], ["figures", "Figures"], ["calendrier", "Calendrier"], ["groupes", "Communauté"]];
const MENU_PLUS = [["jeu", "Quiz"], ["jesuscarte", "Cartes"], ["journal", "Journal"], ["faq", "Questions"], ["ressources", "Ressources"]];

siteHead = function () {
  const cur = route()[0] || "home", sec = (RUBRIQUES[cur] || [])[1], info = lvlInfo(), plusActif = MENU_PLUS.some(([id]) => id === sec);
  return `<header class="sitehead"><a class="brand" href="#/">${logoMark()}<span>Auréa</span></a>
    <nav class="menu" id="menu" aria-label="Menu principal">${MENU_PRINCIPAL.map(([id, t]) => `<a href="#/${id}" class="${sec === id ? "cur" : ""}" data-sec="${id}">${t}</a>`).join("")}
      <span class="plus ${plusActif ? "cur" : ""}"><button class="plusbtn" id="plusbtn" aria-expanded="false">Plus <i>▾</i></button><span class="dd" id="dd">${MENU_PLUS.map(([id, t]) => `<a href="#/${id}" class="${sec === id ? "cur" : ""}">${t}</a>`).join("")}</span></span>
      <a class="only-m" href="#/profil">Mon compagnon</a><a class="only-m" href="#/reglages">Réglages</a></nav>
    <span class="hact"><button class="linkbtn" id="finder2">Retrouver</button><a class="me2" href="#/profil" title="Mon compagnon">${avatarSvg(S.avatar, { cls: "mini" })}<span><b>${S.name ? esc(S.name) : "Moi"}</b><small>Niveau ${info.n}</small></span></a><button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><i></i><i></i><i></i></button></span></header>`;
};
function bindHead() {
  document.querySelectorAll("#finder2").forEach(b => b.onclick = openFinder);
  const bg = $("#burger"); if (bg) bg.onclick = () => { const m = $("#menu"), o = m.classList.toggle("open"); bg.setAttribute("aria-expanded", o); };
  const pb = $("#plusbtn"); if (pb) pb.onclick = e => { e.stopPropagation(); const d = $("#dd"), o = d.classList.toggle("open"); pb.setAttribute("aria-expanded", o); };
  document.addEventListener("click", ev => { const d = $("#dd"); if (d && !ev.target.closest(".plus")) d.classList.remove("open"); });
  document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => { $("#menu").classList.remove("open"); const d = $("#dd"); d && d.classList.remove("open"); }));
}
shell = function (title, html, back = "#/", cls = "") {
  track(title);
  const h = location.hash, fav = (S.favs || []).some(f => f.r === h), r = route()[0], rub = RUBRIQUES[r] || ["Auréa", "chemin"];
  document.body.dataset.sec = rub[1];
  app.innerHTML = `<div class="site">${siteHead()}<div class="crumbs"><a class="back" href="${back}">‹ Retour</a><span class="trail"><a href="#/">Accueil</a><i>/</i><span>${esc(rub[0])}</span>${rub[0] !== title ? `<i>/</i><span>${esc(title)}</span>` : ""}</span><button class="linkbtn" id="favbtn">${fav ? "★ Page gardée" : "☆ Garder cette page"}</button></div>
    <section class="pageband"><div class="bandin"><p class="eyebrow">${esc(rub[0])}</p><h1>${esc(title)}</h1></div></section>
    <main class="page ${cls}">${html}</main>${siteFoot()}</div>`;
  $("#favbtn").onclick = e => { const on = (S.favs || []).some(f => f.r === h); S.favs = on ? S.favs.filter(f => f.r !== h) : [{ r: h, t: title }, ...S.favs]; save(); e.currentTarget.textContent = on ? "☆ Garder cette page" : "★ Page gardée"; toast(on ? "Retirée des favoris" : "Page gardée dans tes favoris"); };
  bindHead(); bindGl();
};
// l'accueil garde son en-tête
{ const _home = VIEWS.home; VIEWS.home = function () { document.body.dataset.sec = "home"; _home(); bindHead(); }; }

// ---------- calendrier chrétien ----------
const CONSEILS_DEBUTANT = [
  ["Une seule chose suffit", "Pour chaque fête, choisis un seul geste, lire un passage, allumer une bougie ou dire une prière. Tu n'as pas besoin de tout faire."],
  ["Va à une messe, tout au fond", "Personne ne te demandera rien. Tu peux regarder, écouter et rester assis pendant la communion."],
  ["Partage un repas", "La plupart des fêtes se vivent à table, avec une crêpe, une galette, un gâteau ou simplement les gens que tu aimes."],
  ["Fais un geste pour quelqu'un", "Un appel, un petit mot, un service. C'est une façon très simple de vivre l'Évangile."],
  ["Note-le dans ton journal", "Écris en deux lignes ce que tu as vécu. Dans un an, tu seras content de t'en souvenir."]
];
VIEWS.calendrier = function (a) {
  const now = new Date(); let year = now.getFullYear(), cur = a && a[0], calTab = "f";
  const draw = () => {
    const L = feastsOf(year), next = nextFeasts(5);
    if (!cur || !L.find(f => f.id === cur)) cur = (next[0] && L.find(f => f.id === next[0].id) ? next[0].id : L[0].id);
    const f = L.find(x => x.id === cur), col = COULEURS[f.c];
    const daysTo = d => { const n = Math.round((d - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / 864e5); return n === 0 ? "aujourd'hui" : n === 1 ? "demain" : n > 0 ? "dans " + n + " jours" : "il y a " + (-n) + " jours"; };
    const seasons = [["Avent", "Avent"], ["Noël", "Noël"], ["Carême", "Carême"], ["Semaine sainte", "Semaine sainte"], ["Pâques", "Pâques"], ["Ordinaire", "Temps ordinaire"]];
    shell("Le calendrier chrétien", `
      <p class="lead2 short">Les grandes fêtes de l'Église, ce qu'elles veulent dire, et comment les vivre même en débutant.</p>
      <div class="nextstrip"><b>À venir</b>${next.slice(0, 4).map(n => `<a href="#/calendrier/${n.id}" style="--c:${COULEURS[n.c][1]}"><span class="dd2">${n.d.getDate()}<small>${MOIS_COURT[n.d.getMonth()]}</small></span><span><b>${esc(n.n)}</b><small>${daysTo(n.d)}</small></span></a>`).join("")}</div>
      <div class="tabsm" id="ct"><button class="${calTab === "f" ? "on" : ""}" data-t="f">Les fêtes</button><button class="${calTab === "a" ? "on" : ""}" data-t="a">L'année en un coup d'œil</button><button class="${calTab === "c" ? "on" : ""}" data-t="c">Vivre un temps, pas à pas</button></div>
      <div ${calTab === "a" ? "" : "hidden"}>${anneeFrise(L, now, year)}<div class="legcol row">${Object.values(COULEURS).map(c => `<span><i style="background:${c[1]}"></i><b>${c[0]}</b> ${c[2]}</span>`).join("")}</div></div>
      <div ${calTab === "c" ? "" : "hidden"}>${typeof tempsList === "function" ? tempsList() : ""}</div>
      <div ${calTab === "f" ? "" : "hidden"}>
      <div class="yeartabs"><button class="tab ${year === now.getFullYear() ? "sel" : ""}" data-y="${now.getFullYear()}">${now.getFullYear()}</button><button class="tab ${year === now.getFullYear() + 1 ? "sel" : ""}" data-y="${now.getFullYear() + 1}">${now.getFullYear() + 1}</button></div>
      <div class="calmd"><div class="calist">${seasons.map(([k, label]) => { const items = L.filter(x => (x.s === k)); if (!items.length) return ""; return `<section><h4>${label}</h4>${items.map(x => `<a href="#/calendrier/${x.id}" class="${x.id === cur ? "sel" : ""}" style="--c:${COULEURS[x.c][1]}"><span class="dj">${x.d.getDate()}<small>${MOIS_COURT[x.d.getMonth()]}</small></span><span class="fn">${esc(x.n)}</span></a>`).join("")}</section>`; }).join("")}</div>
      <article class="caldetail" style="--c:${col[1]}"><small class="eyebrow">${esc(f.rang)}</small><h2>${esc(f.n)}</h2><p class="cdate">${esc(feteDate(f))}</p>
        <p class="colchip"><i style="background:${col[1]}"></i>Couleur liturgique, ${esc(col[0].toLowerCase())}. ${esc(col[2])}.</p>
        <h4>Ce que l'on fête</h4><p class="text">${g(f.sens)}</p>
        <h4>Pour la vivre quand on débute</h4><ol class="vivre">${f.vivre.map(v => `<li>${g(v)}</li>`).join("")}</ol>
        ${f.trad ? `<h4>Les traditions</h4><p>${esc(f.trad)}</p>` : ""}
        <div class="toolrow"><a class="primary small" href="#/lire/${f.bible[0]}/${f.bible[1]}">Lire dans la Bible</a><a class="ghost" href="#/prier/${f.priere}">Dire une prière</a><button class="ghost" id="ics">Ajouter à mon agenda</button><button class="ghost" id="cj">Écrire dans mon journal</button></div></article></div></div>`, "#/", "wide");
    document.querySelectorAll("#ct button").forEach(b => b.onclick = () => { calTab = b.dataset.t; draw(); });
    document.querySelectorAll("[data-y]").forEach(b => b.onclick = () => { year = +b.dataset.y; draw(); });
    $("#ics").onclick = () => { const blob = new Blob([icsFor(f)], { type: "text/calendar" }), u = URL.createObjectURL(blob), el = document.createElement("a"); el.href = u; el.download = f.id + ".ics"; el.click(); setTimeout(() => URL.revokeObjectURL(u), 1000); toast("Fichier d'agenda téléchargé"); };
    $("#cj").onclick = () => { S.draft = { text: "", tags: ["Pensée"], title: f.n }; save(); go("#/journal"); };
  };
  draw();
};

// ---------- images des figures : œuvre d'art libre si disponible, sinon portrait dessiné ----------
let ART_INDEX = {};
fetch("img/art/index.json").then(r => r.ok ? r.json() : {}).then(d => { ART_INDEX = d || {}; }).catch(() => {});
function artOf(f) { const l = ART_INDEX[f.id]; return l && l.length ? l[0] : null; }
function figImg(f, small) {
  const a = artOf(f);
  if (a) return `<img class="artimg ${small ? "sm" : ""}" src="img/art/${a.file}" alt="${esc(a.title)}" loading="lazy">`;
  return portrait(f);
}
function figCredit(f) {
  const a = artOf(f); if (!a) return "Portraits dessinés pour Auréa. Les visages sont volontairement sans traits, pour laisser place à ce que chacun imagine.";
  return `Image, ${esc(a.title)}, ${esc(a.artist || "artiste inconnu")}, ${esc(a.date || "")}. ${esc(a.museum)}, ${esc(a.license)}. <a href="${a.url}" target="_blank" rel="noopener">Voir l'œuvre</a>`;
}

// ---------- histoire détaillée, répercussions, sources et liens pour étudier ----------
function detailHtml(f) {
  const D = (typeof DETAILS !== "undefined") && DETAILS[f.id]; if (!D) return "";
  const li = (arr, fn) => `<ul>${arr.map(fn).join("")}</ul>`;
  return `<section class="dfull"><h3>Son histoire en détail</h3><div class="dcols">${D.histoire.map(p => `<p class="text">${g(p)}</p>`).join("")}</div></section>
    ${D.contexte ? `<section><h3>Le contexte</h3><p>${g(D.contexte)}</p></section>` : ""}
    ${D.repercussion ? `<section class="repercu"><h3>Ce que cela a changé</h3><p>${g(D.repercussion)}</p></section>` : ""}
    ${D.prudence ? `<section class="prud"><h3>Ce qui est établi, ce qui est tradition</h3><p>${g(D.prudence)}</p></section>` : ""}
    ${D.sources && D.sources.length ? `<section><h3>Les sources</h3>${li(D.sources, s => `<li><b>${esc(s.t)}</b><span>${esc(s.n)}</span></li>`)}</section>` : ""}
    ${D.etudier && D.etudier.length ? `<section><h3>Pour étudier davantage</h3>${li(D.etudier, l => `<li><a href="${esc(l.u)}" target="_blank" rel="noopener">${esc(l.t)}</a></li>`)}<p class="muted fine">Ces textes ont été rédigés pour Auréa et restent à faire relire. Vérifie les dates importantes dans les sources.</p></section>` : ""}`;
}

function artAside(fig, i) {
  const l = (ART_INDEX[fig.id] || []); if (!l.length) return "";
  const a = l[i % l.length];
  return `<div class="artaside"><img src="img/art/${a.file}" alt="${esc(a.title)}" loading="lazy"><div><small class="eyebrow">Dans l'art</small><b>${esc(a.title)}</b><small>${esc(a.artist || "")}, ${esc(a.date || "")}</small><small>${esc(a.scene || "")}</small><small><a href="${a.url}" target="_blank" rel="noopener">${esc(a.museum)}</a>, ${esc(a.license)}</small></div></div>`;
}
