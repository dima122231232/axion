gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const vh = window.innerHeight;
const vw = window.innerWidth;

var anim = CustomEase.create("custom", "M0,0 C.7,0 .3,1 1,1");

function animateWords(sel, trig, start = "top center") {
  const t = document.querySelector(sel);
  if (!t) return;
  t.innerHTML = t.innerHTML.split("<br>").map(
    l => l.split(" ").map(w => `<span class="word">${w}</span>`).join(" ")
  ).join("<br>");
  gsap.to(t.querySelectorAll(".word"), {
    scrollTrigger: { trigger: trig, start, once: true },
    opacity: 1,
    duration: .5,
    y:0,
    x:0,
    stagger: 0.025,
    ease: anim
  });
}

const offsetVw = getComputedStyle(document.documentElement).getPropertyValue('--offset-vw').trim();
function vwToPx(vw) {return parseFloat(vw) * window.innerWidth / 100;}
const offsetPx = vwToPx(offsetVw);