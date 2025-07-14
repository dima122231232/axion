gsap.set('.work-steps__column--left .img-wrapper', {rotateY: 180,transformOrigin: 'center center'});

if(!isMobile){gsap.set('.work-steps__item', {y:.3*vh});}else{gsap.set('.work-steps__item', {y:.6*vh})}
if(!isMobile){
    document.querySelectorAll('.work-steps__column--left .img-wrapper, .work-steps__column--right .img-wrapper').forEach(wrapper => {
    const img = wrapper.querySelector('img');
    let enterTween, leaveTween;

    wrapper.addEventListener('mouseenter', () => {
        leaveTween?.kill();
        enterTween = gsap.to(img, {
        duration: 0.3,
        scale: 1,
        rotateY: -50,
        transformOrigin: 'left center',
        ease: "power2.inOut",
        overwrite: true
        });
    });

    wrapper.addEventListener('mouseleave', () => {
        const playLeave = () => {
        leaveTween = gsap.to(img, {
            duration: 0.5,
            scale: 1,
            rotateY: 0,
            ease: "power2.inOut",
            overwrite: true
        });
        };
        enterTween?.isActive() ? enterTween.eventCallback("onComplete", playLeave) : playLeave();
    });
    });
    gsap.to(".work-steps", {scrollTrigger: {trigger: ".work-steps",start: "top top",end: () => `${document.querySelector(".work-steps").offsetHeight}px top`,pin: true,scrub: false,}});

    const tl = gsap.timeline({scrollTrigger: {trigger: ".work-steps",start: "top top",end: `bottom+=${0.15 * vh} top`,scrub: true,}});
    gsap.utils.toArray(".work-steps__item").forEach((item, i) => {tl.to(item, {y: 0 * vh,ease: "power2.out"}, i * .2);
    });
    gsap.from(".work-steps__column--right .img-wrapper img, .work-steps__column--left .img-wrapper img", {opacity: 0,x:-110,duration: 1,ease: "power2.out",scrollTrigger: {trigger: ".work-steps",start: "top 30%",  once: true}});
}
else{ 
    gsap.fromTo(".work-steps",{}, {
    y: 1*vh,
    ease:"none",
    scrollTrigger: {
    trigger: ".work-steps",
    start: "top top",     // когда элемент входит снизу
    end: () => `${1 * vh} top`,
    scrub: true,             // плавная анимация при скролл
  }
});
const tl = gsap.timeline({scrollTrigger: {trigger: ".work-steps",start: "top top",end: `bottom+=${0.15 * vh} top`,scrub: true,}});
    gsap.utils.toArray(".work-steps__item").forEach((item, i) => {tl.to(item, {y: 0 * vh,ease: "power2.out"}, i * .2);});
    gsap.from(".work-steps__column--right .img-wrapper img, .work-steps__column--left .img-wrapper img", {opacity: 0,x:-110,duration: 1,ease: "power2.out",scrollTrigger: {trigger: ".work-steps",start: "top 60%",  once: true}});
}




animateWords(".work-steps__title", ".work-steps", "top 50%");
animateWords(".work-steps__text", ".work-steps", "top 30%");