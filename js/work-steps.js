gsap.set('.work-steps__column--left .img-wrapper', {rotateY: 180,transformOrigin: 'center center'});
if(!isMobile){gsap.set('.work-steps__item', {y:.3*vh});}else{gsap.set('.work-steps__item', {y:.6*vh})}
//  gsap.to(".work-steps", {scrollTrigger: {trigger: ".work-steps",start: "top top",end:5*vh,pin: true,pinSpacing: true,scrub: 2,anticipatePin: 1}});
if(!isMobile){window.addEventListener('load', () => {gsap.to(".work-steps", {scrollTrigger: {trigger: ".work-steps",start: "top top",end: () => `${document.querySelector(".work-steps").offsetHeight}px top`,pin: true,pinSpacing: true,scrub: 1.2,anticipatePin: 1}}); ScrollTrigger.refresh();});
    const tl = gsap.timeline({scrollTrigger: {trigger: ".work-steps",start: "top top",end: `bottom+=${0.15 * vh} top`,scrub: 1.2,}});
        gsap.utils.toArray(".work-steps__item").forEach((item, i) => {tl.fromTo(item, {y:.6*vh},{y: 0 * vh,ease: "power2.out"}, i * .2);
    });
    gsap.to(".work-steps__content", {filter: "grayscale(100%) blur(10px)",ease: "none",scrollTrigger: {trigger: ".work-steps__item",start: "top top",end: () => `bottom+=${1*vh} top`,scrub: true}});
}else{
    window.addEventListener('load', () => {gsap.to(".work-steps", {scrollTrigger: {trigger: ".work-steps",start: "top top",end: () => `bottom+=${.5*vh} top`,pin: true,pinSpacing: true,scrub: 1.2,anticipatePin: 1}}); ScrollTrigger.refresh();});
    gsap.fromTo(".work-steps__item",{opacity:0,filter: "grayscale(100%) blur(50px)"}, {y:0,filter: "grayscale(0%) blur(0px)",opacity:1,duration: 0.4,stagger: 0.1,scrollTrigger: {trigger: ".work-steps",start: "top top",toggleActions: "play none none reverse"}});
    gsap.to(".work-steps__content", {filter: "grayscale(100%) blur(5px)",ease: "none",scrollTrigger: {trigger: ".work-steps__item",start: "top -50%",end: () => `bottom+=${1*vh} top`,scrub: true}});
}
if(!isMobile){
    // document.querySelectorAll('.work-steps__column--left .img-wrapper, .work-steps__column--right .img-wrapper').forEach(wrapper => {
    // const img = wrapper.querySelector('img');
    // let enterTween, leaveTween;

    // wrapper.addEventListener('mouseenter', () => {
    //     leaveTween?.kill();
    //     enterTween = gsap.to(img, {
    //     duration: 0.3,
    //     scale: 1,
    //     rotateY: -50,
    //     transformOrigin: 'left center',
    //     ease: "power2.inOut",
    //     overwrite: true
    //     });
    // });

    // wrapper.addEventListener('mouseleave', () => {
    //     const playLeave = () => {
    //     leaveTween = gsap.to(img, {
    //         duration: 0.5,
    //         scale: 1,
    //         rotateY: 0,
    //         ease: "power2.inOut",
    //         overwrite: true
    //     });
    //     };
    //     enterTween?.isActive() ? enterTween.eventCallback("onComplete", playLeave) : playLeave();
    // });
    // });
    // gsap.to(".work-steps", {scrollTrigger: {trigger: ".work-steps",start: "top top",end: () => `${document.querySelector(".work-steps").offsetHeight}px top`,pin: true,scrub: false,}});

   gsap.fromTo(".work-steps__column--left .img-wrapper img", {opacity: 0, x: -110}, {opacity: 1, x: 0,stagger: { each: 0.1, from: "end" }, duration: .5, ease: "power2.out", scrollTrigger: {trigger: ".work-steps", start: "top 30%", toggleActions: "play reverse play reverse"}});
      gsap.fromTo(".work-steps__column--right .img-wrapper img", {opacity: 0, x: -110}, {opacity: 1, x: 0,stagger:0.1, duration: .5, ease: "power2.out", scrollTrigger: {trigger: ".work-steps", start: "top 30%", toggleActions: "play reverse play reverse"}});
}
else{ 
//     gsap.fromTo(".work-steps",{}, {
//     yPercent: 100,
//     ease:"none",
//     scrollTrigger: {
//     trigger: ".work-steps",
//     start: "top top",   
//     end:"bottom top",
//     scrub: true,  
//   }
// });
// const tl = gsap.timeline({scrollTrigger: {trigger: ".work-steps",start: "top top",end: `bottom+=${0.15 * vh} top`,scrub: true,}});
//     gsap.utils.toArray(".work-steps__item").forEach((item, i) => {tl.to(item, {y: 0 * vh,ease: "power2.out"}, i * .2);});
      gsap.fromTo(".work-steps__column--left .img-wrapper img", {opacity: 0, x: -110}, {opacity: 1, x: 0,stagger: { each: 0.1, from: "end" }, duration: .5, ease: "power2.out", scrollTrigger: {trigger: ".work-steps", start: "top 60%", toggleActions: "play reverse play reverse"}});
      gsap.fromTo(".work-steps__column--right .img-wrapper img", {opacity: 0, x: -110}, {opacity: 1, x: 0,stagger:0.1, duration: .5, ease: "power2.out", scrollTrigger: {trigger: ".work-steps", start: "top 60%", toggleActions: "play reverse play reverse"}});
      gsap.fromTo(".work-steps__image",{border:"none"},{border:"1px solid rgba(255,255,255,.1)",delay:.5,duration: .5, ease: "power2.out", scrollTrigger: {trigger: ".work-steps", start: "top 60%", toggleActions: "play reverse play reverse"}});

}




animateWords(".work-steps__title", ".work-steps", "top 30%");
animateWords(".work-steps__text", ".work-steps", "top 30%");