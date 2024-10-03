self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('pwa-cache').then(cache => {
      return cache.addAll([
        '/index.html',
        '/logohrbg (1).png',
        '/about.html',
        '/contact.html',
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
          caches.match('/index.html').then(response => {
              return response || fetch('/index.html');
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
