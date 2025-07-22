if (ScrollTrigger.isTouch !== 1) {
  ScrollSmoother.create({
    wrapper: '#wrapper',
    content: '#content',
    smooth: 1.5,
    effects: true,
  });
  ScrollTrigger.refresh();
//   function compensateHeightLoss() {
//     const content = document.querySelector('#content');
//     const lostHeight = window.outerHeight - window.innerHeight;

//     if (lostHeight > 0) {
//       const extra = lostHeight + 1;
//       content.style.height = content.offsetHeight + extra + 'px';
//     }

//     ScrollTrigger.refresh(true); 
//   }

//   window.addEventListener('load', compensateHeightLoss);
//   window.addEventListener('resize', compensateHeightLoss);
}
