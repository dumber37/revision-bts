// Carnet : compte à rebours et planning d'examen, lexique, mes notes, favoris, confort de lecture.
var Carnet = (function () {
  'use strict';

  var esc = Jeu.esc;
  function E() { return Jeu.etat(); }
  function fichesDe(id) { return R.fiches.filter(function (f) { return f.matiere === id; }); }
  function fil(txt) { return '<nav class="fil"><a href="#/">Matières</a> › ' + esc(txt) + '</nav>'; }
  function joursEntre(a, b) { return Math.round((new Date(b + 'T12:00') - new Date(a + 'T12:00')) / 864e5); }
  function dateFr(d, long) {
    var x = new Date(d + 'T12:00');
    return x.toLocaleDateString('fr-FR', long ? { weekday: 'long', day: 'numeric', month: 'long' } : { day: 'numeric', month: 'short' });
  }
  function plusJours(d, n) { var x = new Date(d + 'T12:00'); x.setDate(x.getDate() + n); return Jeu.jour(x); }

  // ---------- Compte à rebours et planning ----------

  var EPREUVES = [
    { id: 'e41', nom: 'E41 · DRCV (oral)', matieres: ['drcv'] },
    { id: 'e42', nom: 'E42 · ADOC (oral)', matieres: ['adoc'] },
    { id: 'e5', nom: 'E5 · Gestion opérationnelle (écrit)', matieres: ['gestion'] },
    { id: 'e6', nom: 'E6 · Management (écrit)', matieres: ['management'] }
  ];
  function dates() { var r = E().reglages || {}; return r.examens || {}; }
  function prochaine() {
    var auj = Jeu.jour(), d = dates(), best = null;
    EPREUVES.forEach(function (e) {
      if (d[e.id] && d[e.id] >= auj && (!best || d[e.id] < d[best.id])) best = e;
    });
    return best ? { e: best, date: d[best.id], j: joursEntre(auj, d[best.id]) } : null;
  }

  // Un jour de planning : une matière (rotation, priorité à l'épreuve qui approche), une fiche (la plus faible), une activité.
  function planning(nb) {
    var auj = Jeu.jour(), d = dates(), pf = E().parFiche || {}, lues = E().lues || {};
    var actives = R.matieres.filter(function (m) { return fichesDe(m.id).length; });
    var activites = [['📖', 'Relire la fiche et faire son QCM', function (m, f) { return '#/' + m.id + '/' + f.id; }],
      ['🃏', 'Cartes mémo', function (m) { return '#/' + m.id + '/cartes'; }],
      ['✏️', 'Textes à trous', function (m) { return '#/' + m.id + '/trous'; }],
      ['🔍', 'Chasse à l’erreur', function (m) { return '#/' + m.id + '/chasse'; }],
      ['👑', 'Affronter le boss', function (m) { return '#/' + m.id + '/boss'; }]];
    function poids(f) { var t = pf[f.id]; return (t && t[1] ? t[0] / t[1] : 0.5) + (lues[f.id] ? 0.2 : 0); }
    var jours = [];
    for (var k = 0; k < nb; k++) {
      var jour = plusJours(auj, k), urgent = null;
      EPREUVES.forEach(function (e) {
        if (!d[e.id]) return;
        var reste = joursEntre(jour, d[e.id]);
        if (reste >= 0 && reste <= 3 && (!urgent || reste < urgent.reste) && e.matieres.some(function (id) { return fichesDe(id).length; })) urgent = { e: e, reste: reste };
      });
      var enCours = actives.filter(function (m) {
        var ep = EPREUVES.filter(function (e) { return e.matieres.indexOf(m.id) >= 0; })[0];
        return !ep || !d[ep.id] || d[ep.id] >= jour;
      });
      if (!enCours.length) break;
      var m = urgent ? R.matieres.filter(function (x) { return x.id === urgent.e.matieres[0]; })[0] : enCours[(joursEntre('2026-01-01', jour)) % enCours.length];
      var fs = fichesDe(m.id).slice().sort(function (a, b) { return poids(a) - poids(b); });
      var f = fs[Math.floor(k / enCours.length) % fs.length];
      var act;
      if (urgent && urgent.reste === 0) act = ['🎯', 'Jour J : ' + urgent.e.nom + '. Relis l’essentiel, respire, tu es prêt !', function () { return '#/express'; }];
      else if (urgent && urgent.reste === 1) act = ['⏱', 'Veille d’épreuve : l’essentiel en 1 minute', function () { return '#/express'; }];
      else if (urgent && urgent.reste === 2) act = ['📝', 'Examen blanc', function (mm) { return '#/' + mm.id + '/examen'; }];
      else if (urgent) act = ['🔁', 'Révision des erreurs', function () { return '#/revoir'; }];
      else act = activites[joursEntre('2026-01-01', jour) % activites.length];
      jours.push({ jour: jour, m: m, f: f, ico: act[0], txt: act[1], lien: act[2](m, f), urgent: urgent });
    }
    return jours;
  }

  function pagePlanning(app) {
    document.title = 'Mon planning · Révisions BTS MCO';
    var d = dates(), p = prochaine(), jours = planning(14);
    app.innerHTML = fil('Mon planning') +
      '<section class="defi defi-accueil"><div class="defi-eclair">📅</div><h1>Compte à rebours</h1>' +
        (p ? '<p class="decompte"><b>J-' + p.j + '</b> avant ' + esc(p.e.nom) + ' (' + dateFr(p.date, true) + ')</p>' : '<p>Entre les dates de tes épreuves : le site te prépare un planning jour par jour.</p>') +
        '<div class="duel-form">' + EPREUVES.map(function (e) {
          return '<label><span>' + esc(e.nom) + '</span><input type="date" data-ep="' + e.id + '" value="' + (d[e.id] || '') + '"></label>';
        }).join('') + '</div>' +
      '</section>' +
      '<h2 class="titre-section">Les 14 prochains jours</h2>' +
      '<div class="planning">' + jours.map(function (j, i) {
        return '<a class="plan-jour' + (i === 0 ? ' aujourdhui' : '') + (j.urgent ? ' urgent' : '') + '" href="' + j.lien + '" style="--c:' + j.m.couleur + '">' +
          '<span class="plan-date">' + (i === 0 ? 'Aujourd’hui' : i === 1 ? 'Demain' : dateFr(j.jour)) + '</span>' +
          '<span class="plan-ico">' + j.ico + '</span>' +
          '<span class="plan-txt"><b>' + esc(j.txt) + '</b><span>' + esc(j.m.nom) + ' · ' + esc(j.f.titre) + '</span></span></a>';
      }).join('') + '</div>' +
      '<p class="astuce">Le planning fait tourner les matières, commence par tes chapitres les plus faibles, et resserre les révisions dans les 3 jours avant chaque épreuve.</p>';
    Array.prototype.forEach.call(app.querySelectorAll('input[data-ep]'), function (inp) {
      inp.addEventListener('change', function () {
        var r = E().reglages = E().reglages || {};
        r.examens = r.examens || {};
        if (inp.value) r.examens[inp.dataset.ep] = inp.value; else delete r.examens[inp.dataset.ep];
        Jeu.sauver();
        pagePlanning(app);
      });
    });
  }

  // ---------- Lexique ----------

  function entreesLexique() {
    var t = [], vus = {};
    function ajouter(terme, def, f) {
      var cle = terme.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
      if (vus[cle] || terme.length <= 2 || /\?$/.test(terme)) return;
      vus[cle] = true;
      t.push({ terme: terme, def: def, f: f, cle: cle });
    }
    (R.lexique || []).forEach(function (x) { ajouter(x[0], x[1], R.fiches.filter(function (f) { return f.id === x[2]; })[0]); });
    R.matieres.forEach(function (m) {
      Activites.cartesDe(m).forEach(function (c) {
        var d = document.createElement('div'); d.innerHTML = c.recto; var r = d.textContent.trim();
        d.innerHTML = c.verso; ajouter(r, d.textContent.trim(), c.f);
      });
    });
    return t.sort(function (a, b) { return a.cle.localeCompare(b.cle, 'fr'); });
  }

  function pageLexique(app) {
    document.title = 'Lexique · Révisions BTS MCO';
    var t = entreesLexique();
    app.innerHTML = fil('Lexique') +
      '<section class="express-tete"><div class="defi-eclair">📚</div><h1>Lexique</h1><p>' + t.length + ' notions de A à Z. Touche une notion pour ouvrir sa fiche.</p></section>' +
      '<div class="recherche"><input id="lq" type="search" placeholder="Chercher une notion…" autocomplete="off"></div>' +
      '<div class="lex-lettres"></div><div class="lexique"></div>';
    var zone = app.querySelector('.lexique'), lettres = app.querySelector('.lex-lettres');
    function afficher(q) {
      var res = t.filter(function (x) { return !q || x.cle.indexOf(q) >= 0 || x.def.toLowerCase().indexOf(q) >= 0; }), courant = '', html = '', ls = [];
      res.forEach(function (x) {
        var l = x.cle.charAt(0).toUpperCase();
        if (l !== courant) { courant = l; ls.push(l); html += '<h2 class="lex-lettre" id="lex-' + l + '">' + l + '</h2>'; }
        html += '<a class="lex-entree" href="' + (x.f ? '#/' + x.f.matiere + '/' + x.f.id : '#/lexique') + '"><b>' + esc(x.terme) + '</b><span>' + esc(x.def) + '</span>' +
          (x.f ? '<small>' + esc(x.f.titre) + ' ›</small>' : '') + '</a>';
      });
      zone.innerHTML = html || '<p class="vide">Aucune notion trouvée.</p>';
      lettres.innerHTML = ls.map(function (l) { return '<button type="button" data-l="' + l + '">' + l + '</button>'; }).join('');
    }
    lettres.addEventListener('click', function (e) {
      var b = e.target.closest('[data-l]');
      if (b) { var h = document.getElementById('lex-' + b.dataset.l); if (h) h.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    app.querySelector('#lq').addEventListener('input', function (e) {
      afficher(e.target.value.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim());
    });
    afficher('');
  }

  // ---------- Favoris et notes (sur la fiche) ----------

  function estFavori(id) { return !!(E().favoris || {})[id]; }
  function basculerFavori(id) {
    var fv = E().favoris = E().favoris || {};
    if (fv[id]) delete fv[id]; else fv[id] = Jeu.jour();
    Jeu.sauver();
    return !!fv[id];
  }

  function decorerFiche(app, m, f) {
    var h1 = app.querySelector('.fiche h1');
    if (h1) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'favori' + (estFavori(f.id) ? ' actif' : '');
      function maj() { var on = estFavori(f.id); b.classList.toggle('actif', on); b.textContent = on ? '★' : '☆'; b.title = on ? 'Retirer des favoris' : 'Ajouter aux favoris'; b.setAttribute('aria-label', b.title); }
      b.addEventListener('click', function () { var on = basculerFavori(f.id); maj(); Jeu.toast(on ? '★ Ajoutée à tes favoris' : 'Retirée des favoris'); });
      maj();
      h1.parentNode.insertBefore(b, h1);
    }
    var ia = app.querySelector('.ia');
    if (ia) {
      var n = document.createElement('section');
      n.className = 'notes';
      n.innerHTML = '<label class="notes-titre" for="noteFiche">📝 Mes notes sur cette fiche</label>' +
        '<textarea id="noteFiche" rows="3" placeholder="Tes remarques, exemples, astuces de mémorisation… (gardées sur cet appareil)"></textarea>' +
        '<span class="notes-etat" aria-live="polite"></span>';
      ia.parentNode.insertBefore(n, ia);
      var zone = n.querySelector('textarea'), etat = n.querySelector('.notes-etat'), minuterie;
      zone.value = (E().notes || {})[f.id] || '';
      zone.addEventListener('input', function () {
        etat.textContent = '…';
        clearTimeout(minuterie);
        minuterie = setTimeout(function () {
          var nt = E().notes = E().notes || {};
          if (zone.value.trim()) nt[f.id] = zone.value; else delete nt[f.id];
          Jeu.sauver();
          etat.textContent = '✓ Enregistré';
        }, 500);
      });
    }
  }

  function decorerAccueil(app) {
    var p = prochaine(), salut = app.querySelector('.hero-salut');
    if (salut) {
      var a = document.createElement('a');
      a.className = 'hero-decompte'; a.href = '#/planning';
      a.innerHTML = p ? '📅 <b>J-' + p.j + '</b> avant ' + esc(p.e.nom.split(' (')[0]) : '📅 Ajouter mes dates d’examen';
      salut.appendChild(a);
      // Rappel de sauvegarde quand il y a de quoi perdre et que la dernière date de plus de 2 semaines.
      var der = (E().reglages || {}).sauvegarde;
      if (E().xp >= 300 && (!der || joursEntre(der, Jeu.jour()) > 14)) {
        var s = document.createElement('a');
        s.className = 'hero-decompte'; s.href = '#/profil';
        s.innerHTML = '💾 Pense à <b>sauvegarder</b> ta progression';
        salut.appendChild(s);
      }
    }
    var fv = R.fiches.filter(function (f) { return estFavori(f.id); }), titre = app.querySelector('.titre-section');
    if (fv.length && titre) {
      var s = document.createElement('div');
      s.innerHTML = '<h2 class="titre-section">⭐ Mes favoris</h2><div class="liste-fiches favoris-liste">' + fv.map(function (f) {
        var m = R.matieres.filter(function (x) { return x.id === f.matiere; })[0];
        return '<a class="carte-fiche" href="#/' + f.matiere + '/' + f.id + '" style="--c:' + m.couleur + '"><span class="tag">' + esc(m.nom) + '</span><span class="titre">' + esc(f.titre) + '</span></a>';
      }).join('') + '</div>';
      titre.parentNode.insertBefore(s, titre);
    }
  }

  // Page qui regroupe favoris et notes.
  function pageCarnet(app) {
    document.title = 'Mon carnet · Révisions BTS MCO';
    var notes = E().notes || {}, fv = R.fiches.filter(function (f) { return estFavori(f.id); });
    var avecNotes = R.fiches.filter(function (f) { return notes[f.id]; });
    app.innerHTML = fil('Mon carnet') +
      '<section class="express-tete"><div class="defi-eclair">📒</div><h1>Mon carnet</h1><p>Tes fiches favorites et toutes tes notes, au même endroit.</p></section>' +
      '<h2 class="titre-section">⭐ Favoris</h2>' + (fv.length ? '<div class="liste-fiches">' + fv.map(function (f) {
        return '<a class="carte-fiche" href="#/' + f.matiere + '/' + f.id + '" style="--c:' + Activites.matiere(f.matiere).couleur + '"><span class="titre">' + esc(f.titre) + '</span></a>';
      }).join('') + '</div>' : '<p class="vide">Touche l’étoile ☆ en haut d’une fiche pour l’ajouter ici.</p>') +
      '<h2 class="titre-section">📝 Mes notes</h2>' + (avecNotes.length ? avecNotes.map(function (f) {
        return '<div class="express-fiche" style="--c:' + Activites.matiere(f.matiere).couleur + '"><a href="#/' + f.matiere + '/' + f.id + '"><b>' + esc(f.titre) + '</b> ›</a><p class="note-texte">' + esc(notes[f.id]) + '</p></div>';
      }).join('') : '<p class="vide">Tu n’as pas encore pris de notes. Il y a un bloc « Mes notes » en bas de chaque fiche.</p>');
  }

  // ---------- Confort de lecture : taille du texte et mode confortable ----------
  // Les réglages sont aussi lus dans le <head> (avant l'affichage) : clé séparée « revision-affichage ».

  function reglagesAffichage() { try { return JSON.parse(localStorage.getItem('revision-affichage')) || {}; } catch (e) { return {}; } }
  function appliquer(r) {
    var h = document.documentElement;
    h.style.fontSize = (r.taille || 100) + '%';
    h.classList.toggle('confort', !!r.confort);
    try { localStorage.setItem('revision-affichage', JSON.stringify(r)); } catch (e) {}
  }
  function panneauAffichage() {
    var p = document.getElementById('affichage');
    if (p) { p.remove(); return; }
    var r = reglagesAffichage();
    p = document.createElement('div');
    p.id = 'affichage'; p.className = 'affichage';
    p.innerHTML = '<b>Affichage</b>' +
      '<div class="aff-taille"><button type="button" data-t="-10" aria-label="Texte plus petit">A−</button><span>' + (r.taille || 100) + ' %</span><button type="button" data-t="10" aria-label="Texte plus grand">A+</button></div>' +
      '<label class="aff-confort"><input type="checkbox"' + (r.confort ? ' checked' : '') + '> Lecture confortable <small>(interligne et police plus lisibles)</small></label>' +
      '<button type="button" class="aff-fermer">Fermer</button>';
    document.body.appendChild(p);
    p.addEventListener('click', function (e) {
      var b = e.target.closest('[data-t]');
      if (b) {
        r.taille = Math.max(80, Math.min(140, (r.taille || 100) + +b.dataset.t));
        p.querySelector('.aff-taille span').textContent = r.taille + ' %';
        appliquer(r);
      }
      if (e.target.closest('.aff-fermer')) p.remove();
    });
    p.querySelector('input').addEventListener('change', function (e) { r.confort = e.target.checked; appliquer(r); chargerPolice(r); });
  }
  // La police très lisible n'est chargée que si le mode confortable est activé.
  function chargerPolice(r) {
    if (!r.confort || document.getElementById('police-confort')) return;
    var l = document.createElement('link');
    l.id = 'police-confort'; l.rel = 'stylesheet';
    l.href = 'https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap';
    document.head.appendChild(l);
  }
  document.addEventListener('click', function (e) { if (e.target.closest('#affBtn')) panneauAffichage(); });
  chargerPolice(reglagesAffichage());

  // ---------- Branchements ----------

  Activites.ajouterPageGlobale('planning', pagePlanning);
  Activites.ajouterPageGlobale('lexique', pageLexique);
  Activites.ajouterPageGlobale('carnet', pageCarnet);

  return { decorerFiche: decorerFiche, decorerAccueil: decorerAccueil, prochaine: prochaine, planning: planning, entreesLexique: entreesLexique };
})();
