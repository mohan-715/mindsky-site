/* ---------- BOOTSTRAP ---------- */
renderAtlas(); renderLessons(); updateProgress();

function bindOpenHandlers(rootId){
  const root=document.getElementById(rootId);
  if(!root || root.dataset.bound) return; root.dataset.bound="1";
  const go=el=>{
    const topic=el.closest('[data-open-topic]'); if(topic){ startConcept(topic.dataset.openTopic); return true; }
    const subj=el.closest('[data-open-subject]'); if(subj){ switchSubject(subj.dataset.openSubject); setView('learn'); return true; }
    return false;
  };
  root.addEventListener('click',e=>{ go(e.target); });
  root.addEventListener('keydown',e=>{ if((e.key==='Enter'||e.key===' ') && go(e.target)) e.preventDefault(); });
}
bindOpenHandlers('view-progress'); bindOpenHandlers('view-profile');

const globalSearch=document.getElementById('globalSearch');
if(globalSearch){ globalSearch.addEventListener('keydown',e=>{if(e.key==='Enter'){setView('explore'); document.getElementById('conceptSearch').value=globalSearch.value; APP.query=globalSearch.value; renderExplore();}}); }
const conceptSearch=document.getElementById('conceptSearch'); if(conceptSearch) conceptSearch.addEventListener('input',e=>{APP.query=e.target.value;renderExplore();});
document.querySelectorAll('[data-subject-filter]').forEach(b=>b.addEventListener('click',()=>{APP.filter=b.dataset.subjectFilter;document.querySelectorAll('[data-subject-filter]').forEach(x=>x.classList.toggle('active',x===b));renderExplore();}));

window.completeTopic=completeTopic;
renderHome(); renderExplore(); renderChallenges(); renderLab(); renderProgress(); renderProfile();
