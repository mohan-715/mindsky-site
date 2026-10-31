/* ---------- ROUTER: every view and lesson has its own link (#/...) ----------
   Hash links work on any static host, need no server rules, and keep
   working offline. Examples:
     #/                      the galaxy
     #/chemistry             the Chemistry atlas
     #/chemistry/atoms       the "Inside the Atom" lesson
     #/explore  #/lab  #/progress  #/profile  #/about  #/challenges
   ------------------------------------------------------------------- */
const ROUTER={ lesson:null, applying:false };
const ROUTER_VIEWS=["home","explore","challenges","lab","progress","profile","about"];
const ROUTER_VIEW_TITLES={ home:"Galaxy", explore:"All topics", challenges:"Challenges", lab:"Lab", progress:"Your progress", profile:"Your profile", about:"About & privacy" };

function routerHashFor(view,subject,lesson){
  if(view==="home") return "#/";
  if(view==="learn") return lesson ? "#/"+subject+"/"+lesson : "#/"+subject;
  return "#/"+view;
}
function routerCurrentHash(){ return routerHashFor(APP.view,currentSubject,ROUTER.lesson); }
function routerTitle(){
  let t="MindSky — Learn Until You Can See It";
  if(APP.view==="learn"){
    const l=ROUTER.lesson && lessonById(ROUTER.lesson);
    t = l ? l.title+" — "+subjectLabel(l.subject)+" · MindSky" : (SUBJECTS.find(x=>x.id===currentSubject)||{}).heroTitle+" · MindSky";
  } else if(APP.view!=="home"){ t=(ROUTER_VIEW_TITLES[APP.view]||"MindSky")+" · MindSky"; }
  document.title=t;
}
function routerSync(){
  if(ROUTER.applying) return;
  const h=routerCurrentHash();
  const cur=location.hash==="" ? "#/" : location.hash;
  if(cur!==h) location.hash=h;
  routerTitle();
}

/* wrap the three functions that change what the person is looking at */
(function(){
  const _setView=setView, _switchSubject=switchSubject, _openLesson=openLesson;
  setView=function(view){ ROUTER.lesson=null; _setView(view); routerSync(); };
  switchSubject=function(id){ ROUTER.lesson=null; _switchSubject(id); routerSync(); };
  openLesson=function(id){
    _openLesson(id);
    if(document.getElementById("lesson-"+id)){ ROUTER.lesson=id; addCopyLinkButton(id); routerSync(); }
  };
})();

function addCopyLinkButton(id){
  const sec=document.getElementById("lesson-"+id); if(!sec || sec.querySelector(".lesson-actions")) return;
  const chap=sec.querySelector(".chapter"); if(!chap) return;
  const bar=document.createElement("div"); bar.className="lesson-actions";
  const back=document.createElement("button"); back.type="button"; back.className="back-to-map"; back.textContent="← Back to the map";
  back.onclick=closeLesson;
  const b=document.createElement("button"); b.type="button"; b.className="copy-link"; b.textContent="Copy link to this topic";
  b.onclick=function(){
    const url=location.href.split("#")[0]+"#/"+(lessonById(id)||{}).subject+"/"+id;
    const done=function(){ showToast("Link copied"); };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done,function(){ window.prompt("Copy this link:",url); });
    else window.prompt("Copy this link:",url);
  };
  bar.appendChild(back); bar.appendChild(b);
  chap.insertAdjacentElement("afterend",bar);
}
function closeLesson(){
  document.querySelectorAll("#lessons > section").forEach(o=>{ o.style.display="none"; });
  ROUTER.lesson=null; routerSync();
  const at=document.getElementById("atlas"); if(at) window.scrollTo({ top:Math.max(0,at.getBoundingClientRect().top+window.scrollY-90), behavior:"smooth" });
}
/* the galaxy picker is re-fitted whenever the home view is drawn */
(function(){
  const _renderHome=renderHome;
  renderHome=function(){ _renderHome(); requestAnimationFrame(function(){ fitGalaxy(); }); };
})();

function routerParse(hash){
  const parts=(hash||"").replace(/^#\/?/,"").split("/").filter(Boolean).map(decodeURIComponent);
  if(!parts.length) return { view:"home" };
  const a=parts[0];
  if(ROUTER_VIEWS.indexOf(a)>-1) return { view:a };
  if(a==="learn") return { view:"learn", subject:currentSubject };
  if(SUBJECTS.some(s=>s.id===a)){
    if(parts[1]){ const l=lessonById(parts[1]); if(l && l.subject===a && !l.locked) return { view:"learn", subject:a, lesson:l.id }; }
    return { view:"learn", subject:a };
  }
  return { view:"home" };
}

function routerApply(){
  const r=routerParse(location.hash);
  const sameView = r.view===APP.view;
  if(r.view==="learn"){
    if(sameView && r.subject===currentSubject && (r.lesson||null)===ROUTER.lesson) { routerTitle(); return; }
  } else if(sameView){ routerTitle(); return; }
  ROUTER.applying=true;
  try{
    if(r.view==="learn"){
      if(r.subject!==currentSubject) switchSubject(r.subject);
      setView("learn");
      if(r.lesson){
        setTimeout(function(){ try{ openLesson(r.lesson); }finally{ ROUTER.applying=false; routerTitle(); } },90);
        return;
      }
    } else { setView(r.view); }
  } finally { if(!r.lesson) ROUTER.applying=false; }
  routerTitle();
}
window.addEventListener("hashchange",routerApply);
routerApply();
document.body.classList.toggle('immersive-home', APP.view==='home');
