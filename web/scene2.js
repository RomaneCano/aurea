/* Auréa : moteur de scènes v2.
   Une scène a des couches bien ordonnées (ciel, décor, sol, accessoires, personnages, météo),
   un sol commun où les personnages posent les pieds, une distribution (héros et figurants)
   et une chronologie GSAP (entrée, marche, geste, respiration, caméra lente). */

const FLOOR = {
  colline: ["#9cc7ad", "#b7d8c3"], mer: ["#e8d8ae", "#f1e6c4"], desert: ["#e6cd96", "#efdcae"], ville: ["#d9caa3", "#e6d9b8"], route: ["#d9caa3", "#e6d9b8"],
  foret: ["#86b592", "#9cc7a4"], montagne: ["#cfd5da", "#e2e7ea"], camp: ["#b9bcb0", "#cacdc2"], chateau: ["#b8c8a2", "#cbd8b6"],
  eglise: ["#d8c9a6", "#e6d9ba"], cellule: ["#cdbb94", "#dccca8"], hopital: ["#d6dde2", "#e6ecef"], grotte: ["#b6a37e", "#c9b793"]
};
const TIMELBL = { jour: "Le jour", soir: "Le soir", nuit: "La nuit", aube: "À l'aube" };
const GROUND_Y = 505;

/* personnage articulé, pieds en (0,0), hauteur environ 105 */
function charV2(v, cls = "") {
  const layered = ["veil", "hood", "long"].includes(v.style);
  const H = {
    short: `<path d="M-15 -80 Q-15 -98 0 -98 Q15 -98 15 -80 Q8 -88 0 -88 Q-8 -88 -15 -80Z" fill="${v.hair}"/>`,
    long: `<path d="M-17 -78 Q-19 -100 0 -100 Q19 -100 17 -78 L20 -46 L10 -66 L-10 -66 L-20 -46Z" fill="${v.hair}"/>`,
    curly: `<g fill="${v.hair}"><circle cx="-10" cy="-92" r="8"/><circle cx="0" cy="-97" r="8"/><circle cx="10" cy="-92" r="8"/></g>`,
    tonsure: `<path d="M-16 -76 Q-17 -88 -9 -90 L-8 -78Z M16 -76 Q17 -88 9 -90 L8 -78Z" fill="${v.hair}"/>`, bald: "",
    veil: `<path d="M-20 -72 Q-22 -104 0 -104 Q22 -104 20 -72 L26 -38 Q0 -52 -26 -38Z" fill="${v.veil || v.mantle}"/>`,
    hood: `<path d="M-22 -72 Q-24 -106 0 -106 Q24 -106 22 -72 L28 -38 Q0 -52 -28 -38Z" fill="${v.robe}"/>`
  }[v.style] || "";
  const back = layered ? H : "";
  const front = layered ? `<path d="M-14 -80 Q-12 -93 0 -93 Q12 -93 14 -80 Q7 -87 0 -87 Q-7 -87 -14 -80Z" fill="${v.style === "long" ? v.hair : v.style === "veil" ? (v.veil || v.mantle) : v.robe}"/>` : H;
  const arm = side => `<g transform="translate(${side * 24} -50)"><g class="arm${side < 0 ? "L" : "R"}" transform="rotate(${side * -5})"><path d="M${-7} 0 Q${-11} 20 ${-8} 36 L${8} 36 Q${11} 20 ${7} 0Z" fill="${v.mantle}" stroke="${v.robe}" stroke-width="1"/><circle cx="0" cy="38" r="6" fill="${v.skin}"/></g></g>`;
  return `<g class="${cls}"><ellipse cy="2" rx="36" ry="7" fill="#00000026"/>
    <g class="hwalk"><g class="hbody">
      <ellipse class="footL" cx="-11" cy="1" rx="9" ry="4.5" fill="#5a4636"/><ellipse class="footR" cx="11" cy="1" rx="9" ry="4.5" fill="#5a4636"/>
      <circle cx="0" cy="-80" r="25" fill="#fff3c6" stroke="#e8b04a" stroke-width="3"/>${back}
      <path d="M-30 0 Q-28 -52 0 -58 Q28 -52 30 0Q0 7 -30 0Z" fill="${v.robe}"/><path d="M-30 0 Q-30 -50 -8 -57 L0 -26 L8 -57 Q30 -50 30 0Q0 7 -30 0Z" fill="${v.mantle}"/>
      <rect x="-5" y="-66" width="10" height="12" rx="4" fill="${v.skin}"/><ellipse cx="0" cy="-78" rx="14" ry="16" fill="${v.skin}"/>${front}${v.beard ? `<path d="M-12 -74 Q-11 -58 0 -56 Q11 -58 12 -74 Q6 -66 0 -66 Q-6 -66 -12 -74Z" fill="${v.beard}"/>` : ""}
      ${arm(-1)}${arm(1)}
    </g></g></g>`;
}
const EXTRA_COLORS = [["#6a9d86", "#4f8068"], ["#a85a6a", "#8c4556"], ["#7a8fbf", "#5c72a5"], ["#c9a15a", "#a98440"], ["#8a6a50", "#6c5038"], ["#b98aa3", "#9c6d88"]];
const EXTRA_SKIN = ["#f0c9a8", "#e0b08c", "#c99672", "#f3d3b6"];

function sceneSvg(sc, fig, idx = 0) {
  const R = rng(hashStr(fig.id + "|" + idx + "|" + sc.f + "|" + sc.x.length)), id = "sc" + (++_id), t = SKY[sc.t] || SKY.jour, v = fig.v;
  const inside = ["eglise", "cellule", "hopital", "grotte"].includes(sc.f), fl = FLOOR[sc.f] || FLOOR.colline;
  const sunX = 380 + R() * 200, sunY = 64 + R() * 40;
  const sun = sc.t === "nuit" ? `<g class="moon"><circle cx="${sunX}" cy="${sunY}" r="30" fill="#fff6d8"/><circle cx="${sunX + 12}" cy="${sunY - 8}" r="26" fill="${t[0]}"/></g>` + FX.etoiles()
    : sc.t === "soir" ? `<circle cx="${sunX}" cy="${200 + R() * 30}" r="46" fill="#f5c25a" opacity=".9"/>` : sc.t === "aube" ? `<circle cx="${100 + R() * 160}" cy="214" r="46" fill="#f9d98a" opacity=".95"/>`
      : `<g class="sunrays" style="transform-origin:${sunX}px ${sunY}px">${rays(sunX, sunY, 44, 64, 14, "#f6d489")}</g><circle cx="${sunX}" cy="${sunY}" r="34" fill="#f5c25a"/>`;
  const nc = 1 + Math.floor(R() * 3);
  const clouds = Array.from({ length: nc }, (_, k) => `<g class="cloud" style="animation-duration:${55 + R() * 50}s;animation-delay:${-R() * 60}s"><ellipse cx="${60 + R() * 400}" cy="${50 + k * 34 + R() * 20}" rx="${40 + R() * 24}" ry="13" fill="#fff" opacity=".8"/><ellipse cx="${90 + R() * 400}" cy="${44 + k * 34 + R() * 20}" rx="28" ry="13" fill="#fff" opacity=".8"/></g>`).join("");
  const ps = (sc.p || "").split(" ").filter(Boolean);
  const fx = ps.filter(p => FX[p]).map(p => FX[p]()).join("");
  const back = (BACKS[sc.f] || BACKS.colline)(sc.t), deco = (DECO[sc.f] || (() => ""))(R);
  const camp = sc.f === "camp" ? `<rect width="640" height="360" fill="#d8dbe0" opacity=".55"/>` : "";

  // placement : le héros, des figurants, des accessoires à bonne distance
  const hx = 330 + R() * 300, dir = hx > 480 ? -1 : 1, hs = 1.8 + R() * .12;
  const nExtra = sc.f === "desert" || sc.f === "cellule" || sc.f === "grotte" || sc.f === "montagne" ? (R() < .4 ? 1 : 0) : ps.includes("pauvres") || ps.includes("soldats") || ps.includes("enfants") ? 3 : 1 + Math.floor(R() * 2);
  const extras = []; const taken = [hx];
  for (let k = 0; k < nExtra; k++) {
    let x, tries = 0; do { x = 110 + R() * 740; tries++; } while (taken.some(o => Math.abs(o - x) < 170) && tries < 30);
    taken.push(x); const far = k % 2 === 1, c = EXTRA_COLORS[Math.floor(R() * EXTRA_COLORS.length)], sk = EXTRA_SKIN[Math.floor(R() * EXTRA_SKIN.length)];
    extras.push({ x, y: far ? GROUND_Y - 14 : GROUND_Y - 2, s: far ? 1.2 : 1.45, dir: x > hx ? -1 : 1, v: { skin: sk, hair: ["#4a3426", "#2b2220", "#8a6a40"][Math.floor(R() * 3)], style: R() < .5 ? "short" : "long", robe: c[1], mantle: c[0], beard: null } });
  }
  const free = [150, 300, 480, 640, 780, 860].filter(x => taken.every(o => Math.abs(o - x) > 150));
  const slotX = i => (free[i % Math.max(1, free.length)] || 80 + 700 * R()) / 1.5;
  const props = ps.filter(p => PROPS[p]).map((p, i) => PROPS[p](slotX(i), 306 + (i % 2) * 8)).join("");
  extras.sort((a, b) => a.y - b.y);

  const floor = inside
    ? `<rect y="470" width="960" height="70" fill="${fl[0]}"/><rect y="470" width="960" height="4" fill="${fl[1]}"/>${[0, 1, 2, 3].map(k => `<line x1="0" x2="960" y1="${490 + k * 16}" y2="${490 + k * 16}" stroke="#00000010"/>`).join("")}`
    : `<path d="M0 476 Q240 462 480 474 T960 468 V540 H0Z" fill="${fl[0]}"/><path d="M0 476 Q240 462 480 474 T960 468" fill="none" stroke="${fl[1]}" stroke-width="6" stroke-linecap="round"/>`;
  const heroFrom = (dir === 1 ? -(hx + 140) : 960 - hx + 140) / (hs * dir);
  const heroG = `<g class="hero" transform="translate(${hx.toFixed(0)} ${GROUND_Y}) scale(${(hs * dir).toFixed(2)} ${hs.toFixed(2)})" data-from="${heroFrom.toFixed(0)}">${charV2(v, "hc")}</g>`;
  const extraG = extras.map(e => `<g class="extra" transform="translate(${e.x.toFixed(0)} ${e.y}) scale(${(e.s * e.dir).toFixed(2)} ${e.s.toFixed(2)})">${charV2(e.v, "xc")}</g>`).join("");
  const cap = `<div class="stagecap"><span>${TIMELBL[sc.t] || ""}</span><b>${esc(sc.lieu)}</b></div>`;
  return `<div class="stagebox"><svg class="scene" viewBox="0 0 960 540" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${esc(sc.lieu)}" data-gest="${ps.includes("pauvres") || ps.includes("pain") || ps.includes("pieces") ? "give" : ps.some(p => ["croix", "livre", "lampe", "bougie", "chapelet"].includes(p)) ? "pray" : R() < .5 ? "bless" : "point"}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${t[0]}"/><stop offset="1" stop-color="${t[1]}"/></linearGradient><clipPath id="c${id}"><rect width="960" height="540"/></clipPath></defs>
    <g clip-path="url(#c${id})"><rect width="960" height="540" fill="url(#${id})"/><g class="cam2"><g transform="scale(1.5)">${inside ? "" : sun + clouds}${back}${camp}</g>${floor}<g transform="scale(1.5)">${deco}${props}<g class="fxl">${fx}</g></g>${extraG}${heroG}<g transform="scale(1.5)">${weatherFx(sc, R, inside)}</g></g></g></svg>${cap}</div>`;
}

/* chronologie GSAP d'une scène */
function sceneStart(svg, fig, reduced) {
  if (window.__tl) { try { window.__tl.kill(); } catch (e) {} window.__tl = null; }
  if (!window.gsap || !svg) return null;
  const tl = gsap.timeline(), q = (el, s) => el.querySelector(s), hero = svg.querySelector(".hero");
  const tw = (obj, key, to, dur, pos, ease = "sine.inOut") => tl.to(obj, { [key]: to, duration: dur, ease, onUpdate: () => obj.el.setAttribute("transform", `rotate(${obj[key]})`) }, pos);
  const mk = (root, sel, a) => ({ el: q(root, sel), a });
  gsap.fromTo(svg.querySelector(".cam2"), { scale: 1, x: 0, y: 0, svgOrigin: "480 300" }, { scale: 1.07, x: (Math.random() < .5 ? -1 : 1) * 14, duration: 14, ease: "none" });
  const gesture = svg.dataset.gest;
  // héros
  const hw = q(hero, ".hwalk"), hb = q(hero, ".hbody"), fl = q(hero, ".footL"), fr = q(hero, ".footR");
  const L = mk(hero, ".armL", 5), Rr = mk(hero, ".armR", -5), from = +hero.dataset.from;
  const T = 2.5;
  tl.fromTo(hw, { x: from }, { x: 0, duration: T, ease: "power2.out" }, 0);
  tl.fromTo(hb, { y: 0 }, { y: -5, duration: .27, repeat: 8, yoyo: true, ease: "sine.inOut" }, 0).to(hb, { y: 0, duration: .2 }, T);
  tl.fromTo(fl, { y: 0, x: -11 }, { y: -4, x: -6, duration: .27, repeat: 8, yoyo: true }, 0).fromTo(fr, { y: -4, x: 6 }, { y: 0, x: 11, duration: .27, repeat: 8, yoyo: true }, 0);
  tl.to(L, { a: 22, duration: .27, repeat: 8, yoyo: true, onUpdate: () => L.el.setAttribute("transform", `rotate(${L.a})`) }, 0);
  tl.to(Rr, { a: -22, duration: .27, repeat: 8, yoyo: true, onUpdate: () => Rr.el.setAttribute("transform", `rotate(${Rr.a})`) }, 0);
  const g0 = T + .35;
  tl.set(L, { a: 5 }, T).set(Rr, { a: -5 }, T);
  if (gesture === "bless") { tw(Rr, "a", -125, .9, g0); tw(Rr, "a", -118, 1.1, g0 + .9, "sine.inOut"); tw(Rr, "a", -5, .9, g0 + 2.4); }
  else if (gesture === "point") { tw(Rr, "a", -80, .8, g0); tw(Rr, "a", -72, 1.4, g0 + .8); tw(Rr, "a", -5, .8, g0 + 2.6); }
  else if (gesture === "pray") { tw(L, "a", -38, .9, g0); tw(Rr, "a", 38, .9, g0); tl.to(hb, { rotation: 0, y: -3, duration: 1.2, yoyo: true, repeat: 1, ease: "sine.inOut" }, g0 + 1); }
  else { tw(Rr, "a", -62, .8, g0); tw(L, "a", 40, .8, g0); tw(Rr, "a", -5, .8, g0 + 2.4); tw(L, "a", 5, .8, g0 + 2.4); }  // donner, bras ouverts
  gsap.to(hb, { y: -2, duration: 1.7, yoyo: true, repeat: -1, ease: "sine.inOut", delay: T + .5 });
  // figurants
  svg.querySelectorAll(".extra").forEach((ex, i) => {
    const b = q(ex, ".hbody"), wk = q(ex, ".hwalk"), A = mk(ex, ".armR", -5);
    gsap.fromTo(wk, { x: (i % 2 ? 1 : -1) * 220 }, { x: 0, duration: 2.8 + i * .5, ease: "power2.out", delay: .3 + i * .2 });
    gsap.to(b, { y: -3, duration: 1.2 + i * .25, yoyo: true, repeat: -1, ease: "sine.inOut", delay: 1 + i * .3 });
    gsap.to(A, { a: -70, duration: .9, yoyo: true, repeat: -1, repeatDelay: 2.2 + i, ease: "sine.inOut", delay: 3.5 + i, onUpdate: () => A.el.setAttribute("transform", `rotate(${A.a})`) });
  });
  window.__tl = tl; window.__gs = gsap;
  if (reduced) { tl.progress(1); tl.pause(); gsap.globalTimeline.pause(); }
  return tl;
}

/* la vue des aventures utilise ce moteur */
storyView = function (fig) {
  const scenes = STORIES[fig.id]; let i = 0, auto = true; S.storiesSeen = S.storiesSeen || {};
  const dur = s => Math.max(7000, s.x.length * 62);
  const reduced = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const draw = () => {
    clearTimeout(window.__st); if (window.gsap) gsap.globalTimeline.clear();
    const s = scenes[i], last = i === scenes.length - 1, fav = !!favS()[fig.id];
    const all = FIGURES.filter(f => STORIES[f.id]), nxt = all[(all.findIndex(f => f.id === fig.id) + 1) % all.length];
    shell(`${fig.nom}, son aventure`, `<div class="storywrap">
      <div class="stage">${sceneSvg(s, fig, i)}</div>
      <div class="storyside"><small class="eyebrow">Scène ${i + 1} sur ${scenes.length}</small><p class="text fadein">${g(s.x)}</p>
        <div class="scontrols"><button class="textbtn" id="sp" ${i === 0 ? "disabled" : ""}>‹ Avant</button><button class="ghost" id="spp">${auto ? "Pause" : "Lecture"}</button><button class="${last ? "ghost" : "primary small"}" id="sn">${last ? "Rejouer" : "Suite ›"}</button></div>
        <div class="sprog">${scenes.map((_, k) => `<i class="${k < i ? "on" : ""} ${k === i ? "cur" : ""} ${k === i && auto ? "run" : ""}" style="--d:${dur(s)}ms"></i>`).join("")}</div>
        ${artAside(fig, i)}<div class="toolrow"><button class="ghost" id="fv">${fav ? "♥ Dans mes favoris" : "♡ Ajouter aux favoris"}</button><a class="ghost" href="#/figures/${fig.id}">Sa fiche</a><button class="ghost" id="gj">Écrire dans mon journal</button></div>
        <p class="muted">Saint suivant, <a href="#/figures/${nxt.id}/histoire">${esc(nxt.nom)}</a></p></div></div>`, `#/figures/${fig.id}`, "wide");
    sceneStart(document.querySelector(".stage svg.scene"), fig, reduced);
    if (last && !S.storiesSeen[fig.id]) { S.storiesSeen[fig.id] = Date.now(); save(); gain(3, "histoire"); }
    $("#sp").onclick = () => { i--; auto = false; draw(); };
    $("#sn").onclick = () => { if (last) { i = 0; auto = true; } else { i++; } draw(); };
    $("#spp").onclick = () => { auto = !auto; draw(); };
    $("#fv").onclick = () => { toggleFav(fig.id); draw(); };
    $("#gj").onclick = () => { S.draft = { text: `${s.lieu}\n`, tags: ["Pensée"], title: fig.nom }; save(); go("#/journal"); };
    if (auto && !last) window.__st = setTimeout(() => { i++; draw(); }, dur(s));
  };
  draw();
};
window.addEventListener("hashchange", () => { clearTimeout(window.__st); if (window.gsap && !/\/histoire$/.test(location.hash)) gsap.globalTimeline.clear(); });
