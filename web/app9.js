// Mes intentions : prières confiées, et celles qui ont été exaucées
RUBRIQUES.intentions = ["Mes intentions", "prier"];
MENU_PLUS.unshift(["intentions", "Mes intentions"]);
function addIntention(text, src) {
  S.intents = S.intents || [];
  const it = { id: "i" + Date.now() + Math.floor(Math.random() * 99), text: text.trim(), date: Date.now(), src: src || "", answered: null };
  if (!it.text) return null; S.intents.unshift(it); save(); if (typeof gain === "function") gain(4, "intention"); return it;
}
VIEWS.intentions = function (a) {
  const tab = a[0] === "exaucees" ? "exaucees" : "attente";
  const all = S.intents || [], wait = all.filter(i => !i.answered), done = all.filter(i => i.answered);
  const fd = t => new Date(t).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  const row = i => `<li class="int ${i.answered ? "ok" : ""}" data-id="${i.id}"><div><p class="itext">${esc(i.text)}</p>
    <small class="muted">Confiée le ${fd(i.date)}${i.src ? ", " + esc(i.src) : ""}</small>
    ${i.answered ? `<p class="ians"><b>Exaucée le ${fd(i.answered.date)}</b>${i.answered.note ? `<br>${esc(i.answered.note)}` : ""}</p>` : `<div class="iask" hidden><label>Comment as-tu vu la réponse ? Tu peux l'écrire, ou laisser vide.</label><textarea rows="2"></textarea><div class="toolrow"><button class="primary small isave">Enregistrer</button><button class="textbtn icancel">Annuler</button></div></div>`}</div>
    <div class="iact">${i.answered ? `<button class="textbtn iun">Remettre en attente</button>` : `<button class="ghost small iyes">Exaucée</button>`}<button class="textbtn idel" aria-label="Supprimer">Supprimer</button></div></li>`;
  const list = tab === "attente" ? wait : done;
  shell("Mes intentions", `<p class="lead2">Note ici ce que tu confies à Dieu. Reviens plus tard et marque ce qui a été exaucé, même autrement que prévu. Ces lignes restent sur ton appareil.</p>
    <form class="intform" id="intf"><label for="intt">Une nouvelle intention</label><div><textarea id="intt" rows="2" placeholder="Par exemple, pour la santé de ma grand-mère, pour trouver ma voie, pour une réconciliation"></textarea><button class="primary" type="submit">Confier</button></div></form>
    <div class="tabsm" id="it"><a class="${tab === "attente" ? "on" : ""}" href="#/intentions">En attente (${wait.length})</a><a class="${tab === "exaucees" ? "on" : ""}" href="#/intentions/exaucees">Exaucées (${done.length})</a></div>
    ${list.length ? `<ul class="intlist">${list.map(row).join("")}</ul>` : `<p class="muted">${tab === "attente" ? "Rien en attente pour l'instant." : "Pas encore d'intention exaucée. Quand tu en verras une, marque-la ici pour garder la mémoire de ce que tu as reçu."}</p>`}
    ${tab === "exaucees" && done.length ? `<p class="muted fine">Relire ces réponses aide à reconnaître les signes du Seigneur dans une vie ordinaire.</p>` : ""}`, "#/prier", "wide");
  $("#intf").onsubmit = e => { e.preventDefault(); if (addIntention($("#intt").value, "")) { toast("Intention confiée"); VIEWS.intentions(a); } };
  document.querySelectorAll(".int").forEach(li => {
    const it = (S.intents || []).find(x => x.id === li.dataset.id); if (!it) return;
    const q = s => li.querySelector(s);
    if (q(".iyes")) q(".iyes").onclick = () => { q(".iask").hidden = false; q(".iask textarea").focus(); };
    if (q(".icancel")) q(".icancel").onclick = () => { q(".iask").hidden = true; };
    if (q(".isave")) q(".isave").onclick = () => { it.answered = { date: Date.now(), note: q(".iask textarea").value.trim() }; save(); if (typeof gain === "function") gain(6, "exaucee"); toast("Merci, c'est noté"); VIEWS.intentions(a); };
    if (q(".iun")) q(".iun").onclick = () => { it.answered = null; save(); VIEWS.intentions(a); };
    q(".idel").onclick = () => { if (confirm("Supprimer cette intention ?")) { S.intents = S.intents.filter(x => x !== it); save(); VIEWS.intentions(a); } };
  });
};
// lien depuis la page Prier
new MutationObserver(() => {
  const h = document.querySelector(".page h1, .bandin h1"); if (!h || h.textContent !== "Prier" || document.getElementById("intlink")) return;
  const host = document.querySelector(".page"); if (!host) return;
  const p = document.createElement("p"); p.id = "intlink"; p.className = "intlink"; p.innerHTML = `<a class="primary small" href="#/intentions">Mes intentions et prières exaucées</a>`; host.insertBefore(p, host.firstChild);
}).observe(document.body, { childList: true, subtree: true });
