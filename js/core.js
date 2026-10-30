/* ============================================================
   PERFORMANCE TIER DETECTION
   Detects device capability and adjusts quality automatically.
   ============================================================ */
const PERF = (function(){
  const cores = navigator.hardwareConcurrency || 4;
  const mem = navigator.deviceMemory || 4;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tier = 'high';
  if (reduced || cores <= 2 || mem <= 2) tier = 'low';
  else if (cores <= 4 || mem <= 4) tier = 'medium';
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('android') || ua.includes('iphone')) {
    if (tier === 'high') tier = 'medium';
  }
  return {
    tier,
    reduced,
    starCount: tier === 'low' ? 50 : tier === 'medium' ? 110 : 170,
    galaxyStars: tier === 'low' ? 140 : tier === 'medium' ? 350 : 650,
    dpr: Math.min(window.devicePixelRatio || 1, tier === 'low' ? 1 : tier === 'medium' ? 1.25 : 1.75),
    simFrameSkip: tier === 'low' ? 2 : tier === 'medium' ? 1 : 1
  };
})();
document.body.classList.add('perf-' + PERF.tier);

/* ============================================================
   UNIFIED ANIMATION LOOP
   All simulations register here instead of starting their own
   requestAnimationFrame. The loop:
   - Pauses entirely when the tab is hidden
   - Calls each registered callback only when its target canvas
     is on-screen (via IntersectionObserver)
   - Stops cleanly when no callbacks remain
   ============================================================ */
const AnimationManager = {
  callbacks: new Map(),
  running: false,
  rafId: null,
  paused: false,
  frameCount: 0,
  _unobserve(entry){
    try { if (entry && entry.canvas && entry.canvas.dataset && entry.canvas.dataset.simId) simVisibility.unobserve(entry.canvas); } catch(e){}
  },
  register(id, fn, canvas){
    const old = this.callbacks.get(id);
    if (old && old.canvas !== canvas) this._unobserve(old);
    this.callbacks.set(id, { fn, canvas, visible: true });
    this._start();
  },
  unregister(id){
    this._unobserve(this.callbacks.get(id));
    this.callbacks.delete(id);
    if (this.callbacks.size === 0) this._stop();
  },
  setVisible(id, visible){
    const c = this.callbacks.get(id);
    if (c) c.visible = visible;
  },
  _start(){
    if (this.running) return;
    this.running = true;
    const tick = (t) => {
      if (!this.running) return;
      if (document.hidden || this.paused) {
        this.rafId = requestAnimationFrame(tick);
        return;
      }
      this.frameCount++;
      // Low-end frame skip
      if (PERF.simFrameSkip > 1 && this.frameCount % PERF.simFrameSkip !== 0) {
        this.rafId = requestAnimationFrame(tick);
        return;
      }
      const stale = [];
      this.callbacks.forEach((cb, id) => {
        if (cb.canvas && !document.body.contains(cb.canvas)) { stale.push(id); return; }
        if (cb.visible) {
          try { cb.fn(t); } catch(e) { /* keep the loop alive */ }
        }
      });
      stale.forEach(id => this.unregister(id));
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  },
  _stop(){
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
};

// Pause heavy work when tab is hidden
document.addEventListener('visibilitychange', () => {
  AnimationManager.paused = document.hidden;
});

/* ============================================================
   INTERSECTION OBSERVER FOR SIMULATIONS
   Simulations are only rendered when their canvas is on-screen.
   ============================================================ */
const simVisibility = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.dataset.simId;
    if (id) AnimationManager.setVisible(id, entry.isIntersecting);
  });
}, { threshold: 0.05, rootMargin: '50px' });

function watchSimCanvas(canvas, simId){
  canvas.dataset.simId = simId;
  simVisibility.observe(canvas);
}

/* ============================================================
   MINDSKY ENGINE — Lessons are data, the engine renders them
   ============================================================ */


