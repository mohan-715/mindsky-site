
/* shared helper for empire timeline sims */
function empireTimelineSim(canvasId, inputId, readId, cfg){
  const c=document.getElementById(canvasId); if(!c) return;
  const cctx=c.getContext("2d"); watchSimCanvas(c, canvasId);
  const readout=document.getElementById(readId); const input=document.getElementById(inputId);
  const cx=c.width/2, cy=115; const baseY=c.height-45, marginX=70; const icons=cfg.icons||[];
  AnimationManager.register(canvasId, ()=>{ if(!document.body.contains(c)){ AnimationManager.unregister(canvasId); return; }
    cctx.clearRect(0,0,c.width,c.height);
    const maxYears=Number(input.max); const years=Number(input.value); const frac=Math.min(1,years/maxYears);
    let sizeFrac; if(frac<=cfg.peakFrac){ sizeFrac=frac/cfg.peakFrac; } else { sizeFrac=1-((frac-cfg.peakFrac)/(1-cfg.peakFrac))*0.6; }
    const radius=26+sizeFrac*84;
    cctx.beginPath(); cctx.fillStyle="rgba(240,149,74,.22)"; cctx.arc(cx,cy,radius,0,Math.PI*2); cctx.fill(); cctx.strokeStyle="#f0954a"; cctx.lineWidth=2; cctx.stroke();
    cctx.beginPath(); cctx.fillStyle="#d4b16a"; cctx.arc(cx,cy,6,0,Math.PI*2); cctx.fill();
    cctx.fillStyle="#9ca7c2"; cctx.font="12px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(`Founded: ${cfg.startLabel}  •  ${years} years later`,cx,205); cctx.textAlign="left";
    cctx.strokeStyle="rgba(215,220,229,.35)"; cctx.lineWidth=2; cctx.beginPath(); cctx.moveTo(marginX,baseY); cctx.lineTo(c.width-marginX,baseY); cctx.stroke();
    let nearestIcon=null, nearestDist=Infinity;
    icons.forEach(icon=>{ const ix=marginX+icon.frac*(c.width-marginX*2); cctx.beginPath(); cctx.fillStyle="#5eead4"; cctx.arc(ix,baseY,5,0,Math.PI*2); cctx.fill(); cctx.save(); cctx.translate(ix,baseY-12); cctx.fillStyle="#9ca7c2"; cctx.font="11px 'IBM Plex Mono',monospace"; cctx.textAlign="center"; cctx.fillText(icon.title,0,0); cctx.restore(); const d=Math.abs(icon.frac-frac); if(d<nearestDist){ nearestDist=d; nearestIcon=icon; } });
    const markerX=marginX+frac*(c.width-marginX*2); cctx.beginPath(); cctx.fillStyle="#f0954a"; cctx.moveTo(markerX,baseY-11); cctx.lineTo(markerX-7,baseY); cctx.lineTo(markerX,baseY+11); cctx.lineTo(markerX+7,baseY); cctx.closePath(); cctx.fill();
    if(nearestIcon && nearestDist<=0.045){ readout.innerText=`★ Iconic Moment (${nearestIcon.title}) — ${nearestIcon.detail}`; } else { readout.innerText=cfg.getPhaseText(frac); }
  }, c);
}

/* ---------- QUIZ LOGIC ---------- */
function shuffleQuiz(quiz){
  const qs=[...quiz.querySelectorAll(".quiz-q")], result=quiz.querySelector(".quiz-result");
  for(let i=qs.length-1;i>0;i--){ const k=Math.floor(Math.random()*(i+1)); const t=qs[i]; qs[i]=qs[k]; qs[k]=t; }
  qs.forEach(q=>{
    quiz.insertBefore(q,result);
    const fb=q.querySelector(".qfeedback"); const bs=[...q.querySelectorAll(".qopt")];
    for(let i=bs.length-1;i>0;i--){ const k=Math.floor(Math.random()*(i+1)); const t=bs[i]; bs[i]=bs[k]; bs[k]=t; }
    bs.forEach(b=>q.insertBefore(b,fb));
  });
}
function finishQuiz(quiz,right,total){
  const id=quiz.dataset.lesson; const before=masteryLevel(id);
  const s=scores[id]||{best:0,total:total,attempts:0};
  s.total=total; s.attempts=(s.attempts||0)+1; s.last=right; s.best=Math.max(s.best||0,right); scores[id]=s; saveScores();
  if(right/total>=0.5 && !completed.includes(id)) completeTopic(id); else updateProgress();
  const lv=masteryLevel(id); const frac=right/total;
  const msg= frac>=0.8 ? "That is a mastered star. It shines brightest on the atlas now." : (frac>=0.5 ? "Good, this star is practised. Get at least 80% to master it." : "Read the explanations above, then try again. Your best score is kept.");
  const res=quiz.querySelector(".quiz-result");
  res.innerHTML=`<div class="qr-score">${right} of ${total} right</div><div class="qr-level">${MASTERY_NAMES[lv].toUpperCase()} • BEST ${s.best} OF ${total}</div><p>${msg}</p><button class="action secondary quiz-retry" type="button">Try again with new order</button>`;
  res.hidden=false;
  res.querySelector(".quiz-retry").onclick=()=>{
    quiz.querySelectorAll(".quiz-q").forEach(q=>{
      delete q.dataset.answered; delete q.dataset.right;
      q.querySelectorAll(".qopt").forEach(o=>o.classList.remove("correct","wrong"));
      const fb=q.querySelector(".qfeedback"); fb.textContent=""; fb.className="qfeedback";
      const why=q.querySelector(".qwhy"); if(why) why.hidden=true;
    });
    shuffleQuiz(quiz); res.hidden=true;
    quiz.scrollIntoView({block:"start",behavior:"smooth"});
  };
  if(lv===3 && before<3) showToast((lessonById(id)||{title:id}).title+' mastered ★');
}
function attachQuizHandlers(){
  document.querySelectorAll(".quiz").forEach(quiz=>{
    const check=()=>{ const all=[...quiz.querySelectorAll(".quiz-q")]; if(!all.every(q=>q.dataset.answered)) return; finishQuiz(quiz,all.filter(q=>q.dataset.right).length,all.length); };
    quiz.querySelectorAll(".quiz-q").forEach(q=>{
      const opts=q.querySelectorAll(".qopt"); const feedback=q.querySelector(".qfeedback");
      opts.forEach(opt=>{ opt.addEventListener("click",()=>{ if(q.dataset.answered) return; q.dataset.answered="true"; const isCorrect=opt.dataset.correct==="true"; if(isCorrect) q.dataset.right="1";
        q.querySelectorAll(".qopt").forEach(o=>{ if(o.dataset.correct==="true") o.classList.add("correct"); else if(o===opt) o.classList.add("wrong"); });
        feedback.textContent=isCorrect ? "✓ Correct" : "✗ Not quite — the right answer is highlighted"; feedback.className="qfeedback "+(isCorrect?"ok":"bad");
        const why=q.querySelector(".qwhy"); if(why) why.hidden=false;
        check();
      }); });
    });
  });
}

