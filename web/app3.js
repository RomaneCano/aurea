/* Auréa v4 : style de site éditorial, accueil, lecture de la Bible avec explications. */

// ---------- structure du site (en-tête, fil d'Ariane, pied de page) ----------
const MENU = [
  ["prier", "Prier", ["prier", "chapelet"]],
  ["chemin", "Parcours", ["chemin", "reperes", "bases", "priere", "bible", "plans", "jesus", "jeu", "evangile", "messe", "messe1", "contact", "sacrements", "courants", "activite", "pelerinages", "communaute"]],
  ["lire", "La Bible", ["lire"]], ["figures", "Figures", ["figures"]], ["jesuscarte", "Cartes", ["jesuscarte"]],
  ["journal", "Journal", ["journal", "carnet"]], ["faq", "Questions", ["faq"]], ["ressources", "Ressources", ["ressources", "videos", "ponts"]]
];
function siteHead() {
  const cur = route()[0] || "home", info = lvlInfo();
  return `<header class="sitehead"><a class="brand" href="#/">${logoMark()}<span>Auréa</span></a>
    <nav class="menu" id="menu" aria-label="Menu principal">${MENU.map(([id, t, rs]) => `<a href="#/${id}" class="${rs.includes(cur) ? "cur" : ""}">${t}</a>`).join("")}<a class="only-m" href="#/profil">Mon compagnon</a><a class="only-m" href="#/reglages">Réglages</a></nav>
    <span class="hact"><button class="linkbtn" id="finder2">Retrouver</button><a class="me2" href="#/profil" title="Mon compagnon">${avatarSvg(S.avatar, { cls: "mini" })}<span><b>${S.name ? esc(S.name) : "Moi"}</b><small>Niveau ${info.n}</small></span></a><button class="burger" id="burger" aria-label="Ouvrir le menu" aria-expanded="false"><i></i><i></i><i></i></button></span></header>`;
}
function siteFoot() {
  return `<footer class="sitefoot"><div><a class="brand" href="#/">${logoMark()}<span>Auréa</span></a><p>Un petit pas à la fois.</p></div>
    <div><h4>Explorer</h4><a href="#/chemin">Parcours</a><a href="#/lire">La Bible</a><a href="#/figures">Figures de la foi</a><a href="#/jesuscarte">Cartes</a></div>
    <div><h4>Mon espace</h4><a href="#/journal">Journal</a><a href="#/profil">Mon compagnon</a><a href="#/ressources">Ressources</a><a href="#/reglages">Réglages</a></div>
    <div><h4>À savoir</h4><p>Texte biblique, Sainte Bible néo-Crampon Libre, © 2022 Fraternité de Tibériade, <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener">licence CC BY-SA 4.0</a>.</p></div></footer>`;
}
shell = function (title, html, back = "#/", cls = "") {
  track(title);
  const h = location.hash, fav = (S.favs || []).some(f => f.r === h);
  app.innerHTML = `<div class="site">${siteHead()}<div class="crumbs"><a class="back" href="${back}">‹ Retour</a><span class="trail"><a href="#/">Accueil</a><i>/</i><span>${esc(title)}</span></span><button class="linkbtn" id="favbtn">${fav ? "★ Page gardée" : "☆ Garder cette page"}</button></div>
    <main class="page ${cls}"><header class="pagehead"><h1>${esc(title)}</h1></header>${html}</main>${siteFoot()}</div>`;
  $("#favbtn").onclick = e => { const on = (S.favs || []).some(f => f.r === h); S.favs = on ? S.favs.filter(f => f.r !== h) : [{ r: h, t: title }, ...S.favs]; save(); e.currentTarget.textContent = on ? "☆ Garder cette page" : "★ Page gardée"; toast(on ? "Retirée des favoris" : "Page gardée dans tes favoris"); };
  document.querySelectorAll("#finder2").forEach(b => b.onclick = openFinder);
  const bg = $("#burger"); if (bg) bg.onclick = () => { const m = $("#menu"), o = m.classList.toggle("open"); bg.setAttribute("aria-expanded", o); };
  document.querySelectorAll("#menu a").forEach(a => a.addEventListener("click", () => $("#menu").classList.remove("open")));
  bindGl();
};

// ---------- accueil éditorial ----------
VIEWS.home = function () {
  const next = MODULES.find(m => !S.done[m.id] && unlocked(m) && !m.soon), info = lvlInfo(), sd = saintDuJour(), fig = sd.f, st = streak(S), prompt = dayPick(PROMPTS);
  const stations = MODULES.filter(m => !m.soon), doneN = stations.filter(m => S.done[m.id]).length;
  const dateStr = new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
  const lastRead = lastReadRef();
  app.innerHTML = `<div class="site home">${siteHead()}
    <section class="hero-ed">${A.hero(sunLevel())}<div class="hero-in"><p class="eyebrow">${esc(dateStr)}</p>
      <h1>${S.name ? "Bonjour " + esc(S.name) + "," : "Bonjour,"}<br><em>un pas à la fois.</em></h1>
      <p class="status">Niveau ${info.n}, ${info.name}<i>·</i>${info.xp} lumières<i>·</i>${st} jour${st > 1 ? "s" : ""} de suite${S.patron ? `<i>·</i>Saint patron, ${esc(FIGURES.find(f => f.id === S.patron).nom)}` : ""}<a href="#/profil">Mon compagnon</a></p></div></section>
    <section class="prayband"><div><small class="eyebrow">Prier maintenant</small><b>${esc(prayerOfMoment().t)}</b></div><div class="pbtns"><a class="primary small" href="#/prier/${prayerOfMoment().id}">Dire cette prière</a><a class="ghost" href="#/chapelet">${S.rosary ? "Reprendre le chapelet" : "Prier le chapelet"}</a><a class="textbtn" href="#/prier">Toutes les prières</a></div></section>
    <div class="cols3e">
      <section class="ecol"><h2 class="sech"><span>I</span>Aujourd'hui</h2>
        ${next ? `<a class="feature" href="#/${next.id}"><span class="fimg">${ill(next.ill)}</span><small class="eyebrow">Ta prochaine étape</small><h3>${esc(next.t)}</h3><p>${esc(next.d)}</p><b class="more">Continuer</b></a>` : `<div class="feature"><h3>Le chemin de départ est terminé</h3><p>Continue avec la Bible, les figures et le journal.</p></div>`}
        <a class="pull" href="#/journal" data-prompt="1"><small class="eyebrow">Une idée pour ton journal</small><q>${esc(prompt)}</q><b class="more">Écrire</b></a>
        ${lastRead ? `<a class="pull" href="${lastRead.href}"><small class="eyebrow">Reprendre ta lecture</small><q>${esc(lastRead.label)}</q><b class="more">Lire</b></a>` : ""}</section>
      <section class="ecol"><h2 class="sech"><span>II</span>Le parcours <small>${doneN} sur ${stations.length}</small></h2>
        <ol class="toc">${stations.slice(0, 9).map((m, i) => { const u = unlocked(m), d = S.done[m.id]; return `<li class="${d ? "done" : u ? "open" : "lock"}"><a ${u ? `href="#/${m.id}"` : ""}><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(m.t)}</span><span class="dots"></span><span class="s">${d ? "Lu" : u ? "À faire" : "Verrouillé"}</span></a></li>`; }).join("")}</ol>
        <a class="more" href="#/chemin">Tout le parcours</a></section>
      <section class="ecol"><h2 class="sech"><span>III</span>À découvrir</h2>
        <a class="plate" href="#/figures/${fig.id}"><span class="fimg portraitimg">${portrait(fig)}</span><span><small class="eyebrow">${esc(sd.label)}</small><h3>${esc(fig.nom)}</h3><p>${esc(fig.role)}</p></span></a>
        <a class="plate" href="#/lire"><span class="fimg">${A.livre()}</span><span><small class="eyebrow">La Bible</small><h3>Lire avec des explications</h3><p>73 livres, un texte catholique complet.</p></span></a>
        <a class="plate" href="#/jesuscarte"><span class="fimg">${A.chemin()}</span><span><small class="eyebrow">Carte</small><h3>Sur les pas de Jésus</h3><p>Onze étapes, de Bethléem à Emmaüs.</p></span></a></section>
    </div>${siteFoot()}</div>`;
  bindGl();
  document.querySelectorAll("#finder2").forEach(b => b.onclick = openFinder);
  const bg = $("#burger"); if (bg) bg.onclick = () => { const m = $("#menu"), o = m.classList.toggle("open"); bg.setAttribute("aria-expanded", o); };
  const pb = $("[data-prompt]"); if (pb) pb.onclick = () => { S.draft = { text: "", tags: [], prompt }; save(); };
};

// ---------- la Bible ----------
const BIBLE_CACHE = {};
function loadBook(code) {
  if (BIBLE_CACHE[code]) return Promise.resolve(BIBLE_CACHE[code]);
  return fetch(`bible/${code}.json`).then(r => { if (!r.ok) throw new Error("Texte introuvable"); return r.json(); }).then(d => (BIBLE_CACHE[code] = d));
}
function refLabel(code, ch, v) { return `${BOOK[code].n} ${ch}${v ? ", " + v : ""}`; }
function parseRef(s) {
  const m = s.trim().toLowerCase().replace(/\./g, "").match(/^((?:[123]\s?)?[a-zéèêôïüç']+(?:\s+des\s+[a-zéèêôïüç']+|\s+[a-zéèêôïüç']+)?)\s*(\d+)?(?:\s*[,:v.]\s*(\d+))?/i);
  if (!m) return null;
  let name = m[1].trim().replace(/\s+/g, " "), code = ABREV[name] || ABREV[name.replace(/\s/g, "")];
  if (!code) { const parts = name.split(" "); while (parts.length > 1 && !code) { parts.pop(); code = ABREV[parts.join(" ")]; } }
  if (!code) { const cand = Object.keys(ABREV).find(k => k.startsWith(name)); code = cand && ABREV[cand]; }
  if (!code) return null;
  return { code, ch: m[2] ? Math.min(+m[2], BOOK[code].nch) : null, v: m[3] ? +m[3] : null };
}
function lastReadRef() {
  const r = S.readLast; if (!r || !BOOK[r.code]) return null;
  return { href: `#/lire/${r.code}/${r.ch}`, label: `${BOOK[r.code].n}, chapitre ${r.ch}` };
}
function readCount(code) { return Object.keys(S.read || {}).filter(k => k.startsWith(code + " ")).length; }
function niveauDots(n) { return `<span class="nv nv${n}" title="${NIVEAU_LECTURE[n]}"><i></i><i></i><i></i></span>`; }

VIEWS.lire = function (a) {
  S.read = S.read || {};
  const [code, ch, v] = a || [];
  if (!code || !BOOK[code]) return lireIndex();
  if (!ch) return lireBook(code);
  return lireChapter(code, Math.max(1, Math.min(+ch || 1, BOOK[code].nch)), v ? +v : null);
};

function lireIndex() {
  const t = (S.read && Object.keys(S.read).length) || 0;
  const section = name => `<div class="sec2">${BIBLE_GROUPS.filter(g => g[1] === name).map(g => `<div class="bgroup"><h3>${g[2]}</h3><p class="muted">${g[3]}</p><ul class="booklist">${BOOKS.filter(b => b[3] === g[0]).map(b => { const n = readCount(b[0]); return `<li><a href="#/lire/${b[0]}"><span class="bn">${esc(b[1])}</span>${niveauDots(b[5])}<small>${b[4]} ch.${n ? ` · ${n} lu${n > 1 ? "s" : ""}` : ""}</small></a></li>`; }).join("")}</ul></div>`).join("")}</div>`;
  shell("La Bible", `<p class="lead2">Une bibliothèque de 73 livres, avec une seule grande histoire. Chaque livre a une introduction, et beaucoup de chapitres sont expliqués. Tu peux aussi poser tes questions à l'expert.</p>
    <form class="goto" id="goto"><label for="gq">Aller directement à un passage</label><div><input id="gq" placeholder="Par exemple, Jn 3, 16 ou Psaume 23" autocomplete="off"><button class="primary" type="submit">Aller</button></div><small class="muted" id="gerr"></small></form>
    ${typeof cheminsHtml === "function" ? cheminsHtml() : ""}<section class="sec"><h2 class="sech"><span>III</span>Tous les livres</h2><div class="tabsm" id="tt"><button class="on" data-t="nt">Nouveau Testament</button><button data-t="at">Ancien Testament</button></div><div id="tnt">${section("Nouveau Testament")}</div><div id="tat" hidden>${section("Ancien Testament")}</div></section>
    <p class="muted fine">${t} chapitre${t > 1 ? "s" : ""} lu${t > 1 ? "s" : ""} jusqu'ici. Les points indiquent la difficulté, de trois points pleins pour un livre exigeant à un seul pour un livre accessible.</p>
    <p class="muted fine">Texte, Sainte Bible néo-Crampon Libre, une modernisation de la traduction catholique de Crampon. © 2022 Fraternité de Tibériade, licence CC BY-SA 4.0. Pour la traduction entendue à la messe, voir <a href="https://www.aelf.org/bible" target="_blank" rel="noopener">AELF</a>.</p>`, "#/", "wide");
  if (typeof bindChemins === "function") bindChemins();
  document.querySelectorAll("#tt button").forEach(b => b.onclick = () => { document.querySelectorAll("#tt button").forEach(x => x.classList.toggle("on", x === b)); $("#tnt").hidden = b.dataset.t !== "nt"; $("#tat").hidden = b.dataset.t !== "at"; });
  $("#goto").onsubmit = e => { e.preventDefault(); const r = parseRef($("#gq").value); if (!r) { $("#gerr").textContent = "Je n'ai pas reconnu ce passage. Essaie avec « Jn 3, 16 » ou « Genèse 1 »."; return; } go(`#/lire/${r.code}/${r.ch || 1}${r.v ? "/" + r.v : ""}`); };
}

function lireBook(code) {
  const b = BOOK[code], gr = BIBLE_GROUPS.find(g => g[0] === b.g), idx = BOOKS.findIndex(x => x[0] === code);
  const prev = BOOKS[idx - 1], next = BOOKS[idx + 1], n = readCount(code);
  const last = S.readLast && S.readLast.code === code ? S.readLast.ch : null;
  shell(b.n, `<p class="eyebrow">${gr[1]}, ${gr[2]}</p>
    <div class="split bookhead"><div class="visual">${[A.livre, A.bibliotheque, A.priere, A.marche][b.g === "evang" ? 3 : b.g === "sag" ? 2 : b.g === "pent" || b.g === "hist" ? 1 : 0]()}</div>
    <div><p class="text">${g(b.intro)}</p><blockquote class="retenir"><small class="eyebrow">À retenir</small>${esc(b.k)}</blockquote><p class="muted">Difficulté ${niveauDots(b.niv)} ${NIVEAU_LECTURE[b.niv]}. ${n ? `Tu as lu ${n} chapitre${n > 1 ? "s" : ""} sur ${b.nch}.` : `${b.nch} chapitre${b.nch > 1 ? "s" : ""}.`}</p>
      <p class="tip">${esc(GENRE_CONSEIL[b.g])}</p><a class="primary" href="#/lire/${code}/${last || 1}">${last ? "Reprendre au chapitre " + last : "Commencer la lecture"}</a></div></div>
    <h3>Les chapitres</h3><div class="chgrid">${Array.from({ length: b.nch }, (_, i) => { const c = i + 1; return `<a href="#/lire/${code}/${c}" class="${S.read[code + " " + c] ? "read" : ""} ${NOTES[code + " " + c] ? "noted" : ""}" title="${NOTES[code + " " + c] ? "Expliqué" : ""}">${c}</a>`; }).join("")}</div>
    <p class="muted fine"><span class="k read"></span>Lu <span class="k noted"></span>Chapitre expliqué dans Auréa</p>
    <div class="pager2">${prev ? `<a href="#/lire/${prev[0]}">‹ ${esc(prev[1])}</a>` : "<span></span>"}<a href="#/lire">Tous les livres</a>${next ? `<a href="#/lire/${next[0]}">${esc(next[1])} ›</a>` : "<span></span>"}</div>`, "#/lire", "wide");
}

function lireChapter(code, ch, vsel) {
  const b = BOOK[code];
  shell(`${b.n} ${ch}`, `<div class="readgrid"><article class="scripture" id="scr"><p class="muted">Chargement du texte…</p></article><aside class="understand" id="und"></aside></div>`, `#/lire/${code}`, "wide");
  S.readLast = { code, ch }; save();
  loadBook(code).then(data => {
    const verses = data[ch - 1] || [], note = NOTES[code + " " + ch], key = code + " " + ch, size = S.fsize || 1;
    const prevC = ch > 1 ? `#/lire/${code}/${ch - 1}` : null, nextC = ch < b.nch ? `#/lire/${code}/${ch + 1}` : null;
    let sel = vsel;
    const draw = () => {
      $("#scr").innerHTML = `${typeof pathBar === "function" ? pathBar(code, ch) : ""}<div class="rtools"><span class="eyebrow">${esc(b.n)}, chapitre ${ch} sur ${b.nch}</span><span class="fs"><button class="textbtn" id="fm" aria-label="Réduire le texte">A−</button><button class="textbtn" id="fp" aria-label="Agrandir le texte">A+</button></span></div>
        <div class="verses" style="font-size:${size}rem">${verses.map((t, i) => `<span class="v ${sel === i + 1 ? "sel" : ""}" data-v="${i + 1}"><sup>${i + 1}</sup>${esc(t)} </span>`).join("")}</div>
        <div class="rfoot"><button class="${S.read[key] ? "ghost done" : "primary"}" id="mk">${S.read[key] ? "Chapitre lu ✓" : "J'ai lu ce chapitre"}</button>${typeof pathNextBtn === "function" ? pathNextBtn(code, ch) : ""}</div>
        <div class="pager2">${prevC ? `<a href="${prevC}">‹ Chapitre ${ch - 1}</a>` : "<span></span>"}<a href="#/lire/${code}">Tous les chapitres</a>${nextC ? `<a href="${nextC}">Chapitre ${ch + 1} ›</a>` : "<span></span>"}</div>`;
      $("#fm").onclick = () => { S.fsize = Math.max(.85, (S.fsize || 1) - .1); save(); draw(); };
      $("#fp").onclick = () => { S.fsize = Math.min(1.5, (S.fsize || 1) + .1); save(); draw(); };
      document.querySelectorAll(".v").forEach(el => el.onclick = () => { const n = +el.dataset.v; sel = sel === n ? null : n; draw(); drawSide(); });
      $("#mk").onclick = () => { if (!S.read[key]) { S.read[key] = Date.now(); save(); gain(2, "lecture"); checkBadges(); } draw(); };
      drawSide();
    };
    const drawSide = () => {
      const verseTxt = sel ? verses[sel - 1] : null, ref = refLabel(code, ch, sel);
      $("#und").innerHTML = `<h2>Pour comprendre</h2>
        <section><h4>Le livre en un mot</h4><p>${g(b.intro)}</p><a class="more" href="#/lire/${code}">Introduction complète</a></section>
        ${note ? `<section><h4>Ce chapitre en bref</h4><p>${g(note[0])}</p><h4>À remarquer</h4><p>${g(note[1])}</p><h4>Pour toi</h4><p>${g(note[2])}</p></section>` : `<section><h4>Comment lire ce passage</h4><p>${esc(GENRE_CONSEIL[b.g])}</p><p class="muted">Ce chapitre n'a pas encore d'explication rédigée. Tu peux demander à l'expert.</p></section>`}
        <section class="tools"><h4>${sel ? "Le verset " + sel : "Aller plus loin"}</h4>
          ${sel ? `<blockquote class="quote">${esc(verseTxt)}<cite>${esc(ref)}</cite></blockquote>` : `<p class="muted">Touche un verset du texte pour le sélectionner.</p>`}
          <div class="toolrow"><button class="ghost" id="ex">${sel ? "Expliquer ce verset" : "Expliquer ce chapitre"}</button><button class="ghost" id="nt">Noter dans mon journal</button>${sel ? `<button class="ghost" id="cp">Copier</button>` : ""}</div>
          <div class="expl" id="expl" aria-live="polite"></div></section>
        <section><a class="more" target="_blank" rel="noopener" href="https://www.aelf.org/bible/${b.ab}/${ch}">Lire la version liturgique sur AELF</a></section>`;
      bindGl();
      $("#nt").onclick = () => { S.draft = { text: sel ? `« ${verseTxt} »\n(${ref})\n\n` : "", tags: [code === "psa" ? "Prière" : "Évangile"], title: ref }; save(); go("#/journal"); };
      const cp = $("#cp"); if (cp) cp.onclick = () => { navigator.clipboard?.writeText(`« ${verseTxt} » (${ref})`); toast("Verset copié"); };
      $("#ex").onclick = () => explain(sel ? verseTxt : verses.map((t, i) => `${i + 1} ${t}`).join(" "), ref, !!sel);
    };
    const explain = async (text, ref, isVerse) => {
      const box = $("#expl");
      if (!S.apiKey) { box.innerHTML = `<p class="muted">Pour obtenir une explication détaillée, ajoute ta clé dans <a href="#/faq/expert">Demander à l'expert</a>. Ta clé reste dans ton navigateur.</p>`; return; }
      box.innerHTML = `<p class="muted">L'expert prépare son explication…</p>`; let out = "";
      const prompt = `Explique ${isVerse ? "ce verset" : "ce chapitre"} à un débutant, en 150 à 220 mots. Donne le contexte, l'idée principale, un point à remarquer, et termine par une question pour s'interroger. Passage ${ref}, traduction néo-Crampon Libre.\n\n${text.slice(0, 7000)}`;
      try {
        await claudeStream(EXPERT_SYSTEM, [{ role: "user", content: prompt }], t => { out += t; box.innerHTML = fmtAnswer(out); });
        box.innerHTML = fmtAnswer(out) + `<button class="textbtn" id="kp">Garder cette explication dans mon journal</button>`; bindGl();
        $("#kp").onclick = () => { addJournal({ tags: ["Pensée"], title: "Explication de " + ref, text: out }); toast("Gardé dans ton journal"); };
        S.stats.ask = (S.stats.ask || 0) + 1; save(); checkBadges();
      } catch (e) { box.innerHTML = `<p class="muted">${esc(e.message || "Je n'ai pas pu répondre.")}</p>`; }
    };
    draw();
    if (vsel) { const el = document.querySelector(".v.sel"); el && el.scrollIntoView({ block: "center" }); }
  }).catch(() => { $("#scr").innerHTML = `<p>Le texte n'a pas pu être chargé. Vérifie ta connexion, ou lis ce chapitre sur <a href="https://www.aelf.org/bible/${b.ab}/${ch}" target="_blank" rel="noopener">AELF</a>.</p>`; });
}

// appel direct à l'API Claude avec la clé de l'utilisateur
async function claudeStream(system, messages, onText) {
  const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "content-type": "application/json", "x-api-key": S.apiKey, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" }, body: JSON.stringify({ model: S.model, max_tokens: 1000, stream: true, system, messages }) });
  if (!r.ok) { let m = ""; try { m = (await r.json()).error?.message || ""; } catch {} throw new Error(r.status === 401 ? "Ta clé n'est pas acceptée. Vérifie-la dans la console Anthropic." : r.status === 429 ? "Trop de demandes pour le moment. Réessaie dans un instant." : m || "Erreur " + r.status); }
  const rd = r.body.getReader(), dec = new TextDecoder(); let buf = "";
  while (true) {
    const { value, done } = await rd.read(); if (done) break; buf += dec.decode(value, { stream: true });
    const lines = buf.split("\n"); buf = lines.pop();
    for (const ln of lines) { if (!ln.startsWith("data:")) continue; let j; try { j = JSON.parse(ln.slice(5)); } catch { continue; } if (j.type === "content_block_delta" && j.delta?.text) onText(j.delta.text); if (j.type === "error") throw new Error(j.error?.message || "Erreur du service"); }
  }
}

// badges liés à la lecture
BADGES.push({ id: "lecteur10", t: "Lecteur assidu", d: "Dix chapitres lus dans la Bible.", icon: "book", test: S => Object.keys(S.read || {}).length >= 10 });
BADGES.push({ id: "marc_fini", t: "Évangile de Marc", d: "Tu as lu tout l'Évangile de Marc.", icon: "star", test: S => readCountS(S, "mar") >= 16 });
function readCountS(st, code) { return Object.keys(st.read || {}).filter(k => k.startsWith(code + " ")).length; }

// la ressource « Bible » du menu ressources renvoie vers la lecture
if (typeof RESSOURCES !== "undefined") RESSOURCES[0].intro = RESSOURCES[0].intro + " Dans Auréa, tu peux déjà lire une Bible catholique complète, avec des explications, dans l'onglet La Bible.";
