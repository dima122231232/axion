if (!window.matchMedia('(max-aspect-ratio: 1/1), (max-width: 780px)').matches){
    document.querySelector('.content').style.height = `${document.querySelector('.content').offsetHeight + (window.outerHeight - window.innerHeight)}px`;}
    
    if(ScrollTrigger.isTouch !==1){
        ScrollSmoother.create({
        wrapper: '.wrapper',
        content: '.content',
        smooth: 1.5,
        effects: true
    });
    }
// }
// else{
//     const smoother = ScrollSmoother.create({
//     wrapper: '.wrapper',
//     content: '.content',
//     smoothTouch: .2,
//     normalizeScroll: true,
//     ignoreMobileResize: true,
//     });
// }




