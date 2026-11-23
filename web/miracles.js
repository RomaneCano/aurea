// Section « Miracles et signes » : guide pour débutants et fiches par personnage.
// Faits vérifiés par recherche en novembre 2026. Les récits de tradition sont toujours signalés comme tels.

const MIRACLES_GUIDE = {
  intro: "Pour l'Église catholique, un miracle est un fait extraordinaire que la médecine ou la science ne peuvent pas expliquer, et que les croyants lisent comme un signe de Dieu. Ce n'est pas de la magie et ce n'est pas un spectacle. C'est un signe qui invite à croire, mais personne n'est obligé de le voir ainsi.",
  comment: [
    "Tout commence par une personne qui pense avoir été guérie. À Lourdes, elle peut se présenter au Bureau des constatations médicales, un service de médecins créé en 1883. Elle n'y est pas obligée.",
    "Les médecins du Bureau lisent le dossier médical, examinent la personne et demandent des analyses. Ils cherchent une maladie grave, bien prouvée avant la guérison, et une guérison qui dure.",
    "Si le cas est solide, il est confié au Comité médical international de Lourdes. Ce sont des médecins et des spécialistes de plusieurs pays, croyants ou non. Ils disent seulement si la guérison est « inexpliquée dans l'état actuel des connaissances ». Ils ne parlent pas de Dieu.",
    "Ensuite vient l'évêque du diocèse, c'est-à-dire de la région de la personne. Il réunit une commission, avec des médecins et des théologiens (des spécialistes de la foi). C'est lui qui décide si la guérison peut être reconnue comme un signe de Dieu, donc comme un miracle.",
    "Le chiffre est petit. D'après les annonces du sanctuaire, 72 guérisons ont été reconnues miraculeuses à Lourdes, la dernière annoncée en avril 2025. Plus de 7 000 dossiers avaient été étudiés selon un chiffre cité en 2018. Il faut parfois dix ans ou plus pour aboutir.",
    "Pour faire un saint, la procédure est proche. On parle de béatification (la personne est déclarée « bienheureuse ») puis de canonisation (elle est déclarée « sainte »). Un miracle attribué à sa prière est normalement exigé pour chaque étape, sauf pour un martyr (quelqu'un qui est mort à cause de sa foi), dispensé de miracle pour la béatification.",
    "Dans ce cas, un évêque ouvre d'abord une enquête. Puis le dossier part à Rome, à la Congrégation pour les causes des saints, aujourd'hui appelée Dicastère. Un comité de médecins vote d'abord sur le caractère inexplicable, puis des théologiens, puis des cardinaux et des évêques. À la fin, le pape signe le décret.",
    "Les apparitions, comme à Lourdes ou à Fatima, suivent une autre voie. L'évêque du lieu enquête, puis il déclare que les événements sont « dignes de foi » et il autorise le culte. Cela ne devient jamais une obligation de foi pour les catholiques."
  ],
  questions: [
    { q: "Un miracle peut-il avoir une explication scientifique ?",
      a: "Les médecins de Lourdes disent seulement que la guérison est « inexpliquée aujourd'hui ». Ils ne disent pas qu'elle sera inexplicable pour toujours, car la science avance. L'Église le sait et reste prudente. Elle demande que la maladie soit bien prouvée, que la guérison soit durable et que les médecins ne trouvent pas d'explication. Si une explication naturelle apparaît plus tard, le dossier tombe." },
    { q: "Pourquoi Dieu ne guérit-il pas tout le monde ?",
      a: "C'est l'une des questions les plus dures, et l'Église n'a pas de réponse qui efface la souffrance. Les croyants disent qu'un miracle est un signe rare, pas un droit, et que Dieu accompagne aussi ceux qui ne sont pas guéris. À Lourdes, la grande majorité des pèlerins malades repartent malades, mais beaucoup disent repartir apaisés. Un sceptique peut trouver cette réponse insuffisante, et cette douleur doit être respectée." },
    { q: "Faut-il croire aux miracles pour être catholique ?",
      a: "Oui et non. La foi catholique repose sur la résurrection de Jésus et sur ce que racontent les Évangiles, qui contiennent des signes. En revanche, personne n'est obligé de croire à une guérison précise, comme celles de Lourdes. L'Église dit seulement qu'on peut y croire sans se tromper. Un catholique reste libre devant ces cas." },
    { q: "Qu'est-ce qui distingue un miracle reconnu d'un récit de tradition ?",
      a: "Un miracle reconnu a été étudié par des médecins et des juges de l'Église, avec des dossiers, des noms, des dates et un décret. Un récit de tradition est une histoire transmise de génération en génération, souvent écrite longtemps après les faits, comme le manteau partagé par saint Martin. Il peut être beau et porter un vrai sens, mais on ne peut pas le vérifier comme un dossier médical. Cette application les sépare toujours." },
    { q: "Les miracles prouvent-ils quelque chose ?",
      a: "Pour l'Église, un miracle n'est pas une preuve qui force à croire. C'est un signe, qui parle à ceux qui sont déjà ouverts à la foi. Un sceptique honnête peut dire que « inexpliqué » ne veut pas dire « venu de Dieu », et cela se défend. Un croyant honnête peut répondre qu'un signe ne se démontre pas, il se reçoit. Les deux peuvent rester respectueux l'un de l'autre." }
  ],
  prudence: "La science sait dire qu'une guérison est rare, bien documentée et sans explication connue aujourd'hui. Elle ne peut pas dire si Dieu en est la cause, et la foi ne peut pas remplacer les analyses médicales."
};

const MIRACLES = {
  "bernadette": {
    reconnus: [
      { t: "Les apparitions reconnues en 1862",
        x: "Du 11 février au 16 juillet 1858, Bernadette Soubirous, 14 ans, dit avoir vu une dame dix-huit fois dans la grotte de Massabielle, à Lourdes. Après une enquête, l'évêque de Tarbes, Mgr Laurence, a déclaré le 18 janvier 1862 que ces apparitions étaient dignes de foi et il a autorisé le culte. Cela veut dire que l'Église les juge crédibles, sans obliger personne à y croire.",
        s: "Sanctuaires Notre-Dame de Lourdes, La reconnaissance des apparitions de Lourdes" },
      { t: "Sœur Bernadette Moriau, 70e guérison reconnue",
        x: "En juillet 2008, une religieuse franciscaine de 69 ans, Bernadette Moriau, très handicapée depuis des années, a dit se sentir guérie pendant un pèlerinage à Lourdes. Après dix ans d'examens médicaux, l'évêque de Beauvais, Mgr Jacques Benoit-Gonin, a reconnu cette guérison comme un signe de Dieu le 11 février 2018. C'était la 70e guérison reconnue à Lourdes.",
        s: "Vatican News, 70e miracle de Lourdes, février 2018 ; Aleteia, Qui est Bernadette Moriau, la 70e miraculée de Lourdes" },
      { t: "John Traynor, 71e guérison reconnue",
        x: "John Traynor, un soldat britannique blessé pendant la Première Guerre mondiale, a été guéri à Lourdes le 25 juillet 1923. Les médecins ont jugé le cas inexpliqué en 1926, mais l'Église ne l'a reconnu officiellement que le 8 décembre 2024, par l'archevêque de Liverpool. C'était la 71e guérison reconnue, et la première pour une personne de langue anglaise.",
        s: "Sanctuaires Notre-Dame de Lourdes, John Traynor, 71e miracle de Lourdes ; America Magazine, 10 décembre 2024" },
      { t: "Antonietta Raco, 72e guérison reconnue",
        x: "Le 16 avril 2025, le recteur du sanctuaire a annoncé la reconnaissance de la guérison d'Antonietta Raco, une pèlerine italienne. C'est la 72e guérison reconnue à Lourdes, et c'est le chiffre le plus récent que nous avons trouvé.",
        s: "Catholic News Agency, Lourdes announces 72nd miracle, avril 2025" }
    ],
    racontes: [
      { t: "La source de la grotte",
        x: "Selon le récit de Bernadette et de témoins, la dame lui aurait demandé de boire à la source et de s'y laver, et Bernadette a gratté la terre le 25 février 1858. De l'eau est alors apparue, et des millions de pèlerins en boivent ou s'y baignent depuis. L'Église ne dit pas que l'eau a un pouvoir magique, elle y voit un signe de prière et de confiance." }
    ],
    temoignage: { t: "Sœur Bernadette Moriau",
      x: "Sœur Bernadette Moriau souffrait d'une atteinte grave des nerfs du bas du dos, le syndrome de la queue de cheval. Elle raconte avoir ressenti une guérison soudaine pendant un pèlerinage à Lourdes en juillet 2008. Elle a pu quitter les appareils qui la soutenaient. Elle a accepté dix ans d'examens avant que l'évêque ne se prononce.",
      s: "Allodocteurs, Une religieuse « miraculeusement » guérie à Lourdes ; Vatican News, février 2018" },
    prudence: "Les apparitions de 1858 sont jugées dignes de foi, et chaque guérison citée ici a été reconnue après un long examen. Ce que Bernadette a vu intérieurement ne peut pas être vérifié de l'extérieur, et personne n'est obligé d'y croire."
  },

  "carlo": {
    reconnus: [
      { t: "Premier miracle, Campo Grande (Brésil), retenu pour la béatification",
        x: "Un petit garçon brésilien, Mateus Vianna, né avec une malformation du pancréas, a été guéri sans explication médicale. D'après la plupart des récits, sa famille avait prié Carlo et il avait touché un objet lié à lui, vers 2013 à Campo Grande. Ce cas a été reconnu pour la béatification de Carlo (la première étape avant la sainteté) en 2020. Les articles ne donnent pas tous le même âge pour l'enfant.",
        s: "Presse brésilienne, Gazeta do Povo, História do milagre do menino brasileiro curado por Carlo Acutis ; EWTN News" },
      { t: "Deuxième miracle, Florence et Costa Rica, retenu pour la canonisation",
        x: "Valeria Valverde, une étudiante costaricienne de 21 ans, a eu un grave traumatisme à la tête dans un accident de vélo à Florence en juillet 2022. Selon les récits, le jour où sa mère a prié sur la tombe de Carlo à Assise, Valeria s'est mise à respirer seule, et elle a parlé le lendemain. Le pape François a reconnu ce cas le 23 mai 2024. Carlo a été canonisé (déclaré saint) le 7 septembre 2025 par le pape Léon XIV.",
        s: "EWTN News, Carlo Acutis to be first millennial saint, mai 2024 ; Vatican News" }
    ],
    racontes: [],
    temoignage: { t: "Valeria Valverde et sa mère",
      x: "Après son accident, les médecins de Florence avaient peur pour la vie de Valeria. Sa mère s'est rendue à Assise pour prier sur la tombe de Carlo et lui demander d'intercéder, c'est-à-dire de prier Dieu avec elle. Selon les comptes rendus, Valeria a ensuite repris des forces très vite, et deux mois après l'accident elle est venue sur la tombe avec sa mère pour remercier.",
      s: "EWTN News, mai 2024 ; presse latino-américaine, UnoTV, Cuáles son los milagros reconocidos a Carlo Acutis" },
    prudence: "Ces deux guérisons ont été étudiées par des médecins du Vatican avant d'être reconnues. Les détails de l'histoire brésilienne varient selon les articles, ce qui rappelle de lire les récits avec prudence."
  },

  "therese": {
    reconnus: [
      { t: "Deux guérisons pour la béatification, 1923",
        x: "Pour la béatification de Thérèse, proclamée le 29 avril 1923 par le pape Pie XI, l'Église a retenu deux guérisons. L'une concernait un séminariste de Lisieux, Charles Anne, atteint de tuberculose en 1906. L'autre concernait sœur Louise de Saint-Germain, religieuse à Ustaritz, malade de l'estomac, vers 1916.",
        s: "Archives du Carmel de Lisieux, Les miracles de la béatification" },
      { t: "Canonisation en 1925",
        x: "Thérèse a été canonisée (déclarée sainte) à Rome le 17 mai 1925, 28 ans après sa mort à 24 ans. D'autres guérisons attribuées à sa prière avaient été examinées pour cette étape. Les sources que nous avons trouvées se contredisent sur les noms, nous ne les citons donc pas.",
        s: "Archives du Carmel de Lisieux ; Britannica, Saint Thérèse of Lisieux" }
    ],
    racontes: [
      { t: "La pluie de roses",
        x: "Avant de mourir, Thérèse a promis qu'elle ferait du bien sur la terre, comme en faisant tomber une pluie de roses. Depuis, beaucoup de croyants disent recevoir une rose ou sentir un parfum de rose après l'avoir priée. C'est un récit de dévotion, pas un fait étudié par l'Église." }
    ],
    temoignage: { t: "Charles Anne, séminariste malade",
      x: "Charles Anne était un séminariste de Lisieux. Il a attrapé la tuberculose en 1906, à une époque où cette maladie tuait souvent et où il y avait peu d'espoir de guérison. Les Carmélites de Lisieux conservent le dossier de son cas, qui a été examiné lors du procès pour la béatification de Thérèse.",
      s: "Archives du Carmel de Lisieux, Le procès apostolique, Les miracles de la béatification" },
    prudence: "Les deux guérisons de 1923 ont été examinées par l'Église, mais la médecine de l'époque était moins précise qu'aujourd'hui. La pluie de roses relève de la tradition."
  },

  "jp2": {
    reconnus: [
      { t: "Sœur Marie Simon-Pierre, béatification 2011",
        x: "Marie Simon-Pierre Normand, religieuse française malade de Parkinson (une maladie qui fait trembler et affaiblit les muscles), a dit se réveiller sans symptômes le 2 juin 2005, deux mois après la mort de Jean-Paul II. Sa communauté avait prié le pape défunt. Ce cas a été retenu pour la béatification, célébrée le 1er mai 2011 à Rome.",
        s: "Aleteia, Les miracles attribués à Jean-Paul II, 2017 ; US Catholic, Meet the women behind the miracles" },
      { t: "Floribeth Mora Díaz, canonisation 2014",
        x: "Floribeth Mora Díaz, une Costaricienne, avait un anévrisme au cerveau (une poche de sang dangereuse). Elle dit avoir été guérie le 1er mai 2011, le jour même de la béatification de Jean-Paul II. Ce cas a été retenu pour sa canonisation, qui a eu lieu le 27 avril 2014.",
        s: "NCR Online, Costa Rican woman details miracle credited to Blessed John Paul ; Inquirer, avril 2014" }
    ],
    racontes: [],
    temoignage: { t: "Floribeth Mora Díaz",
      x: "Floribeth raconte que, le jour de la béatification, elle regardait la télévision devant une photo de Jean-Paul II. Elle dit avoir entendu le pape lui dire de se lever et de ne pas avoir peur. Elle ajoute avoir senti sa santé revenir. Les journaux ne rapportent pas tous exactement les mêmes mots.",
      s: "NCR Online, Costa Rican woman details miracle credited to Blessed John Paul ; SCMP, Costa Rican woman speaks" },
    prudence: "Les deux guérisons ont été validées par des médecins et des théologiens du Vatican. Le cas de sœur Marie Simon-Pierre a été critiqué par certains médecins qui doutaient du diagnostic de Parkinson, ce qui reste discuté."
  },

  "padrepio": {
    reconnus: [
      { t: "Consiglia De Martino, béatification 1999",
        x: "En novembre 1995, Consiglia De Martino, de la région de Salerne en Italie, avait une rupture d'un canal près des poumons et on lui avait conseillé une opération. Elle est guérie sans soin selon sa famille. Le 30 avril 1998, le comité médical de la Congrégation pour les causes des saints a jugé la guérison inexplicable à l'unanimité. Padre Pio a été béatifié le 2 mai 1999.",
        s: "Saint-Siège, Congrégation pour les causes des saints, documents sur Padre Pio, 1999 ; Magis Center, The Padre Pio miracle" },
      { t: "Matteo Pio Colella, canonisation 2002",
        x: "Pour la canonisation, l'Église a retenu la guérison d'un enfant de San Giovanni Rotondo, Matteo Pio Colella. Padre Pio a été canonisé le 16 juin 2002 par Jean-Paul II.",
        s: "Saint-Siège, La canonisation de Padre Pio, 16 juin 2002" }
    ],
    racontes: [
      { t: "Les stigmates",
        x: "Selon la tradition, Padre Pio aurait reçu en 1918 des blessures aux mains, aux pieds et au côté, semblables à celles de Jésus en croix. On les appelle les stigmates. Ce fait est discuté, et la foi catholique ne repose pas sur lui." }
    ],
    temoignage: { t: "Consiglia De Martino",
      x: "Consiglia raconte avoir téléphoné à un frère de San Giovanni Rotondo, Fra Modestino Fucci, qui a prié sur la tombe de Padre Pio pour sa guérison. Il a confirmé plus tard avoir reçu ces appels. Elle était présente sur la place Saint-Pierre à la béatification, et un article de 2024 la décrit âgée de 72 ans et vivant à Salerne.",
      s: "Magis Center, The Padre Pio miracle ; Open, Consiglia De Martino, 28 mars 2024" },
    prudence: "Les deux guérisons ont été examinées par le Vatican. Les stigmates sont un point discuté, certains historiens et médecins les contestent, et l'Église ne les impose pas comme point de foi."
  },

  "teresa": {
    reconnus: [
      { t: "Monica Besra, béatification 2003",
        x: "Monica Besra, une femme indienne, avait une grosse masse au ventre. Le 5 septembre 1998, jour anniversaire de la mort de Mère Teresa, des sœurs ont posé sur son ventre une médaille avec l'image de Mère Teresa. Elle a été déclarée guérie le lendemain. Ce cas a été retenu pour la béatification de Mère Teresa, le 19 octobre 2003.",
        s: "Time, This Was Mother Teresa's First Miracle ; Vatican, béatification 2003" },
      { t: "Marcilio Haddad Andrino, canonisation 2016",
        x: "Marcilio Haddad Andrino, un Brésilien, avait plusieurs abcès au cerveau. Sa guérison a été reconnue par le pape François fin 2015. Mère Teresa a été canonisée sous le nom de sainte Teresa de Calcutta le 4 septembre 2016.",
        s: "NPR, How the Catholic Church documented Mother Teresa's two miracles, 2016 ; CBS News" }
    ],
    racontes: [],
    temoignage: { t: "Monica Besra et ses médecins",
      x: "Monica Besra dit avoir pris les médicaments de l'hôpital, mais affirme que la médaille lui a donné un soulagement complet. Son mari et un médecin qui l'a soignée disent autre chose. Le docteur Ranjan Mustafi explique qu'elle avait un kyste lié à la tuberculose, guéri par les bons médicaments. Ce cas est donc discuté.",
      s: "SBS News, Serious doubts over alleged miracle ; Time, Mother Teresa's first miracle" },
    prudence: "Les deux guérisons ont été reconnues par l'Église, mais la première est contestée par le mari et par un médecin de la patiente. Chacun peut lire ces explications et juger avec honnêteté."
  },

  "foucauld": {
    reconnus: [
      { t: "L'accident de Saumur, miracle retenu pour la canonisation",
        x: "Le 30 novembre 2016, à Saumur, un jeune ouvrier est tombé d'environ quinze mètres du haut d'une chapelle en chantier, qui est proche de l'école de cavalerie où Foucauld avait étudié. Il a survécu, alors que sa chute semblait fatale. Les responsables de la cause disent que ce n'est pas une guérison mais une préservation. Le miracle a été reconnu en mai 2020 et Charles de Foucauld a été canonisé le 15 mai 2022.",
        s: "Aleteia, Ce miracle qui va faire de Charles de Foucauld un saint, 29 mai 2020 ; RCF, La guérison inexpliquée de Charle" }
    ],
    racontes: [],
    temoignage: { t: "L'appel tardif du chantier",
      x: "François Asselin, qui dirigeait les travaux, a reçu un appel tard dans la soirée pour l'accident. Selon les récits publiés, l'accident est survenu quelques heures avant le centenaire de la mort de Charles de Foucauld. Les articles diffèrent sur l'âge du jeune homme, 21 ou 23 ans selon les sources.",
      s: "RCF, La guérison inexpliquée de Charle ; EWTN News, Charles de Foucauld and the miracle that paved the way" },
    prudence: "Ce cas a été étudié avant d'être reconnu, mais une survie après une chute est plus difficile à mesurer qu'une maladie. Les détails varient selon les articles."
  },

  "stein": {
    reconnus: [
      { t: "Benedicta McCarthy, Brockton (États-Unis), canonisation 1998",
        x: "En 1987, une fillette de deux ans et demi, Benedicta McCarthy, a avalé une énorme dose de paracétamol, un médicament courant qui peut détruire le foie à forte dose. Ses parents ont prié Édith Stein, et la fillette a guéri. Rome a confirmé le miracle en 1997 et Édith a été canonisée le 11 octobre 1998 par Jean-Paul II.",
        s: "Religion News Service ; Saint-Siège, Homélie de Jean-Paul II du 11 octobre 1998" },
      { t: "La béatification comme martyre, 1987",
        x: "Édith Stein, juive devenue carmélite, a été tuée à Auschwitz en 1942. Elle a été béatifiée à Cologne le 1er mai 1987 comme martyre. Pour un martyr, l'Église ne demande pas de miracle à cette étape. Elle en a demandé un seul, celui de 1987, pour la canonisation.",
        s: "Saint-Siège, Homélie de Jean-Paul II du 11 octobre 1998" }
    ],
    racontes: [],
    temoignage: { t: "La fillette et la prière",
      x: "La fillette porte le nom de religion d'Édith Stein, Teresia Benedicta de la Croix. Après l'accident, ses parents ont prié Édith Stein pour elle. Une source dit que le foie et les reins avaient été touchés, mais les autres sources ne le précisent pas.",
      s: "Religion News Service ; Holy Cross Magazine, Holy Cross celebrates canonization of Edith Stein" },
    prudence: "Le miracle de 1987 a été étudié par des médecins et par Rome. Les détails de la gravité de l'intoxication varient selon les sources."
  },

  "francois": {
    reconnus: [
      { t: "Canonisation rapide",
        x: "François d'Assise est mort le 3 octobre 1226 et a été canonisé le 16 juillet 1228 par le pape Grégoire IX, moins de deux ans plus tard. Les miracles attribués à François ne sont pas des dossiers médicaux comme ceux de Lourdes, la procédure n'était pas la même à l'époque.",
        s: "Universalis, François d'Assise" }
    ],
    racontes: [
      { t: "Les stigmates de La Verna, 1224",
        x: "Selon la tradition, en septembre 1224, pendant une retraite sur le mont de La Verna, François aurait eu la vision d'un être aux six ailes cloué sur une croix. Il aurait ensuite porté les marques de la croix sur ses mains, ses pieds et son côté, ce qu'on appelle les stigmates. Les dates varient entre le 14 et le 17 septembre, et des historiens discutent encore de ce récit, certains y voient une construction plus tardive." },
      { t: "Le sermon aux oiseaux",
        x: "Les premières biographies racontent que François aurait prêché aux oiseaux en leur demandant de louer Dieu. C'est un récit de tradition, surtout lu comme un signe de sa tendresse pour la création." }
    ],
    temoignage: { t: "Le récit de Thomas de Celano",
      x: "Thomas de Celano, un frère de François, a écrit la plus ancienne vie du saint (la Vita prima) peu après sa mort, à la demande du pape Grégoire IX. Il y décrit la vision du séraphin, un ange aux six ailes cloué sur une croix. Ce texte est la source principale, mais les historiens se demandent quels épisodes il a fusionnés.",
      s: "Avvenire, 800 anni dalle stimmate di san Francesco ; Aleteia, Il y a 800 ans, saint François recevait les stigmates, 16 septembre 2024" },
    prudence: "Que François ait été un homme saint et radical est solidement établi. Les stigmates sont un récit ancien, soutenu par des textes de ses proches mais discuté par des historiens, et la foi catholique n'en dépend pas."
  },

  "antoine": {
    reconnus: [
      { t: "Une canonisation en moins d'un an",
        x: "Antoine est mort près de Padoue, en Italie, le 13 juin 1231. Il a été canonisé en 1232, moins d'un an plus tard. C'est l'une des canonisations les plus rapides de l'histoire.",
        s: "Universalis, Antoine de Padoue ; Aleteia, Saint Antoine de Padoue, un missionnaire intemporel" }
    ],
    racontes: [
      { t: "La langue incorruptible",
        x: "Selon la tradition, en 1263, quand on a déplacé son corps dans une plus grande église sous la direction de saint Bonaventure, le corps était en poussière mais la langue était intacte. On y voit le signe d'un prédicateur dont la parole a touché les cœurs. Ce fait est raconté par la tradition franciscaine et n'est pas un miracle examiné par l'Église.",
        },
      { t: "Le sermon aux poissons",
        x: "Une légende tardive raconte qu'Antoine, ignoré par des gens qui refusaient de l'écouter, aurait prêché aux poissons, qui seraient venus à lui. C'est un récit populaire, à lire comme une image de sa parole." }
    ],
    temoignage: null,
    prudence: "La canonisation de 1232 est un fait historique. L'histoire de la langue et celle des poissons relèvent de la tradition franciscaine, et nous n'avons pas trouvé de dossier d'enquête que nous puissions citer."
  },

  "martin": {
    reconnus: [],
    racontes: [
      { t: "Le manteau partagé à Amiens",
        x: "Selon son biographe, Martin, un jeune soldat romain, a coupé son manteau en deux pour couvrir un pauvre qui grelottait aux portes d'Amiens, un hiver très froid. La nuit suivante, il aurait vu Jésus en songe portant cette moitié de manteau. Les dates varient entre 334 et 337 selon les historiens, et c'est un récit de tradition." },
      { t: "Les fleurs de la Loire",
        x: "Une légende dit que lorsque le corps de Martin a voyagé en bateau de Candes à Tours en novembre 397, les arbustes des rives se sont mis à fleurir. C'est un récit très tardif, qui raconte surtout l'amour des habitants pour leur évêque." }
    ],
    temoignage: { t: "Sulpice Sévère et la Vie de saint Martin",
      x: "Presque tout ce que nous savons de Martin vient de Sulpice Sévère, un écrivain qui l'a rencontré et qui a écrit sa Vie vers 396, avant la mort du saint en 397. Il y raconte l'épisode du manteau et des signes que Martin aurait faits. Ce texte est un récit de dévotion, pas un rapport d'enquête.",
      s: "Universalis, Martin de Tours ; Herodote.net, 11 novembre 397" },
    prudence: "L'existence de Martin, évêque de Tours mort en 397, est bien établie. Les miracles qu'on lui attribue viennent d'un récit de sa vie et sont à lire comme des histoires de tradition."
  },

  "nicolas": {
    reconnus: [],
    racontes: [
      { t: "Les trois jeunes filles et la dot",
        x: "Selon la tradition, un père trop pauvre ne pouvait pas marier ses trois filles. Nicolas aurait jeté en secret de l'argent pour leur dot par la fenêtre. C'est l'un des plus anciens récits sur lui, et un récit de tradition." },
      { t: "Les trois enfants ressuscités",
        x: "Une autre histoire de tradition raconte qu'il aurait ramené à la vie trois jeunes gens, ou trois enfants selon les versions. Ces récits varient beaucoup et ne sont pas des faits vérifiés." }
    ],
    temoignage: null,
    prudence: "On sait peu de choses sûres sur Nicolas, évêque de Myre en Turquie, mort vers le IVe siècle. Ses reliques sont arrivées à Bari, en Italie, en 1087, ce qui est historique. Les miracles relèvent de la tradition, et son culte est apparu environ deux siècles après sa mort."
  },

  "genevieve": {
    reconnus: [],
    racontes: [
      { t: "Paris sauvée d'Attila, 451",
        x: "Selon son récit de vie, Geneviève aurait convaincu les Parisiens de ne pas fuir devant l'armée d'Attila, et la ville aurait été épargnée. Les historiens notent que le récit mélange faits et légende, et que l'épisode du ravitaillement ferait plutôt penser au siège de 465." },
      { t: "La mère devenue aveugle",
        x: "La Vie de sainte Geneviève raconte que la mère de la jeune fille, devenue aveugle, aurait retrouvé la vue grâce à de l'eau bénie par Geneviève. C'est un récit de tradition, écrit longtemps après les faits." }
    ],
    temoignage: { t: "La Vie de sainte Geneviève",
      x: "Notre source principale est un texte ancien, la Vie de sainte Geneviève, écrit après sa mort vers la fin du VIe siècle, ou vers 520 selon d'autres. Les historiens s'accordent à penser qu'il y a de vraies traces de sa vie, mais le texte a plusieurs versions qu'on a du mal à relier entre elles.",
      s: "Universalis, Geneviève ; Britannica, Saint Genevieve" },
    prudence: "Geneviève a bien existé à Paris vers le Ve siècle. Les récits de miracles viennent d'un texte de dévotion plus tardif, dont les historiens discutent la valeur."
  },

  "pierre": {
    reconnus: [],
    racontes: [
      { t: "Tabitha ramenée à la vie, Actes 9, 36 à 42",
        x: "À Joppé, une disciple appelée Tabitha est morte. Pierre prie, puis lui dit de se lever, et elle ouvre les yeux. Ce récit est dans la Bible, que les catholiques reçoivent comme Parole de Dieu, mais il n'a pas fait l'objet d'une enquête comme à Lourdes." },
      { t: "L'ombre de Pierre, Actes 5, 15 et 16",
        x: "Les Actes disent que des malades étaient posés dans les rues pour que l'ombre de Pierre passe sur eux. Le texte rapporte une croyance de la foule, sans dire que chacun a été guéri." },
      { t: "La sortie de prison, Actes 12, 1 à 11",
        x: "Arrêté à Jérusalem par le roi Hérode, Pierre est libéré la nuit par un ange, selon les Actes des Apôtres. C'est un récit biblique, pas un dossier examiné par des médecins." }
    ],
    temoignage: { t: "Le boiteux à la Belle Porte, Actes 3, 1 à 10",
      x: "Pierre et Jean montent au Temple de Jérusalem. Un homme infirme depuis sa naissance leur demande de l'argent. Pierre répond que de l'argent et de l'or, il n'en a pas, mais qu'il lui donne ce qu'il a, et il lui dit de se lever et de marcher au nom de Jésus Christ. L'homme se lève et entre dans le Temple en louant Dieu.",
      s: "Bible, Actes des Apôtres 3, 1 à 10" },
    prudence: "Ces récits sont dans la Bible, et pour les catholiques ils font partie de la Parole de Dieu. Ils ne peuvent pas être vérifiés comme un dossier médical moderne."
  },

  "paul": {
    reconnus: [],
    racontes: [
      { t: "L'infirme de Lystre, Actes 14, 8 à 10",
        x: "À Lystre, un homme infirme depuis sa naissance écoute Paul parler. Paul voit qu'il a la foi et lui dit de se lever, et l'homme marche. Le texte biblique rapporte ensuite que la foule veut les prendre pour des dieux." },
      { t: "Eutyque à Troas, Actes 20, 7 à 12",
        x: "Pendant que Paul parle tard dans la nuit à Troas, un jeune homme nommé Eutyque s'endort sur une fenêtre et tombe du troisième étage. Les Actes disent qu'on l'a relevé mort, que Paul est descendu et que le jeune homme est reparti vivant." },
      { t: "Mordu par une vipère à Malte, Actes 28, 3 à 9",
        x: "Naufragé à Malte, Paul est mordu par une vipère, mais il n'est pas touché. Le récit ajoute qu'il a ensuite prié pour le père de Publius, malade, qui a été guéri." }
    ],
    temoignage: { t: "Paul parle lui-même de signes",
      x: "Dans ses propres lettres, Paul dit que Dieu a agi par lui avec des signes et des prodiges (Romains 15, 19). Il écrit aussi aux Corinthiens que les signes d'un apôtre ont été produits parmi eux (2 Corinthiens 12, 12). C'est un témoignage de l'apôtre lui-même, mais il n'en donne pas les détails.",
      s: "Bible, Lettre aux Romains 15, 19 et deuxième Lettre aux Corinthiens 12, 12" },
    prudence: "Les récits des Actes sont des textes de foi reçus par l'Église comme Parole de Dieu. Les lettres de Paul ont une valeur historique, mais elles ne permettent pas de vérifier chaque miracle."
  },

  "marie": {
    reconnus: [
      { t: "Lourdes, 1858 reconnue en 1862",
        x: "Du 11 février au 16 juillet 1858, Bernadette Soubirous dit avoir vu la Vierge Marie dix-huit fois dans la grotte de Massabielle, à Lourdes, en France. L'évêque de Tarbes a déclaré le 18 janvier 1862 que ces apparitions étaient dignes de foi et il a autorisé le culte. Les catholiques ne sont pas obligés d'y croire.",
        s: "Sanctuaires Notre-Dame de Lourdes, La reconnaissance des apparitions de Lourdes" },
      { t: "Fatima, 1917 reconnue en 1930",
        x: "Du 13 mai au 13 octobre 1917, trois enfants portugais, Lucie, François et Jacinthe, disent avoir vu la Vierge Marie six fois à la Cova da Iria, près de Fatima. Le 13 octobre 1930, l'évêque de Leiria, José Alves Correia da Silva, a déclaré ces visions dignes de crédit et a autorisé le culte. Là encore, personne n'est obligé d'y croire.",
        s: "Universalis, Fatima ; Britannica, Fatima" }
    ],
    racontes: [
      { t: "Guadalupe, Mexique, 1531",
        x: "Selon la tradition, en décembre 1531, la Vierge serait apparue à Juan Diego, un Indien converti, sur la colline du Tepeyac près de Mexico. L'Église a canonisé Juan Diego en 2002, mais le plus ancien texte écrit connu date de 1649 et plusieurs historiens doutent de ce récit, que d'autres défendent. C'est donc une tradition très aimée, dont l'histoire est discutée." }
    ],
    temoignage: { t: "Bernadette et l'Immaculée Conception",
      x: "Le 25 mars 1858, Bernadette a demandé son nom à la dame, qui lui a répondu en patois local qu'elle était l'Immaculée Conception. Bernadette ne comprenait pas ces mots et les a répétés en chemin pour ne pas les oublier. Elle les a rapportés à son curé, qui a été très touché, car l'Église venait de proclamer ce dogme en 1854.",
      s: "Sanctuaires Notre-Dame de Lourdes, Les apparitions de 1858" },
    prudence: "L'Église juge les apparitions de Lourdes et de Fatima dignes de foi, mais elle ne les impose jamais comme point de foi. Guadalupe est une tradition vénérée dont l'histoire est discutée par les historiens."
  }
};
