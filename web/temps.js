// Parcours guidés jour par jour pour les temps liturgiques : Avent, Noël, Carême, Semaine sainte, Pâques.
const TEMPS = {
avent: {
  nom: "Avent",
  resume: "Quatre semaines pour se préparer à accueillir Jésus à Noël.",
  sens: "L'Avent est le temps de l'attente. Les chrétiens se préparent à fêter la naissance de Jésus, et aussi à l'accueillir chaque jour dans leur vie. C'est un temps pour ralentir, faire de la place et laisser grandir l'espérance.",
  comment: [
    "Prends cinq minutes chaque jour, toujours au même moment, par exemple avec ton café du matin ou avant de dormir.",
    "Lis le passage à voix basse ou à voix haute, puis relis lentement une phrase qui te touche.",
    "Allume une petite bougie si tu en as une. Une bougie de plus chaque dimanche, c'est la couronne de l'Avent.",
    "Fais l'action proposée si c'est possible, sinon garde seulement la question en tête pendant la journée.",
    "Si tu rates un jour, ce n'est pas grave. Reprends simplement au jour suivant, sans rattraper."
  ],
  intentions: [
    "Qu'est-ce que je voudrais laisser derrière moi avant Noël ?",
    "Qu'est-ce que j'attends vraiment, au fond, de cette fête ?",
    "À qui ai-je envie de penser ou de tendre la main pendant ces semaines ?"
  ],
  signes: "Chaque soir, prends une minute pour repérer un signe du Seigneur dans ta journée, par exemple une rencontre, une parole qui t'a touché, un moment de paix ou une aide reçue, et note-le en une ligne.",
  priere: { t: "Viens, Seigneur", x: "Seigneur Jésus, je t'attends. Viens dans ma vie, avec mes joies et mes fatigues. Rends-moi attentif à ta présence et prépare mon cœur à Noël." },
  bilan: [
    "Qu'est-ce qui a changé en moi depuis le début de l'Avent, même un tout petit peu ?",
    "Quel signe du Seigneur m'a le plus marqué pendant ces semaines ?",
    "Qu'est-ce que je garde comme habitude pour la suite, par exemple prier cinq minutes ou penser à quelqu'un ?"
  ],
  semaines: [
    { t: "Semaine 1", theme: "Veiller et espérer", intro: "On commence en se réveillant un peu. Veiller, c'est rester attentif à ce que Dieu fait déjà autour de nous.", jours: [
      { ref: "Is 2,1-5", a: "Regarde par ta fenêtre et prends une minute pour contempler la lumière du jour.", p: "Quelle lumière aimerais-je suivre cet Avent ?" },
      { ref: "Ps 130,1-6", a: "Éteins ton téléphone cinq minutes et reste simplement en silence.", p: "Qu'est-ce que j'attends, comme un veilleur attend le matin ?" },
      { ref: "Mc 13,33-37", a: "Choisis un moment de ta journée où tu seras vraiment présent à ce que tu fais.", p: "Où ai-je tendance à vivre sur pilote automatique ?" },
      { ref: "Lc 21,34-36", a: "Allège ton agenda d'une chose pas indispensable aujourd'hui.", p: "Qu'est-ce qui alourdit mon cœur en ce moment ?" },
      { ref: "Rm 13,11-14", a: "Lève-toi cinq minutes plus tôt, ou prends cinq minutes avant de t'endormir, pour prier.", p: "Seigneur, réveille en moi le désir de toi." },
      { ref: "Ps 25,1-9", a: "Écris sur un papier une chose que tu espères pour cet Avent.", p: "Seigneur, montre-moi ton chemin, apprends-moi à marcher avec toi." },
      { ref: "Mt 24,42-44", a: "Allume une bougie ce soir et dis simplement merci pour la semaine.", p: "Si Jésus frappait à ma porte ce soir, que lui dirais-je ?" }
    ] },
    { t: "Semaine 2", theme: "Préparer le chemin", intro: "Jean le Baptiste invite à changer de direction, doucement et concrètement. Préparer le chemin, c'est enlever ce qui encombre.", jours: [
      { ref: "Is 40,1-5", a: "Range un coin de ta maison, comme on aplanit un chemin.", p: "Quelle « montagne » ou quel « trou » voudrais-je voir aplani dans ma vie ?" },
      { ref: "Mc 1,1-8", a: "Fais une petite liste de ce qui te détourne de l'essentiel.", p: "Quelle est la première chose que je peux alléger ?" },
      { ref: "Mt 3,1-12", a: "Choisis une petite habitude à changer pendant quelques jours, comme moins d'écrans le soir.", p: "Qu'est-ce que « changer de cap » voudrait dire pour moi aujourd'hui ?" },
      { ref: "Lc 3,1-6", a: "Pense à quelqu'un avec qui la relation est compliquée et souhaite-lui du bien.", p: "Quel chemin pourrais-je ouvrir vers cette personne ?" },
      { ref: "Ba 5,1-9", a: "Mets une tenue ou un objet que tu aimes, pour te rappeler que tu es précieux.", p: "Seigneur, redonne-moi la joie d'être aimé par toi." },
      { ref: "Ps 85,9-14", a: "Cherche une occasion de dire une parole de paix, à la maison ou au travail.", p: "Où puis-je mettre un peu plus de paix autour de moi ?" },
      { ref: "Lc 3,10-14", a: "Donne un vêtement ou un objet dont tu n'as plus besoin.", p: "Que dois-je faire, tout simplement, pour mieux partager ?" }
    ] },
    { t: "Semaine 3", theme: "La joie qui vient", intro: "Au milieu de l'Avent, on goûte déjà la joie. Ce n'est pas une joie bruyante, c'est la paix de savoir que Dieu s'approche.", jours: [
      { ref: "So 3,14-18", a: "Mets une musique qui te fait du bien et écoute-la en entier.", p: "Qu'est-ce qui me rend joyeux en ce moment, même discrètement ?" },
      { ref: "Ph 4,4-7", a: "Envoie un message à quelqu'un pour lui dire merci.", p: "Quelle inquiétude puis-je déposer devant Dieu aujourd'hui ?" },
      { ref: "Is 35,1-6", a: "Sors marcher dix minutes dehors et regarde ce qui vit encore malgré l'hiver.", p: "Quel désert en moi pourrait refleurir ?" },
      { ref: "Ps 126,1-6", a: "Raconte à quelqu'un un moment heureux de ta vie.", p: "De quoi suis-je reconnaissant, même si tout n'est pas parfait ?" },
      { ref: "Is 61,1-3", a: "Rends un petit service à quelqu'un qui traverse une période difficile.", p: "Comment puis-je être une bonne nouvelle pour quelqu'un aujourd'hui ?" },
      { ref: "Mt 11,2-6", a: "Note trois signes de bien autour de toi, comme un geste gentil ou une aide.", p: "Où vois-je déjà le Seigneur à l'œuvre ?" },
      { ref: "1 Th 5,16-24", a: "Dis merci à haute voix, trois fois, pour trois choses différentes.", p: "Seigneur, apprends-moi à rendre grâce en toute situation." }
    ] },
    { t: "Semaine 4", theme: "Accueillir comme Marie", intro: "Marie dit oui à Dieu avec simplicité. Cette dernière semaine, on apprend à accueillir, comme elle et comme Joseph.", jours: [
      { ref: "Is 7,10-14", a: "Regarde une crèche ou une image de Noël et reste une minute en silence.", p: "Quel signe discret Dieu me donne-t-il en ce moment ?" },
      { ref: "Lc 1,26-38", a: "Dis à voix basse le « Je vous salue Marie » ou, si tu ne le connais pas, lis-le lentement.", p: "À quoi ai-je envie de dire oui, avec confiance ?" },
      { ref: "Lc 1,39-45", a: "Rends visite à quelqu'un ou appelle-le, comme Marie va voir Élisabeth.", p: "Qui a besoin que je vienne à sa rencontre ?" },
      { ref: "Lc 1,46-55", a: "Écris une phrase de louange avec tes propres mots.", p: "Pour quelles « grandes choses » voudrais-je dire merci ?" },
      { ref: "Mt 1,18-24", a: "Prends une décision que tu repoussais, même petite, avec calme.", p: "Comme Joseph, quelle confiance puis-je donner malgré mes doutes ?" },
      { ref: "Ps 24,7-10", a: "Ouvre une porte, ou une fenêtre, et prie simplement « Viens, Seigneur ».", p: "Quelle porte de ma vie voudrais-je ouvrir à Jésus ?" },
      { ref: "Lc 1,67-79", a: "Prépare ce qui te manque pour Noël, sans te mettre la pression, et respire.", p: "Seigneur, viens éclairer ceux qui sont dans l'ombre, et moi aussi." }
    ] }
  ]
},
noel: {
  nom: "Noël",
  resume: "Deux semaines pour s'émerveiller de Dieu qui devient un enfant.",
  sens: "À Noël, les chrétiens fêtent la naissance de Jésus à Bethléem. Dieu se fait tout proche, petit et fragile, pour que personne ne se sente seul. Ce temps dure jusqu'au baptême de Jésus et invite à garder la joie de cette lumière.",
  comment: [
    "Garde cinq minutes par jour, de préférence au calme, même au milieu des fêtes et des repas.",
    "Lis le passage lentement, tu peux le lire à voix haute près de la crèche ou d'une bougie.",
    "Choisis une seule phrase qui te touche et répète-la dans ta journée.",
    "Si les fêtes sont difficiles pour toi, par exemple à cause d'un deuil ou de la solitude, prends le temps qu'il faut. Dieu vient justement là.",
    "Si tu rates un jour, reprends le lendemain, sans te juger."
  ],
  intentions: [
    "Qu'est-ce que je voudrais vraiment fêter à Noël, au-delà des cadeaux ?",
    "Qui aimerais-je entourer de ma présence pendant ces jours ?",
    "Quelle lumière voudrais-je garder allumée dans mon cœur pour l'année qui vient ?"
  ],
  signes: "Chaque soir, repère un signe du Seigneur dans ta journée, par exemple une rencontre, une parole, une paix ou une aide, et note-le en une ligne, comme un petit cadeau reçu.",
  priere: { t: "Dieu avec nous", x: "Seigneur Jésus, tu es né pauvre et petit pour être près de moi. Aide-moi à t'accueillir et à partager ta lumière avec ceux que je croise." },
  bilan: [
    "Quel moment de Noël m'a le plus touché cette année ?",
    "Quelle lumière ai-je reçue, et à qui ai-je pu la transmettre ?",
    "Qu'est-ce que je voudrais garder de ce temps dans mes journées ordinaires ?"
  ],
  semaines: [
    { t: "Semaine 1", theme: "Dieu s'est fait petit", intro: "Noël commence par une naissance toute simple. On s'arrête devant ce bébé et on se laisse émerveiller.", jours: [
      { ref: "Lc 2,1-7", a: "Prends un moment devant la crèche ou une image de la nativité, sans rien dire.", p: "Quelle place ai-je fait à Jésus dans ma maison et dans mon cœur ?" },
      { ref: "Lc 2,8-14", a: "Dis « Gloire à Dieu » à voix haute, ou chante un chant de Noël que tu aimes.", p: "Quelle bonne nouvelle ai-je envie d'entendre aujourd'hui ?" },
      { ref: "Lc 2,15-20", a: "Raconte à quelqu'un ce qui t'a fait du bien à Noël.", p: "Comme les bergers, qu'ai-je vu et envie de partager ?" },
      { ref: "Jn 1,1-14", a: "Allume une bougie et prends une minute pour penser à la lumière.", p: "Où ai-je besoin de lumière en ce moment ?" },
      { ref: "Is 9,1-6", a: "Fais un geste de paix, par exemple un sourire ou un mot doux à quelqu'un de tendu.", p: "Quelle paix voudrais-je recevoir et donner ?" },
      { ref: "Tt 2,11-14", a: "Pense à un cadeau gratuit que tu peux offrir, comme du temps ou de l'écoute.", p: "Comment la bonté de Dieu m'apparaît-elle cette semaine ?" },
      { ref: "Ps 98,1-6", a: "Chante ou fredonne un chant joyeux, même faux.", p: "Qu'est-ce qui me donne envie de chanter aujourd'hui ?" }
    ] },
    { t: "Semaine 2", theme: "Une lumière pour tous", intro: "Cette lumière n'est pas pour un petit groupe. Des mages venus de loin, un vieillard, une famille ordinaire la reconnaissent.", jours: [
      { ref: "Lc 2,22-32", a: "Prends le temps de parler à une personne âgée, ou penses-y avec tendresse.", p: "Comme Syméon, qu'ai-je attendu longtemps et qui est enfin là ?" },
      { ref: "Lc 2,41-52", a: "Passe un moment simple avec ta famille ou tes proches, sans écran.", p: "Qu'est-ce qui rend ma famille ou mon entourage précieux ?" },
      { ref: "Mt 2,1-12", a: "Offre un petit cadeau fait de toi, comme un mot écrit à la main.", p: "Qu'ai-je envie d'offrir à Jésus, comme les mages ?" },
      { ref: "Is 60,1-6", a: "Ouvre les volets en grand ou sors un moment dans la lumière.", p: "Qu'est-ce qui me fait me lever et briller, même un peu ?" },
      { ref: "Ps 72,1-8", a: "Informe-toi sur une association qui aide des personnes pauvres ou isolées.", p: "Comment la justice et la paix peuvent-elles grandir autour de moi ?" },
      { ref: "Ep 3,2-6", a: "Pense à quelqu'un d'une autre culture ou d'un autre pays et prie pour lui.", p: "Qui me semble loin de Dieu, et pourtant aimé de lui ?" },
      { ref: "Mt 3,13-17", a: "Fais le signe de croix lentement, en pensant que tu es aimé.", p: "Que se passe-t-il en moi quand j'entends « celui-ci est mon Fils bien-aimé » ?" }
    ] }
  ]
},
careme: {
  nom: "Carême",
  resume: "Quarante jours pour revenir à l'essentiel et se tourner vers Pâques.",
  sens: "Le Carême dure quarante jours avant Pâques. Les chrétiens y retrouvent trois chemins simples, la prière, le partage et le jeûne, c'est-à-dire se priver de quelque chose pour faire de la place. Ce n'est pas un temps de tristesse, c'est un temps pour revenir à Dieu et aux autres, et préparer la joie de Pâques.",
  comment: [
    "Prends cinq minutes par jour, au même endroit et à la même heure si possible, par exemple dans les transports ou avant le repas.",
    "Lis le texte une première fois pour comprendre, puis une deuxième fois lentement en cherchant un mot qui te parle.",
    "Choisis un petit effort à tenir pendant tout le Carême, comme moins d'écrans, un don régulier ou un temps de silence.",
    "Fais l'action du jour si c'est possible. Si ce n'est pas le cas, garde simplement la question en tête.",
    "Si tu rates un jour ou une semaine, ce n'est pas grave. Reprends où tu en es, Dieu ne compte pas les points."
  ],
  intentions: [
    "Qu'est-ce que je voudrais laisser derrière moi pendant ces quarante jours ?",
    "Quel petit effort concret suis-je prêt à tenir, sans me mettre la pression ?",
    "Qu'est-ce que j'aimerais retrouver à Pâques, par exemple la paix, une relation ou la confiance ?"
  ],
  signes: "Chaque soir, prends une minute pour repérer un signe du Seigneur dans ta journée, par exemple une rencontre, une parole, une paix ou une aide, et note-le en une ligne.",
  priere: { t: "Revenir à toi", x: "Seigneur, je veux revenir à toi de tout mon cœur. Donne-moi la force des petits pas, et un cœur plus doux envers moi et envers les autres." },
  bilan: [
    "Qu'est-ce qui a changé en moi pendant ces semaines, même un tout petit peu ?",
    "Quel geste m'a fait le plus de bien, à moi ou à quelqu'un d'autre ?",
    "Que voudrais-je garder après Pâques, et de quoi me suis-je libéré ?"
  ],
  semaines: [
    { t: "Semaine 1", theme: "Prier", intro: "On commence par le plus simple, parler à Dieu. Il n'y a pas de belles formules à avoir, une parole sincère suffit.", jours: [
      { ref: "Mt 6,1-6", a: "Trouve un coin tranquille chez toi pour prier, même un petit coin de table.", p: "Où et quand puis-je prier chaque jour sans me forcer ?" },
      { ref: "Mt 6,7-15", a: "Dis le Notre Père lentement, une phrase après l'autre, ou lis-le si tu ne le connais pas.", p: "Quelle phrase du Notre Père me parle aujourd'hui ?" },
      { ref: "Ps 51,3-11", a: "Dis à Dieu avec tes mots une chose qui te pèse.", p: "Seigneur, aie pitié de moi et rends-moi la joie de ton salut." },
      { ref: "Mt 4,1-11", a: "Repère une petite tentation de ton quotidien, comme remettre au lendemain ou critiquer, et dis non une fois.", p: "Qu'est-ce qui m'attire loin de l'essentiel ?" },
      { ref: "Lc 11,1-4", a: "Demande à un proche comment il prie, ou lis une prière que tu aimes.", p: "Seigneur, apprends-moi à prier." },
      { ref: "Mc 1,12-15", a: "Fais cinq minutes de silence total, sans musique ni téléphone.", p: "Qu'est-ce que j'entends quand je me tais ?" },
      { ref: "Ps 91,1-6", a: "Confie à Dieu ce qui t'inquiète pour demain, en le disant à voix haute.", p: "Seigneur, tu es mon refuge. Je me repose en toi." }
    ] },
    { t: "Semaine 2", theme: "Jeûner pour faire de la place", intro: "Jeûner, ce n'est pas se punir. C'est se priver un peu de quelque chose pour retrouver ce qui compte vraiment.", jours: [
      { ref: "Is 58,6-10", a: "Choisis une chose dont te passer aujourd'hui, comme le dessert ou un réseau social.", p: "De quoi ai-je besoin d'être libéré pour mieux aimer ?" },
      { ref: "Mt 6,16-18", a: "Fais ton effort discrètement, sans en parler, juste entre toi et Dieu.", p: "Qu'est-ce qui change quand je fais un effort sans être vu ?" },
      { ref: "Jl 2,12-14", a: "Coupe les écrans pendant trente minutes et fais autre chose de calme.", p: "Qu'est-ce que je retrouve quand je coupe le bruit ?" },
      { ref: "Mt 17,1-8", a: "Prends un temps d'écoute, sans rien faire d'autre, avec quelqu'un ou en silence.", p: "À quelle voix ai-je envie de prêter davantage l'oreille ?" },
      { ref: "Dt 8,1-3", a: "Mange un repas simple, en prenant le temps de le savourer.", p: "De quoi ai-je vraiment faim, au fond ?" },
      { ref: "Ps 63,2-9", a: "Mets de côté ce que tu as économisé en te privant, pour un don plus tard.", p: "Seigneur, mon âme a soif de toi." },
      { ref: "1 R 19,4-8", a: "Si tu es fatigué, repose-toi sans culpabiliser, un vrai moment de repos.", p: "Quelle force Dieu me donne-t-il pour continuer la route ?" }
    ] },
    { t: "Semaine 3", theme: "Partager", intro: "Ce qu'on met de côté en se privant, on le partage. L'amour de Dieu se montre dans les gestes concrets envers les autres.", jours: [
      { ref: "Tb 4,7-11", a: "Donne un peu d'argent à une association ou à une personne dans le besoin.", p: "Qu'est-ce que je peux donner sans trop me priver ?" },
      { ref: "Mt 25,31-40", a: "Parle à quelqu'un qu'on ne regarde pas d'habitude, comme une personne seule ou à la rue.", p: "Où ai-je croisé Jésus sans le reconnaître ?" },
      { ref: "Lc 10,25-37", a: "Rends un service concret à un voisin, comme porter des courses ou garder un enfant.", p: "Qui est mon prochain aujourd'hui ?" },
      { ref: "Lc 21,1-4", a: "Donne un peu de temps, même dix minutes, à quelqu'un qui en manque.", p: "Qu'est-ce que je peux donner de mon petit, mais de tout cœur ?" },
      { ref: "Ac 4,32-35", a: "Propose de partager un repas ou une chose utile avec un voisin ou un collègue.", p: "Qu'est-ce que je garde pour moi, que je pourrais mettre en commun ?" },
      { ref: "Jc 2,14-17", a: "Fais une action au lieu d'un simple vœu, par exemple appeler quelqu'un en difficulté.", p: "Quelle bonne intention vais-je enfin mettre en pratique ?" },
      { ref: "Ps 112,1-9", a: "Fais un tri de vêtements ou de livres et donne ce qui peut servir.", p: "Que signifie être généreux sans compter ?" }
    ] },
    { t: "Semaine 4", theme: "Pardonner", intro: "Pardonner est souvent le plus dur. On ne le fait pas d'un coup, on avance par petits pas, avec l'aide de Dieu.", jours: [
      { ref: "Mt 18,21-35", a: "Pense à quelqu'un qui t'a blessé, sans chercher à tout régler, et nomme-le devant Dieu.", p: "À qui ai-je du mal à pardonner ?" },
      { ref: "Lc 15,11-24", a: "Écris un mot ou envoie un message à quelqu'un que tu as perdu de vue.", p: "Qu'est-ce que le Père attend de moi quand je reviens ?" },
      { ref: "Lc 6,27-31", a: "Souhaite du bien, en pensée ou en prière, à quelqu'un qui t'agace.", p: "Quel geste de bonté puis-je faire envers quelqu'un de difficile ?" },
      { ref: "Ep 4,29-32", a: "Passe une journée sans critiquer ni te moquer de personne.", p: "Quelle parole douce puis-je offrir aujourd'hui ?" },
      { ref: "Col 3,12-15", a: "Dis merci à quelqu'un pour une chose précise qu'il a faite pour toi.", p: "Quelle douceur ou quelle patience voudrais-je revêtir ?" },
      { ref: "Ps 103,1-13", a: "Pardonne-toi une chose, à toi-même, que tu te reproches depuis longtemps.", p: "Dieu éloigne nos fautes. Puis-je lui faire confiance ?" },
      { ref: "Jn 8,1-11", a: "Évite de juger quelqu'un aujourd'hui, même en pensée.", p: "Qu'est-ce que Jésus me dit, à moi, quand il ne me condamne pas ?" }
    ] },
    { t: "Semaine 5", theme: "Se réconcilier", intro: "On passe du pardon intérieur aux gestes qui réparent. Se réconcilier avec les autres et avec Dieu rend la vie plus légère.", jours: [
      { ref: "Mt 5,21-26", a: "Écris à quelqu'un que tu as blessé, ou prépare ce que tu voudrais lui dire.", p: "Qu'est-ce qui me retient de faire le premier pas ?" },
      { ref: "Lc 19,1-10", a: "Répare une petite chose, comme rendre un objet emprunté ou une dette.", p: "Quelle petite réparation puis-je faire cette semaine ?" },
      { ref: "2 Co 5,17-21", a: "Fais le tri dans tes pensées, et jette-en une qui t'enferme.", p: "En quoi suis-je invité à repartir à neuf ?" },
      { ref: "Lc 18,9-14", a: "Dis à Dieu simplement « Sois bon pour moi », sans te justifier.", p: "Quelle humilité puis-je choisir aujourd'hui ?" },
      { ref: "Ez 36,24-28", a: "Réfléchis à te confesser une fois pendant le Carême, et regarde les horaires d'une paroisse près de chez toi.", p: "Quel cœur nouveau voudrais-je demander à Dieu ?" },
      { ref: "Ps 32,1-5", a: "Dis à une personne de confiance ce qui te pèse, ou écris-le.", p: "Quelle paix ressens-je quand je reconnais ce qui ne va pas ?" },
      { ref: "Lc 7,36-47", a: "Offre un petit geste d'affection à quelqu'un qui compte pour toi.", p: "À qui ai-je envie de montrer plus d'amour ?" }
    ] },
    { t: "Semaine 6", theme: "Marcher vers Pâques", intro: "On approche de Jérusalem avec Jésus. La route devient plus grave, mais elle mène à la lumière de Pâques.", jours: [
      { ref: "Mc 10,32-45", a: "Va à la messe un jour de semaine, ou prends un moment dans une église ouverte.", p: "Où suis-je prêt à suivre Jésus, même quand c'est difficile ?" },
      { ref: "Jn 12,20-26", a: "Fais un geste discret pour quelqu'un, sans attendre de merci.", p: "Qu'est-ce que je suis prêt à laisser mourir pour que la vie grandisse ?" },
      { ref: "Jn 11,17-27", a: "Pense à une personne que tu as perdue et dis son prénom à Dieu.", p: "Que signifie pour moi « Je suis la résurrection et la vie » ?" },
      { ref: "Jn 11,38-44", a: "Ouvre une fenêtre, mets de l'ordre dans une pièce, comme Lazare qu'on libère.", p: "Qu'est-ce qui, en moi, attend d'être délié et remis debout ?" },
      { ref: "Ph 2,5-11", a: "Fais une chose humble aujourd'hui, comme la vaisselle ou un service que personne ne voit.", p: "Comment Jésus me montre-t-il le chemin de l'humilité ?" },
      { ref: "Is 50,4-9", a: "Reste calme face à une critique ou une contrariété, et respire avant de répondre.", p: "Quelle confiance puis-je garder quand c'est difficile ?" },
      { ref: "Ps 118,19-24", a: "Prépare un petit repas ou une attention pour la semaine sainte, en famille ou entre amis.", p: "Quelle porte Dieu m'ouvre-t-il vers Pâques ?" }
    ] }
  ]
},
semainesainte: {
  nom: "Semaine sainte",
  resume: "Huit jours pour suivre Jésus, des Rameaux jusqu'à Pâques.",
  sens: "La Semaine sainte est la plus importante de l'année pour les chrétiens. On y revit les derniers jours de Jésus, son dernier repas, sa mort sur la croix et sa résurrection. Chaque jour est une étape sur le chemin qui mène à la joie de Pâques.",
  comment: [
    "Prends cinq minutes par jour, plus si tu le peux les jours de célébration, comme le Jeudi saint ou le Vendredi saint.",
    "Lis le récit lentement, comme si tu étais dans la scène, et imagine ce que les personnages voient et ressentent.",
    "Si tu le peux, va à une célébration de la semaine, même sans tout comprendre. Une église ouverte est aussi un bon endroit pour prier.",
    "Garde une ambiance calme, avec moins de bruit et de distractions que d'habitude.",
    "Si tu rates un jour, reprends sans te juger. Le chemin est fait pour être suivi à ton rythme."
  ],
  intentions: [
    "Qu'est-ce que je voudrais comprendre ou recevoir de cette semaine ?",
    "Qu'est-ce que je suis prêt à confier à Dieu, par exemple une peine ou une peur ?",
    "Avec qui aimerais-je vivre ces jours, ou à qui penser davantage ?"
  ],
  signes: "Chaque soir, repère un signe du Seigneur dans ta journée, par exemple une rencontre, une parole, une paix ou une aide, et note-le en une ligne.",
  priere: { t: "Avec toi jusqu'au bout", x: "Seigneur Jésus, tu as donné ta vie par amour. Reste près de moi pendant ces jours et conduis-moi jusqu'à la joie de ta résurrection." },
  bilan: [
    "Quel moment de cette semaine m'a le plus touché ?",
    "Qu'ai-je découvert sur l'amour de Jésus, ou sur moi-même ?",
    "Qu'est-ce que je garde de cette semaine pour continuer le chemin ?"
  ],
  semaines: [
    { t: "Semaine sainte", theme: "Du dimanche des Rameaux à Pâques", intro: "On suit Jésus pas à pas, de son entrée à Jérusalem jusqu'au matin de la résurrection.", jours: [
      { t: "Dimanche des Rameaux", sens: "On célèbre l'entrée de Jésus à Jérusalem, acclamé par la foule. Ce jour, on porte un rameau béni à la messe et on se rappelle qu'on veut suivre Jésus, même quand l'enthousiasme retombe.", ref: "Mt 21,1-11", a: "Si tu le peux, va à la messe et prends un rameau, sinon pose un brin de verdure chez toi.", p: "Comment est-ce que j'accueille Jésus, avec des cris de joie ou avec réserve ?" },
      { t: "Lundi saint", sens: "À Béthanie, une amie de Jésus verse un parfum précieux sur ses pieds. On regarde ce geste d'amour sans calcul, et on se demande ce qu'on offre à Jésus.", ref: "Jn 12,1-11", a: "Fais un geste d'attention gratuit pour quelqu'un, comme un mot tendre ou une visite.", p: "Que puis-je offrir à Jésus sans compter ?" },
      { t: "Mardi saint", sens: "Jésus annonce que l'un de ses amis va le trahir. On touche la fragilité de l'amitié, la nôtre aussi, et on peut confier à Dieu nos propres manques de fidélité.", ref: "Jn 13,21-30", a: "Prends un moment pour dire à Dieu une fois où tu as manqué de fidélité, sans te juger.", p: "Seigneur, aide-moi à rester fidèle, même quand j'ai peur." },
      { t: "Mercredi saint", sens: "On entend la trahison de Judas et le début de la Pâque. On reste en silence devant l'ombre qui grandit, en sachant que Jésus reste libre et aimant.", ref: "Mt 26,14-25", a: "Coupe un moment le bruit, par exemple la télé ou la musique, et reste en silence cinq minutes.", p: "Qu'est-ce qui, en moi, pourrait trahir ce que j'aime ?" },
      { t: "Jeudi saint", sens: "Ce soir-là, Jésus partage un dernier repas avec ses amis et leur lave les pieds. L'Église célèbre l'eucharistie, le don de lui-même dans le pain et le vin, et le service des autres.", ref: "Jn 13,1-15", a: "Rends un service humble, comme laver la vaisselle de quelqu'un ou aider une personne âgée. Si tu peux, va à la messe du soir.", p: "Qui puis-je servir aujourd'hui, comme Jésus a servi ses amis ?" },
      { t: "Vendredi saint", sens: "On se souvient de la mort de Jésus sur la croix. L'Église ne célèbre pas de messe ce jour-là, mais une liturgie de la Passion avec la vénération de la croix, dans le silence et la sobriété.", ref: "Jn 19,16-30", a: "Si tu le peux, participe à la célébration ou au chemin de croix. Sinon, fais un repas très simple et reste en silence un moment.", p: "Que me dit la croix de l'amour de Dieu pour moi ?" },
      { t: "Samedi saint", sens: "Jésus repose dans le tombeau. C'est un jour de silence et d'attente, où on n'a plus rien à faire sinon espérer. Le soir, certains vivent la veillée pascale, la grande célébration de la lumière.", ref: "Mt 27,57-66", a: "Reste dans le calme, et prépare une bougie pour la nuit de Pâques ou pour demain matin.", p: "Qu'est-ce que j'attends encore, dans le silence ?" },
      { t: "Dimanche de Pâques", sens: "Jésus est vivant. Le matin, le tombeau est vide et la lumière a vaincu la nuit. C'est la fête la plus grande de l'année, on peut allumer une bougie, partager un bon repas et dire « Christ est ressuscité ».", ref: "Jn 20,1-9", a: "Va à la messe de Pâques si tu le peux, et partage la joie avec quelqu'un en lui disant « Joyeuses Pâques ».", p: "Qu'est-ce que la résurrection de Jésus change pour moi aujourd'hui ?" }
    ] }
  ]
},
paques: {
  nom: "Pâques",
  resume: "Sept semaines de joie pour reconnaître Jésus vivant, jusqu'à la Pentecôte.",
  sens: "Le temps pascal dure cinquante jours, de Pâques à la Pentecôte. Les chrétiens célèbrent que Jésus est vivant et qu'il accompagne chacun. Ces semaines servent à goûter la joie de la résurrection et à recevoir l'Esprit Saint, qui rend capable d'aimer et de témoigner.",
  comment: [
    "Prends cinq minutes par jour, avec le sourire si tu peux. Ce temps est fait pour la joie.",
    "Lis le passage, puis demande-toi simplement qui tu vois, ce qu'il dit et ce que cela te dit à toi.",
    "Fais l'action du jour si tu peux, elle est toujours petite. Sinon, garde la question avec toi.",
    "Allume une bougie pour te rappeler que Jésus est la lumière. Tu peux la laisser près d'un coin de la maison.",
    "Si tu rates un jour ou une semaine, ce n'est pas grave. Reprends doucement, la joie ne se mérite pas."
  ],
  intentions: [
    "Qu'est-ce que je voudrais vivre de neuf pendant ces sept semaines ?",
    "Où ai-je besoin de reconnaître que Jésus est présent, même discrètement ?",
    "Avec qui aimerais-je partager la joie de Pâques ?"
  ],
  signes: "Chaque soir, repère un signe du Seigneur dans ta journée, par exemple une rencontre, une parole, une paix ou une aide, et note-le en une ligne, comme on note une bonne nouvelle.",
  priere: { t: "Tu es vivant", x: "Jésus ressuscité, tu es vivant et tu marches avec moi. Ouvre mes yeux pour te reconnaître et donne-moi ton Esprit pour aimer comme toi." },
  bilan: [
    "Où ai-je reconnu Jésus vivant pendant ces semaines ?",
    "Qu'est-ce que la joie de Pâques a changé dans ma façon de voir ou d'aimer ?",
    "Quel geste ou quelle habitude de ce temps voudrais-je continuer après la Pentecôte ?"
  ],
  semaines: [
    { t: "Semaine 1", theme: "Reconnaître Jésus vivant", intro: "Les premiers témoins ne reconnaissent pas tout de suite Jésus. Il se laisse découvrir dans un geste, un mot, un partage.", jours: [
      { ref: "Mt 28,1-10", a: "Fais un geste de joie, comme ouvrir une fenêtre ou mettre une musique douce.", p: "Qu'est-ce qui me donne envie de n'avoir plus peur ?" },
      { ref: "Lc 24,13-24", a: "Marche dix minutes en pensant à quelque chose qui t'a déçu, et confie-le à Dieu.", p: "Quand ai-je marché sans voir que Jésus était là ?" },
      { ref: "Lc 24,25-35", a: "Partage un repas simple avec quelqu'un, en prenant le temps de l'écouter.", p: "Où ai-je senti mon cœur « tout brûlant » en chemin ?" },
      { ref: "Jn 20,11-18", a: "Appelle quelqu'un par son prénom avec douceur et attention.", p: "Qu'est-ce que cela fait d'être appelé par mon prénom ?" },
      { ref: "Mc 16,1-8", a: "Fais une chose que tu repoussais par peur, même toute petite.", p: "Quelle pierre lourde ai-je envie de voir roulée ?" },
      { ref: "Ps 118,14-24", a: "Dis à haute voix « Voici le jour que fit le Seigneur » en te levant.", p: "Pour quoi puis-je me réjouir aujourd'hui ?" },
      { ref: "Lc 24,36-43", a: "Regarde ta journée et cherche une chose simple pour laquelle remercier.", p: "Où Jésus se rend-il proche de moi, très concrètement ?" }
    ] },
    { t: "Semaine 2", theme: "La paix du Ressuscité", intro: "Jésus apparaît à des amis qui ont peur et doutent. Il leur apporte la paix, et il comprend aussi nos questions.", jours: [
      { ref: "Jn 20,19-23", a: "Dis « La paix soit avec toi » à une personne, ou dans ta tête pour quelqu'un d'absent.", p: "Quelle paix ai-je envie de recevoir et de donner ?" },
      { ref: "Jn 20,24-29", a: "Note une question ou un doute que tu as sur la foi, sans te condamner.", p: "Qu'est-ce que je voudrais demander à Jésus, comme Thomas ?" },
      { ref: "Jn 14,25-29", a: "Respire profondément trois fois et dépose une inquiétude entre les mains de Dieu.", p: "Quelle inquiétude ai-je besoin de lâcher ?" },
      { ref: "Ph 4,6-9", a: "Remplace une plainte par un merci dans ta journée.", p: "À quoi ai-je envie de penser de beau et de bon ?" },
      { ref: "Ps 4,2-9", a: "Avant de dormir, dis « Je me couche en paix » et confie ta nuit à Dieu.", p: "Qu'est-ce qui me donne un sommeil tranquille ?" },
      { ref: "Is 26,1-4", a: "Choisis un endroit calme et reste dix minutes sans rien faire.", p: "Sur qui puis-je m'appuyer quand tout bouge ?" },
      { ref: "Jn 16,31-33", a: "Relis une difficulté récente et cherche une petite lumière dedans.", p: "Qu'est-ce qui m'aide à garder courage ?" }
    ] },
    { t: "Semaine 3", theme: "Être aimé et pardonné", intro: "Pierre a renié Jésus, et Jésus lui redonne confiance. Il fait de même pour nous, sans reproches.", jours: [
      { ref: "Jn 21,1-8", a: "Fais un travail ordinaire en pensant que Jésus est là, avec toi.", p: "Où Jésus se tient-il sur le bord de ma journée ?" },
      { ref: "Jn 21,9-14", a: "Prépare un petit déjeuner ou un goûter pour quelqu'un.", p: "Quelle joie y a-t-il à être invité à sa table ?" },
      { ref: "Jn 21,15-19", a: "Dis à quelqu'un que tu l'aimes, ou le lui montre.", p: "Quelle réponse sincère puis-je donner à « M'aimes-tu ? »" },
      { ref: "Ac 3,1-10", a: "Tends la main à quelqu'un qui est tombé ou découragé, par un mot ou un geste.", p: "Qui a besoin que je l'aide à se relever ?" },
      { ref: "Ps 30,2-6", a: "Note une chose dont tu t'es relevé dans ta vie, même ancienne.", p: "De quelle épreuve Dieu m'a-t-il déjà relevé ?" },
      { ref: "1 P 1,3-9", a: "Écris une chose qui nourrit ton espérance, et garde-la dans ton portefeuille.", p: "Qu'est-ce qui me donne une espérance vivante ?" },
      { ref: "Ps 116,1-9", a: "Remercie à voix haute pour une prière qui a été entendue.", p: "Quand ai-je senti que Dieu m'écoutait ?" }
    ] },
    { t: "Semaine 4", theme: "Le bon pasteur", intro: "Jésus se présente comme un berger qui connaît chacun par son nom. On apprend à reconnaître sa voix et à lui faire confiance.", jours: [
      { ref: "Jn 10,1-10", a: "Pendant la journée, repère une voix intérieure qui apaise plutôt que celle qui inquiète.", p: "Quelle voix ai-je envie de suivre ?" },
      { ref: "Jn 10,11-18", a: "Prends soin d'une personne ou d'un animal qui dépend de toi, avec attention.", p: "Qui est confié à mes soins ?" },
      { ref: "Ps 23,1-6", a: "Apprends ce psaume par cœur, ou au moins la première phrase.", p: "De quoi ai-je besoin pour me sentir en paix ?" },
      { ref: "Jn 10,22-30", a: "Pense à quelqu'un qui t'a toujours soutenu et dis-lui merci.", p: "Qu'est-ce que cela change de savoir que je suis tenu dans sa main ?" },
      { ref: "Ez 34,11-16", a: "Va à la rencontre de quelqu'un qui est isolé, par un appel ou un mot.", p: "Qui est perdu ou à l'écart autour de moi ?" },
      { ref: "Lc 15,1-7", a: "Fais un geste d'accueil pour quelqu'un de nouveau dans ton entourage.", p: "Qu'est-ce que je ressens à l'idée d'être cherché par Dieu ?" },
      { ref: "1 P 2,21-25", a: "Choisis une petite patience à vivre aujourd'hui, par exemple dans une file d'attente.", p: "Comment suivre Jésus dans les petites choses de la journée ?" }
    ] },
    { t: "Semaine 5", theme: "Demeurer et aimer", intro: "Jésus compare notre lien avec lui à une vigne. On reste unis à lui pour porter du fruit, c'est-à-dire aimer concrètement.", jours: [
      { ref: "Jn 15,1-8", a: "Prends une plante ou un arbre en photo et pense à ce qui te fait grandir.", p: "Qu'est-ce qui me nourrit vraiment ?" },
      { ref: "Jn 15,9-17", a: "Fais une surprise à un ami, comme un mot ou un petit repas.", p: "Que veut dire « Je ne vous appelle plus serviteurs, mais amis » ?" },
      { ref: "Jn 13,31-35", a: "Montre de l'amour concret à quelqu'un de ton entourage, sans attendre de retour.", p: "Comment aimer comme Jésus m'a aimé ?" },
      { ref: "1 Jn 4,7-12", a: "Remercie quelqu'un qui t'a montré de l'amour dans ta vie.", p: "Où ai-je rencontré l'amour de Dieu à travers quelqu'un ?" },
      { ref: "Ac 2,42-47", a: "Mets quelque chose en commun, comme un repas avec des voisins ou un covoiturage.", p: "Comment faire communauté, même à petite échelle ?" },
      { ref: "Jn 14,1-6", a: "Si tu te sens perdu, écris une question à laquelle tu cherches une réponse.", p: "Que signifie pour moi « Je suis le chemin » ?" },
      { ref: "1 Co 13,1-7", a: "Choisis une qualité de l'amour dans ce texte, comme la patience, et vis-la aujourd'hui.", p: "Quelle qualité de l'amour ai-je le plus besoin de cultiver ?" }
    ] },
    { t: "Semaine 6", theme: "Envoyés comme témoins", intro: "Jésus remonte vers son Père et confie sa mission à ses amis. À nous aussi, il demande de faire connaître la bonne nouvelle, à notre manière.", jours: [
      { ref: "Ac 1,1-11", a: "Lève les yeux au ciel pendant une minute, puis regarde autour de toi.", p: "Qu'est-ce que Jésus attend de moi sur la terre ?" },
      { ref: "Lc 24,44-53", a: "Dis une bénédiction ou un mot gentil à quelqu'un en le quittant.", p: "Qu'est-ce que je ressens quand quelqu'un me bénit ou me souhaite du bien ?" },
      { ref: "Mt 28,16-20", a: "Parle de quelque chose de bon que tu vis, à un ami, simplement et sans pression.", p: "Qu'ai-je envie de partager de ce que j'ai reçu ?" },
      { ref: "Ac 1,12-14", a: "Prie avec quelqu'un ou demande-lui de prier pour toi, cinq minutes.", p: "Qu'est-ce que prier ensemble apporte ?" },
      { ref: "Ac 8,26-38", a: "Aide quelqu'un à comprendre une chose qu'il cherche, avec patience.", p: "Qui m'a aidé à comprendre quelque chose de la foi ?" },
      { ref: "Ep 1,17-23", a: "Prends un moment pour demander à Dieu de t'éclairer sur une décision.", p: "Quelle lumière demander pour les yeux de mon cœur ?" },
      { ref: "Jn 17,20-23", a: "Prie pour l'unité entre des personnes ou des groupes qui se disputent.", p: "Où puis-je construire un pont entre des personnes ?" }
    ] },
    { t: "Semaine 7", theme: "L'Esprit Saint", intro: "L'Esprit Saint est le souffle de Dieu qui vient habiter chacun. On le demande avec confiance, et on l'accueille dans les gestes de tous les jours.", jours: [
      { ref: "Jn 7,37-39", a: "Bois un grand verre d'eau lentement en pensant à ce qui désaltère ton cœur.", p: "De quoi ai-je soif en profondeur ?" },
      { ref: "Jn 14,15-21", a: "Dis simplement « Viens, Esprit Saint » à plusieurs moments de la journée.", p: "Qu'est-ce que cela veut dire que je ne suis pas orphelin ?" },
      { ref: "Rm 8,14-17", a: "Appelle Dieu « Père » dans ta prière, avec tes mots à toi.", p: "Que change le fait d'être enfant de Dieu ?" },
      { ref: "Ga 5,16-25", a: "Choisis un fruit de l'Esprit, comme la joie, la patience ou la bonté, et vis-le aujourd'hui.", p: "Quel fruit voudrais-je voir grandir en moi ?" },
      { ref: "Ps 104,24-34", a: "Sors regarder la nature, un arbre, le ciel ou un oiseau, pendant cinq minutes.", p: "Où vois-je le souffle de Dieu dans la création ?" },
      { ref: "1 Co 12,4-13", a: "Pense à un talent que tu as et mets-le au service de quelqu'un.", p: "Quel don ai-je reçu pour le bien des autres ?" },
      { ref: "Ac 2,1-11", a: "Si tu le peux, va à la messe de Pentecôte, et allume ta bougie en souriant.", p: "Esprit Saint, viens en moi et fais de moi un témoin joyeux." }
    ] }
  ]
}
};
