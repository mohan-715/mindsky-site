/* ================= APP ================= */
const APP={ view:"home", filter:"all", query:"" };
function allCompletedCount(){ return completed.length; }
function lessonById(id){ return LESSONS.find(l=>l.id===id); }
function safeText(str){ return String(str||"").replace(/<[^>]*>/g,""); }
function setView(view){
  APP.view=view;
  document.body.classList.toggle('immersive-home', view==='home');
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id==='view-'+view));
  document.querySelectorAll('.nav-item[data-view]').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  if(view==='home') renderHome();
  if(view==='explore') renderExplore();
  if(view==='challenges') renderChallenges();
  if(view==='lab') renderLab();
  if(view==='progress') renderProgress();
  if(view==='profile') renderProfile();
  if(view==='learn'){ renderAtlas(); renderLessons(); updateProgress(); }
  window.scrollTo({top:0,behavior:'smooth'});
}
document.addEventListener('click',e=>{ const b=e.target.closest('[data-view]'); if(b) setView(b.dataset.view); });
function startConcept(id){
  const lesson=lessonById(id);
  if(lesson && lesson.subject!==currentSubject) switchSubject(lesson.subject);
  setView('learn');
  setTimeout(()=>openLesson(id),60);
}
function subjectLabel(id){ return (SUBJECTS.find(s=>s.id===id)||{}).name||id; }
function buildWarpStars(count=90){ return Array.from({length:count},(_,i)=>`<i class="warp-star" style="--a:${Math.random()*360}deg;--d:${180+Math.random()*680}px;animation-delay:${(i%24)*.012}s"></i>`).join(''); }

function renderHome(){
  const root=document.getElementById('view-home');
  root.classList.add('home-immersive');
  root.innerHTML=`
    <div class="galaxy-home" id="mindskyGalaxy">
      <div class="galaxy-ui galaxy-title" style="left:50%;top:8%;transform:translateX(-50%);text-align:center;width:min(760px,92vw)">
        <div class="eyebrow">MINDSKY</div>
        <h1>Learn until you can see it</h1>
        <p>Physics, Mathematics, Chemistry and India, in one sky.</p>
      </div>
      <canvas class="galaxy-stars" id="galaxyStars"></canvas>
      <div class="galaxy-core" id="galaxyCore" role="button" tabindex="0" aria-label="Enter the MindSky galaxy">
        <div><strong>MINDSKY</strong><span>ENTER THE GALAXY</span></div>
      </div>
      <div class="galaxy-orbit o1"></div><div class="galaxy-orbit o2"></div><div class="galaxy-orbit o3"></div>
      <div class="galaxy-hint galaxy-ui">CLICK TO ENTER</div>
      <div class="blackhole-dive" id="blackholeDive"><div class="warp"></div>${buildWarpStars(PERF.tier==='low'?40:PERF.tier==='medium'?70:90)}</div>
      <div class="galaxy-reveal" id="galaxyReveal">
        <div class="reveal-title"><div class="eyebrow">SUBJECTS</div><h2>Pick a subject</h2><p>Each star is a topic.</p></div>
        <div class="constellation-systems">
          <div class="reveal-link" style="width:240px;left:23%;top:56%;transform:rotate(-30deg)"></div>
          <div class="reveal-link" style="width:240px;left:43%;top:40%;transform:rotate(30deg)"></div>
          <div class="reveal-link" style="width:240px;left:65%;top:57%;transform:rotate(-30deg)"></div>
          <div class="reveal-system rs1" style="left:17%;top:60%;--c:var(--physics)" onclick="enterSystem('physics')" tabindex="0">
            <div class="outer"></div><div class="orbit"></div><div class="sun">Physics</div>
            <div class="p" style="--r:72px;--dur:5s;--angle:25deg" data-label="Gravity"></div>
            <div class="p" style="--r:92px;--dur:7s;--angle:170deg" data-label="Force"></div>
            <div class="p" style="--r:55px;--dur:4s;--angle:260deg" data-label="Electronics"></div>
            <div class="system-name">PHYSICS</div>
          </div>
          <div class="reveal-system rs2" style="left:39%;top:34%;--c:var(--math)" onclick="enterSystem('mathematics')" tabindex="0">
            <div class="outer"></div><div class="orbit"></div><div class="sun">Math</div>
            <div class="p" style="--r:70px;--dur:5.5s;--angle:70deg" data-label="Algebra"></div>
            <div class="p" style="--r:90px;--dur:8s;--angle:210deg" data-label="Geometry"></div>
            <div class="p" style="--r:52px;--dur:4.4s;--angle:320deg" data-label="Patterns"></div>
            <div class="system-name">MATHEMATICS</div>
          </div>
          <div class="reveal-system rs3" style="left:61%;top:62%;--c:var(--chemistry)" onclick="enterSystem('chemistry')" tabindex="0">
            <div class="outer"></div><div class="orbit"></div><div class="sun">Chem</div>
            <div class="p" style="--r:68px;--dur:5.2s;--angle:40deg" data-label="Atoms"></div>
            <div class="p" style="--r:92px;--dur:7.5s;--angle:160deg" data-label="Reactions"></div>
            <div class="p" style="--r:52px;--dur:4.2s;--angle:280deg" data-label="Bonds"></div>
            <div class="system-name">CHEMISTRY</div>
          </div>
          <div class="reveal-system rs4" style="left:83%;top:36%;--c:var(--india)" onclick="enterSystem('india')" tabindex="0">
            <div class="outer"></div><div class="orbit"></div><div class="sun">India</div>
            <div class="p" style="--r:67px;--dur:6.5s;--angle:110deg" data-label="Geography"></div>
            <div class="p" style="--r:94px;--dur:9s;--angle:230deg" data-label="History"></div>
            <div class="p" style="--r:52px;--dur:4.6s;--angle:20deg" data-label="Culture"></div>
            <div class="system-name">INDIA</div>
          </div>
        </div>
        <button class="back-galaxy" onclick="resetGalaxyView()">← Return to galaxy</button>
      </div>
    </div>`;
  initGalaxyParticles();
  const core=document.getElementById('galaxyCore'); const enter=()=>diveIntoGalaxy();
  core.addEventListener('click',enter); core.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();enter();}});
  const galaxy=document.getElementById('mindskyGalaxy');
  galaxy.addEventListener('click',e=>{if(e.target===galaxy || e.target.closest('#galaxyStars') || e.target.closest('.galaxy-orbit')) enter();});
}

function initGalaxyParticles(){
  const c=document.getElementById('galaxyStars'); if(!c) return;
  const wrap=c.parentElement, d=PERF.dpr;
  c.width=wrap.clientWidth*d; c.height=wrap.clientHeight*d;
  c.style.position='absolute'; c.style.inset='0'; c.style.width='100%'; c.style.height='100%'; c.style.pointerEvents='none';
  const x=c.getContext('2d'); x.setTransform(d,0,0,d,0,0);
  const stars=[];
  const count = PERF.galaxyStars;
  for(let i=0;i<count;i++){ const a=Math.random()*Math.PI*2, r=Math.pow(Math.random(),1.55)*Math.min(wrap.clientWidth,wrap.clientHeight)*.68; stars.push({a,r,s:.3+Math.random()*1.2,o:.2+Math.random()*.8}); }
  if (AnimationManager.callbacks.has('galaxyStars')) AnimationManager.unregister('galaxyStars');
  AnimationManager.register('galaxyStars', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('galaxyStars'); return; }
    if(APP.view!=='home') return;
    const w=wrap.clientWidth, h=wrap.clientHeight, cx=w/2, cy=h/2;
    x.clearRect(0,0,w,h);
    for(let i=0;i<stars.length;i++){ const st=stars[i]; const swirl=st.a+Math.log1p(st.r)*.16; const px=cx+Math.cos(swirl)*st.r*1.15, py=cy+Math.sin(swirl)*st.r*.62; x.fillStyle=`rgba(255,255,255,${st.o})`; x.fillRect(px,py,st.s,st.s); }
  }, c);
}

function diveIntoGalaxy(){
  const galaxy=document.getElementById('mindskyGalaxy'), dive=document.getElementById('blackholeDive'), reveal=document.getElementById('galaxyReveal');
  if(!galaxy || !dive || !reveal) return;
  galaxy.classList.add('dive-ready'); dive.classList.add('active');
  const core=document.getElementById('galaxyCore');
  core.style.transform='translate(-50%,-50%) scale(.04)'; core.style.filter='blur(10px)';
  setTimeout(()=>{ reveal.classList.add('show'); galaxy.querySelectorAll('.galaxy-ui,.galaxy-orbit,.galaxy-core').forEach(el=>el.style.opacity='0'); dive.classList.remove('active'); },900);
}

function resetGalaxyView(){
  const galaxy=document.getElementById('mindskyGalaxy'), dive=document.getElementById('blackholeDive'), reveal=document.getElementById('galaxyReveal');
  if(!galaxy || !dive || !reveal) return;
  reveal.classList.remove('show'); galaxy.querySelectorAll('.galaxy-ui,.galaxy-orbit,.galaxy-core').forEach(el=>el.style.opacity='');
  const core=document.getElementById('galaxyCore'); core.style.transform='translate(-50%,-50%)'; core.style.filter='';
  dive.classList.remove('active'); galaxy.classList.remove('dive-ready');
}

function ensureGlobalWarp(){ let el=document.getElementById('globalWarp'); if(!el){ el=document.createElement('div'); el.id='globalWarp'; el.className='blackhole-dive'; document.body.appendChild(el); } return el; }
function warpTravel(callback){ const el=ensureGlobalWarp(); el.innerHTML='<div class="warp"></div>'+buildWarpStars(); el.classList.add('active'); setTimeout(()=>{ callback(); setTimeout(()=>{ el.classList.remove('active'); },260); },780); }
function enterSystem(id){ warpTravel(()=>{ switchSubject(id); setView('learn'); }); }
function backToGalaxy(){ warpTravel(()=>{ setView('home'); requestAnimationFrame(()=>{ const galaxy=document.getElementById('mindskyGalaxy'); const reveal=document.getElementById('galaxyReveal'); if(!galaxy||!reveal) return; galaxy.classList.add('dive-ready'); galaxy.querySelectorAll('.galaxy-ui,.galaxy-orbit,.galaxy-core').forEach(el=>el.style.opacity='0'); reveal.classList.add('show'); }); }); }

function renderExplore(){
  const root=document.getElementById('exploreResults');
  const q=(APP.query||'').toLowerCase().trim();
  const results=LESSONS.filter(l=>!l.locked && (APP.filter==='all'||l.subject===APP.filter) && (!q || [l.title,l.label,l.chapter,l.hook,safeText(l.hook),l.subject].join(' ').toLowerCase().includes(q)));
  root.innerHTML=results.length?results.map(l=>`<div class="panel-card clickable" onclick="startConcept('${l.id}')"><div class="card-meta">${subjectLabel(l.subject).toUpperCase()}</div><div class="card-title">${safeText(l.title)}</div><p class="view-sub">${safeText(l.hook).slice(0,150)}...</p><div>${completed.includes(l.id)?'<span class="pill">DISCOVERED</span>':'<span class="pill">OPEN</span>'}</div></div>`).join(''):`<div class="empty-state" style="grid-column:1/-1">No concepts found. Try a broader question.</div>`;
}

function renderChallenges(){
  const root=document.getElementById('view-challenges');
  const qs=[]; LESSONS.filter(l=>!l.locked).forEach(l=>l.quiz.forEach((q,i)=>qs.push({lesson:l,q,i})));
  root.innerHTML=`<div class="view-head"><div><div class="eyebrow">PRACTICE</div><h1>Challenges</h1><p class="view-sub">Questions from across the topics. Pick one to open its lesson and try it.</p></div></div><div class="grid grid-3">${qs.slice(0,12).map((x)=>`<div class="panel-card"><div class="card-meta">${safeText(x.lesson.title)}</div><div class="card-title">${safeText(x.q.q)}</div><button class="action secondary" style="margin-top:14px" onclick="startConcept('${x.lesson.id}')">Open topic</button></div>`).join('')}</div>`;
}

function renderLab(){
  benchRelease();
  const root=document.getElementById('view-lab');
  root.innerHTML=`<div class="view-head"><div><div class="eyebrow">LAB</div><h1>Experiments</h1><p class="view-sub">Pick an experiment, change the values and watch what happens.</p></div></div>
  <div class="lab-shell">
    <div class="lab-tabs" id="labTabs">
      <div class="lab-group"><div class="lab-group-label">PHYSICS &amp; ELECTRONICS</div><div class="lab-group-row">
      <button class="lab-tab active" data-lab="gravity">Gravity Well</button>
      <button class="lab-tab" data-lab="projectile">Projectile</button>
      <button class="lab-tab" data-lab="pendulum">Pendulum</button>
      <button class="lab-tab" data-lab="circuit">Circuit</button>
      <button class="lab-tab" data-lab="orbit">Orbit</button>
      <button class="lab-tab" data-lab="waves">Waves</button>
      <button class="lab-tab" data-lab="servo">Servo Motor</button>
      <button class="lab-tab" data-lab="pwm">PWM</button>
      <button class="lab-tab" data-lab="buzzer">Buzzer</button>
      </div></div>
      <div class="lab-group"><div class="lab-group-label">CHEMISTRY</div><div class="lab-group-row">${BENCH.filter(x=>x.group==='chem').map(benchTab).join('')}</div></div>
      <div class="lab-group"><div class="lab-group-label">MATHS</div><div class="lab-group-row">${BENCH.filter(x=>x.group==='math').map(benchTab).join('')}</div></div>
    </div>
    <div id="labWorkspace"></div>
  </div>`;
  document.querySelectorAll('.lab-tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.lab-tab').forEach(x=>x.classList.toggle('active',x===b));if(b.dataset.bench) mountBench(b.dataset.bench); else mountLabSimulation(b.dataset.lab);});
  mountLabSimulation('gravity');
}

