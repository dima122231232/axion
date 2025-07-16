


if(!isMobile){
    gsap.set(".team__member",{filter: "grayscale(100%) sepia(1) hue-rotate(0deg) saturate(0%) blur(0px) brightness(.2)"})
    gsap.to(".team__photo", {y: "20%",ease: "none",scrollTrigger: {trigger: ".team",start:"-70% top",end:"bottom top",scrub: true}});
    const photos = document.querySelectorAll('.team__member');
    photos.forEach((photo) => {
    photo.addEventListener('mouseenter', () => {
        photos.forEach((p) => {
        if (p !== photo) {
            gsap.to(p, { filter: "grayscale(100%) sepia(1) hue-rotate(0deg) saturate(0%) blur(3px) brightness(.2)", duration: .3 });
        } else {
            gsap.to(p, { filter: "grayscale(0%) sepia(1) saturate(150%) hue-rotate(310deg) blur(0px) brightness(1.1)", duration: .3 });
        }
        });
    });

    photo.addEventListener('mouseleave', () => {
        photos.forEach((p) => {
        gsap.to(p, { filter: "grayscale(100%) sepia(1) hue-rotate(0deg) saturate(0%) blur(0px) brightness(.2)", duration: .3 });
        });
    });
    });
}else{
    gsap.to(".team__photo", {y: "20%",ease: "none",scrollTrigger: {trigger: ".team",start: () => `top+=${1*vh} top`,end: () => `bottom+=${2*vh} top`,scrub: true}});
}

gsap.fromTo(".team__square",{opacity:0}, {
        scrollTrigger: {
        trigger:".team",
        start:"top 50%",
        toggleActions: "play reverse play reverse",
        },
        opacity:1,
        delay:.4
})
// animateWords(".team__title", ".team", "top 50%");