// Management de l'équipe commerciale (E6)

R.fiche({
  id: 'formation',
  matiere: 'management',
  titre: 'La formation des salariés',
  resume: 'Obligation de l’employeur, besoins, modalités, plan de formation, évaluation.',
  date: '2026-10-07',
  contenu: `
    <div class="retenir">C'est une <b>obligation de l'employeur</b> (art. L6321-1 du Code du travail) : il doit adapter ses salariés à leur poste.</div>
    <ol class="etapes">
      <li><b>Les besoins</b><p>Repérer l'écart entre les compétences actuelles et celles attendues, vendeur par vendeur. Sources : entretien annuel, résultats commerciaux, nouveaux produits ou outils, demandes des salariés.</p></li>
      <li><b>Les modalités</b><p>Formation interne (tuteur, manager) ou externe (organisme). Synchrone (en direct) ou asynchrone (e-learning, à son rythme).</p></li>
      <li><b>Le plan de formation</b><p>Fixer les objectifs, les sessions, le public concerné et le calendrier.</p></li>
      <li><b>L'évaluation</b><p><b>À chaud</b>, juste après la formation (questionnaire de satisfaction). <b>À froid</b>, plus tard, pour voir si elle est appliquée au poste.</p></li>
    </ol>
  `
});

R.fiche({
  id: 'evaluer-motivation',
  matiere: 'management',
  titre: 'Évaluer la motivation de l’équipe',
  resume: 'Définition, indicateurs de performance et sociaux, enquêtes, entretien annuel.',
  date: '2026-09-25',
  contenu: `
    <div class="retenir">La <b>motivation</b> est une force qui pousse à agir. Au travail, c'est la volonté de s'impliquer.
    La mesurer permet de fidéliser les salariés et de limiter le turn-over.</div>
    <h2>Les 4 outils de mesure</h2>
    <div class="cartes">
      <div><b>Indicateurs de performance</b><p>Le tableau de bord des ventes repère les vendeurs motivés et ceux en difficulté.</p></div>
      <div><b>Indicateurs sociaux</b><p>Absentéisme, arrêts maladie, accidents du travail, retards, conflits.</p></div>
      <div><b>Enquêtes et labels</b><p>Enquêtes de satisfaction internes. Labels de bien-être : Great Place to Work, Happywork.</p></div>
      <div><b>Entretien annuel</b><p>Bilan des performances, salaire, objectifs futurs et état de la motivation.</p></div>
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
      <tr><th>Intrinsèques (internes)</th><th>Extrinsèques (externes)</th></tr>
      <tr>
        <td>Liés au travail lui-même : contenu, reconnaissance, promotions, sentiment de contribuer.</td>
        <td>Liés à l'environnement : salaire, sécurité de l'emploi, statut, conditions, ambiance, avantages en nature.</td>
      </tr>
      <tr><td><b>Ils motivent vraiment.</b></td><td><b>Ils ne motivent pas, mais leur absence démotive.</b></td></tr>
    </table>

    <h2>Herzberg</h2>
    <p>Les facteurs extrinsèques sont les <b>facteurs d'hygiène</b>, les intrinsèques sont les <b>facteurs moteurs</b>.</p>

    <h2>La pyramide de Maslow</h2>
    <p>On ne passe à l'étage du dessus que lorsque celui du dessous est satisfait.</p>
    <ol class="pyramide">
      <li><b>Accomplissement</b><p>se réaliser, progresser. Au travail : missions qui font grandir, évolution de carrière.</p></li>
      <li><b>Estime</b><p>être reconnu. Au travail : félicitations, primes, responsabilités.</p></li>
      <li><b>Appartenance</b><p>faire partie d'un groupe. Au travail : bonne ambiance, esprit d'équipe.</p></li>
      <li><b>Sécurité</b><p>être protégé. Au travail : CDI, conditions de travail sûres.</p></li>
      <li><b>Physiologiques</b><p>manger, dormir, se loger. Au travail : un salaire suffisant pour vivre.</p></li>
    </ol>
    <div class="attention">Herzberg et Maslow ne sont pas dans le cours : ils sont ajoutés pour l'examen.</div>
  `
});

R.fiche({
  id: 'stimuler-animer',
  matiere: 'management',
  titre: 'Stimuler et animer l’équipe',
  resume: 'Rémunération, challenge, concours, récompenses, bien-être, communication, réunions.',
  date: '2026-09-25',
  contenu: `
    <h2>Stimuler l'équipe</h2>
    <p>Stimuler, c'est relancer la motivation et augmenter l'engagement.</p>
    <h3>La rémunération</h3>
    <ul>
      <li><b>Fixe</b> : sécurise et rémunère les compétences.</li>
      <li><b>Variable individuelle</b> : primes, commissions.</li>
      <li><b>Variable collective</b> : primes d'équipe, intéressement.</li>
      <li>Épargne salariale, mutuelle, avantages en nature.</li>
    </ul>
    <h3>Challenge ou concours ?</h3>
    <div class="cartes">
      <div><b>Le challenge</b><p>Tous ceux qui atteignent l'objectif gagnent. Limite : budget incertain.</p></div>
      <div><b>Le concours</b><p>Seuls les meilleurs gagnent. Limite : peut démotiver les autres.</p></div>
    </div>
    <p>Les récompenses doivent faire rêver : argent, chèques-cadeaux, objets, expériences (voyage, spa, match).</p>

    <h2>Animer l'équipe</h2>
    <p>Animer, c'est créer et entretenir une dynamique positive : cohésion et sentiment d'appartenance.</p>
    <div class="cartes">
      <div><b>Bien-être au travail</b><p>Conditions de travail, sécurité, santé, ambiance, équilibre vie pro et perso (ex. crèche d'entreprise).</p></div>
      <div><b>Communication interne</b><p>Descendante (manager vers vendeurs) et ascendante (vendeurs vers manager). Elle crée la confiance.</p></div>
      <div><b>Réunions</b><p>Partager les résultats et faire participer l'équipe aux décisions.</p></div>
    </div>
  `
});

R.fiche({
  id: 'remuneration',
  matiere: 'management',
  titre: 'La rémunération et les calculs de paie',
  resume: 'Composantes, temps de travail, SMIC, heures supplémentaires, brut, net, coût employeur, calculatrice.',
  date: '2026-10-07',
  contenu: `
    <h2>Les composantes</h2>
    <div class="cartes">
      <div><b>Fixe</b><p>Sécurise le salarié et rémunère ses compétences.</p></div>
      <div><b>Commissions</b><p>Un pourcentage sur les ventes réalisées.</p></div>
      <div><b>Primes</b><p>Versées si un objectif est atteint (chiffre d'affaires, panier moyen).</p></div>
      <div><b>Avantages en nature</b><p>Voiture, téléphone, tickets-restaurant.</p></div>
    </div>
    <div class="formule">Un bon système de rémunération est <b>équitable · adapté · stimulant · simple</b></div>

    <h2>Contraintes légales : temps de travail</h2>
    <div class="chiffres">
      <div><b>Durée légale</b><strong>35 h</strong><span>par semaine, soit 151,67 h par mois.</span></div>
      <div><b>Heures supplémentaires</b><strong>+25 %</strong><span>pour les 8 premières heures, puis +50 % au-delà.</span></div>
      <div><b>Salaire minimum</b><strong>SMIC</strong><span>Le salaire ne peut jamais passer sous ce plancher légal.</span></div>
    </div>
    <div class="formule"><b>Taux horaire</b> = salaire mensuel ÷ 151,67<br><b>Heure supplémentaire</b> = taux horaire × (1 + 25 % ou 50 %)</div>

    <h2>Brut, net et coût employeur</h2>
    <p>Fixe + commissions + primes = <b>salaire brut</b>. Il sert de base aux cotisations sociales (retraite, santé, chômage, allocations familiales).</p>
    <table>
      <tr><th>Cotisations</th><th>Qui les supporte</th><th>Effet</th></tr>
      <tr><td>Salariales</td><td>Le salarié (retenues sur son brut)</td><td>Net = brut − cotisations salariales</td></tr>
      <tr><td>Patronales</td><td>L'employeur</td><td>Coût employeur = brut + cotisations patronales</td></tr>
    </table>
    <div class="attention">
      <b>Attention, erreur dans le cours :</b> il écrit que les cotisations salariales sont « payées par l'entreprise ».
      C'est faux : elles sont prélevées sur le salaire, l'entreprise ne fait que les reverser.
    </div>

    <h2>À toi de calculer</h2>
    <p>L'exemple chargé : un vendeur à 12 € de l'heure, 46 h dans la semaine, 8 000 € de CA à 2 % de commission. Change les chiffres pour t'entraîner.</p>
    <div data-calc="paie"></div>
  `
});
