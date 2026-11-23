/* Auréa v8 : quiz bienveillants, groupes d'étude et de prière. */

// ---------- quiz ----------
function allQuizzes() {
  const jesus = QUIZ.map((lv, i) => ({ id: "jesus" + (i + 1), t: "Qui est Jésus, " + lv.lvl.replace(/^Niveau \d, /, "").toLowerCase(), d: ["Sa vie et ses premiers pas.", "Les personnes qu'il croise sur sa route.", "Ses grandes valeurs, avec les paraboles."][i], c: ["#d9784a", "#c2703a", "#b8862a"][i], qs: lv.qs.map(x => ({ q: x.q, o: x.o, a: x.a, e: x.e })) }));
  return [...jesus, ...QUIZZES, { id: "saints", t: "Les figures de la foi", d: "Un nouveau jeu à chaque fois, tiré des fiches des saints.", c: "#7a5fa8", dyn: quizSaints }];
}
BADGES.find(b => b.id === "parfait").test = S => Object.keys(S.quizPerfect || {}).length > 0;
BADGES.push({ id: "curieux5", t: "Curieux de tout", d: "Tu as découvert cinq quiz différents.", icon: "question", test: S => Object.keys(S.quizDone || {}).length >= 5 });

VIEWS.jeu = function (a) {
  if (a && a[0]) { const qz = allQuizzes().find(x => x.id === a[0]); if (qz) return quizPlay(qz); }
  S.quizDone = S.quizDone || {};
  shell("Quiz", `<p class="lead2">Des quiz pour t'amuser et pour retenir. Ici, on ne se trompe pas, on découvre. Chaque réponse est expliquée avec douceur, tu peux demander un indice, et tu gagnes de la lumière quoi qu'il arrive.</p>
    <div class="qgrid">${allQuizzes().map(q => { const n = q.qs ? q.qs.length : 8, best = S.quiz[q.id]; return `<a class="qcard" href="#/jeu/${q.id}" style="--c:${q.c}"><small class="eyebrow">${n} questions</small><h3>${esc(q.t)}</h3><p>${esc(q.d)}</p><span class="qstate">${S.quizDone[q.id] ? (best != null ? `Meilleur résultat, ${best} sur ${n}` : "Déjà découvert") : "Pas encore joué"}</span></a>`; }).join("")}</div>`, "#/", "wide");
};

function quizPlay(qz) {
  let qs = qz.dyn ? qz.dyn() : qz.qs.slice(), i = 0, ok = 0, missed = [], answered = false, hint = false, picked = null;
  const total = () => qs.length;
  const draw = () => {
    if (i >= qs.length) return result();
    const q = qs[i];
    shell(qz.t, `<div class="split quizplay" style="--c:${qz.c}"><div class="visual">${[A.quiz, A.eglise, A.pont, A.livre, A.dieu, A.chemin][(qz.id.length + i) % 6]()}</div><div>
      <div class="qdots">${qs.map((_, k) => `<i class="${k < i ? "on" : ""} ${k === i ? "cur" : ""}"></i>`).join("")}</div>
      <small class="eyebrow">Question ${i + 1} sur ${qs.length}</small><h2>${esc(q.q)}</h2>
      <div class="choices qchoices">${q.o.map((o, k) => `<button class="choice ${answered && k === q.a ? "good" : ""} ${answered && k === picked && k !== q.a ? "soft" : ""}" data-k="${k}" ${answered ? "disabled" : ""}><i>${String.fromCharCode(65 + k)}</i>${esc(o)}</button>`).join("")}</div>
      ${q.h && !answered ? (hint ? `<p class="hintbox">Un petit indice. ${esc(q.h)}</p>` : `<button class="textbtn" id="hint">Un petit indice</button>`) : ""}
      ${answered ? `<div class="feedback ${picked === q.a ? "yes" : "nearly"}"><b>${picked === q.a ? "Oui, bien vu !" : "Pas tout à fait, et ce n'est pas grave."}</b><p>${g(q.e)}</p></div><button class="primary" id="nx">${i === qs.length - 1 ? "Voir mon résultat" : "Question suivante"}</button>` : ""}
      </div></div>`, "#/jeu", "wide");
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { picked = +b.dataset.k; answered = true; if (picked === q.a) ok++; else missed.push(q); draw(); });
    const h = $("#hint"); if (h) h.onclick = () => { hint = true; draw(); };
    const nx = $("#nx"); if (nx) nx.onclick = () => { i++; answered = false; hint = false; picked = null; draw(); };
  };
  const result = () => {
    const n = qs.length, pct = ok / n, first = !(S.quizDone || {})[qz.id];
    S.quizDone = S.quizDone || {}; S.quizDone[qz.id] = Date.now(); S.quiz[qz.id] = Math.max(S.quiz[qz.id] || 0, ok);
    if (ok === n) { S.quizPerfect = S.quizPerfect || {}; S.quizPerfect[qz.id] = true; }
    save(); gain(first ? 5 + ok : 1, "quiz"); markDone("jeu");
    const msg = pct === 1 ? "Un sans-faute, bravo !" : pct >= .7 ? "Très bien, tu en sais déjà beaucoup." : pct >= .4 ? "Beau début, tu as découvert plusieurs choses." : "Tu viens de découvrir beaucoup de choses nouvelles. C'est le plus important.";
    shell(qz.t, `<div class="split quizplay" style="--c:${qz.c}"><div class="visual">${A.croix()}</div><div><small class="eyebrow">Résultat</small><h2>${ok} sur ${n}</h2><p class="lead2">${msg}</p>
      ${missed.length ? `<h4>À retenir</h4><ul class="retenir-l">${missed.map(q => `<li><b>${esc(q.q)}</b><span>${g(q.e)}</span></li>`).join("")}</ul>` : ""}
      <div class="toolrow">${missed.length ? `<button class="primary" id="redo">Rejouer ces questions</button>` : ""}<button class="ghost" id="again">Recommencer</button><a class="ghost" href="#/jeu">Autres quiz</a></div></div></div>`, "#/jeu", "wide");
    const redo = $("#redo"); if (redo) redo.onclick = () => { qs = missed.slice(); missed = []; i = 0; ok = 0; answered = false; draw(); };
    $("#again").onclick = () => { qs = qz.dyn ? qz.dyn() : qz.qs.slice(); i = 0; ok = 0; missed = []; answered = false; draw(); };
  };
  draw();
}

// ---------- groupes ----------
const CHARTE = ["Je parle avec respect, y compris quand je ne suis pas d'accord.", "Je n'attaque ni les personnes, ni les autres religions.", "Je ne partage pas d'informations personnelles, ni les miennes ni celles des autres.", "Je ne cherche pas à convaincre à tout prix. Chacun avance à son rythme.", "Je peux signaler un message qui blesse, et je peux quitter le groupe quand je veux."];
const KINDS = { etude: ["Étude biblique", "#2f7a6f"], priere: ["Prière", "#b45a7a"], discussion: ["Discussion", "#c0483c"] };
const REMOTE = () => typeof CONFIG !== "undefined" && CONFIG.SUPABASE_URL && CONFIG.SUPABASE_ANON_KEY;
const PLANS_GROUPE = [
  { id: "marc", t: "L'Évangile de Marc en 8 semaines", build: () => planFrom([["mar", 1, 16]], 8) },
  { id: "luc", t: "L'Évangile de Luc en 8 semaines", build: () => planFrom([["luk", 1, 24]], 8) },
  { id: "jean", t: "L'Évangile de Jean en 7 semaines", build: () => planFrom([["joh", 1, 21]], 7) },
  { id: "actes", t: "Les Actes des Apôtres en 7 semaines", build: () => planFrom([["act", 1, 28]], 7) },
  { id: "intro", t: "Le chemin d'introduction en 14 semaines", build: () => planFrom(CHEMIN_INTRO, 14) },
  { id: "psaumes", t: "Dix psaumes, un par semaine", build: () => ({ weeks: [1, 8, 19, 23, 27, 42, 51, 91, 121, 139].map((n, i) => ({ n: i + 1, label: "Psaume " + n, refs: [["psa", n]] })) }) },
  { id: "libre", t: "Pas de plan, on discute librement", build: () => null }
];
function planFrom(steps, weeks) {
  const chs = []; steps.forEach(s => { for (let c = s[1]; c <= s[2]; c++) chs.push([s[0], c]); });
  const per = Math.ceil(chs.length / weeks), out = [];
  for (let w = 0; w < weeks; w++) { const refs = chs.slice(w * per, (w + 1) * per); if (!refs.length) break; out.push({ n: w + 1, label: refs.length === 1 ? `${BOOK[refs[0][0]].n} ${refs[0][1]}` : `${BOOK[refs[0][0]].n} ${refs[0][1]} à ${refs[refs.length - 1][1]}`, refs }); }
  return { weeks: out };
}
const refLink = (c, n) => `<a href="#/lire/${c}/${n}">${esc(BOOK[c].n)} ${n}</a>`;
function codeGroupe() { const al = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; return Array.from({ length: 6 }, () => al[Math.floor(Math.random() * al.length)]).join(""); }

// --- adaptateur local (aperçu sur cet appareil) ---
const GroupsLocal = {
  async list() { S.groups = S.groups || []; return S.groups; },
  async get(id) { return (S.groups || []).find(g => g.id === id); },
  async create(d) { const g = { id: "g" + Date.now(), nom: d.nom, kind: d.kind, description: d.description, code: codeGroupe(), plan: d.plan, owner: "me", members: [{ id: "me", pseudo: S.pseudo || S.name || "Moi", role: "owner" }], msgs: [], progress: {}, prayed: {}, created: Date.now() }; (S.groups = S.groups || []).push(g); save(); return g; },
  async join() { throw new Error("Pour rejoindre un groupe avec un code, Auréa doit être connecté à un serveur de groupes. Pour l'instant, les groupes ne sont visibles que sur cet appareil."); },
  async post(gid, kind, body) { const g = await this.get(gid); g.msgs.push({ id: "m" + Date.now(), kind, body, by: "me", pseudo: S.pseudo || S.name || "Moi", t: Date.now() }); save(); },
  async toggleWeek(gid, week) { const g = await this.get(gid); g.progress.me = g.progress.me || {}; g.progress.me[week] ? delete g.progress.me[week] : (g.progress.me[week] = 1); save(); },
  async pray(gid, mid) { const g = await this.get(gid); g.prayed[mid] = g.prayed[mid] || {}; g.prayed[mid].me ? delete g.prayed[mid].me : (g.prayed[mid].me = 1); save(); },
  async leave(gid) { S.groups = S.groups.filter(g => g.id !== gid); save(); },
  async report() { toast("Merci, le signalement est noté"); },
  async view(gid) { return this.get(gid); }
};
// --- adaptateur serveur Supabase (voir supabase/schema.sql) ---
const GroupsRemote = {
  async session() {
    const u = CONFIG.SUPABASE_URL, k = CONFIG.SUPABASE_ANON_KEY; let s = S.sb;
    if (s && s.expires_at && s.expires_at * 1000 - Date.now() < 60000) { const r = await fetch(`${u}/auth/v1/token?grant_type=refresh_token`, { method: "POST", headers: { apikey: k, "content-type": "application/json" }, body: JSON.stringify({ refresh_token: s.refresh_token }) }); if (r.ok) { S.sb = s = await r.json(); save(); } else { S.sb = s = null; } }
    if (!s) { const r = await fetch(`${u}/auth/v1/signup`, { method: "POST", headers: { apikey: k, "content-type": "application/json" }, body: JSON.stringify({ data: {} }) }); if (!r.ok) throw new Error("Connexion au serveur de groupes impossible."); S.sb = s = await r.json(); save(); }
    return s;
  },
  async req(path, opt = {}) {
    const s = await this.session(), r = await fetch(`${CONFIG.SUPABASE_URL}${path}`, { method: opt.method || "GET", headers: { apikey: CONFIG.SUPABASE_ANON_KEY, Authorization: "Bearer " + s.access_token, "content-type": "application/json", Prefer: opt.prefer || "return=representation" }, body: opt.body ? JSON.stringify(opt.body) : undefined });
    if (!r.ok) { let m = ""; try { m = (await r.json()).message || ""; } catch {} throw new Error(m || "Erreur du serveur (" + r.status + ")"); }
    return r.status === 204 ? null : r.json().catch(() => null);
  },
  async me() { const s = await this.session(); return s.user.id; },
  async profile() { const id = await this.me(); await this.req("/rest/v1/profiles?on_conflict=id", { method: "POST", prefer: "resolution=merge-duplicates,return=minimal", body: { id, pseudo: (S.pseudo || S.name || "Ami").slice(0, 30) } }); return id; },
  async list() { return (await this.req("/rest/v1/groups?select=*&order=created_at.desc")) || []; },
  async create(d) { await this.profile(); const r = await this.req("/rest/v1/rpc/create_group", { method: "POST", body: { p_nom: d.nom, p_kind: d.kind, p_description: d.description || "", p_plan: d.plan } }); return Array.isArray(r) ? r[0] : r; },
  async join(code) { await this.profile(); const r = await this.req("/rest/v1/rpc/join_group", { method: "POST", body: { p_code: code.trim().toUpperCase() } }); return Array.isArray(r) ? r[0] : r; },
  async view(gid) {
    const me = await this.me();
    const [gr, ms, mem, pr, pg] = await Promise.all([
      this.req(`/rest/v1/groups?id=eq.${gid}&select=*`), this.req(`/rest/v1/messages?group_id=eq.${gid}&hidden=eq.false&select=id,kind,body,created_at,user_id,profiles(pseudo)&order=created_at.asc&limit=300`),
      this.req(`/rest/v1/members?group_id=eq.${gid}&select=role,user_id,profiles(pseudo)`), this.req(`/rest/v1/prayed?select=message_id,user_id`), this.req(`/rest/v1/progress?group_id=eq.${gid}&select=user_id,week`)]);
    const g = gr[0]; if (!g) throw new Error("Groupe introuvable");
    g.members = mem.map(m => ({ id: m.user_id === me ? "me" : m.user_id, pseudo: m.profiles?.pseudo || "Ami", role: m.role }));
    g.msgs = ms.map(m => ({ id: m.id, kind: m.kind, body: m.body, by: m.user_id === me ? "me" : m.user_id, pseudo: m.profiles?.pseudo || "Ami", t: new Date(m.created_at).getTime() }));
    g.prayed = {}; pr.forEach(p => { (g.prayed[p.message_id] = g.prayed[p.message_id] || {})[p.user_id === me ? "me" : p.user_id] = 1; });
    g.progress = {}; pg.forEach(p => { (g.progress[p.user_id === me ? "me" : p.user_id] = g.progress[p.user_id === me ? "me" : p.user_id] || {})[p.week] = 1; });
    return g;
  },
  async post(gid, kind, body) { const me = await this.profile(); await this.req("/rest/v1/messages", { method: "POST", prefer: "return=minimal", body: { group_id: gid, user_id: me, kind, body } }); },
  async toggleWeek(gid, week, on) { const me = await this.me(); if (on) await this.req(`/rest/v1/progress?group_id=eq.${gid}&user_id=eq.${me}&week=eq.${week}`, { method: "DELETE", prefer: "return=minimal" }); else await this.req("/rest/v1/progress", { method: "POST", prefer: "return=minimal", body: { group_id: gid, user_id: me, week } }); },
  async pray(gid, mid, on) { const me = await this.me(); if (on) await this.req(`/rest/v1/prayed?message_id=eq.${mid}&user_id=eq.${me}`, { method: "DELETE", prefer: "return=minimal" }); else await this.req("/rest/v1/prayed", { method: "POST", prefer: "return=minimal", body: { message_id: mid, user_id: me } }); },
  async leave(gid) { const me = await this.me(); await this.req(`/rest/v1/members?group_id=eq.${gid}&user_id=eq.${me}`, { method: "DELETE", prefer: "return=minimal" }); },
  async report(mid, reason) { const me = await this.me(); await this.req("/rest/v1/reports", { method: "POST", prefer: "return=minimal", body: { message_id: mid, reporter: me, reason: reason || "" } }); toast("Merci, le signalement a été envoyé"); }
};
const GAPI = () => REMOTE() ? GroupsRemote : GroupsLocal;

VIEWS.groupes = async function (a) {
  if (a && a[0] === "nouveau") return groupeCreate();
  if (a && a[0]) return groupeView(a[0], a[1]);
  const api = GAPI(); let list = [], err = "";
  try { list = await api.list(); } catch (e) { err = e.message; }
  shell("Groupes d'étude et de prière", `
    <p class="lead2">Un petit groupe vaut mieux qu'un grand forum. Crée un groupe pour lire la Bible ensemble, prier ou discuter, ou rejoins celui d'un ami avec son code. Les groupes sont privés, sans messages entre inconnus.</p>
    ${REMOTE() ? "" : `<p class="tip">Mode aperçu. Pour l'instant, les groupes que tu crées ne sont visibles que sur cet appareil. Pour inviter d'autres personnes, Auréa doit être relié à un serveur, ce que l'équipe peut activer avec le fichier fourni dans le projet.</p>`}
    ${err ? `<p class="muted">${esc(err)}</p>` : ""}
    <div class="toolrow"><a class="primary" href="#/groupes/nouveau">Créer un groupe</a></div>
    <form class="goto" id="jf"><label for="jc">Rejoindre un groupe avec un code</label><div><input id="jc" placeholder="Code à 6 caractères" maxlength="8" autocomplete="off" style="text-transform:uppercase"><button class="primary" type="submit">Rejoindre</button></div><small class="muted" id="jerr"></small></form>
    <h3>Mes groupes</h3>${list.length ? `<div class="qgrid">${list.map(g => `<a class="qcard" href="#/groupes/${g.id}" style="--c:${KINDS[g.kind][1]}"><small class="eyebrow">${KINDS[g.kind][0]}</small><h3>${esc(g.nom)}</h3><p>${esc(g.description || "")}</p><span class="qstate">Code ${esc(g.code)}${g.members ? ` · ${g.members.length} membre${g.members.length > 1 ? "s" : ""}` : ""}</span></a>`).join("")}</div>` : `<p class="empty-note">Tu n'as pas encore de groupe.</p>`}
    <h3>Les règles du jeu</h3><ol class="tipslist">${CHARTE.map((c, i) => `<li><b>${["Respect", "Bienveillance", "Discrétion", "Liberté", "Sécurité"][i]}</b><span>${c}</span></li>`).join("")}</ol>
    <p class="muted fine">Si tu as moins de 18 ans, parle de ce groupe à un adulte de confiance avant de rejoindre. Il n'y a aucun message privé dans Auréa.</p>`, "#/", "wide");
  $("#jf").onsubmit = async e => { e.preventDefault(); try { const g = await api.join($("#jc").value); go("#/groupes/" + g.id); } catch (er) { $("#jerr").textContent = er.message; } };
};

function groupeCreate() {
  let kind = "etude", plan = "marc";
  const draw = () => {
    shell("Créer un groupe", `<div class="split"><div class="visual">${A.eglise()}</div><div>
      <label class="field">Nom du groupe<input id="gn" maxlength="60" placeholder="Par exemple, Lire Marc ensemble" value="${esc(S.draftGroup?.nom || "")}"></label>
      <div class="tabs">${Object.entries(KINDS).map(([k, v]) => `<button class="tab ${kind === k ? "sel" : ""}" data-k="${k}">${v[0]}</button>`).join("")}</div>
      <label class="field">Description, en une phrase<input id="gd" maxlength="140" placeholder="Pour qui, pour quoi, à quel rythme"></label>
      ${kind === "etude" ? `<label class="field">Plan d'étude<select id="gp">${PLANS_GROUPE.map(p => `<option value="${p.id}" ${plan === p.id ? "selected" : ""}>${esc(p.t)}</option>`).join("")}</select></label>` : ""}
      <label class="field">Ton pseudo dans le groupe<input id="gps" maxlength="30" placeholder="Un prénom suffit" value="${esc(S.pseudo || S.name || "")}"></label>
      <h4>La charte du groupe</h4><ul class="charte">${CHARTE.map(c => `<li>${c}</li>`).join("")}</ul>
      <label class="check"><input type="checkbox" id="gc"> J'accepte la charte et je la partagerai avec les membres</label>
      <button class="primary" id="gok">Créer le groupe</button><p class="muted" id="gerr"></p></div></div>`, "#/groupes", "wide");
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { S.draftGroup = { nom: $("#gn").value }; kind = b.dataset.k; draw(); });
    const gp = $("#gp"); if (gp) gp.onchange = () => { plan = gp.value; };
    $("#gok").onclick = async () => {
      const nom = $("#gn").value.trim(), desc = $("#gd").value.trim(), pseudo = $("#gps").value.trim();
      if (nom.length < 3) return $("#gerr").textContent = "Donne un nom d'au moins 3 lettres.";
      if (pseudo.length < 2) return $("#gerr").textContent = "Choisis un pseudo, un prénom suffit.";
      if (!$("#gc").checked) return $("#gerr").textContent = "Il faut accepter la charte pour créer un groupe.";
      S.pseudo = pseudo; save();
      try { const p = kind === "etude" ? PLANS_GROUPE.find(x => x.id === (gp ? gp.value : plan)).build() : null; const g = await GAPI().create({ nom, kind, description: desc, plan: p }); S.draftGroup = null; gain(3, "groupe"); go("#/groupes/" + g.id); }
      catch (e) { $("#gerr").textContent = e.message; }
    };
  };
  draw();
}

async function groupeView(gid, tab = "discussion") {
  const api = GAPI(); let g;
  try { g = await api.view(gid); } catch (e) { return shell("Groupe", `<p>${esc(e.message)}</p><a class="primary" href="#/groupes">Retour aux groupes</a>`, "#/groupes", "wide"); }
  if (!g) return go("#/groupes");
  const draw = async (t = tab) => {
    tab = t; try { g = await api.view(gid); } catch {}
    const k = KINDS[g.kind], me = "me", weeks = g.plan ? g.plan.weeks : [], myProg = (g.progress && g.progress.me) || {}, memberCount = g.members.length;
    const msgs = g.msgs.filter(m => tab === "priere" ? m.kind === "intention" : m.kind === "message");
    const fmt = txt => esc(txt).replace(/\b((?:[123]\s?)?[A-Za-zéèêôï]+\.?)\s(\d{1,3})(?:\s?[,:]\s?(\d{1,3}))?\b/g, (m, n, c, v) => { const r = parseRef(m); return r && r.ch ? `<a href="#/lire/${r.code}/${r.ch}${r.v ? "/" + r.v : ""}">${m}</a>` : m; }).replace(/\n/g, "<br>");
    shell(g.nom, `<div class="grouphead" style="--c:${k[1]}"><div><small class="eyebrow">${k[0]}</small><p class="muted">${esc(g.description || "")}</p></div>
      <div class="gcode"><small>Code pour inviter</small><b>${esc(g.code)}</b><button class="textbtn" id="cpc">Copier</button></div></div>
      ${REMOTE() ? "" : `<p class="tip">Mode aperçu, ce groupe n'est visible que sur cet appareil.</p>`}
      <div class="tabs"><button class="tab ${tab === "discussion" ? "sel" : ""}" data-t="discussion">Discussion</button>${weeks.length ? `<button class="tab ${tab === "etude" ? "sel" : ""}" data-t="etude">Étude</button>` : ""}<button class="tab ${tab === "priere" ? "sel" : ""}" data-t="priere">Intentions de prière</button><button class="tab ${tab === "membres" ? "sel" : ""}" data-t="membres">Membres, ${memberCount}</button></div>
      ${tab === "etude" ? `<ol class="weeks">${weeks.map(w => { const done = !!myProg[w.n], n = Object.values(g.progress || {}).filter(p => p[w.n]).length; return `<li class="${done ? "done" : ""}"><span class="wn">Semaine ${w.n}</span><span class="wl">${w.refs.map(r => refLink(r[0], r[1])).join(", ")}</span><span class="wc">${n} sur ${memberCount} ${n > 1 ? "ont" : "a"} lu</span><button class="${done ? "ghost done" : "ghost"}" data-w="${w.n}" data-on="${done ? 1 : 0}">${done ? "Lu ✓" : "J'ai lu"}</button></li>`; }).join("")}</ol>`
      : tab === "membres" ? `<ul class="members">${g.members.map(m => `<li><b>${esc(m.pseudo)}${m.id === me ? " (moi)" : ""}</b><span>${m.role === "owner" ? "Responsable" : "Membre"}</span></li>`).join("")}</ul><button class="ghost danger" id="lv">Quitter le groupe</button>`
      : `<div class="thread">${msgs.length ? msgs.map(m => { const nbp = Object.keys((g.prayed || {})[m.id] || {}).length, iprayed = !!((g.prayed || {})[m.id] || {}).me; return `<article class="gmsg ${m.by === me ? "mine" : ""}"><header><b>${esc(m.pseudo)}</b><small>${new Date(m.t).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</small></header><p>${fmt(m.body)}</p><footer>${tab === "priere" ? `<button class="${iprayed ? "ghost done" : "ghost"}" data-p="${m.id}" data-on="${iprayed ? 1 : 0}">${iprayed ? "Je prie ✓" : "Je prie pour cette intention"}</button><span class="muted">${nbp} personne${nbp > 1 ? "s" : ""} prie${nbp > 1 ? "nt" : ""}</span>` : ""}${m.by !== me ? `<button class="textbtn" data-r="${m.id}">Signaler</button>` : ""}</footer></article>`; }).join("") : `<p class="empty-note">${tab === "priere" ? "Aucune intention pour l'instant. Confie quelque chose au groupe." : "Aucun message pour l'instant. Lance la conversation, par exemple en partageant ce que tu as retenu d'une lecture."}</p>`}</div>
      <form class="gform" id="gf"><textarea id="gt" rows="3" maxlength="1000" placeholder="${tab === "priere" ? "Écris une intention de prière, sans nom de famille ni détail trop personnel" : "Écris un message. Tu peux citer un passage, par exemple Jn 3, 16"}"></textarea><button class="primary small" type="submit">${tab === "priere" ? "Confier au groupe" : "Envoyer"}</button></form>`}`, "#/groupes", "wide");
    document.querySelectorAll("[data-t]").forEach(b => b.onclick = () => draw(b.dataset.t));
    const cp = $("#cpc"); if (cp) cp.onclick = () => { navigator.clipboard?.writeText(g.code); toast("Code copié"); };
    document.querySelectorAll("[data-w]").forEach(b => b.onclick = async () => { await api.toggleWeek(gid, +b.dataset.w, b.dataset.on === "1"); if (b.dataset.on !== "1") gain(2, "étude"); draw(); });
    document.querySelectorAll("[data-p]").forEach(b => b.onclick = async () => { await api.pray(gid, b.dataset.p, b.dataset.on === "1"); draw(); });
    document.querySelectorAll("[data-r]").forEach(b => b.onclick = () => { const why = prompt("Pourquoi signales-tu ce message ? (facultatif)") ; if (why !== null) api.report(b.dataset.r, why); });
    const lv = $("#lv"); if (lv) lv.onclick = async () => { if (confirm("Quitter ce groupe ?")) { await api.leave(gid); go("#/groupes"); } };
    const gf = $("#gf"); if (gf) gf.onsubmit = async e => { e.preventDefault(); const body = $("#gt").value.trim(); if (!body) return; await api.post(gid, tab === "priere" ? "intention" : "message", body); draw(); };
    clearInterval(window.__gi); if (REMOTE()) window.__gi = setInterval(() => { if (!/^#\/groupes\//.test(location.hash)) return clearInterval(window.__gi); if (document.activeElement && document.activeElement.id === "gt") return; draw(); }, 9000);
  };
  draw(tab);
}
window.addEventListener("hashchange", () => { if (!/^#\/groupes\/[^n]/.test(location.hash)) clearInterval(window.__gi); });
