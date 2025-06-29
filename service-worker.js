const CACHE_NAME = 'secret-messages-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './assets/images/fondo-romantico.jpg',
  './assets/images/moon.png',
  './assets/images/favicon.png',
  './assets/images/cafesito.webp', // Asegúrate de que esta imagen existe
  './assets/images/mi_diario.webp', // Asegúrate de que esta imagen existe
  './assets/images/cielo_estrellado.jpg', // Asegúrate de que esta imagen existe
  './assets/images/social-share-image.jpg', // Asegúrate de que esta imagen existe
  './assets/audio/correct.mp3',
  './assets/audio/incorrect.mp3',
  './assets/audio/musica-fondo.mp3',
  './assets/audio/holi.mp3', // Asegúrate de que este audio existe
  './assets/audio/nuestra_cancion.mp3', // Asegúrate de que este audio existe
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Courgette&display=swap'
];

// Instalar Service Worker y cachear recursos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Cacheando archivos');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activar Service Worker y limpiar caches antiguos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => cacheName.startsWith('secret-messages-') && cacheName !== CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    })
  );
});

// Estrategia Cache-First para recursos, luego Network-Fallback
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devuelve el recurso desde la caché si se encuentra
        if (response) {
          return response;
        }
        // Si no está en caché, intenta obtenerlo de la red
        return fetch(event.request).then(
          response => {
            // Comprueba si hemos recibido una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona la respuesta porque la respuesta de un stream solo se puede consumir una vez
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      })
      .catch(() => {
        // Esto se ejecuta si la red y la caché fallan.
        // Podrías devolver una página offline personalizada si lo deseas.
        // Por ahora, simplemente no responde, lo que resultará en un error de red.
        console.log('Error de red y caché para:', event.request.url);
      })
  );
});
