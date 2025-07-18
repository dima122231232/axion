gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const vh = window.innerHeight;
const vw = window.innerWidth;

var anim = CustomEase.create("custom", "M0,0 C.7,0 .3,1 1,1");

function animateWords(sel, trig, start = "top center") {
  // Получаем список элементов по селекторам, разделённым запятой
  const elements = document.querySelectorAll(sel);
  if (!elements.length) return;

  elements.forEach(t => {
    // Разбиваем текст на слова, оборачиваем в <span>
    t.innerHTML = t.innerHTML
      .split("<br>")
      .map(line =>
        line
          .split(" ")
          .map(w => `<span class="word">${w}</span>`)
          .join(" ")
      )
      .join("<br>");

    // Применяем анимацию к каждому слову внутри этого элемента
    gsap.to(t.querySelectorAll(".word"), {
      scrollTrigger: {
        trigger: trig,
        start,
        toggleActions: "play reverse play reverse",
      },
      opacity: 1,
      duration: 0.5,
      y: 0,
      x: 0,
      stagger: 0.025,
      ease: anim
    });
  });
}

const offsetVw = getComputedStyle(document.documentElement).getPropertyValue('--offset-vw').trim();
function vwToPx(vw) {return parseFloat(vw) * window.innerWidth / 100;}
const offsetPx = vwToPx(offsetVw);

const isMobile = window.innerWidth < 769;

