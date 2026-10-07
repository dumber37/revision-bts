// DRCV (E41) : développement de la relation client et vente conseil

R.fiche({
  id: 'vente-conseil',
  matiere: 'drcv',
  titre: 'La vente conseil : étapes, SONCASE, CAP',
  resume: 'Les 5 étapes de la vente, les mobiles d’achat SONCASE et l’argumentation CAP.',
  date: '2026-09-03',
  contenu: `
    <h2>SONCASE : les motivations d'achat</h2>
    <div class="cartes">
      <div><b>S</b><p><b>Sécurité</b> : être rassuré, éviter un risque.</p></div>
      <div><b>O</b><p><b>Orgueil</b> : se valoriser, être reconnu.</p></div>
      <div><b>N</b><p><b>Nouveauté</b> : avoir la dernière innovation.</p></div>
      <div><b>C</b><p><b>Confort</b> : se simplifier la vie.</p></div>
      <div><b>A</b><p><b>Argent</b> : faire une bonne affaire.</p></div>
      <div><b>S</b><p><b>Sympathie</b> : une relation agréable, de la confiance.</p></div>
      <div><b>E</b><p><b>Écologie</b> : un achat responsable.</p></div>
    </div>
    <div class="retenir">
      <b>En E42 (ADOC)</b> : SONCASE s'utilise en direct, avec le client.<br>
      <b>En E41 (DRCV)</b> : il sert à analyser la clientèle et à justifier ses choix.
    </div>

    <h2>Le cycle de vente</h2>
    <ol class="etapes">
      <li><b>Prise de contact</b><p>Sourire, salutation, mise en confiance. Les premières secondes donnent le ton de toute la vente.</p></li>
      <li><b>Découverte des besoins</b><p>Questions ouvertes, écoute active, reformulation. On repère aussi les mobiles SONCASE du client.</p></li>
      <li><b>Argumentation</b><p>Présenter le produit à partir des besoins découverts, avec la méthode CAP.</p></li>
      <li><b>Traitement des objections</b><p>Répondre aux freins du client avec la méthode REPO.</p></li>
      <li><b>Conclusion</b><p>Proposer de conclure, faire une vente additionnelle, prendre congé.</p></li>
    </ol>
    <p>Une sixième étape est possible : <b>le suivi et la fidélisation</b>.</p>

    <h2>CAP : construire un argument</h2>
    <ol class="etapes">
      <li><b>Caractéristique</b><p>Ce qu'est le produit, un fait technique. Ex. « Cette veste est en Gore-Tex. »</p></li>
      <li><b>Avantage</b><p>Ce que ça apporte au client. Ex. « Vous resterez au sec même sous une forte pluie. »</p></li>
      <li><b>Preuve</b><p>Ce qui le démontre : test, avis, label, démonstration. Ex. « Regardez, l'eau glisse dessus. »</p></li>
    </ol>
  `
});

R.fiche({
  id: 'repo',
  matiere: 'drcv',
  titre: 'Traiter une objection : REPO',
  resume: 'Reformuler, Énoncer, Prouver, Ouvrir.',
  date: '2026-09-01',
  contenu: `
    <p>Pour répondre à une question ou à une objection du client.</p>
    <ol class="etapes">
      <li><b>Reformuler</b><p>Redire l'objection avec ses mots pour montrer qu'on l'a comprise. Ex. « Si je comprends bien, vous trouvez ce modèle un peu cher ? »</p></li>
      <li><b>Énoncer</b><p>Donner la réponse : l'argument qui lève le frein. Ex. « Il est garanti 5 ans au lieu de 2. »</p></li>
      <li><b>Prouver</b><p>Appuyer ce qu'on avance : chiffre, démonstration, avis client. Ex. « C'est écrit sur la fiche produit. »</p></li>
      <li><b>Ouvrir</b><p>Vérifier que le client est convaincu et relancer la vente. Ex. « Ça vous rassure ? »</p></li>
    </ol>
  `
});

R.fiche({
  id: 'reclamations',
  matiere: 'drcv',
  titre: 'Réclamations et garanties',
  resume: 'Les 7 étapes du traitement, les 4 profils de clients, les garanties commerciales.',
  date: '2026-09-24',
  contenu: `
    <h2>Les types de réclamations</h2>
    <ul>
      <li><b>Produit</b> : produit périmé, défectueux, non conforme.</li>
      <li><b>Prix</b> : écart entre le prix affiché et le prix en caisse.</li>
      <li><b>Service</b> : attente, accueil, livraison, SAV.</li>
    </ul>

    <h2>Traiter une réclamation</h2>
    <ol class="etapes">
      <li><b>Accueillir</b><p>Rester calme et souriant, isoler le client si besoin pour ne pas gêner les autres.</p></li>
      <li><b>Écouter</b><p>Laisser le client tout dire sans l'interrompre.</p></li>
      <li><b>Reformuler</b><p>Redire le problème pour montrer qu'on a compris et vérifier les faits.</p></li>
      <li><b>S'excuser</b><p>S'excuser pour la gêne, sans accuser un collègue ni le client.</p></li>
      <li><b>Proposer une solution</b><p>Échange, remboursement, geste commercial, selon les règles du magasin.</p></li>
      <li><b>Corriger la cause</b><p>Retirer le produit, corriger l'étiquette, prévenir le responsable pour que ça ne recommence pas.</p></li>
      <li><b>Clôturer</b><p>Vérifier que le client est satisfait et le remercier.</p></li>
    </ol>

    <h2>Les 4 profils de clients</h2>
    <div class="cartes">
      <div><b>Affectif</b><p>Émotif, se sent personnellement touché. Il veut être écouté, compris, rassuré.</p></div>
      <div><b>Sincère</b><p>Calme, de bonne foi. Il veut une solution rapide et juste.</p></div>
      <div><b>Procédurier</b><p>Connaît ses droits, cite la loi. Il veut le respect strict des règles et des écrits.</p></div>
      <div><b>Opportuniste</b><p>Exagère pour obtenir le geste commercial maximum. Rester ferme et poli, appliquer les règles du magasin.</p></div>
    </div>

    <h2>Garanties légales et commerciales</h2>
    <table>
      <tr><th></th><th>Garantie légale</th><th>Garantie commerciale</th></tr>
      <tr><td>Obligatoire ?</td><td>Oui, imposée par la loi</td><td>Non, proposée par l'enseigne ou la marque</td></tr>
      <tr><td>Exemples</td><td>Conformité (2 ans), vices cachés</td><td>Satisfait ou remboursé, garantie fraîcheur, extension de garantie</td></tr>
      <tr><td>Rôle</td><td>Protéger le consommateur</td><td>Rassurer, se différencier, fidéliser</td></tr>
    </table>
    <p class="exemple"><b>Exemples Carrefour :</b> garantie fraîcheur, satisfait ou remboursé sur les MDD, Filière Qualité Carrefour.</p>
    <div class="retenir">Les garanties commerciales s'ajoutent aux garanties légales obligatoires, elles ne les remplacent jamais.</div>
  `
});

R.fiche({
  id: 'numerique',
  matiere: 'drcv',
  titre: 'Impact du numérique : les définitions',
  resume: 'Phygital, omnicanal, pure player, marketplace, désintermédiation… (vient du CEJM).',
  date: '2026-09-03',
  contenu: `
    <div class="cartes">
      <div><b>Transformation digitale</b><p>Intégrer le numérique dans toute l'entreprise.</p></div>
      <div><b>Plateformisation</b><p>Activité organisée autour de plateformes numériques.</p></div>
      <div><b>Phygital</b><p>Mélange du magasin physique et des outils digitaux.</p></div>
      <div><b>Pure player</b><p>Entreprise présente uniquement en ligne.</p></div>
      <div><b>Stratégie omnicanale</b><p>Canaux connectés pour un parcours client fluide.</p></div>
      <div><b>Click and collect</b><p>Commande en ligne, retrait en magasin.</p></div>
      <div><b>Marketplace</b><p>Place de marché en ligne qui regroupe des vendeurs.</p></div>
      <div><b>Désintermédiation</b><p>Suppression des intermédiaires.</p></div>
      <div><b>Réintermédiation</b><p>Retour de nouveaux intermédiaires (plateformes).</p></div>
    </div>
    <p class="exemple"><b>Cas CEJM :</b> un magasin indépendant face à Amazon passe au phygital pour rester dans la course.</p>
  `
});

R.fiche({
  id: 'experience-achat',
  matiere: 'drcv',
  titre: 'Les 4 tendances de l’expérience d’achat',
  resume: 'Parcours optimisé, IA, personnalisation, autonomie du client. Exemple Nespresso.',
  date: '2026-09-16',
  contenu: `
    <ol class="etapes">
      <li><b>Optimiser le parcours d'achat</b><p>Moins de friction, plus de fluidité entre le web et le magasin.</p></li>
      <li><b>IA de plus en plus présente et performante</b><p>Recommandations, chatbots, prévision des besoins.</p></li>
      <li><b>Personnalisation</b><p>Offres et conseils adaptés à chaque client.</p></li>
      <li><b>Autonomie du client</b><p>Self-scanning, bornes, click and collect : le client avance seul quand il le veut.</p></li>
    </ol>
    <p class="exemple"><b>Exemple Nespresso :</b> le Club Nespresso est son atout de fidélisation, à analyser avec ces 4 tendances.</p>
  `
});
