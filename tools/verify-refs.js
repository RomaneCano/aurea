// Vérifie que chaque référence biblique citée dans les contenus existe dans le texte local de la Bible.
// Usage : node tools/verify-refs.js
const fs = require("fs"), path = require("path");
const W = path.join(__dirname, "..", "web");
global.window = global;
const load = (f, ret) => new Function("window", "document", "localStorage", "navigator", fs.readFileSync(path.join(W, f), "utf8") + `;return {${ret}}`)({}, {}, {}, {});
const { BOOKS, ABREV } = load("content3.js", "BOOKS,ABREV");
const bibles = {};
const bible = c => bibles[c] || (bibles[c] = JSON.parse(fs.readFileSync(path.join(W, "bible", c + ".json"), "utf8")));
const names = Object.keys(ABREV).filter(k => k.length >= 2).sort((a, b) => b.length - a.length).map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
const re = new RegExp("(?<![\\p{L}])((?:[123]\\s?)?(?:" + names.join("|") + "))\\.?\\s(\\d{1,3})(?:\\s?[,:]\\s?(\\d{1,3})(?:\\s?[-–]\\s?(\\d{1,3})(?:,\\s?(\\d{1,3}))?)?)?", "giu");
const files = fs.readdirSync(W).filter(f => /^(longs_.*|temps|miracles|deconstruire|testimonies|calendar)\.js$/.test(f));
let total = 0, bad = [];
for (const f of files) {
  const txt = fs.readFileSync(path.join(W, f), "utf8");
  let m; re.lastIndex = 0;
  while ((m = re.exec(txt))) {
    const name = m[1].toLowerCase().replace(/\s+/g, " "), code = ABREV[name] || ABREV[name.replace(/\s/g, "")];
    if (!code) continue;
    const ch = +m[2], v1 = m[3] ? +m[3] : null; let v2 = m[4] ? +m[4] : v1, ch2 = ch; if (m[5]) { ch2 = +m[4]; v2 = +m[5]; }
    // ignorer les faux positifs de prose (par exemple "Jean 3" ou "Marc 2" sans verset dans une phrase) uniquement si pas de virgule
    if (v1 == null && !/^[1-9]?\s?[A-Z]/.test(m[1]) ) continue;
    total++;
    const b = bible(code), chap = b[ch - 1];
    const ctx = txt.slice(Math.max(0, m.index - 40), m.index + m[0].length + 20).replace(/\s+/g, " ");
    if (!chap) { bad.push([f, m[0], `chapitre ${ch} absent (livre de ${b.length} chapitres)`, ctx]); continue; }
    if (v1 && v1 > chap.length) bad.push([f, m[0], `verset ${v1} absent (chapitre de ${chap.length} versets)`, ctx]);
    else if (ch2 !== ch) { const c2 = b[ch2 - 1]; if (!c2) bad.push([f, m[0], `chapitre ${ch2} absent`, ctx]); else if (v2 > c2.length) bad.push([f, m[0], `verset ${v2} absent (chapitre ${ch2} de ${c2.length} versets)`, ctx]); }
    else if (v2 && v2 > chap.length) bad.push([f, m[0], `verset ${v2} absent (chapitre de ${chap.length} versets)`, ctx]);
    else if (v1 && v2 && v2 < v1) bad.push([f, m[0], "intervalle inversé", ctx]);
  }
}
console.log(`${total} références contrôlées dans ${files.length} fichiers, ${bad.length} à vérifier`);
bad.forEach(b => console.log(`${b[0]} | ${b[1]} | ${b[2]} | ...${b[3]}...`));
