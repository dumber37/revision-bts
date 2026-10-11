// Études de cas. Format : { id, matiere, titre, resume, exemple (true si écrit pour l'exemple),
//   contexte (HTML), annexes (HTML, facultatif), questions: [{ q, points, corrige (HTML) }] }.
R.cas = [
  {
    id: 'sporttours-nouveau-vendeur',
    matiere: 'management',
    titre: 'Sport’Tours : intégrer et motiver un nouveau vendeur',
    resume: 'Formation, rémunération et motivation d’une recrue en période de rentrée.',
    exemple: true,
    contexte: `
      <p>Sport’Tours est un magasin de sport indépendant du centre de Tours (8 salariés). Léa, la manager, vient de recruter
      <b>Yanis</b>, 20 ans, en CDI, pour renforcer le rayon running avant la rentrée. Yanis est motivé et sportif, mais il n’a
      jamais travaillé en magasin et ne connaît pas l’encaissement.</p>
      <p>Depuis quelques mois, Léa constate aussi une baisse de motivation dans l’équipe : deux retards par semaine en moyenne,
      un vendeur parti chez un concurrent, et un panier moyen en recul de 6 %.</p>`,
    annexes: `
      <h3>Annexe 1 : extrait de la matrice des compétences de Yanis</h3>
      <table><tr><th>Compétence</th><th>Niveau</th></tr>
        <tr><td>Connaissance des produits running</td><td>Maîtrisée</td></tr>
        <tr><td>Accueil et découverte des besoins</td><td>Partiellement maîtrisée</td></tr>
        <tr><td>Encaissement et logiciel de caisse</td><td>Non maîtrisée</td></tr></table>
      <h3>Annexe 2 : conditions de rémunération</h3>
      <p>Taux horaire brut : 12,50 €. Commission : 1,5 % du CA personnel. Cotisations salariales : 22 %. Semaine de rentrée : 40 h travaillées et 6 000 € de CA personnel.</p>`,
    questions: [
      { q: 'À l’aide de l’annexe 1, identifiez et hiérarchisez les besoins de formation de Yanis.', points: 4,
        corrige: `<p>La matrice des compétences permet de hiérarchiser :</p>
          <ul><li><b>Priorité 1 : l’encaissement</b> (non maîtrisé) : formation à prévoir avant qu’il soit seul en caisse.</li>
          <li><b>Priorité 2 : l’accueil et la découverte des besoins</b> (partiellement maîtrisés) : accompagnement ciblé (méthode SONCASE, questions ouvertes).</li>
          <li>La connaissance produits est maîtrisée : pas de formation prioritaire, c’est un point fort à valoriser.</li></ul>` },
      { q: 'Proposez une modalité de formation pour chacun des deux besoins et justifiez.', points: 4,
        corrige: `<ul><li><b>Encaissement : formation interne</b> par un vendeur expérimenté (tuteur), sur le poste : rapide, adaptée au logiciel du magasin, coût modéré.</li>
          <li><b>Accueil et découverte : formation à distance asynchrone</b> (modules vidéo) complétée par des mises en situation avec Léa : Yanis se forme à son rythme, puis applique en magasin.</li>
          <li>Prévoir une <b>évaluation à chaud</b> (fin de formation) et <b>à froid</b> (observation en vente après un mois).</li></ul>` },
      { q: 'Calculez le salaire brut puis le salaire net de Yanis pour sa semaine de rentrée (annexe 2).', points: 6,
        corrige: `<p>35 h normales : 35 × 12,50 = 437,50 €<br>5 h supplémentaires à +25 % : 5 × 12,50 × 1,25 = 78,13 €<br>
          Commission : 6 000 × 1,5 % = 90,00 €<br><b>Salaire brut = 605,63 €</b><br>
          Salaire net = 605,63 × (1 − 0,22) = <b>472,39 €</b></p>
          <p class="attention">Les cotisations salariales sont retenues sur le salaire de Yanis : elles ne sont pas payées en plus par l’entreprise.</p>` },
      { q: 'Proposez deux leviers pour relancer la motivation de l’équipe, en vous appuyant sur une théorie.', points: 6,
        corrige: `<ul><li><b>Un challenge collectif</b> sur le panier moyen pendant la rentrée (tous ceux qui atteignent l’objectif sont récompensés, par exemple une sortie d’équipe) : stimule sans mettre les vendeurs en concurrence.</li>
          <li><b>La reconnaissance et la délégation</b> : confier à chaque vendeur la responsabilité d’un univers (référent running, référent textile…), féliciter en réunion.</li>
          <li><b>Justification (Herzberg)</b> : le salaire est un facteur d’hygiène qui évite la démotivation ; la reconnaissance et les responsabilités sont des facteurs moteurs qui motivent vraiment (estime et accomplissement chez Maslow).</li>
          <li>Suivi par des indicateurs : retards, turn-over, panier moyen.</li></ul>` }
    ]
  }
];
