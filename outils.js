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
      '<section class="defi defi-accueil"><div class="defi-eclair">🎯</div><h1>Mes points faibles</h1>' +
        '<p>Ton taux de bonnes réponses par chapitre, sur tous les QCM, défis et révisions.</p>' +
        (totN ? '<p class="pf-global">Réussite globale : <b>' + Math.round(totB / totN * 100) + ' %</b> sur ' + totN + ' réponses</p>' : '') +
      '</section>' +
      (prio.length ? '<h2 class="titre-section">À travailler en priorité</h2><div class="pf-prio">' + prio.map(function (l) {
        var m = Activites.matiere(l.f.matiere);
        return '<div class="pf-carte" style="--c:' + m.couleur + '"><span class="defi-tag">' + esc(m.nom) + '</span><b>' + esc(l.f.titre) + '</b>' +
          '<span class="pf-carte-taux">' + Math.round(l.taux * 100) + ' % de réussite (' + l.b + '/' + l.n + ')</span>' +
          '<span class="pf-actions"><a href="#/' + l.f.matiere + '/' + l.f.id + '">📖 Relire la fiche</a><a href="#/' + l.f.matiere + '/cartes">🃏 Cartes mémo</a><a href="#/revoir">🔁 Mes erreurs</a></span></div>';
      }).join('') + '</div>' : (totN ? '<p class="vide">Aucun chapitre sous 80 % (avec au moins 3 réponses). Bravo !</p>' : '<p class="vide">Fais quelques QCM ou un Défi éclair : ton bilan apparaîtra ici.</p>')) +
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
    } }
  };

  function nombre(v) { return parseFloat(String(v).replace(/\s/g, '').replace(',', '.').replace('%', '').replace('€', '')); }
  function proche(x, v) { return isFinite(x) && Math.abs(x - v) <= Math.max(0.011, Math.abs(v) * 0.005); }

  function pageCalculs(app, type) {
    document.title = 'Calculs à l’infini · Révisions BTS MCO';
    var cles = Object.keys(EXOS), choisi = EXOS[type] ? type : null, session = (pageCalculs.session = pageCalculs.session || { ok: 0, faits: 0 });
    var k = choisi || choisir(cles), ex = EXOS[k].gen(), essais = 0, reussi = false, vu = false, compte = false;
    // Un exercice compte une seule fois dans le score de la session ; réussi seulement si la correction n'a pas été vue avant.
    function compter(ok) { if (compte) return; compte = true; session.faits++; if (ok) session.ok++; }
    app.innerHTML = fil('Calculs à l’infini') +
      '<section class="defi calculs">' +
        '<div class="defi-haut"><span>🧮 Calculs à l’infini</span><span class="defi-score">' + session.ok + '/' + session.faits + ' réussis</span></div>' +
        '<div class="calc-types">' + ['<a href="#/calculs"' + (!choisi ? ' class="actif"' : '') + '>🎲 Au hasard</a>'].concat(cles.map(function (c) {
          return '<a href="#/calculs/' + c + '"' + (choisi === c ? ' class="actif"' : '') + '>' + esc(EXOS[c].titre) + '</a>';
        })).join('') + '</div>' +
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
  function transfert(cible) {
    if (!cible) return;
    cible.innerHTML = '<section class="transfert"><h2 class="titre-section">Changer d’appareil</h2>' +
      '<p>Ta progression est gardée dans ce navigateur. Pour la retrouver sur ton téléphone ou ton ordinateur : exporte ici, puis importe là-bas.</p>' +
      '<p class="calc-boutons"><button type="button" class="installer-btn" data-copier>📋 Copier mon code</button>' +
      '<button type="button" class="installer-btn secondaire" data-fichier>💾 Télécharger un fichier</button></p>' +
      '<details class="correction"><summary>Importer une progression</summary>' +
        '<textarea id="codeImport" rows="3" placeholder="Colle ici ton code (il commence par RBTS1.)"></textarea>' +
        '<p class="calc-boutons"><button type="button" class="installer-btn" data-importer>Importer le code</button>' +
        '<label class="installer-btn secondaire fichier">📂 Choisir un fichier<input type="file" accept=".json,.txt,application/json,text/plain" hidden data-fichier-import></label></p>' +
        '<p class="transfert-msg" aria-live="polite"></p></details></section>';
    var msg = cible.querySelector('.transfert-msg');
    cible.querySelector('[data-copier]').addEventListener('click', function (e) {
      var code = exporter(), b = e.target;
      if (navigator.clipboard) navigator.clipboard.writeText(code).then(function () { b.textContent = '✓ Code copié'; }, function () { b.textContent = 'Copie impossible : utilise le fichier'; });
      else b.textContent = 'Copie impossible : utilise le fichier';
    });
    cible.querySelector('[data-fichier]').addEventListener('click', function () {
      var a = document.createElement('a');
      a.href = URL.createObjectURL(new Blob([exporter()], { type: 'text/plain' }));
      a.download = 'progression-revisions-bts-' + Jeu.jour() + '.txt';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
    });
    function importer(code) {
      var o;
      try { o = lire(code); } catch (e) { msg.textContent = '❌ Ce code n’est pas valide.'; return; }
      if (!confirm('Remplacer la progression de cet appareil (' + Jeu.etat().xp + ' XP) par celle importée (' + o.xp + ' XP) ?')) return;
      try { localStorage.setItem('revision-bts-jeu', JSON.stringify(o)); } catch (e) { msg.textContent = '❌ Impossible d’enregistrer.'; return; }
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
      '<section class="defi defi-accueil oral"><div class="defi-eclair">🎙️</div><h1>Simulateur d’oral</h1>' +
        '<p>Claude joue le client (E41) ou le manager (E42) au magasin Sport’Tours. Tu réponds comme le jour J. Écris <b>FIN</b> quand tu as terminé : Claude sort du rôle et te note sur 20 avec une grille d’évaluation.</p>' +
        '<div class="duel-form">' +
          '<label><span>Épreuve</span><select id="oEp">' + Object.keys(ORAUX).map(function (k) { return '<option value="' + k + '">' + esc(ORAUX[k].nom) + '</option>'; }).join('') + '</select></label>' +
          '<label><span>Situation</span><select id="oSc"></select></label>' +
          '<label><span>Difficulté</span><select id="oNiv"><option value="facile">Facile</option><option value="normal" selected>Normal</option><option value="exigeant">Exigeant</option></select></label>' +
        '</div>' +
        '<p class="oral-desc"></p>' +
        '<p class="calc-boutons"><button type="button" class="defi-go secondaire" data-hasard>🎲 Situation au hasard</button><button type="button" class="defi-go" data-lancer>Lancer l’oral avec Claude ↗</button></p>' +
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
  Jeu.ajouterBadges([
    ['calculs-10', '🧮', 'Calculatrice humaine', 'Réussir 10 exercices de calcul'],
    ['oral', '🎙️', 'À l’oral !', 'Faire un oral blanc avec Claude']
  ], function (E) { return { 'calculs-10': (E.stats.calculsOk || 0) >= 10 }; });
  Jeu.ajouterMissions([
    { id: 'calculex', txt: 'Réussir 2 exercices de calcul', cle: 'calculEx', obj: 2, lien: '#/calculs' },
    { id: 'oral', txt: 'Faire un oral blanc avec Claude', cle: 'oral', obj: 1, lien: '#/oral' }
  ]);

  return { pageBilan: pageBilan, pageCalculs: pageCalculs, pageOral: pageOral, exporter: exporter, lire: lire };
})();
