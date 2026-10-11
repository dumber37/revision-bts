// Jeux : le magasin Sport'Tours qui s'agrandit, le boss de matière, le duel à deux,
// la chasse à l'erreur et le memory. S'appuie sur Jeu (progression) et Activites (pages, série).
var Jeux = (function () {
  'use strict';

  var esc = Jeu.esc, melanger = Jeu.melanger;
  var fil = Activites.fil, stat = Activites.stat, relancer = Activites.relancer;
  function fichesDe(id) { return R.fiches.filter(function (f) { return f.matiere === id; }); }
  function sansBalises(h) { var d = document.createElement('div'); d.innerHTML = h; return d.textContent; }

  var minuteur = null;
  function stop() { if (minuteur) { clearInterval(minuteur); minuteur = null; } }
  Activites.surQuitter(stop);

  // ---------- Le magasin Sport'Tours ----------
  // Chaque grade ajoute un élément au dessin.

  var ETAPES = ['La boutique ouvre', 'Premiers rayons', 'Une vitrine habillée', 'Le rayon ballons',
    'Un store tout neuf', 'Des plantes à l’entrée', 'Une enseigne lumineuse', 'L’étoile du centre-ville'];

  function magasinSVG(n) {
    var s = '<svg class="magasin-svg" viewBox="0 0 320 190" role="img" aria-label="Le magasin Sport’Tours, niveau ' + n + '">';
    s += '<rect x="0" y="160" width="320" height="30" fill="#cfc7b6"/><path d="M0 160h320" stroke="#b5ac98" stroke-width="2"/>';
    if (n >= 8) s += '<path d="M160 6l6 12 13 2-9 9 2 13-12-6-12 6 2-13-9-9 13-2z" fill="#e8a33d" class="mag-etoile"/>' +
      '<path d="M60 42V22l18 6-18 6M260 42V22l-18 6 18 6" fill="#b85c1e" stroke="#172340" stroke-width="1.5"/>';
    s += '<rect x="40" y="50" width="240" height="110" fill="#f5f2ec" stroke="#172340" stroke-width="2"/>' +
      '<rect x="34" y="42" width="252" height="12" rx="2" fill="#172340"/>';
    if (n >= 7) {
      var c = ['#e8a33d', '#f5f2ec', '#5cc2b4', '#e39158'];
      for (var i = 0; i < 12; i++) s += '<circle class="mag-guirlande" cx="' + (46 + i * 21) + '" cy="58" r="3" fill="' + c[i % 4] + '" style="animation-delay:' + (i * 0.15) + 's"/>';
    }
    s += '<rect x="100" y="60" width="120" height="22" rx="4" fill="#172340"' + (n >= 7 ? ' class="mag-neon"' : '') + '/>' +
      '<text x="160" y="75.5" text-anchor="middle" font-family="DM Sans, system-ui, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5" fill="' + (n >= 7 ? '#ffd27a' : '#e8a33d') + '">SPORT’TOURS</text>';
    if (n >= 5) {
      for (var k = 0; k < 11; k++) s += '<path d="M' + (50 + k * 20) + ' 86h20v8a10 6 0 0 1-20 0z" fill="' + (k % 2 ? '#f5f2ec' : '#b85c1e') + '" stroke="#172340" stroke-width="1"/>';
    }
    // vitrines et porte
    s += '<rect x="56" y="100" width="72" height="50" fill="#cfe3f2" stroke="#172340" stroke-width="2"/>' +
      '<rect x="192" y="100" width="72" height="50" fill="#cfe3f2" stroke="#172340" stroke-width="2"/>' +
      '<rect x="142" y="102" width="36" height="58" fill="#2d3f6b" stroke="#172340" stroke-width="2"/><circle cx="171" cy="132" r="2" fill="#e8a33d"/>';
    if (n >= 2) s += '<path d="M60 118h64M60 134h64" stroke="#8a93a6" stroke-width="2"/>' +
      '<rect x="64" y="108" width="10" height="10" fill="#2f5fb3"/><rect x="78" y="111" width="8" height="7" fill="#1d6b6b"/><rect x="90" y="106" width="12" height="12" fill="#e8a33d"/>' +
      '<rect x="68" y="124" width="12" height="10" fill="#6b4fa0"/><rect x="84" y="127" width="9" height="7" fill="#b85c1e"/>';
    if (n >= 3) s += '<circle cx="228" cy="112" r="6" fill="#e9c9a8" stroke="#172340" stroke-width="1"/>' +
      '<path d="M218 146l3-26h14l3 26z" fill="#e8a33d" stroke="#172340" stroke-width="1"/><path d="M215 126l6-6M241 126l-6-6" stroke="#172340" stroke-width="2"/>';
    if (n >= 4) s += '<circle cx="104" cy="143" r="5.5" fill="#fff" stroke="#172340" stroke-width="1"/><circle cx="117" cy="143" r="5.5" fill="#e39158" stroke="#172340" stroke-width="1"/>' +
      '<path d="M111.5 143h11M117 137.5v11" stroke="#172340" stroke-width=".8"/><circle cx="250" cy="143" r="5" fill="#fff" stroke="#172340" stroke-width="1"/>';
    if (n >= 6) s += '<rect x="128" y="150" width="10" height="10" fill="#b85c1e"/><circle cx="133" cy="146" r="7" fill="#2fa36b"/>' +
      '<rect x="182" y="150" width="10" height="10" fill="#b85c1e"/><circle cx="187" cy="146" r="7" fill="#2fa36b"/>';
    return s + '</svg>';
  }

  function magasin(cible, mini) {
    if (!cible) return;
    var nv = Jeu.niveau(Jeu.etat().xp).n, n = Math.min(nv, ETAPES.length);
    cible.innerHTML = '<div class="magasin' + (mini ? ' mini' : '') + '">' + magasinSVG(n) +
      '<div class="magasin-txt"><b>Ton magasin : ' + esc(ETAPES[n - 1]) + '</b>' +
      (n < ETAPES.length ? '<span>Niveau ' + (n + 1) + ' : ' + esc(ETAPES[n]).toLowerCase() + '</span>' : '<span>Le magasin est au complet, bravo !</span>') +
      '</div></div>';
  }
  Jeu.surProfil(function (app) { magasin(app.querySelector('#magasin')); });

  // ---------- Boss de matière ----------

  var BOSS = {
    drcv: ['😤', 'Le client impossible'],
    adoc: ['🧐', 'Le chef de rayon pointilleux'],
    management: ['🕴️', 'Le DRH exigeant'],
    gestion: ['🕵️', 'Le contrôleur de gestion']
  };
  function bossDe(m) { return BOSS[m.id] || ['👹', 'Le boss']; }

  function pageBoss(app, m) {
    var b = bossDe(m), banque = Jeu.questionsMatiere(m.id), n = Math.min(10, banque.length);
    document.title = 'Boss · ' + m.nom;
    var battu = Jeu.etat().badges['boss-' + m.id];
    app.innerHTML = fil(m, 'Boss') +
      '<section class="defi defi-accueil boss">' +
        '<div class="boss-ico">' + b[0] + '</div><h1>' + esc(b[1]) + '</h1>' +
        '<p>' + n + ' questions de ' + esc(m.nom) + '. <b>Une seule erreur et c’est perdu.</b></p>' +
        '<p>Bats-le pour gagner <b>100 XP</b> et le badge « Maître ' + esc(m.nom) + ' ».</p>' +
        (battu ? '<p class="defi-record">👑 Déjà battu le ' + battu.split('-').reverse().join('/') + '</p>' : '') +
        '<button type="button" class="defi-go">Affronter le boss</button>' +
      '</section>';
    app.querySelector('.defi-go').addEventListener('click', function () {
      Activites.serie(app, {
        titre: b[1], m: m, items: melanger(banque).slice(0, n), stopErreur: true, rejouer: '#/' + m.id + '/boss', pasDeListe: false,
        bandeau: function (r) {
          var pv = Math.round((n - r.bonnes) / n * 100);
          return '<div class="boss-barre"><span class="boss-ico petit">' + b[0] + '</span><span class="boss-pv"><i style="width:' + pv + '%"></i></span><b>' + (n - r.bonnes) + ' PV</b></div>';
        },
        fin: function (r) {
          stat('boss');
          Jeu.compter('boss');
          if (!r.perdu && r.bonnes === n) {
            Jeu.debloquer('boss-' + m.id);
            Jeu.gagner(100, 'boss vaincu');
            Jeu.confettis();
            return '<p class="boss-victoire">👑 ' + esc(b[1]) + ' est vaincu !</p>';
          }
          Jeu.gagner(r.bonnes * 3, 'combat');
          return '<p>' + b[0] + ' ' + esc(b[1]) + ' t’a eu à la question ' + r.total + '. Il lui restait ' + (n - r.bonnes) + ' PV.</p>';
        }
      });
    });
  }

  // ---------- Duel à deux sur le même téléphone ----------

  var DUREE_DUEL = 20;
  function pageDuel(app) {
    document.title = 'Duel · Révisions BTS MCO';
    var noms = (Jeu.etat().duelNoms || ['Joueur 1', 'Joueur 2']);
    var options = '<option value="">Toutes les matières</option>' + R.matieres.filter(function (m) { return Jeu.questionsMatiere(m.id).length; })
      .map(function (m) { return '<option value="' + m.id + '">' + esc(m.nom) + '</option>'; }).join('');
    app.innerHTML = '<nav class="fil"><a href="#/">Matières</a> › Duel</nav>' +
      '<section class="defi defi-accueil duel-accueil">' +
        '<div class="defi-eclair">⚔️</div><h1>Duel</h1>' +
        '<p>Deux joueurs, un seul téléphone. Chacun répond à son tour, 20 secondes par question. Le plus rapide et le plus juste gagne.</p>' +
        '<div class="duel-form">' +
          '<label><span>🔵 Joueur 1</span><input id="j1" maxlength="16" value="' + esc(noms[0]) + '"></label>' +
          '<label><span>🟠 Joueur 2</span><input id="j2" maxlength="16" value="' + esc(noms[1]) + '"></label>' +
          '<label><span>Matière</span><select id="dm">' + options + '</select></label>' +
          '<label><span>Questions par joueur</span><select id="dn"><option>3</option><option selected>5</option><option>8</option></select></label>' +
        '</div>' +
        '<button type="button" class="defi-go">Lancer le duel</button>' +
      '</section>';
    app.querySelector('.defi-go').addEventListener('click', function () {
      var j = [app.querySelector('#j1').value.trim() || 'Joueur 1', app.querySelector('#j2').value.trim() || 'Joueur 2'];
      Jeu.etat().duelNoms = j; Jeu.sauver();
      var mid = app.querySelector('#dm').value, n = +app.querySelector('#dn').value;
      var pool = mid ? Jeu.questionsMatiere(mid) : Jeu.questions();
      jouerDuel(app, j, melanger(pool).slice(0, Math.min(n * 2, pool.length - pool.length % 2)));
    });
  }

  function jouerDuel(app, joueurs, qs) {
    var i = 0, scores = [0, 0], bonnes = [0, 0];
    function question() {
      stop();
      var it = qs[i], t = i % 2, m = Activites.matiere(it.f.matiere);
      var reps = melanger(it.q[1].map(function (r, k) { return { txt: r, ok: k === 0 }; }));
      app.innerHTML = '<nav class="fil"><a href="#/">Matières</a> › Duel</nav>' +
        '<section class="defi duel">' +
          '<div class="duel-scores">' + [0, 1].map(function (p) {
            return '<div class="duel-j j' + p + (p === t ? ' actif' : '') + '"><span>' + (p ? '🟠 ' : '🔵 ') + esc(joueurs[p]) + '</span><b>' + scores[p] + '</b></div>';
          }).join('') + '</div>' +
          '<p class="duel-tour">À toi, <b>' + esc(joueurs[t]) + '</b> ! · question ' + (Math.floor(i / 2) + 1) + '/' + (qs.length / 2) + '</p>' +
          '<div class="defi-temps"><i></i></div>' +
          '<span class="defi-tag" style="--c:' + m.couleur + '">' + esc(m.nom) + '</span>' +
          '<h2 class="defi-q">' + it.q[0] + '</h2>' +
          '<div class="qcm-reps defi-reps">' + reps.map(function (r, k) {
            return '<button type="button" data-ok="' + (r.ok ? 1 : 0) + '"><span class="qcm-lettre">' + 'ABCD'[k] + '</span>' + r.txt + '</button>';
          }).join('') + '</div>' +
          '<p class="defi-retour" aria-live="polite"></p>' +
        '</section>';
      var debut = Date.now(), barre = app.querySelector('.defi-temps i'), fini = false;
      function repondre(b) {
        if (fini) return;
        fini = true; stop();
        var juste = !!b && b.dataset.ok === '1', reste = Math.max(0, DUREE_DUEL - (Date.now() - debut) / 1000);
        Array.prototype.forEach.call(app.querySelectorAll('.defi-reps button'), function (x) { x.disabled = true; if (x.dataset.ok === '1') x.classList.add('bonne'); });
        var ret = app.querySelector('.defi-retour');
        if (juste) {
          var pts = 100 + Math.round(reste * 5);
          scores[t] += pts; bonnes[t]++;
          Jeu.sonner('bon');
          b.classList.add('bonne');
          ret.innerHTML = '<b>+' + pts + ' pts pour ' + esc(joueurs[t]) + '</b>';
        } else {
          if (b) b.classList.add('fausse');
          Jeu.sonner('faux');
          ret.innerHTML = '<b>' + (b ? 'Raté' : 'Temps écoulé') + '</b> · réponse : ' + it.q[1][0];
        }
        Jeu.apres(juste ? 1100 : 1900, function () { i++; if (i < qs.length) question(); else fin(); });
      }
      app.querySelector('.defi-reps').addEventListener('click', function (e) { var b = e.target.closest('button[data-ok]'); if (b) repondre(b); });
      minuteur = setInterval(function () {
        var s = (Date.now() - debut) / 1000;
        barre.style.width = Math.max(0, 100 - s / DUREE_DUEL * 100) + '%';
        barre.classList.toggle('urgent', s > DUREE_DUEL - 5);
        if (s >= DUREE_DUEL) repondre(null);
      }, 100);
    }
    function fin() {
      stop();
      stat('duels');
      Jeu.compter('duel');
      Jeu.gagner(20, 'duel');
      Jeu.confettis();
      var g = scores[0] === scores[1] ? -1 : scores[0] > scores[1] ? 0 : 1;
      app.innerHTML = '<nav class="fil"><a href="#/">Matières</a> › Duel</nav>' +
        '<section class="defi defi-fin duel-fin"><div class="defi-eclair">' + (g < 0 ? '🤝' : '🏆') + '</div>' +
          '<h1>' + (g < 0 ? 'Égalité parfaite !' : esc(joueurs[g]) + ' gagne !') + '</h1>' +
          '<div class="duel-scores">' + [0, 1].map(function (p) {
            return '<div class="duel-j j' + p + (p === g ? ' actif' : '') + '"><span>' + (p ? '🟠 ' : '🔵 ') + esc(joueurs[p]) + '</span><b>' + scores[p] + '</b><small>' + bonnes[p] + '/' + qs.length / 2 + ' justes</small></div>';
          }).join('') + '</div>' +
          '<p><a class="defi-go" href="#/duel" data-rejouer>Revanche !</a></p></section>';
      relancer(app, '#/duel');
    }
    if (!qs.length) { app.innerHTML = '<p class="vide">Pas de questions disponibles.</p>'; return; }
    question();
  }

  // ---------- Chasse à l'erreur ----------

  function chasseDe(m) {
    var t = [];
    fichesDe(m.id).forEach(function (f) { ((R.chasse && R.chasse[f.id]) || []).forEach(function (p) { t.push({ vrai: p[0], faux: p[1], f: f }); }); });
    return t;
  }

  function pageChasse(app, m) {
    document.title = 'Chasse à l’erreur · ' + m.nom;
    var pool = melanger(chasseDe(m)), n = Math.min(6, pool.length), k = Math.max(1, Math.min(3, Math.floor(n / 2)));
    if (n < 2) { app.innerHTML = fil(m, 'Chasse à l’erreur') + '<p class="vide">Pas assez d’affirmations pour cette matière.</p>'; return; }
    var items = pool.slice(0, n), truques = melanger(items.map(function (x, i) { return i; })).slice(0, k);
    items.forEach(function (x, i) { x.truque = truques.indexOf(i) >= 0; x.choisi = false; });
    app.innerHTML = fil(m, 'Chasse à l’erreur') +
      '<section class="defi chasse" style="--c:' + m.couleur + '">' +
        '<div class="defi-haut"><span>🔍 Chasse à l’erreur</span><span class="defi-score">' + k + ' erreurs cachées</span></div>' +
        '<p class="ordre-aide">Une fiche a été truquée : <b>' + k + ' affirmations sont fausses</b>. Touche celles que tu crois fausses, puis valide.</p>' +
        '<div class="chasse-liste">' + items.map(function (x, i) {
          return '<button type="button" class="chasse-item" data-i="' + i + '"><span class="chasse-case"></span><span>' + esc(x.truque ? x.faux : x.vrai) + '</span></button>';
        }).join('') + '</div>' +
        '<button type="button" class="defi-go chasse-valider">Valider (<span>0</span>/' + k + ')</button>' +
        '<div class="serie-retour"></div>' +
      '</section>';
    var liste = app.querySelector('.chasse-liste'), valider = app.querySelector('.chasse-valider'), fini = false;
    liste.addEventListener('click', function (e) {
      var b = e.target.closest('.chasse-item');
      if (!b || fini) return;
      var x = items[+b.dataset.i];
      x.choisi = !x.choisi;
      b.classList.toggle('choisi', x.choisi);
      valider.querySelector('span').textContent = items.filter(function (y) { return y.choisi; }).length;
    });
    valider.addEventListener('click', function () {
      if (fini) return;
      fini = true;
      var trouvees = 0, alertes = 0;
      items.forEach(function (x, i) {
        var b = liste.children[i], etat;
        if (x.truque && x.choisi) { trouvees++; etat = 'trouvee'; }
        else if (x.truque) etat = 'ratee';
        else if (x.choisi) { alertes++; etat = 'alerte'; }
        else etat = 'ok';
        b.classList.add(etat);
        b.disabled = true;
        if (x.truque) b.insertAdjacentHTML('beforeend', '<span class="chasse-vrai">' + (etat === 'trouvee' ? '✓ Bien vu ! ' : '✗ Erreur ratée. ') + 'Vrai : ' + esc(x.vrai) + '</span>');
        else if (x.choisi) b.insertAdjacentHTML('beforeend', '<span class="chasse-vrai">C’était vrai.</span>');
      });
      valider.hidden = true;
      var parfait = trouvees === k && !alertes;
      stat('chasses');
      Jeu.compter('chasse');
      Jeu.gagner(trouvees * 5 + (parfait ? 15 : 0), parfait ? 'chasse parfaite' : 'chasse à l’erreur');
      if (parfait) { Jeu.debloquer('detective'); Jeu.confettis(); }
      app.querySelector('.serie-retour').innerHTML = '<p class="qcm-expl"><b>' + trouvees + '/' + k + ' erreurs trouvées</b>' +
        (alertes ? ', ' + alertes + ' fausse' + (alertes > 1 ? 's' : '') + ' alerte' + (alertes > 1 ? 's' : '') : '') + (parfait ? ' : enquête parfaite 🕵️' : '') + '.</p>' +
        '<a class="defi-go" href="#/' + m.id + '/chasse" data-rejouer>Nouvelle enquête</a>';
      relancer(app, '#/' + m.id + '/chasse');
    });
  }

  // ---------- Memory : retrouver les paires notion ↔ définition ----------

  function pairesDe(m) {
    var vus = {};
    return Activites.cartesDe(m).filter(function (c) {
      var r = sansBalises(c.recto).trim(), v = sansBalises(c.verso).trim();
      // Pas de lettre seule (SONCASE), pas de question (« À quoi servent-elles ? ») : il faut une notion qui se suffit.
      if (r.length <= 2 || r.length > 40 || /\?$/.test(r) || v.length > 110 || vus[r]) return false;
      vus[r] = true;
      return true;
    });
  }

  function pageMemory(app, m) {
    document.title = 'Memory · ' + m.nom;
    var paires = melanger(pairesDe(m)).slice(0, 6);
    if (paires.length < 3) { app.innerHTML = fil(m, 'Memory') + '<p class="vide">Pas assez de notions pour un memory.</p>'; return; }
    var tuiles = melanger([].concat.apply([], paires.map(function (p, k) {
      return [{ k: k, txt: sansBalises(p.recto), type: 'notion' }, { k: k, txt: sansBalises(p.verso), type: 'def' }];
    })));
    var retournees = [], trouvees = 0, coups = 0, debut = Date.now(), bloque = false;
    app.innerHTML = fil(m, 'Memory') +
      '<section class="defi memory" style="--c:' + m.couleur + '">' +
        '<div class="defi-haut"><span>🧠 Memory</span><span class="memory-coups">0 coup</span><span class="defi-score memory-temps">0 s</span></div>' +
        '<p class="ordre-aide">Retrouve les ' + paires.length + ' paires : une notion et sa définition.</p>' +
        '<div class="memory-grille">' + tuiles.map(function (t, i) {
          return '<button type="button" class="tuile ' + t.type + '" data-i="' + i + '"><span class="tuile-dos">?</span><span class="tuile-face">' + esc(t.txt) + '</span></button>';
        }).join('') + '</div><div class="serie-retour"></div>' +
      '</section>';
    var grille = app.querySelector('.memory-grille');
    minuteur = setInterval(function () {
      var e = app.querySelector('.memory-temps');
      if (e) e.textContent = Math.round((Date.now() - debut) / 1000) + ' s';
    }, 1000);
    grille.addEventListener('click', function (e) {
      var b = e.target.closest('.tuile');
      if (!b || bloque || b.classList.contains('visible')) return;
      b.classList.add('visible');
      retournees.push(b);
      if (retournees.length < 2) return;
      coups++;
      app.querySelector('.memory-coups').textContent = coups + ' coup' + (coups > 1 ? 's' : '');
      var a = tuiles[+retournees[0].dataset.i], c = tuiles[+retournees[1].dataset.i];
      if (a.k === c.k && a.type !== c.type) {
        retournees.forEach(function (x) { x.classList.add('trouvee'); });
        Jeu.sonner('bon');
        retournees = [];
        trouvees++;
        if (trouvees === paires.length) fin();
      } else {
        bloque = true;
        retournees.forEach(function (x) { x.classList.add('rate'); });
        Jeu.sonner('faux');
        setTimeout(function () {
          retournees.forEach(function (x) { x.classList.remove('visible', 'rate'); });
          retournees = []; bloque = false;
        }, 1000);
      }
    });
    function fin() {
      stop();
      var s = Math.round((Date.now() - debut) / 1000), cle = 'memory:' + m.id, best = Jeu.etat().best[cle];
      var record = !best || coups < best[0] || (coups === best[0] && s < best[1]);
      if (record) Jeu.etat().best[cle] = [coups, s];
      stat('memory');
      Jeu.compter('memory');
      if (coups <= paires.length + 3) Jeu.debloquer('memory');
      Jeu.gagner(20 + (coups <= paires.length + 3 ? 10 : 0), 'memory');
      Jeu.confettis();
      app.querySelector('.serie-retour').innerHTML = '<p class="qcm-expl"><b>Bravo ! ' + coups + ' coups en ' + s + ' s.</b>' +
        (record ? ' Nouveau record pour cette matière !' : ' Record : ' + best[0] + ' coups.') + '</p>' +
        '<a class="defi-go" href="#/' + m.id + '/memory" data-rejouer>Rejouer</a>';
      relancer(app, '#/' + m.id + '/memory');
    }
  }

  // ---------- Branchements ----------

  Activites.ajouterPage('boss', pageBoss);
  Activites.ajouterPage('chasse', pageChasse);
  Activites.ajouterPage('memory', pageMemory);
  Activites.ajouterPageGlobale('duel', pageDuel);

  Activites.ajouterActivite(function (m) {
    var n = Jeu.questionsMatiere(m.id).length, b = bossDe(m);
    return { ico: b[0], titre: 'Boss : ' + b[1], txt: Math.min(10, n) + ' questions, aucune erreur permise', lien: '#/' + m.id + '/boss', n: n >= 5 ? n : 0 };
  });
  Activites.ajouterActivite(function (m) {
    var n = chasseDe(m).length;
    return { ico: '🔍', titre: 'Chasse à l’erreur', txt: 'Une fiche truquée : trouve les erreurs', lien: '#/' + m.id + '/chasse', n: n >= 2 ? n : 0 };
  });
  Activites.ajouterActivite(function (m) {
    var n = pairesDe(m).length, best = Jeu.etat().best['memory:' + m.id];
    return { ico: '🧠', titre: 'Memory', txt: 'Retrouve les paires notion ↔ définition' + (best ? ' · record ' + best[0] + ' coups' : ''), lien: '#/' + m.id + '/memory', n: n >= 3 ? n : 0 };
  });

  Jeu.ajouterBadges(R.matieres.filter(function (m) { return Jeu.questionsMatiere(m.id).length >= 5; }).map(function (m) {
    return ['boss-' + m.id, '👑', 'Maître ' + m.nom, 'Battre le boss de ' + m.nom];
  }).concat([
    ['detective', '🕵️', 'Détective', 'Trouver toutes les erreurs d’une chasse, sans fausse alerte'],
    ['memory', '🧠', 'Mémoire photographique', 'Finir un memory en peu de coups'],
    ['duel', '⚔️', 'Esprit de compétition', 'Jouer un duel']
  ]), function (E) { return { 'duel': (E.stats.duels || 0) >= 1 }; });
  Jeu.ajouterMissions([
    { id: 'boss', txt: 'Affronter un boss', cle: 'boss', obj: 1, lien: Activites.lienEntrainement },
    { id: 'chasse', txt: 'Faire une chasse à l’erreur', cle: 'chasse', obj: 1, lien: Activites.lienEntrainement },
    { id: 'memory', txt: 'Terminer un memory', cle: 'memory', obj: 1, lien: Activites.lienEntrainement }
  ]);

  return { magasin: magasin, magasinSVG: magasinSVG };
})();
