/* MindSky service worker: after the first visit the whole site works offline.
   CACHE is replaced by the build script on every release, so updates reach students. */
const CACHE="mindsky-25c591c876";
const FILES=[
 "./",
 "index.html",
 "manifest.webmanifest",
 "css/style.css?v=25c591c876",
 "js/core.js?v=25c591c876",
 "js/subjects.js?v=25c591c876",
 "data/lessons-physics.js?v=25c591c876",
 "data/lessons-maths.js?v=25c591c876",
 "data/lessons-india.js?v=25c591c876",
 "data/lessons-chemistry.js?v=25c591c876",
 "js/engine.js?v=25c591c876",
 "js/sim-helpers.js?v=25c591c876",
 "js/sims-physics-india.js?v=25c591c876",
 "js/sims-maths.js?v=25c591c876",
 "js/sims-chemistry.js?v=25c591c876",
 "js/quiz.js?v=25c591c876",
 "js/app.js?v=25c591c876",
 "js/lab.js?v=25c591c876",
 "js/views-tail.js?v=25c591c876",
 "js/router.js?v=25c591c876",
 "js/backup.js?v=25c591c876",
 "js/pwa.js?v=25c591c876",
 "assets/icon-192.png",
 "assets/icon-512.png",
 "assets/icon-maskable-512.png",
 "assets/apple-touch-icon.png",
 "assets/favicon.png",
 "assets/og-image.png"
];
self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith("mindsky-") && k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
self.addEventListener("fetch",e=>{
  const req=e.request; if(req.method!=="GET") return;
  const url=new URL(req.url);
  if(url.origin===location.origin){
    e.respondWith(caches.match(req,{ignoreSearch:true}).then(hit=>hit||fetch(req).then(res=>{
      if(res.ok){ const copy=res.clone(); caches.open(CACHE).then(c=>c.put(req,copy)); }
      return res;
    }).catch(()=>req.mode==="navigate"?caches.match("index.html"):Response.error())));
    return;
  }
  /* web fonts: keep whatever the browser downloaded, so the look survives offline */
  if(url.hostname==="fonts.googleapis.com"||url.hostname==="fonts.gstatic.com"){
    e.respondWith(caches.open("mindsky-fonts").then(c=>c.match(req).then(hit=>{
      const net=fetch(req).then(res=>{ if(res.ok||res.type==="opaque") c.put(req,res.clone()); return res; }).catch(()=>hit);
      return hit||net;
    })));
  }
});
