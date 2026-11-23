/* Auréa v3 : navigation, gamification, avatar, journal, figures, cartes, expert, ressources. */

// ---------- état ----------
function ensure() {
  S.journal = S.journal || []; S.avatar = S.avatar || { ...AVATAR_DEFAUT }; S.xp = S.xp || 0; S.days = S.days || {};
  S.badges = S.badges || {}; S.met = S.met || {}; S.stats = S.stats || {}; S.recent = S.recent || []; S.favs = S.favs || [];
  S.prog = S.prog || {}; S.read = S.read || {}; S.model = S.model || "claude-sonnet-5-5"; S.ask = S.ask || [];
  if (S.notes && S.notes.length) { S.notes.forEach(n => S.journal.push({ id: "n" + n.t, d: dkey(new Date(n.t)), t: n.t, mood: null, tags: [n.k && n.k !== "Note" ? "Évangile" : "Pensée"], title: "", text: n.x })); S.notes = []; }
  if (S.reperes && S.prog.reperes == null) S.prog.reperes = S.reperes;
  save();
}
const dkey = d => { const x = new Date(d); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
function streak(st) {
  const days = st.days || {}; let n = 0, d = new Date();
  if (!days[dkey(d)]) d.setDate(d.getDate() - 1);
  while (days[dkey(d)]) { n++; d.setDate(d.getDate() - 1); }
  return n;
}
function lvlInfo() {
  const x = S.xp || 0; let n = 0; NIVEAUX.forEach((l, i) => { if (x >= l[0]) n = i; });
  const nx = NIVEAUX[n + 1];
  return { n: n + 1, name: NIVEAUX[n][1], xp: x, next: nx ? nx[0] : null, pct: nx ? (x - NIVEAUX[n][0]) / (nx[0] - NIVEAUX[n][0]) : 1 };
}
function gain(pts, why) {
  const before = lvlInfo().n;
  S.xp = (S.xp || 0) + pts; S.days[dkey(new Date())] = true; save();
  toast(`+${pts} lumière${pts > 1 ? "s" : ""}`);
  const after = lvlInfo();
  if (after.n > before) setTimeout(() => toast(`Niveau ${after.name} atteint. Un nouvel objet t'attend pour ton avatar.`), 1500);
  checkBadges();
}
function checkBadges() {
  BADGES.forEach(b => { if (!S.badges[b.id] && b.test(S)) { S.badges[b.id] = Date.now(); save(); setTimeout(() => toast(`Nouvelle médaille, ${b.t}`), 2300); } });
}
// remplace l'ancienne version de markDone
markDone = function (id) { if (!S.done[id]) { S.done[id] = Date.now(); save(); gain(id.startsWith("plan_") ? 10 : 12, id); } };
function addJournal(e) {
  const now = new Date(); const entry = { id: "j" + now.getTime(), d: e.d || dkey(now), t: now.getTime(), mood: e.mood || null, tags: e.tags || [], title: e.title || "", text: e.text, fav: false };
  S.journal.unshift(entry); save();
  const today = S.journal.filter(x => x.d === dkey(now)).length;
  if (today === 1) gain(4, "journal"); else checkBadges();
  return entry;
}
function unlockedItem(lock) {
  if (!lock) return true;
  if (lock.niv) return lvlInfo().n >= lock.niv;
  if (lock.badge) return !!S.badges[lock.badge];
  return true;
}
function lockText(lock) { return lock.niv ? `Niveau ${lock.niv}, ${NIVEAUX[lock.niv - 1][1]}` : `Médaille ${BADGES.find(b => b.id === lock.badge).t}`; }

// ---------- navigation et retrouvailles ----------
const NAV = [
  ["home", "Accueil", ["", "home"]], ["chemin", "Mon chemin", ["chemin", "reperes", "bases", "priere", "bible", "plans", "jesus", "jeu", "evangile", "messe", "messe1", "contact", "sacrements", "chapelet", "courants", "activite", "pelerinages", "communaute"]],
  ["journal", "Mon journal", ["journal", "carnet"]], ["figures", "Les figures de la foi", ["figures"]], ["jesuscarte", "Sur les pas de Jésus", ["jesuscarte"]],
  ["faq", "Questions", ["faq"]], ["ressources", "Ressources et boutique", ["ressources", "videos", "ponts"]], ["profil", "Mon compagnon", ["profil"]]
];
function track(title) {
  const r = route()[0];
  if (["", "home", "onboarding", "reglages"].includes(r)) return;
  const h = location.hash;
  S.recent = [{ r: h, t: title, at: Date.now() }, ...(S.recent || []).filter(x => x.r !== h)].slice(0, 8); save();
}
sidebar = function () {
  const cur = route()[0] || "home", info = lvlInfo(), last = (S.recent || [])[0];
  return `<aside class="side"><a class="brand" href="#/">${logoMark()}Auréa</a>
    <a class="me" href="#/profil">${avatarSvg(S.avatar, { ring: info.pct, cls: "mini" })}<span><b>${S.name ? esc(S.name) : "Toi"}</b><small>Niveau ${info.n}, ${info.name}</small></span></a>
    <nav class="mainnav">${NAV.map(([id, t, rs]) => `<a href="#/${id === "home" ? "" : id}" class="${rs.includes(cur) ? "cur" : ""}"><i class="ni">${navIcon(id)}</i>${esc(t)}</a>`).join("")}</nav>
    ${last ? `<div class="resume"><small>Reprendre</small><a href="${last.r}">${esc(last.t)}</a></div>` : ""}
    <div class="sidefoot"><button class="textbtn" id="finder">Retrouver vite</button><a href="#/reglages">Réglages</a></div></aside>`;
};
function navIcon(id) {
  const p = {
    home: "M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4Z", chemin: "M5 19 C5 12 12 14 12 9 C12 5 8 6 8 4 M17 20 L17 14 M14 17 H20", journal: "M6 4 H18 V20 H6Z M9 8 H15 M9 12 H15",
    figures: "M12 4 A4 4 0 1 1 11.9 4 M5 20 Q5 13 12 13 Q19 13 19 20Z", jesuscarte: "M12 21 C6 14 5 11 5 9 A7 7 0 0 1 19 9 C19 11 18 14 12 21Z M12 7 A2 2 0 1 1 11.9 7",
    faq: "M5 5 H19 V15 H11 L7 19 V15 H5Z", ressources: "M5 8 H19 L18 20 H6Z M9 8 V6 A3 3 0 0 1 15 6 V8", profil: "M12 3 A5 5 0 1 1 11.9 3 M4 21 Q4 13 12 13 Q20 13 20 21Z"
  }[id];
  return `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${p}"/></svg>`;
}
shell = function (title, html, back = "#/", cls = "") {
  track(title);
  const h = location.hash, fav = (S.favs || []).some(f => f.r === h), info = lvlInfo();
  app.innerHTML = `<div class="layout">${sidebar()}<div class="col"><header class="top"><a class="back" href="${back}" aria-label="Retour">‹</a><h1>${esc(title)}</h1>
    <span class="topact"><button class="iconbtn" id="favbtn" aria-label="${fav ? "Retirer des favoris" : "Garder cette page"}" title="${fav ? "Retirer des favoris" : "Garder cette page"}">${fav ? "★" : "☆"}</button><button class="iconbtn txt" id="finder2">Retrouver</button><a class="topme" href="#/profil" aria-label="Mon compagnon">${avatarSvg(S.avatar, { ring: info.pct, cls: "mini" })}</a></span></header>
    <main class="page ${cls}">${html}</main>${bottomNav()}</div></div>`;
  $("#favbtn").onclick = e => { const on = (S.favs || []).some(f => f.r === h); S.favs = on ? S.favs.filter(f => f.r !== h) : [{ r: h, t: title }, ...S.favs]; save(); e.currentTarget.textContent = on ? "☆" : "★"; toast(on ? "Retirée des favoris" : "Page gardée dans tes favoris"); };
  document.querySelectorAll("#finder,#finder2").forEach(b => b && (b.onclick = openFinder));
  bindGl();
};
function bottomNav() {
  const cur = route()[0] || "home";
  const items = [["home", "Accueil"], ["chemin", "Chemin"], ["journal", "Journal"], ["faq", "Questions"], ["profil", "Moi"]];
  return `<nav class="bottomnav">${items.map(([id, t]) => `<a href="#/${id === "home" ? "" : id}" class="${NAV.find(n => n[0] === id)[2].includes(cur) ? "cur" : ""}">${navIcon(id)}<span>${t}</span></a>`).join("")}</nav>`;
}
function openFinder() {
  let sh = $("#sheet"); if (!sh) { sh = document.createElement("div"); sh.id = "sheet"; document.body.appendChild(sh); }
  const li = x => `<li><a href="${x.r}">${esc(x.t)}</a></li>`;
  sh.innerHTML = `<div class="sheet finder"><b>Retrouver vite</b>
    <div class="cols2"><div><h4>Mes favoris</h4><ul>${(S.favs || []).length ? S.favs.map(li).join("") : "<li class='muted'>Touche l'étoile en haut d'une page pour la garder ici.</li>"}</ul></div>
    <div><h4>Vus récemment</h4><ul>${(S.recent || []).length ? S.recent.map(li).join("") : "<li class='muted'>Rien pour l'instant.</li>"}</ul></div></div>
    <div class="row"><a class="ghost" href="#/ressources">Ressources</a><button class="primary small" id="shx">Fermer</button></div></div>`;
  sh.className = "open"; $("#shx").onclick = () => sh.className = ""; sh.onclick = e => { if (e.target === sh) sh.className = ""; };
  sh.querySelectorAll("a").forEach(a => a.addEventListener("click", () => sh.className = ""));
}

// ---------- accueil sans défilement ----------
function ringAvatar(sz) { const i = lvlInfo(); return avatarSvg(S.avatar, { ring: i.pct, cls: sz }); }
function weekDots() {
  const out = []; const d = new Date(); d.setDate(d.getDate() - 6);
  for (let i = 0; i < 7; i++) { out.push(`<i class="${S.days[dkey(d)] ? "on" : ""}"></i>`); d.setDate(d.getDate() + 1); }
  return `<span class="week">${out.join("")}</span>`;
}
function dayPick(arr) { return arr[Math.floor(Date.now() / 864e5) % arr.length]; }
VIEWS.home = function () {
  const next = MODULES.find(m => !S.done[m.id] && unlocked(m) && !m.soon), info = lvlInfo(), fig = dayPick(FIGURES), st = streak(S);
  const prompt = dayPick(PROMPTS);
  const stations = MODULES.filter(m => !m.soon);
  const doneN = stations.filter(m => S.done[m.id]).length;
  app.innerHTML = `
    <div class="homewrap">
      <header class="hhero">${A.hero(sunLevel())}
        <div class="hh-in"><a class="brand" href="#/">${logoMark()}Auréa</a>
          <div class="hh-me"><a href="#/profil" class="hh-av">${ringAvatar("big")}</a>
            <div><h1>${S.name ? "Bonjour " + esc(S.name) : "Bonjour"}</h1><p>Niveau ${info.n}, <b>${info.name}</b></p>
              <div class="xpbar"><span style="width:${Math.round(info.pct * 100)}%"></span></div><small>${info.next ? info.next - info.xp + " lumières avant le niveau suivant" : "Niveau maximal"}</small></div>
            <div class="hh-stat"><b>${st}</b><small>jour${st > 1 ? "s" : ""} de lumière de suite</small>${weekDots()}</div></div></div></header>
      <nav class="htabs" role="tablist"><button class="on" data-h="a">Aujourd'hui</button><button data-h="b">Mon chemin</button><button data-h="c">Découvrir</button></nav>
      <div class="hgrid">
        <section class="hcol" data-c="a"><h3>Aujourd'hui</h3>
          ${next ? `<a class="next" href="#/${next.id}"><span class="nextill">${ill(next.ill)}</span><span class="nt"><small>Ta prochaine étape</small><h2>${esc(next.t)}</h2><p>${esc(next.d)}</p><b>Continuer →</b></span></a>` : `<div class="next"><span class="nt"><h2>Le chemin de départ est terminé</h2><p>Continue avec les figures, le journal et l'expert.</p></span></div>`}
          <a class="promptbox" href="#/journal" data-prompt="1"><small>Une idée pour ton journal</small><span>${esc(prompt)}</span><b>Écrire ›</b></a></section>
        <section class="hcol" data-c="b"><h3>Mon chemin <small>${doneN} sur ${stations.length}</small></h3>
          <ul class="stations">${stations.slice(0, 8).map(m => { const u = unlocked(m), d = S.done[m.id]; return `<li class="${d ? "done" : u ? "open" : "lock"}"><a ${u ? `href="#/${m.id}"` : ""}>${thumb(m.ill)}<span><b>${esc(m.t)}</b><small>${d ? "Terminé" : u ? esc(m.d) : "À débloquer"}</small></span><i>${d ? "✓" : u ? "›" : "·"}</i></a></li>`; }).join("")}</ul>
          <a class="ghost wide" href="#/chemin">Voir tout le chemin</a></section>
        <section class="hcol" data-c="c"><h3>Découvrir</h3>
          <a class="figday" href="#/figures/${fig.id}"><span class="fp">${portrait(fig)}</span><span><small>Figure du jour</small><b>${esc(fig.nom)}</b><em>${esc(fig.role)}</em></span></a>
          <div class="quick"><a href="#/jesuscarte">${A.chemin()}<b>Sur les pas de Jésus</b></a><a href="#/faq/expert">${A.quiz()}<b>Demander à l'expert</b></a><a href="#/ressources">${A.livre()}<b>Ressources</b></a><a href="#/journal">${A.crayon()}<b>Mon journal</b></a></div></section>
      </div></div>`;
  document.querySelectorAll(".htabs button").forEach(b => b.onclick = () => { document.querySelectorAll(".htabs button").forEach(x => x.classList.toggle("on", x === b)); document.querySelectorAll(".hcol").forEach(c => c.classList.toggle("show", c.dataset.c === b.dataset.h)); });
  document.querySelector('.hcol[data-c="a"]').classList.add("show");
  const pb = $("[data-prompt]"); if (pb) pb.onclick = () => { S.draft = { text: "", tags: [], prompt }; save(); };
};

// ---------- chemin (tout d'un coup d'œil) ----------
VIEWS.chemin = function () {
  const stages = [["Se repérer", ["reperes", "bases", "priere"]], ["Lire et comprendre", ["bible", "jeu", "evangile", "plans"]], ["Vivre sa foi", ["messe", "sacrements", "chapelet", "courants", "activite"]], ["Bientôt", ["pelerinages", "communaute"]]];
  shell("Mon chemin", `<p class="muted lead2">Tout ce que tu peux explorer, rangé par étape. Les cadenas se lèvent au fil de ta progression.</p>
    <div class="stages">${stages.map(([t, ids], si) => `<section class="stage"><h3><span>${si + 1}</span>${t}</h3><div class="stlist">${ids.map(id => { const m = MODULES.find(x => x.id === id), u = unlocked(m) && !m.soon, d = S.done[id]; return `<a class="st ${d ? "done" : u ? "open" : "lock"}" ${u ? `href="#/${id}"` : ""}>${thumb(m.ill)}<span><b>${esc(m.t)}</b><small>${u || d ? esc(m.d) : "Se débloque après " + esc(m.needs.map(n => MODULES.find(x => x.id === n).t.toLowerCase()).join(" et "))}</small></span><i>${d ? "✓" : u ? "›" : "🔒"}</i></a>`; }).join("")}</div></section>`).join("")}</div>`, "#/", "wide");
};

// ---------- figures ----------
VIEWS.figures = function (a) {
  let grp = FIG_GROUPS[0].id, cur = a && a[0] && FIGURES.find(f => f.id === a[0]) ? a[0] : null, mode = "grille";
  if (cur) grp = FIGURES.find(f => f.id === cur).g;
  const draw = () => {
    const list = mode === "frise" ? [...FIGURES].sort((x, y) => x.an - y.an) : FIGURES.filter(f => f.g === grp);
    if (!cur || !list.find(f => f.id === cur)) cur = list[0].id;
    const f = FIGURES.find(x => x.id === cur);
    if (!S.met[f.id]) { S.met[f.id] = Date.now(); save(); gain(2, "figure"); }
    const idx = list.findIndex(x => x.id === cur);
    shell("Les figures de la foi", `
      <div class="tabs"><span class="tgroup">${FIG_GROUPS.map(g => `<button class="tab ${mode === "grille" && g.id === grp ? "sel" : ""}" data-g="${g.id}">${g.t}</button>`).join("")}</span><button class="tab ${mode === "frise" ? "sel" : ""}" data-m="frise">Frise du temps</button></div>
      <div class="gal"><div class="gthumbs ${mode}">${list.map(x => `<button class="gt ${x.id === cur ? "sel" : ""} ${S.met[x.id] ? "" : "new"}" data-f="${x.id}"><span class="gp">${portrait(x)}</span><b>${esc(x.nom)}</b>${mode === "frise" ? `<small>${x.an < 0 ? "−" + -x.an : x.an}</small>` : ""}</button>`).join("")}</div>
      <article class="gdetail"><div class="gbig">${portrait(f)}</div><div class="gtext"><small class="eyebrow">${esc(f.role)}</small><h2>${esc(f.nom)}</h2>
        <ul class="facts"><li><b>Repère</b>${esc(f.dates)}</li>${f.fete ? `<li><b>Fête</b>${esc(f.fete)}</li>` : ""}${f.patron ? `<li><b>Patronage</b>${esc(f.patron)}</li>` : ""}</ul>
        <p class="text">${g(f.bio)}</p><p class="why"><b>Pourquoi c'est important</b>${g(f.pourquoi)}</p><p class="muted">À lire ${esc(f.ref)}</p>
        <div class="pager"><button class="textbtn" id="gp" ${idx === 0 ? "disabled" : ""}>‹ Précédent</button><span class="count">${idx + 1} sur ${list.length}</span><button class="primary small" id="gn" ${idx === list.length - 1 ? "disabled" : ""}>Suivant ›</button></div>
        <button class="ghost" id="gj">Écrire sur lui dans mon journal</button><p class="tip">Portraits dessinés pour Auréa. Les visages sont volontairement sans traits, pour laisser place à ce que chacun imagine.</p></div></article></div>`, "#/", "wide");
    document.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { grp = b.dataset.g; mode = "grille"; cur = null; draw(); });
    document.querySelector("[data-m]").onclick = () => { mode = "frise"; draw(); };
    document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { cur = b.dataset.f; draw(); });
    $("#gp").onclick = () => { cur = list[idx - 1].id; draw(); }; $("#gn").onclick = () => { cur = list[idx + 1].id; draw(); };
    $("#gj").onclick = () => { S.draft = { text: "", tags: ["Pensée"], title: f.nom }; save(); go("#/journal"); };
    const t = document.querySelector(".gt.sel"); t && t.scrollIntoView({ block: "nearest", inline: "center" });
  };
  draw();
};

// ---------- cartes : moteur de voyage pas à pas ----------
const MAPDET = [["GALILÉE", 35.2, 33.02], ["SAMARIE", 35.1, 32.3], ["JUDÉE", 34.95, 31.52], ["Mer de Galilée", 35.78, 32.82], ["Mer Morte", 35.75, 31.45], ["Jourdain", 35.74, 32.28]];
function mapBase() {
  const px = (lon, lat) => [(lon - 8) * 20, (46 - lat) * 20];
  const poly = (pts, cls) => `<polygon class="${cls}" points="${pts.map(p => px(...p).join(",")).join(" ")}"/>`;
  const line = (pts, cls) => `<polyline class="${cls}" points="${pts.map(p => px(...p).join(",")).join(" ")}"/>`;
  const lab = (lon, lat, s, cls = "") => { const [x, y] = px(lon, lat); return `<g class="mk ${cls}" data-x="${x}" data-y="${y}"><text>${s}</text></g>`; };
  const mtn = (lon, lat) => { const [x, y] = px(lon, lat); return `<path class="mtn" d="M${x - 6} ${y + 4} L${x - 1} ${y - 5} L${x + 2} ${y} L${x + 4} ${y - 3} L${x + 8} ${y + 4}Z"/>`; };
  return `<rect x="-400" y="-400" width="2000" height="1400" class="sea"/>` + poly(GEO.eurasie, "land") + poly(GEO.europe, "land") + [GEO.sicile, GEO.sardaigne, GEO.crete, GEO.chypre].map(p => poly(p, "land")).join("") +
    [GEO.noire, GEO.rouge, GEO.golfe, GEO.galilee, GEO.mortesea].map(p => poly(p, "sea")).join("") + [GEO.nil, GEO.euphrate, GEO.tigre, GEO.jourdain].map(p => line(p, "nil")).join("") +
    mtn(33.97, 28.55) + mtn(36.2, 34.1) + mtn(33.5, 37.2) + mtn(36.0, 34.5) +
    lab(18, 35, "Mer Méditerranée", "sealab") + lab(37.5, 24, "Mer Rouge", "sealab") + lab(33.5, 43.6, "Mer Noire", "sealab") + lab(27, 25.5, "ÉGYPTE", "landlab") + lab(44, 26, "ARABIE", "landlab") + lab(40.5, 38.5, "TURQUIE", "landlab") + lab(16, 43.9, "ITALIE", "landlab") + lab(22.2, 39.5, "GRÈCE", "landlab") + lab(44.5, 34, "MÉSOPOTAMIE", "landlab") +
    MAPDET.map(([s, lo, la]) => lab(lo, la, s, /^[A-ZÉ]+$/.test(s) ? "landlab detail" : "sealab detail")).join("");
}
function journeyView(cfg) {
  const stops = cfg.stops, N = stops.length; let i = Math.min((S.prog || {})[cfg.key] || 0, N - 1), vb = null, raf = 0;
  const px = (lon, lat) => [(lon - 8) * 20, (46 - lat) * 20];
  shell(cfg.title, `<div class="reperes"><div class="mapbox"><svg id="map" class="map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(cfg.title)}"><g id="base">${mapBase()}</g><g id="dyn"></g></svg><div class="legend"><span><i class="lg now"></i>Étape en cours</span><span><i class="lg past"></i>Déjà vu</span><span><i class="lg trl"></i>Trajet</span></div></div><div class="rp-text" id="rp"></div></div><ol class="frise ${cfg.chain ? "places" : ""}" id="frise"></ol>`, "#/", "wide");
  function target(s) {
    const [a, b, c, d] = s.vue; let x = (a - 8) * 20, y = (46 - d) * 20, w = (c - a) * 20, h = (d - b) * 20; const ar = 880 / 520;
    if (w / h < ar) { const nw = h * ar; x -= (nw - w) / 2; w = nw; } else { const nh = w / ar; y -= (nh - h) / 2; h = nh; }
    return [x, y, w, h];
  }
  function applyScale() {
    const svg = $("#map"); if (!svg || !vb) return;
    const u = vb[2] / (svg.clientWidth || 600);
    svg.setAttribute("viewBox", vb.join(" "));
    svg.querySelectorAll(".mk").forEach(m => { m.setAttribute("transform", `translate(${m.dataset.x} ${m.dataset.y}) scale(${u})`); if (m.classList.contains("detail")) m.style.display = vb[2] > 360 ? "none" : ""; });
    svg.querySelectorAll(".trail").forEach(t => t.style.strokeWidth = 4.5 * u);
    svg.querySelectorAll(".nil").forEach(t => t.style.strokeWidth = 2.6 * u);
  }
  function animate(to, instant) {
    cancelAnimationFrame(raf);
    if (!vb || instant) { vb = to; return applyScale(); }
    const from = vb.slice(), t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 900), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; vb = from.map((v, j) => v + (to[j] - v) * e); applyScale(); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  function update(first) {
    const s = stops[i]; S.prog[cfg.key] = i; save();
    let dyn = ""; const seen = new Map();
    for (let j = 0; j <= i; j++) {
      const r = stops[j]; let pts = [];
      if (cfg.chain) { if (j > 0) pts = [stops[j - 1].lieux[0], r.lieux[0]].map(l => px(l[1], l[2]).join(",")); }
      else pts = (r.trajet || []).map(k => px(r.lieux[k][1], r.lieux[k][2]).join(","));
      if (pts.length > 1) dyn += `<polyline class="trail ${j === i ? "now" : "past"}" pathLength="1" points="${pts.join(" ")}"/>`;
      r.lieux.forEach(l => seen.set(l[0], { l, now: j === i }));
    }
    seen.forEach(({ l, now }) => { const [x, y] = px(l[1], l[2]); dyn += `<g class="mk pin ${now ? "now" : "past"}" data-x="${x}" data-y="${y}"><circle r="${now ? 9 : 6}"/>${now || cfg.chain ? `<text x="${l[3]}" y="${l[4]}">${esc(l[0])}</text>` : ""}</g>`; });
    $("#dyn").innerHTML = dyn; animate(target(s), first); applyScale();
    $("#rp").innerHTML = `<div class="eyebrow">${esc(s.date)}</div><h2>${esc(s.t)}</h2><div class="rule"></div><p class="text">${g(s.b)}</p>${s.ref ? `<p class="muted">Dans la Bible ${esc(s.ref)}</p>` : ""}${s.note ? `<p class="tip">${esc(s.note)}</p>` : ""}${cfg.journal ? `<button class="ghost" id="jr">Noter ce que cela m'évoque</button>` : ""}
      <div class="pager"><button class="textbtn" id="prev" ${i === 0 ? "disabled" : ""}>‹ Précédent</button><span class="count">${i + 1} sur ${N}</span><button class="primary small" id="next">${s.fin ? "Terminer" : "Suivant ›"}</button></div>`;
    $("#prev").onclick = () => { i--; update(); };
    $("#next").onclick = () => { if (s.fin) { markDone(cfg.doneId); go("#/"); } else { i++; update(); } };
    const jr = $("#jr"); if (jr) jr.onclick = () => { S.draft = { text: "", tags: ["Évangile"], title: s.t }; save(); go("#/journal"); };
    const jes = cfg.jesusIdx != null ? cfg.jesusIdx : -1;
    $("#frise").innerHTML = stops.map((r, j) => `${j === jes ? `<li class="jesus-mark" aria-hidden="true"><span>Jésus</span></li>` : ""}<li class="${cfg.chain ? "ap" : j < jes ? "av" : "ap"} ${j < i ? "past" : ""} ${j === i ? "cur" : ""} ${j > i ? "fut" : ""}"><button ${j > i ? "disabled" : ""} data-j="${j}"><i></i><span>${esc(r.court)}</span></button></li>`).join("");
    document.querySelectorAll("[data-j]").forEach(b => b.onclick = () => { i = +b.dataset.j; update(); });
    const cur = $("#frise .cur"); cur && cur.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    bindGl();
  }
  update(true);
  window.addEventListener("resize", () => applyScale(), { once: true });
}
reperesView = function () { journeyView({ title: "Où en sommes-nous dans l'histoire ?", stops: REPERES, key: "reperes", doneId: "reperes", jesusIdx: REPERES.findIndex(r => r.jesus) }); };
VIEWS.jesuscarte = function () { journeyView({ title: "Sur les pas de Jésus", stops: JESUS_STOPS, key: "jesus", doneId: "jesuscarte", chain: true, journal: true }); };

// ---------- journal ----------
const MOIS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
VIEWS.journal = VIEWS.carnet = function () {
  const now = new Date(); let ym = { y: now.getFullYear(), m: now.getMonth() }, sel = dkey(now), q = "", favOnly = false, edit = null;
  const draft = S.draft || null; S.draft = null; save();
  let form = { mood: null, tags: draft ? draft.tags : [], title: draft?.title || "", text: draft?.text || "", prompt: draft?.prompt || null };
  const draw = () => {
    const first = new Date(ym.y, ym.m, 1), off = (first.getDay() + 6) % 7, nd = new Date(ym.y, ym.m + 1, 0).getDate();
    const byDay = {}; S.journal.forEach(e => (byDay[e.d] = byDay[e.d] || []).push(e));
    const cells = []; for (let k = 0; k < off; k++) cells.push(`<span class="dcell empty"></span>`);
    for (let d = 1; d <= nd; d++) { const key = `${ym.y}-${String(ym.m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`, es = byDay[key], mood = es && es.find(e => e.mood); cells.push(`<button class="dcell ${key === sel ? "sel" : ""} ${key === dkey(now) ? "today" : ""} ${es ? "has" : ""}" data-d="${key}"><b>${d}</b>${mood ? moodIcon(mood.mood) : es ? "<i class='dot'></i>" : ""}</button>`); }
    const results = q || favOnly ? S.journal.filter(e => (!favOnly || e.fav) && (!q || (e.text + " " + e.title + " " + e.tags.join(" ")).toLowerCase().includes(q.toLowerCase()))).slice(0, 12) : (byDay[sel] || []);
    const dn = new Date(sel + "T12:00:00"), title = q || favOnly ? `${results.length} page${results.length > 1 ? "s" : ""} trouvée${results.length > 1 ? "s" : ""}` : dn.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const days = Object.keys(byDay).length;
    shell("Mon journal", `<div class="book">
      <div class="leaf left"><div class="cal-h"><button class="iconbtn" id="pm" aria-label="Mois précédent">‹</button><b>${MOIS[ym.m]} ${ym.y}</b><button class="iconbtn" id="nm" aria-label="Mois suivant">›</button></div>
        <div class="dow"><span>L</span><span>M</span><span>M</span><span>J</span><span>V</span><span>S</span><span>D</span></div><div class="cal">${cells.join("")}</div>
        <div class="jstats"><span><b>${S.journal.length}</b> pages</span><span><b>${days}</b> jours écrits</span><span><b>${streak(S)}</b> de suite</span></div>
        <label class="field slim"><input id="jq" placeholder="Chercher dans mon journal" value="${esc(q)}"></label><label class="check slim"><input type="checkbox" id="jf" ${favOnly ? "checked" : ""}> Mes pages favorites</label></div>
      <div class="leaf right"><h2 class="jdate">${esc(title)}</h2>
        <div class="entries">${results.length ? results.map(e => entryHtml(e)).join("") : `<p class="empty-note">Rien d'écrit ce jour-là. La page est à toi.</p>`}</div>
        <form class="jform" id="jform"><div class="moods">${MOODS.map(([k, n]) => `<button type="button" class="mood-b ${form.mood === k ? "sel" : ""}" data-mood="${k}" title="${n}">${moodIcon(k)}<span>${n}</span></button>`).join("")}</div>
          <input id="jt" placeholder="Un titre (facultatif)" value="${esc(form.title)}"><textarea id="jx" rows="4" placeholder="${esc(form.prompt || "Écris ce qui te vient, comme à un ami.")}">${esc(form.text)}</textarea>
          <div class="tagrow">${TAGS.map(t => `<button type="button" class="tagb ${form.tags.includes(t) ? "sel" : ""}" data-tg="${t}">${t}</button>`).join("")}</div>
          <div class="row"><button type="button" class="textbtn" id="jp">Une idée d'écriture</button><button class="primary small" type="submit">Ajouter à ma page</button></div></form></div></div>`, "#/", "wide");
    $("#pm").onclick = () => { ym.m--; if (ym.m < 0) { ym.m = 11; ym.y--; } draw(); }; $("#nm").onclick = () => { ym.m++; if (ym.m > 11) { ym.m = 0; ym.y++; } draw(); };
    document.querySelectorAll("[data-d]").forEach(b => b.onclick = () => { sel = b.dataset.d; q = ""; favOnly = false; keep(); draw(); });
    $("#jq").oninput = e => { q = e.target.value; keep(); const p = e.target.selectionStart; draw(); const n = $("#jq"); n.focus(); n.setSelectionRange(p, p); };
    $("#jf").onchange = e => { favOnly = e.target.checked; keep(); draw(); };
    document.querySelectorAll("[data-mood]").forEach(b => b.onclick = () => { keep(); form.mood = form.mood === b.dataset.mood ? null : b.dataset.mood; draw(); });
    document.querySelectorAll("[data-tg]").forEach(b => b.onclick = () => { keep(); const t = b.dataset.tg; form.tags = form.tags.includes(t) ? form.tags.filter(x => x !== t) : [...form.tags, t]; draw(); });
    $("#jp").onclick = () => { keep(); form.prompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)]; draw(); };
    $("#jform").onsubmit = ev => { ev.preventDefault(); keep(); if (!form.text.trim()) return; addJournal({ d: sel, mood: form.mood, tags: form.tags, title: form.title.trim(), text: form.text.trim() }); form = { mood: null, tags: [], title: "", text: "", prompt: null }; draw(); };
    document.querySelectorAll("[data-fav]").forEach(b => b.onclick = () => { const e = S.journal.find(x => x.id === b.dataset.fav); e.fav = !e.fav; save(); keep(); draw(); });
    document.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { if (confirm("Supprimer cette page ?")) { S.journal = S.journal.filter(x => x.id !== b.dataset.del); save(); keep(); draw(); } });
  };
  const keep = () => { const t = $("#jt"), x = $("#jx"); if (t) form.title = t.value; if (x) form.text = x.value; };
  draw();
};
function entryHtml(e) {
  const tm = new Date(e.t).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  return `<article class="entry-j">${e.mood ? moodIcon(e.mood) : ""}<div><div class="ej-h"><small>${esc(e.d === dkey(new Date(e.t)) ? tm : e.d)}${e.tags.length ? " · " + e.tags.map(esc).join(", ") : ""}</small><span><button class="iconbtn sm" data-fav="${e.id}" aria-label="Favori">${e.fav ? "★" : "☆"}</button><button class="iconbtn sm" data-del="${e.id}" aria-label="Supprimer">🗑</button></span></div>${e.title ? `<h3>${esc(e.title)}</h3>` : ""}<p>${esc(e.text).replace(/\n/g, "<br>")}</p></div></article>`;
}

// ---------- questions : FAQ et expert Claude ----------
VIEWS.faq = function (a) {
  let tab = a && a[0] === "expert" ? "expert" : "faq";
  const draw = () => { tab === "expert" ? expertView(() => draw(), t => { tab = t; draw(); }) : faqView(t => { tab = t; draw(); }); };
  draw();
};
function faqTabs(tab) { return `<div class="tabs"><button class="tab ${tab === "faq" ? "sel" : ""}" data-tab="faq">Questions fréquentes</button><button class="tab ${tab === "expert" ? "sel" : ""}" data-tab="expert">Demander à l'expert</button></div>`; }
function faqView(setTab) {
  let cur = 0, q = "";
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const list = () => { const w = norm(q).split(/\W+/).filter(x => x.length > 2); if (!w.length) return FAQ.map((f, i) => ({ f, i })); return FAQ.map((f, i) => ({ f, i, s: w.filter(x => norm(f.q + " " + f.k).includes(x)).length })).filter(x => x.s).sort((a, b) => b.s - a.s); };
  const draw = () => {
    const L = list(); if (!L.find(x => x.i === cur) && L[0]) cur = L[0].i; const f = FAQ[cur];
    shell("Questions", `${faqTabs("faq")}<label class="field big slim">Cherche une question<input id="q" value="${esc(q)}" placeholder="Ex. pourquoi se faire baptiser ?"></label>
      <div class="md faqmd"><div class="mlist">${L.length ? L.slice(0, 9).map(x => `<button class="${x.i === cur ? "sel" : ""}" data-f="${x.i}">${esc(x.f.q)}</button>`).join("") : `<p class="muted">Pas de réponse toute prête. Demande à l'expert, il peut répondre à toute question.</p><button class="primary small" id="toexp">Demander à l'expert</button>`}</div>
        <div class="mdetail">${L.length ? `<h2>${esc(f.q)}</h2><p class="text">${g(f.a)}</p><button class="ghost" id="askmore">Aller plus loin avec l'expert</button>` : ""}</div></div>`, "#/", "wide");
    $("[data-tab=expert]").onclick = () => setTab("expert");
    const inp = $("#q"); inp.oninput = e => { q = e.target.value; const p = e.target.selectionStart; draw(); const n = $("#q"); n.focus(); n.setSelectionRange(p, p); };
    document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { cur = +b.dataset.f; S.stats.faq = (S.stats.faq || 0) + 1; save(); checkBadges(); draw(); });
    const am = $("#askmore"); if (am) am.onclick = () => { S.askSeed = FAQ[cur].q; save(); setTab("expert"); };
    const te = $("#toexp"); if (te) te.onclick = () => { S.askSeed = q; save(); setTab("expert"); };
  };
  draw();
}
function fmtAnswer(t) { return t.split(/\n{2,}/).map(p => `<p>${g(p.replace(/\*\*(.+?)\*\*/g, "$1").replace(/^#+\s*/gm, "").replace(/^[-*]\s+/gm, "• "))}</p>`).join(""); }
function expertView(redraw, setTab) {
  const hasKey = !!S.apiKey; let busy = false;
  const msgs = () => S.ask.map((m, i) => m.r === "u" ? `<div class="msg me"><p>${esc(m.x)}</p></div>` : `<div class="msg ai"><span class="av-e">${logoMark()}</span><div class="mb">${fmtAnswer(m.x)}<button class="textbtn" data-keep="${i}">Garder dans mon journal</button></div></div>`).join("");
  shell("Questions", `${faqTabs("expert")}
    ${!hasKey ? `<div class="split keybox"><div class="visual">${A.quiz()}</div><div><h2>Un expert du catéchisme, avec ta clé Claude</h2>
      <p class="text">Pose toutes les questions que tu veux sur la foi catholique. Claude répond comme un catéchiste patient, avec des mots simples, la Bible et le Catéchisme pour s'appuyer, et sans cacher les débats.</p>
      <label class="field">Ta clé API Anthropic<input id="key" type="password" placeholder="sk-ant-..." autocomplete="off" spellcheck="false"></label>
      <p class="tip">La clé reste uniquement sur cet appareil, dans ton navigateur. Elle n'est envoyée qu'à Anthropic, à chaque question. Les questions sont facturées sur ton compte. N'utilise pas cette fonction sur un appareil partagé. Tu peux créer une clé sur console.anthropic.com et fixer une limite de dépense.</p>
      <button class="primary" id="savekey">Enregistrer la clé</button></div></div>`
      : `<div class="chat"><div class="msgs" id="msgs">${S.ask.length ? msgs() : `<div class="hello-e"><h2>Pose ta question</h2><p class="muted">L'expert répond en français, avec des mots simples. Il ne remplace pas un prêtre ni un accompagnateur.</p><div class="chips starters">${EXPERT_STARTERS.map(s => `<button class="chipb" data-s="${esc(s)}">${esc(s)}</button>`).join("")}</div></div>`}</div>
      <form class="askform" id="askform"><textarea id="askx" rows="2" placeholder="Écris ta question…" aria-label="Ta question"></textarea><button class="primary small" id="asksend" type="submit">Envoyer</button></form>
      <div class="askmeta"><label>Modèle <select id="model">${[["claude-sonnet-5-5", "Sonnet 5.5, équilibré"], ["claude-opus-5-5", "Opus 5.5, le plus approfondi"], ["claude-haiku-5-5", "Haiku 5.5, le plus rapide"]].map(([v, n]) => `<option value="${v}" ${S.model === v ? "selected" : ""}>${n}</option>`).join("")}</select></label><button class="textbtn" id="newchat">Nouvelle conversation</button><button class="textbtn" id="rmkey">Retirer ma clé</button></div></div>`}`, "#/", "wide");
  $("[data-tab=faq]").onclick = () => setTab("faq");
  if (!hasKey) { $("#savekey").onclick = () => { const k = $("#key").value.trim(); if (!k.startsWith("sk-ant-")) return toast("Cette clé ne ressemble pas à une clé Anthropic"); S.apiKey = k; save(); redraw(); }; return; }
  const box = $("#msgs"); box.scrollTop = box.scrollHeight;
  $("#model").onchange = e => { S.model = e.target.value; save(); };
  $("#newchat").onclick = () => { S.ask = []; save(); redraw(); };
  $("#rmkey").onclick = () => { if (confirm("Retirer ta clé de cet appareil ?")) { S.apiKey = null; save(); redraw(); } };
  document.querySelectorAll("[data-s]").forEach(b => b.onclick = () => send(b.dataset.s));
  document.querySelectorAll("[data-keep]").forEach(b => b.onclick = () => { const i = +b.dataset.keep; addJournal({ tags: ["Question"], title: S.ask[i - 1] ? S.ask[i - 1].x.slice(0, 80) : "Réponse de l'expert", text: S.ask[i].x }); toast("Gardé dans ton journal"); });
  $("#askform").onsubmit = e => { e.preventDefault(); send($("#askx").value); };
  $("#askx").onkeydown = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); $("#askform").requestSubmit(); } };
  if (S.askSeed) { const s = S.askSeed; S.askSeed = null; save(); $("#askx").value = s; $("#askx").focus(); }
  async function send(text) {
    text = (text || "").trim(); if (!text || busy) return; busy = true;
    S.ask.push({ r: "u", x: text }); S.ask.push({ r: "a", x: "" }); save();
    S.stats.ask = (S.stats.ask || 0) + 1;
    const idx = S.ask.length - 1; const mount = () => { $("#msgs").innerHTML = msgs(); $("#msgs").scrollTop = 1e9; };
    mount(); $("#askx").value = ""; $("#asksend").disabled = true;
    const hist = S.ask.slice(0, -1).slice(-12).map(m => ({ role: m.r === "u" ? "user" : "assistant", content: m.x }));
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": S.apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: S.model, max_tokens: 1200, stream: true, system: EXPERT_SYSTEM, messages: hist }) });
      if (!r.ok) { let m = ""; try { m = (await r.json()).error?.message || ""; } catch {} throw new Error(r.status === 401 ? "Ta clé n'est pas acceptée. Vérifie-la dans la console Anthropic." : r.status === 429 ? "Trop de demandes pour le moment. Réessaie dans un instant." : m || "Erreur " + r.status); }
      const rd = r.body.getReader(), dec = new TextDecoder(); let buf = "";
      while (true) {
        const { value, done } = await rd.read(); if (done) break; buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n"); buf = lines.pop();
        for (const ln of lines) { if (!ln.startsWith("data:")) continue; try { const j = JSON.parse(ln.slice(5)); if (j.type === "content_block_delta" && j.delta?.text) { S.ask[idx].x += j.delta.text; mount(); } if (j.type === "error") throw new Error(j.error?.message || "Erreur du service"); } catch (e) { if (e.message && !/JSON/.test(e.message)) throw e; } }
      }
      if (!S.ask[idx].x) S.ask[idx].x = "Je n'ai pas de réponse à te donner pour le moment. Réessaie.";
      save(); checkBadges(); if (S.stats.ask === 1) gain(5, "expert");
    } catch (e) {
      S.ask[idx].x = (S.ask[idx].x ? S.ask[idx].x + "\n\n" : "") + "Je n'ai pas pu répondre. " + (e.message || "Vérifie ta connexion."); save();
    }
    busy = false; mount(); const b = $("#asksend"); if (b) b.disabled = false;
  }
}

// ---------- ressources et boutique ----------
VIEWS.ressources = function (a) {
  let tab = a && a[0] ? a[0] : "bible";
  const draw = () => {
    const cat = RESSOURCES.find(c => c.id === tab), icons = { bible: A.livre, chapelet: A.priere, prier: A.crayon, foi: A.bibliotheque, objets: A.bati };
    shell("Ressources et boutique", `<div class="tabs">${RESSOURCES.map(c => `<button class="tab ${tab === c.id ? "sel" : ""}" data-r="${c.id}">${c.t}</button>`).join("")}<button class="tab ${tab === "gratuit" ? "sel" : ""}" data-r="gratuit">Gratuit et utile</button><button class="tab ${tab === "videos" ? "sel" : ""}" data-r="videos">Vidéos</button></div>
      ${cat ? `<div class="split shop"><div class="visual">${icons[cat.id]()}<p class="tip">${AMAZON_TAG ? "Les liens Amazon sont des liens partenaires. Un petit pourcentage aide Auréa, sans coût pour toi." : "Les liens Amazon ouvrent une recherche. Tu peux aussi chercher en librairie religieuse près de chez toi."}</p></div>
        <div><h2>${cat.t}</h2><p class="text">${esc(cat.intro)}</p><ul class="shoplist">${cat.items.map(it => `<li><div><b>${esc(it.n)}</b><span>${esc(it.d)}</span></div><span class="btns"><a class="primary small" target="_blank" rel="noopener sponsored" href="${amazon(it.q)}">Voir sur Amazon</a><a class="textbtn" target="_blank" rel="noopener" href="${gsearch(it.q + " librairie catholique")}">En librairie</a></span></li>`).join("")}</ul></div></div>` : tab === "gratuit" ? `<div class="linkgrid">${LIENS_GRATUITS.map(l => `<a class="lk" target="_blank" rel="noopener" href="${l.u}"><b>${esc(l.n)}</b><span>${esc(l.d)}</span><i>›</i></a>`).join("")}</div>` : ""}`, "#/", "wide");
    document.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { if (b.dataset.r === "videos") return go("#/videos"); tab = b.dataset.r; draw(); });
  };
  draw();
};

// ---------- profil, avatar, médailles ----------
VIEWS.profil = function () {
  let part = "skin";
  const draw = () => {
    const info = lvlInfo(), av = S.avatar, st = streak(S);
    const swatch = (key, arr, extra) => arr.map((c, i) => `<button class="sw ${av[key] === i ? "sel" : ""}" style="background:${c}" data-k="${key}" data-v="${i}" aria-label="${key} ${i + 1}"></button>`).join("");
    const chips = (key, arr) => arr.map(it => { const [id, label, lock] = it, ok = unlockedItem(lock); return `<button class="chipb ${av[key] === id ? "sel" : ""} ${ok ? "" : "locked"}" ${ok ? `data-k="${key}" data-v="${id}"` : "disabled"}>${ok ? "" : "🔒 "}${label}${ok ? "" : `<small>${lockText(lock)}</small>`}</button>`; }).join("");
    const panels = { skin: `<div class="swatches">${swatch("skin", AV.skin)}</div>`, hair: `<div class="chips">${chips("hair", AV.hair.map(h => [h[0], h[1], null]))}</div><div class="swatches">${swatch("hairColor", AV.hairColor)}</div>`, outfit: `<div class="chips">${chips("outfit", AV.outfit)}</div><div class="swatches">${swatch("outfitColor", AV.outfitColor)}</div>`, acc: `<div class="chips">${chips("acc", AV.acc)}</div>`, bg: `<div class="chips">${chips("bg", AV.bg.map(b => [b[0], b[1], b[2]]))}</div>` };
    shell("Mon compagnon", `<div class="profile"><section class="pcard"><div class="pav">${avatarSvg(av, { ring: info.pct })}</div><h2>${S.name ? esc(S.name) : "Toi"}</h2><p class="lvl">Niveau ${info.n}, <b>${info.name}</b></p>
        <div class="xpbar"><span style="width:${Math.round(info.pct * 100)}%"></span></div><small>${info.xp} lumières${info.next ? ", encore " + (info.next - info.xp) + " avant le niveau suivant" : ""}</small>
        <div class="pstats"><span><b>${st}</b>jours de suite</span><span><b>${Object.keys(S.days).length}</b>jours de lumière</span><span><b>${Object.keys(S.badges).length}</b>médailles</span></div><div class="weekline"><small>Cette semaine</small>${weekDots()}</div></section>
      <section class="editor"><h3>Crée ton avatar</h3><div class="tabs tabsm">${[["skin", "Peau"], ["hair", "Cheveux"], ["outfit", "Tenue"], ["acc", "Accessoire"], ["bg", "Fond"]].map(([k, n]) => `<button class="tab ${part === k ? "sel" : ""}" data-p="${k}">${n}</button>`).join("")}</div><div class="panel">${panels[part]}</div>
        <button class="textbtn" id="rnd">Au hasard</button>
        <h3>Mes médailles <small>${Object.keys(S.badges).length} sur ${BADGES.length}</small></h3>
        <div class="medals">${BADGES.map(b => { const ok = !!S.badges[b.id]; return `<div class="mdl ${ok ? "got" : ""}" title="${esc(b.d)}">${medal(b.icon, !ok)}<b>${esc(b.t)}</b><small>${ok ? "Gagnée" : esc(b.d)}</small></div>`; }).join("")}</div></section></div>`, "#/", "wide");
    document.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { part = b.dataset.p; draw(); });
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { const k = b.dataset.k, v = b.dataset.v; S.avatar[k] = /^\d+$/.test(v) ? +v : v; save(); draw(); });
    $("#rnd").onclick = () => { const r = n => Math.floor(Math.random() * n), ok = arr => arr.filter(x => unlockedItem(x[2])); S.avatar = { skin: r(6), hairColor: r(6), hair: AV.hair[r(5)][0], outfit: ok(AV.outfit)[0][0], outfitColor: r(8), acc: AV.acc.filter(x => unlockedItem(x[2]))[0][0], bg: AV.bg.filter(x => unlockedItem(x[2]))[0][0] }; const o = ok(AV.outfit); S.avatar.outfit = o[r(o.length)][0]; save(); draw(); };
  };
  draw();
};
