// Bibliothèque de prières et données du chapelet.
// Les textes sont des prières traditionnelles ou composées pour Auréa. Les prières liturgiques officielles gardent leur formulation courante en France.

const PRAYER_TAGS = [["tout", "Toutes"], ["essentiel", "Les essentielles"], ["matin", "Matin"], ["soir", "Soir"], ["repas", "Repas"], ["marie", "Avec Marie"], ["esprit", "Esprit Saint"], ["confiance", "Confiance"], ["pardon", "Pardon"], ["defunts", "Défunts"]];
const PRAYERS = [
  { id: "signe", t: "Le signe de croix", tags: ["essentiel"], x: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.", note: "On touche le front, puis le ventre ou la poitrine, puis l'épaule gauche et l'épaule droite. On le fait au début et à la fin d'une prière." },
  { id: "notre", t: "Notre Père", tags: ["essentiel"], x: "Notre Père, qui es aux cieux,\nque ton nom soit sanctifié,\nque ton règne vienne,\nque ta volonté soit faite sur la terre comme au ciel.\nDonne-nous aujourd'hui notre pain de ce jour.\nPardonne-nous nos offenses,\ncomme nous pardonnons aussi à ceux qui nous ont offensés.\nEt ne nous laisse pas entrer en tentation,\nmais délivre-nous du Mal.\nAmen.", note: "C'est la prière que Jésus a lui-même enseignée à ses disciples (Matthieu 6, 9-13)." },
  { id: "jvs", t: "Je vous salue Marie", tags: ["essentiel", "marie"], x: "Je vous salue, Marie, pleine de grâce ;\nle Seigneur est avec vous.\nVous êtes bénie entre toutes les femmes\net Jésus, le fruit de vos entrailles, est béni.\nSainte Marie, Mère de Dieu,\npriez pour nous, pauvres pécheurs,\nmaintenant et à l'heure de notre mort.\nAmen.", note: "La première moitié reprend les paroles de l'ange Gabriel et d'Élisabeth (Luc 1)." },
  { id: "gloire", t: "Gloire au Père", tags: ["essentiel"], x: "Gloire au Père, et au Fils, et au Saint-Esprit,\ncomme il était au commencement, maintenant et toujours,\net pour les siècles des siècles.\nAmen." },
  { id: "credo", t: "Le Credo (symbole des apôtres)", tags: ["essentiel"], x: "Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre.\nEt en Jésus-Christ, son Fils unique, notre Seigneur,\nqui a été conçu du Saint-Esprit, est né de la Vierge Marie,\na souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli,\nest descendu aux enfers, le troisième jour est ressuscité des morts,\nest monté aux cieux, est assis à la droite de Dieu le Père tout-puissant,\nd'où il viendra juger les vivants et les morts.\nJe crois en l'Esprit Saint, à la sainte Église catholique,\nà la communion des saints, à la rémission des péchés,\nà la résurrection de la chair, à la vie éternelle.\nAmen.", note: "Il résume ce que les chrétiens croient. Credo veut dire « je crois »." },
  { id: "matin", t: "Prière du matin", tags: ["matin"], x: "Seigneur, merci pour cette nuit et pour ce nouveau jour.\nJe te confie tout ce que je vais vivre.\nAide-moi à aimer, à écouter et à servir.\nGarde ceux que j'aime.\nAmen.", note: "Une courte prière écrite pour Auréa. Tu peux la dire avec tes propres mots." },
  { id: "esprit", t: "Viens, Esprit Saint", tags: ["esprit", "matin"], x: "Viens, Esprit Saint, remplis le cœur de tes fidèles\net allume en eux le feu de ton amour.\nEnvoie ton Esprit et tout sera créé,\net tu renouvelleras la face de la terre.\nAmen.", note: "On la dit pour demander de la lumière avant d'étudier, de décider ou de prier." },
  { id: "doute", t: "Aide-moi à croire", tags: ["confiance", "essentiel"], x: "Seigneur, je ne sais pas encore bien qui tu es.\nSi tu es là, aide-moi à te reconnaître.\nOuvre mon cœur, éclaire mon esprit,\net garde-moi sur le chemin.\nAmen.", note: "Une prière pour ceux qui commencent ou qui doutent. Un homme de l'Évangile disait déjà « Je crois, viens au secours de mon manque de foi » (Marc 9, 24)." },
  { id: "angelus", t: "L'Angélus", tags: ["marie", "essentiel"], x: "L'ange du Seigneur apporta l'annonce à Marie.\nEt elle conçut du Saint-Esprit.\nJe vous salue, Marie…\n\nVoici la servante du Seigneur.\nQu'il me soit fait selon votre parole.\nJe vous salue, Marie…\n\nEt le Verbe s'est fait chair.\nEt il a habité parmi nous.\nJe vous salue, Marie…\n\nPriez pour nous, sainte Mère de Dieu.\nAfin que nous soyons rendus dignes des promesses du Christ.\n\nPrions. Que ta grâce, Seigneur notre Dieu, se répande en nos cœurs.\nPar le message de l'ange, tu nous as fait connaître l'incarnation de ton Fils bien-aimé.\nConduis-nous, par sa passion et par sa croix, jusqu'à la gloire de la résurrection.\nPar Jésus, le Christ, notre Seigneur. Amen.", note: "Elle se dit traditionnellement à 6 h, à midi et à 18 h, quand la cloche sonne." },
  { id: "memorare", t: "Souvenez-vous", tags: ["marie", "confiance"], x: "Souvenez-vous, ô très miséricordieuse Vierge Marie,\nqu'on n'a jamais entendu dire qu'aucun de ceux qui ont eu recours à votre protection,\nimploré votre assistance, réclamé votre secours, ait été abandonné.\nAnimé d'une pareille confiance, ô Vierge des vierges, ô ma Mère, je viens à vous,\net gémissant sous le poids de mes péchés, je me prosterne à vos pieds.\nÔ Mère du Verbe incarné, ne méprisez pas mes prières,\nmais écoutez-les favorablement et daignez les exaucer.\nAmen.", note: "Une très ancienne prière de confiance à Marie, appelée aussi le Memorare." },
  { id: "salve", t: "Salut, ô Reine", tags: ["marie"], x: "Salut, ô Reine, Mère de miséricorde,\nnotre vie, notre douceur et notre espérance, salut !\nEnfants d'Ève, exilés, nous crions vers toi.\nVers toi nous soupirons, gémissant et pleurant dans cette vallée de larmes.\nÔ toi, notre avocate, tourne vers nous ton regard miséricordieux.\nEt, après cet exil, montre-nous Jésus, le fruit béni de tes entrailles,\nô clémente, ô miséricordieuse, ô douce Vierge Marie.\nPrie pour nous, sainte Mère de Dieu,\nafin que nous devenions dignes des promesses du Christ.", note: "Le Salve Regina, qui conclut souvent le chapelet." },
  { id: "ange", t: "Ange gardien", tags: ["soir", "matin", "confiance"], x: "Ange de Dieu, qui es mon gardien,\net à qui la bonté divine m'a confié,\néclaire-moi, garde-moi, dirige-moi et gouverne-moi.\nAmen.", note: "Les catholiques croient que chacun est accompagné par un ange." },
  { id: "michel", t: "Saint Michel archange", tags: ["confiance"], x: "Saint Michel Archange, défendez-nous dans le combat.\nSoyez notre secours contre la malice et les embûches du démon.\nQue Dieu lui commande, nous vous en supplions,\net vous, prince de la milice céleste,\nrepoussez en enfer, par la vertu divine, Satan et les autres esprits mauvais\nqui rôdent dans le monde pour la perte des âmes.\nAmen.", note: "Une prière de protection, souvent dite dans les moments difficiles." },
  { id: "benedicite", t: "Avant le repas", tags: ["repas"], x: "Bénis-nous, Seigneur, bénis ce repas,\nceux qui l'ont préparé,\net procure du pain à ceux qui n'en ont pas.\nAmen.", note: "On la dit en famille ou seul, avant de manger." },
  { id: "graces", t: "Après le repas", tags: ["repas"], x: "Nous te rendons grâce, Seigneur,\npour tous tes bienfaits.\nAmen.", note: "Un simple merci à la fin du repas." },
  { id: "soir", t: "Prière du soir", tags: ["soir"], x: "Seigneur, la journée s'achève.\nMerci pour tout ce qui était beau.\nPardonne-moi ce qui n'a pas été juste.\nVeille sur ceux que j'aime\net donne-moi un sommeil paisible.\nAmen.", note: "Une courte prière écrite pour Auréa. Tu peux la compléter avec ta journée." },
  { id: "contrition", t: "Acte de contrition", tags: ["pardon"], x: "Mon Dieu, j'ai un très grand regret de t'avoir offensé,\nparce que tu es infiniment bon et que le péché te déplaît.\nJe prends la ferme résolution, avec le secours de ta sainte grâce,\nde ne plus t'offenser et de faire pénitence.\nAmen.", note: "Elle se dit pour demander pardon, par exemple avant la confession." },
  { id: "francois", t: "Prière pour la paix", tags: ["confiance", "pardon"], x: "Seigneur, fais de moi un instrument de ta paix.\nLà où est la haine, que je mette l'amour.\nLà où est l'offense, que je mette le pardon.\nLà où est la discorde, que je mette l'union.\nLà où est l'erreur, que je mette la vérité.\nLà où est le doute, que je mette la foi.\nLà où est le désespoir, que je mette l'espérance.\nLà où sont les ténèbres, que je mette ta lumière.\nLà où est la tristesse, que je mette la joie.\nÔ Seigneur, que je ne cherche pas tant à être consolé qu'à consoler,\nà être compris qu'à comprendre, à être aimé qu'à aimer.\nCar c'est en donnant qu'on reçoit,\nc'est en pardonnant qu'on est pardonné,\nc'est en mourant qu'on ressuscite à l'éternelle vie.\nAmen.", note: "On l'attribue à François d'Assise, mais elle date en fait du début du XXe siècle." },
  { id: "abandon", t: "Prière d'abandon", tags: ["confiance"], x: "Mon Père, je m'abandonne à toi,\nfais de moi ce qu'il te plaira.\nQuoi que tu fasses de moi, je te remercie.\nJe suis prêt à tout, j'accepte tout,\npourvu que ta volonté se fasse en moi,\nen toutes tes créatures.\nJe ne désire rien d'autre, mon Dieu.\nJe remets mon âme entre tes mains,\nje te la donne, mon Dieu, avec tout l'amour de mon cœur,\nparce que je t'aime,\net que ce m'est un besoin d'amour de me donner,\nde me remettre entre tes mains sans mesure,\navec une infinie confiance,\ncar tu es mon Père.", note: "Écrite par Charles de Foucauld, que tu as rencontré dans les figures de la foi." },
  { id: "defunts", t: "Pour les défunts", tags: ["defunts"], x: "Donne-leur, Seigneur, le repos éternel,\net que brille sur eux la lumière sans déclin.\nQu'ils reposent en paix.\nAmen.", note: "On la dit pour les personnes qui sont mortes, en particulier un proche." },
  { id: "magnificat", t: "Le Magnificat", tags: ["marie"], bible: ["luk", 1, 46, 55], x: "", note: "Le chant de joie de Marie, dans l'Évangile de Luc. Il est prié chaque soir par l'Église." }
];
const PSALMES_PRIER = [["psa", 23, "Le Seigneur est mon berger"], ["psa", 91, "Sous sa protection"], ["psa", 121, "Mon secours vient du Seigneur"], ["psa", 130, "Du fond de l'abîme"], ["psa", 139, "Tu me connais"], ["psa", 51, "Pitié pour moi"]];

// ---------- le chapelet ----------
const MYST_INFO = {
  joyeux: [
    ["luk 1", "Luc 1, 26-38", "L'ange Gabriel annonce à Marie qu'elle va devenir la mère de Jésus. Marie est surprise, puis elle répond « oui ».", "Demande la confiance, pour dire « oui » à ce que Dieu te propose, même quand tu ne comprends pas tout."],
    ["luk 1", "Luc 1, 39-56", "Marie, qui attend Jésus, part vite aider sa cousine Élisabeth, qui attend aussi un enfant. Les deux femmes se réjouissent ensemble.", "Demande de penser aux autres et de savoir les aider."],
    ["luk 2", "Luc 2, 1-20", "Jésus naît à Bethléem, dans une étable, parce qu'il n'y a plus de place à l'auberge. Dieu naît pauvre et petit, et les bergers viennent le voir.", "Demande la simplicité. Cela veut dire se contenter de peu et rester humble."],
    ["luk 2", "Luc 2, 22-38", "Quarante jours après sa naissance, Marie et Joseph portent Jésus au Temple pour le présenter à Dieu. Le vieux Siméon le reconnaît.", "Demande de savoir offrir à Dieu ce qui t'est précieux, et de lui confier tes proches."],
    ["luk 2", "Luc 2, 41-52", "À douze ans, Jésus reste au Temple sans prévenir. Ses parents le cherchent pendant trois jours avant de le retrouver.", "Demande de ne jamais cesser de chercher Dieu, et de le retrouver si tu l'as perdu de vue."]
  ],
  lumineux: [
    ["mat 3", "Matthieu 3, 13-17", "Jésus se fait baptiser dans le Jourdain. Le ciel s'ouvre et une voix dit « Tu es mon Fils bien-aimé ».", "Remercie pour ton baptême, ou demande le désir d'être baptisé."],
    ["joh 2", "Jean 2, 1-12", "Lors d'un mariage à Cana, le vin vient à manquer. Marie le dit à Jésus, qui change l'eau en vin.", "Confie à Marie ce qui manque dans ta vie ou chez tes proches. Elle le transmet à Jésus."],
    ["mar 1", "Marc 1, 14-15", "Jésus parcourt la Galilée et dit « Le Royaume de Dieu est tout proche, changez de vie et croyez à l'Évangile ».", "Demande de changer ce qui doit l'être en toi, avec confiance."],
    ["luk 9", "Luc 9, 28-36", "Sur une montagne, Jésus apparaît brillant de lumière devant trois amis. Ils comprennent qu'il est plus qu'un maître.", "Demande de voir plus clair dans ta vie et de rester proche de Jésus."],
    ["mat 26", "Matthieu 26, 26-29", "Le dernier soir, Jésus partage le pain et le vin avec ses amis et dit « Ceci est mon corps ». C'est l'origine de la messe.", "Remercie pour l'eucharistie et demande d'aimer la messe."]
  ],
  douloureux: [
    ["luk 22", "Luc 22, 39-46", "La veille de sa mort, Jésus prie seul au jardin de Gethsémani. Il a peur, mais il dit « Que ta volonté soit faite ».", "Prie pour ceux qui traversent une épreuve ou qui ont peur, et pour toi si c'est ton cas."],
    ["mar 15", "Marc 15, 6-15", "Jésus est fouetté par des soldats romains, alors qu'il n'a rien fait de mal.", "Pense à ceux qui subissent la violence, et demande de ne jamais en faire subir."],
    ["mat 27", "Matthieu 27, 27-31", "Les soldats se moquent de Jésus et lui posent une couronne d'épines sur la tête.", "Demande le courage de rester doux quand on se moque de toi."],
    ["joh 19", "Jean 19, 16-17", "Jésus porte lui-même sa lourde croix jusqu'au lieu de son exécution. Un homme, Simon de Cyrène, l'aide.", "Offre tes fardeaux à Dieu et demande de la patience."],
    ["luk 23", "Luc 23, 33-46", "Jésus est cloué sur la croix. Il pardonne à ceux qui l'ont condamné, puis il meurt.", "Demande la force de pardonner à quelqu'un, et prie pour les personnes qui vont mourir."]
  ],
  glorieux: [
    ["mat 28", "Matthieu 28, 1-10", "Le troisième jour, des femmes trouvent le tombeau vide. Jésus est vivant.", "Demande une foi vivante et la joie de Pâques."],
    ["luk 24", "Luc 24, 50-53", "Quarante jours après Pâques, Jésus retourne auprès de son Père sous les yeux de ses disciples. Il promet de rester avec eux.", "Demande l'espérance, c'est-à-dire la confiance que le ciel nous attend."],
    ["act 2", "Actes 2, 1-4", "Cinquante jours après Pâques, l'Esprit Saint descend sur les apôtres comme des flammes. Ils se mettent à annoncer l'Évangile.", "Demande l'Esprit Saint, pour avoir du courage et de la lumière."],
    ["", "Tradition de l'Église", "Selon la tradition de l'Église, Marie est accueillie auprès de Dieu, avec son corps et son âme, à la fin de sa vie.", "Demande l'espérance, et prie pour ceux qui sont proches de la fin de leur vie."],
    ["", "Tradition de l'Église", "Marie est honorée comme reine du ciel parce qu'elle est la mère de Jésus. Les chrétiens la prient comme une mère.", "Confie à Marie tous ceux que tu aimes."]
  ]
};
const ROSARY_INTENTIONS = ["Pour la paix", "Pour ma famille", "Pour ceux qui souffrent", "Pour les malades", "Pour ceux qui cherchent Dieu", "En action de grâce", "Pour les défunts", "Pour ma paroisse"];

function rosaryGeometry() {
  const beads = [], cx = 200, cy = 118, r = 96;
  const tail = [[200, 378, "cross"], [200, 346, "big"], [200, 322, "s"], [200, 304, "s"], [200, 286, "s"], [200, 262, "big"], [200, cy + r + 2, "medal"]];
  tail.forEach(([x, y, k]) => beads.push({ x, y, k }));
  for (let i = 0; i < 55; i++) { const a = (90 + (i + 1) * 360 / 56) * Math.PI / 180; beads.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a), k: i % 11 === 0 ? "big" : "s" }); }
  return beads;
}
function buildRosary(key, group) {
  const P = id => PRAYERS.find(p => p.id === id), m = MYSTERES[key], info = MYST_INFO[key], steps = [];
  steps.push({ b: 0, kind: "debut", t: "Signe de croix et Credo", x: P("signe").x + "\n\n" + P("credo").x, sub: "Sur la croix" });
  steps.push({ b: 1, t: "Notre Père", x: P("notre").x, sub: "Première grosse perle" });
  if (group) steps.push({ b: 4, bset: [2, 3, 4], id: "jvs", grp: true, t: "Je vous salue Marie", x: P("jvs").x, sub: "Trois fois, pour la foi, l'espérance et la charité", n: 3 });
  else ["la foi", "l'espérance", "la charité"].forEach((v, i) => steps.push({ b: 2 + i, id: "jvs", t: "Je vous salue Marie", x: P("jvs").x, sub: `Petite perle ${i + 1} sur 3, pour ${v}`, tail: true }));
  steps.push({ b: 5, t: "Gloire au Père", x: P("gloire").x, sub: "Grosse perle" });
  for (let d = 0; d < 5; d++) {
    const L = 7 + 11 * d, mi = info[d], my = { n: d + 1, t: m.l[d], ref: mi[1], link: mi[0], med: mi[2], ask: mi[3] };
    steps.push({ b: L, dec: d, kind: "myst", t: "Notre Père", x: P("notre").x, sub: `Dizaine ${d + 1} sur 5, ${m.l[d]}`, myst: my });
    if (group) steps.push({ b: L + 10, bset: Array.from({ length: 10 }, (_, k) => L + 1 + k), dec: d, id: "jvs", grp: true, t: "Je vous salue Marie", x: P("jvs").x, sub: "Dix fois, en pensant à ce mystère", n: 10, myst: my });
    else for (let j = 1; j <= 10; j++) steps.push({ b: L + j, dec: d, id: "jvs", t: "Je vous salue Marie", x: P("jvs").x, sub: `Perle ${j} sur 10`, count: j, myst: my });
    steps.push({ b: d < 4 ? L + 11 : 6, dec: d, t: "Gloire au Père", x: P("gloire").x + "\n\nÔ mon Jésus, pardonne-nous nos péchés, préserve-nous du feu de l'enfer, conduis au ciel toutes les âmes, surtout celles qui ont le plus besoin de ta miséricorde.", sub: "Fin de la dizaine", myst: my });
  }
  steps.push({ b: 6, kind: "fin", t: "Salut, ô Reine", x: P("salve").x, sub: "Pour conclure" });
  return steps;
}
