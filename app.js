(function () {
  'use strict';

  var app = document.getElementById('app');

  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function matiere(id) { return R.matieres.filter(function (m) { return m.id === id; })[0]; }
  function fichesDe(id) { return R.fiches.filter(function (f) { return f.matiere === id; }); }
  function visuelsDe(id) { return R.visuels.filter(function (v) { return v.matiere === id; }); }
  function dateFr(d) {
    if (!d) return '';
    var p = d.split('-');
    return p[2] + '/' + p[1] + '/' + p[0];
  }
  function pluriel(n, mot) { return n + ' ' + mot + (n > 1 ? 's' : ''); }
  function texte(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    return d.textContent.toLowerCase();
  }

  // ---------- Pages ----------

  function accueil() {
    document.title = 'Révisions BTS MCO';
    var cartes = R.matieres.map(function (m) {
      var nf = fichesDe(m.id).length, nv = visuelsDe(m.id).length;
      return '<a class="carte-matiere" href="#/' + m.id + '" style="--c:' + m.couleur + '">' +
        '<span class="code">' + esc(m.code) + '</span>' +
        '<span class="nom">' + esc(m.nom) + '</span>' +
        '<span class="long">' + esc(m.long) + '</span>' +
        '<span class="compte">' + pluriel(nf, 'fiche') + (nv ? ' · ' + pluriel(nv, 'visuel') : '') + '</span>' +
        '</a>';
    }).join('');

    app.innerHTML =
      '<h1>Mes matières</h1>' +
      '<div class="recherche"><input id="q" type="search" placeholder="Chercher une notion (ex. élasticité, SONCASE)…" autocomplete="off"></div>' +
      '<div id="resultats"></div>' +
      '<div class="grille-matieres">' + cartes + '</div>' +
      (R.formules ? '<a class="lien-formules" href="#/formules"><b>Formules à retenir</b><span>Tous les calculs d’examen sur une page ›</span></a>' : '');

    var q = $('#q');
    q.addEventListener('input', function () { chercher(q.value.trim().toLowerCase()); });
  }

  function chercher(q) {
    var out = $('#resultats');
    if (q.length < 2) { out.innerHTML = ''; return; }
    var res = R.fiches.filter(function (f) {
      return (f.titre + ' ' + (f.resume || '')).toLowerCase().indexOf(q) >= 0 || texte(f.contenu).indexOf(q) >= 0;
    });
    out.innerHTML = res.length
      ? '<div class="liste-fiches">' + res.map(carteFiche).join('') + '</div>'
      : '<p class="vide">Aucune fiche ne contient « ' + esc(q) + ' ».</p>';
  }

  function carteFiche(f) {
    var m = matiere(f.matiere);
    return '<a class="carte-fiche" href="#/' + f.matiere + '/' + f.id + '" style="--c:' + m.couleur + '">' +
      '<span class="tag">' + esc(m.nom) + '</span>' +
      '<span class="titre">' + esc(f.titre) + '</span>' +
      (f.resume ? '<span class="resume">' + esc(f.resume) + '</span>' : '') +
      '</a>';
  }

  function pageMatiere(m, onglet) {
    document.title = m.nom + ' · Révisions BTS MCO';
    var fiches = fichesDe(m.id), visuels = visuelsDe(m.id);

    var corps;
    if (onglet === 'visuels') {
      corps = visuels.length
        ? '<div class="galerie">' + visuels.map(vignette).join('') + '</div>'
        : '<p class="vide">Pas encore de visuel pour cette matière.</p>';
    } else {
      corps = fiches.length
        ? '<div class="liste-fiches">' + fiches.map(carteFiche).join('') + '</div>'
        : '<p class="vide">Pas encore de fiche pour cette matière.</p>';
    }

    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › ' + esc(m.nom) + '</nav>' +
      '<header class="entete-matiere" style="--c:' + m.couleur + '">' +
        '<span class="code">' + esc(m.code) + '</span>' +
        '<h1>' + esc(m.nom) + '</h1><p>' + esc(m.long) + '</p>' +
      '</header>' +
      '<div class="onglets" style="--c:' + m.couleur + '">' +
        '<a href="#/' + m.id + '"' + (onglet !== 'visuels' ? ' class="actif"' : '') + '>Fiches (' + fiches.length + ')</a>' +
        '<a href="#/' + m.id + '/visuels"' + (onglet === 'visuels' ? ' class="actif"' : '') + '>Visuels (' + visuels.length + ')</a>' +
      '</div>' + corps;
  }

  function vignette(v) {
    return '<figure class="vignette"><button type="button" data-src="' + esc(v.src) + '" data-legende="' + esc(v.legende || '') + '">' +
      '<img src="' + esc(v.src) + '" alt="' + esc(v.legende || '') + '" loading="lazy"></button>' +
      (v.legende ? '<figcaption>' + esc(v.legende) + '</figcaption>' : '') + '</figure>';
  }

  function pageFiche(m, f) {
    document.title = f.titre + ' · Révisions BTS MCO';
    var liste = fichesDe(m.id), i = liste.indexOf(f);
    var prec = liste[i - 1], suiv = liste[i + 1];
    var visuels = R.visuels.filter(function (v) { return v.fiche === f.id; });

    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › <a href="#/' + m.id + '">' + esc(m.nom) + '</a></nav>' +
      '<article class="fiche" style="--c:' + m.couleur + '">' +
        '<h1>' + esc(f.titre) + '</h1>' +
        (f.date ? '<p class="meta">' + dateFr(f.date) + '</p>' : '') +
        '<div class="contenu">' + f.contenu + '</div>' +
        (visuels.length ? '<h2>Visuels</h2><div class="galerie">' + visuels.map(vignette).join('') + '</div>' : '') +
      '</article>' +
      '<nav class="suite">' +
        (prec ? '<a href="#/' + m.id + '/' + prec.id + '">‹ ' + esc(prec.titre) + '</a>' : '<span></span>') +
        (suiv ? '<a href="#/' + m.id + '/' + suiv.id + '">' + esc(suiv.titre) + ' ›</a>' : '<span></span>') +
      '</nav>';
    envelopperTableaux();
  }

  // Les tableaux larges défilent dans leur cadre plutôt que la page entière,
  // puis les composants interactifs (étapes, cartes, calculatrices…) sont activés.
  function envelopperTableaux() {
    Array.prototype.forEach.call(app.querySelectorAll('.contenu table'), function (t) {
      var w = document.createElement('div');
      w.className = 'table-wrap';
      t.parentNode.insertBefore(w, t);
      w.appendChild(t);
    });
    Composants.activer(app);
  }

  function pageFormules() {
    document.title = 'Formules à retenir · Révisions BTS MCO';
    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › Formules</nav>' +
      '<article class="fiche" style="--c:#c2410c"><h1>Formules à retenir</h1>' +
      '<div class="contenu">' + R.formules + '</div></article>';
    envelopperTableaux();
  }

  function introuvable() {
    app.innerHTML = '<p class="vide">Page introuvable. <a href="#/">Retour aux matières</a></p>';
  }

  // ---------- Routage : #/matiere, #/matiere/visuels, #/matiere/fiche ----------

  function route() {
    var parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!parts.length) accueil();
    else if (parts[0] === 'formules' && R.formules) pageFormules();
    else {
      var m = matiere(parts[0]);
      if (!m) introuvable();
      else if (!parts[1]) pageMatiere(m, 'fiches');
      else if (parts[1] === 'visuels') pageMatiere(m, 'visuels');
      else {
        var f = fichesDe(m.id).filter(function (x) { return x.id === parts[1]; })[0];
        if (f) pageFiche(m, f); else introuvable();
      }
    }
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', route);
  route();

  // ---------- Visionneuse d'images ----------

  var lb = document.getElementById('lightbox');
  app.addEventListener('click', function (e) {
    var b = e.target.closest('.vignette button');
    if (!b) return;
    $('img', lb).src = b.dataset.src;
    $('img', lb).alt = b.dataset.legende;
    $('.lb-caption', lb).textContent = b.dataset.legende;
    lb.hidden = false;
  });
  lb.addEventListener('click', function (e) { if (e.target.tagName !== 'IMG') lb.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.hidden = true; });

  // ---------- Thème clair / sombre ----------

  var root = document.documentElement;
  try { var t = localStorage.getItem('theme'); if (t) root.dataset.theme = t; } catch (e) {}
  document.getElementById('themeBtn').addEventListener('click', function () {
    var sombre = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = sombre ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });
})();
