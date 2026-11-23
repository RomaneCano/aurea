// Applique les corrections d'un rapport de vérification (JSON) quand la phrase "old" apparaît exactement une fois.
// Usage : node tools/apply-corrections.js rapport.json [--dry]
const fs = require("fs"), path = require("path");
const rep = JSON.parse(fs.readFileSync(process.argv[2], "utf8")), dry = process.argv.includes("--dry"), W = path.join(__dirname, "..", "web");
let ok = 0, skip = 0;
for (const c of rep.corrections || []) {
  const p = path.join(W, c.file); let t = fs.readFileSync(p, "utf8");
  const n = t.split(c.old).length - 1;
  if (n !== 1) { console.log(`IGNORÉ (${n} occurrences) ${c.file} ${c.where}`); skip++; continue; }
  if (/:|—|–/.test(c.new.replace(/https?:\/\/\S+/g, ""))) { console.log(`IGNORÉ (ponctuation interdite) ${c.file} ${c.where} :: ${c.new}`); skip++; continue; }
  console.log(`${dry ? "à appliquer" : "appliqué"} [${c.severity}] ${c.file} ${c.where}\n   - ${c.old}\n   + ${c.new}`);
  if (!dry) fs.writeFileSync(p, t.replace(c.old, () => c.new)); ok++;
}
console.log(`${ok} appliquées, ${skip} ignorées`);
