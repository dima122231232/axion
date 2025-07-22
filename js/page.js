if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#content',
    smooth: 2.5,
    effects: true,
  });
  ScrollTrigger.refresh();
}

gsap.timeline({scrollTrigger:{trigger:".system-first",start:"top top",end:"bottom top",scrub:true,pin:true,pinSpacing:false}})
  .to({}, {duration:0.5}).to(".system-first",{opacity:0,filter:"grayscale(100%) blur(10px)",backgroundColor:"#111111"},0.5);
gsap.timeline({scrollTrigger:{trigger:".system-two",start:"top top",end:"bottom top",scrub:true,pin:true,pinSpacing:false}})
  .to({}, {duration:0.5}).to(".system-two",{opacity:.5,filter:"grayscale(100%) blur(10px)",backgroundColor:"#111111"},0.5);



gsap.fromTo(".footer",{ y: -0.7 * vh },{y: .3 * vh,ease: "none",scrollTrigger: {trigger: ".system-three",
        start: () => `bottom+=${0.1 * vh} bottom`,end: () => `+=${1 * vh}`,scrub: true}});
gsap.to(".system-three",{filter:"grayscale(100%) blur(10px)",ease: "none",scrollTrigger: {trigger: ".system-three",
        start: () => `bottom+=${0.5 * vh} bottom`,end: () => `+=${1 * vh}`,scrub: true}});
