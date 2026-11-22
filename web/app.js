/* Auréa — prototype web (vanilla JS, localStorage). */
const $ = (s, el = document) => el.querySelector(s);
const app = $("#app");
const KEY = "aurore.v1";
let S = load();

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch { return fresh(); }
}
function fresh() { return { name: "", bg: null, lvl: 1, done: {}, notes: [], quiz: {}, intents: [], unlockAll: false, activityIdx: null, chap: {} }; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// glossaire : {{texte|clé}} ou {{mot}}
function g(text) {
  return esc(text).replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g, (_, shown, key) => {
    key = key || shown.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "_");
    if (!GLOSSARY[key]) return shown;
    return `<button class="gl" data-gl="${key}">${shown}</button>`;
  }).replace(/\n/g, "<br>");
}

// ---------- modules et déblocage ----------
const MODULES = [
  { id: "bases", t: "Les bases", d: "L'essentiel en 6 cartes", needs: [] },
  { id: "priere", t: "Ma première prière", d: "Prier dès aujourd'hui", needs: ["bases"] },
  { id: "bible", t: "La Bible, mode d'emploi", d: "Comment la lire", needs: ["priere"] },
  { id: "jeu", t: "Qui est Jésus ?", d: "Un jeu en 3 niveaux", needs: ["bible"] },
  { id: "evangile", t: "Évangile du jour", d: "Lire, comprendre, noter", needs: ["bible"] },
  { id: "messe", t: "Messe et célébrations", d: "Ma première messe, le calendrier", needs: ["jeu"] },
  { id: "sacrements", t: "Les sacrements", d: "Dont le baptême", needs: ["messe"] },
  { id: "chapelet", t: "Le chapelet", d: "Pas à pas, dizaine par dizaine", needs: ["sacrements"] },
  { id: "plans", t: "Plans de lecture", d: "Évangiles, valeurs, grand récit", needs: ["bible"] },
  { id: "activite", t: "Activité de la semaine", d: "Une petite chose douce", needs: ["priere"] },
  { id: "courants", t: "Une Église, plusieurs sensibilités", d: "Courants, scouts, groupes", needs: ["messe"] },
  { id: "pelerinages", t: "Pèlerinages", d: "Bientôt", needs: ["chapelet"], soon: true },
  { id: "communaute", t: "Communauté près de chez moi", d: "Bientôt", needs: ["messe"], soon: true }
];
const ALWAYS = [
  { id: "ponts", t: "Ton chemin" , d: "Cartes adaptées à ton parcours" },
  { id: "faq", t: "Questions & réponses", d: "Demande ce que tu veux" },
  { id: "carnet", t: "Mon carnet", d: "Notes et intentions" },
  { id: "videos", t: "Vidéos et séries", d: "Courtes, en français" }
];
function unlocked(m) { return S.unlockAll || m.needs.every(n => S.done[n]); }
function lights() { return Object.keys(S.done).length + Math.floor(Object.values(S.quiz).filter(Boolean).length / 5); }
function sunLevel() { return Math.min(1, lights() / 12); }

// ---------- routeur ----------
function go(h) { location.hash = h; }
window.addEventListener("hashchange", render);

function render() {
  const route = (location.hash || "#/").slice(2).split("/");
  document.body.dataset.tod = tod();
  document.documentElement.style.setProperty("--sun", sunLevel());
  if (!S.bg && route[0] !== "onboarding") return go("#/onboarding");
  const fn = VIEWS[route[0] || "home"] || VIEWS.home;
  app.innerHTML = "";
  fn(route.slice(1));
  window.scrollTo(0, 0);
}
function tod() { const h = new Date().getHours(); return h < 6 ? "night" : h < 11 ? "dawn" : h < 18 ? "day" : h < 21 ? "dusk" : "night"; }

function shell(title, html, back = "#/") {
  app.innerHTML = `
    <header class="top"><a class="back" href="${back}" aria-label="Retour">‹</a><h1>${esc(title)}</h1></header>
    <main class="page">${html}</main>`;
}
function markDone(id) { if (!S.done[id]) { S.done[id] = Date.now(); save(); toast("Une lumière de plus ✦"); } }
function toast(t) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = t; document.body.appendChild(el);
  setTimeout(() => el.classList.add("show"), 10); setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 2200);
}
function levelHint() { return S.lvl >= 3 ? "Tu peux creuser plus loin à chaque étape." : "Un pas à la fois."; }

// ---------- lecteur de cartes générique ----------
function cards(items, { id, title, back, after }) {
  let i = 0;
  const draw = () => {
    const it = items[i];
    const last = i === items.length - 1;
    shell(title, `
      <div class="progress"><span style="width:${((i + 1) / items.length) * 100}%"></span></div>
      <article class="card big"><small>${i + 1} / ${items.length}</small><h2>${g(it.t)}</h2><p>${g(it.b || it.x || "")}</p>${it.tip ? `<p class="tip">${g(it.tip)}</p>` : ""}</article>
      <div class="row">
        <button class="ghost" id="prev" ${i === 0 ? "disabled" : ""}>Précédent</button>
        <button class="primary" id="next">${last ? "Terminer" : "Suivant"}</button>
      </div>${after && last ? after : ""}`, back || "#/");
    $("#prev").onclick = () => { i--; draw(); };
    $("#next").onclick = () => { if (last) { if (id) markDone(id); go("#/"); } else { i++; draw(); } };
    bindGl();
  };
  draw();
}

// ---------- vues ----------
const VIEWS = {
  onboarding() {
    let step = 0, name = S.name || "", bg = null, lvl = 1;
    const draw = () => {
      if (step === 0) {
        app.innerHTML = `<main class="page center"><div class="sunmark"></div><h1 class="hero">Auréa</h1><p class="lead">Un petit pas chaque jour, à ton rythme. Aucune connaissance n'est nécessaire.</p>
          <label class="field">Comment veux-tu qu'on t'appelle ?<input id="name" value="${esc(name)}" placeholder="Ton prénom"></label>
          <button class="primary" id="n1">Continuer</button></main>`;
        $("#n1").onclick = () => { name = $("#name").value.trim(); step = 1; draw(); };
      } else if (step === 1) {
        app.innerHTML = `<main class="page"><h2>Qu'est-ce qui te ressemble le plus ?</h2><p class="muted">Cela adapte le contenu avec respect. Tu pourras changer à tout moment dans Réglages. Cette information reste sur ton appareil.</p>
          <div class="choices">${BACKGROUNDS.map(b => `<button class="choice ${bg === b.id ? "sel" : ""}" data-b="${b.id}">${esc(b.label)}</button>`).join("")}</div>
          <button class="primary" id="n2" ${bg ? "" : "disabled"}>Continuer</button></main>`;
        document.querySelectorAll("[data-b]").forEach(b => b.onclick = () => { bg = b.dataset.b; draw(); });
        $("#n2").onclick = () => { step = bg === "revenant" ? 2 : 3; draw(); };
      } else if (step === 2) {
        app.innerHTML = `<main class="page"><h2>Où en es-tu avec la foi ?</h2><p class="muted">Cela règle la difficulté des mots et des explications.</p>
          <div class="choices">${LEVELS.map(l => `<button class="choice ${lvl === l.id ? "sel" : ""}" data-l="${l.id}">${esc(l.label)}</button>`).join("")}</div>
          <button class="primary" id="n3">Continuer</button></main>`;
        document.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { lvl = +b.dataset.l; draw(); });
        $("#n3").onclick = () => { step = 3; draw(); };
      } else {
        S.name = name; S.bg = bg; S.lvl = lvl; save();
        app.innerHTML = `<main class="page center"><div class="sunmark rise"></div><h2>Bienvenue${name ? ", " + esc(name) : ""}</h2><p class="lead">On commence par l'essentiel, en quelques cartes.</p><button class="primary" id="go">C'est parti</button></main>`;
        $("#go").onclick = () => go("#/bases");
      }
    };
    draw();
  },

  home() {
    const sunPct = Math.round(sunLevel() * 100);
    const next = MODULES.find(m => !S.done[m.id] && unlocked(m) && !m.soon);
    const item = m => {
      const u = unlocked(m), d = S.done[m.id];
      return `<a class="tile ${u ? "" : "locked"} ${d ? "done" : ""}" ${u && !m.soon ? `href="#/${m.id}"` : ""}>
        <span class="state">${d ? "✦" : u && !m.soon ? "→" : "🔒"}</span><b>${esc(m.t)}</b><small>${u ? esc(m.d) : "Se débloque après : " + esc(m.needs.map(n => MODULES.find(x => x.id === n).t).join(", "))}</small></a>`;
    };
    app.innerHTML = `
      <header class="hero-top"><div class="sky"><div class="sun" style="--p:${sunPct}"></div></div>
        <p class="hello">${S.name ? "Bonjour " + esc(S.name) : "Bonjour"}</p><p class="small">${lights()} lumière${lights() > 1 ? "s" : ""} · ${levelHint()}</p></header>
      <main class="page">
        ${next ? `<a class="next-card" href="#/${next.id}"><small>Ta prochaine étape</small><h2>${esc(next.t)}</h2><p>${esc(next.d)}</p><span>Continuer →</span></a>` : `<div class="card"><h2>Tu as parcouru le chemin de départ</h2><p>Continue avec les plans de lecture, le chapelet et l'activité de la semaine.</p></div>`}
        <h3>Mon parcours</h3><div class="grid">${MODULES.map(item).join("")}</div>
        <h3>Toujours là</h3><div class="grid">${ALWAYS.map(m => `<a class="tile" href="#/${m.id}"><span class="state">→</span><b>${esc(m.t)}</b><small>${esc(m.d)}</small></a>`).join("")}</div>
        <p class="foot"><a href="#/reglages">Réglages</a></p>
      </main>`;
  },

  bases() { cards(BASES, { id: "bases", title: "Les bases" }); },

  priere() {
    const p = PRIERES;
    shell("Ma première prière", `
      <article class="card prayer"><p>${g(PRIERE_PREMIERE)}</p></article>
      <p class="muted">Lis-la doucement, à voix haute ou dans ta tête. Tu peux la dire avec tes propres mots.</p>
      <button class="primary" id="done">Je l'ai priée</button>
      <h3>Apprendre les prières du chrétien</h3>
      ${p.map(x => `<details class="card"><summary>${esc(x.t)}</summary><p>${g(x.x)}</p>${x.tip ? `<p class="tip">${g(x.tip)}</p>` : ""}</details>`).join("")}`);
    $("#done").onclick = () => { markDone("priere"); go("#/"); };
    bindGl();
  },

  bible() { cards(BIBLE_INTRO, { id: "bible", title: "La Bible, mode d'emploi", after: `<p class="muted center">Bravo ! Les plans de lecture et le jeu sont maintenant disponibles.</p>` }); },

  plans(a) {
    if (a[0]) {
      const p = PLANS.find(x => x.id === a[0]);
      const done = S.chap[p.id] || [];
      shell(p.t, `<p class="muted">${esc(p.d)}</p>
        <ol class="plan">${p.ref.map((r, i) => `<li class="${done.includes(i) ? "ok" : ""}"><label><input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""}> <span>Jour ${i + 1} — ${esc(r[0])} ${r[1]}${r[2] ? " · " + esc(r[2]) : ""}</span></label> <a href="https://www.aelf.org/bible/${r[0]}/${r[1]}" target="_blank" rel="noopener">Lire</a></li>`).join("")}</ol>`, "#/plans");
      document.querySelectorAll("[data-i]").forEach(c => c.onchange = () => {
        const set = new Set(S.chap[p.id] || []); c.checked ? set.add(+c.dataset.i) : set.delete(+c.dataset.i);
        S.chap[p.id] = [...set]; save(); if (set.size === p.ref.length) markDone("plan_" + p.id); VIEWS.plans(a);
      });
      return;
    }
    shell("Plans de lecture", `
      <p class="muted">Choisis le chemin qui te parle. Tu peux en changer. Le texte s'ouvre sur AELF (Association Épiscopale Liturgique pour les pays Francophones).</p>
      ${PLANS.map(p => `<a class="card link" href="#/plans/${p.id}"><small>${p.lvl}</small><h2>${esc(p.t)}</h2><p>${esc(p.d)}</p><span class="bar"><i style="width:${((S.chap[p.id] || []).length / p.ref.length) * 100}%"></i></span></a>`).join("")}
      <h3>Jésus et les prophéties</h3><a class="card link" href="#/jesus"><h2>Cinq textes, deux lectures</h2><p>Des prophéties souvent citées, avec les limites et les débats.</p></a>`);
  },

  jesus() {
    const tag = c => `<span class="tag ${c}">${{ fait: "Fait vérifiable", foi: "Enseignement de l'Église", debat: "Débat entre spécialistes" }[c]}</span>`;
    shell("Jésus et les prophéties", `<p class="muted">${esc(PROPHETIES_NOTE)}</p>
      ${PROPHETIES.map(p => `<article class="card"><small>${esc(p.ref)}</small><h2>${esc(p.t)}</h2><p>${g(p.x)}</p>${tag(p.c)}</article>`).join("")}`, "#/plans");
    bindGl();
  },

  jeu(a) {
    if (a[0] !== undefined) return quiz(+a[0]);
    shell("Qui est Jésus ?", `<p class="muted">Un petit jeu pour mieux connaître Jésus, sans pression. Chaque niveau rapporte une lumière.</p>
      ${QUIZ.map((lv, i) => `<a class="card link" href="#/jeu/${i}"><small>${S.quiz[i] ? "Meilleur score : " + S.quiz[i] + "/" + lv.qs.length : "Non joué"}</small><h2>${esc(lv.lvl)}</h2></a>`).join("")}`);
  },

  evangile() {
    const today = new Date().toISOString().slice(0, 10);
    shell("Évangile du jour", `<p class="muted">${new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
      <article class="card" id="ev"><p>Chargement…</p></article>
      <h3>Psaume ou Évangile ?</h3><p>L'{{Évangile}} raconte Jésus. Le {{psaume}} est une prière.</p>
      <label class="field">Ma note sur ce passage<textarea id="nt" rows="3" placeholder="Ce qui m'a touché…"></textarea></label>
      <button class="primary" id="sv">Enregistrer dans mon carnet</button>
      <a class="ghost wide" target="_blank" rel="noopener" href="https://www.aelf.org/${today}/romain/messe">Ouvrir sur AELF</a>`);
    // le <p> ci-dessus utilise des {{}} : repasser par g()
    document.querySelector(".page").innerHTML = document.querySelector(".page").innerHTML.replace(/\{\{([^}|]+)\}\}/g, (_, s) => g(`{{${s}}}`));
    bindGl();
    fetch(`https://api.aelf.org/v1/messes/${today}/france`).then(r => r.json()).then(j => {
      const l = (j.messes?.[0]?.lectures || []).find(x => x.type === "evangile");
      if (!l) throw 0;
      $("#ev").innerHTML = `<small>${esc(l.ref || "")}</small><h2>${esc(l.titre || "Évangile")}</h2><div class="gospel">${l.contenu}</div>`;
    }).catch(() => { $("#ev").innerHTML = `<p>Le texte du jour s'affiche ici quand la connexion à AELF est disponible. Tu peux l'ouvrir directement avec le bouton ci-dessous.</p>`; });
    $("#sv").onclick = () => { const v = $("#nt").value.trim(); if (!v) return; S.notes.unshift({ t: Date.now(), k: "Évangile du jour", x: v }); save(); markDone("evangile"); go("#/"); };
  },

  messe(a) {
    shell("Messe et célébrations", `
      <a class="card link" href="#/messe1"><small>Étape 1</small><h2>Ma première messe</h2><p>Comment se passe une messe, en 6 cartes.</p></a>
      <a class="card link" href="https://messes.info" target="_blank" rel="noopener"><small>Étape 2</small><h2>Trouver une messe près de moi</h2><p>Site officiel de l'Église catholique en France (messes.info).</p></a>
      <a class="card link" href="#/contact"><small>Étape 3</small><h2>Contacter une paroisse</h2><p>Pour poser une question ou commencer le catéchuménat.</p></a>
      <h3>Calendrier à venir</h3>
      ${CALENDRIER.filter(c => c.d >= new Date().toISOString().slice(0, 10)).slice(0, 6).map(c => `<article class="card"><small>${new Date(c.d).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</small><h2>${g(c.t)}</h2><p>${g(c.b)}</p></article>`).join("")}
      <button class="primary" id="done">J'ai terminé cette étape</button>`);
    $("#done").onclick = () => { markDone("messe"); go("#/"); };
    bindGl();
  },
  messe1() { cards(MESSE_ETAPES, { id: null, title: "Ma première messe", back: "#/messe" }); },
  contact() {
    shell("Contacter une paroisse", `<p>Un simple message suffit. Voici un modèle :</p>
      <article class="card prayer"><p id="tpl">Bonjour, je m'appelle ${esc(S.name || "…")}. Je découvre la foi catholique et je voudrais en savoir plus. Pourrait-on se rencontrer ou discuter du catéchuménat ? Merci beaucoup.</p></article>
      <button class="primary" id="cp">Copier le message</button>
      <a class="ghost wide" target="_blank" rel="noopener" href="https://www.google.com/search?q=paroisse+catéchuménat+près+de+chez+moi">Trouver une paroisse près de moi</a>
      <p class="muted">Dans une future version, l'app te mettra en relation directement avec la paroisse et un accompagnateur formé.</p>`, "#/messe");
    $("#cp").onclick = () => { navigator.clipboard?.writeText($("#tpl").textContent); toast("Copié"); };
  },

  sacrements() {
    shell("Les sacrements", `
      <p class="muted">Sept sacrements. Commençons par le baptême.</p>
      <article class="card big"><h2>Pourquoi se faire baptiser ?</h2><ul>${POURQUOI_BAPTEME.map(x => `<li>${g(x)}</li>`).join("")}</ul></article>
      <h3>Le chemin du catéchuménat</h3><ol class="steps">${CATECHUMENAT.map(x => `<li>${g(x)}</li>`).join("")}</ol>
      <h3>Les 7 sacrements</h3>${SACREMENTS.map(s => `<details class="card"><summary>${esc(s.t)}</summary><p>${g(s.b)}</p></details>`).join("")}
      <button class="primary" id="done">J'ai compris l'essentiel</button>`);
    $("#done").onclick = () => { markDone("sacrements"); go("#/"); };
    bindGl();
  },

  chapelet(a) {
    const todayKey = MYSTERE_PAR_JOUR[new Date().getDay()];
    if (a[0] === "guide") return chapGuide(a[1] || todayKey);
    shell("Le chapelet", `
      <p>Le {{chapelet}} se prie avec des perles, en méditant la vie de Jésus avec Marie. Il y a 4 séries de {{mystères|mystere}}, une pour chaque jour.</p>
      <article class="card big"><small>Aujourd'hui</small><h2>${MYSTERES[todayKey].t}</h2><p>Prié le ${MYSTERES[todayKey].jours}.</p><a class="primary wide" href="#/chapelet/guide/${todayKey}">Prier pas à pas</a></article>
      <h3>Autres mystères</h3>${Object.entries(MYSTERES).map(([k, m]) => `<a class="card link" href="#/chapelet/guide/${k}"><h2>${m.t}</h2><p>${m.jours}</p></a>`).join("")}
      <h3>Intentions de prière</h3><div class="chips">${INTENTIONS.map(i => `<span>${esc(i)}</span>`).join("")}</div>
      <h3>Se procurer un chapelet</h3><p>Tu peux en trouver dans les librairies religieuses, les sanctuaires ou en ligne. Tu peux le faire bénir par un prêtre ou un diacre : demande simplement après la messe.</p>
      <a class="ghost wide" target="_blank" rel="noopener" href="https://www.google.com/search?q=acheter+chapelet+catholique">Chercher un chapelet</a>`);
    // remplace le {{}} initial
    document.querySelector(".page").innerHTML = document.querySelector(".page").innerHTML.replace(/\{\{([^}]+)\}\}/g, (_, s) => g(`{{${s}}}`));
    bindGl();
  },

  pelerinages() { shell("Pèlerinages", `<p>Bientôt : comprendre l'importance des pèlerinages et trouver ceux qui sont proches de toi, avec leurs dates.</p>`); },
  communaute() { shell("Communauté", `<p>Bientôt : des petits groupes locaux, modérés, et des accompagnateurs formés.</p>`); },

  courants() {
    shell("Une Église, plusieurs sensibilités", COURANTS.map(c => `<details class="card"><summary>${esc(c.t)}</summary><p>${g(c.b)}</p></details>`).join("") + `<button class="primary" id="done">Terminé</button>`);
    $("#done").onclick = () => { markDone("courants"); go("#/"); };
    bindGl();
  },

  activite() {
    if (S.activityIdx === null) { S.activityIdx = Math.floor(Math.random() * ACTIVITES.length); save(); }
    const a = ACTIVITES[S.activityIdx];
    shell("Activité de la semaine", `<article class="card big"><small>Cette semaine</small><h2>${esc(a.t)}</h2><p>${esc(a.x)}</p></article>
      <button class="primary" id="done">Je l'ai faite</button>
      <button class="ghost wide" id="other">Une autre idée</button>`);
    $("#done").onclick = () => { markDone("activite"); go("#/"); };
    $("#other").onclick = () => { S.activityIdx = (S.activityIdx + 1) % ACTIVITES.length; save(); VIEWS.activite(); };
  },

  ponts() {
    const bg = BACKGROUNDS.find(b => b.id === S.bg);
    const tag = c => `<span class="tag ${c}">${{ fait: "Fait vérifiable", foi: "Enseignement de l'Église", debat: "Débat entre spécialistes" }[c]}</span>`;
    shell("Ton chemin", `<p class="muted">Parcours : ${esc(bg ? bg.label : "")}. Chaque carte te dit s'il s'agit d'un fait, d'un enseignement de l'Église ou d'un débat.</p>
      ${(PONTS[S.bg] || PONTS.autre).map(p => `<article class="card"><h2>${esc(p.t)}</h2><p>${g(p.x)}</p>${p.s ? `<small class="src">Source : ${esc(p.s)}</small>` : ""}${tag(p.c)}</article>`).join("")}
      <a class="ghost wide" href="#/reglages">Changer mon parcours</a>`);
    bindGl();
  },

  faq() {
    shell("Questions & réponses", `
      <label class="field">Pose ta question<input id="q" placeholder="Ex. pourquoi se faire baptiser ?"></label>
      <div id="res"></div><h3>Toutes les questions</h3>${FAQ.map(f => `<details class="card"><summary>${esc(f.q)}</summary><p>${g(f.a)}</p></details>`).join("")}`);
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    $("#q").oninput = e => {
      const q = norm(e.target.value).split(/\W+/).filter(w => w.length > 2);
      if (!q.length) return $("#res").innerHTML = "";
      const sc = FAQ.map(f => { const t = norm(f.q + " " + f.k); return { f, s: q.filter(w => t.includes(w)).length }; }).filter(x => x.s).sort((a, b) => b.s - a.s).slice(0, 3);
      $("#res").innerHTML = sc.length ? sc.map(x => `<article class="card hl"><h2>${esc(x.f.q)}</h2><p>${g(x.f.a)}</p></article>`).join("") : `<p class="muted">Pas de réponse toute prête. Dans une future version, un assistant pourra t'aider. En attendant, parle à un prêtre ou à une paroisse.</p>`;
      bindGl();
    };
    bindGl();
  },

  carnet() {
    shell("Mon carnet", `
      <label class="field">Nouvelle note<textarea id="nt" rows="3" placeholder="Une pensée, une question, une intention de prière…"></textarea></label>
      <button class="primary" id="add">Ajouter</button>
      ${S.notes.length ? S.notes.map((n, i) => `<article class="card"><small>${new Date(n.t).toLocaleDateString("fr-FR")} · ${esc(n.k || "Note")}</small><p>${esc(n.x)}</p><button class="link-btn" data-del="${i}">Supprimer</button></article>`).join("") : `<p class="muted">Ton carnet est vide pour l'instant.</p>`}`);
    $("#add").onclick = () => { const v = $("#nt").value.trim(); if (!v) return; S.notes.unshift({ t: Date.now(), k: "Note", x: v }); save(); VIEWS.carnet(); };
    document.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { S.notes.splice(+b.dataset.del, 1); save(); VIEWS.carnet(); });
  },

  videos() {
    shell("Vidéos et séries", `<p class="muted">Des ressources courtes pour comprendre. À terme, des vidéos choisies et intégrées dans l'app avec l'accord de leurs auteurs.</p>
      ${VIDEO_LINKS.map(v => `<a class="card link" target="_blank" rel="noopener" href="${v.u}"><h2>${esc(v.t)}</h2></a>`).join("")}
      <a class="card link" target="_blank" rel="noopener" href="https://www.thechosen.tv"><small>Série</small><h2>The Chosen</h2><p>Une série sur la vie de Jésus et de ses disciples. Un bon complément après les Évangiles.</p></a>`);
  },

  reglages() {
    shell("Réglages", `
      <label class="field">Prénom<input id="nm" value="${esc(S.name)}"></label>
      <label class="field">Mon parcours<select id="bg">${BACKGROUNDS.map(b => `<option value="${b.id}" ${b.id === S.bg ? "selected" : ""}>${esc(b.label)}</option>`).join("")}</select></label>
      <label class="field">Mon niveau<select id="lv">${LEVELS.map(l => `<option value="${l.id}" ${l.id === S.lvl ? "selected" : ""}>${esc(l.label)}</option>`).join("")}</select></label>
      <label class="check"><input type="checkbox" id="ua" ${S.unlockAll ? "checked" : ""}> Tout débloquer (mode démo)</label>
      <button class="primary" id="sv">Enregistrer</button>
      <button class="ghost wide danger" id="rs">Effacer mes données</button>
      <p class="muted">Tes données sont stockées uniquement sur cet appareil dans ce prototype.</p>`);
    $("#sv").onclick = () => { S.name = $("#nm").value.trim(); S.bg = $("#bg").value; S.lvl = +$("#lv").value; S.unlockAll = $("#ua").checked; save(); go("#/"); };
    $("#rs").onclick = () => { if (confirm("Effacer toutes tes données ?")) { localStorage.removeItem(KEY); S = fresh(); go("#/onboarding"); render(); } };
  }
};

function quiz(lv) {
  const L = QUIZ[lv]; let i = 0, score = 0;
  const draw = () => {
    if (i >= L.qs.length) {
      S.quiz[lv] = Math.max(S.quiz[lv] || 0, score);
      if (Object.keys(S.quiz).length >= QUIZ.length || S.quiz[lv] >= 4) markDone("jeu");
      save();
      return shell(L.lvl, `<article class="card big center"><h2>${score} / ${L.qs.length}</h2><p>${score >= 4 ? "Magnifique !" : "Bien joué, tu progresses. Tu peux rejouer."}</p></article><a class="primary wide" href="#/jeu">Retour aux niveaux</a>`, "#/jeu");
    }
    const q = L.qs[i];
    shell(L.lvl, `<div class="progress"><span style="width:${(i / L.qs.length) * 100}%"></span></div>
      <article class="card big"><small>Question ${i + 1} / ${L.qs.length}</small><h2>${esc(q.q)}</h2></article>
      <div class="choices">${q.o.map((o, k) => `<button class="choice" data-k="${k}">${esc(o)}</button>`).join("")}</div><div id="fb"></div>`, "#/jeu");
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => {
      const ok = +b.dataset.k === q.a; if (ok) score++;
      document.querySelectorAll("[data-k]").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("good"); else if (x === b) x.classList.add("bad"); });
      $("#fb").innerHTML = `<article class="card hl"><p>${esc(q.e)}</p></article><button class="primary" id="nx">Continuer</button>`;
      $("#nx").onclick = () => { i++; draw(); };
    });
  };
  draw();
}

function chapGuide(key) {
  const m = MYSTERES[key];
  const steps = [{ t: "Signe de croix", x: PRIERES[0].x }, { t: "Credo", x: PRIERES[4].x }, { t: "Notre Père", x: PRIERES[1].x }, { t: "3 Je vous salue Marie", x: "Pour la foi, l'espérance et la charité.\n\n" + PRIERES[2].x }, { t: "Gloire au Père", x: PRIERES[3].x }];
  m.l.forEach((l, i) => {
    steps.push({ t: `Dizaine ${i + 1} : ${l}`, x: `Médite : ${l}.\nPuis : Notre Père (1 fois).` });
    steps.push({ t: `Dizaine ${i + 1} : 10 Je vous salue Marie`, x: "Dis 10 fois le Je vous salue Marie en pensant à ce mystère.\n\n" + PRIERES[2].x });
    steps.push({ t: `Dizaine ${i + 1} : Gloire au Père`, x: PRIERES[3].x });
  });
  steps.push({ t: "Pour finir", x: "Tu peux conclure par le Salve Regina ou simplement par un signe de croix.\nBravo : tu as prié le chapelet !" });
  cards(steps, { id: "chapelet", title: m.t, back: "#/chapelet" });
}

// glossaire : bulle
function bindGl() {
  document.querySelectorAll(".gl").forEach(b => b.onclick = e => {
    e.preventDefault();
    const [t, d] = GLOSSARY[b.dataset.gl];
    let sh = $("#sheet");
    if (!sh) { sh = document.createElement("div"); sh.id = "sheet"; document.body.appendChild(sh); }
    sh.innerHTML = `<div class="sheet"><b>${esc(t)}</b><p>${esc(d)}</p><button class="primary" id="shx">Compris</button></div>`;
    sh.className = "open"; $("#shx").onclick = () => sh.className = "";
    sh.onclick = ev => { if (ev.target === sh) sh.className = ""; };
  });
}

render();
