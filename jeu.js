// Côté ludique : XP, niveaux, flamme (jours d'affilée), étoiles par fiche, badges, Défi éclair.
// La progression reste dans le navigateur (localStorage) : rien n'est envoyé ailleurs.
var Jeu = (function () {
  'use strict';

  var CLE = 'revision-bts-jeu';
  var NIVEAUX = [
    [0, 'Stagiaire'], [100, 'Vendeur'], [300, 'Vendeur confirmé'], [600, 'Conseiller expert'],
    [1000, 'Chef de rayon'], [1600, 'Manager'], [2500, 'Directeur de magasin'], [4000, 'Légende de Sport’Tours']
  ];

  function vierge() {
    return { xp: 0, jours: { dernier: '', serie: 0, max: 0 }, lues: {}, best: {}, badges: {}, corr: {},
             stats: { bonnes: 0, reponses: 0, qcm: 0, defis: 0, record: 0, comboMax: 0 } };
  }
  var E = vierge();
  try {
    var brut = JSON.parse(localStorage.getItem(CLE));
    if (brut && typeof brut === 'object') {
      for (var k in E) if (brut[k] !== undefined) E[k] = brut[k];
      for (var s in vierge().stats) if (E.stats[s] === undefined) E.stats[s] = 0;
    }
  } catch (e) {}
  function sauver() { try { localStorage.setItem(CLE, JSON.stringify(E)); } catch (e) {} }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function jour(d) {
    d = d || new Date();
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  // ---------- Niveau et flamme ----------

  function niveau(xp) {
    var i = 0;
    while (i + 1 < NIVEAUX.length && xp >= NIVEAUX[i + 1][0]) i++;
    var bas = NIVEAUX[i][0], haut = NIVEAUX[i + 1] ? NIVEAUX[i + 1][0] : null;
    return { n: i + 1, nom: NIVEAUX[i][1], bas: bas, haut: haut,
             pct: haut ? Math.round((xp - bas) / (haut - bas) * 100) : 100 };
  }

  function marquerJour() {
    var auj = jour(), hier = jour(new Date(Date.now() - 864e5));
    if (E.jours.dernier === auj) return;
    E.jours.serie = E.jours.dernier === hier ? E.jours.serie + 1 : 1;
    E.jours.max = Math.max(E.jours.max, E.jours.serie);
    E.jours.dernier = auj;
  }
  // La flamme s'éteint si on a sauté un jour.
  function serieActuelle() {
    var hier = jour(new Date(Date.now() - 864e5));
    return (E.jours.dernier === jour() || E.jours.dernier === hier) ? E.jours.serie : 0;
  }

  function gagner(xp, raison, discret) {
    if (!xp) return;
    var avant = niveau(E.xp).n;
    E.xp += xp;
    marquerJour();
    verifierBadges();
    sauver();
    majChip();
    if (!discret) toast("+" + xp + " XP" + (raison ? " · " + raison : ""));
    var apres = niveau(E.xp);
    if (apres.n > avant) {
      toast('🎉 Niveau ' + apres.n + ' : ' + apres.nom + ' !', 'grand');
      confettis();
    }
  }

  function majChip() {
    var c = document.getElementById('niveau');
    if (!c) return;
    var nv = niveau(E.xp), f = serieActuelle();
    c.innerHTML = '<span class="chip-nv">Niv. ' + nv.n + '</span><span class="chip-barre"><i style="width:' + nv.pct + '%"></i></span>' +
      (f ? '<span class="chip-flamme" title="Jours de révision d’affilée">🔥 ' + f + '</span>' : '');
    c.title = nv.nom + ' · ' + E.xp + ' XP';
  }

  // ---------- Notifications et confettis ----------

  var pile;
  function toast(txt, type) {
    if (!pile) { pile = document.createElement('div'); pile.className = 'toasts'; pile.setAttribute('aria-live', 'polite'); document.body.appendChild(pile); }
    var t = document.createElement('div');
    t.className = 'toast' + (type ? ' ' + type : '');
    t.textContent = txt;
    pile.appendChild(t);
    setTimeout(function () { t.classList.add('sort'); }, type === 'grand' ? 2600 : 1600);
    setTimeout(function () { t.remove(); }, type === 'grand' ? 3000 : 2000);
  }

  function confettis() {
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var box = document.createElement('div');
    box.className = 'confettis';
    var couleurs = ['#e8a33d', '#b85c1e', '#1d6b6b', '#2f5fb3', '#6b4fa0', '#f5f2ec'];
    for (var i = 0; i < 60; i++) {
      var s = document.createElement('i');
      s.style.left = Math.random() * 100 + '%';
      s.style.background = couleurs[i % couleurs.length];
      s.style.animationDelay = (Math.random() * 0.4) + 's';
      s.style.animationDuration = (1.4 + Math.random() * 1.2) + 's';
      s.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 3200);
  }

  // ---------- Badges ----------

  var BADGES = [
    ['premier-qcm', '🎯', 'Premier pas', 'Terminer un premier QCM'],
    ['sans-faute', '💯', 'Sans-faute', 'Faire un QCM parfait'],
    ['serie-5', '🔥', 'En feu', '5 bonnes réponses d’affilée'],
    ['serie-10', '☄️', 'Inarrêtable', '10 bonnes réponses d’affilée'],
    ['lecteur-5', '📖', 'Rat de bibliothèque', 'Lire 5 fiches jusqu’au bout'],
    ['toutes-fiches', '🏛️', 'Tout vu', 'Lire toutes les fiches du site'],
    ['calculs', '🧮', 'As du calcul', 'Ouvrir les 9 corrections de la page Formules'],
    ['eclair', '⚡', 'Éclair', 'Terminer un Défi éclair'],
    ['eclair-8', '🏆', 'Champion éclair', 'Au moins 8/10 au Défi éclair'],
    ['flamme-3', '🕯️', 'Régulier', 'Réviser 3 jours d’affilée'],
    ['flamme-7', '🌋', 'Assidu', 'Réviser 7 jours d’affilée'],
    ['cent', '💪', 'Centurion', '100 bonnes réponses au total'],
    ['manager', '👔', 'Promu manager', 'Atteindre le niveau Manager']
  ];
  function conditions() {
    var c = {
      'premier-qcm': E.stats.qcm >= 1,
      'serie-5': E.stats.comboMax >= 5,
      'serie-10': E.stats.comboMax >= 10,
      'lecteur-5': Object.keys(E.lues).length >= 5,
      'toutes-fiches': R.fiches.length > 0 && R.fiches.every(function (f) { return E.lues[f.id]; }),
      'calculs': Object.keys(E.corr).length >= 9,
      'eclair': E.stats.defis >= 1,
      'flamme-3': E.jours.max >= 3,
      'flamme-7': E.jours.max >= 7,
      'cent': E.stats.bonnes >= 100,
      'manager': E.xp >= 1600
    };
    return c;
  }
  function debloquer(id) {
    if (E.badges[id]) return;
    E.badges[id] = jour();
    var b = BADGES.filter(function (x) { return x[0] === id; })[0];
    if (b) setTimeout(function () { toast(b[1] + ' Badge débloqué : ' + b[2], 'grand'); }, 400);
  }
  function verifierBadges() {
    var c = conditions();
    for (var id in c) if (c[id]) debloquer(id);
  }

  // ---------- Événements venant des pages ----------

  var combo = 0;
  // Retourne la série en cours, affichée par le QCM.
  function reponse(juste, discret) {
    E.stats.reponses++;
    if (juste) {
      combo++;
      E.stats.bonnes++;
      E.stats.comboMax = Math.max(E.stats.comboMax, combo);
      gagner(10 + (combo >= 3 ? 5 : 0), combo >= 3 ? "série de " + combo + " 🔥" : "", discret);
    } else {
      combo = 0;
      marquerJour(); sauver(); majChip();
    }
    return combo;
  }

  function qcmFini(cle, bonnes, total) {
    E.stats.qcm++;
    var b = E.best[cle];
    if (!b || bonnes / total > b[0] / b[1]) E.best[cle] = [bonnes, total];
    if (bonnes === total) { debloquer('sans-faute'); confettis(); gagner(20, 'sans-faute !'); }
    else { verifierBadges(); sauver(); }
  }

  function ficheLue(id) {
    if (E.lues[id]) return;
    E.lues[id] = jour();
    gagner(15, 'fiche lue');
  }

  function correction(i) {
    if (E.corr[i]) return;
    E.corr[i] = true;
    gagner(5, 'correction');
  }

  // ---------- Étoiles et progression ----------

  function nbEtoiles(id) {
    var b = E.best['fiche:' + id];
    if (!b) return 0;
    var r = b[0] / b[1];
    return r === 1 ? 3 : r >= 0.8 ? 2 : r >= 0.6 ? 1 : 0;
  }
  function etoiles(id) {
    var n = nbEtoiles(id);
    return '<span class="etoiles" title="Meilleur QCM : ' + (E.best['fiche:' + id] ? E.best['fiche:' + id].join(' / ') : 'pas encore fait') + '">' +
      '★★★'.slice(0, n) + '<i>' + '★★★'.slice(n) + '</i></span>' +
      (E.lues[id] ? '<span class="lue">✓ lue</span>' : '');
  }
  function progression(fiches) {
    if (!fiches.length) return '';
    var lues = fiches.filter(function (f) { return E.lues[f.id]; }).length;
    var et = fiches.reduce(function (s, f) { return s + nbEtoiles(f.id); }, 0);
    var pct = Math.round((lues + et) / (fiches.length * 4) * 100);
    return '<span class="progression"><span class="prog-barre"><i style="width:' + pct + '%"></i></span>' +
      '<span class="prog-txt">' + lues + '/' + fiches.length + ' lues · ★ ' + et + '/' + fiches.length * 3 + '</span></span>';
  }

  // ---------- Page Profil ----------

  function pageProfil(app) {
    document.title = 'Mon profil · Révisions BTS MCO';
    var nv = niveau(E.xp);
    var taux = E.stats.reponses ? Math.round(E.stats.bonnes / E.stats.reponses * 100) : 0;
    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › Mon profil</nav>' +
      '<section class="profil">' +
        '<div class="profil-niveau"><span class="profil-n">' + nv.n + '</span><div>' +
          '<b>' + esc(nv.nom) + '</b><span>' + E.xp + ' XP' + (nv.haut ? ' · encore ' + (nv.haut - E.xp) + ' XP pour « ' + esc(NIVEAUX[nv.n][1]) + ' »' : ' · niveau maximum') + '</span>' +
          '<span class="prog-barre grande"><i style="width:' + nv.pct + '%"></i></span></div></div>' +
        '<div class="chiffres">' +
          '<div><b>Flamme</b><strong>🔥 ' + serieActuelle() + '</strong><span>jours d’affilée (record : ' + E.jours.max + ')</span></div>' +
          '<div><b>Bonnes réponses</b><strong>' + E.stats.bonnes + '</strong><span>' + taux + ' % de réussite</span></div>' +
          '<div><b>Fiches lues</b><strong>' + Object.keys(E.lues).length + '/' + R.fiches.length + '</strong><span>jusqu’au bout</span></div>' +
          '<div><b>Défi éclair</b><strong>' + E.stats.record + '</strong><span>points, record</span></div>' +
        '</div>' +
      '</section>' +
      '<h2 class="titre-section">Badges (' + Object.keys(E.badges).length + '/' + BADGES.length + ')</h2>' +
      '<div class="badges">' + BADGES.map(function (b) {
        var ok = E.badges[b[0]];
        return '<div class="badge' + (ok ? ' ok' : '') + '"><span class="badge-ico">' + (ok ? b[1] : '🔒') + '</span>' +
          '<b>' + esc(b[2]) + '</b><span>' + esc(b[3]) + '</span></div>';
      }).join('') + '</div>' +
      '<h2 class="titre-section">Les grades</h2>' +
      '<ol class="grades">' + NIVEAUX.map(function (g, i) {
        return '<li class="' + (i + 1 < nv.n ? 'passe' : i + 1 === nv.n ? 'actuel' : '') + '"><b>' + (i + 1) + '. ' + esc(g[1]) + '</b><span>' + g[0] + ' XP</span></li>';
      }).join('') + '</ol>' +
      '<p class="profil-raz"><button type="button" id="raz">Remettre ma progression à zéro</button></p>';
    document.getElementById('raz').addEventListener('click', function () {
      if (!confirm('Effacer toute ta progression (XP, badges, étoiles) ?')) return;
      E = vierge(); sauver(); majChip(); pageProfil(app);
    });
  }

  // ---------- Défi éclair ----------

  var DUREE = 20; // secondes par question
  function melanger(t) {
    t = t.slice();
    for (var i = t.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = t[i]; t[i] = t[j]; t[j] = x; }
    return t;
  }
  var minuteur = null;
  function stopMinuteur() { if (minuteur) { clearInterval(minuteur); minuteur = null; } }

  function pageDefi(app) {
    document.title = 'Défi éclair · Révisions BTS MCO';
    stopMinuteur();
    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › Défi éclair</nav>' +
      '<section class="defi defi-accueil">' +
        '<div class="defi-eclair">⚡</div><h1>Défi éclair</h1>' +
        '<p>10 questions tirées dans toutes les matières, <b>' + DUREE + ' secondes</b> pour chacune.</p>' +
        '<ul><li>Bonne réponse : <b>100 points</b> + un bonus de vitesse</li><li>3 bonnes d’affilée et plus : <b>bonus de série</b> 🔥</li><li>À la fin : la correction de tes erreurs</li></ul>' +
        '<p class="defi-record">Ton record : <b>' + E.stats.record + '</b> points</p>' +
        '<button type="button" class="defi-go">C’est parti !</button>' +
      '</section>';
    app.querySelector('.defi-go').addEventListener('click', function () { lancerDefi(app); });
  }

  function lancerDefi(app) {
    var banque = [];
    R.fiches.forEach(function (f) {
      ((R.qcm && R.qcm[f.id]) || []).forEach(function (q) { banque.push({ q: q, f: f }); });
    });
    var qs = melanger(banque).slice(0, 10), i = 0, score = 0, bonnes = 0, serie = 0, erreurs = [];

    function question() {
      stopMinuteur();
      var it = qs[i], m = R.matieres.filter(function (x) { return x.id === it.f.matiere; })[0];
      var reps = melanger(it.q[1].map(function (r, k) { return { txt: r, ok: k === 0 }; }));
      app.innerHTML =
        '<section class="defi">' +
          '<div class="defi-haut"><span>Question ' + (i + 1) + '/10</span><span class="defi-score">' + score + ' pts</span>' +
            (serie >= 2 ? '<span class="defi-serie">🔥 ' + serie + '</span>' : '') + '</div>' +
          '<div class="defi-temps"><i></i></div>' +
          '<span class="defi-tag" style="--c:' + m.couleur + '">' + esc(m.nom) + ' · ' + esc(it.f.titre) + '</span>' +
          '<h2 class="defi-q">' + it.q[0] + '</h2>' +
          '<div class="qcm-reps defi-reps">' + reps.map(function (r, k) {
            return '<button type="button" data-ok="' + (r.ok ? 1 : 0) + '"><span class="qcm-lettre">' + 'ABCD'[k] + '</span>' + r.txt + '</button>';
          }).join('') + '</div>' +
          '<p class="defi-retour" aria-live="polite"></p>' +
        '</section>';
      var debut = Date.now(), barre = app.querySelector('.defi-temps i'), fini = false;
      function repondre(b) {
        if (fini) return;
        fini = true;
        stopMinuteur();
        var reste = Math.max(0, DUREE - (Date.now() - debut) / 1000);
        var juste = !!b && b.dataset.ok === '1';
        Array.prototype.forEach.call(app.querySelectorAll('.defi-reps button'), function (x) {
          x.disabled = true;
          if (x.dataset.ok === '1') x.classList.add('bonne');
        });
        var retour = app.querySelector('.defi-retour');
        if (juste) {
          serie++; bonnes++;
          var pts = 100 + Math.round(reste * 5) + (serie >= 3 ? 50 * (serie - 2) : 0);
          score += pts;
          b.classList.add('bonne');
          retour.innerHTML = '<b>+' + pts + ' pts</b>' + (serie >= 3 ? ' · série de ' + serie + ' 🔥' : '');
          reponse(true, true);
        } else {
          serie = 0;
          if (b) b.classList.add('fausse');
          retour.innerHTML = b ? '<b>Raté.</b>' : '<b>Temps écoulé !</b>';
          erreurs.push(it);
          reponse(false, true);
        }
        setTimeout(function () { i++; if (i < qs.length) question(); else bilan(); }, juste ? 900 : 1600);
      }
      app.querySelector('.defi-reps').addEventListener('click', function (e) {
        var b = e.target.closest('button[data-ok]');
        if (b) repondre(b);
      });
      minuteur = setInterval(function () {
        var t = (Date.now() - debut) / 1000;
        barre.style.width = Math.max(0, 100 - t / DUREE * 100) + '%';
        barre.classList.toggle('urgent', t > DUREE - 5);
        if (t >= DUREE) repondre(null);
      }, 100);
    }

    function bilan() {
      stopMinuteur();
      E.stats.defis++;
      var record = score > E.stats.record;
      if (record) E.stats.record = score;
      if (bonnes >= 8) debloquer('eclair-8');
      verifierBadges(); sauver();
      gagner(Math.round(score / 20), 'Défi éclair');
      if (record || bonnes === 10) confettis();
      app.innerHTML =
        '<nav class="fil"><a href="#/">Matières</a> › Défi éclair</nav>' +
        '<section class="defi defi-fin">' +
          '<div class="defi-eclair">' + (bonnes >= 8 ? '🏆' : bonnes >= 5 ? '⚡' : '💡') + '</div>' +
          '<h1>' + score + ' points</h1>' +
          '<p><b>' + bonnes + '/10</b> bonnes réponses' + (record ? ' · <b class="nouveau-record">nouveau record !</b>' : ' · record : ' + E.stats.record) + '</p>' +
          '<button type="button" class="defi-go">Rejouer</button>' +
        '</section>' +
        (erreurs.length ? '<h2 class="titre-section">À revoir</h2><div class="defi-erreurs">' + erreurs.map(function (it) {
          return '<div class="defi-erreur"><p><b>' + it.q[0] + '</b></p><p>✔ ' + it.q[1][0] + '</p>' +
            (it.q[2] ? '<p class="qcm-expl">' + it.q[2] + '</p>' : '') +
            '<a href="#/' + it.f.matiere + '/' + it.f.id + '">Revoir la fiche « ' + esc(it.f.titre) + ' » ›</a></div>';
        }).join('') + '</div>' : '<p class="vide">Aucune erreur, chapeau !</p>');
      app.querySelector('.defi-go').addEventListener('click', function () { lancerDefi(app); });
    }

    question();
  }

  return {
    reponse: reponse, qcmFini: qcmFini, ficheLue: ficheLue, correction: correction,
    etoiles: etoiles, progression: progression, majChip: majChip,
    pageProfil: pageProfil, pageDefi: pageDefi, quitter: stopMinuteur
  };
})();
