gsap.to(".team__photo", {y: "20%",ease: "none",scrollTrigger: {trigger: ".team__photo-block",start: "top bottom",end: () => `bottom+=${1*vh} top`,scrub: true}});

const photos = document.querySelectorAll('.team__member');

photos.forEach((photo) => {
  photo.addEventListener('mouseenter', () => {
    photos.forEach((p) => {
      if (p !== photo) {
        gsap.to(p, { filter: "grayscale(100%) blur(10px)", duration: 0.5 });
      } else {
        gsap.to(p, { filter: "grayscale(0%) blur(0px)", duration: 0.5 });
      }
    });
  });

  photo.addEventListener('mouseleave', () => {
    photos.forEach((p) => {
      gsap.to(p, { filter: "grayscale(0%) blur(0px)", duration: 0.5 });
    });
  });
});


gsap.fromTo(".team__square",{opacity:0}, {
        scrollTrigger: {
        trigger:".team",
        start:"top 50%",
        toggleActions: "play reverse play reverse",
        },
        opacity:1,
        delay:.4
})
animateWords(".team__title", ".team", "top 50%");