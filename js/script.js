gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
CustomEase.create("custom","M0,0 C.7,0 .3,1 1,1");

var anim = CustomEase.create("custom", "M0,0 C.7,0 .3,1 1,1");

const vh       = window.innerHeight,
      vw       = window.innerWidth,
      isMobile = window.matchMedia("(max-width: 768px)");
      offsetVw = getComputedStyle(document.documentElement).getPropertyValue('--offset-vw').trim(),
      offsetPx = parseFloat(offsetVw) * vw / 100;

const animateWords = (sel, trig, start = "top center") => {
  document.querySelectorAll(sel).forEach(el => {
    el.innerHTML = el.innerHTML
      .split("<br>")
      .map(line => line.split(" ").map(w => `<span class="word">${w}</span>`).join(" "))
      .join("<br>");
    gsap.fromTo(
      el.querySelectorAll(".word"),
      {opacity:0,y:20},
      {opacity:1,y:0,duration:0.5,stagger:0.025,ease:"custom",scrollTrigger:{trigger:trig,start,toggleActions:"play reverse play reverse"}}
    );
  });
};
gsap.utils.toArray(".button-request").forEach((btn) => {
  const orig = btn.querySelector(".button-request-original");
  const fake = btn.querySelector(".button-request-fake");

  gsap.set(fake, { rotate: 5, yPercent: 100 });

  btn.addEventListener("mouseenter", () => {
    gsap.to(btn, { scale: 0.9, ease: anim, duration: 0.4 });
    gsap.timeline()
      .to(orig, { rotate: 10, duration: 0.4, ease: anim })
      .to(orig, { yPercent: -200, duration: 0.4, ease: anim }, 0.05);
    gsap.timeline()
      .to(fake, { rotate: 0, duration: 0.4, ease: anim })
      .to(fake, { yPercent: -100, duration: 0.4, ease: anim }, 0.05);
  });
  btn.addEventListener("mouseleave", () => {
    gsap.to(btn, { scale: 1, ease: anim, duration: 0.4 });
    gsap.timeline()
      .to(orig, { rotate: 0, duration: 0.4, ease: anim })
      .to(orig, { yPercent: 0, duration: 0.4, ease: anim }, 0.05);
    gsap.timeline()
      .to(fake, { rotate: 5, duration: 0.4, ease: anim })
      .to(fake, { yPercent: 100, duration: 0.4, ease: anim }, 0.05);
  });
});

// gsap.to("#large-header", {
//   scrollTrigger: {
//     trigger: "#large-header",
//     start: "top top",
//     end: "+=131223",
//     scrub: true,
//     pin: true,
//     pinSpacing: false
//   }
// });





// Простой Perlin‑шум (Stefan Gustavson)
class SimplexNoise {
  constructor(r = Math) {
    this.p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) this.p[i] = i;
    for (let i = 255; i > 0; i--) {
      const n = Math.floor((i + 1) * r.random());
      [this.p[i], this.p[n]] = [this.p[n], this.p[i]];
    }
    this.perm = new Uint8Array(512);
    for (let i = 0; i < 512; i++) this.perm[i] = this.p[i & 255];
  }
  noise2D(x, y) {
    const F2 = 0.3660254, G2 = 0.2113249;
    let n0 = 0, n1 = 0, n2 = 0,
        s = (x + y) * F2,
        i = Math.floor(x + s), j = Math.floor(y + s),
        t = (i + j) * G2,
        X0 = i - t, Y0 = j - t,
        x0 = x - X0, y0 = y - Y0,
        i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1,
        x1 = x0 - i1 + G2, y1 = y0 - j1 + G2,
        x2 = x0 - 1 + 2 * G2, y2 = y0 - 1 + 2 * G2,
        ii = i & 255, jj = j & 255,
        gi0 = this.perm[ii + this.perm[jj]] % 12,
        gi1 = this.perm[ii + i1 + this.perm[jj + j1]] % 12,
        gi2 = this.perm[ii + 1 + this.perm[jj + 1]] % 12,
        grad3 = [
          [1, 1], [-1, 1], [1, -1], [-1, -1],
          [1, 0], [-1, 0], [1, 0], [-1, 0],
          [0, 1], [0, -1], [0, 1], [0, -1]
        ],
        dot = (g, xx, yy) => g[0] * xx + g[1] * yy;

    let tt = 0.5 - x0 * x0 - y0 * y0;
    if (tt > 0) { tt *= tt; n0 = tt * tt * dot(grad3[gi0], x0, y0); }
    tt = 0.5 - x1 * x1 - y1 * y1;
    if (tt > 0) { tt *= tt; n1 = tt * tt * dot(grad3[gi1], x1, y1); }
    tt = 0.5 - x2 * x2 - y2 * y2;
    if (tt > 0) { tt *= tt; n2 = tt * tt * dot(grad3[gi2], x2, y2); }

    return 70 * (n0 + n1 + n2);
  }
}






function createAppearingGrid(containerId) {
  const w = document.getElementById(containerId),
        c = 40,
        s = innerWidth * 0.025,
        r = Math.ceil(w.clientHeight / s);
  Object.assign(w.style, {
    display: "grid",
    gridTemplateColumns: `repeat(${c}, 2.5vw)`,
    gridAutoRows: "2.5vw"
  });
  Array.from({ length: c * r }).forEach(() =>
    w.insertAdjacentHTML('beforeend', '<div class="pixelPer"></div>')
  );

  const pixels = [...w.children];
  const shuffled = gsap.utils.shuffle(pixels);
  const groups = [];
  let i = 0;
  while (i < shuffled.length) {
    const groupSize = gsap.utils.random(35, 50, 5);
    groups.push(shuffled.slice(i, i + groupSize));
    i += groupSize;
  }
  pixels.forEach(pixel => pixel.style.opacity = 0);
  const tl = gsap.timeline({ paused: true });
  groups.forEach((group, index) => {
    tl.to(group, {
      opacity: 1,
      duration: 0.5,
      ease: "power1.out"
    }, index * 0.04);
  });
  return () => tl.play();
}
const playAppearing = createAppearingGrid("pixelPer");



