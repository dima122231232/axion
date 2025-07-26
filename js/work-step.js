if (!isMobile) {
  gsap.set('.work-steps__items', { y: vh });
  gsap.set('.work-steps-h2', { opacity: 0 });

  window.addEventListener('load', () => {
    gsap.to(".work-steps", { scrollTrigger: { trigger: ".work-steps", start: "top top", end: `bottom+=${.75 * vh} top`, pin: true, pinSpacing: true, scrub: true, anticipatePin: 1 }});
    ScrollTrigger.refresh();
  });
  const tl = gsap.timeline({ scrollTrigger: { trigger: ".work-steps", start: "top top", end: `bottom+=${.75 * vh} top`, scrub: 1.2 }});
  gsap.utils.toArray(".work-steps__items").forEach((item, i) => tl.to(item, { y: 0, ease: "power2.out" }, i * .2));
  const tla = gsap.timeline({ scrollTrigger: { trigger: ".work-steps", start: "top top", end: `bottom+=${.75 * vh} top`, scrub: 1.2 }});
  gsap.utils.toArray(".work__block-blur").forEach((item, i) => tla.fromTo(item, { y: 0 }, { y: -.7 * vh, delay: .1, ease: "power4.in" }, i * .2));
  gsap.fromTo(".work-steps-h2", { opacity: 0, scale: .9, y: 300 }, { y: 0, scale: 1, opacity: 1, duration: .4, scrollTrigger: { trigger: ".work-steps__item", start: "top 50%", toggleActions: "play none none reverse" }});
  gsap.to(".work-steps__content", { filter: "grayscale(100%) blur(10px)", ease: "none", scrollTrigger: { trigger: ".work-steps__item", start: "175% top", end: () => `bottom+=${2 * vh} top`, scrub: true}});
  gsap.fromTo(".work-steps-h2", { opacity:1 }, { opacity: .2, scrollTrigger: {trigger: ".about", start: "-100% top", end:"-25% top", scrub: true}});

}