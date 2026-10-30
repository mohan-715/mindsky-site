Object.assign(SIM_REGISTRY,{
  /* ===== CHEMISTRY ===== */
  matterstates(){
    const parts=[]; const BX=30, BY=30, BW=400, BH=300;
    for(let i=0;i<36;i++){ const c=i%6, r=Math.floor(i/6); parts.push({ hx:BX+60+c*56, hy:BY+BH-30-r*30, x:BX+60+c*56, y:BY+BH-30-r*30, vx:(Math.random()-.5)*2, vy:(Math.random()-.5)*2 }); }
    simFrame("matterstates","matterCanvas",function(g,W,H,t,get,say){
      const T=get("chTemp"); const R=9;
      const solid=T<30, gas=T>=70;
      const ceil= gas ? BY+R : BY+BH-150-Math.max(0,T-30)*0.8;
      const speed=0.5+T*0.045;
      parts.forEach(function(p){
        if(solid){
          p.vx+=(p.hx-p.x)*0.06+(Math.random()-.5)*T*0.012; p.vy+=(p.hy-p.y)*0.06+(Math.random()-.5)*T*0.012;
          p.vx*=0.86; p.vy*=0.86;
        } else {
          if(!gas) p.vy+=0.16;
          const sp=Math.hypot(p.vx,p.vy)||0.01; const k=0.04; const tgt=speed*(gas?1.5:1);
          p.vx+=(p.vx/sp)*(tgt-sp)*k*8; p.vy+=(p.vy/sp)*(tgt-sp)*k*8;
          if(sp<0.3){ p.vx+=(Math.random()-.5); p.vy+=(Math.random()-.5); }
        }
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<BX+R){ p.x=BX+R; p.vx=Math.abs(p.vx); } if(p.x>BX+BW-R){ p.x=BX+BW-R; p.vx=-Math.abs(p.vx); }
        if(p.y>BY+BH-R){ p.y=BY+BH-R; p.vy=-Math.abs(p.vy)*0.9; }
        if(!solid && p.y<ceil){ if(gas){ p.y=BY+R; p.vy=Math.abs(p.vy); } else { p.vy+=0.5; } }
      });
      if(!solid){ for(let i=0;i<parts.length;i++){ for(let j=i+1;j<parts.length;j++){ const a=parts[i], b=parts[j]; const dx=b.x-a.x, dy=b.y-a.y, d=Math.hypot(dx,dy); if(d<R*2 && d>0.01){ const push=(R*2-d)*0.5/d; a.x-=dx*push; a.y-=dy*push; b.x+=dx*push; b.y+=dy*push; } } } }
      g.strokeStyle=MC.axis; g.lineWidth=1.5; g.strokeRect(BX,BY,BW,BH);
      parts.forEach(function(p,i){ chDot(g,p.x,p.y,R,solid?"rgba(94,234,212,.9)":(gas?"rgba(240,149,74,.9)":"rgba(212,177,106,.9)")); });
      const name=solid?"SOLID":(gas?"GAS":"LIQUID");
      const col=solid?MC.teal:(gas?"#f0954a":MC.gold);
      mText(g,name,470,70,col,24);
      const lines=solid?["Particles packed in fixed places.","They can only vibrate.","Keeps its own shape."]:(gas?["Particles far apart, moving fast.","They fill the whole container.","Easy to squash."]:["Particles touching but sliding past.","Takes the shape of the container.","Cannot be squashed much."]);
      lines.forEach(function(l,i){ mText(g,l,470,104+i*22,MC.text,12); });
      mText(g,"Heat level",470,200,MC.muted,12);
      chRound(g,470,210,200,14,7,"rgba(215,220,229,.1)");
      chRound(g,470,210,Math.max(8,200*T/100),14,7,col);
      mText(g,"melts ≈ 30",470+60,244,MC.muted,10,"center"); mText(g,"boils ≈ 70",470+140,244,MC.muted,10,"center");
      g.strokeStyle=MC.muted; g.beginPath(); g.moveTo(530,226); g.lineTo(530,230); g.moveTo(610,226); g.lineTo(610,230); g.stroke();
      say("matterRead",name.charAt(0)+name.slice(1).toLowerCase()+"  •  heat "+T);
    },true);
  },
  heatcurve(){ simFrame("heatcurve","heatCurveCanvas",function(g,W,H,t,get,say){
    const Q=get("chHeatJ");
    function temp(q){ if(q<=42) return -20+q/42*20; if(q<=376) return 0; if(q<=794) return (q-376)/418*100; if(q<=3054) return 100; return 100+(q-3054)/2.0; }
    function stateAt(q){ if(q<42) return "ice"; if(q<376) return "melting (ice and water)"; if(q<794) return "liquid water"; if(q<3054) return "boiling (water and steam)"; return "steam"; }
    const px=60,py=24,pw=600,ph=260, qMax=3100, tMin=-20, tMax=135;
    const X=function(q){ return px+q/qMax*pw; }, Y=function(tt){ return py+ph-(tt-tMin)/(tMax-tMin)*ph; };
    g.strokeStyle=MC.grid; g.lineWidth=1; [0,100].forEach(function(tt){ g.beginPath(); g.moveTo(px,Y(tt)); g.lineTo(px+pw,Y(tt)); g.stroke(); mText(g,tt+" °C",px-6,Y(tt)+4,MC.muted,11,"right"); });
    g.strokeStyle=MC.axis; g.beginPath(); g.moveTo(px,py); g.lineTo(px,py+ph); g.lineTo(px+pw,py+ph); g.stroke();
    [0,500,1000,1500,2000,2500,3000].forEach(function(q){ mText(g,String(q),X(q),py+ph+16,MC.muted,10,"center"); });
    mText(g,"Heat added (joules)",px+pw/2,H-8,MC.muted,11,"center");
    g.strokeStyle=MC.teal; g.lineWidth=2.5; g.beginPath(); for(let q=0;q<=qMax;q+=10){ const x=X(q), y=Y(temp(q)); if(q===0) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke();
    mText(g,"ice",X(70),Y(-20)-10,MC.muted,10);
    mText(g,"melting",X(210),Y(0)-8,MC.gold,11,"center");
    mText(g,"liquid water",X(570),Y(55),MC.muted,10,"right");
    mText(g,"boiling",X(1900),Y(100)-8,MC.gold,11,"center");
    mText(g,"steam",px+pw,Y(128),MC.muted,10,"right");
    const T=temp(Q); chDot(g,X(Q),Y(T),7,MC.text,MC.teal);
    say("heatCurveRead",T.toFixed(0)+" °C  •  "+stateAt(Q));
  }); },
  atomBuilder(){ simFrame("atomBuilder","atomCanvas",function(g,W,H,t,get,say){
    const Z=get("chProtons"), N=get("chNeutrons"), ch=get("chCharge");
    const el=CH_ELEMENTS[Z]; const e=Math.max(0,Z-ch); const sh=chShells(e);
    const cx=230, cy=200; const radii=[70,108,146,180];
    for(let s=0;s<4;s++){ if(sh[s]>0 || (s<3 && chShells(Z)[s]>0)){ g.strokeStyle="rgba(215,220,229,.2)"; g.lineWidth=1; g.beginPath(); g.arc(cx,cy,radii[s],0,Math.PI*2); g.stroke(); } }
    const nuc=Z+N; const nr=Math.max(16,6*Math.sqrt(nuc)+6);
    for(let i=0;i<nuc;i++){ const a=i*2.39996, r=Math.sqrt((i+.5)/nuc)*(nr-4); const isP=(i%2===0 ? i/2<Z : (nuc-1-i)<Z) ; }
    const order=[]; for(let i=0;i<Z;i++) order.push(1); for(let i=0;i<N;i++) order.push(0);
    for(let i=order.length-1;i>0;i--){ const j=(i*7919+13)%(i+1); const tmp=order[i]; order[i]=order[j]; order[j]=tmp; }
    for(let i=0;i<nuc;i++){ const a=i*2.39996, r=Math.sqrt((i+.5)/nuc)*(nr-4); chDot(g,cx+Math.cos(a)*r,cy+Math.sin(a)*r,5,order[i]?MC.rose:"#8a93a8","rgba(5,8,22,.6)"); }
    sh.forEach(function(cnt,s){ for(let k=0;k<cnt;k++){ const sp=(s===0?1:(s===1?0.6:(s===2?0.4:0.3)))*0.0007; const a=k/cnt*Math.PI*2+t*sp*(s%2?-1:1); chDot(g,cx+Math.cos(a)*radii[s],cy+Math.sin(a)*radii[s],4.5,MC.teal); } });
    const chTxt= ch===0 ? "" : (Math.abs(ch)===1 ? "" : String(Math.abs(ch)))+(ch>0?"+":"−");
    const sym=el.s+(ch===0?"":chSup(Math.abs(ch)===1?"":Math.abs(ch))+(ch>0?"⁺":"⁻"));
    const tx=430;
    mText(g,sym,tx,60,CH.green,34);
    mText(g,el.n+(ch===0?"":(ch>0?" ion":" ion")),tx,88,MC.text,15);
    mText(g,"Protons:   "+Z,tx,130,MC.rose,14);
    mText(g,"Neutrons:  "+N,tx,154,"#8a93a8",14);
    mText(g,"Electrons: "+e,tx,178,MC.teal,14);
    mText(g,"Mass number: "+(Z+N),tx,214,MC.text,13);
    mText(g,"Charge: "+(ch===0?"0 (neutral)":(ch>0?"+"+ch:"−"+Math.abs(ch))),tx,238,MC.text,13);
    mText(g,"Shells: "+sh.filter(function(x){ return x>0; }).join(", "),tx,262,MC.muted,13);
    const iso=el.n+"-"+(Z+N);
    mText(g,"Isotope: "+iso,tx,294,MC.gold,13);
    mText(g,"red = proton   grey = neutron   teal = electron",30,H-12,MC.muted,10);
    say("atomRead",iso+"  •  "+Z+" p, "+N+" n, "+e+" e  •  "+(ch===0?"neutral":"ion "+sym));
  },true); },
  periodicTable(){ simFrame("periodicTable","periodicCanvas",function(g,W,H,t,get,say){
    const Zs=get("chElem"), view=get("chView"); const x0=26,y0=34,cw=36,chh=36;
    [1,2,13,14,15,16,17,18].forEach(function(gr){ mText(g,String(gr),x0+(gr-1)*cw+cw/2,y0-8,MC.muted,10,"center"); });
    mText(g,"group",x0,14,MC.muted,10);
    for(let p=1;p<=4;p++){ mText(g,String(p),x0-8,y0+(p-1)*chh+chh/2+4,MC.muted,10,"right"); }
    const vcols=["#fb7185","#f0954a","#d4b16a","#9be36d","#5eead4","#8fb7e8","#c9a7f0","#e7c3f5","#edf2f7"];
    for(let z=1;z<=20;z++){
      const e=CH_ELEMENTS[z]; const x=x0+(e.g-1)*cw, y=y0+(e.p-1)*chh; const sh=chShells(z).filter(function(q){ return q>0; }); const outer=sh[sh.length-1];
      let col = view===0 ? CH_CAT_COL[e.cat] : (view===1 ? vcols[outer] : ["#fb7185","#d4b16a","#5eead4","#c9a7f0"][sh.length-1]);
      g.globalAlpha=0.28; g.fillStyle=col; g.fillRect(x+1,y+1,cw-2,chh-2); g.globalAlpha=1;
      g.strokeStyle=col; g.lineWidth=1; g.strokeRect(x+1.5,y+1.5,cw-3,chh-3);
      mText(g,e.s,x+cw/2,y+chh/2+5,MC.text,13,"center"); mText(g,String(z),x+3,y+10,MC.muted,8);
      if(z===Zs){ g.strokeStyle="#fff"; g.lineWidth=2.5; g.strokeRect(x-1,y-1,cw+2,chh+2); }
    }
    const e=CH_ELEMENTS[Zs]; const sh=chShells(Zs).filter(function(q){ return q>0; }); const outer=sh[sh.length-1];
    const by=196; chRound(g,26,by,96,96,8,"rgba(155,227,109,.12)","rgba(155,227,109,.6)");
    mText(g,String(Zs),34,by+18,MC.muted,12); mText(g,e.s,74,by+58,CH.green,34,"center"); mText(g,e.n,74,by+82,MC.text,11,"center");
    const gx=150;
    mText(g,"Mass number ≈ "+e.m+"   •   "+CH_CAT_NAME[e.cat],gx,by+16,MC.text,13);
    mText(g,"Period "+e.p+" → "+e.p+" electron shell"+(e.p>1?"s":""),gx,by+40,MC.muted,13);
    mText(g,"Group "+e.g+"   •   electrons: "+sh.join(", "),gx,by+62,MC.muted,13);
    let tend;
    if(e.g===18) tend="Outer shell is full, so it hardly ever reacts."; else if(e.g<=2||e.g===13) tend="Loses "+(e.g===13?3:e.g)+" outer electron"+(e.g===1?"":"s")+" to become "+e.s+chSup(e.g===13?3:e.g===1?"":e.g)+"⁺.";
    else if(e.g===14) tend="Has 4 outer electrons, so it shares them (covalent bonds)."; else if(Zs===1) tend="Can lose 1 electron or share 1 to fill its shell."; else tend="Gains "+(18-e.g)+" electron"+(18-e.g===1?"":"s")+" to become "+e.s+chSup(18-e.g===1?"":18-e.g)+"⁻.";
    mText(g,"Outer electrons: "+outer+"   →   "+tend,gx,by+84,CH.green,12);
    const items = view===0 ? Object.keys(CH_CAT_NAME).map(function(k){ return [CH_CAT_COL[k],CH_CAT_NAME[k]]; })
      : (view===1 ? [1,2,3,4,5,6,7,8].map(function(k){ return [vcols[k],k+" outer electron"+(k>1?"s":"")]; }) : [1,2,3,4].map(function(k){ return [["#fb7185","#d4b16a","#5eead4","#c9a7f0"][k-1],k+" shell"+(k>1?"s":"")]; }));
    mText(g,view===0?"Colour: type of element":(view===1?"Colour: outer electrons":"Colour: electron shells"),150,y0+4,MC.muted,11);
    items.forEach(function(it,k){ const col=Math.floor(k/4), row=k%4; const lx=150+col*150, ly=y0+22+row*20; g.globalAlpha=0.6; g.fillStyle=it[0]; g.fillRect(lx,ly-9,12,12); g.globalAlpha=1; mText(g,it[1],lx+18,ly+1,MC.text,10); });
    say("periodicRead",e.n+" ("+e.s+")  •  period "+e.p+", group "+e.g);
  }); },
  trends(){ simFrame("trends","trendCanvas",function(g,W,H,t,get,say){
    const per=get("chPeriod"), tr=get("chTrend");
    const sym={2:["Li","Be","B","C","N","O","F","Ne"],3:["Na","Mg","Al","Si","P","S","Cl","Ar"]}[per];
    const rad={2:[128,96,84,76,71,66,57,null],3:[166,141,121,111,107,105,102,null]}[per];
    const ion={2:[520,900,801,1086,1402,1314,1681,2081],3:[496,738,578,786,1012,1000,1251,1521]}[per];
    const data=tr===0?rad:ion; const maxV=tr===0?180:2200; const unit=tr===0?" pm":" kJ/mol";
    const px=70,py=30,pw=580,ph=220; const bw=48, gap=(pw-8*bw)/8;
    g.strokeStyle=MC.axis; g.lineWidth=1; g.beginPath(); g.moveTo(px,py); g.lineTo(px,py+ph); g.lineTo(px+pw,py+ph); g.stroke();
    const steps=tr===0?[0,50,100,150]:[0,500,1000,1500,2000];
    steps.forEach(function(v){ const y=py+ph-v/maxV*ph; g.strokeStyle=MC.grid; g.beginPath(); g.moveTo(px,y); g.lineTo(px+pw,y); g.stroke(); mText(g,String(v),px-6,y+4,MC.muted,10,"right"); });
    let best=-1, worst=-1;
    data.forEach(function(v,i){ if(v==null) return; if(best<0||v>data[best]) best=i; if(worst<0||v<data[worst]) worst=i; });
    data.forEach(function(v,i){
      const x=px+gap/2+i*(bw+gap);
      if(v==null){ mText(g,"no value",x+bw/2,py+ph-8,MC.muted,9,"center"); }
      else { const h=v/maxV*ph; g.fillStyle=tr===0?"rgba(155,227,109,.75)":"rgba(212,177,106,.8)"; g.fillRect(x,py+ph-h,bw,h); mText(g,String(v),x+bw/2,py+ph-h-6,MC.text,11,"center"); }
      mText(g,sym[i],x+bw/2,py+ph+18,MC.text,13,"center");
    });
    mText(g,tr===0?"Covalent radius (picometres)":"First ionisation energy (kJ/mol)",px,16,MC.muted,11);
    mText(g,"left to right across period "+per,px+pw/2,H-10,MC.muted,11,"center");
    const msg=tr===0?"Biggest: "+sym[best]+" ("+data[best]+" pm). Smallest: "+sym[worst]+" ("+data[worst]+" pm). Atoms shrink across the period.":"Lowest: "+sym[worst]+". Highest: "+sym[best]+". It gets harder to remove an electron across the period.";
    say("trendRead",msg);
  }); },
  bondTypes(){
    const PAIRS=[
      {a:"H",b:"H",ea:2.20,eb:2.20},{a:"H",b:"C",ea:2.20,eb:2.55},{a:"H",b:"N",ea:2.20,eb:3.04},{a:"H",b:"Cl",ea:2.20,eb:3.16},
      {a:"H",b:"O",ea:2.20,eb:3.44},{a:"Mg",b:"O",ea:1.31,eb:3.44,ca:2,cb:2},{a:"Na",b:"Cl",ea:0.93,eb:3.16,ca:1,cb:1},{a:"K",b:"F",ea:0.82,eb:3.98,ca:1,cb:1}];
    simFrame("bondTypes","bondCanvas",function(g,W,H,t,get,say){
      const P=PAIRS[get("chPair")-1]; const d=Math.abs(P.eb-P.ea);
      const ionic=d>1.7; const kind=ionic?"ionic":(d<0.5?"covalent (shared almost equally)":"polar covalent");
      const ax=190, bx=510, y=130;
      const hi= P.eb>=P.ea ? "b":"a";
      const rA=P.ca?34:46, rB=P.cb?44:46;
      if(ionic){
        chDot(g,ax,y,rA,"rgba(94,234,212,.22)",MC.teal); chDot(g,bx,y,rB,"rgba(212,177,106,.22)",MC.gold);
        mText(g,P.a+chSup(P.ca===1?"":P.ca)+"⁺",ax,y+6,MC.teal,20,"center"); mText(g,P.b+chSup(P.cb===1?"":P.cb)+"⁻",bx,y+6,MC.gold,20,"center");
        const k=(Math.sin(t/400)+1)/2; chDot(g,ax+rA+12+(bx-rB-12-(ax+rA+12))*k,y,5,MC.text);
        mText(g,"electron"+(P.ca>1?"s":"")+" handed over",350,y-20,MC.muted,12,"center");
        g.strokeStyle="rgba(215,220,229,.3)"; g.setLineDash([4,5]); g.beginPath(); g.moveTo(ax+rA+8,y+26); g.lineTo(bx-rB-8,y+26); g.stroke(); g.setLineDash([]);
        mText(g,"+ and − attract",350,y+46,MC.muted,11,"center");
      } else {
        chDot(g,ax,y,rA,"rgba(94,234,212,.15)",MC.teal); chDot(g,bx,y,rB,"rgba(212,177,106,.15)",MC.gold);
        mText(g,P.a,ax,y+6,MC.teal,22,"center"); mText(g,P.b,bx,y+6,MC.gold,22,"center");
        const share=P.eb/(P.ea+P.eb); const mx=ax+rA*0.4+(bx-ax-rA*0.4-rB*0.4)*share;
        const cg=g.createRadialGradient(mx,y,2,mx,y,70); cg.addColorStop(0,"rgba(237,242,247,.55)"); cg.addColorStop(1,"rgba(237,242,247,0)");
        g.fillStyle=cg; g.beginPath(); g.ellipse(mx,y,70,34,0,0,Math.PI*2); g.fill();
        for(let k=0;k<2;k++){ const a=t/300+k*Math.PI; chDot(g,mx+Math.cos(a)*18,y+Math.sin(a)*8,4,MC.text); }
        if(d>=0.5){ const lo=hi==="b"?ax:bx, hiX=hi==="b"?bx:ax; mText(g,"δ+",lo,y-62,MC.teal,13,"center"); mText(g,"δ−",hiX,y-62,MC.gold,13,"center"); }
        mText(g,"shared electrons sit "+(d<0.5?"in the middle":"closer to "+(hi==="b"?P.b:P.a)),350,y+72,MC.muted,11,"center");
      }
      mText(g,"electronegativity "+P.ea.toFixed(2),ax,y+rA+34,MC.muted,11,"center"); mText(g,"electronegativity "+P.eb.toFixed(2),bx,y+rB+34,MC.muted,11,"center");
      const bx0=90, bw=520, by=272; const zone=function(a,b,c){ g.fillStyle=c; g.fillRect(bx0+a/3.5*bw,by,(b-a)/3.5*bw,14); };
      zone(0,0.5,"rgba(94,234,212,.45)"); zone(0.5,1.7,"rgba(212,177,106,.45)"); zone(1.7,3.5,"rgba(251,113,133,.45)");
      mText(g,"covalent",bx0+0.25/3.5*bw,by+30,MC.muted,10,"center"); mText(g,"polar covalent",bx0+1.1/3.5*bw,by+30,MC.muted,10,"center"); mText(g,"ionic",bx0+2.6/3.5*bw,by+30,MC.muted,10,"center");
      const mxk=bx0+d/3.5*bw; g.fillStyle=MC.text; g.beginPath(); g.moveTo(mxk,by-2); g.lineTo(mxk-6,by-12); g.lineTo(mxk+6,by-12); g.closePath(); g.fill();
      mText(g,"difference "+d.toFixed(2),mxk,by-18,MC.text,12,"center");
      say("bondRead",P.a+"–"+P.b+": difference "+d.toFixed(2)+" → "+kind);
    },true);
  },
  ionformula(){
    const CAT=[["Na","sodium",1],["Mg","magnesium",2],["Al","aluminium",3]], AN=[["Cl","chloride",1],["O","oxide",2],["N","nitride",3]];
    simFrame("ionformula","ionCanvas",function(g,W,H,t,get,say){
      const c=get("chCat"), a=get("chAn"); const gc=chGcd(c,a); const nC=a/gc, nA=c/gc;
      const cat=CAT[c-1], an=AN[a-1];
      const formula=cat[0]+(nC>1?chSubs(nC):"")+an[0]+(nA>1?chSubs(nA):"");
      const row=function(n,cx,r,fill,stroke,label){ for(let i=0;i<n;i++){ const col=i%3, rw=Math.floor(i/3); const x=cx+(col-(Math.min(n,3)-1)/2)*(r*2+14), y=90+rw*(r*2+12); chDot(g,x,y,r,fill,stroke); mText(g,label,x,y+5,MC.text,13,"center"); } };
      row(nC,190,24,"rgba(94,234,212,.22)",MC.teal,cat[0]+chSup(c===1?"":c)+"⁺");
      row(nA,510,30,"rgba(212,177,106,.22)",MC.gold,an[0]+chSup(a===1?"":a)+"⁻");
      mText(g,nC+" × (+"+c+") = +"+(nC*c),190,200,MC.teal,14,"center");
      mText(g,nA+" × (−"+a+") = −"+(nA*a),510,200,MC.gold,14,"center");
      mText(g,"total charge: "+(nC*c)+" − "+(nA*a)+" = 0",350,236,MC.text,13,"center");
      mText(g,formula,350,290,CH.green,34,"center");
      mText(g,cat[1]+" "+an[1],350,316,MC.muted,13,"center");
      say("ionRead",formula+"  ("+cat[1]+" "+an[1]+")");
    });
  },
  balancer(){
    const RX=[
      {sp:[["H₂",{H:2},0],["O₂",{O:2},0],["H₂O",{H:2,O:1},1]]},
      {sp:[["CH₄",{C:1,H:4},0],["O₂",{O:2},0],["CO₂",{C:1,O:2},1],["H₂O",{H:2,O:1},1]]},
      {sp:[["Fe",{Fe:1},0],["O₂",{O:2},0],["Fe₂O₃",{Fe:2,O:3},1]]},
      {sp:[["N₂",{N:2},0],["H₂",{H:2},0],["NH₃",{N:1,H:3},1]]}];
    simFrame("balancer","balanceCanvas",function(g,W,H,t,get,say){
      const R=RX[get("chRxn")-1]; const co=[get("chC1"),get("chC2"),get("chC3"),get("chC4")];
      const L={},Rt={}; const els=[];
      R.sp.forEach(function(s,i){ for(const k in s[1]){ if(els.indexOf(k)<0) els.push(k); const tgt=s[2]?Rt:L; tgt[k]=(tgt[k]||0)+s[1][k]*co[i]; } });
      let eq=""; let seenArrow=false;
      R.sp.forEach(function(s,i){ if(s[2] && !seenArrow){ eq+=" → "; seenArrow=true; } else if(i>0) eq+=" + "; eq+=(co[i]>1?co[i]+" ":"")+s[0]; });
      const bal=els.every(function(k){ return (L[k]||0)===(Rt[k]||0); });
      const used=co.slice(0,R.sp.length); const gg=used.reduce(function(a,b){ return chGcd(a,b); });
      mText(g,eq,350,46,bal?CH.green:MC.text,24,"center");
      mText(g,"atoms on the left",150,92,MC.teal,12,"center"); mText(g,"atoms on the right",550,92,MC.gold,12,"center");
      const maxC=Math.max(8,...els.map(function(k){ return Math.max(L[k]||0,Rt[k]||0); })); const unit=210/maxC;
      els.forEach(function(k,i){
        const y=120+i*58; const l=L[k]||0, r=Rt[k]||0; const ok=l===r;
        mText(g,k,350,y+22,MC.text,18,"center");
        g.fillStyle="rgba(94,234,212,.75)"; g.fillRect(320-l*unit,y+6,l*unit,26); mText(g,String(l),320-l*unit-8,y+25,MC.teal,13,"right");
        g.fillStyle="rgba(212,177,106,.75)"; g.fillRect(380,y+6,r*unit,26); mText(g,String(r),380+r*unit+8,y+25,MC.gold,13,"left");
        mText(g,ok?"✓":"✗",668,y+26,ok?CH.green:MC.rose,18,"center");
      });
      let msg;
      if(bal) msg= gg>1 ? "Balanced, but every number can be divided by "+gg+" to simplify" : "Balanced ✓  every element matches on both sides";
      else { const bad=els.filter(function(k){ return (L[k]||0)!==(Rt[k]||0); })[0]; msg="Not balanced: "+bad+" has "+(L[bad]||0)+" on the left and "+(Rt[bad]||0)+" on the right"; }
      say("balanceRead",msg);
    });
  },
  rxntypes(){
    const TYPES=[
      {name:"Combination",eq:"A + B → AB",ex:"2Mg + O₂ → 2MgO",
       at:[["A",120,150,310,150,0],["B",580,150,370,150,1]],bonds0:[],bonds1:[[0,1]]},
      {name:"Decomposition",eq:"AB → A + B",ex:"2H₂O → 2H₂ + O₂",
       at:[["A",310,150,120,150,0],["B",370,150,580,150,1]],bonds0:[[0,1]],bonds1:[]},
      {name:"Displacement",eq:"A + BC → AC + B",ex:"Zn + CuSO₄ → ZnSO₄ + Cu",
       at:[["A",110,150,300,150,0],["B",300,150,570,150,1],["C",360,150,360,150,2]],bonds0:[[1,2]],bonds1:[[0,2]]},
      {name:"Double displacement",eq:"AB + CD → AD + CB",ex:"AgNO₃ + NaCl → AgCl + NaNO₃",
       at:[["A",320,100,320,100,0],["B",380,100,380,200,1],["C",320,200,320,200,2],["D",380,200,380,100,3]],bonds0:[[0,1],[2,3]],bonds1:[[0,3],[2,1]]}];
    const cols=[MC.teal,MC.gold,MC.violet,MC.rose];
    simFrame("rxntypes","rxnTypeCanvas",function(g,W,H,t,get,say){
      const T=TYPES[get("chRxType")-1]; const s=chSmooth(0.15,0.85,get("chRxProg")/100);
      const pos=T.at.map(function(a){ return [a[1]+(a[3]-a[1])*s, a[2]+(a[4]-a[2])*s]; });
      const bond=function(list,al){ g.strokeStyle="rgba(237,242,247,"+al+")"; g.lineWidth=5; list.forEach(function(b){ g.beginPath(); g.moveTo(pos[b[0]][0],pos[b[0]][1]); g.lineTo(pos[b[1]][0],pos[b[1]][1]); g.stroke(); }); };
      bond(T.bonds0,(1-s)*0.8); bond(T.bonds1,s*0.8);
      T.at.forEach(function(a,i){ chDot(g,pos[i][0],pos[i][1],27,"rgba(5,8,22,.9)",cols[a[5]]); g.fillStyle="rgba("+(a[5]===0?"94,234,212":a[5]===1?"212,177,106":a[5]===2?"201,167,240":"251,113,133")+",.28)"; g.beginPath(); g.arc(pos[i][0],pos[i][1],27,0,7); g.fill(); mText(g,a[0],pos[i][0],pos[i][1]+7,cols[a[5]],20,"center"); });
      mText(g,T.eq,350,32,MC.text,18,"center");
      mText(g,"Example: "+T.ex,350,H-14,MC.muted,12,"center");
      say("rxnTypeRead",T.name+"  •  "+T.eq);
    });
  },
  phScale(){
    const EX=[[0,"battery acid"],[1.5,"stomach acid"],[2,"lemon juice"],[3,"vinegar"],[4.5,"tomato"],[5,"black coffee"],[6.5,"milk"],[7,"pure water"],[8,"seawater"],[9,"baking soda"],[10.5,"soapy water"],[11.5,"ammonia cleaner"],[12.5,"bleach"],[14,"drain cleaner"]];
    const dots=[]; for(let i=0;i<90;i++){ dots.push({ x:Math.random(), y:Math.random(), vx:(Math.random()-.5)*0.004, vy:(Math.random()-.5)*0.004 }); }
    simFrame("phScale","phCanvas",function(g,W,H,t,get,say){
      const ph=get("chPH"); const bx=30,bw=640,by=50,bh=26; const X=function(p){ return bx+p/14*bw; };
      for(let i=0;i<14;i++){ const gr=g.createLinearGradient(X(i),0,X(i+1),0); gr.addColorStop(0,CH_PH_STOPS[i]); gr.addColorStop(1,CH_PH_STOPS[i+1]); g.fillStyle=gr; g.fillRect(X(i),by,bw/14+0.5,bh); }
      for(let p=0;p<=14;p++){ mText(g,String(p),X(p),by-8,MC.muted,11,"center"); }
      mText(g,"← acid",X(1),by-26,MC.muted,11,"center"); mText(g,"neutral",X(7),by-26,MC.muted,11,"center"); mText(g,"alkali →",X(13),by-26,MC.muted,11,"center");
      EX.forEach(function(e,i){ const y=by+bh+34+(i%3)*13; g.strokeStyle="rgba(215,220,229,.2)"; g.beginPath(); g.moveTo(X(e[0]),by+bh); g.lineTo(X(e[0]),y-8); g.stroke(); mText(g,e[1],Math.min(Math.max(X(e[0]),50),650),y+2,MC.muted,9,"center"); });
      g.fillStyle=MC.text; g.beginPath(); g.moveTo(X(ph),by+bh+1); g.lineTo(X(ph)-7,by+bh+13); g.lineTo(X(ph)+7,by+bh+13); g.closePath(); g.fill();
      const bxL=70,byT=170,bwid=170,bhei=170;
      g.fillStyle=chPHColor(ph); g.globalAlpha=0.85; g.fillRect(bxL+3,byT+30,bwid-6,bhei-33); g.globalAlpha=1;
      g.strokeStyle=MC.axis; g.lineWidth=2.5; g.beginPath(); g.moveTo(bxL,byT); g.lineTo(bxL,byT+bhei); g.lineTo(bxL+bwid,byT+bhei); g.lineTo(bxL+bwid,byT); g.stroke();
      mText(g,"universal indicator",bxL+bwid/2,byT+bhei+18,MC.muted,10,"center");
      const hC=Math.pow(10,-ph), oC=Math.pow(10,ph-14);
      const nH=Math.round(60*Math.pow(hC,0.22)), nO=Math.round(60*Math.pow(oC,0.22));
      const ix=300,iy=170,iw=190,ih=170; chRound(g,ix,iy,iw,ih,6,"rgba(5,8,22,.6)","rgba(215,220,229,.25)");
      dots.forEach(function(d){ d.x+=d.vx; d.y+=d.vy; if(d.x<0||d.x>1) d.vx*=-1; if(d.y<0||d.y>1) d.vy*=-1; });
      for(let i=0;i<nH;i++){ const d=dots[i]; chDot(g,ix+8+d.x*(iw-16),iy+8+d.y*(ih-16),4,MC.gold); }
      for(let i=0;i<nO;i++){ const d=dots[89-i]; chDot(g,ix+8+d.x*(iw-16),iy+8+d.y*(ih-16),4,MC.teal); }
      mText(g,"H⁺ (gold) and OH⁻ (teal)",ix+iw/2,iy+ih+18,MC.muted,10,"center");
      const tx=520;
      mText(g,"pH "+ph.toFixed(1),tx,200,CH.green,26);
      mText(g,ph<6.95?"acidic":(ph>7.05?"alkaline (basic)":"neutral"),tx,226,MC.text,14);
      mText(g,"[H⁺] = 10"+chSup(-ph)+" mol/L",tx,258,MC.gold,12);
      mText(g,"[OH⁻] = 10"+chSup(ph-14)+" mol/L",tx,278,MC.teal,12);
      let near=null,bd=9; EX.forEach(function(e){ const d=Math.abs(e[0]-ph); if(d<bd){ bd=d; near=e; } });
      if(bd<=1.0) mText(g,"close to "+near[1],tx,306,MC.muted,11);
      say("phRead","pH "+ph.toFixed(1)+" — "+(ph<6.95?"acidic":(ph>7.05?"alkaline":"neutral"))+(bd<=1.0?", like "+near[1]:""));
    },true);
  },
  titration(){ simFrame("titration","titrationCanvas",function(g,W,H,t,get,say){
    const V=get("chVol");
    function phAt(v){ const nA=0.0025, nB=0.1*v/1000, tot=0.025+v/1000; if(Math.abs(nA-nB)<1e-9) return 7; if(nA>nB) return -Math.log10((nA-nB)/tot); return 14+Math.log10((nB-nA)/tot); }
    const px=60,py=26,pw=380,ph=270; const X=function(v){ return px+v/50*pw; }, Y=function(p){ return py+ph-p/14*ph; };
    g.strokeStyle=MC.grid; g.lineWidth=1; [0,7,14].forEach(function(p){ g.beginPath(); g.moveTo(px,Y(p)); g.lineTo(px+pw,Y(p)); g.stroke(); mText(g,String(p),px-8,Y(p)+4,MC.muted,11,"right"); });
    g.strokeStyle=MC.axis; g.beginPath(); g.moveTo(px,py); g.lineTo(px,py+ph); g.lineTo(px+pw,py+ph); g.stroke();
    [0,10,20,30,40,50].forEach(function(v){ mText(g,String(v),X(v),py+ph+16,MC.muted,10,"center"); });
    mText(g,"volume of NaOH added (mL)",px+pw/2,H-8,MC.muted,11,"center"); mText(g,"pH",px-34,py+6,MC.muted,11);
    g.setLineDash([4,5]); g.strokeStyle="rgba(212,177,106,.5)"; g.beginPath(); g.moveTo(X(25),py); g.lineTo(X(25),py+ph); g.stroke(); g.setLineDash([]);
    mText(g,"neutral point",X(25)+6,py+14,MC.gold,10);
    g.strokeStyle=MC.teal; g.lineWidth=2.5; g.beginPath(); for(let v=0;v<=50;v+=0.25){ const x=X(v), y=Y(phAt(v)); if(v===0) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke();
    const p=phAt(V); chDot(g,X(V),Y(p),7,MC.text,MC.teal);
    const fx=560,fy=190;
    g.fillStyle="rgba(215,220,229,.15)"; g.fillRect(fx-8,40,16,70); g.strokeStyle=MC.axis; g.lineWidth=2; g.strokeRect(fx-8,40,16,70);
    g.fillStyle="rgba(212,177,106,.5)"; g.fillRect(fx-6,42+(V/50)*0,12,66-(V/50)*0);
    mText(g,"NaOH",fx+16,60,MC.muted,10); mText(g,"burette",fx+16,74,MC.muted,10);
    g.beginPath(); g.moveTo(fx-12,fy); g.lineTo(fx+12,fy); g.lineTo(fx+52,fy+100); g.lineTo(fx-52,fy+100); g.closePath(); g.fillStyle=chPHColor(p); g.globalAlpha=0.9; g.fill(); g.globalAlpha=1; g.strokeStyle=MC.axis; g.lineWidth=2; g.stroke();
    mText(g,"flask: acid + indicator",fx,fy+124,MC.muted,10,"center");
    const st=p<6.5?"still acidic":(p>7.5?"now alkaline":"neutralised");
    mText(g,"pH "+p.toFixed(2),fx,fy+146,CH.green,16,"center");
    say("titrationRead","pH "+p.toFixed(2)+" — "+st+" after "+V.toFixed(1)+" mL");
  }); },
  moleConverter(){
    const SUB=[{n:"Carbon",f:"C",M:12.0},{n:"Water",f:"H₂O",M:18.0},{n:"Carbon dioxide",f:"CO₂",M:44.0},{n:"Salt",f:"NaCl",M:58.5},{n:"Iron",f:"Fe",M:55.8},{n:"Oxygen gas",f:"O₂",M:32.0}];
    simFrame("moleConverter","moleCanvas",function(g,W,H,t,get,say){
      const S=SUB[get("chSub")-1], m=get("chGrams"); const n=m/S.M; const N=n*6.022e23;
      const bw=170,bh=70,y=24;
      const box=function(x,title,val,col){ chRound(g,x,y,bw,bh,8,"rgba(5,8,22,.7)",col); mText(g,title,x+bw/2,y+22,MC.muted,11,"center"); mText(g,val,x+bw/2,y+52,col,16,"center"); };
      box(20,"mass",m+" g of "+S.f,MC.text); box(265,"moles",n.toFixed(2)+" mol",MC.gold); box(510,"particles",chSci(N),MC.teal);
      mText(g,"÷ "+S.M,227,y+30,MC.muted,12,"center"); mText(g,"× 6.02×10²³",472,y+30,MC.muted,11,"center");
      mText(g,"→",227,y+54,MC.muted,18,"center"); mText(g,"→",472,y+54,MC.muted,18,"center");
      mText(g,"Mass of one mole of each substance",20,140,MC.muted,12);
      SUB.forEach(function(s,i){ const yy=156+i*24; const sel=s===S; g.fillStyle=sel?"rgba(212,177,106,.85)":"rgba(215,220,229,.18)"; g.fillRect(150,yy,s.M/60*200,16); mText(g,s.f,140,yy+13,sel?MC.text:MC.muted,12,"right"); mText(g,s.M+" g",150+s.M/60*200+8,yy+13,sel?MC.gold:MC.muted,11); });
      mText(g,"Moles in your sample (each circle = 1 mole)",420,140,MC.muted,12);
      const full=Math.floor(n), frac=n-full;
      for(let i=0;i<Math.ceil(n);i++){ const cx=440+(i%8)*28, cy=170+Math.floor(i/8)*30;
        chDot(g,cx,cy,11,"rgba(215,220,229,.07)","rgba(212,177,106,.5)");
        const f=i<full?1:frac; if(f>0){ g.fillStyle=MC.gold; g.beginPath(); g.moveTo(cx,cy); g.arc(cx,cy,11,-Math.PI/2,-Math.PI/2+f*Math.PI*2); g.closePath(); g.fill(); } }
      say("moleRead",m+" g of "+S.n+" = "+n.toFixed(2)+" mol = "+chSci(N)+" particles");
    });
  },
  limiting(){ simFrame("limiting","limitCanvas",function(g,W,H,t,get,say){
    const gH=get("chMassH"), gO=get("chMassO"); const nH=gH/2.016, nO=gO/32.0;
    const w=Math.min(nH,2*nO); const usedH=w, usedO=w/2; const leftH=nH-usedH, leftO=nO-usedO;
    const x0=170, sc=480/10;
    const row=function(y,label,tot,used,leftCol,usedCol,grams){
      mText(g,label,x0-12,y+22,MC.text,13,"right");
      g.fillStyle="rgba(215,220,229,.07)"; g.fillRect(x0,y,480,32);
      g.fillStyle=usedCol; g.fillRect(x0,y,used*sc,32); g.fillStyle="rgba(215,220,229,.35)"; g.fillRect(x0+used*sc,y,(tot-used)*sc,32);
      mText(g,tot.toFixed(2)+" mol"+(grams!=null?" ("+grams.toFixed(1)+" g)":""),x0+(tot*sc)+8,y+21,MC.muted,11);
    };
    mText(g,"Starting amounts and what gets used up (scale: 0 to 10 mol)",x0,24,MC.muted,11);
    row(40,"hydrogen",nH,usedH,null,"rgba(94,234,212,.85)",gH);
    row(100,"oxygen",nO,usedO,null,"rgba(94,234,212,.85)",gO);
    mText(g,"teal = reacts   grey = left over",x0,160,MC.muted,10);
    mText(g,"water formed",x0-12,222,MC.text,13,"right");
    g.fillStyle="rgba(212,177,106,.85)"; g.fillRect(x0,200,w*sc,32); mText(g,w.toFixed(2)+" mol ("+(w*18.015).toFixed(1)+" g)",x0+w*sc+8,221,MC.gold,12);
    let lim; if(w===0) lim="nothing reacts"; else if(Math.abs(nH-2*nO)<0.005) lim="both used up exactly"; else if(nH<2*nO) lim="hydrogen is limiting"; else lim="oxygen is limiting";
    mText(g,"2H₂ + O₂ → 2H₂O",350,276,MC.text,16,"center");
    mText(g,lim+(leftH>0.005?"   •   "+leftH.toFixed(2)+" mol H₂ left":"")+(leftO>0.005?"   •   "+leftO.toFixed(2)+" mol O₂ left":""),350,306,CH.green,13,"center");
    say("limitRead",(w*18.015).toFixed(1)+" g of water; "+lim);
  }); },
  gasPiston(){
    const ps=[]; for(let i=0;i<40;i++) ps.push({ x:Math.random(), y:Math.random(), a:Math.random()*Math.PI*2 });
    simFrame("gasPiston","gasCanvas",function(g,W,H,t,get,say){
      const T=get("chGasT"), V=get("chGasV"), n=get("chGasN")/10; const P=n*8.314*T/V;
      const cx0=50, cy0=70, ch=200, cwid=40+(V/20)*340;
      g.strokeStyle=MC.axis; g.lineWidth=3; g.beginPath(); g.moveTo(cx0+cwid+30,cy0); g.lineTo(cx0,cy0); g.lineTo(cx0,cy0+ch); g.lineTo(cx0+cwid+30,cy0+ch); g.stroke();
      g.fillStyle="rgba(212,177,106,.5)"; g.fillRect(cx0+cwid,cy0,14,ch); g.strokeStyle=MC.gold; g.strokeRect(cx0+cwid,cy0,14,ch);
      g.fillStyle="rgba(212,177,106,.35)"; g.fillRect(cx0+cwid+14,cy0+ch/2-4,60,8);
      const cnt=Math.max(2,Math.round(n*20)); const sp=0.6+Math.sqrt(T)*0.1;
      for(let i=0;i<cnt;i++){ const p=ps[i]; const r=5;
        p.x+=Math.cos(p.a)*sp/ (cwid); p.y+=Math.sin(p.a)*sp/ch;
        if(p.x<0){ p.x=0; p.a=Math.PI-p.a; } if(p.x>1){ p.x=1; p.a=Math.PI-p.a; }
        if(p.y<0){ p.y=0; p.a=-p.a; } if(p.y>1){ p.y=1; p.a=-p.a; }
        chDot(g,cx0+6+p.x*(cwid-12),cy0+6+p.y*(ch-12),r,"rgba(94,234,212,.9)"); }
      mText(g,"V = "+V.toFixed(1)+" L",cx0+cwid/2,cy0+ch+22,MC.muted,12,"center");
      mText(g,"T = "+T+" K",cx0+cwid/2,cy0-12,MC.muted,12,"center");
      const gx=560,gy=60,gh=220,gw=34; const Lg=function(p){ return Math.log10(p); }; const lo=Lg(5), hi=Lg(6000);
      g.fillStyle="rgba(215,220,229,.08)"; g.fillRect(gx,gy,gw,gh); const fh=(Lg(Math.max(P,5))-lo)/(hi-lo)*gh;
      g.fillStyle=P>1500?MC.rose:MC.gold; g.fillRect(gx,gy+gh-fh,gw,fh);
      [10,100,1000].forEach(function(v){ const y=gy+gh-(Lg(v)-lo)/(hi-lo)*gh; g.strokeStyle=MC.muted; g.beginPath(); g.moveTo(gx+gw,y); g.lineTo(gx+gw+6,y); g.stroke(); mText(g,v+" kPa",gx+gw+10,y+4,MC.muted,10); });
      mText(g,"pressure (log scale)",gx+gw/2,gy-14,MC.muted,10,"center");
      mText(g,"P = nRT ÷ V",350,330,MC.text,13,"center");
      mText(g,"= "+n.toFixed(2)+" × 8.314 × "+T+" ÷ "+V.toFixed(1)+" = "+P.toFixed(0)+" kPa",350,350,CH.green,13,"center");
      say("gasRead",P.toFixed(0)+" kPa  ("+(P/101.3).toFixed(2)+" atmospheres)");
    },true);
  },
  boyle(){ simFrame("boyle","boyleCanvas",function(g,W,H,t,get,say){
    const V=get("chBoyleV"), T=get("chBoyleT"); const n=0.5; const px=70,py=40,pw=580,ph=250;
    const X=function(v){ return px+v/20*pw; }, Y=function(p){ return py+ph-p/1000*ph; };
    g.strokeStyle=MC.grid; g.lineWidth=1; [0,250,500,750,1000].forEach(function(p){ g.beginPath(); g.moveTo(px,Y(p)); g.lineTo(px+pw,Y(p)); g.stroke(); mText(g,String(p),px-8,Y(p)+4,MC.muted,10,"right"); });
    g.strokeStyle=MC.axis; g.beginPath(); g.moveTo(px,py); g.lineTo(px,py+ph); g.lineTo(px+pw,py+ph); g.stroke();
    [0,5,10,15,20].forEach(function(v){ mText(g,String(v),X(v),py+ph+16,MC.muted,10,"center"); });
    mText(g,"volume (litres)",px+pw/2,H-8,MC.muted,11,"center"); mText(g,"pressure (kPa)",px-60,py-18,MC.muted,10);
    const curve=function(Tk,col,w,dash){ g.strokeStyle=col; g.lineWidth=w; if(dash) g.setLineDash([5,5]); g.beginPath(); for(let v=1.5;v<=20;v+=0.25){ const p=n*8.314*Tk/v; const y=Math.max(py,Y(p)); if(v===1.5) g.moveTo(X(v),y); else g.lineTo(X(v),y); } g.stroke(); g.setLineDash([]); };
    curve(300,"rgba(215,220,229,.4)",1.5,true);
    curve(T,MC.teal,2.5,false);
    const P=n*8.314*T/V; chDot(g,X(V),Y(P),7,MC.text,MC.teal);
    mText(g,"300 K (for comparison)",X(14),Y(n*8.314*300/14)+18,MC.muted,10);
    mText(g,T+" K",X(14),Y(n*8.314*T/14)-10,MC.teal,11);
    say("boyleRead","V = "+V.toFixed(1)+" L, P = "+P.toFixed(0)+" kPa, P × V = "+(P*V).toFixed(0)+" kPa·L (same at every point)");
  }); },
  energyProfile(){ simFrame("energyProfile","energyCanvas",function(g,W,H,t,get,say){
    const Ea0=get("chEa"), dH=get("chDH"), cat=get("chCat")===1;
    const minEa=Math.max(dH,0)+5; const Ea=Math.max(cat?Ea0*0.55:Ea0,minEa); const EaFull=Math.max(Ea0,minEa);
    const px=70,py=26,pw=450,ph=300; const Y=function(e){ return py+ph-(e+110)/270*ph; };
    const shape=function(peak){ return function(x){ if(x<0.28) return 0; if(x<0.55) return peak*chSmooth(0.28,0.55,x); if(x<0.78) return peak+(dH-peak)*chSmooth(0.55,0.78,x); return dH; }; };
    const draw=function(peak,col,w,dash){ const f=shape(peak); g.strokeStyle=col; g.lineWidth=w; if(dash) g.setLineDash([5,5]); g.beginPath(); for(let i=0;i<=200;i++){ const x=i/200; const xx=px+x*pw, yy=Y(f(x)); if(i===0) g.moveTo(xx,yy); else g.lineTo(xx,yy); } g.stroke(); g.setLineDash([]); };
    g.strokeStyle=MC.axis; g.lineWidth=1; g.beginPath(); g.moveTo(px,py); g.lineTo(px,py+ph); g.lineTo(px+pw,py+ph); g.stroke();
    mText(g,"energy",px-10,py+4,MC.muted,10,"right"); mText(g,"reaction progress →",px+pw/2,H-8,MC.muted,11,"center");
    mText(g,"reactants",px+0.14*pw,Y(0)-8,MC.text,11,"center"); mText(g,"products",px+0.89*pw,Y(dH)-8,MC.text,11,"center");
    g.strokeStyle="rgba(215,220,229,.2)"; g.setLineDash([3,4]); g.beginPath(); g.moveTo(px,Y(0)); g.lineTo(px+pw,Y(0)); g.stroke(); g.setLineDash([]);
    if(cat) draw(EaFull,"rgba(251,113,133,.45)",1.5,true);
    draw(Ea,cat?CH.green:MC.gold,3,false);
    const ax=px+0.41*pw; mArrow(g,ax,Y(0),ax,Y(Ea)+2,MC.teal); mText(g,"Eₐ = "+Ea.toFixed(0),ax+10,Y(Ea/2)+4,MC.teal,12);
    const dx=px+0.93*pw+22; if(Math.abs(dH)>2){ mArrow(g,dx,Y(0),dx,Y(dH)+(dH>0?2:-2),MC.rose); mText(g,"ΔH = "+(dH>0?"+":"−")+Math.abs(dH),dx-8,Y(dH/2)+4,MC.rose,12,"right"); }
    const f=shape(Ea); const prog=(t/3500)%1; const bx=px+prog*pw, by=Y(f(prog))-9; chDot(g,bx,by,8,MC.text,CH.green);
    const tx=545;
    mText(g,dH<0?"EXOTHERMIC":(dH>0?"ENDOTHERMIC":"NO NET CHANGE"),tx,70,dH<0?"#f0954a":MC.teal,14);
    mText(g,dH<0?"energy released":"energy absorbed",tx,92,MC.muted,12);
    mText(g,dH<0?"surroundings warm up":"surroundings cool down",tx,110,MC.muted,12);
    mText(g,"Hill height: "+Ea.toFixed(0)+" kJ/mol",tx,150,MC.text,12);
    mText(g,cat?"Catalyst: ON":"Catalyst: off",tx,172,cat?CH.green:MC.muted,12);
    if(Ea0<minEa) mText(g,"(hill cannot be lower than the energy gain)",tx,196,MC.rose,10);
    say("energyRead",(dH<0?"Exothermic":(dH>0?"Endothermic":"Thermoneutral"))+", Eₐ = "+Ea.toFixed(0)+" kJ/mol"+(cat?" with catalyst":""));
  },true); },
  collisions(){ simFrame("collisions","mbCanvas",function(g,W,H,t,get,say){
    const T=get("chMBT"), Ea=get("chMBEa"); const px=60,py=26,pw=590,ph=260, xmax=60, ymax=0.22;
    const X=function(e){ return px+e/xmax*pw; }, Y=function(v){ return py+ph-v/ymax*ph; };
    const f=function(e,Tk){ const rt=0.008314*Tk; return Math.sqrt(e)*Math.exp(-e/rt)/(0.8862*Math.pow(rt,1.5)); };
    const tail=function(Tk){ let s=0; for(let e=Ea;e<400;e+=0.05) s+=f(e+0.025,Tk)*0.05; return s; };
    g.strokeStyle=MC.axis; g.lineWidth=1; g.beginPath(); g.moveTo(px,py); g.lineTo(px,py+ph); g.lineTo(px+pw,py+ph); g.stroke();
    [0,10,20,30,40,50,60].forEach(function(e){ mText(g,String(e),X(e),py+ph+16,MC.muted,10,"center"); });
    mText(g,"energy of a collision (kJ/mol)",px+pw/2,H-8,MC.muted,11,"center"); mText(g,"share of particles",px+4,py-8,MC.muted,10);
    g.strokeStyle="rgba(215,220,229,.4)"; g.setLineDash([5,5]); g.lineWidth=1.5; g.beginPath(); for(let e=0;e<=xmax;e+=0.5){ const x=X(e), y=Y(f(e,300)); if(e===0) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke(); g.setLineDash([]);
    const mag=Math.max(1,12/(f(Ea,300)/ymax*ph));
    const tailPath=function(Tk){ g.beginPath(); g.moveTo(X(Ea),Y(0)); for(let e=Ea;e<=xmax;e+=0.5){ g.lineTo(X(e),Math.max(py,Y(Math.min(f(e,Tk)*mag,ymax*5)))); } g.lineTo(X(xmax),Y(0)); g.closePath(); };
    g.fillStyle="rgba(212,177,106,.55)"; tailPath(T); g.fill();
    g.strokeStyle="rgba(215,220,229,.6)"; g.setLineDash([4,4]); g.lineWidth=1.5; tailPath(300); g.stroke(); g.setLineDash([]);
    mText(g,"gold: the tail above Eₐ, magnified ×"+Math.round(mag).toLocaleString("en-US"),X(Ea)+10,py+ph-60,MC.gold,11);
    g.strokeStyle=MC.teal; g.lineWidth=2.5; g.beginPath(); for(let e=0;e<=xmax;e+=0.5){ const x=X(e), y=Y(Math.min(f(e,T),ymax)); if(e===0) g.moveTo(x,y); else g.lineTo(x,y); } g.stroke();
    g.strokeStyle=MC.rose; g.lineWidth=1.5; g.beginPath(); g.moveTo(X(Ea),py); g.lineTo(X(Ea),py+ph); g.stroke(); mText(g,"Eₐ",X(Ea)+5,py+12,MC.rose,12);
    mText(g,T+" K",px+pw-110,py+26,MC.teal,13); mText(g,"300 K (dashed)",px+pw-110,py+44,MC.muted,11);
    const fr=tail(T), f3=tail(300); const ratio=fr/f3;
    const oneIn=fr>0?Math.round(1/fr):Infinity;
    say("mbRead","About 1 in "+(isFinite(oneIn)?oneIn.toLocaleString("en-US"):"∞")+" particles has enough energy — "+(ratio>=10?ratio.toFixed(0):ratio.toFixed(2))+"× the rate at 300 K");
  }); },
  hydrocarbons(){ simFrame("hydrocarbons","organicCanvas",function(g,W,H,t,get,say){
    const n=get("chCarbons"); const b=n===1?1:get("chBondOrder");
    const pre=["meth","eth","prop","but","pent","hex","hept","oct"][n-1]; const suf=b===1?"ane":(b===2?"ene":"yne");
    const loc=(n>=4&&b>1)?"-1-":"";
    const name=pre+loc+suf;
    const Hn=b===1?2*n+2:(b===2?2*n:2*n-2);
    const formula="C"+(n>1?chSubs(n):"")+"H"+chSubs(Hn);
    const dx=Math.min(92,600/(n+0.5)); const x0=350-(n-1)*dx/2; const yc=170, amp=22;
    const pts=[]; for(let i=0;i<n;i++) pts.push([x0+i*dx, yc+(i%2?amp:-amp)]);
    const bondOf=function(i,j){ return (i===0&&j===1)?b:1; };
    for(let i=0;i<n-1;i++){ const o=bondOf(i,i+1); const [x1,y1]=pts[i],[x2,y2]=pts[i+1]; const ang=Math.atan2(y2-y1,x2-x1)+Math.PI/2; for(let k=0;k<o;k++){ const off=(k-(o-1)/2)*7; g.strokeStyle="rgba(237,242,247,.8)"; g.lineWidth=2.5; g.beginPath(); g.moveTo(x1+Math.cos(ang)*off,y1+Math.sin(ang)*off); g.lineTo(x2+Math.cos(ang)*off,y2+Math.sin(ang)*off); g.stroke(); } }
    let totalH=0;
    for(let i=0;i<n;i++){ let used=0; if(i>0) used+=bondOf(i-1,i); if(i<n-1) used+=bondOf(i,i+1); const hs=4-used; totalH+=hs;
      const up=(i%2===0); const [x,y]=pts[i];
      for(let k=0;k<hs;k++){ const spread=hs===1?0:(k-(hs-1)/2)*0.9; const dir=(up?-1:1); const ang=dir*Math.PI/2+spread*(up?1:1)*0.9+(i===0&&hs>=3?0:0); const hx=x+Math.cos(ang+(up?0:0))*44, hy=y+Math.sin(ang)*44;
        g.strokeStyle="rgba(155,227,109,.55)"; g.lineWidth=1.5; g.beginPath(); g.moveTo(x,y); g.lineTo(hx,hy); g.stroke(); chDot(g,hx,hy,9,"#050816"); chDot(g,hx,hy,9,"rgba(155,227,109,.25)",CH.green); mText(g,"H",hx,hy+4,CH.green,10,"center"); }
      chDot(g,x,y,15,"#050816"); chDot(g,x,y,15,"rgba(94,234,212,.2)",MC.teal); mText(g,"C",x,y+5,MC.text,14,"center"); }
    mText(g,name,350,30,CH.green,28,"center");
    mText(g,formula+"   •   "+(b===1?"saturated (only single bonds)":"unsaturated (has a "+(b===2?"double":"triple")+" bond)"),350,56,MC.text,13,"center");
    mText(g,"Hydrogens counted: "+totalH+"   •   every carbon has exactly 4 bonds",350,300,MC.muted,12,"center");
    mText(g,"alkane CₙH₂ₙ₊₂   alkene CₙH₂ₙ   alkyne CₙH₂ₙ₋₂",350,330,MC.muted,12,"center");
    say("organicRead",name+"  "+formula);
  }); }
});
