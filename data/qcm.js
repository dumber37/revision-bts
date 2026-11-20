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
  ],

  'boite-outils': [
    ['Le CA passe de 380 000 € à 408 500 €. Taux d’évolution ?', ['+7,5 %', '+7 %', '+28,5 %', '+6,98 %'], '28 500 ÷ 380 000 = 0,075. On divise par la valeur de départ.'],
    ['Lucas vend 27 000 €, soit 18 % du CA de son magasin. CA du magasin ?', ['150 000 €', '4 860 €', '31 860 €', '48 600 €'], '27 000 ÷ 0,18. Le total est forcément plus grand que la partie.'],
    ['126,60 € TTC avec une TVA de 5,5 %. Prix HT ?', ['120 €', '119,64 €', '133,56 €', '121,10 €'], '126,60 ÷ 1,055. On ne retire pas 5,5 % au TTC.'],
    ['Un client paie 391 € après une remise de 15 %. Prix avant remise ?', ['460 €', '449,65 €', '450 €', '332,35 €'], '391 ÷ 0,85 = 460.'],
    ['Remises successives de 10 % puis 5 % : remise globale ?', ['14,5 %', '15 %', '15,5 %', '5 %'], '0,90 × 0,95 = 0,855 : la 2e remise porte sur un montant déjà réduit.'],
    ['Coût d’achat 32 €, taux de marque voulu 36 %. Prix de vente HT ?', ['50 €', '43,52 €', '44,44 €', '60 €'], '32 ÷ (1 − 0,36) = 32 ÷ 0,64.'],
    ['Coût d’achat 32 €, taux de marge 36 %. Prix de vente HT ?', ['43,52 €', '50 €', '20,48 €', '36 €'], '32 × 1,36.'],
    ['Montre achetée 48 € + 2 € de transport, vendue 75 € HT. Taux de marge ?', ['50 %', '56,25 %', '33,3 %', '25 %'], 'Coût d’achat 50 € (avec le transport), marge 25 €, 25 ÷ 50.'],
    ['Quel est le levier 7 de performance ?', ['Les stocks', 'La fidélité des clients', 'Les créances clients', 'Investir intelligemment'], '1 CA, 2 fidélité, 3 baisse des coûts, 4 ressources, 5 créances, 6 dettes fournisseurs, 7 stocks, 8 investir.'],
    ['Choisir un fournisseur qui accorde un long délai de paiement actionne le levier…', ['6, les dettes fournisseurs', '5, les créances clients', '1, le chiffre d’affaires', '4, les ressources'], 'On paie plus tard : la trésorerie respire.'],
    ['Dans quel ordre rédige-t-on un commentaire de gestion ?', ['Fait, sens, recommandation', 'Sens, fait, conclusion', 'Recommandation, fait, sens', 'Calcul, résultat, fin'], 'Fait chiffré, explication, action avec une condition.'],
    ['Par convention en gestion, une année compte…', ['360 jours', '365 jours', '52 semaines de 7 jours', '300 jours'], 'Et un mois 30 jours.']
  ],

  'approvisionnements': [
    ['Le coût de possession augmente quand on…', ['Commande rarement, en grosses quantités', 'Commande souvent, en petites quantités', 'Baisse le stock de sécurité', 'Négocie le prix'], 'Gros stock moyen = plus d’argent immobilisé.'],
    ['Avec Q = 720, PU = 8 € et un taux de 15 %, le coût de possession vaut…', ['432 €', '864 €', '108 €', '5 760 €'], '(720 ÷ 2) × 8 × 0,15.'],
    ['Wilson : N = √[(C × PU × T) ÷ ?]', ['2 × P', 'P', 'P ÷ 2', '2 × C'], 'P = coût de passation d’une commande.'],
    ['Café : C = 3 600, PU = 5 €, T = 20 %, P = 18 €. Nombre optimal de commandes ?', ['10', '12', '100', '6'], '√(3 600 ÷ 36) = √100.'],
    ['À l’optimum de Wilson…', ['Coût de passation = coût de possession', 'Le coût de passation est nul', 'Le stock de sécurité est nul', 'On commande une fois par mois'], 'C’est l’égalité que résout la formule.'],
    ['Wilson donne N = 10,39. Règle d’examen ?', ['Arrondir à l’entier supérieur : 11', 'Garder 10,39', 'Arrondir à 10', 'Recalculer sans racine'], 'Sauf consigne contraire. En entreprise, on compare 10 et 11.'],
    ['Quelle hypothèse le modèle de Wilson fait-il ?', ['La demande est régulière et connue', 'Les remises par quantité sont prises en compte', 'Le fournisseur livre par lots', 'Le stock est périssable'], 'Ses limites : saisonnalité, remises, lots, place et péremption.'],
    ['20 ventes par jour, délai de livraison 9 jours, sécurité 3 jours. Stock d’alerte ?', ['240', '180', '60', '200'], 'Minimum 180 + sécurité 60.'],
    ['Dans un cadencier, le besoin d’une période =', ['Ventes prévues + stock de sécurité', 'Ventes prévues − stock initial', 'Stock initial + livraison', 'Ventes prévues × délai'], ''],
    ['Le stock final d’une période se calcule avec…', ['Les ventes prévues', 'Le besoin', 'Le stock de sécurité seul', 'La quantité commandée seule'], 'Stock initial + livraison − ventes : la sécurité reste en rayon.'],
    ['Il manque 50 coffrets, le fournisseur livre par lots de 12. On fait livrer…', ['60 coffrets', '48 coffrets', '50 coffrets', '62 coffrets'], '50 ÷ 12 = 4,17 : toujours au lot supérieur, 5 lots.'],
    ['Le fournisseur impose ses dates de livraison : c’est…', ['La gestion calendaire', 'Le point de commande', 'Le modèle de Wilson', 'L’inventaire tournant'], 'Chaque livraison couvre les ventes jusqu’à la suivante.'],
    ['Pourquoi la gestion calendaire coûte-t-elle plus cher en stock ?', ['Chaque livraison doit couvrir plusieurs périodes', 'Les lots sont plus petits', 'Le stock de sécurité disparaît', 'Les ventes baissent'], 'Coffrets : stock final moyen de 26 au lieu de 14.'],
    ['Le coût de passation baisse (commande automatique). On va…', ['Commander plus souvent et stocker moins', 'Commander moins souvent', 'Augmenter le stock moyen', 'Ne rien changer'], 'Logique du flux tendu : de 10 à 20 commandes.']
  ],

  'gestion-stocks': [
    ['Le stock réel est inférieur au stock théorique : c’est…', ['Une démarque', 'Une surmarque', 'Une rupture', 'Une rotation'], 'Vol, casse, péremption, erreur de caisse…'],
    ['Une livraison reçue mais non enregistrée provoque…', ['Une surmarque', 'Une démarque', 'Une démarque connue', 'Rien'], 'Le réel dépasse le théorique.'],
    ['Après un inventaire, quelle quantité fait foi ?', ['Le stock compté', 'Le stock du logiciel', 'La moyenne des deux', 'Le stock de sécurité'], 'Le logiciel est corrigé.'],
    ['Logiciel 46 coffrets, comptage 43, coût d’achat 22 €. Démarque en valeur ?', ['66 €', '946 €', '22 €', '129 €'], '3 × 22.'],
    ['Quelle est la première cause de démarque inconnue ?', ['Le vol', 'La casse notée', 'Les soldes', 'Les retours'], 'La casse notée est une démarque connue.'],
    ['L’inventaire tournant, c’est…', ['Compter quelques références à tour de rôle toute l’année', 'Tout compter en une fois', 'Compter seulement la réserve', 'Compter une fois tous les 5 ans'], 'Pas de fermeture, mais logiciel et rigueur nécessaires.'],
    ['Stock initial 200 à 5 €, entrées 400 à 5,25 € et 200 à 5,50 €. CMP ?', ['5,25 €', '5,30 €', '5,00 €', '5,50 €'], '4 200 ÷ 800 = 5,25 €.'],
    ['Pourquoi (48 + 50 + 51) ÷ 3 n’est-il pas le CMP ?', ['Il ne tient pas compte des quantités achetées à chaque prix', 'Il faut diviser par 2', 'Il faut prendre le dernier prix', 'Il faut ajouter la TVA'], 'Le CMP est pondéré par les quantités.'],
    ['Contrôle d’une fiche de stock :', ['Sorties + stock final = total des entrées', 'Entrées = sorties', 'Stock final = stock initial', 'CMP × 2 = total'], 'Café : 3 255 + 945 = 4 200 €.'],
    ['La loi des 20/80 dit qu’environ…', ['20 % des références font 80 % du CA', '80 % des références font 80 % du CA', '20 % des clients font 20 % du CA', '20 % du stock est perdu'], 'Loi de Pareto.'],
    ['Première étape de la méthode des 20/80 ?', ['Classer les références par CA décroissant', 'Calculer le cumul', 'Supprimer les petites références', 'Calculer le CMP'], 'Puis parts, cumul, repérer les 80 %.'],
    ['Stock début 200, fin 160, 3 600 vendus. Rotation ?', ['20', '18', '11', '22,5'], 'Stock moyen 180, 3 600 ÷ 180.'],
    ['Rotation de 20 sur 360 jours : durée moyenne de stockage ?', ['18 jours', '20 jours', '7 200 jours', '36 jours'], '360 ÷ 20.'],
    ['Le ratio de rotation, on souhaite qu’il…', ['Augmente, sans provoquer de ruptures', 'Baisse', 'Reste à 1', 'Soit égal au stock moyen'], 'Le levier 7 sous la contrainte du levier 2.']
  ],

  // ---------- Anglais ----------

  'vocabulaire-anglais': [
    ['« Turnover » signifie…', ['Chiffre d’affaires', 'Rotation du personnel', 'Bénéfice net', 'Retournement de situation'], 'Attention : staff turnover = rotation du personnel.'],
    ['Comment dit-on « panier moyen » ?', ['Average basket value', 'Middle basket', 'Medium cart price', 'Mean shopping bag'], ''],
    ['« Brand awareness » signifie…', ['Notoriété de marque', 'Image de marque', 'Fidélité à la marque', 'Prix de la marque'], 'Aware (adjectif) + ness = awareness (nom).'],
    ['Comment dit-on « part de marché » ?', ['Market share', 'Market part', 'Sales share', 'Market research'], 'Market research = étude de marché.'],
    ['« Customer retention » signifie…', ['Rétention client (garder ses clients)', 'Acquisition client', 'Réclamation client', 'Attente du client'], ''],
    ['« Supply chain » signifie…', ['Chaîne d’approvisionnement', 'Chaîne de magasins', 'Gestion des ventes', 'Service client'], ''],
    ['Comment dit-on « prendre une décision » ?', ['To make a decision', 'To do a decision', 'To take a decide', 'To have decision'], 'Make, pas do. A decision maker = un décisionnaire.'],
    ['« Retailer » signifie…', ['Détaillant', 'Fournisseur', 'Grossiste', 'Client'], 'Supplier / provider = fournisseur.'],
    ['« Relevant » signifie…', ['Pertinent', 'Relevé', 'Important', 'Relancé'], 'Faux ami : relevant ≠ relevé.'],
    ['« Throughout the year » signifie…', ['Tout au long de l’année', 'À travers l’année', 'Après l’année', 'Avant la fin de l’année'], 'Through = à travers (3D), across = à travers (2D).'],
    ['Comment dit-on « clientèle cible » ?', ['Target audience', 'Target customer service', 'Aimed public', 'Customer goal'], ''],
    ['« Complaint » signifie…', ['Plainte, réclamation', 'Compliment', 'Achat complet', 'Remboursement'], '']
  ],

  'verbes-commerce': [
    ['« To retain customers » signifie…', ['Fidéliser les clients', 'Retenir les clients de force', 'Rembourser les clients', 'Recruter des clients'], ''],
    ['« To browse » signifie…', ['Parcourir (un site, des rayons)', 'Acheter', 'Comparer les prix', 'Réclamer'], ''],
    ['Quelle phrase est correcte ?', ['She doesn’t handle complaints.', 'She doesn’t handles complaints.', 'She don’t handle complaints.', 'She not handle complaints.'], 'Avec doesn’t, le verbe perd son s.'],
    ['Quelle question est correcte ?', ['Does the company promote its products online?', 'Does the company promotes its products online?', 'Do the company promote its products online?', 'The company does promote its products online?'], 'The company = it : Does + base verbale.'],
    ['« The promotion ___ sales. »', ['boosts', 'boost', 'boosting', 'are boost'], 'The promotion = it : -s au present simple.'],
    ['« Sales assistants ___ deal with suppliers. »', ['don’t', 'doesn’t', 'isn’t', 'not'], 'Sujet pluriel : don’t.'],
    ['« To purchase » signifie…', ['Acheter', 'Poursuivre', 'Vendre', 'Promouvoir'], ''],
    ['« The campaign targets young consumers » : « targets » signifie…', ['Cible', 'Vise à vendre', 'Recrute', 'Interroge'], '']
  ],

  'temps-anglais': [
    ['Quel temps avec « at the moment » ?', ['Present progressive', 'Present simple', 'Past simple', 'Present perfect'], 'Action en cours : be + V-ing.'],
    ['Quel temps avec « since 2020 » ?', ['Present perfect', 'Past simple', 'Present simple', 'Present progressive'], 'He hasn’t used the Tube since 2020.'],
    ['Quel temps avec « two years ago » ?', ['Past simple', 'Present perfect', 'Present progressive', 'Present simple'], 'Passé terminé et daté.'],
    ['« Federico usually ___ his scooter to work. »', ['takes', 'is taking', 'took', 'has taken'], 'Usually = habitude → present simple, -s à la 3e personne.'],
    ['« The government ___ the law yet. »', ['hasn’t changed', 'didn’t change', 'doesn’t change', 'isn’t changing'], 'Yet → present perfect.'],
    ['« More people ___ electric scooters at the moment. »', ['are buying', 'buy', 'bought', 'have bought'], ''],
    ['« The UK government ___ a trial in 2020. »', ['launched', 'has launched', 'launches', 'is launching'], 'Date précise du passé → past simple.'],
    ['Comment se forme la question au past simple ?', ['Did + sujet + base verbale', 'Did + sujet + V-ed', 'Have + sujet + participe passé', 'Do + sujet + V-ed'], 'Did Federico enjoy the experience?'],
    ['« Federico has used his scooter ___ three years. »', ['for', 'since', 'ago', 'during'], 'For + durée, since + date.'],
    ['Quelle phrase est au present perfect ?', ['The company has sold more than 10,000 scooters.', 'The company sold 10,000 scooters.', 'The company sells scooters.', 'The company is selling scooters.'], 'Have / has + participe passé.']
  ],

  'verbes-irreguliers': [
    ['Le past simple de « buy » est…', ['bought', 'buyed', 'brought', 'buy'], 'buy, bought, bought.'],
    ['Le participe passé de « write » est…', ['written', 'wrote', 'writed', 'writen'], 'write, wrote, written.'],
    ['Le participe passé de « take » est…', ['taken', 'took', 'taked', 'take'], 'take, took, taken.'],
    ['Quelle question est correcte ?', ['Did he buy a car?', 'Did he bought a car?', 'Does he bought a car?', 'Did he buys a car?'], 'Après did, base verbale.'],
    ['Quelle question est correcte ?', ['Has she written the report?', 'Has she wrote the report?', 'Has she write the report?', 'Did she written the report?'], 'Have / has + participe passé, même dans la question.'],
    ['Le past simple de « stop » s’écrit…', ['stopped', 'stoped', 'stopt', 'stopping'], 'Consonne finale doublée.'],
    ['Le past simple de « try » s’écrit…', ['tried', 'tryed', 'tryd', 'trys'], 'Le y devient ied.'],
    ['« Look forward to » signifie…', ['Avoir hâte de', 'Regarder devant', 'Chercher', 'Admirer'], ''],
    ['« Look for » signifie…', ['Chercher', 'Regarder', 'Ressembler à', 'Mépriser'], 'Look at = regarder.'],
    ['« Look up to someone » signifie…', ['Admirer quelqu’un', 'Mépriser quelqu’un', 'Chercher quelqu’un', 'Ressembler à quelqu’un'], 'Look down on = mépriser.'],
    ['La négation de « The project was successful » est…', ['The project wasn’t successful.', 'The project didn’t be successful.', 'The project didn’t was successful.', 'The project not was successful.'], 'Be ne prend pas did.']
  ],

  'passif': [
    ['Comment se forme le passif ?', ['BE + participe passé', 'HAVE + participe passé', 'BE + V-ing', 'DO + base verbale'], 'Le temps se met sur BE.'],
    ['Le passif de « sells » est…', ['is sold', 'was sold', 'has sold', 'is selling'], ''],
    ['Le passif de « is selling » est…', ['is being sold', 'is sold', 'has been sold', 'was selling'], ''],
    ['Le passif de « has sold » est…', ['has been sold', 'has be sold', 'was sold', 'is sold'], ''],
    ['« We offer free delivery » au passif :', ['Free delivery is offered.', 'Free delivery was offer.', 'Free delivery is offering.', 'Free delivery has offer.'], 'Le COD devient sujet ; présent → is + PP.'],
    ['Quelle phrase est au passif ?', ['The campaign has been approved.', 'The manager has approved the campaign.', 'The company launched a new product.', 'Customers buy these products online.'], ''],
    ['Quand utilise-t-on « by » au passif ?', ['Seulement si préciser qui fait l’action est utile', 'Toujours', 'Jamais', 'Seulement au futur'], ''],
    ['« My order was delivered yesterday » : pourquoi le passif ?', ['On ne sait pas qui a fait l’action', 'C’est une habitude', 'C’est une action en cours', 'Le sujet est pluriel'], ''],
    ['Le pluriel de « that » est…', ['those', 'these', 'thats', 'this'], 'This / these (proche), that / those (éloigné).'],
    ['Le passif de « can sell » est…', ['can be sold', 'can sold', 'can been sold', 'can is sold'], '']
  ]
};
