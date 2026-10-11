// Contenus d'entraînement par fiche (clé = id de la fiche).
// R.essentiel : les 3 choses à retenir (encadré en haut de la fiche et page « L'essentiel en 1 minute »).
// R.trous : [phrase avec ___, bonne réponse, [3 mauvaises réponses]].
// Les cartes mémo et les listes à remettre dans l'ordre sont tirées directement du contenu des fiches.

R.essentiel = {
  'vente-conseil': [
    'Cycle de vente : prise de contact, découverte des besoins, argumentation, objections, conclusion (+ suivi).',
    'SONCASE = Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie, Écologie : les mobiles d’achat.',
    'CAP pour argumenter : Caractéristique → Avantage pour le client → Preuve.'
  ],
  'repo': [
    'REPO répond à une objection : Reformuler, Énoncer, Prouver, Ouvrir.',
    'On commence toujours par reformuler, pour montrer qu’on a compris.',
    'On finit en vérifiant que le client est convaincu, puis on relance la vente.'
  ],
  'reclamations': [
    '7 étapes : accueillir, écouter, reformuler, s’excuser, proposer une solution, corriger la cause, clôturer.',
    '4 profils : affectif, sincère, procédurier, opportuniste (rester ferme et poli).',
    'La garantie commerciale s’ajoute à la garantie légale (conformité 2 ans), jamais à la place.'
  ],
  'numerique': [
    'Pure player = uniquement en ligne ; phygital = magasin physique + outils digitaux.',
    'Omnicanal = canaux connectés pour un parcours fluide (ex. click and collect).',
    'Désintermédiation = moins d’intermédiaires ; réintermédiation = arrivée des plateformes.'
  ],
  'experience-achat': [
    '4 tendances : parcours optimisé, IA, personnalisation, autonomie du client.',
    'Autonomie : self-scanning, bornes, click and collect.',
    'Exemple à connaître : le Club Nespresso pour fidéliser.'
  ],
  'formation': [
    'Former ses salariés est une obligation de l’employeur (art. L6321-1).',
    '4 étapes : besoins (matrice des compétences), modalités, plan annuel, évaluation.',
    'On évalue à chaud (fin de formation) puis à froid (efficacité réelle au poste).'
  ],
  'evaluer-motivation': [
    'Motivation = force qui pousse à agir, donc à s’impliquer dans son travail.',
    'Indicateurs de performance (tableau de bord) et sociaux (absentéisme, retards, turn-over…).',
    'Aussi : enquêtes de satisfaction, labels (Great Place to Work) et entretien annuel.'
  ],
  'facteurs-motivation': [
    'Intrinsèques (contenu, reconnaissance) motivent ; extrinsèques (salaire, ambiance) évitent la démotivation.',
    'Herzberg : facteurs d’hygiène = extrinsèques, facteurs moteurs = intrinsèques.',
    'Maslow, de bas en haut : physiologiques, sécurité, appartenance, estime, accomplissement.'
  ],
  'stimuler-animer': [
    'Stimuler : fixe, variable individuelle (commissions), variable collective (intéressement).',
    'Challenge : tous ceux qui atteignent l’objectif gagnent. Concours : seuls les meilleurs.',
    'Animer : esprit du manager, bien-être, communication, réunions, événements, délégation.'
  ],
  'remuneration': [
    'Brut − cotisations salariales = net ; brut + cotisations patronales = coût employeur.',
    '35 h/semaine = 151,67 h/mois ; heures sup +25 % (36e à 43e), +50 % dès la 44e.',
    'Un bon système est motivant, sécurisant, équitable, adapté, stimulant et simple.'
  ],
  'fixation-prix': [
    'Prix public = coût d’achat + transport + démarque + marge + taxes.',
    'Élasticité E = % var. demande ÷ % var. prix ; E > 1 = très élastique.',
    'Taux de marge : on divise par le coût d’achat. Taux de marque : par le prix de vente.'
  ],
  'fournisseurs': [
    'Sélection en 8 étapes, des critères jusqu’au début de la relation.',
    'Scoring : note pondérée = Σ (note × coefficient), la plus haute gagne.',
    'Interdits : revente à perte, prix imposés, refus de vente à un particulier.'
  ]
};

R.trous = {
  'vente-conseil': [
    ['Dans SONCASE, le « C » signifie ___.', 'Confort', ['Conseil', 'Crédit', 'Commerce']],
    ['La méthode ___ sert à construire un argument.', 'CAP', ['REPO', 'SONCASE', 'SMART']],
    ['La 2e étape du cycle de vente est la ___.', 'découverte des besoins', ['prise de contact', 'conclusion', 'argumentation']],
    ['Dans CAP, le « P » signifie ___.', 'Preuve', ['Prix', 'Produit', 'Promesse']]
  ],
  'repo': [
    ['Face à une objection, on commence par ___ ce que dit le client.', 'reformuler', ['contredire', 'ignorer', 'chiffrer']],
    ['L’étape « ___ » vérifie que le client est convaincu.', 'Ouvrir', ['Prouver', 'Énoncer', 'Reformuler']],
    ['Un avis client ou une démonstration servent à ___.', 'prouver', ['reformuler', 'ouvrir', 'conclure']],
    ['REPO sert à répondre à une question ou à une ___.', 'objection', ['commande', 'facture', 'livraison']]
  ],
  'reclamations': [
    ['Un client qui cite la loi et exige des écrits est ___.', 'procédurier', ['affectif', 'sincère', 'opportuniste']],
    ['La garantie légale de conformité dure ___.', '2 ans', ['6 mois', '1 an', '5 ans']],
    ['La première étape d’une réclamation est d’___ le client.', 'accueillir', ['rembourser', 'ignorer', 'facturer']],
    ['Après avoir proposé une solution, on ___ la cause du problème.', 'corrige', ['cache', 'ignore', 'facture']]
  ],
  'numerique': [
    ['Une entreprise présente uniquement en ligne est un ___.', 'pure player', ['magasin phygital', 'grossiste', 'franchisé']],
    ['Commander en ligne et retirer en magasin, c’est le ___.', 'click and collect', ['dropshipping', 'e-mailing', 'self-scanning']],
    ['La suppression des intermédiaires s’appelle la ___.', 'désintermédiation', ['réintermédiation', 'plateformisation', 'digitalisation']],
    ['Des canaux connectés pour un parcours fluide : c’est une stratégie ___.', 'omnicanale', ['monocanale', 'verticale', 'low cost']]
  ],
  'experience-achat': [
    ['Le self-scanning illustre l’___ du client.', 'autonomie', ['fidélisation', 'insatisfaction', 'segmentation']],
    ['Des offres adaptées à chaque client : c’est la ___.', 'personnalisation', ['standardisation', 'massification', 'désintermédiation']],
    ['Nespresso fidélise ses clients grâce au ___.', 'Club Nespresso', ['prix cassés', 'catalogue papier', 'magasin d’usine']],
    ['Les chatbots illustrent la place croissante de l’___.', 'IA', ['autonomie', 'omnicanal', 'écologie']]
  ],
  'formation': [
    ['Former les salariés est une obligation de l’___.', 'employeur', ['salarié', 'État', 'client']],
    ['L’évaluation à ___ mesure l’efficacité réelle au poste.', 'froid', ['chaud', 'mi-parcours', 'l’embauche']],
    ['Une formation ___ permet de se former quand on le souhaite.', 'asynchrone', ['synchrone', 'interne', 'présentielle']],
    ['La matrice des ___ sert à hiérarchiser les besoins de formation.', 'compétences', ['salaires', 'ventes', 'horaires']]
  ],
  'evaluer-motivation': [
    ['L’absentéisme est un indicateur ___.', 'social', ['de performance', 'financier', 'commercial']],
    ['L’entretien individuel d’évaluation a lieu une fois par ___.', 'an', ['mois', 'semaine', 'trimestre']],
    ['Great Place to Work est un ___ de bien-être au travail.', 'label', ['contrat', 'logiciel', 'syndicat']],
    ['Mesurer la motivation aide à limiter le ___.', 'turn-over', ['chiffre d’affaires', 'panier moyen', 'stock']]
  ],
  'facteurs-motivation': [
    ['Pour Herzberg, le salaire est un facteur d’___.', 'hygiène', ['motivation', 'accomplissement', 'estime']],
    ['Le sommet de la pyramide de Maslow est l’___.', 'accomplissement', ['estime', 'appartenance', 'argent']],
    ['La reconnaissance est un facteur ___.', 'intrinsèque', ['extrinsèque', 'financier', 'collectif']],
    ['La bonne ambiance entre collègues répond au besoin d’___.', 'appartenance', ['accomplissement', 'estime', 'sécurité']]
  ],
  'stimuler-animer': [
    ['Dans un ___, tous ceux qui atteignent l’objectif gagnent.', 'challenge', ['concours', 'tirage au sort', 'séminaire']],
    ['L’intéressement est une rémunération variable ___.', 'collective', ['individuelle', 'fixe', 'en nature']],
    ['La communication ___ va des vendeurs vers le manager.', 'ascendante', ['descendante', 'latérale', 'externe']],
    ['Confier des responsabilités aux vendeurs, c’est la ___.', 'délégation', ['sanction', 'surveillance', 'mutation']]
  ],
  'remuneration': [
    ['Salaire net = brut − cotisations ___.', 'salariales', ['patronales', 'fiscales', 'commerciales']],
    ['La base mensuelle du temps de travail est de ___ heures.', '151,67', ['140', '160', '169']],
    ['La 44e heure de la semaine est majorée de ___.', '50 %', ['25 %', '10 %', '100 %']],
    ['La participation est obligatoire à partir de ___ salariés.', '50', ['11', '250', '20']]
  ],
  'fixation-prix': [
    ['Le taux de marque se calcule en divisant la marge par le ___.', 'prix de vente HT', ['coût d’achat HT', 'prix TTC', 'chiffre d’affaires']],
    ['Une élasticité supérieure à 1 indique une demande ___.', 'très élastique', ['peu élastique', 'stable', 'nulle']],
    ['Prix bas pour vendre de gros volumes : stratégie de ___.', 'pénétration', ['écrémage', 'alignement', 'prestige']],
    ['Une réduction pour paiement comptant est un ___.', 'escompte', ['rabais', 'ristourne', 'remise']]
  ],
  'fournisseurs': [
    ['Le ___ décrit précisément le besoin du distributeur.', 'cahier des charges', ['appel d’offres', 'bon de commande', 'contrat']],
    ['Note pondérée = somme des (notes × ___).', 'coefficients', ['prix', 'quantités', 'délais']],
    ['Dans les promotions alimentaires, on dit « offert » et pas « ___ ».', 'gratuit', ['remise', 'promo', 'réduit']],
    ['L’___ automatise l’échange des commandes et des factures.', 'EDI', ['ECR', 'SCM', 'SRM']]
  ]
};

// R.chasse : [affirmation vraie, la même rendue fausse]. La chasse à l'erreur en truque quelques-unes.
R.chasse = {
  'vente-conseil': [
    ['Dans SONCASE, le « O » signifie Orgueil.', 'Dans SONCASE, le « O » signifie Offre.'],
    ['Le cycle de vente commence par la prise de contact.', 'Le cycle de vente commence par l’argumentation.'],
    ['CAP signifie Caractéristique, Avantage, Preuve.', 'CAP signifie Client, Argument, Prix.'],
    ['La découverte des besoins se fait avec des questions ouvertes.', 'La découverte des besoins se fait surtout avec des questions fermées.']
  ],
  'repo': [
    ['REPO commence par reformuler l’objection.', 'REPO commence par baisser le prix.'],
    ['« Ouvrir » sert à vérifier que le client est convaincu.', '« Ouvrir » sert à présenter un autre produit.'],
    ['Une démonstration peut servir de preuve.', 'L’avis personnel du vendeur suffit comme preuve.']
  ],
  'reclamations': [
    ['La garantie légale de conformité dure 2 ans.', 'La garantie légale de conformité dure 6 mois.'],
    ['Face à un client opportuniste, on reste ferme et poli.', 'Face à un client opportuniste, on accepte toutes ses demandes.'],
    ['Une garantie commerciale s’ajoute à la garantie légale.', 'Une garantie commerciale remplace la garantie légale.'],
    ['On s’excuse pour la gêne sans accuser un collègue.', 'On s’excuse en expliquant que c’est la faute d’un collègue.']
  ],
  'numerique': [
    ['Un pure player vend uniquement en ligne.', 'Un pure player vend uniquement en magasin.'],
    ['Le click and collect : commande en ligne, retrait en magasin.', 'Le click and collect : commande en magasin, livraison à domicile.'],
    ['La désintermédiation supprime des intermédiaires.', 'La désintermédiation ajoute de nouveaux intermédiaires.']
  ],
  'experience-achat': [
    ['Le self-scanning illustre l’autonomie du client.', 'Le self-scanning illustre la baisse des prix.'],
    ['Le Club Nespresso est un outil de fidélisation.', 'Le Club Nespresso est une stratégie de prix bas.'],
    ['Les chatbots illustrent la place croissante de l’IA.', 'Les chatbots illustrent le recul du numérique.']
  ],
  'formation': [
    ['Former ses salariés est une obligation de l’employeur.', 'Former ses salariés est facultatif pour l’employeur.'],
    ['L’évaluation à froid a lieu quelque temps après la formation.', 'L’évaluation à froid a lieu à la toute fin de la formation.'],
    ['Une formation asynchrone se suit quand on le souhaite.', 'Une formation asynchrone impose que tous soient connectés en même temps.'],
    ['Le plan de formation est établi par le manager de l’unité.', 'Le plan de formation est établi par l’inspection du travail.']
  ],
  'evaluer-motivation': [
    ['L’absentéisme est un indicateur social.', 'L’absentéisme est un indicateur de performance commerciale.'],
    ['L’entretien individuel d’évaluation a lieu une fois par an.', 'L’entretien individuel d’évaluation a lieu chaque semaine.'],
    ['Great Place to Work est un label de bien-être au travail.', 'Great Place to Work est un indicateur de chiffre d’affaires.']
  ],
  'facteurs-motivation': [
    ['Pour Herzberg, le salaire est un facteur d’hygiène.', 'Pour Herzberg, le salaire est le principal facteur moteur.'],
    ['Le sommet de la pyramide de Maslow est l’accomplissement.', 'Le sommet de la pyramide de Maslow est la sécurité.'],
    ['La reconnaissance est un facteur intrinsèque.', 'La reconnaissance est un facteur extrinsèque.']
  ],
  'stimuler-animer': [
    ['Dans un challenge, tous ceux qui atteignent l’objectif gagnent.', 'Dans un challenge, seul le meilleur vendeur gagne.'],
    ['L’intéressement est une rémunération variable collective.', 'L’intéressement est une rémunération fixe.'],
    ['La communication ascendante va des vendeurs vers le manager.', 'La communication ascendante va du manager vers les vendeurs.'],
    ['Un concours peut démotiver s’il y a peu de gagnants.', 'Un concours ne présente aucun risque de démotivation.']
  ],
  'remuneration': [
    ['Les cotisations salariales sont retenues sur le salaire.', 'Les cotisations salariales sont payées en plus par l’entreprise.'],
    ['La base mensuelle est de 151,67 heures.', 'La base mensuelle est de 160 heures.'],
    ['La 40e heure de la semaine est majorée de 25 %.', 'La 40e heure de la semaine est majorée de 50 %.'],
    ['La participation est obligatoire à partir de 50 salariés.', 'La participation est obligatoire dans toutes les entreprises.']
  ],
  'fixation-prix': [
    ['Le taux de marge se calcule sur le coût d’achat.', 'Le taux de marge se calcule sur le prix de vente.'],
    ['Une élasticité de 3 indique une demande très élastique.', 'Une élasticité de 3 indique une demande peu élastique.'],
    ['L’écrémage pratique un prix élevé pour de petits volumes.', 'L’écrémage pratique un prix bas pour de gros volumes.'],
    ['Le prix imposé par un fournisseur est interdit.', 'Le prix imposé par un fournisseur est autorisé.']
  ],
  'fournisseurs': [
    ['La sélection d’un fournisseur commence par le choix des critères.', 'La sélection d’un fournisseur commence par la signature du contrat.'],
    ['Les promotions alimentaires sont limitées à 34 % du prix.', 'Les promotions alimentaires peuvent atteindre 70 % du prix.'],
    ['Le mot « gratuit » est interdit dans les promotions alimentaires.', 'Le mot « offert » est interdit dans les promotions alimentaires.'],
    ['L’ECR vise le bon produit, au bon moment, au bon prix.', 'L’ECR est un logiciel de caisse.']
  ]
};
