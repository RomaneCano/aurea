// Dans la frise "Où en sommes-nous dans l'histoire", chaque personnage est présenté avant l'histoire, du plus simple au plus détaillé
const CAST = { abraham: ["dieu", "abraham"], moise: ["moise"], david: ["david"], prophetes: ["isaie"], naissance: ["jesus", "marie", "joseph"], bapteme: ["jeanbaptiste"], galilee: ["pierre", "jean"], jerusalem: ["pilate"], croix: ["madeleine"], pentecote: [], paul: ["paul"], constantin: ["constantin"], islam: ["mahomet"] };
const CAST_CUSTOM = {
  pilate: { nom: "Ponce Pilate", role: "Gouverneur romain de Judée", court: "Il représente l'empereur de Rome en Judée, de l'an 26 à l'an 36. C'est lui qui condamne Jésus à la crucifixion.", plus: "Pilate est préfet romain, il a le pouvoir de condamner à mort. Les Évangiles disent qu'il hésite, puis cède à la pression. Une pierre trouvée à Césarée en 1961 porte son nom, c'est une preuve rare de son existence. Il est cité dans le Credo, ce qui date la mort de Jésus.", lien: "#/prier/credo", lienT: "Lire le Credo", v: { skin: "#e0b08c", hair: "#5b4030", style: "short", robe: "#8c2f3a", mantle: "#c9a24a", bg: ["#f0e0e0", "#fdf0d2"] } },
  dieu: { nom: "Dieu", role: "Le Créateur, un seul Dieu", court: "Pour les chrétiens, Dieu est unique. Il a créé le monde par amour et il veut une relation avec chaque personne.", plus: "Les chrétiens croient en un seul Dieu en trois personnes, le Père, le Fils et l'Esprit Saint. On appelle cela la Trinité. Dieu n'est pas une force lointaine. Il parle, il accompagne et il pardonne. Il se fait connaître dans la Bible, jusqu'à devenir un homme en Jésus.", lien: "#/bases", lienT: "Voir les bases de la foi", art: () => A.dieu() },
  isaie: { nom: "Isaïe", role: "Un prophète de Jérusalem", court: "Un prophète est un homme qui parle de la part de Dieu. Isaïe vit à Jérusalem, au VIIIe siècle av. J.-C. Il annonce qu'un Sauveur viendra.", plus: "Isaïe rappelle au peuple de rester fidèle à Dieu et de défendre les pauvres. Les chrétiens relisent certains de ses textes comme une annonce de Jésus. Les juifs les lisent autrement, et ils ont leur propre lecture.", lien: "#/lire/isa/1", lienT: "Lire Isaïe dans la Bible", v: { skin: "#d9a97f", hair: "#bbb", style: "short", robe: "#6c7fb0", mantle: "#8fa5d6", beard: "#bbb", bg: ["#dde7f5", "#fdf0d2"] } },
  constantin: { nom: "Constantin", role: "Empereur romain", court: "En 313, avec son collègue Licinius, il décide que les chrétiens peuvent pratiquer leur foi librement.", plus: "En 325, il réunit le concile de Nicée, une grande assemblée d'évêques qui précise ce que l'on croit sur Jésus. Il est baptisé peu avant sa mort, en 337.", lien: "#/prier/credo", lienT: "Lire le Credo", v: { skin: "#e3b48c", hair: "#5b4030", style: "short", robe: "#7a4a8c", mantle: "#c9a24a", attr: "couronne", bg: ["#e6dcf0", "#fdf0d2"] } },
  mahomet: { nom: "Mahomet", role: "Prophète de l'islam", court: "Né à La Mecque vers 570, il commence à prêcher vers 610. Les musulmans croient qu'il a reçu le Coran de la part de Dieu.", plus: "Pour les musulmans, il est le dernier des prophètes. Les chrétiens ne reconnaissent pas cette mission, mais ils respectent la foi des musulmans en un Dieu unique. L'islam honore aussi Jésus et Marie. Dans l'islam, on ne dessine pas le Prophète, c'est pourquoi il n'y a pas de portrait ici.", lien: "#/croyances/musulman", lienT: "Comprendre les différences", art: () => `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" fill="#efe3c4"/><path d="M0 92 Q40 70 80 88 T120 80 V120 H0Z" fill="#e0c98e"/><path d="M70 34 A22 22 0 1 0 70 78 A17 17 0 1 1 70 34Z" fill="#6f9a86"/><circle cx="82" cy="42" r="5" fill="#6f9a86"/></svg>` }
};
function castInfo(id) {
  if (CAST_CUSTOM[id]) return { ...CAST_CUSTOM[id], id, custom: true };
  const f = FIGURES.find(x => x.id === id); if (!f) return null;
  return { id, nom: f.nom, role: f.role, court: f.role + ". " + f.bio.split(". ")[0] + ".", plus: f.bio + " " + (f.pourquoi || ""), f };
}
function castDepth() { if (S.depth) return S.depth; const n = Object.keys(S.done || {}).length; return n >= 4 ? 2 : 1; }
function castHtml(stopId, open) {
  const ids = CAST[stopId]; if (!ids) return "";
  S.castSeen = S.castSeen || {}; const d = castDepth();
  const hasLong = id => typeof longsAll === "function" && longsAll()[id];
  const cards = ids.map(castInfo).filter(Boolean).map(c => {
    const img = c.custom ? (c.art ? `<div class="cimg">${c.art()}</div>` : `<div class="cimg">${portrait({ id: c.id, nom: c.nom, v: c.v })}</div>`) : `<div class="cimg">${figImg(c.f)}</div>`;
    const lien = hasLong(c.id) ? `<a class="textbtn" href="#/recit/${c.id}">Voir l'histoire développée ›</a>` : c.f ? `<a class="textbtn" href="#/figures/${c.id}">Voir sa fiche ›</a>` : `<a class="textbtn" href="${c.lien}">${esc(c.lienT)} ›</a>`;
    return `<article class="ccard">${img}<div><b>${esc(c.nom)}</b><small>${esc(c.role)}</small><p>${g(d === 1 ? c.court : c.plus)}</p>${lien}</div></article>`;
  }).join("");
  ids.forEach(id => { S.castSeen[id] = 1; });
  return `<details class="cast" ${open ? "open" : ""}><summary><span>Qui est-ce ?</span> <b>${ids.map(castInfo).filter(Boolean).map(c => esc(c.nom)).join(", ")}</b></summary><div class="casthead"><h3 class="sr-only">Niveau de détail</h3><div class="depth" role="group" aria-label="Niveau de détail"><button data-d="1" class="${d === 1 ? "on" : ""}">En deux mots</button><button data-d="2" class="${d === 2 ? "on" : ""}">Un peu plus</button></div></div>${cards}</details>`;
}
new MutationObserver(() => {
  const rp = document.getElementById("rp"); if (!rp || rp.querySelector(".cast") || typeof REPERES === "undefined") return;
  const h2 = rp.querySelector("h2"); const s = h2 && REPERES.find(r => r.t === h2.textContent); if (!s) return; const h = castHtml(s.id); if (!h) return;
  const p = rp.querySelector("p.text"); if (!p) return;
  p.insertAdjacentHTML("beforebegin", h);
  rp.querySelectorAll(".depth button").forEach(b => b.onclick = () => { S.depth = +b.dataset.d; save(); rp.querySelector(".cast").outerHTML = castHtml(s.id, true); rp.querySelectorAll(".depth button").forEach(x => x.onclick = b.onclick); });
}).observe(document.body, { childList: true, subtree: true });
