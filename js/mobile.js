if (isMobile){
    gsap.timeline()
    .to(".block-per-active", {
        height: 0,
        delay:.2,
        duration:.75,
        ease: anim
    })
    .to(".header__container", {
        height: "35px",
        duration:.75,
        ease: anim
    },.35)
    .to(".header__container", {
        opacity:1,
        duration:.3,
    });
    gsap.fromTo(".promo__video", { scale: .3, rotate: -3, y: -.3 * vw }, { scale: 1, y: .9 * vh, rotate: 0, scrollTrigger: { trigger: ".hero", start: "top top", end: "center top", scrub: 1 } });
}