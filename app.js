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

  // Texte brut d'une fiche, lisible (listes, tableaux) : sert à la recherche et à la question posée à Claude.
  function enTexte(html) {
    var d = document.createElement('div');
    d.innerHTML = html;
    var out = '';
    (function parcourir(n) {
      if (n.nodeType === 3) { out += n.nodeValue.replace(/\s+/g, ' '); return; }
      if (n.nodeType !== 1) return;
      var t = n.tagName;
      if (t === 'H2' || t === 'H3') out += '\n\n## ';
      else if (t === 'LI') out += '\n- ';
      else if (t === 'TR') out += '\n';
      else if (t === 'TD' || t === 'TH') out += ' | ';
      else if (t === 'BR') out += '\n';
      else if (/^(P|DIV|TABLE|UL|OL)$/.test(t)) out += '\n';
      Array.prototype.forEach.call(n.childNodes, parcourir);
      if (n.className === 'cartes' || (n.parentNode && n.parentNode.className === 'cartes')) out += '\n';
    })(d);
    return out.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  var texteCache = {};
  function texteFiche(f) { return texteCache[f.id] || (texteCache[f.id] = enTexte(f.contenu)); }

  // ---------- Pages ----------

  // Icônes dessinées des matières (traits, couleur de la matière).
  var ICONES = {
    // Relation client : deux bulles de dialogue
    drcv: '<path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5v4a2.5 2.5 0 0 1-2.5 2.5H10l-3.5 3v-3h0A2.5 2.5 0 0 1 4 10.5z"/><path d="M19.5 9.5A2 2 0 0 1 21 11.4v3.6a2 2 0 0 1-2 2h-.5v2.5L15.5 17H13a2 2 0 0 1-1.7-1"/><path d="M8 8.5h5M8 11h3"/>',
    // Offre commerciale : vitrine avec store
    adoc: '<path d="M3.5 9 5 4.5h14L20.5 9"/><path d="M3.5 9a2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0"/><path d="M5 11.5V20h14v-8.5"/><path d="M10 20v-5h4v5"/>',
    // Management : une équipe
    management: '<circle cx="12" cy="7.5" r="2.8"/><path d="M6.5 19.5v-1.2A4.3 4.3 0 0 1 10.8 14h2.4a4.3 4.3 0 0 1 4.3 4.3v1.2"/><circle cx="5" cy="9.5" r="2"/><path d="M2 18v-.8A3 3 0 0 1 5 14.2h.8"/><circle cx="19" cy="9.5" r="2"/><path d="M22 18v-.8a3 3 0 0 0-3-3h-.8"/>',
    // Gestion : graphique en barres avec tendance
    gestion: '<path d="M4 4v16h16"/><path d="M8 16v-4M12 16V9M16 16v-6"/><path d="m7 9.5 4-3.5 3 2 5-4.5"/><path d="M16.5 3.5H19V6"/>'
  };
  function icone(id) {
    return ICONES[id] ? '<svg class="carte-ico" viewBox="0 0 24 24" aria-hidden="true">' + ICONES[id] + '</svg>' : '';
  }

  function accueil() {
    document.title = 'Révisions BTS MCO';
    var cartes = R.matieres.map(function (m) {
      var nf = fichesDe(m.id).length, nv = visuelsDe(m.id).length;
      return '<a class="carte-matiere" href="#/' + m.id + '" style="--c:' + m.couleur + '">' +
        icone(m.id) +
        '<span class="code">' + esc(m.code) + '</span>' +
        '<span class="nom">' + esc(m.nom) + '</span>' +
        '<span class="long">' + esc(m.long) + '</span>' +
        '<span class="compte">' + pluriel(nf, 'fiche') + (nv ? ' · ' + pluriel(nv, 'visuel') : '') + '</span>' +
        Jeu.progression(fichesDe(m.id)) +
        '</a>';
    }).join('');

    app.innerHTML =
      Jeu.hero() +
      '<div class="recherche"><input id="q" type="search" placeholder="Chercher une notion (ex. élasticité, SONCASE)…" autocomplete="off"></div>' +
      '<div id="resultats"></div>' +
      '<h2 class="titre-section">Mes matières</h2>' +
      '<div class="grille-matieres">' + cartes + '</div>' +
      '<h2 class="titre-section">S’entraîner</h2>' +
      '<div class="raccourcis">' +
        '<a class="lien-defi" href="#/defi"><span class="ico">⚡</span><span><b>Défi éclair</b><span>10 questions chrono, toutes matières</span></span></a>' +
        '<a class="lien-profil" href="#/duel"><span class="ico">⚔️</span><span><b>Duel</b><span>À deux sur le même téléphone</span></span></a>' +
        '<a class="lien-profil" href="#/express"><span class="ico">⏱</span><span><b>L’essentiel en 1 minute</b><span>Les 3 points clés de chaque fiche</span></span></a>' +
        '<a class="lien-profil" href="#/profil"><span class="ico">🏅</span><span><b>Mon profil</b><span>Niveau, badges et records</span></span></a>' +
      '</div>' +
      '<p class="astuce">Cartes mémo, ordre, textes à trous, memory, chasse à l’erreur, boss et examen blanc : onglet <b>S’entraîner</b> de chaque matière.</p>' +
      (R.formules ? '<a class="lien-formules" href="#/formules"><b>Formules à retenir</b><span>Tous les calculs d’examen sur une page ›</span></a>' : '') +
      '<div id="installer"></div>';
    afficherInstallation($('#installer'));
    if (typeof Jeux !== 'undefined') Jeux.magasin($('#hero-magasin'), true);

    var q = $('#q');
    q.addEventListener('input', function () { chercher(q.value.trim().toLowerCase()); });
  }

  function chercher(q) {
    var out = $('#resultats');
    if (q.length < 2) { out.innerHTML = ''; return; }
    var res = R.fiches.filter(function (f) {
      return (f.titre + ' ' + (f.resume || '') + ' ' + texteFiche(f)).toLowerCase().indexOf(q) >= 0;
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
      '<span class="carte-jeu">' + Jeu.etoiles(f.id) + '</span>' +
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
                liensPdf(g.pdf) + '</div>' : '') +
              lecteur(g.items);
          }).join('')
        : '<p class="vide">Pas encore de visuel pour cette matière.</p>';
      // QCM de fin : questions de toutes les fiches de la matière, mélangées.
      if (Jeu.questionsMatiere(m.id).length) corps += '<div id="qcm"></div>';
    } else if (onglet === 'entrainement') {
      corps = Activites.hub(m);
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
        '<a href="#/' + m.id + '"' + (onglet === 'fiches' ? ' class="actif"' : '') + '>Fiches (' + fiches.length + ')</a>' +
        '<a href="#/' + m.id + '/visuels"' + (onglet === 'visuels' ? ' class="actif"' : '') + '>Visuels (' + visuels.length + ')</a>' +
        '<a href="#/' + m.id + '/entrainement"' + (onglet === 'entrainement' ? ' class="actif"' : '') + '>S’entraîner</a>' +
      '</div>' + corps;
    activerLecteurs();
    if ($('#qcm')) Composants.qcm($('#qcm'), Jeu.questionsMatiere(m.id), 8, 'matiere:' + m.id);
  }

  function liensPdf(pdf) {
    if (!pdf) return '';
    var liste = typeof pdf === 'string' ? [['PDF', pdf]] : pdf;
    return '<span class="pdfs">' + liste.map(function (p) {
      return '<a class="pdf" href="' + esc(p[1]) + '" target="_blank" rel="noopener">' + esc(p[0]) + ' ↓</a>';
    }).join('') + '</span>';
  }

  // ---------- Lecteur de diapos (défilement horizontal, comme un diaporama) ----------

  var lecteurs = [];
  function lecteur(items) {
    var k = lecteurs.push(items) - 1;
    return '<div class="lecteur" tabindex="0" data-k="' + k + '" aria-label="Diaporama, flèches gauche et droite pour défiler">' +
      '<div class="lecteur-scene">' +
        '<div class="lecteur-piste">' + items.map(function (v, i) {
          return '<figure class="diapo"><img src="' + esc(v.src) + '" alt="' + esc(v.legende || '') + '" decoding="async" draggable="false"' + (i > 1 ? ' loading="lazy"' : '') + '></figure>';
        }).join('') + '</div>' +
        '<button class="lecteur-nav prec" type="button" data-pas="-1" aria-label="Diapo précédente">‹</button>' +
        '<button class="lecteur-nav suiv" type="button" data-pas="1" aria-label="Diapo suivante">›</button>' +
      '</div>' +
      '<div class="lecteur-barre"><span class="lecteur-legende"></span><span class="lecteur-compteur"></span>' +
        '<button class="lecteur-plein" type="button">⛶ Plein écran</button></div>' +
      (items.length > 1 ? '<div class="lecteur-miniatures">' + items.map(function (v, i) {
          return '<button type="button" data-i="' + i + '" aria-label="' + esc(v.legende || 'Diapo ' + (i + 1)) + '">' +
            '<img src="' + esc(v.mini || v.src) + '" alt="" loading="lazy" decoding="async"><span>' + (i + 1) + '</span></button>';
        }).join('') + '</div>' : '') +
      '</div>';
  }

  function activerLecteurs() {
    Array.prototype.forEach.call(app.querySelectorAll('.lecteur'), function (L) {
      var items = lecteurs[+L.dataset.k];
      var piste = $('.lecteur-piste', L), minis = $('.lecteur-miniatures', L), cur = -1;
      var imgs = piste.querySelectorAll('img'), cible = null, cadre = 0;
      function index() { return Math.round(piste.scrollLeft / piste.clientWidth) || 0; }
      function aller(i) {
        i = Math.max(0, Math.min(items.length - 1, i));
        cible = i; // pendant l'animation, on ne recalcule pas la diapo à chaque pixel
        piste.scrollTo({ left: i * piste.clientWidth, behavior: 'smooth' });
        maj(i);
      }
      // Charge à l'avance les diapos voisines pour qu'elles soient prêtes quand on arrive dessus.
      function precharger(i) {
        for (var j = i - 1; j <= i + 2; j++) if (imgs[j] && imgs[j].loading === 'lazy') imgs[j].loading = 'eager';
      }
      function maj(i) {
        if (i === cur) return;
        cur = i;
        L.dataset.cur = i;
        $('.lecteur-legende', L).textContent = items[i].legende || '';
        $('.lecteur-compteur', L).textContent = (i + 1) + ' / ' + items.length;
        $('.prec', L).disabled = i === 0;
        $('.suiv', L).disabled = i === items.length - 1;
        precharger(i);
        if (minis) {
          Array.prototype.forEach.call(minis.children, function (b, j) { b.classList.toggle('active', j === i); });
          var b = minis.children[i];
          minis.scrollTo({ left: b.offsetLeft - (minis.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' });
        }
      }
      // Au doigt, le compteur suit en direct (une fois par image affichée).
      piste.addEventListener('scroll', function () {
        if (cadre) return;
        cadre = requestAnimationFrame(function () {
          cadre = 0;
          if (cible !== null) {
            if (Math.abs(piste.scrollLeft - cible * piste.clientWidth) < 2) cible = null;
            return;
          }
          maj(index());
        });
      }, { passive: true });
      piste.addEventListener('scrollend', function () { cible = null; maj(index()); });
      piste.addEventListener('touchstart', function () { cible = null; }, { passive: true });

      // À la souris : on attrape la diapo et on la fait glisser, comme sur Canva.
      var drag = null;
      piste.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse' || e.button !== 0) return;
        drag = { x: e.clientX, left: piste.scrollLeft, bouge: false };
        piste.setPointerCapture(e.pointerId);
      });
      piste.addEventListener('pointermove', function (e) {
        if (!drag) return;
        var dx = e.clientX - drag.x;
        if (!drag.bouge && Math.abs(dx) > 4) { drag.bouge = true; piste.classList.add('glisse'); }
        if (drag.bouge) piste.scrollLeft = drag.left - dx;
      });
      function lacher(e) {
        if (!drag) return;
        var dx = e.clientX - drag.x, depart = Math.round(drag.left / piste.clientWidth);
        piste.classList.remove('glisse');
        if (drag.bouge) aller(Math.abs(dx) > piste.clientWidth * 0.12 ? depart + (dx < 0 ? 1 : -1) : depart);
        drag = null;
      }
      piste.addEventListener('pointerup', lacher);
      piste.addEventListener('pointercancel', lacher);

      L.addEventListener('click', function (e) {
        var n = e.target.closest('[data-pas]'), m = e.target.closest('[data-i]');
        if (n) aller(cur + +n.dataset.pas);
        else if (m) aller(+m.dataset.i);
        else if (e.target.closest('.lecteur-plein')) pleinEcran(L, items, cur);
      });
      L.addEventListener('keydown', function (e) {
        if (!lb.hidden) return; // la visionneuse ouverte a la main sur les flèches
        if (e.key === 'ArrowRight') { aller(cur + 1); e.preventDefault(); }
        else if (e.key === 'ArrowLeft') { aller(cur - 1); e.preventDefault(); }
      });
      maj(0);
    });
  }
  // Rotation du téléphone, plein écran : rester sur la même diapo. On ignore les changements de hauteur seuls
  // (barre d'adresse du téléphone qui apparaît ou disparaît), qui feraient sauter le diaporama pendant un glissé.
  var largeur = window.innerWidth;
  window.addEventListener('resize', function () {
    if (window.innerWidth === largeur && !document.fullscreenElement) return;
    largeur = window.innerWidth;
    Array.prototype.forEach.call(document.querySelectorAll('.lecteur'), function (L) {
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

  // ---------- Poser une question à Claude ----------
  // Ouvre claude.ai dans un nouvel onglet avec la fiche et la question déjà écrites : aucune clé d'API sur le site.

  var MAX_URL = 7000; // au-delà, certains navigateurs ou serveurs refusent l'adresse

  function boiteClaude() {
    return '<section class="ia">' +
      '<label class="ia-titre" for="iaQ">Une question sur cette fiche ?</label>' +
      '<textarea id="iaQ" rows="2" placeholder="Ex. Tu peux me réexpliquer avec un exemple concret ?"></textarea>' +
      '<div class="ia-actions"><button type="button" class="ia-btn">Demander à Claude ↗</button>' +
      '<span class="ia-note">Claude s’ouvre dans un nouvel onglet avec la fiche. Il faut être connecté à ton compte.</span></div>' +
      '</section>';
  }

  function activerClaude(titre, contexte, texte) {
    var zone = $('#iaQ'), btn = $('.ia-btn');
    if (!zone) return;
    function envoyer() {
      var question = zone.value.trim();
      if (!question) { zone.focus(); zone.classList.add('ia-vide'); return; }
      zone.classList.remove('ia-vide');
      var corps = texte, url;
      // On raccourcit la fiche jusqu'à ce que l'adresse passe.
      for (var n = 0; n < 12; n++) {
        url = 'https://claude.ai/new?q=' + encodeURIComponent(
          'Je révise le BTS MCO (2e année). ' + contexte + '\n' +
          'Voici ma fiche de révision « ' + titre + ' » :\n\n' + corps + '\n\n' +
          'Réponds en français, simplement et brièvement, en t’appuyant sur cette fiche. ' +
          'Si tu ajoutes une notion qui n’y est pas, dis-le.\n\nMa question : ' + question);
        if (url.length <= MAX_URL) break;
        corps = corps.slice(0, Math.floor(corps.length * 0.75)).replace(/\s+\S*$/, '') + ' […]';
      }
      window.open(url, '_blank', 'noopener');
    }
    btn.addEventListener('click', envoyer);
    zone.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); envoyer(); }
    });
  }

  // Une fiche compte comme « lue » quand on arrive à son QCM (donc à la fin du contenu).
  var lecture = null;
  function surveillerLecture(id) {
    var cible = $('#qcm') || $('.suite');
    if (!cible || !('IntersectionObserver' in window)) return;
    lecture = new IntersectionObserver(function (e) {
      if (e[0].isIntersecting) { Jeu.ficheLue(id); lecture.disconnect(); lecture = null; }
    });
    lecture.observe(cible);
  }

  function pageFiche(m, f) {
    document.title = f.titre + ' · Révisions BTS MCO';
    var liste = fichesDe(m.id), i = liste.indexOf(f);
    var prec = liste[i - 1], suiv = liste[i + 1];
    var visuels = R.visuels.filter(function (v) { return v.matiere === m.id && v.fiche === f.id; });

    app.innerHTML =
      '<nav class="fil"><a href="#/">Matières</a> › <a href="#/' + m.id + '">' + esc(m.nom) + '</a></nav>' +
      '<article class="fiche" style="--c:' + m.couleur + '">' +
        '<h1>' + esc(f.titre) + '</h1>' +
        (f.date ? '<p class="meta">' + dateFr(f.date) + '</p>' : '') +
        Activites.encadreEssentiel(f) +
        '<div class="contenu">' + f.contenu + '</div>' +
        (visuels.length ? '<h2>Les diapos de la fiche</h2>' + lecteur(visuels) : '') +
      '</article>' +
      (Jeu.questionsDe(f.id).length ? '<div id="qcm"></div>' : '') +
      boiteClaude() +
      '<nav class="suite">' +
        (prec ? '<a href="#/' + m.id + '/' + prec.id + '">‹ ' + esc(prec.titre) + '</a>' : '<span></span>') +
        (suiv ? '<a href="#/' + m.id + '/' + suiv.id + '">' + esc(suiv.titre) + ' ›</a>' : '<span></span>') +
      '</nav>';
    preparerContenu();
    activerLecteurs();
    if ($('#qcm')) Composants.qcm($('#qcm'), Jeu.questionsDe(f.id), 5, 'fiche:' + f.id);
    surveillerLecture(f.id);
    activerClaude(f.titre, 'Matière : ' + m.code + ' ' + m.long + '.', texteFiche(f));
  }

  // Les tableaux larges défilent dans leur cadre plutôt que la page entière,
  // puis les composants interactifs (étapes, cartes, calculatrices…) sont activés.
  function preparerContenu() {
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
      '<article class="fiche" style="--c:var(--rouille)"><h1>Formules à retenir</h1>' +
      '<div class="contenu">' + R.formules + '</div></article>' +
      boiteClaude();
    preparerContenu();
    activerClaude('Formules à retenir', 'Ce sont les formules de calcul pour l’examen.', enTexte(R.formules));
    Array.prototype.forEach.call(app.querySelectorAll('details.correction'), function (d, i) {
      d.addEventListener('toggle', function () { if (d.open) Jeu.correction(i); });
    });
  }

  function introuvable() {
    app.innerHTML = '<p class="vide">Page introuvable. <a href="#/">Retour aux matières</a></p>';
  }

  // ---------- Routage : #/matiere, #/matiere/visuels, #/matiere/fiche ----------

  function route() {
    var parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    lecteurs = [];
    Jeu.quitter(); // arrête le chrono du Défi éclair si on quitte la page
    Activites.quitterTout(); // chronos de l'examen, du duel… et raccourcis clavier des jeux
    if (lecture) { lecture.disconnect(); lecture = null; }
    lb.hidden = true; // bouton retour du téléphone : on ne garde pas la visionneuse ouverte
    if (document.fullscreenElement) document.exitFullscreen();
    if (!parts.length) accueil();
    else if (parts[0] === 'formules' && R.formules) pageFormules();
    else if (parts[0] === 'defi') Jeu.pageDefi(app);
    else if (parts[0] === 'profil') Jeu.pageProfil(app);
    else if (parts[0] === 'revoir') Jeu.pageRevoir(app);
    else if (parts[0] === 'express') Activites.pageExpress(app);
    else if (Activites.pageGlobale(parts[0])) Activites.pageGlobale(parts[0])(app);
    else {
      var m = matiere(parts[0]);
      var pages = { cartes: Activites.pageCartes, ordre: Activites.pageOrdre, trous: Activites.pageTrous, examen: Activites.pageExamen };
      if (!m) introuvable();
      else if (!parts[1]) pageMatiere(m, 'fiches');
      else if (parts[1] === 'visuels' || parts[1] === 'entrainement') pageMatiere(m, parts[1]);
      else if (Activites.page(parts[1])) Activites.page(parts[1])(app, m);
      else if (pages[parts[1]]) pages[parts[1]](app, m);
      else {
        var f = fichesDe(m.id).filter(function (x) { return x.id === parts[1]; })[0];
        if (f) pageFiche(m, f); else introuvable();
      }
    }
    window.scrollTo(0, 0);
  }

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

  // ---------- Thème clair / sombre (le thème enregistré est déjà appliqué dans le <head>) ----------

  var root = document.documentElement;
  document.getElementById('themeBtn').addEventListener('click', function () {
    var sombre = root.dataset.theme
      ? root.dataset.theme === 'dark'
      : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = sombre ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) {}
  });

  // ---------- Application installable et hors-ligne ----------

  var invite = null; // proposition d'installation de Chrome / Edge / Android
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    invite = e;
    var c = $('#installer');
    if (c) afficherInstallation(c);
  });
  window.addEventListener('appinstalled', function () { invite = null; Jeu.toast('📲 Application installée !', 'grand'); });

  function installee() {
    return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  }
  function afficherInstallation(c) {
    if (!c) return;
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    var html = '<section class="installer"><div class="installer-ico">📲</div><div class="installer-txt">';
    if (installee()) {
      html += '<b>Application installée</b><span>Tu peux aussi télécharger les visuels pour réviser sans réseau.</span>';
    } else if (invite) {
      html += '<b>Installer l’application</b><span>Sur ton écran d’accueil, comme une vraie appli, et disponible sans réseau.</span>' +
        '<button type="button" class="installer-btn" data-installer>Installer</button>';
    } else if (ios) {
      html += '<b>Installer sur iPhone</b><span>Dans Safari : bouton Partager <b>⎙</b>, puis « Sur l’écran d’accueil ».</span>';
    } else {
      html += '<b>Réviser sans réseau</b><span>Les pages déjà ouvertes restent disponibles hors-ligne. Télécharge aussi les visuels pour le bus ou la salle d’attente.</span>';
    }
    html += 'serviceWorker' in navigator ? '<button type="button" class="installer-btn secondaire" data-horsligne>Télécharger les visuels (≈ 13 Mo)</button>' : '';
    html += '</div></section>';
    c.innerHTML = html;
    var bi = c.querySelector('[data-installer]');
    if (bi) bi.addEventListener('click', function () {
      invite.prompt();
      invite.userChoice.then(function () { invite = null; afficherInstallation(c); });
    });
    var bh = c.querySelector('[data-horsligne]');
    if (bh) bh.addEventListener('click', function () { toutTelecharger(bh); });
  }
  Jeu.surProfil(function (a) { afficherInstallation(a.querySelector('#installer')); });

  // Charge chaque image et PDF une fois : le service worker les garde en cache.
  function toutTelecharger(btn) {
    var urls = [];
    R.visuels.forEach(function (v) { urls.push(v.src); if (v.mini) urls.push(v.mini); });
    R.visuels.forEach(function (v) {
      (typeof v.pdf === 'string' ? [[0, v.pdf]] : v.pdf || []).forEach(function (p) { if (urls.indexOf(p[1]) < 0) urls.push(p[1]); });
    });
    var faits = 0;
    btn.disabled = true;
    function maj() { btn.textContent = 'Téléchargement… ' + Math.round(faits / urls.length * 100) + ' %'; }
    maj();
    var file = urls.slice();
    function suivant() {
      var u = file.shift();
      if (!u) {
        btn.textContent = '✓ Visuels disponibles hors-ligne';
        Jeu.toast('✓ Tout est disponible hors-ligne', 'grand');
        return;
      }
      fetch(u).catch(function () {}).then(function () { faits++; maj(); suivant(); });
    }
    for (var k = 0; k < 4; k++) suivant(); // 4 téléchargements en parallèle
  }

  if ('serviceWorker' in navigator && (location.protocol === 'https:' || location.hostname === 'localhost')) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
  }

  window.addEventListener('hashchange', route);
  Jeu.majChip();
  route();
})();
