const viewport = document.querySelector('.reviews__viewport');
const track = document.querySelector('.reviews__track');
let autoScrollTimeout;

fetch('https://backend.xoplatform.de/api:US7WAq3I/review')
  .then(r => r.json())
  .then(data => {
    track.innerHTML = '';
    data.forEach(r => {
      const article = document.createElement('article');
      article.className = 'reviews__item';
      article.setAttribute('itemscope', '');
      article.setAttribute('itemtype', 'http://schema.org/Review');
      article.innerHTML = `
        <p class="reviews__text" itemprop="reviewBody">${r.text}</p>
        <div class="reviews__author" itemprop="author" itemscope itemtype="http://schema.org/Person">
          <img class="reviews__photo" src="${r.image.url}" itemprop="image" loading="lazy">
          <h6 class="reviews__name" itemprop="name">${r.full_name}</h6>
        </div>`;
      track.appendChild(article);
    });
    anim.items = gsap.utils.toArray('.reviews__item');
    anim.origCount = anim.items.length;
    anim.items.forEach(item => track.appendChild(item.cloneNode(true)));
    setup();

    gsap.fromTo(".footer",{ y: -0.7 * vh },{y: .3 * vh,ease: "none",scrollTrigger: {trigger: ".reviews",
        start: () => `bottom+=${0.1 * vh} bottom`,
        end: () => `+=${1 * vh}`,scrub: true,invalidateOnRefresh: true }});
    // gsap.fromTo(".footer",{ filter: "grayscale(100%) blur(10px)"}, { filter: "grayscale(0%) blur(0px)",ease:"none", scrollTrigger: { trigger: ".reviews", start: () => `bottom+=${.1 * vh} bottom`,end: () => `+=${.7 * vh}`, scrub: true,invalidateOnRefresh: true  }});
     ScrollTrigger.refresh();
    scheduleAutoScroll();
  });

function setup() {
  anim.items = gsap.utils.toArray('.reviews__item');
  anim.origCount = anim.items.length / 2;

  const cs = getComputedStyle(anim.items[0]);
  anim.itemW = anim.items[0].offsetWidth +
               parseFloat(cs.marginLeft) +
               parseFloat(cs.marginRight);

  anim.wrapMin = -anim.itemW * anim.origCount;
  anim.wrapRange = -anim.wrapMin;
  anim.centerOffset = (viewport.clientWidth - anim.itemW) / 2;

  gsap.set(track, { x: wrap(anim.centerOffset) });
  anim.items.forEach(item => item.style.opacity = '0.4');
  updateOpacity();

  window.addEventListener('resize', () => {
    anim.centerOffset = (viewport.clientWidth - anim.itemW) / 2;
    gsap.set(track, { x: wrap(anim.centerOffset) });
    updateOpacity();
  });

  track.addEventListener('pointerdown', startDrag);
  window.addEventListener('pointermove', onDrag);
  window.addEventListener('pointerup', endDrag);
}

function startDrag(e) {
  anim.isDragging = true;
  anim.startX = e.clientX;
  anim.lastTime = performance.now();
  anim.velocity = 0;
  track.setPointerCapture(e.pointerId);
  if (anim.raf) cancelAnimationFrame(anim.raf);
  clearTimeout(autoScrollTimeout);
}

function onDrag(e) {
  if (!anim.isDragging) return;
  e.preventDefault();
  const now = performance.now();
  const dx = e.clientX - anim.startX;
  const dt = now - anim.lastTime || 16;
  anim.velocity = dx / dt;
  anim.lastTime = now;
  anim.startX = e.clientX;

  const x0 = gsap.getProperty(track, 'x');
  gsap.set(track, { x: wrap(x0 + dx) });
  updateOpacity();
}

function endDrag(e) {
  if (!anim.isDragging) return;
  anim.isDragging = false;
  track.releasePointerCapture(e.pointerId);
  anim.raf = requestAnimationFrame(inertia);
}

function inertia() {
  const friction = 0.99;
  const stopThreshold = 0.15;
  anim.velocity *= friction;

  if (Math.abs(anim.velocity) < stopThreshold) {
    snap();
    return;
  }

  const dx = anim.velocity * 16;
  const x0 = gsap.getProperty(track, 'x');
  gsap.set(track, { x: wrap(x0 + dx) });
  updateOpacity();
  anim.raf = requestAnimationFrame(inertia);
}

function snap() {
  anim.isSnapping = true;
  const x0 = gsap.getProperty(track, 'x');
  const raw = -(x0 - anim.centerOffset) / anim.itemW;
  const idx = Math.round(raw);
  const xT = anim.centerOffset - idx * anim.itemW;

  gsap.to(track, {
    x: wrap(xT),
    duration: 0.3,
    ease: 'power3.out',
    onUpdate: updateOpacity,
    onComplete: () => {
      anim.isSnapping = false;
      scheduleAutoScroll();
    }
  });
}

function scheduleAutoScroll() {
  clearTimeout(autoScrollTimeout);
  autoScrollTimeout = setTimeout(() => {
    if (!anim.isDragging && !anim.isSnapping) {
      scrollToNext();
    }
  }, 7000);
}

function scrollToNext() {
  const x0 = gsap.getProperty(track, 'x');
  const raw = -(x0 - anim.centerOffset) / anim.itemW;
  const idx = Math.round(raw);
  const nextIdx = (idx + 1) % anim.origCount;
  const xT = anim.centerOffset - nextIdx * anim.itemW;

  gsap.to(track, {
    x: wrap(xT),
    duration: 0.6,
    ease: 'power2.inOut',
    onUpdate: updateOpacity,
    onComplete: scheduleAutoScroll
  });
}

function updateOpacity() {
  const mid = viewport.getBoundingClientRect().left + viewport.clientWidth / 2;
  anim.items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    item.style.opacity = Math.abs(cx - mid) < anim.itemW / 2 ? '1' : '0.4';
  });
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function wrap(x) {
  return mod(x - anim.wrapMin, anim.wrapRange) + anim.wrapMin;
}

animateWords(".reviews__title", ".reviews", "top 70%");
animateWords(".reviews__text-osn", ".reviews", "top 65%");
