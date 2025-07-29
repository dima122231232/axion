const classes = ['ai-section__heading', 'ai-section__heading--human', 'ai-section__heading--ai'];

if(!isMobile.matches){
  document.querySelectorAll('.ai-section__content').forEach(section => {
    classes.forEach(className => {
      const element = section.querySelector(`.${className}`);
      if(element) ScrollTrigger.create({trigger: section, start: "top top", end: () => `bottom-=${offsetPx} top`, pin: element, pinSpacing: false, scrub: true});
    });
  });
}

let obj = { val: 0 };
gsap.fromTo(obj, {val: 0}, {val: 20, scrollTrigger: {trigger: ".ai-section__content", start: () => `top+=${offsetPx} top`, end: () => `bottom-=${offsetPx} top`, scrub: true}, onUpdate: () => document.querySelector(".ai-section__visual--num").textContent = String(Math.round(obj.val)).padStart(2,'0')});

animateWords("#ai-section__title", ".ai-section", "top 70%");



const groups = ['human', 'sr', 'ai']
  .map(name => document.querySelectorAll(`.ai-section__text-group--${name} p`));
groups[0].forEach((p, idx) => {
  ScrollTrigger.create({
    trigger: p,
    start: 'top center',
    end:   'bottom center',
    onEnter:     () => setActive(idx),
    onEnterBack: () => setActive(idx),
  });
});
function setActive(idx) {
  groups.forEach(group => {
    group.forEach((p, i) => p.classList.toggle('active', i === idx));
  });
}