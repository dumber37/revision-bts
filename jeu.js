// Côté ludique et mémorisation : XP, grades, flamme, étoiles, badges, missions du jour,
// révision des erreurs (répétition espacée) et Défi éclair.
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
             srs: {}, jour: { date: '', c: {}, missions: [], faites: {} }, duelNoms: null, reglages: {},
             stats: { bonnes: 0, reponses: 0, qcm: 0, defis: 0, record: 0, comboMax: 0, missions: 0 } };
  }
  var E = vierge();
  try {
    var brut = JSON.parse(localStorage.getItem(CLE));
    if (brut && typeof brut === 'object') {
      for (var k in E) if (brut[k] !== undefined) E[k] = brut[k];
      var v = vierge();
      for (var s in v.stats) if (E.stats[s] === undefined) E.stats[s] = 0;
      for (var j in v.jour) if (E.jour[j] === undefined) E.jour[j] = v.jour[j];
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
  function dansJours(n) { return jour(new Date(Date.now() + n * 864e5)); }
  function melanger(t) {
    t = t.slice();
    for (var i = t.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)), x = t[i]; t[i] = t[j]; t[j] = x; }
    return t;
  }

  // ---------- Banque de questions ----------
  // Chaque question reçoit un identifiant stable (fiche + empreinte de l'énoncé), pour la révision des erreurs.

  function empreinte(s) {
    var h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }
  var cacheQ = null;
  function questions() {
    if (cacheQ) return cacheQ;
    cacheQ = [];
    R.fiches.forEach(function (f) {
      ((R.qcm && R.qcm[f.id]) || []).forEach(function (q) {
        cacheQ.push({ id: f.id + '#' + empreinte(q[0]), q: q, f: f });
      });
    });
    return cacheQ;
  }
  function questionsDe(ficheId) { return questions().filter(function (x) { return x.f.id === ficheId; }); }
  function questionsMatiere(mid) { return questions().filter(function (x) { return x.f.matiere === mid; }); }
  function parId(id) { return questions().filter(function (x) { return x.id === id; })[0]; }

  // ---------- Niveau et flamme ----------

  function niveau(xp) {
    var i = 0;
    while (i + 1 < NIVEAUX.length && xp >= NIVEAUX[i + 1][0]) i++;
    var bas = NIVEAUX[i][0], haut = NIVEAUX[i + 1] ? NIVEAUX[i + 1][0] : null;
    return { n: i + 1, nom: NIVEAUX[i][1], bas: bas, haut: haut,
             pct: haut ? Math.round((xp - bas) / (haut - bas) * 100) : 100 };
  }

  function marquerJour() {
    var auj = jour(), hier = dansJours(-1);
    if (E.jours.dernier === auj) return;
    E.jours.serie = E.jours.dernier === hier ? E.jours.serie + 1 : 1;
    E.jours.max = Math.max(E.jours.max, E.jours.serie);
    E.jours.dernier = auj;
  }
  // La flamme s'éteint si on a sauté un jour.
  function serieActuelle() {
    return (E.jours.dernier === jour() || E.jours.dernier === dansJours(-1)) ? E.jours.serie : 0;
  }

  var ecouteurs = [];
  function surChangement(fn) { ecouteurs.push(fn); }
  function prevenir() { ecouteurs.forEach(function (fn) { try { fn(); } catch (e) {} }); }

  function gagner(xp, raison, discret) {
    if (!xp) return;
    var avant = niveau(E.xp).n;
    E.xp += xp;
    marquerJour();
    verifierBadges();
    sauver();
    majChip();
    if (!discret) toast('+' + xp + ' XP' + (raison ? ' · ' + raison : ''));
    var apres = niveau(E.xp);
    if (apres.n > avant) {
      toast('🎉 Niveau ' + apres.n + ' : ' + apres.nom + ' !', 'grand');
      confettis();
      son('niveau');
    }
    prevenir();
  }

  function majChip() {
    var c = document.getElementById('niveau');
    if (!c) return;
    var nv = niveau(E.xp), f = serieActuelle();
    c.innerHTML = '<span class="chip-nv">Niv. ' + nv.n + '</span><span class="chip-barre"><i style="width:' + nv.pct + '%"></i></span>' +
      (f ? '<span class="chip-flamme" title="Jours de révision d’affilée">🔥 ' + f + '</span>' : '');
    c.title = nv.nom + ' · ' + E.xp + ' XP';
  }

  // ---------- Notifications, confettis, sons ----------

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

  // Remplacé par de vrais sons dans un lot suivant ; pour l'instant, rien.
  function son() {}

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
    ['manager', '👔', 'Promu manager', 'Atteindre le niveau Manager'],
    ['revision', '🔁', 'Mémoire d’éléphant', 'Terminer une révision des erreurs'],
    ['journee', '✅', 'Journée parfaite', 'Réussir les 3 missions d’une journée'],
    ['missions-10', '🎖️', 'Employé du mois', 'Réussir 10 missions au total'],
    ['ancre', '⚓', 'Bien ancré', '20 questions rangées dans la boîte « sue »']
  ];
  var conditionsExtra = []; // ajoutées par les autres modules (activités)
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
      'manager': E.xp >= 1600,
      'missions-10': E.stats.missions >= 10,
      'ancre': Object.keys(E.srs).filter(function (k) { return E.srs[k][0] >= 3; }).length >= 20
    };
    conditionsExtra.forEach(function (fn) { var x = fn(E); for (var id in x) c[id] = x[id]; });
    return c;
  }
  function ajouterBadges(liste, fn) {
    liste.forEach(function (b) { BADGES.push(b); });
    if (fn) conditionsExtra.push(fn);
  }
  function debloquer(id) {
    if (E.badges[id]) return;
    E.badges[id] = jour();
    var b = BADGES.filter(function (x) { return x[0] === id; })[0];
    if (b) setTimeout(function () { toast(b[1] + ' Badge débloqué : ' + b[2], 'grand'); son('badge'); }, 400);
  }
  function verifierBadges() {
    var c = conditions();
    for (var id in c) if (c[id]) debloquer(id);
  }

  // ---------- Révision des erreurs (répétition espacée, méthode des boîtes) ----------
  // E.srs[id] = [boîte, prochaine date]. Boîte 0 : à revoir aujourd'hui. Chaque bonne réponse fait monter
  // la question d'une boîte et l'espace davantage ; une erreur la renvoie en boîte 0.

  var ECARTS = [0, 1, 3, 7, 14, 30];
  function planifier(id, juste) {
    if (!id) return;
    var b = E.srs[id];
    var boite = juste ? (b ? Math.min(b[0] + 1, 5) : 2) : 0;
    E.srs[id] = [boite, dansJours(ECARTS[boite])];
  }
  function aRevoir() {
    var auj = jour();
    return questions().filter(function (x) { var s = E.srs[x.id]; return s && s[1] <= auj; })
      .sort(function (a, b) { return E.srs[a.id][0] - E.srs[b.id][0]; });
  }
  function boites() {
    var t = [0, 0, 0, 0, 0, 0];
    questions().forEach(function (x) { var s = E.srs[x.id]; if (s) t[s[0]]++; });
    return t;
  }

  // ---------- Missions du jour ----------

  function MISSIONS() {
    var m = [
      { id: 'qcm', txt: 'Terminer 2 QCM', cle: 'qcm', obj: 2, lien: '#/' },
      { id: 'bonnes', txt: 'Donner 15 bonnes réponses', cle: 'bonnes', obj: 15, lien: '#/defi' },
      { id: 'defi', txt: 'Jouer un Défi éclair', cle: 'defi', obj: 1, lien: '#/defi' },
      { id: 'parfait', txt: 'Réussir un QCM sans faute', cle: 'parfait', obj: 1, lien: '#/' },
      { id: 'calcul', txt: 'Faire un calcul de la page Formules', cle: 'calcul', obj: 1, lien: '#/formules' },
      { id: 'revoir', txt: 'Faire ta révision des erreurs', cle: 'revoir', obj: 1, lien: '#/revoir', si: function () { return aRevoir().length > 0; } },
      { id: 'fiche', txt: 'Lire une nouvelle fiche jusqu’au bout', cle: 'fiche', obj: 1, lien: '#/',
        si: function () { return R.fiches.some(function (f) { return !E.lues[f.id]; }); } }
    ];
    R.matieres.forEach(function (mt) {
      if (questionsMatiere(mt.id).length) m.push({ id: 'm-' + mt.id, txt: '5 bonnes réponses en ' + mt.nom, cle: 'm:' + mt.id, obj: 5, lien: '#/' + mt.id });
    });
    missionsExtra.forEach(function (x) { m.push(x); });
    return m;
  }
  var missionsExtra = [];
  function ajouterMissions(liste) { liste.forEach(function (x) { missionsExtra.push(x); }); }

  // Tirage stable pour la journée : les 3 missions ne changent pas si on recharge la page.
  function graine(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function nouvelleJournee() {
    var auj = jour();
    if (E.jour.date === auj && E.jour.missions.length) return;
    var pool = MISSIONS().filter(function (x) { return !x.si || x.si(); });
    var g = graine(auj);
    pool.sort(function (a, b) { return (graine(a.id + g) % 1000) - (graine(b.id + g) % 1000); });
    E.jour = { date: auj, c: {}, missions: pool.slice(0, 3).map(function (x) { return x.id; }), faites: {} };
    sauver();
  }
  function missionsDuJour() {
    nouvelleJournee();
    var defs = MISSIONS();
    return E.jour.missions.map(function (id) {
      var d = defs.filter(function (x) { return x.id === id; })[0];
      if (!d) return null;
      return { id: id, txt: d.txt, obj: d.obj, lien: d.lien, n: Math.min(E.jour.c[d.cle] || 0, d.obj), faite: !!E.jour.faites[id] };
    }).filter(Boolean);
  }
  function compter(cle, n) {
    nouvelleJournee();
    E.jour.c[cle] = (E.jour.c[cle] || 0) + (n || 1);
    var defs = MISSIONS(), toutes = true, nouvelle = false;
    E.jour.missions.forEach(function (id) {
      var d = defs.filter(function (x) { return x.id === id; })[0];
      if (!d) return;
      if (!E.jour.faites[id] && (E.jour.c[d.cle] || 0) >= d.obj) {
        E.jour.faites[id] = true; nouvelle = true;
        E.stats.missions++;
        setTimeout(function () { toast('✅ Mission accomplie : ' + d.txt, 'grand'); }, 300);
      }
      if (!E.jour.faites[id]) toutes = false;
    });
    sauver();
    if (nouvelle) {
      gagner(30, 'mission', true);
      if (toutes && E.jour.missions.length) { debloquer('journee'); gagner(50, 'journée parfaite', true); confettis(); }
    }
    prevenir();
  }

  // ---------- Événements venant des pages ----------

  var combo = 0;
  // Retourne la série en cours, affichée par le QCM. id : identifiant de la question (révision des erreurs).
  function reponse(juste, discret, id) {
    E.stats.reponses++;
    planifier(id, juste);
    var x = id && parId(id);
    if (juste) {
      combo++;
      E.stats.bonnes++;
      E.stats.comboMax = Math.max(E.stats.comboMax, combo);
      gagner(10 + (combo >= 3 ? 5 : 0), combo >= 3 ? 'série de ' + combo + ' 🔥' : '', discret);
      compter('bonnes');
      if (x) compter('m:' + x.f.matiere);
      son('bon');
    } else {
      combo = 0;
      marquerJour(); sauver(); majChip();
      son('faux');
    }
    return combo;
  }

  function qcmFini(cle, bonnes, total) {
    E.stats.qcm++;
    var b = E.best[cle];
    if (!b || bonnes / total > b[0] / b[1]) E.best[cle] = [bonnes, total];
    compter('qcm');
    if (bonnes === total) { compter('parfait'); debloquer('sans-faute'); confettis(); gagner(20, 'sans-faute !'); }
    else { verifierBadges(); sauver(); }
  }

  function ficheLue(id) {
    if (E.lues[id]) return;
    E.lues[id] = jour();
    gagner(15, 'fiche lue');
    compter('fiche');
  }

  function correction(i) {
    compter('calcul');
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

  // ---------- Bandeau d'accueil ----------

  function salut() {
    var h = new Date().getHours();
    return h < 5 ? 'Encore debout ?' : h < 12 ? 'Bonjour !' : h < 18 ? 'Bon après-midi !' : 'Bonsoir !';
  }
  function hero() {
    var nv = niveau(E.xp), f = serieActuelle(), ms = missionsDuJour(), ar = aRevoir().length;
    var dejaJoue = Object.keys(E.srs).length > 0;
    return '<section class="hero">' +
      '<div class="hero-haut">' +
        '<div class="hero-salut"><b>' + salut() + '</b><span>' + (f ? '🔥 ' + f + ' jour' + (f > 1 ? 's' : '') + ' de révision d’affilée' : 'Une petite session aujourd’hui ?') + '</span></div>' +
        '<a class="hero-grade" href="#/profil"><span class="hero-n">' + nv.n + '</span><span><b>' + esc(nv.nom) + '</b>' +
          '<span class="prog-barre"><i style="width:' + nv.pct + '%"></i></span><small>' + E.xp + ' XP</small></span></a>' +
      '</div>' +
      '<div id="hero-magasin"></div>' +
      '<div class="hero-missions"><div class="hero-titre">Missions du jour</div>' + ms.map(function (m) {
        return '<a class="mission' + (m.faite ? ' faite' : '') + '" href="' + m.lien + '"><span class="mission-coche">' + (m.faite ? '✓' : '') + '</span>' +
          '<span class="mission-txt">' + esc(m.txt) + '</span><span class="mission-n">' + m.n + '/' + m.obj + '</span>' +
          '<span class="mission-barre"><i style="width:' + Math.round(m.n / m.obj * 100) + '%"></i></span></a>';
      }).join('') + '<p class="hero-bonus">+30 XP par mission, +50 si les trois sont faites</p></div>' +
      '<a class="hero-revoir' + (ar ? ' actif' : '') + '" href="#/revoir"><span class="ico">🔁</span><span><b>' +
        (ar ? ar + ' question' + (ar > 1 ? 's' : '') + ' à revoir aujourd’hui' : dejaJoue ? 'Rien à revoir aujourd’hui' : 'Révision des erreurs') +
        '</b><span>' + (ar ? 'Les questions que tu as ratées, au bon moment' : dejaJoue ? 'Tes questions reviendront quand il faudra' : 'Réponds à des QCM : tes erreurs reviendront ici') + '</span></span></a>' +
    '</section>';
  }

  // ---------- Page Révision des erreurs ----------

  function pageRevoir(app) {
    document.title = 'Révision des erreurs · Révisions BTS MCO';
    var dus = aRevoir(), bx = boites();
    var noms = ['À revoir', 'Demain', 'Dans 3 j', 'Dans 7 j', 'Dans 14 j', 'Sue (30 j)'];
    var tableau = '<div class="boites">' + bx.map(function (n, i) {
      return '<div class="boite b' + i + '"><strong>' + n + '</strong><span>' + noms[i] + '</span></div>';
    }).join('') + '</div>';
    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › Révision des erreurs</nav>' +
      '<section class="defi defi-accueil">' +
        '<div class="defi-eclair">🔁</div><h1>Révision des erreurs</h1>' +
        '<p>Chaque question ratée revient ici le jour même. Chaque bonne réponse l’éloigne : demain, puis dans 3, 7, 14 et 30 jours. C’est la répétition espacée : on revoit au moment où on allait oublier.</p>' +
        tableau +
        (dus.length
          ? '<button type="button" class="defi-go">Réviser ' + Math.min(dus.length, 15) + ' question' + (dus.length > 1 ? 's' : '') + '</button>'
          : '<p class="vide">' + (Object.keys(E.srs).length ? 'Rien à revoir aujourd’hui. Reviens demain !' : 'Fais quelques QCM ou un Défi éclair : tes erreurs arriveront ici.') + '</p>') +
      '</section>';
    var go = app.querySelector('.defi-go');
    if (go) go.addEventListener('click', function () {
      Activites.serie(app, {
        titre: 'Révision des erreurs', fil: 'Révision des erreurs', items: dus.slice(0, 15), reprendre: true,
        fin: function (r) {
          compter('revoir');
          debloquer('revision');
          if (r.total) gagner(r.bonnes * 2, 'révision', true);
          sauver();
          return '<p>Les questions réussies sont parties dans une boîte plus lointaine. Les autres reviendront.</p>';
        },
        rejouer: '#/revoir'
      });
    });
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
        '<div id="magasin"></div>' +
        '<div class="chiffres">' +
          '<div><b>Flamme</b><strong>🔥 ' + serieActuelle() + '</strong><span>jours d’affilée (record : ' + E.jours.max + ')</span></div>' +
          '<div><b>Bonnes réponses</b><strong>' + E.stats.bonnes + '</strong><span>' + taux + ' % de réussite</span></div>' +
          '<div><b>Fiches lues</b><strong>' + Object.keys(E.lues).length + '/' + R.fiches.length + '</strong><span>jusqu’au bout</span></div>' +
          '<div><b>Défi éclair</b><strong>' + E.stats.record + '</strong><span>points, record</span></div>' +
          '<div><b>Missions</b><strong>' + E.stats.missions + '</strong><span>réussies au total</span></div>' +
        '</div>' +
      '</section>' +
      '<div id="installer"></div>' +
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
      if (!confirm('Effacer toute ta progression (XP, badges, étoiles, révisions) ?')) return;
      E = vierge(); sauver(); majChip(); pageProfil(app);
    });
    prevenirProfil.forEach(function (fn) { fn(app); });
  }
  var prevenirProfil = [];
  function surProfil(fn) { prevenirProfil.push(fn); }

  // ---------- Défi éclair ----------

  var DUREE = 20; // secondes par question
  var minuteur = null;
  function stopMinuteur() { if (minuteur) { clearInterval(minuteur); minuteur = null; } }
  // Jeton de page : il change à chaque navigation. Un délai lancé sur une page ne doit pas agir sur la suivante.
  var jetonPage = 0;
  function quitterPage() { stopMinuteur(); jetonPage++; }
  function apres(ms, fn) { var j = jetonPage; return setTimeout(function () { if (j === jetonPage) fn(); }, ms); }

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
    var qs = melanger(questions()).slice(0, 10), i = 0, score = 0, bonnes = 0, serie = 0, erreurs = [];

    function question() {
      stopMinuteur();
      var it = qs[i], m = R.matieres.filter(function (x) { return x.id === it.f.matiere; })[0];
      var reps = melanger(it.q[1].map(function (r, k) { return { txt: r, ok: k === 0 }; }));
      app.innerHTML =
        '<section class="defi">' +
          '<div class="defi-haut"><span>Question ' + (i + 1) + '/' + qs.length + '</span><span class="defi-score">' + score + ' pts</span>' +
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
          reponse(true, true, it.id);
        } else {
          serie = 0;
          if (b) b.classList.add('fausse');
          retour.innerHTML = b ? '<b>Raté.</b>' : '<b>Temps écoulé !</b>';
          erreurs.push(it);
          reponse(false, true, it.id);
        }
        apres(juste ? 900 : 1600, function () { i++; if (i < qs.length) question(); else bilan(); });
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
      compter('defi');
      gagner(Math.round(score / 20), 'Défi éclair');
      if (record || bonnes === qs.length) confettis();
      app.innerHTML =
        '<nav class="fil"><a href="#/">Matières</a> › Défi éclair</nav>' +
        '<section class="defi defi-fin">' +
          '<div class="defi-eclair">' + (bonnes >= 8 ? '🏆' : bonnes >= 5 ? '⚡' : '💡') + '</div>' +
          '<h1>' + score + ' points</h1>' +
          '<p><b>' + bonnes + '/' + qs.length + '</b> bonnes réponses' + (record ? ' · <b class="nouveau-record">nouveau record !</b>' : ' · record : ' + E.stats.record) + '</p>' +
          '<button type="button" class="defi-go">Rejouer</button>' +
        '</section>' +
        listeErreurs(erreurs);
      app.querySelector('.defi-go').addEventListener('click', function () { lancerDefi(app); });
    }

    question();
  }

  function listeErreurs(erreurs) {
    return erreurs.length ? '<h2 class="titre-section">À revoir</h2><div class="defi-erreurs">' + erreurs.map(function (it) {
      return '<div class="defi-erreur"><p><b>' + it.q[0] + '</b></p><p>✔ ' + it.q[1][0] + '</p>' +
        (it.q[2] ? '<p class="qcm-expl">' + it.q[2] + '</p>' : '') +
        '<a href="#/' + it.f.matiere + '/' + it.f.id + '">Revoir la fiche « ' + esc(it.f.titre) + ' » ›</a></div>';
    }).join('') + '</div><p class="note-revoir">🔁 Ces questions sont ajoutées à ta révision des erreurs.</p>' : '<p class="vide">Aucune erreur, chapeau !</p>';
  }

  return {
    // données
    questions: questions, questionsDe: questionsDe, questionsMatiere: questionsMatiere, aRevoir: aRevoir,
    etat: function () { return E; }, sauver: sauver, jour: jour, niveau: niveau,
    // événements
    reponse: reponse, qcmFini: qcmFini, ficheLue: ficheLue, correction: correction, compter: compter,
    gagner: gagner, debloquer: debloquer, toast: toast, confettis: confettis,
    // extensions
    ajouterBadges: ajouterBadges, ajouterMissions: ajouterMissions, surChangement: surChangement, surProfil: surProfil,
    definirSon: function (fn) { son = fn; }, sonner: function (t) { son(t); },
    // affichage
    etoiles: etoiles, progression: progression, majChip: majChip, hero: hero, listeErreurs: listeErreurs,
    pageProfil: pageProfil, pageDefi: pageDefi, pageRevoir: pageRevoir, quitter: quitterPage, apres: apres,
    esc: esc, melanger: melanger
  };
})();
