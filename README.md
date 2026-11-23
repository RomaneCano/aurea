# Auréa

Application d'initiation à la foi catholique pour les vrais débutants : parcours guidé et progressif, glossaire cliquable partout, prière dès le premier jour, accompagnement humain par les paroisses.

## Contenu du prototype web (`web/`)
- **Bible catholique complète (73 livres) avec introductions, explications de chapitres, aide à la lecture et explication à la demande par l'expert**, texte néo-Crampon Libre (CC BY-SA 4.0, voir `web/bible/LICENCE-TEXTE.md`).
- Parcours guidé : frise et carte, bases de la foi, première prière, Bible mode d'emploi, jeu, messe, sacrements, chapelet.
- Carte « Sur les pas de Jésus » et frise de l'histoire, tracées pas à pas.
- Galerie de 41 figures de la foi (portraits dessinés), avec favoris, saint patron, calendrier des fêtes et 37 aventures animées en scènes.
- Journal personnel (calendrier, humeurs, étiquettes, idées d'écriture, favoris).
- Gamification sobre : lumières, niveaux, médailles, avatar à personnaliser et à débloquer.
- Questions fréquentes et **expert Claude** (clé API personnelle de l'utilisateur, stockée uniquement dans son navigateur).
- Ressources et liens (Bible, chapelet, livres). Pour activer les liens affiliés Amazon, renseigner `AMAZON_TAG` dans `web/content2.js`.

Ouvrir `web/index.html` dans un navigateur, ou voir le site publié avec GitHub Pages.

## Documents
- `docs/blueprint.md` : vision, parcours, modules, architecture, légal.
- `docs/recherche-temoignages.md` : synthèse de recherche (sources à vérifier).

## Points d'attention
- La clé API Anthropic saisie par l'utilisateur est utilisée directement depuis le navigateur. Pour une offre payante avec IA, prévoir un serveur intermédiaire afin de ne jamais exposer une clé.
- Les contenus doctrinaux sont des brouillons à faire relire par un théologien.
