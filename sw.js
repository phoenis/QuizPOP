// Service worker "vuoto": serve solo perché Chrome/Android considerino il
// sito installabile (richiedono un service worker registrato con un
// gestore di fetch). Non mette nulla in cache di proposito: l'app usa già
// "?v=" su style.css e app.js in index.html per forzare l'aggiornamento a
// ogni modifica, e una cache qui rischierebbe di mostrare una versione
// vecchia del gioco durante la festa.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
