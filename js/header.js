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