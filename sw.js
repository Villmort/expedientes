const CACHE = "informes-adulto-v3";
const ASSETS = [
  "./","./index.html","./manifest.json","./template-data.js","./membrete.png",
  "./gen-192.png","./gen-512.png","./gen-maskable.png","./screenshot-1.png","./screenshot-2.png"
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((c) => c || fetch(e.request).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(()=>{}); return r; }).catch(() => caches.match("./index.html"))));
});
