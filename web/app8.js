// Témoignages vidéo, classés selon le profil choisi au départ
RUBRIQUES.temoignages = ["Témoignages", "ressources"];
MENU_PLUS.push(["temoignages", "Témoignages"]);
const TEM_PROFILS = {
  decouverte: "Je découvre", revenant: "Je reviens vers Dieu", musulman: "Venu de l'islam", juif: "Venu du judaïsme", athee: "Athée ou agnostique",
  bouddhiste: "Venu du bouddhisme", esoterisme: "Ésotérisme, New Age", science: "Rationnel, scientifique"
};
VIEWS.temoignages = function (a) {
  const mine = TEM_PROFILS[S.bg] ? S.bg : "decouverte", cur = TEM_PROFILS[a[0]] ? a[0] : mine;
  const list = (TEMOIGNAGES[cur] || []);
  const card = v => `<article class="temo"><div class="temoplay" data-yt="${v.yt}" role="button" tabindex="0" aria-label="Lire la vidéo"><img src="https://i.ytimg.com/vi/${v.yt}/hqdefault.jpg" alt="" loading="lazy"><span class="pbtn">▶</span></div>
    <div class="temotxt"><small class="eyebrow">${esc(v.c)}</small><h3>${esc(v.t)}</h3><p>${esc(v.d)}</p><a class="textbtn" href="https://www.youtube.com/watch?v=${v.yt}" target="_blank" rel="noopener">Ouvrir sur YouTube</a></div></article>`;
  shell("Témoignages", `<p class="lead2">Des personnes racontent comment elles ont rencontré la foi catholique. Choisis un profil proche du tien. Chaque histoire est personnelle et ne prouve rien à elle seule, elle peut simplement t'aider à te reconnaître.</p>
    <div class="tabsm" id="tp">${Object.keys(TEM_PROFILS).map(k => `<a class="${k === cur ? "on" : ""}" href="#/temoignages/${k}">${TEM_PROFILS[k]}${k === mine ? " (pour toi)" : ""}</a>`).join("")}</div>
    <div class="temolist">${list.length ? list.map(card).join("") : `<p class="muted">Pas encore de vidéo pour ce profil.</p>`}</div>
    <p class="muted fine">Ces vidéos sont publiées par d'autres sur YouTube, Auréa n'en est pas l'auteur. Écoute-les avec recul avant de les partager. La vidéo ne se charge que si tu cliques dessus.</p>`, "#/ressources", "wide");
  document.querySelectorAll(".temoplay").forEach(d => { const go2 = () => { d.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${d.dataset.yt}?autoplay=1" title="Témoignage" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`; d.classList.add("on"); }; d.onclick = go2; d.onkeydown = e => { if (e.key === "Enter" || e.key === " ") go2(); }; });
};

// Miracles et signes
RUBRIQUES.miracles = ["Miracles et signes", "figures"];
function miraclesHtml(id) {
  const M = (typeof MIRACLES !== "undefined") && MIRACLES[id]; if (!M) return "";
  const items = (arr, cls) => arr.map(m => `<li class="${cls}"><b>${esc(m.t)}</b><p>${g(m.x)}</p>${m.s ? `<small class="muted">Source, ${esc(m.s)}</small>` : ""}</li>`).join("");
  return `<section class="miracles"><h3>Miracles et signes</h3>
    ${M.reconnus && M.reconnus.length ? `<h4>Reconnus par l'Église après enquête</h4><ul class="mlist">${items(M.reconnus, "rec")}</ul>` : ""}
    ${M.racontes && M.racontes.length ? `<h4>Racontés par la tradition</h4><ul class="mlist">${items(M.racontes, "tra")}</ul>` : ""}
    ${M.temoignage ? `<h4>Un témoignage</h4><ul class="mlist"><li class="tem"><b>${esc(M.temoignage.t)}</b><p>${g(M.temoignage.x)}</p>${M.temoignage.s ? `<small class="muted">Source, ${esc(M.temoignage.s)}</small>` : ""}</li></ul>` : ""}
    ${M.prudence ? `<p class="prud mp">${g(M.prudence)}</p>` : ""}
    <p><a class="textbtn" href="#/miracles">Comment l'Église examine un miracle</a></p></section>`;
}
{ const _d = detailHtml; detailHtml = function (f) { return _d(f) + miraclesHtml(f.id); }; }
VIEWS.miracles = function () {
  const G = MIRACLES_GUIDE, ids = FIGURES.filter(f => MIRACLES[f.id]);
  shell("Miracles et signes", `<p class="lead2">${g(G.intro)}</p>
    <div class="cols2m"><section><h3>Comment l'Église examine une guérison</h3><ol class="tipslist">${G.comment.map((c, i) => `<li><span>${g(c)}</span></li>`).join("")}</ol></section>
    <section><h3>Les questions que l'on se pose</h3>${G.questions.map(q => `<details class="mq"><summary>${esc(q.q)}</summary><p>${g(q.a)}</p></details>`).join("")}<p class="prud mp">${g(G.prudence)}</p></section></div>
    <h3>Des figures avec des miracles et des témoignages</h3><div class="mfigs">${ids.map(f => `<a href="#/figures/${f.id}">${esc(f.nom || f.n || f.id)}</a>`).join("")}</div>`, "#/figures", "wide");
};

// fiche d'une figure en onglets, pour limiter le défilement
function tabifyBody() {
  const body = document.querySelector(".gbody"); if (!body || body.dataset.tabs) return; body.dataset.tabs = "1";
  const secs = [...body.children], cls = s => s.className || "", h = s => (s.querySelector("h3") || {}).textContent || "";
  const groups = [["L'essentiel", s => /Son histoire$|important/.test(h(s))], ["Histoire détaillée", s => cls(s).includes("dfull")],
    ["Contexte et portée", s => /contexte|changé|établi/i.test(h(s))], ["Miracles", s => cls(s).includes("miracles")], ["Sources et études", s => /sources|étudier|À lire/.test(h(s))]];
  const used = groups.map(([n, f]) => [n, secs.filter(f)]).filter(([, a]) => a.length);
  if (used.length < 2) return;
  const rest = secs.filter(s => !used.some(([, a]) => a.includes(s))); if (rest.length) used[0][1].push(...rest);
  const nav = document.createElement("div"); nav.className = "gtabs";
  const panes = used.map(([n, a], i) => { const d = document.createElement("div"); d.className = "gpane"; d.hidden = i > 0; a.forEach(s => d.appendChild(s)); return d; });
  used.forEach(([n], i) => { const b = document.createElement("button"); b.textContent = n; b.className = i ? "" : "on"; b.onclick = () => { nav.querySelectorAll("button").forEach((x, j) => x.classList.toggle("on", j === i)); panes.forEach((p, j) => p.hidden = j !== i); }; nav.appendChild(b); });
  body.innerHTML = ""; body.appendChild(nav); panes.forEach(p => body.appendChild(p));
}
new MutationObserver(() => tabifyBody()).observe(document.body, { childList: true, subtree: true });
