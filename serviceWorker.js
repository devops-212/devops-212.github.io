const CACHE_NAME = 'ecodive-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/about.html',
  '/contact.html',
  '/styles.css',
  '/script.js',
  '/Manifest.json'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
