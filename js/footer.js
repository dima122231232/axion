// gsap.fromTo(".footer",
//   { y:-.7*vh },
//   {
//     y:1*vh,ease:"none",
//     scrollTrigger: {
//       trigger: ".reviews",
//       start: () => `bottom+=${.1*vh} bottom`,
//       end: () => `+=${1.7*vh}`,       
//       scrub: true,
//       markers:true
//     }
//   }
// );
// gsap.set(".footer",{y:-.7*vh})

document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  const container = document.querySelector(".object-container");

  // Настройки физики
  const config = {
    gravity: { x: 0, y: 1 },
    restitution: 0.2,
    friction: 0.15,
    frictionAir: 0.02,
    density: 0.002,
    wallThickness: 200,
    mouseStiffness: 0.6,
  };

  const engine = Matter.Engine.create();
  engine.gravity = config.gravity;
  engine.positionIterations = 10;
  engine.velocityIterations = 8;

  const rect = container.getBoundingClientRect();

  // Статичные стены
  const walls = [
    Matter.Bodies.rectangle(
      rect.width / 2,
      rect.height + config.wallThickness / 2,
      rect.width + config.wallThickness * 2,
      config.wallThickness,
      { isStatic: true }
    ),
    Matter.Bodies.rectangle(
      -config.wallThickness / 2,
      rect.height / 2,
      config.wallThickness,
      rect.height + config.wallThickness * 2,
      { isStatic: true }
    ),
    Matter.Bodies.rectangle(
      rect.width + config.wallThickness / 2,
      rect.height / 2,
      config.wallThickness,
      rect.height + config.wallThickness * 2,
      { isStatic: true }
    ),
  ];
  Matter.World.add(engine.world, walls);

  const bodies = [];
  container.querySelectorAll(".object").forEach((el, i) => {
    const { width, height } = el.getBoundingClientRect();
    const body = Matter.Bodies.rectangle(
      Math.random() * rect.width,
      -500 - i * 100,
      width,
      height,
      {
        restitution: config.restitution,
        friction: config.friction,
        frictionAir: config.frictionAir,
        density: config.density,
        chamfer: { radius: 2 },
      }
    );
    bodies.push({ body, el, width, height });
    Matter.World.add(engine.world, body);
  });

  const mouse = Matter.Mouse.create(container);
  const mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse,
    constraint: { stiffness: config.mouseStiffness, render: { visible: false } },
  });
  Matter.World.add(engine.world, mouseConstraint);

  Matter.Events.on(mouseConstraint, 'enddrag', () => {
    window.open('https://тг', '_blank');
  });

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function update() {
    bodies.forEach(({ body, el, width, height }) => {
      const x = clamp(body.position.x - width / 2, 0, rect.width - width);
      const y = clamp(body.position.y - height / 2, -height * 3, rect.height - height);
      el.style.transform = `translate(${x}px, ${y}px) rotate(${body.angle}rad)`;
    });
    requestAnimationFrame(update);
  }

  ScrollTrigger.create({
    trigger: container,
    start: "top bottom-=20%",
    once: true,
    onEnter: () => {
      Matter.Runner.run(Matter.Runner.create(), engine);
      update();
    },
  });
});
