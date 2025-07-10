gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
// window.addEventListener("load", () => {
    gsap.fromTo(".promo__video",{y:"0vh"},{y:"85vh",rotate:0,height:"100vh",width:"100vw",right:0,scrollTrigger: {trigger: ".hero",start: "top top",end: "center top",scrub: true}});
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