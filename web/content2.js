// Données de la v3 : figures, badges, ressources, journal, carte de la vie de Jésus, expert.

const AMAZON_TAG = ""; // mets ici ton identifiant partenaire Amazon (ex. monid-21) pour activer les liens affiliés
const amazon = q => `https://www.amazon.fr/s?k=${encodeURIComponent(q)}${AMAZON_TAG ? "&tag=" + AMAZON_TAG : ""}`;
const gsearch = q => `https://www.google.com/search?q=${encodeURIComponent(q)}`;

// ---------- figures (portraits dessinés, sans visage précis) ----------
const FIG_GROUPS = [
  { id: "famille", t: "Jésus et sa famille" },
  { id: "apotres", t: "Autour de Jésus" },
  { id: "at", t: "Avant Jésus" },
  { id: "histoire", t: "Saints de l'histoire" },
  { id: "proches", t: "Saints plus proches de nous" }
];
// v = apparence ; attr = objet qui les reconnaît
const FIGURES = [
  { id: "jesus", g: "famille", an: -5, nom: "Jésus", role: "Le Christ, Fils de Dieu pour les chrétiens", dates: "Né entre 7 et 4 av. J.-C., mort vers l'an 30", fete: "Noël le 25 décembre et Pâques", patron: null,
    bio: "Jésus est né à Bethléem et a grandi à Nazareth. Pendant environ trois ans, il a parcouru la Galilée et la Judée pour enseigner, guérir et pardonner. Il a été crucifié à Jérusalem.",
    pourquoi: "Tout le christianisme repose sur lui. Les chrétiens croient qu'il est revenu à la vie et qu'on peut le rencontrer aujourd'hui.", ref: "Évangile selon Marc, chapitre 1",
    v: { skin: "#e3b48a", hair: "#6b4a30", style: "long", beard: "#6b4a30", robe: "#f5efe4", mantle: "#b9483b", attr: "croixhalo", bg: ["#fdeccd", "#f7c9a0"] } },
  { id: "marie", g: "famille", an: -18, nom: "Marie", role: "Mère de Jésus", dates: "Une jeune femme de Nazareth", fete: "Le 15 août (Assomption) et le 8 décembre", patron: "Patronne principale de la France",
    bio: "Marie est une jeune femme de Nazareth. Un ange lui annonce qu'elle sera la mère de Jésus, et elle répond « oui ». Elle l'accompagne jusqu'au pied de la croix.",
    pourquoi: "Les catholiques la prient comme une mère qui prie avec eux. On ne l'adore pas, on lui demande de prier pour nous.", ref: "Évangile selon Luc, chapitre 1",
    v: { skin: "#ecc19a", hair: "#4e3a2a", style: "veil", robe: "#f4efe6", mantle: "#4f7fb0", attr: "etoiles", bg: ["#dcebf7", "#fdeccd"] } },
  { id: "joseph", g: "famille", an: -20, nom: "Joseph", role: "Charpentier de Nazareth, époux de Marie", dates: "Au temps de Jésus", fete: "Le 19 mars et le 1er mai (saint Joseph travailleur)", patron: "Patron des travailleurs et de l'Église entière",
    bio: "Joseph est charpentier à Nazareth. Il accueille Marie et élève Jésus comme son fils. Les Évangiles ne rapportent aucune parole de lui, mais il agit toujours avec confiance.",
    pourquoi: "Il montre une force tranquille et discrète, faite de fidélité et de travail.", ref: "Évangile selon Matthieu, chapitre 1",
    v: { skin: "#e0ad84", hair: "#6a4c34", style: "short", beard: "#6a4c34", robe: "#9a7b4f", mantle: "#c9a66b", attr: "lys", bg: ["#e9efe0", "#fdeccd"] } },
  { id: "jeanbaptiste", g: "famille", an: -6, nom: "Jean le Baptiste", role: "Le cousin de Jésus qui prépare sa venue", dates: "Né quelques mois avant Jésus", fete: "Le 24 juin", patron: null,
    bio: "Jean vit dans le désert et invite chacun à changer de vie. Il baptise dans le Jourdain, et il y baptise Jésus. Il annonce « voici l'agneau de Dieu ».",
    pourquoi: "Il aide à se tourner vers Jésus et il reste humble, comme un ami qui s'efface pour laisser la place.", ref: "Évangile selon Marc, chapitre 1",
    v: { skin: "#d8a47c", hair: "#6a4a2e", style: "long", beard: "#6a4a2e", robe: "#b08a5a", mantle: "#8a6a40", attr: "coquille", bg: ["#dcebf7", "#e9efe0"] } },
  { id: "pierre", g: "apotres", an: -1, nom: "Pierre", role: "Pêcheur de Galilée, chef des apôtres", dates: "Mort à Rome vers 64 selon la tradition", fete: "Le 29 juin", patron: null,
    bio: "Simon est pêcheur sur le lac de Galilée. Jésus l'appelle et lui donne le nom de Pierre, qui veut dire « roc ». Il se trompe parfois, il renie même Jésus, puis il est pardonné.",
    pourquoi: "Il montre qu'on peut tomber et se relever. Les catholiques le considèrent comme le premier pape.", ref: "Évangile selon Matthieu, chapitre 16",
    v: { skin: "#d9a67c", hair: "#9a9a9a", style: "short", beard: "#b0b0b0", robe: "#5b88b0", mantle: "#e8d9b4", attr: "cles", bg: ["#dcebf7", "#fdeccd"] } },
  { id: "paul", g: "apotres", an: 5, nom: "Paul", role: "Ancien ennemi des chrétiens devenu missionnaire", dates: "Mort à Rome vers 64 selon la tradition", fete: "Le 29 juin", patron: null,
    bio: "Paul persécutait les chrétiens. Sur la route de Damas, il rencontre Jésus et sa vie change. Il voyage ensuite en Turquie, en Grèce et jusqu'à Rome, et il écrit des lettres aux premières communautés.",
    pourquoi: "Ses lettres forment une grande partie du Nouveau Testament. Il est la preuve qu'on peut changer de route.", ref: "Actes des Apôtres, chapitre 9",
    v: { skin: "#d9a984", hair: "#4a3a30", style: "bald", beard: "#4a3a30", robe: "#a9573b", mantle: "#f1e6d0", attr: "livreepee", bg: ["#fdeccd", "#f7c9a0"] } },
  { id: "jean", g: "apotres", an: 6, nom: "Jean", role: "Apôtre, « le disciple que Jésus aimait »", dates: "Vécut jusqu'à un grand âge selon la tradition", fete: "Le 27 décembre", patron: null,
    bio: "Jean est un jeune pêcheur appelé par Jésus. Il reste près de lui jusqu'à la croix. La tradition lui attribue le quatrième Évangile, ce que certains spécialistes discutent.",
    pourquoi: "Son Évangile commence par « Au commencement était la Parole » et parle beaucoup d'amour.", ref: "Évangile selon Jean, chapitre 1",
    v: { skin: "#ebbf98", hair: "#7a5a3a", style: "long", robe: "#8bb59c", mantle: "#f1e6d0", attr: "calice", bg: ["#e9efe0", "#fdeccd"] } },
  { id: "madeleine", g: "apotres", an: 5, nom: "Marie-Madeleine", role: "Première à voir Jésus ressuscité", dates: "Au temps de Jésus", fete: "Le 22 juillet", patron: null,
    bio: "Marie de Magdala suit Jésus avec d'autres femmes. Elle est présente à la croix. Le matin de Pâques, elle va au tombeau et elle est la première à voir Jésus vivant.",
    pourquoi: "Jésus lui confie d'annoncer la nouvelle aux apôtres, ce qui lui vaut le nom d'« apôtre des apôtres ».", ref: "Évangile selon Jean, chapitre 20",
    v: { skin: "#e8bb94", hair: "#8a4a2a", style: "long", robe: "#a85a6a", mantle: "#e8d4c4", attr: "vase", bg: ["#f7dcdc", "#fdeccd"] } },
  { id: "zachee", g: "apotres", an: 0, nom: "Zachée", role: "Collecteur d'impôts de Jéricho", dates: "Au temps de Jésus", fete: null, patron: null,
    bio: "Zachée est petit et riche, et mal vu de tous. Pour voir Jésus passer, il monte dans un arbre. Jésus s'invite chez lui, et Zachée décide de rendre l'argent qu'il avait pris.",
    pourquoi: "Il montre que Jésus s'adresse d'abord à ceux qu'on juge perdus.", ref: "Évangile selon Luc, chapitre 19",
    v: { skin: "#dca780", hair: "#5a4030", style: "short", robe: "#6f9a6a", mantle: "#d8c28a", attr: "arbre", bg: ["#e9efe0", "#fdf0d2"] } },
  { id: "thomas", g: "apotres", an: 0, nom: "Thomas", role: "L'apôtre qui voulait des preuves", dates: "Au temps de Jésus", fete: "Le 3 juillet", patron: null,
    bio: "Thomas n'était pas là quand Jésus est apparu aux autres. Il dit qu'il ne croira que s'il voit. Jésus revient et lui montre ses blessures. Thomas répond « Mon Seigneur et mon Dieu ».",
    pourquoi: "Il rassure ceux qui doutent, car ses questions sont accueillies.", ref: "Évangile selon Jean, chapitre 20",
    v: { skin: "#c99572", hair: "#3e2f28", style: "curly", beard: "#3e2f28", robe: "#c9803a", mantle: "#efe3c8", attr: "equerre", bg: ["#fdeccd", "#f7c9a0"] } },
  { id: "abraham", g: "at", an: -1800, nom: "Abraham", role: "Le père des croyants", dates: "Vers 1800 av. J.-C. (date approximative)", fete: null, patron: null,
    bio: "Dieu demande à Abraham de partir vers une terre inconnue et lui promet une descendance aussi nombreuse que les étoiles. Il lui fait confiance et se met en route.",
    pourquoi: "Juifs, chrétiens et musulmans se reconnaissent en lui comme un père dans la foi.", ref: "Livre de la Genèse, chapitre 12",
    v: { skin: "#d4a077", hair: "#c8c8c8", style: "short", beard: "#d0d0d0", robe: "#c9b48a", mantle: "#8a6a40", attr: "etoiles3", bg: ["#c9b8e4", "#fdeccd"] } },
  { id: "moise", g: "at", an: -1250, nom: "Moïse", role: "Il libère son peuple de l'esclavage", dates: "Vers 1250 av. J.-C. (date débattue)", fete: null, patron: null,
    bio: "Moïse est sauvé des eaux, puis appelé par Dieu devant un buisson qui brûle sans se consumer. Il conduit le peuple hors d'Égypte et reçoit les dix commandements sur le mont Sinaï.",
    pourquoi: "Les dix commandements restent un repère pour juifs et chrétiens.", ref: "Livre de l'Exode, chapitre 3",
    v: { skin: "#d1996f", hair: "#b8b8b8", style: "long", beard: "#c0c0c0", robe: "#6a8fb0", mantle: "#e8dcc0", attr: "tables", bg: ["#dcebf7", "#f7e3b0"] } },
  { id: "david", g: "at", an: -1000, nom: "David", role: "Berger devenu roi d'Israël", dates: "Vers 1000 av. J.-C.", fete: null, patron: null,
    bio: "David est le plus jeune de sa famille et garde les moutons. Il devient roi et fait de Jérusalem sa capitale. On lui attribue beaucoup de psaumes, ces prières chantées.",
    pourquoi: "Jésus est présenté dans l'Évangile comme un descendant de David, né dans sa ville.", ref: "Premier livre de Samuel, chapitre 16",
    v: { skin: "#dcab82", hair: "#8a4a2a", style: "curly", robe: "#b94a4a", mantle: "#e8c15a", attr: "harpe", bg: ["#f7dcdc", "#fdf0d2"] } },
  { id: "augustin", g: "histoire", an: 354, nom: "Augustin", role: "Un chercheur de vérité devenu évêque", dates: "354 à 430, en Afrique du Nord", fete: "Le 28 août", patron: null,
    bio: "Augustin cherche le bonheur dans les plaisirs et les idées pendant des années. À 31 ans, il se convertit, et il est baptisé à 32 ans. Il devient évêque d'Hippone et écrit les Confessions.",
    pourquoi: "Il a écrit « Notre cœur est sans repos tant qu'il ne repose pas en toi ». Son histoire parle à ceux qui reviennent à la foi.", ref: "Ses Confessions",
    v: { skin: "#c58f6a", hair: "#3e2f28", style: "short", beard: "#3e2f28", robe: "#3f3a52", mantle: "#d8c8e8", attr: "coeurlivre", bg: ["#dcd4ee", "#fdeccd"] } },
  { id: "benoit", g: "histoire", an: 480, nom: "Benoît de Nursie", role: "Père des moines d'Occident", dates: "Vers 480 à 547, en Italie", fete: "Le 11 juillet", patron: "Patron de l'Europe",
    bio: "Benoît quitte Rome pour vivre en ermite, puis rassemble des moines. Il écrit une règle de vie simple qui équilibre la prière, le travail et la vie commune.",
    pourquoi: "Ses monastères ont conservé les livres et transmis la culture en Europe.", ref: "La Règle de saint Benoît",
    v: { skin: "#e0ae88", hair: "#8a8a8a", style: "hood", beard: "#c8c8c8", robe: "#2f2f3a", mantle: "#2f2f3a", attr: "livre", bg: ["#e6e0d0", "#fdeccd"] } },
  { id: "francois", g: "histoire", an: 1182, nom: "François d'Assise", role: "Le pauvre qui aimait la création", dates: "1182 à 1226, en Italie", fete: "Le 4 octobre", patron: "Patron des écologistes",
    bio: "François est fils de riche marchand. Un jour, il choisit de tout quitter pour vivre pauvre comme Jésus. Il chante la beauté de la nature dans le Cantique des créatures.",
    pourquoi: "Il montre une foi joyeuse, simple et proche des plus pauvres.", ref: "Le Cantique des créatures",
    v: { skin: "#e3b48c", hair: "#5a4030", style: "tonsure", beard: "#5a4030", robe: "#8a6a4a", mantle: "#8a6a4a", attr: "oiseaux", bg: ["#e9efe0", "#fdeccd"] } },
  { id: "aquin", g: "histoire", an: 1225, nom: "Thomas d'Aquin", role: "Un grand penseur chrétien", dates: "1225 à 1274, en Italie et en France", fete: "Le 28 janvier", patron: "Patron des étudiants",
    bio: "Thomas est un frère dominicain, calme et très studieux. Il écrit la Somme théologique, une grande synthèse qui montre que la foi et la raison peuvent s'entendre.",
    pourquoi: "Il aide à comprendre sa foi avec la raison, sans la craindre.", ref: "La Somme théologique",
    v: { skin: "#e6b996", hair: "#4a3a30", style: "tonsure", robe: "#f1ece2", mantle: "#2f2f3a", attr: "soleilpoitrine", bg: ["#dcebf7", "#fdf0d2"] } },
  { id: "jeanne", g: "histoire", an: 1412, nom: "Jeanne d'Arc", role: "Jeune paysanne qui sauve le royaume", dates: "1412 à 1431, en France", fete: "Le 30 mai", patron: "Patronne secondaire de la France",
    bio: "Jeanne est une jeune paysanne lorraine qui entend des voix. À 17 ans, elle aide à libérer Orléans. Elle est ensuite capturée, jugée et brûlée à Rouen à 19 ans.",
    pourquoi: "Elle est un symbole de courage et de fidélité, jusqu'au bout.", ref: "Les actes de son procès",
    v: { skin: "#ecc29c", hair: "#5a3a28", style: "short", robe: "#9aa4b0", mantle: "#4f6fa0", attr: "banniere", bg: ["#dcebf7", "#f7dcdc"] } },
  { id: "bernadette", g: "proches", an: 1844, nom: "Bernadette Soubirous", role: "Une jeune fille pauvre à Lourdes", dates: "1844 à 1879, en France", fete: "Le 16 avril", patron: null,
    bio: "En 1858, à 14 ans, Bernadette raconte avoir vu dix-huit fois une dame dans la grotte de Massabielle, à Lourdes. Elle reste simple et humble jusqu'à sa mort.",
    pourquoi: "Lourdes accueille aujourd'hui des millions de pèlerins, dont beaucoup de malades.", ref: "Lourdes, grotte de Massabielle",
    v: { skin: "#ecc29c", hair: "#4a3226", style: "veil", robe: "#6a7a8f", mantle: "#f1ece2", attr: "chapelet", bg: ["#dcebf7", "#e9efe0"] } },
  { id: "therese", g: "proches", an: 1873, nom: "Thérèse de Lisieux", role: "Une jeune carmélite et sa « petite voie »", dates: "1873 à 1897, en France", fete: "Le 1er octobre", patron: "Patronne des missions",
    bio: "Thérèse entre au Carmel à 15 ans et meurt à 24 ans. Elle découvre qu'on peut aimer Dieu dans les gestes les plus simples, et elle appelle cela sa « petite voie ».",
    pourquoi: "Elle est docteur de l'Église. Elle rassure ceux qui se sentent petits.", ref: "Histoire d'une âme",
    v: { skin: "#f0cba7", hair: "#6a4a30", style: "veil", robe: "#6b4a38", mantle: "#f4efe6", attr: "roses", bg: ["#f7dcdc", "#fdeccd"] } },
  { id: "foucauld", g: "proches", an: 1858, nom: "Charles de Foucauld", role: "Un officier qui retrouve la foi et vit au Sahara", dates: "1858 à 1916, en France et en Algérie", fete: "Le 1er décembre", patron: null,
    bio: "Charles de Foucauld perd la foi dans sa jeunesse, mène une vie facile, puis la retrouve à Paris en 1886. Il part vivre au Sahara, près des Touaregs, comme un frère universel.",
    pourquoi: "Il est un modèle pour ceux qui reviennent à Dieu après une longue absence.", ref: "Ses écrits spirituels",
    v: { skin: "#d9a984", hair: "#4a3a30", style: "hood", beard: "#4a3a30", robe: "#f1ece2", mantle: "#f1ece2", attr: "coeurcroix", bg: ["#f7e3b0", "#fdf0d2"] } },
  { id: "teresa", g: "proches", an: 1910, nom: "Mère Teresa", role: "Au service des plus pauvres de Calcutta", dates: "1910 à 1997, en Macédoine du Nord et en Inde", fete: "Le 5 septembre", patron: null,
    bio: "Agnès devient sœur, puis part en Inde. Elle fonde les Missionnaires de la Charité pour servir les plus pauvres et les mourants. Elle reçoit le prix Nobel de la paix en 1979.",
    pourquoi: "Elle a montré une foi concrète, faite de gestes simples auprès de ceux que personne ne regarde.", ref: "Prix Nobel de la paix 1979",
    v: { skin: "#d9a984", hair: "#c8c8c8", style: "veil", robe: "#f5f5f0", mantle: "#4f7fb0", attr: "mains", bg: ["#dcebf7", "#fdeccd"] } },
  { id: "jp2", g: "proches", an: 1920, nom: "Jean-Paul II", role: "Un pape venu de Pologne", dates: "1920 à 2005", fete: "Le 22 octobre", patron: null,
    bio: "Karol Wojtyła devient pape en 1978. Il voyage dans le monde entier et il lance les Journées mondiales de la jeunesse. Il est canonisé en 2014.",
    pourquoi: "Il a beaucoup parlé aux jeunes, avec ce message répété « N'ayez pas peur ».", ref: "Les Journées mondiales de la jeunesse",
    v: { skin: "#f0c9a8", hair: "#d8d8d8", style: "short", robe: "#f5f2ea", mantle: "#c43a3a", attr: "crosse", bg: ["#f7dcdc", "#fdeccd"] } },
  { id: "carlo", g: "proches", an: 1991, nom: "Carlo Acutis", role: "Un adolescent passionné d'informatique", dates: "1991 à 2006, en Italie", fete: "Le 12 octobre", patron: null,
    bio: "Carlo est un adolescent comme les autres, passionné de jeux et d'ordinateurs. Il crée un site sur les miracles eucharistiques. Il meurt à 15 ans d'une leucémie. Il est canonisé en 2025.",
    pourquoi: "Il montre qu'on peut être jeune, d'aujourd'hui, et vivre sa foi avec joie.", ref: "Son site sur les miracles eucharistiques",
    v: { skin: "#ecc29c", hair: "#5a3a28", style: "short", robe: "#4f7fb0", mantle: "#2f4f7a", attr: "ordi", bg: ["#dcebf7", "#e9efe0"] } }
];

// ---------- gamification ----------
const NIVEAUX = [
  [0, "Petite lueur"], [12, "Veilleur"], [30, "Marcheur"], [55, "Pèlerin"], [85, "Compagnon"],
  [125, "Porteur de lumière"], [175, "Témoin"], [235, "Éclaireur"], [305, "Sage"], [390, "Aurore"]
];
const BADGES = [
  { id: "lueur", t: "Première lueur", d: "Tu as fini la frise et la carte.", icon: "sun", test: S => S.done.reperes },
  { id: "premier_mot", t: "Premier mot", d: "Tu as dit ta première prière.", icon: "candle", test: S => S.done.priere },
  { id: "lecteur", t: "Lecteur", d: "Tu sais lire une référence de la Bible.", icon: "book", test: S => S.done.bible },
  { id: "zachee", t: "Curieux comme Zachée", d: "Tu as posé trois questions.", icon: "question", test: S => (S.stats?.faq || 0) >= 3 },
  { id: "emmaus", t: "Chemin d'Emmaüs", d: "Trois jours de lumière de suite.", icon: "steps", test: S => streak(S) >= 3 },
  { id: "sept", t: "Sept jours de lumière", d: "Sept jours de suite.", icon: "star", test: S => streak(S) >= 7 },
  { id: "plume", t: "Plume de lumière", d: "Cinq pages écrites dans ton journal.", icon: "pen", test: S => (S.journal || []).length >= 5 },
  { id: "parfait", t: "Sans faute", d: "Un niveau du jeu réussi sans erreur.", icon: "check", test: S => Object.values(S.quiz || {}).some(v => v >= 5) },
  { id: "galerie", t: "Grande famille", d: "Tu as rencontré dix figures de la foi.", icon: "people", test: S => Object.keys(S.met || {}).length >= 10 },
  { id: "chapelet", t: "Perles de prière", d: "Tu as prié un chapelet.", icon: "beads", test: S => S.done.chapelet },
  { id: "pas_jesus", t: "Sur les pas de Jésus", d: "Tu as parcouru toute la carte.", icon: "steps", test: S => S.done.jesuscarte },
  { id: "expert", t: "Grande question", d: "Tu as posé une question à l'expert.", icon: "question", test: S => (S.stats?.ask || 0) >= 1 }
];

// ---------- avatar ----------
const AV = {
  skin: ["#f6d7b8", "#efc29c", "#e0a97f", "#c98d63", "#a96d48", "#7b4c32"],
  hairColor: ["#2b1f1a", "#5a3a28", "#8a5a30", "#c89a4a", "#b8532e", "#c9c9c9"],
  hair: [["court", "Courts"], ["long", "Longs"], ["boucles", "Bouclés"], ["chignon", "Chignon"], ["rase", "Rasés"]],
  outfitColor: ["#4f7fb0", "#d9784a", "#6a9d86", "#e8b04a", "#a85a6a", "#7a6fb0", "#3f4a5a", "#f1ece2"],
  outfit: [["pull", "Pull", null], ["capuche", "Capuche", null], ["chemise", "Chemise", { niv: 2 }], ["manteau", "Manteau", { niv: 4 }]],
  acc: [["aucun", "Aucun", null], ["lunettes", "Lunettes", null], ["echarpe", "Écharpe", { niv: 2 }], ["croix", "Petite croix", { badge: "premier_mot" }], ["coquille", "Coquille de pèlerin", { niv: 5 }], ["halo", "Halo de lumière", { niv: 8 }]],
  bg: [["aube", "Aube", null, ["#cfe3f1", "#fdeccd"]], ["ciel", "Grand ciel", null, ["#bcd6ea", "#e8f1f7"]], ["prairie", "Prairie", { niv: 2 }, ["#dcebd0", "#fdf0d2"]], ["soir", "Soir doré", { niv: 3 }, ["#f7c9a0", "#c9b8e4"]], ["nuit", "Nuit étoilée", { niv: 6 }, ["#5a5a9a", "#c9b8e4"]], ["vitrail", "Vitrail", { niv: 9 }, ["#e8b04a", "#6f9cc4"]]]
};

// ---------- journal ----------
const MOODS = [["soleil", "Lumineux"], ["calme", "Calme"], ["pluie", "Triste"], ["orage", "Agité"], ["brume", "Perdu"], ["arc", "Reconnaissant"]];
const TAGS = ["Prière", "Évangile", "Question", "Gratitude", "Intention", "Pensée"];
const PROMPTS = [
  "Qu'est-ce qui m'a donné de la joie aujourd'hui ?", "Pour qui ai-je envie de prier ?", "Quelle question aimerais-je poser à Dieu ?",
  "Quel moment de la journée m'a paru le plus vrai ?", "De quoi suis-je reconnaissant ce soir ?", "Qu'est-ce qui me pèse en ce moment ?",
  "Quelle phrase de l'Évangile m'a touché ?", "À qui puis-je rendre un petit service demain ?", "Qu'est-ce que j'ai découvert cette semaine ?",
  "Qu'est-ce que j'ai du mal à comprendre ?", "Quel visage de Jésus me parle le plus ?", "Qu'ai-je envie de pardonner ou de me faire pardonner ?",
  "Où ai-je ressenti de la paix aujourd'hui ?", "Quel est mon plus grand doute ?", "Que voudrais-je dire à Marie ?",
  "Quelle personne m'a inspiré récemment ?", "Quel petit pas puis-je faire cette semaine ?", "Comment ai-je prié aujourd'hui ?",
  "Qu'est-ce qui me rend courageux ?", "Quel souvenir de ma famille touche à la foi ?", "Quelle beauté ai-je remarquée aujourd'hui ?",
  "Qu'est-ce que je voudrais changer en moi ?", "Quelle phrase de prière me revient en tête ?", "Qu'est-ce que je confie à Dieu ce soir ?", "Quel défi je me donne pour demain ?"
];

// ---------- sur les pas de Jésus (carte) ----------
// lieux = [nom, longitude, latitude, décalageX, décalageY]
const JESUS_STOPS = [
  { court: "Bethléem", date: "Sa naissance", t: "Il naît à Bethléem", ref: "Luc 2, 1-7",
    b: "Marie et Joseph vont à Bethléem pour un recensement. Jésus naît là et sa première couche est une mangeoire. Des bergers viennent le voir en premier.",
    lieux: [["Bethléem", 35.2, 31.7, 14, 22]], vue: [34.2, 31.2, 36.6, 32.9] },
  { court: "Nazareth", date: "Son enfance", t: "Il grandit à Nazareth", ref: "Luc 2, 39-52",
    b: "La famille s'installe à Nazareth, en Galilée. Jésus y grandit, apprend le métier de Joseph et fréquente la synagogue. À douze ans, il se rend à Jérusalem pour la fête de Pâque.",
    lieux: [["Nazareth", 35.3, 32.7, -16, 26]], vue: [34.4, 31.8, 36.6, 33.4] },
  { court: "Jourdain", date: "Vers l'an 28", t: "Il est baptisé dans le Jourdain", ref: "Marc 1, 9-13",
    b: "Jean le Baptiste baptise dans le Jourdain. Jésus vient lui aussi. Une voix dit « Tu es mon fils bien-aimé ». Il passe ensuite quarante jours dans le désert à prier.",
    lieux: [["Le Jourdain", 35.55, 31.84, 14, 24]], vue: [34.6, 31.2, 36.4, 32.6] },
  { court: "Cana", date: "Son premier signe", t: "Il change l'eau en vin à Cana", ref: "Jean 2, 1-11",
    b: "À Cana, lors d'un mariage, le vin vient à manquer. Marie le remarque et le dit à Jésus. Il fait remplir d'eau de grandes jarres, et l'eau devient un vin excellent.",
    lieux: [["Cana", 35.34, 32.75, 14, -12]], vue: [34.8, 32.2, 36.2, 33.3] },
  { court: "Lac", date: "Sa vie publique", t: "Autour du lac de Galilée", ref: "Marc 1, 14-20 ; Matthieu 5",
    b: "Jésus s'installe à Capharnaüm, au bord du lac. Il appelle ses premiers amis, des pêcheurs, et enseigne la foule. C'est là qu'il prononce le Sermon sur la montagne, avec les Béatitudes.",
    lieux: [["Capharnaüm", 35.575, 32.88, 14, -10]], vue: [34.9, 32.4, 36.3, 33.4] },
  { court: "Tabor", date: "Un éclat de lumière", t: "Il se montre dans la lumière", ref: "Marc 9, 2-8",
    b: "Sur une haute montagne, que la tradition situe au mont Tabor, Jésus apparaît à trois amis dans une grande lumière. C'est la Transfiguration. Ils comprennent qu'il est plus qu'un maître.",
    lieux: [["Mont Tabor", 35.39, 32.69, -12, -12]], vue: [34.8, 32.2, 36.2, 33.2] },
  { court: "Sychar", date: "Chez les Samaritains", t: "Il parle à la Samaritaine", ref: "Jean 4, 1-42",
    b: "Fatigué, Jésus s'assoit près d'un puits en Samarie. Une femme vient chercher de l'eau. Les juifs et les Samaritains ne se parlaient pas, mais Jésus lui parle longuement, et elle devient son témoin.",
    lieux: [["Puits de Jacob", 35.28, 32.21, -12, 24]], vue: [34.6, 31.6, 36.2, 32.8] },
  { court: "Jéricho", date: "Un cœur qui change", t: "Il rencontre Zachée à Jéricho", ref: "Luc 19, 1-10",
    b: "Zachée, un collecteur d'impôts que tout le monde méprise, monte sur un arbre pour voir Jésus. Jésus lève les yeux et s'invite chez lui. Zachée change de vie ce jour-là.",
    lieux: [["Jéricho", 35.44, 31.86, 14, -6]], vue: [34.6, 31.2, 36.4, 32.5] },
  { court: "Béthanie", date: "L'ami qui revit", t: "Il appelle Lazare à la vie", ref: "Jean 11, 1-44",
    b: "À Béthanie, près de Jérusalem, son ami Lazare est mort depuis quatre jours. Jésus pleure avec ses sœurs Marthe et Marie, puis il appelle Lazare, qui sort du tombeau.",
    lieux: [["Béthanie", 35.26, 31.77, 16, 22]], vue: [34.7, 31.3, 36.0, 32.2] },
  { court: "Jérusalem", date: "Vers l'an 30", t: "Dernier repas, croix et tombeau", ref: "Luc 22 à 24",
    b: "À Jérusalem, Jésus partage un dernier repas avec ses amis. Il est ensuite arrêté, condamné et crucifié. Il est mis au tombeau. Le troisième jour, les femmes trouvent le tombeau vide.",
    lieux: [["Jérusalem", 35.22, 31.78, -14, -12]], vue: [34.7, 31.3, 36.0, 32.2] },
  { court: "Emmaüs", date: "Le soir de Pâques", t: "Deux marcheurs le reconnaissent", ref: "Luc 24, 13-35",
    b: "Le soir de Pâques, deux disciples tristes marchent vers Emmaüs. Un inconnu les rejoint et leur explique les Écritures. Ils le reconnaissent quand il partage le pain, puis retournent vite annoncer la nouvelle.",
    note: "L'emplacement exact d'Emmaüs est discuté entre plusieurs sites.",
    lieux: [["Emmaüs (site discuté)", 35.13, 31.84, -12, -14]], vue: [34.6, 31.3, 35.9, 32.2], fin: true }
];

// ---------- ressources et liens ----------
const RESSOURCES = [
  { id: "bible", t: "Ma première Bible", intro: "Choisis une édition avec une introduction et des notes. Elles t'aident à comprendre le contexte. La traduction liturgique est celle que tu entendras à la messe.",
    items: [
      { n: "Ze Bible", d: "Une traduction très lisible, pensée pour les débutants.", q: "Ze Bible Bayard" },
      { n: "La Bible de Jérusalem", d: "Un grand classique, avec beaucoup de notes.", q: "Bible de Jérusalem" },
      { n: "La Bible, traduction officielle liturgique", d: "Le texte entendu à la messe en France.", q: "Bible traduction officielle liturgique AELF" },
      { n: "Nouveau Testament avec Psaumes", d: "Un petit format pratique pour commencer par Jésus.", q: "Nouveau Testament et Psaumes poche" }
    ] },
  { id: "chapelet", t: "Mon premier chapelet", intro: "Un chapelet n'a pas besoin d'être cher. Choisis-en un qui te plaît et qui se tient bien en main. Tu peux le faire bénir par un prêtre ou un diacre, il suffit de lui demander après la messe.",
    items: [
      { n: "Chapelet en bois d'olivier", d: "Simple et agréable, souvent venu de Terre sainte.", q: "chapelet bois d'olivier" },
      { n: "Chapelet à cordon", d: "Solide, il ne s'emmêle pas.", q: "chapelet cordon 5 dizaines" },
      { n: "Dizainier", d: "Un anneau de dix perles, parfait pour commencer.", q: "dizainier catholique" },
      { n: "Pochette pour chapelet", d: "Pour l'emporter partout sans l'abîmer.", q: "pochette chapelet" }
    ] },
  { id: "prier", t: "Prier tous les jours", intro: "De petits livres qui accompagnent chaque jour avec les textes de la messe et des prières.",
    items: [
      { n: "Prions en Église", d: "Les textes de la messe de chaque jour, chaque mois.", q: "Prions en Église" },
      { n: "Magnificat", d: "Prières et textes du jour, à emporter.", q: "Magnificat mensuel" },
      { n: "YOUCAT, prières", d: "Pour apprendre à prier avec des mots simples.", q: "YOUCAT prier" },
      { n: "Carnet de prière", d: "Pour noter tes intentions, en plus de ton journal dans Auréa.", q: "carnet de prière" }
    ] },
  { id: "foi", t: "Comprendre la foi", intro: "Des livres clairs pour aller plus loin à ton rythme.",
    items: [
      { n: "YOUCAT, le catéchisme des jeunes", d: "Questions et réponses écrites pour les jeunes.", q: "YOUCAT catéchisme" },
      { n: "Compendium du Catéchisme", d: "L'essentiel du catéchisme de l'Église catholique, en questions courtes.", q: "Compendium du catéchisme de l'Église catholique" },
      { n: "Les Confessions, saint Augustin", d: "Le récit d'un chercheur de vérité devenu chrétien.", q: "Confessions saint Augustin" },
      { n: "Histoire d'une âme, Thérèse de Lisieux", d: "Un témoignage simple et lumineux.", q: "Histoire d'une âme Thérèse de Lisieux" }
    ] },
  { id: "objets", t: "Pour mon coin de prière", intro: "Quelques objets simples pour créer un petit coin calme chez toi.",
    items: [
      { n: "Croix murale", d: "Pour se rappeler à qui on parle.", q: "croix murale catholique" },
      { n: "Icône", d: "Une image à contempler pendant la prière.", q: "icône Jésus orthodoxe catholique" },
      { n: "Bougie de prière", d: "Une petite flamme pour entrer dans le calme.", q: "bougie de prière" },
      { n: "Statue de Marie ou d'un saint", d: "Pour un coin de prière personnel.", q: "statue Vierge Marie" }
    ] }
];
const LIENS_GRATUITS = [
  { n: "AELF", d: "Les lectures du jour et les textes de la liturgie.", u: "https://www.aelf.org" },
  { n: "Messes.info", d: "Les horaires de messe près de chez toi.", u: "https://messes.info" },
  { n: "Hozana", d: "Des neuvaines et des prières à plusieurs.", u: "https://hozana.org" },
  { n: "KTO", d: "La télévision catholique.", u: "https://www.ktotv.com" },
  { n: "Le Catéchisme de l'Église catholique", d: "Le texte complet en ligne sur le site du Vatican.", u: "https://www.vatican.va/archive/FRA0013/_INDEX.HTM" },
  { n: "The Chosen", d: "La série sur la vie de Jésus.", u: "https://www.thechosen.tv" },
  { n: "Frère Paul-Adrien", d: "Sa chaîne YouTube.", u: "https://www.youtube.com/theopedie" },
  { n: "Parcours « Je crois en Dieu »", d: "Un parcours en vidéo du diocèse de Paris.", u: "https://dioceseparis.fr/-le-parcours-je-crois-en-dieu-.html" }
];

// ---------- expert (Claude) ----------
const EXPERT_SYSTEM = `Tu es un catéchiste catholique expert, bienveillant et rigoureux. Tu réponds en français à des personnes qui découvrent la foi, souvent jeunes, parfois venues d'une autre religion ou sans religion.

Règles
- Utilise des mots simples. Explique chaque mot difficile en une phrase.
- Réponds en 150 à 300 mots, avec des phrases courtes et un ton chaleureux et humain. Évite les deux points et les tirets cadratins.
- Distingue toujours ce qui est un fait historique, ce que l'Église enseigne, et ce qui est débattu entre spécialistes. Ne présente jamais une affirmation de foi comme un fait scientifique.
- Appuie-toi sur la Bible (avec la référence, par exemple Jn 3, 16), le Catéchisme de l'Église catholique (avec le numéro quand tu en es sûr) et des sources historiques. Si tu n'es pas sûr d'une référence ou d'un chiffre, dis-le au lieu de l'inventer.
- Respecte les autres religions et les personnes. Ne les caricature pas, ne les dénigre pas. Présente ce qui est commun avant ce qui diffère. Exprime la position catholique clairement, sans agressivité.
- Parle aussi du doute, de la souffrance et des abus dans l'Église avec honnêteté et sans esquive.
- Si la question touche à la santé, au droit ou à une situation personnelle grave, encourage à parler à un professionnel et à un prêtre.
- Termine souvent par une petite piste concrète, par exemple un passage de l'Évangile à lire ou une personne de la paroisse à contacter.
- Tu ne remplaces ni un prêtre ni un accompagnateur, et tu peux le rappeler quand c'est utile.`;
const EXPERT_STARTERS = [
  "Pourquoi Dieu permet-il la souffrance ?", "Quelle est la différence entre catholiques et protestants ?", "Comment savoir si je suis prêt à demander le baptême ?",
  "Pourquoi l'Église a-t-elle tant de règles ?", "Jésus a-t-il vraiment existé ?", "Comment prier quand je ne ressens rien ?"
];
