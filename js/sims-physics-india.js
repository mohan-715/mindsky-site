const SIM_REGISTRY={
  gravity(){ const c=document.getElementById("gravityCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'gravity');
    let objectY=80;
    AnimationManager.register('gravity', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('gravity'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      let mass=document.getElementById("mass").value, distance=document.getElementById("distance").value;
      cctx.beginPath(); cctx.fillStyle="#5eead4"; cctx.arc(350,220,40+mass*3,0,Math.PI*2); cctx.fill();
      cctx.beginPath(); cctx.fillStyle="#d4b16a"; cctx.arc(350,objectY,15,0,Math.PI*2); cctx.fill();
      let pull=mass/(distance/50); objectY+=pull; if(objectY>180){ objectY=80; }
    }, c);
  },
  motion(){ const ball=document.getElementById("motionBall"); if(!ball) return; const distance=document.getElementById("distanceRead");
    let position=20, total=0;
    AnimationManager.register('motion', ()=>{ if(!document.body.contains(ball)){ AnimationManager.unregister('motion'); return; }
      let speed=Number(document.getElementById("speedControl").value); position+=speed/2; total+=speed/2; if(position>650){ position=20; } ball.style.left=position+"px"; distance.innerText=Math.floor(total);
    }, ball);
  },
  forces(){ const c=document.getElementById("forcesCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'forces');
    const accelRead=document.getElementById("accelRead"); let boxX=60, velocity=0;
    AnimationManager.register('forces', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('forces'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      let force=Number(document.getElementById("forceInput").value), mass=Number(document.getElementById("massInput").value), friction=Number(document.getElementById("frictionInput").value);
      let accel=(force-friction)/mass; accelRead.innerText=accel.toFixed(2);
      velocity+=accel*0.4; velocity*=0.98; if(velocity<0) velocity=0; boxX+=velocity; if(boxX>620){ boxX=60; velocity=0; }
      cctx.strokeStyle="rgba(215,220,229,.3)"; cctx.beginPath(); cctx.moveTo(20,170); cctx.lineTo(680,170); cctx.stroke();
      let size=24+mass*4; cctx.fillStyle="#d4b16a"; cctx.fillRect(boxX,170-size,size,size);
      cctx.strokeStyle="#5eead4"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(boxX-10,170-size/2); cctx.lineTo(boxX-10-force*4,170-size/2); cctx.stroke();
    }, c);
  },
  energy(){ const c=document.getElementById("energyCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'energy');
    const energyRead=document.getElementById("energyRead"); const cliffX=120, groundY=280; let boulderY=40, falling=true;
    function reset(){ boulderY=40; falling=true; }
    AnimationManager.register('energy', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('energy'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      let heightSetting=Number(document.getElementById("heightInput").value), mass=Number(document.getElementById("massInput2").value);
      let topY=groundY-heightSetting*24;
      if(boulderY<topY){ boulderY=topY; }
      cctx.fillStyle="#111936"; cctx.beginPath(); cctx.moveTo(0,groundY); cctx.lineTo(cliffX,groundY); cctx.lineTo(cliffX,topY); cctx.lineTo(0,topY-20); cctx.closePath(); cctx.fill();
      cctx.strokeStyle="rgba(215,220,229,.3)"; cctx.beginPath(); cctx.moveTo(cliffX,groundY); cctx.lineTo(680,groundY); cctx.stroke();
      if(falling){ let velocity=Math.sqrt(Math.max(0,(boulderY-topY)))*1.6; boulderY+=1+velocity*0.12; if(boulderY>=groundY-10){ boulderY=groundY-10; falling=false; setTimeout(reset,900); } }
      let fallen=boulderY-topY, totalDrop=Math.max(1,(groundY-10)-topY), fractionFallen=Math.min(1,fallen/totalDrop), kineticShare=Math.round(fractionFallen*100), potentialShare=100-kineticShare;
      energyRead.innerText=`PE ${potentialShare}% / KE ${kineticShare}%`;
      let radius=10+mass*2; cctx.beginPath(); cctx.fillStyle="#d4b16a"; cctx.arc(cliffX+60,boulderY,radius,0,Math.PI*2); cctx.fill();
    }, c);
  },
  electricity(){ const c=document.getElementById("electricityCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'electricity');
    const currentRead=document.getElementById("currentRead"); const particles=[]; for(let i=0;i<14;i++){ particles.push(i/14); }
    const path=[{x:80,y:180},{x:80,y:60},{x:620,y:60},{x:620,y:180},{x:80,y:180}];
    function pointOnPath(t){ const segLen=[]; let total=0; for(let i=0;i<path.length-1;i++){ const dx=path[i+1].x-path[i].x, dy=path[i+1].y-path[i].y; const len=Math.sqrt(dx*dx+dy*dy); segLen.push(len); total+=len; } let d=t*total; for(let i=0;i<segLen.length;i++){ if(d<=segLen[i]){ const f=d/segLen[i]; return { x:path[i].x+(path[i+1].x-path[i].x)*f, y:path[i].y+(path[i+1].y-path[i].y)*f }; } d-=segLen[i]; } return path[0]; }
    AnimationManager.register('electricity', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('electricity'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      let voltage=Number(document.getElementById("voltageInput").value), resistance=Number(document.getElementById("resistanceInput").value), current=voltage/resistance;
      currentRead.innerText=current.toFixed(2);
      cctx.strokeStyle="rgba(215,220,229,.35)"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(path[0].x,path[0].y); for(let i=1;i<path.length;i++){ cctx.lineTo(path[i].x,path[i].y); } cctx.stroke();
      cctx.fillStyle="#9ca7c2"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.fillText("+ battery -",30,175);
      cctx.fillStyle="#5eead4";
      for(let i=0;i<particles.length;i++){ particles[i]=(particles[i]+0.0015*current*4)%1; const p=pointOnPath(particles[i]); cctx.beginPath(); cctx.arc(p.x,p.y,5,0,Math.PI*2); cctx.fill(); }
    }, c);
  },
  resistor(){ const c=document.getElementById("resistorCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'resistor');
    const readout=document.getElementById("resistorRead"); const valInput=document.getElementById("resistorOhms");
    const cx=c.width/2, cy=c.height/2; const particles=[0,0.33,0.66];
    AnimationManager.register('resistor', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('resistor'); return; }
      cctx.clearRect(0,0,c.width,c.height); const value=Number(valInput.value);
      const leadY=cy, leftX=cx-180, rightX=cx+180, bodyX=cx-70, bodyW=140;
      cctx.strokeStyle="#9ca7c2"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(leftX,leadY); cctx.lineTo(bodyX,leadY); cctx.stroke(); cctx.beginPath(); cctx.moveTo(bodyX+bodyW,leadY); cctx.lineTo(rightX,leadY); cctx.stroke();
      const glow=Math.min(1,value/10); cctx.strokeStyle=`rgba(212,177,106,${0.6+glow*0.4})`; cctx.lineWidth=4; cctx.beginPath(); const zigs=8; cctx.moveTo(bodyX,leadY);
      for(let i=0;i<=zigs;i++){ const x=bodyX+(bodyW/zigs)*i; const y=leadY+(i%2===0?-22:22); cctx.lineTo(x,y); } cctx.lineTo(bodyX+bodyW,leadY); cctx.stroke();
      cctx.fillStyle="#5eead4";
      for(let i=0;i<particles.length;i++){ particles[i]=(particles[i]+0.006/(0.3+value*0.08))%1; const x=leftX+(rightX-leftX)*particles[i]; cctx.beginPath(); cctx.arc(x,leadY,5,0,Math.PI*2); cctx.fill(); }
      cctx.fillStyle="#9ca7c2"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`Resistance level ${value} — higher = more restriction, more heat`, cx, leadY+70); cctx.textAlign="left";
      readout.innerText=`Current is slowed, ${(value*10)}% of max heat given off`;
    }, c);
  },
  capacitor(){ const c=document.getElementById("capacitorCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'capacitor');
    const readout=document.getElementById("capacitorRead"); const valInput=document.getElementById("capacitorFarads");
    const cx=c.width/2, cy=c.height/2; let capPhase=0, capCharging=true;
    AnimationManager.register('capacitor', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('capacitor'); return; }
      cctx.clearRect(0,0,c.width,c.height); const value=Number(valInput.value);
      const plateGap=50, plateH=120, leadY=cy; const leftPlateX=cx-plateGap/2, rightPlateX=cx+plateGap/2;
      cctx.strokeStyle="#9ca7c2"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-180,leadY); cctx.lineTo(leftPlateX,leadY); cctx.stroke(); cctx.beginPath(); cctx.moveTo(rightPlateX,leadY); cctx.lineTo(cx+180,leadY); cctx.stroke();
      cctx.fillStyle="#d4b16a"; cctx.fillRect(leftPlateX-6,leadY-plateH/2,6,plateH); cctx.fillRect(rightPlateX,leadY-plateH/2,6,plateH);
      const target=value/10;
      if(capCharging){ capPhase+=0.01; if(capPhase>=target){ capCharging=false; } } else { capPhase-=0.01; if(capPhase<=0){ capCharging=true; } }
      capPhase=Math.max(0,Math.min(1,capPhase));
      const fillH=plateH*capPhase; cctx.fillStyle="rgba(94,234,212,.55)"; cctx.fillRect(leftPlateX,leadY+plateH/2-fillH,plateGap,fillH);
      cctx.fillStyle="#9ca7c2"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`${capCharging?"Charging":"Discharging"} — capacity level ${value}`, cx, leadY+90); cctx.textAlign="left";
      readout.innerText=`${Math.round(capPhase*100)}% charged, ${capCharging?"filling up":"releasing charge"}`;
    }, c);
  },
  inductor(){ const c=document.getElementById("inductorCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'inductor');
    const readout=document.getElementById("inductorRead"); const valInput=document.getElementById("inductorHenries");
    const cx=c.width/2, cy=c.height/2; let coilPulse=0;
    AnimationManager.register('inductor', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('inductor'); return; }
      cctx.clearRect(0,0,c.width,c.height); const value=Number(valInput.value);
      const leadY=cy, coilStartX=cx-90, coilEndX=cx+90, loops=6, r=15;
      cctx.strokeStyle="#9ca7c2"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-180,leadY); cctx.lineTo(coilStartX,leadY); cctx.stroke(); cctx.beginPath(); cctx.moveTo(coilEndX,leadY); cctx.lineTo(cx+180,leadY); cctx.stroke();
      cctx.strokeStyle="#d4b16a"; cctx.lineWidth=3;
      for(let i=0;i<loops;i++){ const x=coilStartX+(i+0.5)*((coilEndX-coilStartX)/loops); cctx.beginPath(); cctx.arc(x,leadY,r,Math.PI,Math.PI*2.3); cctx.stroke(); }
      coilPulse+=0.05; const fieldStrength=value/10; cctx.strokeStyle=`rgba(140,211,232,${0.25+fieldStrength*0.5})`;
      for(let ring=1;ring<=3;ring++){ const rr=r+8+ring*10+Math.sin(coilPulse+ring)*3; cctx.beginPath(); cctx.ellipse(cx,leadY,rr*3.2,rr,0,0,Math.PI*2); cctx.stroke(); }
      cctx.fillStyle="#9ca7c2"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`Field strength ${value} — resists any sudden change in current`, cx, leadY+90); cctx.textAlign="left";
      readout.innerText=`Magnetic field is ${Math.round(fieldStrength*100)}% strength, opposing sudden current changes`;
    }, c);
  },
  led(){ const c=document.getElementById("ledCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'led');
    const readout=document.getElementById("ledRead"); const valInput=document.getElementById("ledCurrent");
    const cx=c.width/2, cy=c.height/2;
    AnimationManager.register('led', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('led'); return; }
      cctx.clearRect(0,0,c.width,c.height); const value=Number(valInput.value); const leadY=cy;
      cctx.strokeStyle="#9ca7c2"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-180,leadY); cctx.lineTo(cx-25,leadY); cctx.stroke(); cctx.beginPath(); cctx.moveTo(cx+25,leadY); cctx.lineTo(cx+180,leadY); cctx.stroke();
      const brightness=value/10;
      const grad=cctx.createRadialGradient(cx,leadY,5,cx,leadY,70); grad.addColorStop(0,`rgba(212,177,106,${0.15+brightness*0.7})`); grad.addColorStop(1,"rgba(212,177,106,0)");
      cctx.fillStyle=grad; cctx.beginPath(); cctx.arc(cx,leadY,70,0,Math.PI*2); cctx.fill();
      cctx.fillStyle=`rgba(255,220,150,${0.5+brightness*0.5})`; cctx.beginPath(); cctx.moveTo(cx-25,leadY-22); cctx.lineTo(cx-25,leadY+22); cctx.lineTo(cx+15,leadY); cctx.closePath(); cctx.fill();
      cctx.strokeStyle="#edf2f7"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx+15,leadY-22); cctx.lineTo(cx+15,leadY+22); cctx.stroke();
      cctx.strokeStyle="rgba(212,177,106,.8)"; cctx.lineWidth=2;
      [[-10,-8],[6,-16]].forEach(off=>{ cctx.beginPath(); cctx.moveTo(cx+off[0],leadY-30+off[1]); cctx.lineTo(cx+off[0]+14,leadY-44+off[1]); cctx.stroke(); });
      cctx.fillStyle="#9ca7c2"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`Forward current ${value} — brightness scales with current`, cx, leadY+90); cctx.textAlign="left";
      readout.innerText=`Glowing at ${Math.round(brightness*100)}% brightness (current flowing the correct direction)`;
    }, c);
  },
  motor(){ const c=document.getElementById("motorCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'motor');
    const readout=document.getElementById("motorRead"); const valInput=document.getElementById("motorPower");
    const cx=c.width/2, cy=c.height/2; let motorAngle=0;
    AnimationManager.register('motor', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('motor'); return; }
      cctx.clearRect(0,0,c.width,c.height); const value=Number(valInput.value); const leadY=cy, r=55;
      cctx.strokeStyle="#9ca7c2"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(cx-180,leadY); cctx.lineTo(cx-r-10,leadY); cctx.stroke(); cctx.beginPath(); cctx.moveTo(cx+r+10,leadY); cctx.lineTo(cx+180,leadY); cctx.stroke();
      cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.lineWidth=2; cctx.beginPath(); cctx.arc(cx,leadY,r,0,Math.PI*2); cctx.stroke();
      const speed=value/10; motorAngle+=0.03+speed*0.25;
      cctx.strokeStyle="#5eead4"; cctx.lineWidth=5; cctx.beginPath(); cctx.moveTo(cx+Math.cos(motorAngle)*r*0.8, leadY+Math.sin(motorAngle)*r*0.8); cctx.lineTo(cx-Math.cos(motorAngle)*r*0.8, leadY-Math.sin(motorAngle)*r*0.8); cctx.stroke();
      cctx.fillStyle="#d4b16a"; cctx.beginPath(); cctx.arc(cx,leadY,8,0,Math.PI*2); cctx.fill();
      cctx.fillStyle="#9ca7c2"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`Power level ${value} — more current means a stronger spin`, cx, leadY+90); cctx.textAlign="left";
      readout.innerText=`Spinning at ${Math.round(speed*100)}% of max speed`;
    }, c);
  },
  fractions(){ const c=document.getElementById("fractionsCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'fractions');
    const fractionRead=document.getElementById("fractionRead"); const numInput=document.getElementById("numeratorInput"); const denomInput=document.getElementById("denominatorInput");
    const cx=c.width/2, cy=c.height/2, r=110;
    function clampNumerator(){ const denom=Math.max(1,Number(denomInput.value)); numInput.max=denom; if(Number(numInput.value)>denom){ numInput.value=denom; } }
    denomInput.addEventListener("input",clampNumerator); clampNumerator();
    AnimationManager.register('fractions', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('fractions'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const denom=Math.max(1,Number(denomInput.value)); const num=Math.min(Number(numInput.value),denom);
      fractionRead.innerText=`${num}/${denom}`;
      const sliceAngle=(Math.PI*2)/denom;
      for(let i=0;i<denom;i++){ const start=-Math.PI/2+i*sliceAngle, end=start+sliceAngle; cctx.beginPath(); cctx.moveTo(cx,cy); cctx.arc(cx,cy,r,start,end); cctx.closePath(); cctx.fillStyle= i<num ? "#d4b16a" : "rgba(201,167,240,.12)"; cctx.fill(); cctx.strokeStyle="#020617"; cctx.lineWidth=2; cctx.stroke(); }
      cctx.beginPath(); cctx.arc(cx,cy,r,0,Math.PI*2); cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.lineWidth=2; cctx.stroke();
    }, c);
  },
  numberline(){ const c=document.getElementById("numberlineCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'numberline');
    const numlineRead=document.getElementById("numlineRead"); const valInput=document.getElementById("numlineValue");
    const minV=-20, maxV=20, marginX=40;
    function xForValue(v){ return marginX+((v-minV)/(maxV-minV))*(c.width-marginX*2); }
    AnimationManager.register('numberline', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('numberline'); return; }
      cctx.clearRect(0,0,c.width,c.height); const midY=c.height/2;
      cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(marginX,midY); cctx.lineTo(c.width-marginX,midY); cctx.stroke();
      cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.textAlign="center";
      for(let t=minV;t<=maxV;t+=5){ const x=xForValue(t); cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.beginPath(); cctx.moveTo(x,midY-8); cctx.lineTo(x,midY+8); cctx.stroke(); cctx.fillText(String(t),x,midY+24); }
      const value=Number(valInput.value); const x=xForValue(value);
      cctx.beginPath(); cctx.fillStyle="#c9a7f0"; cctx.arc(x,midY,9,0,Math.PI*2); cctx.fill();
      const isInteger=Number.isInteger(value); const isWhole=isInteger && value>=0; const isNatural=isInteger && value>=1;
      const labels=["Rational","Real"]; if(isInteger) labels.unshift("Integer"); if(isWhole) labels.unshift("Whole"); if(isNatural) labels.unshift("Natural");
      numlineRead.innerText=`${value} → ${labels.join(", ")}`; cctx.textAlign="left";
    }, c);
  },
  algebra(){ const c=document.getElementById("algebraCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'algebra');
    const algebraRead=document.getElementById("algebraRead");
    function drawPan(end,label){ cctx.strokeStyle="rgba(215,220,229,.5)"; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(end.x,end.y); cctx.lineTo(end.x,end.y+40); cctx.stroke(); cctx.fillStyle="#0c1330"; cctx.fillRect(end.x-38,end.y+40,76,16); cctx.strokeRect(end.x-38,end.y+40,76,16); cctx.fillStyle="#edf2f7"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(label,end.x,end.y+52); }
    AnimationManager.register('algebra', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('algebra'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const coef=Number(document.getElementById("coefInput").value); const constVal=Number(document.getElementById("constInput").value); const target=Number(document.getElementById("targetInput").value); const guess=Number(document.getElementById("guessInput").value);
      const leftValue=coef*guess+constVal; const diff=leftValue-target; const balanced=Math.abs(diff)<0.01;
      algebraRead.innerText= balanced ? `${leftValue} — balanced! x = ${guess} is correct` : `${leftValue} (target is ${target})`;
      const pivot={ x:c.width/2, y:100 }; const beamLength=180; const tilt=Math.max(-0.35,Math.min(0.35,diff*0.03));
      cctx.fillStyle="#111936"; cctx.beginPath(); cctx.moveTo(pivot.x-20,pivot.y+70); cctx.lineTo(pivot.x+20,pivot.y+70); cctx.lineTo(pivot.x,pivot.y); cctx.closePath(); cctx.fill();
      const leftEnd={ x:pivot.x-beamLength*Math.cos(tilt), y:pivot.y-beamLength*Math.sin(tilt) }; const rightEnd={ x:pivot.x+beamLength*Math.cos(tilt), y:pivot.y+beamLength*Math.sin(tilt) };
      cctx.strokeStyle= balanced ? "#5eead4" : "#d4b16a"; cctx.lineWidth=5; cctx.beginPath(); cctx.moveTo(leftEnd.x,leftEnd.y); cctx.lineTo(rightEnd.x,rightEnd.y); cctx.stroke();
      drawPan(leftEnd,`${coef}x${constVal>=0?"+"+constVal:constVal}`); drawPan(rightEnd,String(target)); cctx.textAlign="left";
      const solved=(target-constVal)/coef; const solTxt=Number.isInteger(solved)?String(solved):solved.toFixed(2);
      cctx.fillStyle="#9ca7c2"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.textAlign="left";
      cctx.fillText(`Undo it:  ${coef}x ${constVal>=0?"+":"−"} ${Math.abs(constVal)} = ${target}   →   ${coef}x = ${target-constVal}   →   x = ${solTxt}${Number.isInteger(solved)&&solved>=0&&solved<=15?"":"  (outside the guess slider — try other numbers)"}`, 24, 238);
    }, c);
  },
  geometry(){ const c=document.getElementById("geometryCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'geometry');
    const geometryRead=document.getElementById("geometryRead"); const widthInput=document.getElementById("widthInput"); const heightInput=document.getElementById("heightInput2");
    const scale=22, originX=180, originY=230;
    AnimationManager.register('geometry', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('geometry'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const w=Number(widthInput.value), h=Number(heightInput.value); const perimeter=2*(w+h), area=w*h;
      geometryRead.innerText=`P = ${perimeter}  •  A = ${area} sq units`;
      const rectW=w*scale, rectH=h*scale;
      cctx.strokeStyle="rgba(94,234,212,.18)"; cctx.lineWidth=1;
      for(let gx=0; gx<=w; gx++){ cctx.beginPath(); cctx.moveTo(originX+gx*scale, originY-rectH); cctx.lineTo(originX+gx*scale, originY); cctx.stroke(); }
      for(let gy=0; gy<=h; gy++){ cctx.beginPath(); cctx.moveTo(originX, originY-gy*scale); cctx.lineTo(originX+rectW, originY-gy*scale); cctx.stroke(); }
      cctx.fillStyle="rgba(201,167,240,.15)"; cctx.fillRect(originX, originY-rectH, rectW, rectH);
      cctx.strokeStyle="#d4b16a"; cctx.lineWidth=4; cctx.strokeRect(originX, originY-rectH, rectW, rectH);
      cctx.fillStyle="#edf2f7"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`width ${w}`, originX+rectW/2, originY+22);
      cctx.save(); cctx.translate(originX-18, originY-rectH/2); cctx.rotate(-Math.PI/2); cctx.fillText(`height ${h}`, 0, 0); cctx.restore(); cctx.textAlign="left";
    }, c);
  },
  trigonometry(){ const c=document.getElementById("trigonometryCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'trig');
    const trigRead=document.getElementById("trigRead"); const angleInput=document.getElementById("angleInput");
    const originX=100, originY=270, hyp=220;
    AnimationManager.register('trig', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('trig'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const angleDeg=Number(angleInput.value); const angleRad=angleDeg*Math.PI/180;
      const oppLen=hyp*Math.sin(angleRad), adjLen=hyp*Math.cos(angleRad);
      const sinV=Math.sin(angleRad), cosV=Math.cos(angleRad), tanV=Math.tan(angleRad);
      trigRead.innerText=`sin ${sinV.toFixed(2)}  •  cos ${cosV.toFixed(2)}  •  tan ${tanV.toFixed(2)}`;
      const topX=originX+adjLen, topY=originY-oppLen;
      cctx.strokeStyle="#5eead4"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(originX,originY); cctx.lineTo(topX,originY); cctx.stroke();
      cctx.strokeStyle="#c9a7f0"; cctx.beginPath(); cctx.moveTo(topX,originY); cctx.lineTo(topX,topY); cctx.stroke();
      cctx.strokeStyle="#d4b16a"; cctx.lineWidth=3; cctx.beginPath(); cctx.moveTo(originX,originY); cctx.lineTo(topX,topY); cctx.stroke();
      cctx.strokeStyle="rgba(215,220,229,.5)"; cctx.lineWidth=1; cctx.strokeRect(topX-12,originY-12,12,12);
      cctx.strokeStyle="#edf2f7"; cctx.beginPath(); cctx.arc(originX,originY,30,-angleRad,0); cctx.stroke();
      cctx.fillStyle="#edf2f7"; cctx.font="13px 'IBM Plex Mono',monospace"; cctx.fillText(`${angleDeg}°`, originX+38, originY-12); cctx.fillText("adjacent", originX+adjLen/2-20, originY+20); cctx.fillText("opposite", topX+8, originY-oppLen/2); cctx.fillText("hypotenuse", originX+adjLen/2-30, originY-oppLen/2-10);
    }, c);
  },
  probability(){ const c=document.getElementById("probabilityCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'prob');
    const probRead=document.getElementById("probRead"); const sidesInput=document.getElementById("sidesInput"); const winInput=document.getElementById("winInput");
    const cx=c.width/2, cy=c.height/2, r=110;
    function clampWin(){ const sides=Math.max(2,Number(sidesInput.value)); winInput.max=sides; if(Number(winInput.value)>sides){ winInput.value=sides; } }
    sidesInput.addEventListener("input",clampWin); clampWin();
    AnimationManager.register('prob', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('prob'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const sides=Math.max(2,Number(sidesInput.value)); const wins=Math.min(Number(winInput.value),sides); const pct=(wins/sides*100).toFixed(1);
      probRead.innerText=`${wins}/${sides} = ${pct}%`;
      const sliceAngle=(Math.PI*2)/sides;
      for(let i=0;i<sides;i++){ const start=-Math.PI/2+i*sliceAngle, end=start+sliceAngle; cctx.beginPath(); cctx.moveTo(cx,cy); cctx.arc(cx,cy,r,start,end); cctx.closePath(); cctx.fillStyle= i<wins ? "#5eead4" : "rgba(201,167,240,.12)"; cctx.fill(); cctx.strokeStyle="#020617"; cctx.lineWidth=2; cctx.stroke(); }
      cctx.beginPath(); cctx.arc(cx,cy,r,0,Math.PI*2); cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.lineWidth=2; cctx.stroke();
      cctx.beginPath(); cctx.fillStyle="#d4b16a"; cctx.moveTo(cx,cy-r-14); cctx.lineTo(cx-8,cy-r+4); cctx.lineTo(cx+8,cy-r+4); cctx.closePath(); cctx.fill();
    }, c);
  },
  statistics(){ const c=document.getElementById("statisticsCanvas"); if(!c) return; const cctx=c.getContext("2d"); watchSimCanvas(c,'stats');
    const statsRead=document.getElementById("statsRead"); const ids=["d1","d2","d3","d4","d5"];
    const baseX=90, baseY=270, barW=70, gap=30, maxBarH=200, scaleMax=20;
    AnimationManager.register('stats', ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister('stats'); return; }
      cctx.clearRect(0,0,c.width,c.height);
      const values=ids.map(id=>Number(document.getElementById(id).value));
      const mean=values.reduce((a,b)=>a+b,0)/values.length;
      const sorted=[...values].sort((a,b)=>a-b); const median=sorted[Math.floor(sorted.length/2)];
      const counts={}; values.forEach(v=>{ counts[v]=(counts[v]||0)+1; }); let mode=values[0], best=0;
      Object.keys(counts).forEach(k=>{ if(counts[k]>best){ best=counts[k]; mode=Number(k); } });
      const modeText = best>1 ? mode : "no repeats";
      statsRead.innerText=`Mean ${mean.toFixed(1)}  •  Median ${median}  •  Mode ${modeText}`;
      cctx.strokeStyle="rgba(215,220,229,.4)"; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(50,baseY); cctx.lineTo(50+values.length*(barW+gap),baseY); cctx.stroke();
      values.forEach((v,i)=>{ const h=(v/scaleMax)*maxBarH; const x=baseX+i*(barW+gap); cctx.fillStyle="#c9a7f0"; cctx.fillRect(x,baseY-h,barW,h); cctx.fillStyle="#edf2f7"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(String(v), x+barW/2, baseY-h-10); });
      const meanY=baseY-(mean/scaleMax)*maxBarH; cctx.strokeStyle="#d4b16a"; cctx.lineWidth=2; cctx.setLineDash([6,5]); cctx.beginPath(); cctx.moveTo(50,meanY); cctx.lineTo(50+values.length*(barW+gap),meanY); cctx.stroke(); cctx.setLineDash([]); cctx.fillStyle="#d4b16a"; cctx.textAlign="left"; cctx.fillText("mean", 55+values.length*(barW+gap)-30, meanY-6);
    }, c);
  }
};
