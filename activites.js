// Activités d'entraînement. S'appuie sur Jeu (progression) et R (données).
// - serie : questions une par une (révision des erreurs, examen blanc, boss…)
// - cartes mémo, remettre dans l'ordre, textes à trous, examen blanc, l'essentiel en 1 minute
var Activites = (function () {
  'use strict';

  var esc = Jeu.esc, melanger = Jeu.melanger;
  function matiere(id) { return R.matieres.filter(function (m) { return m.id === id; })[0]; }
  function fichesDe(id) { return R.fiches.filter(function (f) { return f.matiere === id; }); }
  function fil(m, txt) {
    return '<nav class="fil"><a href="#/">Matières</a> › ' + (m ? '<a href="#/' + m.id + '/entrainement">' + esc(m.nom) + '</a> › ' : '') + esc(txt) + '</nav>';
  }
  function stat(cle, n) { var E = Jeu.etat(); E.stats[cle] = (E.stats[cle] || 0) + (n || 1); Jeu.sauver(); }

  var minuteur = null;
  function quitter() { if (minuteur) { clearInterval(minuteur); minuteur = null; } }
  function mmss(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }

  // ---------- Série de questions, une à la fois ----------
  // opts : titre, m (matière, pour le fil d'Ariane), items [{id, q, f}],
  //        reprendre (une question ratée revient une fois en fin de série), stopErreur (arrêt à la 1re erreur),
  //        corrige (false : pas de correction immédiate), limite (secondes pour toute la série),
  //        fin(résultat) → HTML du bilan, rejouer (adresse #/…), pasDeListe (pas de liste d'erreurs).
  function serie(app, opts) {
    quitter();
    var file = opts.items.slice(), deja = {}, i = 0, total = file.length;
    var res = { bonnes: 0, total: 0, erreurs: [], reponses: [] };
    var corrige = opts.corrige !== false, debut = Date.now(), fini = false;

    function afficher() {
      var it = file[i], m = matiere(it.f.matiere);
      var reps = melanger(it.q[1].map(function (r, k) { return { txt: r, ok: k === 0 }; }));
      app.innerHTML = fil(opts.m, opts.titre) +
        '<section class="defi serie">' +
          '<div class="defi-haut"><span>' + esc(opts.titre) + ' · ' + (i + 1) + '/' + file.length + '</span>' +
            (opts.limite ? '<span class="serie-chrono">⏱ <b>' + mmss(opts.limite - (Date.now() - debut) / 1000) + '</b></span>' : '') +
            (corrige ? '<span class="defi-score">' + res.bonnes + ' ✓</span>' : '') + '</div>' +
          '<div class="serie-avance"><i style="width:' + Math.round(i / file.length * 100) + '%"></i></div>' +
          (opts.bandeau ? opts.bandeau(res, i, file.length) : '') +
          '<span class="defi-tag" style="--c:' + m.couleur + '">' + esc(m.nom) + ' · ' + esc(it.f.titre) + '</span>' +
          '<h2 class="defi-q">' + it.q[0] + '</h2>' +
          '<div class="qcm-reps defi-reps">' + reps.map(function (r, k) {
            return '<button type="button" data-ok="' + (r.ok ? 1 : 0) + '"><span class="qcm-lettre">' + 'ABCD'[k] + '</span>' + r.txt + '</button>';
          }).join('') + '</div>' +
          '<div class="serie-retour" aria-live="polite"></div>' +
        '</section>';
      app.querySelector('.defi-reps').addEventListener('click', function (e) {
        var b = e.target.closest('button[data-ok]');
        if (!b || b.disabled) return;
        repondre(it, b);
      });
    }

    function repondre(it, b) {
      var juste = b.dataset.ok === '1';
      res.total++;
      res.reponses.push({ it: it, juste: juste });
      if (juste) res.bonnes++; else res.erreurs.push(it);
      var serieEnCours = Jeu.reponse(juste, !corrige, it.id);
      Array.prototype.forEach.call(app.querySelectorAll('.defi-reps button'), function (x) {
        x.disabled = true;
        if (corrige && x.dataset.ok === '1') x.classList.add('bonne');
      });
      if (corrige) b.classList.add(juste ? 'bonne' : 'fausse');
      else b.classList.add('choisie');
      if (!juste && opts.reprendre && !deja[it.id]) { deja[it.id] = true; file.push(it); }

      var stop = !juste && opts.stopErreur;
      var retour = app.querySelector('.serie-retour');
      if (corrige) {
        retour.innerHTML = '<p class="qcm-expl">' + (juste ? '<b>Bonne réponse !</b>' + (serieEnCours >= 3 ? ' 🔥 ' + serieEnCours : '') : '<b>Raté.</b> Réponse : ' + it.q[1][0] + '.') +
          (it.q[2] ? ' ' + it.q[2] : '') + '</p>' +
          '<button type="button" class="defi-go suivant">' + (stop ? 'Voir le résultat' : i + 1 < file.length ? 'Question suivante ›' : 'Voir le bilan') + '</button>';
        var s = retour.querySelector('.suivant');
        s.focus({ preventScroll: true });
        s.addEventListener('click', function () { suite(stop); });
      } else {
        setTimeout(function () { if (!fini) suite(false); }, 300);
      }
    }

    function suite(stop) {
      i++;
      if (stop || i >= file.length) bilan(stop); else afficher();
    }

    function bilan(perdu, horsTemps) {
      if (fini) return;
      fini = true;
      quitter();
      res.perdu = !!perdu;
      res.horsTemps = !!horsTemps;
      res.attendu = total;
      var html = opts.fin ? opts.fin(res) : '';
      app.innerHTML = fil(opts.m, opts.titre) +
        '<section class="defi defi-fin">' +
          '<div class="defi-eclair">' + (res.perdu ? '💥' : res.bonnes === res.total && !horsTemps ? '🏆' : '💡') + '</div>' +
          (opts.pasDeScore ? '' : '<h1>' + res.bonnes + ' / ' + (horsTemps ? total : res.total) + '</h1>') + html +
          (opts.rejouer ? '<p><a class="defi-go" href="' + opts.rejouer + '" data-rejouer>Recommencer</a></p>' : '') +
        '</section>' +
        (opts.pasDeListe ? '' : Jeu.listeErreurs(dedoublonner(res.erreurs)));
      // Le lien pointe sur la page actuelle : on relance la route.
      var r = app.querySelector('[data-rejouer]');
      if (r) r.addEventListener('click', function (e) {
        if (location.hash === opts.rejouer) { e.preventDefault(); window.dispatchEvent(new HashChangeEvent('hashchange')); }
      });
    }

    function dedoublonner(t) {
      var vus = {};
      return t.filter(function (x) { if (vus[x.id]) return false; vus[x.id] = true; return true; });
    }

    if (!file.length) { app.innerHTML = fil(opts.m, opts.titre) + '<p class="vide">Aucune question disponible.</p>'; return; }
    if (opts.limite) {
      minuteur = setInterval(function () {
        var reste = opts.limite - (Date.now() - debut) / 1000, c = app.querySelector('.serie-chrono b');
        if (c) { c.textContent = mmss(reste); c.parentNode.classList.toggle('urgent', reste < 60); }
        if (reste <= 0) bilan(false, true);
      }, 500);
    }
    afficher();
  }

  // ---------- Contenus tirés des fiches ----------

  function domFiche(f) {
    var d = document.createElement('div');
    d.innerHTML = f.contenu;
    return d;
  }
  // Titre de la partie qui précède un élément (le h2/h3 le plus proche au-dessus).
  function contexte(el, f) {
    var n = el.previousElementSibling;
    while (n && !/^H[23]$/.test(n.tagName)) n = n.previousElementSibling;
    return n ? n.textContent : f.titre;
  }
  function cartesDe(m) {
    var t = [];
    fichesDe(m.id).forEach(function (f) {
      Array.prototype.forEach.call(domFiche(f).querySelectorAll('div.cartes'), function (bloc) {
        var ctx = contexte(bloc, f);
        Array.prototype.forEach.call(bloc.children, function (c) {
          var b = c.querySelector('b'), p = c.querySelector('p');
          if (b && p) t.push({ recto: b.innerHTML, verso: p.innerHTML, ctx: ctx, f: f });
        });
      });
    });
    return t;
  }
  function listesDe(m) {
    var t = [];
    fichesDe(m.id).forEach(function (f) {
      Array.prototype.forEach.call(domFiche(f).querySelectorAll('ol.etapes:not([data-libre])'), function (ol) {
        var etapes = Array.prototype.map.call(ol.children, function (li) { var b = li.querySelector('b'); return (b || li).textContent.trim(); });
        if (etapes.length >= 3) t.push({ titre: contexte(ol, f), etapes: etapes, f: f });
      });
    });
    return t;
  }
  function trousDe(m) {
    var t = [];
    fichesDe(m.id).forEach(function (f) {
      ((R.trous && R.trous[f.id]) || []).forEach(function (x) { t.push({ phrase: x[0], bonne: x[1], fausses: x[2], f: f }); });
    });
    return t;
  }

  // ---------- Page « S'entraîner » d'une matière ----------

  var activitesExtra = []; // ajoutées par les lots suivants : function (m) → {ico, titre, txt, lien, n}
  function ajouterActivite(fn) { activitesExtra.push(fn); }

  function hub(m) {
    var nq = Jeu.questionsMatiere(m.id).length, nc = cartesDe(m).length, nl = listesDe(m).length, nt = trousDe(m).length;
    var best = (Jeu.etat().best['examen:' + m.id] || null);
    var items = [
      { ico: '🃏', titre: 'Cartes mémo', txt: nc + ' cartes : devine, retourne, dis si tu savais', lien: '#/' + m.id + '/cartes', n: nc },
      { ico: '🔢', titre: 'Remettre dans l’ordre', txt: nl + ' liste' + (nl > 1 ? 's' : '') + ' d’étapes à reclasser', lien: '#/' + m.id + '/ordre', n: nl },
      { ico: '✏️', titre: 'Textes à trous', txt: nt + ' phrases à compléter', lien: '#/' + m.id + '/trous', n: nt },
      { ico: '📝', titre: 'Examen blanc', txt: Math.min(20, nq) + ' questions chronométrées, note sur 20' + (best ? ' · record ' + best[0] + '/20' : ''), lien: '#/' + m.id + '/examen', n: nq }
    ];
    activitesExtra.forEach(function (fn) { var x = fn(m); if (x) items.push(x); });
    items = items.filter(function (x) { return x.n > 0; });
    if (!items.length) return '<p class="vide">Pas encore d’entraînement : il arrivera avec les fiches de cette matière.</p>';
    return '<div class="activites">' + items.map(function (x) {
      return '<a class="activite" href="' + x.lien + '" style="--c:' + m.couleur + '"><span class="activite-ico">' + x.ico + '</span>' +
        '<span><b>' + esc(x.titre) + '</b><span>' + esc(x.txt) + '</span></span></a>';
    }).join('') + '</div>';
  }

  // ---------- Cartes mémo ----------

  function pageCartes(app, m) {
    document.title = 'Cartes mémo · ' + m.nom;
    var paquet = melanger(cartesDe(m)), total = paquet.length, sues = 0, premiers = 0, vues = {};
    if (!total) { app.innerHTML = fil(m, 'Cartes mémo') + '<p class="vide">Pas de cartes pour cette matière.</p>'; return; }

    function afficher() {
      var c = paquet[0];
      app.innerHTML = fil(m, 'Cartes mémo') +
        '<section class="memo" style="--c:' + m.couleur + '">' +
          '<div class="defi-haut"><span>🃏 Cartes mémo</span><span class="defi-score">' + sues + '/' + total + ' sues</span></div>' +
          '<div class="serie-avance"><i style="width:' + Math.round(sues / total * 100) + '%"></i></div>' +
          '<button type="button" class="memo-carte" aria-label="Retourner la carte">' +
            '<span class="memo-in"><span class="memo-face memo-recto"><small>' + esc(c.ctx) + '</small><b>' + c.recto + '</b><em>Touche pour retourner</em></span>' +
            '<span class="memo-face memo-verso"><small>' + esc(c.f.titre) + '</small><span>' + c.verso + '</span></span></span>' +
          '</button>' +
          '<div class="memo-choix" hidden>' +
            '<button type="button" class="memo-non">↻ À revoir</button>' +
            '<button type="button" class="memo-oui">✓ Je savais</button>' +
          '</div>' +
          '<p class="memo-aide">Clavier : espace pour retourner, → je savais, ← à revoir.</p>' +
        '</section>';
      var carte = app.querySelector('.memo-carte'), choix = app.querySelector('.memo-choix');
      function retourner() { carte.classList.toggle('retournee'); choix.hidden = false; }
      carte.addEventListener('click', retourner);
      app.querySelector('.memo-oui').addEventListener('click', function () { decider(true); });
      app.querySelector('.memo-non').addEventListener('click', function () { decider(false); });
      clavier = function (e) {
        if (e.key === ' ') { e.preventDefault(); retourner(); }
        else if (e.key === 'ArrowRight' && !choix.hidden) decider(true);
        else if (e.key === 'ArrowLeft' && !choix.hidden) decider(false);
      };
    }
    function decider(ok) {
      var c = paquet.shift(), cle = c.recto + c.ctx;
      if (ok) { sues++; if (!vues[cle]) premiers++; }
      else { vues[cle] = true; paquet.splice(Math.min(paquet.length, 3), 0, c); } // revient 3 cartes plus loin
      if (paquet.length) afficher(); else fin();
    }
    function fin() {
      clavier = null;
      stat('cartes', total);
      Jeu.compter('cartes');
      Jeu.gagner(premiers * 2 + 10, 'cartes mémo');
      if (premiers === total) Jeu.confettis();
      app.innerHTML = fil(m, 'Cartes mémo') +
        '<section class="defi defi-fin"><div class="defi-eclair">🃏</div><h1>' + premiers + ' / ' + total + '</h1>' +
          '<p>cartes sues du premier coup. Les autres sont revenues jusqu’à ce que tu les saches.</p>' +
          '<p><a class="defi-go" href="#/' + m.id + '/cartes" data-rejouer>Rejouer le paquet</a></p></section>';
      relancer(app, '#/' + m.id + '/cartes');
    }
    afficher();
  }
  var clavier = null;
  document.addEventListener('keydown', function (e) { if (clavier && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) clavier(e); });

  function relancer(app, h) {
    var r = app.querySelector('[data-rejouer]');
    if (r) r.addEventListener('click', function (e) {
      if (location.hash === h) { e.preventDefault(); window.dispatchEvent(new HashChangeEvent('hashchange')); }
    });
  }

  // ---------- Remettre dans l'ordre ----------

  function pageOrdre(app, m) {
    document.title = 'Remettre dans l’ordre · ' + m.nom;
    var listes = melanger(listesDe(m)), k = 0, parfaites = 0;
    if (!listes.length) { app.innerHTML = fil(m, 'Remettre dans l’ordre') + '<p class="vide">Pas de liste pour cette matière.</p>'; return; }

    function jouer() {
      var L = listes[k], places = 0, erreurs = 0;
      var melange = melanger(L.etapes.map(function (e, i) { return { txt: e, i: i }; }));
      app.innerHTML = fil(m, 'Remettre dans l’ordre') +
        '<section class="defi ordre" style="--c:' + m.couleur + '">' +
          '<div class="defi-haut"><span>🔢 Liste ' + (k + 1) + '/' + listes.length + '</span><span class="defi-score ordre-err">0 erreur</span></div>' +
          '<span class="defi-tag">' + esc(L.f.titre) + '</span>' +
          '<h2 class="defi-q">' + esc(L.titre) + '</h2>' +
          '<p class="ordre-aide">Touche les étapes dans le bon ordre, de la première à la dernière.</p>' +
          '<ol class="ordre-rang"></ol>' +
          '<div class="ordre-pioche">' + melange.map(function (x) {
            return '<button type="button" data-i="' + x.i + '">' + esc(x.txt) + '</button>';
          }).join('') + '</div>' +
          '<div class="serie-retour"></div>' +
        '</section>';
      var rang = app.querySelector('.ordre-rang'), pioche = app.querySelector('.ordre-pioche');
      pioche.addEventListener('click', function (e) {
        var b = e.target.closest('button[data-i]');
        if (!b) return;
        if (+b.dataset.i === places) {
          var li = document.createElement('li');
          li.textContent = b.textContent;
          rang.appendChild(li);
          b.remove();
          places++;
          if (places === L.etapes.length) terminer(erreurs);
        } else {
          erreurs++;
          app.querySelector('.ordre-err').textContent = erreurs + ' erreur' + (erreurs > 1 ? 's' : '');
          b.classList.remove('secoue'); void b.offsetWidth; b.classList.add('secoue');
        }
      });
    }
    function terminer(erreurs) {
      if (!erreurs) parfaites++;
      stat('ordres');
      if (!erreurs) stat('ordresParfaits');
      Jeu.compter('ordre');
      Jeu.gagner(erreurs ? 8 : 15, erreurs ? 'liste remise en ordre' : 'ordre parfait !');
      if (!erreurs) Jeu.confettis();
      var r = app.querySelector('.serie-retour');
      r.innerHTML = '<p class="qcm-expl"><b>' + (erreurs ? 'Liste complète, avec ' + erreurs + ' erreur' + (erreurs > 1 ? 's' : '') + '.' : 'Sans faute !') + '</b></p>' +
        (k + 1 < listes.length ? '<button type="button" class="defi-go">Liste suivante ›</button>'
          : '<p>Toutes les listes sont faites : ' + parfaites + '/' + listes.length + ' sans faute.</p><a class="defi-go" href="#/' + m.id + '/ordre" data-rejouer>Recommencer</a>');
      var b = r.querySelector('button.defi-go');
      if (b) b.addEventListener('click', function () { k++; jouer(); });
      relancer(app, '#/' + m.id + '/ordre');
    }
    jouer();
  }

  // ---------- Textes à trous ----------

  function pageTrous(app, m) {
    document.title = 'Textes à trous · ' + m.nom;
    var items = melanger(trousDe(m)).slice(0, 8), i = 0, bonnes = 0, erreurs = [];
    if (!items.length) { app.innerHTML = fil(m, 'Textes à trous') + '<p class="vide">Pas de texte à trous pour cette matière.</p>'; return; }

    function afficher() {
      var it = items[i], choix = melanger([it.bonne].concat(it.fausses));
      app.innerHTML = fil(m, 'Textes à trous') +
        '<section class="defi trous" style="--c:' + m.couleur + '">' +
          '<div class="defi-haut"><span>✏️ Phrase ' + (i + 1) + '/' + items.length + '</span><span class="defi-score">' + bonnes + ' ✓</span></div>' +
          '<div class="serie-avance"><i style="width:' + Math.round(i / items.length * 100) + '%"></i></div>' +
          '<span class="defi-tag">' + esc(it.f.titre) + '</span>' +
          '<p class="trou-phrase">' + esc(it.phrase).replace('___', '<span class="trou">?</span>') + '</p>' +
          '<div class="trou-choix">' + choix.map(function (c) { return '<button type="button">' + esc(c) + '</button>'; }).join('') + '</div>' +
          '<div class="serie-retour"></div>' +
        '</section>';
      app.querySelector('.trou-choix').addEventListener('click', function (e) {
        var b = e.target.closest('button');
        if (!b || b.disabled) return;
        var juste = b.textContent === it.bonne;
        Array.prototype.forEach.call(app.querySelectorAll('.trou-choix button'), function (x) {
          x.disabled = true;
          if (x.textContent === it.bonne) x.classList.add('bonne');
        });
        if (!juste) { b.classList.add('fausse'); erreurs.push(it); } else bonnes++;
        var trou = app.querySelector('.trou');
        trou.textContent = it.bonne;
        trou.classList.add(juste ? 'ok' : 'ko');
        if (juste) { Jeu.gagner(5, '', true); Jeu.compter('trous'); stat('trous'); }
        var r = app.querySelector('.serie-retour');
        r.innerHTML = '<p class="qcm-expl"><b>' + (juste ? 'Exact !' : 'Raté.') + '</b> ' + (juste ? '' : 'La bonne réponse : ' + esc(it.bonne) + '.') + '</p>' +
          '<button type="button" class="defi-go">' + (i + 1 < items.length ? 'Phrase suivante ›' : 'Voir le bilan') + '</button>';
        r.querySelector('button').addEventListener('click', function () { i++; if (i < items.length) afficher(); else fin(); });
      });
    }
    function fin() {
      Jeu.gagner(10, 'textes à trous');
      if (bonnes === items.length) Jeu.confettis();
      app.innerHTML = fil(m, 'Textes à trous') +
        '<section class="defi defi-fin"><div class="defi-eclair">✏️</div><h1>' + bonnes + ' / ' + items.length + '</h1>' +
          '<p><a class="defi-go" href="#/' + m.id + '/trous" data-rejouer>Nouvelles phrases</a></p></section>' +
        (erreurs.length ? '<h2 class="titre-section">À retenir</h2><div class="defi-erreurs">' + erreurs.map(function (it) {
          return '<div class="defi-erreur"><p>' + esc(it.phrase).replace('___', '<b class="trou ok">' + esc(it.bonne) + '</b>') + '</p>' +
            '<a href="#/' + m.id + '/' + it.f.id + '">Revoir la fiche « ' + esc(it.f.titre) + ' » ›</a></div>';
        }).join('') + '</div>' : '');
      relancer(app, '#/' + m.id + '/trous');
    }
    afficher();
  }

  // ---------- Examen blanc ----------

  function pageExamen(app, m) {
    document.title = 'Examen blanc · ' + m.nom;
    var banque = Jeu.questionsMatiere(m.id), n = Math.min(20, banque.length), limite = n * 30;
    var best = Jeu.etat().best['examen:' + m.id];
    app.innerHTML = fil(m, 'Examen blanc') +
      '<section class="defi defi-accueil" style="--c:' + m.couleur + '">' +
        '<div class="defi-eclair">📝</div><h1>Examen blanc · ' + esc(m.nom) + '</h1>' +
        '<p><b>' + n + ' questions</b> en <b>' + mmss(limite) + '</b> minutes, toutes les fiches de la matière.</p>' +
        '<ul><li>Pas de correction pendant l’épreuve, comme le jour J</li><li>À la fin : ta note sur 20 et ton bilan par chapitre</li><li>Les erreurs partent dans ta révision</li></ul>' +
        (best ? '<p class="defi-record">Ta meilleure note : <b>' + best[0] + '/20</b></p>' : '') +
        '<button type="button" class="defi-go">Commencer l’examen</button>' +
      '</section>';
    app.querySelector('.defi-go').addEventListener('click', function () {
      serie(app, {
        titre: 'Examen blanc', m: m, items: melanger(banque).slice(0, n), corrige: false, limite: limite, rejouer: '#/' + m.id + '/examen', pasDeScore: true,
        fin: function (r) {
          var note = Math.round(r.bonnes / n * 40) / 2; // au demi-point
          var b = Jeu.etat().best['examen:' + m.id];
          if (!b || note > b[0]) Jeu.etat().best['examen:' + m.id] = [note, 20];
          stat('examens');
          if (note >= 15) Jeu.debloquer('examen-15');
          Jeu.compter('examen');
          Jeu.gagner(Math.round(note * 3), 'examen blanc');
          if (note >= 16) Jeu.confettis();
          // Bilan par chapitre (fiche)
          var parFiche = {};
          r.reponses.forEach(function (x) {
            var p = parFiche[x.it.f.id] || (parFiche[x.it.f.id] = { f: x.it.f, b: 0, t: 0 });
            p.t++; if (x.juste) p.b++;
          });
          var lignes = Object.keys(parFiche).map(function (k) { return parFiche[k]; }).sort(function (a, b) { return a.b / a.t - b.b / b.t; });
          return '<p class="note-examen">' + String(note).replace('.', ',') + '<small>/20</small></p>' +
            '<p>' + (r.horsTemps ? 'Temps écoulé : les questions sans réponse comptent comme fausses. ' : '') +
            (note >= 16 ? 'Excellent, tu es prêt.' : note >= 12 ? 'Bien, encore quelques points à consolider.' : note >= 10 ? 'C’est juste : revois les chapitres en rouge.' : 'Reprends les fiches en rouge, puis retente.') + '</p>' +
            '<div class="table-wrap"><table class="bilan"><tr><th>Chapitre</th><th>Score</th></tr>' + lignes.map(function (p) {
              var r2 = p.b / p.t;
              return '<tr class="' + (r2 >= 0.75 ? 'bon' : r2 >= 0.5 ? 'moyen' : 'faible') + '"><td><a href="#/' + m.id + '/' + p.f.id + '">' + esc(p.f.titre) + '</a></td><td>' + p.b + '/' + p.t + '</td></tr>';
            }).join('') + '</table></div>';
        }
      });
    });
  }

  // ---------- L'essentiel en 1 minute ----------

  function encadreEssentiel(f) {
    var t = R.essentiel && R.essentiel[f.id];
    if (!t) return '';
    return '<aside class="essentiel"><div class="essentiel-titre">⏱ L’essentiel en 1 minute</div><ul>' +
      t.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></aside>';
  }

  function pageExpress(app) {
    document.title = 'L’essentiel en 1 minute · Révisions BTS MCO';
    var html = R.matieres.map(function (m) {
      var fs = fichesDe(m.id).filter(function (f) { return R.essentiel && R.essentiel[f.id]; });
      if (!fs.length) return '';
      return '<h2 class="titre-section" style="color:' + m.couleur + '">' + esc(m.nom) + '</h2>' + fs.map(function (f) {
        return '<div class="express-fiche" style="--c:' + m.couleur + '"><a href="#/' + m.id + '/' + f.id + '"><b>' + esc(f.titre) + '</b> ›</a><ul>' +
          R.essentiel[f.id].map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
      }).join('');
    }).join('');
    app.innerHTML = '<nav class="fil"><a href="#/">Matières</a> › L’essentiel en 1 minute</nav>' +
      '<section class="express-tete"><div class="defi-eclair">⏱</div><h1>L’essentiel en 1 minute</h1>' +
      '<p>Les 3 choses à retenir de chaque fiche. Parfait juste avant l’épreuve.</p></section>' + html +
      '<p class="express-fin"><button type="button" class="defi-go">J’ai tout relu ✓</button></p>';
    app.querySelector('.express-fin button').addEventListener('click', function (e) {
      Jeu.compter('express');
      Jeu.debloquer('express');
      if (!Jeu.etat().corr['express-' + Jeu.jour()]) { Jeu.etat().corr['express-' + Jeu.jour()] = true; Jeu.gagner(15, 'révision express'); }
      e.target.disabled = true;
      e.target.textContent = '✓ Relu aujourd’hui';
    });
  }

  // ---------- Badges et missions de ce lot ----------

  Jeu.ajouterBadges([
    ['cartes-50', '🃏', 'Mémoire vive', 'Revoir 50 cartes mémo'],
    ['ordre-3', '🔢', 'Méthodique', 'Remettre 3 listes dans l’ordre sans erreur'],
    ['trous-20', '✏️', 'Plume affûtée', 'Compléter 20 textes à trous'],
    ['examen-15', '📝', 'Prêt pour le jour J', 'Avoir 15/20 ou plus à un examen blanc'],
    ['express', '⏱', 'Révision express', 'Relire l’essentiel en 1 minute']
  ], function (E) {
    return {
      'cartes-50': (E.stats.cartes || 0) >= 50,
      'ordre-3': (E.stats.ordresParfaits || 0) >= 3,
      'trous-20': (E.stats.trous || 0) >= 20
    };
  });
  Jeu.ajouterMissions([
    { id: 'cartes', txt: 'Faire un paquet de cartes mémo', cle: 'cartes', obj: 1, lien: '#/' },
    { id: 'ordre', txt: 'Remettre 2 listes dans l’ordre', cle: 'ordre', obj: 2, lien: '#/' },
    { id: 'trous', txt: 'Compléter 5 textes à trous', cle: 'trous', obj: 5, lien: '#/' },
    { id: 'examen', txt: 'Passer un examen blanc', cle: 'examen', obj: 1, lien: '#/' },
    { id: 'express', txt: 'Relire l’essentiel en 1 minute', cle: 'express', obj: 1, lien: '#/express' }
  ]);

  // Pages ajoutées par d'autres modules : #/<matière>/<nom> et #/<nom>.
  var pagesMatiere = {}, pagesGlobales = {};
  var arrets = [];

  return {
    ajouterPage: function (nom, fn) { pagesMatiere[nom] = fn; },
    page: function (nom) { return pagesMatiere[nom]; },
    ajouterPageGlobale: function (nom, fn) { pagesGlobales[nom] = fn; },
    pageGlobale: function (nom) { return pagesGlobales[nom]; },
    surQuitter: function (fn) { arrets.push(fn); },
    quitterTout: function () { quitter(); clavier = null; arrets.forEach(function (fn) { fn(); }); },
    serie: serie, matiere: matiere, quitter: quitter, hub: hub, ajouterActivite: ajouterActivite,
    cartesDe: cartesDe, listesDe: listesDe, trousDe: trousDe, fil: fil, stat: stat, relancer: relancer,
    pageCartes: pageCartes, pageOrdre: pageOrdre, pageTrous: pageTrous, pageExamen: pageExamen,
    pageExpress: pageExpress, encadreEssentiel: encadreEssentiel,
    definirClavier: function (fn) { clavier = fn; }
  };
})();
