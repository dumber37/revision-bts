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
          <p class="attention">Les cotisations salariales sont retenues sur le salaire de Yanis : elles ne sont pas payées en plus par l’entreprise.</p>
          <div data-calc="paie" data-titre="À toi de jouer : la paie de Yanis" data-valeurs="taux=12,5;h=40;ca=6000;com=1,5;cs=22"></div>` },
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
          <p><b>Les trois modèles désignent QualiDat.</b></p>
          <div data-calc="scoring" data-titre="Le scoring en direct (notes sur 10, règlement corrigé à 10)" data-config='{"sur":10,"crit":[["Labels",5],["Qualité",5],["Livraison",4],["Règlement",3]],"four":[["QualiDat",[10,10,10,10]],["Délices Sucrés",[0,8,3.75,10]],["OrientExpres",[5,7,5,10]]]}'></div>
          <div class="attention"><b>Deux remarques sur ta copie :</b> les trois fournisseurs proposent le même délai de règlement (30 j) : avec ta règle « le meilleur = 10 », ils devraient avoir 10 (30 points chacun), pas 5. Le classement ne change pas (170, 85 et 110 points). Ensuite, le magasin exige une livraison <b>sous 5 jours</b> : si on prend ce seuil dans le modèle conjonctif, OrientExpres (6 jours) est éliminé lui aussi, et seul QualiDat reste.</div>` },
      { q: 'Quel est le rôle des conditions générales de vente (CGV) ?', points: 4,
        corrige: `<ul><li>Informer l’acheteur avant toute transaction (prix, remises, logistique, règlement).</li><li>Servir de socle à la négociation (envoyées avant le 30 novembre).</li>
          <li>Éviter les malentendus : chacun connaît ses engagements.</li><li>Protéger le fournisseur : il n’est pas obligé d’en rédiger, mais s’il en a, il doit les communiquer à tout acheteur professionnel qui les demande.</li>
          <li>Rappeler qu’un prix de revente ne peut pas être imposé (article L. 442-6 du Code de commerce depuis 2019, L. 442-5 avant) : seulement un prix conseillé.</li></ul>` },
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
          <div class="attention"><b>À vérifier dans le sujet :</b> ta copie utilise deux prix d’achat différents (8,43 € dans le tableau, 4,46 € dans les calculs) et un prix de vente de 9,92 € qui est en fait le prix d’achat proposé. Les marges ne sont donc pas cohérentes.</div>
          <p><b>Piste de correction</b> (8,43 € = 9,92 × 0,85, soit le prix d’achat après la remise de 15 % ; à confirmer avec l’énoncé) :</p>
          <table><tr><th></th><th>Avant</th><th>Pendant</th></tr>
            <tr><td>PV HT</td><td>9,47 €</td><td>7,57 €</td></tr>
            <tr><td>Prix d’achat HT</td><td>8,43 €</td><td>8,43 − 0,75 = 7,68 €</td></tr>
            <tr><td>Marge unitaire</td><td>1,04 €</td><td><b>− 0,11 €</b></td></tr>
            <tr><td>Marge globale</td><td>1,04 × 78 = 81,12 €</td><td>− 0,11 × 135 ≈ − 14,85 €</td></tr>
            <tr><td>Taux de marge</td><td>1,04 ÷ 8,43 = 12,3 %</td><td>négatif</td></tr>
            <tr><td>Taux de marque</td><td>1,04 ÷ 9,47 = 11,0 %</td><td>négatif</td></tr></table>
          <p>Avec ce prix d’achat, l’opération ferait vendre <b>sous le prix d’achat</b> : c’est de la revente à perte, interdite. Ce serait un bon point à soulever dans ta copie (ou le signe qu’il faut un autre prix d’achat).</p>
          <p>Change le prix d’achat dans les calculatrices pour tester d’autres hypothèses :</p>
          <div data-calc="marge" data-titre="Avant l’opération (par kg)" data-valeurs="pa=8,43;pv=9,47;tva=5,5"></div>
          <div data-calc="marge" data-titre="Pendant l’opération (par kg)" data-valeurs="pa=7,68;pv=7,57;tva=5,5"></div>` },
      { q: 'Calculez et interprétez l’élasticité-prix pendant l’opération, puis concluez.', points: 6,
        corrige: `<p>Variation des quantités : (135 − 78) ÷ 78 = <b>+ 73,08 %</b><br>Variation du prix TTC : (7,99 − 9,99) ÷ 9,99 = <b>− 20,02 %</b><br>
          Élasticité = 73,08 ÷ (− 20,02) = <b>− 3,65</b>, soit 3,65 en valeur absolue.</p>
          <p>La demande est <b>très élastique</b> : une baisse de prix de 1 % fait augmenter les ventes d’environ 3,65 %. Le CA TTC passe de 779,22 € à 1 078,65 € (+ 38,4 %).</p>
          <div data-calc="elasticite" data-titre="L’élasticité des dattes" data-valeurs="p0=9,99;p1=7,99;d0=78;d1=135"></div>
          <p>Pour le magasin : opération de trafic et de fidélisation qui renforce l’image prix bas, à condition de respecter le seuil de revente à perte et de limiter la durée. Pour le fournisseur : il concède 0,75 €/kg mais vend 73 % de volume en plus et gagne en visibilité.</p>` },
      { q: 'Quels sont les intérêts d’un partenariat durable ? Rédigez une note à Mme Naïa.', points: 6,
        corrige: `<p><b>Intérêts</b> : pour Auchan, moins de ruptures, approvisionnement sûr, meilleures conditions, moins de stocks ; pour le fournisseur, débouchés stables, volumes prévisibles, visibilité, moins de risque de déréférencement. Le partenariat doit rester équilibré.</p>
          <p><b>Note (extrait)</b> : objet « Proposition de partenariat avec QualiDat ». Contenu : opérations promotionnelles communes préparées à l’avance (ramadan, anniversaire), coopération merchandising (18 m linéaires, merchandiser, ILV/PLV), logistique commune (prévisions partagées pour livrer sous 5 jours). Justification : demande très élastique (− 3,65) ; on formalise l’existant ; l’ECR et la GPA sont trop lourds pour une seule famille de produits au début. Vigilance : engagements écrits, seuil de revente à perte, services de coopération réellement rendus.</p>` }
    ]
  },
  {
    id: 'epicerie-halles-stocks',
    matiere: 'gestion',
    titre: 'Épicerie des Halles : approvisionnements et stocks',
    resume: 'Wilson, deux cadenciers, démarque, fiche de stock au CMP, méthode des 20/80, rotation : tout le chapitre en un cas.',
    contexte: `
      <p>L’<b>Épicerie des Halles</b> est une épicerie fine du centre de Tours. Sa clientèle vient pour la qualité des produits. Le magasin est ouvert toute l’année ; par convention, on retient une année de <b>360 jours</b>.</p>
      <p>Son produit phare est le paquet de café « Grand Cru Éthiopie » 250 g. Tu assistes la gérante dans la gestion de ses approvisionnements et de ses stocks.</p>`,
    annexes: `
      <h3>Document 1 : le café « Grand Cru Éthiopie »</h3>
      <ul><li>Ventes : 3 600 paquets par an, à un rythme régulier</li><li>Coût d’achat : 5,00 € HT le paquet, transport inclus</li>
        <li>Prix de vente : 8,00 € HT (TVA 5,5 %)</li><li>Coût de passation d’une commande : 18 €</li>
        <li>Taux de possession : 20 % de la valeur du stock moyen</li><li>Rythme actuel : 12 commandes par an</li></ul>
      <h3>Document 2 : le coffret cadeau « Gourmand »</h3>
      <table><tr><th>Semaine</th><th>S1 (30/11)</th><th>S2 (07/12)</th><th>S3 (14/12)</th><th>S4 (21/12)</th></tr>
        <tr><td>Ventes prévues</td><td>20</td><td>35</td><td>60</td><td>15</td></tr></table>
      <p>Stock au 30 novembre : 10 coffrets. Stock de sécurité : 5. Livraison par lots de 12, une semaine après la commande. Coût d’achat : 22 € HT.<br>
      Inventaire : le logiciel annonce 46 coffrets ; le comptage en rayon et en réserve en trouve 43.</p>
      <h3>Document 3 : mouvements du café en novembre</h3>
      <table><tr><th>Date</th><th>Mouvement</th><th>Quantité</th><th>Coût unitaire HT</th></tr>
        <tr><td>01/11</td><td>Stock initial</td><td>200</td><td>5,00 €</td></tr>
        <tr><td>05/11</td><td>Entrée, bon n° 41</td><td>400</td><td>5,25 €</td></tr>
        <tr><td>12/11</td><td>Sortie, bon n° 87</td><td>300</td><td></td></tr>
        <tr><td>18/11</td><td>Entrée, bon n° 42</td><td>200</td><td>5,50 €</td></tr>
        <tr><td>26/11</td><td>Sortie, bon n° 88</td><td>320</td><td></td></tr></table>
      <p>Le magasin valorise son stock au coût moyen pondéré calculé en fin de période.</p>
      <h3>Document 4 : le rayon thés (10 références, 60 000 € de CA annuel)</h3>
      <table><tr><th>Référence</th><th>CA annuel</th></tr>
        <tr><td>Darjeeling</td><td>3 000 €</td></tr><tr><td>Earl Grey</td><td>27 000 €</td></tr><tr><td>Rooibos</td><td>2 400 €</td></tr>
        <tr><td>Thé blanc</td><td>1 800 €</td></tr><tr><td>Thé vert à la menthe</td><td>21 000 €</td></tr><tr><td>Cinq autres références (ensemble)</td><td>4 800 €</td></tr></table>
      <h3>Document 5 : le stock de café sur deux ans</h3>
      <table><tr><th></th><th>Année N-1</th><th>Année N</th></tr>
        <tr><td>Stock au début de l’année (paquets)</td><td>400</td><td>200</td></tr>
        <tr><td>Stock à la fin de l’année (paquets)</td><td>200</td><td>160</td></tr>
        <tr><td>Quantité vendue (paquets)</td><td>3 300</td><td>3 600</td></tr></table>`,
    questions: [
      { q: 'Document 1. Calculez le nombre optimal de commandes de café et la quantité par commande avec le modèle de Wilson. Comparez le coût obtenu à celui du rythme actuel.', points: 4,
        corrige: `<p>C × PU × T = 3 600 × 5 × 0,20 = 3 600. 2 × P = 2 × 18 = 36. 3 600 ÷ 36 = 100. <b>N = √100 = 10 commandes</b> ; <b>Q = 3 600 ÷ 10 = 360 paquets</b>.</p>
          <p>Coût à l’optimum : possession (360 ÷ 2) × 5 × 0,20 = 180 € ; passation 10 × 18 = 180 € ; <b>total 360 €</b>. Les deux coûts sont égaux.</p>
          <p>Rythme actuel, 12 commandes de 300 : possession 150 × 5 × 0,20 = 150 € ; passation 12 × 18 = 216 € ; total <b>366 €</b>. L’économie n’est que de 6 € par an : une commande par mois, plus simple à organiser, reste défendable.</p>
          <div data-calc="wilson"></div>` },
      { q: 'Document 2. Établissez le cadencier d’approvisionnement du coffret sur les quatre semaines, si l’épicerie choisit ses dates de livraison.', points: 3,
        corrige: `<table><tr><th></th><th>S1</th><th>S2</th><th>S3</th><th>S4</th></tr>
          <tr><td>Ventes prévues</td><td>20</td><td>35</td><td>60</td><td>15</td></tr>
          <tr><td>Besoin (ventes + 5)</td><td>25</td><td>40</td><td>65</td><td>20</td></tr>
          <tr><td>Stock initial</td><td>10</td><td>14</td><td>15</td><td>15</td></tr>
          <tr><td>Quantité livrée (lots de 12)</td><td>24</td><td>36</td><td>60</td><td>12</td></tr>
          <tr><td>Stock final</td><td>14</td><td>15</td><td>15</td><td>12</td></tr>
          <tr><td>Date de commande</td><td>23/11</td><td>30/11</td><td>07/12</td><td>14/12</td></tr></table>
          <p>S1 : il manque 25 − 10 = 15, donc 2 lots (24). Stock final 10 + 24 − 20 = 14. S3 : il manque 50, 50 ÷ 12 = 4,17, donc 5 lots (60).</p>` },
      { q: 'Document 2. Refaites le cadencier si le fournisseur ne livre qu’en S1 et en S3. Comparez les deux situations.', points: 3,
        corrige: `<table><tr><th></th><th>S1</th><th>S2</th><th>S3</th><th>S4</th></tr>
          <tr><td>Ventes prévues</td><td>20</td><td>35</td><td>60</td><td>15</td></tr>
          <tr><td>Besoin</td><td>60</td><td>—</td><td>80</td><td>—</td></tr>
          <tr><td>Stock initial</td><td>10</td><td>50</td><td>15</td><td>27</td></tr>
          <tr><td>Quantité livrée</td><td>60</td><td>0</td><td>72</td><td>0</td></tr>
          <tr><td>Stock final</td><td>50</td><td>15</td><td>27</td><td>12</td></tr>
          <tr><td>Date de commande</td><td>23/11</td><td>—</td><td>07/12</td><td>—</td></tr></table>
          <p>S1 : besoin = 20 + 35 + 5 = 60, manque 50, 5 lots. S3 : 60 + 15 + 5 = 80, manque 65, 65 ÷ 12 = 5,42, donc 6 lots (72).</p>
          <p><b>Comparaison :</b> même total livré (132 coffrets), mais stock final moyen de 26 coffrets contre 14. Le magasin immobilise plus d’argent et de place pour le même chiffre d’affaires : la fréquence de livraison est à négocier avec le fournisseur (levier 6), comme le prix.</p>` },
      { q: 'Document 2. Chiffrez la démarque constatée à l’inventaire, en quantité et en valeur.', points: 2,
        corrige: `<p>46 − 43 = <b>3 coffrets</b> manquants : le stock réel est inférieur au théorique, c’est une <b>démarque</b>. Valeur : 3 × 22 = <b>66 €</b> au coût d’achat. Le logiciel est corrigé à 43. Causes possibles : vol, coffret abîmé jeté sans saisie, erreur de caisse.</p>` },
      { q: 'Document 3. Établissez la fiche de stock du café en novembre. Calculez le coût moyen pondéré, la valeur du stock final et la marge réalisée sur les ventes du mois.', points: 4,
        corrige: `<table><tr><th>Date</th><th>Libellé</th><th>Entrée</th><th>PU</th><th>Valeur</th><th>Sortie</th><th>CMP</th><th>Valeur</th><th>Stock</th></tr>
          <tr><td>01/11</td><td>Stock initial</td><td>200</td><td>5,00</td><td>1 000,00</td><td></td><td></td><td></td><td>200</td></tr>
          <tr><td>05/11</td><td>BE n° 41</td><td>400</td><td>5,25</td><td>2 100,00</td><td></td><td></td><td></td><td>600</td></tr>
          <tr><td>12/11</td><td>BS n° 87</td><td></td><td></td><td></td><td>300</td><td>5,25</td><td>1 575,00</td><td>300</td></tr>
          <tr><td>18/11</td><td>BE n° 42</td><td>200</td><td>5,50</td><td>1 100,00</td><td></td><td></td><td></td><td>500</td></tr>
          <tr><td>26/11</td><td>BS n° 88</td><td></td><td></td><td></td><td>320</td><td>5,25</td><td>1 680,00</td><td>180</td></tr>
          <tr><td>30/11</td><td>Total</td><td>800</td><td>5,25</td><td>4 200,00</td><td>620</td><td>5,25</td><td>3 255,00</td><td>180</td></tr></table>
          <p><b>CMP</b> = 4 200 ÷ 800 = <b>5,25 €</b>. <b>Stock final</b> = 180 × 5,25 = <b>945 €</b>. Contrôle : 3 255 + 945 = 4 200 €.</p>
          <p><b>Marge</b> = 620 × (8,00 − 5,25) = <b>1 705 €</b>. Avec l’ancien coût de 5 €, l’épicerie aurait cru gagner 1 860 € : la hausse du prix d’achat lui coûte 155 € de marge en un mois.</p>` },
      { q: 'Document 4. Appliquez la méthode des 20/80 au rayon thés. Quelles références faut-il suivre en priorité ?', points: 2,
        corrige: `<table><tr><th>Rang</th><th>Référence</th><th>CA</th><th>Part</th><th>Cumul</th></tr>
          <tr><td>1</td><td>Earl Grey</td><td>27 000 €</td><td>45,0 %</td><td>45,0 %</td></tr>
          <tr><td>2</td><td>Thé vert à la menthe</td><td>21 000 €</td><td>35,0 %</td><td>80,0 %</td></tr>
          <tr><td>3</td><td>Darjeeling</td><td>3 000 €</td><td>5,0 %</td><td>85,0 %</td></tr>
          <tr><td>4</td><td>Rooibos</td><td>2 400 €</td><td>4,0 %</td><td>89,0 %</td></tr>
          <tr><td>5</td><td>Thé blanc</td><td>1 800 €</td><td>3,0 %</td><td>92,0 %</td></tr>
          <tr><td>6 à 10</td><td>Cinq autres</td><td>4 800 €</td><td>8,0 %</td><td>100,0 %</td></tr></table>
          <p>2 références sur 10, soit 20 % de l’assortiment, font 80 % du CA : la loi est vérifiée. L’<b>Earl Grey</b> et le <b>thé vert à la menthe</b> sont à suivre en priorité (stock de sécurité calculé, inventaire fréquent, commande surveillée) ; une rupture sur le thé blanc est sans gravité.</p>` },
      { q: 'Document 5. Calculez le stock moyen, la rotation et la durée moyenne de stockage du café pour les deux années. Commentez l’évolution en trois temps : fait, sens, recommandation.', points: 4,
        corrige: `<table><tr><th></th><th>N-1</th><th>N</th></tr>
          <tr><td>Stock moyen</td><td>(400 + 200) ÷ 2 = 300</td><td>(200 + 160) ÷ 2 = 180</td></tr>
          <tr><td>Rotation</td><td>3 300 ÷ 300 = 11</td><td>3 600 ÷ 180 = 20</td></tr>
          <tr><td>Durée de stockage</td><td>(300 ÷ 3 300) × 360 = 32,7 jours</td><td>360 ÷ 20 = 18 jours</td></tr></table>
          <p><b>Fait.</b> Le stock moyen passe de 300 à 180 paquets alors que les ventes progressent de 3 300 à 3 600. Le stock tourne 20 fois par an contre 11 ; un paquet reste 18 jours en stock au lieu de 33.</p>
          <p><b>Sens.</b> L’épicerie vend plus avec moins de stock : 120 paquets × 5,25 € = 630 € de trésorerie libérée, et un café plus frais (levier 7).</p>
          <p><b>Recommandation.</b> Maintenir le rythme de commande et surveiller les ruptures : si elles apparaissent, relever le stock de sécurité (levier 2, fidélité).</p>
          <div data-calc="rotation" data-valeurs="si=400;sf=200;v=3300" data-titre="Calculatrice : indicateurs (change pour N-1 ou N)"></div>` }
    ]
  }
];
