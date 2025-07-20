gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
CustomEase.create("custom","M0,0 C.7,0 .3,1 1,1");

var anim = CustomEase.create("custom", "M0,0 C.7,0 .3,1 1,1");

const vh       = window.innerHeight,
      vw       = window.innerWidth,
      isMobile = vw < 769,
      offsetVw = getComputedStyle(document.documentElement).getPropertyValue('--offset-vw').trim(),
      offsetPx = parseFloat(offsetVw) * vw / 100;

const animateWords = (sel, trig, start = "top center") => {
  document.querySelectorAll(sel).forEach(el => {
    el.innerHTML = el.innerHTML
      .split("<br>")
      .map(line => line.split(" ").map(w => `<span class="word">${w}</span>`).join(" "))
      .join("<br>");
    gsap.fromTo(
      el.querySelectorAll(".word"),
      {opacity:0,y:20},
      {opacity:1,y:0,duration:0.5,stagger:0.025,ease:"custom",scrollTrigger:{trigger:trig,start,toggleActions:"play reverse play reverse"}}
    );
  });
};
gsap.utils.toArray(".button-request").forEach((btn) => {
  const orig = btn.querySelector(".button-request-original");
  const fake = btn.querySelector(".button-request-fake");

  gsap.set(fake, { rotate: 5, yPercent: 100 });

  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 0.9, ease: anim, duration: 0.4 });
    gsap.timeline()
      .to(orig, { rotate: 10, duration: 0.4, ease: anim })
      .to(orig, { yPercent: -200, duration: 0.4, ease: anim }, 0.05);
    gsap.timeline()
      .to(fake, { rotate: 0, duration: 0.4, ease: anim })
      .to(fake, { yPercent: -100, duration: 0.4, ease: anim }, 0.05);
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, ease: anim, duration: 0.4 });
    gsap.timeline()
      .to(orig, { rotate: 0, duration: 0.4, ease: anim })
      .to(orig, { yPercent: 0, duration: 0.4, ease: anim }, 0.05);
    gsap.timeline()
      .to(fake, { rotate: 5, duration: 0.4, ease: anim })
      .to(fake, { yPercent: 100, duration: 0.4, ease: anim }, 0.05);
  });
});