self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-cache').then(cache => {
      return cache.addAll([
        '/Index.html',
        '/logohrbg (1).png',
        '/About.html',
        '/Contact.html',
        '/Styles.css',
        '/script.js',
        '/Offline.html'
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  
  if (event.request.url === self.location.origin + '/') {
      event.respondWith(
          caches.match('/Index.html').then(response => {
              return response || fetch('/Index.html');
          })
      );
  } else {
      
      event.respondWith(
          caches.match(event.request).then(response => {
              return response || fetch(event.request);
          }).catch(() => {
              return caches.match('/Offline.html');
          })
      );
  }
});
