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
