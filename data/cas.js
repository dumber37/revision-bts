// Études de cas. Format : { id, matiere, titre, resume, exemple (true si écrit pour l'exemple), source (document d'origine),
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
  ,

  // ---------- Études de cas tirées des documents de Gary (corrigés = ses réponses, contexte reconstitué) ----------

  {
    id: 'where-is-brian-formation',
    matiere: 'management',
    titre: 'Where is Brian : participer à la formation',
    resume: 'Repérer les besoins en formation de trois vendeurs et proposer des actions adaptées.',
    source: 'Etude_de_cas_Formation_Where_is_Brian.docx',
    contexte: `
      <p>Where is Brian est une enseigne spécialisée. Le magasin de Montpellier compte trois vendeurs : <b>Laurence Ferra</b>, <b>Laurine Clément</b> et <b>Marius Mistral</b>.
      L’enseigne déploie des <b>tablettes numériques</b> en magasin (catalogue, démonstrations vidéo, commandes, présentation du site et de l’application) dans le cadre de sa stratégie omnicanale.</p>
      <p>Les entretiens annuels font ressortir des besoins différents : Laurence manque de connaissances techniques, Laurine n’atteint pas ses objectifs (conclusion, prise d’initiative),
      Marius dépasse les siens et souhaite former ses collègues. Marius a 17 ans d’ancienneté, un salaire brut de 2 200 € et un diplôme d’entraîneur sportif.</p>
      <p>Contraintes : un budget de formation de 2 000 € et l’impossibilité de former les trois vendeurs en même temps.</p>`,
    annexes: `
      <h3>Offre de l’organisme Coorpacademy</h3>
      <p>Formation à distance sur tablette, sessions courtes et ludiques, 1 500 €. Contenus : web-to-store, référencement local. Organisme reconnu (la moitié des entreprises du CAC 40 sont clientes).</p>`,
    questions: [
      { q: 'Repérez les besoins en formation (collectif et individuels) et proposez un outil pour les hiérarchiser.', points: 8,
        corrige: `<p><b>Besoin collectif</b> : les 3 vendeurs doivent apprendre à utiliser les tablettes (catalogue, démonstrations, commandes, présentation du site et de l’application). Il vient d’un facteur externe : l’évolution des modes de consommation et la stratégie omnicanale.</p>
          <table><tr><th>Vendeur</th><th>Besoin</th><th>Priorité</th><th>Modalité proposée</th></tr>
            <tr><td>Laurence Ferra</td><td>Connaissances techniques sur les produits</td><td>Moyenne</td><td>Interne : accompagnement par Laurine ou Marius, ou formation par les marques</td></tr>
            <tr><td>Laurine Clément</td><td>Techniques de vente, conclusion, prise d’initiative</td><td>Forte (objectifs non atteints)</td><td>Interne : formation par Marius</td></tr>
            <tr><td>Marius Mistral</td><td>Animation de l’unité, formation des collègues</td><td>Faible (objectifs dépassés)</td><td>Mission de formateur interne et formation externe au management</td></tr>
            <tr><td>Les 3 vendeurs</td><td>Utilisation des tablettes</td><td>Forte (projet en cours)</td><td>Externe, en présentiel ou à distance, un vendeur à la fois</td></tr></table>
          <p><b>Outil : la matrice des compétences</b>. Elle croise chaque vendeur avec chaque compétence et indique son niveau ; elle montre les manques et permet de hiérarchiser.</p>
          <table><tr><th>Compétence</th><th>Laurence</th><th>Laurine</th><th>Marius</th></tr>
            <tr><td>Accueillir le client</td><td>Maîtrisée</td><td>Maîtrisée</td><td>Maîtrisée</td></tr>
            <tr><td>Conseiller (technique)</td><td>Non maîtrisée</td><td>Maîtrisée</td><td>Maîtrisée</td></tr>
            <tr><td>Conclure la vente</td><td>Maîtrisée</td><td>Non maîtrisée</td><td>Maîtrisée</td></tr>
            <tr><td>Force de proposition</td><td>Maîtrisée</td><td>Partiellement</td><td>Maîtrisée</td></tr>
            <tr><td>Utiliser la tablette</td><td>Non maîtrisée</td><td>Non maîtrisée</td><td>Non maîtrisée</td></tr></table>` },
      { q: 'Montrez les avantages de confier la formation de Laurine à Marius, et chiffrez son coût.', points: 6,
        corrige: `<ul><li><b>Légitime</b> : il dépasse ses objectifs et sait argumenter.</li>
          <li><b>Pédagogue</b> : son diplôme d’entraîneur prouve qu’il sait animer, adapter, individualiser et évaluer.</li>
          <li><b>Il connaît</b> l’entreprise, les produits et la clientèle : la formation colle aux besoins réels.</li>
          <li><b>Motivant</b> pour lui : c’est sa demande. Herzberg : la responsabilité est un facteur moteur. Maslow : estime et accomplissement. Cela le fidélise après 17 ans d’ancienneté.</li>
          <li><b>Coût modéré</b> : salaire chargé 2 200 × 1,5 = 3 300 € par mois, soit 3 300 ÷ 151,67 ≈ <b>21,76 € de l’heure</b>. Pour 12 h (5 h en salle, 7 h en magasin) : ≈ <b>261 €</b>.</li>
          <li><b>Souple</b> : sur place, sans vider le magasin, et renforce la cohésion.</li></ul>` },
      { q: 'Construisez la trame de la formation de Laurine.', points: 6,
        corrige: `<table><tr><th>Séance</th><th>Objectif</th><th>Contenu et méthode</th><th>Durée, lieu</th><th>Évaluation</th></tr>
          <tr><td>1. Découverte</td><td>Identifier les besoins du client</td><td>Plan de découverte, questions ouvertes, écoute active ; cours et jeux de rôle</td><td>2 h, salle</td><td>Mise en situation</td></tr>
          <tr><td>2. Argumentation</td><td>Construire un argumentaire adapté</td><td>CAP et SONCAS ; argumentaires sur les produits du magasin</td><td>2 h, salle</td><td>Argumentaire présenté</td></tr>
          <tr><td>3. Conclusion</td><td>Savoir conclure</td><td>Signaux d’achat, techniques de conclusion, vente additionnelle ; jeux de rôle</td><td>1 h, salle</td><td>Jeu de rôle observé</td></tr>
          <tr><td>4. Mise en œuvre</td><td>Appliquer en situation réelle</td><td>Ventes réelles avec débriefing</td><td>1 journée, magasin</td><td>Grille d’observation</td></tr>
          <tr><td>Suivi</td><td>Mesurer l’efficacité</td><td>À chaud en fin de formation, à froid après 2 ou 3 mois</td><td>—</td><td>CA et taux de transformation de Laurine</td></tr></table>` },
      { q: 'Analysez l’offre de Coorpacademy pour la formation aux tablettes.', points: 5,
        corrige: `<p><b>Points forts</b> : à distance et asynchrone (chacun se forme quand il veut, ce qui respecte la contrainte) ; 1 500 €, dans le budget de 2 000 € ; accessible sur tablette, sessions courtes et ludiques ; organisme reconnu.</p>
          <p><b>Points faibles</b> : contenu trop général (web-to-store, référencement local), qui ne forme pas à l’usage concret des tablettes Where is Brian ; le référencement local ne concerne pas le vendeur ; pas de formateur, donc peu de pratique ; on ne sait pas si le tarif couvre les 3 vendeurs ni la durée.</p>
          <p class="attention">Dans ta copie, la comparaison avec le second organisme et le choix final restent à compléter.</p>` }
    ]
  },

  {
    id: 'rgpd-fichier-client',
    matiere: 'drcv',
    titre: 'Fichier client et RGPD : la situation problème',
    resume: 'Une vendeuse note la santé et l’humeur des clients dans le fichier : analyser et agir.',
    source: 'Situation_probleme_RGPD.docx',
    contexte: `
      <p>Dans un magasin, une vendeuse note dans la fiche informatique des clients des <b>commentaires personnels sur leur état de santé ou leur humeur</b>.</p>
      <p>Ta mission : <b>sensibiliser l’équipe aux règles du RGPD</b> et <b>nettoyer la base de données</b>. Tu suis la démarche de la situation problème (CEJM) : hypothèses, besoin d’information, raisonnements juridique, économique et managérial, plan d’action.</p>`,
    questions: [
      { q: 'Formulez des hypothèses sur les causes du problème et listez les informations à rechercher.', points: 4,
        corrige: `<p><b>Hypothèses</b> : la vendeuse ne connaît pas le RGPD et pense bien faire ; le logiciel a un champ « commentaires » libre sans contrôle ; le magasin n’a ni règle claire ni formation ; d’autres fiches contiennent sûrement le même genre de commentaires.</p>
          <p><b>Besoin d’information</b> : quelles données sont collectées, pourquoi, qui y accède ? Les clients sont-ils informés ? Existe-t-il un registre des traitements ? Combien de fiches sont concernées ? Combien de temps les données sont-elles gardées ?</p>` },
      { q: 'Menez le raisonnement juridique.', points: 6,
        corrige: `<ul><li>La <b>santé est une donnée sensible</b> (article 9 du RGPD) : collecte interdite sauf consentement explicite ou exception légale. Ici, aucune.</li>
          <li>L’<b>humeur</b> est subjective et sans lien avec la vente : non-respect des principes de <b>minimisation</b> et de <b>finalité</b> (article 5).</li>
          <li><b>Droit d’accès</b> : un client peut demander à lire sa fiche ; « client désagréable » poserait problème.</li>
          <li><b>Responsabilité</b> : le magasin, responsable du traitement, répond des erreurs de ses salariés.</li>
          <li><b>Sanctions</b> : la CNIL peut contrôler et sanctionner jusqu’à 20 millions d’euros ou 4 % du chiffre d’affaires.</li></ul>` },
      { q: 'Menez les raisonnements économique et managérial.', points: 5,
        corrige: `<p><b>Économique</b> : une amende et une mauvaise image font perdre des clients ; une courte formation coûte bien moins cher qu’une sanction ; des données propres (achats, préférences) aident à fidéliser.</p>
          <p><b>Managérial</b> : expliquer sans culpabiliser (bonne intention, mauvaise méthode). Herzberg : des règles claires sont un facteur d’hygiène, reconnaître le travail bien fait motive. Maslow : besoin de sécurité, des consignes claires rassurent.</p>` },
      { q: 'Proposez un plan d’action et concluez.', points: 5,
        corrige: `<ul><li><b>Nettoyer</b> : contrôler les fiches, supprimer les commentaires sur la santé et l’humeur ; remplacer le champ libre par des cases à cocher (préférences, historique d’achats).</li>
          <li><b>Sensibiliser</b> : mini-formation de 15 minutes ; affiche « ce que j’ai le droit d’écrire / ce que je n’écris pas » ; règle simple : « je n’écris que ce que je pourrais montrer au client ».</li>
          <li><b>Suivre</b> : contrôle régulier des fiches, un référent RGPD dans le magasin.</li></ul>
          <p><b>Conclusion</b> : les commentaires sur la santé sont interdits, ceux sur l’humeur inutiles et risqués ; il faut nettoyer la base et former l’équipe.</p>` }
    ]
  },

  {
    id: 'desport-relation-client',
    matiere: 'drcv',
    titre: '+DeSport : suivre la relation client',
    resume: 'Analyser les actions d’un magasin de sport indépendant et proposer des outils de fidélisation.',
    source: 'Relation_client_v3.docx (activité 1)',
    contexte: `
      <p><b>+DeSport</b> est un magasin de sport indépendant dirigé par <b>Steeve Leterrier</b>. Il utilise surtout sa page Facebook pour garder le contact avec ses clients :
      un jeu concours (chaque achat donne un bulletin pour gagner 6 mois d’abonnement à la salle Elancia, partenaire du magasin), une <b>analyse de foulée gratuite</b> sur tapis (habituellement 20 €),
      et des publications sur deux athlètes du magasin qui courent les 30 km du Tue Vaques à Fermanville.</p>
      <p>Des enseignes comme Decathlon ou Rapha transforment leurs magasins en lieux de rencontre, pas seulement d’achat.</p>`,
    questions: [
      { q: 'Analysez comment +DeSport garde le contact avec ses clients.', points: 6,
        corrige: `<ul><li><b>Le jeu concours</b> donne envie d’acheter et crée un lien avec un autre commerce du coin (salle Elancia).</li>
          <li><b>L’analyse de foulée gratuite</b> apporte un vrai conseil personnalisé, quel que soit le niveau, et fait venir le client en magasin.</li>
          <li><b>Les athlètes du magasin</b> montrent que l’équipe partage la passion des clients et créent une petite communauté.</li>
          <li>Ton simple et sympa (emojis, « sportivement »), avec toujours l’adresse et le numéro du magasin.</li></ul>` },
      { q: 'Quels autres outils de suivi de la relation client conseilleriez-vous à Steeve Leterrier ?', points: 6,
        corrige: `<ul><li>Une <b>carte de fidélité</b> ou une appli, pour cumuler des points et connaître les achats.</li>
          <li>Un <b>fichier clients</b> (coordonnées, achats) pour des offres ciblées.</li>
          <li>Une <b>newsletter ou des SMS</b> (nouveautés, événements, promos, cadeau d’anniversaire).</li>
          <li>Un <b>questionnaire de satisfaction</b> avec QR code sur le ticket.</li>
          <li>Une <b>réponse à tous les avis Google</b>.</li>
          <li>Un <b>appel ou SMS</b> quelques jours après un achat important.</li>
          <li>Un <b>compte Instagram</b> pour toucher les plus jeunes.</li></ul>` },
      { q: 'Proposez des idées pour créer une vraie expérience en boutique.', points: 8,
        corrige: `<ul><li>Des <b>cours collectifs</b> le soir (running, renforcement, étirements) animés par les vendeurs.</li>
          <li>Un <b>club de running</b> qui part du magasin chaque semaine, café à l’arrivée.</li>
          <li>Un <b>coin convivial</b> avec chaises et machine à café.</li>
          <li>Des <b>essais en vrai</b> : chaussures sur le tapis avec l’analyse de foulée, prêt de matériel.</li>
          <li>Des <b>soirées</b> avec les athlètes, un kiné ou un diététicien.</li>
          <li>Un <b>défi du mois</b> (kilomètres courus) avec classement en magasin et lot à gagner.</li></ul>
          <p>Les clients ont ainsi une raison de revenir, même sans rien acheter.</p>` }
    ]
  },

  {
    id: 'carrefour-reclamation-jeu-de-role',
    matiere: 'drcv',
    titre: 'Carrefour Express : gérer une réclamation en face à face',
    resume: 'Jeu de rôle : un client en colère conteste un prix en caisse devant la file d’attente.',
    source: 'Jeu de rôle gérer une réclamation client en face à face.docx',
    contexte: `
      <p>Dans un <b>Carrefour Express</b>, M. Martin achète un paquet de café <b>affiché 3,99 € en rayon</b>. En caisse, il est facturé <b>4,99 €</b>.
      Il y a la queue derrière lui, il est pressé et pense qu’on essaie de l’arnaquer. Il hausse le ton devant les autres clients.</p>
      <p>Rôles : le client (M. Martin, en colère), le vendeur en caisse, le responsable du magasin (qui intervient à la fin), un client dans la file qui soupire et met la pression.</p>`,
    questions: [
      { q: 'Quel profil de client est M. Martin, et comment le vendeur doit-il réagir ?', points: 4,
        corrige: `<p>C’est un <b>client en colère</b>, proche du profil <b>affectif</b> : il parle fort, il est vexé et réagit trop fort par rapport au problème. Le vendeur doit rester calme et souriant, l’isoler de la file, l’écouter sans couper, reformuler, puis résoudre vite.</p>` },
      { q: 'Rédigez le script de la scène en respectant les étapes du traitement d’une réclamation.', points: 10,
        corrige: `<p><b>Client</b> (fort) : Non mais c’est une blague ? C’est affiché 3,99 € et vous me facturez 4,99 € !<br>
          <b>Vendeur</b> (calme, sourire) : Bonjour monsieur, je comprends que ce soit agaçant. Venez par ici, on va regarder ça tranquillement. <i>(il l’isole à côté de la caisse)</i><br>
          <b>Client</b> : Je n’ai pas que ça à faire !<br>
          <b>Client dans la file</b> (soupire) : Il y en a encore pour longtemps ?<br>
          <b>Vendeur</b> : Encore un instant, madame, je m’occupe de monsieur et je suis à vous. […] Si je résume : le prix en rayon était de 3,99 € et la caisse affiche 4,99 €. C’est bien ça ? <i>(reformulation)</i><br>
          <b>Vendeur</b> <i>(vérifie l’étiquette)</i> : Vous avez raison, l’étiquette n’a pas été mise à jour. C’est une erreur de notre part et je m’en excuse. Je corrige le prix à 3,99 € tout de suite.<br>
          <b>Responsable</b> : Merci de nous avoir prévenus. Pour nous excuser, nous vous offrons ce café. Cela vous convient ? <i>(geste commercial)</i><br>
          <b>Vendeur</b> : Merci pour votre patience. Je fais modifier l’étiquette tout de suite. Bonne journée ! <i>(correction de la cause et clôture)</i></p>` },
      { q: 'Proposez une grille d’observation pour évaluer la scène.', points: 6,
        corrige: `<ul><li>Le client est isolé des autres clients.</li><li>Le vendeur reste calme et sourit.</li><li>Le vendeur écoute sans couper la parole.</li>
          <li>Le problème est reformulé pour montrer qu’il est compris.</li><li>La cause est identifiée.</li><li>Le problème est résolu (prix corrigé).</li><li>Un geste commercial est proposé.</li></ul>` }
    ]
  },

  {
    id: 'auchan-fournisseurs-dattes',
    matiere: 'gestion',
    titre: 'Auchan Sarcelles : sélectionner et contractualiser avec un fournisseur',
    resume: 'Référencer des dattes : enjeux, scoring à 3 modèles, coopération commerciale, marges, élasticité, partenariat.',
    source: 'Chapitre_12_Fournisseurs_Questions_Reponses.docx',
    contexte: `
      <p>Stagiaire au rayon fruits secs d’<b>Auchan Sarcelles</b>, tu aides <b>Mme Naïa</b>, cheffe de rayon, à référencer des <b>dattes</b>.
      L’étude de la clientèle montre une demande ; pendant le ramadan, les ménages concernés dépensent en moyenne 394 € contre 280 € le reste de l’année. La zone de chalandise compte environ un million d’habitants, et les concurrents locaux vendent leurs dattes cher.</p>
      <p>Trois fournisseurs sont en concurrence : <b>QualiDat</b>, <b>Délices Sucrés</b> et <b>OrientExpres</b>. Le magasin veut une livraison sous 5 jours et un règlement à 30 jours fin de mois.</p>`,
    annexes: `
      <h3>Proposition commerciale reçue</h3>
      <p>Prix d’achat 9,92 € HT/kg ; remise de 15 % sur une première commande de 150 kg ; ristourne de fin d’année selon les volumes ; 8 % de coopération commerciale pour les mises en avant ; 18 mètres linéaires, tête de gondole, ILV/PLV, deux animations par an et un merchandiser.</p>
      <h3>Critères de sélection (poids)</h3>
      <table><tr><th>Critère</th><th>Poids</th><th>QualiDat</th><th>Délices Sucrés</th><th>OrientExpres</th></tr>
        <tr><td>Produits labellisés</td><td>5</td><td>2 labels</td><td>aucun</td><td>1 label</td></tr>
        <tr><td>Qualité (note /10)</td><td>5</td><td>10</td><td>8</td><td>7</td></tr>
        <tr><td>Délai de livraison</td><td>4</td><td>3 jours</td><td>8 jours</td><td>6 jours</td></tr>
        <tr><td>Délai de règlement</td><td>3</td><td>30 j</td><td>30 j</td><td>30 j</td></tr></table>
      <h3>Opération anniversaire du magasin (une semaine)</h3>
      <p>Prix de vente : 9,99 € TTC/kg avant, 7,99 € pendant (TVA 5,5 %). Ventes : 78 kg la semaine précédente, 135 kg pendant l’opération. Le fournisseur concède 0,75 €/kg.</p>`,
    questions: [
      { q: 'Quels sont les enjeux du référencement de ce nouveau fournisseur pour le magasin ?', points: 4,
        corrige: `<ul><li><b>Commerciaux</b> : répondre à une demande réelle (forte dépense pendant le ramadan).</li>
          <li><b>Image</b> : élargir l’assortiment, se différencier des concurrents locaux qui vendent cher, garder l’image « prix bas » et fidéliser.</li>
          <li><b>Conditions d’achat</b> : un nouveau fournisseur ouvre une négociation (prix, remises, ristourne, coopération), donc sur la marge.</li>
          <li><b>Disponibilité</b> : un fournisseur fiable et rapide limite les ruptures pendant les périodes fortes.</li></ul>` },
      { q: 'Présentez les éléments de l’accord et les sources de divergences avec le fournisseur.', points: 5,
        corrige: `<p><b>Éléments de l’accord</b> : le produit (dattes labellisées, qualité à vérifier au showroom, 150 kg) ; le prix (9,92 € HT/kg, remise de 15 %, ristourne) ; les conditions (livraison sous 5 jours, règlement à 30 jours fin de mois) ; la coopération commerciale (18 m linéaires, tête de gondole, 8 %, ILV/PLV, deux animations, merchandiser).</p>
          <p><b>Divergences</b> : le prix (le fournisseur veut vendre cher, Auchan garder son image prix bas) ; les marges arrière (remise, coopération, ristourne = coût pour le fournisseur) ; qui finance emplacements et animations ; les délais (contrainte logistique et de trésorerie) ; le calendrier légal (CGV avant le 30 novembre, accord avant fin février, lois LME, Sapin 2, EGalim).</p>` },
      { q: 'Sélectionnez le fournisseur avec trois modèles : pondération, critère déterminant, modèle conjonctif.', points: 8,
        corrige: `<p><b>Notes sur 10</b> : livraison proportionnelle au plus rapide (3 ÷ 8 × 10 = 3,75 ; 3 ÷ 6 × 10 = 5) ; labels : 2 labels = 10, 1 label = 5, aucun = 0.</p>
          <table><tr><th>Critère (note × poids)</th><th>QualiDat</th><th>Délices Sucrés</th><th>OrientExpres</th></tr>
            <tr><td>Labels (×5)</td><td>50</td><td>0</td><td>25</td></tr>
            <tr><td>Qualité (×5)</td><td>50</td><td>40</td><td>35</td></tr>
            <tr><td>Livraison (×4)</td><td>40</td><td>15</td><td>20</td></tr>
            <tr><td>Règlement (×3)</td><td>15</td><td>15</td><td>15</td></tr>
            <tr><td><b>Total /170</b></td><td><b>155</b></td><td>70</td><td>95</td></tr>
            <tr><td>Note /10</td><td>9,12</td><td>4,12</td><td>5,59</td></tr></table>
          <p><b>Critère déterminant</b> : labels puis qualité (poids 5) : QualiDat est devant sur les deux.</p>
          <p><b>Conjonctif</b> (seuil fixé à 5/10) : QualiDat et OrientExpres passent, Délices Sucrés est éliminé (aucun label, livraison trop lente).</p>
          <p><b>Les trois modèles désignent QualiDat.</b></p>` },
      { q: 'Quel est le rôle des conditions générales de vente (CGV) ?', points: 4,
        corrige: `<ul><li>Informer l’acheteur avant toute transaction (prix, remises, logistique, règlement).</li><li>Servir de socle à la négociation (envoyées avant le 30 novembre).</li>
          <li>Éviter les malentendus : chacun connaît ses engagements.</li><li>Protéger le fournisseur : non obligatoires en B to B mais fortement recommandées (sinon présomption de discrimination).</li>
          <li>Rappeler qu’un prix de revente ne peut pas être imposé (article L. 442-5 du Code de commerce) : seulement un prix conseillé.</li></ul>` },
      { q: 'Calculez le coût réel de la première commande après remise et coopération commerciale, et expliquez cette pratique.', points: 6,
        corrige: `<table><tr><th>Calcul</th><th>Résultat</th></tr>
            <tr><td>150 kg × 9,92 €</td><td>1 488,00 € HT</td></tr>
            <tr><td>Remise de 15 % : 1 488 × 0,15</td><td>− 223,20 €</td></tr>
            <tr><td>Montant net facturé</td><td>1 264,80 € HT</td></tr>
            <tr><td>Coopération de 8 % : 1 264,80 × 0,08</td><td>101,18 €</td></tr>
            <tr><td>Coût réel : 1 264,80 − 101,18</td><td><b>1 163,62 € HT (7,76 €/kg)</b></td></tr></table>
          <p><b>Pour le distributeur</b> : le fournisseur paie un vrai service (mise en avant, tête de gondole, ILV/PLV) ; le prix de revient réel baisse sans toucher au prix facturé (marge arrière). <b>Pour le producteur</b> : il achète de la visibilité et évite de baisser son prix catalogue. La coopération doit correspondre à des services réellement rendus (sinon pratique abusive).</p>` },
      { q: 'Calculez les marges avant et pendant l’opération anniversaire.', points: 6,
        corrige: `<p><b>Formules</b> : marge unitaire = PV HT − prix d’achat HT ; marge globale = marge unitaire × quantités ; taux de marge = marge ÷ prix d’achat HT ; taux de marque = marge ÷ PV HT.</p>
          <p>Prix de vente HT (TVA 5,5 %) : 9,99 ÷ 1,055 = <b>9,47 €</b> avant ; 7,99 ÷ 1,055 = <b>7,57 €</b> pendant.</p>
          <div class="attention"><b>À vérifier dans le sujet :</b> ta copie utilise deux prix d’achat différents (8,43 € dans le tableau, 4,46 € dans les calculs) et un prix de vente de 9,92 € qui est en fait le prix d’achat proposé. Les marges ne sont donc pas cohérentes. Reprends le prix d’achat net donné dans l’énoncé, puis applique les formules ci-dessus.</div>` },
      { q: 'Calculez et interprétez l’élasticité-prix pendant l’opération, puis concluez.', points: 6,
        corrige: `<p>Variation des quantités : (135 − 78) ÷ 78 = <b>+ 73,08 %</b><br>Variation du prix TTC : (7,99 − 9,99) ÷ 9,99 = <b>− 20,02 %</b><br>
          Élasticité = 73,08 ÷ (− 20,02) = <b>− 3,65</b>, soit 3,65 en valeur absolue.</p>
          <p>La demande est <b>très élastique</b> : une baisse de prix de 1 % fait augmenter les ventes d’environ 3,65 %. Le CA TTC passe de 779,22 € à 1 078,65 € (+ 38,4 %).</p>
          <p>Pour le magasin : opération de trafic et de fidélisation qui renforce l’image prix bas, à condition de respecter le seuil de revente à perte et de limiter la durée. Pour le fournisseur : il concède 0,75 €/kg mais vend presque deux fois plus et gagne en visibilité.</p>` },
      { q: 'Quels sont les intérêts d’un partenariat durable ? Rédigez une note à Mme Naïa.', points: 6,
        corrige: `<p><b>Intérêts</b> : pour Auchan, moins de ruptures, approvisionnement sûr, meilleures conditions, moins de stocks ; pour le fournisseur, débouchés stables, volumes prévisibles, visibilité, moins de risque de déréférencement. Le partenariat doit rester équilibré.</p>
          <p><b>Note (extrait)</b> : objet « Proposition de partenariat avec QualiDat ». Contenu : opérations promotionnelles communes préparées à l’avance (ramadan, anniversaire), coopération merchandising (18 m linéaires, merchandiser, ILV/PLV), logistique commune (prévisions partagées pour livrer sous 5 jours). Justification : demande très élastique (− 3,65) ; on formalise l’existant ; l’ECR et la GPA sont trop lourds pour une seule famille de produits au début. Vigilance : engagements écrits, seuil de revente à perte, services de coopération réellement rendus.</p>` }
    ]
  }
];
