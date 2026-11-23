/* Auréa v5 : les saints (favoris, saint patron, calendrier), aventures animées, autre saint par l'expert. */

function saintDuJour() {
  const now = new Date(), key = String(now.getMonth() + 1).padStart(2, "0") + "-" + String(now.getDate()).padStart(2, "0");
  const today = FIGURES.filter(f => f.fd === key);
  if (today.length) return { f: today[Math.floor(Date.now() / 864e5) % today.length], label: "Fêté aujourd'hui" };
  const up = FIGURES.filter(f => f.fd).map(f => ({ f, d: prochaineFete(f.fd) })).sort((a, b) => a.d - b.d)[0];
  return { f: up.f, label: up.d === 1 ? "Fêté demain" : `Fêté dans ${up.d} jours` };
}
function favS() { S.favSaints = S.favSaints || {}; return S.favSaints; }
function toggleFav(id) { const f = favS(); if (f[id]) delete f[id]; else f[id] = Date.now(); save(); checkBadges(); }
function feteTexte(f) { if (!f.fd) return null; const d = prochaineFete(f.fd); return d === 0 ? "C'est la fête aujourd'hui" : d === 1 ? "Fêté demain" : `Fête dans ${d} jours`; }
window.addEventListener("hashchange", () => clearTimeout(window.__st));

BADGES.push({ id: "conteur", t: "Conteur", d: "Tu as suivi cinq aventures de saints.", icon: "book", test: S => Object.keys(S.storiesSeen || {}).length >= 5 });
BADGES.push({ id: "amis_saints", t: "Ami des saints", d: "Cinq saints dans tes favoris.", icon: "people", test: S => Object.keys(S.favSaints || {}).length >= 5 });

const MOIS_COURT = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];
VIEWS.figures = function (a) {
  S.mySaints = S.mySaints || [];
  const [id, sub] = a || [];
  if (id && sub === "histoire" && STORIES[id]) return storyView(FIGURES.find(f => f.id === id));
  let mode = "grille", grp = FIG_GROUPS[0].id, cur = id && FIGURES.find(f => f.id === id) ? id : null;
  if (cur) grp = FIGURES.find(f => f.id === cur).g;
  const tabs = () => `<div class="tabs">${FIG_GROUPS.map(g => `<button class="tab ${mode === "grille" && g.id === grp ? "sel" : ""}" data-g="${g.id}">${g.t}</button>`).join("")}<span class="tsep"></span><button class="tab ${mode === "frise" ? "sel" : ""}" data-m="frise">Frise du temps</button><button class="tab ${mode === "cal" ? "sel" : ""}" data-m="cal">Calendrier des fêtes</button><button class="tab ${mode === "fav" ? "sel" : ""}" data-m="fav">Mes favoris</button><button class="tab ${mode === "autre" ? "sel" : ""}" data-m="autre">Un autre saint</button></div>`;
  const bindTabs = draw => {
    document.querySelectorAll("[data-g]").forEach(b => b.onclick = () => { grp = b.dataset.g; mode = "grille"; cur = null; draw(); });
    document.querySelectorAll("[data-m]").forEach(b => b.onclick = () => { mode = b.dataset.m; draw(); });
  };
  const draw = () => {
    if (mode === "cal") return calView();
    if (mode === "fav") return favView();
    if (mode === "autre") return autreView();
    const list = mode === "frise" ? [...FIGURES].sort((x, y) => x.an - y.an) : FIGURES.filter(f => f.g === grp);
    if (!cur || !list.find(f => f.id === cur)) cur = list[0].id;
    const f = FIGURES.find(x => x.id === cur), idx = list.findIndex(x => x.id === cur), fav = !!favS()[f.id], isPatron = S.patron === f.id, ft = feteTexte(f);
    if (!S.met[f.id]) { S.met[f.id] = Date.now(); save(); gain(2, "figure"); }
    shell("Les figures de la foi", `${tabs()}
      <div class="gal2"><aside class="gindex ${mode}"><ul>${list.map(x => `<li><button class="gi ${x.id === cur ? "sel" : ""}" data-f="${x.id}"><span class="gp">${figImg(x, true)}</span><span class="gn"><b>${esc(x.nom)}</b><small>${mode === "frise" ? (x.an < 0 ? "−" + -x.an : x.an) : esc(x.role)}</small></span>${favS()[x.id] ? `<i class="heart" aria-label="Favori">♥</i>` : ""}${STORIES[x.id] ? `<i class="play" aria-label="Aventure animée">▶</i>` : ""}</button></li>`).join("")}</ul></aside>
      <article class="gmain"><div class="ghero"><div class="gbig">${figImg(f)}</div><div class="gtitle"><small class="eyebrow">${esc(f.role)}</small><h2>${esc(f.nom)}</h2>
        <div class="gfacts"><div><small>Repère</small><b>${esc(f.dates)}</b></div>${f.fete ? `<div><small>Fête</small><b>${esc(f.fete)}${ft ? `<em>${ft}</em>` : ""}</b></div>` : ""}${f.patron ? `<div><small>Patronage</small><b>${esc(f.patron)}</b></div>` : ""}</div>
        <div class="gtools">${STORIES[f.id] ? `<a class="primary" href="#/figures/${f.id}/histoire">Voir son aventure animée</a>` : ""}<button class="ghost" id="fv">${fav ? "♥ Dans mes favoris" : "♡ Ajouter aux favoris"}</button>${f.fd ? `<button class="ghost" id="pt">${isPatron ? "Mon saint patron ✓" : "Choisir comme saint patron"}</button>` : ""}<button class="ghost" id="gj">Écrire dans mon journal</button></div></div></div>
        <div class="gbody"><section><h3>Son histoire</h3><p class="text">${g(f.bio)}</p></section><section class="why"><h3>Pourquoi c'est important</h3><p>${g(f.pourquoi)}</p></section>
        ${typeof detailHtml === "function" ? detailHtml(f) : ""}<section><h3>À lire</h3><p class="muted">${esc(f.ref)}</p></section></div>
        <div class="pager"><button class="textbtn" id="gp" ${idx === 0 ? "disabled" : ""}>‹ Précédent</button><span class="count">${idx + 1} sur ${list.length}</span><button class="textbtn" id="gn" ${idx === list.length - 1 ? "disabled" : ""}>Suivant ›</button></div>
        <p class="tip">${typeof figCredit === "function" ? figCredit(f) : "Portraits dessinés pour Auréa."}</p></article></div>`, "#/", "wide");
    bindTabs(draw);
    document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { cur = b.dataset.f; draw(); window.scrollTo(0, 0); });
    $("#gp").onclick = () => { cur = list[idx - 1].id; draw(); }; $("#gn").onclick = () => { cur = list[idx + 1].id; draw(); };
    $("#fv").onclick = () => { toggleFav(f.id); toast(favS()[f.id] ? "Ajouté à tes favoris" : "Retiré de tes favoris"); draw(); };
    const pt = $("#pt"); if (pt) pt.onclick = () => { S.patron = isPatron ? null : f.id; save(); toast(S.patron ? `${f.nom} est maintenant ton saint patron` : "Saint patron retiré"); draw(); };
    $("#gj").onclick = () => { S.draft = { text: "", tags: ["Pensée"], title: f.nom }; save(); go("#/journal"); };
    const t = document.querySelector(".gi.sel"); t && t.scrollIntoView({ block: "nearest" });
  };
  const calView = () => {
    const now = new Date(), m0 = now.getMonth();
    const months = Array.from({ length: 12 }, (_, i) => (m0 + i) % 12);
    shell("Les figures de la foi", `${tabs()}<p class="muted lead2">Les fêtes des figures présentes dans Auréa, à partir de ce mois-ci. Touche un nom pour découvrir son histoire.</p>
      <div class="calfetes">${months.map(m => { const L = FIGURES.filter(f => f.fd && +f.fd.slice(0, 2) === m + 1).sort((a, b) => +a.fd.slice(3) - +b.fd.slice(3)); if (!L.length) return ""; return `<section><h3>${["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"][m]}</h3><ul>${L.map(f => `<li><a href="#/figures/${f.id}"><span class="dj">${+f.fd.slice(3)}</span><span>${esc(f.nom)}</span>${favS()[f.id] ? "<i>♥</i>" : ""}</a></li>`).join("")}</ul></section>`; }).join("")}</div>`, "#/", "wide");
    bindTabs(draw);
  };
  const favView = () => {
    const L = FIGURES.filter(f => favS()[f.id]);
    shell("Les figures de la foi", `${tabs()}${S.patron ? `<p class="lead2">Ton saint patron est <a href="#/figures/${S.patron}">${esc(FIGURES.find(f => f.id === S.patron).nom)}</a>.</p>` : `<p class="muted lead2">Touche « Ajouter aux favoris » sur la fiche d'un saint. Tu peux aussi choisir ton saint patron.</p>`}
      ${L.length ? `<div class="favgrid">${L.map(f => `<a class="favcard" href="#/figures/${f.id}"><span class="fimg">${portrait(f)}</span><b>${esc(f.nom)}</b><small>${esc(f.role)}</small></a>`).join("")}</div>` : `<p class="empty-note">Aucun favori pour l'instant.</p>`}
      ${S.mySaints.length ? `<h3>Saints ajoutés par toi</h3>${S.mySaints.map((s, i) => `<article class="entry"><h2>${esc(s.nom)}</h2><div class="rich">${fmtAnswer(s.texte)}</div><button class="textbtn" data-rm="${i}">Retirer</button></article>`).join("")}` : ""}`, "#/", "wide");
    bindTabs(draw);
    document.querySelectorAll("[data-rm]").forEach(b => b.onclick = () => { S.mySaints.splice(+b.dataset.rm, 1); save(); favView(); });
  };
  const autreView = () => {
    shell("Les figures de la foi", `${tabs()}<div class="split"><div class="visual">${A.livre()}</div><div><h2>Un autre saint ?</h2>
      <p class="text">Il y a des milliers de saints. Écris le nom de celui ou celle qui t'intéresse, et l'expert te raconte son histoire en quelques scènes.</p>
      <form id="sf" class="goto"><label for="sn">Nom du saint ou de la sainte</label><div><input id="sn" placeholder="Par exemple, sainte Rita ou saint Christophe" autocomplete="off"><button class="primary" type="submit">Raconter</button></div></form>
      <div id="sres" class="expl" aria-live="polite"></div></div></div>`, "#/", "wide");
    bindTabs(draw);
    $("#sf").onsubmit = async e => {
      e.preventDefault(); const nom = $("#sn").value.trim(); if (!nom) return; const box = $("#sres");
      if (!S.apiKey) { box.innerHTML = `<p class="muted">Pour cette fonction, ajoute ta clé dans <a href="#/faq/expert">Demander à l'expert</a>. Elle reste dans ton navigateur.</p>`; return; }
      box.innerHTML = `<p class="muted">L'expert prépare le récit…</p>`; let out = "";
      try {
        await claudeStream(EXPERT_SYSTEM, [{ role: "user", content: `Raconte l'histoire de ${nom} à un débutant, en cinq courtes scènes. Pour chaque scène, donne le lieu et la date si tu les connais. Termine par sa fête et une idée à retenir. Distingue ce qui est historiquement établi de ce qui vient de la tradition. Si tu ne reconnais pas ce saint ou si tu n'es pas sûr des faits, dis-le clairement au lieu d'inventer.` }], t => { out += t; box.innerHTML = fmtAnswer(out); });
        box.innerHTML = fmtAnswer(out) + `<button class="ghost" id="ks">Garder dans mes favoris</button>`;
        $("#ks").onclick = () => { S.mySaints.push({ nom, texte: out }); save(); toast("Ajouté à tes favoris"); };
        S.stats.ask = (S.stats.ask || 0) + 1; save();
      } catch (err) { box.innerHTML = `<p class="muted">${esc(err.message || "Je n'ai pas pu répondre.")}</p>`; }
    };
  };
  draw();
};

// ---------- aventure animée ----------
function storyView(fig) {
  const scenes = STORIES[fig.id]; let i = 0, auto = true; S.storiesSeen = S.storiesSeen || {};
  const dur = s => Math.max(7000, s.x.length * 62);
  const draw = (replay) => {
    clearTimeout(window.__st);
    const s = scenes[i], last = i === scenes.length - 1, fav = !!favS()[fig.id];
    const idx = FIGURES.filter(f => STORIES[f.id]).findIndex(f => f.id === fig.id), all = FIGURES.filter(f => STORIES[f.id]), nxt = all[(idx + 1) % all.length];
    shell(`${fig.nom}, son aventure`, `<div class="storywrap">
      <div class="stage">${sceneSvg(s, fig, i)}</div>
      <div class="storyside"><small class="eyebrow">Scène ${i + 1} sur ${scenes.length}, ${esc(s.lieu)}</small><p class="text fadein">${g(s.x)}</p>
        <div class="scontrols"><button class="textbtn" id="sp" ${i === 0 ? "disabled" : ""}>‹ Avant</button><button class="ghost" id="spp">${auto ? "Pause" : "Lecture"}</button><button class="${last ? "ghost" : "primary small"}" id="sn">${last ? "Rejouer" : "Suite ›"}</button></div>
        <div class="sprog">${scenes.map((_, k) => `<i class="${k < i ? "on" : ""} ${k === i ? "cur" : ""} ${k === i && auto ? "run" : ""}" style="--d:${dur(s)}ms"></i>`).join("")}</div>
        ${artAside(fig, i)}<div class="toolrow"><button class="ghost" id="fv">${fav ? "♥ Dans mes favoris" : "♡ Ajouter aux favoris"}</button><a class="ghost" href="#/figures/${fig.id}">Sa fiche</a><button class="ghost" id="gj">Écrire dans mon journal</button></div>
        <p class="muted">Saint suivant, <a href="#/figures/${nxt.id}/histoire">${esc(nxt.nom)}</a></p></div></div>`, `#/figures/${fig.id}`, "wide");
    if (last && !S.storiesSeen[fig.id]) { S.storiesSeen[fig.id] = Date.now(); save(); gain(3, "histoire"); }
    $("#sp").onclick = () => { i--; auto = false; draw(); };
    $("#sn").onclick = () => { if (last) { i = 0; auto = true; } else { i++; } draw(); };
    $("#spp").onclick = () => { auto = !auto; draw(); };
    $("#fv").onclick = () => { toggleFav(fig.id); draw(); };
    $("#gj").onclick = () => { S.draft = { text: `${s.lieu}\n`, tags: ["Pensée"], title: fig.nom }; save(); go("#/journal"); };
    if (auto && !last) window.__st = setTimeout(() => { i++; draw(); }, dur(s));
  };
  draw();
}
