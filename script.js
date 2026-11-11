const tiltCards = document.querySelectorAll('.tilt-card, .floating-card');

const preloader = document.querySelector('.preloader');

if (preloader) {
  const startedAt = Date.now();
  let dismissed = false;

  const dismissPreloader = () => {
    if (dismissed) return;
    dismissed = true;
    const remainingTime = Math.max(0, 300 - (Date.now() - startedAt));
    window.setTimeout(() => {
      preloader.classList.add('is-hidden');
      preloader.hidden = true;
    }, remainingTime);
  };

  window.addEventListener('load', dismissPreloader, { once: true });
  window.setTimeout(dismissPreloader, 1600);
}

for (const card of tiltCards) {
  card.addEventListener('pointermove', (event) => {
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 12;
    const rotateX = (0.5 - py) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('pointerleave', () => {
    card.style.transform = '';
  });
}
