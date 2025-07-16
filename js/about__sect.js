gsap.utils.toArray('.white-anim').forEach(el => {
  el.addEventListener('mouseenter', () =>
    gsap.to(el, { backgroundColor: '#111111', color: '#FFD2D8', duration: 0.1 })
  );
  el.addEventListener('mouseleave', () =>
    gsap.to(el, { backgroundColor: '#000000', color: '#ffffff', duration: 0.1 })
  );
});



if(!isMobile){const c2 = document.getElementById('background__container-manage');
    for (let i = 0; i < 400; i++) {
        const s = document.createElement('div');
        s.className = 'square';
        s.onmouseenter = () => {
        gsap.killTweensOf(s);
        gsap.set(s, {opacity: 1, backgroundColor: '#FFD2D8'});
        };
        s.onmouseleave = () => {
        [0.6, 0.3, 0.2, 0.1, 0].forEach((o, i) =>
            gsap.to(s, {opacity: o, duration: .2, delay: .2 * (i + 1)})
        );
        };
        c2.appendChild(s);
}}





document.querySelectorAll('.about-mobile__subtitle-block').forEach((header) => {
    header.addEventListener('click', () => {
      const content = header.nextElementSibling;

      const isOpen = content.classList.contains('open');

      if (isOpen) {
        gsap.to(content, {
          height: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => content.classList.remove('open')
        });
      } else {
        content.classList.add('open');
        const fullHeight = content.scrollHeight;
        gsap.to(content, {
          height: fullHeight,
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    });
  });