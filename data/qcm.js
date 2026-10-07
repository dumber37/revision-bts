// Banques de QCM, une par fiche (clé = id de la fiche).
// Chaque question : [énoncé, [BONNE réponse, fausse, fausse, fausse], explication].
// La bonne réponse est toujours écrite en premier : l'ordre est mélangé à l'affichage.
R.qcm = {

  // ---------- DRCV ----------

  'vente-conseil': [
    ['Dans SONCASE, que signifie le « O » ?', ['Orgueil', 'Offre', 'Opportunité', 'Organisation'], 'Orgueil : le client veut se valoriser, être reconnu.'],
    ['Un client veut « faire une bonne affaire ». Quel mobile SONCASE ?', ['Argent', 'Confort', 'Sécurité', 'Sympathie'], 'Le A de SONCASE : Argent.'],
    ['Un client demande surtout si le produit est fiable et sans risque. Quel mobile ?', ['Sécurité', 'Nouveauté', 'Orgueil', 'Écologie'], 'Sécurité : être rassuré, éviter un risque.'],
    ['Que signifie le « E » de SONCASE ?', ['Écologie', 'Économie', 'Efficacité', 'Estime'], 'Écologie : faire un achat responsable.'],
    ['Quelle est la 2e étape du cycle de vente ?', ['La découverte des besoins', 'L’argumentation', 'La prise de contact', 'La conclusion'], 'Prise de contact, découverte des besoins, argumentation, objections, conclusion.'],
    ['Quelle méthode sert à construire un argument ?', ['CAP', 'REPO', 'SONCASE', 'SMART'], 'CAP : Caractéristique, Avantage, Preuve.'],
    ['« Regardez, l’eau glisse dessus. » Dans CAP, c’est…', ['La preuve', 'La caractéristique', 'L’avantage', 'Une objection'], 'La preuve démontre ce qu’on avance : test, démonstration, avis, label.'],
    ['Selon ton cours, en E41 (DRCV), SONCASE sert surtout à…', ['Analyser la clientèle et justifier ses choix', 'Vendre en direct au client', 'Fixer le prix de vente', 'Recruter un vendeur'], 'En E42 (ADOC), il s’utilise en direct avec le client ; en E41, il sert à analyser.'],
    ['Quelle étape peut s’ajouter après la conclusion ?', ['Le suivi et la fidélisation', 'La prise de contact', 'La découverte des besoins', 'Le traitement des objections'], 'C’est la 6e étape possible du cycle de vente.']
  ],

  'repo': [
    ['Que signifie le « R » de REPO ?', ['Reformuler', 'Répondre', 'Rassurer', 'Relancer'], 'Reformuler, Énoncer, Prouver, Ouvrir.'],
    ['Face à une objection, que fait-on en premier ?', ['On reformule l’objection', 'On baisse le prix', 'On conclut la vente', 'On change de produit'], 'Reformuler montre au client qu’on l’a compris.'],
    ['« Il est garanti 5 ans au lieu de 2. » Quelle étape de REPO ?', ['Énoncer', 'Reformuler', 'Ouvrir', 'Prouver'], 'Énoncer, c’est donner l’argument qui lève le frein.'],
    ['À quoi sert l’étape « Ouvrir » ?', ['Vérifier que le client est convaincu et relancer la vente', 'Présenter un nouveau produit', 'Ouvrir le dossier client', 'Saluer le client'], 'Ex. « Ça vous rassure ? »'],
    ['Laquelle de ces réponses est une vraie preuve ?', ['Un avis client ou une démonstration', 'L’avis personnel du vendeur', 'Une promesse orale', 'Un prix plus bas'], 'Une preuve s’appuie sur un chiffre, une démonstration, un avis, un document.'],
    ['À quoi sert la méthode REPO ?', ['Répondre à une question ou une objection', 'Construire un argument', 'Découvrir les besoins', 'Fixer un prix'], 'Pour construire un argument, on utilise CAP.']
  ],

  'reclamations': [
    ['Quelle est la première étape du traitement d’une réclamation ?', ['Accueillir', 'Proposer une solution', 'S’excuser', 'Clôturer'], 'Accueillir, écouter, reformuler, s’excuser, proposer, corriger, clôturer.'],
    ['Un écart entre le prix en rayon et le prix en caisse est une réclamation…', ['De prix', 'De produit', 'De service', 'De garantie'], 'Les 3 types : produit, prix, service.'],
    ['Pourquoi « corriger la cause » ?', ['Pour que le problème ne se reproduise pas', 'Pour trouver le collègue fautif', 'Pour rembourser le client', 'Pour clôturer plus vite'], 'Ex. retirer le produit périmé, corriger l’étiquette.'],
    ['Un client cite la loi et exige des écrits. Quel profil ?', ['Procédurier', 'Affectif', 'Sincère', 'Opportuniste'], 'Il veut le respect strict des règles.'],
    ['Un client émotif, qui se sent personnellement touché, est…', ['Affectif', 'Procédurier', 'Opportuniste', 'Sincère'], 'Il veut être écouté, compris, rassuré.'],
    ['Comment réagir face à un client opportuniste ?', ['Rester ferme et poli, appliquer les règles du magasin', 'Accepter toutes ses demandes', 'L’ignorer', 'Lui offrir le double'], 'Il exagère pour obtenir le geste commercial maximum.'],
    ['Combien de temps dure la garantie légale de conformité ?', ['2 ans', '6 mois', '1 an', '5 ans'], 'C’est une garantie légale, donc obligatoire.'],
    ['Une garantie commerciale…', ['S’ajoute à la garantie légale', 'Remplace la garantie légale', 'Est obligatoire', 'Ne concerne que les produits de marque'], 'Elle sert à rassurer, se différencier et fidéliser.'],
    ['Lequel est un exemple de garantie commerciale chez Carrefour ?', ['La garantie fraîcheur', 'La garantie de conformité', 'La garantie des vices cachés', 'Le droit de rétractation'], 'Aussi : satisfait ou remboursé sur les MDD, Filière Qualité Carrefour.']
  ],

  'numerique': [
    ['Un « pure player » est une entreprise…', ['Présente uniquement en ligne', 'Présente uniquement en magasin', 'Qui fabrique ses produits', 'Qui vend aux professionnels'], 'Ex. une enseigne qui n’a pas de magasin physique.'],
    ['Le « phygital », c’est…', ['Le mélange du magasin physique et des outils digitaux', 'La vente uniquement sur Internet', 'Le paiement en espèces', 'La publicité à la télévision'], 'Ex. bornes, tablettes vendeurs, écrans en magasin.'],
    ['Le « click and collect », c’est…', ['Commander en ligne et retirer en magasin', 'Être livré à domicile', 'Payer avec son téléphone en caisse', 'Commander en magasin et être livré'], ''],
    ['La désintermédiation, c’est…', ['La suppression des intermédiaires', 'L’arrivée de nouveaux intermédiaires', 'La fusion de deux magasins', 'La délocalisation de la production'], 'Le producteur vend directement au client.'],
    ['La réintermédiation, c’est…', ['Le retour de nouveaux intermédiaires, comme les plateformes', 'La suppression des intermédiaires', 'Le retour au magasin physique', 'La baisse des prix'], ''],
    ['Une marketplace est…', ['Une place de marché en ligne qui regroupe des vendeurs', 'Un magasin physique', 'Un réseau social', 'Un entrepôt logistique'], ''],
    ['Une stratégie omnicanale, c’est…', ['Des canaux connectés pour un parcours client fluide', 'Un seul canal de vente', 'Des canaux qui fonctionnent séparément', 'La vente uniquement en ligne'], ''],
    ['La transformation digitale, c’est…', ['Intégrer le numérique dans toute l’entreprise', 'Créer un site Internet', 'Supprimer les magasins', 'Vendre sur les réseaux sociaux'], '']
  ],

  'experience-achat': [
    ['Laquelle n’est PAS une des 4 tendances de l’expérience d’achat ?', ['La baisse généralisée des prix', 'La personnalisation', 'L’autonomie du client', 'L’IA de plus en plus présente'], 'Les 4 : parcours optimisé, IA, personnalisation, autonomie.'],
    ['Le self-scanning et les bornes illustrent…', ['L’autonomie du client', 'La personnalisation', 'L’IA', 'La baisse des prix'], 'Le client avance seul quand il le veut.'],
    ['Les chatbots et les recommandations automatiques illustrent…', ['L’IA de plus en plus présente et performante', 'L’autonomie du client', 'L’optimisation du parcours', 'La fidélisation'], ''],
    ['Proposer des offres adaptées à chaque client, c’est…', ['La personnalisation', 'L’autonomie', 'L’omnicanal', 'La désintermédiation'], ''],
    ['Réduire les frictions entre le web et le magasin, c’est…', ['Optimiser le parcours d’achat', 'Personnaliser l’offre', 'Rendre le client autonome', 'Utiliser l’IA'], ''],
    ['Quel est l’atout de fidélisation de Nespresso étudié en cours ?', ['Le Club Nespresso', 'Des prix très bas', 'La livraison gratuite', 'La publicité à la télévision'], 'À analyser avec les 4 tendances.']
  ],

  // ---------- Management ----------

  'formation': [
    ['Quel article du Code du travail oblige l’employeur à former ses salariés ?', ['L6321-1', 'L1234-1', 'L3121-27', 'L441-10'], 'Adapter les salariés à leur poste et maintenir leur capacité à occuper un emploi.'],
    ['Dans quel ordre se déroulent les 4 étapes de la formation ?', ['Besoins, modalités, plan, évaluation', 'Plan, besoins, évaluation, modalités', 'Modalités, besoins, plan, évaluation', 'Évaluation, plan, besoins, modalités'], ''],
    ['Matrice des compétences : une compétence « partiellement maîtrisée » demande…', ['Une formation ou un accompagnement ciblé', 'Aucune formation', 'Un licenciement', 'Un changement de poste'], 'Non maîtrisée : formation à prévoir. Maîtrisée : pas de formation prioritaire.'],
    ['Une formation à distance asynchrone, c’est…', ['Se former quand on le souhaite (vidéos, serious game)', 'Tous connectés au même moment', 'Un organisme en présentiel', 'Un formateur salarié de l’entreprise'], 'Synchrone : tous connectés en même temps.'],
    ['L’évaluation « à froid » a lieu…', ['Quelque temps après, pour mesurer l’efficacité réelle', 'À la fin de la formation', 'Avant la formation', 'Pendant la formation'], 'À chaud : à la fin, sur l’organisation, le matériel, les contenus.'],
    ['Que comprend le coût d’une formation interne ?', ['Le salaire du formateur et les frais d’organisation', 'Le transport et l’hébergement des stagiaires', 'Uniquement l’achat des supports', 'Rien, elle est gratuite'], 'Transport, hébergement, repas : coûts d’une formation externe.'],
    ['Qui établit le plan de formation de l’unité commerciale ?', ['Le manager de l’unité commerciale', 'L’organisme de formation', 'L’inspection du travail', 'Chaque vendeur seul'], 'C’est un tableau annuel.'],
    ['Lequel de ces événements crée un besoin de formation ?', ['Le lancement d’un nouveau produit', 'Les congés d’été', 'L’inventaire annuel', 'Un changement d’horaires'], 'Aussi : nouvelle concurrence, nouvelle méthode de vente, nouveaux modes de consommation.'],
    ['Quel est l’avantage d’une formation interne ?', ['Le formateur connaît l’entreprise et le coût est modéré', 'Les formateurs sont des experts pédagogues extérieurs', 'Elle se fait toujours à distance', 'Elle n’a pas besoin d’être évaluée'], '']
  ],

  'evaluer-motivation': [
    ['Lequel est un indicateur social ?', ['L’absentéisme', 'Le chiffre d’affaires', 'Le panier moyen', 'Le taux de marge'], 'Aussi : arrêts maladie, accidents du travail, retards, conflits, turn-over.'],
    ['Quel outil repère les vendeurs motivés et ceux en difficulté ?', ['Le tableau de bord des ventes par vendeur', 'Le bulletin de salaire', 'Le plan de formation', 'Le règlement intérieur'], 'C’est un indicateur de performance.'],
    ['Lequel est un label de bien-être au travail ?', ['Great Place to Work', 'Label Rouge', 'Origine France Garantie', 'AB Agriculture biologique'], 'Aussi : Happywork.'],
    ['À quelle fréquence a lieu l’entretien individuel d’évaluation ?', ['Une fois par an', 'Chaque semaine', 'Chaque mois', 'Tous les 5 ans'], 'Bilan, salaire, futurs objectifs, état de la motivation.'],
    ['Pourquoi mesurer la motivation de l’équipe ?', ['Pour fidéliser et limiter le turn-over', 'Pour augmenter les prix', 'Pour réduire les stocks', 'Pour choisir un fournisseur'], ''],
    ['Quelle est la définition de la motivation ?', ['Une force plus ou moins consciente qui pousse à agir', 'Le salaire versé chaque mois', 'Le nombre d’heures travaillées', 'Une prime de fin d’année'], '']
  ],

  'facteurs-motivation': [
    ['Lequel est un facteur intrinsèque (interne) ?', ['La reconnaissance', 'Le salaire', 'L’ambiance', 'Les avantages en nature'], 'Les intrinsèques sont liés au travail lui-même.'],
    ['Lequel est un facteur extrinsèque (externe) ?', ['La stabilité de l’emploi', 'Le contenu du travail', 'Les promotions', 'Le sentiment de participer au développement de l’unité'], ''],
    ['Pour Herzberg, les facteurs extrinsèques sont…', ['Des facteurs d’hygiène', 'Des facteurs moteurs', 'Des besoins d’accomplissement', 'Des incentives'], 'Les intrinsèques sont les facteurs moteurs.'],
    ['Que se passe-t-il si les facteurs extrinsèques manquent ?', ['Ils démotivent', 'Ils motivent davantage', 'Rien ne change', 'Les ventes augmentent'], 'Ils ne motivent pas vraiment, mais leur absence démotive.'],
    ['Quel est le sommet de la pyramide de Maslow ?', ['L’accomplissement', 'L’estime', 'L’appartenance', 'La sécurité'], 'De bas en haut : physiologiques, sécurité, appartenance, estime, accomplissement.'],
    ['Quelle est la base de la pyramide de Maslow ?', ['Les besoins physiologiques', 'La sécurité', 'L’estime', 'L’appartenance'], 'Au travail : une rémunération suffisante pour vivre.'],
    ['La bonne ambiance entre collègues répond à quel besoin de Maslow ?', ['L’appartenance', 'La sécurité', 'L’estime', 'L’accomplissement'], ''],
    ['Un CDI répond surtout à quel besoin de Maslow ?', ['La sécurité', 'L’estime', 'L’accomplissement', 'L’appartenance'], 'Stabilité de l’emploi = sécurité.']
  ],

  'stimuler-animer': [
    ['Dans un challenge, qui est récompensé ?', ['Tous ceux qui atteignent l’objectif', 'Seulement les meilleurs', 'Un vendeur tiré au sort', 'Le plus ancien'], 'Limite : budget variable, difficile à prévoir.'],
    ['Quel est le risque d’un concours ?', ['Démotiver s’il y a peu de gagnants', 'Un budget impossible à prévoir', 'Trop de gagnants', 'Il est interdit par la loi'], 'Seuls les meilleurs gagnent, selon un règlement.'],
    ['L’intéressement fait partie de la rémunération…', ['Variable collective', 'Fixe', 'Variable individuelle', 'En nature'], 'Avec les primes d’objectifs collectifs.'],
    ['Une commission sur les ventes est une rémunération…', ['Variable individuelle', 'Variable collective', 'Fixe', 'Périphérique'], 'Elle récompense la performance individuelle.'],
    ['Le rôle du fixe dans la rémunération, c’est…', ['Sécuriser et rémunérer les compétences', 'Récompenser la performance collective', 'Fidéliser par l’actionnariat', 'Remplacer les primes'], ''],
    ['La délégation (management participatif), c’est…', ['Confier des responsabilités aux vendeurs', 'Surveiller chaque vendeur', 'Supprimer les réunions', 'Baisser les salaires'], 'Elle motive et favorise la créativité.'],
    ['La communication ascendante va…', ['Des vendeurs vers le manager', 'Du manager vers les vendeurs', 'Du magasin vers les clients', 'Du fournisseur vers le magasin'], 'Descendante : du manager vers les vendeurs.'],
    ['Un séminaire fédérateur correspond à quel levier d’animation ?', ['Les événements', 'La délégation', 'Le bien-être', 'La rémunération'], 'Il renforce l’esprit d’équipe et la cohésion.'],
    ['Une bonne récompense de challenge doit surtout…', ['Avoir de la valeur et faire rêver le vendeur', 'Coûter le moins cher possible', 'Être la même chaque année', 'Être un simple stylo'], 'Ex. voyage, spa, match.']
  ],

  'remuneration': [
    ['Un système de rémunération « sécurisant »…', ['Assure un revenu minimum', 'Pousse à vendre plus', 'Est facile à comprendre', 'Respecte tous les commerciaux'], 'Les 6 qualités : motivant, sécurisant, équitable, adapté, stimulant, simple.'],
    ['Quelle est la limite du fixe ?', ['Il ne favorise pas les meilleurs vendeurs', 'Il est trop compliqué à calculer', 'Il n’est pas obligatoire', 'Il est versé seulement si l’objectif est atteint'], ''],
    ['La commission est calculée…', ['En % sur les ventes, donc sur le chiffre d’affaires', 'Selon l’ancienneté', 'Selon le bénéfice de l’entreprise', 'Une fois par an'], ''],
    ['À partir de combien de salariés la participation est-elle obligatoire ?', ['50', '11', '250', '10'], 'C’est une part du bénéfice net.'],
    ['Quelle est la base mensuelle du temps de travail ?', ['151,67 h', '140 h', '160 h', '169 h'], '35 h × 52 semaines ÷ 12 mois.'],
    ['Quelle majoration pour la 40e heure de la semaine ?', ['25 %', '50 %', '10 %', 'Aucune'], '+25 % de la 36e à la 43e heure.'],
    ['Quelle majoration pour la 45e heure de la semaine ?', ['50 %', '25 %', '75 %', '100 %'], '+50 % à partir de la 44e heure (ou repos compensateur).'],
    ['Un vendeur à 12 € de l’heure travaille 38 h. Quel est son brut de la semaine ?', ['465 €', '456 €', '474 €', '480 €'], '35 × 12 = 420 € ; 3 × 12 × 1,25 = 45 € ; total 465 €.'],
    ['Salaire net =', ['Brut − cotisations salariales', 'Brut + cotisations patronales', 'Brut − cotisations patronales', 'Brut + cotisations salariales'], ''],
    ['Coût employeur =', ['Brut + cotisations patronales', 'Brut − cotisations salariales', 'Net + cotisations salariales', 'Brut seul'], ''],
    ['Les cotisations salariales sont…', ['Retenues sur le salaire du salarié', 'Payées en plus par l’entreprise', 'Versées par l’État', 'Facultatives'], 'Attention à l’erreur du cours : l’entreprise ne fait que les reverser.'],
    ['Un remboursement de frais est…', ['Exonéré de cotisations', 'Soumis aux cotisations et imposable', 'Un avantage en nature', 'Interdit'], 'Les avantages en nature, eux, sont soumis aux cotisations et imposables.'],
    ['À quoi sert l’avance sur commission ?', ['À garantir le SMIC au vendeur payé à la commission', 'À payer les heures sup', 'À verser la participation', 'À rembourser les frais'], 'Avec une régularisation périodique.']
  ],

  // ---------- Gestion opérationnelle ----------

  'fixation-prix': [
    ['Le prix imposé par un fournisseur est…', ['Interdit, seul un prix conseillé est permis', 'Autorisé partout', 'Obligatoire pour les MDD', 'Autorisé pendant les soldes'], ''],
    ['Le prix augmente de 10 % et les ventes baissent de 5 %. La demande est…', ['Peu élastique (E = 0,5)', 'Très élastique (E = 2)', 'Unitaire (E = 1)', 'Très élastique (E = 5)'], 'E = 5 ÷ 10 = 0,5 < 1.'],
    ['Une élasticité E = 3 signifie que la demande est…', ['Très élastique', 'Peu élastique', 'Unitaire', 'Nulle'], 'E > 1 : les clients réagissent fort au prix.'],
    ['Prix bas pour vendre de gros volumes : quelle stratégie ?', ['La pénétration', 'L’écrémage', 'L’alignement', 'Le yield management'], 'Ex. Free Mobile.'],
    ['Prix élevé, forte marge, petits volumes : quelle stratégie ?', ['L’écrémage', 'La pénétration', 'L’alignement', 'Le bundling'], 'Ex. Red Bull ; luxe ou avance technologique.'],
    ['Quel exemple illustre le yield management ?', ['La SNCF', 'Free Mobile', 'Red Bull', 'Fnac Darty'], 'Le prix change en temps réel selon la demande.'],
    ['Une réduction pour paiement comptant s’appelle…', ['Un escompte', 'Une ristourne', 'Un rabais', 'Une remise'], ''],
    ['Une réduction selon le volume acheté sur une période s’appelle…', ['Une ristourne', 'Un escompte', 'Un rabais', 'Un prix promo'], ''],
    ['Un rabais est accordé…', ['Pour un produit défectueux ou déclassé', 'Pour un paiement comptant', 'Selon le statut du client', 'Selon le volume sur l’année'], ''],
    ['Taux de marque =', ['Marge ÷ prix de vente HT × 100', 'Marge ÷ coût d’achat HT × 100', 'Prix TTC ÷ coût d’achat HT', 'Coût d’achat ÷ prix de vente'], 'Le taux de marge, lui, se divise par le coût d’achat.'],
    ['Achat 40 € HT, vente 60 € HT. Quel est le taux de marge ?', ['50 %', '33,3 %', '20 %', '150 %'], 'Marge 20 € ÷ 40 € × 100 = 50 %.'],
    ['Un prix d’appel est interdit quand…', ['Le stock est insuffisant', 'Le prix est trop bas', 'C’est un produit alimentaire', 'C’est pendant les soldes'], 'Ex. cité en cours : Lidl.'],
    ['Quelle est une limite du prix d’acceptabilité ?', ['Les réponses sont déclaratives, hors situation d’achat', 'Il est trop cher à calculer', 'Il est interdit par la loi', 'Il ne tient compte que de la marge'], 'Il regarde le CA mais pas la marge.'],
    ['Dans l’exemple du paquet de pâtes, quelle est la part de la TVA ?', ['5,5 %', '20 %', '10 %', '1 %'], 'Taux réduit des produits alimentaires.']
  ],

  'fournisseurs': [
    ['Quelle est la première étape pour sélectionner un fournisseur ?', ['Définir les critères de sélection', 'Négocier', 'Lancer un appel d’offres', 'Signer le contrat'], 'Puis cahier des charges, appel d’offres, examen, négociation, choix, contrat, relation.'],
    ['Quel document décrit précisément le besoin ?', ['Le cahier des charges', 'L’appel d’offres', 'Les CGV', 'Le bon de livraison'], ''],
    ['Fournisseur C : qualité (60 %) notée 5, prix (40 %) noté 2. Sa note pondérée ?', ['3,8', '3,5', '7', '4,2'], '5 × 0,6 + 2 × 0,4 = 3 + 0,8 = 3,8.'],
    ['Comment calcule-t-on une note pondérée ?', ['Σ (note × coefficient)', 'Somme des notes', 'Moyenne des coefficients', 'Note la plus haute × 2'], ''],
    ['Que signifie MDD ?', ['Marque de distributeur', 'Marge de distribution', 'Mise en avant du distributeur', 'Marché de détail'], ''],
    ['Sur les retours, le distributeur veut…', ['La reprise des invendus', 'Une vente définitive', 'Payer plus vite', 'Moins de références'], 'Le fournisseur, lui, veut une vente définitive.'],
    ['Promotions alimentaires (loi Egalim) : quel plafond ?', ['34 % du prix et 25 % du volume', '50 % du prix et 50 % du volume', '20 % du prix et 10 % du volume', 'Aucun plafond'], ''],
    ['Quel mot est interdit dans les promotions alimentaires ?', ['« Gratuit »', '« Offert »', '« Promo »', '« Remise »'], 'On dit « offert ».'],
    ['L’EDI, c’est…', ['L’échange de données informatisé', 'Une étude de marché', 'Un contrat de distribution', 'Un logiciel de caisse'], 'Commandes et factures automatisées, moins d’erreurs et de coûts.'],
    ['L’ECR, c’est…', ['Le bon produit, au bon moment, au bon prix', 'La gestion de la chaîne logistique', 'Un échange de factures', 'Une promotion en magasin'], 'Réponse optimale au consommateur.'],
    ['Le category management consiste à…', ['Regrouper les produits par univers', 'Choisir le fournisseur le moins cher', 'Baisser tous les prix', 'Supprimer les MDD'], 'À partir d’une segmentation (lieu, cible).'],
    ['Délai de paiement selon ton cours :', ['30 jours après réception, ou 45 jours fin de mois', '90 jours dans tous les cas', '7 jours après réception', 'Aucun délai légal'], 'Version du cours ; vérifie celle attendue par ton prof.']
  ]
};
