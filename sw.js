// Service worker : l'application fonctionne hors connexion.
// Stratégie "réseau d'abord" : à chaque ouverture avec internet, la dernière version est chargée ;
// sans internet, la dernière version mémorisée est utilisée.
const CACHE = "budget-app-v27";
const FILES = ["./", "manifest.webmanifest", "privacy.html", "icon-192.png", "icon-512.png", "icon-maskable-512.png", "apple-touch-icon.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => Promise.allSettled(FILES.map((f) => c.add(f)))).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === "navigate";
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok && !res.redirected) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(isPage ? "./" : req, copy));
        }
        return res;
      })
      .catch(() => caches.match(isPage ? "./" : req).then((r) => r || caches.match("./")))
  );
});
