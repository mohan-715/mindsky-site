/* ---------- INSTALL + OFFLINE ---------- */
(function(){
  if("serviceWorker" in navigator && (location.protocol==="https:"||location.hostname==="localhost"||location.hostname==="127.0.0.1")){
    window.addEventListener("load",function(){ navigator.serviceWorker.register("sw.js").catch(function(){}); });
  }
  let deferred=null;
  window.addEventListener("beforeinstallprompt",function(e){ e.preventDefault(); deferred=e; const b=document.getElementById("installBtn"); if(b) b.hidden=false; });
  window.addEventListener("appinstalled",function(){ deferred=null; const b=document.getElementById("installBtn"); if(b) b.hidden=true; showToast("MindSky installed"); });
  document.addEventListener("click",function(e){
    if(e.target && e.target.id==="installBtn" && deferred){ deferred.prompt(); deferred.userChoice.finally(function(){ deferred=null; e.target.hidden=true; }); }
  });
  window.addEventListener("hashchange",function(){ const b=document.getElementById("installBtn"); if(b && deferred) b.hidden=false; });
})();
