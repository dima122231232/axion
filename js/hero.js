if (!isMobile){
  gsap.fromTo(".promo__video", { scale: .3, rotate: -5, y: "-10vw" }, { scale: 1, y: "100vh", rotate: 0, scrollTrigger: { trigger: ".hero", start: "top top", end: "center top", scrub: true } });
}
window.addEventListener("load", () => {
//   const c = document.getElementById('background__container');
//   for (let i = 0; i < 400; i++) {
//     const s = document.createElement('div');
//     s.className = 'square';
//     s.onmouseenter = () => {
//       gsap.killTweensOf(s);
//       gsap.set(s, { opacity: 1, backgroundColor: '#FFD2D8' });
//     };
//     s.onmouseleave = () =>
//       [0.6, 0.3, 0.2, 0.1, 0].forEach((o, i) =>
//         gsap.to(s, { opacity: o, duration: 0.05, delay: .05 * (i + 1) }));
//     c.appendChild(s);
//   }

  const dots = document.getElementById('dots');
  let count = dots.textContent.length;

  const updateDots = t => {
    if (count === t) return gsap.delayedCall(2.5, () => updateDots(Math.floor(Math.random() * 28) + 3));
    count += t > count ? 1 : -1;
    gsap.to(dots, { duration: 0.05, textContent: '.'.repeat(count), ease: "none" });
    gsap.delayedCall(0.05, () => updateDots(t));
  };

  updateDots(Math.floor(Math.random() * 28) + 3);
});

window.addEventListener("scroll", () => {
  const top = document.querySelector(".hero__plus").getBoundingClientRect().bottom;
  gsap.to(["body"], { backgroundColor: top <= 0 ? "#0B0B0E" : "#111111", duration: .5, overwrite: "auto" });
});


if (!isMobile){
gsap.timeline()
  .to(".block-per-active", {
    height: 0,
    delay:.2,
    duration:.75,
    ease: anim
  })
  .to(".header__container", {
    height: "50px",
    duration:.75,
    ease: anim
  },.35)
  .to(".header__container", {
    opacity:1,
    duration:.3,
  });

(function(){
  const canvas     = document.getElementById('demo-canvas'),
        ctx        = canvas.getContext('2d'),
        noise      = new SimplexNoise(),
        COLS       = 10,
        ROWS       = 5,
        BASE_COLOR = 'rgba(200,200,200,0.02)',
        BLINK_COLOR= 'rgba(255,210,216,0.05)',
        INTERACT_R = 600,
        NODE_R     = 5,
        // Реже мигаем
        BLINK_RATE = 0.005;

  let W, H, nodes, links, t = 0,
      target = { x: -1e4, y: -1e4 };

  window.addEventListener('mousemove', e => {
    target.x = e.clientX;
    target.y = e.clientY;
  });
  window.addEventListener('resize', init);
  init();

  function init(){
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    nodes = [];
    for (let i = 0; i <= COLS; i++) {
      for (let j = 0; j <= ROWS; j++) {
        nodes.push({
          x: i * (W / COLS) + (Math.random() - 0.5) * 40,
          y: j * (H / ROWS) + (Math.random() - 0.5) * 40
        });
      }
    }

    links = [];
    nodes.forEach((n, i) => {
      const others = nodes.slice();
      others.splice(i, 1);
      others.sort((a, b) =>
        ((n.x - a.x) ** 2 + (n.y - a.y) ** 2) -
        ((n.x - b.x) ** 2 + (n.y - b.y) ** 2)
      );
      for (let k = 0; k < 2; k++) {
        links.push({ a: n, b: others[k] });
      }
    });

    animate();
  }

  function animate(){
    t += 0.003;
    ctx.clearRect(0, 0, W, H);

    // ореол вокруг курсора
    if (target.x > -1e3) {
      const g = ctx.createRadialGradient(
        target.x, target.y, 0,
        target.x, target.y, INTERACT_R
      );
      g.addColorStop(0, 'rgba(255,210,216,0.0)');
      g.addColorStop(1, 'rgba(255,210,216,0)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    }

    // фоновые кривые с редким и более крупным мерцанием
    links.forEach(l => {
      const mx  = (l.a.x + l.b.x) / 2,
            my  = (l.a.y + l.b.y) / 2,
            off = noise.noise2D(mx * 0.005, my * 0.005 + t) * 0.4;

      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.quadraticCurveTo(mx + off, my + off, l.b.x, l.b.y);

      if (Math.random() < BLINK_RATE) {
        ctx.strokeStyle = BLINK_COLOR;
        ctx.lineWidth   = 1.5; // толще для «блика»
      } else {
        ctx.strokeStyle = BASE_COLOR;
        ctx.lineWidth   = 0.8;
      }
      ctx.stroke();
    });

    // активные узлы и их связи
    const active = nodes.filter(n =>
      Math.hypot(n.x - target.x, n.y - target.y) < INTERACT_R
    );

    ctx.strokeStyle = BLINK_COLOR;
    ctx.lineWidth   = 1.2;
    active.forEach((n, i) => {
      // к курсору
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();

      // между собой
      const others = active.slice();
      others.splice(i, 1);
      others.sort((a, b) =>
        ((n.x - a.x) ** 2 + (n.y - a.y) ** 2) -
        ((n.x - b.x) ** 2 + (n.y - b.y) ** 2)
      );
      others.slice(0, 2).forEach(m => {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      });
    });

    // рисуем узлы
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, NODE_R, 0, 2 * Math.PI);
      ctx.fillStyle = BASE_COLOR;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
})();

gsap.to("#large-header", {
  scrollTrigger: {
    trigger: "#large-header",
    start: "top top",
    end: "+=131223",
    scrub: true,
    pin: true,
    pinSpacing: false
  }
});
}