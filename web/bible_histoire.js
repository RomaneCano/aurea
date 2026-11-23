// Histoire de la Bible, livre animé, lecture des références et foire aux questions.
// Chaque fait a été relevé dans une source consultée (Wikipédia fr et en, Vatican, AELF). Ce qui est discuté par les spécialistes est signalé comme tel.
const BIBLE_HISTOIRE = {
intro:"La Bible n'est pas tombée du ciel en un seul bloc. C'est une petite bibliothèque de 73 livres, écrits puis recopiés pendant de très nombreux siècles, avant d'être traduits dans beaucoup de langues. Ce parcours raconte avec honnêteté ce que l'histoire sait, ce que les spécialistes discutent encore et ce que la foi catholique ajoute.",

etapes:[
{ t:"Un mot qui veut dire « les livres »",
  x:[
   "Le mot « Bible » vient du grec biblia, qui veut dire « les livres ». C'est un pluriel. Dès le départ, on parle donc d'une collection de textes et non d'un seul livre.",
   "Le mot grec biblion, « livre », vient lui-même de la ville phénicienne de Byblos, d'où l'on tirait le papyrus pour écrire. Au Moyen Âge, les auteurs latins ont traité biblia comme un nom féminin singulier, ce qui a donné « la Bible ».",
   "La Bible catholique compte 73 livres, soit 46 pour l'Ancien Testament et 27 pour le Nouveau. Le Catéchisme de l'Église catholique précise qu'on compte 45 livres pour l'Ancien Testament si l'on réunit Jérémie et les Lamentations. Ces livres sont de genres très différents, avec des récits, des lois, des poèmes, des prières, des paroles de sagesse et des lettres."
  ],
  faits:["Le mot grec biblia veut dire « les livres »","Jean Chrysostome semble être le premier à employer ta biblia pour l'ensemble des deux Testaments, dans des homélies prononcées entre 386 et 388","Canon catholique de 46 livres pour l'Ancien Testament et 27 pour le Nouveau, soit 73 livres au total"],
  sources:["Wikipédia, Bible","Wikipedia, Bible","Catéchisme de l'Église catholique, 120"] },

{ t:"Une parole d'abord dite, puis écrite",
  x:[
   "Beaucoup de textes de la Bible ont d'abord été racontés, chantés ou récités avant d'être écrits. Les spécialistes ne sont pas d'accord sur les dates exactes. Pour l'Ancien Testament, la recherche actuelle repère en général deux grandes périodes d'écriture, autour de l'exil à Babylone au VIe siècle avant notre ère. La première commence entre la fin du VIIIe et le début du VIe siècle avant notre ère, la seconde vers le IIIe siècle avant notre ère. Les chercheurs estiment que la rédaction s'est étalée du VIIIe siècle avant notre ère jusqu'à la fin du Ier siècle de notre ère ou le début du IIe, et on parle souvent d'une durée de l'ordre de mille ans.",
   "L'hypothèse la plus connue, celle des « sources » du Pentateuque (les cinq premiers livres), n'est plus dominante aujourd'hui. Un fait est certain. Parmi les plus anciens textes de la Bible hébraïque encore conservés, on connaît deux petites plaquettes d'argent trouvées près de Jérusalem. Elles datent d'environ 600 avant notre ère et contiennent une bénédiction proche de celle du livre des Nombres.",
   "Les juifs regroupent leurs livres sacrés en trois parties, la Torah (la Loi), les Nevi'im (les Prophètes) et les Ketouvim (les Écrits). L'ensemble s'appelle le Tanakh. Selon Wikipédia, la Torah est reconnue comme sacrée vers le Ve siècle avant notre ère, les Prophètes vers le IVe et les Écrits vers le Ier. On a longtemps cru qu'une assemblée à Jamnia, vers l'an 100, avait fermé la liste. Cette idée est aujourd'hui de plus en plus critiquée."
  ],
  faits:["Vers 600 avant notre ère, plaquettes d'argent de Ketef Hinnom, plus anciens textes connus de la Bible hébraïque","Torah reconnue vers le Ve siècle avant notre ère, Prophètes vers le IVe, Écrits vers le Ier (datation de Wikipédia)","Fin du Ier siècle de notre ère, le texte hébreu est stabilisé (forme dite protomassorétique)"],
  sources:["Wikipédia, Bible","Wikipédia, Canon biblique","Wikipedia, Ketef Hinnom","Wikipedia, Biblical canon"] },

{ t:"Trois langues et la Septante",
  x:[
   "L'Ancien Testament est écrit surtout en hébreu. Quelques passages sont en araméen, la langue courante de la région à l'époque, par exemple Dn 2,4-7,28 et des parties d'Esdras. Le Nouveau Testament est écrit en grec, le grec commun de l'époque appelé koinè. Selon Wikipédia, Jésus parlait vraisemblablement un dialecte araméen de Galilée.",
   "Au IIIe siècle avant notre ère, des Juifs d'Égypte, qui parlaient grec, ont eu besoin de leurs livres sacrés dans leur langue. Le Pentateuque est donc traduit en grec en Égypte, puis les autres livres le sont dans les siècles suivants. Cette traduction s'appelle la Septante. Une légende, la Lettre d'Aristée, parle de 72 traducteurs envoyés de Jérusalem. Les historiens jugent ce récit légendaire. Ils discutent encore des raisons exactes de la traduction.",
   "La Septante contient des livres absents de la Bible hébraïque, comme Sagesse ou 2 Maccabées, certains écrits directement en grec. Les premiers chrétiens ont adopté ce corpus grec, et il est resté l'Ancien Testament des Églises de langue grecque. Le judaïsme rabbinique, lui, s'en est détaché. Le concile Vatican II rappelle que l'Église, « dès le commencement, a fait sienne cette antique version grecque » (Dei Verbum 22)."
  ],
  faits:["IIIe siècle avant notre ère, traduction grecque du Pentateuque en Égypte","Autour du IIe siècle avant notre ère, Papyrus Rylands 458, plus ancien manuscrit de la Loi en grec (Deutéronome)","Les autres livres sont traduits jusqu'au Ier siècle de notre ère"],
  sources:["Wikipédia, Septante","Wikipédia, Ancien Testament","Wikipédia, Jésus de Nazareth","Dei Verbum 22"] },

{ t:"Les lettres et les Évangiles",
  x:[
   "Les plus anciens textes du Nouveau Testament sont des lettres. Sept lettres de Paul (Romains, 1 et 2 Corinthiens, Galates, Philippiens, 1 Thessaloniciens, Philémon) sont reconnues comme authentiques par la majorité des chercheurs. Elles sont rédigées entre 48 et 61 environ, surtout dans les années 50, soit une vingtaine d'années après la mort de Jésus, que l'on situe vers l'an 30. Pour les autres lettres attribuées à Paul, beaucoup de spécialistes pensent qu'elles sont l'œuvre de ses disciples. Ce point est discuté.",
   "Les Évangiles viennent ensuite. Selon l'avis le plus répandu des spécialistes, Marc est le plus ancien, vers l'an 70, puis Matthieu et Luc vers 80-90, et Jean en plusieurs étapes jusqu'à 95-110 environ. Les dates sont des estimations. La « théorie des deux sources » explique que Matthieu et Luc ont utilisé Marc et un recueil de paroles de Jésus, appelé source Q, que personne n'a retrouvé.",
   "L'évangéliste Luc le dit lui-même au début de son livre. Plusieurs avant lui ont mis par écrit ce que des témoins oculaires avaient transmis (Lc 1,1-4). Le Catéchisme, qui reprend Vatican II, distingue trois étapes, la vie de Jésus, la prédication orale des apôtres, puis les Évangiles écrits. L'Église affirme l'historicité des quatre Évangiles. Les historiens, eux, discutent beaucoup du détail des récits, et reconnaissent largement comme historiques le baptême de Jésus par Jean et sa crucifixion sous Ponce Pilate."
  ],
  faits:["Vers 30, mort de Jésus selon l'avis courant des historiens","Années 50, lettres authentiques de Paul, plus anciens textes du Nouveau Testament","Vers 70, Évangile selon Marc, puis Matthieu et Luc vers 80-90, Jean jusqu'à 95-110 environ"],
  sources:["Wikipédia, Épîtres de Paul","Wikipédia, Évangile","Wikipédia, Évangile selon Marc","Wikipédia, Évangile selon Jean","Wikipédia, Problème synoptique","Catéchisme de l'Église catholique, 126","Dei Verbum 18 et 19","Wikipedia, Historicity of Jesus"] },

{ t:"Comment le Nouveau Testament a été fixé",
  x:[
   "Personne n'a décidé un jour de tout fixer d'un seul coup. Vers 140, Marcion compose une première liste chrétienne, très courte, qui rejette l'Ancien Testament, et l'Église n'a pas suivi son choix. Vers 180, Irénée de Lyon parle déjà de quatre Évangiles. Le fragment de Muratori est une très ancienne liste de livres du Nouveau Testament. Sa date est discutée, entre la fin du IIe siècle et le IVe siècle.",
   "Au début du IIIe siècle, Origène utilise peut-être déjà les 27 livres actuels, mais on débat encore de Hébreux, Jacques, 2 Pierre, 2 et 3 Jean, Jude et l'Apocalypse. En 367, Athanase d'Alexandrie cite les 27 livres du Nouveau Testament dans sa lettre festale. Une liste attribuée à un concile de Rome en 382, sous le pape Damase, est reprise aux conciles d'Hippone en 393 et de Carthage en 397 et 419. Selon la tradition, cette liste de Rome serait de Damase, ce qui est incertain. La liste officielle de Carthage de 397 est la plus ancienne qui nous soit parvenue en entier.",
   "Pour la foi catholique, ce n'est pas l'Église qui a inventé ces livres. Elle a discerné, grâce à la Tradition apostolique, ceux qui transmettent la foi reçue des apôtres (Catéchisme, 120). Pour l'historien, on voit un tri qui a pris plusieurs siècles, avec des hésitations. Pour l'Église catholique, le concile de Trente a confirmé définitivement la liste de toute la Bible le 8 avril 1546."
  ],
  faits:["Vers 140, liste de Marcion","Vers 180, Irénée de Lyon cite quatre Évangiles","367, lettre festale d'Athanase d'Alexandrie avec les 27 livres","393 Hippone, 397 et 419 Carthage, listes de livres","8 avril 1546, concile de Trente confirme le canon catholique"],
  sources:["Wikipedia, Development of the New Testament canon","Wikipédia, Canon biblique","Wikipédia, Canon de Muratori","Catéchisme de l'Église catholique, 120"] },

{ t:"La Vulgate de saint Jérôme",
  x:[
   "Au IVe siècle, il existe presque autant de versions latines de la Bible que de copies. L'évêque de Rome, Damase (366-384), demande à Jérôme de produire un texte fiable. Jérôme traduit ou révise les Évangiles à Rome vers 383-384. À Bethléem, il traduit ensuite l'Ancien Testament à partir de l'hébreu, entre 390 et 405 selon la plupart des chercheurs.",
   "Le mot « Vulgate » vient du latin vulgata, « rendue publique ». Jérôme ne l'employait pas pour son travail. Ce nom ne s'impose qu'au XVIe siècle, et le concile de Trente de 1546 parle de « l'ancienne édition vulgate ». La Vulgate est ensuite devenue la Bible commune de l'Occident. Sa forme dite sixto-clémentine (1592) a fait autorité dans l'Église latine jusqu'en 1979, année de la Néo-Vulgate.",
   "Jérôme n'a presque pas traduit les livres que nous appelons deutérocanoniques. Il a traduit Tobie et Judith depuis l'araméen, et les ajouts à Esther et à Daniel à partir du grec. Il les jugeait non canoniques. Ces livres figurent pourtant dans la Vulgate telle qu'elle s'est constituée après Jérôme."
  ],
  faits:["382-385, Jérôme révise le Psautier latin à Rome","383-384, révision des Évangiles à Rome","390-405, traduction de l'Ancien Testament depuis l'hébreu à Bethléem","1592, édition dite sixto-clémentine, texte de référence de l'Église latine jusqu'en 1979"],
  sources:["Wikipédia, Vulgate","Wikipédia, Évangile apocryphe","Dei Verbum 22"] },

{ t:"Des siècles de copistes",
  x:[
   "Avant l'imprimerie, chaque exemplaire de la Bible était copié à la main, avec des erreurs possibles et parfois des corrections. Dans le Codex Vaticanus, du IVe siècle, un correcteur a écrit en marge de He 1,3 cette remarque, « Insensé et voyou, conserve l'ancienne lecture et ne la change pas ». Cela suggère que les corrections non autorisées étaient un problème fréquent dans les ateliers de copie.",
   "Pour le Nouveau Testament, on conserve plus de 5 800 manuscrits grecs, environ 10 000 en latin et plus de 9 000 dans d'autres langues anciennes. Ils contiennent environ 300 000 variantes selon une estimation, d'autres chiffres vont jusqu'à 400 000. La plupart sont des changements d'ordre des mots ou des détails sans importance. Quelques-unes pèsent davantage. Les plus anciens grands manuscrits ne contiennent pas Mc 16,9-20 ni Jn 7,53-8,11. Beaucoup de Bibles modernes, dont la TOB, gardent pourtant une finale après Mc 16,8.",
   "Pour l'Ancien Testament, la découverte des manuscrits de la mer Morte en 1947 a permis de comparer le texte hébreu à une copie 1 000 ans plus ancienne que les plus vieux manuscrits connus jusque-là. Le grand rouleau d'Isaïe est globalement conforme au texte massorétique, le texte hébreu transmis par la tradition juive, avec pourtant plus de 2 600 différences, dont la plupart sont minimes. La « critique textuelle » est le travail des spécialistes qui comparent tous ces témoins pour retrouver le meilleur texte."
  ],
  faits:["IVe siècle, Codex Vaticanus et Codex Sinaiticus, premiers grands manuscrits de toute la Bible grecque","1008, Codex de Leningrad, plus ancien manuscrit complet de la Bible hébraïque","1947, début de la découverte des manuscrits de la mer Morte"],
  sources:["Wikipédia, Codex Vaticanus","Wikipedia, Textual criticism","Wikipedia, Biblical manuscript","Wikipedia, Isaiah Scroll","Wikipedia, Leningrad Codex"] },

{ t:"Gutenberg et les langues vivantes",
  x:[
   "Vers 1455, à Mayence, Johannes Gutenberg imprime une Bible en latin. Il est aidé de Pierre Schoeffer et financé par Johann Fust. C'est la Bible dite « à 42 lignes ». On estime sa production à 150 à 180 exemplaires, et 49 exemplaires subsistent. À partir de là, on peut produire beaucoup d'exemplaires plus vite qu'à la main.",
   "Les traductions dans les langues du peuple se multiplient. La Bible de Wycliffe en anglais date de 1382 à 1395 environ, d'après la Vulgate. Martin Luther publie le Nouveau Testament en allemand en 1522 et la Bible complète en 1534. Il place les livres deutérocanoniques à part avec une préface qui insiste sur leur caractère non canonique. La King James Version, en anglais, paraît en 1611, grâce à une équipe d'une cinquantaine de traducteurs.",
   "Le XVIe siècle est aussi celui de la rupture sur la liste des livres. Les Églises protestantes gardent seulement les livres de la Bible hébraïque pour l'Ancien Testament, ce qui donne 39 livres. L'Église catholique confirme sa liste au concile de Trente (1546)."
  ],
  faits:["Vers 1455, Bible de Gutenberg à Mayence","1522 Nouveau Testament de Luther, 1534 Bible complète","1611, King James Version","1546, concile de Trente"],
  sources:["Wikipédia, Bible de Gutenberg","Wikipedia, Wycliffe's Bible","Wikipédia, Bible de Luther","Wikipédia, Bible du roi Jacques","Wikipédia, Canon biblique"] },

{ t:"Les grandes traductions en français",
  x:[
   "Les premières traductions françaises, comme celle de Jean Le Bon à l'Université de Paris (1226-1250) ou la Bible historiale de Guyart Desmoulins (1297), partent du latin. Pierre Robert, dit Olivétan, publie à Neuchâtel en 1535 la première traduction française faite à partir des textes originaux en hébreu et en grec.",
   "Du côté protestant, Louis Segond publie l'Ancien Testament en 1874 et la Bible entière en 1880. Elle est la plus utilisée par les protestants francophones. Du côté catholique, la Bible du chanoine Augustin Crampon, mort en 1894, sort en 1904. La Bible de Jérusalem, préparée par l'École biblique des dominicains de Jérusalem, paraît en un volume en 1956. La Traduction œcuménique de la Bible (TOB), faite par des catholiques et des protestants ensemble, paraît en 1975.",
   "En 2013 paraît la traduction officielle liturgique, utilisée à la messe, publiée par l'Association épiscopale liturgique pour les pays francophones (AELF). Elle est le fruit de plus de 17 ans de travail de plus de 70 spécialistes. La Bible d'Auréa est la Sainte Bible néo-Crampon Libre, une modernisation de la traduction de Crampon, avec les droits de la Fraternité de Tibériade et une licence libre."
  ],
  faits:["1535, Bible d'Olivétan, première traduction française sur les textes originaux","1880, Bible Segond complète","1904, Bible Crampon","1956, Bible de Jérusalem en un volume, 1975, TOB, 2013, traduction liturgique officielle"],
  sources:["Wikipédia, Traductions de la Bible en français","Wikipédia, Bible de Jérusalem","Wikipédia, Traduction œcuménique de la Bible","Wikipédia, Augustin Crampon","AELF, La Bible","Fraternité de Tibériade, néo-Crampon Libre, licence"] },

{ t:"Lire la Bible dans l'Église aujourd'hui",
  x:[
   "Le concile Vatican II, dans la constitution Dei Verbum (18 novembre 1965), demande que « l'accès à la Sainte Écriture soit largement ouvert aux fidèles du Christ » (n° 22). Il rappelle une phrase de saint Jérôme, « l'ignorance des Écritures, c'est l'ignorance du Christ » (n° 25).",
   "Pour lire sans se tromper, l'Église donne des repères. Il faut chercher ce que les auteurs ont voulu dire, en tenant compte de leur époque et des « genres littéraires », car on n'écrit pas un poème comme un récit d'histoire (Dei Verbum 12). Il faut aussi lire chaque passage en pensant à toute la Bible, dans la Tradition vivante de l'Église, et en gardant la cohérence de la foi (Catéchisme, 112-114).",
   "Le Catéchisme distingue le sens littéral, ce que le texte dit, et le sens spirituel, qui se divise en sens allégorique, moral et anagogique (Catéchisme, 115-119). Le christianisme n'est pas non plus une « religion du Livre », mais la religion de la Parole de Dieu, qui est une personne vivante, le Christ (Catéchisme, 108)."
  ],
  faits:["18 novembre 1965, constitution Dei Verbum de Vatican II","Catéchisme de l'Église catholique, 105 à 133, la Sainte Écriture"],
  sources:["Dei Verbum","Catéchisme de l'Église catholique, 80 à 133"] }
],

manuscrits:[
{ nom:"Plaquettes d'argent de Ketef Hinnom",
  date:"Fin du VIIe ou début du VIe siècle avant notre ère",
  lieu_decouverte:"Ketef Hinnom, des caveaux funéraires de l'époque du royaume de Juda, au sud-ouest de la vieille ville de Jérusalem, trouvées en 1979",
  contenu:"Deux minuscules feuilles d'argent roulées, qui servaient sans doute d'amulettes. Elles portent une version de la bénédiction des prêtres, proche de Nb 6,24-26.",
  conservation:"Musée d'Israël, à Jérusalem",
  repere:"Plus ancien texte biblique connu, Ancien Testament",
  pourquoi:"Ce sont, à ce jour, les plus anciens passages connus de la Bible hébraïque, écrits avant l'exil à Babylone. Le fouilleur Gabriel Barkay a d'abord proposé la fin du VIIe siècle, puis a rapproché la date du début du VIe siècle avant notre ère." },
{ nom:"Manuscrits de la mer Morte (Qumrân)",
  date:"Du IIIe siècle avant notre ère au Ier siècle de notre ère",
  lieu_decouverte:"Grottes près de Qumrân, sur la rive nord de la mer Morte, entre 1946-1947 et 1956",
  contenu:"Environ 15 000 rouleaux et fragments. Environ 235 sont des textes bibliques, et on y trouve des morceaux de tous les livres de la Bible hébraïque sauf Esther, ainsi que des livres comme Tobie et le Siracide.",
  conservation:"Pour l'essentiel au Sanctuaire du Livre, Musée d'Israël, à Jérusalem. Cette garde est contestée par la Jordanie et l'Autorité palestinienne.",
  pourquoi:"Le grand rouleau d'Isaïe est environ 1 000 ans plus ancien que les plus vieux manuscrits hébreux connus avant ces découvertes. Selon Wikipédia, le texte biblique restait très souple jusqu'à sa reconnaissance définitive vers l'an 100. Les circonstances exactes de la découverte, entre novembre 1946 et le printemps 1947, restent racontées de plusieurs façons." },
{ nom:"Grand rouleau d'Isaïe (1QIsa a)",
  date:"Vers 125 avant notre ère, la datation au carbone 14 donne entre 356 et 103 avant notre ère",
  lieu_decouverte:"Grotte 1 de Qumrân, trouvé par des bergers bédouins en 1946-1947",
  contenu:"Presque tout le livre d'Isaïe, en hébreu, sur 17 feuilles de parchemin. Long d'environ 7,3 mètres, 54 colonnes de texte.",
  conservation:"Sanctuaire du Livre, Musée d'Israël, à Jérusalem",
  pourquoi:"C'est le plus ancien exemplaire complet connu du livre d'Isaïe. Son texte est globalement proche du texte massorétique, alors qu'il est environ mille ans plus ancien que les manuscrits hébreux connus auparavant. Il présente aussi plus de 2 600 variantes, la plupart mineures." },
{ nom:"Papyrus Rylands 458, plus ancien manuscrit de la Loi en grec",
  date:"Milieu ou première moitié du IIe siècle avant notre ère",
  lieu_decouverte:"Découvert en 1917 par le savant J. Rendel Harris",
  contenu:"Huit petits fragments de papyrus, avec une vingtaine de versets du Deutéronome, de Dt 23 à Dt 28, dans la traduction grecque de la Septante.",
  conservation:"John Rylands Library, à Manchester, Royaume-Uni",
  pourquoi:"C'était le plus ancien manuscrit connu de la Bible grecque avant les manuscrits de la mer Morte. Il montre que la Septante existait déjà au IIe siècle avant notre ère." },
{ nom:"Papyrus Rylands 457 (P52)",
  date:"Début ou milieu du IIe siècle, entre 100 et 175 selon les spécialistes",
  lieu_decouverte:"Acquis sur le marché égyptien en 1920 par Bernard Grenfell, probablement trouvé en Égypte",
  contenu:"Un fragment de codex de 8,9 cm sur 6,4 cm. Au recto, sept lignes de Jn 18,31-33. Au verso, des lignes de Jn 18,37-38.",
  conservation:"John Rylands Library, à Manchester, Royaume-Uni",
  repere:"Plus ancien fragment connu du Nouveau Testament",
  pourquoi:"On le considère en général comme le plus ancien morceau conservé d'un texte du Nouveau Testament. Sa date, établie seulement d'après l'écriture, reste débattue, d'où une fourchette de 100 à 175 selon les experts." },
{ nom:"Papyri Chester Beatty",
  date:"Surtout du IIIe siècle",
  lieu_decouverte:"Égypte, annoncés en 1931. Les circonstances exactes de la découverte sont mal connues.",
  contenu:"Onze manuscrits en grec, sept pour l'Ancien Testament, trois pour le Nouveau et un autre texte. Le P46 contient les lettres de Paul, vers l'an 200, et le P45 les quatre Évangiles et les Actes.",
  conservation:"Chester Beatty Library de Dublin, en Irlande, et Université du Michigan",
  pourquoi:"Ils sont plus anciens d'un siècle ou plus que les grands codex Vaticanus et Sinaiticus. Ils surprennent les chercheurs, parce qu'ils sont des codex, c'est-à-dire des livres à pages, et non des rouleaux, alors qu'on croyait cette forme peu utilisée avant le IVe siècle." },
{ nom:"Papyri Bodmer",
  date:"Le plus ancien, le P66 (Évangile de Jean), date d'environ 200",
  lieu_decouverte:"Pabau, près de Dishna, en Égypte, en 1952",
  contenu:"22 papyri en grec et en copte, avec des textes de l'Ancien et du Nouveau Testament. Le P66 contient Jean. Le P75 contient la plus grande partie de Luc et de Jean. Le P72 est la plus ancienne copie connue de Jude et de 1 et 2 Pierre.",
  conservation:"Bibliothèque Bodmer, à Cologny près de Genève, Suisse. Le P75 est à la Bibliothèque vaticane depuis 2007.",
  pourquoi:"Le P66, d'environ 200, est, après le fragment P52, l'un des plus anciens témoins de l'Évangile de Jean. Il ne contient pas l'épisode de la femme adultère (Jn 7,53-8,11)." },
{ nom:"Codex Vaticanus",
  date:"IVe siècle",
  lieu_decouverte:"Lieu d'origine discuté. Conservé à la Bibliothèque vaticane depuis au moins le XVe siècle.",
  contenu:"Presque toute la Bible grecque, sur 759 feuilles de parchemin en trois colonnes. Il manque notamment les chapitres 1 à 46 de la Genèse, remplacés au XVe siècle, la fin de la lettre aux Hébreux (après He 9,14), les lettres à Timothée, Tite, Philémon et l'Apocalypse.",
  conservation:"Bibliothèque apostolique vaticane, Rome",
  pourquoi:"Avec le Sinaiticus, c'est l'un des deux plus anciens manuscrits connus qui transmettent presque toute la Bible. L'édition de Cambridge de la Septante imprime son texte, et celle de Rahlfs en reste proche." },
{ nom:"Codex Sinaiticus",
  date:"IVe siècle, entre 325 et 360",
  lieu_decouverte:"Monastère Sainte-Catherine du Sinaï, la plus grande partie trouvée par Constantin von Tischendorf entre 1844 et 1859",
  contenu:"Des parties de l'Ancien Testament en grec, tout le Nouveau Testament, ainsi que l'Épître de Barnabé et le Pasteur d'Hermas. Il se termine à Mc 16,8 et ne contient pas Jn 7,53-8,11.",
  conservation:"Quatre institutions, British Library, Université de Leipzig, monastère Sainte-Catherine et Bibliothèque nationale russe. Il est numérisé en ligne depuis 2008.",
  pourquoi:"C'est le seul des deux grands codex du IVe siècle qui contienne tout le Nouveau Testament, et il y ajoute des écrits qui ne sont pas dans la Bible (Barnabé, Hermas). Les conditions dans lesquelles Tischendorf l'a rapporté restent contestées par les moines du Sinaï." },
{ nom:"Codex Alexandrinus",
  date:"Ve siècle",
  lieu_decouverte:"Ayant séjourné à Alexandrie, il a été apporté à Constantinople par le patriarche Cyrille Lucaris, puis offert au roi d'Angleterre Charles Ier au XVIIe siècle",
  contenu:"La plus grande partie de l'Ancien Testament grec et le Nouveau Testament, sur 773 feuilles de parchemin.",
  conservation:"British Library, à Londres",
  pourquoi:"C'est l'un des grands codex en lettres capitales qui contenaient toute la Bible grecque, avec le Vaticanus et le Sinaiticus. Il est le premier manuscrit de la liste moderne des manuscrits du Nouveau Testament, qui le désigne par la lettre A." },
{ nom:"Codex de Leningrad",
  date:"1008 ou 1009, selon son colophon (note du copiste)",
  lieu_decouverte:"Copié au Caire. Il a été acquis par Abraham Firkovich, qui n'a pas dit où, et se trouvait à Odessa en 1838.",
  contenu:"Toute la Bible hébraïque avec les voyelles et les notes des massorètes, les savants juifs qui fixaient le texte.",
  conservation:"Bibliothèque nationale de Russie, à Saint-Pétersbourg, depuis 1863",
  pourquoi:"C'est le plus ancien manuscrit complet de la Bible hébraïque. Son texte est reproduit dans la Biblia Hebraica Stuttgartensia (1977), grande édition savante de la Bible hébraïque." }
],

geographie:{
x:[
 "La Bible est née dans plusieurs pays. L'Ancien Testament vient surtout du monde d'Israël et de Juda, autour de Jérusalem. Les plaquettes de Ketef Hinnom ont été trouvées juste à côté de la ville. L'exil à Babylone, au VIe siècle avant notre ère, est un tournant. Les chercheurs placent autour de lui deux grandes périodes d'écriture. Ensuite le pays passe sous domination perse (538-332 avant notre ère), puis grecque.",
 "Le judaïsme vit aussi hors de Terre sainte. À Alexandrie, en Égypte, des Juifs de langue grecque traduisent leurs livres, ce qui donne la Septante. Certains livres, comme la Sagesse et 2 Maccabées, ont été écrits directement en grec. Les manuscrits de la mer Morte viennent de Qumrân, en Judée.",
 "Le Nouveau Testament se répand dans tout le monde romain. Jésus a vécu en Galilée et en Judée, et parlait vraisemblablement araméen. Mais les textes du Nouveau Testament sont en grec. Paul écrit à des communautés de Rome, de Corinthe, de Galatie, d'Éphèse, de Philippes, de Colosses et de Thessalonique. À Antioche, les disciples reçoivent pour la première fois le nom de chrétiens (Ac 11,26). L'Apocalypse est adressée à sept Églises d'Asie, dont celle d'Éphèse (Ap 1,11). Selon une tradition, le disciple Jean aurait vécu à Éphèse, ce que les historiens ne peuvent pas confirmer. Les plus anciens papyrus chrétiens connus viennent d'Égypte."
],
lieux:[
 { nom:"Jérusalem", lon:35.2256, lat:31.7789, role:"Ville du Temple, au cœur du monde biblique. Les plaquettes de Ketef Hinnom, les plus anciens textes bibliques connus, y ont été trouvées. Les Romains détruisent le Temple en 70." },
 { nom:"Babylone", lon:44.4211, lat:32.5425, role:"Lieu de l'exil au VIe siècle avant notre ère, autour duquel s'organisent les grandes étapes de rédaction de l'Ancien Testament. Les targoums officiels furent plus tard reçus en Babylonie." },
 { nom:"Qumrân", lon:35.4586, lat:31.7408, role:"Site près de la mer Morte où ont été trouvés les manuscrits de la mer Morte, entre 1946-1947 et 1956." },
 { nom:"Alexandrie", lon:29.8925, lat:31.1975, role:"Ville d'Égypte où a été traduite la Septante. Elle a aussi donné son nom au Codex Alexandrinus." },
 { nom:"Antioche", lon:36.1817, lat:36.2047, role:"Ville de Syrie où les disciples de Jésus reçoivent pour la première fois le nom de chrétiens (Ac 11,26)." },
 { nom:"Éphèse", lon:27.3419, lat:37.9411, role:"Ville d'Asie Mineure, destinataire d'une des sept lettres de l'Apocalypse. Une tradition du IIe siècle y place l'évangéliste Jean." },
 { nom:"Corinthe", lon:22.8802, lat:37.9053, role:"Ville de Grèce, destinataire des deux lettres de Paul aux Corinthiens, parmi les plus anciens textes du Nouveau Testament." },
 { nom:"Rome", lon:12.4828, lat:41.8933, role:"Capitale de l'Empire. Paul lui écrit la lettre aux Romains. Tacite y raconte l'exécution de Jésus sous Ponce Pilate, vers 115. Jérôme y révise les Évangiles vers 383-384." },
 { nom:"Bethléem", lon:35.2064, lat:31.7044, role:"Jérôme s'y installe et y traduit l'Ancien Testament depuis l'hébreu entre 390 et 405." },
 { nom:"Mayence", lon:8.2736, lat:49.9994, role:"Ville d'Allemagne où Gutenberg imprime sa Bible latine vers 1455." }
]
},

traductions:[
{ nom:"La Septante", date:"IIIe siècle avant notre ère pour le Pentateuque, puis jusqu'au Ier siècle de notre ère", langue:"Grec", auteurs:"Traducteurs juifs d'Alexandrie, la légende parle de 72 (Lettre d'Aristée)", note:"Première grande traduction de la Bible hébraïque. Les premiers chrétiens l'ont adoptée, et elle reste le texte de référence de l'Église orthodoxe pour l'Ancien Testament." },
{ nom:"Les Targums", date:"Traduits d'abord à l'oral dès la fin du Ier siècle avant notre ère, mis par écrit ensuite", langue:"Araméen", auteurs:"Traducteurs juifs, souvent anonymes (Onkelos pour le Pentateuque)", note:"Des traductions en araméen qui ajoutent des explications. Les plus anciennes traductions araméennes conservées viennent de Qumrân, leur lien avec les targoums plus tardifs est discuté." },
{ nom:"La Vulgate", date:"Fin du IVe siècle, entre 383 et 405", langue:"Latin", auteurs:"Jérôme de Stridon, à la demande du pape Damase", note:"Traduction de l'Ancien Testament depuis l'hébreu, révision du Nouveau Testament sur le grec. Elle est devenue la Bible de l'Occident, officielle pour l'Église latine jusqu'en 1979." },
{ nom:"La Bible de Wycliffe", date:"Environ 1382 à 1395", langue:"Anglais du Moyen Âge", auteurs:"Équipe de traducteurs rattachée au nom de John Wycliffe, d'après la Vulgate", note:"Les plus anciennes traductions littérales connues de toute la Bible en moyen anglais. Des traductions partielles, probablement plus anciennes, existaient déjà." },
{ nom:"La Bible de Gutenberg", date:"Vers 1455", langue:"Latin", auteurs:"Johannes Gutenberg, Pierre Schoeffer et Johann Fust, à Mayence", note:"Édition imprimée de la Vulgate, dite « à 42 lignes ». C'est une impression plus qu'une traduction. Sur 150 à 180 exemplaires, 49 sont conservés." },
{ nom:"La Bible de Luther", date:"Nouveau Testament en 1522, Bible complète en 1534", langue:"Allemand", auteurs:"Martin Luther avec Melanchthon et d'autres collaborateurs", note:"Traduite sur l'hébreu et le grec. Les livres deutérocanoniques y sont placés à part, sous le nom d'apocryphes." },
{ nom:"La Bible d'Olivétan", date:"1535", langue:"Français", auteurs:"Pierre Robert, dit Olivétan, à Neuchâtel, avec une préface de Calvin", note:"Première traduction française faite sur les textes originaux en hébreu et en grec. Olivétan y emploie « l'Éternel » pour le nom divin." },
{ nom:"La Bible du roi Jacques (King James)", date:"1611", langue:"Anglais", auteurs:"Une équipe d'une cinquantaine de traducteurs, voulue par Jacques Ier d'Angleterre", note:"Longtemps la Bible de référence de l'Église d'Angleterre. L'estimation du nombre de traducteurs varie de 47 à 57." },
{ nom:"La Bible Segond", date:"1874 pour l'Ancien Testament, 1880 pour l'ensemble", langue:"Français", auteurs:"Louis Segond", note:"Faite sur l'hébreu, l'araméen et le grec. C'est la traduction la plus utilisée par les protestants francophones." },
{ nom:"La Bible Crampon", date:"1904", langue:"Français", auteurs:"Chanoine Augustin Crampon (1826-1894), terminée après sa mort par des jésuites et des professeurs de Saint-Sulpice", note:"Traduction catholique faite sur l'hébreu, l'araméen et le grec. Elle a eu un grand succès auprès des catholiques jusque vers 1960." },
{ nom:"La Bible de Jérusalem", date:"Fascicules de 1945 à 1955, un volume en 1956, révisions en 1973 et 1998", langue:"Français", auteurs:"École biblique et archéologique française de Jérusalem, dominicains", note:"Traduction accompagnée de longues introductions, de notes et de renvois. Elle a connu un succès rapide." },
{ nom:"La TOB (Traduction œcuménique de la Bible)", date:"1975, révisée en 1988 et 2010", langue:"Français", auteurs:"Spécialistes catholiques et protestants, puis orthodoxes à partir de 2010", note:"Premier travail commun de ce type en français. Elle suit l'ordre des livres de la Bible hébraïque et n'a pas l'imprimatur, l'autorisation officielle propre à l'Église catholique." },
{ nom:"La traduction liturgique officielle (AELF)", date:"2013", langue:"Français", auteurs:"Association épiscopale liturgique pour les pays francophones (AELF), plus de 70 spécialistes", note:"Texte lu à la messe en France. Plus de 17 ans de travail. C'est la première Bible officielle pour la liturgie publiée en entier par les évêques francophones." },
{ nom:"La Sainte Bible néo-Crampon Libre", date:"© 2022", langue:"Français", auteurs:"Modernisation de la traduction catholique de Crampon, droits détenus par la Fraternité de Tibériade", note:"C'est le texte utilisé dans Auréa. Il est publié sous licence libre Creative Commons CC BY-SA 4.0, ce qui permet de le copier et de le partager en citant l'auteur et en gardant la même licence." }
],

canon:{
texte:"Le « canon » est la liste officielle des livres reconnus comme inspirés par Dieu. Le mot grec kanôn veut dire « règle ». La plupart des Églises reçoivent les mêmes 27 livres du Nouveau Testament. Pour l'Ancien Testament, les listes diffèrent, car certains suivent la Bible hébraïque et d'autres la Septante grecque.",
catholique:{ at:46, nt:27, total:73 },
protestant:{ at:39, nt:27, total:66 },
orthodoxe:"Les Églises orthodoxes reçoivent elles aussi les livres deutérocanoniques, mais leurs listes ne sont pas toutes identiques. Selon Wikipédia, les Grecs ont fini par accepter tous les livres de la Bible latine au concile in Trullo en 692. Ils y ont ajouté 3 Esdras et 3 Maccabées. D'autres textes sont seulement recommandés à la lecture, comme 4 Maccabées chez les Grecs ou le Psaume 151. Le canon orthodoxe tient surtout à l'usage et non à une décision unique. L'Église éthiopienne a un canon encore plus large. On ne peut donc pas donner un seul nombre.",
deuterocanoniques:["Tobie","Judith","1 Maccabées","2 Maccabées","Sagesse","Siracide (ou Ecclésiastique)","Baruc (avec la Lettre de Jérémie)","Les ajouts grecs à Esther","Les ajouts grecs à Daniel (la prière des trois jeunes gens, Suzanne, Bel et le Dragon)"],
note:"Les catholiques ont sept livres de plus (Tobie, Judith, 1 et 2 Maccabées, Sagesse, Siracide, Baruc), et des ajouts à Esther et à Daniel, parce qu'ils suivent la liste de la Septante grecque, la Bible des premiers chrétiens. Ces livres ne figurent pas dans la Bible hébraïque. Le mot « deutérocanonique » veut dire « du second canon », non parce qu'ils auraient moins de valeur, mais parce qu'ils ont été reçus plus tard dans la liste. Au XVIe siècle, Luther les place à part sous le nom d'apocryphes, et les Églises protestantes ne les retiennent pas comme inspirés. Le concile de Trente a confirmé la liste catholique en 1546. Jérôme lui-même les jugeait non canoniques, preuve que la question a longtemps été débattue."
},

lire:{
intro:"Une référence biblique est une adresse, qui dit où trouver un passage. Quand on a compris trois petites choses, on peut retrouver n'importe quel verset dans n'importe quelle Bible.",
schema:[
 { partie:"Jn", sens:"L'abréviation du livre, ici l'Évangile selon Jean" },
 { partie:"3", sens:"Le chapitre, un grand bloc du livre" },
 { partie:"16", sens:"Le verset, une petite phrase ou un petit groupe de phrases" }
],
exemples:[
 { ref:"Jn 3,16", lecture:"Évangile selon Jean, chapitre 3, verset 16" },
 { ref:"Ps 23", lecture:"Le psaume 23 en entier, sans verset indiqué. Dans Auréa, la numérotation est celle de la Bible hébraïque. Dans la Bible liturgique, qui suit la numérotation grecque, ce psaume est le numéro 22." },
 { ref:"Mt 5,3-12", lecture:"Évangile selon Matthieu, chapitre 5, des versets 3 à 12, les Béatitudes" },
 { ref:"Gn 1,1-2,4", lecture:"Livre de la Genèse, du chapitre 1 verset 1 jusqu'au chapitre 2 verset 4, le récit de la création en sept jours" },
 { ref:"1 Co 13", lecture:"Première lettre de Paul aux Corinthiens, chapitre 13 en entier, appelé l'hymne à la charité" },
 { ref:"Lc 24,25-27.44-46", lecture:"Évangile selon Luc, chapitre 24, les versets 25 à 27, puis les versets 44 à 46" }
],
conventions:[
 "En français, la virgule sépare le chapitre du verset, ainsi Jn 3,16 se lit chapitre 3, verset 16. En anglais, on utilise un autre signe, les deux points.",
 "Le tiret relie deux versets d'un même passage, de 3 à 12 dans Mt 5,3-12. Un passage peut aussi traverser un chapitre, comme Gn 1,1-2,4 ou Ap 21,1-22,5.",
 "Le point sépare des versets qui ne se suivent pas dans un même chapitre, comme dans Lc 24,25-27.44-46. Le Catéchisme de l'Église catholique l'emploie ainsi.",
 "Le point-virgule sépare deux passages différents, par exemple 1 Co 10,6 ; He 10,1. Le Catéchisme l'emploie ainsi.",
 "Le chiffre devant le nom du livre indique la première ou la deuxième lettre ou le premier ou le deuxième livre, ainsi 1 Co est la première lettre aux Corinthiens et 2 M le deuxième livre des Maccabées.",
 "« cf. » veut dire « voir aussi », comme dans les notes du Catéchisme.",
 "La numérotation des psaumes n'est pas la même partout. La Bible grecque et la Vulgate, qui sont suivies par la Bible liturgique (AELF), fusionnent les psaumes 9 et 10 hébreux, ainsi que les 114 et 115, et séparent les psaumes 116 et 147. Du psaume 10 au psaume 146 de la Bible hébraïque, il y a donc en général un numéro de moins dans la Bible grecque. Dans Auréa, c'est la numérotation hébraïque, donc Ps 23. Dans la Bible liturgique, c'est Ps 22."
],
histoire:"Les textes d'origine n'avaient ni chapitres ni versets numérotés. Dans l'Antiquité, les textes hébreux étaient seulement coupés en paragraphes, marqués par deux lettres, peh pour un paragraphe ouvert et samekh pour un paragraphe fermé. Les chapitres que nous utilisons viennent d'un système de découpage attribué à Étienne Langton, un théologien anglais qui a enseigné à Paris et qui est devenu archevêque de Canterbury. Ce système, mis au point au début du XIIIe siècle, s'est répandu dans les Bibles copiées par les libraires de Paris au XIIIe siècle. Les versets sont plus récents. L'imprimeur parisien Robert Estienne a inauguré le découpage en versets dans son édition du Nouveau Testament grec de 1551. Un autre savant, Santes Pagnino, avait numéroté des versets dès 1527, mais son système n'a pas été retenu. Ces numéros sont donc pratiques, mais ils ne font pas partie des textes d'origine. Ils servent à retrouver un passage, et une phrase peut s'étendre sur plusieurs versets."
},

qr:[
{ q:"La Bible est-elle fiable ?",
  a:"Cela dépend de ce qu'on appelle fiable, et il faut séparer trois questions. Pour le texte lui-même, on possède un très grand nombre de manuscrits, plus de 5 800 en grec pour le Nouveau Testament. Les différences entre eux sont nombreuses, mais la plupart sont minimes. Pour l'histoire, les spécialistes examinent chaque récit avec les outils de la recherche, et ils ne sont pas d'accord sur tout. Pour la foi, l'Église catholique enseigne que les livres inspirés enseignent « sans erreur la vérité que Dieu a voulu voir consignée pour notre salut » (Dei Verbum 11). Cette dernière affirmation relève de la foi, et l'histoire ne peut ni la prouver ni la réfuter.",
  refs:[{t:"Dei Verbum 11",n:"l'inspiration et la vérité des Écritures"},{t:"Catéchisme, 105-108",n:"Dieu est l'auteur de l'Écriture"}],
  sources:["Wikipedia, Textual criticism","Dei Verbum","Catéchisme de l'Église catholique, 105 à 108"] },

{ q:"A-t-elle été modifiée au fil des siècles ?",
  a:"Oui et non. Recopiée à la main pendant des siècles, la Bible a connu des erreurs de copistes et quelques corrections. On compte environ 300 000 variantes dans les manuscrits du Nouveau Testament, jusqu'à 400 000 selon une autre estimation, surtout des mots changés d'ordre ou des détails sans portée. Il y a des cas plus importants, comme la fin de Marc (Mc 16,9-20) ou l'épisode de la femme adultère (Jn 7,53-8,11), absents des plus anciens grands manuscrits. Les spécialistes le savent et en discutent ouvertement. Pour l'Ancien Testament, le grand rouleau d'Isaïe, de 125 avant notre ère environ, est globalement proche du texte massorétique, avec 2 600 différences surtout mineures.",
  refs:[{t:"Mc 16,9-20",n:"finale longue de Marc absente du Vaticanus et du Sinaiticus"},{t:"Jn 7,53-8,11",n:"la femme adultère, absente des plus anciens manuscrits"}],
  sources:["Wikipedia, Textual criticism","Wikipedia, Biblical manuscript","Wikipédia, Codex Vaticanus","Wikipédia, Codex Sinaiticus","Wikipedia, Isaiah Scroll"] },

{ q:"Quels sont les plus anciens manuscrits de la Bible ?",
  a:"Pour l'Ancien Testament, les plus anciens textes connus sont deux petites plaquettes d'argent trouvées à Ketef Hinnom, près de Jérusalem, datées d'environ 600 avant notre ère. Elles citent la bénédiction de Nb 6,24-26. Le plus ancien exemplaire complet d'un livre est le grand rouleau d'Isaïe, de 125 avant notre ère environ, trouvé près de la mer Morte. Pour le Nouveau Testament, le plus ancien fragment est le papyrus Rylands 457 (P52), qui porte quelques versets de Jn 18, daté du IIe siècle (de 100 à 175 selon les spécialistes). Les premiers manuscrits de toute la Bible grecque sont le Vaticanus et le Sinaiticus, du IVe siècle.",
  refs:[{t:"Nb 6,24-26",n:"la bénédiction des plaquettes de Ketef Hinnom"},{t:"Jn 18,31-33",n:"le texte du papyrus P52"}],
  sources:["Wikipedia, Ketef Hinnom","Wikipedia, Isaiah Scroll","Wikipedia, Rylands Library Papyrus P52","Wikipédia, Codex Vaticanus","Wikipédia, Codex Sinaiticus"] },

{ q:"Pourquoi y a-t-il des différences entre les quatre Évangiles ?",
  a:"Les quatre Évangiles n'ont pas été écrits par la même personne, ni pour les mêmes lecteurs, ni au même moment. Selon la théorie la plus répandue chez les spécialistes, Matthieu et Luc ont utilisé l'Évangile de Marc, et un recueil de paroles de Jésus que l'on appelle la source Q. Jean est plus tardif et plus différent. Vatican II explique que les auteurs ont choisi certains éléments, en ont résumé d'autres et les ont expliqués selon la situation des Églises, tout en gardant la forme d'une prédication (Dei Verbum 19). Par exemple, Matthieu place le discours sur la montagne (Mt 5,1), alors que Luc place un enseignement semblable sur un plateau (Lc 6,17). Ces différences montrent plusieurs témoignages, au lieu d'une seule version recopiée.",
  refs:[{t:"Lc 1,1-4",n:"Luc explique sa démarche"},{t:"Mt 5,1 et Lc 6,17",n:"montagne chez Matthieu, plateau chez Luc"},{t:"Jn 21,25",n:"Jésus a fait bien d'autres choses"}],
  sources:["Wikipédia, Problème synoptique","Wikipédia, Évangile","Dei Verbum 19","Catéchisme de l'Église catholique, 126"] },

{ q:"Jésus a-t-il vraiment existé ?",
  a:"Oui, pour les historiens. Selon Wikipédia, le consensus des spécialistes est que Jésus de Nazareth a existé au Ier siècle, et presque tous rejettent l'idée qu'il n'ait jamais existé. On reconnaît largement comme historiques son baptême par Jean et sa crucifixion sous Ponce Pilate. Parmi les sources non chrétiennes, Flavius Josèphe (Antiquités juives, vers 93-94) parle de Jésus, et son passage célèbre, le Testimonium, est jugé aujourd'hui en partie authentique. Tacite (Annales, vers 115) écrit que Christus fut exécuté sous Ponce Pilate. Pline le Jeune et Suétone parlent surtout des chrétiens. Les sources les plus anciennes sont les lettres de Paul, écrites une vingtaine d'années après la mort de Jésus. Que Jésus soit le Fils de Dieu ressuscité n'est pas du ressort de l'historien, c'est l'affaire de la foi.",
  refs:[{t:"1 Co 15,3-6",n:"un très ancien résumé de la foi, transmis par Paul"},{t:"Ga 1,19",n:"Paul rencontre Jacques, le frère du Seigneur"}],
  sources:["Wikipedia, Historicity of Jesus","Wikipedia, Pliny the Younger on Christians","Wikipedia, Suetonius on Christians","Wikipédia, Tacite","Wikipédia, Flavius Josèphe"] },

{ q:"Qui a choisi les livres de la Bible, et quand ?",
  a:"Pas une seule personne ni un seul jour. Pour l'Ancien Testament, les juifs ont reconnu leurs livres peu à peu, la Torah d'abord, puis les Prophètes, puis les Écrits. Pour le Nouveau Testament, des listes circulent dès le IIe siècle, comme celle de Marcion vers 140 ou le fragment de Muratori. La liste exacte des 27 livres apparaît chez Athanase en 367, puis aux conciles d'Hippone en 393 et de Carthage en 397. Pour la foi catholique, l'Église a discerné, par la Tradition apostolique, les écrits qui transmettent la foi des apôtres (Catéchisme, 120). Pour l'historien, c'est un long usage dans les Églises, avec des hésitations sur quelques livres.",
  refs:[{t:"2 Tm 3,16",n:"toute Écriture est divinement inspirée"},{t:"2 P 3,15-16",n:"les lettres de Paul comparées aux autres Écritures"}],
  sources:["Wikipédia, Canon biblique","Wikipedia, Development of the New Testament canon","Catéchisme de l'Église catholique, 120"] },

{ q:"Pourquoi les catholiques ont-ils plus de livres que les protestants ?",
  a:"Les catholiques ont 73 livres, les protestants 66. La différence, ce sont sept livres de l'Ancien Testament, Tobie, Judith, 1 et 2 Maccabées, Sagesse, Siracide et Baruc, ainsi que des ajouts grecs à Esther et à Daniel. Ils venaient de la Septante, la Bible grecque des premiers chrétiens, mais ne sont pas dans la Bible hébraïque. Au XVIe siècle, Luther les met à part avec une préface, et les protestants gardent seulement la liste hébraïque. L'Église catholique confirme sa liste au concile de Trente en 1546. Les orthodoxes reçoivent aussi ces livres. Jérôme les jugeait non canoniques, ce qui montre que le débat est ancien.",
  refs:[{t:"2 M 12,43-45",n:"un passage cité dans les débats sur le purgatoire"},{t:"Sg 1,1",n:"début du livre de la Sagesse"}],
  sources:["Wikipédia, Canon biblique","Wikipédia, Deutérocanoniques","Wikipédia, Livres deutérocanoniques","Wikipédia, Évangile apocryphe"] },

{ q:"Que sont les évangiles apocryphes ?",
  a:"Le mot « apocryphe » vient d'un mot grec qui veut dire « caché ». Un évangile apocryphe est un texte sur Jésus que l'Église n'a pas mis dans la Bible. Attention, le mot a deux sens, car les protestants appellent aussi « apocryphes » les livres que les catholiques nomment deutérocanoniques. Un exemple célèbre est l'Évangile de Thomas, une liste de 114 paroles attribuées à Jésus, trouvée en 1945 à Nag Hammadi en Égypte, en langue copte. La plupart des chercheurs le datent du IIe siècle et pensent qu'il dépend des Évangiles de la Bible. Ces textes sont intéressants pour comprendre les premiers siècles, mais l'Église ne les a pas retenus parmi les livres inspirés.",
  refs:[{t:"Lc 1,1-4",n:"Luc sait que beaucoup ont écrit sur Jésus"}],
  sources:["Wikipédia, Évangile apocryphe","Wikipedia, Gospel of Thomas","Wikipedia, Nag Hammadi library"] },

{ q:"La Bible dit-elle vrai sur la création et la science ?",
  a:"Ce sont deux questions de nature différente. Les chercheurs en sciences étudient comment et quand le monde est apparu. Le Catéchisme dit que ces recherches ont « magnifiquement enrichi nos connaissances » et invitent à admirer le Créateur (Catéchisme, 283). La Genèse répond à une autre question, celle du sens, pourquoi il y a un monde, qui l'a voulu et pourquoi le mal existe (Catéchisme, 284). Les trois premiers chapitres de la Genèse expriment, « dans leur langage solennel », des vérités sur la création, le péché et le salut (Catéchisme, 289), et non un cours de sciences. Les catholiques n'ont donc pas à choisir entre la foi et la science, mais à lire chaque texte selon son genre.",
  refs:[{t:"Gn 1,1-2,4",n:"le récit des sept jours"},{t:"Catéchisme, 283-289",n:"foi, science et création"}],
  sources:["Catéchisme de l'Église catholique, 283, 284 et 289","Dei Verbum 12"] },

{ q:"Faut-il tout prendre au pied de la lettre ?",
  a:"Non, et l'Église le demande elle-même. Dans la Bible, il y a des récits, des poèmes, des lois, des prophéties et des visions. On ne lit pas un poème comme un compte rendu de journal. Vatican II demande de chercher ce que l'auteur a voulu dire, en tenant compte des « genres littéraires » de son époque (Dei Verbum 12). Dans le Ps 23, « Yahweh est mon pasteur » est une image, personne n'y voit un berger de moutons. Le « sens littéral » dont parle le Catéchisme n'est d'ailleurs pas une lecture mot à mot. C'est le sens signifié par les paroles et découvert par l'exégèse, c'est-à-dire ce que l'auteur voulait exprimer (Catéchisme, 116 et Dei Verbum 12).",
  refs:[{t:"Ps 23",n:"une image, le Seigneur est comparé à un berger"},{t:"Dei Verbum 12",n:"les genres littéraires"}],
  sources:["Dei Verbum 12","Catéchisme de l'Église catholique, 109 à 119"] },

{ q:"Comment les catholiques lisent-ils la Bible ?",
  a:"Le Catéchisme, qui reprend Dei Verbum, donne trois repères. Il faut être attentif au contenu et à l'unité de toute l'Écriture, car le Christ en est le centre. Il faut la lire dans la Tradition vivante de toute l'Église. Il faut aussi tenir compte de la cohérence des vérités de la foi entre elles (Catéchisme, 112-114). On distingue aussi le sens littéral et le sens spirituel, qui se divise en sens allégorique (le lien avec le Christ), moral (ce qu'il faut faire) et anagogique (vers quoi tendre, le ciel). Le Catéchisme cite un vers du Moyen Âge qui résume ces sens (Catéchisme, 115-118).",
  refs:[{t:"Catéchisme, 112-114",n:"trois critères de lecture"},{t:"Catéchisme, 115-119",n:"les sens de l'Écriture"},{t:"Dei Verbum 12",n:"interpréter l'Écriture"}],
  sources:["Catéchisme de l'Église catholique, 109 à 119","Dei Verbum 12"] },

{ q:"Y a-t-il des contradictions dans la Bible ?",
  a:"Il y a des différences, et personne de sérieux ne le nie. Par exemple, Matthieu dit que Judas est allé se pendre (Mt 27,5), tandis que les Actes disent qu'il s'est écrasé le corps ouvert (Ac 1,18). Les généalogies de Jésus ne sont pas identiques chez Matthieu et chez Luc, et la scène du tombeau le matin de Pâques n'est pas racontée de la même façon. Les spécialistes expliquent ces écarts par des traditions différentes, des destinataires différents et des genres différents. L'Église affirme que l'Écriture enseigne « sans erreur la vérité que Dieu a voulu voir consignée pour notre salut ». Les théologiens discutent de la portée exacte de cette phrase pour les détails.",
  refs:[{t:"Mt 27,5 et Ac 1,18",n:"deux récits sur la mort de Judas"},{t:"Mt 28,1 et Jn 20,1",n:"deux récits de Pâques"},{t:"Dei Verbum 11",n:"la vérité pour notre salut"}],
  sources:["Dei Verbum 11 et 12","Wikipédia, Évangile","Bible néo-Crampon Libre"] },

{ q:"Pourquoi y a-t-il des violences dans l'Ancien Testament ?",
  a:"C'est une vraie difficulté. On lit par exemple que le peuple devra « vouer à l'anathème » les nations qu'il vaincra (Dt 7,2), ou que Saül doit frapper Amalec sans épargner personne (1 S 15,3). Ces textes choquent aussi beaucoup de croyants, et l'Église ne les cache pas. Vatican II reconnaît que ces livres contiennent « de l'imparfait et du caduc », tout en y voyant une véritable pédagogie divine (Dei Verbum 15). Elle demande aussi de tenir compte des conditions de l'époque et des genres littéraires (Catéchisme, 110), et de lire l'Ancien Testament à la lumière du Christ (Catéchisme, 129). Elle a toujours refusé de le rejeter, ce que fit Marcion (Catéchisme, 123).",
  refs:[{t:"Dt 7,2",n:"l'anathème contre les nations"},{t:"1 S 15,3",n:"l'ordre donné à Saül contre Amalec"},{t:"Catéchisme, 122-123",n:"valeur de l'Ancien Testament"}],
  sources:["Catéchisme de l'Église catholique, 110, 122, 123 et 129","Dei Verbum 15","Bible néo-Crampon Libre"] },

{ q:"Pourquoi lire l'Ancien Testament si on a le Nouveau ?",
  a:"Parce que le Nouveau Testament ne se comprend pas sans lui. Jésus et les apôtres lisent les Écritures d'Israël, et le Nouveau y renvoie sans cesse. Le Catéchisme affirme que l'Ancien Testament est « une partie inamissible de l'Écriture Sainte », que ses livres sont divinement inspirés et que l'Ancienne Alliance n'a jamais été révoquée (Catéchisme, 121). Les chrétiens le lisent à la lumière du Christ, sans oublier sa valeur propre. Selon un vieil adage cité par Augustin, le Nouveau est caché dans l'Ancien, et l'Ancien est dévoilé dans le Nouveau (Catéchisme, 129).",
  refs:[{t:"Lc 24,25-27",n:"Jésus explique les Écritures aux disciples"},{t:"Catéchisme, 121-129",n:"l'unité des deux Testaments"}],
  sources:["Catéchisme de l'Église catholique, 121 à 129","Dei Verbum 15 et 16"] },

{ q:"Quel est le rôle de la Tradition à côté de la Bible ?",
  a:"La première génération de chrétiens n'avait pas encore de Nouveau Testament écrit. Les apôtres ont d'abord transmis de vive voix ce qu'ils avaient reçu de Jésus. Selon Vatican II, la Tradition et l'Écriture jaillissent d'une même source et tendent vers un même but (Dei Verbum 9). Les catholiques disent que l'Église ne tire pas sa certitude de la seule Écriture, et qu'elles doivent être reçues avec le même respect (Catéchisme, 82). C'est une différence avec les protestants, pour qui seul le texte biblique compte, ce qu'on appelle « Écriture seule ». Le Catéchisme distingue aussi la Tradition des apôtres et les traditions plus récentes, qui peuvent changer (Catéchisme, 83).",
  refs:[{t:"Dei Verbum 9",n:"Tradition et Écriture"},{t:"Catéchisme, 80-83",n:"le rapport entre les deux"}],
  sources:["Catéchisme de l'Église catholique, 80 à 83","Dei Verbum 9","Wikipédia, Canon biblique"] },

{ q:"Par où commencer à lire la Bible ?",
  a:"Il n'y a pas d'ordre obligatoire, et la Bible ne se lit pas forcément d'une traite comme un roman. Une bonne idée est de commencer par un Évangile. Celui de Marc est le plus court des quatre (16 chapitres). Ensuite viennent les Actes des Apôtres, qui racontent les débuts de l'Église, puis quelques chapitres de la Genèse et des psaumes, des prières que les croyants utilisent depuis des siècles. Mieux vaut lire peu, lentement, avec des notes. C'est un conseil pratique et non un enseignement de l'Église.",
  refs:[{t:"Mc 1",n:"début de l'Évangile le plus court"},{t:"Ac 1-2",n:"les débuts de l'Église"},{t:"Ps 23",n:"une prière célèbre"}],
  sources:["Bible néo-Crampon Libre (nombre de chapitres)","Catéchisme de l'Église catholique, 131 à 133"] },

{ q:"Quelle traduction choisir ?",
  a:"Aucune traduction n'est parfaite. Pour étudier, la Bible de Jérusalem est utile, car elle a de longues introductions, des notes et des renvois. La TOB est née du travail de catholiques et de protestants ensemble. La traduction liturgique de l'AELF est celle que l'on entend à la messe. Auréa utilise la néo-Crampon Libre, une modernisation de Crampon, sous licence libre. Chez les protestants francophones, la Segond est la plus répandue. Vatican II demande des traductions faites de préférence sur les textes originaux (Dei Verbum 22). Comparer deux traductions aide à mieux comprendre un passage.",
  refs:[{t:"Dei Verbum 22",n:"traductions appropriées et exactes"},{t:"Mt 6,9-13",n:"un passage à comparer dans plusieurs traductions"}],
  sources:["Wikipédia, Traductions de la Bible en français","Wikipédia, Bible de Jérusalem","Wikipédia, Traduction œcuménique de la Bible","AELF, La Bible","Dei Verbum 22"] },

{ q:"Les chapitres et les versets viennent-ils de la Bible elle-même ?",
  a:"Non. Les auteurs n'ont écrit ni chapitres ni versets numérotés. Les chapitres actuels viennent d'un découpage attribué à Étienne Langton, au début du XIIIe siècle. Les versets numérotés viennent de l'imprimeur Robert Estienne, dans son Nouveau Testament grec de 1551. Ces numéros servent d'adresse pour retrouver un passage, mais ils coupent parfois une phrase en plein milieu. Il est donc bon de lire un peu avant et un peu après. La numérotation des psaumes n'est pas non plus la même dans la Bible hébraïque et dans la Bible grecque.",
  refs:[{t:"Ps 23",n:"numéro 22 dans la Bible liturgique"},{t:"Jn 3,16",n:"à lire dans son contexte, avec les versets 14 à 21"}],
  sources:["Wikipedia, Chapters and verses of the Bible","Wikipédia, Étienne Langton","Wikipédia, Robert Estienne","Wikipédia, Psaumes"] }
],

sources:[
 "Wikipédia, Manuscrits de la mer Morte","Wikipedia, Dead Sea Scrolls","Wikipedia, Isaiah Scroll","Wikipedia, Ketef Hinnom","Wikipedia, Ketef Hinnom scrolls","Wikipedia, Rylands Library Papyrus P52","Wikipedia, Papyrus Rylands 458","Wikipedia, Bodmer Papyri","Wikipedia, Chester Beatty Papyri","Wikipédia, Codex Vaticanus","Wikipédia, Codex Sinaiticus","Wikipedia, Codex Alexandrinus","Wikipedia, Leningrad Codex","Wikipédia, Septante","Wikipédia, Vulgate","Wikipédia, Canon biblique","Wikipedia, Deuterocanonical books","Wikipédia, Livres deutérocanoniques","Wikipédia, Traductions de la Bible en français","Wikipédia, Bible de Jérusalem","Wikipédia, Traduction œcuménique de la Bible","Wikipédia, Augustin Crampon","Wikipedia, Historicity of Jesus","Wikipédia, Tacite","Wikipédia, Flavius Josèphe","Wikipédia, Pline le Jeune","Wikipedia, Pliny the Younger on Christians","Wikipedia, Suetonius on Christians","Wikipedia, Textual criticism","Wikipedia, Biblical manuscript","Wikipedia, Development of the New Testament canon","Wikipedia, Chapters and verses of the Bible","Wikipédia, Étienne Langton","Wikipédia, Robert Estienne","Wikipédia, Bible de Gutenberg","Wikipédia, Évangile","Wikipédia, Évangile apocryphe","Wikipédia, Psaumes","Dei Verbum, Vatican II, 18 novembre 1965 (vatican.va)","Catéchisme de l'Église catholique, 80 à 133 (vatican.va)","AELF, La Bible (aelf.org)","Sainte Bible néo-Crampon Libre, © 2022 Fraternité de Tibériade, CC BY-SA 4.0"
]
};
