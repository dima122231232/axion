gsap.set(".gmail__underline", { transformOrigin: "left center" });
gsap.set(".tel__underline", { transformOrigin: "right center" });

document.querySelectorAll(".header__link").forEach(link => {
  const underline = link.querySelector("span");

  link.addEventListener("mouseenter", () => {
    gsap.to(underline, { scaleX: 0, duration: 0.3 });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(underline, { scaleX: 1, duration: 0.3 });
  });
});

//  let prev = 0, header = document.querySelector(".header");
//   ScrollTrigger.create({
//     onUpdate: s => {
//       gsap.to(header, {
//         yPercent: s.scroll() < prev ? 0 : -100,
//         duration: 0.3
//       });
//       prev = s.scroll();
//     }
//   });

gsap.to(".header", {
  y:-100,
  duration: 0.5,
  ease: anim,
  scrollTrigger: {
    trigger: ".ai-section",
    start: "-50% top",  
    toggleActions: "play reverse play reverse"
  }
});