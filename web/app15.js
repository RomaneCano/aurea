// Accessibilité : taille du texte, contraste, police lisible, espacement, lecture à voix haute, mouvement réduit, navigation au clavier
const A11Y_DEF = { zoom: 100, contrast: false, font: false, spacing: false, links: false, motion: false, tts: false };
const a11y = () => (S.a11y = Object.assign({}, A11Y_DEF, S.a11y || {}));
function a11yApply() {
  const a = a11y(), r = document.documentElement;
  r.style.setProperty("--zoom", a.zoom / 100); r.dataset.zoom = a.zoom;
  r.classList.toggle("a11y-contrast", !!a.contrast); r.classList.toggle("a11y-font", !!a.font); r.classList.toggle("a11y-spacing", !!a.spacing);
  r.classList.toggle("a11y-links", !!a.links); r.classList.toggle("a11y-nomotion", !!a.motion);
  if (window.gsap) { a.motion ? gsap.globalTimeline.pause() : gsap.globalTimeline.resume(); }
}
function announce(msg) {
  let el = document.getElementById("a11y-live"); if (!el) { el = document.createElement("div"); el.id = "a11y-live"; el.className = "sr-only"; el.setAttribute("aria-live", "polite"); el.setAttribute("role", "status"); document.body.appendChild(el); }
  el.textContent = ""; setTimeout(() => { el.textContent = msg; }, 60);
}
/* lecture à voix haute de la page */
const tts = { q: [], on: false };
function ttsStop() { tts.on = false; tts.q = []; if ("speechSynthesis" in window) speechSynthesis.cancel(); document.querySelectorAll(".ttsbtn").forEach(b => b.setAttribute("aria-pressed", "false")); }
function ttsRead(root) {
  if (!("speechSynthesis" in window)) return toast("La lecture audio n'est pas disponible sur cet appareil");
  if (tts.on) { ttsStop(); return; }
  const m = root || document.querySelector(".rchap") || document.querySelector(".storyside") || document.querySelector("main") || document.body;
  const parts = [...m.querySelectorAll("h1,h2,h3,h4,p,li,blockquote,figcaption")].map(e => e.innerText.replace(/\s+/g, " ").trim()).filter(t => t.length > 1);
  const h1 = document.querySelector("h1"); if (h1) parts.unshift(h1.innerText);
  tts.q = parts; tts.on = true; document.querySelectorAll(".ttsbtn").forEach(b => b.setAttribute("aria-pressed", "true"));
  const next = () => {
    if (!tts.on || !tts.q.length) { ttsStop(); return; }
    const u = new SpeechSynthesisUtterance(tts.q.shift()); u.lang = "fr-FR"; u.rate = 0.95;
    const v = speechSynthesis.getVoices().find(x => x.lang && x.lang.toLowerCase().startsWith("fr")); if (v) u.voice = v;
    u.onend = next; u.onerror = next; speechSynthesis.speak(u);
  };
  next();
}
function a11yDialog() {
  const a = a11y(); document.getElementById("a11y-dlg") && document.getElementById("a11y-dlg").remove();
  const d = document.createElement("div"); d.id = "a11y-dlg"; d.className = "a11ydlg"; d.setAttribute("role", "dialog"); d.setAttribute("aria-modal", "true"); d.setAttribute("aria-labelledby", "a11yt");
  const sw = (k, t, h) => `<label class="a11yrow"><span><b>${t}</b><small>${h}</small></span><input type="checkbox" data-k="${k}" ${a[k] ? "checked" : ""}></label>`;
  d.innerHTML = `<div class="a11ybox"><div class="a11yhead"><h2 id="a11yt">Accessibilité</h2><button class="textbtn" id="a11yx" aria-label="Fermer">Fermer</button></div>
    <div class="a11yrow"><span><b>Taille du texte</b><small>Agrandit tout le contenu</small></span><div class="zoomctl"><button id="zm" aria-label="Réduire le texte">A−</button><output id="zv" aria-live="polite">${a.zoom} %</output><button id="zp" aria-label="Agrandir le texte">A+</button></div></div>
    ${sw("contrast", "Contraste élevé", "Texte noir sur fond blanc, bordures marquées")}${sw("font", "Police très lisible", "Atkinson Hyperlegible, conçue pour la basse vision")}${sw("spacing", "Plus d'espace entre les lignes et les lettres", "Facilite la lecture")}
    ${sw("links", "Souligner tous les liens", "Les liens sont toujours reconnaissables")}${sw("motion", "Réduire les animations", "Arrête les mouvements et les défilements")}
    <div class="a11yrow"><span><b>Lecture à voix haute</b><small>Lit la page affichée avec la voix de ton appareil</small></span><button class="primary small ttsbtn" id="ttsgo" aria-pressed="${tts.on}">Écouter cette page</button></div>
    <p class="muted fine">Astuce clavier. Tab avance, Maj+Tab recule, Entrée valide, Échap ferme. Le lecteur d'écran (VoiceOver, NVDA, TalkBack) est pris en charge.</p>
    <div class="toolrow"><button class="ghost small" id="a11yreset">Tout remettre par défaut</button></div></div>`;
  document.body.appendChild(d);
  const close = () => { d.remove(); document.removeEventListener("keydown", esc2); const b = document.getElementById("a11ybtn"); b && b.focus(); };
  const esc2 = e => { if (e.key === "Escape") close(); if (e.key === "Tab") { const f = [...d.querySelectorAll("button,input")]; const i = f.indexOf(document.activeElement); if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); } else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); } } };
  document.addEventListener("keydown", esc2);
  d.onclick = e => { if (e.target === d) close(); };
  d.querySelector("#a11yx").onclick = close;
  const setZ = z => { a.zoom = Math.max(100, Math.min(200, z)); d.querySelector("#zv").textContent = a.zoom + " %"; save(); a11yApply(); };
  d.querySelector("#zm").onclick = () => setZ(a.zoom - 25); d.querySelector("#zp").onclick = () => setZ(a.zoom + 25);
  d.querySelectorAll("input[data-k]").forEach(i => i.onchange = () => { a[i.dataset.k] = i.checked; save(); a11yApply(); });
  d.querySelector("#ttsgo").onclick = () => { close(); setTimeout(() => ttsRead(), 100); };
  d.querySelector("#a11yreset").onclick = () => { S.a11y = Object.assign({}, A11Y_DEF); save(); a11yApply(); close(); toast("Réglages remis par défaut"); };
  d.querySelector("#a11yx").focus();
}
/* repères pour les lecteurs d'écran et le clavier */
function a11yDecorate() {
  if (!document.getElementById("skip")) { const s = document.createElement("a"); s.id = "skip"; s.className = "skip"; s.href = "#main"; s.textContent = "Aller au contenu"; s.onclick = e => { e.preventDefault(); const m = document.querySelector("main"); if (m) { m.setAttribute("tabindex", "-1"); m.focus(); } }; document.body.prepend(s); }
  const m = document.querySelector("main"); if (m && !m.id) { m.id = "main"; }
  document.querySelectorAll("svg:not([role]):not([aria-hidden])").forEach(s => { const lab = s.getAttribute("aria-label"); if (lab) s.setAttribute("role", "img"); else s.setAttribute("aria-hidden", "true"); });
  document.querySelectorAll("img:not([alt])").forEach(i => i.setAttribute("alt", ""));
  document.querySelectorAll("button:not([aria-label])").forEach(b => { if (!b.textContent.trim() && b.title) b.setAttribute("aria-label", b.title); });
  document.querySelectorAll(".toast:not([role])").forEach(t => { t.setAttribute("role", "status"); });
  const head = document.querySelector("#finder2"); if (head && !document.getElementById("a11ybtn")) {
    const b = document.createElement("button"); b.id = "a11ybtn"; b.className = "a11ybtn"; b.type = "button"; b.setAttribute("aria-haspopup", "dialog"); b.setAttribute("aria-label", "Accessibilité, taille du texte, contraste, lecture à voix haute"); b.title = "Accessibilité";
    b.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="4.5" r="1.8"/><path d="M5 8.5c4.5 1.4 9.5 1.4 14 0M12 8.5V14M12 14l-3.5 6M12 14l3.5 6"/></svg>`;
    b.onclick = a11yDialog; head.parentNode.insertBefore(b, head);
    const sp = document.createElement("button"); sp.id = "ttsbtn"; sp.className = "a11ybtn ttsbtn"; sp.type = "button"; sp.setAttribute("aria-pressed", tts.on ? "true" : "false"); sp.setAttribute("aria-label", "Écouter la page à voix haute"); sp.title = "Écouter la page (Alt+L)";
    sp.innerHTML = `<svg class="ico-on" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9zM16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>`;
    sp.onclick = () => ttsRead(); head.parentNode.insertBefore(sp, b);
  }
}
let a11yT = 0;
new MutationObserver(() => { clearTimeout(a11yT); a11yT = setTimeout(a11yDecorate, 80); }).observe(document.body, { childList: true, subtree: true });
window.addEventListener("hashchange", () => {
  ttsStop();
  setTimeout(() => { const h = document.querySelector("main h1, .bandin h1, h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); announce(h.textContent); } }, 250);
});
window.addEventListener("keydown", e => { if (e.altKey && e.key.toLowerCase() === "a") { e.preventDefault(); a11yDialog(); } if (e.altKey && e.key.toLowerCase() === "l") { e.preventDefault(); ttsRead(); } });
if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches && S.a11y == null) { S.a11y = Object.assign({}, A11Y_DEF, { motion: true }); }
a11yApply();
