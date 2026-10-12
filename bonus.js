// Bonus : écouter les fiches (voix naturelle, fichiers MP3), méthodologie d'examen, études de cas, défi de la semaine.
var Bonus = (function () {
  'use strict';

  var esc = Jeu.esc;
  function fil(txt, parent) {
    return '<nav class="fil"><a href="#/">Matières</a> › ' + (parent ? '<a href="' + parent[1] + '">' + esc(parent[0]) + '</a> › ' : '') + esc(txt) + '</nav>';
  }
  function mmss(s) { s = Math.max(0, Math.round(s || 0)); return Math.floor(s / 60) + ':' + ('0' + s % 60).slice(-2); }
  function fiche(id) { return R.fiches.filter(function (f) { return f.id === id; })[0]; }

  // ---------- Écouter les fiches ----------
  // Un seul lecteur pour tout le site : la lecture continue quand on change de page (mini-lecteur en bas de l'écran).

  var audio = new Audio(), liste = [], pos = -1, vitesse = 1;
  audio.preload = 'none';
  // Deux voix au choix : Siwis (par défaut, audio/<id>.mp3) et Tom (audio/tom/<id>.mp3).
  var VOIX = { siwis: { nom: 'Siwis', genre: 'voix féminine', dossier: 'audio/' }, tom: { nom: 'Tom', genre: 'voix masculine', dossier: 'audio/tom/' } };
  function voix() { var v = (Jeu.etat().reglages || {}).voix; return VOIX[v] && R.audioVoix && R.audioVoix[v] ? v : 'siwis'; }
  function durees() { return (R.audioVoix && R.audioVoix[voix()]) || R.audio || {}; }
  function aAudio(id) { return !!(R.audio && R.audio[id]); }
  function src(id) { return VOIX[voix()].dossier + id + '.mp3'; }
  function dureeFiche(id) { return durees()[id] || (R.audio || {})[id] || 0; }
  // Durée réelle si le navigateur la connaît, sinon celle enregistrée (certains serveurs ne la donnent pas).
  function duree() {
    if (isFinite(audio.duration) && audio.duration > 0) return audio.duration;
    return dureeFiche(liste[pos]);
  }
  // Change de voix ; si une fiche est en cours, elle reprend au même endroit (en proportion) avec la nouvelle voix.
  function choisirVoix(v) {
    if (!VOIX[v]) return;
    var E = Jeu.etat(), enCours = pos >= 0 && !audio.paused, ratio = duree() ? audio.currentTime / duree() : 0;
    E.reglages = E.reglages || {}; E.reglages.voix = v; Jeu.sauver();
    if (pos >= 0 && audio.src) {
      audio.preload = 'metadata'; // même en pause, il faut la durée de la nouvelle voix pour reprendre au bon endroit
      audio.src = src(liste[pos]);
      audio.addEventListener('loadedmetadata', function reprise() { audio.removeEventListener('loadedmetadata', reprise); audio.currentTime = ratio * duree(); }, { once: true });
      audio.playbackRate = vitesse;
      if (enCours) audio.play().catch(function () {});
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-voix]'), function (b) { b.classList.toggle('actif', b.dataset.voix === v); });
    majTout();
  }
  function choixVoix() {
    if (!R.audioVoix) return '';
    return '<div class="choix-voix"><span>Voix :</span>' + Object.keys(VOIX).filter(function (k) { return R.audioVoix[k]; }).map(function (k) {
      return '<button type="button" data-voix="' + k + '"' + (voix() === k ? ' class="actif"' : '') + '>' + VOIX[k].nom + ' <small>' + VOIX[k].genre + '</small></button>';
    }).join('') + '</div>';
  }
  document.addEventListener('click', function (e) { var b = e.target.closest('[data-voix]'); if (b) choisirVoix(b.dataset.voix); });

  function jouer(ids, i) {
    liste = ids; pos = i;
    var f = fiche(liste[pos]);
    if (!f) return;
    audio.src = src(f.id);
    audio.playbackRate = vitesse;
    audio.play().catch(function () {});
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({ title: f.titre, artist: 'Révisions BTS MCO', album: Activites.matiere(f.matiere).nom,
        artwork: [{ src: 'icones/icon-512.png', sizes: '512x512', type: 'image/png' }] });
      navigator.mediaSession.setActionHandler('nexttrack', pos + 1 < liste.length ? suivant : null);
      navigator.mediaSession.setActionHandler('previoustrack', pos > 0 ? function () { jouer(liste, pos - 1); } : null);
      navigator.mediaSession.setActionHandler('seekbackward', function () { audio.currentTime = Math.max(0, audio.currentTime - 15); });
      navigator.mediaSession.setActionHandler('seekforward', function () { audio.currentTime = Math.min(duree(), audio.currentTime + 15); });
    }
    majTout();
  }
  function suivant() { if (pos + 1 < liste.length) jouer(liste, pos + 1); }
  // Lecture refusée (fichier introuvable, hors-ligne, navigateur qui bloque) : pas d'erreur dans la console.
  function lire() { audio.play().catch(function () {}); }
  audio.addEventListener('ended', function () {
    var f = fiche(liste[pos]);
    if (f) { Jeu.compter('ecoute'); Activites.stat('ecoutes'); Jeu.gagner(10, 'fiche écoutée'); }
    if (pos + 1 < liste.length) suivant(); else majTout();
  });
  ['play', 'pause', 'timeupdate', 'loadedmetadata'].forEach(function (ev) { audio.addEventListener(ev, majTout); });

  function majTout() {
    var f = fiche(liste[pos]), joue = !audio.paused && !audio.ended;
    // Mini-lecteur fixe en bas de l'écran
    var mini = document.getElementById('mini-lecteur');
    if (f && (joue || audio.currentTime > 0) && !audio.ended) {
      if (!mini) {
        mini = document.createElement('div');
        mini.id = 'mini-lecteur'; mini.className = 'mini-lecteur';
        mini.innerHTML = '<button type="button" data-a="play" class="ml-play"></button><a class="ml-titre"></a><span class="ml-temps"></span>' +
          '<button type="button" data-a="fermer" aria-label="Arrêter la lecture">✕</button><span class="ml-barre"><i></i></span>';
        document.body.appendChild(mini);
        document.body.classList.add('avec-lecteur');
      }
      mini.querySelector('.ml-play').textContent = joue ? '⏸' : '▶';
      mini.querySelector('.ml-play').setAttribute('aria-label', joue ? 'Pause' : 'Lecture');
      var t = mini.querySelector('.ml-titre');
      t.textContent = '🎧 ' + f.titre; t.href = '#/' + f.matiere + '/' + f.id;
      mini.querySelector('.ml-temps').textContent = mmss(audio.currentTime) + ' / ' + mmss(duree());
      mini.querySelector('.ml-barre i').style.width = (audio.currentTime / (duree() || 1) * 100) + '%';
    } else if (mini) { mini.remove(); document.body.classList.remove('avec-lecteur'); }
    // Lecteur de la fiche ouverte, s'il y en a un
    Array.prototype.forEach.call(document.querySelectorAll('.ecoute'), function (el) {
      var actif = f && el.dataset.id === f.id;
      el.classList.toggle('en-cours', actif && joue);
      el.querySelector('.ecoute-play').textContent = actif && joue ? '⏸' : '▶';
      el.querySelector('.ecoute-barre i').style.width = (actif ? audio.currentTime / (duree() || 1) * 100 : 0) + '%';
      el.querySelector('.ecoute-temps').textContent = actif ? mmss(audio.currentTime) + ' / ' + mmss(duree()) : mmss(dureeFiche(el.dataset.id));
    });
    Array.prototype.forEach.call(document.querySelectorAll('.piste'), function (el) {
      el.classList.toggle('en-cours', !!(f && el.dataset.id === f.id && joue));
    });
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('#mini-lecteur [data-a]');
    if (b) {
      if (b.dataset.a === 'play') { if (audio.paused) lire(); else audio.pause(); }
      else { audio.pause(); audio.currentTime = 0; pos = -1; majTout(); }
    }
  });

  function lecteurFiche(f) {
    if (!aAudio(f.id)) return '';
    return '<div class="ecoute" data-id="' + f.id + '">' +
      '<button type="button" class="ecoute-play" aria-label="Écouter la fiche">▶</button>' +
      '<div class="ecoute-info"><b>🎧 Écouter la fiche</b><span class="ecoute-temps">' + mmss(dureeFiche(f.id)) + '</span>' +
        '<span class="ecoute-barre"><i></i></span></div>' +
      '<div class="ecoute-outils"><button type="button" data-saut="-15" aria-label="Reculer de 15 secondes">↺ 15</button>' +
        '<button type="button" data-saut="15" aria-label="Avancer de 15 secondes">15 ↻</button>' +
        '<button type="button" class="ecoute-vitesse" aria-label="Vitesse de lecture">' + vitesse + '×</button></div>' + choixVoix() +
    '</div>';
  }
  function activerLecteur(app, f) {
    var el = app.querySelector('.ecoute');
    if (!el) return;
    el.addEventListener('click', function (e) {
      var actif = fiche(liste[pos]) && liste[pos] === f.id;
      if (e.target.closest('.ecoute-play')) {
        if (!actif) jouer([f.id], 0); else if (audio.paused) lire(); else audio.pause();
      } else if (e.target.closest('[data-saut]')) {
        if (!actif) return;
        audio.currentTime = Math.max(0, Math.min(duree(), audio.currentTime + +e.target.closest('[data-saut]').dataset.saut));
      } else if (e.target.closest('.ecoute-vitesse')) {
        var v = [1, 1.25, 1.5, 0.85];
        vitesse = v[(v.indexOf(vitesse) + 1) % v.length];
        audio.playbackRate = vitesse;
        e.target.closest('.ecoute-vitesse').textContent = vitesse + '×';
      } else if (e.target.closest('.ecoute-barre') && actif && duree()) {
        var r = e.target.closest('.ecoute-barre').getBoundingClientRect();
        audio.currentTime = (e.clientX - r.left) / r.width * duree();
      }
    });
    majTout();
  }

  function pageEcoute(app) {
    document.title = 'Écouter les fiches · Révisions BTS MCO';
    var total = 0;
    var html = R.matieres.map(function (m) {
      var fs = R.fiches.filter(function (f) { return f.matiere === m.id && aAudio(f.id); });
      if (!fs.length) return '';
      fs.forEach(function (f) { total += dureeFiche(f.id); });
      return '<h2 class="titre-section titre-matiere" style="--c:' + m.couleur + '">' + esc(m.nom) +
        ' <button type="button" class="tout-ecouter" data-m="' + m.id + '">▶ Tout écouter</button></h2>' +
        fs.map(function (f) {
          return '<button type="button" class="piste" data-id="' + f.id + '" style="--c:' + m.couleur + '"><span class="piste-play">▶</span>' +
            '<span class="piste-titre">' + esc(f.titre) + '</span><span class="piste-duree">' + mmss(dureeFiche(f.id)) + '</span></button>';
        }).join('');
    }).join('');
    app.innerHTML = fil('Écouter les fiches') +
      '<section class="express-tete"><div class="defi-eclair">🎧</div><h1>Écouter les fiches</h1>' +
      '<p>Chaque fiche lue par une voix naturelle, avec l’essentiel en premier. ' + Math.round(total / 60) + ' minutes au total : idéal dans le bus ou en marchant. La lecture continue si tu changes de page.</p>' + choixVoix() + '</section>' +
      '<div class="pistes">' + (html || '<p class="vide">Pas encore de fiche audio.</p>') + '</div>';
    // Écouteur posé sur la liste (recréée à chaque visite), pas sur #app qui reste en place : sinon il s'accumulerait.
    app.querySelector('.pistes').addEventListener('click', function (e) {
      var p = e.target.closest('.piste'), t = e.target.closest('.tout-ecouter');
      if (p) {
        if (fiche(liste[pos]) && liste[pos] === p.dataset.id) { if (audio.paused) lire(); else audio.pause(); return; }
        var ids = R.fiches.filter(function (f) { return f.matiere === fiche(p.dataset.id).matiere && aAudio(f.id); }).map(function (f) { return f.id; });
        jouer(ids, ids.indexOf(p.dataset.id));
      } else if (t) {
        var ids2 = R.fiches.filter(function (f) { return f.matiere === t.dataset.m && aAudio(f.id); }).map(function (f) { return f.id; });
        jouer(ids2, 0);
      }
    });
    majTout();
  }

  // ---------- Méthodologie d'examen ----------

  var METHODO = [
    { id: 'ecrit', titre: 'Les écrits (E5, E6)', ico: '✍️', html: `
      <div class="retenir">Le jury note ta capacité à <b>utiliser les annexes</b> et à <b>justifier avec le cours</b>. Une bonne réponse = une notion + l’application au cas + une conclusion.</div>
      <h2>Méthode pour chaque question</h2>
      <ol class="etapes">
        <li><b>Lire la question</b><p>Repère le verbe : identifier, analyser, calculer, proposer, justifier… Il dit ce que le jury attend.</p></li>
        <li><b>Chercher dans les annexes</b><p>Souligne les chiffres et les faits utiles. Ne recopie jamais une annexe : sers-t’en comme preuve.</p></li>
        <li><b>Mobiliser le cours</b><p>Nomme la notion (ex. « matrice des compétences », « facteurs d’hygiène ») et définis-la en une phrase.</p></li>
        <li><b>Appliquer au cas</b><p>Relie la notion à l’entreprise du sujet, avec ses chiffres et son contexte.</p></li>
        <li><b>Conclure</b><p>Une phrase qui répond directement à la question. Pour « proposer », termine par une recommandation chiffrée et réaliste.</p></li>
      </ol>
      <h2>Présentation de la copie</h2>
      <ul><li>Numérote les questions comme le sujet, saute une ligne entre chaque.</li><li>Des phrases courtes, un paragraphe par idée.</li><li>Les tableaux sont bienvenus pour comparer (fournisseurs, modalités de formation…).</li><li>Garde 10 minutes à la fin pour relire chiffres et unités.</li></ul>` },
    { id: 'calculs', titre: 'Les calculs', ico: '🧮', html: `
      <div class="retenir">Un calcul rapporte des points même si le résultat final est faux, <b>à condition de montrer la méthode</b>.</div>
      <ol class="etapes">
        <li><b>Écrire la formule</b><p>Ex. « Taux de marque = marge ÷ prix de vente HT × 100 ». Le correcteur voit que tu connais la méthode.</p></li>
        <li><b>Poser le calcul</b><p>Remplace par les chiffres de l’annexe, sans sauter d’étape.</p></li>
        <li><b>Donner le résultat avec l’unité</b><p>€, %, heures… arrondi à 2 décimales.</p></li>
        <li><b>Interpréter</b><p>Une phrase : « La demande est très élastique : une hausse de prix ferait perdre beaucoup de ventes. »</p></li>
      </ol>
      <p class="exemple">Entraîne-toi sur la page <a href="#/calculs">Calculs à l’infini</a> : chiffres différents à chaque fois, correction détaillée.</p>` },
    { id: 'oral', titre: 'Les oraux (E41, E42)', ico: '🎙️', html: `
      <div class="retenir">À l’oral, on évalue autant <b>la posture</b> que <b>le contenu</b> : sourire, regard, vocabulaire professionnel, écoute.</div>
      <h2>E41 : la négociation vente</h2>
      <ol class="etapes">
        <li><b>Prise de contact</b><p>Bonjour, sourire, se présenter, se rendre disponible. Les premières secondes comptent.</p></li>
        <li><b>Découverte des besoins</b><p>Questions ouvertes, écoute, reformulation. Repère les mobiles SONCASE.</p></li>
        <li><b>Argumentation</b><p>2 ou 3 arguments CAP, choisis selon les besoins découverts, pas une liste de caractéristiques.</p></li>
        <li><b>Objections</b><p>REPO, sans jamais contredire frontalement le client.</p></li>
        <li><b>Conclusion</b><p>Proposer de conclure, vente additionnelle, prise de congé chaleureuse.</p></li>
      </ol>
      <h2>E42 : présenter un projet d’animation</h2>
      <ul><li><b>Diagnostic</b> chiffré (ventes, trafic, concurrence) avant toute proposition.</li><li><b>Objectifs</b> SMART : chiffrés et datés.</li><li><b>Actions</b> concrètes : offre, mise en avant, communication, planning.</li><li><b>Budget et rentabilité</b>, puis <b>indicateurs de suivi</b>.</li></ul>
      <p class="exemple">Entraîne-toi avec le <a href="#/oral">simulateur d’oral</a> : Claude joue le client ou le manager, puis te note sur 20.</p>` },
    { id: 'pieges', titre: 'Les pièges classiques', ico: '⚠️', html: `
      <div class="cartes">
        <div><b>Taux de marge ou de marque ?</b><p>Marge : on divise par le coût d’achat. Marque : par le prix de vente. Vérifie toujours le dénominateur.</p></div>
        <div><b>HT ou TTC ?</b><p>Les marges se calculent en HT. Le coefficient multiplicateur passe du coût d’achat HT au prix de vente TTC.</p></div>
        <div><b>Cotisations salariales</b><p>Elles sont retenues sur le salaire du salarié, pas payées en plus par l’entreprise (erreur du cours !).</p></div>
        <div><b>Heures sup</b><p>+25 % de la 36e à la 43e heure, +50 % à partir de la 44e. Ne majore pas les 35 premières.</p></div>
        <div><b>Recopier l’annexe</b><p>Le jury veut une analyse : cite un chiffre puis explique ce qu’il signifie.</p></div>
        <div><b>Réponse sans notion</b><p>Toujours nommer la notion du cours : c’est souvent là que sont les points.</p></div>
        <div><b>Challenge ou concours ?</b><p>Challenge : tous ceux qui atteignent l’objectif gagnent. Concours : seuls les meilleurs.</p></div>
        <div><b>Élasticité négative ?</b><p>On la donne en valeur absolue : E = 3, pas −3.</p></div>
      </div>` },
    { id: 'jourj', titre: 'Le jour J', ico: '🎯', html: `
      <h2>La veille</h2>
      <ul><li>Relis <a href="#/express">l’essentiel en 1 minute</a> et tes <a href="#/carnet">notes</a>, pas de nouvelle notion.</li><li>Prépare convocation, pièce d’identité, calculatrice (autorisée ?), stylos.</li><li>Dors : la mémoire se consolide pendant le sommeil.</li></ul>
      <h2>Pendant l’épreuve</h2>
      <ul><li>Lis tout le sujet avant d’écrire, et répartis ton temps selon les points.</li><li>Commence par les questions que tu maîtrises le mieux.</li><li>Bloqué ? Écris la formule ou la notion : c’est déjà des points.</li></ul>
      <div class="attention">Les durées et le format exact (contrôle en cours de formation ou épreuve ponctuelle) dépendent de ton établissement : vérifie-les avec ton professeur.</div>` }
  ];

  function pageMethodo(app, onglet) {
    document.title = 'Méthodologie d’examen · Révisions BTS MCO';
    var t = METHODO.filter(function (x) { return x.id === onglet; })[0] || METHODO[0];
    app.innerHTML = fil('Méthodologie') +
      '<section class="express-tete"><div class="defi-eclair">🧭</div><h1>Méthodologie d’examen</h1><p>Comment répondre pour aller chercher tous les points.</p></section>' +
      '<div class="calc-types methodo-onglets">' + METHODO.map(function (x) {
        return '<a href="#/methodo/' + x.id + '"' + (x === t ? ' class="actif"' : '') + '>' + x.ico + ' ' + esc(x.titre) + '</a>';
      }).join('') + '</div>' +
      '<article class="fiche" style="--c:var(--rouille)"><h1>' + t.ico + ' ' + esc(t.titre) + '</h1><div class="contenu">' + t.html + '</div></article>';
    Composants.activer(app);
  }

  // ---------- Études de cas ----------

  function pageCasListe(app) {
    document.title = 'Études de cas · Révisions BTS MCO';
    var cas = R.cas || [];
    app.innerHTML = fil('Études de cas') +
      '<section class="express-tete"><div class="defi-eclair">🗂️</div><h1>Études de cas</h1><p>Des cas comme à l’examen : contexte, annexes, questions. Réponds, puis compare avec le corrigé ou fais-toi corriger par Claude.</p></section>' +
      (cas.length ? '<div class="activites">' + cas.map(function (c) {
        var m = Activites.matiere(c.matiere);
        return '<a class="activite" href="#/cas/' + c.id + '" style="--c:' + m.couleur + '"><span class="activite-ico">🗂️</span><span><b>' + esc(c.titre) + '</b>' +
          '<span>' + esc(m.nom) + ' · ' + c.questions.length + ' questions' + (c.exemple ? ' · exemple' : c.source ? ' · ta copie' : '') + '</span></span></a>';
      }).join('') + '</div>' : '<p class="vide">Pas encore d’étude de cas.</p>') +
      '<p class="astuce">Envoie tes études de cas vues en cours : elles seront ajoutées ici avec leur corrigé.</p>';
  }

  function pageCas(app, id) {
    var c = (R.cas || []).filter(function (x) { return x.id === id; })[0];
    if (!c) { pageCasListe(app); return; }
    var m = Activites.matiere(c.matiere), E = Jeu.etat(), total = c.questions.reduce(function (s, q) { return s + (q.points || 0); }, 0);
    document.title = c.titre + ' · Études de cas';
    app.innerHTML = fil(c.titre, ['Études de cas', '#/cas']) +
      '<article class="fiche" style="--c:' + m.couleur + '"><span class="defi-tag">' + esc(m.nom) + (c.exemple ? ' · cas d’exemple' : c.source ? ' · d’après ta copie' : '') + '</span><h1>' + esc(c.titre) + '</h1>' +
        '<div class="contenu">' + c.contexte + (c.annexes ? '<details class="annexes" open><summary>📎 Annexes</summary>' + c.annexes + '</details>' : '') + '</div></article>' +
      c.questions.map(function (q, i) {
        var cle = 'cas:' + c.id + ':' + i;
        return '<section class="cas-q" data-i="' + i + '"><div class="cas-q-tete"><span class="cas-num">' + (i + 1) + '</span><b>' + esc(q.q) + '</b>' + (q.points ? '<span class="cas-pts">' + q.points + ' pts</span>' : '') + '</div>' +
          '<textarea rows="4" placeholder="Ta réponse… (gardée sur cet appareil)">' + esc((E.notes || {})[cle] || '') + '</textarea>' +
          '<p class="calc-boutons"><button type="button" class="installer-btn secondaire" data-corrige>Voir le corrigé</button>' +
          '<button type="button" class="installer-btn" data-claude>Faire corriger par Claude ↗</button></p>' +
          '<div class="cas-corrige" hidden><div class="qcm-expl">' + q.corrige + '</div></div></section>';
      }).join('') +
      (total ? '<p class="astuce">Barème total : ' + total + ' points.</p>' : '');
    Composants.activer(app);
    Array.prototype.forEach.call(app.querySelectorAll('.cas-q'), function (sec) {
      var i = +sec.dataset.i, q = c.questions[i], zone = sec.querySelector('textarea'), cle = 'cas:' + c.id + ':' + i, minut;
      zone.addEventListener('input', function () {
        clearTimeout(minut);
        minut = setTimeout(function () { var n = E.notes = E.notes || {}; if (zone.value.trim()) n[cle] = zone.value; else delete n[cle]; Jeu.sauver(); }, 500);
      });
      sec.querySelector('[data-corrige]').addEventListener('click', function (e) {
        var d = sec.querySelector('.cas-corrige');
        d.hidden = !d.hidden;
        e.target.textContent = d.hidden ? 'Voir le corrigé' : 'Masquer le corrigé';
        if (!d.hidden && !E.corr[cle]) { E.corr[cle] = true; Jeu.compter('cas'); Jeu.gagner(8, 'étude de cas'); }
      });
      sec.querySelector('[data-claude]').addEventListener('click', function () {
        if (!zone.value.trim()) { zone.focus(); zone.classList.add('ia-vide'); return; }
        var tmp = document.createElement('div');
        tmp.innerHTML = c.contexte + (c.annexes || '');
        var ctx = tmp.textContent.replace(/\s+/g, ' ').trim(), url;
        // On raccourcit le contexte (jamais la question ni la réponse) jusqu'à ce que l'adresse passe.
        for (var n = 0; n < 12; n++) {
          url = 'https://claude.ai/new?q=' + encodeURIComponent('Je révise le BTS MCO (2e année). Corrige ma réponse à une question d’étude de cas, comme un correcteur d’examen.\n\n' +
            'Contexte et annexes :\n' + ctx + '\n\nQuestion' + (q.points ? ' (' + q.points + ' points)' : '') + ' : ' + q.q + '\n\nMa réponse :\n' + zone.value.trim() +
            '\n\nDonne-moi une note sur ' + (q.points || 'le barème') + ', ce qui est juste, ce qui manque (notions du cours, utilisation des annexes, justification), et une version améliorée de ma réponse. Réponds en français, simplement.');
          if (url.length <= 7000) break;
          ctx = ctx.slice(0, Math.floor(ctx.length * 0.75)).replace(/\s+\S*$/, '') + ' […]';
        }
        window.open(url, '_blank', 'noopener');
      });
    });
  }

  // ---------- Défi de la semaine ----------

  var DEFIS_SEMAINE = [
    { id: 'calculs', ico: '🧮', titre: 'Semaine des calculs', txt: 'Réussir 10 exercices de calcul', cle: 'calculEx', obj: 10, lien: '#/calculs' },
    { id: 'marathon', ico: '🏃', titre: 'Semaine marathon', txt: 'Réviser 5 jours différents', jours: true, obj: 5, lien: '#/planning' },
    { id: 'sansfaute', ico: '💯', titre: 'Semaine sans faute', txt: 'Réussir 3 QCM sans faute', cle: 'parfait', obj: 3, lien: '#/' },
    { id: 'memoire', ico: '🃏', titre: 'Semaine mémoire', txt: 'Faire 4 paquets de cartes mémo', cle: 'cartes', obj: 4, lien: Activites.lienEntrainement },
    { id: 'boss', ico: '👑', titre: 'Semaine des boss', txt: 'Battre 2 boss', cle: 'bossGagne', obj: 2, lien: Activites.lienEntrainement },
    { id: 'eclair', ico: '⚡', titre: 'Semaine éclair', txt: 'Jouer 5 Défis éclair', cle: 'defi', obj: 5, lien: '#/defi' },
    { id: 'cent', ico: '💪', titre: 'Semaine des 100', txt: 'Donner 100 bonnes réponses', cle: 'bonnes', obj: 100, lien: '#/defi' },
    { id: 'oral', ico: '🎙️', titre: 'Semaine de l’oral', txt: 'Faire 2 oraux blancs avec Claude', cle: 'oral', obj: 2, lien: '#/oral' },
    { id: 'ecoute', ico: '🎧', titre: 'Semaine audio', txt: 'Écouter 4 fiches en entier', cle: 'ecoute', obj: 4, lien: '#/ecoute' }
  ];
  function defiSemaine() {
    var sid = Jeu.semaineId(), num = parseInt(sid.split('-S')[1], 10);
    var d = DEFIS_SEMAINE[num % DEFIS_SEMAINE.length], S = Jeu.etat().semaine || {};
    var meme = S.id === sid;
    var n = !meme ? 0 : d.jours ? Object.keys(S.jours || {}).length : (S.c || {})[d.cle] || 0;
    var auj = new Date(), reste = (7 - (auj.getDay() || 7));
    return { d: d, n: Math.min(n, d.obj), fait: meme && S.fait, reste: reste };
  }
  // Vérifie à chaque gain de progression si le défi de la semaine vient d'être réussi.
  Jeu.surChangement(function () {
    var x = defiSemaine(), E = Jeu.etat();
    if (x.fait || x.n < x.d.obj || !E.semaine || E.semaine.id !== Jeu.semaineId()) return;
    E.semaine.fait = true;
    E.stats.semaines = (E.stats.semaines || 0) + 1;
    Jeu.sauver();
    Jeu.debloquer('semaine');
    setTimeout(function () { Jeu.toast('🏁 Défi de la semaine réussi : ' + x.d.titre + ' !', 'grand'); Jeu.confettis(); Jeu.gagner(100, 'défi de la semaine', true); }, 600);
  });

  function decorerAccueil(app) {
    var cible = app.querySelector('.hero-revoir'), x = defiSemaine();
    if (!cible) return;
    var a = document.createElement('a');
    a.className = 'hero-semaine' + (x.fait ? ' faite' : '');
    a.href = x.d.lien;
    a.innerHTML = '<span class="ico">' + x.d.ico + '</span><span class="hs-txt"><small>Défi de la semaine</small><b>' + esc(x.d.titre) + ' : ' + esc(x.d.txt.toLowerCase()) + '</b>' +
      '<span class="mission-barre"><i style="width:' + Math.round(x.n / x.d.obj * 100) + '%"></i></span></span>' +
      '<span class="hs-n">' + (x.fait ? '✓' : x.n + '/' + x.d.obj) + '<small>' + (x.fait ? 'réussi' : x.reste ? 'J-' + x.reste : 'dernier jour') + '</small></span>';
    cible.parentNode.insertBefore(a, cible);
  }

  // ---------- Branchements ----------

  Activites.ajouterPageGlobale('ecoute', pageEcoute);
  Activites.ajouterPageGlobale('methodo', function (app) { pageMethodo(app, location.hash.split('/')[2]); });
  Activites.ajouterPageGlobale('cas', function (app) { var id = location.hash.split('/')[2]; if (id) pageCas(app, decodeURIComponent(id)); else pageCasListe(app); });
  Jeu.ajouterBadges([
    ['semaine', '🏁', 'Champion de la semaine', 'Réussir un défi de la semaine'],
    ['semaine-4', '🗓️', 'Régularité de pro', 'Réussir 4 défis de la semaine'],
    ['auditeur', '🎧', 'Bonne oreille', 'Écouter 5 fiches en entier']
  ], function (E) { return { 'semaine-4': (E.stats.semaines || 0) >= 4, 'auditeur': (E.stats.ecoutes || 0) >= 5 }; });
  Jeu.ajouterMissions([
    { id: 'ecoute', txt: 'Écouter une fiche en entier', cle: 'ecoute', obj: 1, lien: '#/ecoute', si: function () { return !!R.audio; } },
    { id: 'cas', txt: 'Travailler une question d’étude de cas', cle: 'cas', obj: 1, lien: '#/cas', si: function () { return !!(R.cas && R.cas.length); } }
  ]);

  return { decorerAccueil: decorerAccueil, lecteurFiche: lecteurFiche, activerLecteur: activerLecteur, defiSemaine: defiSemaine };
})();
