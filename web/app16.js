// Surligner un passage n'importe où pour demander une explication en contexte
const XP = { text: "", ctx: null, busy: false };
const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[’']/g, "'");
function xpContext(range) {
  const node = range.commonAncestorContainer.nodeType === 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
  const blk = node.closest("p,li,.text,.v,blockquote,article,section") || node;
  let h = ""; for (let e = blk; e && e !== document.body; e = e.parentElement) { const hh = e.querySelector && e.querySelector("h2,h3"); if (hh) { h = hh.textContent.trim(); break; } }
  const page = (document.querySelector("h1") || {}).textContent || document.title;
  const chap = document.querySelector(".rchap h2"); const who = document.querySelector(".gtitle h2, .gmain h2");
  return { page: page.trim(), section: (chap ? chap.textContent : who ? who.textContent : h).trim(), para: blk.innerText.replace(/\s+/g, " ").trim().slice(0, 1400), hash: location.hash };
}
function xpLocal(text) {
  const n = norm(text), out = [];
  Object.keys(GLOSSARY).forEach(k => { const lab = norm(GLOSSARY[k][0]); if (lab.length > 2 && new RegExp("(^|[^a-z])" + lab.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "s?($|[^a-z])").test(n)) out.push({ t: GLOSSARY[k][0], x: GLOSSARY[k][1] }); });
  (typeof AUTO !== "undefined" ? AUTO : []).forEach(([re, key]) => { try { if (GLOSSARY[key] && new RegExp("(^|[^a-zà-ÿ])(" + re + ")($|[^a-zà-ÿ])", "i").test(text) && !out.find(o => o.t === GLOSSARY[key][0])) out.push({ t: GLOSSARY[key][0], x: GLOSSARY[key][1] }); } catch (e) {} });
  const figs = FIGURES.filter(f => { const names = [f.nom, f.nom.split(" ")[0], f.nom.replace(/^(Saint|Sainte)\s/, "")].map(norm).filter(x => x.length > 3); return names.some(x => new RegExp("(^|[^a-z])" + x + "($|[^a-z])").test(n)); }).slice(0, 4);
  return { terms: out.slice(0, 5), figs };
}
function xpOpen(text, ctx) {
  XP.text = text; XP.ctx = ctx; closePanel(true);
  const L = xpLocal(text), key = norm(text).slice(0, 80) + "|" + ctx.hash; S.explains = S.explains || {};
  const p = document.createElement("aside"); p.id = "xp-panel"; p.className = "xppanel"; p.setAttribute("role", "dialog"); p.setAttribute("aria-label", "Explication du passage sélectionné");
  p.innerHTML = `<div class="xphead"><b>Expliquer ce passage</b><button class="textbtn" id="xpx" aria-label="Fermer">Fermer</button></div>
    <blockquote class="xpq">${esc(text.length > 260 ? text.slice(0, 260) + "…" : text)}</blockquote>
    ${L.figs.length ? `<h4>Qui est-ce ?</h4>${L.figs.map(f => `<div class="xpfig"><div class="cimg">${figImg(f, true)}</div><div><b>${esc(f.nom)}</b><small>${esc(f.role)}</small><p>${g(f.bio.split(". ").slice(0, 2).join(". "))}.</p><a class="textbtn" href="#/figures/${f.id}">Sa fiche ›</a></div></div>`).join("")}` : ""}
    ${L.terms.length ? `<h4>Mots à connaître</h4><dl class="xpterms">${L.terms.map(t => `<dt>${esc(t.t)}</dt><dd>${esc(t.x)}</dd>`).join("")}</dl>` : ""}
    <h4>Explication en contexte</h4><div id="xpai" aria-live="polite"></div>
    <div class="toolrow"><button class="ghost small" id="xpj">Garder dans mon journal</button><button class="ghost small ttsbtn" id="xpt" aria-pressed="false">Écouter</button></div>`;
  document.body.appendChild(p);
  p.querySelector("#xpx").onclick = () => closePanel();
  const box = p.querySelector("#xpai");
  const run = async () => {
    if (S.explains[key]) { box.innerHTML = fmtAnswer(S.explains[key]); return; }
    if (!S.apiKey) { box.innerHTML = `<p class="muted">Pour une explication adaptée à ce passage, ajoute ta clé dans <a href="#/faq/expert">Demander à l'expert</a>. Elle reste dans ton navigateur, et Auréa n'a pas besoin de compte. En attendant, les repères ci-dessus viennent de ce que l'app sait déjà.</p>`; return; }
    box.innerHTML = `<p class="muted">L'expert relit le passage dans son contexte…</p>`; let out = "";
    const prompt = `Un lecteur débutant a surligné ce passage dans l'application Auréa et ne comprend pas. Explique-le en 120 à 200 mots, très simplement.\nPassage surligné\n« ${text.slice(0, 900)} »\n\nContexte de la page\nPage ${ctx.page}${ctx.section ? ", section " + ctx.section : ""}\nParagraphe autour\n${ctx.para}\n\nConsignes. Commence par dire de qui ou de quoi on parle (par exemple qui sont l'ange et Marie dans cette scène, ce que veut dire un mot difficile), puis le sens de ce passage dans cette histoire, puis ce que la foi catholique en retient. Tiens compte du contexte pour ne pas confondre des personnages ou des moments. Si le passage est ambigu, dis-le. N'invente rien. N'utilise ni deux-points ni tiret cadratin. Termine par une question douce pour réfléchir.`;
    try { await claudeStream(EXPERT_SYSTEM, [{ role: "user", content: prompt }], t => { out += t; box.innerHTML = fmtAnswer(out); }); S.explains[key] = out; save(); S.stats.ask = (S.stats.ask || 0) + 1; save(); if (typeof checkBadges === "function") checkBadges(); bindGl && bindGl(); }
    catch (e) { box.innerHTML = `<p class="muted">${esc(e.message || "Je n'ai pas pu répondre.")}</p>`; }
  };
  run();
  p.querySelector("#xpj").onclick = () => { addJournal({ tags: ["Pensée"], title: "À comprendre", text: `« ${text} »\n\n${S.explains[key] || ""}` }); toast("Gardé dans ton journal"); };
  p.querySelector("#xpt").onclick = () => ttsRead(p);
  p.querySelector("#xpx").focus();
  document.addEventListener("keydown", xpEsc);
}
function xpEsc(e) { if (e.key === "Escape") closePanel(); }
function closePanel(silent) { const p = document.getElementById("xp-panel"); if (p) p.remove(); document.removeEventListener("keydown", xpEsc); if (!silent && typeof ttsStop === "function") ttsStop(); }
function xpPop() {
  const old = document.getElementById("xp-pop"); old && old.remove();
  const sel = window.getSelection(); if (!sel || sel.isCollapsed || !sel.rangeCount) return;
  const text = sel.toString().replace(/\s+/g, " ").trim(); if (text.length < 2 || text.length > 700) return;
  const r = sel.getRangeAt(0), a = r.commonAncestorContainer.nodeType === 1 ? r.commonAncestorContainer : r.commonAncestorContainer.parentElement;
  if (!a || !a.closest("main,.stagebox,.storyside,.rchap,.gmain") || a.closest("input,textarea,button,#xp-panel,.a11ydlg,.xppanel,nav,header")) return;
  const rect = r.getBoundingClientRect(); const b = document.createElement("button"); b.id = "xp-pop"; b.className = "xppop"; b.type = "button";
  b.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg> Expliquer`;
  b.style.left = Math.max(8, Math.min(innerWidth - 120, rect.left + rect.width / 2 - 50)) + "px"; b.style.top = Math.max(8, rect.bottom + 8) + "px";
  b.onmousedown = e => e.preventDefault();
  b.onclick = () => { const ctx = xpContext(r); b.remove(); xpOpen(text, ctx); sel.removeAllRanges(); };
  document.body.appendChild(b);
}
let xpT = 0;
document.addEventListener("selectionchange", () => { clearTimeout(xpT); xpT = setTimeout(xpPop, 220); });
document.addEventListener("scroll", () => { const o = document.getElementById("xp-pop"); o && o.remove(); }, { passive: true });
window.addEventListener("hashchange", () => closePanel());
window.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "e") { const s = window.getSelection(); if (s && !s.isCollapsed) { e.preventDefault(); xpOpen(s.toString().replace(/\s+/g, " ").trim(), xpContext(s.getRangeAt(0))); } } });
