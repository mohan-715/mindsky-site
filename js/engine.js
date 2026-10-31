
const subjectNav=document.getElementById("subjectNav");
let currentSubject=SUBJECTS[0].id;
SUBJECTS.forEach(s=>{ const tab=document.createElement("button"); tab.className="subject-tab"+(s.id===currentSubject?" active":""); tab.textContent=s.name; tab.dataset.subject=s.id; tab.onclick=()=>switchSubject(s.id); subjectNav.appendChild(tab); });

const ACCENT_VAR={ physics:"--physics", mathematics:"--math", india:"--india", chemistry:"--chemistry" };
const CONSTELLATION_GROUPS={
  physics:[{ name:"The Mechanics Cluster", ids:["gravity","motion","forces","energy"] },{ name:"The Circuits Cluster", ids:["electricity","electronics"] }],
  mathematics:[{ name:"Number Sense", ids:["primes","fractions","ratio-percent","number-system","exponents"] },{ name:"Algebra & Change", ids:["algebra","linear-graphs","quadratics","sequences","calculus"] },{ name:"Shapes & Space", ids:["geometry","trigonometry"], dx:70 },{ name:"Data & Chance", ids:["probability","statistics"] }],
  chemistry:[{ name:"Matter & Atoms", ids:["matter-states","atoms","periodic-table"] },{ name:"Bonds & Reactions", ids:["bonding","reactions","acids-bases"] },{ name:"Amounts & Energy", ids:["mole","gas-laws","energy-rates"] },{ name:"Carbon", ids:["organic"] }],
  india:[{ name:"The Land & Sky", ids:["physical-features","rivers","monsoon"] },{ name:"Ancient India", ids:["indus-valley","empires","tamilakam"] },{ name:"Modern India", ids:["freedom-struggle","republic-india"] }]
};

function switchSubject(id){
  benchRelease();
  currentSubject=id;
  const cfg=SUBJECTS.find(s=>s.id===id);
  const varName=ACCENT_VAR[id]||"--physics";
  const accentColor=getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  document.documentElement.style.setProperty("--accent", accentColor);
  document.getElementById("heroTitle").textContent=cfg.heroTitle;
  document.getElementById("heroText").textContent=cfg.heroText;
  subjectNav.querySelectorAll(".subject-tab").forEach(t=>t.classList.toggle("active",t.dataset.subject===id));
  renderAtlas(); renderLessons(); updateProgress();
}

const atlas=document.getElementById("atlas");
let ATLAS_POS={};
function atlasNodeSize(){ const w=window.innerWidth; return w<=520?78:(w<=900?96:130); }
const STACK_ON_NARROW={ mathematics:true, chemistry:true };
function computeAtlasLayout(subjectLessons, atlasW){
  const size=atlasNodeSize(); ATLAS_POS={};
  const tops=subjectLessons.filter(l=>!l.orbit);
  if(atlasW<700 && STACK_ON_NARROW[currentSubject]){
    const order=[]; (CONSTELLATION_GROUPS[currentSubject]||[]).forEach(g=>g.ids.forEach(id=>{ if(!order.includes(id)) order.push(id); }));
    tops.forEach(l=>{ if(!order.includes(l.id)) order.push(l.id); });
    let y=46, col=0;
    order.forEach(id=>{
      const l=tops.find(t=>t.id===id); if(!l) return;
      const hasKids=subjectLessons.some(k=>k.orbit && k.orbit.around===id);
      if(hasKids){ y+=70; ATLAS_POS[id]={ top:y, left:(atlasW-size)/2 }; y+=size+150; col=0; }
      else { ATLAS_POS[id]={ top:y, left: col===0 ? atlasW*0.12 : atlasW*0.88-size }; y+=size+52; col=1-col; }
    });
  } else {
    tops.forEach(l=>{ const left=typeof l.pos.left==="number" ? l.pos.left : parseFloat(l.pos.left)/100*atlasW; ATLAS_POS[l.id]={ top:l.pos.top, left }; });
  }
}
function computeAtlasHeight(subjectLessons){
  const size=atlasNodeSize(); let maxBottom=360;
  subjectLessons.filter(l=>!l.orbit).forEach(l=>{ const p=ATLAS_POS[l.id]; if(p) maxBottom=Math.max(maxBottom, p.top+size+95); });
  subjectLessons.filter(l=>l.orbit).forEach(l=>{ const p=ATLAS_POS[l.orbit.around]; if(p) maxBottom=Math.max(maxBottom, p.top+size/2+l.orbit.radius+60); });
  return maxBottom;
}
function renderConstellationOverlay(subjectLessons, atlasW, atlasH){
  const groups=CONSTELLATION_GROUPS[currentSubject]||[];
  if(!groups.length) return;
  const size=atlasNodeSize(), half=size/2;
  const svgNS="http://www.w3.org/2000/svg";
  const svg=document.createElementNS(svgNS,"svg");
  svg.setAttribute("class","constellation-svg");
  svg.setAttribute("viewBox",`0 0 ${atlasW} ${atlasH}`);
  svg.setAttribute("preserveAspectRatio","none");
  groups.forEach((group,gi)=>{
    const nodes=group.ids.map(id=>subjectLessons.find(l=>l.id===id && !l.orbit)).filter(Boolean);
    if(nodes.length<2) return;
    const pts=nodes.map(l=>({ x:ATLAS_POS[l.id].left+half, y:ATLAS_POS[l.id].top+half }));
    for(let i=0;i<pts.length-1;i++){
      const line=document.createElementNS(svgNS,"line");
      line.setAttribute("x1",pts[i].x); line.setAttribute("y1",pts[i].y);
      line.setAttribute("x2",pts[i+1].x); line.setAttribute("y2",pts[i+1].y);
      line.dataset.a=nodes[i].id; line.dataset.b=nodes[i+1].id;
      svg.appendChild(line);
    }
    if(atlasW<700 && STACK_ON_NARROW[currentSubject]) return;
    const avgX=pts.reduce((s,p)=>s+p.x,0)/pts.length;
    const topY=Math.min(...pts.map(p=>p.y));
    const label=document.createElement("div");
    label.className="constellation-label"; label.dataset.g=gi;
    label.style.left=((avgX+(group.dx||0))/atlasW*100)+"%";
    label.style.top=Math.max(18,topY-half-26)+"px";
    label.textContent=group.name;
    atlas.appendChild(label);
  });
  atlas.appendChild(svg);
}
function renderAtlas(){
  atlas.innerHTML="";
  const subjectLessons=LESSONS.filter(l=>l.subject===currentSubject);
  const atlasW=atlas.clientWidth||1140;
  const size=atlasNodeSize(), half=size/2;
  computeAtlasLayout(subjectLessons, atlasW);
  const atlasH=computeAtlasHeight(subjectLessons);
  atlas.style.height=atlasH+"px";
  atlas.dataset.w=atlasW;
  renderConstellationOverlay(subjectLessons, atlasW, atlasH);
  subjectLessons.filter(l=>!l.orbit).forEach(l=>{
    const p=ATLAS_POS[l.id]; if(!p) return;
    const isHub=subjectLessons.some(child=>child.orbit && child.orbit.around===l.id);
    const node=document.createElement("div");
    node.className="star-node"+(l.locked?" locked":"")+(isHub?" hub":"");
    node.style.top=p.top+"px";
    node.style.left=p.left+"px";
    node.dataset.id=l.id;
    node.innerHTML=`<div class="label">${l.label}</div>`;
    if(!l.locked){
      node.tabIndex=0; node.setAttribute("role","button"); node.setAttribute("aria-label","Open "+l.label);
      node.onclick=()=>openLesson(l.id);
      node.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openLesson(l.id); } };
    }
    atlas.appendChild(node);
  });
  subjectLessons.filter(l=>l.orbit).forEach(l=>{
    const parent=subjectLessons.find(p=>p.id===l.orbit.around);
    const pp=parent && ATLAS_POS[parent.id];
    if(!pp) return;
    const centerTop=pp.top+half;
    const centerLeftCss=(pp.left+half)+"px";
    const pathKey=`${parent.id}-${l.orbit.radius}`;
    if(!atlas.querySelector(`.orbit-path[data-key="${pathKey}"]`)){
      const path=document.createElement("div");
      path.className="orbit-path";
      path.dataset.key=pathKey;
      path.style.top=centerTop+"px"; path.style.left=centerLeftCss;
      path.style.width=(l.orbit.radius*2)+"px"; path.style.height=(l.orbit.radius*2)+"px";
      atlas.appendChild(path);
    }
    const ring=document.createElement("div");
    ring.className="orbit-ring";
    ring.style.top=centerTop+"px"; ring.style.left=centerLeftCss;
    ring.style.setProperty("--radius", l.orbit.radius+"px");
    ring.style.setProperty("--duration", l.orbit.speed+"s");
    ring.style.setProperty("--start-angle", l.orbit.angle+"deg");
    const planetNode=document.createElement("div");
    planetNode.className="planet-node";
    const planetCounter=document.createElement("div");
    planetCounter.className="planet-counter";
    planetCounter.style.setProperty("--start-angle", l.orbit.angle+"deg");
    planetCounter.style.setProperty("--duration", l.orbit.speed+"s");
    planetCounter.dataset.id=l.id;
    planetCounter.tabIndex=0; planetCounter.setAttribute("role","button"); planetCounter.setAttribute("aria-label","Open "+l.label);
    planetCounter.innerHTML=`<div class="planet-dot"></div><div class="planet-label">${l.label}</div>`;
    planetCounter.onclick=()=>openLesson(l.id);
    planetCounter.onkeydown=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); openLesson(l.id); } };
    planetNode.appendChild(planetCounter);
    ring.appendChild(planetNode);
    atlas.appendChild(ring);
  });
  updateProgress();
}
let atlasResizeTimer=null;
window.addEventListener("resize",()=>{
  clearTimeout(atlasResizeTimer);
  atlasResizeTimer=setTimeout(()=>{
    if(typeof APP==="undefined" || APP.view!=="learn") return;
    if(Math.abs((atlas.clientWidth||0)-Number(atlas.dataset.w||0))>24) renderAtlas();
  },200);
});

const lessonsRoot=document.getElementById("lessons");
function controlHtml(c){
  return `<div class="control"><label for="${c.id}">${c.label} <b class="cval" data-for="${c.id}"></b></label><input id="${c.id}" type="range" min="${c.min}" max="${c.max}" ${c.step?`step="${c.step}"`:""} value="${c.value}"></div>`;
}
function syncControlValues(){
  document.querySelectorAll(".cval").forEach(out=>{
    const inp=document.getElementById(out.dataset.for);
    if(inp && out.textContent!==inp.value) out.textContent=inp.value;
  });
}
function renderLessons(){
  benchRelease();
  lessonsRoot.innerHTML="";
  LESSONS.filter(l=>l.subject===currentSubject && !l.locked).forEach(l=>{
    const section=document.createElement("section");
    section.className="lesson";
    section.id="lesson-"+l.id;
    let sectionsHtml=l.sections.map(s=>`<h3 class="section-title">${s.title}</h3><p>${s.body}</p>${s.formula?`<div class="formula">${s.formula}</div>`:""}${s.example?`<div class="worked"><span class="worked-tag">WORKED EXAMPLE</span>${s.example}</div>`:""}`).join("");
    let simHtml="";
    if(l.sim){
      const controlsHtml=l.sim.controls.map(controlHtml).join("");
      let stage="";
      if(l.sim.canvasId){ stage=`<canvas id="${l.sim.canvasId}" class="sim-canvas" width="${l.sim.width}" height="${l.sim.height}"></canvas>`; }
      else if(l.sim.type==="motion"){ stage=`<div class="track"><div class="track-line"></div><div id="motionBall" class="motion-object"></div></div>`; }
      simHtml=`<h3 class="section-title">${l.sim.title}</h3><div class="simulator">${stage}<div class="controls">${controlsHtml}</div>${l.sim.type==="motion"?`<div class="measure">Distance travelled: <span id="distanceRead">0</span> meters</div>`:""}${l.sim.readout?`<div class="measure">${l.sim.readout.label}: <span id="${l.sim.readout.id}">0</span></div>`:""}${l.sim.note?`<p class="sim-note">${l.sim.note}</p>`:""}</div>`;
    }
    let galleryHtml="";
    if(l.gallery){
      const g=l.gallery;
      const controlsHtml=g.controls.map(controlHtml).join("");
      galleryHtml=`<h3 class="section-title">${g.title}</h3><div class="simulator"><canvas id="${g.canvasId}" class="sim-canvas" width="${g.width}" height="${g.height}"></canvas><div class="controls">${controlsHtml}</div>${g.readout?`<div class="measure">${g.readout.label}: <span id="${g.readout.id}">0</span></div>`:""}${g.note?`<p class="sim-note">${g.note}</p>`:""}</div>`;
    }
    const mpHtml=`<div class="mind-picture"><div class="mp-label">PICTURE IN YOUR MIND</div><div class="mp-chain">${l.mentalPicture.map((step,i)=>(i>0?'<div class="mp-arrow">↓</div>':'')+`<div class="mp-step">${step}</div>`).join("")}</div></div>`;
    const quizHtml=`<div class="quiz" data-lesson="${l.id}"><h3 class="section-title">Can You Predict It?</h3>${l.quiz.map(q=>`<div class="quiz-q"><div class="qtext">${q.q}</div>${q.options.map(o=>`<button class="qopt" data-correct="${!!o.c}">${o.t}</button>`).join("")}<div class="qfeedback"></div>${q.why?`<div class="qwhy" hidden>${q.why}</div>`:""}</div>`).join("")}<div class="quiz-result" hidden></div></div>`;
    section.innerHTML=`<div class="chapter">${l.chapter}</div><h2>${l.title}</h2><div class="story">${l.hook}</div>${sectionsHtml}${simHtml}${galleryHtml}${mpHtml}${quizHtml}<button class="complete" onclick="completeTopic('${l.id}');setTimeout(closeLesson,900)">Discover This Star</button>`;
    lessonsRoot.appendChild(section);
  });
  attachQuizHandlers();
  syncControlValues();
  AnimationManager.register('controlValues', syncControlValues, null);
}

/* ---------- STAR FIELD (background, uses AnimationManager) ---------- */
const canvas=document.getElementById("sky");
const skyCtx=canvas.getContext("2d");
let stars=[];
function resizeSky(){
  canvas.width=innerWidth; canvas.height=innerHeight;
  stars=[];
  for(let i=0;i<PERF.starCount;i++){
    stars.push({ x:Math.random()*canvas.width, y:Math.random()*canvas.height, r:Math.random()*2, a:Math.random() });
  }
}
function drawSky(){
  skyCtx.clearRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<stars.length;i++){
    const s=stars[i];
    skyCtx.fillStyle=`rgba(212,177,106,${s.a})`;
    skyCtx.fillRect(s.x, s.y, s.r, s.r);
  }
}
resizeSky();
AnimationManager.register('sky', drawSky, canvas);
window.addEventListener('resize', resizeSky);

/* ---------- TIMER ---------- */
let seconds=0;
setInterval(()=>{ seconds++; let m=Math.floor(seconds/60), s=seconds%60; document.getElementById("timer").innerText=String(m).padStart(2,"0")+":"+String(s).padStart(2,"0"); },1000);

/* ---------- PROGRESS ---------- */
let completed=[];
try{
  const saved=JSON.parse(localStorage.getItem("mindsky")||"[]");
  if(Array.isArray(saved)) completed=saved.filter(id=>typeof id==="string");
}catch(e){ completed=[]; }
function saveProgress(){ try{ localStorage.setItem("mindsky",JSON.stringify(completed)); }catch(e){} }
let scores={};
try{ const sc=JSON.parse(localStorage.getItem("mindsky_scores")||"{}"); if(sc && typeof sc==="object" && !Array.isArray(sc)) scores=sc; }catch(e){ scores={}; }
function saveScores(){ try{ localStorage.setItem("mindsky_scores",JSON.stringify(scores)); }catch(e){} }
const MASTERY_NAMES=["Not yet","Discovered","Practised","Mastered"];
function masteryLevel(id){
  if(!completed.includes(id)) return 0;
  const s=scores[id]; if(!s || !s.total) return 1;
  const f=s.best/s.total; return f>=0.8?3:(f>=0.5?2:1);
}
function masteryChip(id){ const lv=masteryLevel(id); return `<span class="mastery-chip l${lv}">${MASTERY_NAMES[lv].toUpperCase()}</span>`; }
function updateProgress(){
  const subjectLessons=LESSONS.filter(l=>l.subject===currentSubject && !l.locked);
  const doneInSubject=subjectLessons.filter(l=>completed.includes(l.id)).length;
  const pct=subjectLessons.length ? (doneInSubject/subjectLessons.length*100) : 0;
  document.getElementById("bar").style.width=pct+"%";
  document.querySelectorAll(".star-node[data-id], .planet-counter[data-id]").forEach(node=>{
    const lv=masteryLevel(node.dataset.id);
    node.classList.toggle("done", completed.includes(node.dataset.id));
    node.classList.toggle("lvl2", lv>=2); node.classList.toggle("lvl3", lv>=3);
  });
  document.querySelectorAll(".constellation-svg line[data-a]").forEach(line=>{
    line.classList.toggle("lit", completed.includes(line.dataset.a) && completed.includes(line.dataset.b));
  });
  const groups=CONSTELLATION_GROUPS[currentSubject]||[];
  document.querySelectorAll(".constellation-label[data-g]").forEach(lab=>{
    const gr=groups[+lab.dataset.g]; lab.classList.toggle("complete", !!gr && gr.ids.every(id=>completed.includes(id)));
  });
}
function showToast(message){
  const toast=document.createElement('div');
  toast.textContent=message;
  toast.setAttribute('role','status');
  Object.assign(toast.style,{position:'fixed',right:'22px',bottom:'22px',zIndex:100,padding:'12px 16px',border:'1px solid rgba(212,177,106,.5)',borderRadius:'12px',background:'rgba(5,8,22,.94)',color:'#edf2f7',font:'600 13px Inter',boxShadow:'0 15px 40px rgba(0,0,0,.35)',transition:'opacity .3s,transform .3s',transform:'translateY(20px)',opacity:'0'});
  document.body.appendChild(toast);
  requestAnimationFrame(()=>{ toast.style.transform='translateY(0)'; toast.style.opacity='1'; });
  setTimeout(()=>{ toast.style.opacity='0'; toast.style.transform='translateY(20px)'; setTimeout(()=>toast.remove(),300); },2000);
}
function completeTopic(id){
  if(!completed.includes(id)){ completed.push(id); saveProgress(); updateProgress(); }
  if(typeof APP!=="undefined" && APP && APP.view==='home') renderHome();
  if(typeof APP!=="undefined" && APP && APP.view==='progress') renderProgress();
  showToast(((lessonById(id)||{title:id}).title)+' discovered ✦');
  const lsn=lessonById(id); const grp=lsn && (CONSTELLATION_GROUPS[lsn.subject]||[]).find(g=>g.ids.includes(id));
  if(grp && grp.ids.every(x=>completed.includes(x))) setTimeout(()=>showToast(grp.name+' complete ✦'),2400);
}
function resetAllProgress(){
  completed=[]; scores={};
  try{ localStorage.removeItem("mindsky_scores"); }catch(e){}
  try{ localStorage.removeItem("mindsky"); }catch(e){}
  saveProgress();
  updateProgress();
  renderHome(); renderProgress(); renderProfile();
}

/* ---------- OPEN LESSON ---------- */
function openLesson(id){
  benchRelease();
  const el=document.getElementById("lesson-"+id);
  if(!el) return;
  document.querySelectorAll("#lessons > section").forEach(o=>{ if(o!==el) o.style.display="none"; });
  el.style.display="block";
  setTimeout(()=>window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 70), behavior:"smooth" }),50);
  if(!el.dataset.simStarted){
    const lesson=LESSONS.find(l=>l.id===id);
    const simKey=(lesson && lesson.sim) ? lesson.sim.type : id;
    const runner=SIM_REGISTRY[simKey];
    if(runner) runner();
    if(lesson && lesson.gallery){ const galleryRunner=SIM_REGISTRY[lesson.gallery.type]; if(galleryRunner) galleryRunner(); }
    el.dataset.simStarted="true";
  }
}

