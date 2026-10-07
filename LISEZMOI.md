# Révisions BTS MCO

Ouvrir `index.html` (double-clic). Pas besoin d'internet ni de serveur.

- `data/<matiere>.js` : les fiches de chaque matière (drcv, adoc, management, gestion).
- `visuels/<matiere>/` : les images. On les déclare dans le fichier de la matière :

```js
R.visuel({ matiere: 'gestion', src: 'visuels/gestion/elasticite.png', legende: 'Élasticité', fiche: 'fixation-prix' });
```

`fiche` est facultatif : avec, l'image s'affiche aussi en bas de la fiche.
