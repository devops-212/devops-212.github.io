const CACHE_NAME = 'ecodive-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/styles.css',
  '/script.js',
  '/Manifest.json',
  '/js/app.js',
  '/bg-ocean.jpg',
  '/EcodiveIcon.png',
  '/EcodiveIcon.ico'
];

self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Archivos cacheados');
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activando...');

  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(name => {
          if (!cacheWhitelist.includes(name)) {
            console.log(`[Service Worker] Borrando caché antigua: ${name}`);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log(`[Service Worker] Cache hit: ${event.request.url}`);
        return response;
      }

      console.log(`[Service Worker] Cache miss: ${event.request.url}`);
      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
      });
    })
  );
});
