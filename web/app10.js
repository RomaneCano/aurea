// Parcours guidés par temps liturgique, avec intentions et signes du Seigneur
RUBRIQUES.temps = ["Vivre un temps", "calendrier"];
const TEMPS_ORDRE = ["avent", "noel", "careme", "semainesainte", "paques"];
function tempsEdition(id) {
  const now = new Date(), t0 = new Date(now.getFullYear(), now.getMonth(), now.getDate()), day = 864e5;
  const per = y => {
    const L = feastsOf(y), F = k => (L.find(x => x.id === k) || {}).d;
    if (id === "avent") return [F("avent"), new Date(y, 11, 24)];
    if (id === "noel") { const L2 = feastsOf(y + 1); return [new Date(y, 11, 25), (L2.find(x => x.id === "bapteme") || {}).d]; }
    if (id === "careme") return [F("cendres"), new Date(+F("paques") - day)];
    if (id === "semainesainte") return [F("rameaux"), F("paques")];
    return [F("paques"), F("pentecote")];
  };
  for (const y of [t0.getFullYear() - 1, t0.getFullYear(), t0.getFullYear() + 1]) { const [a, b] = per(y); if (a && b && t0 <= b) return { y, a, b, key: id + y, now: t0 >= a }; }
  const y = t0.getFullYear() + 1, [a, b] = per(y); return { y, a, b, key: id + y, now: false };
}
const tempsFlat = id => TEMPS[id].semaines.flatMap((s, si) => s.jours.map(j => ({ ...j, semaine: s, si })));
const fdt = d => d.toLocaleDateString("fr-FR", { day: "numeric", month: "long" });
function tempsList() {
  return `<p class="lead2 short">Un parcours court pour chaque grand temps. Tu poses tes intentions, tu lis, tu pries, et chaque soir tu notes un signe du Seigneur.</p><ul class="tlist">${TEMPS_ORDRE.map(id => { const T = TEMPS[id], e = tempsEdition(id), st = (S.temps || {})[e.key]; return `<li><a href="#/temps/${id}"><span class="tn">${esc(T.nom)}</span><span class="tr">${esc(T.resume)}</span><span class="td">${e.now ? "En cours" : "Du " + fdt(e.a) + " au " + fdt(e.b)}${st && st.started ? " · commencé" : ""}</span><i>›</i></a></li>`; }).join("")}</ul>`;
}
VIEWS.temps = function (a) {
  const id = TEMPS[a[0]] ? a[0] : null; if (!id) { shell("Vivre un temps", tempsList(), "#/calendrier", "wide"); return; }
  const T = TEMPS[id], e = tempsEdition(id), flat = tempsFlat(id), day = 864e5;
  S.temps = S.temps || {}; const st = S.temps[e.key] = S.temps[e.key] || { started: false, inten: [], signes: {} }; st.signes = st.signes || {};
  const span = Math.round((e.b - e.a) / day) + 1, n = Math.min(flat.length, span);
  const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  const todayN = Math.max(0, Math.min(n - 1, Math.round((t0 - e.a) / day)));
  let tab = ["jour", "parcours", "comment", "bilan"].includes(a[1]) ? a[1] : (st.started ? "jour" : "debut"), sel = a[2] != null && !isNaN(+a[2]) ? Math.max(0, Math.min(n - 1, +a[2])) : todayN;
  const dateOf = i => new Date(+e.a + i * day);
  const refLink = r => { const p = typeof parseRef === "function" && parseRef(r); return p ? `<a class="primary small" href="#/lire/${p.code}/${p.ch || 1}${p.v ? "/" + p.v : ""}">Lire ${esc(r)}</a>` : `<b>${esc(r)}</b>`; };
  const dayHtml = () => {
    const d = flat[Math.min(sel, flat.length - 1)], dt = dateOf(sel), isT = e.now && sel === todayN, signe = st.signes[sel] || "";
    return `<div class="tday"><small class="eyebrow">${d.t ? esc(d.t) : "Jour " + (sel + 1) + " sur " + n}, ${fdt(dt)}${isT ? " · aujourd'hui" : ""}</small>
      ${d.sens ? `<p class="text">${g(d.sens)}</p>` : `<h3>${esc(d.semaine.theme)}</h3>`}
      <div class="tcols"><section><h4>Lire</h4><p>${refLink(d.ref)}</p><h4>Un petit geste</h4><p>${g(d.a)}</p></section>
      <section><h4>Méditer</h4><p>${g(d.p)}</p><h4>Prier</h4><p><b>${esc(T.priere.t)}</b><br>${g(T.priere.x)}</p></section>
      <section class="tsign"><h4>Un signe du Seigneur aujourd'hui</h4><p class="muted">${g(T.signes)}</p><textarea id="tsg" rows="3" placeholder="Ce soir, qu'est-ce que j'ai reçu ?">${esc(signe)}</textarea>
        <div class="toolrow"><button class="primary small" id="tsv">Enregistrer</button><button class="ghost small" id="tsj">Aussi dans mon journal</button></div></section></div>
      <div class="tnav"><button class="textbtn" id="tpv" ${sel === 0 ? "disabled" : ""}>‹ Jour précédent</button><span class="count">${sel + 1} sur ${n}</span><button class="textbtn" id="tnx" ${sel >= n - 1 ? "disabled" : ""}>Jour suivant ›</button></div></div>`;
  };
  const body = () => {
    if (tab === "debut") return `<div class="tstart"><h3>Avant de commencer</h3><p class="text">${g(T.sens)}</p><p class="muted">${e.now ? "Le temps a commencé, tu peux t'y mettre dès aujourd'hui." : "Ce temps commence le " + fdt(e.a) + ". Tu peux déjà poser tes intentions."}</p>
      <h4>Mes intentions</h4>${T.intentions.map((q, i) => `<label class="tq">${g(q)}<textarea rows="2" data-i="${i}">${esc(st.inten[i] || "")}</textarea></label>`).join("")}
      <div class="toolrow"><button class="primary" id="tgo">${st.started ? "Mettre à jour" : "Commencer ce parcours"}</button></div><p class="muted fine">Tes intentions sont aussi ajoutées dans « Mes intentions », pour que tu puisses voir plus tard lesquelles ont été exaucées.</p></div>`;
    if (tab === "jour") return dayHtml();
    if (tab === "parcours") return `<div class="tweeks">${T.semaines.map((s, si) => `<section><h4>${esc(s.t)}, ${esc(s.theme)}</h4><p class="muted">${g(s.intro || "")}</p><div class="tdots">${flat.map((j, i) => ({ j, i })).filter(x => x.j.si === si && x.i < n).map(({ i }) => `<a href="#/temps/${id}/jour/${i}" class="${st.signes[i] ? "has" : ""} ${i === todayN && e.now ? "now" : ""}" title="${fdt(dateOf(i))}"><b>${i + 1}</b><small>${st.signes[i] ? "signe noté" : fdt(dateOf(i))}</small></a>`).join("")}</div></section>`).join("")}</div>`;
    if (tab === "comment") return `<ol class="tipslist">${T.comment.map(c => `<li><span>${g(c)}</span></li>`).join("")}</ol>`;
    const signs = Object.keys(st.signes).filter(k => st.signes[k]).map(Number).sort((x, y) => x - y);
    return `<div class="tbilan"><h3>Relire mon parcours</h3>${signs.length ? `<ul class="tsigns">${signs.map(i => `<li><small class="muted">Jour ${i + 1}, ${fdt(dateOf(i))}</small><p>${esc(st.signes[i])}</p></li>`).join("")}</ul>` : `<p class="muted">Tu n'as pas encore noté de signe. Reviens ici quand tu en auras quelques-uns.</p>`}
      <h4>Pour faire le bilan</h4><ul class="plain">${T.bilan.map(q => `<li>${g(q)}</li>`).join("")}</ul><p><a class="textbtn" href="#/intentions">Voir mes intentions et celles qui ont été exaucées</a></p></div>`;
  };
  const draw = () => {
    shell(T.nom, `<p class="lead2 short">${g(T.resume)}</p><div class="tabsm" id="tt2">${[["debut", "Mes intentions"], ["jour", "Aujourd'hui"], ["parcours", "Le parcours"], ["comment", "Comment faire"], ["bilan", "Mon bilan"]].map(([k, l]) => `<button data-k="${k}" class="${tab === k ? "on" : ""}">${l}</button>`).join("")}</div>${body()}`, "#/calendrier", "wide");
    document.querySelectorAll("#tt2 button").forEach(b => b.onclick = () => { tab = b.dataset.k; draw(); });
    const q = s => document.querySelector(s);
    if (q("#tgo")) q("#tgo").onclick = () => { const vals = [...document.querySelectorAll(".tq textarea")].map(x => x.value.trim()); const before = st.inten.slice(); st.inten = vals; vals.forEach((v, i) => { if (v && v !== before[i]) addIntention(v, T.nom + " " + e.y); }); st.started = true; save(); toast("C'est parti"); tab = "jour"; draw(); };
    if (q("#tsv")) q("#tsv").onclick = () => { st.signes[sel] = q("#tsg").value.trim(); save(); if (st.signes[sel] && typeof gain === "function") gain(5, "signe"); toast("Noté"); };
    if (q("#tsj")) q("#tsj").onclick = () => { const x = q("#tsg").value.trim(); if (!x) return toast("Écris d'abord ton signe"); st.signes[sel] = x; S.journal = S.journal || []; S.journal.unshift({ id: "s" + Date.now(), d: dkey(new Date()), t: Date.now(), mood: null, tags: ["Signe du Seigneur"], title: T.nom + ", jour " + (sel + 1), text: x }); save(); toast("Ajouté au journal"); };
    if (q("#tpv")) q("#tpv").onclick = () => { sel--; draw(); };
    if (q("#tnx")) q("#tnx").onclick = () => { sel++; draw(); };
  };
  draw();
};
