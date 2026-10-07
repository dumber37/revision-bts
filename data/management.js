// Management de l'équipe commerciale (E6)

R.fiche({
  id: 'formation',
  matiere: 'management',
  titre: 'La formation des salariés',
  resume: 'Obligation de l’employeur, besoins, modalités, plan de formation, évaluation.',
  date: '2026-10-07',
  contenu: `
    <div class="retenir">C'est une <b>obligation de l'employeur</b> (art. L6321-1 du Code du travail) : il doit adapter ses salariés à leur poste.</div>

    <h2>1. Les besoins</h2>
    <p>Repérer l'écart entre les compétences actuelles et celles attendues, vendeur par vendeur.
    Sources : entretien annuel, résultats commerciaux, nouveaux produits ou outils, demandes des salariés.</p>

    <h2>2. Les modalités</h2>
    <table>
      <tr><th>Critère</th><th>Possibilités</th></tr>
      <tr><td>Qui forme ?</td><td>Interne (tuteur, manager) ou externe (organisme)</td></tr>
      <tr><td>Quand ?</td><td>Synchrone (en direct) ou asynchrone (e-learning, à son rythme)</td></tr>
    </table>

    <h2>3. Le plan de formation</h2>
    <p>Fixer les objectifs, les sessions, le public concerné et le calendrier.</p>

    <h2>4. L'évaluation</h2>
    <ul>
      <li><b>À chaud</b> : juste après la formation (questionnaire de satisfaction).</li>
      <li><b>À froid</b> : plus tard, pour voir si elle est appliquée au poste.</li>
    </ul>
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
    <table>
      <tr><th>Outil</th><th>Ce qu'il montre</th></tr>
      <tr><td>Indicateurs de performance</td><td>Le tableau de bord des ventes repère les vendeurs motivés et ceux en difficulté.</td></tr>
      <tr><td>Indicateurs sociaux</td><td>Absentéisme, arrêts maladie, accidents du travail, retards, conflits.</td></tr>
      <tr><td>Enquêtes et labels</td><td>Enquêtes de satisfaction internes. Labels de bien-être : Great Place to Work, Happywork.</td></tr>
      <tr><td>Entretien annuel</td><td>Bilan des performances, salaire, objectifs futurs et état de la motivation.</td></tr>
    </table>
  `
});

R.fiche({
  id: 'facteurs-motivation',
  matiere: 'management',
  titre: 'Facteurs de motivation, Herzberg et Maslow',
  resume: 'Facteurs intrinsèques et extrinsèques, facteurs d’hygiène et facteurs moteurs.',
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

    <h2>Les théories</h2>
    <p><b>Herzberg</b> : les facteurs extrinsèques sont les <b>facteurs d'hygiène</b>, les intrinsèques sont les <b>facteurs moteurs</b>.</p>
    <p><b>Maslow</b> : pyramide des besoins, du bas vers le haut : physiologiques, sécurité, appartenance, estime, accomplissement.</p>
    <div class="attention">Herzberg et Maslow ne sont pas dans le cours : ils sont ajoutés parce qu'ils valorisent une copie d'examen.</div>
  `
});

R.fiche({
  id: 'stimuler-animer',
  matiere: 'management',
  titre: 'Stimuler et animer l’équipe',
  resume: 'Rémunération, challenge, concours, récompenses, bien-être, communication, réunions.',
  date: '2026-09-25',
  contenu: `
    <h2>Stimuler</h2>
    <p>Stimuler, c'est relancer la motivation et augmenter l'engagement.</p>
    <h3>La rémunération</h3>
    <ul>
      <li><b>Fixe</b> : sécurise et rémunère les compétences.</li>
      <li><b>Variable individuelle</b> : primes, commissions.</li>
      <li><b>Variable collective</b> : primes d'équipe, intéressement.</li>
      <li>Épargne salariale, mutuelle, avantages en nature.</li>
    </ul>
    <h3>Challenge ou concours</h3>
    <table>
      <tr><th></th><th>Qui gagne ?</th><th>Limite</th></tr>
      <tr><td><b>Challenge</b></td><td>Tous ceux qui atteignent l'objectif</td><td>Budget incertain</td></tr>
      <tr><td><b>Concours</b></td><td>Seuls les meilleurs</td><td>Peut démotiver les autres</td></tr>
    </table>
    <p>Les récompenses doivent faire rêver : argent, chèques-cadeaux, objets, expériences (voyage, spa, match).</p>

    <h2>Animer</h2>
    <p>Animer, c'est créer et entretenir une dynamique positive : cohésion et sentiment d'appartenance.</p>
    <ul>
      <li><b>Bien-être au travail</b> : conditions de travail, sécurité, santé, ambiance, équilibre vie pro et perso (ex. crèche d'entreprise).</li>
      <li><b>Communication interne</b> : descendante (manager vers vendeurs) et ascendante (vendeurs vers manager). Elle crée la confiance.</li>
      <li><b>Réunions</b> : partager les résultats et faire participer l'équipe aux décisions.</li>
    </ul>
  `
});

R.fiche({
  id: 'remuneration',
  matiere: 'management',
  titre: 'La rémunération et les calculs de paie',
  resume: 'Composantes, temps de travail, SMIC, heures supplémentaires, brut, net, coût employeur.',
  date: '2026-10-07',
  contenu: `
    <h2>Les composantes</h2>
    <table>
      <tr><th>Composante</th><th>Rôle</th></tr>
      <tr><td>Fixe</td><td>Sécurise le salarié et rémunère ses compétences.</td></tr>
      <tr><td>Commissions</td><td>Un pourcentage sur les ventes réalisées.</td></tr>
      <tr><td>Primes</td><td>Versées si un objectif est atteint (chiffre d'affaires, panier moyen).</td></tr>
      <tr><td>Avantages en nature</td><td>Voiture, téléphone, tickets-restaurant.</td></tr>
    </table>
    <div class="retenir">Un bon système de rémunération est <b>équitable, adapté, stimulant et simple</b>.</div>

    <h2>Contraintes légales : temps de travail</h2>
    <ul>
      <li><b>Durée légale</b> : 35 h par semaine, soit 151,67 h par mois.</li>
      <li><b>Heures supplémentaires</b> : +25 % pour les 8 premières (36<sup>e</sup> à 43<sup>e</sup> heure), puis +50 % au-delà.</li>
      <li><b>SMIC</b> : le salaire ne peut jamais passer sous ce plancher légal.</li>
    </ul>
    <div class="formule">Taux horaire = salaire mensuel ÷ 151,67</div>
    <div class="formule">Heure supplémentaire = taux horaire × (1 + 25 % ou 50 %)</div>

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

    <h2>Exemple complet</h2>
    <p class="exemple">Un vendeur payé 12 € de l'heure travaille 46 h dans la semaine et fait 8 000 € de CA avec 2 % de commission. On prend 22 % de cotisations salariales et 42 % de cotisations patronales.</p>
    <table>
      <tr><th>Élément</th><th>Calcul</th><th>Montant</th></tr>
      <tr><td>35 h normales</td><td>35 × 12</td><td>420,00 €</td></tr>
      <tr><td>8 h à +25 %</td><td>8 × 12 × 1,25</td><td>120,00 €</td></tr>
      <tr><td>3 h à +50 %</td><td>3 × 12 × 1,5</td><td>54,00 €</td></tr>
      <tr><td>Commission</td><td>8 000 × 2 %</td><td>160,00 €</td></tr>
      <tr><td><b>Brut</b></td><td></td><td><b>754,00 €</b></td></tr>
      <tr><td>Net</td><td>754 × (1 − 0,22)</td><td>588,12 €</td></tr>
      <tr><td>Coût employeur</td><td>754 × (1 + 0,42)</td><td>1 070,68 €</td></tr>
    </table>
  `
});
