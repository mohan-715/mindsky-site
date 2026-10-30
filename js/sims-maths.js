Object.assign(SIM_REGISTRY,{
  /* ===== MATHS: NUMBERS ===== */
  primes(){ simFrame("primes","primesCanvas",function(g,W,H,t,get,say){
    const steps=get("sievePrimes"), pick=get("factorPick"); const P=[2,3,5,7]; const used=P.slice(0,steps);
    const x0=26,y0=24,cell=36;
    const divisors=[]; for(let d=1;d<=pick;d++){ if(pick%d===0) divisors.push(d); }
    for(let n=1;n<=100;n++){
      const col=(n-1)%10,row=Math.floor((n-1)/10); const x=x0+col*cell,y=y0+row*cell;
      const crossed=used.some(function(p){ return n!==p && n%p===0; });
      const isPrimeShown=(used.indexOf(n)>-1) || (steps===4 && n>1 && !crossed);
      let fill="rgba(201,167,240,.09)", txt=MC.muted;
      if(n===1){ fill="rgba(215,220,229,.03)"; txt="rgba(156,167,194,.45)"; }
      else if(crossed){ fill="rgba(251,113,133,.10)"; txt="rgba(156,167,194,.35)"; }
      else if(isPrimeShown){ fill="rgba(212,177,106,.9)"; txt="#050816"; }
      g.fillStyle=fill; g.fillRect(x+1,y+1,cell-2,cell-2);
      mText(g,String(n),x+cell/2,y+cell/2+4,txt,12,"center");
      if(crossed){ g.strokeStyle="rgba(251,113,133,.5)"; g.lineWidth=1; g.beginPath(); g.moveTo(x+9,y+9); g.lineTo(x+cell-9,y+cell-9); g.stroke(); }
      if(divisors.indexOf(n)>-1){ g.fillStyle=MC.teal; g.beginPath(); g.arc(x+cell-8,y+8,3,0,7); g.fill(); }
      if(n===pick){ g.strokeStyle=MC.teal; g.lineWidth=2; g.strokeRect(x+1.5,y+1.5,cell-3,cell-3); }
    }
    const fx=410; const fac=mFactorize(pick); const isPrime=(fac.length===1 && fac[0][1]===1);
    mText(g,"Picked number: "+pick,fx,38,MC.teal,16);
    mText(g,isPrime?"Prime — its only factor pair is 1 × "+pick:"Composite — "+divisors.length+" factors",fx,62,isPrime?MC.gold:MC.text,13);
    mText(g,pick+" = "+(isPrime?String(pick):mFactString(pick)),fx,86,MC.violet,14);
    const pairs=[]; for(let a=1;a*a<=pick;a++){ if(pick%a===0) pairs.push([a,pick/a]); }
    const pairText=pairs.map(function(p){ return p[0]+"×"+p[1]; });
    for(let i=0;i<pairText.length;i+=4){ mText(g,(i===0?"Factor pairs: ":"              ")+pairText.slice(i,i+4).join("  "),fx,110+(i/4)*18,MC.muted,12); }
    const best=pairs[pairs.length-1]; const rows=best[0], cols=best[1];
    const sp=Math.min(16,250/cols,130/rows); const ay=150+Math.floor(pairText.length/4)*18;
    for(let r=0;r<rows;r++){ for(let c=0;c<cols;c++){ g.fillStyle="rgba(94,234,212,.85)"; g.beginPath(); g.arc(fx+sp/2+c*sp,ay+sp/2+r*sp,Math.max(1,sp*0.36),0,7); g.fill(); } }
    mText(g,rows+" row"+(rows>1?"s":"")+" × "+cols+" columns = "+pick,fx,ay+rows*sp+20,MC.muted,12);
    const note = steps===0 ? "Sieve: nothing crossed out yet" : "Sieve: multiples of "+used.join(", ")+" crossed out"+(steps===4?" — every number left is prime":"");
    mText(g,note,fx,H-34,MC.gold,12);
    mText(g,"gold = prime   red ✕ = crossed out   teal dot = factor of "+pick,fx,H-14,MC.muted,10);
    say("primesRead",pick+" = "+(isPrime?"prime":mFactString(pick))+"  •  "+divisors.length+" factor"+(divisors.length>1?"s":""));
  }); },
  hcflcm(){ simFrame("hcflcm","hcfCanvas",function(g,W,H,t,get,say){
    const a=get("hlA"), b=get("hlB");
    const expand=function(n){ const out=[]; mFactorize(n).forEach(function(pk){ for(let i=0;i<pk[1];i++) out.push(pk[0]); }); return out; };
    const fa=expand(a), fb=expand(b); const pool=fb.slice(); const shared=[]; const onlyA=[];
    fa.forEach(function(p){ const i=pool.indexOf(p); if(i>-1){ shared.push(p); pool.splice(i,1); } else onlyA.push(p); });
    const onlyB=pool; const hcf=shared.reduce(function(x,y){ return x*y; },1); const lcm=a*b/hcf;
    const cy=146, R=116, ax=268, bx=432;
    g.lineWidth=2; g.fillStyle="rgba(94,234,212,.07)"; g.strokeStyle="rgba(94,234,212,.7)"; g.beginPath(); g.arc(ax,cy,R,0,7); g.fill(); g.stroke();
    g.fillStyle="rgba(201,167,240,.07)"; g.strokeStyle="rgba(201,167,240,.7)"; g.beginPath(); g.arc(bx,cy,R,0,7); g.fill(); g.stroke();
    mText(g,String(a),ax-60,24,MC.teal,18,"center"); mText(g,String(b),bx+60,24,MC.violet,18,"center");
    const tile=function(list,cx,cols,color,textColor){
      list.forEach(function(p,i){ const col=i%cols,row=Math.floor(i/cols); const rowsN=Math.ceil(list.length/cols); const x=cx+(col-(Math.min(cols,list.length)-1)/2)*40; const y=cy+(row-(rowsN-1)/2)*40;
        g.fillStyle=color; g.beginPath(); g.arc(x,y,16,0,7); g.fill(); mText(g,String(p),x,y+5,textColor,14,"center"); });
    };
    tile(onlyA,ax-60,2,"rgba(94,234,212,.85)","#050816"); tile(shared,350,shared.length>5?2:1,"rgba(212,177,106,.95)","#050816"); tile(onlyB,bx+60,2,"rgba(201,167,240,.85)","#050816");
    mText(g,"only in "+a,ax-60,cy+R+18,MC.muted,11,"center"); mText(g,"shared",350,cy+R+18,MC.gold,11,"center"); mText(g,"only in "+b,bx+60,cy+R+18,MC.muted,11,"center");
    const lcmTiles=onlyA.concat(shared,onlyB);
    mText(g,"HCF = "+(shared.length?shared.join(" × ")+" = ":"")+hcf+(hcf===1?"  (no shared primes)":""),W/2,H-30,MC.gold,14,"center");
    mText(g,"LCM = "+lcmTiles.join(" × ")+" = "+lcm,W/2,H-12,MC.text,14,"center");
    say("hcfRead","HCF("+a+", "+b+") = "+hcf+"  •  LCM = "+lcm);
  }); },
  ratiopercent(){ simFrame("ratiopercent","ratioCanvas",function(g,W,H,t,get,say){
    const pct=get("pctValue"), whole=get("pctWhole"), ra=get("ratioA"), rb=get("ratioB");
    const gx=28, gy=40, cs=22;
    mText(g,pct+" out of every 100",gx,26,MC.teal,13);
    for(let i=0;i<100;i++){ const col=i%10,row=Math.floor(i/10); g.fillStyle=i<pct?MC.teal:"rgba(201,167,240,.12)"; g.fillRect(gx+col*cs+1,gy+row*cs+1,cs-2,cs-2); }
    mText(g,pct+"/100 = "+mFmt(pct/100)+" = "+pct+"%",gx,gy+10*cs+22,MC.text,13);
    const part=whole*pct/100; const bx=290,bw=200,by=96;
    mText(g,"Whole amount: "+whole,bx,26,MC.muted,13);
    g.strokeStyle=MC.axis; g.lineWidth=1.5; g.strokeRect(bx,by,bw,36);
    g.fillStyle=MC.gold; g.fillRect(bx,by,bw*pct/100,36);
    g.strokeStyle="rgba(5,8,22,.6)"; g.lineWidth=1; for(let i=1;i<10;i++){ g.beginPath(); g.moveTo(bx+bw*i/10,by); g.lineTo(bx+bw*i/10,by+36); g.stroke(); }
    mText(g,"0",bx,by+54,MC.muted,11,"center"); mText(g,String(whole),bx+bw,by+54,MC.muted,11,"center");
    mText(g,pct+"% of "+whole,bx,by+90,MC.text,14); mText(g,"= "+mFmt(pct/100)+" × "+whole,bx,by+112,MC.muted,13); mText(g,"= "+mFmt(part),bx,by+138,MC.gold,18);
    const rx=528,rw=150,n=ra+rb,bwid=rw/n;
    mText(g,"Ratio  "+ra+" : "+rb,rx,26,MC.violet,13);
    for(let i=0;i<n;i++){ g.fillStyle=i<ra?MC.teal:MC.violet; g.fillRect(rx+i*bwid+1,by,bwid-2,36); }
    mText(g,ra+" parts",rx+ra*bwid/2,by+54,MC.teal,11,"center"); mText(g,rb+" parts",rx+ra*bwid+rb*bwid/2,by+54,MC.violet,11,"center");
    const pa=ra/n*100, pb=rb/n*100; const gg=mGcd(ra,rb);
    mText(g,"First share = "+ra+"/"+n+" = "+mFmt(pa,1)+"%",rx,by+90,MC.teal,12); mText(g,"Second share = "+rb+"/"+n+" = "+mFmt(pb,1)+"%",rx,by+112,MC.violet,12);
    mText(g,gg>1?"Simplest form: "+(ra/gg)+" : "+(rb/gg):"Already in simplest form",rx,by+138,MC.muted,12);
    say("ratioRead",pct+"% of "+whole+" = "+mFmt(part)+"  •  ratio "+ra+":"+rb+" = "+mFmt(pa,1)+"% : "+mFmt(pb,1)+"%");
  }); },
  percentchange(){ simFrame("percentchange","pctChangeCanvas",function(g,W,H,t,get,say){
    const a=get("chgA"), b=get("chgB"); const v0=100, v1=v0*(1+a/100), v2=v1*(1+b/100);
    const vals=[v0,v1,v2]; const labels=["Start","After "+(a>=0?"+":"−")+Math.abs(a)+"%","After "+(b>=0?"+":"−")+Math.abs(b)+"% more"];
    const top=Math.max(v0,v1,v2,100); const sc=190/top, base=H-46, bw=110, gap=70, x0=60;
    vals.forEach(function(v,i){ const x=x0+i*(bw+gap), h=v*sc; g.fillStyle=i===0?"rgba(201,167,240,.8)":(i===1?"rgba(94,234,212,.85)":"rgba(212,177,106,.9)"); g.fillRect(x,base-h,bw,h);
      mText(g,mFmt(v,1),x+bw/2,base-h-8,MC.text,14,"center"); mText(g,labels[i],x+bw/2,base+18,MC.muted,11,"center"); });
    g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(30,base); g.lineTo(W-30,base); g.stroke();
    g.setLineDash([5,5]); g.strokeStyle="rgba(201,167,240,.7)"; g.beginPath(); g.moveTo(30,base-v0*sc); g.lineTo(W-30,base-v0*sc); g.stroke(); g.setLineDash([]);
    const net=v2-v0; mText(g,"Net change: "+(net>=0?"+":"−")+mFmt(Math.abs(net),1)+"%",W-40,50,Math.abs(net)<0.05?MC.teal:MC.gold,16,"right");
    mText(g,Math.abs(net)<0.05?"Back where we started":(net<0?"Ended below the start":"Ended above the start"),W-40,72,MC.muted,12,"right");
    say("pctChangeRead","100 → "+mFmt(v1,1)+" → "+mFmt(v2,1)+"  (net "+(net>=0?"+":"−")+mFmt(Math.abs(net),1)+"%)");
  }); },
  exponents(){ simFrame("exponents","exponentCanvas",function(g,W,H,t,get,say){
    const b=get("baseInput"), e=get("expInput"); const vals=[]; for(let k=0;k<=6;k++) vals.push(Math.pow(b,k));
    const cur=vals[e]; const bx=36, base=H-46, bw=44, gap=12, maxH=H-120;
    g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(24,base); g.lineTo(24+7*(bw+gap)+8,base); g.stroke();
    for(let k=0;k<=6;k++){ const h=Math.max(3,vals[k]/vals[6]*maxH); const x=bx+k*(bw+gap); g.fillStyle=k<=e?(k===e?MC.gold:"rgba(212,177,106,.45)"):"rgba(201,167,240,.14)"; g.fillRect(x,base-h,bw,h);
      mText(g,b+mSup(k),x+bw/2,base+16,k===e?MC.gold:MC.muted,12,"center"); if(k<=e) mText(g,mBig(vals[k]),x+bw/2,base-h-6,MC.text,10,"center"); }
    mText(g,"Each bar is the base times the one before it",bx,26,MC.muted,12);
    const px=470;
    if(e===2){ const cs=Math.min(44,200/b); mText(g,b+"² is the area of a "+b+" × "+b+" square",px,50,MC.teal,12);
      for(let r=0;r<b;r++){ for(let c=0;c<b;c++){ g.fillStyle="rgba(94,234,212,.7)"; g.fillRect(px+c*cs+1,70+r*cs+1,cs-2,cs-2); } } }
    else if(e===3){ const cs=Math.min(34,150/b), off=Math.min(16,90/b); mText(g,b+"³ is the volume of a "+b+" × "+b+" × "+b+" cube",px,50,MC.teal,12);
      for(let L=b-1;L>=0;L--){ for(let r=0;r<b;r++){ for(let c=0;c<b;c++){ g.fillStyle="rgba(94,234,212,"+(0.25+0.5*(1-L/b))+")"; g.strokeStyle="rgba(2,6,23,.8)"; g.lineWidth=1; const x=px+c*cs+L*off, y=76+(b-1)*off+r*cs-L*off; g.fillRect(x,y,cs,cs); g.strokeRect(x,y,cs,cs); } } } }
    else { const chain=[]; for(let k=0;k<e;k++) chain.push(b); mText(g,e===0?"Multiplying by "+b+" zero times leaves 1":(e===1?"One copy of "+b+" is just "+b:"Multiply "+b+" by itself "+e+" times"),px,50,MC.teal,12);
      let run=1; for(let k=0;k<=e;k++){ const rad=Math.min(30,8+Math.log(run+1)*5); const cx=px+30+(k%4)*70, cy=120+Math.floor(k/4)*80; g.fillStyle=k===e?MC.gold:"rgba(212,177,106,.4)"; g.beginPath(); g.arc(cx,cy,rad,0,7); g.fill(); mText(g,mBig(run),cx,cy+4,"#050816",run>9999?9:11,"center"); if(k<e){ mText(g,"×"+b,cx+35,cy-rad-2,MC.muted,10,"center"); } run*=b; } }
    say("exponentRead",e===0?b+"⁰ = 1":(e===1?b+"¹ = "+b:b+mSup(e)+" = "+Array(e).fill(b).join(" × ")+" = "+mBig(cur)));
  }); },
  roots(){ simFrame("roots","rootsCanvas",function(g,W,H,t,get,say){
    const A=get("rootArea"); const s=Math.sqrt(A); const lo=Math.floor(s), hi=Math.ceil(s); const u=30, x0=26, y0=14;
    g.fillStyle="rgba(212,177,106,.28)"; g.fillRect(x0,y0,s*u,s*u);
    g.strokeStyle=MC.grid; g.lineWidth=1; for(let i=0;i<=hi;i++){ g.beginPath(); g.moveTo(x0+i*u,y0); g.lineTo(x0+i*u,y0+hi*u); g.stroke(); g.beginPath(); g.moveTo(x0,y0+i*u); g.lineTo(x0+hi*u,y0+i*u); g.stroke(); }
    g.strokeStyle=MC.teal; g.lineWidth=2; g.strokeRect(x0,y0,lo*u,lo*u);
    if(hi!==lo){ g.strokeStyle=MC.violet; g.setLineDash([6,5]); g.strokeRect(x0,y0,hi*u,hi*u); g.setLineDash([]); }
    g.strokeStyle=MC.gold; g.lineWidth=3; g.strokeRect(x0,y0,s*u,s*u);
    const px=380; const perfect=Math.abs(s-Math.round(s))<1e-9;
    mText(g,"Square with area "+A,px,40,MC.gold,16); mText(g,"Side length = √"+A+(perfect?" = "+Math.round(s):" ≈ "+mFmt(s,3)),px,68,MC.text,15);
    mText(g,"teal square: "+lo+" × "+lo+" = "+(lo*lo),px,104,MC.teal,13);
    if(hi!==lo){ mText(g,"violet square: "+hi+" × "+hi+" = "+(hi*hi),px,126,MC.violet,13); mText(g,"So √"+A+" sits between "+lo+" and "+hi,px,160,MC.text,14);
      mText(g,"Not a perfect square, so √"+A+" is irrational:",px,196,MC.muted,12); mText(g,"its decimal never ends or repeats.",px,214,MC.muted,12); }
    else { mText(g,"A perfect square: the root is a whole number",px,150,MC.gold,14); mText(g,"and fits the grid exactly.",px,170,MC.muted,12); }
    say("rootsRead","√"+A+(perfect?" = "+Math.round(s):" ≈ "+mFmt(s,3)+"  (between "+lo+" and "+hi+")"));
  }); },
  fractionsadd(){
    const pairs=[["fn1","fd1"],["fn2","fd2"]];
    const clamp=function(){ pairs.forEach(function(p){ const n=document.getElementById(p[0]), d=document.getElementById(p[1]); n.max=d.value; if(Number(n.value)>Number(d.value)) n.value=d.value; }); };
    pairs.forEach(function(p){ document.getElementById(p[1]).addEventListener("input",clamp); }); clamp();
    simFrame("fractionsadd","fracAddCanvas",function(g,W,H,t,get,say){
      const n1=get("fn1"), d1=get("fd1"), n2=get("fn2"), d2=get("fd2"); const L=d1*d2/mGcd(d1,d2); const a=n1*L/d1, b=n2*L/d2, S=a+b;
      const U=280, x0=30; const bar=function(x,y,w,h,parts,filled,color,partsPerUnit){ for(let i=0;i<parts;i++){ g.fillStyle=i<filled?color:"rgba(201,167,240,.10)"; g.fillRect(x+i*w/parts+1,y,w/parts-2,h); } };
      mText(g,"A = "+n1+"/"+d1,x0,22,MC.teal,13); bar(x0,28,U,30,d1,n1,MC.teal);
      mText(g,"B = "+n2+"/"+d2,x0,86,MC.violet,13); bar(x0,92,U,30,d2,n2,MC.violet);
      mText(g,"Same-size slices (LCD = "+L+"):",x0,150,MC.muted,12);
      bar(x0,158,U,22,L,a,MC.teal); bar(x0,186,U,22,L,b,MC.violet);
      mText(g,n1+"/"+d1+" = "+a+"/"+L,x0+U+14,174,MC.teal,12); mText(g,n2+"/"+d2+" = "+b+"/"+L,x0+U+14,202,MC.violet,12);
      mText(g,"A + B  (each whole = "+L+" slices)",x0,238,MC.gold,13);
      const total=Math.max(1,Math.ceil(S/L)); const sw=U*Math.min(total,2)/total*total; const unitW=(W-2*x0-20)/Math.max(2,total)>U?U:(W-2*x0-20)/Math.max(2,total);
      for(let u=0;u<total;u++){ for(let i=0;i<L;i++){ const idx=u*L+i; g.fillStyle=idx<a?MC.teal:(idx<S?MC.violet:"rgba(201,167,240,.10)"); g.fillRect(x0+u*unitW+i*unitW/L+1,246,unitW/L-2,34); } g.strokeStyle=MC.axis; g.lineWidth=1.5; g.strokeRect(x0+u*unitW,246,unitW,34); }
      const gg=mGcd(S,L), sn=S/gg, sd=L/gg; let res=sn+"/"+sd; if(sn>sd){ const whole=Math.floor(sn/sd), rem=sn%sd; res+= rem?"  ( "+whole+" "+rem+"/"+sd+" )":"  ( "+whole+" )"; } else if(sn===sd){ res="1"; }
      mText(g,n1+"/"+d1+" + "+n2+"/"+d2+" = "+a+"/"+L+" + "+b+"/"+L+" = "+S+"/"+L,x0+U+14,34,MC.text,13);
      mText(g,"= "+res,x0+U+14,58,MC.gold,16); mText(g,"≈ "+mFmt(S/L,3)+" = "+mFmt(S/L*100,1)+"%",x0+U+14,82,MC.muted,13);
      say("fracAddRead",n1+"/"+d1+" + "+n2+"/"+d2+" = "+a+"/"+L+" + "+b+"/"+L+" = "+S+"/"+L+(gg>1||sn>sd?"  = "+res:""));
    });
  },
  decimalexpand(){ simFrame("decimalexpand","decCanvas",function(g,W,H,t,get,say){
    const p=get("decP"), q=get("decQ"); const gg=mGcd(p,q), rq=q/gg;
    const intPart=Math.floor(p/q); let r=p%q; const digits=[],rems=[]; const seen={}; let rep=-1;
    while(r!==0 && digits.length<40){ if(seen[r]!==undefined){ rep=seen[r]; break; } seen[r]=digits.length; rems.push(r); r*=10; digits.push(Math.floor(r/q)); r%=q; }
    const terminates=(r===0);
    const cw=Math.min(24,(W-120)/(digits.length+2)), x0=40, y=90;
    mText(g,p+" ÷ "+q+" by long division",x0,28,MC.muted,13);
    g.fillStyle="rgba(237,242,247,.12)"; g.fillRect(x0,y-26,cw,34); mText(g,String(intPart),x0+cw/2,y-3,MC.text,18,"center"); mText(g,".",x0+cw+4,y,MC.text,22,"center");
    digits.forEach(function(d,i){ const x=x0+cw+10+i*cw; const inRep=(rep>-1 && i>=rep); g.fillStyle=inRep?"rgba(201,167,240,.35)":"rgba(94,234,212,.18)"; g.fillRect(x,y-26,cw-2,34); mText(g,String(d),x+cw/2-1,y-3,inRep?MC.violet:MC.teal,18,"center"); mText(g,String(rems[i]),x+cw/2-1,y+26,MC.muted,10,"center"); });
    mText(g,"remainder before each step",x0+cw+10,y+50,MC.muted,10);
    if(rep>-1){ const x1=x0+cw+10+rep*cw, x2=x0+cw+10+digits.length*cw-2; g.strokeStyle=MC.violet; g.lineWidth=2; g.beginPath(); g.moveTo(x1,y+10); g.lineTo(x2,y+10); g.stroke(); mText(g,"repeats forever ("+(digits.length-rep)+" digit"+(digits.length-rep>1?"s":"")+")",(x1+x2)/2,y-40,MC.violet,12,"center"); mText(g,"→ …",x2+14,y-3,MC.violet,16,"center"); }
    else if(terminates){ mText(g,"remainder hit 0 — the decimal stops",x0+cw+10,y-40,MC.teal,12); }
    const fact=mFactorize(rq).map(function(f){ return f[0]; }); const only25=fact.every(function(f){ return f===2||f===5; });
    mText(g,"In lowest terms: "+(p/gg)+"/"+rq,x0,176,MC.text,13);
    mText(g,rq===1?"The denominator is 1, so this is a whole number.":"Denominator "+rq+" = "+mFactString(rq),x0,200,MC.text,13);
    mText(g,only25?"Only the primes 2 and 5 appear, so the decimal stops.":"A prime other than 2 or 5 appears, so the decimal repeats.",x0,224,only25?MC.teal:MC.violet,13);
    mText(g,"Irrational numbers like π and √2 never stop and never repeat,",x0,262,MC.muted,12); mText(g,"so they can’t be written as any fraction p/q.",x0,280,MC.muted,12);
    const dec=intPart+"."+digits.slice(0,rep>-1?digits.length:digits.length).join("");
    say("decRead",p+"/"+q+" = "+(digits.length?dec:String(intPart))+(rep>-1?"… (repeats every "+(digits.length-rep)+")":(digits.length?" (stops)":"")));
  }); },
  /* ===== MATHS: ALGEBRA & CHANGE ===== */
  functionmachine(){ simFrame("functionmachine","machineCanvas",function(g,W,H,t,get,say){
    const mul=get("fmMul"), add=get("fmAdd"), x=get("fmIn"); const mid=x*mul, out=mid+add;
    const bw=118,bh=64,by=70; const xs=[28,188,348,508];
    const box=function(i,y,label,sub,color){ g.fillStyle="rgba(17,25,54,.95)"; g.strokeStyle=color; g.lineWidth=2; g.beginPath(); g.roundRect?g.roundRect(xs[i],y,bw,bh,12):g.rect(xs[i],y,bw,bh); g.fill(); g.stroke(); mText(g,label,xs[i]+bw/2,y+28,color,16,"center"); mText(g,sub,xs[i]+bw/2,y+49,MC.muted,11,"center"); };
    mText(g,"Forward: build the output",28,40,MC.teal,13);
    box(0,by,String(x),"input x",MC.teal); box(1,by,"× "+mul,"multiply",MC.gold); box(2,by,(add>=0?"+ ":"− ")+Math.abs(add),"then add",MC.gold); box(3,by,String(out),"output",MC.teal);
    for(let i=0;i<3;i++) mArrow(g,xs[i]+bw+4,by+bh/2,xs[i+1]-4,by+bh/2,"rgba(94,234,212,.7)");
    mText(g,String(mid),(xs[1]+bw+xs[2])/2,by-6,MC.text,13,"center");
    const ry=215; mText(g,"Backward: undo it in reverse order",28,ry-16,MC.gold,13);
    box(3,ry,String(out),"output",MC.violet); box(2,ry,(add>=0?"− ":"+ ")+Math.abs(add),"undo the add",MC.violet); box(1,ry,"÷ "+mul,"undo the multiply",MC.violet); box(0,ry,String(x),"x recovered",MC.violet);
    for(let i=3;i>0;i--) mArrow(g,xs[i]-4,ry+bh/2,xs[i-1]+bw+4,ry+bh/2,"rgba(201,167,240,.7)");
    mText(g,String(mid),(xs[1]+bw+xs[2])/2,ry-6,MC.text,13,"center");
    const ph=(t/2400)%1; const fx=xs[0]+bw/2+ph*(xs[3]-xs[0]); g.fillStyle=MC.teal; g.beginPath(); g.arc(fx,by+bh/2,6,0,7); g.fill();
    const bx2=xs[3]+bw/2-ph*(xs[3]-xs[0]); g.fillStyle=MC.violet; g.beginPath(); g.arc(bx2,ry+bh/2,6,0,7); g.fill();
    say("machineRead","x = "+x+" → ×"+mul+" = "+mid+" → "+(add>=0?"+":"−")+Math.abs(add)+" = "+out+"   |   undo: "+out+" "+(add>=0?"−":"+")+" "+Math.abs(add)+" = "+mid+", "+mid+" ÷ "+mul+" = "+x);
  },true); },
  linegraph(){ simFrame("linegraph","lineCanvas",function(g,W,H,t,get,say){
    const m=get("slopeInput"), c0=get("interceptInput"), px=get("probeX"); const ox=240, oy=H/2, u=20, pw=480;
    mGrid(g,ox,oy,u,u,pw,H);
    g.save(); g.beginPath(); g.rect(0,0,pw,H); g.clip();
    g.strokeStyle=MC.gold; g.lineWidth=3; g.beginPath(); g.moveTo(ox-13*u,oy-(m*-13+c0)*u); g.lineTo(ox+13*u,oy-(m*13+c0)*u); g.stroke();
    const yI=oy-c0*u; g.strokeStyle=MC.teal; g.setLineDash([5,4]); g.lineWidth=2; g.beginPath(); g.moveTo(ox,yI); g.lineTo(ox+u,yI); g.stroke();
    g.strokeStyle=MC.violet; g.beginPath(); g.moveTo(ox+u,yI); g.lineTo(ox+u,yI-m*u); g.stroke(); g.setLineDash([]);
    g.fillStyle=MC.gold; g.beginPath(); g.arc(ox,yI,5,0,7); g.fill();
    const py=m*px+c0; const sx=ox+px*u, sy=oy-py*u; g.strokeStyle="rgba(94,234,212,.5)"; g.setLineDash([3,4]); g.lineWidth=1; g.beginPath(); g.moveTo(sx,oy); g.lineTo(sx,sy); g.lineTo(ox,sy); g.stroke(); g.setLineDash([]);
    g.fillStyle=MC.teal; g.beginPath(); g.arc(sx,sy,6,0,7); g.fill(); g.restore();
    mText(g,"run 1",ox+u/2,yI+(m>=0?16:-8),MC.teal,10,"center");
    const rx=pw+16; mText(g,mLineEq(m,c0),rx,52,MC.gold,22);
    mText(g,"slope m = "+mFmt(m),rx,92,MC.violet,13); mText(g,m===0?"flat: no rise at all":(m>0?"up "+mFmt(m)+" for every 1 across":"down "+mFmt(-m)+" for every 1 across"),rx,112,MC.muted,11);
    mText(g,"y-intercept c = "+mFmt(c0),rx,148,MC.teal,13); mText(g,"crosses the y-axis at (0, "+mFmt(c0)+")",rx,168,MC.muted,11);
    mText(g,"Probe at x = "+px,rx,204,MC.text,13); mText(g,"y = "+mFmt(m)+" × "+(px<0?"("+mFmt(px)+")":px)+" + "+(c0<0?"("+mFmt(c0)+")":c0),rx,224,MC.muted,11); mText(g,"y = "+mFmt(py),rx,246,MC.teal,16);
    say("lineRead",mLineEq(m,c0)+"  •  at x = "+px+", y = "+mFmt(py));
  }); },
  lineintersect(){ simFrame("lineintersect","intersectCanvas",function(g,W,H,t,get,say){
    const m1=get("m1"), c1=get("c1"), m2=get("m2"), c2=get("c2"); const ox=240, oy=H/2, u=17, pw=480;
    mGrid(g,ox,oy,u,u,pw,H);
    g.save(); g.beginPath(); g.rect(0,0,pw,H); g.clip();
    const ln=function(m,c,col){ g.strokeStyle=col; g.lineWidth=3; g.beginPath(); g.moveTo(ox-15*u,oy-(m*-15+c)*u); g.lineTo(ox+15*u,oy-(m*15+c)*u); g.stroke(); };
    ln(m1,c1,MC.teal); ln(m2,c2,MC.violet);
    let msg, hit=null;
    if(m1!==m2){ const x=(c2-c1)/(m1-m2), y=m1*x+c1; hit=[x,y]; g.fillStyle=MC.gold; g.beginPath(); g.arc(ox+x*u,oy-y*u,7,0,7); g.fill(); g.strokeStyle="#050816"; g.lineWidth=2; g.stroke(); msg="Lines meet at ("+mFmt(x)+", "+mFmt(y)+")"; }
    else if(c1===c2) msg="Same line: infinitely many solutions"; else msg="Parallel lines: they never meet, so no solution";
    g.restore();
    const rx=pw+16; mText(g,mLineEq(m1,c1),rx,40,MC.teal,16); mText(g,mLineEq(m2,c2),rx,66,MC.violet,16);
    mText(g,"Set them equal:",rx,108,MC.muted,12); mText(g,mLineEq(m1,c1).slice(4)+" = "+mLineEq(m2,c2).slice(4),rx,128,MC.muted,11);
    if(hit){ mText(g,"x = ("+mFmt(c2)+" − "+(c1<0?"("+mFmt(c1)+")":mFmt(c1))+") ÷ ("+mFmt(m1)+" − "+(m2<0?"("+mFmt(m2)+")":mFmt(m2))+")",rx,152,MC.muted,11); mText(g,"x = "+mFmt(hit[0]),rx,180,MC.gold,15); mText(g,"y = "+mFmt(hit[1]),rx,204,MC.gold,15); }
    else mText(g,m1===m2?"Equal slopes — the lines can’t cross.":"",rx,152,MC.rose,12);
    say("intersectRead",msg);
  }); },
  quadratic(){ simFrame("quadratic","quadCanvas",function(g,W,H,t,get,say){
    const a=get("quadA"), b=get("quadB"), c0=get("quadC"); const ox=240, oy=H/2, ux=22, uy=16, pw=480;
    mGrid(g,ox,oy,ux,uy,pw,H); g.save(); g.beginPath(); g.rect(0,0,pw,H); g.clip();
    const f=function(x){ return a*x*x+b*x+c0; };
    g.strokeStyle=a===0?MC.rose:MC.gold; g.lineWidth=3; g.beginPath(); let started=false;
    for(let px=0;px<=pw;px+=2){ const x=(px-ox)/ux, y=f(x); const py=oy-y*uy; if(!started){ g.moveTo(px,py); started=true; } else g.lineTo(px,py); } g.stroke();
    let info1="", info2="", info3="";
    if(a!==0){ const vx=-b/(2*a), vy=f(vx), D=b*b-4*a*c0;
      g.setLineDash([5,5]); g.strokeStyle="rgba(94,234,212,.55)"; g.lineWidth=1.5; g.beginPath(); g.moveTo(ox+vx*ux,0); g.lineTo(ox+vx*ux,H); g.stroke(); g.setLineDash([]);
      g.fillStyle=MC.teal; g.beginPath(); g.arc(ox+vx*ux,oy-vy*uy,6,0,7); g.fill();
      if(D>=0){ const r1=(-b-Math.sqrt(D))/(2*a), r2=(-b+Math.sqrt(D))/(2*a); [r1,r2].forEach(function(r){ g.fillStyle=MC.violet; g.beginPath(); g.arc(ox+r*ux,oy,6,0,7); g.fill(); }); info1=D===0?"one root: x = "+mFmt(r1):"roots: x = "+mFmt(Math.min(r1,r2))+" and "+mFmt(Math.max(r1,r2)); } else info1="no real roots";
      info2="vertex ("+mFmt(vx)+", "+mFmt(vy)+")"; info3="D = b² − 4ac = "+mFmt(D);
      g.restore(); const rx=pw+16;
      mText(g,"y = "+(a===1?"":(a===-1?"−":mFmt(a)))+"x²"+(b?(b>0?" + ":" − ")+(Math.abs(b)===1?"":mFmt(Math.abs(b)))+"x":"")+(c0?(c0>0?" + ":" − ")+mFmt(Math.abs(c0)):""),rx,44,MC.gold,16);
      mText(g,a>0?"a > 0: opens upward ∪":"a < 0: opens downward ∩",rx,82,MC.muted,12);
      mText(g,"axis: x = −b ÷ 2a = "+mFmt(vx),rx,116,MC.teal,12); mText(g,info2,rx,138,MC.teal,13);
      mText(g,info3,rx,174,MC.muted,12); mText(g,D>0?"D > 0 → two roots":(D===0?"D = 0 → one root":"D < 0 → no real roots"),rx,194,MC.muted,12); mText(g,info1,rx,222,MC.violet,13);
      mText(g,"y-intercept (0, "+mFmt(c0)+")",rx,258,MC.muted,12);
      say("quadRead",info2+"  •  "+info1);
    } else { g.restore(); const rx=pw+16; mText(g,mLineEq(b,c0),rx,44,MC.rose,16); mText(g,"a = 0 removes the x² term,",rx,90,MC.muted,12); mText(g,"so this is only a straight line.",rx,110,MC.muted,12); mText(g,"Set a to anything but 0 to bend it.",rx,138,MC.gold,12); say("quadRead","a = 0: a straight line, not a parabola"); }
  }); },
  throwball(){ simFrame("throwball","throwCanvas",function(g,W,H,t,get,say){
    const v=get("throwSpeed"), ang=get("throwAngle")*Math.PI/180, h0=get("throwHeight"), G=get("throwG"); const vx=v*Math.cos(ang), vy=v*Math.sin(ang);
    const T=(vy+Math.sqrt(vy*vy+2*G*h0))/G, R=vx*T, hmax=h0+vy*vy/(2*G);
    const gx=44, gy=H-44; const sc=Math.min(22,(W-120)/Math.max(R,1),(H-110)/Math.max(hmax,1));
    g.fillStyle="rgba(94,234,212,.08)"; g.fillRect(0,gy,W,H-gy); g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(0,gy); g.lineTo(W,gy); g.stroke();
    const pos=function(tt){ return [gx+vx*tt*sc, gy-(h0+vy*tt-0.5*G*tt*tt)*sc]; };
    g.setLineDash([4,5]); g.strokeStyle="rgba(212,177,106,.6)"; g.lineWidth=2; g.beginPath(); for(let i=0;i<=80;i++){ const p=pos(T*i/80); if(i===0) g.moveTo(p[0],p[1]); else g.lineTo(p[0],p[1]); } g.stroke(); g.setLineDash([]);
    const tApex=vy/G; if(tApex>0){ const pa=pos(tApex); g.fillStyle=MC.violet; g.beginPath(); g.arc(pa[0],pa[1],4,0,7); g.fill(); mText(g,"peak "+mFmt(hmax,1)+" m",pa[0],pa[1]-10,MC.violet,11,"center"); }
    const pl=pos(T); g.fillStyle=MC.teal; g.beginPath(); g.arc(pl[0],gy,4,0,7); g.fill(); mText(g,"lands "+mFmt(R,1)+" m away",Math.min(pl[0],W-70),gy+18,MC.teal,11,"center");
    if(h0>0){ g.strokeStyle=MC.muted; g.lineWidth=3; g.beginPath(); g.moveTo(gx,gy); g.lineTo(gx,gy-h0*sc); g.stroke(); }
    const tau=(t/1000)%(T+0.9); const tt=Math.min(tau,T); const pb=pos(tt); g.fillStyle=MC.gold; g.beginPath(); g.arc(pb[0],pb[1],8,0,7); g.fill();
    mText(g,"height(t) = "+mFmt(h0,1)+" + "+mFmt(vy,1)+"·t − "+mFmt(G/2,2)+"·t²",16,26,MC.text,13); mText(g,"a squared time term: that is a quadratic in t",16,46,MC.muted,11);
    say("throwRead","Range "+mFmt(R,1)+" m  •  Peak "+mFmt(hmax,1)+" m  •  In the air "+mFmt(T,2)+" s");
  },true); },
  sequences(){ simFrame("sequences","seqCanvas",function(g,W,H,t,get,say){
    const a=get("seqFirst"), d=get("seqDiff"), r=get("seqRatio"), N=get("seqN"); const base=H-44, top=70, cap=60, sc=(base-top)/cap, x0=40, step=(W-80)/12;
    g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(24,base); g.lineTo(W-20,base); g.stroke();
    g.fillStyle="rgba(212,177,106,.08)"; g.fillRect(x0+(N-1)*step-4,top-20,step,base-top+20);
    let aN=0,gN=0;
    for(let n=1;n<=12;n++){ const av=a+(n-1)*d, gv=a*Math.pow(r,n-1); const x=x0+(n-1)*step+step/2-4;
      const h=Math.min(av,cap)*sc; g.fillStyle=n===N?MC.violet:"rgba(201,167,240,.55)"; g.fillRect(x-18,base-h,16,h);
      const gy=base-Math.min(gv,cap)*sc; g.fillStyle=n===N?MC.gold:"rgba(212,177,106,.8)"; g.beginPath(); g.arc(x+10,gy,6,0,7); g.fill();
      if(gv>cap){ mText(g,"↑",x+10,top-6,MC.gold,12,"center"); }
      mText(g,String(n),x,base+16,n===N?MC.text:MC.muted,11,"center"); if(n===N){ aN=av; gN=gv; } }
    g.fillStyle="rgba(201,167,240,.7)"; g.fillRect(40,20,14,10); mText(g,"Arithmetic: add "+mFmt(d)+" each time",60,29,MC.violet,12);
    g.fillStyle=MC.gold; g.beginPath(); g.arc(47,46,5,0,7); g.fill(); mText(g,"Geometric: multiply by "+mFmt(r)+" each time",60,50,MC.gold,12);
    mText(g,"term number n",W/2,H-8,MC.muted,10,"center"); mText(g,"↑ = off the chart",W-24,29,MC.gold,11,"right");
    say("seqRead","term "+N+":  arithmetic = "+mBig(Math.round(aN*100)/100)+"  •  geometric = "+mBig(Math.round(gN*100)/100));
  }); },
  staircase(){ simFrame("staircase","stairCanvas",function(g,W,H,t,get,say){
    const n=get("stairN"); const cs=Math.min(28,(W-120)/(n+1),(H-90)/n); const x0=(W-(n+1)*cs)/2, y0=34;
    for(let r=0;r<n;r++){ for(let c=0;c<=r;c++){ g.fillStyle="rgba(94,234,212,.85)"; g.fillRect(x0+c*cs+1,y0+r*cs+1,cs-2,cs-2); } }
    for(let r=0;r<n;r++){ for(let c=r+1;c<=n;c++){ g.fillStyle="rgba(212,177,106,.85)"; g.fillRect(x0+c*cs+1,y0+r*cs+1,cs-2,cs-2); } }
    g.strokeStyle=MC.text; g.lineWidth=2; g.strokeRect(x0,y0,(n+1)*cs,n*cs);
    mText(g,"The teal staircase is 1 + 2 + … + "+n+"; the gold one is a copy turned upside down.",W/2,20,MC.muted,12,"center");
    mText(g,"Together they fill a "+n+" × "+(n+1)+" rectangle = "+(n*(n+1))+" squares",W/2,y0+n*cs+26,MC.text,13,"center");
    mText(g,"So one staircase is half of it: "+(n*(n+1)/2),W/2,y0+n*cs+48,MC.gold,14,"center");
    say("stairRead","1 + 2 + … + "+n+" = "+n+" × "+(n+1)+" ÷ 2 = "+(n*(n+1)/2));
  }); },
  derivative(){ simFrame("derivative","derivCanvas",function(g,W,H,t,get,say){
    const fn=get("calcFn"), x=get("calcX"), h=get("calcH"); const F=[null,
      { f:function(x){ return x*x; }, d:function(x){ return 2*x; }, name:"f(x) = x²", dn:"f′(x) = 2x", oy:H-70, uy:22 },
      { f:function(x){ return x*x*x; }, d:function(x){ return 3*x*x; }, name:"f(x) = x³", dn:"f′(x) = 3x²", oy:H/2, uy:5.5 },
      { f:function(x){ return Math.sin(x); }, d:function(x){ return Math.cos(x); }, name:"f(x) = sin x", dn:"f′(x) = cos x", oy:H/2, uy:90 }][fn];
    const ox=240, ux=44, pw=480, oy=F.oy, uy=F.uy;
    mGrid(g,ox,oy,ux,uy,pw,H,1); g.save(); g.beginPath(); g.rect(0,0,pw,H); g.clip();
    g.strokeStyle=MC.gold; g.lineWidth=3; g.beginPath(); for(let px=0;px<=pw;px+=2){ const xx=(px-ox)/ux; const py=oy-F.f(xx)*uy; if(px===0) g.moveTo(px,py); else g.lineTo(px,py); } g.stroke();
    const y1=F.f(x), y2=F.f(x+h), sec=(y2-y1)/h, tan=F.d(x);
    const line=function(slope,col,w,dash){ g.strokeStyle=col; g.lineWidth=w; g.setLineDash(dash||[]); g.beginPath(); g.moveTo(0,oy-(y1+slope*((0-ox)/ux-x))*uy); g.lineTo(pw,oy-(y1+slope*((pw-ox)/ux-x))*uy); g.stroke(); g.setLineDash([]); };
    line(tan,"rgba(94,234,212,.9)",2); line(sec,"rgba(201,167,240,.95)",2,[7,5]);
    g.fillStyle=MC.teal; g.beginPath(); g.arc(ox+x*ux,oy-y1*uy,6,0,7); g.fill(); g.fillStyle=MC.violet; g.beginPath(); g.arc(ox+(x+h)*ux,oy-y2*uy,6,0,7); g.fill(); g.restore();
    const rx=pw+16; mText(g,F.name,rx,30,MC.gold,15); mText(g,F.dn,rx,52,MC.teal,13);
    mText(g,"first point  x = "+mFmt(x,1),rx,88,MC.teal,12); mText(g,"second point x + h = "+mFmt(x+h,2),rx,108,MC.violet,12);
    mText(g,"secant slope = "+mFmt(sec,3),rx,140,MC.violet,13); mText(g,"tangent slope = "+mFmt(tan,3),rx,162,MC.teal,13);
    mText(g,"Secant slope as h shrinks:",rx,196,MC.muted,11);
    [1,0.5,0.1,0.01].forEach(function(hh,i){ mText(g,"h = "+hh+"  →  "+mFmt((F.f(x+hh)-y1)/hh,3),rx,216+i*18,MC.muted,11); });
    say("derivRead","secant slope "+mFmt(sec,3)+"  →  tangent slope "+mFmt(tan,3)+" (at x = "+mFmt(x,1)+")");
  }); },
  riemann(){ simFrame("riemann","riemannCanvas",function(g,W,H,t,get,say){
    const n=get("riemannN"); const x0=60, ux=200, base=H-40, uy=(H-70)/9; const dx=3/n; let sum=0;
    g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(40,base); g.lineTo(W-30,base); g.moveTo(x0,base+4); g.lineTo(x0,20); g.stroke();
    for(let i=0;i<n;i++){ const xi=i*dx, h=xi*xi; sum+=h*dx; g.fillStyle="rgba(94,234,212,.35)"; g.strokeStyle="rgba(94,234,212,.9)"; g.lineWidth=n>30?0.5:1.2; g.fillRect(x0+xi*ux,base-h*uy,dx*ux,h*uy); g.strokeRect(x0+xi*ux,base-h*uy,dx*ux,h*uy); }
    g.strokeStyle=MC.gold; g.lineWidth=3; g.beginPath(); for(let px=0;px<=3*ux;px+=2){ const xx=px/ux; const py=base-xx*xx*uy; if(px===0) g.moveTo(x0+px,py); else g.lineTo(x0+px,py); } g.stroke();
    mText(g,"0",x0,base+18,MC.muted,11,"center"); mText(g,"3",x0+3*ux,base+18,MC.muted,11,"center");
    mText(g,"y = x²",x0+2.25*ux,base-6.6*uy,MC.gold,13,"center");
    mText(g,n+" rectangle"+(n>1?"s":"")+" of width "+mFmt(dx,3),x0+24,34,MC.teal,13); mText(g,"sum of areas = "+mFmt(sum,3),x0+24,58,MC.text,15);
    mText(g,"exact area = 9",x0+24,82,MC.gold,13); mText(g,"gap = "+mFmt(9-sum,3),x0+24,102,MC.muted,12);
    say("riemannRead",n+" rectangle"+(n>1?"s":"")+" → "+mFmt(sum,3)+"   (exact area under x² from 0 to 3 is 9)");
  }); },
  /* ===== MATHS: SHAPES, SPACE, DATA ===== */
  trianglebuilder(){ simFrame("trianglebuilder","triCanvas",function(g,W,H,t,get,say){
    const base=get("triBase"), ht=get("triHeight"), apex=get("triApex");
    const minX=Math.min(0,apex), maxX=Math.max(base,apex); const sc=Math.min(38,(W-200)/(maxX-minX),(H-110)/ht); const ax=60-minX*sc, ay=H-50;
    const A=[ax,ay], B=[ax+base*sc,ay], C=[ax+apex*sc,ay-ht*sc];
    g.fillStyle="rgba(201,167,240,.07)"; g.fillRect(ax,ay-ht*sc,base*sc,ht*sc); g.setLineDash([4,5]); g.strokeStyle="rgba(201,167,240,.4)"; g.lineWidth=1; g.strokeRect(ax,ay-ht*sc,base*sc,ht*sc); g.setLineDash([]);
    g.fillStyle="rgba(94,234,212,.22)"; g.strokeStyle=MC.gold; g.lineWidth=3; g.beginPath(); g.moveTo(A[0],A[1]); g.lineTo(B[0],B[1]); g.lineTo(C[0],C[1]); g.closePath(); g.fill(); g.stroke();
    g.setLineDash([5,4]); g.strokeStyle=MC.teal; g.lineWidth=1.5; g.beginPath(); g.moveTo(C[0],C[1]); g.lineTo(C[0],ay); g.stroke(); g.setLineDash([]);
    const angA=Math.atan2(ht,apex)*180/Math.PI, angB=Math.atan2(ht,base-apex)*180/Math.PI, angC=180-angA-angB;
    g.strokeStyle=MC.text; g.lineWidth=1.5; g.beginPath(); g.arc(A[0],A[1],26,-angA*Math.PI/180,0); g.stroke(); g.beginPath(); g.arc(B[0],B[1],26,Math.PI,Math.PI+angB*Math.PI/180); g.stroke();
    mText(g,mFmt(angA,0)+"°",A[0]+30,A[1]-8,MC.text,12); mText(g,mFmt(angB,0)+"°",B[0]-30,B[1]-8,MC.text,12,"right"); mText(g,mFmt(angC,0)+"°",C[0]+(C[0]>(A[0]+B[0])/2?10:-10),C[1]+(C[1]<40?16:-8),MC.text,12,C[0]>(A[0]+B[0])/2?"left":"right");
    mText(g,"base "+base,(A[0]+B[0])/2,ay+22,MC.muted,12,"center"); mText(g,"height "+ht,C[0]+6,(C[1]+ay)/2,MC.teal,12);
    const rx=W-190; mText(g,"Area = ½ × "+base+" × "+ht,rx,40,MC.gold,14); mText(g,"= "+mFmt(base*ht/2),rx,64,MC.gold,20);
    mText(g,"The dashed rectangle is "+mFmt(base*ht),rx,96,MC.muted,11); mText(g,"— the triangle is exactly half.",rx,112,MC.muted,11);
    mText(g,"Angles: "+mFmt(angA,0)+"° + "+mFmt(angB,0)+"° + "+mFmt(angC,0)+"°",rx,152,MC.text,12); mText(g,"= "+mFmt(angA+angB+angC,0)+"°",rx,172,MC.teal,16);
    mText(g,"Slide the top corner: the area",rx,208,MC.muted,11); mText(g,"never changes, but the angles do.",rx,224,MC.muted,11);
    say("triRead","Area = "+mFmt(base*ht/2)+"  •  angles "+mFmt(angA,0)+"° + "+mFmt(angB,0)+"° + "+mFmt(angC,0)+"° = "+mFmt(angA+angB+angC,0)+"°");
  }); },
  unitcircle(){ simFrame("unitcircle","unitCanvas",function(g,W,H,t,get,say){
    const deg=get("ucAngle"), th=deg*Math.PI/180; const cx=165, cy=H/2, R=110; const cs=Math.cos(th), sn=Math.sin(th);
    g.strokeStyle=MC.grid; g.lineWidth=1; g.beginPath(); g.moveTo(cx-R-20,cy); g.lineTo(cx+R+20,cy); g.moveTo(cx,cy-R-20); g.lineTo(cx,cy+R+20); g.stroke();
    g.strokeStyle=MC.axis; g.lineWidth=2; g.beginPath(); g.arc(cx,cy,R,0,7); g.stroke();
    g.fillStyle="rgba(212,177,106,.15)"; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,34,0,-th,true); g.closePath(); g.fill();
    const px=cx+R*cs, py=cy-R*sn; g.strokeStyle=MC.gold; g.lineWidth=3; g.beginPath(); g.moveTo(cx,cy); g.lineTo(px,py); g.stroke();
    g.strokeStyle=MC.teal; g.lineWidth=3; g.beginPath(); g.moveTo(cx,cy); g.lineTo(px,cy); g.stroke(); g.strokeStyle=MC.violet; g.beginPath(); g.moveTo(px,cy); g.lineTo(px,py); g.stroke();
    g.fillStyle=MC.gold; g.beginPath(); g.arc(px,py,7,0,7); g.fill();
    [["0°",cx+R+6,cy+14],["90°",cx+4,cy-R-6],["180°",cx-R-8,cy+14],["270°",cx+4,cy+R+14]].forEach(function(l){ mText(g,l[0],l[1],l[2],MC.muted,10); });
    const wx=360, ww=W-wx-26, amp=R; g.strokeStyle=MC.grid; g.lineWidth=1; g.beginPath(); g.moveTo(wx,cy); g.lineTo(wx+ww,cy); g.stroke();
    [90,180,270,360].forEach(function(d){ const x=wx+d/360*ww; g.beginPath(); g.moveTo(x,cy-amp); g.lineTo(x,cy+amp); g.stroke(); mText(g,d+"°",x,cy+amp+14,MC.muted,10,"center"); });
    const trace=function(fn,col){ g.strokeStyle=col; g.lineWidth=2.5; g.beginPath(); for(let d=0;d<=deg;d+=2){ const x=wx+d/360*ww, y=cy-fn(d*Math.PI/180)*amp; if(d===0) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke(); const x=wx+deg/360*ww, y=cy-fn(th)*amp; g.fillStyle=col; g.beginPath(); g.arc(x,y,6,0,7); g.fill(); };
    trace(Math.cos,MC.teal); trace(Math.sin,MC.violet);
    mText(g,"sin θ (height)",wx,cy-amp-14,MC.violet,12); mText(g,"cos θ (width)",wx+130,cy-amp-14,MC.teal,12);
    const quad=deg%90===0?"on an axis":(deg<90?"quadrant I":deg<180?"quadrant II":deg<270?"quadrant III":"quadrant IV");
    mText(g,"θ = "+deg+"° = "+mFmt(th,2)+" rad  ("+quad+")",20,22,MC.text,12);
    const tanTxt=(deg===90||deg===270)?"undefined":mFmt(Math.tan(th),2);
    say("unitRead","cos "+mFmt(cs,2)+"  •  sin "+mFmt(sn,2)+"  •  tan "+tanTxt);
  }); },
  lawlarge(){
    const cache={};
    const rnd=function(seed){ if(cache[seed]) return cache[seed]; let a=seed*2654435761>>>0; const out=[]; for(let i=0;i<1000;i++){ a=(a+0x6D2B79F5)|0; let t=Math.imul(a^(a>>>15),1|a); t=(t+Math.imul(t^(t>>>7),61|t))^t; out.push(((t^(t>>>14))>>>0)/4294967296); } cache[seed]=out; return out; };
    simFrame("lawlarge","lawCanvas",function(g,W,H,t,get,say){
      const N=get("lawFlips"), p=get("lawP")/100, seed=get("lawSeed"); const u=rnd(seed); const x0=60, x1=W-30, y0=H-50, y1=40;
      const X=function(i){ return x0+(i/N)*(x1-x0); }, Y=function(v){ return y0-v*(y0-y1); };
      g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(x0,y1-10); g.lineTo(x0,y0); g.lineTo(x1,y0); g.stroke();
      [0,0.25,0.5,0.75,1].forEach(function(v){ g.strokeStyle=MC.grid; g.lineWidth=1; g.beginPath(); g.moveTo(x0,Y(v)); g.lineTo(x1,Y(v)); g.stroke(); mText(g,Math.round(v*100)+"%",x0-8,Y(v)+4,MC.muted,10,"right"); });
      g.setLineDash([6,5]); g.strokeStyle=MC.gold; g.lineWidth=2; g.beginPath(); g.moveTo(x0,Y(p)); g.lineTo(x1,Y(p)); g.stroke(); g.setLineDash([]); mText(g,"true chance "+Math.round(p*100)+"%",x1,Y(p)-8,MC.gold,11,"right");
      let heads=0; g.strokeStyle=MC.teal; g.lineWidth=2; g.beginPath();
      for(let i=1;i<=N;i++){ if(u[i-1]<p) heads++; const x=X(i), y=Y(heads/i); if(i===1) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke();
      mText(g,"0",x0,y0+16,MC.muted,10,"center"); mText(g,String(Math.round(N/2)),(x0+x1)/2,y0+16,MC.muted,10,"center"); mText(g,N+" flips",x1,y0+16,MC.muted,10,"right");
      mText(g,"Running share of heads",x0+8,26,MC.teal,12);
      say("lawRead","After "+N+" flip"+(N>1?"s":"")+": "+heads+" heads = "+mFmt(heads/N*100,1)+"%   (true chance "+Math.round(p*100)+"%)");
    });
  },
  spread(){ simFrame("spread","spreadCanvas",function(g,W,H,t,get,say){
    const s=get("spreadB"); const A=[-1.5,-1,-0.5,0,0.5,1,1.5].map(function(o){ return 10+o; }); const B=[-3,-2,-1,0,1,2,3].map(function(o){ return 10+o*s/3; });
    const x0=40, x1=W-40, X=function(v){ return x0+(v/20)*(x1-x0); };
    const stat=function(arr){ const m=arr.reduce(function(a,b){ return a+b; },0)/arr.length; const sd=Math.sqrt(arr.reduce(function(a,b){ return a+(b-m)*(b-m); },0)/arr.length); return {m:m,sd:sd,range:Math.max.apply(null,arr)-Math.min.apply(null,arr)}; };
    const row=function(arr,y,col,name){ const st=stat(arr); g.fillStyle=col.replace(")",",.12)").replace("rgb","rgba"); g.fillRect(X(st.m-st.sd),y-34,X(st.m+st.sd)-X(st.m-st.sd),68);
      g.strokeStyle=MC.axis; g.lineWidth=1; g.beginPath(); g.moveTo(x0,y+34); g.lineTo(x1,y+34); g.stroke();
      arr.forEach(function(v){ g.fillStyle=col; g.beginPath(); g.arc(X(v),y,9,0,7); g.fill(); });
      g.fillStyle=MC.gold; g.beginPath(); g.moveTo(X(st.m),y+34); g.lineTo(X(st.m)-7,y+48); g.lineTo(X(st.m)+7,y+48); g.closePath(); g.fill();
      mText(g,name+"   mean "+mFmt(st.m,1)+"   spread (σ) "+mFmt(st.sd,2)+"   range "+mFmt(st.range,1),x0,y-46,col,12); return st; };
    const sa=row(A,96,"rgb(94,234,212)","Class A"); const sb=row(B,224,"rgb(201,167,240)","Class B");
    for(let v=0;v<=20;v+=5){ mText(g,String(v),X(v),H-8,MC.muted,10,"center"); }
    mText(g,"shaded band = one σ either side of the mean",x1,H-24,MC.muted,10,"right");
    say("spreadRead","Same mean ("+mFmt(sa.m,1)+")  •  σ(A) = "+mFmt(sa.sd,2)+", σ(B) = "+mFmt(sb.sd,2));
  }); },
  circles(){ simFrame("circles","circlesCanvas",function(g,W,H,t,get,say){
    const r=get("radiusInput"), n=get("sliceCount"); const R=105, cx=140, cy=150, th=2*Math.PI/n;
    for(let i=0;i<n;i++){ g.fillStyle=i%2?"rgba(201,167,240,.7)":"rgba(94,234,212,.7)"; g.strokeStyle="#020617"; g.lineWidth=1.2; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,R,-Math.PI/2+i*th,-Math.PI/2+(i+1)*th); g.closePath(); g.fill(); g.stroke(); }
    g.strokeStyle=MC.gold; g.lineWidth=2.5; g.beginPath(); g.arc(cx,cy,R,0,7); g.stroke();
    g.strokeStyle=MC.text; g.lineWidth=1.5; g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx+R,cy); g.stroke(); mText(g,"r = "+r,cx+R/2,cy-6,MC.text,12,"center");
    mText(g,"cut into "+n+" slices",cx,cy+R+24,MC.muted,12,"center");
    const sp=R*Math.sin(th/2); const total=(n+1)*sp; const sx=Math.max(300,(300+W-20)/2-total/2); const yb=cy+R/2, yt=yb-R*Math.cos(th/2);
    for(let i=0;i<n;i++){ const up=(i%2===0); const ax=sx+sp*i, ay=up?yb:yt; const mid=up?-Math.PI/2:Math.PI/2; g.fillStyle=i%2?"rgba(201,167,240,.7)":"rgba(94,234,212,.7)"; g.strokeStyle="#020617"; g.lineWidth=1.2; g.beginPath(); g.moveTo(ax,ay); g.arc(ax,ay,R,mid-th/2,mid+th/2); g.closePath(); g.fill(); g.stroke(); }
    mText(g,"…the same slices, rearranged",sx+total/2,cy+R+24,MC.muted,12,"center");
    g.strokeStyle=MC.gold; g.lineWidth=1.5; g.setLineDash([5,4]); const by=yb+R*0.16+14; g.beginPath(); g.moveTo(sx,by); g.lineTo(sx+total-sp,by); g.stroke(); g.setLineDash([]);
    mText(g,"≈ half the circumference = πr",sx+(total-sp)/2,by+16,MC.gold,11,"center");
    const C=2*Math.PI*r, A=Math.PI*r*r; const ty=H-62;
    mText(g,"Circumference  C = 2πr = "+mFmt(C),30,ty,MC.text,13); mText(g,"Area  A = πr² = "+mFmt(A),30,ty+22,MC.text,13);
    mText(g,"Rearranged shape: base ≈ πr = "+mFmt(Math.PI*r)+", height = r = "+r+"  →  area ≈ "+mFmt(Math.PI*r*r),W-20,ty+22,MC.gold,12,"right");
    say("circlesRead","r = "+r+"  →  C = "+mFmt(C)+"  •  A = "+mFmt(A));
  }); },
  sectors(){ simFrame("sectors","sectorCanvas",function(g,W,H,t,get,say){
    const deg=get("secAngle"), r=get("secR"); const R=r*13, cx=165, cy=H/2, th=deg*Math.PI/180;
    g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.arc(cx,cy,R,0,7); g.stroke();
    g.fillStyle="rgba(94,234,212,.4)"; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,R,-th/2-Math.PI/2,th/2-Math.PI/2); g.closePath(); g.fill();
    g.strokeStyle=MC.gold; g.lineWidth=4; g.beginPath(); g.arc(cx,cy,R,-th/2-Math.PI/2,th/2-Math.PI/2); g.stroke();
    g.strokeStyle=MC.text; g.lineWidth=1.5; g.beginPath(); g.moveTo(cx,cy); g.lineTo(cx+R*Math.cos(-th/2-Math.PI/2),cy+R*Math.sin(-th/2-Math.PI/2)); g.moveTo(cx,cy); g.lineTo(cx+R*Math.cos(th/2-Math.PI/2),cy+R*Math.sin(th/2-Math.PI/2)); g.stroke();
    mText(g,deg+"°",cx,cy-24,MC.text,13,"center");
    const gg=mGcd(deg,360), fr=(deg/gg)+"/"+(360/gg); const arc=deg/360*2*Math.PI*r, area=deg/360*Math.PI*r*r; const rx=380;
    mText(g,"Fraction of the circle",rx,40,MC.muted,12); mText(g,deg+"/360 = "+fr,rx,64,MC.teal,16);
    mText(g,"Arc length (the gold edge)",rx,108,MC.muted,12); mText(g,fr+" × 2π × "+r+" = "+mFmt(arc),rx,132,MC.gold,15);
    mText(g,"Sector area (the teal slice)",rx,176,MC.muted,12); mText(g,fr+" × π × "+r+"² = "+mFmt(area),rx,200,MC.teal,15);
    mText(g,"Whole circle: C = "+mFmt(2*Math.PI*r)+", A = "+mFmt(Math.PI*r*r),rx,244,MC.muted,11);
    say("sectorRead","angle "+deg+"° of r = "+r+"  →  arc "+mFmt(arc)+"  •  area "+mFmt(area));
  }); },
  pythagoras(){ simFrame("pythagoras","pythCanvas",function(g,W,H,t,get,say){
    const a=get("legA"), b=get("legB"); const c=Math.sqrt(a*a+b*b); const s=Math.min(44,(W-60)/(a+2*b),(H-60)/(2*a+b));
    const x0=30+b*s+(W-60-(a+2*b)*s)/2, y0=30+(a+b)*s+(H-60-(2*a+b)*s)/2;
    const P1=[x0+a*s,y0], P2=[x0,y0-b*s], n=[b*s,-a*s];
    const sq=function(pts,fill,label,lx,ly){ g.fillStyle=fill; g.strokeStyle="#020617"; g.lineWidth=2; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<4;i++) g.lineTo(pts[i][0],pts[i][1]); g.closePath(); g.fill(); g.stroke(); mText(g,label,lx,ly+5,"#050816",15,"center"); };
    sq([[x0,y0],[x0+a*s,y0],[x0+a*s,y0+a*s],[x0,y0+a*s]],"rgba(94,234,212,.85)","a² = "+a*a,x0+a*s/2,y0+a*s/2);
    sq([[x0,y0],[x0,y0-b*s],[x0-b*s,y0-b*s],[x0-b*s,y0]],"rgba(201,167,240,.85)","b² = "+b*b,x0-b*s/2,y0-b*s/2);
    sq([P1,P2,[P2[0]+n[0],P2[1]+n[1]],[P1[0]+n[0],P1[1]+n[1]]],"rgba(212,177,106,.9)","c² = "+mFmt(a*a+b*b)+" (c = "+mFmt(c,2)+")",(P1[0]+P2[0])/2+n[0]/2,(P1[1]+P2[1])/2+n[1]/2);
    g.fillStyle="#0c1330"; g.strokeStyle=MC.text; g.lineWidth=2.5; g.beginPath(); g.moveTo(x0,y0); g.lineTo(P1[0],P1[1]); g.lineTo(P2[0],P2[1]); g.closePath(); g.fill(); g.stroke();
    g.strokeStyle=MC.text; g.lineWidth=1.5; g.strokeRect(x0+1,y0-13,12,12);
    const isInt=Math.abs(c-Math.round(c))<1e-9;
    mText(g,"a = "+a,x0+a*s/2,y0-6,MC.text,12,"center"); mText(g,"b = "+b,x0+8,y0-b*s*0.2,MC.text,12);
    say("pythRead",a+"² + "+b+"² = "+a*a+" + "+b*b+" = "+(a*a+b*b)+", so c = "+(isInt?Math.round(c)+"  ✓ a whole-number triple":"√"+(a*a+b*b)+" ≈ "+mFmt(c,2)));
  }); },
  ladder(){ simFrame("ladder","ladderCanvas",function(g,W,H,t,get,say){
    const L=get("ladderLen"); let d=get("ladderBase"); d=Math.min(d,L-0.1); const h=Math.sqrt(L*L-d*d); const ang=Math.atan2(h,d)*180/Math.PI;
    const s=Math.min(40,(H-80)/Math.max(L,4.6),(W-330)/L), gy=H-36, wx=W-170;
    g.fillStyle="rgba(94,234,212,.08)"; g.fillRect(0,gy,W,H-gy); g.strokeStyle=MC.axis; g.lineWidth=1.5; g.beginPath(); g.moveTo(0,gy); g.lineTo(W,gy); g.stroke();
    g.fillStyle="rgba(201,167,240,.12)"; g.fillRect(wx,20,160,gy-20); g.strokeStyle=MC.violet; g.lineWidth=2; g.beginPath(); g.moveTo(wx,20); g.lineTo(wx,gy); g.stroke();
    const wy=gy-4*s; g.fillStyle="rgba(212,177,106,.25)"; g.fillRect(wx+30,wy-20,46,40); g.strokeStyle=MC.gold; g.lineWidth=2; g.strokeRect(wx+30,wy-20,46,40); mText(g,"window at 4 m",wx+53,wy+36,MC.gold,10,"center");
    const bx=wx-d*s, ty=gy-h*s; g.strokeStyle=MC.gold; g.lineWidth=5; g.beginPath(); g.moveTo(bx,gy); g.lineTo(wx,ty); g.stroke();
    g.strokeStyle="rgba(5,8,22,.8)"; g.lineWidth=2; for(let i=1;i<8;i++){ const f=i/8; g.beginPath(); g.moveTo(bx+(wx-bx)*f-5,gy-(gy-ty)*f); g.lineTo(bx+(wx-bx)*f+5,gy-(gy-ty)*f); g.stroke(); }
    g.setLineDash([4,4]); g.strokeStyle=MC.teal; g.lineWidth=1.5; g.beginPath(); g.moveTo(bx,gy+14); g.lineTo(wx,gy+14); g.stroke(); g.beginPath(); g.moveTo(wx-14,gy); g.lineTo(wx-14,ty); g.stroke(); g.setLineDash([]);
    mText(g,"d = "+mFmt(d,1)+" m",(bx+wx)/2,gy+28,MC.teal,12,"center"); mText(g,"h = "+mFmt(h,2)+" m",wx+86,(gy+ty)/2+4,MC.teal,12); mText(g,"L = "+mFmt(L,1)+" m",(bx+wx)/2-14,(gy+ty)/2-12,MC.gold,12,"right");
    const safe=ang>=70&&ang<=80; mText(g,"angle with the ground: "+mFmt(ang,1)+"°",24,30,safe?MC.teal:MC.gold,13); mText(g,safe?"Safe range (about 75° is recommended)":(ang<70?"Too shallow: the base could slip":"Too steep: it could tip backwards"),24,50,MC.muted,12);
    mText(g,h>=4?"Reaches the window ✓":"Falls short of the window",24,74,h>=4?MC.teal:MC.rose,12);
    say("ladderRead","h = √("+mFmt(L,1)+"² − "+mFmt(d,1)+"²) = "+mFmt(h,2)+" m up the wall  •  angle "+mFmt(ang,1)+"°");
  }); },
  solids(){ simFrame("solids","solidsCanvas",function(g,W,H,t,get,say){
    const L=get("boxL"), Wd=get("boxW"), Hh=get("boxH"); const u=Math.min(32,(430-100)/(L+0.6*Wd),(H-70)/(Hh+0.4*Wd)); const fx=64, fy=H-30-0.4*Wd*u*0; const front=[fx,fy-0], Dx=0.6*Wd*u, Dy=-0.4*Wd*u;
    const fy2=H-34;
    const poly=function(pts,fill){ g.fillStyle=fill; g.strokeStyle="rgba(2,6,23,.9)"; g.lineWidth=1.5; g.beginPath(); g.moveTo(pts[0][0],pts[0][1]); for(let i=1;i<pts.length;i++) g.lineTo(pts[i][0],pts[i][1]); g.closePath(); g.fill(); g.stroke(); };
    const FL=[fx,fy2], FR=[fx+L*u,fy2], TL=[fx,fy2-Hh*u], TR=[fx+L*u,fy2-Hh*u];
    poly([FL,FR,TR,TL],"rgba(94,234,212,.55)"); poly([TL,TR,[TR[0]+Dx,TR[1]+Dy],[TL[0]+Dx,TL[1]+Dy]],"rgba(201,167,240,.6)"); poly([FR,[FR[0]+Dx,FR[1]+Dy],[TR[0]+Dx,TR[1]+Dy],TR],"rgba(212,177,106,.55)");
    g.strokeStyle="rgba(2,6,23,.55)"; g.lineWidth=1;
    for(let i=1;i<L;i++){ g.beginPath(); g.moveTo(fx+i*u,fy2); g.lineTo(fx+i*u,fy2-Hh*u); g.stroke(); g.beginPath(); g.moveTo(fx+i*u,fy2-Hh*u); g.lineTo(fx+i*u+Dx,fy2-Hh*u+Dy); g.stroke(); }
    for(let j=1;j<Hh;j++){ g.beginPath(); g.moveTo(fx,fy2-j*u); g.lineTo(fx+L*u,fy2-j*u); g.stroke(); g.beginPath(); g.moveTo(fx+L*u,fy2-j*u); g.lineTo(fx+L*u+Dx,fy2-j*u+Dy); g.stroke(); }
    for(let k=1;k<Wd;k++){ g.beginPath(); g.moveTo(fx+Dx*k/Wd,fy2-Hh*u+Dy*k/Wd); g.lineTo(fx+L*u+Dx*k/Wd,fy2-Hh*u+Dy*k/Wd); g.stroke(); g.beginPath(); g.moveTo(fx+L*u+Dx*k/Wd,fy2+Dy*k/Wd); g.lineTo(fx+L*u+Dx*k/Wd,fy2-Hh*u+Dy*k/Wd); g.stroke(); }
    mText(g,"length "+L,fx+L*u/2,fy2+18,MC.muted,11,"center"); mText(g,"height "+Hh,fx-6,fy2-Hh*u/2,MC.muted,11,"right"); mText(g,"width "+Wd,fx+L*u+Dx/2+10,fy2+Dy/2-4,MC.muted,11);
    const V=L*Wd*Hh, SA=2*(L*Wd+L*Hh+Wd*Hh), rx=470;
    mText(g,"Volume",rx,40,MC.teal,13); mText(g,L+" × "+Wd+" × "+Hh+" = "+V,rx,64,MC.teal,17); mText(g,"cubes in "+Hh+" layer"+(Hh>1?"s":"")+" of "+(L*Wd),rx,84,MC.muted,11);
    mText(g,"Surface area",rx,132,MC.gold,13); mText(g,"2(lw + lh + wh)",rx,154,MC.muted,11); mText(g,"2("+L*Wd+" + "+L*Hh+" + "+Wd*Hh+") = "+SA,rx,180,MC.gold,17);
    mText(g,"top & bottom  "+2*L*Wd,rx,208,MC.violet,11); mText(g,"front & back  "+2*L*Hh,rx,226,MC.teal,11); mText(g,"left & right  "+2*Wd*Hh,rx,244,MC.gold,11);
    say("solidsRead","V = "+V+" cubic units  •  SA = "+SA+" square units");
  }); },
  cylinder(){ simFrame("cylinder","cylCanvas",function(g,W,H,t,get,say){
    const r=get("cylR"), h=get("cylH"); const s=Math.min(16,150/Math.max(2*r,h),290/(2*Math.PI*r)); const ry=r*s*0.3, cx=40+r*s, base=H-50;
    g.fillStyle="rgba(94,234,212,.35)"; g.strokeStyle=MC.teal; g.lineWidth=2; g.beginPath(); g.ellipse(cx,base,r*s,ry,0,0,Math.PI); g.lineTo(cx-r*s,base-h*s); g.lineTo(cx+r*s,base-h*s); g.lineTo(cx+r*s,base); g.fill(); g.beginPath(); g.moveTo(cx-r*s,base); g.lineTo(cx-r*s,base-h*s); g.moveTo(cx+r*s,base); g.lineTo(cx+r*s,base-h*s); g.ellipse(cx,base,r*s,ry,0,0,Math.PI); g.stroke();
    g.fillStyle="rgba(212,177,106,.45)"; g.strokeStyle=MC.gold; g.beginPath(); g.ellipse(cx,base-h*s,r*s,ry,0,0,7); g.fill(); g.stroke();
    mText(g,"r = "+r,cx,base-h*s-ry-8,MC.text,11,"center"); mText(g,"h = "+h,cx+r*s+8,base-h*s/2,MC.text,11);
    const nx=290, nw=2*Math.PI*r*s, nh=h*s, ny=H-50-nh; g.fillStyle="rgba(94,234,212,.3)"; g.strokeStyle=MC.teal; g.lineWidth=2; g.fillRect(nx,ny,nw,nh); g.strokeRect(nx,ny,nw,nh);
    [nx+r*s+4,nx+nw-r*s-4].forEach(function(lx){ g.fillStyle="rgba(212,177,106,.45)"; g.strokeStyle=MC.gold; g.beginPath(); g.arc(lx,ny-r*s-8,r*s,0,7); g.fill(); g.stroke(); });
    mText(g,"curved wall unrolled: 2πr = "+mFmt(2*Math.PI*r)+" wide, "+h+" tall",nx,H-24,MC.muted,11); mText(g,"two circular lids",nx+nw/2,Math.max(14,ny-2*r*s-14),MC.gold,11,"center");
    const V=Math.PI*r*r*h, CS=2*Math.PI*r*h, T=CS+2*Math.PI*r*r;
    mText(g,"V = πr²h = "+mFmt(V),nx,30,MC.teal,13); mText(g,"Curved = 2πrh = "+mFmt(CS)+"   Total = "+mFmt(T),nx,50,MC.gold,12);
    say("cylRead","V = "+mFmt(V)+"  •  curved area = "+mFmt(CS)+"  •  total surface = "+mFmt(T));
  }); },
  physicalfeatures(){ const c=document.getElementById("physicalCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'physical');
    const readout=document.getElementById("physicalRead"); const posInput=document.getElementById("positionInput");
    const groundY=230, marginX=30; const plotW=c.width-marginX*2;
    function elevationAt(p){ if(p<12){ return 190*(1-p/12); } if(p<40){ return 20 + 8*Math.sin(p*0.4); } if(p<80){ return 60 + 40*Math.sin((p-40)/40*Math.PI); } return 55*(1-(p-80)/20); }
    function regionAt(p){ if(p<12) return "the Himalayas — young, snow-capped mountains"; if(p<40) return "the Northern Plains — flat, fertile, river-built land"; if(p<80) return "the Deccan Plateau — ancient, elevated tableland"; return "the Coastal Plains — the narrow strip where land meets sea"; }
    AnimationManager.register('physical', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('physical'); return; }
      cctx.clearRect(0,0,c.width,c.height); const pos=Number(posInput.value);
      cctx.beginPath(); cctx.moveTo(marginX,groundY);
      for(let x=0;x<=plotW;x+=4){ const p=(x/plotW)*100; const y=groundY-elevationAt(p); cctx.lineTo(marginX+x,y); }
      cctx.lineTo(marginX+plotW,groundY); cctx.closePath(); cctx.fillStyle="rgba(240,149,74,.18)"; cctx.fill(); cctx.strokeStyle="#d4b16a"; cctx.lineWidth=2; cctx.stroke();
      cctx.strokeStyle="rgba(215,220,229,.35)"; cctx.beginPath(); cctx.moveTo(marginX,groundY); cctx.lineTo(marginX+plotW,groundY); cctx.stroke();
      cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.textAlign="center";
      cctx.fillText("Himalayas",marginX+plotW*0.06,groundY+22); cctx.fillText("Northern Plains",marginX+plotW*0.26,groundY+22); cctx.fillText("Deccan Plateau",marginX+plotW*0.60,groundY+22); cctx.fillText("Coastal Plains",marginX+plotW*0.90,groundY+22);
      const markerX=marginX+(pos/100)*plotW; const markerY=groundY-elevationAt(pos);
      cctx.beginPath(); cctx.fillStyle="#5eead4"; cctx.arc(markerX,markerY-10,8,0,Math.PI*2); cctx.fill();
      cctx.strokeStyle="rgba(94,234,212,.4)"; cctx.beginPath(); cctx.moveTo(markerX,markerY-10); cctx.lineTo(markerX,groundY); cctx.stroke(); cctx.textAlign="left";
      readout.innerText=regionAt(pos);
    }, c);
  },
  rivers(){ const c=document.getElementById("riversCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'rivers');
    const readout=document.getElementById("riversRead"); const riverInput=document.getElementById("riverIndex");
    const RIVERS=[
      { name:"Ganga", type:"Himalayan (perennial)", info:"Rises in the Himalayas, fed by glacier melt all year", path:[{x:80,y:60},{x:220,y:110},{x:400,y:150},{x:620,y:220}] },
      { name:"Brahmaputra", type:"Himalayan (perennial)", info:"Fed by Himalayan snowmelt, flows strong through every season", path:[{x:100,y:50},{x:260,y:90},{x:420,y:160},{x:600,y:240}] },
      { name:"Yamuna", type:"Himalayan (perennial)", info:"A major Ganga tributary, also fed by mountain meltwater", path:[{x:120,y:55},{x:250,y:120},{x:380,y:170},{x:610,y:230}] },
      { name:"Godavari", type:"Peninsular (seasonal)", info:"Rises in the Deccan Plateau, depends heavily on monsoon rain", path:[{x:150,y:70},{x:300,y:140},{x:460,y:190},{x:620,y:230}] },
      { name:"Krishna", type:"Peninsular (seasonal)", info:"Also Deccan-born, swells in monsoon and shrinks in summer", path:[{x:130,y:90},{x:290,y:150},{x:450,y:180},{x:620,y:220}] }
    ];
    const particles=[0,0.25,0.5,0.75];
    function pointOnPath(path,t){ const segLen=[]; let total=0; for(let i=0;i<path.length-1;i++){ const dx=path[i+1].x-path[i].x, dy=path[i+1].y-path[i].y; const len=Math.sqrt(dx*dx+dy*dy); segLen.push(len); total+=len; } let d=t*total; for(let i=0;i<segLen.length;i++){ if(d<=segLen[i]){ const f=d/segLen[i]; return { x:path[i].x+(path[i+1].x-path[i].x)*f, y:path[i].y+(path[i+1].y-path[i].y)*f }; } d-=segLen[i]; } return path[0]; }
    AnimationManager.register('rivers', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('rivers'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const idx=Math.min(RIVERS.length-1,Math.max(0,Number(riverInput.value))); const river=RIVERS[idx]; const isPerennial=river.type.startsWith("Himalayan");
      cctx.strokeStyle="rgba(215,220,229,.25)"; cctx.lineWidth=6; cctx.beginPath(); cctx.moveTo(river.path[0].x,river.path[0].y); for(let i=1;i<river.path.length;i++){ cctx.lineTo(river.path[i].x,river.path[i].y); } cctx.stroke();
      cctx.fillStyle="#9ca7c2"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.fillText("source (mountains)",river.path[0].x-10,river.path[0].y-15); cctx.fillText("mouth (sea)",river.path[river.path.length-1].x-40,river.path[river.path.length-1].y+25);
      const speed=isPerennial?0.006:0.006*0.4; cctx.fillStyle= isPerennial?"#5eead4":"#f0954a";
      for(let i=0;i<particles.length;i++){ particles[i]=(particles[i]+speed)%1; const p=pointOnPath(river.path,particles[i]); cctx.beginPath(); cctx.arc(p.x,p.y,6,0,Math.PI*2); cctx.fill(); }
      readout.innerText=`${river.name} — ${river.type}. ${river.info}`;
    }, c);
  },
  monsoon(){ const c=document.getElementById("monsoonCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'monsoon');
    const readout=document.getElementById("monsoonRead"); const monthInput=document.getElementById("monthInput");
    let dashOffset=0;
    function seasonFor(month){ if(month>=6 && month<=9) return { name:"Southwest Monsoon (onshore)", onshore:true, rain:0.9 }; if(month>=10 && month<=12) return { name:"Northeast / Retreating Monsoon (offshore)", onshore:false, rain:0.4 }; return { name:"Dry season (pre-monsoon)", onshore:true, rain:0.1 }; }
    AnimationManager.register('monsoon', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('monsoon'); return; }
      cctx.clearRect(0,0,c.width,c.height); const month=Number(monthInput.value); const season=seasonFor(month);
      cctx.fillStyle="rgba(212,177,106,.15)"; cctx.beginPath(); cctx.moveTo(280,40); cctx.lineTo(420,40); cctx.lineTo(470,260); cctx.lineTo(350,300); cctx.lineTo(230,260); cctx.closePath(); cctx.fill(); cctx.strokeStyle="#d4b16a"; cctx.stroke();
      cctx.fillStyle="rgba(94,234,212,.08)"; cctx.fillRect(0,0,230,c.height); cctx.fillRect(470,0,c.width-470,c.height);
      dashOffset+=0.6; const arrowCount=6;
      for(let i=0;i<arrowCount;i++){ const y=60+i*35; cctx.strokeStyle= season.onshore ? "#5eead4" : "#f0954a"; cctx.lineWidth=3; cctx.setLineDash([10,6]); cctx.lineDashOffset= season.onshore ? -dashOffset : dashOffset; cctx.beginPath(); if(season.onshore){ cctx.moveTo(40,y); cctx.lineTo(220,y); } else { cctx.moveTo(220,y); cctx.lineTo(40,y); } cctx.stroke(); cctx.setLineDash([]); cctx.beginPath(); cctx.fillStyle= season.onshore ? "#5eead4" : "#f0954a"; if(season.onshore){ cctx.moveTo(220,y); cctx.lineTo(208,y-6); cctx.lineTo(208,y+6); } else { cctx.moveTo(40,y); cctx.lineTo(52,y-6); cctx.lineTo(52,y+6); } cctx.closePath(); cctx.fill(); }
      const barH=180*season.rain; cctx.fillStyle="rgba(94,234,212,.4)"; cctx.fillRect(600,260-barH,30,barH); cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.strokeRect(600,80,30,180);
      cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText("rainfall",615,275); cctx.textAlign="left";
      readout.innerText=`Month ${month}: ${season.name}`;
    }, c);
  },
  indusvalley(){ const c=document.getElementById("indusCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'indus');
    const readout=document.getElementById("indusRead"); const valInput=document.getElementById("gridPrecision");
    const marginX=40, marginY=30; const gridW=c.width-marginX*2, gridH=c.height-marginY*2;
    function pseudoRandom(seed){ const x=Math.sin(seed*9973)*10000; return x-Math.floor(x); }
    AnimationManager.register('indus', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('indus'); return; }
      cctx.clearRect(0,0,c.width,c.height); const precision=Number(valInput.value); const jitter=(10-precision)*4; const cells=6; const cellW=gridW/cells, cellH=gridH/cells;
      cctx.strokeStyle="#d4b16a"; cctx.lineWidth=2; let seed=0;
      for(let i=0;i<=cells;i++){ const jx=(pseudoRandom(seed++)-0.5)*jitter; cctx.beginPath(); cctx.moveTo(marginX+i*cellW+jx,marginY); cctx.lineTo(marginX+i*cellW-jx,marginY+gridH); cctx.stroke(); }
      for(let j=0;j<=cells;j++){ const jy=(pseudoRandom(seed++)-0.5)*jitter; cctx.beginPath(); cctx.moveTo(marginX,marginY+j*cellH+jy); cctx.lineTo(marginX+gridW,marginY+j*cellH-jy); cctx.stroke(); }
      cctx.fillStyle="rgba(240,149,74,.25)";
      for(let i=0;i<cells;i++){ for(let j=0;j<cells;j++){ const jx=(pseudoRandom(seed++)-0.5)*jitter*0.6; const jy=(pseudoRandom(seed++)-0.5)*jitter*0.6; const x=marginX+i*cellW+cellW*0.25+jx; const y=marginY+j*cellH+cellH*0.25+jy; cctx.fillRect(x,y,cellW*0.5,cellH*0.5); } }
      let desc; if(precision>=8) desc="Precisely gridded streets, uniform brick housing — classic Mohenjo-daro planning"; else if(precision>=4) desc="Mostly ordered streets with some irregularity"; else desc="Loosely arranged, unplanned settlement";
      readout.innerText=desc;
    }, c);
  },
  maurya(){ empireTimelineSim("mauryaCanvas","mauryaYear","mauryaRead", {
    startLabel:"321 BCE",
    peakFrac:0.55,
    getPhaseText:(frac)=>{
      if(frac<0.15) return "Chandragupta Maurya is uniting scattered kingdoms";
      if(frac<0.55) return "The empire expands, reaching most of the subcontinent";
      if(frac<0.65) return "Ashoka wins the Kalinga War, then turns toward nonviolence";
      if(frac<0.9) return "Edicts on ethics are carved across the empire under Ashoka";
      return "The empire gradually fragments after Ashoka's reign";
    },
    icons:[
      { frac:0, title:"321 BCE — Founding",
        detail:"Chandragupta Maurya unites the fractured post-Alexander kingdoms of northern India into a single empire in 321 BCE, building the administrative backbone — a formal intelligence network and standardized taxation — that later empires would imitate for centuries." },
      { frac:0.53, title:"c.261 BCE — Kalinga War",
        detail:"The Kalinga War (c. 261 BCE) is Ashoka's most iconic and consequential battle — so bloody that his own remorse afterward permanently changed how he ruled, turning a brutal conquest into the birth of one of history's earliest large-scale programs of state ethics." },
      { frac:0.62, title:"c.257 BCE — The Edicts of Ashoka",
        detail:"In the years following Kalinga, Ashoka had his ethical decrees carved into rock faces and stone pillars across the empire in several languages and scripts — one of the earliest known instances of a ruler broadcasting public policy directly to his people, in his own words, at massive scale." }
    ]
  }); },

  gupta(){ empireTimelineSim("guptaCanvas","guptaYear","guptaRead", {
    startLabel:"320 CE",
    peakFrac:0.5,
    getPhaseText:(frac)=>{
      if(frac<0.1) return "The Gupta Empire is founded in northern India";
      if(frac<0.5) return "A long peace takes hold, and trade flourishes";
      if(frac<0.8) return "This golden age: Aryabhata advances mathematics and astronomy";
      return "The empire slowly weakens under external pressure";
    },
    icons:[
      { frac:0.53, title:"c.499 CE — Aryabhata",
        detail:"Around 499 CE, the astronomer-mathematician Aryabhata composes the Aryabhatiya at just 23 — introducing a placeholder for zero and calculating pi to a remarkable accuracy, work that later travels through the Islamic world into Europe." },
      { frac:0.9, title:"c.455 CE — Repelling the Huna",
        detail:"Around 455 CE, Emperor Skandagupta repelled invasions by the Huna (Hephthalite) tribes at India's northwestern frontier — a defense still remembered as one of the empire's most dramatic military stands, buying the Gupta realm decades more of relative peace." }
    ]
  }); },

  mughal(){ empireTimelineSim("mughalCanvas","mughalYear","mughalRead", {
    startLabel:"1526 CE",
    peakFrac:0.6,
    getPhaseText:(frac)=>{
      if(frac<0.08) return "Babur founds the Mughal Empire in 1526";
      if(frac<0.6) return "Persian, Central Asian, and Indian traditions blend at court";
      if(frac<0.65) return "Shah Jahan commissions the Taj Mahal";
      return "The empire gradually declines and fragments";
    },
    icons:[
      { frac:0, title:"1526 — First Battle of Panipat",
        detail:"The founding of the Mughal Empire at the First Battle of Panipat in 1526, where Babur defeated Ibrahim Lodi using early gunpowder artillery, stands as one of its most iconic moments — a single clash that shifted the course of South Asian history for over three centuries." },
      { frac:0.59, title:"1632 — The Taj Mahal Begins",
        detail:"Shah Jahan's construction of the Taj Mahal, begun in 1632 as a mausoleum for his wife Mumtaz Mahal, took roughly two decades and thousands of artisans to complete — becoming, centuries later, one of the most recognized buildings on Earth." }
    ]
  }); },

  chera(){ const c=document.getElementById("cheraCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'chera');
    const readout=document.getElementById("cheraRead"); const input=document.getElementById("cheraYear");
    const groundY=c.height-70, landmarkX=180, portraitX=520;
    const ERAS=[
      { start:0, end:70, ruler:"Uthiyan Cheralathan", years:"c. 300–230 BCE",
        landmark:"Malabar Ports Established",
        fact:"Sangam poetry credits Uthiyan Cheralathan as an early Chera king controlling the Malabar coast — though, like much of this era, the dates rest more on poetic tradition than inscriptions.",
        stage:"port", crown:"band", tone:"rising" },
      { start:70, end:180, ruler:"Nedum Cheralathan", years:"c. 230–120 BCE",
        landmark:"Trade Routes Expand",
        fact:"Later tradition credits Imayavaramban Nedum Cheralathan with extending Chera influence and securing the coastal trade routes that would make the kingdom wealthy.",
        stage:"growingport", crown:"point", tone:"rising" },
      { start:180, end:330, ruler:"The Muziris Trade Kings", years:"c. 120 BCE–30 CE",
        landmark:"Muziris at Its Height",
        fact:"Greek and Roman writers describe Muziris as a bustling pepper port, with fleets arriving on the monsoon winds to trade gold and wine for spices.",
        stage:"muziris", crown:"ornate", tone:"peak" },
      { start:330, end:450, ruler:"Cheran Senguttuvan", years:"c. 30–150 CE",
        landmark:"The Pattini Temple",
        fact:"Senguttuvan, called Kadal Pirakottiya (\"he who conquered the sea\"), is remembered in the epic Silappatikaram for establishing worship of the virtuous Kannagi as the goddess Pattini.",
        stage:"pattini", crown:"ornate2", tone:"peak" },
      { start:450, end:540, ruler:"Later Chera Kings", years:"c. 150–240 CE",
        landmark:"Trade Begins to Shift",
        fact:"Trade patterns slowly change as new routes and powers emerge elsewhere, and the flow of Roman gold that once defined Muziris begins to thin.",
        stage:"fadingport", crown:"ornate", tone:"fading" },
      { start:540, end:600, ruler:"The Kalabhra Interregnum", years:"c. 240–300 CE",
        landmark:"Ports Fall Silent",
        fact:"Historians point to a poorly understood period of upheaval, often linked to Kalabhra incursions, that disrupted the old Tamil kingdoms — records grow scarce, and the classical Chera line fades from clear view.",
        stage:"ruins", crown:"fallen", tone:"destroyed" }
    ];
    function eraFor(years){ for(const e of ERAS){ if(years>=e.start && years<e.end) return e; } return ERAS[ERAS.length-1]; }
    function drawBoat(cx,baseY,color,capsized){ cctx.save(); cctx.translate(cx,baseY); if(capsized) cctx.rotate(2.6); cctx.fillStyle=color; cctx.beginPath(); cctx.moveTo(-22,0); cctx.lineTo(22,0); cctx.lineTo(14,10); cctx.lineTo(-14,10); cctx.closePath(); cctx.fill(); if(!capsized){ cctx.strokeStyle=color; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(0,0); cctx.lineTo(0,-26); cctx.stroke(); cctx.beginPath(); cctx.moveTo(0,-26); cctx.lineTo(16,-6); cctx.lineTo(0,-6); cctx.closePath(); cctx.fill(); } cctx.restore(); }
    function drawJar(cx,baseY,color){ cctx.fillStyle=color; cctx.beginPath(); cctx.ellipse(cx,baseY-9,7,9,0,0,Math.PI*2); cctx.fill(); cctx.fillRect(cx-2,baseY-20,4,6); }
    function drawDock(cx,baseY,color,broken){ const w=100; if(broken){ cctx.fillStyle=color; cctx.save(); cctx.translate(cx,baseY); cctx.rotate(-0.12); cctx.fillRect(-w/2,-6,w*0.55,6); cctx.restore(); cctx.fillRect(cx+w*0.05,baseY-4,w*0.35,5); } else { cctx.fillStyle=color; cctx.fillRect(cx-w/2,baseY-6,w,6); } cctx.strokeStyle=color; cctx.lineWidth=3; const postCount=broken?2:4; for(let i=0;i<postCount;i++){ const px=cx-w/2+ (i+0.5)*(w/4); cctx.beginPath(); cctx.moveTo(px,baseY-2); cctx.lineTo(px,baseY+14); cctx.stroke(); } }
    function drawLandmark(era){ let color="#5eead4"; let broken=false; if(era.tone==="fading"){ color="rgba(94,234,212,.4)"; } if(era.tone==="destroyed"){ color="rgba(150,140,130,.7)"; broken=true; }
      if(era.stage==="port"){ drawDock(landmarkX, groundY, color, false); drawBoat(landmarkX-30, groundY-4, color, false); }
      else if(era.stage==="growingport"){ drawDock(landmarkX, groundY, color, false); drawBoat(landmarkX-40, groundY-4, color, false); drawBoat(landmarkX+20, groundY-4, color, false); }
      else if(era.stage==="muziris"){ drawDock(landmarkX, groundY, color, false); drawBoat(landmarkX-46, groundY-4, color, false); drawBoat(landmarkX+10, groundY-4, color, false); drawBoat(landmarkX+58, groundY-8, "#d4b16a", false); for(let i=0;i<4;i++){ drawJar(landmarkX-70+i*14, groundY, "#d4b16a"); } }
      else if(era.stage==="pattini"){ let w=54,y=groundY; for(let i=0;i<3;i++){ cctx.fillStyle=color; cctx.fillRect(landmarkX-w/2,y-16,w,16); y-=13; w*=0.72; } cctx.beginPath(); cctx.fillStyle=color; cctx.arc(landmarkX,y-4,5,0,Math.PI*2); cctx.fill(); }
      else if(era.stage==="fadingport"){ drawDock(landmarkX, groundY, color, false); drawBoat(landmarkX-20, groundY-4, color, false); }
      else if(era.stage==="ruins"){ drawDock(landmarkX, groundY, color, true); drawBoat(landmarkX+30, groundY-2, color, true); cctx.fillStyle="rgba(20,15,15,.25)"; cctx.beginPath(); cctx.ellipse(landmarkX, groundY-40, 90, 55, 0, 0, Math.PI*2); cctx.fill(); }
      cctx.strokeStyle="rgba(94,234,212,.25)"; cctx.beginPath(); cctx.moveTo(landmarkX-110, groundY+14); cctx.lineTo(landmarkX+130, groundY+14); cctx.stroke();
    }
    function drawPortrait(era){ const cx=portraitX, cy=groundY-70; const grey = era.tone==="destroyed"; const bodyColor = grey ? "rgba(150,145,140,.85)" : "rgba(94,234,212,.85)";
      cctx.fillStyle=bodyColor; cctx.beginPath(); cctx.moveTo(cx-62,cy+78); cctx.quadraticCurveTo(cx-62,cy+30,cx-34,cy+18); cctx.lineTo(cx+34,cy+18); cctx.quadraticCurveTo(cx+62,cy+30,cx+62,cy+78); cctx.closePath(); cctx.fill();
      cctx.beginPath(); cctx.arc(cx,cy-14,36,0,Math.PI*2); cctx.fill();
      if(grey){ cctx.strokeStyle="rgba(30,25,25,.5)"; cctx.lineWidth=1.5; cctx.beginPath(); cctx.moveTo(cx-14,cy-40); cctx.lineTo(cx-4,cy-6); cctx.lineTo(cx-18,cy+16); cctx.moveTo(cx+10,cy-46); cctx.lineTo(cx+16,cy-20); cctx.stroke(); }
      cctx.fillStyle= grey ? "rgba(120,115,110,.9)" : "#d4b16a";
      if(era.crown==="band"){ cctx.fillRect(cx-20,cy-46,40,7); }
      else if(era.crown==="point"){ cctx.beginPath(); cctx.moveTo(cx-18,cy-42); cctx.lineTo(cx,cy-64); cctx.lineTo(cx+18,cy-42); cctx.closePath(); cctx.fill(); }
      else if(era.crown==="ornate" || era.crown==="ornate2"){ cctx.beginPath(); cctx.moveTo(cx-24,cy-42); cctx.lineTo(cx-14,cy-68); cctx.lineTo(cx-4,cy-46); cctx.lineTo(cx,cy-74); cctx.lineTo(cx+4,cy-46); cctx.lineTo(cx+14,cy-68); cctx.lineTo(cx+24,cy-42); cctx.closePath(); cctx.fill(); if(era.crown==="ornate2"){ cctx.beginPath(); cctx.arc(cx,cy-78,4,0,Math.PI*2); cctx.fill(); } }
      else if(era.crown==="fallen"){ cctx.save(); cctx.translate(cx+40,cy+92); cctx.rotate(0.5); cctx.beginPath(); cctx.moveTo(-16,0); cctx.lineTo(-8,-16); cctx.lineTo(0,0); cctx.lineTo(8,-14); cctx.lineTo(16,0); cctx.closePath(); cctx.fill(); cctx.restore(); }
      cctx.fillStyle="#edf2f7"; cctx.font="16px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(era.ruler, cx, cy+118); cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.fillText(era.years, cx, cy+136); cctx.textAlign="left";
    }
    AnimationManager.register('chera', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('chera'); return; }
      cctx.clearRect(0,0,c.width,c.height); const years=Number(input.value); const era=eraFor(years); drawLandmark(era); drawPortrait(era);
      cctx.fillStyle= era.tone==="destroyed" ? "#c98a8a" : "#5eead4"; cctx.font="14px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(era.landmark, landmarkX, groundY+34); cctx.textAlign="left";
      readout.innerText=`${era.ruler} (${era.years}) — ${era.fact}`;
    }, c);
  },
  chola(){ const c=document.getElementById("cholaCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'chola');
    const readout=document.getElementById("cholaRead"); const input=document.getElementById("cholaYear");
    const groundY=c.height-70, landmarkX=180, portraitX=520;
    const ERAS=[
      { start:0, end:23, ruler:"Vijayalaya Chola", years:"848–871 CE",
        landmark:"Thanjavur Recaptured",
        fact:"Vijayalaya recaptures Thanjavur in 848 CE — the modest seed of what becomes South Asia's dominant naval power.",
        stage:"fort", crown:"band", tone:"rising" },
      { start:23, end:137, ruler:"Aditya I & Parantaka I", years:"871–985 CE",
        landmark:"A Growing Realm",
        fact:"Aditya I and Parantaka I push Chola power outward, defeating the Pallavas and clashing with the Rashtrakutas, across a century of gradual expansion.",
        stage:"smalltemple", crown:"point", tone:"rising" },
      { start:137, end:166, ruler:"Rajaraja I", years:"985–1014 CE",
        landmark:"Brihadeeswarar Temple, Thanjavur",
        fact:"Rajaraja I raises the Brihadeeswarar Temple — over 130,000 tons of granite, its 66-metre tower among the tallest of its era anywhere in the world.",
        stage:"grandtemple", crown:"ornate", tone:"peak" },
      { start:166, end:196, ruler:"Rajendra I", years:"1014–1044 CE",
        landmark:"Gangaikonda Cholapuram",
        fact:"Rajendra I builds a new capital and temple at Gangaikonda Cholapuram, then launches a naval expedition all the way to Srivijaya in Southeast Asia.",
        stage:"navaltemple", crown:"ornate2", tone:"peak" },
      { start:196, end:398, ruler:"Kulottunga I and successors", years:"1044–1246 CE",
        landmark:"An Empire Sustained, Then Strained",
        fact:"Later rulers like Kulottunga I keep trade and administration running for generations, but repeated succession disputes slowly weaken central control.",
        stage:"grandtemple", crown:"ornate", tone:"fading" },
      { start:398, end:431, ruler:"Rajendra III (last Chola king)", years:"1246–1279 CE",
        landmark:"The Fall of the Dynasty",
        fact:"A resurgent Pandya kingdom overwhelms the weakened Cholas — by 1279 CE the last Chola king is defeated, ending a dynasty that had lasted over four centuries.",
        stage:"ruins", crown:"fallen", tone:"destroyed" }
    ];
    function eraFor(years){ for(const e of ERAS){ if(years>=e.start && years<e.end) return e; } return ERAS[ERAS.length-1]; }
    function eraProgress(e,years){ return Math.max(0,Math.min(1,(years-e.start)/Math.max(1,(e.end-e.start)))); }
    function drawTemple(cx,baseY,tiers,tierH,tierW0,color,broken,glow){ if(glow){ cctx.shadowColor=color; cctx.shadowBlur=18; } let w=tierW0, y=baseY;
      for(let i=0;i<tiers;i++){ const jitterX = broken ? (Math.sin(i*7.3)*7) : 0; const jitterY = broken ? Math.abs(Math.sin(i*4.1))*6 : 0; cctx.fillStyle=color; cctx.fillRect(cx-w/2+jitterX, y-tierH+jitterY, w, tierH); y-=tierH*0.82; w*=0.72; }
      cctx.shadowBlur=0;
      if(!broken){ cctx.beginPath(); cctx.fillStyle=color; cctx.arc(cx, y-4, 6, 0, Math.PI*2); cctx.fill(); }
      if(broken){ cctx.fillStyle="rgba(120,110,100,.6)"; for(let i=0;i<6;i++){ const rx=cx-70+i*24+Math.sin(i*3)*8; cctx.fillRect(rx, baseY-6, 14, 10); } cctx.fillStyle="rgba(20,15,15,.25)"; cctx.beginPath(); cctx.ellipse(cx, baseY-tierH*tiers*0.3, 90, 60, 0, 0, Math.PI*2); cctx.fill(); }
    }
    function drawFort(cx,baseY,color){ const w=110, h=42; cctx.fillStyle=color; cctx.fillRect(cx-w/2, baseY-h, w, h); for(let i=0;i<6;i++){ cctx.fillRect(cx-w/2+i*(w/6), baseY-h-10, w/12, 10); } cctx.strokeStyle=color; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(cx,baseY-h-10); cctx.lineTo(cx,baseY-h-28); cctx.stroke(); cctx.fillStyle=color; cctx.beginPath(); cctx.moveTo(cx,baseY-h-28); cctx.lineTo(cx+16,baseY-h-22); cctx.lineTo(cx,baseY-h-16); cctx.closePath(); cctx.fill(); }
    function drawShip(cx,baseY,color){ cctx.fillStyle=color; cctx.beginPath(); cctx.moveTo(cx-30,baseY); cctx.lineTo(cx+30,baseY); cctx.lineTo(cx+18,baseY+12); cctx.lineTo(cx-18,baseY+12); cctx.closePath(); cctx.fill(); cctx.strokeStyle=color; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(cx,baseY); cctx.lineTo(cx,baseY-34); cctx.stroke(); cctx.beginPath(); cctx.moveTo(cx,baseY-34); cctx.lineTo(cx+22,baseY-6); cctx.lineTo(cx,baseY-6); cctx.closePath(); cctx.fill(); }
    function drawLandmark(era, progress){ let color = "#d4b16a"; let glow=false, broken=false; if(era.tone==="peak"){ glow=true; } if(era.tone==="fading"){ color="rgba(212,177,106,.45)"; } if(era.tone==="destroyed"){ color="rgba(150,140,130,.7)"; broken=true; }
      if(era.stage==="fort"){ drawFort(landmarkX, groundY, color); }
      else if(era.stage==="smalltemple"){ drawTemple(landmarkX, groundY, 3, 16, 60+progress*20, color, false, false); }
      else if(era.stage==="grandtemple"){ drawTemple(landmarkX, groundY, 6, 18, 100, color, false, glow); }
      else if(era.stage==="navaltemple"){ drawTemple(landmarkX, groundY, 6, 18, 95, color, false, glow); drawShip(landmarkX+95, groundY-4, color); }
      else if(era.stage==="ruins"){ drawTemple(landmarkX, groundY, 6, 18, 100, color, true, false); }
      cctx.strokeStyle="rgba(215,220,229,.3)"; cctx.beginPath(); cctx.moveTo(landmarkX-110, groundY); cctx.lineTo(landmarkX+130, groundY); cctx.stroke();
    }
    function drawPortrait(era){ const cx=portraitX, cy=groundY-70; const grey = era.tone==="destroyed"; const bodyColor = grey ? "rgba(150,145,140,.85)" : "rgba(212,177,106,.92)";
      cctx.fillStyle=bodyColor; cctx.beginPath(); cctx.moveTo(cx-62,cy+78); cctx.quadraticCurveTo(cx-62,cy+30,cx-34,cy+18); cctx.lineTo(cx+34,cy+18); cctx.quadraticCurveTo(cx+62,cy+30,cx+62,cy+78); cctx.closePath(); cctx.fill();
      cctx.beginPath(); cctx.arc(cx,cy-14,36,0,Math.PI*2); cctx.fill();
      if(grey){ cctx.strokeStyle="rgba(30,25,25,.5)"; cctx.lineWidth=1.5; cctx.beginPath(); cctx.moveTo(cx-14,cy-40); cctx.lineTo(cx-4,cy-6); cctx.lineTo(cx-18,cy+16); cctx.moveTo(cx+10,cy-46); cctx.lineTo(cx+16,cy-20); cctx.stroke(); }
      cctx.fillStyle= grey ? "rgba(120,115,110,.9)" : "#f0954a";
      if(era.crown==="band"){ cctx.fillRect(cx-20,cy-46,40,7); }
      else if(era.crown==="point"){ cctx.beginPath(); cctx.moveTo(cx-18,cy-42); cctx.lineTo(cx,cy-64); cctx.lineTo(cx+18,cy-42); cctx.closePath(); cctx.fill(); }
      else if(era.crown==="ornate" || era.crown==="ornate2"){ cctx.beginPath(); cctx.moveTo(cx-24,cy-42); cctx.lineTo(cx-14,cy-68); cctx.lineTo(cx-4,cy-46); cctx.lineTo(cx,cy-74); cctx.lineTo(cx+4,cy-46); cctx.lineTo(cx+14,cy-68); cctx.lineTo(cx+24,cy-42); cctx.closePath(); cctx.fill(); if(era.crown==="ornate2"){ cctx.beginPath(); cctx.arc(cx,cy-78,4,0,Math.PI*2); cctx.fill(); } }
      else if(era.crown==="fallen"){ cctx.save(); cctx.translate(cx+40,cy+92); cctx.rotate(0.5); cctx.beginPath(); cctx.moveTo(-16,0); cctx.lineTo(-8,-16); cctx.lineTo(0,0); cctx.lineTo(8,-14); cctx.lineTo(16,0); cctx.closePath(); cctx.fill(); cctx.restore(); }
      cctx.fillStyle="#edf2f7"; cctx.font="16px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(era.ruler, cx, cy+118); cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.fillText(era.years, cx, cy+136); cctx.textAlign="left";
    }
    AnimationManager.register('chola', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('chola'); return; }
      cctx.clearRect(0,0,c.width,c.height); const years=Number(input.value); const era=eraFor(years); const progress=eraProgress(era,years); drawLandmark(era, progress); drawPortrait(era);
      cctx.fillStyle= era.tone==="destroyed" ? "#c98a8a" : "#5eead4"; cctx.font="14px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(era.landmark, landmarkX, groundY+30); cctx.textAlign="left";
      readout.innerText=`${era.ruler} (${era.years}) — ${era.fact}`;
    }, c);
  },
  pandya(){ const c=document.getElementById("pandyaCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'pandya');
    const readout=document.getElementById("pandyaRead"); const input=document.getElementById("pandyaYear");
    const groundY=c.height-70, landmarkX=180, portraitX=520;
    const ERAS=[
      { start:0, end:20, ruler:"Jatavarman Sundara Pandyan I", years:"1251–1268 CE",
        landmark:"Pandya Power Revived",
        fact:"Jatavarman Sundara Pandyan I overthrows a century of Chola dominance and expands Pandya territory to its greatest extent.",
        stage:"temple", crown:"band", tone:"rising" },
      { start:20, end:42, ruler:"Maravarman Kulasekara I", years:"1268–1293 CE",
        landmark:"The Golden Age of Madurai",
        fact:"Under Kulasekara I, the Pandya realm reaches its broadest extent, with Madurai flourishing as a center of trade, temple patronage, and Tamil learning.",
        stage:"temple", crown:"ornate", tone:"peak" },
      { start:42, end:55, ruler:"Kulasekara I (later years)", years:"1293–1306 CE",
        landmark:"Pearl Fisheries of the Gulf of Mannar",
        fact:"The Venetian traveler Marco Polo visits around 1293 CE and writes home about the coast's famous pearl fisheries, cementing the Pandya realm's reputation across the medieval world.",
        stage:"pearls", crown:"ornate2", tone:"peak" },
      { start:55, end:60, ruler:"Sundara Pandyan & Vira Pandyan", years:"1306–1311 CE",
        landmark:"A Kingdom Divided",
        fact:"A bitter succession dispute between royal brothers splits the kingdom's strength right as a new threat gathers to the north.",
        stage:"temple", crown:"ornate", tone:"fading" },
      { start:60, end:75, ruler:"Malik Kafur's Invasion", years:"1311 CE",
        landmark:"The Sack of Madurai",
        fact:"Malik Kafur, a general of the Delhi Sultanate, invades in 1311 and plunders Madurai's temple treasuries — a devastating blow the divided kingdom never fully recovers from.",
        stage:"ruins", crown:"fallen", tone:"destroyed" },
      { start:75, end:100, ruler:"End of Independent Pandya Rule", years:"1311–1335 CE",
        landmark:"The Madurai Sultanate",
        fact:"Repeated raids and administrative takeover by the Delhi Sultanate culminate in 1335 CE, when the region breaks away as the independent Madurai Sultanate — the end of Pandya rule over their own capital.",
        stage:"ruins", crown:"fallen", tone:"destroyed" }
    ];
    function eraFor(years){ for(const e of ERAS){ if(years>=e.start && years<e.end) return e; } return ERAS[ERAS.length-1]; }
    function drawFish(cx,cy,scale,color){ cctx.fillStyle=color; cctx.beginPath(); cctx.moveTo(cx-10*scale,cy); cctx.quadraticCurveTo(cx-2*scale,cy-6*scale,cx+10*scale,cy); cctx.quadraticCurveTo(cx-2*scale,cy+6*scale,cx-10*scale,cy); cctx.closePath(); cctx.fill(); cctx.beginPath(); cctx.moveTo(cx+10*scale,cy); cctx.lineTo(cx+16*scale,cy-4*scale); cctx.lineTo(cx+16*scale,cy+4*scale); cctx.closePath(); cctx.fill(); }
    function drawTemple(cx,baseY,color,broken,glow){ if(glow){ cctx.shadowColor=color; cctx.shadowBlur=18; } let w=100, y=baseY, tiers=6;
      for(let i=0;i<tiers;i++){ const jitterX = broken ? (Math.sin(i*7.3)*7) : 0; const jitterY = broken ? Math.abs(Math.sin(i*4.1))*6 : 0; cctx.fillStyle=color; cctx.fillRect(cx-w/2+jitterX, y-18+jitterY, w, 18); y-=15; w*=0.72; }
      cctx.shadowBlur=0;
      if(!broken){ cctx.beginPath(); cctx.fillStyle=color; cctx.arc(cx,y-4,6,0,Math.PI*2); cctx.fill(); drawFish(cx-70,baseY-8,1,color); cctx.save(); cctx.translate(cx+70,baseY-8); cctx.scale(-1,1); drawFish(0,0,1,color); cctx.restore(); }
      else { cctx.fillStyle="rgba(120,110,100,.6)"; for(let i=0;i<6;i++){ const rx=cx-70+i*24+Math.sin(i*3)*8; cctx.fillRect(rx, baseY-6, 14, 10); } cctx.fillStyle="rgba(20,15,15,.25)"; cctx.beginPath(); cctx.ellipse(cx, baseY-70, 90, 55, 0, 0, Math.PI*2); cctx.fill(); }
    }
    function drawPearls(cx,baseY,color){ cctx.fillStyle=color; cctx.beginPath(); cctx.moveTo(cx-30,baseY); cctx.lineTo(cx+30,baseY); cctx.lineTo(cx+18,baseY+12); cctx.lineTo(cx-18,baseY+12); cctx.closePath(); cctx.fill(); cctx.strokeStyle=color; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(cx,baseY); cctx.lineTo(cx,baseY-30); cctx.stroke(); cctx.beginPath(); cctx.moveTo(cx,baseY-30); cctx.lineTo(cx+18,baseY-8); cctx.lineTo(cx,baseY-8); cctx.closePath(); cctx.fill(); cctx.fillStyle="#edf2f7"; const spots=[[-72,4],[-50,10],[-90,12],[62,6],[80,12],[46,14]]; spots.forEach(p=>{ cctx.beginPath(); cctx.arc(cx+p[0], baseY+p[1], 4, 0, Math.PI*2); cctx.fill(); }); }
    function drawLandmark(era){ let color="#8cd3e8"; let broken=false, glow=false; if(era.tone==="peak"){ glow=true; } if(era.tone==="fading"){ color="rgba(140,211,232,.45)"; } if(era.tone==="destroyed"){ color="rgba(150,140,130,.7)"; broken=true; }
      if(era.stage==="temple"){ drawTemple(landmarkX, groundY, color, false, glow); }
      else if(era.stage==="pearls"){ drawTemple(landmarkX-60, groundY, color, false, glow); drawPearls(landmarkX+60, groundY-4, "#d4b16a"); }
      else if(era.stage==="ruins"){ drawTemple(landmarkX, groundY, color, true, false); }
      cctx.strokeStyle="rgba(215,220,229,.3)"; cctx.beginPath(); cctx.moveTo(landmarkX-120, groundY); cctx.lineTo(landmarkX+130, groundY); cctx.stroke();
    }
    function drawPortrait(era){ const cx=portraitX, cy=groundY-70; const grey = era.tone==="destroyed"; const bodyColor = grey ? "rgba(150,145,140,.85)" : "rgba(140,211,232,.9)";
      cctx.fillStyle=bodyColor; cctx.beginPath(); cctx.moveTo(cx-62,cy+78); cctx.quadraticCurveTo(cx-62,cy+30,cx-34,cy+18); cctx.lineTo(cx+34,cy+18); cctx.quadraticCurveTo(cx+62,cy+30,cx+62,cy+78); cctx.closePath(); cctx.fill();
      cctx.beginPath(); cctx.arc(cx,cy-14,36,0,Math.PI*2); cctx.fill();
      if(grey){ cctx.strokeStyle="rgba(30,25,25,.5)"; cctx.lineWidth=1.5; cctx.beginPath(); cctx.moveTo(cx-14,cy-40); cctx.lineTo(cx-4,cy-6); cctx.lineTo(cx-18,cy+16); cctx.moveTo(cx+10,cy-46); cctx.lineTo(cx+16,cy-20); cctx.stroke(); }
      cctx.fillStyle= grey ? "rgba(120,115,110,.9)" : "#d4b16a";
      if(era.crown==="band"){ cctx.fillRect(cx-20,cy-46,40,7); }
      else if(era.crown==="point"){ cctx.beginPath(); cctx.moveTo(cx-18,cy-42); cctx.lineTo(cx,cy-64); cctx.lineTo(cx+18,cy-42); cctx.closePath(); cctx.fill(); }
      else if(era.crown==="ornate" || era.crown==="ornate2"){ cctx.beginPath(); cctx.moveTo(cx-24,cy-42); cctx.lineTo(cx-14,cy-68); cctx.lineTo(cx-4,cy-46); cctx.lineTo(cx,cy-74); cctx.lineTo(cx+4,cy-46); cctx.lineTo(cx+14,cy-68); cctx.lineTo(cx+24,cy-42); cctx.closePath(); cctx.fill(); if(era.crown==="ornate2"){ cctx.beginPath(); cctx.arc(cx,cy-78,4,0,Math.PI*2); cctx.fill(); } }
      else if(era.crown==="fallen"){ cctx.save(); cctx.translate(cx+40,cy+92); cctx.rotate(0.5); cctx.beginPath(); cctx.moveTo(-16,0); cctx.lineTo(-8,-16); cctx.lineTo(0,0); cctx.lineTo(8,-14); cctx.lineTo(16,0); cctx.closePath(); cctx.fill(); cctx.restore(); }
      cctx.fillStyle="#edf2f7"; cctx.font="16px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(era.ruler, cx, cy+118); cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.fillText(era.years, cx, cy+136); cctx.textAlign="left";
    }
    AnimationManager.register('pandya', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('pandya'); return; }
      cctx.clearRect(0,0,c.width,c.height); const years=Number(input.value); const era=eraFor(years); drawLandmark(era); drawPortrait(era);
      cctx.fillStyle= era.tone==="destroyed" ? "#c98a8a" : "#8cd3e8"; cctx.font="14px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(era.landmark, landmarkX, groundY+34); cctx.textAlign="left";
      readout.innerText=`${era.ruler} (${era.years}) — ${era.fact}`;
    }, c);
  },
  freedomtimeline(){ const c=document.getElementById("freedomCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'freedom');
    const readout=document.getElementById("freedomRead"); const yearInput=document.getElementById("freedomYear");
    const marginX=40, lineY=140, minYear=1857, maxYear=1947;
    const EVENTS=[
      { year:1857, label:"Revolt of 1857",
        detail:"The Revolt of 1857 began among Indian soldiers (sepoys) in the British East India Company's army and spread into a widespread, if ultimately unsuccessful, uprising — its suppression led the British Crown to take direct control of India from the Company the following year." },
      { year:1885, label:"Indian National Congress founded",
        detail:"Founded in 1885, the Indian National Congress began as a moderate forum for educated Indians to petition colonial authorities — over the following decades it transformed into the primary organized vehicle for the demand for full self-rule." },
      { year:1919, label:"Jallianwala Bagh massacre",
        detail:"In April 1919, British troops opened fire on an unarmed crowd gathered in an enclosed garden in Amritsar, killing hundreds — the massacre shocked the country and is widely seen as a turning point that hardened public support for the independence movement." },
      { year:1930, label:"Salt March",
        detail:"In 1930, Gandhi and his followers walked nearly 390 kilometers to the coastal town of Dandi to make their own salt in defiance of the British salt tax — turning a small daily necessity into an unmistakable, world-watched act of peaceful mass defiance." },
      { year:1942, label:"Quit India Movement",
        detail:"Launched in August 1942, the Quit India Movement was a mass call for an immediate end to British rule — met with widespread arrests of Congress leaders, it nonetheless signaled that continued colonial rule had become untenable." },
      { year:1947, label:"Independence",
        detail:"India became independent on August 15, 1947, ending nearly two centuries of British rule — the moment arrived alongside the difficult and painful partition of the subcontinent into India and Pakistan." }
    ];
    function xFor(year){ return marginX+((year-minYear)/(maxYear-minYear))*(c.width-marginX*2); }
    AnimationManager.register('freedom', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('freedom'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(marginX,lineY); cctx.lineTo(c.width-marginX,lineY); cctx.stroke();
      let nearest=EVENTS[0]; const year=Number(yearInput.value);
      EVENTS.forEach(ev=>{ const x=xFor(ev.year); cctx.beginPath(); cctx.fillStyle="#9ca7c2"; cctx.arc(x,lineY,5,0,Math.PI*2); cctx.fill();
        cctx.save(); cctx.translate(x,lineY-14); cctx.rotate(-0.5); cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.fillText(`${ev.year} ${ev.label}`,0,0); cctx.restore();
        if(Math.abs(ev.year-year)<Math.abs(nearest.year-year)) nearest=ev; });
      const markerX=xFor(year); cctx.beginPath(); cctx.fillStyle="#f0954a"; cctx.arc(markerX,lineY,9,0,Math.PI*2); cctx.fill();
      if(Math.abs(nearest.year-year)<=1){ readout.innerText=`★ ${nearest.year} — ${nearest.label}: ${nearest.detail}`; } else { readout.innerText=`${year} — closest major event: ${nearest.year} · ${nearest.label}`; }
    }, c);
  },
  freedomfighters(){ const c=document.getElementById("fightersCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'fighters');
    const readout=document.getElementById("fightersRead"); const indexInput=document.getElementById("fighterIndex");
    const cx=c.width/2, cy=140; let pulse=0;
    const stars=[0,0.2,0.4,0.6,0.8].map(t=>({ t, r:70+Math.random()*20 }));
    const FIGURES=[{ name:"Mahatma Gandhi", years:"1869–1948", accessory:"glasses", fact:"Led the nation to independence through nonviolent civil resistance, or satyagraha." },{ name:"Bhagat Singh", years:"1907–1931", accessory:"hat", fact:"A young revolutionary executed at 23, whose fearless defiance became a symbol of sacrifice." },{ name:"Subhas Chandra Bose", years:"1897–1945", accessory:"cap", fact:"Founded the Indian National Army to pursue independence through armed struggle abroad." },{ name:"Rani Lakshmibai", years:"1828–1858", accessory:"sword", fact:"The Rani of Jhansi, who led her army against the British during the Revolt of 1857." },{ name:"Sarojini Naidu", years:"1879–1949", accessory:"drape", fact:"A poet and orator, known as the Nightingale of India, who championed independence and women's rights." }];
    function drawSilhouette(accessory){ const silhouette=`rgba(212,177,106,.92)`;
      cctx.fillStyle=silhouette; cctx.beginPath(); cctx.moveTo(cx-70,cy+90); cctx.quadraticCurveTo(cx-70,cy+35,cx-38,cy+22); cctx.lineTo(cx+38,cy+22); cctx.quadraticCurveTo(cx+70,cy+35,cx+70,cy+90); cctx.closePath(); cctx.fill();
      cctx.beginPath(); cctx.arc(cx,cy-18,40,0,Math.PI*2); cctx.fill();
      cctx.strokeStyle="rgba(5,8,22,.5)"; cctx.lineWidth=2;
      if(accessory==="glasses"){ cctx.beginPath(); cctx.arc(cx-15,cy-16,10,0,Math.PI*2); cctx.arc(cx+15,cy-16,10,0,Math.PI*2); cctx.moveTo(cx-5,cy-16); cctx.lineTo(cx+5,cy-16); cctx.stroke(); cctx.strokeStyle="rgba(5,8,22,.35)"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-55,cy+30); cctx.lineTo(cx+10,cy+85); cctx.stroke(); }
      else if(accessory==="hat"){ cctx.fillStyle="rgba(5,8,22,.65)"; cctx.beginPath(); cctx.ellipse(cx,cy-52,38,10,0,0,Math.PI*2); cctx.fill(); cctx.beginPath(); cctx.rect(cx-20,cy-70,40,22); cctx.fill(); }
      else if(accessory==="cap"){ cctx.fillStyle="rgba(5,8,22,.65)"; cctx.beginPath(); cctx.arc(cx,cy-52,34,Math.PI,0); cctx.fill(); cctx.fillRect(cx-34,cy-52,68,8); }
      else if(accessory==="sword"){ cctx.strokeStyle="rgba(5,8,22,.4)"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-45,cy-45); cctx.quadraticCurveTo(cx-58,cy-15,cx-46,cy+15); cctx.stroke(); cctx.strokeStyle="rgba(215,220,229,.8)"; cctx.lineWidth=4; cctx.beginPath(); cctx.moveTo(cx+50,cy+30); cctx.lineTo(cx+80,cy-40); cctx.stroke(); }
      else if(accessory==="drape"){ cctx.strokeStyle="rgba(5,8,22,.4)"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-45,cy-45); cctx.quadraticCurveTo(cx-58,cy-15,cx-46,cy+15); cctx.stroke(); cctx.strokeStyle="rgba(240,149,74,.55)"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-38,cy-52); cctx.quadraticCurveTo(cx,cy-70,cx+38,cy-50); cctx.stroke(); }
    }
    AnimationManager.register('fighters', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('fighters'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const idx=Math.min(FIGURES.length-1,Number(indexInput.value)); const figure=FIGURES[idx]; pulse+=0.03;
      const haloR=95+Math.sin(pulse)*6;
      const grad=cctx.createRadialGradient(cx,cy,10,cx,cy,haloR); grad.addColorStop(0,"rgba(240,149,74,.28)"); grad.addColorStop(1,"rgba(240,149,74,0)"); cctx.fillStyle=grad; cctx.beginPath(); cctx.arc(cx,cy,haloR,0,Math.PI*2); cctx.fill();
      cctx.fillStyle="rgba(237,242,247,.8)";
      stars.forEach(s=>{ s.t=(s.t+0.0025)%1; const ang=s.t*Math.PI*2; const sx=cx+Math.cos(ang)*s.r; const sy=cy+Math.sin(ang)*s.r*0.55; cctx.beginPath(); cctx.arc(sx,sy,1.6+Math.sin(pulse*2+s.r)*0.8,0,Math.PI*2); cctx.fill(); });
      drawSilhouette(figure.accessory);
      cctx.fillStyle="#edf2f7"; cctx.font="18px Fraunces,Georgia,serif"; cctx.textAlign="center"; cctx.fillText(figure.name, cx, cy+130); cctx.fillStyle="#9ca7c2"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.fillText(figure.years, cx, cy+150); cctx.textAlign="left";
      readout.innerText=figure.fact;
    }, c);
  },
  republic(){ const c=document.getElementById("republicCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'republic');
    const readout=document.getElementById("republicRead"); const baseY=260; const xs=[160,350,540]; const labels=["Legislature","Executive","Judiciary"]; const ids=["legislativeInput","executiveInput","judiciaryInput"];
    AnimationManager.register('republic', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('republic'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const values=ids.map(id=>Number(document.getElementById(id).value)); const maxV=10;
      const avg=values.reduce((a,b)=>a+b,0)/values.length; const spread=Math.max(...values)-Math.min(...values); const pillarW=50;
      xs.forEach((x,i)=>{ const h=120*(values[i]/maxV); cctx.fillStyle="rgba(240,149,74,.3)"; cctx.fillRect(x-pillarW/2,baseY-h,pillarW,h); cctx.strokeStyle="#d4b16a"; cctx.strokeRect(x-pillarW/2,baseY-h,pillarW,h); cctx.fillStyle="#edf2f7"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(labels[i],x,baseY+18); cctx.fillText(String(values[i]),x,baseY-h-10); });
      const topYs=xs.map((x,i)=>baseY-120*(values[i]/maxV));
      cctx.strokeStyle= spread<=2 ? "#5eead4" : "#f0a3a3"; cctx.lineWidth=6; cctx.beginPath(); cctx.moveTo(xs[0],topYs[0]); cctx.lineTo(xs[1],topYs[1]); cctx.lineTo(xs[2],topYs[2]); cctx.stroke(); cctx.textAlign="left";
      readout.innerText= spread<=2 ? `Balanced — no branch dominates (avg strength ${avg.toFixed(1)})` : `Tilted — one branch is overpowering the others`;
    }, c);
  }
});
