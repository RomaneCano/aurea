// Service worker d'Auréa : fonctionne hors connexion après la première visite (prières, chapelet, Bible déjà lue).
const V = "aurea-v32";
const CORE = ["./", "index.html", "style.css", "editorial.css", "favicon.svg", "manifest.webmanifest", "config.js", "content.js", "content2.js", "content3.js", "saints.js", "detail1.js", "detail2.js", "stories2.js", "prayers.js", "paths.js", "calendar.js", "quizzes.js", "art.js", "art2.js", "art3.js", "app.js", "app2.js", "app3.js", "app4.js", "app5.js", "app6.js", "app7.js", "app8.js", "app9.js", "temps.js", "app10.js", "app11.js", "app12.js", "vendor/gsap.min.js", "scene2.js", "longs_jesus.js", "longs_bible.js", "longs_saints.js", "longs_saints2.js", "longs_saints3.js", "app13.js", "app14.js", "app15.js", "deconstruire.js", "miracles.js", "testimonies.js", "main.js", "img/logo-mark.svg", "img/icon-192.png", "img/icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => Promise.allSettled(CORE.map(u => c.add(u)))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res && res.ok) { const copy = res.clone(); caches.open(V).then(c => c.put(r, copy)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
