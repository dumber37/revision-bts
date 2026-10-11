// Service worker : rend le site installable et utilisable sans réseau.
// - Pages, scripts et styles : réseau d'abord (on a toujours la dernière version), cache si hors-ligne.
// - Images et PDF : cache d'abord (ils ne changent pas), réseau sinon.
// À chaque mise en ligne : augmenter VERSION en même temps que le ?v= de index.html.
var VERSION = 13;
var CACHE = 'revision-bts-v' + VERSION;
var V = '?v=' + VERSION;
var COEUR = [
  './', 'index.html', 'manifest.webmanifest', 'style.css' + V,
  'data/matieres.js' + V, 'data/drcv.js' + V, 'data/adoc.js' + V, 'data/management.js' + V, 'data/gestion.js' + V,
  'data/formules.js' + V, 'data/qcm.js' + V, 'data/entrainement.js' + V,
  'jeu.js' + V, 'activites.js' + V, 'composants.js' + V, 'app.js' + V,
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
