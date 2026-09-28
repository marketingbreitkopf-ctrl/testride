// Guarda só a "casca" (esta página e os ícones). O app do Google sempre vem da internet.
const CACHE = 'testride-v1';
const ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './manifest-gestor.webmanifest',
  './icone-192.png', './icone-512.png', './icone-gestor-192.png', './icone-gestor-512.png',
  './apple-touch-icon.png', './apple-touch-icon-gestor.png', './favicon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (new URL(e.request.url).origin !== location.origin) return;   // o app do Google passa direto
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request, { ignoreSearch: true })));
});
