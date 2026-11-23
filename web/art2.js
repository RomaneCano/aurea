/* Auréa v3 : portraits, avatar, médailles, humeurs. */

// ---------- portraits des figures (visages sans traits, style icône moderne) ----------
const HAIR_BACK = {
  long: c => `<path d="M84 104 Q74 152 92 190 L106 150Z M156 104 Q166 152 148 190 L134 150Z" fill="${c}"/>`,
  veil: c => `<path d="M76 114 Q68 50 120 46 Q172 50 164 114 L178 196 Q120 172 62 196Z" fill="${c}"/>`,
  hood: c => `<path d="M72 118 Q66 48 120 44 Q174 48 168 118 L182 200 Q120 176 58 200Z" fill="${c}"/>`
};
const HAIR_FRONT = {
  short: c => `<path d="M86 102 Q84 62 120 62 Q156 62 154 102 Q144 82 120 82 Q96 82 86 102Z" fill="${c}"/>`,
  long: c => `<path d="M86 102 Q84 62 120 62 Q156 62 154 102 Q142 80 120 80 Q98 80 86 102Z" fill="${c}"/>`,
  veil: c => `<path d="M87 108 Q88 70 120 66 Q152 70 153 108 Q144 86 120 84 Q96 86 87 108Z" fill="${c}"/>`,
  hood: c => `<path d="M87 108 Q88 70 120 66 Q152 70 153 108 Q144 86 120 84 Q96 86 87 108Z" fill="${c}"/>`,
  bald: c => `<path d="M87 100 Q86 86 96 80 L95 102Z M153 100 Q154 86 144 80 L145 102Z" fill="${c}"/>`,
  tonsure: c => `<path d="M86 106 Q82 84 96 74 L98 102Z M154 106 Q158 84 144 74 L142 102Z" fill="${c}"/>`,
  curly: c => [[92, 72], [104, 64], [118, 61], [132, 64], [146, 72], [86, 86], [154, 86], [96, 80], [144, 80]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="${c}"/>`).join("")
};
const BEARD = c => `<path d="M90 110 Q92 152 120 158 Q148 152 150 110 Q138 130 120 130 Q102 130 90 110Z" fill="${c}"/>`;
const ATTR = {
  croixhalo: () => `<g stroke="#c8643c" stroke-width="9" stroke-linecap="round"><line x1="120" y1="52" x2="120" y2="72"/><line x1="72" y1="104" x2="86" y2="104"/><line x1="154" y1="104" x2="168" y2="104"/></g>`,
  etoiles: () => Array.from({ length: 7 }, (_, i) => { const a = Math.PI + (i / 6) * Math.PI; return star(120 + Math.cos(a) * 74, 104 + Math.sin(a) * 74, 8, 3.4, "#f5c25a"); }).join(""),
  lys: () => `<path d="M196 300 Q192 250 196 206" stroke="#6a9d86" stroke-width="5" fill="none"/><g fill="#fff"><ellipse cx="196" cy="198" rx="7" ry="16"/><ellipse cx="184" cy="206" rx="7" ry="15" transform="rotate(-35 184 206)"/><ellipse cx="208" cy="206" rx="7" ry="15" transform="rotate(35 208 206)"/></g><circle cx="196" cy="206" r="3" fill="#e8b04a"/>`,
  coquille: () => `<path d="M40 276 Q58 226 90 276Z" fill="#f2cf80" stroke="#c4902c" stroke-width="3"/><path d="M65 276 L65 238 M52 276 L56 244 M78 276 L74 244" stroke="#c4902c" stroke-width="2.5"/>`,
  cles: () => `<g stroke="#c4902c" stroke-width="6" stroke-linecap="round" fill="none"><line x1="168" y1="298" x2="198" y2="238"/><line x1="208" y1="298" x2="178" y2="238"/><circle cx="200" cy="232" r="9"/><circle cx="176" cy="232" r="9"/></g>`,
  livreepee: () => `<rect x="38" y="238" width="48" height="40" rx="4" fill="#a9573b"/><rect x="42" y="242" width="40" height="32" rx="2" fill="#f7eedc"/><g stroke="#8a8f99" stroke-width="5" stroke-linecap="round"><line x1="196" y1="296" x2="196" y2="214"/><line x1="182" y1="244" x2="210" y2="244"/></g>`,
  calice: () => `<path d="M168 240 Q168 266 190 266 Q212 266 212 240Z" fill="#e8b04a" stroke="#c4902c" stroke-width="3"/><rect x="186" y="266" width="8" height="14" fill="#c4902c"/><rect x="174" y="280" width="32" height="6" rx="3" fill="#c4902c"/>`,
  vase: () => `<ellipse cx="190" cy="262" rx="20" ry="22" fill="#f2e2c4" stroke="#c4902c" stroke-width="3"/><rect x="183" y="232" width="14" height="14" fill="#f2e2c4" stroke="#c4902c" stroke-width="3"/><rect x="180" y="226" width="20" height="7" rx="3" fill="#c4902c"/>`,
  arbre: () => `<rect x="40" y="236" width="10" height="56" fill="#8a6a40"/><circle cx="45" cy="232" r="26" fill="#6f9a6a"/><circle cx="62" cy="244" r="16" fill="#7fae7a"/>`,
  equerre: () => `<path d="M176 224 H192 V270 H226 V286 H176Z" fill="#c9803a" stroke="#8a5a20" stroke-width="3"/>`,
  etoiles3: () => [[72, 58], [120, 40], [168, 58]].map(([x, y]) => star(x, y, 11, 4.6, "#f5c25a")).join(""),
  tables: () => `<rect x="156" y="226" width="30" height="50" rx="14" fill="#e6dcc4" stroke="#8a8f99" stroke-width="3"/><rect x="190" y="230" width="30" height="50" rx="14" fill="#efe6d0" stroke="#8a8f99" stroke-width="3"/><g stroke="#8a8f99" stroke-width="2.5"><line x1="164" y1="242" x2="178" y2="242"/><line x1="164" y1="252" x2="178" y2="252"/><line x1="198" y1="246" x2="212" y2="246"/><line x1="198" y1="256" x2="212" y2="256"/></g>`,
  harpe: () => `<path d="M176 292 Q164 230 186 220 Q216 236 214 292Z" fill="#c4902c"/><g stroke="#fff" stroke-width="2"><line x1="184" y1="226" x2="178" y2="288"/><line x1="192" y1="230" x2="188" y2="288"/><line x1="200" y1="234" x2="198" y2="288"/><line x1="208" y1="240" x2="208" y2="288"/></g>`,
  coeurlivre: () => `<rect x="38" y="240" width="46" height="38" rx="4" fill="#5a4a7a"/><rect x="42" y="244" width="38" height="30" rx="2" fill="#f7eedc"/>${heart(196, 258, .9, "#c8483b")}<path d="M196 226 Q204 216 196 208 Q188 216 196 226Z" fill="#f5c25a"/>`,
  livre: () => `<rect x="168" y="240" width="52" height="42" rx="4" fill="#8a6a40"/><rect x="172" y="244" width="44" height="34" rx="2" fill="#f7eedc"/><line x1="194" y1="244" x2="194" y2="278" stroke="#cdb98f" stroke-width="2"/>`,
  oiseaux: () => [[56, 236], [186, 250], [70, 280]].map(([x, y]) => `<g transform="translate(${x} ${y})"><ellipse rx="12" ry="8" fill="#9aa4b0"/><circle cx="10" cy="-4" r="6" fill="#9aa4b0"/><path d="M16 -4 l8 2 l-8 2z" fill="#e8b04a"/><path d="M-4 -2 q-8 -12 -16 -6 q8 4 12 8z" fill="#7f8a98"/></g>`).join(""),
  soleilpoitrine: () => `<g transform="translate(120 238)">${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 6.283; return `<line x1="${Math.cos(a) * 14}" y1="${Math.sin(a) * 14}" x2="${Math.cos(a) * 24}" y2="${Math.sin(a) * 24}" stroke="#e8b04a" stroke-width="4" stroke-linecap="round"/>`; }).join("")}<circle r="11" fill="#f5c25a"/></g>`,
  banniere: () => `<line x1="190" y1="300" x2="190" y2="196" stroke="#8a6a40" stroke-width="5"/><path d="M190 198 H232 L222 214 L232 230 H190Z" fill="#fff" stroke="#c4902c" stroke-width="3"/>${crossShape(206, 202, 24, "#4f6fa0")}`,
  chapelet: () => `<g fill="#6f9cc4">${Array.from({ length: 14 }, (_, i) => { const a = Math.PI * (0.1 + i / 13 * 0.8); return `<circle cx="${120 + Math.cos(a) * 50}" cy="${222 + Math.sin(a) * 56}" r="4.5"/>`; }).join("")}</g>${crossShape(120, 282, 18, "#8a6a40")}`,
  roses: () => [[60, 262], [90, 276], [38, 280]].map(([x, y]) => `<g transform="translate(${x} ${y})"><circle r="11" fill="#e8847c"/><circle r="6.5" fill="#d9605a"/><circle r="2.6" fill="#b0453f"/></g>`).join("") + `<path d="M40 296 Q60 276 90 296" stroke="#6a9d86" stroke-width="3" fill="none"/>`,
  coeurcroix: () => `${heart(120, 236, .9, "#c8483b")}<rect x="117" y="222" width="6" height="22" fill="#fff"/><rect x="109" y="229" width="22" height="6" fill="#fff"/>`,
  mains: () => `<ellipse cx="120" cy="256" rx="22" ry="16" fill="#d9a984"/><ellipse cx="112" cy="250" rx="9" ry="18" transform="rotate(-18 112 250)" fill="#e2b896"/><ellipse cx="128" cy="250" rx="9" ry="18" transform="rotate(18 128 250)" fill="#e2b896"/>`,
  crosse: () => `<path d="M196 300 V214 Q196 188 216 190" stroke="#c4902c" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  ordi: () => `<rect x="92" y="242" width="56" height="36" rx="4" fill="#dfe5ec" stroke="#8a8f99" stroke-width="3"/><rect x="82" y="278" width="76" height="8" rx="4" fill="#b8c0cb"/><circle cx="120" cy="260" r="6" fill="#f5c25a"/>`
};
function portrait(f) {
  const v = f.v, id = "pt" + (++_id), veil = v.veil || v.mantle;
  const back = (HAIR_BACK[v.style] || (() => ""))(v.style === "hood" ? v.robe : v.style === "veil" ? veil : v.hair);
  const front = (HAIR_FRONT[v.style] || (() => ""))(v.style === "hood" ? v.robe : v.style === "veil" ? veil : v.hair);
  const hairTop = v.style === "veil" || v.style === "hood" ? `<path d="M90 98 Q92 84 120 82 Q148 84 150 98 Q140 90 120 90 Q100 90 90 98Z" fill="${v.hair}"/>` : "";
  return `<svg class="ill portrait" viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Portrait de ${esc(f.nom)}"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${v.bg[0]}"/><stop offset="1" stop-color="${v.bg[1]}"/></linearGradient></defs>
    <rect width="240" height="300" fill="url(#${id})"/>${rays(120, 104, 70, 112, 18, "#ffffff66")}
    <circle cx="120" cy="104" r="56" fill="#fff3c6" stroke="#e8b04a" stroke-width="4"/>${v.attr === "croixhalo" ? ATTR.croixhalo() : ""}
    ${back}
    <path d="M24 300 Q26 204 120 192 Q214 204 216 300Z" fill="${v.robe}"/>
    <path d="M24 300 Q28 208 94 194 L120 244 L146 194 Q212 208 216 300Z" fill="${v.mantle}"/>
    <rect x="106" y="150" width="28" height="46" rx="12" fill="${v.skin}"/>
    <ellipse cx="120" cy="104" rx="33" ry="39" fill="${v.skin}"/>
    ${hairTop}${front}${v.beard ? BEARD(v.beard) : ""}
    ${v.attr !== "croixhalo" ? (ATTR[v.attr] || (() => ""))() : ""}</svg>`;
}

// ---------- avatar ----------
const AVATAR_DEFAUT = { skin: 2, hairColor: 1, hair: "court", outfit: "pull", outfitColor: 0, acc: "aucun", bg: "aube" };
function avatarSvg(av = AVATAR_DEFAUT, opts = {}) {
  av = { ...AVATAR_DEFAUT, ...av };
  const skin = AV.skin[av.skin], hc = AV.hairColor[av.hairColor], oc = AV.outfitColor[av.outfitColor];
  const bg = (AV.bg.find(b => b[0] === av.bg) || AV.bg[0])[3], id = "av" + (++_id);
  const dark = oc === "#f1ece2" ? "#cfc6b2" : "rgba(0,0,0,.12)";
  const outfit = {
    pull: `<path d="M26 200 Q26 150 100 142 Q174 150 174 200Z" fill="${oc}"/><ellipse cx="100" cy="146" rx="22" ry="9" fill="${dark}"/>`,
    capuche: `<ellipse cx="100" cy="132" rx="46" ry="34" fill="${oc}"/><path d="M26 200 Q26 150 100 142 Q174 150 174 200Z" fill="${oc}"/><ellipse cx="100" cy="148" rx="24" ry="12" fill="${dark}"/><g stroke="#fff" stroke-width="3" stroke-linecap="round"><line x1="90" y1="156" x2="88" y2="176"/><line x1="110" y1="156" x2="112" y2="176"/></g>`,
    chemise: `<path d="M26 200 Q26 150 100 142 Q174 150 174 200Z" fill="${oc}"/><path d="M80 144 L100 168 L120 144 L110 142 L100 154 L90 142Z" fill="#fff"/><g fill="#fff"><circle cx="100" cy="176" r="2.6"/><circle cx="100" cy="188" r="2.6"/></g>`,
    manteau: `<path d="M18 200 Q18 148 100 140 Q182 148 182 200Z" fill="${oc}"/><path d="M82 142 L100 190 L118 142 L108 140 L100 158 L92 140Z" fill="${dark}"/><path d="M100 160 V200" stroke="${dark}" stroke-width="3"/>`
  }[av.outfit];
  const hairBack = { long: `<path d="M64 84 Q56 130 66 158 L82 124Z M136 84 Q144 130 134 158 L118 124Z" fill="${hc}"/>`, chignon: `<circle cx="100" cy="42" r="14" fill="${hc}"/>` }[av.hair] || "";
  const hairFront = {
    court: `<path d="M66 86 Q64 48 100 48 Q136 48 134 86 Q124 66 100 66 Q76 66 66 86Z" fill="${hc}"/>`,
    long: `<path d="M66 86 Q64 48 100 48 Q136 48 134 86 Q122 64 100 64 Q78 64 66 86Z" fill="${hc}"/>`,
    chignon: `<path d="M66 86 Q64 52 100 52 Q136 52 134 86 Q124 68 100 68 Q76 68 66 86Z" fill="${hc}"/>`,
    boucles: [[74, 62], [86, 54], [100, 50], [114, 54], [126, 62], [68, 76], [132, 76]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="12" fill="${hc}"/>`).join(""),
    rase: `<path d="M68 82 Q70 54 100 54 Q130 54 132 82 Q122 62 100 62 Q78 62 68 82Z" fill="${hc}" opacity=".55"/>`
  }[av.hair];
  const acc = {
    lunettes: `<g fill="none" stroke="#2b2b3a" stroke-width="2.6"><circle cx="86" cy="90" r="10"/><circle cx="114" cy="90" r="10"/><line x1="96" y1="90" x2="104" y2="90"/></g>`,
    echarpe: `<path d="M72 138 Q100 156 128 138 L132 154 Q100 172 68 154Z" fill="#d9784a"/><path d="M116 150 L128 188 L112 186Z" fill="#c4602f"/>`,
    croix: `<line x1="90" y1="146" x2="100" y2="166" stroke="#c4902c" stroke-width="2"/><line x1="110" y1="146" x2="100" y2="166" stroke="#c4902c" stroke-width="2"/>${crossShape(100, 164, 20, "#e8b04a")}`,
    coquille: `<line x1="90" y1="146" x2="100" y2="164" stroke="#c4902c" stroke-width="2"/><line x1="110" y1="146" x2="100" y2="164" stroke="#c4902c" stroke-width="2"/><path d="M88 188 Q100 160 112 188Z" fill="#f2cf80" stroke="#c4902c" stroke-width="2"/>`,
    halo: `<ellipse cx="100" cy="38" rx="34" ry="9" fill="none" stroke="#f5c25a" stroke-width="5"/>`
  }[av.acc] || "";
  const star = av.bg === "nuit" ? [[30, 30], [168, 24], [150, 60], [40, 70], [176, 100]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join("") : av.bg === "vitrail" ? `<path d="M0 0 L100 100 L200 0 M0 200 L100 100 L200 200 M0 100 H200 M100 0 V200" stroke="#fff" stroke-opacity=".5" stroke-width="3"/>` : "";
  const ring = opts.ring != null ? `<circle cx="100" cy="100" r="96" fill="none" stroke="#e8e0d0" stroke-width="6"/><circle cx="100" cy="100" r="96" fill="none" stroke="#e8b04a" stroke-width="6" stroke-linecap="round" stroke-dasharray="${(opts.ring * 603).toFixed(0)} 603" transform="rotate(-90 100 100)"/>` : "";
  return `<svg class="avatar ${opts.cls || ""}" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ton avatar"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient><clipPath id="c${id}"><circle cx="100" cy="100" r="90"/></clipPath></defs>
    <g clip-path="url(#c${id})"><rect width="200" height="200" fill="url(#${id})"/>${star}${hairBack}${outfit}<rect x="88" y="112" width="24" height="34" rx="10" fill="${skin}"/><ellipse cx="100" cy="86" rx="34" ry="38" fill="${skin}"/>${hairFront}
    <circle cx="87" cy="92" r="3.2" fill="#2b2b3a"/><circle cx="113" cy="92" r="3.2" fill="#2b2b3a"/><path d="M89 106 Q100 116 111 106" fill="none" stroke="#2b2b3a" stroke-width="3" stroke-linecap="round"/><circle cx="78" cy="102" r="5" fill="#e8847c" opacity=".35"/><circle cx="122" cy="102" r="5" fill="#e8847c" opacity=".35"/>${acc}</g>${ring}</svg>`;
}

// ---------- médailles ----------
function medal(icon, locked) {
  const c = locked ? "#c9c9c4" : "#e8b04a", d = locked ? "#a9a9a4" : "#c4902c", f = locked ? "#efefea" : "#fff6dc", ic = locked ? "#b8b8b2" : "#c4602f";
  const glyph = {
    sun: `<circle cx="50" cy="50" r="10" fill="${ic}"/>${Array.from({ length: 8 }, (_, i) => { const a = i / 8 * 6.283; return `<line x1="${50 + Math.cos(a) * 16}" y1="${50 + Math.sin(a) * 16}" x2="${50 + Math.cos(a) * 23}" y2="${50 + Math.sin(a) * 23}" stroke="${ic}" stroke-width="4" stroke-linecap="round"/>`; }).join("")}`,
    book: `<path d="M30 62 L50 56 L70 62 V40 L50 34 L30 40Z" fill="${ic}"/><line x1="50" y1="34" x2="50" y2="56" stroke="${f}" stroke-width="2.5"/>`,
    candle: `<rect x="44" y="50" width="12" height="26" rx="3" fill="${ic}"/><path d="M50 30 Q58 42 50 50 Q42 42 50 30Z" fill="${ic}"/>`,
    question: `<text x="50" y="66" text-anchor="middle" font-family="Fraunces,serif" font-weight="600" font-size="44" fill="${ic}">?</text>`,
    steps: `<ellipse cx="42" cy="58" rx="7" ry="11" fill="${ic}" transform="rotate(-10 42 58)"/><ellipse cx="60" cy="44" rx="7" ry="11" fill="${ic}" transform="rotate(10 60 44)"/>`,
    star: star(50, 52, 24, 10, ic),
    pen: `<path d="M34 68 L38 56 L64 30 L72 38 L46 64Z" fill="${ic}"/>`,
    check: `<path d="M32 52 L45 65 L70 36" fill="none" stroke="${ic}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>`,
    people: `<circle cx="34" cy="48" r="8" fill="${ic}"/><circle cx="50" cy="42" r="9" fill="${ic}"/><circle cx="66" cy="48" r="8" fill="${ic}"/><path d="M24 70 Q34 56 44 70Z M40 72 Q50 54 60 72Z M56 70 Q66 56 76 70Z" fill="${ic}"/>`,
    beads: Array.from({ length: 9 }, (_, i) => { const a = i / 9 * 6.283; return `<circle cx="${50 + Math.cos(a) * 20}" cy="${50 + Math.sin(a) * 20}" r="4.5" fill="${ic}"/>`; }).join("")
  }[icon] || "";
  return `<svg class="medal" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="50" cy="50" r="46" fill="${c}"/><circle cx="50" cy="50" r="39" fill="${f}" stroke="${d}" stroke-width="3"/>${glyph}</svg>`;
}

// ---------- humeurs du journal ----------
function moodIcon(k) {
  const g = {
    soleil: `<circle cx="20" cy="20" r="8" fill="#f5c25a"/>${Array.from({ length: 8 }, (_, i) => { const a = i / 8 * 6.283; return `<line x1="${20 + Math.cos(a) * 12}" y1="${20 + Math.sin(a) * 12}" x2="${20 + Math.cos(a) * 17}" y2="${20 + Math.sin(a) * 17}" stroke="#f5c25a" stroke-width="3" stroke-linecap="round"/>`; }).join("")}`,
    calme: `<circle cx="15" cy="15" r="7" fill="#f5c25a"/><path d="M12 30 Q10 22 18 22 Q20 14 28 18 Q36 18 34 30Z" fill="#cfdfec"/>`,
    pluie: `<path d="M8 22 Q6 12 15 12 Q18 4 27 9 Q35 9 33 22Z" fill="#b5c7d8"/><g stroke="#6f9cc4" stroke-width="2.6" stroke-linecap="round"><line x1="13" y1="27" x2="11" y2="34"/><line x1="21" y1="27" x2="19" y2="34"/><line x1="29" y1="27" x2="27" y2="34"/></g>`,
    orage: `<path d="M8 20 Q6 10 15 10 Q18 2 27 7 Q35 7 33 20Z" fill="#9aa8b8"/><path d="M22 20 L16 29 H22 L18 37 L28 26 H22 L25 20Z" fill="#f5c25a"/>`,
    brume: `<g stroke="#b9c4cf" stroke-width="3.4" stroke-linecap="round"><line x1="6" y1="14" x2="30" y2="14"/><line x1="10" y1="22" x2="34" y2="22"/><line x1="6" y1="30" x2="28" y2="30"/></g>`,
    arc: `<g fill="none" stroke-width="3"><path d="M6 32 A14 14 0 0 1 34 32" stroke="#e8847c"/><path d="M10 32 A10 10 0 0 1 30 32" stroke="#f5c25a"/><path d="M14 32 A6 6 0 0 1 26 32" stroke="#6f9cc4"/></g>`
  }[k] || "";
  return `<svg class="mood" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${g}</svg>`;
}
