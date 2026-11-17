// MoniSale · service worker: la web funciona como app y abre rápido.
// Páginas: primero la red (siempre lo último), si no hay conexión, la copia guardada.
// Fotos, letras y scripts: se sirven de la copia guardada y se actualizan en segundo plano.
// Vídeos y música no se guardan (son grandes y se cargan por partes).
const CACHE = 'monisale-v1';
self.addEventListener('install', e => { self.skipWaiting(); e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/icon-192.png', '/favicon.svg']).catch(() => {}))); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;
  if (/\.(mp4|mp3|webm|m4a)$/i.test(u.pathname) || r.headers.has('range')) return;
  if (r.mode === 'navigate') {
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(CACHE).then(c => c.put('/', cp)); return res; })
      .catch(() => caches.match(r).then(m => m || caches.match('/'))));
    return;
  }
  e.respondWith(caches.open(CACHE).then(c => c.match(r).then(m => {
    const net = fetch(r).then(res => { if (res && res.ok && res.type === 'basic') c.put(r, res.clone()); return res; }).catch(() => m);
    return m || net;
  })));
});
