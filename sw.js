// Service worker : rend le site installable et utilisable sans réseau.
// - Pages, scripts et styles : réseau d'abord (on a toujours la dernière version), cache si hors-ligne.
// - Images et PDF : cache d'abord (ils ne changent pas), réseau sinon.
// À chaque mise en ligne : augmenter VERSION en même temps que le ?v= de index.html.
var VERSION = 29;
var CACHE = 'revision-bts-v' + VERSION;
var V = '?v=' + VERSION;
var COEUR = [
  './', 'index.html', 'manifest.webmanifest', 'style.css' + V,
  'data/matieres.js' + V, 'data/drcv.js' + V, 'data/adoc.js' + V, 'data/management.js' + V, 'data/gestion.js' + V, 'data/anglais.js' + V,
  'data/formules.js' + V, 'data/qcm.js' + V, 'data/entrainement.js' + V, 'data/cas.js' + V, 'data/audio.js' + V,
  'jeu.js' + V, 'activites.js' + V, 'jeux.js' + V, 'outils.js' + V, 'carnet.js' + V, 'bonus.js' + V, 'ambiance.js' + V, 'composants.js' + V, 'app.js' + V,
  'icones/icon-192.png', 'icones/icon-512.png', 'icones/apple-touch-icon.png', 'icones/favicon-32.png'
];

self.addEventListener('install', function (e) {
  // Un fichier manquant ne doit pas bloquer l'installation : on les ajoute un par un.
  e.waitUntil(caches.open(CACHE).then(function (c) {
    return Promise.all(COEUR.map(function (u) { return c.add(u).catch(function () {}); }));
  }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (cles) {
    return Promise.all(cles.filter(function (k) { return k.indexOf('revision-bts-') === 0 && k !== CACHE; })
      .map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // polices Google, claude.ai… : on ne s'en mêle pas
  // Audio : copie téléchargée (page « Écouter les fiches ») si elle existe, sinon le réseau.
  // Le lecteur demande des morceaux (en-tête Range) : on découpe la copie pour lui répondre (obligatoire sur iPhone).
  if (/\.mp3$/i.test(url.pathname)) {
    e.respondWith(caches.open('rbts-audio').then(function (c) { return c.match(req.url); }).then(function (r) {
      if (!r) return fetch(req);
      var plage = req.headers.get('range');
      if (!plage) return r;
      return r.blob().then(function (b) {
        var m = /bytes=(\d*)-(\d*)/.exec(plage), debut = m && m[1] ? +m[1] : 0, fin = m && m[2] ? +m[2] : b.size - 1;
        if (m && !m[1] && m[2]) { debut = Math.max(0, b.size - m[2]); fin = b.size - 1; } // « les N derniers octets »
        fin = Math.min(fin, b.size - 1);
        return new Response(b.slice(debut, fin + 1), { status: 206, statusText: 'Partial Content', headers: {
          'Content-Type': 'audio/mpeg', 'Content-Range': 'bytes ' + debut + '-' + fin + '/' + b.size, 'Content-Length': String(fin - debut + 1), 'Accept-Ranges': 'bytes' } });
      });
    }));
    return;
  }

  var statique = /\.(jpg|jpeg|png|webp|svg|pdf)$/i.test(url.pathname);
  if (statique) {
    e.respondWith(caches.match(req).then(function (r) {
      return r || fetch(req).then(function (rep) {
        if (rep.ok) { var copie = rep.clone(); caches.open(CACHE).then(function (c) { c.put(req, copie); }); }
        return rep;
      });
    }));
    return;
  }

  e.respondWith(fetch(req).then(function (rep) {
    if (rep.ok) { var copie = rep.clone(); caches.open(CACHE).then(function (c) { c.put(req, copie); }); }
    return rep;
  }).catch(function () {
    return caches.match(req).then(function (r) {
      return r || (req.mode === 'navigate' ? caches.match('index.html') : undefined);
    });
  }));
});
