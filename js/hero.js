    if(!isMobile){gsap.fromTo(".promo__video",{scale:.3,rotate:-5,y:"-10vw"},{scale: 1,y:"100vh",rotate:0,scrollTrigger: {trigger: ".hero",start: "top top",end: "center top",scrub: true}});}
    else{
        gsap.fromTo(".promo__video",{scale:.3,rotate:-3,y:-.3*vw},{scale: 1,y:.9*vh,rotate:0,scrollTrigger: {trigger: ".hero",start: "top top",end: "center top",scrub: 1}});
    } 
window.addEventListener("load", () => {
    // gsap.fromTo(".hero__title-span",{opacity:1},{opacity:0,scrollTrigger: {trigger: ".hero",start: "top top",end: "center top",scrub: true}});
    // gsap.to(".promo__video",{y:"100vh"});
    const c = document.getElementById('background__container');
    for (let i = 0; i < 400; i++) {
        const s = document.createElement('div');
        s.className = 'square';
        s.onmouseenter = () => {
        gsap.killTweensOf(s);
        gsap.set(s, {opacity: 1, backgroundColor: '#FFD2D8'});
        };
        s.onmouseleave = () => {
        [0.6, 0.3, 0.2, 0.1, 0].forEach((o, i) =>
            gsap.to(s, {opacity: o, duration: 0.05, delay: .05 * (i + 1)})
        );
        };
        c.appendChild(s);
    }
// });
window.addEventListener("scroll", () => {
  const top = document.querySelector(".hero__plus").getBoundingClientRect().bottom;
  gsap.to("body, .header", {
    backgroundColor: top <= 0 ? "#000" : "#111111",
    duration: .5,
    overwrite: "auto"
  });
});

gsap.set(".button-request-fake", { rotate: 5,yPercent:100 });

document.querySelector(".button-request").addEventListener("mouseenter", () => {
    gsap.to(".button-request",{scale:.9, ease: anim, duration: .4})
    gsap.timeline()
        .to(".button-request-original", { rotate: 10, duration: 0.4, ease: anim })
        .to(".button-request-original", { yPercent: -200, duration: 0.4, ease: anim }, 0.05);
    gsap.timeline()
        .to(".button-request-fake", { rotate: 0, duration: 0.4, ease: anim })
        .to(".button-request-fake", { yPercent: -100, duration: 0.4, ease: anim }, 0.05);
});

document.querySelector(".button-request").addEventListener("mouseleave", () => {
    gsap.to(".button-request",{scale:1, ease: anim, duration: .4})
    gsap.timeline()
        .to(".button-request-original", { rotate:0, duration: .4,ease:anim})
        .to(".button-request-original", { yPercent:0, duration: .4,ease:anim },.05);
    gsap.timeline()
        .to(".button-request-fake", { rotate:5, duration: .4,ease:anim})
        .to(".button-request-fake", { yPercent:100, duration: .4,ease:anim },.05);
});


const dots = document.getElementById('dots');
let count = dots.textContent.length;

function updateDots(target) {
  if (count === target) {
    gsap.delayedCall(2.5, () => updateDots(Math.floor(Math.random() * 28) + 3));
    return;
  }
  count += (target > count) ? 1 : -1;
  gsap.to(dots, { duration: 0.05, textContent: '.'.repeat(count), ease: "none" });
  gsap.delayedCall(0.05, () => updateDots(target));
}
updateDots(Math.floor(Math.random() * 28) + 3);
});