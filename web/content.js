// Contenu d'Auréa. Syntaxe : {{mot}} ou {{texte affiché|clé}} => mot cliquable (glossaire).
// Niveaux de certitude : "fait" (historique/vérifiable), "foi" (enseignement de l'Église), "debat" (débat entre spécialistes).

const GLOSSARY = {
  evangile: ["Évangile", "Ce mot veut dire « bonne nouvelle ». C'est aussi le nom des quatre livres qui racontent la vie de Jésus, écrits par Matthieu, Marc, Luc et Jean."],
  sacrement: ["Sacrement", "Un geste de l'Église, avec des mots et des signes, par lequel les chrétiens croient que Dieu agit vraiment dans leur vie. Il y en a sept, comme le baptême."],
  bapteme: ["Baptême", "Le premier sacrement. On reçoit de l'eau sur la tête, « au nom du Père, du Fils et du Saint-Esprit », et on devient chrétien."],
  catechumene: ["Catéchumène", "Une personne qui se prépare à être baptisée, avec l'aide d'une paroisse."],
  catechumenat: ["Catéchuménat", "Le chemin qui prépare au baptême. On rencontre des gens, on découvre la Bible et la prière. Il dure souvent un à deux ans."],
  paroisse: ["Paroisse", "La communauté de chrétiens d'une ville ou d'un quartier, avec son église et son prêtre."],
  pretre: ["Prêtre", "Un homme qui a choisi de servir Dieu et les autres. Il célèbre la messe, donne le pardon de Dieu et accompagne la paroisse."],
  diacre: ["Diacre", "Un homme qui aide le prêtre et sert les plus fragiles. Il peut baptiser et proclamer l'Évangile."],
  pape: ["Pape", "L'évêque de Rome. Il est le chef de l'Église catholique."],
  messe: ["Messe", "La grande prière des catholiques, surtout le dimanche. On écoute la Parole de Dieu et on partage le repas de Jésus."],
  eucharistie: ["Eucharistie", "Le moment de la messe où les catholiques croient recevoir Jésus lui-même, sous la forme d'un morceau de pain. Le mot veut dire « merci ».",],
  communion: ["Communion", "Le moment de la messe où l'on reçoit l'eucharistie. Ce mot veut aussi dire « être unis ensemble »."],
  homelie: ["Homélie", "Le petit discours du prêtre après l'Évangile. Il aide à comprendre les textes et à les vivre."],
  tabernacle: ["Tabernacle", "Une petite armoire dans l'église où l'on garde le pain consacré. Une petite lumière rouge signale que Jésus y est présent."],
  genuflexion: ["Génuflexion", "Un geste de respect. On met un genou à terre, par exemple devant le tabernacle."],
  psaume: ["Psaume", "Une prière très ancienne, chantée ou lue. Elle est tirée du livre des Psaumes, dans la Bible."],
  prophete: ["Prophète", "Quelqu'un qui parle de la part de Dieu. Dans la Bible, les prophètes annoncent aussi la venue d'un Sauveur."],
  messie: ["Messie", "Un mot hébreu qui veut dire « celui que Dieu a choisi ». En grec, on dit « Christ ». Les chrétiens croient que c'est Jésus."],
  trinite: ["Trinité", "Les chrétiens croient en un seul Dieu qui est en trois personnes qui s'aiment, le Père, le Fils (Jésus) et l'Esprit Saint."],
  esprit_saint: ["Esprit Saint", "Dieu qui agit en nous et nous donne force et lumière. C'est la troisième personne de la Trinité."],
  grace: ["Grâce", "Un cadeau de Dieu qu'on ne mérite pas, comme son amour ou son aide."],
  peche: ["Péché", "Un choix qui va contre l'amour, comme mentir ou blesser quelqu'un. Il nous éloigne de Dieu et des autres. Dieu pardonne toujours à celui qui revient."],
  resurrection: ["Résurrection", "Jésus est mort sur la croix, puis il est revenu à la vie trois jours après. C'est le cœur de la foi chrétienne."],
  crucifixion: ["Crucifixion", "Une mise à mort où l'on clouait le condamné sur une croix. Les Romains l'utilisaient il y a 2 000 ans."],
  eglise: ["Église", "Avec une majuscule, c'est l'ensemble de tous les chrétiens baptisés. Avec une minuscule, c'est le bâtiment."],
  ancien_testament: ["Ancien Testament", "La première partie de la Bible. Ses 46 livres ont été écrits avant Jésus et racontent l'histoire du peuple d'Israël."],
  nouveau_testament: ["Nouveau Testament", "La deuxième partie de la Bible. Ses 27 livres parlent de Jésus et des premiers chrétiens."],
  liturgie: ["Liturgie", "La façon dont l'Église prie ensemble, avec ses gestes, ses chants et ses textes."],
  ordinaire: ["Temps ordinaire", "Les semaines de l'année en dehors des grandes fêtes comme Noël et Pâques."],
  avent: ["Avent", "Les quatre semaines avant Noël, pour se préparer à accueillir Jésus."],
  careme: ["Carême", "Les 40 jours avant Pâques, pour prier, partager et se rapprocher de Dieu."],
  chapelet: ["Chapelet", "Un collier de perles pour prier en répétant des prières et en pensant à la vie de Jésus avec Marie."],
  mystere: ["Mystère (du chapelet)", "Une scène de la vie de Jésus ou de Marie à laquelle on pense pendant qu'on prie."],
  dizaine: ["Dizaine", "Dix « Je vous salue Marie » de suite, pendant qu'on pense à un moment de la vie de Jésus."],
  pelerinage: ["Pèlerinage", "Un voyage de prière vers un lieu saint, souvent à pied."],
  ange: ["Ange", "Un messager de Dieu. Dans les Évangiles, les anges annoncent de bonnes nouvelles."],
  doctrine: ["Doctrine", "Ce que l'Église enseigne sur la foi."],
  disciple: ["Disciple", "Quelqu'un qui suit Jésus et apprend de lui. Les douze apôtres sont ses disciples les plus proches."],
  apotre: ["Apôtre", "Un des douze amis que Jésus a choisis pour être avec lui, puis qu'il a envoyés raconter la bonne nouvelle."],
  confession: ["Confession", "Le sacrement du pardon. On dit ses fautes à un prêtre, qui garde toujours le secret, et on reçoit le pardon de Dieu."],
  confirmation: ["Confirmation", "Le sacrement qui fortifie une personne baptisée grâce à l'Esprit Saint."],
  credo: ["Credo", "Une prière qui résume ce que les chrétiens croient. Le mot veut dire « je crois »."],
  foi: ["Foi", "Faire confiance à Dieu, même quand on ne comprend pas tout."],
  saint: ["Saint", "Une personne dont la vie a montré l'amour de Dieu de façon exemplaire. Les chrétiens la prennent pour modèle."],
  tanakh: ["Tanakh", "La Bible des juifs. Presque tout son contenu se retrouve dans l'Ancien Testament des chrétiens."],
  synagogue: ["Synagogue", "Le lieu de prière et de rencontre des juifs."],
  carnet: ["Carnet", "Ton espace personnel pour écrire tes notes et tes questions."],
  pilate: ["Ponce Pilate", "Le gouverneur romain de la Judée à l'époque de Jésus. C'est lui qui a ordonné de le crucifier, vers l'an 30."],
  concile: ["Concile", "Une grande rencontre des évêques du monde entier, pour décider ensemble de questions de foi."],
  eveque: ["Évêque", "Le responsable d'un grand territoire de l'Église, appelé diocèse. Il continue la mission des apôtres."],
  orthodoxe: ["Orthodoxes", "Des chrétiens des Églises d'Orient, séparés de Rome depuis 1054. Ils gardent presque la même foi et les mêmes sacrements."],
  protestant: ["Protestants", "Des chrétiens nés de la Réforme, au XVIe siècle. Ils ne reconnaissent pas l'autorité du pape."],
  pentecote: ["Pentecôte", "La fête de la venue de l'Esprit Saint sur les apôtres, cinquante jours après Pâques."]
};
// mots reconnus automatiquement dans tous les textes (première apparition seulement)
const AUTO = [
  ["apôtres?", "apotre"], ["disciples?", "disciple"], ["évangiles?", "evangile"], ["sacrements?", "sacrement"],
  ["baptêmes?|baptisés?|baptiser", "bapteme"], ["catéchumènes?", "catechumene"], ["catéchuménat", "catechumenat"],
  ["paroisses?", "paroisse"], ["prêtres?", "pretre"], ["diacres?", "diacre"], ["pape", "pape"], ["messes?", "messe"],
  ["eucharistie", "eucharistie"], ["communion", "communion"], ["homélie", "homelie"], ["tabernacle", "tabernacle"],
  ["génuflexion", "genuflexion"], ["psaumes?", "psaume"], ["prophètes?", "prophete"], ["messie", "messie"],
  ["trinité", "trinite"], ["esprit saint", "esprit_saint"], ["grâce", "grace"], ["péchés?", "peche"], ["résurrection", "resurrection"],
  ["crucifi(?:ée?s?|xion)|crucifier", "crucifixion"], ["liturgie|liturgique", "liturgie"], ["avent", "avent"], ["carême", "careme"],
  ["chapelet", "chapelet"], ["mystères?", "mystere"], ["dizaines?", "dizaine"], ["pèlerinages?", "pelerinage"],
  ["anges?", "ange"], ["doctrine", "doctrine"], ["confession", "confession"], ["confirmation", "confirmation"],
  ["credo", "credo"], ["foi", "foi"], ["saints?", "saint"], ["tanakh", "tanakh"], ["synagogue", "synagogue"],
  ["ponce pilate", "pilate"], ["conciles?", "concile"], ["évêques?", "eveque"], ["orthodoxes", "orthodoxe"],
  ["protestants", "protestant"], ["pentecôte", "pentecote"]
];

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
  { t: "Dieu t'aime", b: "Les chrétiens croient en {{un seul Dieu|trinite}} qui a créé le monde par amour. Il ne te regarde pas de loin. Il veut une vraie relation avec toi." },
  { t: "Pourquoi tout n'est pas parfait", b: "Dieu nous a faits libres, parce que l'amour ne se force pas. Mais quand on choisit l'égoïsme, la colère ou le mensonge, on abîme les autres, on s'abîme soi-même et on s'éloigne de Dieu. Les chrétiens appellent cela le {{péché|peche}}. Ce n'est pas une insulte, c'est une blessure qui a besoin d'être soignée." },
  { t: "Jésus est Dieu fait homme", b: "Il y a 2 000 ans, Dieu est venu sur terre en Jésus, né à Bethléem. Il a enseigné, guéri, pardonné. Les chrétiens croient qu'il est à la fois vraiment homme et vraiment Dieu." },
  { t: "Il a donné sa vie pour nous", b: "Jésus n'avait rien fait de mal, et pourtant il a été condamné et crucifié par les autorités de l'époque. Les chrétiens croient qu'il a accepté cette mort par amour, pour nous libérer du mal et de la mort." },
  { t: "Pourquoi Dieu ne pardonne-t-il pas simplement ?", b: "Dire « ce n'est rien » ne répare pas une blessure. Dieu aurait pu pardonner d'un mot, l'Église le reconnaît. Mais il a choisi de venir lui-même, de partager notre vie et même notre mort, pour nous guérir de l'intérieur. En Jésus, vrai homme, c'est l'humanité qui revient vers Dieu. En Jésus, vrai Dieu, c'est Dieu qui nous rejoint. Et cela nous montre jusqu'où va son amour (Jn 15, 13). Le pardon est offert à tous, à nous de l'accueillir librement." },
  { t: "Il est vivant", b: "Le troisième jour, selon les {{Évangiles|evangile}}, Jésus est revenu à la vie. On appelle cela la {{résurrection|resurrection}}. Ses disciples sont devenus des témoins, prêts à tout pour le dire. C'est le centre de la foi." },
  { t: "L'Église, une famille", b: "Jésus a rassemblé ses {{disciples|disciple}}. Cette famille s'appelle l'{{Église|eglise}}. On y prie, on y reçoit les {{sacrements|sacrement}}, on s'entraide. Tu n'as pas à marcher seul." },
  { t: "Prier, c'est parler à Dieu", b: "Prier n'a pas besoin d'être compliqué. Parler à Dieu comme à quelqu'un qui t'écoute, c'est déjà prier. On commence tout de suite par une toute petite prière." }
];

const PRIERE_PREMIERE = "Seigneur,\nje ne sais pas encore grand-chose de toi.\nGuide-moi.\nOuvre mon cœur, éclaire mon esprit,\net aide-moi à avancer pas à pas.\nAmen.";

const PRIERES = [
  { id: "signe", t: "Le signe de croix", x: "Au nom du Père, et du Fils, et du Saint-Esprit. Amen.", tip: "On touche le front, puis le ventre (ou le haut de la poitrine), puis l'épaule gauche et enfin l'épaule droite." },
  { id: "notre", t: "Notre Père", x: "Notre Père, qui es aux cieux,\nque ton nom soit sanctifié,\nque ton règne vienne,\nque ta volonté soit faite sur la terre comme au ciel.\nDonne-nous aujourd'hui notre pain de ce jour.\nPardonne-nous nos offenses,\ncomme nous pardonnons aussi à ceux qui nous ont offensés.\nEt ne nous laisse pas entrer en tentation,\nmais délivre-nous du Mal.\nAmen.", tip: "C'est la prière que Jésus lui-même a enseignée (Matthieu 6, 9-13)." },
  { id: "je_vous_salue", t: "Je vous salue Marie", x: "Je vous salue, Marie, pleine de grâce ;\nle Seigneur est avec vous.\nVous êtes bénie entre toutes les femmes\net Jésus, le fruit de vos entrailles, est béni.\nSainte Marie, Mère de Dieu,\npriez pour nous, pauvres pécheurs,\nmaintenant et à l'heure de notre mort.\nAmen.", tip: "Les premiers mots viennent de l'ange Gabriel et d'Élisabeth (Luc 1)." },
  { id: "gloire", t: "Gloire au Père", x: "Gloire au Père, et au Fils, et au Saint-Esprit,\ncomme il était au commencement, maintenant et toujours,\net pour les siècles des siècles.\nAmen." },
  { id: "credo", t: "Le Credo (Symbole des apôtres)", x: "Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre.\nEt en Jésus-Christ, son Fils unique, notre Seigneur,\nqui a été conçu du Saint-Esprit, est né de la Vierge Marie,\na souffert sous {{Ponce Pilate|pilate}}, a été crucifié, est mort et a été enseveli,\nest descendu aux enfers, le troisième jour est ressuscité des morts,\nest monté aux cieux, est assis à la droite de Dieu le Père tout-puissant,\nd'où il viendra juger les vivants et les morts.\nJe crois en l'Esprit Saint, à la sainte Église catholique,\nà la communion des saints, à la rémission des péchés,\nà la résurrection de la chair, à la vie éternelle.\nAmen." }
];

// ---------- Bible ----------
const BIBLE_INTRO = [
  { t: "Une bibliothèque, pas un seul livre", b: "La Bible est une bibliothèque de 73 livres pour les catholiques (46 dans l'{{Ancien Testament|ancien_testament}}, 27 dans le {{Nouveau Testament|nouveau_testament}}). Écrite par de nombreux auteurs sur environ 1 000 ans." },
  { t: "Ancien et Nouveau Testament", b: "L'Ancien Testament raconte l'histoire du peuple d'Israël avant Jésus : la création, Abraham, Moïse, les rois et les {{prophètes|prophete}}. Il est écrit surtout en hébreu. Le Nouveau Testament parle de Jésus et des premiers chrétiens, écrit en grec, environ entre 50 et 100 après J.-C." },
  { t: "Dans l'ordre d'arrivée", b: "Le judaïsme est le plus ancien (Abraham, Moïse). Le christianisme naît au Ier siècle avec Jésus et ses disciples, tous juifs. L'islam apparaît au VIIe siècle. Les chrétiens reçoivent l'Ancien Testament comme la préparation à Jésus : sans lui, on ne comprend pas le Nouveau." },
  { t: "Comment lire une référence", b: "« Jn 3, 16 » = Évangile de Jean, chapitre 3, verset 16. Le chapitre est le grand bloc, le verset est la petite phrase. Les chapitres et versets ont été ajoutés plus tard pour s'y retrouver (XIIIe et XVIe siècles)." },
  { t: "Qui a écrit quoi ?", b: "Quatre auteurs racontent la vie de Jésus : Matthieu, Marc, Luc et Jean (les 4 {{Évangiles|evangile}}). Paul écrit des lettres aux premières communautés. Les {{psaumes|psaume}}, attribués surtout au roi David, sont des prières." },
  { t: "Évangile ou psaume ?", b: "L'{{Évangile|evangile}} raconte ce que Jésus a dit et fait. Le {{psaume|psaume}} est une prière que l'on chante ou lit pour répondre à Dieu. À la {{messe|messe}}, on écoute les lectures, on répond par un psaume, et on se lève pour l'Évangile." },
  { t: "Par où commencer ?", b: "Ne commence pas par le début ! Le plus simple, c'est l'Évangile selon Marc, le plus court et le plus direct. Ensuite, Luc, puis Jean." }
];

const PLANS = [
  { id: "marc", t: "Découvrir Jésus avec Marc", d: "16 jours, un chapitre par jour", lvl: "Débutant", ref: Array.from({length:16}, (_,i)=>["Mc", i+1]) },
  { id: "valeurs", t: "Les grandes valeurs de Jésus", d: "10 jours autour du pardon, de l'amour, de l'humilité et de la confiance", lvl: "Débutant", ref: [["Mt",5,"Les Béatitudes"],["Mt",6,"Prier, donner, ne pas s'inquiéter"],["Lc",10,"Le bon Samaritain"],["Lc",15,"Le fils retrouvé"],["Jn",13,"Le lavement des pieds"],["Mt",25,"Servir les plus petits"],["Lc",18,"Prier avec humilité"],["Jn",15,"Demeurer dans l'amour"],["Mt",18,"Pardonner"],["1Co",13,"L'hymne à l'amour"]] },
  { id: "chrono", t: "Le grand récit, dans l'ordre", d: "20 étapes, de la Création à l'Église naissante", lvl: "Intermédiaire", ref: [["Gn",1,"La création"],["Gn",12,"Abraham"],["Ex",3,"Moïse et le buisson ardent"],["Ex",20,"Les 10 commandements"],["Jos",1,"Entrée en Terre promise"],["1S",16,"David"],["Ps",23,"Le Seigneur est mon berger"],["Is",53,"Le serviteur souffrant"],["Lc",1,"Annonciation"],["Lc",2,"Noël"],["Mt",5,"Le Sermon sur la montagne"],["Jn",11,"Lazare"],["Mc",14,"La Passion"],["Mc",15,"La croix"],["Lc",24,"Résurrection"],["Ac",2,"Pentecôte"],["Ac",9,"Paul"],["Rm",8,"Vie dans l'Esprit"],["1Co",13,"L'amour"],["Ap",21,"Tout est renouvelé"]] }
];

// ---------- Jésus : prophéties (prudence assumée) ----------
const PROPHETIES = [
  { ref: "Mi 5, 2", t: "Né à Bethléem", x: "Le prophète Michée (VIIIe s. av. J.-C.) annonce qu'un chef viendra de Bethléem. Matthieu 2 et Luc 2 placent la naissance de Jésus là.", c: "foi" },
  { ref: "Is 7, 14", t: "Le signe de la vierge", x: "Isaïe annonce un enfant « Emmanuel » (« Dieu avec nous »). Matthieu 1 le relie à Jésus. Le mot hébreu 'almah' peut vouloir dire « jeune femme » : la version grecque ancienne (la Septante) traduit par « vierge ».", c: "debat" },
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
    { q: "Que veut dire « Évangile » ?", o: ["Histoire ancienne", "Bonne nouvelle", "Loi de Dieu"], a: 1, e: "« Évangile » vient du grec euangelion, qui veut dire bonne nouvelle." },
    { q: "Combien de disciples proches (apôtres) Jésus a-t-il choisis ?", o: ["7", "12", "40"], a: 1, e: "Les Douze, symbole des 12 tribus d'Israël." },
    { q: "Que fête-t-on à Pâques ?", o: ["La naissance de Jésus", "La résurrection de Jésus", "La Pentecôte"], a: 1, e: "Pâques célèbre la victoire de Jésus sur la mort." }
  ]},
  { lvl: "Niveau 2 — Ceux qu'il rencontre", qs: [
    { q: "Quel pêcheur devient le chef des apôtres ?", o: ["Pierre", "Jean-Baptiste", "Judas"], a: 0, e: "Simon, que Jésus appelle Pierre (« roc »). Mt 16, 18." },
    { q: "Qui est monté sur un sycomore pour voir Jésus ?", o: ["Zachée", "Nicodème", "Lazare"], a: 0, e: "Zachée, collecteur d'impôts, change de vie après avoir invité Jésus chez lui (Lc 19)." },
    { q: "Qui Jésus rencontre-t-il près du puits de Jacob ?", o: ["Une femme samaritaine", "Une veuve", "Marthe"], a: 0, e: "C'est la Samaritaine. Jésus lui parle malgré les barrières de son époque (Jn 4)." },
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
  { t: "La liturgie de la Parole", b: "On est assis pour les lectures et le {{psaume|psaume}}. On se lève pour l'{{Évangile|evangile}}. Puis vient l'homélie, où le prêtre explique les textes." },
  { t: "La liturgie de l'eucharistie", b: "Le prêtre prépare le pain et le vin. On reste debout, à genoux ou assis selon les lieux, en suivant l'assemblée. Il y a le Notre Père, puis l'échange de paix (on serre la main)." },
  { t: "La {{communion|communion}}", b: "Les catholiques baptisés, qui se sentent prêts, vont recevoir l'eucharistie. Toi, tu peux rester à ta place, ou avancer les bras croisés sur la poitrine pour recevoir une bénédiction. Personne ne te jugera." },
  { t: "L'envoi", b: "Le prêtre bénit l'assemblée et envoie les fidèles en leur disant « Allez dans la paix du Christ ». Tu peux saluer le prêtre à la sortie, c'est un bon moment pour lui dire que tu découvres." }
];

const CALENDRIER = [
  { d: "2026-11-22", t: "Christ, Roi de l'univers", b: "Dernier dimanche de l'année liturgique. On célèbre Jésus comme roi d'amour." },
  { d: "2026-11-29", t: "1er dimanche de l'{{Avent|avent}}", b: "C'est le début de l'année liturgique, quatre semaines pour se préparer à Noël." },
  { d: "2026-12-08", t: "Immaculée Conception", b: "On célèbre Marie préservée du péché dès sa conception, pour être la mère de Jésus." },
  { d: "2026-12-25", t: "Noël", b: "Naissance de Jésus à Bethléem." },
  { d: "2027-01-03", t: "Épiphanie", b: "Les mages viennent adorer Jésus. Il est là pour tous les peuples." },
  { d: "2027-02-10", t: "Mercredi des Cendres", b: "Début du {{Carême|careme}}, 40 jours de préparation à Pâques." },
  { d: "2027-03-28", t: "Pâques", b: "La résurrection de Jésus, la plus grande fête chrétienne. Beaucoup de baptêmes d'adultes ont lieu la veille, à la Vigile pascale." },
  { d: "2027-05-06", t: "Ascension", b: "Jésus retourne auprès du Père, 40 jours après Pâques." },
  { d: "2027-05-16", t: "Pentecôte", b: "L'Esprit Saint descend sur les apôtres. C'est la naissance publique de l'Église." }
];

const SACREMENTS = [
  { t: "Baptême", b: "On devient chrétien, enfant de Dieu et membre de l'Église. Les péchés sont pardonnés. C'est la porte de tous les autres sacrements. Jésus dit « Si quelqu'un ne naît pas de l'eau et de l'Esprit, il ne peut entrer dans le royaume de Dieu » (Jn 3, 5), et envoie ses disciples baptiser (Mt 28, 19)." },
  { t: "Confirmation", b: "L'Esprit Saint fortifie le baptisé, comme à la Pentecôte." },
  { t: "Eucharistie", b: "On reçoit Jésus lui-même, présent dans le pain consacré. Source et sommet de la vie chrétienne." },
  { t: "Réconciliation", b: "Le sacrement du pardon. On confie ses fautes à un prêtre et on reçoit le pardon de Dieu." },
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
  "Tu contactes une {{paroisse|paroisse}}. Un prêtre ou une équipe t'accueille, sans engagement.",
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
    { t: "Tu n'as pas besoin d'être parfait", x: "Les Évangiles montrent que Jésus s'adresse d'abord à ceux qui se sentent éloignés, comme les collecteurs d'impôts, les malades ou les étrangers. Tu es attendu tel que tu es.", c: "foi", s: "Lc 5, 31-32" },
    { t: "Tu peux poser toutes les questions", x: "Jésus invite simplement « Venez et voyez » (Jn 1, 39). La foi chrétienne se vit en cherchant, pas en se taisant.", c: "foi", s: "Jn 1, 39" }
  ],
  revenant: [
    { t: "Tu es attendu", x: "Dans la parabole du fils prodigue, le père voit son fils de loin et court vers lui avant même qu'il parle. Revenir n'a pas besoin de grand discours.", c: "foi", s: "Lc 15, 11-32" },
    { t: "Le pardon est un sacrement", x: "La confession permet de repartir d'un cœur léger, même après des années. Il suffit de dire « ça fait longtemps ». Le prêtre est là pour t'aider.", c: "foi", s: "Jn 20, 22-23" },
    { t: "Reprendre sans te noyer", x: "Pas besoin de tout rattraper. Un chapitre d'Évangile, une prière, une messe, et on reprend un petit pas à la fois.", c: "foi", s: "" }
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
    { t: "Deux lectures de certains textes", x: "Isaïe 53 est lu différemment : les chrétiens y voient Jésus, la tradition juive y voit souvent Israël. Nous te montrons les deux lectures.", c: "debat", s: "Is 53" },
    { t: "Respect", x: "L'Église a clairement condamné l'antisémitisme et affirme l'alliance jamais révoquée de Dieu avec Israël (Nostra Aetate, 1965).", c: "foi", s: "Nostra Aetate 4" }
  ],
  athee: [
    { t: "Jésus a-t-il existé ?", x: "Oui. Tacite, Flavius Josèphe et Pline le Jeune en parlent. La grande majorité des historiens, croyants ou non, admettent son existence et sa crucifixion sous {{Ponce Pilate|pilate}}.", c: "fait", s: "Tacite, Annales 15, 44" },
    { t: "Des textes bien conservés", x: "On possède plus de 5 000 manuscrits grecs du Nouveau Testament, dont des fragments très anciens (comme le papyrus p52, début du IIe siècle). C'est beaucoup plus que pour la plupart des textes antiques.", c: "fait", s: "Papyrus Rylands p52" },
    { t: "Les doutes sont bienvenus", x: "Thomas, l'apôtre, voulait des preuves, et Jésus l'a accueilli (Jn 20). La foi n'est pas l'absence de questions.", c: "foi", s: "Jn 20, 24-29" },
    { t: "La question centrale", x: "Les faits historiques ne prouvent pas la foi, mais ils montrent que ce n'est pas une légende tardive. La vraie question reste « Que fais-je de Jésus ? »", c: "foi", s: "" }
  ],
  bouddhiste: [
    { t: "Un terrain commun", x: "Compassion, paix intérieure, détachement, attention à ceux qui souffrent. Tu retrouveras ces valeurs chez Jésus (Béatitudes, bon Samaritain).", c: "foi", s: "Mt 5" },
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
  { q: "Pourquoi Dieu ne pardonne-t-il pas tout simplement, sans envoyer Jésus ?", k: "pardon pardonner jésus croix pourquoi dieu simplement envoyer fils péché sauver", a: "Dieu aurait pu pardonner d'un mot, l'Église le dit. Mais un simple « tant pis » ne guérit pas le cœur humain ni les blessures du monde. Il a choisi de venir lui-même, de vivre comme nous et de traverser la mort, pour nous guérir de l'intérieur et nous montrer à quel point il nous aime. Le pardon est offert à tous, et chacun reste libre de l'accueillir." },
  { q: "C'est quoi le péché, concrètement ?", k: "péché mal faute définition", a: "C'est un choix qui va contre l'amour de Dieu et des autres, comme le mensonge, la violence ou l'égoïsme. Cela blesse les autres, nous abîme et nous éloigne de Dieu. Dieu ne cherche pas à nous humilier, il cherche à nous guérir." },
  { q: "Pourquoi les catholiques prient-ils Marie ?", k: "marie prier prière vénérer", a: "Les catholiques ne l'adorent pas, on adore Dieu seul. On demande à Marie de prier pour nous, comme on demande à un ami de prier pour soi. C'est le sens du « priez pour nous » du Je vous salue Marie." },
  { q: "Faut-il être baptisé pour aller à la messe ?", k: "baptisé baptême messe aller entrer", a: "Non. Tout le monde peut venir assister à la messe. Seuls les baptisés qui se sont préparés reçoivent la communion, mais tu es le bienvenu pour prier et écouter." },
  { q: "Pourquoi est-il important d'être baptisé ?", k: "baptême baptisé important pourquoi", a: "Le baptême fait de toi un enfant de Dieu et un membre de l'Église. C'est Jésus lui-même qui demande de baptiser (Mt 28, 19) et qui dit qu'il faut naître d'eau et d'Esprit (Jn 3, 5)." },
  { q: "Puis-je devenir catholique à l'âge adulte ?", k: "adulte catéchuménat devenir baptême âge", a: "Oui, chaque année des milliers d'adultes sont baptisés en France. On suit un chemin appelé catéchuménat, avec une paroisse." },
  { q: "Quelle est la différence entre catholiques, protestants et orthodoxes ?", k: "protestant orthodoxe différence catholique", a: "Ce sont trois grandes familles de chrétiens. Tous croient en Jésus. Les catholiques reconnaissent l'autorité du pape, les orthodoxes se sont séparés en 1054, les protestants au XVIe siècle. Ce qui nous unit est plus grand que ce qui nous divise." },
  { q: "Est-ce que la Bible est vraie ?", k: "bible vraie vérité histoire fiable", a: "L'Église enseigne que la Bible est la Parole de Dieu écrite par des hommes. On y trouve de l'histoire, de la poésie, des récits symboliques. On la lit en cherchant le message que Dieu y met." },
  { q: "Pourquoi la messe est-elle si importante ?", k: "messe dimanche importante pourquoi", a: "Parce que Jésus a dit « Faites cela en mémoire de moi ». La messe est la rencontre de la communauté avec Jésus, dans sa Parole et dans l'eucharistie." },
  { q: "Que se passe-t-il quand on se confesse ?", k: "confession confesser pardon prêtre péché", a: "On dit ses fautes à un prêtre, qui est tenu au secret absolu. Il donne une pénitence et prononce le pardon de Dieu. Beaucoup en sortent allégés." },
  { q: "Est-ce que Dieu me pardonne vraiment ?", k: "pardon pardonne péché honte coupable", a: "Les Évangiles montrent toujours un Dieu qui pardonne à celui qui revient (Lc 15). Il n'y a aucun péché plus grand que sa miséricorde." },
  { q: "Pourquoi y a-t-il du mal et de la souffrance ?", k: "mal souffrance pourquoi dieu injustice", a: "C'est l'une des plus grandes questions. Les chrétiens ne la contournent pas. Dieu n'est pas absent de la souffrance, il l'a partagée sur la croix. La réponse est une présence plus qu'une explication." },
  { q: "Comment prier si je ne sais pas comment faire ?", k: "prier prière comment débuter commencer", a: "Parle à Dieu avec tes mots. Dis merci, pardon, aide-moi. Puis apprends peu à peu le Notre Père et le Je vous salue Marie." },
  { q: "Le chapelet, c'est quoi ?", k: "chapelet rosaire marie perles", a: "Une prière de méditation où l'on répète des Je vous salue Marie en pensant à la vie de Jésus. Les perles aident à compter." },
  { q: "Faut-il faire bénir son chapelet ?", k: "chapelet bénir bénédiction acheter", a: "On peut demander à un prêtre ou à un diacre de bénir un chapelet ou une croix. Ce n'est pas obligatoire, mais c'est une belle façon de le consacrer à la prière." },
  { q: "Pourquoi Jésus et pas un autre ?", k: "jésus unique pourquoi religion autre", a: "Pour les chrétiens, Jésus n'est pas seulement un sage, il se dit lui-même « le chemin, la vérité et la vie » (Jn 14, 6). On t'invite à lire l'Évangile et à juger par toi-même." },
  { q: "Le catholicisme est-il contre la science ?", k: "science foi big bang évolution galilée", a: "Non. Des prêtres comme Lemaître (Big Bang) ou des moines comme Mendel (génétique) ont fait de grandes découvertes. L'affaire Galilée (XVIIe siècle) est un épisode douloureux et complexe qui n'est pas le reflet de toute l'histoire." },
  { q: "Quelle est la différence entre un psaume et un évangile ?", k: "psaume évangile différence lecture", a: "Un psaume est une prière du peuple d'Israël, qu'on chante ou qu'on dit. Un évangile raconte la vie et les paroles de Jésus." },
  { q: "Comment trouver une messe près de chez moi ?", k: "messe horaires proche trouver paroisse", a: "Le site officiel messes.info (Église catholique en France) donne les horaires et lieux. Tu peux aussi pousser la porte d'une église ou appeler la paroisse." }
];

// ---------- Activités hebdo ----------
const ACTIVITES = [
  { t: "Un dessin de lumière", x: "Dessine ce que « lumière » veut dire pour toi cette semaine. Pas besoin de savoir dessiner." },
  { t: "Une bonne action discrète", x: "Fais un petit service sans le dire, comme un message, un sourire ou un coup de main." },
  { t: "Cinq minutes de silence", x: "Éteins ton téléphone et reste 5 minutes en silence en disant « Seigneur, je suis là »." },
  { t: "Un psaume du soir", x: "Lis le Psaume 23 le soir, lentement, deux fois." },
  { t: "Une lettre de gratitude", x: "Écris trois choses pour lesquelles tu es reconnaissant, et remercie Dieu." },
  { t: "Un chant", x: "Cherche un chant chrétien en français qui te touche et écoute-le en prière." },
  { t: "Une intention pour quelqu'un", x: "Pense à une personne et prie pour elle cette semaine, même en une phrase." }
];

// yt = identifiant YouTube à renseigner une fois la vidéo choisie et vérifiée (la vidéo s'affiche alors dans l'app)
const VIDEOS = [
  { t: "Frère Paul-Adrien répond à 5 grandes questions", w: "Frère Paul-Adrien, émission 5 Go(o)d Questions", d: "Sur la vie, la mort et Dieu. Un entretien pour les curieux et les sceptiques.", yt: "YZY5xiQJESo", u: "https://www.youtube.com/watch?v=YZY5xiQJESo" },
  { t: "Épiphanie, qui sont les Rois Mages ?", w: "Frère Paul-Adrien, Radio Courtoisie", d: "Ont-ils existé ? Une explication claire d'une fête de Noël.", yt: "Ia5DiWWDC8Q", u: "https://www.youtube.com/watch?v=Ia5DiWWDC8Q" },
  { t: "Sa chaîne YouTube", w: "Frère Paul-Adrien", d: "Toutes ses vidéos en français, pour continuer à découvrir.", yt: null, u: "https://www.youtube.com/theopedie" },
  { t: "Le parcours « Je crois en Dieu »", w: "Diocèse de Paris", d: "Un parcours en vidéo, avec le frère Paul-Adrien, pour découvrir la foi pas à pas.", yt: null, u: "https://dioceseparis.fr/-le-parcours-je-crois-en-dieu-.html" },
  { t: "Comment prier quand on débute", w: "Chaînes catholiques", d: "Des conseils simples pour commencer.", q: "comment prier débutant catholique", yt: null },
  { t: "Prier le chapelet", w: "Chaînes catholiques", d: "Apprendre à le prier pas à pas.", q: "prier le chapelet pas à pas débutant", yt: null }
];

// ---------- Repères : frise et carte (trajet pas à pas) ----------
// lieux = [nom, longitude, latitude, décalageX, décalageY]  ; trajet = suite de lieux reliés
const REPERES = [
  { id: "abraham", court: "−1800", date: "Vers 1800 av. J.-C.", t: "Abraham, le point de départ",
    b: "Tout commence avec Abraham. Dieu lui demande de quitter son pays et de partir vers une terre inconnue. Il le suit, et Dieu lui promet une grande famille. Juifs, chrétiens et musulmans voient en lui un père dans la foi.",
    note: "Les dates de cette époque sont approximatives.",
    lieux: [["Our", 46.1, 30.96, 10, 18], ["Harran", 39.03, 36.86, 10, -8], ["Canaan", 35.26, 32.2, -12, 22]], trajet: [0, 1, 2],
    vue: [30, 28, 50, 40] },
  { id: "moise", court: "−1250", date: "Vers 1250 av. J.-C.", t: "Moïse libère un peuple",
    b: "Le peuple d'Israël est esclave en Égypte. Dieu envoie Moïse pour le libérer. Après une longue traversée du désert, Moïse reçoit les dix commandements au mont Sinaï, avant d'arriver aux portes de la Terre promise.",
    note: "Les historiens débattent de la date exacte.",
    lieux: [["Égypte", 31.8, 30.8, -12, -10], ["Sinaï", 33.97, 28.54, -14, 22], ["Terre promise", 35.5, 31.9, 14, 6]], trajet: [0, 1, 2],
    vue: [28, 26, 42, 36] },
  { id: "david", court: "−1000", date: "Vers 1000 av. J.-C.", t: "David et Jérusalem",
    b: "David devient roi et fait de Jérusalem sa capitale. On lui attribue beaucoup de psaumes, ces prières qui se chantent encore aujourd'hui.",
    lieux: [["Bethléem", 35.2, 31.7, -14, 26], ["Jérusalem", 35.22, 31.78, 14, 4]], trajet: [0, 1],
    vue: [31, 29, 40, 35] },
  { id: "prophetes", court: "−586", date: "Du VIIIe au VIe siècle av. J.-C.", t: "Les prophètes et l'exil",
    b: "Des prophètes comme Isaïe rappellent au peuple de revenir vers Dieu et annoncent la venue d'un Sauveur. Vers 586 av. J.-C., Jérusalem est détruite et beaucoup partent en exil à Babylone. Ils reviendront, plus de cinquante ans plus tard.",
    lieux: [["Jérusalem", 35.22, 31.78, -14, 22], ["Babylone", 44.42, 32.54, 0, -14]], trajet: [0, 1],
    vue: [30, 26, 50, 38] },
  { id: "naissance", court: "−5", date: "Entre 7 et 4 av. J.-C.", t: "Jésus naît à Bethléem", jesus: true,
    b: "Jésus naît à Bethléem et grandit à Nazareth, en Galilée. Il est juif, comme tous ses premiers disciples. Nous comptons les années à partir de sa naissance, même si les historiens pensent qu'il est né quelques années avant l'an 1.",
    lieux: [["Bethléem", 35.2, 31.7, 14, 22], ["Nazareth", 35.3, 32.7, 14, -4]], trajet: [0, 1],
    vue: [32.5, 30, 38.5, 34] },
  { id: "croix", court: "30", date: "Vers l'an 30", t: "Jésus donne sa vie et ressuscite",
    b: "Après environ trois ans à enseigner et à guérir, Jésus est arrêté à Jérusalem, condamné et crucifié. Ses disciples affirment l'avoir revu vivant. Cinquante jours plus tard, à la {{Pentecôte|pentecote}}, l'Esprit Saint les remplit de courage et l'Église naît.",
    lieux: [["Nazareth", 35.3, 32.7, 14, -4], ["Jérusalem", 35.22, 31.78, 16, 8]], trajet: [0, 1],
    vue: [32.5, 30, 38.5, 34] },
  { id: "paul", court: "60", date: "Entre 45 et 60 environ", t: "Paul porte l'Évangile jusqu'à Rome",
    b: "Paul, d'abord ennemi des chrétiens, change de vie après avoir rencontré Jésus sur le chemin de Damas. Il voyage ensuite pendant des années, en Syrie, en Turquie et en Grèce. Il arrive à Rome, prisonnier, vers l'an 60, et l'Évangile continue de se répandre.",
    lieux: [["Damas", 36.3, 33.5, 12, 4], ["Antioche", 36.16, 36.2, 12, -2], ["Éphèse", 27.34, 37.94, -10, -12], ["Corinthe", 22.9, 37.9, -6, 22], ["Rome", 12.5, 41.9, 0, -14]], trajet: [0, 1, 2, 3, 4],
    vue: [8, 28, 42, 46] },
  { id: "constantin", court: "313", date: "En 313 et 325", t: "L'Église sort de l'ombre",
    b: "Pendant trois siècles, les chrétiens sont souvent persécutés. En 313, l'empereur Constantin leur accorde la liberté. En 325, à Nicée, les {{évêques|eveque}} se réunissent et posent les bases du Credo, la prière de la foi que l'on dit encore à la messe.",
    lieux: [["Milan", 9.19, 45.46, 12, 4], ["Nicée", 29.72, 40.43, 0, -14]], trajet: [0, 1],
    vue: [6, 33, 40, 46] },
  { id: "islam", court: "610", date: "Vers 610", t: "Une nouvelle religion naît en Arabie",
    b: "Vers 610, Mahomet commence à prêcher à La Mecque. C'est la naissance de l'islam, qui respecte Jésus comme un grand prophète et Marie comme sa mère. Juifs, chrétiens et musulmans se retrouvent autour d'Abraham.",
    lieux: [["La Mecque", 39.83, 21.43, -10, 22]], trajet: [],
    vue: [28, 18, 52, 36] },
  { id: "aujourdhui", court: "Auj.", date: "Aujourd'hui", t: "Tu arrives dans cette histoire",
    b: "L'Église a traversé deux mille ans. Elle a connu des séparations douloureuses, en 1054 avec les {{orthodoxes|orthodoxe}} et au XVIe siècle avec les {{protestants|protestant}}, mais aussi un grand renouveau avec le {{concile|concile}} Vatican II, entre 1962 et 1965. Aujourd'hui, il y a environ 1,4 milliard de catholiques dans le monde, et toi, tu commences.",
    lieux: [["Rome", 12.5, 41.9, 0, -14]], trajet: [],
    vue: [8, 20, 52, 46], fin: true }
];

// contours simplifiés (longitude, latitude) pour la carte
const GEO = {
  eurasie: [[8,36.9],[9.8,37.3],[10.9,37.0],[10.5,35.7],[10.8,34.7],[10.1,33.9],[11.5,33.1],[13,32.9],[15.2,32.4],[17,31.1],[19.5,30.3],[20.1,32.1],[21.5,32.9],[22.6,32.8],[24,32.0],[25.2,31.6],[27,31.3],[29.9,31.2],[31,31.5],[32.3,31.3],[34.2,31.3],[34.9,32.5],[35.1,33.1],[35.5,33.9],[35.8,34.6],[35.9,35.6],[36.0,36.0],[36.2,36.7],[35.5,36.6],[34.7,36.8],[34,36.2],[32.5,36.1],[31,36.9],[30.5,36.6],[29,36.6],[28,36.7],[27.5,37.0],[27.2,37.8],[26.8,38.4],[26.5,39.5],[26.2,40.1],[29,41.1],[29.3,41.3],[52,46],[52,20],[8,20]],
  europe: [[8,46],[28,46],[27.8,41.2],[26.9,40.6],[26.2,40.2],[25.9,40.85],[24.4,40.9],[23.7,40.0],[22.8,40.6],[22.6,40.0],[22.9,39.3],[23.5,38.4],[24.0,38.0],[24.0,37.7],[23.0,37.95],[22.8,37.5],[23.2,36.5],[22.4,36.5],[21.7,36.8],[21.3,37.9],[21.4,38.3],[20.7,38.9],[20.2,39.4],[19.5,40.4],[19.4,41.5],[18.5,42.4],[16.0,43.5],[14.5,44.8],[13.9,44.8],[13.6,45.7],[12.3,45.3],[12.4,44.3],[13.6,43.6],[14.5,42.2],[15.9,41.9],[16.5,41.2],[17.5,40.9],[18.5,40.2],[17.2,40.4],[16.6,39.7],[17.1,39.1],[16.5,38.4],[15.7,38.0],[15.8,38.8],[16.1,39.1],[15.8,40.0],[14.8,40.5],[14.2,40.8],[13.0,41.3],[12.2,41.8],[11.1,42.4],[10.5,43.0],[10.2,43.8],[8.9,44.4],[8,43.9]],
  sicile: [[12.4,38.1],[13.5,38.2],[15.6,38.3],[15.1,37.3],[15.1,36.7],[14.5,36.8],[12.9,37.6]],
  sardaigne: [[8.2,41.0],[9.2,41.2],[9.7,40.5],[9.6,39.2],[8.9,39.0],[8.4,39.5]],
  crete: [[23.5,35.3],[26.3,35.3],[26.2,35.0],[24,35.0]],
  chypre: [[32.3,35.0],[34.5,35.6],[34.0,35.0],[33,34.6]],
  noire: [[29.2,41.2],[28,41.9],[27.8,43],[28.6,44.2],[29.6,45.2],[30.2,46],[33,46],[33.5,45.2],[35,45],[36.6,45.3],[37.8,44.7],[39.5,43.4],[41.5,42.2],[41.5,41.5],[39,41.1],[36.5,41.3],[35,42],[33,42],[31,41.1]],
  rouge: [[32.55,30.0],[33.0,29.0],[33.7,27.6],[34.8,25.5],[36.0,23.0],[37.2,21.0],[38.0,20.0],[43,20],[40.9,21.0],[39.4,22.0],[38.4,24.0],[36.8,26.0],[35.5,27.8],[34.9,29.5],[34.65,28.2],[34.25,27.75],[33.6,28.6],[32.95,29.6]],
  golfe: [[48.4,30.1],[47.9,29.4],[48.6,28.5],[49.6,27],[50.2,26],[50.8,25.1],[51.6,24.6],[52,24.3],[52,27.4],[51,28.8],[50,30]],
  nil: [[31.2,31.2],[31.2,30.0],[31.6,27],[32.6,25.7],[32.9,24.0],[32.9,20]]
};

BASES.forEach((x, i) => x.i = ["dieu", "blessure", "incarnation", "croix", "pont", "tombeau", "eglise", "priere"][i]);
BIBLE_INTRO.forEach((x, i) => x.i = ["bibliotheque", "livre", "ordre", "ref", "auteurs", "psaume", "marche"][i]);
