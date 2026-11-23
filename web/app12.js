// Icônes sur les onglets et boutons des figures, et explication du saint patron
const IC = {
  famille: "M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
  apotres: "M8 14a4 4 0 1 1 3.9-5H21v3h-2v2h-3v-2h-4.1A4 4 0 0 1 8 14z",
  at: "M6 3h10a2 2 0 0 1 2 2v14a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2zM9 8h6M9 12h6",
  hist: "M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6",
  modernes: "M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z",
  proches: "M12 3v18M7 8h10",
  frise: "M3 12h18M6 12v-4M12 12v6M18 12v-4",
  cal: "M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zM4 10h16M8 3v4M16 3v4",
  fav: "M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z",
  autre: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5",
  essentiel: "M2 5c3-1 7-1 10 1 3-2 7-2 10-1v14c-3-1-7-1-10 1-3-2-7-2-10-1z M12 6v14",
  histoire: "M7 3h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7zM7 3a2 2 0 0 0-2 2v2h2M10 8h6M10 12h6M10 16h4",
  contexte: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5l-2 5-5 2 2-5z",
  miracles: "M12 3l2.2 5.6 6 .5-4.6 3.9 1.5 5.9L12 15.8 6.9 18.9l1.5-5.9L3.8 9.1l6-.5z",
  sources: "M4 4h6v16H4zM12 7h4v13h-4zM18 5l3 .8-3.5 14-3-.8z",
  patron: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  journal: "M4 20h4L19 9l-4-4L4 16zM13 7l4 4",
  anim: "M8 5v14l11-7z"
};
const ico = (k, s = 20) => `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${IC[k] || IC.proches}"/></svg>`;
const GCOURT = { famille: "Jésus", apotres: "Apôtres", at: "Ancien Testament", hist: "Histoire", modernes: "Saints récents", proches: "Proches" };
const MCOURT = { frise: "Frise du temps", cal: "Calendrier des fêtes", fav: "Mes favoris", autre: "Un autre saint" };
const DTAB = { "L'essentiel": ["essentiel", "Essentiel"], "Histoire détaillée": ["histoire", "Histoire"], "Contexte et portée": ["contexte", "Contexte"], "Miracles": ["miracles", "Miracles"], "Sources et études": ["sources", "Sources"] };
function decorerFigures() {
  document.querySelectorAll(".tabs [data-g]:not([data-ico])").forEach(b => {
    const id = b.dataset.g, full = b.textContent.trim(); b.dataset.ico = 1; b.title = full; b.classList.add("itab");
    b.innerHTML = `${ico(id, 22)}<span>${esc(GCOURT[id] || full)}</span>`;
  });
  document.querySelectorAll(".tabs [data-m]:not([data-ico])").forEach(b => {
    const m = b.dataset.m, full = b.textContent.trim(); b.dataset.ico = 1; b.title = full; b.setAttribute("aria-label", full); b.classList.add("itab", "iconly");
    b.innerHTML = ico(m, 22);
  });
  document.querySelectorAll(".gtabs button:not([data-ico])").forEach(b => {
    const t = DTAB[b.textContent.trim()]; if (!t) return; b.dataset.ico = 1; b.title = b.textContent.trim(); b.classList.add("itab");
    b.innerHTML = `${ico(t[0], 20)}<span>${t[1]}</span>`;
  });
  const gt = document.querySelector(".gtools:not([data-ico])");
  if (gt) {
    gt.dataset.ico = 1;
    const fv = gt.querySelector("#fv"), pt = gt.querySelector("#pt"), gj = gt.querySelector("#gj"), an = gt.querySelector("a.primary");
    if (an) an.innerHTML = `${ico("anim", 18)} Voir son aventure animée`;
    if (fv) { const on = /Dans mes favoris/.test(fv.textContent); fv.innerHTML = `${ico("fav", 18)} ${on ? "Dans mes favoris" : "Favori"}`; fv.title = "Ajouter ou retirer des favoris"; }
    if (pt) { const on = /✓/.test(pt.textContent); pt.innerHTML = `${ico("patron", 18)} ${on ? "Mon saint patron" : "Choisir comme patron"}`; pt.title = "Un saint patron est un saint choisi comme ami et protecteur"; }
    if (gj) { gj.innerHTML = `${ico("journal", 18)} Journal`; gj.title = "Écrire dans mon journal"; }
    if (pt) { const p = document.createElement("p"); p.className = "patronhelp"; p.innerHTML = `<b>Un saint patron, c'est quoi ?</b> Un saint que tu choisis comme ami et comme exemple. Les chrétiens croient qu'il prie pour toi, comme un ami qui pense à toi. Beaucoup choisissent le saint de leur prénom ou de leur date de naissance, ou celui dont l'histoire les touche. Tu peux en changer quand tu veux.`; gt.after(p); }
  }
}
new MutationObserver(decorerFigures).observe(document.body, { childList: true, subtree: true });
