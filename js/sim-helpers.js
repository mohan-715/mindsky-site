/* ---------- SIMULATION REGISTRY ----------
   Each simulation registers a single function with AnimationManager.
   The manager handles visibility-based pausing and tab-hidden pausing.
   -------------------------------------------------- */
/* ---------- MATHS SIMULATION HELPERS ---------- */
const MC={ gold:"#d4b16a", teal:"#5eead4", violet:"#c9a7f0", text:"#edf2f7", muted:"#9ca7c2", rose:"#fb7185", axis:"rgba(215,220,229,.45)", grid:"rgba(215,220,229,.09)" };
const MSUP="⁰¹²³⁴⁵⁶⁷⁸⁹";
function mText(g,s,x,y,color,size,align){ g.fillStyle=color||MC.text; g.font=(size||13)+"px 'IBM Plex Mono',monospace"; g.textAlign=align||"left"; g.fillText(s,x,y); }
function mGcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ const t=a%b; a=b; b=t; } return a; }
function mFmt(n,d){ if(!isFinite(n)) return "undefined"; let s=Number(n).toFixed(d===undefined?2:d); if(s.indexOf(".")>-1) s=s.replace(/0+$/,"").replace(/\.$/,""); if(s==="-0") s="0"; return s.replace("-","−"); }
function mBig(n){ return Math.abs(n)>=1e9 ? n.toExponential(2).replace("e+"," × 10^") : Number(n).toLocaleString("en-US"); }
function mSup(n){ return String(n).split("").map(ch=>MSUP[+ch]).join(""); }
function mFactorize(n){ const f=[]; let m=n; for(let p=2;p*p<=m;p++){ let k=0; while(m%p===0){ m/=p; k++; } if(k) f.push([p,k]); } if(m>1) f.push([m,1]); return f; }
function mFactString(n){ const f=mFactorize(n); return f.map(function(pk){ return pk[1]>1 ? pk[0]+mSup(pk[1]) : String(pk[0]); }).join(" × "); }
function mLineEq(m,c){ if(m===0) return "y = "+mFmt(c); let s="y = "+(m===1?"":(m===-1?"−":mFmt(m)))+"x"; if(c>0) s+=" + "+mFmt(c); else if(c<0) s+=" − "+mFmt(-c); return s; }
function mArrow(g,x1,y1,x2,y2,color){ g.strokeStyle=color; g.fillStyle=color; g.lineWidth=2; g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); const a=Math.atan2(y2-y1,x2-x1); g.beginPath(); g.moveTo(x2,y2); g.lineTo(x2-9*Math.cos(a-0.4),y2-9*Math.sin(a-0.4)); g.lineTo(x2-9*Math.cos(a+0.4),y2-9*Math.sin(a+0.4)); g.closePath(); g.fill(); }
/* Draws a labelled coordinate grid. ox,oy = pixel position of the origin; ux,uy = pixels per unit; clip rectangle (0,0,cw,ch). */
function mGrid(g,ox,oy,ux,uy,cw,ch,step){
  step=step||1;
  g.save(); g.beginPath(); g.rect(0,0,cw,ch); g.clip();
  g.lineWidth=1; g.strokeStyle=MC.grid;
  for(let x=Math.ceil(-ox/ux);x*ux+ox<=cw;x+=step){ g.beginPath(); g.moveTo(ox+x*ux,0); g.lineTo(ox+x*ux,ch); g.stroke(); }
  for(let y=Math.ceil(-(ch-oy)/uy);oy-y*uy>=0;y+=step){ g.beginPath(); g.moveTo(0,oy-y*uy); g.lineTo(cw,oy-y*uy); g.stroke(); }
  g.strokeStyle=MC.axis; g.lineWidth=1.5;
  g.beginPath(); g.moveTo(0,oy); g.lineTo(cw,oy); g.stroke();
  g.beginPath(); g.moveTo(ox,0); g.lineTo(ox,ch); g.stroke();
  g.fillStyle=MC.muted; g.font="10px 'IBM Plex Mono',monospace"; g.textAlign="center";
  const nice=function(v){ return [1,2,5,10,20,50,100].find(function(q){ return q>=v; })||100; };
  const tick=nice(38/ux);
  for(let x=Math.ceil(-ox/ux/tick)*tick;x*ux+ox<cw;x+=tick){ if(x!==0) g.fillText(String(x).replace("-","−"),ox+x*ux,Math.min(ch-4,oy+14)); }
  g.textAlign="right";
  const tickY=nice(26/uy);
  for(let y=Math.ceil(-(ch-oy)/uy/tickY)*tickY;oy-y*uy>0;y+=tickY){ if(y!==0) g.fillText(String(y).replace("-","−"),Math.max(24,ox-6),oy-y*uy+3); }
  g.restore();
}
function simFrame(key, canvasId, draw, animated){
  const c=document.getElementById(canvasId); if(!c) return;
  const ctx=c.getContext("2d"); watchSimCanvas(c,key);
  const box=c.closest(".simulator");
  const get=function(id){ const el=document.getElementById(id); return el?Number(el.value):0; };
  const say=function(id,txt){ const el=document.getElementById(id); if(el && el.textContent!==txt) el.textContent=txt; };
  let last=null;
  AnimationManager.register(key, function(t){
    if(!document.body.contains(c)){ AnimationManager.unregister(key); return; }
    if(!animated){
      const sig=box ? Array.prototype.map.call(box.querySelectorAll("input"),function(i){ return i.value+"|"+i.max; }).join(",") : "";
      if(sig===last) return; last=sig;
    }
    ctx.clearRect(0,0,c.width,c.height);
    draw(ctx,c.width,c.height,t,get,say);
  }, c);
}

/* ===== CHEMISTRY HELPERS ===== */
const CH={ green:"#9be36d", greenSoft:"rgba(155,227,109,.18)" };
function chSubs(s){ return String(s).replace(/[0-9]/g,function(d){ return "₀₁₂₃₄₅₆₇₈₉"[+d]; }); }
function chSup(n){ return String(n).split("").map(function(c){ return c==="-"?"⁻":"⁰¹²³⁴⁵⁶⁷⁸⁹"[+c]; }).join(""); }
function chSci(x){ if(x===0) return "0"; const e=Math.floor(Math.log10(x)); const m=x/Math.pow(10,e); return m.toFixed(2)+" × 10"+chSup(e); }
function chGcd(a,b){ return b===0?a:chGcd(b,a%b); }
function chSmooth(a,b,x){ const t=Math.max(0,Math.min(1,(x-a)/(b-a))); return t*t*(3-2*t); }
function chRound(g,x,y,w,h,r,fill,stroke){ g.beginPath(); g.moveTo(x+r,y); g.arcTo(x+w,y,x+w,y+h,r); g.arcTo(x+w,y+h,x,y+h,r); g.arcTo(x,y+h,x,y,r); g.arcTo(x,y,x+w,y,r); g.closePath(); if(fill){ g.fillStyle=fill; g.fill(); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=1; g.stroke(); } }
function chDot(g,x,y,r,fill,stroke){ g.beginPath(); g.arc(x,y,r,0,Math.PI*2); if(fill){ g.fillStyle=fill; g.fill(); } if(stroke){ g.strokeStyle=stroke; g.lineWidth=1.5; g.stroke(); } }
const CH_ELEMENTS=[
  null,
  {s:"H",n:"Hydrogen",m:1,g:1,p:1,cat:"nonmetal"},{s:"He",n:"Helium",m:4,g:18,p:1,cat:"noble"},
  {s:"Li",n:"Lithium",m:7,g:1,p:2,cat:"alkali"},{s:"Be",n:"Beryllium",m:9,g:2,p:2,cat:"alkaline"},
  {s:"B",n:"Boron",m:11,g:13,p:2,cat:"metalloid"},{s:"C",n:"Carbon",m:12,g:14,p:2,cat:"nonmetal"},
  {s:"N",n:"Nitrogen",m:14,g:15,p:2,cat:"nonmetal"},{s:"O",n:"Oxygen",m:16,g:16,p:2,cat:"nonmetal"},
  {s:"F",n:"Fluorine",m:19,g:17,p:2,cat:"halogen"},{s:"Ne",n:"Neon",m:20,g:18,p:2,cat:"noble"},
  {s:"Na",n:"Sodium",m:23,g:1,p:3,cat:"alkali"},{s:"Mg",n:"Magnesium",m:24,g:2,p:3,cat:"alkaline"},
  {s:"Al",n:"Aluminium",m:27,g:13,p:3,cat:"metal"},{s:"Si",n:"Silicon",m:28,g:14,p:3,cat:"metalloid"},
  {s:"P",n:"Phosphorus",m:31,g:15,p:3,cat:"nonmetal"},{s:"S",n:"Sulfur",m:32,g:16,p:3,cat:"nonmetal"},
  {s:"Cl",n:"Chlorine",m:35,g:17,p:3,cat:"halogen"},{s:"Ar",n:"Argon",m:40,g:18,p:3,cat:"noble"},
  {s:"K",n:"Potassium",m:39,g:1,p:4,cat:"alkali"},{s:"Ca",n:"Calcium",m:40,g:2,p:4,cat:"alkaline"}
];
const CH_CAT_COL={ alkali:"#f0954a", alkaline:"#d4b16a", metal:"#8fb7e8", metalloid:"#c9a7f0", nonmetal:"#5eead4", halogen:"#9be36d", noble:"#fb7185" };
const CH_CAT_NAME={ alkali:"alkali metal", alkaline:"alkaline earth metal", metal:"metal", metalloid:"metalloid", nonmetal:"non-metal", halogen:"halogen", noble:"noble gas" };
function chShells(n){ return [Math.min(n,2),Math.min(Math.max(n-2,0),8),Math.min(Math.max(n-10,0),8),Math.max(n-18,0)]; }
const CH_PH_STOPS=["#d7263d","#e8412e","#f26a2e","#f79a2e","#f7c52e","#e6e035","#b6dd44","#6fc24a","#3fb58a","#2fa3b5","#3a7fd1","#4a5fd1","#5d47c0","#6e37a6","#7b2d8c"];
function chPHColor(ph){
  const p=Math.max(0,Math.min(14,ph)), i=Math.min(13,Math.floor(p)), f=p-i;
  const h=function(c){ return [parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)]; };
  const a=h(CH_PH_STOPS[i]), b=h(CH_PH_STOPS[i+1]);
  return "rgb("+Math.round(a[0]+(b[0]-a[0])*f)+","+Math.round(a[1]+(b[1]-a[1])*f)+","+Math.round(a[2]+(b[2]-a[2])*f)+")";
}

