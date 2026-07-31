const CACHE = "informes-adulto-v2";
const ASSETS = [
  "./","./index.html","./manifest.json","./gen-192.png","./gen-512.png","./gen-maskable.png",
  "./template/mimetype","./template/content.xml","./template/styles.xml","./template/settings.xml",
  "./template/meta.xml","./template/manifest.rdf","./template/META-INF/manifest.xml","./template/thumbnail.png",
  "./template/Pictures/10000000000008000000005A7D85DF8C.jpg",
  "./template/Pictures/10000001000006AD000005D03E0EE38F.png"
];
self.addEventListener("install", (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))); self.clients.claim(); });
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then((c) => c || fetch(e.request).then((r) => { const cp = r.clone(); caches.open(CACHE).then((c) => c.put(e.request, cp)).catch(()=>{}); return r; }).catch(() => caches.match("./index.html"))));
});
