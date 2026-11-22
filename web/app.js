/* Auréa — prototype web (vanilla JS, localStorage). */
const $ = (s, el = document) => el.querySelector(s);
const app = $("#app");
const KEY = "aurea.v1";
let S = load();

function load() { try { return JSON.parse(localStorage.getItem(KEY)) || fresh(); } catch { return fresh(); } }
function fresh() { return { name: "", bg: null, lvl: 1, done: {}, notes: [], quiz: {}, unlockAll: false, activityIdx: null, chap: {}, reperes: 0 }; }
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} }
function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

// ---------- glossaire : mots cliquables (explicites {{mot|clé}} et automatiques) ----------
const AUTO_RE = AUTO.map(([p, k]) => [new RegExp(`(?<![\\p{L}\\p{N}])(?:${p})(?![\\p{L}\\p{N}])`, "iu"), k]);
function g(text, skip) {
  const used = new Set(skip ? [skip] : []);
  let h = esc(text).replace(/\{\{([^}|]+)(?:\|([^}]+))?\}\}/g, (_, shown, key) => {
    key = key || shown.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "_");
    if (!GLOSSARY[key]) return shown;
    used.add(key);
    return `<button class="gl" data-gl="${key}">${shown}</button>`;
  });
  h = h.split(/(<button[\s\S]*?<\/button>)/).map(part => {
    if (part.startsWith("<button")) return part;
    const hits = [];
    for (const [re, k] of AUTO_RE) { if (used.has(k)) continue; const m = re.exec(part); if (m) hits.push({ i: m.index, l: m[0].length, k }); }
    hits.sort((a, b) => a.i - b.i);
    let out = "", pos = 0;
    for (const x of hits) { if (x.i < pos || used.has(x.k)) continue; out += part.slice(pos, x.i) + `<button class="gl" data-gl="${x.k}">${part.substr(x.i, x.l)}</button>`; pos = x.i + x.l; used.add(x.k); }
    return out + part.slice(pos);
  }).join("");
  return h.replace(/\n/g, "<br>");
}

// ---------- parcours ----------
const MODULES = [
  { id: "reperes", t: "Où en sommes-nous dans l'histoire ?", d: "Une frise et une carte pour se repérer", needs: [], ill: "ordre" },
  { id: "bases", t: "Les bases", d: "L'essentiel de la foi en quelques images", needs: ["reperes"], ill: "dieu" },
  { id: "priere", t: "Ma première prière", d: "Prier dès aujourd'hui", needs: ["bases"], ill: "priere" },
  { id: "bible", t: "La Bible, mode d'emploi", d: "Comment la lire sans se perdre", needs: ["priere"], ill: "bibliotheque" },
  { id: "jeu", t: "Qui est Jésus ?", d: "Un jeu en trois niveaux", needs: ["bible"], ill: "quiz" },
  { id: "evangile", t: "Évangile du jour", d: "Lire, comprendre, noter", needs: ["bible"], ill: "livre" },
  { id: "messe", t: "Messe et célébrations", d: "Ma première messe et le calendrier", needs: ["jeu"], ill: "bati" },
  { id: "sacrements", t: "Les sacrements", d: "Dont le baptême", needs: ["messe"], ill: "eau" },
  { id: "chapelet", t: "Le chapelet", d: "Dizaine par dizaine", needs: ["sacrements"], ill: "chapelet" },
  { id: "plans", t: "Plans de lecture", d: "Évangiles, valeurs, grand récit", needs: ["bible"], ill: "marche" },
  { id: "activite", t: "Activité de la semaine", d: "Une petite chose douce", needs: ["priere"], ill: "crayon" },
  { id: "courants", t: "Une Église, plusieurs sensibilités", d: "Courants, scouts, groupes", needs: ["messe"], ill: "eglise" },
  { id: "pelerinages", t: "Pèlerinages", d: "Bientôt disponible", needs: ["chapelet"], ill: "chemin", soon: true },
  { id: "communaute", t: "Communauté près de chez moi", d: "Bientôt disponible", needs: ["messe"], ill: "eglise", soon: true }
];
const ALWAYS = [
  { id: "ponts", t: "Ton chemin", d: "Adapté à ton parcours", ill: "chemin" },
  { id: "faq", t: "Questions et réponses", d: "Demande ce que tu veux", ill: "quiz" },
  { id: "carnet", t: "Mon carnet", d: "Notes et intentions", ill: "crayon" },
  { id: "videos", t: "Vidéos et séries", d: "Courtes, en français", ill: "video" }
];
function unlocked(m) { return S.unlockAll || m.needs.every(n => S.done[n]); }
function lights() { return Object.keys(S.done).length; }
function sunLevel() { return Math.min(1, lights() / 12); }
function ill(k) { return k === "chapelet" ? A.chapelet({}) : k === "video" ? A.video(0) : (A[k] || A.dieu)(); }
function thumb(k) { return `<span class="thumb">${ill(k)}</span>`; }
const sunmark = `<svg viewBox="0 0 40 40" class="sm" aria-hidden="true"><g stroke="#e8b04a" stroke-width="3" stroke-linecap="round">${Array.from({ length: 8 }, (_, i) => { const a = i / 8 * 6.283; return `<line x1="${20 + Math.cos(a) * 13}" y1="${20 + Math.sin(a) * 13}" x2="${20 + Math.cos(a) * 18}" y2="${20 + Math.sin(a) * 18}"/>`; }).join("")}</g><circle cx="20" cy="20" r="9" fill="#f5c25a"/></svg>`;

// ---------- routeur ----------
function go(h) { location.hash = h; }
window.addEventListener("hashchange", render);
function route() { return (location.hash || "#/").slice(2).split("/"); }
function render() {
  const r = route();
  if (!S.bg && r[0] !== "onboarding") return go("#/onboarding");
  const fn = VIEWS[r[0] || "home"] || VIEWS.home;
  fn(r.slice(1));
  window.scrollTo(0, 0);
}

function sidebar() {
  const cur = route()[0];
  const row = m => {
    const u = unlocked(m), d = S.done[m.id], c = cur === m.id ? "cur" : "";
    const inner = `<span class="dot">${d ? "✓" : ""}</span>${esc(m.t)}`;
    return `<li class="${d ? "done" : ""}">${u && !m.soon ? `<a class="${c}" href="#/${m.id}">${inner}</a>` : `<span class="row lock">${inner}</span>`}</li>`;
  };
  const on = Math.round(sunLevel() * 12);
  return `<aside class="side"><a class="brand" href="#/">${sunmark}Auréa</a>
    <p class="side-me">${S.name ? "Bonjour " + esc(S.name) : "Bonjour"}</p>
    <div class="rays">${Array.from({ length: 12 }, (_, i) => `<i class="${i < on ? "on" : ""}"></i>`).join("")}</div>
    <h4>Mon chemin</h4><ol class="path">${MODULES.map(row).join("")}</ol>
    <h4>Toujours là</h4><div class="links">${ALWAYS.map(m => `<a href="#/${m.id}">${esc(m.t)}</a>`).join("")}<a href="#/reglages">Réglages</a></div></aside>`;
}
function shell(title, html, back = "#/", cls = "") {
  app.innerHTML = `<div class="layout">${sidebar()}<div class="col"><header class="top"><a class="back" href="${back}" aria-label="Retour">‹</a><h1>${esc(title)}</h1></header><main class="page ${cls}">${html}</main></div></div>`;
  bindGl();
}
function markDone(id) { if (!S.done[id]) { S.done[id] = Date.now(); save(); toast("Une lumière de plus"); } }
function toast(t) {
  const el = document.createElement("div"); el.className = "toast"; el.textContent = t; document.body.appendChild(el);
  setTimeout(() => el.classList.add("show"), 10); setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 2200);
}
const tagLabel = c => `<span class="tag ${c}">${{ fait: "Fait vérifiable", foi: "Enseignement de l'Église", debat: "Débat entre spécialistes" }[c]}</span>`;
function refBox() {
  return `<div class="refbox"><div class="refbig"><span>Jn</span> <span>3</span>, <span>16</span></div><ul><li><b>Jn</b>l'Évangile de Jean</li><li><b>3</b>le chapitre, le grand bloc</li><li><b>16</b>le verset, la petite phrase</li></ul></div>`;
}
function pic(k) { return k === "ref" ? refBox() : ill(k); }

// ---------- lecteur page à page ----------
function reader(items, { id, title, back, side }) {
  let i = 0;
  const draw = () => {
    const it = items[i], last = i === items.length - 1;
    const visual = side ? side(i, it) : pic(it.i || "dieu");
    shell(title, `
      <div class="split">
        <div class="visual">${visual}</div>
        <div class="reader-text">
          <div class="reader-head"><span class="num">${String(i + 1).padStart(2, "0")}</span><span class="of">sur ${String(items.length).padStart(2, "0")}</span></div>
          <h2>${g(it.t)}</h2><div class="rule"></div>
          <p class="text">${g(it.b || it.x || "")}</p>${it.tip ? `<p class="tip">${g(it.tip)}</p>` : ""}
          <div class="pager"><button class="textbtn" id="prev" ${i === 0 ? "disabled" : ""}>‹ Précédent</button>
          ${items.length > 12 ? `<div class="progress thin"><span style="width:${((i + 1) / items.length) * 100}%"></span></div>` : `<div class="dots">${items.map((_, k) => `<i class="${k < i ? "on" : ""} ${k === i ? "cur" : ""}"></i>`).join("")}</div>`}
          <button class="primary small" id="next">${last ? "Terminer" : "Suivant ›"}</button></div>
        </div>
      </div>`, back || "#/", "wide");
    $("#prev").onclick = () => { i--; draw(); };
    $("#next").onclick = () => { if (last) { if (id) markDone(id); go("#/"); } else { i++; draw(); } };
  };
  draw();
}

// ---------- vues ----------
const VIEWS = {
  onboarding() {
    let step = 0, name = S.name || "", bg = null, lvl = 1;
    const dots = n => `<div class="steps-dots">${[0, 1, 2].map(i => `<i class="${i <= n ? "on" : ""}"></i>`).join("")}</div>`;
    const draw = () => {
      let form = "";
      if (step === 0) form = `${dots(0)}<h1>Auréa</h1><p class="lead">Un petit pas chaque jour, à ton rythme. Tu n'as besoin de rien savoir pour commencer.</p>
        <label class="field">Comment veux-tu qu'on t'appelle ?<input id="name" value="${esc(name)}" placeholder="Ton prénom" autocomplete="given-name"></label><button class="primary" id="n1">Continuer</button>`;
      else if (step === 1) form = `${dots(1)}<h2>Qu'est-ce qui te ressemble le plus ?</h2><p class="muted">Cela nous aide à t'expliquer les choses avec respect. Tu pourras changer à tout moment dans les réglages. Ce choix reste sur ton appareil.</p>
        <div class="choices">${BACKGROUNDS.map((b, i) => `<button class="choice ${bg === b.id ? "sel" : ""}" data-b="${b.id}"><i>${String.fromCharCode(65 + i)}</i>${esc(b.label)}</button>`).join("")}</div><button class="primary" id="n2" ${bg ? "" : "disabled"}>Continuer</button>`;
      else if (step === 2) form = `${dots(2)}<h2>Où en es-tu avec la foi ?</h2><p class="muted">Cela règle la difficulté des mots et des explications.</p>
        <div class="choices">${LEVELS.map(l => `<button class="choice ${lvl === l.id ? "sel" : ""}" data-l="${l.id}"><i>${l.id}</i>${esc(l.label)}</button>`).join("")}</div><button class="primary" id="n3">Continuer</button>`;
      else form = `<h1>Bienvenue${name ? ", " + esc(name) : ""}</h1><p class="lead">On commence par se repérer dans l'histoire, avec une frise et une carte. Ensuite, tu apprendras ta première prière.</p><button class="primary" id="go">C'est parti</button>`;
      app.innerHTML = `<div class="welcome"><div class="art-side">${A.hero(step === 3 ? .6 : .15)}</div><div class="form">${form}</div></div>`;
      if (step === 0) { $("#n1").onclick = () => { name = $("#name").value.trim(); step = 1; draw(); }; $("#name").onkeydown = e => { if (e.key === "Enter") $("#n1").click(); }; }
      if (step === 1) { document.querySelectorAll("[data-b]").forEach(b => b.onclick = () => { bg = b.dataset.b; draw(); }); $("#n2").onclick = () => { step = bg === "revenant" ? 2 : 3; draw(); }; }
      if (step === 2) { document.querySelectorAll("[data-l]").forEach(b => b.onclick = () => { lvl = +b.dataset.l; draw(); }); $("#n3").onclick = () => { step = 3; draw(); }; }
      if (step === 3) $("#go").onclick = () => { S.name = name; S.bg = bg; S.lvl = lvl; save(); go("#/reperes"); };
    };
    draw();
  },

  home() {
    const next = MODULES.find(m => !S.done[m.id] && unlocked(m) && !m.soon);
    const li = m => {
      const u = unlocked(m) && !m.soon, d = S.done[m.id], cls = d ? "done" : m === next ? "open" : u ? "" : "lock";
      const body = `${thumb(m.ill)}<span class="tx"><b>${esc(m.t)}</b><span class="d">${u ? esc(m.d) : "Se débloque après " + esc(m.needs.map(n => MODULES.find(x => x.id === n).t.toLowerCase()).join(" et "))}</span></span>`;
      return `<li class="${cls}"><span class="node">${d ? "✓" : ""}</span>${u ? `<a href="#/${m.id}">${body}</a>` : `<div class="t">${body}</div>`}</li>`;
    };
    app.innerHTML = `
      <div class="home-hero">${A.hero(sunLevel())}<div class="over"><a class="brand" href="#/">${sunmark}Auréa</a><h1>${S.name ? "Bonjour " + esc(S.name) : "Bonjour"}</h1><p class="sub">Un petit pas à la fois.</p><div class="rays big">${Array.from({ length: 12 }, (_, i) => `<i class="${i < Math.round(sunLevel() * 12) ? "on" : ""}"></i>`).join("")}</div></div></div>
      <div class="home-grid"><section>
        ${next ? `<a class="next" href="#/${next.id}"><span class="nextill">${ill(next.ill)}</span><span class="nt"><small>Ta prochaine étape</small><h2>${esc(next.t)}</h2><p>${esc(next.d)}</p><b>Continuer →</b></span></a>` : `<div class="next"><span class="nt"><h2>Tu as parcouru le chemin de départ</h2><p>Continue avec les plans de lecture, le chapelet et l'activité de la semaine.</p></span></div>`}
        <h3>Le chemin</h3><ol class="timeline">${MODULES.map(li).join("")}</ol></section>
        <aside class="aside"><h3>Toujours là</h3><ul class="linklist">${ALWAYS.map(m => `<li><a href="#/${m.id}">${thumb(m.ill)}<span><b>${esc(m.t)}</b><small>${esc(m.d)}</small></span></a></li>`).join("")}</ul>
        <p class="foot"><a href="#/reglages">Réglages</a></p></aside></div>`;
  },

  // ----- frise et carte -----
  reperes() { reperesView(); },

  bases() { reader(BASES, { id: "bases", title: "Les bases" }); },

  priere() {
    let cur = 0;
    const draw = () => {
      const p = PRIERES[cur];
      const pics = { signe: A.signe(), notre: A.priere(), je_vous_salue: A.incarnation(), gloire: A.dieu(), credo: A.eglise() };
      shell("Ma première prière", `
        <div class="split first"><div class="visual">${A.priere()}</div><div><h2>Ta première prière</h2><p class="muted">Lis-la doucement, dans ta tête ou à voix haute. Tu peux aussi la dire avec tes propres mots.</p>
          <div class="card prayer"><p>${g(PRIERE_PREMIERE)}</p></div><button class="primary" id="done">Je l'ai priée</button></div></div>
        <h3>Apprendre les prières des chrétiens</h3>
        <div class="tabs">${PRIERES.map((x, i) => `<button class="tab ${i === cur ? "sel" : ""}" data-t="${i}">${esc(x.t.replace(/\s*\(.*\)/, ""))}</button>`).join("")}</div>
        <div class="split"><div class="visual">${pics[p.id]}</div><div><div class="card prayer"><p>${g(p.x)}</p></div>${p.tip ? `<p class="tip">${g(p.tip)}</p>` : ""}</div></div>`, "#/", "wide");
      $("#done").onclick = () => { markDone("priere"); go("#/"); };
      document.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { cur = +b.dataset.t; draw(); });
    };
    draw();
  },

  bible() { reader(BIBLE_INTRO, { id: "bible", title: "La Bible, mode d'emploi" }); },

  plans(a) {
    if (a[0]) {
      const p = PLANS.find(x => x.id === a[0]), done = S.chap[p.id] || [];
      shell(p.t, `<div class="split"><div class="visual">${A.marche()}</div><div><h2>${esc(p.t)}</h2><p class="muted">${esc(p.d)}</p>
        <ol class="plan">${p.ref.map((r, i) => `<li class="${done.includes(i) ? "ok" : ""}"><label><input type="checkbox" data-i="${i}" ${done.includes(i) ? "checked" : ""}> <span>Jour ${i + 1}, ${esc(r[0])} ${r[1]}${r[2] ? " · " + esc(r[2]) : ""}</span></label> <a href="https://www.aelf.org/bible/${r[0]}/${r[1]}" target="_blank" rel="noopener">Lire</a></li>`).join("")}</ol></div></div>`, "#/plans", "wide");
      document.querySelectorAll("[data-i]").forEach(c => c.onchange = () => {
        const set = new Set(S.chap[p.id] || []); c.checked ? set.add(+c.dataset.i) : set.delete(+c.dataset.i);
        S.chap[p.id] = [...set]; save(); if (set.size === p.ref.length) markDone("plan_" + p.id); VIEWS.plans(a);
      });
      return;
    }
    shell("Plans de lecture", `<p class="muted lead2">Choisis le chemin qui te parle. Tu pourras en changer. Les textes s'ouvrent sur AELF.</p>
      <div class="cols3">${PLANS.map((p, i) => `<a class="poster" href="#/plans/${p.id}">${[A.marche, A.croix, A.ordre][i]()}<span class="pt"><small>${p.lvl}</small><b>${esc(p.t)}</b><span>${esc(p.d)}</span><span class="bar"><i style="width:${((S.chap[p.id] || []).length / p.ref.length) * 100}%"></i></span></span></a>`).join("")}
      <a class="poster" href="#/jesus">${A.incarnation()}<span class="pt"><small>Pour aller plus loin</small><b>Jésus et les prophéties</b><span>Cinq textes, deux lectures</span></span></a></div>`, "#/", "wide");
  },

  jesus() {
    shell("Jésus et les prophéties", `<p class="muted lead2">${esc(PROPHETIES_NOTE)}</p>
      <div class="cols2">${PROPHETIES.map(p => `<article class="entry"><small>${esc(p.ref)}</small><h2>${esc(p.t)}</h2><p>${g(p.x)}</p>${tagLabel(p.c)}</article>`).join("")}</div>`, "#/plans", "wide");
  },

  jeu(a) {
    if (a[0] !== undefined) return quiz(+a[0]);
    const pics = [A.quiz, A.eglise, A.pont];
    shell("Qui est Jésus ?", `<p class="muted lead2">Un petit jeu pour mieux connaître Jésus, sans pression. Chaque niveau te rapporte de la lumière.</p>
      <div class="cols3">${QUIZ.map((lv, i) => `<a class="poster" href="#/jeu/${i}">${pics[i]()}<span class="pt"><small>${S.quiz[i] ? "Meilleur score " + S.quiz[i] + " sur " + lv.qs.length : "Pas encore joué"}</small><b>${esc(lv.lvl)}</b></span></a>`).join("")}</div>`, "#/", "wide");
  },

  evangile() {
    const today = new Date().toISOString().slice(0, 10);
    shell("Évangile du jour", `<div class="split"><div class="visual">${A.livre()}</div><div>
      <p class="muted">${new Date().toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })}</p>
      <article id="ev" class="gospelbox"><p>Chargement…</p></article>
      <p class="tip">${g("Un évangile raconte ce que Jésus a dit et fait. Un psaume est une prière que l'on chante ou que l'on lit.")}</p>
      <label class="field">Ma note sur ce passage<textarea id="nt" rows="3" placeholder="Ce qui m'a touché…"></textarea></label>
      <button class="primary" id="sv">Enregistrer dans mon carnet</button>
      <a class="ghost" target="_blank" rel="noopener" href="https://www.aelf.org/${today}/romain/messe">Ouvrir sur AELF</a></div></div>`, "#/", "wide");
    fetch(`https://api.aelf.org/v1/messes/${today}/france`).then(r => r.json()).then(j => {
      const l = (j.messes?.[0]?.lectures || []).find(x => x.type === "evangile");
      if (!l) throw 0;
      if (!$("#ev")) return;
      $("#ev").innerHTML = `<small>${esc(l.ref || "")}</small><h2>${esc(l.titre || "Évangile")}</h2><div class="gospel">${l.contenu}</div>`;
    }).catch(() => { if (!$("#ev")) return; $("#ev").innerHTML = `<p>Le texte du jour s'affiche ici dès que la connexion à AELF est disponible. Tu peux aussi l'ouvrir avec le bouton ci-dessous.</p>`; });
    $("#sv").onclick = () => { const v = $("#nt").value.trim(); if (!v) return; S.notes.unshift({ t: Date.now(), k: "Évangile du jour", x: v }); save(); markDone("evangile"); go("#/"); };
  },

  messe() {
    const today = new Date().toISOString().slice(0, 10);
    shell("Messe et célébrations", `
      <div class="cols3"><a class="poster" href="#/messe1">${A.bati()}<span class="pt"><small>Étape 1</small><b>Ma première messe</b><span>Le plan de l'église, pas à pas</span></span></a>
      <a class="poster" href="https://messes.info" target="_blank" rel="noopener">${A.chemin()}<span class="pt"><small>Étape 2</small><b>Trouver une messe près de moi</b><span>Le site officiel de l'Église en France</span></span></a>
      <a class="poster" href="#/contact">${A.eglise()}<span class="pt"><small>Étape 3</small><b>Contacter une paroisse</b><span>Pour poser une question ou commencer le catéchuménat</span></span></a></div>
      <h3>L'année de l'Église</h3>
      <div class="split"><div class="visual">${A.annee()}</div><div><p class="muted">Les couleurs montrent les grands temps de l'année. Le violet invite à se préparer, l'or fête, le vert accompagne le quotidien.</p>
        <ul class="agenda">${CALENDRIER.filter(c => c.d >= today).slice(0, 6).map(c => { const d = new Date(c.d); return `<li><span class="date"><b>${d.getDate()}</b>${d.toLocaleDateString("fr-FR", { month: "short" })}</span><span><b>${g(c.t)}</b><br>${g(c.b)}</span></li>`; }).join("")}</ul></div></div>
      <button class="primary" id="done">J'ai terminé cette étape</button>`, "#/", "wide");
    $("#done").onclick = () => { markDone("messe"); go("#/"); };
  },
  messe1() {
    const zone = [5, 1, 2, 3, 4, 5];
    reader(MESSE_ETAPES, { id: null, title: "Ma première messe", back: "#/messe", side: i => A.messe(zone[i]) });
  },
  contact() {
    shell("Contacter une paroisse", `<div class="split"><div class="visual">${A.bati()}</div><div><h2>Un petit message suffit</h2><p>Voici un modèle que tu peux copier et envoyer.</p>
      <div class="card prayer"><p id="tpl">Bonjour, je m'appelle ${esc(S.name || "…")}. Je découvre la foi catholique et je voudrais en savoir plus. Pourrait-on se rencontrer ou parler du catéchuménat ? Merci beaucoup.</p></div>
      <button class="primary" id="cp">Copier le message</button>
      <a class="ghost" target="_blank" rel="noopener" href="https://www.google.com/search?q=paroisse+catéchuménat+près+de+chez+moi">Trouver une paroisse près de moi</a>
      <p class="muted">Bientôt, Auréa te mettra en relation directement avec une paroisse et un accompagnateur formé.</p></div></div>`, "#/messe", "wide");
    $("#cp").onclick = () => { navigator.clipboard?.writeText($("#tpl").textContent); toast("Message copié"); };
  },

  sacrements() {
    let cur = 0;
    const draw = () => {
      const s = SACREMENTS[cur];
      shell("Les sacrements", `
        <p class="muted lead2">Sept gestes de l'Église. Touche chaque dessin pour le découvrir. On commence souvent par le baptême.</p>
        <div class="sacs">${SACREMENTS.map((x, i) => `<button class="sac ${i === cur ? "sel" : ""}" data-s="${i}">${A.sac(i)}<span>${esc(x.t)}</span></button>`).join("")}</div>
        <div class="sacdetail"><div class="bigico">${A.sac(cur)}</div><div><h2>${esc(s.t)}</h2><p class="text">${g(s.b)}</p></div></div>
        <h3>Pourquoi se faire baptiser ?</h3>
        <ol class="bigsteps">${POURQUOI_BAPTEME.map(x => `<li>${g(x)}</li>`).join("")}</ol>
        <h3>Le chemin du catéchuménat</h3>
        <ol class="timeline tl2">${CATECHUMENAT.map((x, i) => `<li><span class="node">${i + 1}</span><div class="t"><span class="tx"><b>${g(x)}</b></span></div></li>`).join("")}</ol>
        <button class="primary" id="done">J'ai compris l'essentiel</button>`, "#/", "wide");
      document.querySelectorAll("[data-s]").forEach(b => b.onclick = () => { cur = +b.dataset.s; draw(); });
      $("#done").onclick = () => { markDone("sacrements"); go("#/"); };
    };
    draw();
  },

  chapelet(a) {
    const todayKey = MYSTERE_PAR_JOUR[new Date().getDay()];
    if (a[0] === "guide") return chapGuide(a[1] || todayKey);
    shell("Le chapelet", `
      <div class="split"><div class="visual">${A.chapelet({})}</div><div>
        <p class="lead2">${g("Le chapelet est un collier de perles. On y répète des prières en pensant à la vie de Jésus avec Marie. Il y a quatre séries de mystères, une pour chaque moment de la semaine.")}</p>
        <div class="today"><small>Aujourd'hui</small><h2>${MYSTERES[todayKey].t}</h2><p>On le prie le ${MYSTERES[todayKey].jours}.</p><a class="primary" href="#/chapelet/guide/${todayKey}">Prier pas à pas</a></div></div></div>
      <h3>Les quatre séries de mystères</h3>
      <div class="cols4">${Object.entries(MYSTERES).map(([k, m], i) => `<a class="poster sm" href="#/chapelet/guide/${k}">${[A.incarnation, A.eau, A.croix, A.tombeau][i]()}<span class="pt"><b>${m.t}</b><span>${m.jours}</span></span></a>`).join("")}</div>
      <h3>Intentions de prière</h3><div class="chips">${INTENTIONS.map(i => `<span>${esc(i)}</span>`).join("")}</div>
      <h3>Se procurer un chapelet</h3><p>${g("On en trouve dans les librairies religieuses, les sanctuaires ou en ligne. Tu peux le faire bénir par un prêtre ou un diacre, il suffit de lui demander après la messe.")}</p>
      <a class="ghost" target="_blank" rel="noopener" href="https://www.google.com/search?q=acheter+chapelet+catholique">Chercher un chapelet</a>`, "#/", "wide");
  },

  pelerinages() { shell("Pèlerinages", `<div class="split"><div class="visual">${A.chemin()}</div><div><h2>Bientôt</h2><p class="lead2">Comprendre pourquoi on part en pèlerinage, et trouver les départs près de chez toi, avec leurs dates.</p></div></div>`, "#/", "wide"); },
  communaute() { shell("Communauté", `<div class="split"><div class="visual">${A.eglise()}</div><div><h2>Bientôt</h2><p class="lead2">Des petits groupes près de chez toi, bien encadrés, et des accompagnateurs formés pour répondre à tes questions.</p></div></div>`, "#/", "wide"); },

  courants() {
    let cur = 0;
    const pics = [A.eglise, A.bati, A.chemin, A.marche, A.livre, A.pont];
    const draw = () => {
      shell("Une Église, plusieurs sensibilités", `<div class="md"><div class="mlist">${COURANTS.map((c, i) => `<button class="${i === cur ? "sel" : ""}" data-c="${i}">${esc(c.t)}</button>`).join("")}</div>
        <div class="mdetail"><div class="visual">${pics[cur]()}</div><h2>${esc(COURANTS[cur].t)}</h2><p class="text">${g(COURANTS[cur].b)}</p></div></div>
        <button class="primary" id="done">Terminé</button>`, "#/", "wide");
      document.querySelectorAll("[data-c]").forEach(b => b.onclick = () => { cur = +b.dataset.c; draw(); });
      $("#done").onclick = () => { markDone("courants"); go("#/"); };
    };
    draw();
  },

  activite() {
    if (S.activityIdx === null) { S.activityIdx = Math.floor(Math.random() * ACTIVITES.length); save(); }
    const a = ACTIVITES[S.activityIdx];
    shell("Activité de la semaine", `<div class="split"><div class="visual">${A.crayon()}</div><div><small class="eyebrow">Cette semaine</small><h2>${esc(a.t)}</h2><p class="text">${esc(a.x)}</p>
      <button class="primary" id="done">Je l'ai faite</button><button class="ghost" id="other">Une autre idée</button></div></div>`, "#/", "wide");
    $("#done").onclick = () => { markDone("activite"); go("#/"); };
    $("#other").onclick = () => { S.activityIdx = (S.activityIdx + 1) % ACTIVITES.length; save(); VIEWS.activite(); };
  },

  ponts() {
    const bg = BACKGROUNDS.find(b => b.id === S.bg);
    shell("Ton chemin", `<div class="split"><div class="visual">${A.chemin()}</div><div><h2>Ton parcours</h2><p class="muted">${esc(bg ? bg.label : "")}. Chaque carte te dit s'il s'agit d'un fait, de ce que l'Église enseigne, ou d'un sujet débattu.</p><a class="ghost" href="#/reglages">Changer mon parcours</a></div></div>
      <div class="cols2">${(PONTS[S.bg] || PONTS.autre).map(p => `<article class="entry"><h2>${esc(p.t)}</h2><p>${g(p.x)}</p>${p.s ? `<small class="src">Source ${esc(p.s)}</small>` : ""}${tagLabel(p.c)}</article>`).join("")}</div>`, "#/", "wide");
  },

  faq() {
    let cur = 0, q = "";
    const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    const list = () => { const w = norm(q).split(/\W+/).filter(x => x.length > 2); if (!w.length) return FAQ.map((f, i) => ({ f, i })); return FAQ.map((f, i) => ({ f, i, s: w.filter(x => norm(f.q + " " + f.k).includes(x)).length })).filter(x => x.s).sort((a, b) => b.s - a.s); };
    const draw = () => {
      const L = list(); if (!L.find(x => x.i === cur) && L[0]) cur = L[0].i;
      const f = FAQ[cur];
      shell("Questions et réponses", `<label class="field big">Pose ta question<input id="q" value="${esc(q)}" placeholder="Ex. pourquoi se faire baptiser ?"></label>
        <div class="md"><div class="mlist">${L.length ? L.map(x => `<button class="${x.i === cur ? "sel" : ""}" data-f="${x.i}">${esc(x.f.q)}</button>`).join("") : `<p class="muted">Pas de réponse toute prête pour l'instant. Parle à un prêtre ou à une paroisse, ils adorent les questions.</p>`}</div>
        <div class="mdetail">${L.length ? `<div class="visual">${A.quiz()}</div><h2>${esc(f.q)}</h2><p class="text">${g(f.a)}</p>` : ""}</div></div>`, "#/", "wide");
      const inp = $("#q"); inp.oninput = e => { q = e.target.value; const pos = e.target.selectionStart; draw(); const n = $("#q"); n.focus(); n.setSelectionRange(pos, pos); };
      document.querySelectorAll("[data-f]").forEach(b => b.onclick = () => { cur = +b.dataset.f; draw(); window.scrollTo(0, 0); });
    };
    draw();
  },

  carnet() {
    shell("Mon carnet", `<div class="split"><div class="visual">${A.crayon()}</div><div><label class="field">Nouvelle note<textarea id="nt" rows="4" placeholder="Une pensée, une question, une intention de prière…"></textarea></label><button class="primary" id="add">Ajouter</button></div></div>
      <div class="cols2">${S.notes.length ? S.notes.map((n, i) => `<article class="entry"><small>${new Date(n.t).toLocaleDateString("fr-FR")} · ${esc(n.k || "Note")}</small><p>${esc(n.x)}</p><button class="link-btn" data-del="${i}">Supprimer</button></article>`).join("") : `<p class="muted">Ton carnet est vide pour l'instant.</p>`}</div>`, "#/", "wide");
    $("#add").onclick = () => { const v = $("#nt").value.trim(); if (!v) return; S.notes.unshift({ t: Date.now(), k: "Note", x: v }); save(); VIEWS.carnet(); };
    document.querySelectorAll("[data-del]").forEach(b => b.onclick = () => { S.notes.splice(+b.dataset.del, 1); save(); VIEWS.carnet(); });
  },

  videos() {
    shell("Vidéos et séries", `<p class="muted lead2">Des vidéos courtes et claires, en français. Touche une image pour la lancer.</p>
      <div class="cols3">${VIDEOS.map((v, i) => `<div class="poster vid" data-v="${i}">${v.yt ? `<button class="playbtn" aria-label="Lancer la vidéo">${A.video(i)}</button>` : A.video(i)}<span class="pt"><small>${esc(v.w)}</small><b>${esc(v.t)}</b><span>${esc(v.d)}</span><a class="textbtn" target="_blank" rel="noopener" href="${v.u || "https://www.youtube.com/results?search_query=" + encodeURIComponent(v.q)}">${v.yt ? "Ouvrir sur YouTube" : v.u ? "Ouvrir le lien" : "Chercher sur YouTube"} ›</a></span></div>`).join("")}
      <a class="poster" target="_blank" rel="noopener" href="https://www.thechosen.tv">${A.incarnation()}<span class="pt"><small>Série</small><b>The Chosen</b><span>La vie de Jésus et de ses disciples, racontée comme un film</span></span></a></div>`, "#/", "wide");
    document.querySelectorAll(".playbtn").forEach(b => b.onclick = () => { const v = VIDEOS[+b.closest("[data-v]").dataset.v]; b.outerHTML = `<div class="embed"><iframe src="https://www.youtube-nocookie.com/embed/${v.yt}?autoplay=1" title="${esc(v.t)}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe></div>`; });
  },

  reglages() {
    shell("Réglages", `<div class="split"><div class="visual">${A.hero(.5).replace('class="art"', 'class="ill"')}</div><div>
      <label class="field">Prénom<input id="nm" value="${esc(S.name)}"></label>
      <label class="field">Mon parcours<select id="bg">${BACKGROUNDS.map(b => `<option value="${b.id}" ${b.id === S.bg ? "selected" : ""}>${esc(b.label)}</option>`).join("")}</select></label>
      <label class="field">Mon niveau<select id="lv">${LEVELS.map(l => `<option value="${l.id}" ${l.id === S.lvl ? "selected" : ""}>${esc(l.label)}</option>`).join("")}</select></label>
      <label class="check"><input type="checkbox" id="ua" ${S.unlockAll ? "checked" : ""}> Tout débloquer (mode démo)</label>
      <button class="primary" id="sv">Enregistrer</button><button class="ghost danger" id="rs">Effacer mes données</button>
      <p class="muted">Dans ce prototype, tes données restent uniquement sur cet appareil.</p></div></div>`, "#/", "wide");
    $("#sv").onclick = () => { S.name = $("#nm").value.trim(); S.bg = $("#bg").value; S.lvl = +$("#lv").value; S.unlockAll = $("#ua").checked; save(); go("#/"); };
    $("#rs").onclick = () => { if (confirm("Effacer toutes tes données ?")) { localStorage.removeItem(KEY); S = fresh(); go("#/onboarding"); render(); } };
  }
};

// ---------- jeu ----------
function quiz(lv) {
  const L = QUIZ[lv]; let i = 0, score = 0;
  const pics = [A.quiz, A.eglise, A.pont];
  const draw = () => {
    if (i >= L.qs.length) {
      S.quiz[lv] = Math.max(S.quiz[lv] || 0, score);
      if (Object.keys(S.quiz).length >= QUIZ.length || S.quiz[lv] >= 4) markDone("jeu");
      save();
      return shell(L.lvl, `<div class="split"><div class="visual">${A.croix()}</div><div><h2>${score} sur ${L.qs.length}</h2><p class="lead2">${score >= 4 ? "Magnifique !" : "Bien joué, tu progresses. Tu peux rejouer quand tu veux."}</p><a class="primary" href="#/jeu">Retour aux niveaux</a></div></div>`, "#/jeu", "wide");
    }
    const q = L.qs[i];
    shell(L.lvl, `<div class="split"><div class="visual">${pics[lv]()}</div><div><div class="progress"><span style="width:${(i / L.qs.length) * 100}%"></span></div>
      <small class="eyebrow">Question ${i + 1} sur ${L.qs.length}</small><h2>${esc(q.q)}</h2>
      <div class="choices">${q.o.map((o, k) => `<button class="choice" data-k="${k}"><i>${String.fromCharCode(65 + k)}</i>${esc(o)}</button>`).join("")}</div><div id="fb"></div></div></div>`, "#/jeu", "wide");
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => {
      const ok = +b.dataset.k === q.a; if (ok) score++;
      document.querySelectorAll("[data-k]").forEach(x => { x.disabled = true; if (+x.dataset.k === q.a) x.classList.add("good"); else if (x === b) x.classList.add("bad"); });
      $("#fb").innerHTML = `<p class="feedback">${esc(q.e)}</p><button class="primary" id="nx">Continuer</button>`;
      $("#nx").onclick = () => { i++; draw(); };
    });
  };
  draw();
}

// ---------- chapelet pas à pas ----------
function chapGuide(key) {
  const m = MYSTERES[key];
  const steps = [
    { t: "Le signe de croix", x: "Tu tiens la croix du chapelet et tu fais le signe de croix.\n" + PRIERES[0].x, r: { part: "croix" } },
    { t: "Le Credo", x: "Toujours sur la croix, tu dis la prière de la foi.\n\n" + PRIERES[4].x, r: { part: "croix" } },
    { t: "Le Notre Père", x: "Sur la première grosse perle.\n\n" + PRIERES[1].x, r: { part: "queue", phase: 1 } },
    { t: "Trois Je vous salue Marie", x: "Sur les trois petites perles, pour demander la foi, l'espérance et l'amour.\n\n" + PRIERES[2].x, r: { part: "queue", phase: 2 } },
    { t: "Le Gloire au Père", x: "Sur la grosse perle qui suit.\n\n" + PRIERES[3].x, r: { part: "queue", phase: 3 } }
  ];
  m.l.forEach((l, k) => {
    steps.push({ t: `Dizaine ${k + 1}, ${l}`, x: `Tu penses à ce moment de la vie de Jésus. ${l}.\nSur la grosse perle, tu dis un Notre Père.`, r: { part: "dizaine", k, phase: "pere" } });
    steps.push({ t: `Dizaine ${k + 1}, dix Je vous salue Marie`, x: "Sur les dix petites perles, tu dis dix fois le Je vous salue Marie en gardant cette scène dans ton cœur.\n\n" + PRIERES[2].x, r: { part: "dizaine", k, phase: "dix" } });
    steps.push({ t: `Dizaine ${k + 1}, le Gloire au Père`, x: PRIERES[3].x, r: { part: "dizaine", k: (k + 1) % 5, phase: "pere" } });
  });
  steps.push({ t: "Pour finir", x: "Tu peux conclure par le Salve Regina ou simplement par un signe de croix.\nBravo, tu as prié le chapelet !" });
  reader(steps, { id: "chapelet", title: m.t, back: "#/chapelet", side: (i, it) => A.chapelet(it.r || {}) });
}

// ---------- frise et carte ----------
function reperesView() {
  const N = REPERES.length;
  let i = Math.min(S.reperes || 0, N - 1), vb = null, raf = 0;
  const px = (lon, lat) => [(lon - 8) * 20, (46 - lat) * 20];
  const poly = (pts, cls) => `<polygon class="${cls}" points="${pts.map(p => px(...p).join(",")).join(" ")}"/>`;
  const lab = (lon, lat, s, cls = "") => { const [x, y] = px(lon, lat); return `<g class="mk ${cls}" data-x="${x}" data-y="${y}"><text>${s}</text></g>`; };
  const base = `<rect x="-400" y="-400" width="2000" height="1400" class="sea"/>` + poly(GEO.eurasie, "land") + poly(GEO.europe, "land") + [GEO.sicile, GEO.sardaigne, GEO.crete, GEO.chypre].map(p => poly(p, "land")).join("") +
    [GEO.noire, GEO.rouge, GEO.golfe].map(p => poly(p, "sea")).join("") + `<polyline class="nil" points="${GEO.nil.map(p => px(...p).join(",")).join(" ")}"/>` +
    lab(18, 35, "Mer Méditerranée", "sealab") + lab(37.5, 24, "Mer Rouge", "sealab") + lab(33.5, 43.6, "Mer Noire", "sealab") + lab(27, 25.5, "ÉGYPTE", "landlab") + lab(44, 26, "ARABIE", "landlab") + lab(40.5, 38.5, "TURQUIE", "landlab") + lab(16, 43.9, "ITALIE", "landlab") + lab(22.2, 39.5, "GRÈCE", "landlab");

  shellFrame();
  function shellFrame() {
    shell("Où en sommes-nous dans l'histoire ?", `
      <div class="reperes">
        <div class="mapbox"><svg id="map" class="map" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Carte de la Méditerranée et du Proche-Orient"><g id="base">${base}</g><g id="dyn"></g></svg></div>
        <div class="rp-text" id="rp"></div>
      </div>
      <ol class="frise" id="frise"></ol>`, "#/", "wide");
    update(true);
  }

  function target(s) {
    const [a, b, c, d] = s.vue; let x = (a - 8) * 20, y = (46 - d) * 20, w = (c - a) * 20, h = (d - b) * 20; const ar = 880 / 520;
    if (w / h < ar) { const nw = h * ar; x -= (nw - w) / 2; w = nw; } else { const nh = w / ar; y -= (nh - h) / 2; h = nh; }
    return [x, y, w, h];
  }
  function applyScale() {
    const svg = $("#map"); if (!svg || !vb) return;
    const u = vb[2] / (svg.clientWidth || 600);
    svg.setAttribute("viewBox", vb.join(" "));
    svg.querySelectorAll(".mk").forEach(m => m.setAttribute("transform", `translate(${m.dataset.x} ${m.dataset.y}) scale(${u})`));
    svg.querySelectorAll(".trail").forEach(t => t.style.strokeWidth = 4.5 * u);
    svg.querySelectorAll(".nil").forEach(t => t.style.strokeWidth = 3 * u);
  }
  function animate(to, instant) {
    cancelAnimationFrame(raf);
    if (!vb || instant) { vb = to; return applyScale(); }
    const from = vb.slice(), t0 = performance.now();
    const step = t => { const k = Math.min(1, (t - t0) / 900), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; vb = from.map((v, j) => v + (to[j] - v) * e); applyScale(); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  function update(first) {
    const s = REPERES[i]; S.reperes = i; save();
    let dyn = "";
    const seen = new Map();
    for (let j = 0; j <= i; j++) {
      const r = REPERES[j], pts = r.trajet.map(k => px(r.lieux[k][1], r.lieux[k][2]).join(","));
      if (pts.length > 1) dyn += `<polyline class="trail ${j === i ? "now" : "past"}" pathLength="1" points="${pts.join(" ")}"/>`;
      r.lieux.forEach(l => seen.set(l[0], { l, now: j === i }));
    }
    seen.forEach(({ l, now }) => { const [x, y] = px(l[1], l[2]); dyn += `<g class="mk pin ${now ? "now" : "past"}" data-x="${x}" data-y="${y}"><circle r="${now ? 9 : 6}"/>${now ? `<text x="${l[3]}" y="${l[4]}">${esc(l[0])}</text>` : ""}</g>`; });
    $("#dyn").innerHTML = dyn;
    animate(target(s), first);
    applyScale();
    $("#rp").innerHTML = `<div class="eyebrow">${esc(s.date)}</div><h2>${esc(s.t)}</h2><div class="rule"></div><p class="text">${g(s.b)}</p>${s.note ? `<p class="tip">${esc(s.note)}</p>` : ""}
      <div class="pager"><button class="textbtn" id="prev" ${i === 0 ? "disabled" : ""}>‹ Précédent</button><span class="count">${i + 1} sur ${N}</span><button class="primary small" id="next">${s.fin ? "Terminer" : "Suivant ›"}</button></div>`;
    $("#prev").onclick = () => { i--; update(); };
    $("#next").onclick = () => { if (s.fin) { markDone("reperes"); go("#/"); } else { i++; update(); } };
    const jes = REPERES.findIndex(r => r.jesus);
    $("#frise").innerHTML = REPERES.map((r, j) => `${j === jes ? `<li class="jesus-mark" aria-hidden="true"><span>Jésus</span></li>` : ""}<li class="${j < jes ? "av" : "ap"} ${j < i ? "past" : ""} ${j === i ? "cur" : ""} ${j > i ? "fut" : ""}"><button ${j > i ? "disabled" : ""} data-j="${j}"><i></i><span>${esc(r.court)}</span></button></li>`).join("");
    document.querySelectorAll("[data-j]").forEach(b => b.onclick = () => { i = +b.dataset.j; update(); });
    const cur = $("#frise .cur"); cur && cur.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
    bindGl();
  }
  window.addEventListener("resize", applyScale, { once: true });
}

// ---------- glossaire (feuille avec retour possible) ----------
let sheetStack = [];
function openGl(key) {
  sheetStack.push(key); showGl();
}
function showGl() {
  const key = sheetStack[sheetStack.length - 1], [t, d] = GLOSSARY[key];
  let sh = $("#sheet");
  if (!sh) { sh = document.createElement("div"); sh.id = "sheet"; document.body.appendChild(sh); }
  sh.innerHTML = `<div class="sheet"><b>${esc(t)}</b><p>${g(d, key)}</p><div class="row">${sheetStack.length > 1 ? `<button class="textbtn" id="shb">‹ Retour</button>` : ""}<button class="primary small" id="shx">Compris</button></div></div>`;
  sh.className = "open";
  $("#shx").onclick = () => { sh.className = ""; sheetStack = []; };
  const b = $("#shb"); if (b) b.onclick = () => { sheetStack.pop(); showGl(); };
  sh.onclick = ev => { if (ev.target === sh) { sh.className = ""; sheetStack = []; } };
  sh.querySelectorAll(".gl").forEach(x => x.onclick = e => { e.preventDefault(); openGl(x.dataset.gl); });
}
function bindGl() {
  document.querySelectorAll(".page .gl, .reperes .gl").forEach(b => b.onclick = e => { e.preventDefault(); sheetStack = []; openGl(b.dataset.gl); });
}

render();
