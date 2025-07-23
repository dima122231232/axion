gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
CustomEase.create("custom","M0,0 C.7,0 .3,1 1,1");

var anim = CustomEase.create("custom", "M0,0 C.7,0 .3,1 1,1");

const vh       = window.innerHeight,
      vw       = window.innerWidth,
      isMobile = vw < 769,
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
  noise2D(x,y) {
    const F2=0.3660254, G2=0.2113249;
    let n0=0,n1=0,n2=0,
        s=(x+y)*F2,
        i=Math.floor(x+s), j=Math.floor(y+s),
        t=(i+j)*G2,
        X0=i-t, Y0=j-t,
        x0=x-X0, y0=y-Y0,
        i1=x0>y0?1:0, j1=x0>y0?0:1,
        x1=x0-i1+G2, y1=y0-j1+G2,
        x2=x0-1+2*G2, y2=y0-1+2*G2,
        ii=i&255, jj=j&255,
        gi0=this.perm[ii+this.perm[jj]]%12,
        gi1=this.perm[ii+i1+this.perm[jj+j1]]%12,
        gi2=this.perm[ii+1+this.perm[jj+1]]%12,
        grad3=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[1,0],[-1,0],[0,1],[0,-1],[0,1],[0,-1]],
        dot=(g,xx,yy)=>g[0]*xx+g[1]*yy;
    let tt = 0.5 - x0*x0 - y0*y0;
    if (tt>0) { tt*=tt; n0 = tt*tt*dot(grad3[gi0], x0, y0); }
    tt = 0.5 - x1*x1 - y1*y1;
    if (tt>0) { tt*=tt; n1 = tt*tt*dot(grad3[gi1], x1, y1); }
    tt = 0.5 - x2*x2 - y2*y2;
    if (tt>0) { tt*=tt; n2 = tt*tt*dot(grad3[gi2], x2, y2); }
    return 70*(n0+n1+n2);
  }
}

(function(){
  const canvas = document.getElementById('demo-canvas'),
        ctx    = canvas.getContext('2d'),
        noise  = new SimplexNoise();
  let W,H,nodes,links,t=0,
      target={x:-1e4,y:-1e4};

  const COLS       = 10,
        ROWS       = 5,
        BASE_COLOR = 'rgba(200,200,200,0.07)',
        HIGHLIGHT  = 'rgba(255,210,216,0.15)',
        INTERACT_R = 250,
        NODE_R     = 2; // фиксированный радиус узлов

  window.addEventListener('mousemove', e => {
    target.x = e.clientX; target.y = e.clientY;
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
          x: i*(W/COLS) + (Math.random()-0.5)*40,
          y: j*(H/ROWS) + (Math.random()-0.5)*40
        });
      }
    }
    links = [];
    nodes.forEach((n,i) => {
      const others = nodes.slice(); others.splice(i,1);
      others.sort((a,b)=>((n.x-a.x)**2 + (n.y-a.y)**2) - ((n.x-b.x)**2 + (n.y-b.y)**2));
      for (let k = 0; k < 2; k++) links.push({a:n,b:others[k]});
    });
    animate();
  }

  function animate(){
    t += 0.003;
    ctx.clearRect(0,0,W,H);

    // ореол
    if (target.x > -1e3) {
      const g = ctx.createRadialGradient(target.x, target.y, 0, target.x, target.y, INTERACT_R);
      g.addColorStop(0, 'rgba(255,210,216,0.02)');
      g.addColorStop(1, 'rgba(255,210,216,0)');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    }

    // фоновые кривые
    links.forEach(l => {
      const mx = (l.a.x + l.b.x)/2,
            my = (l.a.y + l.b.y)/2,
            off = noise.noise2D(mx*0.005, my*0.005 + t) * 0.4;
      ctx.beginPath();
      ctx.moveTo(l.a.x, l.a.y);
      ctx.quadraticCurveTo(mx+off, my+off, l.b.x, l.b.y);
      ctx.strokeStyle = BASE_COLOR;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    });

    // активные узлы и соединения
    const active = nodes.filter(n => Math.hypot(n.x-target.x, n.y-target.y) < INTERACT_R);
    ctx.strokeStyle = HIGHLIGHT;
    ctx.lineWidth = 1.2;
    active.forEach((n,i) => {
      // к курсору
      ctx.beginPath();
      ctx.moveTo(n.x, n.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      // между собой
      const others = active.slice(); others.splice(i,1);
      others.sort((a,b)=>((n.x-a.x)**2+(n.y-a.y)**2) - ((n.x-b.x)**2+(n.y-b.y)**2));
      others.slice(0,2).forEach(m => {
        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      });
    });

    // рисуем узлы фиксированным радиусом
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, NODE_R, 0, 2*Math.PI);
      ctx.fillStyle = BASE_COLOR;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }
})();