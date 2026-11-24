// Navigation claire, informations à la demande : page La Bible en portes d'entrée, menu groupé, recherche partout
/* 1. La Bible : une recherche et quelques portes, le reste s'ouvre à la demande */
lireIndex = function () {
  const t = (S.read && Object.keys(S.read).length) || 0;
  const section = name => `<div class="sec2">${BIBLE_GROUPS.filter(g => g[1] === name).map(g => `<div class="bgroup"><h3>${g[2]}</h3><p class="muted">${g[3]}</p><ul class="booklist">${BOOKS.filter(b => b[3] === g[0]).map(b => { const n = readCount(b[0]); return `<li><a href="#/lire/${b[0]}"><span class="bn">${esc(b[1])}</span>${niveauDots(b[5])}<small>${b[4]} ch.${n ? " · " + n + " lu" + (n > 1 ? "s" : "") : ""}</small></a></li>`; }).join("")}</ul></div>`).join("")}</div>`;
  const paths = () => `<div class="pathcomp">${CHEMINS.map(p => { const n = pathReadCount(p), all = pathTotalChapters(p), act = S.pathActive === p.id; return `<article class="pc ${act ? "act" : ""}"><div><small class="eyebrow">${esc(p.tag)}</small><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p></div><div class="pcb"><span class="muted">${n ? n + " sur " + all : all + " chapitres"}</span><button class="primary small" data-pstart="${p.id}">${n ? "Reprendre" : "Commencer"}</button><a class="textbtn" href="#/lire/chemin/${p.id}">Le plan</a></div></article>`; }).join("")}</div>`;
  const books = () => `<div class="tabsm" id="tt"><button class="on" data-t="nt">Nouveau Testament</button><button data-t="at">Ancien Testament</button></div><div id="tnt">${section("Nouveau Testament")}</div><div id="tat" hidden>${section("Ancien Testament")}</div><p class="muted fine">${t} chapitre${t > 1 ? "s" : ""} lu${t > 1 ? "s" : ""}. Les points indiquent la difficulté.</p>`;
  const ic = d => `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
  shell("La Bible", `
    <div class="bhub"><form class="bsearch" id="goto" role="search"><label class="sr-only" for="gq">Aller à un passage</label><input id="gq" placeholder="Aller à un passage, par exemple Jn 3,16" autocomplete="off"><button class="primary" type="submit">Aller</button><small class="muted" id="gerr"></small></form>
      <form class="bsearch" id="sform" role="search"><label class="sr-only" for="sq">Chercher un mot</label><input id="sq" placeholder="Chercher un mot, par exemple berger" autocomplete="off"><button class="primary" type="submit">Chercher</button></form></div>
    <div id="sres" class="sres" aria-live="polite"></div>
    <div class="doors" role="list">
      <a class="door" role="listitem" href="#/biblepre/histoire">${ic("M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1zM12 6v14")}<b>Découvrir la Bible</b><span>Son histoire, ses livres, comment la lire</span></a>
      <button class="door" role="listitem" data-open="chemins">${ic("M5 19c4-2 2-6 6-8s2-6 8-6M5 19a1.5 1.5 0 1 0 0 .1M19 5a1.5 1.5 0 1 0 0 .1")}<b>Choisir un chemin de lecture</b><span>Intro, Jésus, dans l'ordre des événements</span></button>
      <button class="door" role="listitem" data-open="livres">${ic("M4 4h6v16H4zM12 7h4v13h-4zM18 5l3 .8-3.5 14-3-.8z")}<b>Parcourir les 73 livres</b><span>Ancien et Nouveau Testament</span></button>
      <a class="door" role="listitem" href="#/recit">${ic("M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7zM10 8h6M10 12h6M10 16h4")}<b>Récits complets</b><span>La vie de Jésus et des saints, par chapitres</span></a>
      <button class="door" role="listitem" id="lastr">${ic("M5 12h14M13 6l6 6-6 6")}<b>Reprendre ma lecture</b><span>Là où tu t'es arrêté</span></button>
      <button class="door" role="listitem" id="rnd">${ic("M4 7h4l8 10h4M4 17h4l2-2.5M14 9.5L16 7h4M18 5l2 2-2 2M18 15l2 2-2 2")}<b>Ouvrir au hasard</b><span>Un chapitre, pour la surprise</span></button></div>
    <div id="bpanel" class="bpanel" hidden></div>
    <p class="muted fine">Texte, Sainte Bible néo-Crampon Libre, © 2022 Fraternité de Tibériade, licence CC BY-SA 4.0. Pour la traduction entendue à la messe, voir <a href="https://www.aelf.org/bible" target="_blank" rel="noopener">AELF</a>.</p>`, "#/", "wide");
  bindChemins();
  $("#goto").onsubmit = e => { e.preventDefault(); const r = parseRef($("#gq").value); if (!r) { $("#gerr").textContent = "Je n'ai pas reconnu ce passage. Essaie avec « Jn 3,16 » ou « Genèse 1 »."; return; } go(`#/lire/${r.code}/${r.ch || 1}${r.v ? "/" + r.v : ""}`); };
  const panel = $("#bpanel"); let open = null;
  document.querySelectorAll("[data-open]").forEach(b => b.onclick = () => {
    const k = b.dataset.open; if (open === k) { panel.hidden = true; open = null; document.querySelectorAll("[data-open]").forEach(x => x.classList.remove("on")); return; }
    open = k; panel.hidden = false; panel.innerHTML = k === "chemins" ? paths() : books();
    document.querySelectorAll("[data-open]").forEach(x => x.classList.toggle("on", x === b));
    bindChemins();
    document.querySelectorAll("#tt button").forEach(t => t.onclick = () => { document.querySelectorAll("#tt button").forEach(x => x.classList.toggle("on", x === t)); $("#tnt").hidden = t.dataset.t !== "nt"; $("#tat").hidden = t.dataset.t !== "at"; });
    panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
};

/* 2. Menu Plus groupé par usage */
const MENU_GROUPES = [["Apprendre", [["jeu", "Quiz"], ["jesuscarte", "Cartes"], ["croyances", "Pourquoi je crois"], ["faq", "Questions"], ["miracles", "Miracles et signes"]]], ["Mon espace", [["journal", "Journal"], ["intentions", "Mes intentions"], ["profil", "Mon compagnon"], ["groupes", "Groupes"]]], ["Ressources", [["ressources", "Ressources"], ["temoignages", "Témoignages"], ["recit", "Récits complets"], ["biblepre", "Découvrir la Bible"]]]];
{
  const _sh = siteHead;
  siteHead = function () {
    let h = _sh();
    const cur = (location.hash.replace(/^#\/?/, "").split("/")[0]) || "";
    const dd = `<span class="dd groups" id="dd">${MENU_GROUPES.map(([t, l]) => `<span class="ddg"><small>${t}</small>${l.map(([id, n]) => `<a href="#/${id}" class="${cur === id ? "cur" : ""}">${n}</a>`).join("")}</span>`).join("")}</span>`;
    return h.replace(/<span class="dd" id="dd">[\s\S]*?<\/span><\/span>/, dd + "</span>");
  };
}

/* 3. Recherche dans tout le site, depuis « Retrouver » */
function searchIndex() {
  const out = [];
  FIGURES.forEach(f => out.push({ t: f.nom, s: f.role, h: `#/figures/${f.id}`, k: "Figure" }));
  PRAYERS.forEach(p => out.push({ t: p.t, s: "Prière", h: `#/prier/${p.id}`, k: "Prière" }));
  try { FETES_CAL.forEach(f => out.push({ t: f.n, s: f.rang, h: `#/calendrier/${f.id}`, k: "Fête" })); } catch (e) {}
  BOOKS.forEach(b => out.push({ t: b[1], s: `${b[4]} chapitres`, h: `#/lire/${b[0]}`, k: "Livre" }));
  if (typeof longsAll === "function") { const L = longsAll(); Object.keys(L).forEach(id => { const f = FIGURES.find(x => x.id === id); (L[id].chapitres || []).forEach((c, i) => out.push({ t: c.t, s: "Récit de " + (f ? f.nom : id), h: `#/recit/${id}/c/${i}`, k: "Récit" })); }); }
  if (typeof BIBLE_HISTOIRE !== "undefined") BIBLE_HISTOIRE.qr.forEach((q, i) => out.push({ t: q.q, s: "Question sur la Bible", h: `#/biblepre/questions/${i}`, k: "Question" }));
  if (typeof DECONSTRUIRE !== "undefined") Object.keys(DECONSTRUIRE.profils).forEach(k => DECONSTRUIRE.profils[k].fiches.forEach((f, i) => out.push({ t: f.q, s: DECONSTRUIRE.profils[k].titre, h: `#/croyances/${k}/fiches/${i}`, k: "Question" })));
  Object.keys(GLOSSARY).forEach(k => out.push({ t: GLOSSARY[k][0], s: GLOSSARY[k][1], h: "", k: "Mot" }));
  if (typeof TEMPS !== "undefined") Object.keys(TEMPS).forEach(k => out.push({ t: TEMPS[k].nom, s: "Parcours guidé", h: `#/temps/${k}`, k: "Parcours" }));
  [["Mes intentions", "intentions"], ["Journal", "journal"], ["Chapelet", "chapelet"], ["Témoignages", "temoignages"], ["Pourquoi je crois", "croyances"], ["Miracles et signes", "miracles"], ["Quiz", "jeu"], ["Découvrir la Bible", "biblepre/histoire"], ["Calendrier", "calendrier"]].forEach(([t, h]) => out.push({ t, s: "Page du site", h: "#/" + h, k: "Page" }));
  return out;
}
{
  const _of = openFinder;
  openFinder = function () {
    _of();
    const sh = $("#sheet"), box = sh && sh.querySelector(".finder"); if (!box || box.querySelector("#fq")) return;
    const f = document.createElement("div"); f.className = "fsearch";
    f.innerHTML = `<label class="sr-only" for="fq">Rechercher dans Auréa</label><input id="fq" type="search" placeholder="Rechercher un saint, une prière, une fête, un mot" autocomplete="off"><ul id="fr" class="fres" aria-live="polite"></ul>`;
    box.insertBefore(f, box.children[1]);
    const idx = searchIndex(), norm2 = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const input = f.querySelector("#fq"), res = f.querySelector("#fr");
    input.oninput = () => {
      const q = norm2(input.value.trim()); box.classList.toggle("searching", q.length >= 2); if (q.length < 2) { res.innerHTML = ""; return; }
      const hits = idx.map(x => ({ x, sc: norm2(x.t).startsWith(q) ? 3 : norm2(x.t).includes(q) ? 2 : (x.k !== "Mot" && norm2(x.s).includes(q)) ? 1 : 0 })).filter(h => h.sc).sort((a, b) => b.sc - a.sc).slice(0, 12);
      res.innerHTML = hits.length ? hits.map(({ x }) => x.h ? `<li><a href="${x.h}"><b>${esc(x.t)}</b><small>${esc(x.k)}, ${esc(x.s.slice(0, 80))}</small></a></li>` : `<li class="gloss"><b>${esc(x.t)}</b><small>${esc(x.s)}</small></li>`).join("") : `<li class="muted">Rien trouvé. Essaie un autre mot.</li>`;
      res.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { sh.className = ""; }));
    };
    input.focus();
  };
  document.querySelectorAll("#finder2").forEach(b => b.onclick = openFinder);
  const _bh = bindHead; bindHead = function () { _bh(); document.querySelectorAll("#finder2").forEach(b => b.onclick = openFinder); };
}
/* touche / pour chercher */
window.addEventListener("keydown", e => { if (e.key === "/" && !/input|textarea|select/i.test((document.activeElement || {}).tagName || "")) { e.preventDefault(); openFinder(); } });

/* le finder se ferme quand on change de page */
window.addEventListener("hashchange", () => { const sh = document.getElementById("sheet"); if (sh) sh.className = ""; });
/* calendrier : les fêtes rangées par saison, celle de la fête choisie est ouverte */
new MutationObserver(() => {
  document.querySelectorAll(".calist section:not([data-d])").forEach(sec => {
    sec.dataset.d = 1; const h = sec.querySelector("h4"); if (!h) return;
    const d = document.createElement("details"); d.className = "season"; if (sec.querySelector("a.sel")) d.open = true;
    const sm = document.createElement("summary"); sm.textContent = h.textContent; h.remove();
    sec.parentNode.insertBefore(d, sec); d.appendChild(sm); d.appendChild(sec);
  });
}).observe(document.body, { childList: true, subtree: true });
