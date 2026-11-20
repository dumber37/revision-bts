// Composants interactifs des fiches. Le HTML des fiches reste lisible sans eux (impression, recherche).
//   <ol class="etapes"><li><b>Titre</b><p>Détail</p></li>…</ol>         étapes cliquables
//   <ol class="pyramide"><li><b>Haut</b><p>…</p></li>…</ol>             pyramide cliquable (du haut vers le bas)
//   <div class="cartes"><div><b>Recto</b><p>Verso</p></div>…</div>     cartes à retourner
//   <div class="barre" data-parts="Libellé|valeur|détail;…"></div>     barre de répartition
//   <div data-calc="elasticite|paie|marge|prixvente|wilson|rotation|action|scoring"></div>  calculatrices
//   <div data-anim="stock|wilson|pareto|zones|entonnoir"></div>         schémas animés (joués à l'apparition)
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
  // Valeurs de départ propres à une page : data-valeurs="p0=9,99;p1=7,99" et titre : data-titre="…".
  function calculatrice(div, titre, def, calcul) {
    var perso = {};
    (div.dataset.valeurs || '').split(';').forEach(function (x) { var p = x.split('='); if (p[1] != null) perso[p[0].trim()] = p[1].trim(); });
    def = def.map(function (d) { return perso[d[0]] != null ? [d[0], d[1], perso[d[0]]] : d; });
    if (div.dataset.titre) titre = div.dataset.titre;
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
    // Fixer un prix à partir d'un taux : le piège marque / marge.
    prixvente: function (div) {
      calculatrice(div, 'Calculatrice : fixer un prix de vente',
        [['pa', 'Coût d’achat HT (€)', '32'], ['t', 'Taux voulu (%)', '36'], ['tva', 'TVA (%)', '20']],
        function (v) {
          var t = v.t / 100, pvMarque = v.pa / (1 - t), pvMarge = v.pa * (1 + t);
          return tableau([
            ligne('Avec un taux de <b>marque</b>', fr(v.pa) + ' ÷ (1 − ' + fr(t) + ')', fr(pvMarque) + ' € HT', true),
            ligne('Prix TTC', fr(pvMarque) + ' × (1 + ' + fr(v.tva, 1) + ' %)', fr(pvMarque * (1 + v.tva / 100)) + ' €'),
            ligne('Avec un taux de <b>marge</b>', fr(v.pa) + ' × (1 + ' + fr(t) + ')', fr(pvMarge) + ' € HT', true),
            ligne('Écart par article', fr(pvMarque) + ' − ' + fr(pvMarge), fr(pvMarque - pvMarge) + ' €')
          ]) + '<p class="calc-verdict">Le taux de marque se calcule sur le prix de vente : le coût d’achat en représente donc (1 − taux).</p>';
        });
    },
    // Modèle de Wilson : N = √(C × PU × T ÷ 2P), Q = C ÷ N, avec les deux entiers voisins.
    wilson: function (div) {
      calculatrice(div, 'Calculatrice : modèle de Wilson',
        [['c', 'Consommation annuelle (unités)', '3600'], ['pu', 'Coût d’achat unitaire (€)', '5'], ['t', 'Taux de possession (%)', '20'], ['p', 'Coût de passation (€)', '18']],
        function (v) {
          var t = v.t / 100, num = v.c * v.pu * t, n = Math.sqrt(num / (2 * v.p));
          function cout(k) { return { k: k, q: v.c / k, pos: v.c / k / 2 * v.pu * t, pas: k * v.p }; }
          var l = [
            ligne('C × PU × T', fr(v.c, 0) + ' × ' + fr(v.pu) + ' × ' + fr(t), fr(num)),
            ligne('2 × P', '2 × ' + fr(v.p), fr(2 * v.p)),
            ligne('N', '√(' + fr(num) + ' ÷ ' + fr(2 * v.p) + ')', fr(n) + ' commandes', true)
          ];
          if (!isFinite(n) || n <= 0) return tableau(l);
          var entier = Math.abs(n - Math.round(n)) < 1e-9, choix = entier ? [Math.round(n)] : [Math.floor(n), Math.ceil(n)].filter(function (k) { return k > 0; });
          var res = choix.map(cout);
          res.forEach(function (r) {
            l.push(ligne('Pour ' + r.k + ' commande' + (r.k > 1 ? 's' : '') + ' : Q = ' + fr(r.q, r.q % 1 ? 2 : 0),
              'possession ' + fr(r.pos) + ' + passation ' + fr(r.pas), fr(r.pos + r.pas) + ' €', true));
          });
          var verdict = entier
            ? 'Résultat entier : à l’optimum, possession = passation (' + fr(res[0].pos) + ' €).'
            : 'N n’est pas entier. Règle d’examen : arrondir à l’entier supérieur (' + Math.ceil(n) + '), sauf consigne contraire. En entreprise, on garde le coût total le plus bas.';
          return tableau(l) + '<p class="calc-verdict">' + verdict + '</p>';
        });
    },
    // Évaluer une action commerciale : semaine de référence contre semaine de l'opération.
    action: function (div) {
      calculatrice(div, 'Calculatrice : évaluer une action commerciale',
        [['v0', 'Visiteurs, référence', '900'], ['t0', 'Tickets, référence', '180'], ['ca0', 'CA HT, référence (€)', '10800'],
         ['v1', 'Visiteurs, opération', '1300'], ['t1', 'Tickets, opération', '312'], ['ca1', 'CA HT, opération (€)', '21840'],
         ['tm', 'Taux de marque (%)', '40'], ['cout', 'Coût de l’opération (€)', '1500']],
        function (v) {
          var tr0 = v.t0 / v.v0 * 100, tr1 = v.t1 / v.v1 * 100, pm0 = v.ca0 / v.t0, pm1 = v.ca1 / v.t1;
          var dca = v.ca1 - v.ca0, marge = dca * v.tm / 100, res = marge - v.cout;
          return tableau([
            ligne('Taux de transformation', fr(v.t0, 0) + ' ÷ ' + fr(v.v0, 0) + ' → ' + fr(v.t1, 0) + ' ÷ ' + fr(v.v1, 0), fr(tr0, 1) + ' % → ' + fr(tr1, 1) + ' %', true),
            ligne('Panier moyen', fr(v.ca0, 0) + ' ÷ ' + fr(v.t0, 0) + ' → ' + fr(v.ca1, 0) + ' ÷ ' + fr(v.t1, 0), fr(pm0) + ' € → ' + fr(pm1) + ' €', true),
            ligne('Évolution du CA', fr(dca, 0) + ' ÷ ' + fr(v.ca0, 0), (dca >= 0 ? '+' : '') + fr(dca / v.ca0 * 100, 1) + ' %'),
            ligne('Marge supplémentaire', fr(dca, 0) + ' × ' + fr(v.tm, 0) + ' %', fr(marge) + ' €'),
            ligne('Résultat de l’opération', fr(marge) + ' − ' + fr(v.cout), fr(res) + ' €', true)
          ]) + '<p class="calc-verdict">' + (res >= 0 ? 'L’opération est <b>rentable</b> : la marge gagnée couvre son coût.' : 'L’opération <b>n’est pas rentable</b> : elle coûte plus que la marge gagnée.') + '</p>';
        });
    },
    // Indicateurs de stock : stock moyen, rotation, durée moyenne de stockage.
    rotation: function (div) {
      calculatrice(div, 'Calculatrice : indicateurs de stock',
        [['si', 'Stock en début de période', '200'], ['sf', 'Stock en fin de période', '160'], ['v', 'Quantité vendue', '3600'], ['j', 'Jours de la période', '360']],
        function (v) {
          var sm = (v.si + v.sf) / 2, r = v.v / sm, d = sm / v.v * v.j;
          return tableau([
            ligne('Stock moyen', '(' + fr(v.si, 0) + ' + ' + fr(v.sf, 0) + ') ÷ 2', fr(sm, sm % 1 ? 1 : 0), true),
            ligne('Ratio de rotation', fr(v.v, 0) + ' ÷ ' + fr(sm, sm % 1 ? 1 : 0), fr(r), true),
            ligne('Durée moyenne de stockage', '(' + fr(sm, sm % 1 ? 1 : 0) + ' ÷ ' + fr(v.v, 0) + ') × ' + fr(v.j, 0), fr(d, 1) + ' jours', true)
          ]) + '<p class="calc-verdict">Rotation à augmenter, durée à réduire… sans tomber en rupture.</p>';
        });
    },
    scoring: function (div) {
      // data-config='{"crit":[["Qualité",2],…],"four":[["A",[4,3,5,2]],…],"sur":10}' pour un autre jeu de données.
      var conf = {};
      try { conf = JSON.parse(div.dataset.config || '{}'); } catch (e) {}
      var crit = conf.crit || [['Qualité', 2], ['Prix', 2], ['Délais', 1], ['Service', 1]];
      var four = conf.four || [['A', [4, 3, 5, 2]], ['B', [3, 5, 2, 4]], ['C', [5, 4, 3, 3]]];
      div.className = 'calc';
      div.innerHTML = '<div class="calc-titre">' + (div.dataset.titre || 'Calculatrice : scoring fournisseurs') + '</div>' +
        '<p class="calc-aide">Change les coefficients et les notes (sur ' + (conf.sur || 5) + ') : le total se recalcule.</p>' +
        '<div class="table-wrap"><table class="calc-table scoring"><tr><th>Critère</th><th>Coef.</th>' +
        four.map(function (f) { return '<th>' + f[0] + '</th>'; }).join('') + '</tr>' +
        crit.map(function (c, i) {
          return '<tr><td>' + c[0] + '</td><td><input inputmode="decimal" data-coef="' + i + '" aria-label="Coefficient : ' + c[0] + '" value="' + c[1] + '"></td>' +
            four.map(function (f, j) { return '<td><input inputmode="decimal" data-n="' + i + '-' + j + '" aria-label="Note de ' + f[0] + ' : ' + c[0] + '" value="' + f[1][i] + '"></td>'; }).join('') + '</tr>';
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
  var BRAVO = ['Bonne réponse', 'Exact', 'Bien vu', 'Dans le mille', 'Parfait', 'C’est ça'];
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
          div.querySelector('.qcm-score').innerHTML = bonnes + ' / ' + faites + (serie >= 2 ? ' <span class="qcm-serie">' + Icone('flamme') + ' ' + serie + '</span>' : '');
          if (faites === items.length) {
            var fin = div.querySelector('.qcm-fin'), r = bonnes / items.length;
            fin.innerHTML = '<b>' + bonnes + ' / ' + items.length + '</b> · ' +
              (r === 1 ? '★★★ Parfait, tout est su.' : r >= 0.8 ? '★★ Bien joué, presque parfait.' : r >= 0.6 ? '★ C’est en bonne voie, retente pour les étoiles.' : 'Relis la fiche, puis relance un QCM.') +
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

  // ---------- Impression (ou « Enregistrer en PDF ») ----------
  // On imprime le HTML d'origine (pas les composants interactifs) dans un bloc à part, mis en page pour le papier.
  function imprimer(titre, sousTitre, html) {
    var d = document.getElementById('impression');
    if (!d) { d = el('div'); d.id = 'impression'; document.body.appendChild(d); }
    d.innerHTML = '<header class="imp-tete"><span>Révisions BTS MCO</span>' + (sousTitre ? '<span>' + sousTitre + '</span>' : '') + '</header><h1>' + titre + '</h1>' + html;
    Array.prototype.forEach.call(d.querySelectorAll('[data-calc], script, button'), function (x) { x.remove(); });
    Array.prototype.forEach.call(d.querySelectorAll('[data-anim]'), function (x) { anim(x, true); }); // schéma fixe, dans son état final
    Array.prototype.forEach.call(d.querySelectorAll('details'), function (x) { x.open = true; });
    // La barre de répartition devient une liste lisible sur papier.
    Array.prototype.forEach.call(d.querySelectorAll('div.barre'), function (b) {
      b.outerHTML = '<ul>' + b.dataset.parts.split(';').map(function (s) {
        var p = s.split('|');
        return '<li><b>' + p[0] + ' : ' + p[1] + ' %</b>' + (p[2] ? ' · ' + p[2] : '') + '</li>';
      }).join('') + '</ul>';
    });
    document.body.classList.add('imprime');
    function fin() { document.body.classList.remove('imprime'); window.removeEventListener('afterprint', fin); }
    window.addEventListener('afterprint', fin);
    window.print();
  }

  // ---------- Schémas animés ----------
  // Chaque schéma est un SVG dont l'état « au repos » est l'état final (lisible à l'impression et sans animation).
  // Les animations ne jouent qu'avec la classe .joue, ajoutée quand le schéma entre à l'écran.
  // Classes d'animation (style.css) : a-trace (trait qui se dessine, pathLength="1"), a-fondu, a-pop, a-monte (barre qui pousse vers le haut),
  // a-large (barre qui s'élargit depuis le centre). Délai : style="--d:1.2s", durée : --t.
  function d(s) { return ' style="--d:' + s + 's"'; }
  function txt(x, y, t, cls, extra) { return '<text x="' + x + '" y="' + y + '" class="' + (cls || '') + '"' + (extra || '') + '>' + t + '</text>'; }
  function pts(l) { return l.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join(' L'); }

  var ANIMS = {
    // Stock en dents de scie : le stock baisse, la commande part au stock d'alerte, la livraison arrive au stock de sécurité.
    stock: {
      legende: 'Le stock baisse avec les ventes. Au <b>stock d’alerte</b>, on commande ; pendant le délai de livraison, on puise dans le stock minimum ; la livraison arrive quand il ne reste que le <b>stock de sécurité</b>.',
      svg: function () {
        var cmd = [[96.8, .64], [186.8, 2.38], [276.8, 4.13]], liv = [[130, 1.01], [220, 2.76]];
        return '<svg viewBox="0 0 340 200" role="img" aria-label="Courbe du stock en dents de scie avec stock d’alerte et stock de sécurité">' +
          '<path class="axe" d="M40 18 V165 H325"/>' + txt(44, 14, 'Stock', 'petit') + txt(325, 182, 'Temps', 'petit', ' text-anchor="end"') +
          '<path class="seuil alerte" d="M40 100 H325"/>' + txt(322, 90, 'Stock d’alerte', 'petit or', ' text-anchor="end"') +
          '<path class="seuil secu" d="M40 135 H325"/>' + txt(322, 150, 'Stock de sécurité', 'petit', ' text-anchor="end"') +
          '<path class="courbe a-trace" pathLength="1" style="--t:4.5s" d="M40 40 L130 135 L130 40 L220 135 L220 40 L310 135"/>' +
          cmd.map(function (c, i) { return '<circle class="point or a-pop" cx="' + c[0] + '" cy="100" r="5"' + d(c[1]) + '/>' + (i === 0 ? txt(c[0] - 4, 88, 'commande', 'petit or a-fondu', ' text-anchor="end"' + d(c[1])) : ''); }).join('') +
          liv.map(function (l, i) { return '<path class="fleche a-fondu" d="M' + l[0] + ' 128 V50 m-5 7 l5 -7 l5 7"' + d(l[1]) + '/>' + (i === 0 ? txt(l[0] + 6, 60, 'livraison', 'petit a-fondu', d(l[1])) : ''); }).join('') +
          '<path class="accolade a-fondu" d="M97 110 V116 H130 V110"' + d(1.1) + '/>' + txt(113, 127, 'délai', 'petit a-fondu', ' text-anchor="middle"' + d(1.1)) +
          '</svg>';
      }
    },
    // Courbe en U du modèle de Wilson (café de l'Épicerie des Halles).
    wilson: {
      legende: 'Café : quand on commande plus souvent, le <b>coût de passation</b> monte et le <b>coût de possession</b> baisse. Le <b>coût total</b> est au plus bas là où les deux se croisent : 10 commandes, 360 €.',
      svg: function () {
        function X(n) { return 40 + (n - 3) / 27 * 280; }
        function Y(c) { return 165 - c / 700 * 145; }
        var pos = [], pas = [], tot = [];
        for (var n = 3; n <= 30.001; n += 0.5) { pos.push([X(n), Y(1800 / n)]); pas.push([X(n), Y(18 * n)]); tot.push([X(n), Y(1800 / n + 18 * n)]); }
        return '<svg viewBox="0 0 340 200" role="img" aria-label="Courbe en U du coût total, minimum à 10 commandes">' +
          '<path class="axe" d="M40 15 V165 H325"/>' + txt(44, 12, 'Coût (€)', 'petit') + txt(325, 194, 'Commandes par an', 'petit', ' text-anchor="end"') +
          [5, 10, 20, 30].map(function (k) { return txt(X(k), 178, k, 'petit', ' text-anchor="middle"'); }).join('') +
          '<path class="courbe douce a-trace" pathLength="1" style="--t:1.3s" d="M' + pts(pos) + '"/>' + txt(X(13), 152, 'possession', 'petit a-fondu', d(1.2)) +
          '<path class="courbe douce2 a-trace" pathLength="1" style="--t:1.3s;--d:1.4s" d="M' + pts(pas) + '"/>' + txt(X(30), Y(540) + 16, 'passation', 'petit or a-fondu', ' text-anchor="end"' + d(2.6)) +
          '<path class="courbe a-trace" pathLength="1" style="--t:1.6s;--d:2.8s" d="M' + pts(tot) + '"/>' + txt(X(22), Y(1800 / 22 + 396) - 10, 'coût total', 'petit fort a-fondu', ' text-anchor="middle"' + d(4.3)) +
          '<path class="seuil a-fondu" d="M' + X(10) + ' ' + Y(360) + ' V165"' + d(4.4) + '/>' +
          '<circle class="point or a-pop" cx="' + X(10) + '" cy="' + Y(360) + '" r="6"' + d(4.4) + '/>' +
          txt(X(10) + 10, Y(360) + 22, 'N = 10 · 360 €', 'petit fort a-fondu', d(4.6)) +
          txt(X(10) + 10, Y(360) + 35, '180 € + 180 €', 'petit a-fondu', d(4.8)) +
          '</svg>';
      }
    },
    // Méthode des 20/80 sur le rayon thés.
    pareto: {
      legende: 'Rayon thés : les références sont classées par CA décroissant. La courbe du <b>cumul</b> atteint <b>80 %</b> dès la 2<sup>e</sup> référence : 20 % de l’assortiment fait 80 % des ventes.',
      svg: function () {
        var data = [['Earl Grey', 45], ['Menthe', 35], ['Darjeeling', 5], ['Rooibos', 4], ['Blanc', 3], ['5 autres', 8]], cum = 0, ligne = [];
        function Y(p) { return 165 - p * 1.4; }
        var barres = data.map(function (b, i) {
          var x = 50 + i * 46, h = b[1] * 1.4;
          cum += b[1]; ligne.push([x + 18, Y(cum)]);
          return '<rect class="barre-svg a-monte' + (i < 2 ? ' fort' : '') + '" x="' + x + '" y="' + (165 - h) + '" width="36" height="' + h + '"' + d(i * .15) + '/>' +
            (h > 30 ? txt(x + 18, 182 - h, b[1] + ' %', 'blanc a-fondu', ' text-anchor="middle"' + d(.4 + i * .15)) : txt(x + 18, 160 - h, b[1] + ' %', 'petit a-fondu', ' text-anchor="middle"' + d(.4 + i * .15))) +
            txt(x + 18, 179, b[0], 'mini', ' text-anchor="middle"');
        }).join('');
        return '<svg viewBox="0 0 340 200" role="img" aria-label="Diagramme de Pareto du rayon thés">' +
          '<path class="axe" d="M40 20 V165 H325"/>' +
          '<path class="seuil alerte a-fondu" d="M40 ' + Y(80) + ' H325"' + d(1.1) + '/>' + txt(325, Y(80) - 5, '80 %', 'petit or a-fondu', ' text-anchor="end"' + d(1.1)) +
          barres +
          '<path class="courbe a-trace" pathLength="1" style="--t:1.4s;--d:1.2s" d="M' + pts(ligne) + '"/>' +
          ligne.map(function (p, i) { return '<circle class="point' + (i === 1 ? ' or' : '') + ' a-pop" cx="' + p[0] + '" cy="' + p[1] + '" r="' + (i === 1 ? 5 : 3) + '"' + d(1.3 + i * .22) + '/>'; }).join('') +
          txt(ligne[1][0] + 8, ligne[1][1] + 16, 'cumul 80 %', 'petit fort a-fondu', d(1.8)) +
          '</svg>';
      }
    },
    // Plan d'un magasin : zones chaudes, zones froides et circuit du client.
    zones: {
      legende: 'Le client entre, longe le magasin et finit aux caisses. Les <b>zones chaudes</b> (entrée, caisses, têtes de gondole) sont vues par tous ; les <b>zones froides</b> (fond, angles) doivent être « réchauffées ».',
      svg: function () {
        return '<svg viewBox="0 0 340 215" role="img" aria-label="Plan de magasin avec zones chaudes, zones froides et circuit client">' +
          '<rect class="zone froide a-fondu" x="22" y="22" width="70" height="50" rx="6"' + d(.2) + '/>' + txt(57, 51, 'zone froide', 'mini', ' text-anchor="middle"') +
          '<rect class="zone froide a-fondu" x="248" y="22" width="70" height="50" rx="6"' + d(.3) + '/>' + txt(283, 51, 'zone froide', 'mini', ' text-anchor="middle"') +
          '<rect class="zone chaude a-pulse" x="150" y="150" width="168" height="38" rx="6"' + d(.5) + '/>' +
          '<rect class="mur" x="20" y="20" width="300" height="170" rx="4"/>' +
          '<path class="porte" d="M262 190 H306"/>' + txt(284, 205, 'Entrée', 'petit', ' text-anchor="middle"') +
          [100, 155, 210].map(function (x) { return '<rect class="gondole" x="' + x + '" y="72" width="26" height="58" rx="2"/><rect class="tete a-pop" x="' + (x - 2) + '" y="130" width="30" height="9" rx="2"' + d(.7 + (x - 100) / 300) + '/>'; }).join('') +
          txt(169, 152, 'têtes de gondole', 'mini', ' text-anchor="middle"') +
          '<rect class="caisse" x="170" y="168" width="22" height="12" rx="2"/><rect class="caisse" x="200" y="168" width="22" height="12" rx="2"/>' + txt(196, 165, 'caisses', 'mini', ' text-anchor="middle"') +
          '<path class="circuit a-trace" pathLength="1" style="--t:4s;--d:.9s" d="M284 196 V150 H300 V40 H40 V150 H150 L196 166"/>' +
          '<circle class="client a-client" r="6"/>' +
          '<rect class="leg chaude" x="30" y="198" width="12" height="9" rx="2"/>' + txt(46, 206, 'zone chaude', 'mini') +
          '<rect class="leg froide" x="110" y="198" width="12" height="9" rx="2"/>' + txt(126, 206, 'zone froide', 'mini') +
          '</svg>';
      }
    },
    // Entonnoir : des visiteurs aux acheteurs, puis au panier moyen (Semaine du trail).
    entonnoir: {
      legende: 'Semaine du trail : sur 1 300 visiteurs, 312 achètent (<b>taux de transformation</b> 24 %) et dépensent en moyenne 70 € (<b>panier moyen</b>).',
      svg: function () {
        var w2 = 280 * 312 / 1300;
        return '<svg viewBox="0 0 340 200" role="img" aria-label="Entonnoir des visiteurs aux acheteurs">' +
          '<rect class="barre-svg a-large" x="30" y="20" width="280" height="34" rx="4"/>' + txt(170, 42, '1 300 visiteurs', 'fort', ' text-anchor="middle"') +
          '<path class="entonnoir a-fondu" d="M30 54 L' + (170 - w2 / 2) + ' 92 H' + (170 + w2 / 2) + ' L310 54 Z"' + d(.6) + '/>' +
          '<rect class="barre-svg fort a-large" x="' + (170 - w2 / 2) + '" y="92" width="' + w2 + '" height="34" rx="4"' + d(.9) + '/>' +
          txt(170, 114, '312', 'blanc fort', ' text-anchor="middle"') +
          txt(170 + w2 / 2 + 10, 106, 'acheteurs', 'petit a-fondu', d(1.1)) + txt(170 + w2 / 2 + 10, 120, '312 ÷ 1 300 = 24 %', 'petit or a-fondu', d(1.3)) +
          txt(170, 152, '21 840 € ÷ 312 tickets', 'petit a-fondu', ' text-anchor="middle"' + d(1.7)) +
          txt(170, 176, 'panier moyen : 70 €', 'grand a-pop', ' text-anchor="middle"' + d(2)) +
          '</svg>';
      }
    }
  };

  // Joue un schéma quand il devient visible (une fois), ou tout de suite si l'observateur n'existe pas.
  var vu = typeof IntersectionObserver !== 'undefined' ? new IntersectionObserver(function (entrees) {
    entrees.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.remove('anim-attente');
      e.target.classList.add('joue');
      vu.unobserve(e.target);
    });
  }, { threshold: 0.35 }) : null;

  function anim(div, statique) {
    var a = ANIMS[div.dataset.anim];
    if (!a) return;
    div.className = 'anim';
    div.innerHTML = a.svg() + '<p class="anim-legende">' + a.legende + '</p>' +
      (statique ? '' : '<button type="button" class="anim-rejouer">↻ Rejouer</button>');
    if (statique) return;
    div.querySelector('.anim-rejouer').addEventListener('click', function () {
      div.classList.remove('joue');
      void div.offsetWidth;
      div.classList.add('joue');
    });
    if (vu) { div.classList.add('anim-attente', 'joue'); vu.observe(div); } else div.classList.add('joue');
  }

  // ---------- Petites scènes animées des en-têtes de matière ----------
  var SCENES = {
    drcv: '<rect class="sc-bulle" x="6" y="12" width="58" height="30" rx="10"/><path class="sc-bulle" d="M18 41 l-4 10 l12 -9z"/>' +
      '<circle class="sc-point s1" cx="23" cy="27" r="3.5"/><circle class="sc-point s2" cx="35" cy="27" r="3.5"/><circle class="sc-point s3" cx="47" cy="27" r="3.5"/>' +
      '<rect class="sc-bulle2 sc-pop" x="60" y="40" width="54" height="30" rx="10"/><path class="sc-bulle2 sc-pop" d="M100 69 l6 9 l-14 -8z"/><path class="sc-coche sc-pop" d="M76 55 l6 6 l12 -12"/>',
    adoc: '<path class="sc-trait" d="M10 70 H110 M10 44 H110"/>' +
      '<rect class="sc-produit sc-tombe t1" x="18" y="50" width="16" height="20" rx="2"/><rect class="sc-produit2 sc-tombe t2" x="40" y="54" width="14" height="16" rx="2"/><rect class="sc-produit sc-tombe t3" x="60" y="48" width="16" height="22" rx="2"/>' +
      '<rect class="sc-produit2 sc-tombe t2" x="24" y="26" width="14" height="18" rx="2"/><rect class="sc-produit sc-tombe t3" x="46" y="30" width="20" height="14" rx="2"/>' +
      '<g class="sc-etiquette"><path class="sc-fil" d="M95 8 V20"/><path class="sc-tag" d="M84 20 H106 V40 L95 48 L84 40 Z"/><text x="95" y="35" text-anchor="middle">%</text></g>',
    management: '<rect class="sc-barre b1" x="14" y="44" width="16" height="26" rx="2"/><rect class="sc-barre b2" x="52" y="30" width="16" height="40" rx="2"/><rect class="sc-barre b3" x="90" y="16" width="16" height="54" rx="2"/>' +
      '<circle class="sc-tete" cx="22" cy="34" r="6"/><circle class="sc-tete" cx="60" cy="20" r="6"/><circle class="sc-tete" cx="98" cy="6" r="6"/>' +
      '<path class="sc-etoile sc-pop" d="M60 0 l2 4 4 .5 -3 3 1 4 -4 -2 -4 2 1 -4 -3 -3 4 -.5z" transform="translate(-2 -2)"/>',
    gestion: '<rect class="sc-produit sc-tombe t1" x="12" y="52" width="22" height="18" rx="2"/><rect class="sc-produit2 sc-tombe t2" x="36" y="52" width="22" height="18" rx="2"/><rect class="sc-produit sc-tombe t3" x="24" y="34" width="22" height="18" rx="2"/>' +
      '<path class="sc-courbe" pathLength="1" d="M66 62 L80 50 L92 56 L110 26"/><circle class="sc-fin" cx="110" cy="26" r="4"/>',
    anglais: '<rect class="sc-bulle" x="6" y="8" width="70" height="30" rx="10"/><text class="sc-mot haut m1" x="41" y="28" text-anchor="middle">Hello</text><text class="sc-mot haut m2" x="41" y="28" text-anchor="middle">Bonjour</text>' +
      '<rect class="sc-bulle2" x="44" y="44" width="70" height="28" rx="10"/><text class="sc-mot bas m1" x="79" y="63" text-anchor="middle">Deal?</text><text class="sc-mot bas m2" x="79" y="63" text-anchor="middle">Marché ?</text>'
  };
  function scene(id) {
    return SCENES[id] ? '<svg class="scene" viewBox="0 0 120 80" aria-hidden="true" focusable="false">' + SCENES[id] + '</svg>' : '';
  }

  function activer(root) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-anim]'), function (x) { anim(x); });
    Array.prototype.forEach.call(root.querySelectorAll('ol.etapes'), etapes);
    Array.prototype.forEach.call(root.querySelectorAll('ol.pyramide'), pyramide);
    Array.prototype.forEach.call(root.querySelectorAll('div.cartes'), cartes);
    Array.prototype.forEach.call(root.querySelectorAll('div.barre'), barre);
    Array.prototype.forEach.call(root.querySelectorAll('[data-calc]'), function (d) {
      if (CALCS[d.dataset.calc]) CALCS[d.dataset.calc](d);
    });
  }

  return { activer: activer, qcm: qcm, imprimer: imprimer, scene: scene };
})();
