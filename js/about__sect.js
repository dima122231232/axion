// gsap.utils.toArray('.white-anim').forEach(el => {
//   el.addEventListener('mouseenter', () => gsap.to(el, {backgroundColor: '#0B0B0E', color: '#FFD2D8', duration: .5}));
//   el.addEventListener('mouseleave', () => gsap.to(el, {backgroundColor: 'unset', color: '#fff', duration: .5}));
// });

if(!isMobile){
//   const c2 = document.getElementById('background__container-manage');
//   for(let i = 0; i < 400; i++){
//     const s = document.createElement('div');
//     s.className = 'square';
//     s.onmouseenter = () => {gsap.killTweensOf(s); gsap.set(s, {opacity: 1, backgroundColor: '#4D4143'});};
//     s.onmouseleave = () => [0.6,0.3,0.2,0.1,0].forEach((o,i) => gsap.to(s, {opacity: o, duration: 0.2, delay: 0.2*(i+1)}));
//     c2.appendChild(s);
//   }
}

document.querySelectorAll('.about-mobile__subtitle-block').forEach(header => {
  header.addEventListener('click', () => {
    const content = header.nextElementSibling;
    const isOpen = content.classList.contains('open');
    if(isOpen) gsap.to(content, {height: 0, duration: 0.4, ease: "power2.inOut", onComplete: () => content.classList.remove('open')});
    else {
      content.classList.add('open');
      gsap.to(content, {height: content.scrollHeight, duration: 0.4, ease: "power2.inOut"});
    }
  });
});

// gsap.fromTo(".about", {filter: "grayscale(0%) blur(0px)"}, {filter: "grayscale(1000%) blur(10px)", ease: "none", scrollTrigger: {trigger: ".about", start: "42% top", end:"bottom top", scrub: true}});
gsap.fromTo(".about", {backgroundColor:"rgba(37,37,37,.75)"}, {backgroundColor:"rgba(37,37,37,1)",scrollTrigger: {trigger: ".about", start: "-100% top", end:"-25% top", scrub: true}});
gsap.fromTo(".about__section", {border:"1px solid rgba(255,255,255,0)"}, {border:"1px solid rgba(255,255,255,.1)", scrollTrigger: {trigger: ".about", start: "-75% top", end:"0% top", scrub: true}});
gsap.fromTo(".about_bl-ef", {filter: "grayscale(100%) blur(10px)"}, {filter: "grayscale(0%) blur(0px)", ease: "none", scrollTrigger: {trigger: ".about", start: "-100% top", end:"-25% top", scrub: true}});



function createPixelGrid(containerId, reverse = false) {
  const w = document.getElementById(containerId),
        c = 20,
        s = innerWidth * 0.05,
        r = Math.ceil(w.clientHeight / s);

  Object.assign(w.style, {
    display: "grid",
    gridTemplateColumns: `repeat(${c}, 5vw)`,
    gridAutoRows: "5vw"
  });

  Array.from({ length: c * r }).forEach(() =>
    w.insertAdjacentHTML('beforeend', '<div class="pixel"></div>')
  );

  const pixels = [].concat(
    ...Array.from({ length: r }, (_, i) => {
      const row = [...w.children].slice(i * c, (i + 1) * c);
      return gsap.utils.shuffle(row);
    })
  );

  gsap.to(reverse ? pixels.reverse() : pixels, {
    opacity: 0,
    ease: "power1.out",
    stagger: 0.02,
    scrollTrigger: {
      trigger: w,
      start: "top bottom",
      end: "250% top",
      scrub: 1
    }
  });
}

createPixelGrid("pixelWrap", true);  // снизу вверх
createPixelGrid("pixelWrap2", false); // сверху вниз
