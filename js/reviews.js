(() => {
  const viewport      = document.querySelector('.reviews__viewport');
  const track         = document.querySelector('.reviews__track');
  const items         = gsap.utils.toArray('.reviews__item');
  const origCount     = items.length / 2;  
  const visibleCount  = 5;

  const vpWidth   = viewport.offsetWidth;
  const itemW     = vpWidth / visibleCount;
  const trackW    = itemW * items.length;
  const wrapMin   = -itemW * origCount;
  const wrapMax   = 0;
  const wrapRange = wrapMax - wrapMin;

  let isDragging = false;
  let startX     = 0;
  let velocity   = 0;
  let lastTime   = 0;
  let rafId      = null;

  viewport.style.overflow = 'hidden';
  track.style.width       = `${trackW}px`;
  track.style.cursor      = 'grab';
  items.forEach(item => {
    Object.assign(item.style, {
      flex: `0 0 ${itemW}px`,
      boxSizing: 'border-box',
      opacity: '0.5',
      transition: 'opacity 0.2s'
    });
  });
  gsap.set(track, { x: 0 });
  updateOpacity(); 

  function mod(n, m) {
    return ((n % m) + m) % m;
  }

  function wrap(x) {
    return mod(x - wrapMin, wrapRange) + wrapMin;
  }

  function updateOpacity() {
    const vpRect  = viewport.getBoundingClientRect();
    const centerX = vpRect.left + vpRect.width / 2;
    items.forEach(item => {
      const r    = item.getBoundingClientRect();
      const icX  = r.left + r.width / 2;
      item.style.opacity = Math.abs(icX - centerX) < itemW / 2 ? '1' : '0.5';
    });
  }

  function snapToClosest() {
    const x0 = gsap.getProperty(track, 'x');
    const rawIndex = (visibleCount - 1) / 2 - x0 / itemW;
    const rounded  = Math.round(rawIndex);
    const xSnap    = ((visibleCount - 1) / 2 - rounded) * itemW;
    const xFinal   = wrap(xSnap);

    gsap.to(track, {
      x: xFinal,
      duration: 0.3,
      ease: 'power3.out',
      onUpdate: updateOpacity
    });
  }

  function inertiaLoop() {
    velocity *= 0.95;
    if (Math.abs(velocity) < 0.001) {
      rafId = null;
      snapToClosest();
      return;
    }
    const dx = velocity * 16;
    const x0 = gsap.getProperty(track, 'x');
    gsap.set(track, { x: wrap(x0 + dx) });
    updateOpacity();
    rafId = requestAnimationFrame(inertiaLoop);
  }

  track.addEventListener('pointerdown', e => {
    isDragging = true;
    startX     = e.clientX;
    lastTime   = performance.now();
    velocity   = 0;
    track.setPointerCapture(e.pointerId);
    track.style.cursor = 'grabbing';
    if (rafId) cancelAnimationFrame(rafId);
  });

  window.addEventListener('pointermove', e => {
    if (!isDragging) return;
    e.preventDefault();
    const now = performance.now();
    const dx  = e.clientX - startX;
    const dt  = now - lastTime || 16;

    velocity = dx / dt;
    lastTime = now;
    startX   = e.clientX;

    const x0 = gsap.getProperty(track, 'x');
    gsap.set(track, { x: wrap(x0 + dx) });
    updateOpacity();
  });

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    track.style.cursor = 'grab';
    track.releasePointerCapture && track.releasePointerCapture(e.pointerId);
    rafId = requestAnimationFrame(inertiaLoop);
  }
  window.addEventListener('pointerup',   endDrag);
  window.addEventListener('pointercancel', endDrag);
})();
