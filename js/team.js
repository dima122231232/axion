if (!isMobile) {
  gsap.set(".team__member", { filter: "grayscale(100%) sepia(1) hue-rotate(0deg) saturate(0%) blur(0px) brightness(.2)" });
  gsap.to(".team__photo", { y: "30%", ease: "none", scrollTrigger: { trigger: ".team", start: "-70% top", end: "bottom top", scrub: true } });
  gsap.utils.toArray(".team__member--block-blur").forEach((el, i) => gsap.to(el, { height: "65vh", ease: "none", scrollTrigger: { trigger: ".team", start: `${-90 + i * 15}% top`, end: `${-35 + i * 15}% top`, scrub: true } }));

  const photos = document.querySelectorAll(".team__member");
  photos.forEach(photo => {
    photo.addEventListener("mouseenter", () => photos.forEach(p => gsap.to(p, { filter: p === photo ? "grayscale(0%) sepia(1) saturate(0%) hue-rotate(0deg) blur(0px) brightness(1.1)" : "grayscale(100%) sepia(1) hue-rotate(0deg) saturate(0%) blur(5px) brightness(.2)", duration: 0.3 })));
    photo.addEventListener("mouseleave", () => photos.forEach(p => gsap.to(p, { filter: "grayscale(100%) sepia(1) hue-rotate(0deg) saturate(0%) blur(0px) brightness(.2)", duration: 0.3 })));
  });
} else {
  gsap.to(".team__photo", { y: "30%", ease: "none", scrollTrigger: { trigger: ".team", start: () => `top+=${1 * vh} top`, end: () => `bottom+=${2 * vh} top`, scrub: true } });
}

gsap.fromTo(".team__square", { opacity: 0 }, { opacity: 1, delay: 0.4, scrollTrigger: { trigger: ".team", start: "top 50%", toggleActions: "play reverse play reverse" } });