/* ---------- LAB BENCH: lesson experiments run as free-play tools ---------- */
const BENCH=[
  {group:'chem',lesson:'gas-laws',which:'sim',tab:'Gas in a Piston'},
  {group:'chem',lesson:'gas-laws',which:'gallery',tab:'Pressure vs Volume'},
  {group:'chem',lesson:'acids-bases',which:'gallery',tab:'Titration'},
  {group:'chem',lesson:'acids-bases',which:'sim',tab:'pH Scale'},
  {group:'chem',lesson:'atoms',which:'sim',tab:'Atom Builder'},
  {group:'chem',lesson:'bonding',which:'sim',tab:'Bond Tug of War'},
  {group:'chem',lesson:'reactions',which:'sim',tab:'Balance Equations'},
  {group:'chem',lesson:'energy-rates',which:'sim',tab:'Energy Hill'},
  {group:'chem',lesson:'energy-rates',which:'gallery',tab:'Reaction Rates'},
  {group:'chem',lesson:'mole',which:'gallery',tab:'Limiting Reactant'},
  {group:'chem',lesson:'organic',which:'sim',tab:'Hydrocarbons'},
  {group:'math',lesson:'quadratics',which:'sim',tab:'Parabola'},
  {group:'math',lesson:'quadratics',which:'gallery',tab:'Throw the Ball'},
  {group:'math',lesson:'linear-graphs',which:'gallery',tab:'Two Lines'},
  {group:'math',lesson:'trigonometry',which:'gallery',tab:'Unit Circle'},
  {group:'math',lesson:'calculus',which:'sim',tab:'Secant to Tangent'},
  {group:'math',lesson:'calculus',which:'gallery',tab:'Area under a Curve'},
  {group:'math',lesson:'pythagoras',which:'gallery',tab:'Ladder'},
  {group:'math',lesson:'probability',which:'gallery',tab:'Coin Flips'},
  {group:'math',lesson:'statistics',which:'gallery',tab:'Spread of Data'},
  {group:'math',lesson:'primes',which:'sim',tab:'Prime Sieve'}
];
function benchTab(x){ return '<button class="lab-tab" data-bench="'+x.lesson+':'+x.which+'">'+x.tab+'</button>'; }
var benchHome=null;
function benchRelease(){
  if(!benchHome) return;
  const h=benchHome; benchHome=null;
  try{ if(h.parent && h.parent.isConnected) h.parent.insertBefore(h.el,h.next && h.next.parentNode===h.parent ? h.next : null); }catch(e){}
}
function mountBench(key){
  benchRelease();
  labAnim.gen++;
  if(AnimationManager.callbacks.has('lab')) AnimationManager.unregister('lab');
  const parts=key.split(":"); const lesson=lessonById(parts[0]); if(!lesson) return;
  const cfg=lesson[parts[1]]; if(!cfg) return;
  if(currentSubject!==lesson.subject) switchSubject(lesson.subject);
  const c=document.getElementById(cfg.canvasId); const el=c && c.closest('.simulator'); if(!el) return;
  benchHome={ el:el, parent:el.parentNode, next:el.nextSibling };
  const ws=document.getElementById('labWorkspace');
  ws.innerHTML='<section class="lab-stage bench"><div class="lab-title">'+cfg.title.replace(/^Experiment: /,'')+'</div><p class="lab-desc">From the lesson “'+lesson.title+'”. Change anything and watch the result.</p><div id="benchSlot"></div><div class="lab-actions" style="margin-top:14px"><button class="action secondary" id="benchOpenLesson" type="button">Open the lesson →</button></div></section>';
  document.getElementById('benchSlot').appendChild(el);
  document.getElementById('benchOpenLesson').onclick=()=>startConcept(lesson.id);
  const runner=SIM_REGISTRY[cfg.type]; if(runner) runner();
  syncControlValues();
}

const LAB_MODELS={
  gravity:{title:'Gravity Well',desc:'See how mass and distance change gravitational pull — watch the object actually fall.',controls:[['mass','Mass',1,10,5,1],['distance','Distance',50,200,100,1]]},
  projectile:{title:'Projectile Motion',desc:'Change launch speed and angle and watch the ball actually fly the arc, frame by frame.',controls:[['speed','Launch speed',1,10,6,1],['angle','Angle',10,80,45,1]]},
  pendulum:{title:'Pendulum',desc:'Explore how length changes the rhythm of a pendulum that is actually swinging.',controls:[['length','Length',50,220,120,1],['gravity','Gravity',1,12,9.8,.1]]},
  circuit:{title:'Circuit Lab',desc:'Add components in series. Watch current flow. Push the LED past its 30 mA rating and watch it burst.',custom:true},
  orbit:{title:'Orbit',desc:'Change velocity and distance to see a body actually orbiting, not just a static path.',controls:[['velocity','Velocity',2,12,7,.1],['radius','Orbit radius',60,180,110,1]]},
  waves:{title:'Waves',desc:'Change frequency and amplitude and watch the wave actually travel, not sit frozen.',controls:[['frequency','Frequency',1,10,4,.1],['amplitude','Amplitude',10,100,50,1]]},
  servo:{title:'Servo Motor',desc:'A servo holds a precise angle using PWM pulses (1–2 ms, repeated every 20 ms). Drag the angle and watch the arm reach it. The Arduino code below shows exactly what is being sent.',
    controls:[['angle','Target Angle (°)',0,180,90,1]],
    code:['#include <Servo.h>','Servo myservo;','','void setup() {','  myservo.attach(9);   // signal wire to pin 9','}','','void loop() {','  // 0° = 1.0 ms pulse','  // 90° = 1.5 ms pulse','  // 180° = 2.0 ms pulse','  // pulse repeats every 20 ms (50 Hz)','  myservo.write(<span class="liveval" id="codeServoVal">90</span>);','}'].join('\n')},
  pwm:{title:'Pulse Width Modulation',desc:'PWM switches a signal on and off very fast. The fraction of time it is on (duty cycle) controls how much power reaches the load — dim an LED without wasting energy as heat.',
    controls:[['frequency','Frequency (Hz)',1,10,4,.1],['duty','Duty Cycle (%)',0,100,50,1]],
    code:['int ledPin = 9;','','void setup() {','  pinMode(ledPin, OUTPUT);','}','','void loop() {','  // analogWrite outputs a PWM waveform','  // 0 = 0% duty, 255 = 100% duty','  analogWrite(ledPin, <span class="liveval" id="codePwmVal">128</span>);','}'].join('\n')},
  buzzer:{title:'Buzzer & Sound Waves',desc:'A buzzer vibrates a piezo disc back and forth, pushing air into compressions and rarefactions. Frequency controls pitch, amplitude controls loudness.',controls:[['frequency','Frequency (Hz)',100,2000,440,10],['amplitude','Amplitude',10,100,60,1]]}
};

let labState={};
const labAnim={ id:null, gen:0 };

const CIRCUIT_COMPONENTS={
  resistor:{name:'Resistor',resistance:220,color:'#d4b16a'},
  inductor:{name:'Inductor',resistance:50,color:'#c9a7f0'},
  capacitor:{name:'Capacitor',resistance:0,color:'#5eead4',isCapacitor:true},
  led:{name:'LED',resistance:100,color:'#f0954a',maxCurrent:0.03,isLED:true}
};
const CIRCUIT_SLOTS=[{x:250,y:135},{x:390,y:135},{x:530,y:135}];

function pathPointAt(path,t){
  const segLen=[];let total=0;
  for(let i=0;i<path.length-1;i++){const dx=path[i+1].x-path[i].x,dy=path[i+1].y-path[i].y;const l=Math.hypot(dx,dy);segLen.push(l);total+=l;}
  let d=t*total;
  for(let i=0;i<segLen.length;i++){if(d<=segLen[i]){const f=d/segLen[i];return{x:path[i].x+(path[i+1].x-path[i].x)*f,y:path[i].y+(path[i+1].y-path[i].y)*f};}d-=segLen[i];}
  return path[0];
}

function computeCircuitCurrent(){
  const c=labState.circuit;if(!c)return{current:0,reason:'no-circuit'};
  const V=labState.values.voltage||5;
  let R_total=0,hasCap=false,capIdx=-1,ledIdx=-1,burned=false;
  for(let i=0;i<3;i++){
    const slot=c.slots[i];if(!slot)continue;
    const comp=CIRCUIT_COMPONENTS[slot.type];
    if(slot.burned){burned=true;continue;}
    if(comp.isCapacitor){hasCap=true;capIdx=i;}else{R_total+=comp.resistance;}
    if(comp.isLED)ledIdx=i;
  }
  if(burned)return{current:0,reason:'burned'};
  if(R_total===0&&!hasCap)return{current:0,reason:'no-components'};
  if(hasCap){
    const charge=c.capCharge[capIdx];const R_rest=Math.max(100,R_total);
    const current=(V/R_rest)*Math.exp(-charge*5);
    return{current,hasCap,capIdx,ledIndex:ledIdx,R_total:R_rest,V};
  }
  const current=V/R_total;
  return{current,R_total,ledIndex:ledIdx,V};
}

function drawCircuitComponent(x,cx,cy,slot,slotIndex){
  if(!slot){
    x.strokeStyle='rgba(215,220,229,.2)';x.setLineDash([3,3]);x.lineWidth=1;
    x.strokeRect(cx-40,cy-15,80,30);x.setLineDash([]);
    x.fillStyle='rgba(215,220,229,.35)';x.font='10px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('click to place',cx,cy+3);x.textAlign='left';return;
  }
  const comp=CIRCUIT_COMPONENTS[slot.type];
  if(slot.burned){
    x.fillStyle='#1a0808';x.beginPath();x.moveTo(cx-18,cy-16);x.lineTo(cx-18,cy+16);x.lineTo(cx+12,cy);x.closePath();x.fill();
    x.strokeStyle='#330000';x.lineWidth=2;x.stroke();
    x.strokeStyle='#660000';x.lineWidth=1.5;x.beginPath();
    x.moveTo(cx-8,cy-10);x.lineTo(cx-3,cy-2);x.lineTo(cx-10,cy+6);
    x.moveTo(cx+4,cy-13);x.lineTo(cx+7,cy-4);x.stroke();
    x.fillStyle='#c98a8a';x.font='bold 9px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('BURNED',cx,cy+28);x.textAlign='left';return;
  }
  if(slot.type==='resistor'){
    x.strokeStyle=comp.color;x.lineWidth=3;x.beginPath();const zW=56,zigs=6;
    x.moveTo(cx-zW/2,cy);
    for(let i=0;i<=zigs;i++){const px=cx-zW/2+(zW/zigs)*i;const py=cy+(i%2===0?-10:10);x.lineTo(px,py);}
    x.lineTo(cx+zW/2,cy);x.stroke();
    x.fillStyle='#9ca7c2';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';x.fillText('220Ω',cx,cy+28);x.textAlign='left';
  }else if(slot.type==='inductor'){
    x.strokeStyle=comp.color;x.lineWidth=3;const cW=56,loops=4;
    for(let i=0;i<loops;i++){const px=cx-cW/2+(cW/loops)*(i+0.5);x.beginPath();x.arc(px,cy,9,Math.PI,Math.PI*2.3);x.stroke();}
    x.fillStyle='#9ca7c2';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';x.fillText('50Ω',cx,cy+28);x.textAlign='left';
  }else if(slot.type==='capacitor'){
    const gap=8;x.fillStyle=comp.color;x.fillRect(cx-gap/2-4,cy-18,4,36);x.fillRect(cx+gap/2,cy-18,4,36);
    const charge=labState.circuit.capCharge[slotIndex];
    if(charge>0.05){
      x.fillStyle='rgba(240,149,74,'+charge+')';x.font='bold 11px IBM Plex Mono,monospace';x.textAlign='center';
      for(let i=0;i<3;i++)x.fillText('+',cx-gap/2-2,cy-6+i*7);
      x.fillStyle='rgba(140,211,232,'+charge+')';
      for(let i=0;i<3;i++)x.fillText('−',cx+gap/2+2,cy-6+i*7);
      x.textAlign='left';
    }
    x.fillStyle='#9ca7c2';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText(charge>0.95?'charged':'charging '+Math.round(charge*100)+'%',cx,cy+28);x.textAlign='left';
  }else if(slot.type==='led'){
    const curr=computeCircuitCurrent().current;const bright=Math.min(1,curr/0.02);
    if(bright>0.01){
      const g=x.createRadialGradient(cx,cy,5,cx,cy,38);
      g.addColorStop(0,'rgba(240,149,74,'+(0.2+bright*0.6)+')');g.addColorStop(1,'rgba(240,149,74,0)');
      x.fillStyle=g;x.beginPath();x.arc(cx,cy,38,0,Math.PI*2);x.fill();
    }
    x.fillStyle='rgba(255,200,100,'+(0.5+bright*0.5)+')';x.beginPath();
    x.moveTo(cx-16,cy-14);x.lineTo(cx-16,cy+14);x.lineTo(cx+10,cy);x.closePath();x.fill();
    x.strokeStyle='#edf2f7';x.lineWidth=2;x.beginPath();x.moveTo(cx+10,cy-14);x.lineTo(cx+10,cy+14);x.stroke();
    x.strokeStyle='rgba(240,149,74,.8)';x.lineWidth=2;[[-4,-6],[6,-12]].forEach(o=>{x.beginPath();x.moveTo(cx+o[0],cy-20+o[1]);x.lineTo(cx+o[0]+10,cy-32+o[1]);x.stroke();});
    x.fillStyle='#9ca7c2';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';x.fillText('LED',cx,cy+28);x.textAlign='left';
  }
}


function mountLabSimulation(type){
  benchRelease();
  labAnim.gen++;
  if(AnimationManager.callbacks.has('lab'))AnimationManager.unregister('lab');
  const model=LAB_MODELS[type];
  labState={type,values:{},prediction:null,t:0,y:60,flightT:0,angle:0,particles:[0,0.33,0.66],servoAngle:90,waveOffset:0,pwmT:0,circuit:null};
  if(model.controls)model.controls.forEach(c=>{labState.values[c[0]]=c[4];});
  const workspace=document.getElementById('labWorkspace');

  if(type==='circuit'){
    labState.circuit={slots:[null,null,null],palette:'resistor',capCharge:[0,0,0],burstParticles:[],burstFlash:0,currentT:0};
    labState.values.voltage=5;
    workspace.innerHTML=`<div class="lab-grid">
      <aside class="lab-side">
        <div class="card-meta">COMPONENT PALETTE</div>
        <div class="circuit-palette">
          <button class="palette-btn active" data-comp="resistor"><span class="pal-icon">⋟</span>Resistor (220Ω)</button>
          <button class="palette-btn" data-comp="inductor"><span class="pal-icon">∿</span>Inductor (50Ω)</button>
          <button class="palette-btn" data-comp="capacitor"><span class="pal-icon">∥</span>Capacitor</button>
          <button class="palette-btn" data-comp="led"><span class="pal-icon">▷</span>LED (max 30mA)</button>
          <button class="palette-btn" data-comp="clear"><span class="pal-icon">✕</span>Clear Slot</button>
        </div>
        <div class="lab-control"><label><span>Voltage</span><strong id="v_voltage">5.0</strong></label><input id="i_voltage" type="range" min="1" max="12" step="0.5" value="5"></div>
        <div class="lab-actions"><button class="action secondary" id="labResetBtn">Reset Circuit</button></div>
        <div style="margin-top:14px;font:11px 'IBM Plex Mono',monospace;color:var(--muted);line-height:1.65">
          <strong style="color:var(--silver)">How to use:</strong><br>
          1. Pick a component from the palette.<br>
          2. Click a slot on the wire to place it.<br>
          3. Pick "Clear Slot" then click to remove.<br>
          4. LED alone with high V = <strong style="color:var(--danger)">burst!</strong><br>
          5. Add a resistor to protect the LED.
        </div>
      </aside>
      <section class="lab-stage">
        <div class="lab-title">${model.title}</div>
        <p class="lab-desc">${model.desc}</p>
        <canvas id="activeLabCanvas" width="720" height="390" style="cursor:crosshair"></canvas>
      </section>
      <aside class="lab-observe">
        <div class="card-meta">OBSERVE</div>
        <div class="lab-readout" id="labReadout">— mA</div>
        <div class="lab-message" id="labMessage">Add components to the slots on the wire.</div>
      </aside>
    </div>`;
    workspace.querySelectorAll('.palette-btn').forEach(btn=>{
      btn.onclick=()=>{workspace.querySelectorAll('.palette-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');labState.circuit.palette=btn.dataset.comp;};
    });
    const vi=document.getElementById('i_voltage');
    vi.addEventListener('input',()=>{labState.values.voltage=+vi.value;document.getElementById('v_voltage').textContent=labState.values.voltage.toFixed(1);});
    document.getElementById('labResetBtn').onclick=()=>mountLabSimulation('circuit');
    const cv=document.getElementById('activeLabCanvas');
    cv.onclick=(e)=>{
      const r=cv.getBoundingClientRect();const cx=(e.clientX-r.left)*(cv.width/r.width);const cy=(e.clientY-r.top)*(cv.height/r.height);
      for(let i=0;i<3;i++){if(Math.abs(cx-CIRCUIT_SLOTS[i].x)<55&&Math.abs(cy-CIRCUIT_SLOTS[i].y)<35){
        const ct=labState.circuit.palette;
        if(ct==='clear'){labState.circuit.slots[i]=null;labState.circuit.capCharge[i]=0;}
        else{labState.circuit.slots[i]={type:ct,burned:false};labState.circuit.capCharge[i]=0;}
        return;
      }}
    };
  }else{
    let codeHtml='';
    if(model.code)codeHtml='<pre class="lab-code">'+model.code+'</pre>';
    workspace.innerHTML=`<div class="lab-grid">
      <aside class="lab-side">
        <div class="card-meta">VARIABLES</div>
        ${model.controls.map(c=>'<div class="lab-control"><label><span>'+c[1]+'</span><strong id="v_'+c[0]+'">'+c[4]+'</strong></label><input id="i_'+c[0]+'" type="range" min="'+c[2]+'" max="'+c[3]+'" step="'+c[5]+'" value="'+c[4]+'"></div>').join('')}
        <div class="lab-actions"><button class="action" id="labPredictBtn">Predict</button><button class="action secondary" id="labResetBtn">Reset</button></div>
      </aside>
      <section class="lab-stage">
        <div class="lab-title">${model.title}</div>
        <p class="lab-desc">${model.desc}</p>
        <canvas id="activeLabCanvas" width="720" height="390"></canvas>
        ${codeHtml}
      </section>
      <aside class="lab-observe">
        <div class="card-meta">OBSERVE</div>
        <div class="lab-readout" id="labReadout">Ready</div>
        <div class="lab-message" id="labMessage">Move a slider and watch what changes.</div>
        <div class="card-meta" style="margin-top:18px">TIP</div>
        <div class="lab-message">Hit Predict, then move a slider and see how close you were.</div>
      </aside>
    </div>`;
    model.controls.forEach(c=>{
      document.getElementById('i_'+c[0]).addEventListener('input',()=>{
        labState.values[c[0]]=+document.getElementById('i_'+c[0]).value;
        document.getElementById('v_'+c[0]).textContent=labState.values[c[0]];
      });
    });
    document.getElementById('labPredictBtn').onclick=()=>{labState.prediction=labReadoutValue();document.getElementById('labMessage').textContent='Guess saved. Now move a slider and compare.';};
    document.getElementById('labResetBtn').onclick=()=>mountLabSimulation(type);
  }
  const canvas=document.getElementById('activeLabCanvas');
  watchSimCanvas(canvas,'lab');
  AnimationManager.register('lab',()=>{
    if(!document.body.contains(canvas)){AnimationManager.unregister('lab');return;}
    const lv=document.getElementById('view-lab');
    if(lv&&lv.classList.contains('active')){labState.t+=1/60;drawActiveLab();}
  },canvas);
}

function labReadoutValue(){
  const v=labState.values;
  switch(labState.type){
    case'gravity':return v.mass/v.distance;
    case'projectile':return v.speed*Math.sin(v.angle*Math.PI/180);
    case'pendulum':return 2*Math.PI*Math.sqrt((v.length/100)/v.gravity);
    case'circuit':return computeCircuitCurrent().current;
    case'orbit':return v.velocity/Math.sqrt(v.radius);
    case'waves':return v.frequency*v.amplitude;
    case'servo':return v.angle;
    case'pwm':return v.duty/100*5;
    case'buzzer':return v.frequency;
  }
}

function drawActiveLab(){
  const c=document.getElementById('activeLabCanvas');if(!c)return;
  const x=c.getContext('2d'),w=c.width,h=c.height;
  x.clearRect(0,0,w,h);x.fillStyle='#020617';x.fillRect(0,0,w,h);
  const v=labState.values;

  if(labState.type==='gravity'){
    const cx=360,topY=60,botY=340;
    const g=x.createRadialGradient(cx,botY,5,cx,botY,140+v.mass*8);g.addColorStop(0,'rgba(94,234,212,.35)');g.addColorStop(1,'rgba(94,234,212,0)');
    x.fillStyle=g;x.beginPath();x.arc(cx,botY,140+v.mass*8,0,Math.PI*2);x.fill();
    x.fillStyle='#d4b16a';x.beginPath();x.arc(cx,botY,30+v.mass*3,0,Math.PI*2);x.fill();
    const pull=v.mass/(v.distance/50);labState.y+=pull*0.9;if(labState.y>botY-20)labState.y=topY;
    x.fillStyle='#5eead4';x.beginPath();x.arc(cx,labState.y,10,0,Math.PI*2);x.fill();
    x.strokeStyle='rgba(215,220,229,.2)';x.setLineDash([4,6]);x.beginPath();x.moveTo(cx,topY);x.lineTo(cx,botY-20);x.stroke();x.setLineDash([]);
  }
  else if(labState.type==='projectile'){
    const ground=330,base=70,scale=2.1;const angleRad=v.angle*Math.PI/180;
    const vx=v.speed*13*Math.cos(angleRad),vy=v.speed*13*Math.sin(angleRad);
    x.strokeStyle='rgba(215,220,229,.28)';x.beginPath();x.moveTo(40,ground);x.lineTo(680,ground);x.stroke();
    x.strokeStyle='rgba(94,234,212,.18)';x.beginPath();
    for(let t=0;t<3;t+=.03){const px=base+vx*t*scale,py=ground-(vy*t-4.9*t*t)*scale;if(px>680||py>ground)break;t===0?x.moveTo(px,py):x.lineTo(px,py);}x.stroke();
    labState.flightT+=1/60;const t=labState.flightT;const px=base+vx*t*scale,py=ground-(vy*t-4.9*t*t)*scale;
    if(py>ground||px>680)labState.flightT=0;
    x.fillStyle='#d4b16a';x.beginPath();x.arc(px,Math.min(py,ground),9,0,Math.PI*2);x.fill();
    x.fillStyle='rgba(212,177,106,.4)';x.beginPath();x.arc(base,ground,6,0,Math.PI*2);x.fill();
  }
  else if(labState.type==='pendulum'){
    const ox=360,oy=70,len=v.length;const omega=Math.sqrt(v.gravity/(len/100));const angle=0.6*Math.sin(omega*labState.t);
    const bx=ox+Math.sin(angle)*len,by=oy+Math.cos(angle)*len;
    x.fillStyle='#d4b16a';x.fillRect(ox-45,oy-4,90,8);
    x.strokeStyle='rgba(215,220,229,.4)';x.beginPath();x.moveTo(ox,oy);x.lineTo(bx,by);x.stroke();
    x.fillStyle='#c9a7f0';x.beginPath();x.arc(bx,by,18,0,Math.PI*2);x.fill();
  }
  else if(labState.type==='circuit'){
    const ci=labState.circuit;const V=labState.values.voltage;
    const result=computeCircuitCurrent();const current=result.current;
    for(let i=0;i<3;i++){if(ci.slots[i]&&CIRCUIT_COMPONENTS[ci.slots[i].type].isCapacitor)ci.capCharge[i]=Math.min(1,ci.capCharge[i]+0.008);}
    if(result.ledIndex>=0){const slot=ci.slots[result.ledIndex];if(slot&&!slot.burned&&current>CIRCUIT_COMPONENTS.led.maxCurrent){
      slot.burned=true;ci.burstFlash=1;const sp=CIRCUIT_SLOTS[result.ledIndex];
      for(let i=0;i<25;i++){const a=Math.random()*Math.PI*2,s=2+Math.random()*5;ci.burstParticles.push({x:sp.x,y:sp.y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-1,life:1,size:2+Math.random()*3});}
    }}
    const batteryX=100,topY=135,botY=280;const leftX=batteryX+40,rightX=620;const batCY=(topY+botY)/2;
    x.strokeStyle='rgba(215,220,229,.6)';x.lineWidth=3;
    x.beginPath();x.moveTo(leftX,topY);x.lineTo(CIRCUIT_SLOTS[0].x-40,topY);x.stroke();
    x.beginPath();x.moveTo(CIRCUIT_SLOTS[0].x+40,topY);x.lineTo(CIRCUIT_SLOTS[1].x-40,topY);x.stroke();
    x.beginPath();x.moveTo(CIRCUIT_SLOTS[1].x+40,topY);x.lineTo(CIRCUIT_SLOTS[2].x-40,topY);x.stroke();
    x.beginPath();x.moveTo(CIRCUIT_SLOTS[2].x+40,topY);x.lineTo(rightX,topY);x.stroke();
    x.beginPath();x.moveTo(rightX,topY);x.lineTo(rightX,botY);x.stroke();
    x.beginPath();x.moveTo(rightX,botY);x.lineTo(leftX,botY);x.stroke();
    x.beginPath();x.moveTo(leftX,topY);x.lineTo(leftX,batCY-25);x.stroke();
    x.beginPath();x.moveTo(leftX,batCY+25);x.lineTo(leftX,botY);x.stroke();
    x.fillStyle='#d4b16a';x.fillRect(leftX-15,batCY-22,30,4);x.fillRect(leftX-8,batCY+18,16,4);
    x.fillStyle='#9ca7c2';x.font='11px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('+',leftX-22,batCY-18);x.fillText('−',leftX-22,batCY+22);x.fillText(V.toFixed(1)+'V',leftX,batCY+45);x.textAlign='left';
    for(let i=0;i<3;i++)drawCircuitComponent(x,CIRCUIT_SLOTS[i].x,CIRCUIT_SLOTS[i].y,ci.slots[i],i);
    if(current>0.001){
      ci.currentT=(ci.currentT+current*0.5)%1;
      const path=[{x:leftX,y:batCY+25},{x:leftX,y:topY},{x:CIRCUIT_SLOTS[0].x-40,y:topY},{x:CIRCUIT_SLOTS[0].x+40,y:topY},{x:CIRCUIT_SLOTS[1].x-40,y:topY},{x:CIRCUIT_SLOTS[1].x+40,y:topY},{x:CIRCUIT_SLOTS[2].x-40,y:topY},{x:CIRCUIT_SLOTS[2].x+40,y:topY},{x:rightX,y:topY},{x:rightX,y:botY},{x:leftX,y:botY},{x:leftX,y:batCY-25}];
      for(let p=0;p<6;p++){const t=(ci.currentT+p/6)%1;const pos=pathPointAt(path,t);x.fillStyle='#5eead4';x.beginPath();x.arc(pos.x,pos.y,4,0,Math.PI*2);x.fill();}
    }
    if(ci.burstFlash>0){x.fillStyle='rgba(255,200,100,'+ci.burstFlash*0.3+')';x.fillRect(0,0,w,h);ci.burstFlash-=0.05;}
    for(let i=ci.burstParticles.length-1;i>=0;i--){const p=ci.burstParticles[i];p.x+=p.vx;p.y+=p.vy;p.vy+=0.2;p.life-=0.02;
      if(p.life<=0){ci.burstParticles.splice(i,1);continue;}
      x.fillStyle='rgba(255,'+Math.floor(100+p.life*100)+','+Math.floor(50*p.life)+','+p.life+')';
      x.beginPath();x.arc(p.x,p.y,p.size*p.life,0,Math.PI*2);x.fill();}
    const ro=document.getElementById('labReadout'),msg=document.getElementById('labMessage');
    if(ro){if(result.reason==='burned')ro.textContent='0 mA';else if(result.reason==='no-components')ro.textContent='— mA';else ro.textContent=(current*1000).toFixed(1)+' mA';}
    if(msg){let m='';
      if(result.reason==='burned')m='⚠ LED BURST! Current exceeded 30mA. Clear the burned LED and add a resistor to protect the next one.';
      else if(result.reason==='no-components')m='No components in circuit. Pick one from the palette and click a slot.';
      else if(result.hasCap)m='Capacitor '+Math.round(labState.circuit.capCharge[result.capIdx]*100)+'% charged. Current falling as it charges up.';
      else if(result.ledIndex>=0){const lc=current*1000;if(lc>25)m='⚠ LED at '+lc.toFixed(1)+'mA — approaching 30mA limit!';else m='LED safe at '+lc.toFixed(1)+'mA (max 30mA). Total R = '+result.R_total+'Ω.';}
      else m='I = V/R = '+V.toFixed(1)+'/'+result.R_total+'Ω = '+(current*1000).toFixed(1)+'mA';
      msg.textContent=m;}
  }
  else if(labState.type==='orbit'){
    const cx=360,cy=205,r=v.radius;
    x.strokeStyle='rgba(212,177,106,.25)';x.beginPath();x.arc(cx,cy,r,0,Math.PI*2);x.stroke();
    x.fillStyle='#d4b16a';x.beginPath();x.arc(cx,cy,25,0,Math.PI*2);x.fill();
    const as=(v.velocity/Math.sqrt(v.radius))*0.02;labState.angle+=as;
    x.fillStyle='#5eead4';x.beginPath();x.arc(cx+Math.cos(labState.angle)*r,cy+Math.sin(labState.angle)*r,9,0,Math.PI*2);x.fill();
    x.strokeStyle='rgba(94,234,212,.35)';x.beginPath();x.arc(cx,cy,r,labState.angle-0.5,labState.angle);x.stroke();
    document.getElementById('labReadout').textContent=(v.velocity/Math.sqrt(v.radius)).toFixed(2);
  }
  else if(labState.type==='waves'){
    const speed=2.4;const phase=labState.t*speed;
    x.strokeStyle='#5eead4';x.beginPath();
    for(let px=30;px<=690;px+=3){const py=205+Math.sin((px-30)/55*v.frequency-phase)*v.amplitude*1.2;px===30?x.moveTo(px,py):x.lineTo(px,py);}x.stroke();
    document.getElementById('labReadout').textContent=(v.frequency*v.amplitude).toFixed(2);
  }

  /* ====== SERVO MOTOR ====== */
  else if(labState.type==='servo'){
    const target=labState.values.angle;
    labState.servoAngle+=(target-labState.servoAngle)*0.08;
    const cx=w/2,cy=h/2+40;
    // PWM signal strip at top
    const pwmY=30,pwmH=44;
    x.strokeStyle='#5eead4';x.lineWidth=2;x.beginPath();
    const period=120;const pulseW=20+(labState.servoAngle/180)*40;
    let lastHigh=false;
    for(let px=20;px<=w-20;px++){
      const ph=(px-20)%period;const isHigh=ph<pulseW;
      if(px===20){x.moveTo(px,pwmY+(isHigh?0:pwmH));}
      else{if(isHigh!==lastHigh)x.lineTo(px,pwmY+(lastHigh?0:pwmH));x.lineTo(px,pwmY+(isHigh?0:pwmH));}
      lastHigh=isHigh;
    }
    x.stroke();
    x.fillStyle='#9ca7c2';x.font='10px IBM Plex Mono,monospace';x.textAlign='left';
    x.fillText('PWM 50Hz — pulse '+(1+labState.servoAngle/180).toFixed(2)+'ms of 20ms',20,20);
    // Servo body
    x.fillStyle='#0c1330';x.fillRect(cx-55,cy-45,110,90);
    x.strokeStyle='#d4b16a';x.lineWidth=2;x.strokeRect(cx-55,cy-45,110,90);
    x.fillStyle='#9ca7c2';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('SERVO',cx,cy-30);x.textAlign='left';
    // Mounting flanges
    x.fillStyle='#0c1330';x.fillRect(cx-70,cy-40,15,30);x.fillRect(cx+55,cy-40,15,30);
    x.strokeStyle='rgba(215,220,229,.3)';x.strokeRect(cx-70,cy-40,15,30);x.strokeRect(cx+55,cy-40,15,30);
    // Shaft
    x.fillStyle='#9ca7c2';x.beginPath();x.arc(cx,cy,8,0,Math.PI*2);x.fill();
    // Arm
    const armA=(labState.servoAngle-90)*Math.PI/180;
    x.strokeStyle='#f0954a';x.lineWidth=7;x.lineCap='round';
    x.beginPath();x.moveTo(cx,cy);x.lineTo(cx+Math.cos(armA)*72,cy+Math.sin(armA)*72);x.stroke();
    x.lineCap='butt';
    // Arc guide
    x.strokeStyle='rgba(94,234,212,.2)';x.lineWidth=1;x.beginPath();x.arc(cx,cy,82,-Math.PI,0);x.stroke();
    // Angle marks
    x.fillStyle='#9ca7c2';x.font='10px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('0°',cx-90,cy+4);x.fillText('90°',cx,cy-88);x.fillText('180°',cx+90,cy+4);x.textAlign='left';
    // Update code + readout
    const cv=document.getElementById('codeServoVal');if(cv)cv.textContent=Math.round(labState.servoAngle);
    document.getElementById('labReadout').textContent=Math.round(labState.servoAngle)+'°';
    document.getElementById('labMessage').textContent='Pulse width '+(1+labState.servoAngle/180).toFixed(2)+' ms → '+Math.round(labState.servoAngle)+'°. The servo holds this angle as long as the pulses keep coming.';
  }

  /* ====== PWM ====== */
  else if(labState.type==='pwm'){
    const freq=labState.values.frequency,duty=labState.values.duty;
    // Signal waveform
    const sigY=40,sigH=70;
    x.strokeStyle='#5eead4';x.lineWidth=2;x.beginPath();
    const periodPx=240/freq;const highPx=periodPx*(duty/100);
    let lastHigh=false;
    for(let px=20;px<=w-20;px++){
      const ph=(px-20)%periodPx;const isHigh=ph<highPx;
      if(px===20){x.moveTo(px,sigY+(isHigh?0:sigH));}
      else{if(isHigh!==lastHigh)x.lineTo(px,sigY+(lastHigh?0:sigH));x.lineTo(px,sigY+(isHigh?0:sigH));}
      lastHigh=isHigh;
    }
    x.stroke();
    // Average line
    const avgY=sigY+sigH*(1-duty/100);
    x.strokeStyle='rgba(212,177,106,.5)';x.setLineDash([5,5]);x.beginPath();x.moveTo(20,avgY);x.lineTo(w-20,avgY);x.stroke();x.setLineDash([]);
    x.fillStyle='#d4b16a';x.font='10px IBM Plex Mono,monospace';
    x.fillText('avg '+((5*duty/100).toFixed(2))+'V',w-90,avgY-5);
    x.fillStyle='#9ca7c2';x.fillText('Duty cycle '+duty.toFixed(0)+'%  (on '+(duty/100*100).toFixed(0)+'% of the time)',20,22);
    // LED
    const ledX=w/2,ledY=h-80;const bright=duty/100;
    const g=x.createRadialGradient(ledX,ledY,5,ledX,ledY,75);
    g.addColorStop(0,'rgba(212,177,106,'+(0.15+bright*0.7)+')');g.addColorStop(1,'rgba(212,177,106,0)');
    x.fillStyle=g;x.beginPath();x.arc(ledX,ledY,75,0,Math.PI*2);x.fill();
    x.fillStyle='rgba(255,220,150,'+(0.4+bright*0.6)+')';x.beginPath();
    x.moveTo(ledX-20,ledY-18);x.lineTo(ledX-20,ledY+18);x.lineTo(ledX+15,ledY);x.closePath();x.fill();
    x.strokeStyle='#edf2f7';x.lineWidth=2;x.beginPath();x.moveTo(ledX+15,ledY-18);x.lineTo(ledX+15,ledY+18);x.stroke();
    x.fillStyle='#9ca7c2';x.font='11px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('LED brightness = duty cycle',ledX,ledY+50);x.textAlign='left';
    // Update code + readout
    const cv=document.getElementById('codePwmVal');if(cv)cv.textContent=Math.round(duty/100*255);
    document.getElementById('labReadout').textContent=duty.toFixed(0)+'% / avg '+(5*duty/100).toFixed(2)+'V';
    document.getElementById('labMessage').textContent='analogWrite value 0–255 → '+Math.round(duty/100*255)+'. LED gets full voltage '+duty.toFixed(0)+'% of the time, averages '+((5*duty/100).toFixed(2))+'V.';
  }

  /* ====== BUZZER & SOUND WAVES ====== */
  else if(labState.type==='buzzer'){
    const freq=labState.values.frequency,amp=labState.values.amplitude;
    labState.waveOffset+=freq*0.04;
    // Waveform at top
    const waveY=45,waveH=50;
    x.strokeStyle='#5eead4';x.lineWidth=2;x.beginPath();
    for(let px=20;px<=w-20;px+=2){
      const py=waveY+waveH/2+Math.sin((px-20)/(3000/freq)-labState.waveOffset)*(amp/100)*waveH/2;
      if(px===20)x.moveTo(px,py);else x.lineTo(px,py);
    }
    x.stroke();
    x.fillStyle='#9ca7c2';x.font='10px IBM Plex Mono,monospace';
    x.fillText(freq.toFixed(0)+'Hz',20,20);
    // Buzzer body
    const bx=150,by=h-110;
    x.fillStyle='#0c1330';x.beginPath();x.arc(bx,by,36,0,Math.PI*2);x.fill();
    x.strokeStyle='#d4b16a';x.lineWidth=2;x.stroke();
    // Vibrating piezo disc
    const pulse=1+Math.sin(labState.waveOffset*2)*(amp/100)*0.15;
    x.fillStyle='#f0954a';x.beginPath();x.arc(bx,by,20*pulse,0,Math.PI*2);x.fill();
    x.fillStyle='#9ca7c2';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';x.fillText('piezo',bx,by+3);x.textAlign='left';
    // Sound waves emanating
    for(let i=0;i<6;i++){
      const ph=((labState.waveOffset+i*0.5)%2);
      const radius=42+ph*140;const alpha=(1-ph/2)*(amp/100)*0.7;
      x.strokeStyle='rgba(94,234,212,'+alpha+')';x.lineWidth=2;
      x.beginPath();x.arc(bx,by,radius,-Math.PI*0.45,Math.PI*0.45);x.stroke();
    }
    // Air particles (compressions & rarefactions)
    for(let i=0;i<20;i++){
      const ph=((labState.waveOffset*0.3+i*0.15)%1);
      const px=bx+50+ph*440;const py=by+Math.sin(ph*Math.PI*2*freq/200)*8*(amp/100);
      const alpha=(1-ph)*(amp/100)*0.6;
      x.fillStyle='rgba(212,177,106,'+alpha+')';x.fillRect(px,py,3,3);
    }
    // Compression labels
    x.fillStyle='rgba(94,234,212,.5)';x.font='9px IBM Plex Mono,monospace';x.textAlign='center';
    x.fillText('→ compressions travel outward →',bx+250,by-50);x.textAlign='left';
    // Nearest note
    const notes=[{f:262,n:'C4'},{f:294,n:'D4'},{f:330,n:'E4'},{f:349,n:'F4'},{f:392,n:'G4'},{f:440,n:'A4'},{f:494,n:'B4'},{f:523,n:'C5'}];
    let note='~',minD=Infinity;
    for(const nn of notes){const d=Math.abs(nn.f-freq);if(d<minD){minD=d;note=nn.n;}}
    if(minD>30)note='~';
    document.getElementById('labReadout').textContent=freq.toFixed(0)+'Hz';
    document.getElementById('labMessage').textContent='Pitch '+freq.toFixed(0)+'Hz'+(minD<30?' (≈ '+note+')':'')+'. Period '+(1000/freq).toFixed(2)+'ms. Higher frequency = higher pitch. Higher amplitude = louder.';
  }

  if(['gravity','projectile','pendulum'].includes(labState.type)){
    const m=labReadoutValue();
    const ro=document.getElementById('labReadout');
    if(ro) ro.textContent=labState.type==='gravity' ? m.toFixed(3) : m.toFixed(2);
  }

  // Prediction feedback
  if(labState.prediction!==null&&labState.type!=='circuit'){
    const metric=labReadoutValue();
    const pe=document.getElementById('labMessage');
    if(pe)pe.textContent=Math.abs(labState.prediction-metric)<Math.max(.05,Math.abs(metric)*.1)?'✓ Nice, your guess was close.':'△ Your guess was off. Try again.';
  }
}

function renderProgress(){
  const root=document.getElementById('view-progress'); const visible=LESSONS.filter(l=>!l.locked);
  const done=visible.filter(l=>completed.includes(l.id));
  const next=visible.find(l=>!completed.includes(l.id));
  const groups=SUBJECTS.map(s=>{
    const list=visible.filter(l=>l.subject===s.id);
    const n=list.filter(l=>completed.includes(l.id)).length;
    const rows=list.map(l=>{
      const d=completed.includes(l.id);
      return `<div class="panel-card clickable progress-row${d?' is-done':''}" role="button" tabindex="0" data-open-topic="${l.id}" aria-label="Open ${safeText(l.title)}"><div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><div><div class="card-title">${safeText(l.title)}</div><div style="margin-top:4px">${masteryChip(l.id)}${scores[l.id]?` <span class="card-meta" style="margin-left:6px">BEST ${scores[l.id].best}/${scores[l.id].total}</span>`:''}</div></div><div class="card-meta progress-open">OPEN →</div></div><div style="margin-top:13px" class="bar-fill"><span style="width:${d?100:0}%"></span></div></div>`;
    }).join('');
    return `<section style="margin-top:28px"><div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;margin-bottom:12px"><h2 style="font:26px Fraunces,Georgia,serif;margin:0;color:var(--text)">${s.name}</h2><div class="card-meta">${n} / ${list.length} DISCOVERED • ${list.filter(l=>masteryLevel(l.id)>=3).length} MASTERED</div></div><div class="grid grid-3">${rows}</div></section>`;
  }).join('');
  root.innerHTML=`<div class="view-head"><div><div class="eyebrow">PROGRESS</div><h1>Your progress</h1><p class="view-sub">Topics you have discovered so far. Click any topic to jump straight to it.</p></div></div>
  <div class="grid grid-4">
    <div class="panel-card"><div class="card-meta">DISCOVERED</div><div class="metric">${done.length} / ${visible.length}</div></div>
    <div class="panel-card"><div class="card-meta">MASTERED</div><div class="metric">${visible.filter(l=>masteryLevel(l.id)>=3).length} / ${visible.length}</div></div>
    <div class="panel-card ${next?'clickable':''}" ${next?`role="button" tabindex="0" data-open-topic="${next.id}"`:''}><div class="card-meta">UP NEXT${next?' • OPEN →':''}</div><div class="metric">${next?safeText(next.title):'All done'}</div></div>
    <div class="panel-card"><div class="card-meta">TIME THIS SESSION</div><div class="metric">${document.getElementById('timer').textContent}</div></div>
  </div>${groups}`;
}

function renderProfile(){
  const visible=LESSONS.filter(l=>!l.locked);
  const cards=SUBJECTS.map(s=>{
    const list=visible.filter(l=>l.subject===s.id);
    const n=list.filter(l=>completed.includes(l.id)).length;
    const pct=list.length?Math.round(n/list.length*100):0;
    return `<div class="panel-card clickable" role="button" tabindex="0" data-open-subject="${s.id}"><div class="card-meta">${s.name.toUpperCase()}</div><div class="metric">${n} / ${list.length}</div><div class="card-meta" style="margin-top:6px">${list.filter(l=>masteryLevel(l.id)>=3).length} MASTERED</div><div class="bar-fill" style="margin-top:10px"><span style="width:${pct}%"></span></div></div>`;
  }).join('');
  document.getElementById('view-profile').innerHTML=`<div class="view-head"><div><div class="eyebrow">PROFILE</div><h1>Your profile</h1><p class="view-sub">Your progress is saved in this browser.</p></div></div>
  <div class="grid grid-3">${cards}</div>
  <div style="margin-top:26px" id="resetArea"><button class="action secondary" id="resetProgressBtn" type="button">Reset progress</button></div>`;
  const area=document.getElementById('resetArea');
  document.getElementById('resetProgressBtn').onclick=()=>{
    area.innerHTML=`<div class="panel-card" style="max-width:520px" role="alertdialog" aria-label="Confirm reset"><div class="card-title">Clear all progress?</div><p class="view-sub" style="margin:8px 0 16px">Every topic you have discovered will go back to "not yet". This can't be undone.</p><div style="display:flex;gap:10px;flex-wrap:wrap"><button class="action" id="confirmResetBtn" type="button">Yes, reset everything</button><button class="action secondary" id="cancelResetBtn" type="button">Cancel</button></div></div>`;
    document.getElementById('cancelResetBtn').onclick=renderProfile;
    document.getElementById('confirmResetBtn').onclick=()=>{ resetAllProgress(); showToast('Progress cleared'); };
    document.getElementById('cancelResetBtn').focus();
  };
}

