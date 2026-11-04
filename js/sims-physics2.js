/* Physics experiments, part 2: projectiles, momentum, waves, light, lenses, heat, pressure, magnetism */
function pxLine(g,x1,y1,x2,y2,col,w,dash){
  g.save(); g.strokeStyle=col; g.lineWidth=w||2; if(dash) g.setLineDash(dash);
  g.beginPath(); g.moveTo(x1,y1); g.lineTo(x2,y2); g.stroke(); g.restore();
}
function pxArcPath(g,pts,col,w,dash){
  g.save(); g.strokeStyle=col; g.lineWidth=w||2; if(dash) g.setLineDash(dash);
  g.beginPath(); pts.forEach(function(p,i){ if(i===0) g.moveTo(p[0],p[1]); else g.lineTo(p[0],p[1]); }); g.stroke(); g.restore();
}
function pxClamp(v,a,b){ return Math.max(a,Math.min(b,v)); }

Object.assign(SIM_REGISTRY,{

  /* ---------- PROJECTILE ---------- */
  projectile(){ simFrame("projectile","projectileCanvas",function(g,W,H,t,get,say){
    const v=get("chLaunchV"), ang=get("chLaunchA"), a=ang*Math.PI/180, G=9.8;
    const vx=v*Math.cos(a), vy=v*Math.sin(a), T=2*vy/G, R=vx*T, Hm=vy*vy/(2*G);
    const S=6, x0=40, gy=H-40;
    pxLine(g,0,gy,W,gy,MC.axis,1.5);
    for(let m=0;m<=100;m+=10){ const x=x0+m*S; if(x>W-10) break; pxLine(g,x,gy,x,gy+5,MC.axis,1); mText(g,m+" m",x,gy+19,MC.muted,10,"center"); }
    const pts=[]; for(let i=0;i<=60;i++){ const tt=T*i/60; pts.push([x0+vx*tt*S, gy-(vy*tt-0.5*G*tt*tt)*S]); }
    pxArcPath(g,pts,"rgba(215,220,229,.35)",1.5,[5,5]);
    const cyc=T+1.2, tm=Math.min(T,(t/1000)%cyc);
    const bx=x0+vx*tm*S, by=gy-(vy*tm-0.5*G*tm*tm)*S;
    pxLine(g,bx,by,bx,gy,"rgba(94,234,212,.35)",1,[3,4]);
    chDot(g,bx,gy,4,MC.teal);
    const trail=pts.filter(function(p){ return p[0]<=bx+0.1; }); pxArcPath(g,trail,MC.gold,2.5);
    chDot(g,bx,by,8,MC.text,MC.gold);
    const cvy=vy-G*tm;
    mArrow(g,bx,by,bx+vx*3,by,MC.teal);
    mArrow(g,bx,by,bx,by-cvy*3,MC.violet);
    mText(g,"sideways "+vx.toFixed(1)+" m/s (never changes)",16,24,MC.teal,12);
    mText(g,"up/down "+cvy.toFixed(1)+" m/s",16,44,MC.violet,12);
    g.save(); g.translate(x0,gy); g.rotate(-a); g.fillStyle="#5b6478"; g.fillRect(-4,-5,30,10); g.restore();
    chDot(g,x0,gy,8,"#3a4156");
    mText(g,"range "+R.toFixed(1)+" m",x0+R*S,gy-10,MC.gold,11,"center");
    say("projectileRead","range "+R.toFixed(1)+" m  •  height "+Hm.toFixed(1)+" m  •  time "+T.toFixed(2)+" s");
  },true); },

  complementary(){ simFrame("complementary","complementCanvas",function(g,W,H,t,get,say){
    const A=get("chCompA"), B=90-A, v=20, G=9.8, S=13.5, x0=40, gy=H-34;
    pxLine(g,0,gy,W,gy,MC.axis,1.5);
    for(let m=0;m<=40;m+=10){ const x=x0+m*S; pxLine(g,x,gy,x,gy+5,MC.axis,1); mText(g,m+" m",x,gy+19,MC.muted,10,"center"); }
    const info=[]; const cols=[MC.teal,MC.gold];
    const times=[A,B].map(function(d){ return 2*v*Math.sin(d*Math.PI/180)/G; });
    const cyc=Math.max(times[0],times[1])+1.4, tm=(t/1000)%cyc;
    [A,B].forEach(function(d,k){
      const r=d*Math.PI/180, vx=v*Math.cos(r), vy=v*Math.sin(r), T=times[k];
      const pts=[]; for(let i=0;i<=50;i++){ const tt=T*i/50; pts.push([x0+vx*tt*S, gy-(vy*tt-0.5*G*tt*tt)*S]); }
      pxArcPath(g,pts,cols[k],1.5,[5,5]);
      const tc=Math.min(tm,T);
      chDot(g,x0+vx*tc*S, gy-(vy*tc-0.5*G*tc*tc)*S, 7, cols[k]);
      const range=v*v*Math.sin(2*r)/G; info.push(d.toFixed(0)+"°: "+range.toFixed(1)+" m, "+T.toFixed(2)+" s");
    });
    chDot(g,x0,gy,6,"#3a4156");
    mText(g,A.toFixed(0)+"°",16,24,cols[0],13); mText(g,B.toFixed(0)+"°",16,44,cols[1],13);
    say("complementRead",info.join("   |   "));
  },true); },

  /* ---------- MOMENTUM ---------- */
  collision(){ simFrame("collision","collisionCanvas",function(g,W,H,t,get,say){
    const m1=get("chM1"), m2=get("chM2"), v1=get("chV1"), e=get("chBounce")/100;
    const w1=30+m1*6, w2=30+m2*6, gy=250, K=40;
    const c1s=110, c2s=470;
    const tc=Math.max(0.2,(c2s-w2/2-w1/2-c1s)/(v1*K));
    const u1=(m1-e*m2)*v1/(m1+m2), u2=m1*(1+e)*v1/(m1+m2);
    const tm=(t/1000)%(tc+2.4), after=Math.max(0,tm-tc), before=Math.min(tm,tc);
    let c1=c1s+v1*K*before+u1*K*after, c2=c2s+u2*K*after;
    c1=pxClamp(c1,w1/2+8,W-w1/2-8); c2=pxClamp(c2,w2/2+8,W-w2/2-8);
    if(c2-w2/2<c1+w1/2){ const mid=(c1+c2)/2; c1=Math.min(c1,c2-(w1+w2)/2); }
    pxLine(g,10,gy,W-10,gy,MC.axis,2);
    const post=tm>=tc;
    const vNow1=post?u1:v1, vNow2=post?u2:0;
    chRound(g,c1-w1/2,gy-w1,w1,w1,6,"rgba(94,234,212,.75)"); mText(g,m1+" kg",c1,gy-w1/2+4,"#0c1020",12,"center");
    chRound(g,c2-w2/2,gy-w2,w2,w2,6,"rgba(212,177,106,.8)"); mText(g,m2+" kg",c2,gy-w2/2+4,"#0c1020",12,"center");
    chDot(g,c1-w1/3,gy+6,6,"#3a4156"); chDot(g,c1+w1/3,gy+6,6,"#3a4156"); chDot(g,c2-w2/3,gy+6,6,"#3a4156"); chDot(g,c2+w2/3,gy+6,6,"#3a4156");
    if(Math.abs(vNow1)>0.01) mArrow(g,c1,gy-w1-14,c1+vNow1*9,gy-w1-14,MC.teal);
    if(Math.abs(vNow2)>0.01) mArrow(g,c2,gy-w2-14,c2+vNow2*9,gy-w2-14,MC.gold);
    const pb=m1*v1, pa=m1*u1+m2*u2, kb=0.5*m1*v1*v1, ka=0.5*m1*u1*u1+0.5*m2*u2*u2;
    mText(g,"BEFORE",20,28,MC.muted,11); mText(g,"momentum "+mFmt(pb,1)+" kg·m/s   energy "+mFmt(kb,1)+" J",20,46,MC.text,12);
    mText(g,"AFTER",20,72,MC.muted,11); mText(g,"momentum "+mFmt(pa,1)+" kg·m/s   energy "+mFmt(ka,1)+" J",20,90,post?MC.gold:MC.muted,12);
    mText(g,"velocities after: "+mFmt(u1,2)+" m/s and "+mFmt(u2,2)+" m/s",20,112,MC.muted,11);
    say("collisionRead","before "+mFmt(pb,1)+"  →  after "+mFmt(pa,1)+" kg·m/s   (energy lost: "+mFmt(kb-ka,1)+" J)");
  },true); },

  recoil(){ simFrame("recoil","recoilCanvas",function(g,W,H,t,get,say){
    const mA=get("chSkA"), mB=get("chSkB"), P=160, gy=215, K=34;
    const vA=P/mA, vB=P/mB, cyc=5, tm=(t/1000)%cyc, push=1.0, after=Math.max(0,tm-push);
    const xa=pxClamp(350-30-vA*K*after,40,W-40), xb=pxClamp(350+30+vB*K*after,40,W-40);
    pxLine(g,10,gy,W-10,gy,MC.axis,2);
    function skater(x,m,col){
      const s=0.8+m/200;
      g.save(); g.translate(x,gy); g.scale(s,s);
      g.strokeStyle=col; g.lineWidth=4; g.lineCap="round";
      g.beginPath(); g.moveTo(0,-30); g.lineTo(0,-75); g.moveTo(-14,-60); g.lineTo(14,-60); g.moveTo(0,-30); g.lineTo(-10,0); g.moveTo(0,-30); g.lineTo(10,0); g.stroke();
      chDot(g,0,-88,12,col);
      g.restore();
      mText(g,m+" kg",x,gy+22,MC.muted,11,"center");
    }
    skater(xa,mA,MC.teal); skater(xb,mB,MC.gold);
    if(tm>push){ mArrow(g,xa-20,gy-130,xa-20-vA*14,gy-130,MC.teal); mArrow(g,xb+20,gy-130,xb+20+vB*14,gy-130,MC.gold); }
    else mText(g,"standing still, total momentum = 0",W/2,36,MC.muted,12,"center");
    say("recoilRead","left "+vA.toFixed(2)+" m/s, right "+vB.toFixed(2)+" m/s  •  momentum "+P+" and "+P+" kg·m/s, opposite ways");
  },true); },

  /* ---------- WAVES ---------- */
  waveMaker(){ simFrame("waveMaker","waveMakerCanvas",function(g,W,H,t,get,say){
    const f=get("chWaveF"), v=get("chWaveV"), A=get("chWaveA"), lam=v/f, S=38, cy=H/2+10, ts=t/1000;
    const lamPx=lam*S;
    pxLine(g,0,cy,W,cy,MC.grid,1);
    const y=function(x){ return cy-A*Math.sin(2*Math.PI*(f*ts-x/lamPx)); };
    g.strokeStyle=MC.teal; g.lineWidth=2.5; g.beginPath();
    for(let x=0;x<=W;x+=3){ if(x===0) g.moveTo(x,y(x)); else g.lineTo(x,y(x)); } g.stroke();
    for(let x=30;x<W;x+=110){ pxLine(g,x,cy-A-8,x,cy+A+8,"rgba(215,220,229,.15)",1,[2,4]); chDot(g,x,y(x),6,MC.gold); }
    const c0=(function(){ let x=lamPx*(0.25*-1+f*ts); x=((x%lamPx)+lamPx)%lamPx; while(x<40) x+=lamPx; return x; })();
    if(c0+lamPx<W-10){
      const by=cy-A-24;
      pxLine(g,c0,by,c0+lamPx,by,MC.gold,2); pxLine(g,c0,by-5,c0,by+5,MC.gold,2); pxLine(g,c0+lamPx,by-5,c0+lamPx,by+5,MC.gold,2);
      mText(g,"wavelength "+lam.toFixed(2)+" m",c0+lamPx/2,by-9,MC.gold,12,"center");
    }
    mText(g,"The gold dots only move up and down. The wave moves along.",16,H-14,MC.muted,11);
    say("waveMakerRead","f = "+f+" Hz,  λ = "+lam.toFixed(2)+" m,  speed = f × λ = "+(f*lam).toFixed(1)+" m/s,  period = "+(1/f).toFixed(2)+" s");
  },true); },

  echo(){ simFrame("echo","echoCanvas",function(g,W,H,t,get,say){
    const d=get("chEchoD"), SP=343, slow=0.5, gy=H-60;
    const x0=90, x1=W-90, span=x1-x0;
    const realTotal=2*d/SP, animTotal=realTotal/slow, cyc=animTotal+1.6, tm=(t/1000)%cyc;
    pxLine(g,40,gy,W-40,gy,MC.axis,2);
    chRound(g,x1,gy-110,24,110,3,"#4b5368"); mText(g,"wall",x1+12,gy-118,MC.muted,11,"center");
    chDot(g,x0,gy-30,12,MC.teal); pxLine(g,x0,gy-18,x0,gy,MC.teal,4); mText(g,"you",x0,gy+20,MC.muted,11,"center");
    const frac=pxClamp(tm/animTotal,0,1);
    const outFrac=Math.min(1,frac*2), backFrac=Math.max(0,frac*2-1);
    if(frac<1){
      const px=frac<0.5 ? x0+span*outFrac : x1-span*backFrac;
      for(let k=0;k<3;k++){ const r=10+k*14; g.strokeStyle="rgba(212,177,106,"+(0.8-k*0.25)+")"; g.lineWidth=2.5; g.beginPath();
        const dir=frac<0.5?1:-1; g.arc(px-dir*k*14,gy-30,r,dir>0?-1:Math.PI-1,dir>0?1:Math.PI+1); g.stroke(); }
    }
    const realNow=Math.min(realTotal,tm*slow);
    mText(g,"distance "+d+" m each way",W/2,36,MC.text,13,"center");
    mText(g,"clock: "+realNow.toFixed(2)+" s",W/2,60,MC.gold,13,"center");
    if(frac>=1) mText(g,"echo heard!",x0,gy-70,MC.teal,14,"center");
    say("echoRead","echo returns after "+realTotal.toFixed(2)+" s   (2 × "+d+" ÷ 343)");
  },true); },

  /* ---------- LIGHT ---------- */
  refraction(){ simFrame("refraction","refractionCanvas",function(g,W,H,t,get,say){
    const th1=get("chLightAngle")*Math.PI/180, med=get("chMedium"), dir=get("chLightDir");
    const nM=[0,1.33,1.5,2.42][med]||1.5, names=["","water","glass","diamond"];
    const n1=dir===0?1:nM, n2=dir===0?nM:1;
    const ox=W/2, oy=H/2, L=170;
    g.fillStyle="rgba(94,234,212,.10)"; if(dir===0) g.fillRect(0,oy,W,H-oy); else g.fillRect(0,0,W,oy);
    pxLine(g,0,oy,W,oy,MC.axis,1.5);
    pxLine(g,ox,20,ox,H-20,"rgba(215,220,229,.5)",1,[5,5]); mText(g,"normal",ox+8,30,MC.muted,10);
    mText(g,dir===0?"air":names[med],16,oy-12,MC.muted,12); mText(g,dir===0?names[med]+" (n = "+nM+")":"air",16,oy+24,MC.muted,12);
    const s2=n1*Math.sin(th1)/n2;
    pxLine(g,ox-L*Math.sin(th1),oy-L*Math.cos(th1),ox,oy,MC.gold,3);
    mArrow(g,ox-L*Math.sin(th1)*0.5,oy-L*Math.cos(th1)*0.5,ox-L*Math.sin(th1)*0.45,oy-L*Math.cos(th1)*0.45,MC.gold);
    let txt;
    if(s2>1){
      pxLine(g,ox,oy,ox+L*Math.sin(th1),oy-L*Math.cos(th1),MC.rose,3);
      txt="total internal reflection: all the light stays inside";
    } else {
      const th2=Math.asin(s2);
      pxLine(g,ox,oy,ox+L*Math.sin(th2),oy+L*Math.cos(th2),MC.teal,3);
      pxLine(g,ox,oy,ox+L*Math.sin(th1),oy-L*Math.cos(th1),"rgba(251,113,133,.30)",1.5);
      g.strokeStyle=MC.teal; g.lineWidth=1; g.beginPath(); g.arc(ox,oy,50,Math.PI/2-th2,Math.PI/2); g.stroke();
      mText(g,(th2*180/Math.PI).toFixed(1)+"°",ox+58,oy+44,MC.teal,12);
      txt="bent ray leaves at "+(th2*180/Math.PI).toFixed(1)+"°";
    }
    g.strokeStyle=MC.gold; g.lineWidth=1; g.beginPath(); g.arc(ox,oy,50,-Math.PI/2-th1,-Math.PI/2); g.stroke();
    mText(g,(th1*180/Math.PI).toFixed(0)+"°",ox-84,oy-52,MC.gold,12);
    const crit = n1>n2 ? Math.asin(n2/n1)*180/Math.PI : null;
    if(crit!==null) mText(g,"critical angle "+crit.toFixed(1)+"°",W-16,H-14,MC.muted,12,"right");
    say("refractionRead",txt);
  }); },

  planemirror(){ simFrame("planemirror","mirrorCanvas",function(g,W,H,t,get,say){
    const d=get("chMirrorD"), S=2, mx=W/2+40, cx=mx-d*S, base=250, tipY=190, ex=36, ey=300;
    chRound(g,mx-3,30,6,H-60,2,"#9aa6bf"); mText(g,"mirror",mx,22,MC.muted,11,"center");
    const ix=mx+d*S;
    function candle(x,col,alpha){ g.save(); g.globalAlpha=alpha; chRound(g,x-6,tipY+14,12,base-tipY-14,2,"#e8e2d0"); chDot(g,x,tipY+4,8,col); g.restore(); }
    candle(cx,"#f0954a",1); candle(ix,"#f0954a",0.35);
    mText(g,"candle",cx,base+20,MC.muted,11,"center"); mText(g,"image",ix,base+20,MC.muted,11,"center");
    chDot(g,ex,ey,9,MC.teal); mText(g,"eye",ex,ey+24,MC.muted,11,"center");
    const Fx=cx, Fy=tipY, Ix=ix, Iy=tipY;
    const k=(mx-ex)/(Ix-ex); const My=ey+(Iy-ey)*k;
    pxLine(g,Fx,Fy,mx,My,MC.gold,2); pxLine(g,mx,My,ex,ey,MC.gold,2);
    pxLine(g,mx,My,Ix,Iy,"rgba(212,177,106,.6)",1.5,[5,5]);
    const M2y=120, dx=mx-Fx, dy=M2y-Fy;
    pxLine(g,Fx,Fy,mx,M2y,MC.teal,2);
    const rl=Math.min(260,Math.max(80,mx-60)); const nrm=Math.hypot(dx,dy)||1;
    pxLine(g,mx,M2y,mx-dx/nrm*rl,M2y+dy/nrm*rl,MC.teal,2);
    const bdx=Ix-mx, bdy=Iy-M2y; pxLine(g,mx,M2y,Ix,Iy,"rgba(94,234,212,.5)",1.5,[5,5]);
    say("mirrorRead","image "+d+" cm behind the mirror  •  same size, upright, virtual");
  }); },

  /* ---------- LENSES ---------- */
  lensRays(){ simFrame("lensRays","lensCanvas",function(g,W,H,t,get,say){
    const f=get("chFocal"), u=get("chObjDist"), S=7, ox=W/2, oy=H/2, h=55;
    pxLine(g,0,oy,W,oy,MC.axis,1);
    g.save(); g.fillStyle="rgba(94,234,212,.18)"; g.strokeStyle=MC.teal; g.lineWidth=2;
    g.beginPath(); g.ellipse(ox,oy,12,125,0,0,Math.PI*2); g.fill(); g.stroke(); g.restore();
    [-1,1].forEach(function(s){ const x=ox+s*f*S; chDot(g,x,oy,4,MC.gold); mText(g,"F",x,oy+18,MC.gold,11,"center"); });
    const objx=ox-u*S, tipy=oy-h;
    mArrow(g,objx,oy,objx,tipy,MC.text); mText(g,"object",objx,oy+34,MC.muted,10,"center");
    const R=W-6;
    const endAt=function(x1,y1,x2,y2,xe){ const k=(xe-x1)/(x2-x1); return [xe,y1+(y2-y1)*k]; };
    // ray 1: parallel then through far focus
    pxLine(g,objx,tipy,ox,tipy,MC.gold,1.8);
    const fx=ox+f*S;
    let e1=endAt(ox,tipy,fx,oy,R); pxLine(g,ox,tipy,e1[0],e1[1],MC.gold,1.8);
    // ray 2: through the centre
    let e2=endAt(objx,tipy,ox,oy,R); pxLine(g,objx,tipy,e2[0],e2[1],MC.teal,1.8);
    let txt;
    if(Math.abs(u-f)<1e-6){ txt="object on the focus: rays leave parallel, no image forms"; }
    else {
      const v=u*f/(u-f), m=-v/u, ix=ox+v*S, iy=oy-m*h;
      if(v>0){
        if(ix<W-12){ mArrow(g,ix,oy,ix,iy,MC.rose); mText(g,"real image",ix,oy+(iy>oy?-12:34),MC.rose,10,"center"); }
        txt="real, upside down: v = "+mFmt(v,1)+" cm, magnification "+mFmt(m,2)+(ix>=W-12?"  (image is off the edge)":"");
      } else {
        pxLine(g,ox,tipy,ix,iy,"rgba(212,177,106,.5)",1.3,[5,5]);
        pxLine(g,ox,oy,ix,iy,"rgba(94,234,212,.5)",1.3,[5,5]);
        if(ix>10 && Math.abs(iy-oy)<oy-8){ g.save(); g.globalAlpha=0.6; mArrow(g,ix,oy,ix,iy,MC.rose); g.restore(); mText(g,"virtual image",ix,oy+22,MC.rose,10,"center"); }
        txt="virtual, upright, bigger: "+mFmt(-v,1)+" cm behind the object's side, magnification "+mFmt(m,2);
      }
    }
    say("lensRead",txt);
  }); },

  /* ---------- HEAT ---------- */
  heater(){ simFrame("heater","heaterCanvas",function(g,W,H,t,get,say){
    const mat=get("chHeatMat"), m=get("chHeatMass"), P=get("chHeatPower"), tt=get("chHeatTime");
    const mats=[null,{n:"water",c:4180,liq:true,col:[70,140,230]},{n:"cooking oil",c:1970,liq:true,col:[230,190,70]},{n:"aluminium",c:900,col:[190,198,210]},{n:"iron",c:450,col:[120,125,140]}];
    const M=mats[mat]||mats[1], Q=P*tt, dT=Q/(m*M.c);
    let T=20+dT, note="";
    if(M.liq && T>100){ T=100; note="  (would boil at 100 °C)"; }
    if(mat===3 && T>660){ note="  (real aluminium melts at 660 °C)"; }
    if(mat===4 && T>1538){ note="  (real iron melts at 1538 °C)"; }
    const heat=pxClamp((T-20)/Math.max(80,Math.min(500,T)),0,1);
    const bx=40, by=70, bw=210, bh=190;
    const cold=M.col, r=Math.round(cold[0]+(245-cold[0])*heat), gg=Math.round(cold[1]+(110-cold[1])*heat), b=Math.round(cold[2]+(50-cold[2])*heat);
    if(M.liq){ g.strokeStyle=MC.axis; g.lineWidth=2.5; g.beginPath(); g.moveTo(bx,by); g.lineTo(bx,by+bh); g.lineTo(bx+bw,by+bh); g.lineTo(bx+bw,by); g.stroke();
      g.fillStyle="rgb("+r+","+gg+","+b+")"; g.fillRect(bx+3,by+bh*0.3,bw-6,bh*0.7-3); }
    else { g.fillStyle="rgb("+r+","+gg+","+b+")"; g.fillRect(bx+20,by+40,bw-40,bh-50); }
    for(let i=0;i<6;i++){ const hx=bx+25+i*32; pxArcPath(g,[[hx,by+bh+20],[hx+8,by+bh+32],[hx-8,by+bh+44],[hx,by+bh+56]],P>0&&tt>0?MC.rose:MC.grid,3); }
    mText(g,M.n+", "+m+" kg",bx+bw/2,by-14,MC.text,13,"center");
    mText(g,mFmt(T,0)+" °C",bx+bw/2,by+bh*0.62,"#0c1020",22,"center");
    const gx=330, gy0=290, gw=340, gh=230;
    const tmax=Math.max(60,Math.min(2000,Math.ceil(T/50)*50+50));
    pxLine(g,gx,gy0-gh,gx,gy0,MC.axis,1.5); pxLine(g,gx,gy0,gx+gw,gy0,MC.axis,1.5);
    mText(g,"time (s)",gx+gw,gy0+30,MC.muted,10,"right"); mText(g,"°C",gx-8,gy0-gh-4,MC.muted,10,"right");
    mText(g,"0",gx,gy0+14,MC.muted,10,"center"); mText(g,"300",gx+gw,gy0+14,MC.muted,10,"center");
    mText(g,String(tmax),gx-6,gy0-gh+8,MC.muted,10,"right");
    const line=function(c,col,dash,cap){ g.save(); g.beginPath(); g.rect(gx,gy0-gh,gw,gh); g.clip(); g.strokeStyle=col; g.lineWidth=2; if(dash) g.setLineDash(dash);
      g.beginPath(); for(let s=0;s<=300;s+=10){ let T2=20+P*s/(m*c); if(cap&&T2>100) T2=100; const x=gx+gw*s/300, y=gy0-gh*T2/tmax; if(s===0) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke(); g.restore(); };
    if(mat!==1) line(4180,"rgba(112,168,255,.5)",[4,4],true);
    line(M.c,MC.gold,null,M.liq);
    chDot(g,gx+gw*tt/300,gy0-gh*T/tmax,6,MC.text,MC.gold);
    if(mat!==1) mText(g,"dotted: water, same mass and power",gx+gw,gy0-gh-14,"rgba(112,168,255,.8)",10,"right");
    say("heaterRead","energy "+mFmt(Q,0)+" J  →  rise of "+mFmt(T-20,1)+" °C, now "+mFmt(T,0)+" °C"+note);
  }); },

  heatflow(){ simFrame("heatflow","heatFlowCanvas",function(g,W,H,t,get,say){
    const mode=get("chFlowMode"), ts=t/1000;
    if(mode===1){
      const cyc=8, ph=(ts%cyc)/cyc, rows=3, cols=24, x0=60, dx=24, y0=150, dy=34;
      chRound(g,x0-30,y0-40,cols*dx+40,rows*dy+30,10,"rgba(215,220,229,.07)");
      for(let r=0;r<rows;r++) for(let c=0;c<cols;c++){
        const pos=c/cols, heat=pxClamp((ph*1.5-pos)*2.2,0,1)*(1-0.45*pos);
        const amp=1+heat*5, ox=Math.sin(ts*18+r*2+c)*amp, oy=Math.cos(ts*21+c*1.3+r)*amp;
        const col="rgb("+Math.round(120+135*heat)+","+Math.round(160-90*heat)+","+Math.round(200-150*heat)+")";
        chDot(g,x0+c*dx+ox,y0+r*dy+oy,7,col);
      }
      chDot(g,x0-60,y0+dy,26,"#f0954a"); mText(g,"flame",x0-60,y0+dy+50,MC.muted,11,"center");
      mText(g,"Metal rod: the particles stay put but shake harder, passing the shaking on.",W/2,36,MC.text,12,"center");
      mText(g,"hot end → cold end",W/2,H-20,MC.muted,11,"center");
      say("heatFlowRead","conduction: energy passes from particle to particle");
    } else if(mode===2){
      const cx=W/2, cy=165, rw=220, rh=110;
      chRound(g,cx-rw-20,cy-rh-30,2*rw+40,2*rh+60,10,"rgba(215,220,229,.07)");
      pxLine(g,cx-rw-20,cy+rh+30,cx+rw+20,cy+rh+30,MC.axis,2);
      chDot(g,cx-rw+30,cy+rh+14,20,"#f0954a"); mText(g,"heater",cx-rw+30,cy+rh+62,MC.muted,11,"center");
      for(let i=0;i<22;i++){
        const a=((i/22)+ts*0.08)%1*Math.PI*2;
        const px=cx+Math.cos(a)*rw*0.9*-1, py=cy+Math.sin(a)*rh*0.9; // loop: up on the left, down on the right
        const left=Math.cos(a)*-1>0 ? 0 : 1;
        const warm=pxClamp(0.5-0.5*Math.sin(a)*1+0.0,0,1);
        const hot=pxClamp((Math.cos(a)<0?1:0)*0.6+0.4*(1-(py-(cy-rh))/(2*rh)),0,1);
        chDot(g,px,py,7,"rgb("+Math.round(110+145*hot)+","+Math.round(150-60*hot)+","+Math.round(220-150*hot)+")");
      }
      mText(g,"warm fluid rises",cx-rw+10,cy-rh-8,"#f0954a",11); mText(g,"cool fluid sinks",cx+rw-10,cy-rh-8,"#6aa8ff",11,"right");
      mText(g,"Convection: the fluid itself carries the heat round in a loop.",W/2,24,MC.text,12,"center");
      say("heatFlowRead","convection: a current of moving fluid");
    } else {
      const sx=90, sy=165, tx=W-110;
      chDot(g,sx,sy,34,"#f0b64a"); mText(g,"hot object",sx,sy+58,MC.muted,11,"center");
      for(let k=-3;k<=3;k++){ g.strokeStyle="rgba(240,160,74,.75)"; g.lineWidth=2; g.beginPath();
        for(let x=sx+50;x<=tx-34;x+=3){ const y=sy+k*28+Math.sin((x-sx)*0.07-ts*9)*5*(1-Math.abs(k)*0.1); if(x===sx+50) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke(); }
      const glow=0.4+0.3*Math.sin(ts*2);
      chDot(g,tx,sy,30,"rgba(94,234,212,"+(0.5+glow*0.3)+")"); mText(g,"warms up",tx,sy+58,MC.muted,11,"center");
      mText(g,"empty space between: nothing there to conduct or flow",(sx+tx)/2,sy+100,MC.muted,11,"center");
      mText(g,"Radiation: infrared waves carry the energy, no material needed.",W/2,24,MC.text,12,"center");
      say("heatFlowRead","radiation: waves travelling through empty space");
    }
  },true); },

  /* ---------- PRESSURE ---------- */
  diver(){ simFrame("diver","diverCanvas",function(g,W,H,t,get,say){
    const h=get("chDepth"), rho=get("chFluidDen"), G=9.8, atm=101.3;
    const Pw=rho*G*h/1000, P=atm+Pw;
    const x0=30, x1=290, top=40, S=5.2;
    g.fillStyle="rgba(70,140,230,.10)"; g.fillRect(x0,top,x1-x0,60*S);
    const grad=g.createLinearGradient(0,top,0,top+60*S); grad.addColorStop(0,"rgba(110,180,255,.30)"); grad.addColorStop(1,"rgba(20,50,120,.55)");
    g.fillStyle=grad; g.fillRect(x0,top,x1-x0,60*S);
    pxLine(g,x0,top,x1,top,MC.teal,2); mText(g,"surface (atmosphere pushes down)",x0,top-10,MC.muted,10);
    for(let m=0;m<=60;m+=10){ pxLine(g,x1,top+m*S,x1+6,top+m*S,MC.axis,1); mText(g,m+" m",x1+10,top+m*S+4,MC.muted,10); }
    const dy=top+h*S, dx=(x0+x1)/2;
    const L=pxClamp(10+P/12,12,80);
    [[-1,0],[1,0],[0,-1],[0,1],[-0.7,-0.7],[0.7,-0.7],[-0.7,0.7],[0.7,0.7]].forEach(function(d){ mArrow(g,dx+d[0]*(L+22),dy+d[1]*(L+22),dx+d[0]*20,dy+d[1]*20,"rgba(251,113,133,.8)"); });
    chDot(g,dx,dy,13,MC.gold); mText(g,"diver",dx,dy+4,"#0c1020",9,"center");
    const gx=420, gy0=top+60*S, gw=250, gh=60*S;
    pxLine(g,gx,top,gx,gy0,MC.axis,1.5); pxLine(g,gx,top,gx+gw,top,MC.axis,1.5);
    mText(g,"pressure (kPa) →",gx+gw,top-10,MC.muted,10,"right");
    [0,250,500,750,1000].forEach(function(p){ const x=gx+gw*p/1000; pxLine(g,x,top-3,x,top+3,MC.axis,1); mText(g,String(p),x,top+16,MC.muted,10,"center"); if(p) pxLine(g,x,top,x,gy0,MC.grid,1); });
    g.save(); g.strokeStyle="rgba(112,168,255,.5)"; g.lineWidth=1.5; g.setLineDash([4,4]); g.beginPath(); g.moveTo(gx+gw*atm/1000,top); g.lineTo(gx+gw*(atm+1000*G*60/1000)/1000,gy0); g.stroke(); g.restore();
    g.strokeStyle=MC.gold; g.lineWidth=2.5; g.beginPath(); g.moveTo(gx+gw*atm/1000,top); g.lineTo(gx+gw*(atm+rho*G*60/1000)/1000,gy0); g.stroke();
    chDot(g,gx+gw*P/1000,dy,7,MC.text,MC.gold);
    pxLine(g,x1+34,dy,gx+gw*P/1000,dy,"rgba(215,220,229,.2)",1,[3,4]);
    mText(g,"dashed = fresh water",gx+gw,gy0+22,"rgba(112,168,255,.8)",10,"right");
    say("diverRead","liquid "+mFmt(Pw,0)+" kPa + air "+atm+" kPa = "+mFmt(P,0)+" kPa total  ("+mFmt(P/atm,1)+" atmospheres)");
  }); },

  sinkfloat(){ simFrame("sinkfloat","floatCanvas",function(g,W,H,t,get,say){
    const rb=get("chObjDen"), li=get("chLiquid"), ts=t/1000;
    const liq=[null,{n:"cooking oil",d:920,c:"rgba(230,190,70,.35)"},{n:"water",d:1000,c:"rgba(90,150,235,.35)"},{n:"salt water",d:1025,c:"rgba(60,170,200,.38)"},{n:"mercury",d:13600,c:"rgba(190,196,208,.45)"}][li];
    const tx=40, tw=300, ty=40, th=260, surf=ty+70, side=90;
    const floats=rb<liq.d, frac=floats?rb/liq.d:1;
    let top; if(floats) top=surf-(1-frac)*side+Math.sin(ts*2)*2; else top=ty+th-side-3;
    chRound(g,tx,surf,tw,ty+th-surf,0,liq.c);
    g.strokeStyle=MC.axis; g.lineWidth=2.5; g.beginPath(); g.moveTo(tx,ty); g.lineTo(tx,ty+th); g.lineTo(tx+tw,ty+th); g.lineTo(tx+tw,ty); g.stroke();
    pxLine(g,tx,surf+Math.sin(ts*2)*1.5,tx+tw,surf-Math.sin(ts*2)*1.5,MC.teal,2);
    const bxx=tx+tw/2-side/2;
    chRound(g,bxx,top,side,side,5,floats?"rgba(212,177,106,.85)":"rgba(160,168,186,.9)");
    mText(g,String(rb),bxx+side/2,top+side/2+4,"#0c1020",13,"center");
    const wlen=pxClamp(rb/9000*70+14,14,84), ulen=pxClamp((floats?rb:liq.d*Math.min(1,1))/9000*70+14,14,84);
    const subm= floats?frac:1; const up=liq.d*subm; // weight of displaced liquid per unit volume
    mArrow(g,bxx-24,top+side/2,bxx-24,top+side/2+pxClamp(rb/9000*70+14,14,84),MC.rose);
    mArrow(g,bxx+side+24,top+side/2,bxx+side+24,top+side/2-pxClamp(up/9000*70+14,14,84),MC.teal);
    mText(g,"weight",bxx-24,top+side/2+pxClamp(rb/9000*70+14,14,84)+16,MC.rose,10,"center");
    mText(g,"upthrust",bxx+side+24,top+side/2+22,MC.teal,10,"center");
    const rx=380;
    mText(g,"block: "+rb+" kg/m³",rx,70,MC.text,13); mText(g,liq.n+": "+liq.d+" kg/m³",rx,94,MC.text,13);
    mText(g,floats?"FLOATS":"SINKS",rx,140,floats?MC.teal:MC.rose,24);
    mText(g,floats?("about "+(frac*100).toFixed(0)+"% of the block is below the surface"):"upthrust is smaller than the weight",rx,170,MC.muted,12);
    mText(g,floats?"weight = upthrust":"weight > upthrust",rx,194,MC.muted,12);
    say("floatRead",(floats?"floats, "+(frac*100).toFixed(0)+"% submerged":"sinks")+"  (block "+rb+" vs "+liq.n+" "+liq.d+")");
  },true); },

  /* ---------- MAGNETISM ---------- */
  electromagnet(){ simFrame("electromagnet","electromagnetCanvas",function(g,W,H,t,get,say){
    const N=get("chTurns"), I=get("chCurrent"), core=get("chCore"), ts=t/1000;
    const at=N*I, holds=Math.min(12,Math.floor(at*(core?5:1)/10));
    const nx=140, ny=90, nl=300;
    pxLine(g,10,H-34,W-10,H-34,MC.axis,2);
    chRound(g,nx,ny,nl,22,5,core?"#8a93a8":"rgba(215,220,229,.07)");
    if(!core) { g.strokeStyle=MC.grid; g.lineWidth=1; g.strokeRect(nx,ny,nl,22); }
    const cols=Math.min(N,20); const cx0=nx+30, cw=(nl-60)/Math.max(1,cols-1);
    for(let i=0;i<cols;i++){ const x=cx0+(cols===1?0:i*cw); pxArcPath(g,[[x-4,ny-9],[x+4,ny+31]],"#d08a4a",3); }
    pxArcPath(g,[[nx+30,ny-6],[nx-40,ny-30],[nx-60,ny+60]],"#d08a4a",2);
    pxArcPath(g,[[nx+nl-30,ny+28],[nx+nl+40,ny+60],[nx+nl+40,ny+210],[nx-60,ny+210],[nx-60,ny+130]],"#d08a4a",2);
    chRound(g,nx-80,ny+60,40,70,5,"#4b5368"); mText(g,"battery",nx-60,ny+148,MC.muted,10,"center");
    if(I>0){ for(let k=0;k<3;k++){ const r=40+k*22+((ts*30)%22); g.strokeStyle="rgba(94,234,212,"+(0.5-k*0.12)+")"; g.lineWidth=1.3; g.setLineDash([5,5]); g.beginPath(); g.ellipse(nx+nl/2,ny+11,nl/2+r*0.6,r+16,0,0,Math.PI*2); g.stroke(); g.setLineDash([]); } }
    const clipW=18, total=16, tableY=H-34;
    for(let i=0;i<total;i++){
      if(i<holds){ const y=ny+28+i*14; chRound(g,nx+nl/2-10,y,20,9,4,"rgba(215,220,229,.85)"); }
      else { const col=i-holds, x=nx+30+col*30+((i*37)%7); chRound(g,x,tableY-9,22,8,4,"rgba(215,220,229,.55)"); }
    }
    mText(g,"turns "+N+"  ×  amps "+I+"  =  "+mFmt(at,1)+" ampere-turns",16,26,MC.text,12);
    mText(g,core?"soft iron core: ON":"no core",16,46,core?MC.gold:MC.muted,12);
    say("electromagnetRead",holds+" paper clip"+(holds===1?"":"s")+" held"+(holds>=12?" (the picture shows up to 12)":""));
  },true); },

  twomagnets(){ simFrame("twomagnets","twoMagnetsCanvas",function(g,W,H,t,get,say){
    const gap=get("chMagGap"), flip=get("chMagFlip"), cy=H/2+10, mw=130, mh=46, S=22;
    const lxr=W/2-gap*S/2, rxl=W/2+gap*S/2;
    const lx=lxr-mw, rx=rxl;
    function bar(x,leftIsN){
      const a=leftIsN?"N":"S", b=leftIsN?"S":"N";
      const ca=leftIsN?"#e0525e":"#4a86d6", cb=leftIsN?"#4a86d6":"#e0525e";
      g.fillStyle=ca; g.fillRect(x,cy-mh/2,mw/2,mh); g.fillStyle=cb; g.fillRect(x+mw/2,cy-mh/2,mw/2,mh);
      mText(g,a,x+mw/4,cy+7,"#fff",20,"center"); mText(g,b,x+mw*3/4,cy+7,"#fff",20,"center");
    }
    bar(lx,false); bar(rx,flip===1);
    const attract=flip===0;
    [-1,1].forEach(function(s){
      const a=attract?1:0;
      for(let k=1;k<=3;k++){ const yy=cy+s*k*10-s*0;
        if(attract) pxLine(g,lxr+4,yy,rxl-4,yy,"rgba(94,234,212,.55)",1.4,[4,4]);
        else { g.strokeStyle="rgba(94,234,212,.55)"; g.lineWidth=1.4; g.setLineDash([4,4]); g.beginPath(); g.moveTo(lxr+2,yy); g.quadraticCurveTo(W/2,yy+s*(24+k*14),lxr+2+(rxl-lxr)*0.5+0,yy+s*(60+k*10)); g.stroke(); g.beginPath(); g.moveTo(rxl-2,yy); g.quadraticCurveTo(W/2,yy+s*(24+k*14),W/2,yy+s*(60+k*10)); g.stroke(); g.setLineDash([]); }
      }
    });
    const F=100/(gap*gap*gap), L=pxClamp(16+Math.sqrt(F)*30,16,110);
    if(attract){ mArrow(g,lxr-mw/2,cy-mh/2-26,lxr-mw/2+L*0.6,cy-mh/2-26,MC.gold); mArrow(g,rxl+mw/2,cy-mh/2-26,rxl+mw/2-L*0.6,cy-mh/2-26,MC.gold); }
    else { mArrow(g,lxr-mw/2,cy-mh/2-26,lxr-mw/2-L*0.6,cy-mh/2-26,MC.rose); mArrow(g,rxl+mw/2,cy-mh/2-26,rxl+mw/2+L*0.6,cy-mh/2-26,MC.rose); }
    mText(g,attract?"opposite poles face each other: PULL":"like poles face each other: PUSH",W/2,28,attract?MC.gold:MC.rose,14,"center");
    mText(g,"gap "+gap+" cm",W/2,cy+mh/2+34,MC.muted,11,"center");
    say("twoMagnetsRead",(attract?"attraction":"repulsion")+" of strength "+mFmt(F,2)+" (relative units)");
  },true); }

});
