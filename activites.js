// Activités d'entraînement : série de questions une par une (révision des erreurs, boss, examen…),
// et les jeux ajoutés au fil des lots. S'appuie sur Jeu (progression) et R (données).
var Activites = (function () {
  'use strict';

  var esc = Jeu.esc, melanger = Jeu.melanger;
  function matiere(id) { return R.matieres.filter(function (m) { return m.id === id; })[0]; }

  // ---------- Série de questions, une à la fois ----------
  // opts : titre, fil, items [{id, q, f}], reprendre (une question ratée revient une fois en fin de série),
  //        stopErreur (la série s'arrête à la première erreur), corrige (false : pas de correction immédiate),
  //        fin(résultat) → HTML du bilan, rejouer (adresse #/…).
  function serie(app, opts) {
    var file = opts.items.slice(), deja = {}, i = 0, total = file.length;
    var res = { bonnes: 0, total: 0, erreurs: [], reponses: [] };
    var corrige = opts.corrige !== false;

    function afficher() {
      var it = file[i], m = matiere(it.f.matiere);
      var reps = melanger(it.q[1].map(function (r, k) { return { txt: r, ok: k === 0 }; }));
      app.innerHTML =
        '<nav class="fil"><a href="#/">Matières</a> › ' + esc(opts.fil || opts.titre) + '</nav>' +
        '<section class="defi serie">' +
          '<div class="defi-haut"><span>' + esc(opts.titre) + ' · ' + (i + 1) + '/' + file.length + '</span>' +
            (corrige ? '<span class="defi-score">' + res.bonnes + ' ✓</span>' : '') + '</div>' +
          '<div class="serie-avance"><i style="width:' + Math.round(i / file.length * 100) + '%"></i></div>' +
          '<span class="defi-tag" style="--c:' + m.couleur + '">' + esc(m.nom) + ' · ' + esc(it.f.titre) + '</span>' +
          '<h2 class="defi-q">' + it.q[0] + '</h2>' +
          '<div class="qcm-reps defi-reps">' + reps.map(function (r, k) {
            return '<button type="button" data-ok="' + (r.ok ? 1 : 0) + '"><span class="qcm-lettre">' + 'ABCD'[k] + '</span>' + r.txt + '</button>';
          }).join('') + '</div>' +
          '<div class="serie-retour" aria-live="polite"></div>' +
        '</section>';
      if (opts.chrono) opts.chrono(app);
      app.querySelector('.defi-reps').addEventListener('click', function (e) {
        var b = e.target.closest('button[data-ok]');
        if (!b || b.disabled) return;
        repondre(it, b);
      });
    }

    function repondre(it, b) {
      var juste = b.dataset.ok === '1';
      res.total++;
      res.reponses.push({ it: it, juste: juste, choix: b.textContent.slice(1) });
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
        setTimeout(function () { suite(false); }, 350);
      }
    }

    function suite(stop) {
      i++;
      if (stop || i >= file.length) bilan(stop); else afficher();
    }

    function bilan(perdu) {
      res.perdu = !!perdu;
      res.attendu = total;
      var html = opts.fin ? opts.fin(res) : '';
      app.innerHTML =
        '<nav class="fil"><a href="#/">Matières</a> › ' + esc(opts.fil || opts.titre) + '</nav>' +
        '<section class="defi defi-fin">' +
          '<div class="defi-eclair">' + (res.perdu ? '💥' : res.bonnes === res.total ? '🏆' : '💡') + '</div>' +
          '<h1>' + res.bonnes + ' / ' + res.total + '</h1>' + html +
          (opts.rejouer ? '<a class="defi-go" href="' + opts.rejouer + '" data-rejouer>Recommencer</a>' : '') +
        '</section>' +
        (opts.pasDeListe ? '' : Jeu.listeErreurs(dedoublonner(res.erreurs)));
      // Le lien pointe sur la page actuelle : on force le rechargement de la route.
      var r = app.querySelector('[data-rejouer]');
      if (r) r.addEventListener('click', function (e) {
        if (location.hash === opts.rejouer) { e.preventDefault(); window.dispatchEvent(new HashChangeEvent('hashchange')); }
      });
    }

    function dedoublonner(t) {
      var vus = {};
      return t.filter(function (x) { if (vus[x.id]) return false; vus[x.id] = true; return true; });
    }

    if (!file.length) { app.innerHTML = '<p class="vide">Aucune question disponible.</p>'; return; }
    afficher();
  }

  return { serie: serie, matiere: matiere };
})();
