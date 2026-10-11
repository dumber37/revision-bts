// Ambiance : sons légers (désactivables, générés par le navigateur, aucun fichier audio),
// animation d'entrée des pages et compteur d'XP qui défile.
var Ambiance = (function () {
  'use strict';

  var reduit = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- Sons ----------

  var ctx = null;
  function actif() { var r = Jeu.etat().reglages || {}; return r.son !== false; }
  function notes(liste, type, volume) {
    if (!actif()) return;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === 'suspended') ctx.resume();
      var t0 = ctx.currentTime;
      liste.forEach(function (n) {
        var o = ctx.createOscillator(), g = ctx.createGain();
        o.type = type || 'sine';
        o.frequency.value = n[0];
        g.gain.setValueAtTime(0.0001, t0 + n[1]);
        g.gain.exponentialRampToValueAtTime(volume || 0.08, t0 + n[1] + 0.015);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + n[1] + n[2]);
        o.connect(g).connect(ctx.destination);
        o.start(t0 + n[1]);
        o.stop(t0 + n[1] + n[2] + 0.05);
      });
    } catch (e) {}
  }
  var SONS = {
    bon: function () { notes([[660, 0, 0.1], [880, 0.08, 0.16]], 'triangle', 0.07); },
    faux: function () { notes([[230, 0, 0.16], [175, 0.1, 0.22]], 'sawtooth', 0.025); },
    badge: function () { notes([[523, 0, 0.12], [659, 0.1, 0.12], [784, 0.2, 0.12], [1047, 0.3, 0.3]], 'triangle', 0.07); },
    niveau: function () { notes([[392, 0, 0.14], [523, 0.13, 0.14], [659, 0.26, 0.14], [784, 0.39, 0.16], [1047, 0.55, 0.4]], 'square', 0.03); },
    clic: function () { notes([[1200, 0, 0.04]], 'sine', 0.03); }
  };
  Jeu.definirSon(function (t) { if (SONS[t]) SONS[t](); });

  function majBouton() {
    var b = document.getElementById('sonBtn');
    if (!b) return;
    b.textContent = actif() ? '🔊' : '🔇';
    b.setAttribute('aria-label', actif() ? 'Couper les sons' : 'Activer les sons');
    b.title = b.getAttribute('aria-label');
  }
  document.addEventListener('click', function (e) {
    if (!e.target.closest('#sonBtn')) return;
    var E = Jeu.etat();
    E.reglages = E.reglages || {};
    E.reglages.son = !actif();
    Jeu.sauver();
    majBouton();
    if (actif()) SONS.bon();
  });
  majBouton();

  // ---------- Animations ----------

  // Rejoue l'animation d'entrée de la page à chaque changement de route.
  function entree(app) {
    if (reduit) return;
    app.classList.remove('entree');
    void app.offsetWidth;
    app.classList.add('entree');
  }

  // Le compteur d'XP du bandeau défile depuis la dernière valeur vue.
  function compteurXP() {
    var el = document.querySelector('.hero-grade small');
    if (!el) return;
    var xp = Jeu.etat().xp, avant;
    try { avant = +sessionStorage.getItem('xpVu'); } catch (e) {}
    try { sessionStorage.setItem('xpVu', xp); } catch (e) {}
    if (reduit || !avant || avant >= xp) return;
    var debut = performance.now(), duree = Math.min(1500, 400 + (xp - avant) * 4);
    el.classList.add('monte');
    (function pas(t) {
      var p = Math.min(1, (t - debut) / duree), v = Math.round(avant + (xp - avant) * (1 - Math.pow(1 - p, 3)));
      el.textContent = v + ' XP';
      if (p < 1) requestAnimationFrame(pas); else el.classList.remove('monte');
    })(debut);
  }

  return { entree: entree, compteurXP: compteurXP, son: function (t) { if (SONS[t]) SONS[t](); } };
})();
