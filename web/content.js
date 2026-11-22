// Contenu d'Auréa. Syntaxe : {{mot}} ou {{texte affiché|clé}} => mot cliquable (glossaire).
// Niveaux de certitude : "fait" (historique/vérifiable), "foi" (enseignement de l'Église), "debat" (débat entre spécialistes).

const GLOSSARY = {
  evangile: ["Évangile", "Le mot veut dire « bonne nouvelle ». C'est aussi le nom des 4 livres qui racontent la vie de Jésus (Matthieu, Marc, Luc, Jean)."],
  sacrement: ["Sacrement", "Un geste de l'Église, avec des mots et des signes, par lequel Dieu agit vraiment dans notre vie. Il y en a 7."],
  bapteme: ["Baptême", "Le premier sacrement : on est plongé dans l'eau ou on reçoit de l'eau sur la tête, « au nom du Père, du Fils et du Saint-Esprit ». On devient chrétien."],
  catechumene: ["Catéchumène", "Un adulte ou un jeune qui se prépare au baptême, avec un accompagnement dans une paroisse."],
  catechumenat: ["Catéchuménat", "Le chemin de préparation au baptême : rencontres, découverte de la Bible, prière, étapes. Il dure souvent 1 à 2 ans."],
  paroisse: ["Paroisse", "La communauté de chrétiens d'un quartier ou d'une ville, avec son église et son prêtre."],
  messe: ["Messe", "La grande prière de l'Église, surtout le dimanche. On écoute la Parole de Dieu et on partage le repas de Jésus (l'eucharistie)."],
  eucharistie: ["Eucharistie", "Le sacrement où les catholiques croient recevoir Jésus lui-même sous la forme du pain consacré. Le mot veut dire « action de grâce »."],
  communion: ["Communion", "Le moment de la messe où l'on reçoit l'eucharistie. Aussi : l'union entre les chrétiens."],
  psaume: ["Psaume", "Une prière chantée ou lue, tirée du livre des Psaumes (Ancien Testament). On la reprend à la messe, entre deux lectures."],
  prophete: ["Prophète", "Quelqu'un qui parle de la part de Dieu. Dans la Bible, les prophètes annoncent aussi la venue d'un Sauveur."],
  messie: ["Messie", "Mot hébreu qui veut dire « celui qui a reçu l'onction ». En grec : « Christ ». Les chrétiens croient que c'est Jésus."],
  trinite: ["Trinité", "Un seul Dieu en trois personnes qui s'aiment : le Père, le Fils (Jésus) et l'Esprit Saint."],
  grace: ["Grâce", "Un cadeau de Dieu qu'on ne mérite pas : son amour, son aide."],
  peche: ["Péché", "Ce qui nous éloigne de Dieu et des autres : un choix contre l'amour. Dieu pardonne toujours à celui qui revient."],
  resurrection: ["Résurrection", "Jésus est mort sur la croix, et il est revenu à la vie le troisième jour. C'est le cœur de la foi chrétienne."],
  eglise: ["Église", "Tous les baptisés qui suivent Jésus (avec une majuscule). Avec une minuscule, c'est le bâtiment."],
  ancien_testament: ["Ancien Testament", "La première partie de la Bible : 46 livres écrits avant Jésus, qui racontent l'histoire du peuple d'Israël."],
  nouveau_testament: ["Nouveau Testament", "La seconde partie de la Bible : 27 livres sur Jésus et les premiers chrétiens."],
  liturgie: ["Liturgie", "La façon dont l'Église prie ensemble : les gestes, les chants, les textes de la messe et des fêtes."],
  ordinaire: ["Temps ordinaire", "Les semaines de l'année liturgique en dehors des grandes fêtes (Noël, Pâques). En vert."],
  avent: ["Avent", "Les 4 semaines avant Noël : on se prépare à accueillir Jésus."],
  careme: ["Carême", "40 jours avant Pâques pour prier, partager et se tourner vers Dieu."],
  chapelet: ["Chapelet", "Un collier de perles pour prier en répétant des prières et en méditant la vie de Jésus avec Marie."],
  mystere: ["Mystère (du chapelet)", "Une scène de la vie de Jésus ou de Marie qu'on médite pendant une dizaine."],
  dizaine: ["Dizaine", "10 « Je vous salue Marie » de suite, pendant qu'on médite un événement de la vie de Jésus."],
  pelerinage: ["Pèlerinage", "Un voyage de prière vers un lieu saint, à pied ou autrement."],
  ange: ["Ange", "Un messager de Dieu. Dans les Évangiles, ils annoncent des bonnes nouvelles."],
  nihil: ["Doctrine", "Ce que l'Église enseigne sur la foi."],
  doctrine: ["Doctrine", "Ce que l'Église enseigne sur la foi."],
  disciple: ["Disciple", "Quelqu'un qui suit Jésus et apprend de lui. Les 12 apôtres sont ses disciples les plus proches."],
  apotre: ["Apôtre", "Un des 12 amis que Jésus a choisis et envoyés annoncer l'Évangile."],
  confession: ["Confession (réconciliation)", "Le sacrement du pardon : on dit ses fautes à un prêtre et on reçoit le pardon de Dieu."],
  confirmation: ["Confirmation", "Le sacrement qui fortifie le baptisé par l'Esprit Saint."],
  tanakh: ["Tanakh", "La Bible hébraïque des juifs. Presque tout son contenu correspond à l'Ancien Testament chrétien."],
  carnet: ["Carnet", "Ton espace personnel de notes."]
};

const BACKGROUNDS = [
  { id: "decouverte", label: "Je découvre, je ne connais presque rien" },
  { id: "revenant", label: "J'ai été chrétien et je reviens vers Dieu" },
  { id: "musulman", label: "Je viens de l'islam ou d'une famille musulmane" },
  { id: "juif", label: "Je viens du judaïsme" },
  { id: "athee", label: "Athée ou agnostique" },
  { id: "bouddhiste", label: "Je viens du bouddhisme" },
  { id: "esoterisme", label: "Spiritualité, ésotérisme, New Age" },
  { id: "science", label: "Je suis surtout rationnel / scientifique" },
  { id: "autre", label: "Autre" },
  { id: "nsp", label: "Je préfère ne pas dire" }
];

const LEVELS = [
  { id: 1, label: "Niveau 1 — Presque rien (catéchisme lointain)" },
  { id: 2, label: "Niveau 2 — Quelques souvenirs (prières, fêtes)" },
  { id: 3, label: "Niveau 3 — Je connais les bases" },
  { id: 4, label: "Niveau 4 — Je pratiquais, je veux approfondir" }
];

// ---------- Les bases ----------
const BASES = [
  { t: "Dieu t'aime", b: "Les chrétiens croient en {{un seul Dieu|trinite}} qui a créé le monde par amour. Il ne te regarde pas de loin : il veut une relation avec toi." },
  { t: "Jésus est Dieu fait homme", b: "Il y a 2 000 ans, Dieu est venu sur terre en Jésus, né à Bethléem. Il a enseigné, guéri, pardonné. Les chrétiens croient qu'il est à la fois vraiment homme et vraiment Dieu." },
  { t: "Il a donné sa vie pour nous", b: "Jésus a été crucifié sous Ponce Pilate. Les chrétiens croient qu'il est mort par amour, pour nous libérer du {{péché|peche}} et de la mort." },
  { t: "Il est vivant", b: "Le troisième jour, selon les {{Évangiles|evangile}}, Jésus est revenu à la vie : c'est la {{résurrection|resurrection}}. Ses disciples sont devenus des témoins, prêts à tout pour le dire. C'est le centre de la foi." },
  { t: "L'Église : une famille", b: "Jésus a rassemblé ses {{disciples|disciple}}. Cette famille s'appelle l'{{Église|eglise}}. On y prie, on y reçoit les {{sacrements|sacrement}}, on s'entraide. Tu n'as pas à marcher seul." },
  { t: "Prier, c'est parler à Dieu", b: "Prier n'a pas besoin d'être compliqué. Parler à Dieu comme à quelqu'un qui t'écoute, c'est déjà prier. On commence tout de suite par une toute petite prière." }
];

const PRIERE_PREMIERE = "Seigneur,\nje ne sais pas encore grand-chose de toi.\nGuide-moi.\nOuvre mon cœur, éclaire mon esprit,\net aide-moi à avancer pas à pas.\nAmen.";

const PRIERES = [
  { id: "signe", t: "Le signe de croix", x: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.", tip: "On touche le front, le cœur, l'épaule gauche puis la droite." },
  { id: "notre", t: "Notre Père", x: "Notre Père, qui es aux cieux,\nque ton nom soit sanctifié,\nque ton règne vienne,\nque ta volonté soit faite sur la terre comme au ciel.\nDonne-nous aujourd'hui notre pain de ce jour.\nPardonne-nous nos offenses,\ncomme nous pardonnons aussi à ceux qui nous ont offensés.\nEt ne nous laisse pas entrer en tentation,\nmais délivre-nous du Mal.\nAmen.", tip: "C'est la prière que Jésus lui-même a enseignée (Matthieu 6, 9-13)." },
  { id: "je_vous_salue", t: "Je vous salue Marie", x: "Je vous salue, Marie, pleine de grâce ;\nle Seigneur est avec vous.\nVous êtes bénie entre toutes les femmes\net Jésus, le fruit de vos entrailles, est béni.\nSainte Marie, Mère de Dieu,\npriez pour nous, pauvres pécheurs,\nmaintenant et à l'heure de notre mort.\nAmen.", tip: "Les premiers mots viennent de l'ange Gabriel et d'Élisabeth (Luc 1)." },
  { id: "gloire", t: "Gloire au Père", x: "Gloire au Père, et au Fils, et au Saint-Esprit,\ncomme il était au commencement, maintenant et toujours,\net pour les siècles des siècles.\nAmen." },
  { id: "credo", t: "Le Credo (Symbole des apôtres)", x: "Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre.\nEt en Jésus-Christ, son Fils unique, notre Seigneur,\nqui a été conçu du Saint-Esprit, est né de la Vierge Marie,\na souffert sous Ponce Pilate, a été crucifié, est mort et a été enseveli,\nest descendu aux enfers, le troisième jour est ressuscité des morts,\nest monté aux cieux, est assis à la droite de Dieu le Père tout-puissant,\nd'où il viendra juger les vivants et les morts.\nJe crois en l'Esprit Saint, à la sainte Église catholique,\nà la communion des saints, à la rémission des péchés,\nà la résurrection de la chair, à la vie éternelle.\nAmen." }
];

// ---------- Bible ----------
const BIBLE_INTRO = [
  { t: "Une bibliothèque, pas un seul livre", b: "La Bible est une bibliothèque de 73 livres pour les catholiques (46 dans l'{{Ancien Testament|ancien_testament}}, 27 dans le {{Nouveau Testament|nouveau_testament}}). Écrite par de nombreux auteurs sur environ 1 000 ans." },
  { t: "Ancien et Nouveau Testament", b: "L'Ancien Testament raconte l'histoire du peuple d'Israël avant Jésus : création, Abraham, Moïse, rois, {{prophètes|prophete}}. Il est écrit surtout en hébreu. Le Nouveau Testament parle de Jésus et des premiers chrétiens, écrit en grec, environ entre 50 et 100 après J.-C." },
  { t: "Dans l'ordre d'arrivée", b: "Le judaïsme est le plus ancien (Abraham, Moïse). Le christianisme naît au Ier siècle avec Jésus et ses disciples, tous juifs. L'islam apparaît au VIIe siècle. Les chrétiens reçoivent l'Ancien Testament comme la préparation à Jésus : sans lui, on ne comprend pas le Nouveau." },
  { t: "Comment lire une référence", b: "« Jn 3, 16 » = Évangile de Jean, chapitre 3, verset 16. Le chapitre est le grand bloc, le verset est la petite phrase. Les chapitres et versets ont été ajoutés plus tard pour s'y retrouver (XIIIe et XVIe siècles)." },
  { t: "Qui a écrit quoi ?", b: "Quatre auteurs racontent la vie de Jésus : Matthieu, Marc, Luc et Jean (les 4 {{Évangiles|evangile}}). Paul écrit des lettres aux premières communautés. Les {{psaumes|psaume}}, attribués surtout au roi David, sont des prières." },
  { t: "Évangile ou psaume ?", b: "L'{{Évangile|evangile}} raconte ce que Jésus a dit et fait. Le {{psaume|psaume}} est une prière que l'on chante ou lit pour répondre à Dieu. À la {{messe|messe}}, on écoute les lectures, on répond par un psaume, et on se lève pour l'Évangile." },
  { t: "Par où commencer ?", b: "Pas par le début ! Le plus simple : l'Évangile selon Marc, le plus court et le plus direct. Ensuite, Luc, puis Jean." }
];

const PLANS = [
  { id: "marc", t: "Découvrir Jésus avec Marc", d: "16 jours, un chapitre par jour", lvl: "Débutant", ref: Array.from({length:16}, (_,i)=>["Mc", i+1]) },
  { id: "valeurs", t: "Les grandes valeurs de Jésus", d: "10 jours : pardon, amour, humilité, confiance…", lvl: "Débutant", ref: [["Mt",5,"Les Béatitudes"],["Mt",6,"Prier, donner, ne pas s'inquiéter"],["Lc",10,"Le bon Samaritain"],["Lc",15,"Le fils retrouvé"],["Jn",13,"Le lavement des pieds"],["Mt",25,"Servir les plus petits"],["Lc",18,"Prier avec humilité"],["Jn",15,"Demeurer dans l'amour"],["Mt",18,"Pardonner"],["1Co",13,"L'hymne à l'amour"]] },
  { id: "chrono", t: "Le grand récit, dans l'ordre", d: "20 étapes : de la Création à l'Église naissante", lvl: "Intermédiaire", ref: [["Gn",1,"La création"],["Gn",12,"Abraham"],["Ex",3,"Moïse et le buisson ardent"],["Ex",20,"Les 10 commandements"],["Jos",1,"Entrée en Terre promise"],["1S",16,"David"],["Ps",23,"Le Seigneur est mon berger"],["Is",53,"Le serviteur souffrant"],["Lc",1,"Annonciation"],["Lc",2,"Noël"],["Mt",5,"Le Sermon sur la montagne"],["Jn",11,"Lazare"],["Mc",14,"La Passion"],["Mc",15,"La croix"],["Lc",24,"Résurrection"],["Ac",2,"Pentecôte"],["Ac",9,"Paul"],["Rm",8,"Vie dans l'Esprit"],["1Co",13,"L'amour"],["Ap",21,"Tout est renouvelé"]] }
];

// ---------- Jésus : prophéties (prudence assumée) ----------
const PROPHETIES = [
  { ref: "Mi 5, 2", t: "Né à Bethléem", x: "Le prophète Michée (VIIIe s. av. J.-C.) annonce qu'un chef viendra de Bethléem. Matthieu 2 et Luc 2 placent la naissance de Jésus là.", c: "foi" },
  { ref: "Is 7, 14", t: "Un signe : la vierge", x: "Isaïe annonce un enfant « Emmanuel » (« Dieu avec nous »). Matthieu 1 le relie à Jésus. Le mot hébreu 'almah' peut vouloir dire « jeune femme » : la version grecque ancienne (la Septante) traduit par « vierge ».", c: "debat" },
  { ref: "Za 9, 9", t: "Roi sur un ânon", x: "Zacharie annonce un roi humble, monté sur un ânon. Les 4 Évangiles décrivent l'entrée de Jésus à Jérusalem exactement ainsi.", c: "foi" },
  { ref: "Ps 22", t: "Le juste abandonné", x: "Ce psaume attribué à David décrit un juste humilié, dont on se partage les vêtements. Jésus en cite le premier verset sur la croix (« Mon Dieu, pourquoi m'as-tu abandonné ? »). Certains mots du verset 17 sont discutés selon les manuscrits.", c: "debat" },
  { ref: "Is 53", t: "Le serviteur qui souffre", x: "Isaïe décrit un serviteur qui porte les fautes des autres. Les chrétiens y voient Jésus dès les premiers siècles. La tradition juive y lit souvent le peuple d'Israël. Les deux lectures existent.", c: "debat" }
];
const PROPHETIES_NOTE = "On entend souvent « plus de 300 prophéties accomplies ». Ce chiffre dépend de ce qu'on appelle « prophétie » et il est discuté. Ici, on ne retient que quelques textes, avec leur date approximative et les deux lectures. À toi de juger.";

// ---------- Quiz Jésus ----------
const QUIZ = [
  { lvl: "Niveau 1 — Qui est Jésus ?", qs: [
    { q: "Dans quelle ville est né Jésus ?", o: ["Nazareth", "Bethléem", "Jérusalem"], a: 1, e: "Jésus est né à Bethléem (Luc 2) et a grandi à Nazareth." },
    { q: "Comment s'appelle sa mère ?", o: ["Marie", "Marthe", "Élisabeth"], a: 0, e: "Marie, qui dit « oui » à l'ange Gabriel (Luc 1)." },
    { q: "Que veut dire « Évangile » ?", o: ["Histoire ancienne", "Bonne nouvelle", "Loi de Dieu"], a: 1, e: "« Évangile » vient du grec euangelion : bonne nouvelle." },
    { q: "Combien de disciples proches (apôtres) Jésus a-t-il choisis ?", o: ["7", "12", "40"], a: 1, e: "Les Douze, symbole des 12 tribus d'Israël." },
    { q: "Que fête-t-on à Pâques ?", o: ["La naissance de Jésus", "La résurrection de Jésus", "La Pentecôte"], a: 1, e: "Pâques célèbre la victoire de Jésus sur la mort." }
  ]},
  { lvl: "Niveau 2 — Ceux qu'il rencontre", qs: [
    { q: "Quel pêcheur devient le chef des apôtres ?", o: ["Pierre", "Jean-Baptiste", "Judas"], a: 0, e: "Simon, que Jésus appelle Pierre (« roc »). Mt 16, 18." },
    { q: "Qui est monté sur un sycomore pour voir Jésus ?", o: ["Zachée", "Nicodème", "Lazare"], a: 0, e: "Zachée, collecteur d'impôts, change de vie après avoir invité Jésus chez lui (Lc 19)." },
    { q: "Qui Jésus rencontre-t-il près du puits de Jacob ?", o: ["Une femme samaritaine", "Une veuve", "Marthe"], a: 0, e: "La Samaritaine : Jésus lui parle malgré les barrières de son époque (Jn 4)." },
    { q: "Qui est le premier témoin de la résurrection selon Jean ?", o: ["Pierre", "Marie-Madeleine", "Thomas"], a: 1, e: "Marie-Madeleine voit Jésus ressuscité au tombeau (Jn 20)." },
    { q: "Qui baptise Jésus dans le Jourdain ?", o: ["Jean le Baptiste", "Jean l'évangéliste", "Jacques"], a: 0, e: "Jean le Baptiste, cousin de Jésus selon Luc." }
  ]},
  { lvl: "Niveau 3 — Ses grandes valeurs", qs: [
    { q: "Quel est le plus grand commandement selon Jésus ?", o: ["Aimer Dieu et son prochain", "Observer le sabbat", "Faire des sacrifices"], a: 0, e: "Mt 22, 37-40 : aimer Dieu de tout son cœur et son prochain comme soi-même." },
    { q: "Dans la parabole du bon Samaritain, qui est le « prochain » ?", o: ["Le prêtre", "Celui qui a eu pitié", "Le voyageur blessé"], a: 1, e: "Le Samaritain, qui s'approche et soigne. (Lc 10)" },
    { q: "Que dit Jésus sur les ennemis ?", o: ["Les éviter", "Les aimer et prier pour eux", "Leur rendre la pareille"], a: 1, e: "Mt 5, 44 : « Aimez vos ennemis, priez pour ceux qui vous persécutent »." },
    { q: "Dans la parabole du fils prodigue, que fait le père ?", o: ["Il le chasse", "Il court l'embrasser", "Il le punit"], a: 1, e: "Le père court à sa rencontre (Lc 15) : image de Dieu qui pardonne." },
    { q: "Qui sont les « heureux » des Béatitudes ?", o: ["Les puissants", "Les pauvres de cœur, les doux, les artisans de paix", "Les plus riches"], a: 1, e: "Mt 5, 3-12 : un renversement des valeurs du monde." }
  ]}
];

// ---------- Messe ----------
const MESSE_ETAPES = [
  { t: "Avant d'entrer", b: "Arrive 5 à 10 minutes avant. Tu n'as pas besoin d'être « prêt » ni de tout savoir. Tu peux t'asseoir au fond." },
  { t: "En entrant", b: "On peut se signer avec l'eau bénite. Une génuflexion (un genou à terre) devant le tabernacle, la petite armoire où est gardée l'{{eucharistie|eucharistie}}." },
  { t: "La liturgie de la Parole", b: "On est assis pour les lectures et le {{psaume|psaume}}. On se lève pour l'{{Évangile|evangile}}. Puis l'homélie : le prêtre explique les textes." },
  { t: "La liturgie de l'eucharistie", b: "Le prêtre prépare le pain et le vin. On reste debout, à genoux ou assis selon les lieux, en suivant l'assemblée. Il y a le Notre Père, puis l'échange de paix (on serre la main)." },
  { t: "La {{communion|communion}}", b: "Les catholiques baptisés, qui se sentent prêts, vont recevoir l'eucharistie. Toi, tu peux rester à ta place, ou avancer les bras croisés sur la poitrine pour recevoir une bénédiction. Personne ne te jugera." },
  { t: "L'envoi", b: "Le prêtre bénit l'assemblée et envoie les fidèles : « Allez dans la paix du Christ ». Tu peux saluer le prêtre à la sortie : c'est le bon moment pour dire que tu découvres." }
];

const CALENDRIER = [
  { d: "2026-11-22", t: "Christ, Roi de l'univers", b: "Dernier dimanche de l'année liturgique. On célèbre Jésus comme roi d'amour." },
  { d: "2026-11-29", t: "1er dimanche de l'{{Avent|avent}}", b: "Début de l'année liturgique : quatre semaines pour se préparer à Noël." },
  { d: "2026-12-08", t: "Immaculée Conception", b: "On célèbre Marie préservée du péché dès sa conception, pour être la mère de Jésus." },
  { d: "2026-12-25", t: "Noël", b: "Naissance de Jésus à Bethléem." },
  { d: "2027-01-03", t: "Épiphanie", b: "Les mages viennent adorer Jésus : il est pour tous les peuples." },
  { d: "2027-02-10", t: "Mercredi des Cendres", b: "Début du {{Carême|careme}}, 40 jours de préparation à Pâques." },
  { d: "2027-03-28", t: "Pâques", b: "La résurrection de Jésus : la plus grande fête chrétienne. Beaucoup de baptêmes d'adultes ont lieu la veille, à la Vigile pascale." },
  { d: "2027-05-06", t: "Ascension", b: "Jésus retourne auprès du Père, 40 jours après Pâques." },
  { d: "2027-05-16", t: "Pentecôte", b: "L'Esprit Saint descend sur les apôtres : naissance publique de l'Église." }
];

const SACREMENTS = [
  { t: "Baptême", b: "On devient chrétien, enfant de Dieu et membre de l'Église. Les péchés sont pardonnés. C'est la porte de tous les autres sacrements. Jésus dit : « Si quelqu'un ne naît pas de l'eau et de l'Esprit, il ne peut entrer dans le royaume de Dieu » (Jn 3, 5), et envoie ses disciples baptiser (Mt 28, 19)." },
  { t: "Confirmation", b: "L'Esprit Saint fortifie le baptisé, comme à la Pentecôte." },
  { t: "Eucharistie", b: "On reçoit Jésus lui-même, présent dans le pain consacré. Source et sommet de la vie chrétienne." },
  { t: "Réconciliation", b: "Le sacrement du pardon : on confie ses fautes à un prêtre, et on reçoit le pardon de Dieu." },
  { t: "Onction des malades", b: "Une aide spirituelle pour les personnes malades ou âgées." },
  { t: "Ordre", b: "Pour ceux qui sont appelés à servir comme diacres, prêtres, évêques." },
  { t: "Mariage", b: "Un homme et une femme s'engagent devant Dieu à s'aimer et à fonder une famille." }
];
const POURQUOI_BAPTEME = [
  "Pour les catholiques, c'est Jésus lui-même qui demande de baptiser (Mt 28, 19).",
  "Il fait entrer dans la famille de l'Église, avec tous les autres sacrements.",
  "Il donne une vie nouvelle et efface le péché.",
  "Il est possible à tout âge. Beaucoup d'adultes sont baptisés chaque année en France, souvent à Pâques."
];
const CATECHUMENAT = [
  "Tu contactes une {{paroisse|paroisse}} : un prêtre ou une équipe t'accueille, sans engagement.",
  "Tu rencontres un accompagnateur et un petit groupe, tu poses toutes tes questions.",
  "Tu découvres la Bible, la prière et la vie de l'Église, à ton rythme.",
  "Des étapes liturgiques jalonnent le chemin (entrée en Église, appel décisif).",
  "Le {{baptême|bapteme}}, la {{confirmation|confirmation}} et la première {{communion|communion}} sont souvent reçus ensemble, à la Vigile pascale."
];

// ---------- Chapelet ----------
const MYSTERES = {
  joyeux: { jours: "lundi et samedi", t: "Mystères joyeux", l: ["L'Annonciation", "La Visitation", "La Nativité", "La Présentation au Temple", "Jésus retrouvé au Temple"] },
  lumineux: { jours: "jeudi", t: "Mystères lumineux", l: ["Le Baptême de Jésus", "Les noces de Cana", "L'annonce du Royaume", "La Transfiguration", "L'institution de l'Eucharistie"] },
  douloureux: { jours: "mardi et vendredi", t: "Mystères douloureux", l: ["L'agonie de Jésus à Gethsémani", "La flagellation", "Le couronnement d'épines", "Le portement de la croix", "La crucifixion"] },
  glorieux: { jours: "mercredi et dimanche", t: "Mystères glorieux", l: ["La Résurrection", "L'Ascension", "La Pentecôte", "L'Assomption de Marie", "Le couronnement de Marie"] }
};
const MYSTERE_PAR_JOUR = ["glorieux", "joyeux", "douloureux", "glorieux", "lumineux", "douloureux", "joyeux"]; // dimanche=0
const INTENTIONS = [
  "Pour la paix dans le monde", "Pour mes proches malades", "Pour ceux qui cherchent Dieu",
  "Pour l'Église et le pape", "Pour ma famille", "Pour la conversion des cœurs", "Pour les défunts"
];

// ---------- Ponts selon le parcours ----------
const PONTS = {
  decouverte: [
    { t: "Tu n'as pas besoin d'être parfait", x: "Les Évangiles montrent que Jésus s'adresse d'abord à ceux qui se sentent éloignés : collecteurs d'impôts, malades, étrangers. Tu es attendu tel que tu es.", c: "foi", s: "Lc 5, 31-32" },
    { t: "Tu peux poser toutes les questions", x: "Jésus invite : « Venez et voyez » (Jn 1, 39). La foi chrétienne se vit en cherchant, pas en se taisant.", c: "foi", s: "Jn 1, 39" }
  ],
  revenant: [
    { t: "Tu es attendu", x: "Dans la parabole du fils prodigue, le père voit son fils de loin et court vers lui avant même qu'il parle. Revenir n'a pas besoin de grand discours.", c: "foi", s: "Lc 15, 11-32" },
    { t: "Le pardon est un sacrement", x: "La confession permet de repartir d'un cœur léger, même après des années. Il suffit de dire « ça fait longtemps ». Le prêtre est là pour t'aider.", c: "foi", s: "Jn 20, 22-23" },
    { t: "Reprendre sans te noyer", x: "Pas besoin de tout rattraper. Un chapitre de l'Évangile, une prière, une messe : on reprend un petit pas à la fois.", c: "foi", s: "" }
  ],
  musulman: [
    { t: "Jésus est déjà dans le Coran", x: "Le Coran parle de Jésus (Îsâ) : naissance virginale, Messie (al-Masîh), Parole de Dieu, miracles. Marie (Maryam) a une sourate entière à son nom (sourate 19). Tu ne pars pas de zéro.", c: "fait", s: "Coran 3, 45-47 ; 19" },
    { t: "Ce que les chrétiens ajoutent", x: "Les chrétiens croient que Jésus est le Fils de Dieu, mort sur la croix et ressuscité. Le Coran (4, 157) nie la crucifixion. Les historiens, croyants ou non, s'accordent pour dire que Jésus a bien été crucifié : Tacite et Flavius Josèphe le mentionnent.", c: "fait", s: "Tacite, Annales 15, 44" },
    { t: "Un contexte chrétien ancien", x: "Au VIIe siècle, des chrétiens vivaient en Arabie et alentour (Najrân, Églises d'Orient). Des spécialistes débattent des influences entre ces communautés et la naissance de l'islam. Cela reste discuté, et nous ne tranchons pas.", c: "debat", s: "" },
    { t: "Respect", x: "L'Église catholique dit regarder avec estime les musulmans, qui adorent le Dieu unique (Nostra Aetate, 1965). Ton parcours, ta famille et ta culture sont respectés.", c: "foi", s: "Nostra Aetate 3" }
  ],
  juif: [
    { t: "Jésus était juif", x: "Jésus est né juif, a vécu dans le judaïsme, fréquentait la synagogue et fêtait Pessah. Ses premiers disciples étaient tous juifs.", c: "fait", s: "Lc 2, 41-42" },
    { t: "Un même socle", x: "Le {{Tanakh|tanakh}} correspond presque entièrement à l'Ancien Testament chrétien. Les chrétiens y lisent une promesse que Jésus accomplit. Ce n'est pas un livre à remplacer, mais à garder.", c: "foi", s: "Mt 5, 17" },
    { t: "Deux lectures de certains textes", x: "Isaïe 53 est lu différemment : les chrétiens y voient Jésus, la tradition juive y voit souvent Israël. Les deux lectures sont présentées.", c: "debat", s: "Is 53" },
    { t: "Respect", x: "L'Église a clairement condamné l'antisémitisme et affirme l'alliance jamais révoquée de Dieu avec Israël (Nostra Aetate, 1965).", c: "foi", s: "Nostra Aetate 4" }
  ],
  athee: [
    { t: "Jésus a-t-il existé ?", x: "Oui : Tacite, Flavius Josèphe et Pline le Jeune en parlent. La grande majorité des historiens, croyants ou non, admettent son existence et sa crucifixion sous Ponce Pilate.", c: "fait", s: "Tacite, Annales 15, 44" },
    { t: "Des textes bien conservés", x: "On possède plus de 5 000 manuscrits grecs du Nouveau Testament, dont des fragments très anciens (comme le papyrus p52, début du IIe siècle). C'est beaucoup plus que pour la plupart des textes antiques.", c: "fait", s: "Papyrus Rylands p52" },
    { t: "Les doutes sont bienvenus", x: "Thomas, l'apôtre, voulait des preuves, et Jésus l'a accueilli (Jn 20). La foi n'est pas l'absence de questions.", c: "foi", s: "Jn 20, 24-29" },
    { t: "La question centrale", x: "Les faits historiques ne prouvent pas la foi, mais ils montrent que ce n'est pas une légende tardive. La vraie question reste : « Que fais-je de Jésus ? »", c: "foi", s: "" }
  ],
  bouddhiste: [
    { t: "Un terrain commun", x: "Compassion, paix intérieure, détachement, attention aux souffrants : tu retrouveras ces valeurs chez Jésus (Béatitudes, bon Samaritain).", c: "foi", s: "Mt 5" },
    { t: "Une différence essentielle", x: "Le christianisme annonce un Dieu personnel qui aime, plus qu'une libération par ses propres efforts. Le salut est un don, la grâce, reçu dans une relation.", c: "foi", s: "Ep 2, 8" },
    { t: "Prière et silence", x: "La tradition chrétienne a aussi une longue histoire de méditation, de silence et de contemplation (Pères du désert, moines, Thomas Merton).", c: "fait", s: "" }
  ],
  esoterisme: [
    { t: "La soif de sens est légitime", x: "L'Église ne méprise pas la recherche spirituelle. Elle propose une relation personnelle plutôt que des techniques ou des énergies.", c: "foi", s: "Ac 17, 22-28" },
    { t: "Les Évangiles anciens", x: "Les quatre Évangiles reconnus sont datés du Ier siècle. Les textes « gnostiques » (comme l'Évangile de Thomas) sont plus tardifs, en général du IIe siècle.", c: "fait", s: "" },
    { t: "Pourquoi l'Église se méfie du tarot ou de l'astrologie", x: "Parce que l'avenir est remis à Dieu, et qu'il ne s'agit pas de contrôler le destin mais de lui faire confiance. C'est un choix de confiance, pas de peur.", c: "foi", s: "CEC 2116" }
  ],
  science: [
    { t: "Foi et science ne sont pas ennemies", x: "Georges Lemaître, prêtre catholique belge, a proposé l'origine de l'expansion de l'univers (« atome primitif », qui deviendra le Big Bang). Gregor Mendel, moine, a fondé la génétique.", c: "fait", s: "" },
    { t: "Des questions différentes", x: "La science explique le « comment » ; la foi propose un « pourquoi » et un sens. Jean-Paul II le résume dans l'encyclique Fides et ratio (1998).", c: "foi", s: "Fides et ratio" },
    { t: "Les raisons de croire se vérifient", x: "On te propose des sources, des dates, des textes. Tu peux tout vérifier et je dis clairement quand c'est un fait, une foi ou un débat.", c: "fait", s: "" }
  ],
  autre: [{ t: "Bienvenue", x: "Quelle que soit ton histoire, tu es accueilli. Aucune carte ne te demande de renier ce que tu es.", c: "foi", s: "" }],
  nsp: [{ t: "Bienvenue", x: "Tu avances à ton rythme, sans avoir à te définir.", c: "foi", s: "" }]
};

// ---------- Courants / vie d'Église ----------
const COURANTS = [
  { t: "Une seule Église, plusieurs sensibilités", b: "Il y a des catholiques de différentes cultures et spiritualités. La doctrine est commune, les sensibilités varient. On ne se divise pas : nous sommes frères." },
  { t: "Les rites", b: "Le rite latin est le plus répandu. Il existe aussi des catholiques de rite oriental (maronites, melkites, chaldéens…), unis au pape." },
  { t: "Les familles spirituelles", b: "Bénédictins (prière et travail), dominicains (étude), franciscains (simplicité), jésuites, carmes… Chacune insiste sur un aspect de l'Évangile." },
  { t: "Les mouvements et communautés", b: "Emmanuel, Chemin Neuf, Focolari, Scouts d'Europe, Scouts et Guides de France, MEJ, Fraternités de Jérusalem, Sant'Egidio… chacun propose une manière de vivre sa foi en groupe." },
  { t: "Les groupes d'étude et de prière", b: "Groupes bibliques, cours Alpha, parcours Zachée, chapelets partagés, adoration… ils sont souvent ouverts aux débutants." },
  { t: "Et les autres chrétiens ?", b: "Orthodoxes et protestants croient eux aussi en Jésus. L'Église catholique parle de « frères » et prie pour l'unité des chrétiens." }
];

// ---------- FAQ ----------
const FAQ = [
  { q: "Pourquoi les catholiques prient-ils Marie ?", k: "marie prier prière vénérer", a: "Les catholiques ne l'adorent pas : on adore Dieu seul. On demande à Marie de prier pour nous, comme on demande à un ami de prier pour soi. C'est le sens du « priez pour nous » du Je vous salue Marie." },
  { q: "Faut-il être baptisé pour aller à la messe ?", k: "baptisé baptême messe aller entrer", a: "Non. Tout le monde peut venir assister à la messe. Seuls les baptisés qui se sont préparés reçoivent la communion, mais tu es le bienvenu pour prier et écouter." },
  { q: "Pourquoi est-il important d'être baptisé ?", k: "baptême baptisé important pourquoi", a: "Le baptême fait de toi un enfant de Dieu et un membre de l'Église. C'est Jésus lui-même qui demande de baptiser (Mt 28, 19) et qui dit qu'il faut naître d'eau et d'Esprit (Jn 3, 5)." },
  { q: "Puis-je devenir catholique à l'âge adulte ?", k: "adulte catéchuménat devenir baptême âge", a: "Oui, chaque année des milliers d'adultes sont baptisés en France. On suit un chemin appelé catéchuménat, avec une paroisse." },
  { q: "Quelle est la différence entre catholiques, protestants et orthodoxes ?", k: "protestant orthodoxe différence catholique", a: "Ce sont trois grandes familles de chrétiens. Tous croient en Jésus. Les catholiques reconnaissent l'autorité du pape, les orthodoxes se sont séparés en 1054, les protestants au XVIe siècle. Ce qui nous unit est plus grand que ce qui nous divise." },
  { q: "Est-ce que la Bible est vraie ?", k: "bible vraie vérité histoire fiable", a: "L'Église enseigne que la Bible est la Parole de Dieu écrite par des hommes. On y trouve de l'histoire, de la poésie, des récits symboliques. On la lit en cherchant le message que Dieu y met." },
  { q: "Pourquoi la messe est-elle si importante ?", k: "messe dimanche importante pourquoi", a: "Parce que Jésus a dit « Faites cela en mémoire de moi ». La messe est la rencontre de la communauté avec Jésus, dans sa Parole et dans l'eucharistie." },
  { q: "Que se passe-t-il quand on se confesse ?", k: "confession confesser pardon prêtre péché", a: "On dit ses fautes à un prêtre, qui est tenu au secret absolu. Il donne une pénitence et prononce le pardon de Dieu. Beaucoup en sortent allégés." },
  { q: "Est-ce que Dieu me pardonne vraiment ?", k: "pardon pardonne péché honte coupable", a: "Les Évangiles montrent toujours un Dieu qui pardonne à celui qui revient (Lc 15). Il n'y a aucun péché plus grand que sa miséricorde." },
  { q: "Pourquoi y a-t-il du mal et de la souffrance ?", k: "mal souffrance pourquoi dieu injustice", a: "C'est l'une des plus grandes questions. Les chrétiens ne la contournent pas : Dieu n'est pas absent de la souffrance, il l'a partagée sur la croix. La réponse est une présence plus qu'une explication." },
  { q: "Comment prier si je ne sais pas comment faire ?", k: "prier prière comment débuter commencer", a: "Parle à Dieu avec tes mots. Dis merci, pardon, aide-moi. Puis apprends peu à peu le Notre Père et le Je vous salue Marie." },
  { q: "Le chapelet, c'est quoi ?", k: "chapelet rosaire marie perles", a: "Une prière de méditation où l'on répète des Je vous salue Marie en pensant à la vie de Jésus. Les perles aident à compter." },
  { q: "Faut-il faire bénir son chapelet ?", k: "chapelet bénir bénédiction acheter", a: "On peut demander à un prêtre ou à un diacre de bénir un chapelet ou une croix. Ce n'est pas obligatoire, mais c'est une belle façon de le consacrer à la prière." },
  { q: "Pourquoi Jésus et pas un autre ?", k: "jésus unique pourquoi religion autre", a: "Pour les chrétiens, Jésus n'est pas seulement un sage : il se dit lui-même « le chemin, la vérité et la vie » (Jn 14, 6). On t'invite à lire l'Évangile et à juger par toi-même." },
  { q: "Le catholicisme est-il contre la science ?", k: "science foi big bang évolution galilée", a: "Non. Des prêtres comme Lemaître (Big Bang) ou des moines comme Mendel (génétique) ont fait de grandes découvertes. L'affaire Galilée (XVIIe siècle) est un épisode douloureux et complexe qui n'est pas le reflet de toute l'histoire." },
  { q: "Quelle est la différence entre un psaume et un évangile ?", k: "psaume évangile différence lecture", a: "Un psaume est une prière du peuple d'Israël, qu'on chante ou qu'on dit. Un évangile raconte la vie et les paroles de Jésus." },
  { q: "Comment trouver une messe près de chez moi ?", k: "messe horaires proche trouver paroisse", a: "Le site officiel messes.info (Église catholique en France) donne les horaires et lieux. Tu peux aussi pousser la porte d'une église ou appeler la paroisse." }
];

// ---------- Activités hebdo ----------
const ACTIVITES = [
  { t: "Un dessin de lumière", x: "Dessine ce que « lumière » veut dire pour toi cette semaine. Pas besoin de savoir dessiner." },
  { t: "Une bonne action discrète", x: "Fais un petit service sans le dire : un message, un sourire, un coup de main." },
  { t: "Cinq minutes de silence", x: "Éteins ton téléphone et reste 5 minutes en silence en disant : « Seigneur, je suis là »." },
  { t: "Un psaume du soir", x: "Lis le Psaume 23 le soir, lentement, deux fois." },
  { t: "Une lettre de gratitude", x: "Écris trois choses pour lesquelles tu es reconnaissant, et remercie Dieu." },
  { t: "Un chant", x: "Cherche un chant chrétien en français qui te touche et écoute-le en prière." },
  { t: "Une intention pour quelqu'un", x: "Pense à une personne et prie pour elle cette semaine, même en une phrase." }
];

const VIDEO_LINKS = [
  { t: "Frère Paul-Adrien — vidéos pour comprendre les bases", u: "https://www.youtube.com/results?search_query=fr%C3%A8re+paul-adrien" },
  { t: "KTO — la chaîne catholique", u: "https://www.youtube.com/results?search_query=KTO+d%C3%A9couvrir+la+foi" }
];
