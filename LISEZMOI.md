# Révisions BTS MCO

En ligne : https://dumber37.github.io/revision-bts/ (installable sur téléphone, utilisable hors-ligne).

## Contenus (`data/`)
- `<matiere>.js` : les fiches (drcv, adoc, management, gestion), via `R.fiche({...})`, et leurs diaporamas via `R.diaporama({...})`.
  Composants interactifs utilisables dans le HTML d'une fiche : voir l'en-tête de `composants.js`.
  Une liste `<ol class="etapes">` devient une frise et alimente « Remettre dans l'ordre » (sauf avec `data-libre`).
  Les blocs `<div class="cartes">` alimentent les cartes mémo et le memory.
- `qcm.js` : banques de QCM par fiche (bonne réponse en premier).
- `entrainement.js` : l'essentiel en 1 minute, les textes à trous et la chasse à l'erreur, par fiche.
- `formules.js` : la page « Formules à retenir » (fil rouge Sport'Tours).
- `entrainement.js` contient aussi le lexique (`R.lexique`) ; `cas.js` : les études de cas ; `audio.js` : durées des fiches audio.

## Audio
`audio/<id-fiche>.mp3` (voix Piper « Siwis », par défaut) et `audio/tom/<id-fiche>.mp3` (voix « Tom ») : chaque fiche lue par une voix neuronale (générée hors-ligne, MP3 48 kbit/s).
Si le texte d'une fiche change, il faut régénérer ses deux MP3 et mettre à jour ses durées dans `data/audio.js` (`R.audio` et `R.audioVoix.tom`).
La durée sert aussi de numéro de version dans l'adresse du MP3 (`?d=`) : l'ancienne copie téléchargée pour l'écoute hors-ligne (cache `rbts-audio`) n'est alors plus utilisée.

## Code
- `jeu.js` : progression (XP, grades, flamme, étoiles, badges, missions du jour, révision des erreurs, Défi éclair).
- `activites.js` : séries de questions, onglet S'entraîner (cartes mémo, ordre, trous, examen blanc), l'essentiel en 1 minute.
- `jeux.js` : magasin qui s'agrandit, boss, duel, chasse à l'erreur, memory.
- `outils.js` : mes points faibles, calculs à l'infini, transfert de progression, simulateur d'oral.
- `carnet.js` : planning d'examen, lexique, notes, favoris, taille du texte.
- `bonus.js` : écoute des fiches, méthodologie, études de cas, défi de la semaine.
- `ambiance.js` : sons (désactivables) et animations.
- `composants.js`, `app.js` : composants des fiches, pages et navigation.
- `sw.js` + `manifest.webmanifest` + `icones/` : application installable et hors-ligne.

## Visuels
`visuels/<matiere>/` : pages des PDF en JPG 1600 px, miniatures 400 px dans `mini/`, et PDF d'origine.

## Mise en ligne
À chaque mise en ligne, augmenter le `?v=` de `index.html` **et** `VERSION` dans `sw.js` (même numéro).
La progression des joueurs est gardée dans leur navigateur (localStorage).
