/* ---------- PROGRESS BACKUP: move progress between devices without an account ----------
   The code is plain text (MS1.<base64 of a small JSON>). Restoring merges: topics you
   discovered on either device stay discovered, and the better quiz score is kept.
   ---------------------------------------------------------------------------------- */
function backupMake(){
  const data={ v:1, t:new Date().toISOString(), completed:completed.slice(), scores:scores };
  const json=JSON.stringify(data);
  const b64=btoa(unescape(encodeURIComponent(json)));
  return "MS1."+b64;
}
function backupRead(text){
  const raw=String(text||"").trim();
  if(raw.length>200000) throw new Error("That is too long to be a MindSky backup.");
  const m=raw.match(/MS1\.([A-Za-z0-9+/=]+)/);
  if(!m) throw new Error("This does not look like a MindSky backup code.");
  let data; try{ data=JSON.parse(decodeURIComponent(escape(atob(m[1])))); }catch(e){ throw new Error("The code is damaged. Copy it again, all of it."); }
  if(!data || data.v!==1 || !Array.isArray(data.completed)) throw new Error("This backup is from a version MindSky does not understand.");
  const ids=new Set(LESSONS.map(l=>l.id));
  const done=data.completed.filter(id=>typeof id==="string" && ids.has(id));
  const sc={};
  if(data.scores && typeof data.scores==="object"){
    Object.keys(data.scores).forEach(id=>{
      const s=data.scores[id];
      if(ids.has(id) && s && Number.isFinite(s.best) && Number.isFinite(s.total) && s.total>0 && s.total<=50 && s.best>=0 && s.best<=s.total){
        sc[id]={ best:Math.floor(s.best), total:Math.floor(s.total), attempts:Math.max(0,Math.floor(s.attempts)||0), last:Math.max(0,Math.min(s.total,Math.floor(s.last)||0)) };
      }
    });
  }
  return { completed:done, scores:sc };
}
function backupMerge(res){
  let added=0;
  res.completed.forEach(id=>{ if(!completed.includes(id)){ completed.push(id); added++; } });
  Object.keys(res.scores).forEach(id=>{
    const s=res.scores[id], cur=scores[id];
    if(!cur || (s.best/s.total)>(cur.best/cur.total)) scores[id]=s;
  });
  saveProgress(); saveScores(); updateProgress();
  return added;
}
function backupPanelHtml(){
  return `<div class="panel-card backup-panel" style="margin-top:26px">
    <div class="card-title">Back up or move your progress</div>
    <p class="view-sub" style="margin:8px 0 14px">Progress is saved only in this browser. To use another phone or computer, copy the code below there and paste it into "Restore".</p>
    <div class="card-meta">YOUR BACKUP CODE</div>
    <textarea id="backupOut" class="backup-box" readonly rows="3" aria-label="Your backup code"></textarea>
    <div class="backup-actions">
      <button class="action" id="backupCopy" type="button">Copy code</button>
      <button class="action secondary" id="backupDownload" type="button">Download as file</button>
    </div>
    <div class="card-meta" style="margin-top:22px">RESTORE FROM A CODE OR FILE</div>
    <textarea id="backupIn" class="backup-box" rows="3" placeholder="Paste a MindSky backup code here" aria-label="Paste backup code"></textarea>
    <div class="backup-actions">
      <button class="action" id="backupRestore" type="button">Restore</button>
      <label class="action secondary backup-file">Choose a file<input id="backupFile" type="file" accept=".txt,.mindsky,text/plain" hidden></label>
    </div>
    <div id="backupMsg" class="backup-msg" role="status"></div>
  </div>`;
}
function backupBind(){
  const out=document.getElementById("backupOut"); if(!out) return;
  const msg=function(t,bad){ const m=document.getElementById("backupMsg"); m.textContent=t; m.className="backup-msg"+(bad?" bad":" ok"); };
  out.value=backupMake();
  document.getElementById("backupCopy").onclick=function(){
    out.select();
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(out.value).then(()=>msg("Code copied."),()=>{ document.execCommand("copy"); msg("Code copied."); });
    else { document.execCommand("copy"); msg("Code copied."); }
  };
  document.getElementById("backupDownload").onclick=function(){
    const blob=new Blob([out.value],{type:"text/plain"}); const a=document.createElement("a");
    a.href=URL.createObjectURL(blob); a.download="mindsky-progress.txt"; document.body.appendChild(a); a.click();
    setTimeout(()=>{ URL.revokeObjectURL(a.href); a.remove(); },500); msg("File downloaded.");
  };
  const restore=function(text){
    try{
      const res=backupRead(text); const added=backupMerge(res);
      renderProfile();
      const m=document.getElementById("backupMsg");
      m.textContent= added? "Restored. "+added+" topic"+(added>1?"s":"")+" added to your progress." : "Restored. Nothing new to add, your progress already had these topics.";
      m.className="backup-msg ok";
      showToast("Progress restored");
    }catch(e){ msg(e.message,true); }
  };
  document.getElementById("backupRestore").onclick=function(){ restore(document.getElementById("backupIn").value); };
  document.getElementById("backupFile").onchange=function(e){
    const f=e.target.files && e.target.files[0]; if(!f) return;
    if(f.size>200000){ msg("That file is too big to be a MindSky backup.",true); return; }
    const r=new FileReader(); r.onload=function(){ restore(String(r.result)); }; r.onerror=function(){ msg("Could not read that file.",true); }; r.readAsText(f);
  };
}
(function(){
  const _renderProfile=renderProfile;
  renderProfile=function(){
    _renderProfile();
    const root=document.getElementById("view-profile");
    root.insertAdjacentHTML("beforeend",backupPanelHtml());
    backupBind();
  };
})();
