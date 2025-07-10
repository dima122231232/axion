if (!window.matchMedia('(max-aspect-ratio: 1/1), (max-width: 780px)').matches){
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        smooth: 1.5,
    });

    document.querySelector('.content').style.height = `${document.querySelector('.content').offsetHeight + (window.outerHeight - window.innerHeight)}px`;
}





