// Récits complets : lecture par chapitres et frise chronologique
RUBRIQUES.recit = ["Récit complet", "figures"];
function longsAll() {
  const out = {};
  const add = (o) => { if (!o) return; Object.keys(o).forEach(k => { out[k] = o[k]; }); };
  if (typeof LONGS_JESUS !== "undefined") {
    const ch = []; (LONGS_JESUS.parties || []).forEach(p => (p.chapitres || []).forEach(c => ch.push({ ...c, part: p.t })));
    out.jesus = { ...LONGS_JESUS, chapitres: ch };
  }
  [typeof LONGS_BIBLE !== "undefined" && LONGS_BIBLE, typeof LONGS_SAINTS !== "undefined" && LONGS_SAINTS, typeof LONGS_SAINTS2 !== "undefined" && LONGS_SAINTS2, typeof LONGS_SAINTS3 !== "undefined" && LONGS_SAINTS3].forEach(add);
  return out;
}
VIEWS.recit = function (a) {
  const L = longsAll(), id = a[0], D = L[id], fig = FIGURES.find(f => f.id === id);
  if (!D || !fig) { shell("Récit complet", `<p class="lead2">Choisis une figure pour lire son récit complet.</p><ul class="rlist">${Object.keys(L).map(k => { const f = FIGURES.find(x => x.id === k); return f ? `<li><a href="#/recit/${k}"><b>${esc(f.nom)}</b><span>${esc(f.role)}</span><small>${(L[k].chapitres || []).length} chapitres</small></a></li>` : ""; }).join("")}</ul>`, "#/figures", "wide"); return; }
  const ch = D.chapitres || [], mode = ["frise", "apropos"].includes(a[1]) ? a[1] : "lire", n = Math.max(0, Math.min(ch.length - 1, +(a[1] === "c" ? a[2] : 0) || 0));
  S.longs = S.longs || {}; const st = S.longs[id] = S.longs[id] || { seen: {} };
  const c = ch[n];
  const tabs = `<div class="tabsm" id="rt"><a class="${mode === "lire" ? "on" : ""}" href="#/recit/${id}/c/${n}">Lire</a>${D.frise && D.frise.length ? `<a class="${mode === "frise" ? "on" : ""}" href="#/recit/${id}/frise">Frise du temps</a>` : ""}<a class="${mode === "apropos" ? "on" : ""}" href="#/recit/${id}/apropos">Conclusion et sources</a></div>`;
  let body = "";
  if (mode === "lire") {
    st.seen[n] = 1; save();
    let lastPart = null;
    const idx = `<ol class="rindex">${ch.map((x, i) => { const head = x.part && x.part !== lastPart ? `<li class="rpart">${esc(x.part)}</li>` : ""; lastPart = x.part || lastPart; return head + `<li><a class="${i === n ? "sel" : ""} ${st.seen[i] ? "seen" : ""}" href="#/recit/${id}/c/${i}"><i>${i + 1}</i><span>${esc(x.t)}</span></a></li>`; }).join("")}</ol>`;
    const side = [["explication", "Comprendre", c.explication && `<p>${g(c.explication)}</p>`], ["valeurs", "Valeurs", c.valeurs && c.valeurs.length && `<ul>${c.valeurs.map(v => `<li>${g(v)}</li>`).join("")}</ul>`], ["humanite", "Pour l'humanité", c.humanite && `<p>${g(c.humanite)}</p>`], ["contexte", "Contexte", c.contexte && `<p>${g(c.contexte)}</p>`]].filter(x => x[2]);
    body = `<div class="rmd">${idx}<article class="rchap"><small class="eyebrow">${c.part ? esc(c.part) + ", " : ""}${esc(c.lieu || "")}</small><h2>${esc(c.t)}</h2>${c.ref ? `<p class="muted fine">${esc(c.ref)}</p>` : ""}
      <div class="rbody"><div class="rtext">${(c.recit || []).map(p => `<p class="text">${g(p)}</p>`).join("")}</div>
      <aside class="rside"><div class="rtabs">${side.map((s, i) => `<button class="${i === 0 ? "on" : ""}" data-k="${s[0]}">${s[1]}</button>`).join("")}</div>${side.map((s, i) => `<div class="rpane" data-k="${s[0]}" ${i ? "hidden" : ""}>${s[2]}</div>`).join("")}${c.question ? `<p class="rq"><b>Pour y penser</b><br>${g(c.question)}</p>` : ""}</aside></div>
      <div class="pager"><button class="textbtn" id="rp" ${n === 0 ? "disabled" : ""}>‹ Chapitre précédent</button><span class="count">${n + 1} sur ${ch.length}</span><button class="textbtn" id="rn" ${n >= ch.length - 1 ? "disabled" : ""}>Chapitre suivant ›</button></div></article></div>`;
  } else if (mode === "frise") {
    const F = D.frise, ci = t => ch.findIndex(x => x.t === t);
    body = `<p class="lead2 short">Les grandes étapes dans l'ordre. Touche une étape pour lire le chapitre.</p><div class="rfrise">${F.map(m => { const i = ci(m.ch); return `<a class="rm" href="#/recit/${id}/c/${i < 0 ? 0 : i}"><b class="ry">${esc(m.an)}</b><i></i><span class="rt">${esc(m.t)}</span><span class="rx">${esc(m.x)}</span></a>`; }).join("")}</div><p class="muted fine">Les dates sont indiquées comme les sources les donnent. Quand elles sont approximatives, c'est précisé.</p>`;
  } else {
    body = `<div class="rabout"><p class="lead2 short">${g(D.intro || "")}</p><p class="text">${g(D.conclusion || "")}</p>${D.sources && D.sources.length ? `<h3>Sources</h3><ul class="plain">${D.sources.map(s => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}<p class="muted fine">Récit rédigé pour Auréa à partir des textes et sources cités. Ce qui relève de la tradition est signalé dans le texte. Vérifie les dates importantes dans les sources.</p></div>`;
  }
  shell(`${fig.nom}, récit complet`, `${tabs}${body}`, `#/figures/${id}`, "wide");
  document.querySelectorAll(".rtabs button").forEach(b => b.onclick = () => { document.querySelectorAll(".rtabs button").forEach(x => x.classList.toggle("on", x === b)); document.querySelectorAll(".rpane").forEach(p => p.hidden = p.dataset.k !== b.dataset.k); });
  const go2 = i => { location.hash = `#/recit/${id}/c/${i}`; window.scrollTo(0, 0); };
  if ($("#rp")) $("#rp").onclick = () => go2(n - 1);
  if ($("#rn")) $("#rn").onclick = () => go2(n + 1);
  if (mode === "lire" && n === ch.length - 1 && !st.done) { st.done = Date.now(); save(); if (typeof gain === "function") gain(8, "recit"); }
};
// bouton sur la fiche et à la fin de l'aventure animée
new MutationObserver(() => {
  const L = longsAll();
  const gt = document.querySelector(".gtools:not([data-rc])");
  if (gt) { gt.dataset.rc = 1; const sel = document.querySelector(".gi.sel[data-f]"), id = sel && sel.dataset.f; if (id && L[id]) { const a = document.createElement("a"); a.className = "ghost"; a.href = `#/recit/${id}`; a.innerHTML = `${typeof ico === "function" ? ico("histoire", 18) : ""} Récit complet`; gt.insertBefore(a, gt.children[1] || null); } }
  const sc = document.querySelector(".scontrols:not([data-rc])");
  if (sc) { sc.dataset.rc = 1; const m = location.hash.match(/#\/figures\/([^/]+)\/histoire/); if (m && L[m[1]]) { const a = document.createElement("a"); a.className = "textbtn"; a.href = `#/recit/${m[1]}`; a.textContent = "Récit complet"; sc.appendChild(a); } }
}).observe(document.body, { childList: true, subtree: true });
