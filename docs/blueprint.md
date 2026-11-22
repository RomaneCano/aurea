# Application iOS d'initiation catholique — Blueprint produit v0.1

> Nom : **Auréa** (« dorée » en latin ; évoque la lumière dorée du lever de soleil, palette et métaphore centrale). Disponibilité (marque, App Store, domaine) à vérifier.

---

## 1. Vision en une phrase
Un compagnon quotidien, doux et visuel, qui mène un vrai débutant de « je ne sais rien » à « je prie, je lis, je vais à la messe et je suis accompagné par une vraie communauté » en un an. Et il ne l'abandonne pas ensuite.

## 2. Principes de conception
1. **Une seule chose à l'écran à la fois.** Une carte = une idée = moins de 60 secondes.
2. **Révélation progressive.** Les modules se débloquent au rythme de l'utilisateur (voir §4).
3. **Chaque mot difficile est cliquable** (« sacrement », « Évangile », « catéchumène »…). Une bulle donne la définition en une phrase, avec « en savoir plus » possible.
4. **Mise en relation avant tout.** L'app est un pont vers une vraie paroisse, un vrai prêtre, de vrais accompagnateurs. Elle ne les remplace pas.
5. **Vérité + douceur.** Aucune moquerie, aucun dénigrement. On affirme ce que l'Église enseigne comme enseignement de l'Église, et on appuie sur des faits vérifiables.
6. **Gamification sobre.** Lumière, chemin, étapes. Pas de pression, pas de « perte de série » culpabilisante.

## 3. Design
- **Palette « lever de soleil »** : nuit indigo → rose aube → or → crème. Le fond change selon l'heure (aube, jour, crépuscule).
- Illustrations douces, typographie serif lisible pour les textes, sans-serif pour l'interface.
- L'écran d'accueil est un **chemin ou paysage** : chaque étape franchie fait monter le soleil.
- Animations lentes, haptique légère, mode sombre « veillée ».
- Accessibilité : Dynamic Type, VoiceOver, contrastes AA.

## 4. Parcours progressif (déblocage)
| Phase | Contenu | Débloque |
|---|---|---|
| **Jour 1** | L'essentiel de la foi en 5 cartes (Dieu, Jésus, l'Église, l'amour, la prière), puis **une prière courte** (« Seigneur, guide-moi ») à dire tout de suite | Accueil, Prière |
| **Semaine 1** | Intro à la Bible : AT / NT, chapitre / verset, auteurs, ordre d'apparition (judaïsme → christianisme) | Bible, Notes |
| **Semaine 2** | Jeu « Qui est Jésus ? » niveau 1, évangile du jour, psaume vs évangile | Jeux, Évangile du jour |
| **Mois 1** | Messe : comment y assister, trouver une messe, contacter une paroisse | Messes & fêtes, Contact paroisse |
| **Mois 2** | Sacrements, pourquoi le baptême, catéchuménat | Sacrements, Accompagnement |
| **Mois 3** | Chapelet pas à pas, intentions par jour | Chapelet |
| **Mois 3+** | Plans de lecture, The Chosen, activités hebdo, pèlerinages | Plans, Pèlerinages |
| **Mois 4+** | Communauté locale (après modération et consentement) | Communauté |
| **Mois 6+** | Courants du catholicisme, scouts, groupes d'étude, parcours avancés | Approfondir |

Après un an : parcours thématiques (saints, histoire de l'Église, liturgie, doctrine sociale), défis saisonniers (Avent, Carême), nouveaux plans.

## 5. Profil et adaptation (onboarding)
Questions : prénom, âge (voir §10), localisation (facultative), **parcours**, niveau.

Parcours proposés : *Je découvre / Ancien chrétien qui revient (+ niveau : 1 à 4) / Musulman / Juif / Athée / Bouddhiste / Ésotérisme / Autre / Plutôt scientifique*. Un choix « Je préfère ne pas dire » est obligatoire.

Effets : vocabulaire, profondeur, et une **série de cartes « Ponts »** propre à chaque parcours. Tout est modifiable à tout moment dans Réglages.

⚠️ **Ces données sont sensibles au sens du RGPD (art. 9).** Voir §10.

### Règles éditoriales des « Ponts » (très important)
- Ne parler que de faits **sourcés** (texte, date, historien, référence biblique ou coranique précise).
- Commencer par ce qui est **commun** et respectable dans la tradition de la personne, puis montrer ce que le christianisme ajoute.
- Distinguer toujours : **« fait historique »** / **« ce que l'Église enseigne »** / **« débat entre spécialistes »**.
- Chaque carte a un niveau de certitude et sa source. Chaque carte est relue par un prêtre ou un théologien, et par une personne issue du parcours concerné quand c'est possible.

### Corrections factuelles à intégrer (à relire avec votre équipe)
Plusieurs points de votre brief ne tiendraient pas à l'épreuve des faits. Un utilisateur sceptique les démonterait en 30 secondes, ce qui ruinerait la confiance dans tout le reste.

1. **« L'islam est à l'origine une secte catholique divergente »** : ce n'est pas un fait établi. L'islam naît au VIIe siècle en Arabie, avec une théologie propre. Il existe des débats d'historiens sur les influences des christianismes (judéo-chrétiens, syriaques) présents dans la région, mais cela reste un sujet disputé, pas une origine démontrée. **Alternative factuelle et respectueuse :** le Coran parle de Jésus (Îsâ) : naissance virginale, Messie, parole de Dieu, miracles. Les musulmans ne croient pas en sa divinité ni en sa crucifixion. Les Églises d'Orient étaient très présentes dans la région. On part de ce qu'ils vénèrent déjà : Jésus.
2. **« Jésus est le seul homme décrit comme bon dans toutes les religions et cité partout »** : c'est inexact. Il est cité dans le Coran et honoré par certains hindous, bouddhistes, bahaïs, etc., mais pas « dans toutes » ni de la même manière. **À formuler ainsi :** « Jésus est une figure que de nombreuses traditions respectent. » Tout le reste de la carte doit être sourcé.
3. **« Jésus a accompli X prophéties »** : le chiffre « 300+ » circule beaucoup mais dépend de ce qu'on compte comme prophétie, et il est contesté. **Recommandation :** présenter **~10 prophéties emblématiques** (Is 7,14 ; Is 53 ; Mi 5,1 ; Ps 22 ; Za 9,9…) avec le texte, la date approximative de rédaction (rouleaux d'Isaïe de Qumrân, avant le Ier s.), la lecture chrétienne et la lecture juive. L'honnêteté est ici plus convaincante.
4. **« Rien ne vient après lui »** : c'est une affirmation de foi (révélation close dans le Christ). La présenter comme telle : « Voici ce que l'Église enseigne et pourquoi ».
5. **Évangile historique** : s'appuyer sur Tacite, Flavius Josèphe, Pline le Jeune, la datation des manuscrits (p52, etc.) pour l'existence de Jésus et la rapidité de la tradition. Ne pas surinterpréter.

## 6. Modules détaillés
1. **Les bases** : 5 à 7 cartes, glossaire cliquable partout.
2. **Prière** : prière du Seigneur, Je vous salue Marie, Gloire au Père, prière d'ouverture personnelle, avec audio et suivi.
3. **La Bible** : intro guidée, lecteur intégré (voir §9 pour les droits), notes et surlignage, différences entre Évangile / psaume / lettre / prophète. Plans : **chronologique**, **valeurs et Évangiles**, **30 jours Évangile selon Marc**, etc., à plusieurs niveaux.
4. **Évangile du jour** : texte, courte explication, question de réflexion.
5. **Jeu « Jésus »** : parcours de type Duolingo sobre. Niveaux : qui est Jésus, sa vie, les personnes rencontrées (Marie, Pierre, Zachée, Marie-Madeleine, la Samaritaine…), les grandes valeurs. Récompense : une lumière ou une pièce de vitrail.
6. **Messe & fêtes** : calendrier liturgique expliqué, « Ma première messe » (où s'asseoir, quand se lever, communion, quoi dire), carte des messes proches avec horaires, bouton « contacter la paroisse », « je veux commencer le catéchuménat ».
7. **Sacrements** : 7 cartes, avec focus « pourquoi le baptême ».
8. **Chapelet** : apprentissage pas à pas, mode guidé (dizaine par dizaine, avec décompte), mystères du jour (joyeux, lumineux, douloureux, glorieux), intentions de prière, boutiques partenaires (la bénédiction se fait par un prêtre, pas un « baptême »). Dire « faire bénir » plutôt que « faire baptiser » : le baptême est un sacrement pour les personnes.
9. **Pèlerinages** : pourquoi, histoire, lieux proches par géolocalisation, dates, liens d'inscription.
10. **The Chosen** : épisodes recommandés selon l'avancement, avec les passages bibliques associés.
11. **Vidéos** : sélection courte en français (par ex. Frère Paul-Adrien), intégrées via lecteur YouTube officiel. Voir §9.
12. **Courants catholiques et vie d'Église** : rites, ordres, mouvements, scouts, groupes d'étude. Message : « Une seule Église, plusieurs sensibilités. Nous sommes tous frères. »
13. **FAQ intelligente** : question libre, recherche sémantique sur une base de réponses validées. Au début, **pas d'IA générative** : retrouver la meilleure réponse existante (zéro risque d'invention). Plus tard, IA avec sources citées (abonnement).
14. **Activité de la semaine** : dessin, chant, prière, bonne action, méditation, tricot…, avec option « partager » facultative.
15. **Carnet** : notes, intentions de prière, journal de progression.
16. **Communauté** : voir §7.

## 7. Mise en relation et communauté (le cœur du projet)
Priorité : **vraies personnes, vraies paroisses.**
- **Fiche paroisse** : horaires de messe, contact du prêtre ou de l'équipe catéchuménat, bouton « Je souhaite être accompagné ».
- **Accompagnateurs / parrains-marraines** : des fidèles formés et vérifiés par leur paroisse.
- **Petits groupes locaux** (débutants entre eux, par région).
- **Salons d'entraide** modérés, jamais de messages privés entre inconnus sans vérification.
- **Mineurs** : pas de messagerie privée, groupes encadrés uniquement, accord parental sous 15 ans.
- Signalement, modération, charte de bienveillance. Pas de débats polémiques.

## 8. Gamification élégante
- Étapes de lumière (aube → midi), vitraux à compléter, « jours de lumière » sans pénalité de série perdue.
- Badges qui racontent une histoire (« La Samaritaine », « Premier verset »).
- Jamais de classement public, jamais de comparaison entre personnes.
- Rappels doux, un seul par jour maximum, horaire choisi.

## 9. Contenus, sources et droits
| Besoin | Piste | À vérifier |
|---|---|---|
| Lectures du jour | **AELF** (API publique des lectures liturgiques) | Conditions d'usage |
| Messes proches | **messes.info** (Conférence des évêques de France) | Accès API ou partenariat |
| Bible | **Ze Bible** : très bon pour débutants | **Droits de reproduction** : il faut un accord. Sinon : AELF, TOB ou Segond (domaine public) |
| Vidéos | Intégration YouTube officielle (embed) | Ne pas retélécharger : contacter les créateurs pour un partenariat |
| The Chosen | Liens vers les plateformes officielles | Pas de droits à reproduire |
| Pèlerinages | Diocèses, sanctuaires, Pèlerinages.fr | Partenariats |
| Boutiques chapelets | Liens affiliés | Mentionner l'affiliation |
| Textes de l'Église | Catéchisme (CEC), documents du Vatican | Citer les numéros |

Chaque contenu doctrinal est validé par un **relecteur théologique** (prêtre, diacre ou laïc formé). Idéal : obtenir un *nihil obstat* ou le soutien d'un diocèse, ce qui donne aussi de la crédibilité auprès des paroisses.

## 10. Légal, éthique et App Store
- **Données de religion = catégorie particulière RGPD.** Consentement explicite, séparé et révocable, minimisation, chiffrement, export et suppression en un clic, hébergement UE. Ne pas utiliser ces données pour de la publicité. La géoloc est facultative, approximative par défaut.
- **Mineurs** : âge minimum, consentement parental < 15 ans en France, aucun tracking.
- **Fonctionnalité sociale** : respecter les règles App Store sur le contenu généré par les utilisateurs (signalement, blocage, modération).
- **Abonnement IA** : achat intégré Apple (StoreKit), avec 15 à 30 % de commission.
- Les contenus « ponts » ne doivent ni dénigrer ni caricaturer d'autres religions (risque légal, réputationnel et éthique).
- Pas de promesses du type « vous serez converti ».

## 11. Architecture technique proposée
- **iOS** : Swift + SwiftUI, SwiftData en local (fonctionne hors-ligne), iOS 17+.
- **Backend** : Supabase (auth, base Postgres, stockage, Row Level Security, `pgvector` pour la recherche FAQ). Edge Functions pour l'IA plus tard.
- **Contenu** : géré dans une base (CMS léger), versionné, avec statut « relu / à relire » et sources.
- **Localisation** : MapKit + CoreLocation.
- **Paiement** : StoreKit 2. **Notifications** : APNs.
- **Analytics** respectueux de la vie privée (ex. TelemetryDeck ou événements anonymes maison).

## 12. Feuille de route
**MVP (8 à 10 semaines)** : onboarding + profil, bases de la foi, première prière, intro Bible, évangile du jour (AELF), carnet, 1 jeu (« Qui est Jésus ? »), « Ma première messe » + recherche de messes, contact paroisse, glossaire cliquable, design lever de soleil.

**V1** : sacrements, chapelet guidé, plans de lecture, vidéos, The Chosen, parcours « Ponts » pour 2 profils pilotes (ex. ancien chrétien, athée), activité hebdo.

**V2** : communauté locale modérée, pèlerinages, FAQ sémantique, courants / scouts / groupes d'étude, autres parcours « Ponts ».

**V3** : IA (abonnement), parcours année 2, partenariats diocésains.

## 13. Recherche utilisateur à mener AVANT de figer le contenu
Je n'ai pas encore mené la recherche sur les forums et les témoignages que vous demandiez. Les choix ci-dessus reposent sur des principes courants d'onboarding, pas sur des données. À faire :
1. Analyser les témoignages de convertis et catéchumènes (récits publics, forums catholiques, Reddit francophone, groupes de catéchumènes) pour identifier : déclencheurs, objections, blocages, faits marquants.
2. 10 à 15 entretiens avec des catéchumènes, des néophytes et des accompagnateurs paroissiaux.
3. Test du prototype avec 5 vrais débutants par parcours.
4. Mesurer : rétention J1/J7/J30, passage à l'action (contact paroisse), satisfaction.

## 14. Risques principaux
| Risque | Parade |
|---|---|
| Erreur doctrinale ou factuelle | Relecteur théologique, sources affichées, niveau de certitude |
| Perçu comme prosélyte agressif | Ton respectueux, « ponts » validés, consentement clair |
| Données sensibles | RGPD strict, minimisation, hébergement UE |
| Modération de la communauté | Lancement local restreint, modérateurs formés, signalement |
| Droits des contenus (Bible, vidéos) | Accords écrits avant publication |
| Périmètre trop vaste | MVP serré, déblocage progressif aussi pour l'équipe |

---

## Questions à trancher pour passer au code
1. Avez-vous un **Mac avec Xcode** ? (Je peux écrire le code SwiftUI ici, mais je ne peux pas le compiler ni le lancer dans un simulateur iOS depuis cet environnement Linux.)
2. Avez-vous un **relecteur théologique ou un diocèse partenaire** ?
3. Quel **nom** et quelle **première cible** ? Ex. lycéens/étudiants en France.
4. Voulez-vous d'abord un **prototype cliquable** (HTML, pour tester le design et le parcours avec de vrais débutants) ou directement le **projet SwiftUI** ?
