gsap.set(".gmail__underline", { transformOrigin: "left center" });
gsap.set(".tel__underline", { transformOrigin: "right center" });
document.querySelectorAll(".header__link").forEach(link => {
  const u = link.querySelector("span");
  link.addEventListener("mouseenter", () => gsap.to(u, { scaleX: 0, duration: 0.3 }));
  link.addEventListener("mouseleave", () => gsap.to(u, { scaleX: 1, duration: 0.3 }));
});

if (!isMobile.matches){
gsap.to(".header", { y: -100, duration: 0.5, ease: anim, scrollTrigger: {
  trigger: ".ai-section", start: "-50% top", end: () => `bottom+=${1.2 * vh} top`, toggleActions: "play reverse play reverse"
}});
}
function casesPreanim() {
    const tl = playAppearing();
    tl.eventCallback("onComplete", () => {gsap.delayedCall(0.15, () => {window.location.href = "/cases/stroitelstvo.html";});});
}