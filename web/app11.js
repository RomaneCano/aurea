// Comprendre pourquoi je crois, par profil de départ
RUBRIQUES.croyances = ["Comprendre pourquoi je crois", "ressources"];
MENU_PLUS.push(["croyances", "Pourquoi je crois"]);
VIEWS.croyances = function (a) {
  const D = DECONSTRUIRE, keys = Object.keys(D.profils), mine = keys.includes(S.bg) ? S.bg : keys[0];
  const prof = keys.includes(a[0]) ? a[0] : (a[0] === "chretien" ? "chretien" : mine);
  const P = D.profils[prof];
  const tabs = `<div class="tabsm" id="cp">${keys.map(k => `<a class="${k === prof ? "on" : ""}" href="#/croyances/${k}">${esc(D.profils[k].titre)}${k === mine ? " (pour toi)" : ""}</a>`).join("")}${D.foiChretienne ? `<a class="${prof === "chretien" ? "on" : ""}" href="#/croyances/chretien">Les origines du christianisme</a>` : ""}</div>`;
  const refs = r => (r && r.length) ? `<p class="crefs">${r.map(x => `<span><b>${esc(x.t)}</b>${x.n ? ", " + esc(x.n) : ""}</span>`).join("")}</p>` : "";
  const srcs = s => (s && s.length) ? `<p class="muted fine">Sources, ${s.map(esc).join(" ; ")}</p>` : "";
  let content;
  if (prof === "chretien") {
    const F = D.foiChretienne;
    content = `<p class="lead2 short">${g(F.intro || "")}</p><div class="cpts">${(F.points || []).map(p => `<article class="cfiche"><h3>${esc(p.t)}</h3><p>${g(p.x)}</p>${p.repond ? `<p class="crep"><b>Ce que répondent les croyants</b> ${g(p.repond)}</p>` : ""}${refs(p.refs)}${srcs(p.sources)}</article>`).join("")}</div>`;
  } else {
    const view = a[1] === "fondations" ? "fond" : "fiches", i = Math.max(0, Math.min((P.fiches || []).length - 1, +(a[2] || 0)));
    const sub = `<div class="tabsm" id="cs"><a class="${view === "fiches" ? "on" : ""}" href="#/croyances/${prof}">Mes questions</a>${P.fondations ? `<a class="${view === "fond" ? "on" : ""}" href="#/croyances/${prof}/fondations">Les origines ${({ musulman: "de l'islam", juif: "du judaïsme", athee: "de l'athéisme", bouddhiste: "du bouddhisme", esoterisme: "de l'ésotérisme", science: "de la démarche scientifique" })[prof] || ""}</a>` : ""}</div>`;
    if (view === "fond") {
      const F = P.fondations;
      content = `${sub}<p class="lead2 short">${g(F.intro || "")}</p><div class="cpts">${(F.points || []).map(p => `<article class="cfiche"><h3>${esc(p.t)}</h3><p>${g(p.x)}</p>${p.repond ? `<p class="crep"><b>Ce que répondent les croyants</b> ${g(p.repond)}</p>` : ""}${refs(p.refs)}${srcs(p.sources)}</article>`).join("")}</div>`;
    } else {
      const f = P.fiches[i];
      content = `${sub}<p class="lead2 short">${g(P.accroche || "")}</p><div class="cmd"><ul class="cq">${P.fiches.map((x, j) => `<li><a class="${j === i ? "sel" : ""}" href="#/croyances/${prof}/fiches/${j}">${esc(x.q)}</a></li>`).join("")}</ul>
        <article class="cfiche"><h3>${esc(f.q)}</h3><h4>Ce que croit ou dit l'autre tradition</h4><p>${g(f.autre)}</p><h4>Pourquoi les catholiques pensent autrement</h4><p>${g(f.raison)}</p>
        ${f.repond ? `<h4>Ce que répondent les croyants de cette tradition</h4><p>${g(f.repond)}</p>` : ""}${f.commun ? `<h4>Ce que l'Église reconnaît de bon</h4><p>${g(f.commun)}</p>` : ""}${f.debat ? `<p class="prud mp">${g(f.debat)}</p>` : ""}${refs(f.refs)}${srcs(f.sources)}</article></div>`;
    }
  }
  shell("Comprendre pourquoi je crois", `<p class="lead2">${g(D.intro)}</p>${tabs}${content}<p class="muted fine">Ce module explique la foi catholique, il ne juge pas les personnes. Chaque tradition a ses propres raisons et ses propres croyants sincères. Pour aller plus loin, pose tes questions à l'expert ou à un prêtre.</p>`, "#/ressources", "wide");
};
