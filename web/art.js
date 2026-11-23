/* Illustrations d'Auréa (SVG dessinés à la main, palette claire). */
const C = { rock: "#e6d6b6", rockD: "#cdb98f", gold: "#e8b04a", goldD: "#c4902c", terra: "#d9784a", sage: "#8dbba5", sageD: "#6a9d86",
  blue: "#6f9cc4", blueD: "#2c5b88", cream: "#fff8e8", rose: "#eab0a0", wood: "#a9814f", skin: "#f0c9a8", water: "#9fc3df" };
let _id = 0;
function frame(inner, a = "#d6e8f4", b = "#fdf0d2", vb = "0 0 400 300") {
  const id = "bg" + (++_id);
  const [, , w, h] = vb.split(" ");
  return `<svg class="ill" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="${w}" height="${h}" fill="url(#${id})"/>${inner}</svg>`;
}
const hills = (c1 = "#bcd9c9", c2 = "#9cc7b1") => `<path d="M0 230 Q90 180 190 215 T400 200 V300 H0Z" fill="${c1}"/><path d="M0 262 Q120 225 230 255 T400 240 V300 H0Z" fill="${c2}"/>`;
const sunDisc = (x, y, r, c = "#f5c25a") => `<circle cx="${x}" cy="${y}" r="${r + 16}" fill="${c}" opacity=".25"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
const rays = (x, y, r1, r2, n = 14, c = "#f2c76b") => Array.from({ length: n }, (_, i) => { const a = i / n * Math.PI * 2; return `<line x1="${x + Math.cos(a) * r1}" y1="${y + Math.sin(a) * r1}" x2="${x + Math.cos(a) * r2}" y2="${y + Math.sin(a) * r2}" stroke="${c}" stroke-width="5" stroke-linecap="round"/>`; }).join("");
const man = (x, y, c, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><circle cy="-34" r="9" fill="${C.skin}"/><path d="M-13 0 Q-13 -24 0 -24 Q13 -24 13 0Z" fill="${c}"/></g>`;
const crossShape = (x, y, h = 70, c = "#8a6a3a") => `<rect x="${x - 4}" y="${y}" width="8" height="${h}" rx="2" fill="${c}"/><rect x="${x - h * .28}" y="${y + h * .2}" width="${h * .56}" height="8" rx="2" fill="${c}"/>`;
const heart = (x, y, s = 1, c = "#d9784a") => `<path transform="translate(${x} ${y}) scale(${s})" d="M0 24 C-34 -2 -26 -28 -10 -28 C-3 -28 0 -22 0 -18 C0 -22 3 -28 10 -28 C26 -28 34 -2 0 24Z" fill="${c}"/>`;
const star = (x, y, R, r, c = "#f5c25a") => { const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, d = i % 2 ? r : R; p.push((x + Math.cos(a) * d).toFixed(1) + "," + (y + Math.sin(a) * d).toFixed(1)); } return `<polygon points="${p.join(" ")}" fill="${c}"/>`; };
const cliffs = `<path d="M0 150 H135 L122 300 H0Z" fill="${C.rock}"/><path d="M0 150 H135 L130 168 H0Z" fill="${C.sage}"/><path d="M265 150 H400 V300 H278Z" fill="${C.rock}"/><path d="M265 150 H400 V168 H270Z" fill="${C.sage}"/><path d="M122 262 Q200 236 278 262 V300 H122Z" fill="${C.water}"/>`;
const txt = (x, y, s, size = 16, fill = "#1f2a37", anchor = "middle", style = "") => `<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Fraunces,Georgia,serif" font-size="${size}" font-weight="600" fill="${fill}" ${style}>${s}</text>`;

const A = {
  dieu: () => frame(rays(200, 130, 64, 94) + sunDisc(200, 130, 52) + heart(200, 132, 1.1) + hills()),
  blessure: () => frame(`<g>${sunDisc(330, 60, 22)}</g>` + cliffs + `<rect x="135" y="196" width="46" height="9" rx="2" transform="rotate(-24 135 196)" fill="${C.wood}"/><rect x="210" y="226" width="40" height="9" rx="2" transform="rotate(30 210 226)" fill="${C.wood}"/>` + man(82, 150, C.blue) + man(322, 150, C.sage)),
  incarnation: () => frame(`<path d="M200 70 L150 232 H250Z" fill="#fbe6a8" opacity=".55"/>` + star(200, 52, 30, 13) + `<path d="M112 222 L200 160 L288 222Z" fill="${C.wood}"/><rect x="128" y="222" width="144" height="52" fill="#dcbb88"/><path d="M178 274 V236 Q200 222 222 236 V274Z" fill="#fff3c8"/><rect x="180" y="252" width="40" height="12" rx="3" fill="${C.wood}"/><circle cx="200" cy="246" r="7" fill="#fde7a0"/>` + hills("#cfe3cf", "#b2d4bf")),
  croix: () => frame(rays(200, 120, 58, 86, 16) + sunDisc(200, 120, 42, "#f7cf7a") + `<path d="M0 300 Q200 168 400 300Z" fill="${C.sage}"/><path d="M0 300 Q200 220 400 300Z" fill="#7fb49b"/>` + crossShape(200, 126, 82)),
  pont: () => frame(`${sunDisc(332, 62, 26)}` + cliffs + `<rect x="104" y="146" width="212" height="13" rx="3" fill="#8a6a3a"/><rect x="154" y="120" width="13" height="64" rx="3" fill="#8a6a3a"/>` + man(80, 150, C.blue) + man(210, 146, C.terra) + man(330, 150, C.sage) + txt(80, 188, "Nous", 15) + txt(330, 188, "Dieu", 15)),
  tombeau: () => frame(rays(200, 160, 70, 130, 18, "#f6d48a") + `<path d="M50 300 Q64 130 200 118 Q336 130 350 300Z" fill="${C.rock}"/><path d="M158 300 V204 Q158 166 200 166 Q242 166 242 204 V300Z" fill="#fff3c8"/><circle cx="290" cy="256" r="40" fill="#d6c6a4"/><circle cx="290" cy="256" r="40" fill="none" stroke="#c1ae86" stroke-width="3"/>` + hills("#cfe3cf", "#b2d4bf").replace('M0 230', 'M0 268').replace('M0 262', 'M0 285')),
  eglise: () => { const cols = [C.blue, C.terra, C.sage, C.gold, C.rose, C.blueD, C.sageD]; return frame(rays(200, 120, 58, 86, 16) + sunDisc(200, 120, 44) + cols.map((c, i) => { const t = i / 6, x = 56 + t * 288, y = 262 - Math.sin(t * Math.PI) * 42; return man(x, y, c, 1.35); }).join("") + hills("#cfe3cf", "#b2d4bf").replace('M0 230', 'M0 275').replace('M0 262', 'M0 290')); },
  priere: () => frame(`<circle cx="200" cy="120" r="76" fill="#fde7a0" opacity=".5"/><path d="M200 80 Q217 108 200 124 Q183 108 200 80Z" fill="${C.gold}"/><rect x="189" y="126" width="22" height="78" rx="4" fill="${C.cream}" stroke="#e3d5b3"/>` + `<path d="M100 252 L200 230 L300 252 L300 276 L200 254 L100 276Z" fill="${C.terra}"/><path d="M112 248 L200 228 L288 248 L288 262 L200 244 L112 262Z" fill="${C.cream}"/>`),
  livre: () => frame(rays(200, 118, 52, 80, 16) + sunDisc(200, 118, 34) + `<path d="M90 252 L200 222 L310 252 L310 280 L200 250 L90 280Z" fill="${C.blueD}"/><path d="M104 246 L200 218 L296 246 L296 266 L200 238 L104 266Z" fill="${C.cream}"/><line x1="200" y1="218" x2="200" y2="238" stroke="#e3d5b3" stroke-width="2"/>`),
  bibliotheque: () => {
    const a = Array.from({ length: 46 }, (_, i) => { const h = 46 + (i * 37 % 23), x = 16 + i * 8.2, c = ["#6f9cc4", "#8fb4d3", "#5b87b0"][i % 3]; return `<rect x="${x}" y="${128 - h}" width="6.2" height="${h}" rx="1.5" fill="${c}"/>`; }).join("");
    const b = Array.from({ length: 27 }, (_, i) => { const h = 50 + (i * 29 % 26), x = 24 + i * 13.4, c = ["#e8b04a", "#d9784a", "#eab0a0", "#c4902c"][i % 4]; return `<rect x="${x}" y="${252 - h}" width="10.4" height="${h}" rx="2" fill="${c}"/>`; }).join("");
    return frame(txt(200, 34, "Ancien Testament, 46 livres", 15, C.blueD) + a + `<rect x="8" y="128" width="384" height="8" rx="3" fill="${C.wood}"/>` + txt(200, 160, "Nouveau Testament, 27 livres", 15, "#86600f") + b + `<rect x="8" y="252" width="384" height="8" rx="3" fill="${C.wood}"/>`, "#e4eef6", "#fdf3da");
  },
  ordre: () => frame(`<line x1="40" y1="170" x2="360" y2="170" stroke="${C.goldD}" stroke-width="5" stroke-linecap="round"/>` + [[80, "Vers −1800", "Judaïsme", C.blue], [200, "Vers l'an 30", "Christianisme", C.gold], [320, "Vers 610", "Islam", C.sage]].map(([x, d, n, c]) => `<circle cx="${x}" cy="170" r="24" fill="${c}"/><circle cx="${x}" cy="170" r="9" fill="#fff"/>` + txt(x, 120, d, 16, "#586574") + txt(x, 226, n, 20)).join("") + txt(200, 60, "Dans l'ordre d'arrivée", 20, C.blueD), "#e4eef6", "#fdf3da"),
  auteurs: () => frame([["Matthieu", 30, 40], ["Marc", 210, 40], ["Luc", 30, 160], ["Jean", 210, 160]].map(([n, x, y], i) => `<rect x="${x}" y="${y}" width="160" height="100" rx="12" fill="${[C.blue, C.terra, C.sage, C.gold][i]}" opacity=".9"/><rect x="${x + 14}" y="${y + 18}" width="${60 + i * 8}" height="6" rx="3" fill="#fff" opacity=".8"/><rect x="${x + 14}" y="${y + 34}" width="100" height="6" rx="3" fill="#fff" opacity=".6"/><rect x="${x + 14}" y="${y + 50}" width="80" height="6" rx="3" fill="#fff" opacity=".6"/>` + txt(x + 80, y + 88, n, 18, "#fff")).join(""), "#e4eef6", "#fdf3da"),
  psaume: () => frame([[110, 190], [200, 150], [290, 200]].map(([x, y], i) => `<ellipse cx="${x}" cy="${y}" rx="22" ry="15" transform="rotate(-20 ${x} ${y})" fill="${[C.blue, C.terra, C.sage][i]}"/><rect x="${x + 17}" y="${y - 78}" width="6" height="80" rx="3" fill="${[C.blue, C.terra, C.sage][i]}"/><path d="M${x + 23} ${y - 78} Q${x + 52} ${y - 62} ${x + 36} ${y - 34}" fill="none" stroke="${[C.blue, C.terra, C.sage][i]}" stroke-width="6" stroke-linecap="round"/>`).join("") + hills("#e9efe0", "#d4e6d6")),
  marche: () => frame(`<rect x="60" y="200" width="90" height="70" fill="${C.sage}"/><rect x="150" y="160" width="90" height="110" fill="${C.blue}"/><rect x="240" y="110" width="100" height="160" fill="${C.gold}"/>` + txt(105, 245, "Marc", 20, "#fff") + txt(195, 235, "Luc", 20, "#fff") + txt(290, 220, "Jean", 20, "#fff") + man(90, 200, C.terra) + sunDisc(330, 62, 24)),
  quiz: () => frame(`<path d="M80 60 H320 Q340 60 340 80 V170 Q340 190 320 190 H190 L140 230 L150 190 H80 Q60 190 60 170 V80 Q60 60 80 60Z" fill="#fff" stroke="#e2d8c4" stroke-width="3"/>` + txt(200, 150, "?", 110, C.gold) + `<circle cx="90" cy="250" r="18" fill="${C.blue}"/><circle cx="200" cy="262" r="18" fill="${C.terra}"/><circle cx="310" cy="250" r="18" fill="${C.sage}"/>`),
  bati: () => frame(sunDisc(330, 64, 26) + `<rect x="130" y="130" width="140" height="120" fill="#f4e8cc"/><path d="M118 130 L200 78 L282 130Z" fill="${C.terra}"/><rect x="176" y="40" width="48" height="90" fill="#efe0bb"/><path d="M170 44 L200 12 L230 44Z" fill="${C.terra}"/>${crossShape(200, -8, 30)}<circle cx="200" cy="108" r="12" fill="${C.water}"/><path d="M178 250 V196 Q200 168 222 196 V250Z" fill="${C.wood}"/><circle cx="200" cy="72" r="10" fill="${C.water}"/>` + hills("#cfe3cf", "#b2d4bf")),
  eau: () => frame(`<path d="M200 50 C240 110 276 150 276 194 A76 76 0 0 1 124 194 C124 150 160 110 200 50Z" fill="${C.water}"/><path d="M168 168 Q150 190 160 214" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/><ellipse cx="200" cy="268" rx="120" ry="14" fill="${C.water}" opacity=".5"/><ellipse cx="200" cy="268" rx="76" ry="8" fill="${C.water}" opacity=".7"/>`),
  crayon: () => frame(`<ellipse cx="190" cy="170" rx="130" ry="84" fill="${C.rock}"/><circle cx="130" cy="140" r="18" fill="${C.terra}"/><circle cx="180" cy="120" r="18" fill="${C.gold}"/><circle cx="232" cy="130" r="18" fill="${C.sage}"/><circle cx="262" cy="180" r="18" fill="${C.blue}"/><circle cx="180" cy="200" r="22" fill="#fff8e8"/><g transform="rotate(35 300 110)"><rect x="288" y="30" width="26" height="150" fill="${C.gold}"/><path d="M288 180 H314 L301 210Z" fill="${C.skin}"/></g>`),
  chemin: () => frame(sunDisc(200, 80, 32) + hills("#cfe3cf", "#b2d4bf") + `<path d="M200 300 C100 260 320 230 210 190 C150 168 230 150 200 126" fill="none" stroke="${C.cream}" stroke-width="22" stroke-linecap="round"/><rect x="302" y="150" width="8" height="100" fill="${C.wood}"/><path d="M310 160 H350 L362 172 L350 184 H310Z" fill="${C.gold}"/><path d="M302 196 H270 L258 208 L270 220 H302Z" fill="${C.blue}"/>`),
  hero: (lvl = 0) => { const y = 250 - lvl * 120; return `<svg class="art" viewBox="0 0 1200 420" preserveAspectRatio="xMidYMax slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfe3f1"/><stop offset=".7" stop-color="#fdeccd"/><stop offset="1" stop-color="#fbd7b5"/></linearGradient></defs><rect width="1200" height="420" fill="url(#hb)"/>${rays(900, y, 90, 150, 20, "#f6d489")}<circle cx="900" cy="${y}" r="120" fill="#f9d98a" opacity=".35"/><circle cx="900" cy="${y}" r="70" fill="#f5c25a"/><path d="M0 330 Q200 250 420 310 T800 290 T1200 300 V420 H0Z" fill="#c3d8e6"/><path d="M0 370 Q260 300 520 350 T1200 330 V420 H0Z" fill="#a9cdbd"/><path d="M0 410 Q300 350 640 392 T1200 380 V420 H0Z" fill="#83b59f"/><path d="M640 420 C700 390 560 372 700 350 C780 336 820 330 880 322" fill="none" stroke="#fff8e8" stroke-width="16" stroke-linecap="round" opacity=".9"/></svg>`; },

  // le signe de croix, animé
  signe: () => `<svg class="ill signe" viewBox="0 0 300 320" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="300" height="320" fill="#e8f1f7"/><path d="M60 320 Q60 214 150 206 Q240 214 240 320Z" fill="${C.blue}"/><circle cx="150" cy="116" r="46" fill="${C.skin}"/><path d="M104 108 Q104 62 150 62 Q196 62 196 108 Q180 84 150 84 Q120 84 104 108Z" fill="#7a5a40"/><rect x="138" y="158" width="24" height="52" fill="${C.skin}"/>
    <line class="tr t1" x1="150" y1="70" x2="150" y2="238" stroke="${C.gold}" stroke-width="7" stroke-linecap="round" pathLength="1"/>
    <line class="tr t2" x1="212" y1="214" x2="88" y2="214" stroke="${C.gold}" stroke-width="7" stroke-linecap="round" pathLength="1"/>
    ${[[150, 70, 1], [150, 238, 2], [212, 214, 3], [88, 214, 4]].map(([x, y, n]) => `<circle cx="${x}" cy="${y}" r="15" fill="#fff" stroke="${C.goldD}" stroke-width="3"/>` + txt(x, y + 6, n, 17, C.goldD)).join("")}</svg>`,

  // plan d'une église, étape = zone mise en avant
  messe: (step = 0) => {
    const z = (id, shape) => `<g class="zone ${step === id ? "on" : ""}">${shape}</g>`;
    const benches = [0, 1, 2, 3, 4].map(i => `<rect x="${60}" y="${236 + i * 28}" width="90" height="16" rx="4" fill="#dcc9a0"/><rect x="${250}" y="${236 + i * 28}" width="90" height="16" rx="4" fill="#dcc9a0"/>`).join("");
    return `<svg class="ill plan" viewBox="0 0 400 420" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="400" height="420" fill="#f7efdc"/><rect x="30" y="20" width="340" height="380" rx="10" fill="#fff9ec" stroke="#cdb98f" stroke-width="5"/>
      ${z(3, `<rect x="90" y="40" width="220" height="110" rx="10" fill="#f3e2b4"/><rect x="170" y="70" width="60" height="34" rx="5" fill="#fff" stroke="#c4902c" stroke-width="3"/>` + txt(200, 128, "Autel", 14))}
      ${z(1, `<rect x="186" y="42" width="28" height="22" rx="4" fill="#e8b04a"/>` + txt(200, 38, "Tabernacle", 12) + `<circle cx="64" cy="372" r="16" fill="#9fc3df"/>` + txt(64, 404, "Eau bénite", 12))}
      ${z(2, `<rect x="104" y="160" width="40" height="30" rx="6" fill="#c8643c"/>` + txt(124, 205, "Lectures", 12))}
      ${z(0, benches + txt(105, 226, "Bancs", 13) + txt(295, 226, "Bancs", 13))}
      ${z(4, `<rect x="176" y="168" width="48" height="190" rx="8" fill="#e5efe8" opacity=".9"/>` + `<path d="M200 350 V190" stroke="#6a9d86" stroke-width="6" stroke-dasharray="3 10" stroke-linecap="round"/>` + txt(200, 270, "Allée", 12))}
      ${z(5, `<rect x="170" y="384" width="60" height="22" rx="4" fill="#fff" stroke="#c4902c" stroke-width="3"/>` + txt(200, 400, "Porte", 12))}
    </svg>`;
  },

  // chapelet : p = {part:'croix'|'queue'|'dizaine', k, phase}
  chapelet: (p = {}) => {
    const cx = 200, cy = 125, r = 100; const out = [];
    const on = (cond) => cond ? 'class="bead on"' : 'class="bead"';
    // boucle : 5 dizaines
    for (let k = 0; k < 5; k++) {
      const a0 = 90 + 72 * k;
      for (let j = 1; j <= 10; j++) { const a = (a0 + 72 * j / 11) * Math.PI / 180; out.push(`<circle ${on(p.part === "dizaine" && p.k === k && p.phase === "dix")} cx="${cx + r * Math.cos(a)}" cy="${cy + r * Math.sin(a)}" r="6.5"/>`); }
      if (k > 0) { const a = a0 * Math.PI / 180; out.push(`<circle ${on(p.part === "dizaine" && p.k === k && p.phase === "pere")} cx="${cx + r * Math.cos(a)}" cy="${cy + r * Math.sin(a)}" r="10"/>`); }
    }
    const ring = `<circle cx="${cx}" cy="${cy}" r="${r}" style="fill:none;stroke:#cdb98f;stroke-width:2.5"/>`;
    const tail = `<line x1="200" y1="225" x2="200" y2="330" stroke="#cdb98f" stroke-width="2.5"/><circle cx="200" cy="228" r="13" fill="#e8b04a" class="${p.part === "dizaine" && p.k === 0 && p.phase === "pere" ? "bead on" : ""}"/>` +
      `<circle ${on(p.part === "queue" && p.phase === 1)} cx="200" cy="252" r="10"/>` + [0, 1, 2].map(i => `<circle ${on(p.part === "queue" && p.phase === 2)} cx="200" cy="${272 + i * 15}" r="6.5"/>`).join("") + `<circle ${on(p.part === "queue" && p.phase === 3)} cx="200" cy="322" r="10"/>`;
    const cr = `<g class="${p.part === "croix" ? "bead on" : ""}"><rect x="193" y="338" width="14" height="50" rx="3" fill="#8a6a3a"/><rect x="178" y="350" width="44" height="12" rx="3" fill="#8a6a3a"/></g>`;
    return `<svg class="ill chap" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect width="400" height="400" fill="#eef4f8"/>${ring}${tail}${cr}${out.join("")}</svg>`;
  },

  // roue de l'année liturgique (année civile) : date du jour en repère
  annee: () => {
    const S = [["Avent", "11-29", "12-24", "#c9b8e4"], ["Noël", "12-25", "01-10", "#f6e0a0"], ["Temps ordinaire", "01-11", "02-09", "#b7d9bd"], ["Carême", "02-10", "03-27", "#c9b8e4"], ["Pâques", "03-28", "05-16", "#f6e0a0"], ["Temps ordinaire", "05-17", "11-28", "#b7d9bd"]];
    const doy = s => { const [m, d] = s.split("-").map(Number); return Math.floor((Date.UTC(2027, m - 1, d) - Date.UTC(2027, 0, 1)) / 864e5); };
    const ang = d => (d / 365) * 2 * Math.PI - Math.PI / 2;
    const arc = (a0, a1, r0, r1) => { const p = (a, r) => [200 + r * Math.cos(a), 200 + r * Math.sin(a)]; const [x0, y0] = p(a0, r1), [x1, y1] = p(a1, r1), [x2, y2] = p(a1, r0), [x3, y3] = p(a0, r0); const big = a1 - a0 > Math.PI ? 1 : 0; return `M${x0} ${y0} A${r1} ${r1} 0 ${big} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${big} 0 ${x3} ${y3}Z`; };
    const segs = [];
    // Avent commence en novembre et Noël chevauche la fin d'année : on découpe en deux morceaux pour l'année civile
    const parts = [["Noël", 0, doy("01-10") + 1, "#f6e0a0"], ["Temps ordinaire", doy("01-11"), doy("02-09") + 1, "#b7d9bd"], ["Carême", doy("02-10"), doy("03-27") + 1, "#c9b8e4"], ["Pâques", doy("03-28"), doy("05-16") + 1, "#f6e0a0"], ["Temps ordinaire", doy("05-17"), doy("11-28") + 1, "#b7d9bd"], ["Avent", doy("11-29"), doy("12-24") + 1, "#c9b8e4"], ["Noël", doy("12-25"), 365, "#f6e0a0"]];
    const lab = [["Noël", 0.02], ["Ordinaire", 0.14], ["Carême", 0.21], ["Pâques", 0.31], ["Ordinaire", 0.62], ["Avent", 0.95]];
    const now = new Date(), t0 = Math.floor((Date.UTC(2027, now.getMonth(), now.getDate()) - Date.UTC(2027, 0, 1)) / 864e5), am = ang(t0);
    const mx = 200 + 128 * Math.cos(am), my = 200 + 128 * Math.sin(am);
    return `<svg class="ill wheel" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Roue de l'année liturgique"><rect width="400" height="400" fill="#fbf7ef"/>${parts.map(([n, a, b, c]) => `<path d="${arc(ang(a), ang(b) - 0.004, 80, 150)}" fill="${c}"/>`).join("")}${lab.map(([n, f]) => { const a = ang(f * 365), x = 200 + 178 * Math.cos(a), y = 200 + 178 * Math.sin(a); return txt(x, y + 5, n, 14, "#586574"); }).join("")}${txt(200, 192, "L'année", 20)}${txt(200, 216, "de l'Église", 20)}<circle cx="${mx}" cy="${my}" r="11" fill="#d9784a" stroke="#fff" stroke-width="4"/>${txt(mx, my < 200 ? my - 20 : my + 32, "Aujourd'hui", 14, "#a24a22")}</svg>`;
  },

  // les sept sacrements (icônes simples)
  sac: (i) => {
    const w = (inner) => `<svg class="ico" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${inner}</svg>`;
    return [
      w(`<path d="M60 14 C78 40 92 56 92 74 A32 32 0 0 1 28 74 C28 56 42 40 60 14Z" fill="${C.water}"/><path d="M44 66 Q38 76 42 86" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>`),
      w(`<path d="M60 14 C82 40 90 56 82 78 C76 94 44 94 38 78 C30 56 40 40 60 14Z" fill="${C.terra}"/><path d="M60 46 C72 62 74 72 66 82 C60 88 50 86 48 78 C46 68 54 60 60 46Z" fill="${C.gold}"/>`),
      w(`<circle cx="60" cy="40" r="26" fill="#f6e7c0" stroke="${C.goldD}" stroke-width="3"/>${crossShape(60, 24, 32, C.goldD)}<path d="M30 80 H90 L80 106 H40Z" fill="${C.gold}"/>`),
      w(`${heart(60, 56, 1.7, C.terra)}<rect x="34" y="44" width="52" height="14" rx="7" transform="rotate(-30 60 50)" fill="#f6e7c0"/>`),
      w(`<path d="M60 14 C76 38 84 50 84 62 A24 24 0 0 1 36 62 C36 50 44 38 60 14Z" fill="#cfa84a"/><path d="M24 98 Q60 82 96 98" stroke="${C.sageD}" stroke-width="5" fill="none" stroke-linecap="round"/>`),
      w(`<path d="M42 16 H78 L84 108 H36Z" fill="#c9b8e4"/><rect x="36" y="22" width="48" height="8" fill="${C.gold}"/><rect x="36" y="92" width="48" height="8" fill="${C.gold}"/>`),
      w(`<circle cx="46" cy="62" r="26" fill="none" stroke="${C.gold}" stroke-width="9"/><circle cx="74" cy="62" r="26" fill="none" stroke="${C.goldD}" stroke-width="9"/>`)
    ][i];
  },

  // vignette de vidéo
  video: (n = 0) => frame(rays(200, 140, 70, 100, 14, "#f6d489") + sunDisc(200, 140, 56, "#f9d98a") + `<circle cx="200" cy="140" r="38" fill="#fff"/><polygon points="188,120 188,160 222,140" fill="${C.blueD}"/>` + hills(["#c3d8e6", "#cfe3cf", "#e6d6b6"][n % 3], ["#a9cdbd", "#9cc7b1", "#cdb98f"][n % 3]))
};
