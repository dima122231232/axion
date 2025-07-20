document.querySelectorAll('.services__items-block').forEach(block => {
  let fromTop;
  const items = block.querySelectorAll('.services__item');
  block.addEventListener('mouseenter', e => {
    const {top, height} = block.getBoundingClientRect();
    fromTop = e.clientY < top + height / 2;
    if(!fromTop) gsap.set(items, {y: '0%'});
    gsap.to(items, {y: '-100%', duration: 0.15, ease: "none"});
  });
  block.addEventListener('mouseleave', () => {
    const target = fromTop ? '0%' : '-200%';
    const onComplete = fromTop ? () => gsap.set(items, {y: '-200%'}) : null;
    gsap.to(items, {y: target, duration: 0.15, ease: "none", onComplete});
  });
});

document.querySelectorAll('.services__items-block').forEach((block, i) => {
  const img = document.querySelectorAll('.invis img')[i];
  block.addEventListener('mouseenter', () => gsap.to(img, {scale: 1, duration: 0.5, ease: "power2.out"}));
  block.addEventListener('mouseleave', () => gsap.to(img, {scale: 0, duration: 0.5, ease: "power2.in"}));
});

document.querySelectorAll(".services__items-block").forEach((block, i) => {
  block.style.cursor = "pointer";
  block.onclick = () => location.href = [
    "stroitelstvo.html",
    "proizvodstvo.html",
    "obrazovanie.html",
    "nedvizhimost.html",
    "prodazhi.html",
    "ecommerce.html",
    "hr-agent.html"
  ][i];
});

gsap.to(".block-img img", {y: "25%", ease: "none", scrollTrigger: {trigger: ".block-img", start: "-100% top", end: "bottom top", scrub: true}});
