# Révisions BTS MCO

En ligne : https://dumber37.github.io/revision-bts/ (aussi utilisable en ouvrant `index.html`).

- `data/<matiere>.js` : les fiches de chaque matière (drcv, adoc, management, gestion), via `R.fiche({...})`.
  Composants interactifs disponibles dans le HTML d'une fiche : voir l'en-tête de `composants.js`.
- `data/formules.js` : la page « Formules à retenir ».
- `visuels/<matiere>/` : les pages des PDF en JPG 1600 px, leurs miniatures 400 px dans `mini/`, et les PDF d'origine.
  On les déclare avec `R.diaporama({...})` (voir `data/matieres.js`).
- Chaque fiche a un bouton « Demander à Claude » qui ouvre claude.ai avec la fiche et la question (aucune clé d'API).

À chaque mise en ligne, augmenter le `?v=` des fichiers dans `index.html` (GitHub Pages garde les fichiers 10 min en cache).
