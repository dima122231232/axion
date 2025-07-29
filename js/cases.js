if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#content',
    smooth: 1.5,
    effects: true,
  });
  }

document.addEventListener("DOMContentLoaded", () => {
  function createAppearingGrid(containerId) {
    const w = document.getElementById(containerId);

    const c = 40;
    const s = innerWidth * 0.025;
    const r = Math.ceil(w.clientHeight / s);

    Object.assign(w.style, {
      display: "grid",
      gridTemplateColumns: `repeat(${c}, 2.5vw)`,
      gridAutoRows: "2.5vw"
    });

    w.innerHTML = "";

    Array.from({ length: c * r }).forEach(() =>
      w.insertAdjacentHTML('beforeend', '<div class="pixelPer" style="opacity:1"></div>')
    );

    gsap.set("#pixelPer", { backgroundColor: "transparent", delay: 0.1 });

    const pixels = [...w.children];
    const shuffled = gsap.utils.shuffle(pixels);
    const groups = [];
    let i = 0;

    while (i < shuffled.length) {
      const groupSize = gsap.utils.random(35, 50, 5);
      groups.push(shuffled.slice(i, i + groupSize));
      i += groupSize;
    }
    const tlDisappear = gsap.timeline({ paused: true });
    groups.forEach((group, index) => {
      tlDisappear.to(group, {
        opacity: 0,
        delay: 0.15,
        duration: 0.4,
        ease: "power1.out"
      }, index * 0.03);
    });
    const tlAppear = gsap.timeline({ paused: true });
    groups.forEach((group, index) => {
      tlAppear.to(group, {
        opacity: 1,
        duration: 0.1,
        ease: "power1.out"
      }, index * 0.03);
    });
    tlDisappear.play();
    return {
      appear: () => tlAppear.restart(),
      disappear: () => tlDisappear.restart()
    };
  }
  window.pixelGridAnimation = createAppearingGrid("pixelPer");
});


document.querySelector(".header__cases-beack").addEventListener("click", () => {const tl = window.pixelGridAnimation.appear();
tl.eventCallback("onComplete", () => {gsap.delayedCall(0.15, () => {window.location.href = "../main.html";});});});

const filenames = [
  "stroitelstvo.html",
  "production.html",
  "education.html",
  "realty.html",
  "sales.html",
  "e-commerce.html",
  "hr-agent.html"
];

const currentPage = window.location.pathname.split("/").pop();
const currentIndex = filenames.indexOf(currentPage);

if (currentIndex !== -1) {
  const goToPage = (direction) => {
    let targetIndex;

    if (direction === "next") {
      targetIndex = (currentIndex + 1) % filenames.length;
    } else if (direction === "prev") {
      targetIndex = (currentIndex - 1 + filenames.length) % filenames.length;
    }

    const targetFilename = filenames[targetIndex];

    const tl = window.pixelGridAnimation.appear();
    tl.eventCallback("onComplete", () => {
      gsap.delayedCall(0.15, () => {
        window.location.href = targetFilename;
      });
    });
  };

  document.querySelector(".cases-button-right")?.addEventListener("click", () => goToPage("next"));
  document.querySelector(".cases-button-left")?.addEventListener("click", () => goToPage("prev"));
}





// const BOX   = document.querySelector('.custom-follow-box'),
//       LINK  = 'тг',
//       MOVE_X = gsap.quickTo(BOX, 'x', { duration: 0.3, ease: 'power2' }),
//       MOVE_Y = gsap.quickTo(BOX, 'y', { duration: 0.3, ease: 'power2' });

// let active  = false;

// // Двигаем бокс по любому движению мыши
// document.addEventListener('mousemove', e => {
//   if (!active) return;
//   document.body.classList.add('hide-cursor');
//   MOVE_X(e.clientX);
//   MOVE_Y(e.clientY);
// });

// // Клики по кнопке
// document.addEventListener('click', e => {
//   if (active && e.target.closest('.cases__button-hover')) {
//     location.href = LINK;
//   }
// });

// // Включаем/выключаем кастомный курсор
// document.querySelectorAll('.cases__button-hover').forEach(el => {
//   el.addEventListener('mouseenter', () => {
//     active = true;
//     gsap.set(BOX, { display: 'block' });
//     gsap.to(BOX, { autoAlpha: 1, duration: 0.3 });
//   });
//   el.addEventListener('mouseleave', () => {
//     active = false;
//     document.body.classList.remove('hide-cursor');
//     gsap.to(BOX, {
//       autoAlpha: 0,
//       duration: 0.05,
//       onComplete: () => BOX.style.display = 'none'
//     });
//   });
// });
gsap.fromTo(".footer",{ y: -0.7 * vh },{y: .3 * vh,ease: "none",scrollTrigger: {trigger: ".footer",
    start: () => `bottom+=${0.1 * vh} bottom`,end: () => `+=${1 * vh}`,scrub: true}});


animateWords(".system__description-first", ".system__description-first", "top 70%");
animateWords(".system__description-twise", ".system__description-twise", "top 70%");
animateWords(".system__description-last", ".system__description-last", "top 70%");