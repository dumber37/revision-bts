// Outils : mes points faibles, exercices de calcul à l'infini, transfert de progression, simulateur d'oral.
var Outils = (function () {
  'use strict';

  var esc = Jeu.esc;
  function fichesDe(id) { return R.fiches.filter(function (f) { return f.matiere === id; }); }
  function fil(txt) { return '<nav class="fil"><a href="#/">Matières</a> › ' + esc(txt) + '</nav>'; }

  // ---------- Mes points faibles ----------

  function pageBilan(app) {
    document.title = 'Mes points faibles · Révisions BTS MCO';
    var E = Jeu.etat(), pf = E.parFiche || {};
    var lignes = R.fiches.map(function (f) {
      var t = pf[f.id] || [0, 0], best = E.best['fiche:' + f.id];
      return { f: f, b: t[0], n: t[1], taux: t[1] ? t[0] / t[1] : null, lue: !!E.lues[f.id], best: best };
    });
    var testees = lignes.filter(function (l) { return l.n >= 3; });
    var prio = testees.slice().sort(function (a, b) { return a.taux - b.taux; }).filter(function (l) { return l.taux < 0.8; }).slice(0, 3);
    var jamais = lignes.filter(function (l) { return !l.n; });
    var totB = lignes.reduce(function (s, l) { return s + l.b; }, 0), totN = lignes.reduce(function (s, l) { return s + l.n; }, 0);

    function couleur(l) { return l.taux === null ? 'gris' : l.taux >= 0.8 ? 'vert' : l.taux >= 0.6 ? 'orange' : 'rouge'; }
    function ligne(l) {
      var pct = l.taux === null ? 0 : Math.round(l.taux * 100);
      return '<a class="pf-ligne ' + couleur(l) + '" href="#/' + l.f.matiere + '/' + l.f.id + '">' +
        '<span class="pf-titre">' + esc(l.f.titre) + (l.lue ? ' <small>✓ lue</small>' : '') + '</span>' +
        '<span class="pf-barre"><i style="width:' + pct + '%"></i></span>' +
        '<span class="pf-taux">' + (l.taux === null ? (l.n ? l.b + '/' + l.n : '—') : pct + ' %') + '</span></a>';
    }

    app.innerHTML = fil('Mes points faibles') +
      '<section class="defi defi-accueil"><div class="defi-eclair">' + Icone('cible') + '</div><h1>Mes points faibles</h1>' +
        '<p>Ton taux de bonnes réponses par chapitre, sur tous les QCM, défis et révisions.</p>' +
        (totN ? '<p class="pf-global">Réussite globale : <b>' + Math.round(totB / totN * 100) + ' %</b> sur ' + totN + ' réponses</p>' : '') +
      '</section>' +
      (prio.length ? '<h2 class="titre-section">À travailler en priorité</h2><div class="pf-prio">' + prio.map(function (l) {
        var m = Activites.matiere(l.f.matiere);
        return '<div class="pf-carte" style="--c:' + m.couleur + '"><span class="defi-tag">' + esc(m.nom) + '</span><b>' + esc(l.f.titre) + '</b>' +
          '<span class="pf-carte-taux">' + Math.round(l.taux * 100) + ' % de réussite (' + l.b + '/' + l.n + ')</span>' +
          '<span class="pf-actions"><a href="#/' + l.f.matiere + '/' + l.f.id + '">' + Icone('livre') + ' Relire la fiche</a><a href="#/' + l.f.matiere + '/cartes">' + Icone('cartes') + ' Cartes mémo</a><a href="#/revoir">' + Icone('repeter') + ' Mes erreurs</a></span></div>';
      }).join('') + '</div>' : (totN ? '<p class="vide">Aucun chapitre sous 80 % (avec au moins 3 réponses).</p>' : '<p class="vide">Fais quelques QCM ou un Défi éclair : ton bilan apparaîtra ici.</p>')) +
      R.matieres.filter(function (m) { return fichesDe(m.id).length; }).map(function (m) {
        return '<h2 class="titre-section titre-matiere" style="--c:' + m.couleur + '">' + esc(m.nom) + '</h2><div class="pf-liste">' +
          lignes.filter(function (l) { return l.f.matiere === m.id; }).map(ligne).join('') + '</div>';
      }).join('') +
      (jamais.length && totN ? '<p class="astuce">Pas encore testé : ' + jamais.map(function (l) { return esc(l.f.titre); }).join(', ') + '.</p>' : '') +
      '<p class="pf-legende"><span class="vert">● 80 % et +</span><span class="orange">● 60 à 79 %</span><span class="rouge">● moins de 60 %</span></p>';
  }

  // ---------- Exercices de calcul à l'infini (fil rouge Sport'Tours) ----------

  function alea(a, b, pas) { pas = pas || 1; return Math.round((a + Math.random() * (b - a)) / pas) * pas; }
  function choisir(t) { return t[Math.floor(Math.random() * t.length)]; }
  function arr(n, d) { var p = Math.pow(10, d == null ? 2 : d); return Math.round(n * p) / p; }
  function fr(n, d) { return Number(n).toLocaleString('fr-FR', { minimumFractionDigits: d == null ? 2 : d, maximumFractionDigits: d == null ? 2 : d }); }
  var PRODUITS = ['gourdes', 'ballons de foot', 'raquettes de padel', 'chaussures de running', 'sacs de sport', 'maillots de basket', 'tapis de yoga', 'casques de vélo'];
  var NOMS_F = ['Sportex', 'Ballon+', 'Kipa', 'Atlas Sport', 'Rebond', 'NordFit', 'Velox'];

  var EXOS = {
    variation: { titre: 'Pourcentage de variation', gen: function () {
      var a = alea(30000, 80000, 500), v = choisir([-15, -12, -8, -5, 4, 6, 10, 12, 18, 25]), b = Math.round(a * (1 + v / 100));
      var p = (b - a) / a * 100;
      return { situation: 'Léa compare deux mois. Le CA de Sport’Tours passe de <b>' + fr(a, 0) + ' €</b> à <b>' + fr(b, 0) + ' €</b>. Quelle est l’évolution en % ?',
        champs: [['Variation (%)', p, '%']],
        correction: '(' + fr(b, 0) + ' − ' + fr(a, 0) + ') ÷ ' + fr(a, 0) + ' × 100 = <b>' + fr(p) + ' %</b>' + (p < 0 ? ' : c’est une baisse.' : ' : c’est une hausse.') };
    } },
    elasticite: { titre: 'Élasticité-prix', gen: function () {
      var prod = choisir(PRODUITS), p0 = alea(8, 60, 0.5), vp = choisir([-20, -15, -10, -5, 5, 10, 15, 20]), p1 = arr(p0 * (1 + vp / 100));
      var d0 = alea(400, 3000, 50), cible = choisir([0.4, 0.6, 0.8, 1.5, 2, 2.5, 3]), d1 = Math.round(d0 * (1 - Math.sign(vp) * cible * Math.abs(vp) / 100));
      var xp = (p1 - p0) / p0 * 100, xd = (d1 - d0) / d0 * 100, e = Math.abs(xd / xp);
      var nature = Math.abs(e - 1) < 0.05 ? 'unitaire' : e > 1 ? 'très élastique' : 'peu élastique';
      return { situation: 'Léa fait passer le prix des ' + prod + ' de <b>' + fr(p0) + ' €</b> à <b>' + fr(p1) + ' €</b>. Sur le trimestre, les ventes passent de <b>' + fr(d0, 0) + '</b> à <b>' + fr(d1, 0) + '</b>.',
        champs: [['% variation du prix', xp, '%'], ['% variation de la demande', xd, '%'], ['Élasticité E (valeur absolue)', e, '']],
        choix: ['La demande est…', nature, ['très élastique', 'peu élastique', 'unitaire']],
        correction: '% prix = (' + fr(p1) + ' − ' + fr(p0) + ') ÷ ' + fr(p0) + ' × 100 = <b>' + fr(xp) + ' %</b><br>' +
          '% demande = (' + fr(d1, 0) + ' − ' + fr(d0, 0) + ') ÷ ' + fr(d0, 0) + ' × 100 = <b>' + fr(xd) + ' %</b><br>' +
          'E = |' + fr(xd) + ' ÷ ' + fr(xp) + '| = <b>' + fr(e) + '</b> → demande <b>' + nature + '</b>.' };
    } },
    paie: { titre: 'Paie : brut, net, coût employeur', gen: function () {
      var taux = alea(12, 16, 0.5), h = alea(36, 47), ca = alea(1000, 5000, 250), com = choisir([1, 1.5, 2, 2.5, 3]);
      var n = Math.min(h, 35), h25 = Math.max(0, Math.min(h, 43) - 35), h50 = Math.max(0, h - 43);
      var brut = n * taux + h25 * taux * 1.25 + h50 * taux * 1.5 + ca * com / 100, net = brut * 0.78, cout = brut * 1.42;
      return { situation: 'Semaine chargée pour Hugo : <b>' + h + ' h</b> à <b>' + fr(taux) + ' €</b> brut de l’heure, <b>' + fr(ca, 0) + ' €</b> de ventes avec <b>' + fr(com, 1) + ' %</b> de commission. Cotisations : 22 % salariales, 42 % patronales.',
        champs: [['Salaire brut (€)', brut, '€'], ['Salaire net (€)', net, '€'], ['Coût employeur (€)', cout, '€']],
        correction: '35 h × ' + fr(taux) + ' = ' + fr(n * taux) + ' €' +
          (h25 ? '<br>' + h25 + ' h × ' + fr(taux) + ' × 1,25 = ' + fr(h25 * taux * 1.25) + ' €' : '') +
          (h50 ? '<br>' + h50 + ' h × ' + fr(taux) + ' × 1,5 = ' + fr(h50 * taux * 1.5) + ' €' : '') +
          '<br>Commission : ' + fr(ca, 0) + ' × ' + fr(com, 1) + ' % = ' + fr(ca * com / 100) + ' €' +
          '<br><b>Brut = ' + fr(brut) + ' €</b><br>Net = brut × (1 − 22 %) = <b>' + fr(net) + ' €</b><br>Coût employeur = brut × (1 + 42 %) = <b>' + fr(cout) + ' €</b>' };
    } },
    horaire: { titre: 'Taux horaire et heures sup', gen: function () {
      var s = alea(1800, 2600, 10), th = s / 151.67;
      return { situation: 'Un nouveau vendeur est embauché à <b>' + fr(s, 0) + ' €</b> brut par mois pour 35 h par semaine. Quel est son taux horaire, et combien rapporte une heure sup à +25 % ?',
        champs: [['Taux horaire (€)', th, '€'], ['Heure sup à +25 % (€)', th * 1.25, '€']],
        correction: 'Taux horaire = ' + fr(s, 0) + ' ÷ 151,67 = <b>' + fr(th) + ' €</b><br>Heure sup = ' + fr(th) + ' × 1,25 = <b>' + fr(th * 1.25) + ' €</b>' };
    } },
    marge: { titre: 'Marge, taux et coefficient', gen: function () {
      var prod = choisir(PRODUITS), pa = alea(10, 120), k = choisir([1.4, 1.5, 1.6, 1.75, 1.8, 2, 2.2]), pv = arr(pa * k), tva = 20; // articles de sport : taux normal
      var m = pv - pa, ttc = pv * (1 + tva / 100);
      return { situation: 'Léa achète des ' + prod + ' <b>' + fr(pa) + ' € HT</b> pièce et les revend <b>' + fr(pv) + ' € HT</b> (TVA ' + fr(tva, tva % 1 ? 1 : 0) + ' %).',
        champs: [['Marge (€)', m, '€'], ['Taux de marge (%)', m / pa * 100, '%'], ['Taux de marque (%)', m / pv * 100, '%'], ['Coefficient multiplicateur', ttc / pa, '']],
        correction: 'Marge = ' + fr(pv) + ' − ' + fr(pa) + ' = <b>' + fr(m) + ' €</b><br>Taux de marge = ' + fr(m) + ' ÷ ' + fr(pa) + ' × 100 = <b>' + fr(m / pa * 100) + ' %</b><br>' +
          'Taux de marque = ' + fr(m) + ' ÷ ' + fr(pv) + ' × 100 = <b>' + fr(m / pv * 100) + ' %</b><br>PV TTC = ' + fr(pv) + ' × ' + fr(1 + tva / 100, 3) + ' = ' + fr(ttc) + ' € ; coefficient = ' + fr(ttc) + ' ÷ ' + fr(pa) + ' = <b>' + fr(ttc / pa) + '</b>' };
    } },
    scoring: { titre: 'Scoring fournisseurs', gen: function () {
      var crit = ['Qualité', 'Prix', 'Délais'], coefs = Jeu.melanger([3, 2, 1]), noms = Jeu.melanger(NOMS_F).slice(0, 3), notes, tot, max;
      for (var essai = 0; essai < 50; essai++) {
        notes = noms.map(function () { return crit.map(function () { return alea(1, 5); }); });
        tot = notes.map(function (n) { return n.reduce(function (s, v, i) { return s + v * coefs[i]; }, 0); });
        max = Math.max.apply(null, tot);
        if (tot.filter(function (t) { return t === max; }).length === 1) break;
      }
      var gagnant = noms[tot.indexOf(max)];
      return { situation: 'Léa choisit un fournisseur de ballons. Coefficients : ' + crit.map(function (c, i) { return c + ' ×' + coefs[i]; }).join(', ') + '.' +
          '<div class="table-wrap"><table class="calc-table"><tr><th>Fournisseur</th>' + crit.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '</tr>' +
          noms.map(function (n, j) { return '<tr><td>' + n + '</td>' + notes[j].map(function (v) { return '<td>' + v + '/5</td>'; }).join('') + '</tr>'; }).join('') + '</table></div>',
        champs: noms.map(function (n, j) { return ['Note pondérée de ' + n, tot[j], '']; }),
        choix: ['Fournisseur retenu', gagnant, noms],
        correction: noms.map(function (n, j) { return n + ' : ' + notes[j].map(function (v, i) { return v + ' × ' + coefs[i]; }).join(' + ') + ' = <b>' + tot[j] + '</b>'; }).join('<br>') + '<br>On retient <b>' + gagnant + '</b>.' };
    } },
    prixvente: { titre: 'Prix de vente et taux de marque', gen: function () {
      var prod = choisir(PRODUITS), pa = alea(12, 90), t = choisir([25, 30, 35, 36, 40, 45, 50]);
      var pv = pa / (1 - t / 100), faux = pa * (1 + t / 100);
      return { situation: 'Léa référence des ' + prod + ' achetés <b>' + fr(pa, 0) + ' € HT</b>. La directrice veut un <b>taux de marque de ' + t + ' %</b>. Quel prix de vente HT fixer ? Et quel prix fixerait un vendeur qui confond avec le taux de marge ?',
        champs: [['Prix de vente HT (taux de marque)', pv, '€'], ['Prix HT si on confond (taux de marge)', faux, '€'], ['Perte par article', pv - faux, '€']],
        correction: 'Le coût d’achat représente ' + (100 - t) + ' % du prix de vente : PV = ' + fr(pa, 0) + ' ÷ ' + fr(1 - t / 100) + ' = <b>' + fr(pv) + ' €</b><br>' +
          'Avec un taux de marge : ' + fr(pa, 0) + ' × ' + fr(1 + t / 100) + ' = <b>' + fr(faux) + ' €</b><br>Perte par article : ' + fr(pv) + ' − ' + fr(faux) + ' = <b>' + fr(pv - faux) + ' €</b>' };
    } },
    remises: { titre: 'Remises successives', gen: function () {
      var brut = alea(400, 5000, 50), r1 = choisir([5, 8, 10, 12, 15, 20]), r2 = choisir([2, 3, 5, 8, 10]);
      var net1 = brut * (1 - r1 / 100), net = net1 * (1 - r2 / 100), g = (brut - net) / brut * 100;
      return { situation: 'Un fournisseur accorde à Sport’Tours deux remises successives sur une commande de <b>' + fr(brut, 0) + ' € HT</b> : <b>' + r1 + ' %</b>, puis <b>' + r2 + ' %</b>.',
        champs: [['Net à payer HT (€)', net, '€'], ['Taux de remise global (%)', g, '%']],
        correction: 'Après la 1<sup>re</sup> remise : ' + fr(brut, 0) + ' × ' + fr(1 - r1 / 100) + ' = ' + fr(net1) + ' €<br>Après la 2<sup>e</sup> : ' + fr(net1) + ' × ' + fr(1 - r2 / 100) + ' = <b>' + fr(net) + ' €</b><br>' +
          'Remise globale : (' + fr(brut, 0) + ' − ' + fr(net) + ') ÷ ' + fr(brut, 0) + ' × 100 = <b>' + fr(g) + ' %</b>, et non ' + (r1 + r2) + ' % : la 2<sup>e</sup> remise porte sur un montant déjà réduit.' };
    } },
    wilson: { titre: 'Modèle de Wilson', gen: function () {
      // On tire N, PU, T et P, puis on en déduit une consommation entière : le résultat tombe juste.
      var n, pu, t, p, c;
      for (var essai = 0; essai < 200; essai++) {
        n = choisir([4, 5, 6, 8, 10, 12, 15, 20, 24]); pu = choisir([4, 5, 6, 8, 10, 12, 15, 20]); t = choisir([10, 15, 20, 25]); p = choisir([10, 12, 15, 18, 20, 25, 30, 40]);
        c = n * n * 2 * p * 100 / (pu * t); // calcul en entiers : pas d'erreur d'arrondi
        if (Math.abs(c - Math.round(c)) < 1e-9 && c >= 600 && c <= 40000 && Math.abs(c / n - Math.round(c / n)) < 1e-9) break;
      }
      c = Math.round(c);
      var prod = choisir(PRODUITS), q = c / n, pos = q / 2 * pu * t / 100, pas = n * p;
      return { situation: 'Sport’Tours vend <b>' + fr(c, 0) + ' ' + prod + '</b> par an, à un rythme régulier. Coût d’achat : <b>' + fr(pu, 0) + ' € HT</b>. Coût de passation : <b>' + fr(p, 0) + ' €</b> par commande. Taux de possession : <b>' + t + ' %</b>.',
        champs: [['Nombre optimal de commandes N', n, ''], ['Quantité par commande Q', q, ''], ['Coût total de gestion (€)', pos + pas, '€']],
        correction: 'C × PU × T = ' + fr(c, 0) + ' × ' + fr(pu, 0) + ' × ' + fr(t / 100) + ' = ' + fr(c * pu * t / 100) + '<br>2 × P = ' + fr(2 * p, 0) + '<br>' +
          'N = √(' + fr(c * pu * t / 100) + ' ÷ ' + fr(2 * p, 0) + ') = √' + fr(n * n, 0) + ' = <b>' + n + ' commandes</b><br>Q = ' + fr(c, 0) + ' ÷ ' + n + ' = <b>' + fr(q, 0) + '</b><br>' +
          'Possession = (' + fr(q, 0) + ' ÷ 2) × ' + fr(pu, 0) + ' × ' + fr(t / 100) + ' = ' + fr(pos) + ' € ; passation = ' + n + ' × ' + fr(p, 0) + ' = ' + fr(pas) + ' €<br>Coût total = <b>' + fr(pos + pas) + ' €</b> (les deux coûts sont égaux à l’optimum).' };
    } },
    alerte: { titre: 'Stock minimum, de sécurité, d’alerte', gen: function () {
      var prod = choisir(PRODUITS), j = alea(5, 60), c = j * 360, dl = alea(3, 15), ds = alea(2, 7);
      return { situation: 'Sport’Tours vend <b>' + fr(c, 0) + ' ' + prod + '</b> par an (année de 360 jours). Le fournisseur livre en <b>' + dl + ' jours</b>. Léa veut <b>' + ds + ' jours</b> de stock de sécurité.',
        champs: [['Ventes par jour', j, ''], ['Stock minimum', j * dl, ''], ['Stock de sécurité', j * ds, ''], ['Stock d’alerte', j * (dl + ds), '']],
        correction: 'Ventes par jour = ' + fr(c, 0) + ' ÷ 360 = <b>' + j + '</b><br>Stock minimum = ' + j + ' × ' + dl + ' = <b>' + j * dl + '</b><br>Stock de sécurité = ' + j + ' × ' + ds + ' = <b>' + j * ds + '</b><br>' +
          'Stock d’alerte = ' + j * dl + ' + ' + j * ds + ' = <b>' + j * (dl + ds) + '</b> : on commande dès que le stock descend à ce niveau.' };
    } },
    cmp: { titre: 'Fiche de stock et CMP', gen: function () {
      // CMP de fin de période, choisi pour tomber juste au centime (comme dans les sujets).
      var q0, p0, q1, p1, q2, p2, s1, s2, val, qt, cmp;
      // Calcul en centimes : on cherche un 3e prix (en hausse) qui rend la division exacte.
      var c0, c1, c2, trouve = false;
      for (var essai = 0; essai < 500 && !trouve; essai++) {
        q0 = alea(50, 300, 10); c0 = alea(400, 2000, 10); q1 = alea(100, 500, 50); c1 = c0 + alea(5, 60, 5); q2 = alea(100, 400, 50); qt = q0 + q1 + q2;
        for (c2 = c1 + 5; c2 <= c1 + 80; c2++) { if ((q0 * c0 + q1 * c1 + q2 * c2) % qt === 0) { trouve = true; break; } }
      }
      if (!trouve) { q0 = 100; c0 = 1000; q1 = 200; c1 = 1030; q2 = 100; c2 = 1050; qt = 400; }
      p0 = c0 / 100; p1 = c1 / 100; p2 = c2 / 100;
      val = (q0 * c0 + q1 * c1 + q2 * c2) / 100; cmp = (q0 * c0 + q1 * c1 + q2 * c2) / qt / 100;
      s1 = alea(Math.round((q0 + q1) * 0.4 / 10) * 10, q0 + q1 - 10, 10); s2 = alea(Math.round((q0 + q1 - s1 + q2) * 0.4 / 10) * 10, q0 + q1 - s1 + q2 - 20, 10);
      var sorties = s1 + s2, final = qt - sorties;
      return { situation: 'Mouvements d’un mois pour une référence de Sport’Tours (CMP calculé en fin de période) :' +
          '<div class="table-wrap"><table class="calc-table"><tr><th>Mouvement</th><th>Quantité</th><th>Coût unitaire</th></tr>' +
          '<tr><td>Stock initial</td><td>' + q0 + '</td><td>' + fr(p0) + ' €</td></tr><tr><td>Entrée</td><td>' + q1 + '</td><td>' + fr(p1) + ' €</td></tr>' +
          '<tr><td>Sortie</td><td>' + s1 + '</td><td></td></tr><tr><td>Entrée</td><td>' + q2 + '</td><td>' + fr(p2) + ' €</td></tr><tr><td>Sortie</td><td>' + s2 + '</td><td></td></tr></table></div>',
        champs: [['CMP (€)', cmp, '€'], ['Valeur des sorties (€)', sorties * cmp, '€'], ['Valeur du stock final (€)', final * cmp, '€']],
        correction: 'Valeur des entrées et du stock initial : ' + fr(q0 * p0) + ' + ' + fr(q1 * p1) + ' + ' + fr(q2 * p2) + ' = ' + fr(val) + ' € pour ' + qt + ' unités<br>' +
          'CMP = ' + fr(val) + ' ÷ ' + qt + ' = <b>' + fr(cmp) + ' €</b><br>Sorties : (' + s1 + ' + ' + s2 + ') × ' + fr(cmp) + ' = <b>' + fr(sorties * cmp) + ' €</b><br>' +
          'Stock final : ' + qt + ' − ' + sorties + ' = ' + final + ' unités × ' + fr(cmp) + ' = <b>' + fr(final * cmp) + ' €</b><br>Contrôle : ' + fr(sorties * cmp) + ' + ' + fr(final * cmp) + ' = ' + fr(qt * cmp) + ' €' + (Math.abs(qt * cmp - val) > 0.005 ? ' (petit écart dû à l’arrondi du CMP)' : ', soit la valeur totale') + '.' };
    } },
    rotation: { titre: 'Stock moyen, rotation, durée', gen: function () {
      var prod = choisir(PRODUITS), si = alea(40, 400, 10), sf = alea(40, 400, 10), sm = (si + sf) / 2, r = choisir([6, 8, 9, 10, 12, 15, 18, 20, 24]), v = sm * r;
      return { situation: 'Les ' + prod + ' de Sport’Tours sur l’année (360 jours) : stock au 1<sup>er</sup> janvier <b>' + si + '</b>, stock au 31 décembre <b>' + sf + '</b>, quantité vendue <b>' + fr(v, 0) + '</b>.',
        champs: [['Stock moyen', sm, ''], ['Ratio de rotation', r, ''], ['Durée moyenne de stockage (jours)', 360 / r, 'j']],
        correction: 'Stock moyen = (' + si + ' + ' + sf + ') ÷ 2 = <b>' + fr(sm, sm % 1 ? 1 : 0) + '</b><br>Rotation = ' + fr(v, 0) + ' ÷ ' + fr(sm, sm % 1 ? 1 : 0) + ' = <b>' + r + '</b><br>' +
          'Durée = 360 ÷ ' + r + ' = <b>' + fr(360 / r, 1) + ' jours</b> : un article reste en moyenne ' + fr(360 / r, 0) + ' jours en stock.' };
    } },
    demarque: { titre: 'Inventaire : démarque ou surmarque', gen: function () {
      var prod = choisir(PRODUITS), th = alea(20, 300), e = choisir([-6, -5, -4, -3, -2, 2, 3, 4]), reel = th + e, pa = alea(8, 90);
      var nature = e < 0 ? 'démarque' : 'surmarque';
      return { situation: 'Inventaire des ' + prod + ' : le logiciel annonce <b>' + th + '</b> articles, le comptage en trouve <b>' + reel + '</b>. Coût d’achat : <b>' + fr(pa, 0) + ' € HT</b>.',
        champs: [['Écart en quantité (réel − théorique)', e, ''], ['Valeur de l’écart (€, sans signe)', Math.abs(e) * pa, '€']],
        choix: ['Cet écart est…', nature, ['démarque', 'surmarque']],
        correction: 'Écart = ' + reel + ' − ' + th + ' = <b>' + e + '</b> : le stock réel est ' + (e < 0 ? 'inférieur' : 'supérieur') + ' au théorique, c’est une <b>' + nature + '</b>.<br>' +
          'Valeur = ' + Math.abs(e) + ' × ' + fr(pa, 0) + ' = <b>' + fr(Math.abs(e) * pa) + ' €</b>. Le logiciel est corrigé à ' + reel + '.' };
    } },
    transformation: { titre: 'Évaluer une action commerciale', gen: function () {
      var v = alea(400, 2500, 10), t = choisir([15, 18, 20, 22, 24, 25, 28, 30]), tk = Math.round(v * t / 100), pm = alea(35, 90), ca = tk * pm;
      var cout = alea(500, 2500, 100), tm = choisir([30, 35, 40, 45]), ca0 = Math.round(ca * choisir([.6, .7, .75, .8]) / 10) * 10, res = (ca - ca0) * tm / 100 - cout;
      return { situation: 'Pendant une animation, Sport’Tours compte <b>' + fr(v, 0) + ' visiteurs</b>, <b>' + fr(tk, 0) + ' tickets</b> et <b>' + fr(ca, 0) + ' € HT</b> de CA. La même semaine l’an dernier, le CA était de <b>' + fr(ca0, 0) + ' €</b>. Taux de marque : <b>' + tm + ' %</b>. Coût de l’animation : <b>' + fr(cout, 0) + ' €</b>.',
        champs: [['Taux de transformation (%)', tk / v * 100, '%'], ['Panier moyen (€)', pm, '€'], ['Résultat de l’opération (€)', res, '€']],
        correction: 'Taux de transformation = ' + fr(tk, 0) + ' ÷ ' + fr(v, 0) + ' × 100 = <b>' + fr(tk / v * 100) + ' %</b><br>Panier moyen = ' + fr(ca, 0) + ' ÷ ' + fr(tk, 0) + ' = <b>' + fr(pm) + ' €</b><br>' +
          'Marge supplémentaire = (' + fr(ca, 0) + ' − ' + fr(ca0, 0) + ') × ' + tm + ' % = ' + fr((ca - ca0) * tm / 100) + ' €<br>Résultat = ' + fr((ca - ca0) * tm / 100) + ' − ' + fr(cout, 0) + ' = <b>' + fr(res) + ' €</b> : ' + (res >= 0 ? 'l’opération est rentable.' : 'l’opération n’est pas rentable.') };
    } }
  };
  // Regroupement des types d'exercices par matière, pour les boutons de choix.
  var GROUPES = [['Gestion', ['variation', 'remises', 'marge', 'prixvente', 'elasticite', 'scoring']], ['Stocks', ['wilson', 'alerte', 'cmp', 'rotation', 'demarque']],
    ['Management', ['paie', 'horaire']], ['ADOC', ['transformation']]];

  function nombre(v) { return parseFloat(String(v).replace(/\s/g, '').replace(',', '.').replace('%', '').replace('€', '')); }
  function proche(x, v) { return isFinite(x) && Math.abs(x - v) <= Math.max(0.011, Math.abs(v) * 0.005); }

  function pageCalculs(app, type) {
    document.title = 'Calculs à l’infini · Révisions BTS MCO';
    var cles = Object.keys(EXOS), choisi = EXOS[type] ? type : null, session = (pageCalculs.session = pageCalculs.session || { ok: 0, faits: 0 });
    var k = choisi || choisir(cles), ex = EXOS[k].gen(), essais = 0, reussi = false, vu = false, compte = false;
    // Un exercice compte une seule fois dans le score de la session ; réussi seulement si la correction n'a pas été vue avant.
    function compter(ok) { if (compte) return; compte = true; session.faits++; if (ok) session.ok++;
      var sc = app.querySelector('.defi-score'); if (sc) sc.textContent = session.ok + '/' + session.faits + ' réussis'; }
    app.innerHTML = fil('Calculs à l’infini') +
      '<section class="defi calculs">' +
        '<div class="defi-haut"><span>' + Icone('calculatrice') + ' Calculs à l’infini</span><span class="defi-score">' + session.ok + '/' + session.faits + ' réussis</span></div>' +
        '<div class="calc-types"><a href="#/calculs"' + (!choisi ? ' class="actif"' : '') + '>' + Icone('des') + ' Au hasard</a></div>' +
        GROUPES.map(function (g) {
          return '<div class="calc-types"><span class="calc-groupe">' + g[0] + '</span>' + g[1].map(function (c) {
            return '<a href="#/calculs/' + c + '"' + (choisi === c ? ' class="actif" aria-current="page"' : '') + '>' + esc(EXOS[c].titre) + '</a>';
          }).join('') + '</div>';
        }).join('') +
        '<h2 class="defi-q">' + esc(EXOS[k].titre) + '</h2>' +
        '<div class="situation">' + ex.situation + '</div>' +
        '<form class="calc-form" autocomplete="off">' + ex.champs.map(function (c, i) {
          return '<label><span>' + esc(c[0]) + '</span><span class="calc-saisie"><input inputmode="decimal" data-i="' + i + '" placeholder="?">' + (c[2] ? '<em>' + c[2] + '</em>' : '') + '</span></label>';
        }).join('') +
        (ex.choix ? '<label><span>' + esc(ex.choix[0]) + '</span><select data-choix><option value="">— choisir —</option>' + ex.choix[2].map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select></label>' : '') +
        '<p class="calc-boutons"><button type="submit" class="defi-go">Vérifier</button><button type="button" class="defi-go secondaire voir">Voir la correction</button></p></form>' +
        '<div class="calc-correction" hidden><p class="qcm-expl">' + ex.correction + '</p></div>' +
        '<p class="calc-suivant" hidden><a class="defi-go" href="#/calculs' + (choisi ? '/' + choisi : '') + '" data-rejouer>Nouvel exercice ›</a></p>' +
        '<p class="astuce">Arrondis à 2 décimales. Virgule ou point, comme tu veux.</p>' +
      '</section>';
    var actif = app.querySelector('.calc-types a.actif');
    if (actif) { var rang = actif.parentNode; rang.scrollLeft = actif.offsetLeft - rang.offsetLeft - 20; } // sur mobile, le type choisi reste visible
    var form = app.querySelector('.calc-form'), corr = app.querySelector('.calc-correction'), suite = app.querySelector('.calc-suivant');
    function montrerCorrection() { if (!reussi) { vu = true; compter(false); } corr.hidden = false; suite.hidden = false; }
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      essais++;
      var tout = true;
      Array.prototype.forEach.call(form.querySelectorAll('input[data-i]'), function (inp) {
        var ok = proche(nombre(inp.value), ex.champs[+inp.dataset.i][1]);
        inp.classList.toggle('ok', ok); inp.classList.toggle('ko', !ok);
        if (!ok) tout = false;
      });
      var sel = form.querySelector('[data-choix]');
      if (sel) { var okc = sel.value === ex.choix[1]; sel.classList.toggle('ok', okc); sel.classList.toggle('ko', !okc); if (!okc) tout = false; }
      if (tout && !reussi && vu) {
        reussi = true; // juste, mais après avoir vu la correction : pas de points
        Jeu.sonner('bon');
      } else if (tout && !reussi) {
        reussi = true;
        compter(true);
        Jeu.sonner('bon');
        Activites.stat('calculsOk');
        Jeu.compter('calculEx');
        Jeu.gagner(essais === 1 ? 12 : 6, essais === 1 ? 'calcul juste du premier coup' : 'calcul juste');
        if (essais === 1) Jeu.confettis();
        montrerCorrection();
      } else if (!tout) {
        Jeu.sonner('faux');
        if (essais >= 2) montrerCorrection();
      }
    });
    app.querySelector('.voir').addEventListener('click', montrerCorrection);
    Activites.relancer(app, '#/calculs' + (choisi ? '/' + choisi : ''));
  }

  // ---------- Transfert de progression (téléphone ↔ ordinateur) ----------

  var PREFIXE = 'RBTS1.';
  function exporter() {
    var json = JSON.stringify(Jeu.etat());
    return PREFIXE + btoa(unescape(encodeURIComponent(json)));
  }
  function lire(code) {
    code = String(code || '').trim();
    if (code.indexOf(PREFIXE) === 0) code = code.slice(PREFIXE.length);
    var o = JSON.parse(decodeURIComponent(escape(atob(code))));
    if (!o || typeof o !== 'object' || typeof o.xp !== 'number') throw new Error('format');
    return o;
  }
  // Lien de transfert : la progression compressée (gzip) voyage dans l'adresse, #/importer/<code>.
  // Ouvrir ce lien sur l'autre appareil propose de l'importer : aucun code à copier-coller.
  function b64url(octets) {
    var s = '';
    for (var i = 0; i < octets.length; i += 0x8000) s += String.fromCharCode.apply(null, octets.subarray(i, i + 0x8000));
    return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
  function depuisB64url(t) {
    var s = atob(t.replace(/-/g, '+').replace(/_/g, '/')), o = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) o[i] = s.charCodeAt(i);
    return o;
  }
  function lienProgression() {
    var json = JSON.stringify(Jeu.etat()), base = location.origin + location.pathname + '#/importer/';
    if (typeof CompressionStream === 'undefined') return Promise.resolve(base + encodeURIComponent(exporter()));
    var flux = new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
    return new Response(flux).arrayBuffer().then(function (b) { return base + 'z.' + b64url(new Uint8Array(b)); });
  }
  function lireLien(code) {
    if (code.indexOf('z.') !== 0) return Promise.resolve(lire(decodeURIComponent(code)));
    var flux = new Blob([depuisB64url(code.slice(2))]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Response(flux).text().then(function (t) {
      var o = JSON.parse(t);
      if (!o || typeof o !== 'object' || typeof o.xp !== 'number') throw new Error('format');
      return o;
    });
  }
  function marquerSauvegarde() { var E = Jeu.etat(); E.reglages = E.reglages || {}; E.reglages.sauvegarde = Jeu.jour(); Jeu.sauver(); }

  function pageImporter(app) {
    document.title = 'Importer une progression · Révisions BTS MCO';
    var code = location.hash.split('/').slice(2).join('/');
    app.innerHTML = fil('Importer une progression') + '<section class="defi defi-accueil"><div class="defi-eclair">' + Icone('telephone') + '</div><h1>Importer une progression</h1><p class="transfert-msg">Lecture du lien…</p></section>';
    var msg = app.querySelector('.transfert-msg');
    Promise.resolve().then(function () { return lireLien(code); }).then(function (o) { // erreurs de décodage comprises
      msg.innerHTML = 'Ce lien contient une progression de <b>' + o.xp + ' XP</b> (' + Object.keys(o.badges || {}).length + ' badges). Sur cet appareil : ' + Jeu.etat().xp + ' XP.';
      msg.insertAdjacentHTML('afterend', '<p class="calc-boutons"><button type="button" class="defi-go" data-oui>Remplacer par celle du lien</button><a class="defi-go secondaire" href="#/">Annuler</a></p>');
      app.querySelector('[data-oui]').addEventListener('click', function () {
        try { localStorage.setItem('revision-bts-jeu', JSON.stringify(o)); } catch (e) { msg.textContent = 'Impossible d’enregistrer.'; return; }
        location.replace(location.pathname + '#/profil');
        location.reload();
      });
    }).catch(function () { msg.textContent = 'Ce lien est abîmé ou incomplet. Renvoie-le depuis l’autre appareil (bouton « Envoyer par lien » du profil).'; });
  }

  function transfert(cible) {
    if (!cible) return;
    var der = (Jeu.etat().reglages || {}).sauvegarde, jours = der ? Math.round((new Date(Jeu.jour() + 'T12:00') - new Date(der + 'T12:00')) / 864e5) : null;
    cible.innerHTML = '<section class="transfert"><h2 class="titre-section">Sauvegarder et changer d’appareil</h2>' +
      '<p>Ta progression est gardée dans ce navigateur. Envoie-toi le lien (par message ou par mail) : l’ouvrir sur ton autre appareil y importe tout. Garde aussi ce message comme sauvegarde.</p>' +
      '<p class="transfert-der' + (jours === null || jours > 7 ? ' alerte' : '') + '">' + (jours === null ? Icone('alerte') + ' Aucune sauvegarde pour l’instant.' : jours === 0 ? '✓ Sauvegardée aujourd’hui.' : (jours > 7 ? Icone('alerte') + ' ' : '') + 'Dernière sauvegarde il y a ' + jours + ' jour' + (jours > 1 ? 's' : '') + '.') + '</p>' +
      '<p class="calc-boutons"><button type="button" class="installer-btn" data-lien>' + Icone('lien') + ' Envoyer par lien</button><button type="button" class="installer-btn secondaire" data-copier>' + Icone('pressePapier') + ' Copier mon code</button>' +
      '<button type="button" class="installer-btn secondaire" data-fichier>' + Icone('disquette') + ' Télécharger un fichier</button></p>' +
      '<details class="correction"><summary>Importer une progression</summary>' +
        '<textarea id="codeImport" rows="3" aria-label="Code de progression à importer" placeholder="Colle ici ton code (il commence par RBTS1.)"></textarea>' +
        '<p class="calc-boutons"><button type="button" class="installer-btn" data-importer>Importer le code</button>' +
        '<label class="installer-btn secondaire fichier">' + Icone('dossierOuvert') + ' Choisir un fichier<input type="file" accept=".json,.txt,application/json,text/plain" hidden data-fichier-import></label></p>' +
        '<p class="transfert-msg" aria-live="polite"></p></details></section>';
    var msg = cible.querySelector('.transfert-msg');
    // Le lien est préparé à l'avance : le partage doit partir directement du clic (sinon iPhone le refuse).
    var lienPret = null;
    lienProgression().then(function (u) { lienPret = u; });
    cible.querySelector('[data-lien]').addEventListener('click', function (e) {
      var b = e.target, url = lienPret;
      if (!url) return;
      var txt = 'Ma progression Révisions BTS MCO (' + Jeu.etat().xp + ' XP) : ouvre ce lien pour la récupérer.';
      function fait(t) { b.textContent = t; marquerSauvegarde(); }
      function montrer() { msg.innerHTML = 'Copie ce lien et envoie-le-toi :<br><input readonly value="' + esc(url) + '" onclick="this.select()">'; cible.querySelector('details').open = true; }
      if (navigator.share) navigator.share({ title: 'Ma progression', text: txt, url: url }).then(function () { fait('✓ Lien envoyé'); }, function (err) { if (!err || err.name !== 'AbortError') montrer(); });
      else if (navigator.clipboard) navigator.clipboard.writeText(txt + '\n' + url).then(function () { fait('✓ Lien copié : colle-le dans un message'); }, montrer);
      else montrer();
    });
    cible.querySelector('[data-copier]').addEventListener('click', function (e) {
      var code = exporter(), b = e.target;
      if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { b.textContent = '✓ Code copié'; marquerSauvegarde(); }, function () { b.textContent = 'Copie impossible : utilise le fichier'; });
      else b.textContent = 'Copie impossible : utilise le fichier';
    });
    cible.querySelector('[data-fichier]').addEventListener('click', function () {
      marquerSauvegarde();
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([exporter()], { type: 'text/plain' }));
      a.download = 'progression-revisions-bts-' + Jeu.jour() + '.txt';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    function importer(code) {
      var o;
      try { o = lire(code); } catch (e) { msg.textContent = 'Ce code n’est pas valide.'; return; }
      if (!confirm('Remplacer la progression de cet appareil (' + Jeu.etat().xp + ' XP) par celle importée (' + o.xp + ' XP) ?')) return;
      try { localStorage.setItem('revision-bts-jeu', JSON.stringify(o)); } catch (e) { msg.textContent = 'Impossible d’enregistrer.'; return; }
      msg.textContent = '✓ Progression importée, rechargement…';
      setTimeout(function () { location.reload(); }, 600);
    }
    cible.querySelector('[data-importer]').addEventListener('click', function () { importer(cible.querySelector('#codeImport').value); });
    cible.querySelector('[data-fichier-import]').addEventListener('change', function (e) {
      var f = e.target.files[0];
      if (!f) return;
      var lec = new FileReader();
      lec.onload = function () { importer(lec.result); };
      lec.readAsText(f);
    });
  }
  Jeu.surProfil(function (app) {
    var d = document.createElement('div');
    var raz = app.querySelector('.profil-raz');
    if (raz) raz.parentNode.insertBefore(d, raz);
    transfert(d);
  });

  // ---------- Simulateur d'oral avec Claude ----------

  var ORAUX = {
    e41: { nom: 'E41 · Vente conseil (DRCV)', role: 'client', scenarios: [
      ['Premier semi-marathon', 'Un client de 35 ans qui se met à la course. Il prépare son premier semi-marathon dans 3 mois, a parfois mal aux genoux, et pense à un budget d’environ 100 €.'],
      ['Cadeau pour un ado', 'Une mère qui cherche un cadeau d’anniversaire pour son fils de 14 ans, fan de foot. Elle n’y connaît rien et veut rester sous 60 €.'],
      ['Vélo d’appartement', 'Un retraité de 68 ans qui veut rester en forme chez lui. Il hésite entre deux modèles et a peur de se faire mal ou de mal l’utiliser.'],
      ['Le client qui a vu moins cher', 'Un client pressé qui veut une raquette de padel. Il a vu le même modèle 15 € moins cher sur Internet et le fait savoir.'],
      ['Réclamation', 'Un client énervé qui revient avec des chaussures décollées après deux mois d’utilisation. Il veut être remboursé tout de suite.']
    ] },
    e42: { nom: 'E42 · Animation de l’offre (ADOC)', role: 'manager et jury', scenarios: [
      ['Opération rentrée', 'Je dois proposer au manager une animation commerciale pour la rentrée (objectifs, cible, actions, budget, indicateurs de suivi).'],
      ['Rayon running en perte de vitesse', 'Les ventes du rayon running baissent de 12 % sur un an. Je dois faire un diagnostic et proposer un réaménagement et une mise en avant (merchandising, PLV).'],
      ['Lancement d’une marque de distributeur', 'Le magasin lance une gamme de textile de sport à sa marque. Je dois proposer comment la mettre en valeur en magasin et sur les réseaux sociaux.']
    ] }
  };
  var NIVEAUX_ORAL = { facile: 'facile : tu es coopératif et tu révèles vite tes besoins', normal: 'normal : tu as quelques hésitations et une ou deux objections', exigeant: 'exigeant : tu es pressé, méfiant, tu fais plusieurs objections et tu ne révèles tes besoins que si on te questionne bien' };

  function promptOral(ep, sc, niv) {
    var o = ORAUX[ep], s = o.scenarios[sc];
    if (ep === 'e41') {
      return 'Simulation d’oral du BTS MCO, épreuve E41 (Développement de la relation client et vente conseil). Tu joues le CLIENT ; je suis le vendeur du magasin Sport’Tours, un magasin de sport indépendant à Tours.\n\n' +
        'Ton personnage et la situation : ' + s[1] + '\nNiveau de difficulté : ' + NIVEAUX_ORAL[niv] + '.\n\n' +
        'Règles : reste dans ton rôle ; une seule réplique courte à la fois, puis attends ma réponse ; ne m’aide pas ; fais des objections réalistes (prix, hésitation, concurrence) ; ne révèle tes besoins que si je te pose de bonnes questions.\n\n' +
        'Quand j’écris « FIN », sors du rôle et évalue-moi comme un jury : prise de contact, découverte des besoins (questions ouvertes, reformulation, mobiles SONCASE), argumentation (méthode CAP, adaptée aux besoins), traitement des objections (méthode REPO), conclusion et vente additionnelle, attitude. Donne une note sur 20, mes 3 points forts, mes 3 axes de progrès, et des exemples de phrases que j’aurais pu dire.\n\n' +
        'Commence : tu entres dans le magasin. Écris seulement ta première réplique.';
    }
    return 'Simulation d’oral du BTS MCO, épreuve E42 (Animation et dynamisation de l’offre commerciale). Tu joues le MANAGER du magasin Sport’Tours (magasin de sport indépendant à Tours), puis le jury.\n\n' +
      'Le sujet : ' + s[1] + '\nNiveau de difficulté : ' + NIVEAUX_ORAL[niv].replace('révèles vite tes besoins', 'acceptes facilement').replace('tu ne révèles tes besoins que si on te questionne bien', 'tu demandes des chiffres précis') + '.\n\n' +
      'Règles : je te présente mon projet ; pose-moi une seule question à la fois, comme un manager exigeant (diagnostic, cible, objectifs chiffrés, budget, rentabilité, indicateurs, faisabilité) ; ne fais pas le travail à ma place.\n\n' +
      'Quand j’écris « FIN », sors du rôle et évalue-moi comme un jury : qualité du diagnostic, pertinence et cohérence des propositions, chiffrage (budget, objectifs, indicateurs), argumentation, communication. Donne une note sur 20, mes 3 points forts et mes 3 axes de progrès, avec des exemples concrets.\n\n' +
      'Commence par m’accueillir et me demander de présenter mon projet.';
  }

  function pageOral(app) {
    document.title = 'Simulateur d’oral · Révisions BTS MCO';
    app.innerHTML = fil('Simulateur d’oral') +
      '<section class="defi defi-accueil oral"><div class="defi-eclair">' + Icone('micro') + '</div><h1>Simulateur d’oral</h1>' +
        '<p>Claude joue le client (E41) ou le manager (E42) au magasin Sport’Tours. Tu réponds comme le jour J. Écris <b>FIN</b> quand tu as terminé : Claude sort du rôle et te note sur 20 avec une grille d’évaluation.</p>' +
        '<div class="duel-form">' +
          '<label><span>Épreuve</span><select id="oEp">' + Object.keys(ORAUX).map(function (k) { return '<option value="' + k + '">' + esc(ORAUX[k].nom) + '</option>'; }).join('') + '</select></label>' +
          '<label><span>Situation</span><select id="oSc"></select></label>' +
          '<label><span>Difficulté</span><select id="oNiv"><option value="facile">Facile</option><option value="normal" selected>Normal</option><option value="exigeant">Exigeant</option></select></label>' +
        '</div>' +
        '<p class="oral-desc"></p>' +
        '<p class="calc-boutons"><button type="button" class="defi-go secondaire" data-hasard>' + Icone('des') + ' Situation au hasard</button><button type="button" class="defi-go" data-lancer>Lancer l’oral avec Claude ↗</button></p>' +
        '<p class="astuce">Claude s’ouvre dans un nouvel onglet. Il faut être connecté à ton compte. Si la consigne n’est pas envoyée toute seule, appuie sur Entrée.</p>' +
      '</section>' +
      '<h2 class="titre-section">Ton mémo pendant l’oral</h2><div class="oral-memo"></div>';
    var ep = app.querySelector('#oEp'), sc = app.querySelector('#oSc'), niv = app.querySelector('#oNiv');
    function remplir() {
      sc.innerHTML = ORAUX[ep.value].scenarios.map(function (s, i) { return '<option value="' + i + '">' + esc(s[0]) + '</option>'; }).join('');
      decrire();
      app.querySelector('.oral-memo').innerHTML = ep.value === 'e41'
        ? '<ol class="oral-etapes"><li><b>Prise de contact</b> : sourire, bonjour, se rendre disponible.</li><li><b>Découverte</b> : questions ouvertes, reformulation, repérer le SONCASE.</li><li><b>Argumentation</b> : CAP, 2 ou 3 arguments liés aux besoins.</li><li><b>Objections</b> : REPO, sans contredire.</li><li><b>Conclusion</b> : proposer de conclure, vente additionnelle, prise de congé.</li></ol>'
        : '<ol class="oral-etapes"><li><b>Diagnostic</b> : chiffres, constat, causes.</li><li><b>Objectifs</b> : chiffrés et datés.</li><li><b>Actions</b> : cible, offre, mise en avant, communication.</li><li><b>Budget</b> : coûts et rentabilité attendue.</li><li><b>Suivi</b> : indicateurs (CA, panier moyen, trafic, taux de transformation).</li></ol>';
    }
    function decrire() { app.querySelector('.oral-desc').innerHTML = '<b>Situation :</b> ' + esc(ORAUX[ep.value].scenarios[+sc.value][1]); }
    ep.addEventListener('change', remplir);
    sc.addEventListener('change', decrire);
    app.querySelector('[data-hasard]').addEventListener('click', function () {
      ep.value = Math.random() < 0.6 ? 'e41' : 'e42'; remplir();
      sc.value = String(Math.floor(Math.random() * ORAUX[ep.value].scenarios.length)); decrire();
    });
    app.querySelector('[data-lancer]').addEventListener('click', function () {
      var url = 'https://claude.ai/new?q=' + encodeURIComponent(promptOral(ep.value, +sc.value, niv.value));
      window.open(url, '_blank', 'noopener');
      Activites.stat('oraux');
      Jeu.compter('oral');
      Jeu.debloquer('oral');
      Jeu.gagner(20, 'oral blanc');
    });
    remplir();
  }

  // ---------- Branchements ----------

  Activites.ajouterPageGlobale('bilan', pageBilan);
  Activites.ajouterPageGlobale('calculs', function (app) {
    var t = location.hash.split('/')[2];
    pageCalculs(app, t);
  });
  Activites.ajouterPageGlobale('oral', pageOral);
  Activites.ajouterPageGlobale('importer', pageImporter);
  Jeu.ajouterBadges([
    ['calculs-10', Icone('calculatrice'), 'Calculatrice humaine', 'Réussir 10 exercices de calcul'],
    ['oral', Icone('micro'), 'À l’oral', 'Faire un oral blanc avec Claude']
  ], function (E) { return { 'calculs-10': (E.stats.calculsOk || 0) >= 10 }; });
  Jeu.ajouterMissions([
    { id: 'calculex', txt: 'Réussir 2 exercices de calcul', cle: 'calculEx', obj: 2, lien: '#/calculs' },
    { id: 'oral', txt: 'Faire un oral blanc avec Claude', cle: 'oral', obj: 1, lien: '#/oral' }
  ]);

  return { pageBilan: pageBilan, pageCalculs: pageCalculs, pageOral: pageOral, exporter: exporter, lire: lire, exos: EXOS };
})();
