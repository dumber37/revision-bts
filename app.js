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
      // Regroupés par document d'origine, dans l'ordre d'ajout.
      var groupes = [];
      visuels.forEach(function (v) {
        var g = groupes.filter(function (x) { return x.nom === (v.groupe || ''); })[0];
        if (!g) groupes.push(g = { nom: v.groupe || '', pdf: v.pdf, items: [] });
        g.items.push(v);
      });
      corps = visuels.length
        ? groupes.map(function (g) {
            return (g.nom ? '<div class="groupe-visuels"><h2>' + esc(g.nom) + '</h2>' +
                (g.pdf ? '<a class="pdf" href="' + esc(g.pdf) + '" target="_blank" rel="noopener">PDF ↓</a>' : '') + '</div>' : '') +
              lecteur(g.items);
          }).join('')
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
    activerLecteurs();
  }

  // ---------- Lecteur de diapos (défilement horizontal, comme un diaporama) ----------

  var lecteurs = [];
  function lecteur(items) {
    var k = lecteurs.push(items) - 1;
    return '<div class="lecteur" tabindex="0" data-k="' + k + '" aria-label="Diaporama, flèches gauche et droite pour défiler">' +
      '<div class="lecteur-scene">' +
        '<div class="lecteur-piste">' + items.map(function (v, i) {
          return '<figure class="diapo"><img src="' + esc(v.src) + '" alt="' + esc(v.legende || '') + '"' + (i > 1 ? ' loading="lazy"' : '') + '></figure>';
        }).join('') + '</div>' +
        '<button class="lecteur-nav prec" type="button" data-pas="-1" aria-label="Diapo précédente">‹</button>' +
        '<button class="lecteur-nav suiv" type="button" data-pas="1" aria-label="Diapo suivante">›</button>' +
      '</div>' +
      '<div class="lecteur-barre"><span class="lecteur-legende"></span><span class="lecteur-compteur"></span>' +
        '<button class="lecteur-plein" type="button">⛶ Plein écran</button></div>' +
      (items.length > 1 ? '<div class="lecteur-miniatures">' + items.map(function (v, i) {
          return '<button type="button" data-i="' + i + '" aria-label="' + esc(v.legende || 'Diapo ' + (i + 1)) + '"><img src="' + esc(v.src) + '" alt="" loading="lazy"><span>' + (i + 1) + '</span></button>';
        }).join('') + '</div>' : '') +
      '</div>';
  }

  function activerLecteurs() {
    Array.prototype.forEach.call(app.querySelectorAll('.lecteur'), function (L) {
      var items = lecteurs[+L.dataset.k];
      var piste = $('.lecteur-piste', L), minis = $('.lecteur-miniatures', L), cur = -1;
      function index() { return Math.round(piste.scrollLeft / piste.clientWidth) || 0; }
      function aller(i) {
        i = Math.max(0, Math.min(items.length - 1, i));
        piste.scrollTo({ left: i * piste.clientWidth, behavior: 'smooth' });
        maj(i);
      }
      function maj(i) {
        if (i === cur) return;
        cur = i;
        L.dataset.cur = i;
        $('.lecteur-legende', L).textContent = items[i].legende || '';
        $('.lecteur-compteur', L).textContent = (i + 1) + ' / ' + items.length;
        $('.prec', L).disabled = i === 0;
        $('.suiv', L).disabled = i === items.length - 1;
        if (minis) {
          Array.prototype.forEach.call(minis.children, function (b, j) { b.classList.toggle('active', j === i); });
          var b = minis.children[i];
          minis.scrollTo({ left: b.offsetLeft - (minis.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' });
        }
      }
      var t;
      piste.addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(function () { maj(index()); }, 60); }, { passive: true });
      L.addEventListener('click', function (e) {
        var n = e.target.closest('[data-pas]'), m = e.target.closest('[data-i]');
        if (n) aller(cur + +n.dataset.pas);
        else if (m) aller(+m.dataset.i);
        else if (e.target.closest('.lecteur-plein')) pleinEcran(L, items, cur);
      });
      L.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') { aller(cur + 1); e.preventDefault(); }
        else if (e.key === 'ArrowLeft') { aller(cur - 1); e.preventDefault(); }
      });
      maj(0);
    });
  }
  // Après un changement de taille (rotation du téléphone, plein écran), rester sur la même diapo.
  window.addEventListener('resize', function () {
    Array.prototype.forEach.call(app.querySelectorAll('.lecteur'), function (L) {
      var p = $('.lecteur-piste', L);
      p.scrollLeft = (+L.dataset.cur || 0) * p.clientWidth;
    });
  });

  function pleinEcran(L, items, i) {
    if (L.requestFullscreen && document.fullscreenEnabled) {
      if (document.fullscreenElement) document.exitFullscreen();
      else L.requestFullscreen().then(function () { $('.lecteur-piste', L).scrollLeft = i * $('.lecteur-piste', L).clientWidth; });
    } else {
      ouvrirVisionneuse(items, i); // iPhone : pas de plein écran sur un élément, on prend la visionneuse
    }
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
        (visuels.length ? '<h2>Les diapos de la fiche</h2>' + lecteur(visuels) : '') +
      '</article>' +
      '<nav class="suite">' +
        (prec ? '<a href="#/' + m.id + '/' + prec.id + '">‹ ' + esc(prec.titre) + '</a>' : '<span></span>') +
        (suiv ? '<a href="#/' + m.id + '/' + suiv.id + '">' + esc(suiv.titre) + ' ›</a>' : '<span></span>') +
      '</nav>';
    envelopperTableaux();
    activerLecteurs();
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
    lecteurs = [];
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

  // Plein écran de secours (iPhone) : flèches, clavier et glisser du doigt.
  var lb = document.getElementById('lightbox'), lbListe = [], lbI = 0;
  function lbMontrer(i) {
    lbI = (i + lbListe.length) % lbListe.length;
    var v = lbListe[lbI];
    $('img', lb).src = v.src;
    $('img', lb).alt = v.legende || '';
    $('.lb-caption', lb).textContent = (v.legende || '') + (lbListe.length > 1 ? '  ·  ' + (lbI + 1) + '/' + lbListe.length : '');
    lb.classList.toggle('seule', lbListe.length < 2);
  }
  function ouvrirVisionneuse(items, i) {
    lbListe = items;
    lbMontrer(i);
    lb.hidden = false;
  }
  lb.addEventListener('click', function (e) {
    var nav = e.target.closest('[data-pas]');
    if (nav) lbMontrer(lbI + +nav.dataset.pas);
    else if (e.target.tagName !== 'IMG') lb.hidden = true;
  });
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') lb.hidden = true;
    else if (e.key === 'ArrowRight') lbMontrer(lbI + 1);
    else if (e.key === 'ArrowLeft') lbMontrer(lbI - 1);
  });
  var x0 = null;
  lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) lbMontrer(lbI + (dx < 0 ? 1 : -1));
    x0 = null;
  });

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
