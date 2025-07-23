if (!isMobile)
  gsap.fromTo(".promo__video", { scale: .3, rotate: -5, y: "-10vw" }, { scale: 1, y: "100vh", rotate: 0, scrollTrigger: { trigger: ".hero", start: "top top", end: "center top", scrub: true } });
else
  gsap.fromTo(".promo__video", { scale: .3, rotate: -3, y: -.3 * vw }, { scale: 1, y: .9 * vh, rotate: 0, scrollTrigger: { trigger: ".hero", start: "top top", end: "center top", scrub: 1 } });

window.addEventListener("load", () => {
  const c = document.getElementById('background__container');
  for (let i = 0; i < 400; i++) {
    const s = document.createElement('div');
    s.className = 'square';
    s.onmouseenter = () => {
      gsap.killTweensOf(s);
      gsap.set(s, { opacity: 1, backgroundColor: '#FFD2D8' });
    };
    s.onmouseleave = () =>
      [0.6, 0.3, 0.2, 0.1, 0].forEach((o, i) =>
        gsap.to(s, { opacity: o, duration: 0.05, delay: .05 * (i + 1) }));
    c.appendChild(s);
  }

  const dots = document.getElementById('dots');
  let count = dots.textContent.length;

  const updateDots = t => {
    if (count === t) return gsap.delayedCall(2.5, () => updateDots(Math.floor(Math.random() * 28) + 3));
    count += t > count ? 1 : -1;
    gsap.to(dots, { duration: 0.05, textContent: '.'.repeat(count), ease: "none" });
    gsap.delayedCall(0.05, () => updateDots(t));
  };

  updateDots(Math.floor(Math.random() * 28) + 3);
});

window.addEventListener("scroll", () => {
  const top = document.querySelector(".hero__plus").getBoundingClientRect().bottom;
  gsap.to(["body", ".header"], { backgroundColor: top <= 0 ? "#0B0B0E" : "#111111", duration: .5, overwrite: "auto" });
});

