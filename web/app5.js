/* Auréa v6 : prière à tout moment, chapelet, chemins de lecture de la Bible, lecture libre. */

// ---------- retour facile : le bouton revient vraiment en arrière ----------
document.addEventListener("click", e => {
  const a = e.target.closest && e.target.closest("a.back"); if (!a) return;
  if (history.length > 1 && document.referrer !== undefined && window.__navCount > 0) { e.preventDefault(); history.back(); }
});
window.__navCount = 0; window.addEventListener("hashchange", () => { window.__navCount++; });

// ---------- lecture audio (voix du navigateur) ----------
function speak(text) {
  if (!("speechSynthesis" in window)) return toast("La lecture audio n'est pas disponible sur cet appareil");
  if (speechSynthesis.speaking) { speechSynthesis.cancel(); return false; }
  const u = new SpeechSynthesisUtterance(text.replace(/\n+/g, ". ")); u.lang = "fr-FR"; u.rate = .9;
  const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith("fr")); if (v) u.voice = v;
  speechSynthesis.speak(u); return true;
}
function stopSpeak() { if ("speechSynthesis" in window) speechSynthesis.cancel(); }
window.addEventListener("hashchange", () => { stopSpeak(); if (!/^#\/chapelet\/(prier|guide)/.test(location.hash)) { document.removeEventListener("keydown", window.__rk); releaseLock(); } });
let __wl = null;
async function keepAwake() { try { if (navigator.wakeLock && S.wake !== false) __wl = await navigator.wakeLock.request("screen"); } catch {} }
function releaseLock() { try { __wl && __wl.release(); } catch {} __wl = null; }

// ---------- prières ----------
function moment() { const h = new Date().getHours(); return h < 5 ? "soir" : h < 11 ? "matin" : h < 14 ? "angelus" : h < 18 ? "esprit" : "soir"; }
function prayerOfMoment() { const m = moment(); return PRAYERS.find(p => p.id === (m === "matin" ? "matin" : m === "angelus" ? "angelus" : m === "esprit" ? "esprit" : "soir")); }
function favP() { S.favPrayers = S.favPrayers || {}; return S.favPrayers; }
BADGES.push({ id: "priant", t: "Fidèle à la prière", d: "Tu as prié cinq prières différentes.", icon: "candle", test: S => Object.keys(S.prayedIds || {}).length >= 5 });

VIEWS.prier = function (a) {
  let tag = "tout", cur = a && a[0] && PRAYERS.find(p => p.id === a[0]) ? a[0] : prayerOfMoment().id, size = S.psize || 1.2;
  const list = () => tag === "fav" ? PRAYERS.filter(p => favP()[p.id]) : tag === "tout" ? PRAYERS : PRAYERS.filter(p => p.tags.includes(tag));
  const draw = async () => {
    const L = list(); if (!L.find(p => p.id === cur) && L[0]) cur = L[0].id;
    const p = PRAYERS.find(x => x.id === cur), fav = !!favP()[cur], mo = prayerOfMoment();
    let text = p.x;
    if (p.bible) { try { const d = await loadBook(p.bible[0]); text = d[p.bible[1] - 1].slice(p.bible[2] - 1, p.bible[3]).join("\n"); } catch { text = "Le texte n'a pas pu être chargé."; } }
    shell("Prier", `
      <div class="prayhead"><a class="rosarybtn" href="#/chapelet"><span>${A.chapelet({}).replace('class="ill chap"', 'class="ill chap chapmini"')}</span><b>Prier le chapelet</b><small>${S.rosary ? "Reprendre où tu t'es arrêté" : "Guidé, perle par perle"}</small></a>
        <a class="momentbtn" href="#/prier/${mo.id}"><small class="eyebrow">Pour ce moment de la journée</small><b>${esc(mo.t)}</b><span>Une prière courte, à dire maintenant.</span></a></div>
      <div class="tabs">${PRAYER_TAGS.map(([id, n]) => `<button class="tab ${tag === id ? "sel" : ""}" data-t="${id}">${n}</button>`).join("")}<button class="tab ${tag === "fav" ? "sel" : ""}" data-t="fav">Mes favorites</button></div>
      <div class="md prayermd"><div class="mlist">${L.length ? L.map(x => `<button class="${x.id === cur ? "sel" : ""}" data-p="${x.id}">${esc(x.t)}${favP()[x.id] ? " ♥" : ""}</button>`).join("") : `<p class="muted">Aucune prière dans cette liste pour l'instant.</p>`}
        <div class="psalmlist"><h4>Psaumes pour prier</h4>${PSALMES_PRIER.map(([c, n, t]) => `<a href="#/lire/${c}/${n}">Psaume ${n}<small>${esc(t)}</small></a>`).join("")}</div></div>
        <article class="prayerview">${L.length ? `<h2>${esc(p.t)}</h2><div class="prayertext" style="font-size:${size}rem">${esc(text).replace(/\n/g, "<br>")}</div>${p.note ? `<p class="tip">${g(p.note)}</p>` : ""}
          <div class="toolrow"><button class="primary small" id="pd">Je l'ai priée</button><button class="ghost" id="ps">Écouter</button><button class="ghost" id="pf">${fav ? "♥ Dans mes favorites" : "♡ Mes favorites"}</button><button class="ghost" id="pc">Copier</button><span class="fs"><button class="textbtn" id="pm" aria-label="Réduire">A−</button><button class="textbtn" id="pp" aria-label="Agrandir">A+</button></span></div>` : ""}</article></div>`, "#/", "wide");
    document.querySelectorAll("[data-t]").forEach(b => b.onclick = () => { stopSpeak(); tag = b.dataset.t; draw(); });
    document.querySelectorAll("[data-p]").forEach(b => b.onclick = () => { stopSpeak(); cur = b.dataset.p; draw(); });
    if (!L.length) return;
    $("#ps").onclick = () => { const on = speak(p.t + ". " + text); if (on === false) toast("Lecture arrêtée"); };
    $("#pf").onclick = () => { favP()[cur] ? delete S.favPrayers[cur] : (S.favPrayers[cur] = Date.now()); save(); draw(); };
    $("#pc").onclick = () => { navigator.clipboard?.writeText(p.t + "\n\n" + text); toast("Prière copiée"); };
    $("#pm").onclick = () => { S.psize = Math.max(.95, size - .1); save(); size = S.psize; draw(); };
    $("#pp").onclick = () => { S.psize = Math.min(2, size + .1); save(); size = S.psize; draw(); };
    $("#pd").onclick = () => { S.prayedIds = S.prayedIds || {}; const k = dkey(new Date()) + cur; S.stats.prayers = (S.stats.prayers || 0) + 1; S.prayedIds[cur] = Date.now(); if (!S.prayedDay) S.prayedDay = {}; if (!S.prayedDay[k]) { S.prayedDay[k] = 1; gain(1, "prière"); } else toast("Que cette prière porte du fruit"); save(); checkBadges(); };
  };
  draw();
};

// ---------- chapelet ----------
BADGES.push({ id: "chap5", t: "Cinq chapelets", d: "Tu as prié cinq chapelets en entier.", icon: "beads", test: S => (S.rosaries || 0) >= 5 });
VIEWS.chapelet = function (a) {
  const today = MYSTERE_PAR_JOUR[new Date().getDay()];
  if (a[0] === "prier" || a[0] === "guide") return rosaryPlayer(a[1] || today, a[2] === "reprendre");
  let key = S.rosary ? S.rosary.key : today, intent = S.rosary?.intent || "";
  const draw = () => {
    const m = MYSTERES[key], info = MYST_INFO[key];
    shell("Le chapelet", `
      <div class="split rosstart"><div class="visual">${A.chapelet({})}</div><div>
        <h2 class="whyh">À quoi sert le chapelet ?</h2>
        <p class="lead2">${g("Le chapelet est une prière pour méditer la vie de Jésus avec Marie. Marie a vécu chacun de ces moments de très près, depuis l'annonce de l'ange jusqu'à la croix et à la résurrection. En priant le chapelet, on regarde ces scènes à travers ses yeux, un peu comme on feuillette des photos de famille avec une mère qui les raconte.")}</p>
        <ul class="whylist"><li><b>Les mains et les lèvres s'occupent</b><span>Les perles occupent les mains. Les « Je vous salue Marie » se répètent doucement, comme un fond sonore ou un battement de cœur. Cela calme et laisse l'esprit libre.</span></li>
          <li><b>L'esprit médite une scène</b><span>À chaque dizaine, on pense à un mystère, c'est-à-dire une scène de la vie de Jésus. Il ne s'agit pas de réciter vite, mais de prendre le temps de regarder.</span></li>
          <li><b>Marie conduit vers Jésus</b><span>On ne prie pas Marie à la place de Dieu. On lui demande de prier avec nous et de nous mener vers son fils.</span></li>
          <li><b>Quatre séries, quatre moments de la vie de Jésus</b><span>Les mystères joyeux racontent son enfance, les lumineux sa vie publique, les douloureux sa passion, les glorieux sa résurrection.</span></li>
          <li><b>Combien de temps ?</b><span>Un chapelet complet dure environ vingt minutes. Tu peux aussi prier une seule dizaine, en cinq minutes.</span></li></ul>
        <p class="muted">Auréa te guide perle par perle et tu peux le prier quand tu veux.</p>
        ${S.rosary ? `<div class="resumebox"><b>Un chapelet est en cours</b><span>${esc(MYSTERES[S.rosary.key].t)}, étape ${S.rosary.i + 1} sur ${buildRosary(S.rosary.key, S.rosary.group).length}</span><a class="primary" href="#/chapelet/prier/${S.rosary.key}/reprendre">Reprendre</a></div>` : ""}
        <h4>Quel jour on prie quels mystères</h4><div class="weekstrip" role="group" aria-label="Mystères selon le jour de la semaine">${[["lundi", "joyeux"], ["mardi", "douloureux"], ["mercredi", "glorieux"], ["jeudi", "lumineux"], ["vendredi", "douloureux"], ["samedi", "joyeux"], ["dimanche", "glorieux"]].map(([d, k], i) => { const isToday = (new Date().getDay() + 6) % 7 === i; return `<button class="wd c-${k} ${key === k ? "sel" : ""} ${isToday ? "today" : ""}" data-k="${k}" aria-pressed="${key === k}"><b>${d}</b><span>${MYSTERES[k].t.replace("Mystères ", "")}</span>${isToday ? "<i>Aujourd'hui</i>" : ""}</button>`; }).join("")}</div>
        <p class="muted">${esc(m.t)}, qu'on prie le ${m.jours}. ${({ joyeux: "L'enfance de Jésus et les joies de Marie.", lumineux: "La vie publique de Jésus et la lumière qu'il apporte.", douloureux: "La passion de Jésus, de Gethsémani à la croix.", glorieux: "La résurrection de Jésus et ce qui suit." })[key]} Cinq scènes à regarder avec Marie.</p>
        <ol class="mlistrow">${m.l.map((x, i) => `<li><b>${esc(x)}</b><span>${esc(info[i][2])}</span></li>`).join("")}</ol>
        <h4>Pour qui, pour quoi ?</h4><div class="chips" id="intents">${ROSARY_INTENTIONS.map(i => `<button class="chipb ${intent === i ? "sel" : ""}" data-i="${esc(i)}">${esc(i)}</button>`).join("")}</div>
        <label class="field slim"><input id="ci" placeholder="Ou écris ton intention" value="${esc(intent)}"></label>
        <div class="optrow"><label class="check"><input type="checkbox" id="ov" ${S.vib !== false ? "checked" : ""}> Vibration à chaque perle</label><label class="check"><input type="checkbox" id="ow" ${S.wake !== false ? "checked" : ""}> Garder l'écran allumé</label><label class="check"><input type="checkbox" id="og" ${S.rosGroup ? "checked" : ""}> Dire les dix « Je vous salue Marie » d'un coup (une seule étape par dizaine)</label></div>
        <a class="primary" id="go" href="#/chapelet/prier/${key}">Commencer le chapelet</a>
        <p class="muted fine">${S.rosaries ? `Tu as prié ${S.rosaries} chapelet${S.rosaries > 1 ? "s" : ""} avec Auréa. ` : ""}Pas de chapelet sous la main ? Tu peux utiliser tes dix doigts, ou voir les <a href="#/ressources/chapelet">idées pour en choisir un</a>.</p></div></div>${rosInfoHtml()}`, "#/prier", "wide");
    document.querySelectorAll("[data-k]").forEach(b => b.onclick = () => { key = b.dataset.k; draw(); });
    document.querySelectorAll("[data-i]").forEach(b => b.onclick = () => { intent = b.dataset.i; draw(); });
    $("#ci").oninput = e => { intent = e.target.value; };
    $("#ov").onchange = e => { S.vib = e.target.checked; save(); }; $("#ow").onchange = e => { S.wake = e.target.checked; save(); }; $("#og").onchange = e => { S.rosGroup = e.target.checked; save(); };
    $("#go").onclick = () => { S.rosary = { key, i: 0, intent: intent.trim(), t: Date.now(), group: !!S.rosGroup }; save(); };
  };
  draw();
};

function rosaryPlayer(key, resume) {
  if (!MYSTERES[key]) key = MYSTERE_PAR_JOUR[new Date().getDay()];
  if (!resume || !S.rosary || S.rosary.key !== key) S.rosary = { key, i: 0, intent: S.rosary?.intent || "", t: Date.now(), group: !!S.rosGroup };
  const steps = buildRosary(key, S.rosary.group), geo = rosaryGeometry(); let i = Math.min(S.rosary.i, steps.length - 1);
  keepAwake();
  const beadsSvg = () => {
    const cs = steps[i], curSet = new Set(cs.bset || [cs.b]), cur = cs.b, past = new Set(steps.slice(0, i).flatMap(s => s.bset || [s.b]));
    const loop = `<circle cx="200" cy="118" r="96" fill="none" stroke="#d9cdb0" stroke-width="2"/><line x1="200" y1="214" x2="200" y2="378" stroke="#d9cdb0" stroke-width="2"/>`;
    const beads = geo.map((b, n) => {
      const R = b.k === "big" ? 10 : b.k === "medal" ? 12 : b.k === "cross" ? 0 : 6.5, state = curSet.has(n) ? "cur" : past.has(n) ? "past" : "";
      if (b.k === "cross") return `<g class="bd ${state}"><rect x="${b.x - 5}" y="${b.y - 24}" width="10" height="46" rx="2"/><rect x="${b.x - 16}" y="${b.y - 12}" width="32" height="10" rx="2"/></g>`;
      return `<circle class="bd ${state}" data-n="${n}" cx="${b.x.toFixed(1)}" cy="${b.y.toFixed(1)}" r="${n === cur || (curSet.has(n) && !cs.bset) ? R + 3 : R}"/>`;
    }).join("");
    return `<svg class="rosplay" viewBox="0 0 400 410" role="img" aria-label="Chapelet, perle ${i + 1} sur ${steps.length}">${loop}${beads}</svg>`;
  };
  const draw = () => {
    const s = steps[i], last = i === steps.length - 1, myst = s.myst, abbreviated = false;
    const text = s.x;
    S.rosary.i = i; save();
    app.innerHTML = `<div class="prayer-screen"><header class="pbar"><button class="textbtn" id="quit">‹ Quitter, je reprendrai plus tard</button><span>${esc(MYSTERES[key].t)}</span><span class="pcount">${i + 1} / ${steps.length}</span></header>
      <div class="pprog"><span style="width:${((i + 1) / steps.length) * 100}%"></span></div>
      <div class="pgrid"><div class="pbeads" id="pbeads">${beadsSvg()}</div>
      <div class="ptext"><small class="eyebrow">${esc(s.sub || "")}</small>
        ${s.kind === "myst" ? `<p class="mhelp">${g("Un mystère est une scène de la vie de Jésus ou de Marie. Tu y penses doucement pendant que tu dis les dix « Je vous salue Marie ». Ce n'est pas un devoir, c'est un thème qui guide ta prière.")}</p>` : ""}${myst ? `<div class="mystery"><small>${myst.n}e mystère de cette série</small><b>${esc(myst.t)}</b><p class="mline"><i>La scène</i>${esc(myst.med)}</p><p class="mline"><i>Pour quoi prier</i>${esc(myst.ask)}</p>${myst.link ? `<a href="#/lire/${myst.link.split(" ")[0]}/${myst.link.split(" ")[1]}" target="_blank" rel="noopener">Lire dans la Bible, ${esc(myst.ref)}</a>` : `<em>${esc(myst.ref)}</em>`}</div>` : ""}
        ${S.rosary.intent && i < 3 ? `<p class="intent">Intention, ${esc(S.rosary.intent)}</p>` : ""}
        <h2>${esc(s.t)}</h2>${s.count ? `<div class="bigcount"><b>${s.count}</b><span>sur 10</span></div>` : ""}${s.grp ? `<div class="bigcount"><b>${s.n}</b><span>fois, à la suite</span></div>` : ""}
        <div class="prayertext">${esc(text).replace(/\n/g, "<br>")}</div>
        ${s.id === "jvs" && !s.grp ? `<button class="ghost" id="all10">${s.tail ? "Valider les trois d'un coup" : "Valider les 10 d'un coup"}</button>` : ""}
        <div class="pctl"><button class="ghost" id="pv" ${i === 0 ? "disabled" : ""}>Précédent</button><button class="primary big" id="nx">${last ? "Terminer le chapelet" : "Perle suivante"}</button></div>
        <div class="toolrow"><button class="textbtn" id="sp">Écouter cette prière</button></div></div></div></div>`;
    $("#quit").onclick = () => go("#/chapelet");
    $("#nx").onclick = next; $("#pv").onclick = () => { if (i > 0) { i--; draw(); } };
    $("#pbeads").onclick = next;
    const a10 = $("#all10"); if (a10) a10.onclick = () => { let k = i; while (k < steps.length - 1 && steps[k].id === "jvs") k++; i = k; if (navigator.vibrate && S.vib !== false) navigator.vibrate([20, 40, 20]); draw(); };
    $("#sp").onclick = () => speak(s.t + ". " + s.x);
  };
  const next = () => {
    if (finished) return;
    if (navigator.vibrate && S.vib !== false) navigator.vibrate(18);
    stopSpeak();
    if (i >= steps.length - 1) return finish();
    i++; draw();
  };
  let finished = false;
  const finish = () => {
    if (finished) return; finished = true; document.removeEventListener("keydown", window.__rk);
    S.rosaries = (S.rosaries || 0) + 1; const intent = S.rosary.intent; S.rosary = null; save(); releaseLock(); gain(6, "chapelet"); markDone("chapelet"); checkBadges();
    app.innerHTML = `<div class="prayer-screen done"><div class="pend"><div class="sunmark rise"></div><h1>Chapelet terminé</h1><p class="lead2">Merci d'avoir pris ce temps. ${intent ? `Tu as prié ${esc(intent.toLowerCase())}.` : ""} C'est ton ${S.rosaries}${S.rosaries === 1 ? "er" : "e"} chapelet avec Auréa.</p>
      <div class="toolrow"><a class="primary" href="#/journal" id="jn">Écrire dans mon journal</a><a class="ghost" href="#/prier">Autres prières</a><a class="ghost" href="#/">Accueil</a></div></div></div>`;
    $("#jn").onclick = () => { S.draft = { text: "", tags: ["Prière"], title: "Mon chapelet" + (intent ? ", " + intent.toLowerCase() : "") }; save(); };
  };
  window.__rk = e => { if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return; if (e.key === " " || e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); next(); } else if (e.key === "ArrowLeft") { if (i > 0) { i--; draw(); } } else if (e.key === "Escape") go("#/chapelet"); };
  document.removeEventListener("keydown", window.__prevrk); window.__prevrk = window.__rk;
  document.addEventListener("keydown", window.__rk);
  draw();
}

// ---------- chemins de lecture de la Bible ----------
function activePath() { return S.pathActive ? CHEMINS.find(p => p.id === S.pathActive) : null; }
function cheminsHtml() {
  const row = p => {
    const total = p.id === "intro" || p.id === "marc" ? p.steps.length : 0, n = pathReadCount(p), all = pathTotalChapters(p);
    const act = S.pathActive === p.id;
    return `<article class="pathrow ${act ? "act" : ""}"><div><small class="eyebrow">${esc(p.tag)}${act ? " · en cours" : ""}</small><h3>${esc(p.t)}</h3><p>${esc(p.d)}</p><p class="muted">${n ? `${n} chapitre${n > 1 ? "s" : ""} lu${n > 1 ? "s" : ""} sur ${all}` : `${all} chapitre${all > 1 ? "s" : ""}`}</p></div>
      <div class="pathact"><button class="primary small" data-pstart="${p.id}">${n ? "Reprendre" : "Commencer"}</button><a class="textbtn" href="#/lire/chemin/${p.id}">Voir le plan</a></div><div class="bar"><i style="width:${all ? (n / all) * 100 : 0}%"></i></div></article>`;
  };
  return `<section class="sec"><h2 class="sech"><span>I</span>Choisis ta façon de lire</h2><div class="pathlist">${CHEMINS.map(row).join("")}</div></section>
    <section class="sec"><h2 class="sech"><span>II</span>Lecture libre</h2><p class="muted">Ouvre la Bible où tu veux, sans plan, sans ordre.</p>
      <div class="freebar"><button class="ghost" id="rnd">Ouvrir au hasard</button><button class="ghost" id="lastr">Reprendre ma dernière lecture</button></div>
      <form class="goto" id="sform"><label for="sq">Chercher un mot ou une phrase dans toute la Bible</label><div><input id="sq" placeholder="Par exemple, berger, pardon, lumière" autocomplete="off"><button class="primary" type="submit">Chercher</button></div></form><div id="sres" class="sres" aria-live="polite"></div></section>`;
}
function bindChemins() {
  document.querySelectorAll("[data-pstart]").forEach(b => b.onclick = () => { const p = CHEMINS.find(x => x.id === b.dataset.pstart); S.pathActive = p.id; save(); const [c, n] = pathFirstUnread(p); go(`#/lire/${c}/${n}`); });
  const rnd = $("#rnd"); if (rnd) rnd.onclick = () => { const all = []; BOOKS.forEach(b => { for (let c = 1; c <= b[4]; c++) all.push([b[0], c]); }); const [c, n] = all[Math.floor(Math.random() * all.length)]; S.pathActive = null; save(); go(`#/lire/${c}/${n}`); };
  const lr = $("#lastr"); if (lr) lr.onclick = () => { const r = lastReadRef(); r ? go(r.href) : toast("Tu n'as pas encore commencé à lire"); };
  const sf = $("#sform"); if (sf) sf.onsubmit = async e => { e.preventDefault(); const q = $("#sq").value.trim(); if (q.length < 3) return; const out = $("#sres"); out.innerHTML = `<p class="muted">Recherche en cours…</p>`; const res = await bibleSearch(q, (n, t) => { out.innerHTML = `<p class="muted">Recherche en cours, ${n} livres sur ${t}…</p>`; }); out.innerHTML = res.length ? `<p class="muted">${res.length >= 40 ? "Les 40 premiers résultats" : res.length + " résultat" + (res.length > 1 ? "s" : "")}</p><ul class="sresl">${res.map(r => `<li><a href="#/lire/${r.c}/${r.ch}/${r.v}"><b>${esc(BOOK[r.c].n)} ${r.ch}, ${r.v}</b><span>${esc(r.t)}</span></a></li>`).join("")}</ul>` : `<p class="muted">Aucun résultat. Essaie un autre mot.</p>`; };
}
async function bibleSearch(q, onProgress) {
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""), words = norm(q).split(/\s+/).filter(Boolean), out = [];
  let n = 0;
  for (const b of BOOKS) {
    let d; try { d = await loadBook(b[0]); } catch { continue; }
    d.forEach((verses, ci) => verses.forEach((t, vi) => { if (out.length < 40) { const nt = norm(t); if (words.every(w => nt.includes(w))) out.push({ c: b[0], ch: ci + 1, v: vi + 1, t }); } }));
    if (++n % 6 === 0 && onProgress) onProgress(n, BOOKS.length);
    if (out.length >= 40) break;
  }
  return out;
}
function pathBar(code, ch) {
  const p = activePath(); if (!p) return "";
  const i = pathIndexOf(p, code, ch); if (i < 0) return "";
  const nx = pathNext(p, code, ch), pv = pathPrev(p, code, ch), est = p.id === "ecriture" && DATES_ECRITURE[code];
  return `<div class="pathbar"><div><small class="eyebrow">${esc(p.t)}, étape ${i + 1} sur ${p.steps.length}</small>${est ? `<span class="muted">Écrit ${esc(est)}</span>` : ""}</div><div class="pb-actions">${pv ? `<a class="textbtn" href="#/lire/${pv[0]}/${pv[1]}">‹ Avant</a>` : ""}<a class="textbtn" href="#/lire/chemin/${p.id}">Le plan</a>${nx ? `<a class="more" href="#/lire/${nx[0]}/${nx[1]}">Suivant dans le chemin</a>` : ""}<button class="textbtn" id="pquit">Quitter ce chemin</button></div></div>`;
}
function pathNextBtn(code, ch) { const p = activePath(); if (!p) return ""; const nx = pathNext(p, code, ch); if (!nx) return p && pathIndexOf(p, code, ch) >= 0 ? `<p class="muted">Tu es arrivé au bout de ce chemin. Bravo !</p>` : ""; return `<a class="primary" href="#/lire/${nx[0]}/${nx[1]}">Chapitre suivant du chemin</a>`; }
document.addEventListener("click", e => { if (e.target && e.target.id === "pquit") { S.pathActive = null; save(); location.reload(); } });

const _lire = VIEWS.lire;
VIEWS.lire = function (a) {
  if (a && a[0] === "chemin") return cheminPage(a[1]);
  return _lire(a);
};
function cheminPage(id) {
  const p = CHEMINS.find(x => x.id === id) || CHEMINS[0];
  const groupedRows = p.steps.map((s, i) => { const n = Array.from({ length: s[2] - s[1] + 1 }, (_, k) => s[1] + k).filter(c => (S.read || {})[s[0] + " " + c]).length, tot = s[2] - s[1] + 1, b = BOOK[s[0]], est = p.id === "ecriture" && DATES_ECRITURE[s[0]];
    const label = tot === 1 ? `${b.n} ${s[1]}` : s[1] === 1 && s[2] === b.nch ? b.n : `${b.n} ${s[1]} à ${s[2]}`;
    return `<li class="${n === tot ? "done" : ""}"><a href="#/lire/${s[0]}/${p.id === "intro" || n === 0 ? s[1] : Math.min(s[2], s[1] + n)}" data-set="${p.id}"><span class="n">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(label)}${NOTES[s[0] + " " + s[1]] && tot === 1 ? " <i class='nt'>expliqué</i>" : ""}</span>${est ? `<span class="est">${esc(est)}</span>` : ""}<span class="dots"></span><span class="s">${n === tot ? "Lu" : n ? n + "/" + tot : ""}</span></a></li>`; }).join("");
  shell(p.t, `<p class="lead2">${esc(p.d)}</p>${p.warn ? `<p class="tip">Dates approximatives. Pour l'Ancien Testament, elles sont débattues entre spécialistes.</p>` : ""}<div class="tabs">${CHEMINS.map(c => `<a class="tab ${c.id === p.id ? "sel" : ""}" href="#/lire/chemin/${c.id}">${esc(c.t)}</a>`).join("")}</div>
    <div class="toolrow"><button class="primary small" id="pgo">${pathReadCount(p) ? "Reprendre ce chemin" : "Commencer ce chemin"}</button></div><ol class="toc plan2">${groupedRows}</ol>`, "#/lire", "wide");
  $("#pgo").onclick = () => { S.pathActive = p.id; save(); const [c, n] = pathFirstUnread(p); go(`#/lire/${c}/${n}`); };
  document.querySelectorAll("[data-set]").forEach(a => a.addEventListener("click", () => { S.pathActive = a.dataset.set; save(); }));
}

function rosInfoHtml() {
  const refs = [["luk", 1, 28, "L'ange Gabriel salue Marie. Ce sont les premiers mots du « Je vous salue Marie »."], ["luk", 1, 42, "Élisabeth lui répond « Tu es bénie entre toutes les femmes ». C'est la suite de la prière."], ["luk", 2, 19, "« Marie retenait tous ces événements et les méditait dans son cœur ». C'est la base du chapelet, regarder avec Marie."], ["luk", 2, 51, "Marie garde de nouveau toutes ces choses dans son cœur."], ["joh", 2, 5, "À Cana, Marie dit « Faites tout ce qu'il vous dira ». Elle conduit vers Jésus."], ["mat", 6, 9, "Jésus donne le Notre Père, qui ouvre chaque dizaine."], ["mat", 26, 44, "À Gethsémani, Jésus prie en répétant les mêmes paroles. Répéter une prière n'est donc pas inutile."], ["luk", 18, 1, "Jésus raconte une parabole pour montrer qu'il faut prier sans se décourager."]];
  return `<section class="rosinfo"><div><h3>D'où vient le chapelet ?</h3><ol class="rtime">
      <li><b>Les premiers siècles</b><span>Des moines comptent leurs prières avec des cailloux ou des cordelettes à nœuds.</span></li>
      <li><b>Le Moyen Âge</b><span>Beaucoup de gens ne savent pas lire les 150 psaumes. Ils disent à la place 150 « Je vous salue Marie ». On appelle cela le « psautier de Marie ».</span></li>
      <li><b>Une tradition</b><span>Selon la tradition, Marie aurait donné le chapelet à saint Dominique vers 1214. Les historiens pensent plutôt qu'il s'est formé peu à peu, du XIIe au XVe siècle.</span></li>
      <li><b>1569</b><span>Le pape Pie V fixe la forme du chapelet, avec quinze mystères. Le 7 octobre devient ensuite la fête de Notre-Dame du Rosaire.</span></li>
      <li><b>2002</b><span>Jean-Paul II ajoute cinq mystères, les mystères lumineux, sur la vie publique de Jésus.</span></li></ol></div>
    <div><h3>Qui nous demande de le prier ?</h3><p>Personne n'y est obligé. C'est une dévotion, c'est-à-dire un chemin de prière que l'Église recommande, sans l'imposer.</p>
      <p>Les papes le recommandent depuis des siècles. Selon Bernadette à Lourdes en 1858, puis les enfants de Fatima en 1917, Marie aurait invité à le prier. L'Église reconnaît que ces apparitions sont dignes de foi, mais elles ne font pas partie de ce que les catholiques doivent croire.</p>
      <p>Jésus n'a pas inventé le chapelet. Il a demandé de prier sans se décourager, et il a lui-même répété les mêmes paroles dans sa prière.</p></div>
    <div><h3>Dans la Bible</h3><ul class="refl">${refs.map(r => `<li><a href="#/lire/${r[0]}/${r[1]}/${r[2]}"><b>${esc(BOOK[r[0]].n)} ${r[1]}, ${r[2]}</b><span>${esc(r[3])}</span></a></li>`).join("")}</ul><p class="muted fine">La deuxième partie du « Je vous salue Marie » (« Sainte Marie, Mère de Dieu ») a été ajoutée par l'Église au fil des siècles.</p></div></section>`;
}
