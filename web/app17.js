// Découvrir la Bible : son histoire, le livre qui s'ouvre, comment lire une référence, les questions courantes
RUBRIQUES.biblepre = ["La Bible", "lire"];
const LIVRES = () => Object.assign({}, typeof BIBLE_LIVRES_AT !== "undefined" ? BIBLE_LIVRES_AT : {}, typeof BIBLE_LIVRES_NT !== "undefined" ? BIBLE_LIVRES_NT : {});
const GCOL = { pent: "#a86b00", hist: "#7a5c2e", sag: "#2f7a6f", proph: "#a03030", evang: "#4b3f9e", act: "#2b5782", paul: "#7a5fa8", cath: "#4f8a5b", apoc: "#b45a7a" };
VIEWS.biblepre = function (a) {
  const H = BIBLE_HISTOIRE, tab = ["histoire", "livre", "lire", "questions"].includes(a[0]) ? a[0] : "histoire";
  const tabs = `<div class="tabsm" id="bpt">${[["histoire", "Son histoire"], ["livre", "Le livre ouvert"], ["lire", "Lire une référence"], ["questions", "Questions courantes"]].map(([k, t]) => `<a class="${tab === k ? "on" : ""}" href="#/biblepre/${k}">${t}</a>`).join("")}</div>`;
  let body = "";
  if (tab === "histoire") body = histoireTab(a, H);
  else if (tab === "livre") body = `<div id="bk"></div>`;
  else if (tab === "lire") body = lireTab(H);
  else body = questionsTab(a, H);
  shell("Découvrir la Bible", `<p class="lead2 short">${g(H.intro)}</p>${tabs}${body}<p class="muted fine">Étape suivante, <a href="#/lire">choisir comment lire</a>. Les sources de cette page sont listées en bas de la rubrique Son histoire.</p>`, "#/lire", "wide");
  if (tab === "livre") livreOuvert(a);
  if (tab === "lire") lireBind(H);
};
function histoireTab(a, H) {
  const subs = [["recit", "Comment elle s'est écrite"], ["manuscrits", "Les plus anciens manuscrits"], ["lieux", "D'où vient-elle ?"], ["traductions", "Les traductions"], ["canon", "Quels livres ?"]];
  const sub = subs.some(s => s[0] === a[1]) ? a[1] : "recit", n = Math.max(0, Math.min(H.etapes.length - 1, +(a[2] || 0)));
  const pills = `<div class="subpills">${subs.map(([k, t]) => `<a class="${sub === k ? "on" : ""}" href="#/biblepre/histoire/${k}">${t}</a>`).join("")}</div>`;
  let c = "";
  if (sub === "recit") {
    const e = H.etapes[n];
    c = `<div class="rmd"><ol class="rindex">${H.etapes.map((x, i) => `<li><a class="${i === n ? "sel" : ""}" href="#/biblepre/histoire/recit/${i}"><i>${i + 1}</i><span>${esc(x.t)}</span></a></li>`).join("")}</ol>
      <article class="rchap"><h2>${esc(e.t)}</h2><div class="rbody"><div class="rtext">${e.x.map(p => `<p class="text">${g(p)}</p>`).join("")}</div>${e.faits && e.faits.length ? `<aside class="rside"><div class="rtabs"><button class="on">Repères</button></div><ul>${e.faits.map(f => `<li>${g(f)}</li>`).join("")}</ul></aside>` : ""}</div>
      <div class="pager"><a class="textbtn ${n === 0 ? "dis" : ""}" href="#/biblepre/histoire/recit/${n - 1}">‹ Précédent</a><span class="count">${n + 1} sur ${H.etapes.length}</span><a class="textbtn ${n >= H.etapes.length - 1 ? "dis" : ""}" href="#/biblepre/histoire/recit/${n + 1}">Suivant ›</a></div></article></div>`;
  } else if (sub === "manuscrits") {
    c = `<p class="lead2 short">Nous n'avons pas les originaux. Nous avons des copies, très nombreuses, de plus en plus anciennes.</p><div class="mscs">${H.manuscrits.map(m => `<article class="msc"><small class="eyebrow">${esc(m.date)}</small><h3>${esc(m.nom)}</h3>${m.repere ? `<span class="tag">${esc(m.repere)}</span>` : ""}<p>${g(m.contenu)}</p><p class="muted"><b>Trouvé</b> ${esc(m.lieu_decouverte)}<br><b>Aujourd'hui</b> ${esc(m.conservation)}</p><p>${g(m.pourquoi)}</p></article>`).join("")}</div>`;
  } else if (sub === "lieux") {
    c = `<div class="geo"><div>${H.geographie.x.map(p => `<p class="text">${g(p)}</p>`).join("")}</div><ul class="geol">${H.geographie.lieux.map(l => `<li><b>${esc(l.nom)}</b><span>${g(l.role)}</span></li>`).join("")}</ul></div>`;
  } else if (sub === "traductions") {
    c = `<ol class="trad">${H.traductions.map(t => `<li><b class="ty">${esc(t.date)}</b><div><h3>${esc(t.nom)}</h3><small>${esc(t.langue)}${t.auteurs ? ", " + esc(t.auteurs) : ""}</small><p>${g(t.note)}</p></div></li>`).join("")}</ol>`;
  } else {
    const C = H.canon;
    c = `<p class="lead2 short">${g(C.texte)}</p><div class="canon"><div class="cc"><b>${C.catholique.total}</b><span>Bible catholique</span><small>${C.catholique.at} livres de l'Ancien Testament et ${C.catholique.nt} du Nouveau</small></div><div class="cc"><b>${C.protestant.total}</b><span>Bible protestante</span><small>${C.protestant.at} livres de l'Ancien Testament et ${C.protestant.nt} du Nouveau</small></div></div>
      <p class="text">${g(C.note)}</p>${C.orthodoxe ? `<p class="text">${g(C.orthodoxe)}</p>` : ""}<h4>Les livres que les protestants n'ont pas</h4><ul class="plain">${(C.deuterocanoniques || []).map(x => `<li>${g(x)}</li>`).join("")}</ul>`;
  }
  const src = sub === "recit" ? `<details class="srcs"><summary>Sources de cette page</summary><ul>${(H.sources || []).map(s => `<li>${esc(s)}</li>`).join("")}</ul></details>` : "";
  return pills + c + src;
}
function lireTab(H) {
  const L = H.lire;
  return `<p class="lead2 short">${g(L.intro)}</p><div class="refbox"><div class="refpick"><label>Livre<select id="rb">${BOOKS.map(b => `<option value="${b[0]}" ${b[0] === "joh" ? "selected" : ""}>${esc(b[1])}</option>`).join("")}</select></label><label>Chapitre<input id="rc" type="number" min="1" value="3"></label><label>Verset<input id="rv" type="number" min="1" value="16"></label></div>
    <div class="refshow"><div class="refbig" id="rbig"></div><div class="reflect" id="rlect"></div><blockquote id="rtext" class="xpq"></blockquote><a class="primary small" id="rgo" href="#/lire">Lire ce passage</a></div></div>
    <div class="rcols"><section><h4>Comment lire une référence</h4><ol class="tipslist">${L.schema.map(s => `<li><span><b>${esc(s.partie)}</b> ${g(s.sens)}</span></li>`).join("")}</ol><h4>Des exemples</h4><ul class="plain">${L.exemples.map(e => `<li><b>${esc(e.ref)}</b>, ${g(e.lecture)}</li>`).join("")}</ul></section>
    <section><h4>Les petits signes</h4><ul class="plain">${(L.conventions || []).map(c => `<li>${g(c)}</li>`).join("")}</ul>${L.histoire ? `<h4>D'où viennent chapitres et versets ?</h4><p>${g(L.histoire)}</p>` : ""}</section></div>
    <h4>Toutes les abréviations</h4><div class="abrs">${BOOKS.map(b => `<a href="#/lire/${b[0]}"><b>${esc(b[2])}</b><span>${esc(b[1])}</span></a>`).join("")}</div>`;
}
function lireBind(H) {
  const upd = async () => {
    const b = BOOKS.find(x => x[0] === $("#rb").value); let c = Math.max(1, Math.min(b[4], +$("#rc").value || 1)); $("#rc").max = b[4]; $("#rc").value = c;
    const v = Math.max(1, +$("#rv").value || 1);
    $("#rbig").innerHTML = `<span class="rp">${esc(b[2])}</span><span class="rp">${c}</span><i>,</i><span class="rp">${v}</span>`;
    $("#rlect").innerHTML = `<b>${esc(b[1])}</b>, chapitre ${c}, verset ${v}`;
    $("#rgo").href = `#/lire/${b[0]}/${c}/${v}`;
    try { const d = await (await fetch(`bible/${b[0]}.json`)).json(); const t = d[c - 1] && d[c - 1][v - 1]; $("#rtext").textContent = t ? "« " + t + " »" : "Ce verset n'existe pas dans ce chapitre."; } catch (e) { $("#rtext").textContent = ""; }
  };
  ["#rb", "#rc", "#rv"].forEach(s => $(s).oninput = upd); upd();
}
function questionsTab(a, H) {
  const i = Math.max(0, Math.min(H.qr.length - 1, +(a[1] || 0))), q = H.qr[i];
  return `<div class="cmd"><ul class="cq">${H.qr.map((x, j) => `<li><a class="${j === i ? "sel" : ""}" href="#/biblepre/questions/${j}">${esc(x.q)}</a></li>`).join("")}</ul>
    <article class="cfiche"><h3>${esc(q.q)}</h3>${q.a.split(/\n+/).map(p => `<p class="text">${g(p)}</p>`).join("")}${q.refs && q.refs.length ? `<p class="crefs">${q.refs.map(r => `<span><b>${esc(r.t)}</b>${r.n ? ", " + esc(r.n) : ""}</span>`).join("")}</p>` : ""}${q.sources && q.sources.length ? `<p class="muted fine">Sources, ${q.sources.map(esc).join(" ; ")}</p>` : ""}<p class="muted fine">Ce que la science historique peut dire et ce que la foi ajoute sont deux choses différentes. Tu peux aussi poser ta question à <a href="#/faq/expert">l'expert</a>.</p></article></div>`;
}
/* le livre qui s'ouvre */
function livreOuvert(a) {
  const root = $("#bk"), L = LIVRES(), gr = BIBLE_GROUPS.map(x => x[0]);
  let gi = Math.max(0, gr.indexOf(a[1])), cur = null;
  const draw = (flip) => {
    const G = BIBLE_GROUPS[gi], books = BOOKS.filter(b => b[3] === G[0]);
    if (!cur || !books.find(b => b[0] === cur)) cur = books[0][0];
    const b = BOOKS.find(x => x[0] === cur), f = L[cur] || {}, col = GCOL[G[0]];
    const T = (G[1] === "Ancien Testament");
    root.innerHTML = `<div class="bkrib">${BIBLE_GROUPS.map((x, k) => `<button data-g="${k}" class="${k === gi ? "on" : ""}" style="--c:${GCOL[x[0]]}" aria-pressed="${k === gi}"><small>${x[1] === "Ancien Testament" ? "AT" : "NT"}</small>${esc(x[2])}</button>`).join("")}</div>
      <div class="bkbook ${flip ? "" : "closed"}" style="--c:${col}">${flip ? "" : `<div class="bkcover" aria-hidden="true"><b>La Bible</b><span>73 livres</span><i></i></div>`}
      <div class="bkpage left"><small class="eyebrow">${esc(G[1])}, ${books.length} livre${books.length > 1 ? "s" : ""}</small><h2>${esc(G[2])}</h2><p class="muted">${g(G[3])}</p>
        <ul class="shelf">${books.map(x => `<li><button data-b="${x[0]}" class="spine ${x[0] === cur ? "on" : ""}" style="--c:${col}"><b>${esc(x[1])}</b><small>${esc(x[2])} · ${x[4]} ch.</small></button></li>`).join("")}</ul></div>
      <div class="bkpage right" id="bkr"><small class="eyebrow">${esc(b[2])}, ${b[4]} chapitre${b[4] > 1 ? "s" : ""}</small><h2>${esc(b[1])}</h2>
        ${f.resume ? `<p class="text">${g(f.resume)}</p>` : `<p class="text">${g(b[6])}</p>`}
        <dl class="bkdl">${f.auteur ? `<dt>Qui l'a écrit</dt><dd>${g(f.auteur)}${f.specialistes ? `<br><span class="muted">${g(f.specialistes)}</span>` : ""}</dd>` : ""}${f.date ? `<dt>Quand</dt><dd>${g(f.date)}</dd>` : ""}${f.genre ? `<dt>Genre</dt><dd>${g(f.genre)}</dd>` : ""}${f.lieu ? `<dt>Où</dt><dd>${g(f.lieu)}</dd>` : ""}</dl>
        ${f.personnes && f.personnes.length ? `<h4>Qui sont-ils ?</h4><ul class="bkpers">${f.personnes.map(p => `<li><b>${esc(p.nom)}</b> ${g(p.qui)}</li>`).join("")}</ul>` : ""}
        ${f.message ? `<p class="bkmsg">${g(f.message)}</p>` : ""}${f.alire ? `<p class="muted">${g(f.alire)}</p>` : ""}<div class="toolrow"><a class="primary small" href="#/lire/${b[0]}">Ouvrir ce livre</a><a class="ghost small" href="#/lire/${b[0]}/1">Lire le chapitre 1</a></div></div></div>`;
    root.querySelectorAll("[data-g]").forEach(x => x.onclick = () => { const to = +x.dataset.g; if (to === gi) return; turn(to); });
    root.querySelectorAll("[data-b]").forEach(x => x.onclick = () => { cur = x.dataset.b; swapRight(); });
    root.querySelectorAll(".spine").forEach(s => s.classList.toggle("on", s.dataset.b === cur));
  };
  const swapRight = () => { const keep = gi; draw(true); if (window.gsap) gsap.fromTo("#bkr", { opacity: 0, x: 18 }, { opacity: 1, x: 0, duration: .35 }); };
  const turn = to => {
    const bk = root.querySelector(".bkbook"); if (!window.gsap || !bk) { gi = to; cur = null; draw(true); return; }
    const leaf = document.createElement("div"); leaf.className = "bkleaf"; bk.appendChild(leaf);
    gsap.fromTo(leaf, { rotationY: 0, transformOrigin: "0% 50%" }, { rotationY: -180, duration: .8, ease: "power2.inOut", onComplete: () => { leaf.remove(); } });
    setTimeout(() => { gi = to; cur = null; draw(true); }, 380);
  };
  draw(false);
  const bk = root.querySelector(".bkbook");
  if (window.gsap && !(S.a11y && S.a11y.motion)) { requestAnimationFrame(() => { bk.classList.add("opening"); gsap.fromTo(bk.querySelector(".bkcover"), { rotationY: 0 }, { rotationY: -172, duration: 1.4, ease: "power2.inOut", transformOrigin: "0% 50%", delay: .3, onComplete: () => { bk.classList.remove("closed"); bk.querySelector(".bkcover").style.display = "none"; } }); gsap.fromTo(bk.querySelectorAll(".bkpage"), { opacity: 0 }, { opacity: 1, duration: .6, delay: 1.1 }); }); }
  else { bk.classList.remove("closed"); const c = bk.querySelector(".bkcover"); c && (c.style.display = "none"); }
}
/* entrée depuis La Bible */
new MutationObserver(() => {
  const gt = document.getElementById("goto"); if (!gt || document.getElementById("bpintro")) return;
  const s = document.createElement("section"); s.id = "bpintro"; s.className = "bpintro";
  s.innerHTML = `<small class="eyebrow">Avant de lire</small><h2>Découvre la Bible avant de l'ouvrir</h2><div class="bpsteps"><a href="#/biblepre/histoire"><i>1</i><b>Son histoire</b><span>Comment elle a été écrite, les plus vieux manuscrits, les traductions.</span></a><a href="#/biblepre/livre"><i>2</i><b>Le livre ouvert</b><span>Les 73 livres, qui les a écrits, et quand.</span></a><a href="#/biblepre/lire"><i>3</i><b>Lire une référence</b><span>Comprendre « Jn 3,16 » et retrouver un verset.</span></a><a href="#/biblepre/questions"><i>4</i><b>Questions courantes</b><span>La Bible est-elle fiable, Jésus a-t-il existé.</span></a></div>`;
  gt.parentNode.insertBefore(s, gt);
}).observe(document.body, { childList: true, subtree: true });
