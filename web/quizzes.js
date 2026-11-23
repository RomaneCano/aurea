// Quiz bienveillants. Chaque question a une explication et, parfois, un petit indice. Aucune pénalité, aucune vie perdue.
// q = question, o = réponses, a = bonne réponse (index), e = explication, h = indice
const QUIZZES = [
  { id: "bible", t: "La Bible", d: "Comment elle est faite et comment la lire.", c: "#2f7a6f", qs: [
    { q: "Combien y a-t-il de livres dans la Bible catholique ?", o: ["66", "73", "27"], a: 1, e: "46 dans l'Ancien Testament et 27 dans le Nouveau, soit 73. Les protestants en comptent 66.", h: "Pense à 46 plus 27." },
    { q: "Quelle partie raconte la vie de Jésus ?", o: ["L'Ancien Testament", "Le Nouveau Testament", "Les Psaumes"], a: 1, e: "Les quatre Évangiles sont au début du Nouveau Testament." },
    { q: "Que veut dire « Jn 3, 16 » ?", o: ["Jean, chapitre 3, verset 16", "Jean, verset 3, chapitre 16", "Jean, livre 3, page 16"], a: 0, e: "On donne d'abord le livre, puis le chapitre, puis le verset.", h: "Le grand bloc vient avant la petite phrase." },
    { q: "Quel livre est un recueil de prières ?", o: ["Les Proverbes", "Les Psaumes", "La Genèse"], a: 1, e: "Les 150 psaumes sont des prières chantées. Jésus les priait." },
    { q: "Quel est le premier livre de la Bible ?", o: ["La Genèse", "L'Exode", "Matthieu"], a: 0, e: "Genèse veut dire « origine ». Elle raconte les commencements." },
    { q: "Quel est le plus court des quatre Évangiles ?", o: ["Marc", "Luc", "Jean"], a: 0, e: "Marc a 16 chapitres. C'est un très bon point de départ." },
    { q: "Dans quelle langue le Nouveau Testament a-t-il été écrit ?", o: ["En hébreu", "En grec", "En latin"], a: 1, e: "En grec, la langue que beaucoup de gens parlaient à l'époque autour de la Méditerranée.", h: "C'était la langue commune de l'Empire romain d'Orient." },
    { q: "Combien y a-t-il d'Évangiles dans le Nouveau Testament ?", o: ["3", "4", "12"], a: 1, e: "Matthieu, Marc, Luc et Jean." }
  ] },
  { id: "prieres", t: "Les prières", d: "Celles que l'on dit le plus souvent.", c: "#b45a7a", qs: [
    { q: "Qui a enseigné le Notre Père ?", o: ["Jésus", "Paul", "Moïse"], a: 0, e: "Jésus l'a donné à ses disciples quand ils lui ont demandé comment prier (Matthieu 6)." },
    { q: "Comment fait-on le signe de croix ?", o: ["Front, ventre, épaule gauche, épaule droite", "Cœur, front, mains, genoux", "Seulement le front"], a: 0, e: "On touche le front, puis le ventre ou la poitrine, puis les deux épaules." },
    { q: "Combien de « Je vous salue Marie » dans une dizaine de chapelet ?", o: ["5", "10", "50"], a: 1, e: "Dix, d'où le mot « dizaine ». Un chapelet complet compte cinq dizaines.", h: "Le mot dizaine donne la réponse." },
    { q: "Que veut dire « Amen » ?", o: ["Ainsi soit-il, c'est vrai", "Au revoir", "Gloire à Dieu"], a: 0, e: "Le mot vient de l'hébreu. On dit « Amen » pour approuver une prière." },
    { q: "Quelle prière résume ce que les chrétiens croient ?", o: ["Le Credo", "L'Angélus", "Le Gloire au Père"], a: 0, e: "« Credo » veut dire « je crois »." },
    { q: "À quels moments dit-on traditionnellement l'Angélus ?", o: ["Le matin, à midi et le soir", "Seulement le dimanche", "Seulement à Noël"], a: 0, e: "Quand les cloches sonnent à 6 h, à midi et à 18 h." },
    { q: "Prier, c'est surtout...", o: ["Réciter sans comprendre", "Parler à Dieu avec ses mots ou avec des prières connues", "Réservé aux prêtres"], a: 1, e: "Tout le monde peut prier. Les deux façons sont bonnes." },
    { q: "D'où viennent les premiers mots du « Je vous salue Marie » ?", o: ["De l'ange Gabriel", "De saint Pierre", "De David"], a: 0, e: "L'ange salue Marie dans l'Évangile de Luc, chapitre 1." }
  ] },
  { id: "messe", t: "La messe", d: "Mieux comprendre ce qui s'y passe.", c: "#7a5fa8", qs: [
    { q: "Comment s'appelle le moment où l'on reçoit l'eucharistie ?", o: ["La communion", "L'homélie", "L'envoi"], a: 0, e: "La communion. Si tu n'es pas baptisé, tu peux rester à ta place ou demander une bénédiction." },
    { q: "À quoi sert l'homélie ?", o: ["À expliquer les lectures", "À chanter", "À faire la quête"], a: 0, e: "Le prêtre ou le diacre aide à comprendre les textes et à les vivre." },
    { q: "Faut-il être baptisé pour assister à la messe ?", o: ["Non, tout le monde peut venir", "Oui", "Seulement les adultes"], a: 0, e: "La messe est ouverte à tous. Tu es le bienvenu." },
    { q: "Que fait-on pendant la lecture de l'Évangile ?", o: ["On se lève", "On s'assoit", "On sort"], a: 0, e: "On se lève pour accueillir la parole de Jésus." },
    { q: "Où garde-t-on le pain consacré ?", o: ["Dans le tabernacle", "Dans la sacristie", "Dans le bénitier"], a: 0, e: "Le tabernacle est une petite armoire, souvent près de l'autel. Une lampe rouge indique que Jésus est présent." },
    { q: "Que dit le prêtre à la fin de la messe ?", o: ["Allez dans la paix du Christ", "Bonne soirée", "À demain"], a: 0, e: "C'est l'envoi. On repart pour vivre ce qu'on a reçu." },
    { q: "Combien de lectures avant l'Évangile le dimanche ?", o: ["Deux, avec un psaume entre les deux", "Une seule", "Quatre"], a: 0, e: "Une première lecture, un psaume chanté, puis une deuxième lecture, avant l'Évangile." },
    { q: "À quoi sert la quête ?", o: ["À faire vivre l'Église et à aider les autres", "À payer l'entrée", "À acheter les cierges"], a: 0, e: "Elle est libre. Chacun donne ce qu'il peut." }
  ] },
  { id: "fetes", t: "Les fêtes de l'année", d: "Noël, Pâques et les autres.", c: "#c2703a", qs: [
    { q: "Que fête-t-on à Pâques ?", o: ["La résurrection de Jésus", "Sa naissance", "La venue de l'Esprit"], a: 0, e: "C'est la plus grande fête des chrétiens." },
    { q: "Combien de semaines dure l'Avent ?", o: ["Quatre", "Sept", "Quarante"], a: 0, e: "Quatre semaines, jusqu'à Noël." },
    { q: "Combien de jours dure le Carême ?", o: ["40", "7", "100"], a: 0, e: "Quarante jours, comme Jésus au désert. On ne compte pas les dimanches.", h: "C'est un chiffre qui revient beaucoup dans la Bible." },
    { q: "Que fête-t-on à la Pentecôte ?", o: ["La venue de l'Esprit Saint", "La naissance de Jésus", "L'Assomption"], a: 0, e: "Cinquante jours après Pâques, l'Esprit descend sur les apôtres." },
    { q: "Que marque le mercredi des Cendres ?", o: ["Le début du Carême", "La fin de Noël", "Pâques"], a: 0, e: "On reçoit des cendres sur le front pour commencer le Carême." },
    { q: "Que fête-t-on le 15 août ?", o: ["L'Assomption de Marie", "Noël", "La Toussaint"], a: 0, e: "Marie accueillie auprès de Dieu. C'est férié en France." },
    { q: "Que fête-t-on le 1er novembre ?", o: ["Tous les saints", "Les défunts", "Pâques"], a: 0, e: "La Toussaint. Le lendemain, on prie pour les défunts." },
    { q: "Que raconte l'Épiphanie ?", o: ["La visite des mages", "La naissance de Jean-Baptiste", "La Cène"], a: 0, e: "Des mages suivent une étoile et adorent Jésus.", h: "On mange une galette ce jour-là." }
  ] },
  { id: "sacrements", t: "Les sacrements", d: "Sept gestes pour vivre la foi.", c: "#4f8a5b", qs: [
    { q: "Combien y a-t-il de sacrements ?", o: ["3", "7", "12"], a: 1, e: "Baptême, confirmation, eucharistie, réconciliation, onction des malades, ordre et mariage." },
    { q: "Quel est le premier sacrement que l'on reçoit ?", o: ["Le baptême", "Le mariage", "La confirmation"], a: 0, e: "Le baptême ouvre la porte aux autres." },
    { q: "Quel sacrement est celui du pardon ?", o: ["La réconciliation", "L'ordre", "L'onction"], a: 0, e: "On dit ses fautes à un prêtre, qui garde toujours le secret, et on reçoit le pardon de Dieu." },
    { q: "Quel sacrement fortifie le baptisé par l'Esprit Saint ?", o: ["La confirmation", "L'eucharistie", "Le mariage"], a: 0, e: "On y reçoit la force de l'Esprit Saint, comme à la Pentecôte." },
    { q: "Quel sacrement est donné aux malades ?", o: ["L'onction des malades", "La confirmation", "Le baptême"], a: 0, e: "Une prière et une onction d'huile pour soutenir les personnes malades ou âgées." },
    { q: "Peut-on être baptisé à l'âge adulte ?", o: ["Oui, avec le catéchuménat", "Non, seulement bébé", "Seulement à 18 ans"], a: 0, e: "Chaque année, des milliers d'adultes sont baptisés, souvent à Pâques." }
  ] },
  { id: "idees", t: "Idées reçues", d: "Vrai, faux ou plus nuancé, avec douceur.", c: "#d48a1f", qs: [
    { q: "Les catholiques adorent Marie.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 1, e: "On adore Dieu seul. On vénère Marie et on lui demande de prier pour nous." },
    { q: "La Bible a été écrite par une seule personne.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 1, e: "Des dizaines d'auteurs ont écrit pendant environ mille ans." },
    { q: "Jésus était juif.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 0, e: "Il est né juif, il a vécu dans le judaïsme, comme ses premiers disciples." },
    { q: "L'Église a toujours été contre la science.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 2, e: "Il y a eu des tensions, comme l'affaire Galilée. Il y a aussi eu des savants croyants, comme Lemaître et Mendel." },
    { q: "On peut devenir catholique à tout âge.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 0, e: "Oui. Chaque année, des adultes demandent le baptême." },
    { q: "Il faut tout comprendre avant de croire.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 1, e: "La foi est une confiance qui grandit. On a le droit de poser des questions et de douter." },
    { q: "Les catholiques ne lisent pas la Bible.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 1, e: "On lit la Bible à chaque messe, et beaucoup la lisent chez eux." },
    { q: "Dieu pardonne seulement ceux qui n'ont fait que de petites erreurs.", o: ["Vrai", "Faux", "C'est plus nuancé"], a: 1, e: "Dans l'Évangile, le père accueille le fils qui a tout gâché (Luc 15). Il n'y a pas de faute plus grande que son pardon." }
  ] }
];
// quiz généré à partir des figures de la foi
function quizSaints() {
  const pool = FIGURES.filter(f => f.role), pick = n => [...pool].sort(() => Math.random() - .5).slice(0, n), qs = [];
  pick(8).forEach(f => {
    const others = pool.filter(x => x.id !== f.id && x.g === f.g).sort(() => Math.random() - .5).slice(0, 2);
    while (others.length < 2) { const x = pool[Math.floor(Math.random() * pool.length)]; if (x.id !== f.id && !others.includes(x)) others.push(x); }
    const opts = [f, ...others].sort(() => Math.random() - .5);
    qs.push({ q: `Qui est « ${f.role} » ?`, o: opts.map(x => x.nom), a: opts.indexOf(f), e: f.bio.split(". ")[0] + ". " + f.pourquoi, h: `Repère, ${f.dates}.` });
  });
  return qs;
}
