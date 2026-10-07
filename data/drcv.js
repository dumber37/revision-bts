// DRCV (E41) : développement de la relation client et vente conseil

R.fiche({
  id: 'vente-conseil',
  matiere: 'drcv',
  titre: 'La vente conseil : étapes, SONCASE, CAP',
  resume: 'Les 5 étapes de la vente, les mobiles d’achat SONCASE et l’argumentation CAP.',
  date: '2026-09-03',
  contenu: `
    <h2>Les étapes de la vente</h2>
    <ol>
      <li><b>Prise de contact</b> : sourire, salutation, mise en confiance.</li>
      <li><b>Découverte des besoins</b> : questions ouvertes, écoute active, reformulation.</li>
      <li><b>Argumentation</b> : présenter le produit en partant des besoins du client.</li>
      <li><b>Traitement des objections</b> : voir la méthode REPO.</li>
      <li><b>Conclusion</b> : proposer de conclure, vente additionnelle.</li>
    </ol>
    <p>On peut ajouter une 6<sup>e</sup> étape : <b>suivi et fidélisation</b>.</p>

    <h2>SONCASE : les mobiles d'achat</h2>
    <table>
      <tr><th>Lettre</th><th>Mobile</th><th>Le client veut…</th></tr>
      <tr><td>S</td><td>Sécurité</td><td>être rassuré, éviter un risque</td></tr>
      <tr><td>O</td><td>Orgueil</td><td>se valoriser, être reconnu</td></tr>
      <tr><td>N</td><td>Nouveauté</td><td>la dernière innovation</td></tr>
      <tr><td>C</td><td>Confort</td><td>se simplifier la vie</td></tr>
      <tr><td>A</td><td>Argent</td><td>faire une bonne affaire</td></tr>
      <tr><td>S</td><td>Sympathie</td><td>une relation agréable, de la confiance</td></tr>
      <tr><td>E</td><td>Écologie</td><td>un achat responsable</td></tr>
    </table>
    <div class="retenir">
      <b>À l'examen :</b> en E42 (ADOC), SONCASE s'utilise en direct, avec le client.
      En E41 (DRCV), il sert à analyser la clientèle et à justifier ses choix.
    </div>

    <h2>CAP : construire un argument</h2>
    <ul>
      <li><b>C</b>aractéristique : ce qu'est le produit (fait technique).</li>
      <li><b>A</b>vantage : ce que ça apporte au client.</li>
      <li><b>P</b>reuve : ce qui le démontre (test, avis, label, démonstration).</li>
    </ul>
    <p class="exemple"><b>Exemple :</b> « Cette veste est en Gore-Tex (C), vous resterez au sec même sous une forte pluie (A), regardez, l'eau glisse dessus (P). »</p>
  `
});

R.fiche({
  id: 'repo',
  matiere: 'drcv',
  titre: 'Traiter une objection : REPO',
  resume: 'Reformuler, Énoncer, Prouver, Ouvrir.',
  date: '2026-09-01',
  contenu: `
    <h2>La méthode REPO</h2>
    <p>Pour répondre à une question ou à une objection du client.</p>
    <ol>
      <li><b>R</b>eformuler l'objection du client pour montrer qu'on l'a comprise.</li>
      <li><b>É</b>noncer la réponse : l'argument qui lève le frein.</li>
      <li><b>P</b>rouver ce qu'on avance (chiffre, démonstration, avis client).</li>
      <li><b>O</b>uvrir : vérifier que le client est convaincu et relancer la vente.</li>
    </ol>
    <p class="exemple"><b>Exemple :</b> « Si je comprends bien, vous trouvez ce modèle un peu cher ? (R) Il est garanti 5 ans au lieu de 2 (É), c'est écrit sur la fiche produit (P). Ça vous rassure ? (O) »</p>
  `
});

R.fiche({
  id: 'reclamations',
  matiere: 'drcv',
  titre: 'Traiter une réclamation',
  resume: 'Les étapes du traitement et les profils de clients mécontents.',
  date: '2026-09-24',
  contenu: `
    <h2>Les types de réclamations</h2>
    <ul>
      <li><b>Produit</b> : produit périmé, défectueux, non conforme.</li>
      <li><b>Prix</b> : écart entre le prix affiché et le prix en caisse.</li>
      <li><b>Service</b> : attente, accueil, livraison, SAV.</li>
    </ul>

    <h2>Les étapes</h2>
    <ol>
      <li><b>Accueillir</b> le client calmement, l'isoler si besoin.</li>
      <li><b>Écouter</b> sans interrompre.</li>
      <li><b>Reformuler</b> pour montrer qu'on a compris.</li>
      <li><b>S'excuser</b> pour la gêne (sans accuser personne).</li>
      <li><b>Proposer une solution</b> : échange, remboursement, geste commercial.</li>
      <li><b>Corriger</b> la cause (rayon, étiquette, process).</li>
      <li><b>Clôturer</b> : vérifier la satisfaction, remercier.</li>
    </ol>

    <h2>Les profils de clients</h2>
    <table>
      <tr><th>Profil</th><th>Comportement</th><th>Attentes</th></tr>
      <tr><td>Affectif</td><td>Émotif, se sent personnellement touché</td><td>Être écouté, compris, rassuré</td></tr>
      <tr><td>Sincère</td><td>Calme, de bonne foi</td><td>Une solution rapide et juste</td></tr>
      <tr><td>Procédurier</td><td>Connaît ses droits, cite la loi</td><td>Le respect strict des règles, des écrits</td></tr>
      <tr><td>Opportuniste</td><td>Exagère pour obtenir un avantage</td><td>Un geste commercial maximal</td></tr>
    </table>
    <div class="retenir">Face à l'opportuniste : rester ferme et poli, et appliquer les règles du magasin.</div>
  `
});

R.fiche({
  id: 'garanties',
  matiere: 'drcv',
  titre: 'Garanties légales et commerciales',
  resume: 'Ce qui est obligatoire et ce que l’enseigne ajoute pour rassurer et fidéliser.',
  date: '2026-09-24',
  contenu: `
    <h2>Deux types de garanties</h2>
    <table>
      <tr><th></th><th>Garantie légale</th><th>Garantie commerciale</th></tr>
      <tr><td>Obligatoire ?</td><td>Oui, imposée par la loi</td><td>Non, proposée par l'enseigne ou la marque</td></tr>
      <tr><td>Exemples</td><td>Conformité (2 ans), vices cachés</td><td>Satisfait ou remboursé, garantie fraîcheur, extension de garantie</td></tr>
      <tr><td>Rôle</td><td>Protéger le consommateur</td><td>Rassurer, se différencier, fidéliser</td></tr>
    </table>
    <p class="exemple"><b>Exemple Carrefour Express :</b> garantie fraîcheur, satisfait ou remboursé sur les produits de la marque Carrefour, Filière Qualité Carrefour.</p>
    <div class="retenir">Une garantie commerciale s'ajoute à la garantie légale, elle ne la remplace jamais.</div>
  `
});

R.fiche({
  id: 'experience-achat',
  matiere: 'drcv',
  titre: 'Les 4 tendances de l’expérience d’achat',
  resume: 'Parcours optimisé, IA, personnalisation, autonomie du client. Exemple Nespresso.',
  date: '2026-09-16',
  contenu: `
    <ol>
      <li><b>Optimiser le parcours d'achat</b> : moins de friction, plus de fluidité entre web et magasin.</li>
      <li><b>L'IA de plus en plus présente</b> : recommandations, chatbots, prévision.</li>
      <li><b>La personnalisation</b> : offres et conseils adaptés à chaque client.</li>
      <li><b>L'autonomie du client</b> : self-scanning, bornes, click and collect.</li>
    </ol>
    <p class="exemple"><b>Exemple Nespresso :</b> le Club Nespresso (compte client, recommandations, services dédiés, boutiques expérientielles).</p>
  `
});

R.fiche({
  id: 'numerique',
  matiere: 'drcv',
  titre: 'Impact du numérique : les définitions',
  resume: 'Phygital, omnicanal, pure player, marketplace, désintermédiation… (vient du CEJM).',
  date: '2026-09-03',
  contenu: `
    <table>
      <tr><th>Notion</th><th>Définition</th></tr>
      <tr><td>Transformation digitale</td><td>Intégrer le numérique dans toute l'entreprise.</td></tr>
      <tr><td>Plateformisation</td><td>Activité organisée autour de plateformes numériques.</td></tr>
      <tr><td>Phygital</td><td>Mélange du magasin physique et des outils digitaux.</td></tr>
      <tr><td>Pure player</td><td>Entreprise présente uniquement en ligne.</td></tr>
      <tr><td>Stratégie omnicanale</td><td>Canaux connectés pour un parcours client fluide.</td></tr>
      <tr><td>Click and collect</td><td>Commande en ligne, retrait en magasin.</td></tr>
      <tr><td>Marketplace</td><td>Place de marché en ligne qui regroupe des vendeurs.</td></tr>
      <tr><td>Désintermédiation</td><td>Suppression des intermédiaires.</td></tr>
      <tr><td>Réintermédiation</td><td>Retour de nouveaux intermédiaires (plateformes).</td></tr>
    </table>
    <p class="exemple"><b>Cas CEJM :</b> un magasin indépendant face à Amazon passe au phygital pour rester dans la course.</p>
  `
});
