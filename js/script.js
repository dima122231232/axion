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
