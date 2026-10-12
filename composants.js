// Composants interactifs des fiches. Le HTML des fiches reste lisible sans eux (impression, recherche).
//   <ol class="etapes"><li><b>Titre</b><p>Détail</p></li>…</ol>         étapes cliquables
//   <ol class="pyramide"><li><b>Haut</b><p>…</p></li>…</ol>             pyramide cliquable (du haut vers le bas)
//   <div class="cartes"><div><b>Recto</b><p>Verso</p></div>…</div>     cartes à retourner
//   <div class="barre" data-parts="Libellé|valeur|détail;…"></div>     barre de répartition
//   <div data-calc="elasticite|paie|marge|scoring"></div>              calculatrices
var Composants = (function () {
  'use strict';

  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function nombre(v) { return parseFloat(String(v).replace(',', '.').replace(/\s/g, '')); }
  function fr(n, dec) {
    if (!isFinite(n)) return '—';
    return n.toLocaleString('fr-FR', { minimumFractionDigits: dec == null ? 2 : dec, maximumFractionDigits: dec == null ? 2 : dec });
  }

  // ---------- Étapes ----------
  function etapes(ol) {
    var items = Array.prototype.slice.call(ol.children).map(function (li) {
      var b = li.querySelector('b'), p = li.querySelector('p');
      return { titre: b ? b.innerHTML : li.innerHTML, detail: p ? p.innerHTML : '' };
    });
    var ui = el('div', 'etapes-ui');
    // Une suite ordonnée devient une frise (étapes reliées) ; une liste libre reste une grille.
    var liste = el('div', 'etapes-liste' + (ol.hasAttribute('data-libre') ? '' : ' frise'));
    var detail = el('div', 'etapes-detail');
    items.forEach(function (it, i) {
      var b = el('button', 'etape', '<span class="num">' + (i + 1) + '</span><span>' + it.titre + '</span>');
      b.type = 'button';
      b.addEventListener('click', function () { montrer(i); });
      liste.appendChild(b);
    });
    function montrer(i) {
      Array.prototype.forEach.call(liste.children, function (b, j) {
        b.classList.toggle('active', j === i);
        b.classList.toggle('vue', j < i);
      });
      // Dans une frise qui déborde (téléphone), on garde l'étape active visible.
      var a = liste.children[i];
      if (liste.scrollWidth > liste.clientWidth) liste.scrollTo({ left: a.offsetLeft - (liste.clientWidth - a.offsetWidth) / 2, behavior: 'smooth' });
      detail.innerHTML =
        '<div class="etapes-titre"><span class="num">' + (i + 1) + '/' + items.length + '</span> ' + items[i].titre + '</div>' +
        '<p>' + items[i].detail + '</p>' +
        '<div class="etapes-nav">' +
          '<button type="button" ' + (i === 0 ? 'disabled' : '') + ' data-i="' + (i - 1) + '">‹ Précédente</button>' +
          '<button type="button" ' + (i === items.length - 1 ? 'disabled' : '') + ' data-i="' + (i + 1) + '">Suivante ›</button>' +
        '</div>';
      Array.prototype.forEach.call(detail.querySelectorAll('[data-i]'), function (b) {
        b.addEventListener('click', function () { montrer(+b.dataset.i); });
      });
    }
    ui.appendChild(liste);
    ui.appendChild(detail);
    ol.parentNode.replaceChild(ui, ol);
    montrer(0);
  }

  // ---------- Pyramide (dessinée en SVG, un étage par élément, du haut vers le bas) ----------
  var TEINTES = [['#e8a33d', '#172340'], ['#e39158', '#172340'], ['#b85c1e', '#fff'], ['#2d3f6b', '#fff'], ['#172340', '#f5f2ec'], ['#111a31', '#f5f2ec']];
  function pyramide(ol) {
    var lis = Array.prototype.slice.call(ol.children), n = lis.length;
    var H = 250, L = 300, top = 8, h = (H - top) / n;
    // Demi-largeur à la hauteur y : la pointe est tronquée pour que le nom du dernier étage tienne.
    function demi(y) { return 40 + (y - top) / (H - top) * (L / 2 - 46); }
    var svg = '<svg class="pyramide-svg" viewBox="0 0 ' + L + ' ' + (H + 4) + '" role="group" aria-label="Pyramide">';
    lis.forEach(function (li, i) {
      var y1 = top + i * h, y2 = y1 + h, c = TEINTES[Math.min(i, TEINTES.length - 1)];
      var pts = [[L / 2 - demi(y1), y1], [L / 2 + demi(y1), y1], [L / 2 + demi(y2), y2], [L / 2 - demi(y2), y2]]
        .map(function (p) { return p[0].toFixed(1) + ',' + p[1].toFixed(1); }).join(' ');
      var nom = li.querySelector('b').textContent, taille = i === 0 ? 11 : 12.5;
      svg += '<g class="etage-svg" data-i="' + i + '" tabindex="0" role="button" aria-label="' + nom + '">' +
        '<polygon points="' + pts + '" fill="' + c[0] + '" stroke="var(--surface)" stroke-width="2"/>' +
        '<text x="' + L / 2 + '" y="' + (y1 + h / 2 + 4).toFixed(1) + '" text-anchor="middle" font-size="' + taille + '" font-weight="700" fill="' + c[1] + '">' + nom + '</text></g>';
    });
    svg += '</svg>';
    var ui = el('div', 'pyramide-ui', svg);
    var detail = el('p', 'pyramide-detail', 'Touche un étage de la pyramide.');
    ui.appendChild(detail);
    function choisir(g) {
      Array.prototype.forEach.call(ui.querySelectorAll('.etage-svg'), function (x) { x.classList.toggle('active', x === g); });
      var li = lis[+g.dataset.i];
      detail.innerHTML = '<b>' + li.querySelector('b').innerHTML + '</b> : ' + li.querySelector('p').innerHTML;
    }
    ui.addEventListener('click', function (e) { var g = e.target.closest('.etage-svg'); if (g) choisir(g); });
    ui.addEventListener('keydown', function (e) {
      var g = e.target.closest('.etage-svg');
      if (g && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); choisir(g); }
    });
    ol.parentNode.replaceChild(ui, ol);
  }

  // ---------- Jauge d'élasticité (0 à 4, aiguille sur la valeur) ----------
  function jauge(e) {
    if (!isFinite(e)) return '';
    var v = Math.min(Math.max(e, 0), 4), ang = Math.PI * (1 - v / 4), cx = 110, cy = 100, r = 80;
    function pt(val, rr) { var a = Math.PI * (1 - val / 4); return (cx + rr * Math.cos(a)).toFixed(1) + ' ' + (cy - rr * Math.sin(a)).toFixed(1); }
    function arc(a, b, col) { return '<path d="M' + pt(a, r) + ' A' + r + ' ' + r + ' 0 0 1 ' + pt(b, r) + '" stroke="' + col + '" stroke-width="16" fill="none"/>'; }
    return '<svg class="jauge" viewBox="0 0 220 140" role="img" aria-label="Élasticité ' + fr(e) + '">' +
      arc(0, 0.92, '#2fa36b') + arc(0.92, 1.08, '#8a93a6') + arc(1.08, 4, '#c4462b') +
      '<text x="' + (cx - r) + '" y="116" font-size="10" text-anchor="middle" fill="currentColor">0</text>' +
      '<text x="' + cx + '" y="14" font-size="10" text-anchor="middle" fill="currentColor">2</text>' +
      '<text x="' + (cx + r) + '" y="116" font-size="10" text-anchor="middle" fill="currentColor">4+</text>' +
      '<text x="' + (cx - 52) + '" y="74" font-size="9" fill="#2fa36b" text-anchor="middle">peu</text>' +
      '<text x="' + (cx + 52) + '" y="74" font-size="9" fill="#c4462b" text-anchor="middle">très</text>' +
      '<line class="aiguille" x1="' + cx + '" y1="' + cy + '" x2="' + (cx + (r - 14) * Math.cos(ang)).toFixed(1) + '" y2="' + (cy - (r - 14) * Math.sin(ang)).toFixed(1) + '" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="7" fill="currentColor"/>' +
      '<text x="' + cx + '" y="' + (cy + 34) + '" font-size="16" font-weight="700" text-anchor="middle" fill="currentColor">E = ' + fr(e) + '</text></svg>';
  }

  // ---------- Cartes à retourner ----------
  function cartes(div) {
    var bloc = Array.prototype.slice.call(div.children);
    var grille = el('div', 'cartes-grille');
    bloc.forEach(function (c) {
      var b = el('button', 'carte',
        '<span class="carte-in"><span class="face recto">' + c.querySelector('b').innerHTML + '</span>' +
        '<span class="face verso">' + c.querySelector('p').innerHTML + '</span></span>');
      b.type = 'button';
      b.addEventListener('click', function () { b.classList.toggle('retournee'); });
      grille.appendChild(b);
    });
    var barre = el('div', 'cartes-outils', '<span>Essaie de deviner avant de retourner.</span>');
    var tout = el('button', '', 'Tout retourner');
    tout.type = 'button';
    tout.addEventListener('click', function () {
      var cs = grille.querySelectorAll('.carte');
      var ouvrir = grille.querySelectorAll('.carte.retournee').length < cs.length;
      Array.prototype.forEach.call(cs, function (c) { c.classList.toggle('retournee', ouvrir); });
    });
    barre.appendChild(tout);
    div.innerHTML = '';
    div.appendChild(barre);
    div.appendChild(grille);
  }

  // ---------- Barre de répartition ----------
  var COULEURS = ['#172340', '#1d6b6b', '#b85c1e', '#e8a33d', '#8a93a6', '#6b4fa0'];
  function barre(div) {
    var parts = div.dataset.parts.split(';').map(function (s) {
      var p = s.split('|');
      return { nom: p[0], val: nombre(p[1]), detail: p[2] || '' };
    });
    var piste = el('div', 'barre-piste');
    var legende = el('div', 'barre-legende');
    var info = el('p', 'barre-info', 'Clique sur une part pour la détailler.');
    function choisir(i) {
      Array.prototype.forEach.call(piste.children, function (s, j) { s.classList.toggle('active', j === i); s.classList.toggle('terne', j !== i); });
      Array.prototype.forEach.call(legende.children, function (s, j) { s.classList.toggle('active', j === i); });
      info.innerHTML = '<b>' + parts[i].nom + ' : ' + fr(parts[i].val, parts[i].val % 1 ? 1 : 0) + ' %</b>' + (parts[i].detail ? ' · ' + parts[i].detail : '');
    }
    parts.forEach(function (p, i) {
      var c = COULEURS[i % COULEURS.length];
      var s = el('button', 'barre-part');
      s.type = 'button';
      s.style.flex = p.val;
      s.style.background = c;
      s.title = p.nom + ' ' + fr(p.val, p.val % 1 ? 1 : 0) + ' %';
      s.addEventListener('click', function () { choisir(i); });
      piste.appendChild(s);
      var l = el('button', 'barre-cle', '<i style="background:' + c + '"></i>' + p.nom + ' <b>' + fr(p.val, p.val % 1 ? 1 : 0) + ' %</b>');
      l.type = 'button';
      l.addEventListener('click', function () { choisir(i); });
      legende.appendChild(l);
    });
    div.appendChild(piste);
    div.appendChild(legende);
    div.appendChild(info);
  }

  // ---------- Calculatrices ----------
  function champs(def) {
    return '<div class="calc-champs">' + def.map(function (d) {
      return '<label><span>' + d[1] + '</span><input inputmode="decimal" name="' + d[0] + '" value="' + d[2] + '"></label>';
    }).join('') + '</div>';
  }
  function calculatrice(div, titre, def, calcul) {
    div.className = 'calc';
    div.innerHTML = '<div class="calc-titre">' + titre + '</div>' + champs(def) + '<div class="calc-res"></div>';
    var res = div.querySelector('.calc-res');
    function maj() {
      var v = {};
      Array.prototype.forEach.call(div.querySelectorAll('input'), function (i) { v[i.name] = nombre(i.value); });
      res.innerHTML = calcul(v);
    }
    div.addEventListener('input', maj);
    maj();
  }
  function ligne(lib, calc, val, fort) {
    return '<tr' + (fort ? ' class="fort"' : '') + '><td>' + lib + '</td><td>' + calc + '</td><td>' + val + '</td></tr>';
  }
  function tableau(lignes) {
    return '<div class="table-wrap"><table class="calc-table"><tr><th>Étape</th><th>Calcul</th><th>Résultat</th></tr>' + lignes.join('') + '</table></div>';
  }

  var CALCS = {
    elasticite: function (div) {
      calculatrice(div, 'Calculatrice : élasticité-prix',
        [['p0', 'Prix avant (€)', '10'], ['p1', 'Prix après (€)', '10,5'], ['d0', 'Ventes avant', '1000'], ['d1', 'Ventes après', '850']],
        function (v) {
          var vp = (v.p1 - v.p0) / v.p0 * 100, vd = (v.d1 - v.d0) / v.d0 * 100, e = Math.abs(vd / vp);
          var verdict = !isFinite(e) ? 'Entre des valeurs valides (le prix doit changer).'
            : Math.abs(e - 1) < 0.005 ? 'E = 1 : la demande varie autant que le prix.'
            : e > 1 ? 'E > 1 : demande <b>très élastique</b>, les clients réagissent fort au prix.'
            : 'E < 1 : demande <b>peu élastique</b>, les clients réagissent peu au prix.';
          return tableau([
            ligne('% variation du prix', '(' + fr(v.p1) + ' − ' + fr(v.p0) + ') ÷ ' + fr(v.p0), fr(vp) + ' %'),
            ligne('% variation de la demande', '(' + fr(v.d1, 0) + ' − ' + fr(v.d0, 0) + ') ÷ ' + fr(v.d0, 0), fr(vd) + ' %'),
            ligne('Élasticité', '|' + fr(vd) + ' ÷ ' + fr(vp) + '|', fr(e), true)
          ]) + '<div class="calc-jauge">' + jauge(e) + '<p class="calc-verdict">' + verdict + '</p></div>';
        });
    },
    paie: function (div) {
      calculatrice(div, 'Calculatrice : paie de la semaine',
        [['taux', 'Taux horaire brut (€)', '12'], ['h', 'Heures travaillées', '46'], ['ca', 'CA réalisé (€)', '2000'],
         ['com', 'Commission (%)', '2'], ['prime', 'Prime (€)', '0'], ['cs', 'Cotisations salariales (%)', '22'], ['cp', 'Cotisations patronales (%)', '42']],
        function (v) {
          var n = Math.min(v.h, 35), h25 = Math.max(0, Math.min(v.h, 43) - 35), h50 = Math.max(0, v.h - 43);
          var bn = n * v.taux, b25 = h25 * v.taux * 1.25, b50 = h50 * v.taux * 1.5, com = v.ca * v.com / 100;
          var brut = bn + b25 + b50 + com + (v.prime || 0);
          var l = [ligne('Heures normales', fr(n, 0) + ' h × ' + fr(v.taux), fr(bn) + ' €')];
          if (h25) l.push(ligne('Heures sup à +25 %', fr(h25, 0) + ' h × ' + fr(v.taux) + ' × 1,25', fr(b25) + ' €'));
          if (h50) l.push(ligne('Heures sup à +50 %', fr(h50, 0) + ' h × ' + fr(v.taux) + ' × 1,5', fr(b50) + ' €'));
          if (com) l.push(ligne('Commission', fr(v.ca, 0) + ' × ' + fr(v.com, 1) + ' %', fr(com) + ' €'));
          if (v.prime) l.push(ligne('Prime', '', fr(v.prime) + ' €'));
          l.push(ligne('Salaire brut', 'somme', fr(brut) + ' €', true));
          l.push(ligne('Salaire net', fr(brut) + ' × (1 − ' + fr(v.cs, 0) + ' %)', fr(brut * (1 - v.cs / 100)) + ' €', true));
          l.push(ligne('Coût employeur', fr(brut) + ' × (1 + ' + fr(v.cp, 0) + ' %)', fr(brut * (1 + v.cp / 100)) + ' €', true));
          return tableau(l) + '<p class="calc-verdict">De la 36<sup>e</sup> à la 43<sup>e</sup> heure : +25 %. À partir de la 44<sup>e</sup> : +50 %.</p>';
        });
    },
    marge: function (div) {
      calculatrice(div, 'Calculatrice : marge et coefficient',
        [['pa', 'Coût d’achat HT (€)', '40'], ['pv', 'Prix de vente HT (€)', '60'], ['tva', 'TVA (%)', '20']],
        function (v) {
          var m = v.pv - v.pa, ttc = v.pv * (1 + v.tva / 100);
          return tableau([
            ligne('Marge', fr(v.pv) + ' − ' + fr(v.pa), fr(m) + ' €'),
            ligne('Taux de marge', fr(m) + ' ÷ ' + fr(v.pa) + ' × 100', fr(m / v.pa * 100) + ' %', true),
            ligne('Taux de marque', fr(m) + ' ÷ ' + fr(v.pv) + ' × 100', fr(m / v.pv * 100) + ' %', true),
            ligne('Prix de vente TTC', fr(v.pv) + ' × (1 + ' + fr(v.tva, 1) + ' %)', fr(ttc) + ' €'),
            ligne('Coefficient multiplicateur', fr(ttc) + ' ÷ ' + fr(v.pa), fr(ttc / v.pa), true)
          ]) + '<p class="calc-verdict">Taux de marge : on divise par le <b>coût d’achat</b>. Taux de marque : par le <b>prix de vente</b>.</p>';
        });
    },
    scoring: function (div) {
      var crit = [['Qualité', 2], ['Prix', 2], ['Délais', 1], ['Service', 1]];
      var four = [['A', [4, 3, 5, 2]], ['B', [3, 5, 2, 4]], ['C', [5, 4, 3, 3]]];
      div.className = 'calc';
      div.innerHTML = '<div class="calc-titre">Calculatrice : scoring fournisseurs</div>' +
        '<p class="calc-aide">Change les coefficients et les notes (sur 5) : le total se recalcule.</p>' +
        '<div class="table-wrap"><table class="calc-table scoring"><tr><th>Critère</th><th>Coef.</th>' +
        four.map(function (f) { return '<th>' + f[0] + '</th>'; }).join('') + '</tr>' +
        crit.map(function (c, i) {
          return '<tr><td>' + c[0] + '</td><td><input inputmode="decimal" data-coef="' + i + '" value="' + c[1] + '"></td>' +
            four.map(function (f, j) { return '<td><input inputmode="decimal" data-n="' + i + '-' + j + '" value="' + f[1][i] + '"></td>'; }).join('') + '</tr>';
        }).join('') +
        '<tr class="fort"><td>Total pondéré</td><td></td>' + four.map(function (f, j) { return '<td data-t="' + j + '"></td>'; }).join('') + '</tr>' +
        '</table></div><p class="calc-verdict"></p>';
      function maj() {
        var tot = four.map(function (f, j) {
          return crit.reduce(function (s, c, i) {
            return s + (nombre(div.querySelector('[data-coef="' + i + '"]').value) || 0) * (nombre(div.querySelector('[data-n="' + i + '-' + j + '"]').value) || 0);
          }, 0);
        });
        var max = Math.max.apply(null, tot);
        tot.forEach(function (t, j) {
          var c = div.querySelector('[data-t="' + j + '"]');
          c.textContent = fr(t, t % 1 ? 1 : 0);
          c.classList.toggle('gagnant', t === max);
        });
        var g = four.filter(function (f, j) { return tot[j] === max; }).map(function (f) { return f[0]; });
        div.querySelector('.calc-verdict').innerHTML = g.length > 1
          ? 'Égalité entre ' + g.join(' et ') + ' : il faut un critère pour les départager.'
          : 'On retient le fournisseur <b>' + g[0] + '</b> (' + fr(max, max % 1 ? 1 : 0) + ' points).';
      }
      div.addEventListener('input', maj);
      maj();
    }
  };

  // ---------- QCM ----------
  // banque : [énoncé, [bonne, fausse…], explication]. Tire n questions au hasard et mélange les réponses,
  // à chaque affichage et à chaque clic sur « Nouveau QCM ».
  function melanger(t) {
    t = t.slice();
    for (var i = t.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), x = t[i];
      t[i] = t[j]; t[j] = x;
    }
    return t;
  }
  var BRAVO = ['Bonne réponse !', 'Exact !', 'Bien vu !', 'Dans le mille !', 'Parfait !', 'Yes !'];
  var RATE = ['Raté.', 'Pas tout à fait.', 'Presque…', 'Non, mais tu vas la retenir.'];
  function auHasard(t) { return t[Math.floor(Math.random() * t.length)]; }

  // banque : [{ id, q: [énoncé, [bonne, fausses…], explication] }] (voir Jeu.questionsDe).
  // cle : identifiant du QCM pour garder le meilleur score (ex. « fiche:repo »).
  function qcm(div, banque, n, cle) {
    var J = typeof Jeu !== 'undefined' ? Jeu : null;
    function tirer() {
      var items = melanger(banque).slice(0, Math.min(n, banque.length));
      var faites = 0, bonnes = 0;
      div.className = 'qcm';
      div.innerHTML =
        '<div class="qcm-tete"><span class="qcm-titre">QCM · ' + items.length + ' questions</span>' +
        '<span class="qcm-score" aria-live="polite"></span>' +
        '<button type="button" class="qcm-nouveau">↻ Nouveau QCM</button></div>' +
        items.map(function (it, i) {
          var q = it.q;
          var reps = melanger(q[1].map(function (r, k) { return { txt: r, ok: k === 0 }; }));
          return '<fieldset class="qcm-q" data-id="' + it.id + '"><legend><span class="num">' + (i + 1) + '.</span> ' + q[0] + '</legend>' +
            '<div class="qcm-reps">' + reps.map(function (r, k) {
              return '<button type="button" data-ok="' + (r.ok ? 1 : 0) + '"><span class="qcm-lettre">' + 'ABCD'[k] + '</span>' + r.txt + '</button>';
            }).join('') + '</div>' +
            '<p class="qcm-expl" hidden>' + (q[2] || '') + '</p></fieldset>';
        }).join('') +
        '<div class="qcm-fin" hidden></div>';

      Array.prototype.forEach.call(div.querySelectorAll('.qcm-q'), function (fs) {
        fs.addEventListener('click', function (e) {
          var b = e.target.closest('button[data-ok]');
          if (!b || fs.classList.contains('repondue')) return;
          fs.classList.add('repondue');
          var juste = b.dataset.ok === '1';
          b.classList.add(juste ? 'bonne' : 'fausse');
          Array.prototype.forEach.call(fs.querySelectorAll('button[data-ok]'), function (x) {
            x.disabled = true;
            if (x.dataset.ok === '1') x.classList.add('bonne');
          });
          var ex = fs.querySelector('.qcm-expl');
          ex.innerHTML = '<b>' + auHasard(juste ? BRAVO : RATE) + '</b> ' + ex.innerHTML;
          ex.hidden = false;
          faites++;
          if (juste) bonnes++;
          var serie = J ? J.reponse(juste, false, fs.dataset.id) : 0;
          div.querySelector('.qcm-score').innerHTML = bonnes + ' / ' + faites + (serie >= 2 ? ' <span class="qcm-serie">🔥 ' + serie + '</span>' : '');
          if (faites === items.length) {
            var fin = div.querySelector('.qcm-fin'), r = bonnes / items.length;
            fin.innerHTML = '<b>' + bonnes + ' / ' + items.length + '</b> · ' +
              (r === 1 ? '★★★ Parfait, tout est su !' : r >= 0.8 ? '★★ Bien joué, presque parfait.' : r >= 0.6 ? '★ C’est en bonne voie, retente pour les étoiles.' : 'Relis la fiche, puis relance un QCM.') +
              ' <button type="button" class="qcm-nouveau">↻ Nouveau QCM</button>';
            fin.hidden = false;
            if (J && cle) J.qcmFini(cle, bonnes, items.length);
          }
        });
      });
    }
    // Un seul écouteur pour les deux boutons « Nouveau QCM » (en haut et dans le bilan, créé après coup).
    div.addEventListener('click', function (e) {
      if (!e.target.closest('.qcm-nouveau')) return;
      tirer();
      div.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    tirer();
  }

  function activer(root) {
    Array.prototype.forEach.call(root.querySelectorAll('ol.etapes'), etapes);
    Array.prototype.forEach.call(root.querySelectorAll('ol.pyramide'), pyramide);
    Array.prototype.forEach.call(root.querySelectorAll('div.cartes'), cartes);
    Array.prototype.forEach.call(root.querySelectorAll('div.barre'), barre);
    Array.prototype.forEach.call(root.querySelectorAll('[data-calc]'), function (d) {
      if (CALCS[d.dataset.calc]) CALCS[d.dataset.calc](d);
    });
  }

  return { activer: activer, qcm: qcm };
})();
