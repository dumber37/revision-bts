// Management de l'équipe commerciale (E6)

R.fiche({
  id: 'formation',
  matiere: 'management',
  titre: 'La formation des salariés',
  resume: 'Obligation de l’employeur, besoins, matrice des compétences, modalités, plan et coût, évaluation.',
  date: '2026-10-07',
  contenu: `
    <div class="retenir">C'est une <b>obligation de l'employeur</b> (art. L6321-1 du Code du travail) : adapter les salariés à leur poste et maintenir leur capacité à occuper un emploi.</div>
    <ol class="etapes">
      <li><b>Identifier les besoins</b><p>Besoins individuels et collectifs : l'écart entre les compétences actuelles et celles attendues, vendeur par vendeur.</p></li>
      <li><b>Choisir les modalités</b><p>Interne, externe ou à distance (synchrone ou asynchrone).</p></li>
      <li><b>Construire le plan</b><p>Toutes les actions de formation prévues sur l'année, avec leur coût.</p></li>
      <li><b>Évaluer</b><p>À chaud, à la fin de la formation, puis à froid, quelque temps après.</p></li>
    </ol>

    <h2>1. Repérer et hiérarchiser les besoins</h2>
    <div class="cartes">
      <div><b>Ce qui crée un besoin</b><p>Nouvelle concurrence, nouvelle méthode de vente, nouveaux modes de consommation, lancement d'un nouveau produit.</p></div>
      <div><b>Outils de repérage</b><p>Entretien régulier avec le salarié, observation sur le poste (accueil, écoute, conseil), entretien professionnel (évolution).</p></div>
    </div>
    <h3>La matrice des compétences</h3>
    <p>Elle sert à hiérarchiser les actions de formation.</p>
    <table>
      <tr><th>Niveau du salarié</th><th>Action</th></tr>
      <tr><td>Maîtrisée</td><td>Pas de formation prioritaire</td></tr>
      <tr><td>Partiellement maîtrisée</td><td>Formation ou accompagnement ciblé</td></tr>
      <tr><td>Non maîtrisée (nouvelle)</td><td>Formation à prévoir</td></tr>
    </table>

    <h2>2. Les modalités</h2>
    <table>
      <tr><th>Modalité</th><th>Principe</th><th>À retenir</th></tr>
      <tr><td>Interne</td><td>Formateur salarié de l'entreprise</td><td>Connaît l'entreprise, adaptée aux besoins, coût modéré</td></tr>
      <tr><td>Externe</td><td>Organisme de formation, en présentiel</td><td>Experts pédagogues ; bien cadrer activité, problématique, durée, lieu, budget</td></tr>
      <tr><td>À distance, synchrone</td><td>Tous connectés au même moment</td><td>Formation sur le lieu de travail</td></tr>
      <tr><td>À distance, asynchrone</td><td>Vidéos, logiciel, serious game ; échanges par mail ou forum</td><td>Se former quand on le souhaite</td></tr>
    </table>

    <h2>3. Le plan de formation et son coût</h2>
    <p>Un <b>tableau annuel</b> établi par le manager de l'unité commerciale. Il recense : les besoins individuels et collectifs, les actions prévues et leurs objectifs, les salariés concernés, les modalités (interne ou externe), la durée et le coût de chaque formation.</p>
    <div class="cartes">
      <div><b>Coût d'une formation interne</b><p>Salaire du formateur (selon les heures dispensées) + frais d'organisation.</p></div>
      <div><b>Coût d'une formation externe</b><p>Transport, hébergement, repas des stagiaires, supports et matériel.</p></div>
    </div>

    <h2>4. Évaluer : à chaud puis à froid</h2>
    <table>
      <tr><th></th><th>Quand ?</th><th>Quoi ?</th></tr>
      <tr><td><b>À chaud</b></td><td>À la fin de la formation</td><td>Bilan de l'organisation, du matériel, des contenus, de la pédagogie et de l'atteinte des objectifs fixés.</td></tr>
      <tr><td><b>À froid</b></td><td>Quelque temps après</td><td>Mesure des retombées pour les salariés : l'efficacité réelle de la formation.</td></tr>
    </table>
    <div class="retenir">Une formation peut être interne, externe ou à distance, et son efficacité doit toujours être évaluée.</div>
  `
});

R.fiche({
  id: 'evaluer-motivation',
  matiere: 'management',
  titre: 'Évaluer la motivation de l’équipe',
  resume: 'Définition, indicateurs de performance et sociaux, enquêtes, entretien individuel.',
  date: '2026-09-25',
  contenu: `
    <div class="retenir">La <b>motivation</b> est une force plus ou moins consciente qui pousse un individu à agir, donc à s'impliquer dans son travail.
    La mesurer permet de fidéliser les salariés et de limiter le turn-over.</div>
    <h2>Les 4 outils de mesure</h2>
    <div class="cartes">
      <div><b>Indicateurs de performance</b><p>Tableau de bord par vendeur : repère les vendeurs motivés et ceux en difficulté.</p></div>
      <div><b>Indicateurs sociaux</b><p>Absentéisme, arrêts maladie, accidents du travail, retards, conflits, turn-over.</p></div>
      <div><b>Enquêtes de satisfaction</b><p>Auprès des salariés. Labels de bien-être : Happywork, Great Place to Work.</p></div>
      <div><b>Entretien individuel</b><p>Une fois par an : bilan des performances, salaire, futurs objectifs, état de la motivation.</p></div>
    </div>
  `
});

R.fiche({
  id: 'facteurs-motivation',
  matiere: 'management',
  titre: 'Facteurs de motivation, Herzberg et Maslow',
  resume: 'Facteurs intrinsèques et extrinsèques, facteurs d’hygiène et facteurs moteurs, pyramide des besoins.',
  date: '2026-09-25',
  contenu: `
    <table>
      <tr><th>Internes (intrinsèques)</th><th>Externes (extrinsèques)</th></tr>
      <tr>
        <td>Contenu du travail, reconnaissance, promotions, sentiment de participer au développement de l'unité.</td>
        <td>Rémunération, stabilité de l'emploi, statut du poste, conditions de travail, relations entre collègues, ambiance, avantages en nature (voiture, repas, mutuelle).</td>
      </tr>
      <tr><td><b>Herzberg</b> : facteurs moteurs.<br><b>Maslow</b> : estime et accomplissement de soi.</td>
          <td><b>Herzberg</b> : facteurs d'hygiène.<br><b>Maslow</b> : besoins physiologiques, sécurité, appartenance.</td></tr>
      <tr><td><b>Ils motivent vraiment.</b></td><td><b>Ils ne motivent pas vraiment, mais s'ils manquent, ils démotivent.</b></td></tr>
    </table>

    <h2>La pyramide de Maslow</h2>
    <p>On ne passe à l'étage du dessus que lorsque celui du dessous est satisfait.</p>
    <ol class="pyramide">
      <li><b>Accomplissement</b><p>se réaliser, progresser. Au travail : missions qui font grandir, évolution de carrière. Facteur interne.</p></li>
      <li><b>Estime</b><p>être reconnu. Au travail : félicitations, promotions, responsabilités. Facteur interne.</p></li>
      <li><b>Appartenance</b><p>faire partie d'un groupe. Au travail : relations entre collègues, ambiance. Facteur externe.</p></li>
      <li><b>Sécurité</b><p>être protégé. Au travail : stabilité de l'emploi, conditions de travail sûres. Facteur externe.</p></li>
      <li><b>Physiologiques</b><p>manger, dormir, se loger. Au travail : une rémunération suffisante pour vivre. Facteur externe.</p></li>
    </ol>
    <div class="attention">Herzberg et Maslow ne sont pas dans le cours : ils sont ajoutés pour l'examen.</div>
  `
});

R.fiche({
  id: 'stimuler-animer',
  matiere: 'management',
  titre: 'Stimuler et animer l’équipe',
  resume: 'Rémunération, challenge, concours, récompenses, et les 6 leviers pour animer l’équipe.',
  date: '2026-09-25',
  contenu: `
    <h2>Stimuler par la rémunération</h2>
    <p>Stimuler, c'est relancer la motivation, pousser à l'action et augmenter l'engagement.</p>
    <table>
      <tr><th>Type</th><th>Objectif</th><th>Exemples</th></tr>
      <tr><td>Fixe</td><td>Sécuriser, rémunérer les compétences</td><td>Selon qualification, niveau, temps de travail, ancienneté</td></tr>
      <tr><td>Variable collective</td><td>Récompenser la performance collective</td><td>Primes d'objectifs, intéressement</td></tr>
      <tr><td>Variable individuelle</td><td>Récompenser la performance individuelle</td><td>Primes et commissions (ventes, marge, nouveaux clients)</td></tr>
      <tr><td>Autres</td><td>Fidéliser</td><td>Épargne salariale, actionnariat, mutuelle, avantages en nature</td></tr>
    </table>

    <h2>Challenge ou concours ?</h2>
    <div class="cartes">
      <div><b>Le challenge</b><p>Opération ponctuelle avec un objectif sur une période. Récompense individuelle ou collective, implique beaucoup de salariés. Budget variable selon les objectifs atteints.</p></div>
      <div><b>Le concours</b><p>Seuls les meilleurs sont récompensés, selon des critères fixés dans un règlement. Forte incitation, mais risque de démotiver s'il y a peu de gagnants.</p></div>
    </div>
    <h3>Les récompenses</h3>
    <p>Elles doivent avoir de la valeur et faire « rêver » le vendeur.</p>
    <div class="cartes">
      <div><b>Argent</b><p>Une somme assez élevée.</p></div>
      <div><b>Bon d'achat</b><p>Chèque-cadeau.</p></div>
      <div><b>Matériel</b><p>Smartphone, vélo…</p></div>
      <div><b>Expérience</b><p>Voyage, spa, match.</p></div>
    </div>

    <h2>Animer l'équipe commerciale : 6 leviers</h2>
    <div class="cartes">
      <div><b>Esprit du manager</b><p>Créer une dynamique positive : cohésion et sentiment d'appartenance, selon ses valeurs.</p></div>
      <div><b>Bien-être</b><p>Conditions de travail, santé, ambiance, équilibre vie pro et vie perso (ex. crèche d'entreprise).</p></div>
      <div><b>Communication</b><p>Descendante (manager vers vendeurs) et ascendante (vendeurs vers manager) : crée un climat de confiance.</p></div>
      <div><b>Réunions</b><p>Résultats, points forts et à améliorer ; les vendeurs s'expriment et participent aux décisions.</p></div>
      <div><b>Événements</b><p>Séminaires fédérateurs : esprit d'équipe et cohésion.</p></div>
      <div><b>Délégation</b><p>Management participatif : confier des responsabilités motive et favorise la créativité.</p></div>
    </div>
  `
});

R.fiche({
  id: 'remuneration',
  matiere: 'management',
  titre: 'La rémunération et les calculs de paie',
  resume: '6 qualités, fixe/commission/prime, éléments périphériques, SMIC, heures sup, brut, net, cotisations, calculatrice.',
  date: '2026-10-07',
  contenu: `
    <h2>Les 6 qualités d'un bon système</h2>
    <p>Récompenser les efforts des commerciaux tout en restant acceptable financièrement pour l'entreprise.</p>
    <div class="cartes">
      <div><b>Motivant</b><p>Pousse à vendre plus.</p></div>
      <div><b>Sécurisant</b><p>Assure un revenu minimum.</p></div>
      <div><b>Équitable</b><p>Respecte tous les commerciaux.</p></div>
      <div><b>Adapté</b><p>Cohérent avec la politique de l'entreprise et le marché.</p></div>
      <div><b>Stimulant</b><p>Récompense les efforts fournis.</p></div>
      <div><b>Simple</b><p>Facile à comprendre et à appliquer.</p></div>
    </div>

    <h2>Fixe, commission, prime</h2>
    <table>
      <tr><th></th><th>Fixe (sécurité)</th><th>Commission (résultats)</th><th>Prime (efforts)</th></tr>
      <tr><td>Principe</td><td>Versé quels que soient les résultats, selon formation, expérience et ancienneté</td><td>Montant par produit vendu, ou % (taux) sur les ventes, donc sur le CA</td><td>Somme versée à chaque commercial qui atteint un objectif, individuelle ou collective</td></tr>
      <tr><td>Avantage</td><td>Revenu minimum, permet les missions hors vente</td><td>Stimule les ventes ; versée seulement si l'objectif de CA est atteint</td><td>Rémunère le qualitatif</td></tr>
      <tr><td>Limite</td><td>Ne favorise pas les meilleurs vendeurs</td><td>—</td><td>Complexe, nombreux indicateurs</td></tr>
    </table>

    <h2>Avantages et éléments périphériques</h2>
    <p>Objectif : fidéliser les commerciaux et les impliquer dans les résultats de l'entreprise.</p>
    <div class="cartes">
      <div><b>Avantages en nature</b><p>Voiture, téléphone, ordinateur, remboursements de frais, chèques-cadeaux.</p></div>
      <div><b>Intéressement</b><p>Complément versé selon les résultats de l'entreprise.</p></div>
      <div><b>Participation</b><p>Part du bénéfice net. Obligatoire à partir de 50 salariés.</p></div>
      <div><b>Actionnariat</b><p>Plan d'épargne entreprise : portefeuille d'actions de l'entreprise.</p></div>
    </div>

    <h2>SMIC et heures supplémentaires</h2>
    <p><b>Le SMIC est dû.</b> Si le salarié est payé à la commission, une <b>avance sur commission</b> lui garantit ce minimum, avec une régularisation périodique.</p>
    <div class="chiffres">
      <div><b>Base mensuelle</b><strong>151,67 h</strong><span>35 h × 52 semaines ÷ 12 mois. Heures sup au-delà de 35 h par semaine (1 607 h par an).</span></div>
      <div><b>8 premières heures sup</b><strong>+25 %</strong><span>de la 36<sup>e</sup> à la 43<sup>e</sup> heure.</span></div>
      <div><b>À partir de la 44<sup>e</sup> heure</b><strong>+50 %</strong><span>ou repos compensateur.</span></div>
      <div><b>Exonération d'impôt</b><strong>7 500 €</strong><span>d'heures sup par an exonérés d'impôt sur le revenu.</span></div>
      <div><b>Cotisations salariales</b><strong>11,31 %</strong><span>exonérés sur les heures sup (cotisations vieillesse et veuvage).</span></div>
    </div>
    <div class="formule"><b>Taux horaire</b> = salaire mensuel ÷ 151,67<br><b>Heure supplémentaire</b> = taux horaire × (1 + 25 % ou 50 %)</div>

    <h2>Du salaire brut au salaire net</h2>
    <div class="formule"><b>Salaire brut</b> (fixe + commissions + primes) − <b>cotisations salariales</b> (retenues sur le salaire) = <b>salaire net</b></div>
    <div class="formule"><b>Salaire brut</b> (base de calcul des cotisations) + <b>cotisations patronales</b> (à la charge de l'employeur) = <b>coût pour l'employeur</b></div>
    <p>L'impôt sur le revenu est prélevé à la source sur le net à payer.</p>
    <div class="attention">
      <b>Attention, erreur dans le cours :</b> il écrit que les cotisations salariales sont « payées par l'entreprise ».
      C'est faux : elles sont prélevées sur le salaire, l'entreprise ne fait que les reverser.
    </div>

    <h2>Cotisations et bulletin de salaire</h2>
    <div class="cartes">
      <div><b>Bulletin de salaire</b><p>Remis à chaque période de travail, le plus souvent chaque mois : c'est une obligation légale de l'entreprise.</p></div>
      <div><b>Calcul des cotisations</b><p>Un % du brut, ou du salaire plafonné (montant fixé par la Sécurité sociale) si le brut le dépasse.</p></div>
      <div><b>Frais et avantages</b><p>Remboursements de frais : pas de cotisations. Avantages en nature : soumis aux cotisations et imposables.</p></div>
      <div><b>À quoi servent-elles ?</b><p>Retraite, santé, chômage et allocations familiales.</p></div>
    </div>

    <h2>À toi de calculer</h2>
    <p>L'exemple chargé : un vendeur à 12 € de l'heure, 46 h dans la semaine, 8 000 € de CA à 2 % de commission. Change les chiffres pour t'entraîner.</p>
    <div data-calc="paie"></div>
  `
});

// Les deux PDF fusionnés, classés par thème : fmr-XX = « Formation, motivation, rémunération » (17 p.),
// management-XX = « Management de l'équipe commerciale » (9 p., sa page de garde est en double et n'est pas reprise).
R.diaporama({
  matiere: 'management', groupe: 'Formation, motivation, rémunération',
  pdf: [['PDF 17 p.', 'visuels/management/formation-motivation-remuneration.pdf'], ['PDF 9 p.', 'visuels/management/management-equipe.pdf']],
  pages: [
    ['Formation, motivation, rémunération : sommaire', null, 'fmr-01'],

    ['La formation : une obligation en 4 étapes', 'formation', 'fmr-02'],
    ['La formation des salariés', 'formation', 'management-02'],
    ['Repérer et hiérarchiser les besoins', 'formation', 'fmr-03'],
    ['Interne, externe ou à distance', 'formation', 'fmr-04'],
    ['Le plan de formation et son coût', 'formation', 'fmr-05'],
    ['Évaluer : à chaud puis à froid', 'formation', 'fmr-06'],

    ['Mesurer la motivation de l’équipe', 'evaluer-motivation', 'fmr-07'],
    ['Évaluer la motivation de l’équipe', 'evaluer-motivation', 'management-03'],
    ['Facteurs internes et externes (Herzberg, Maslow)', 'facteurs-motivation', 'fmr-08'],
    ['Facteurs internes et externes', 'facteurs-motivation', 'management-04'],
    ['Stimuler par la rémunération', 'stimuler-animer', 'fmr-09'],
    ['Stimuler l’équipe', 'stimuler-animer', 'management-05'],
    ['Challenge, concours et récompenses', 'stimuler-animer', 'fmr-10'],
    ['Animer l’équipe commerciale', 'stimuler-animer', 'fmr-11'],
    ['Animer l’équipe', 'stimuler-animer', 'management-06'],

    ['Les 6 qualités d’un bon système', 'remuneration', 'fmr-12'],
    ['Les composantes de la rémunération', 'remuneration', 'management-07'],
    ['Fixe, commission, prime', 'remuneration', 'fmr-13'],
    ['Avantages et éléments périphériques', 'remuneration', 'fmr-14'],
    ['SMIC et heures supplémentaires', 'remuneration', 'fmr-15'],
    ['Contraintes légales : temps de travail', 'remuneration', 'management-08'],
    ['Du salaire brut au salaire net', 'remuneration', 'fmr-16'],
    ['Brut, net et coût employeur', 'remuneration', 'management-09'],
    ['Cotisations et bulletin de salaire', 'remuneration', 'fmr-17']
  ]
});
