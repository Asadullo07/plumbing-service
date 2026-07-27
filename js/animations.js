/* ============================================================
   AquaPro Plumbing — animations.js
   Parallax | Button Ripple | Hover enhancements
   ============================================================ */
'use strict';

/* ---------- Light Parallax on Hero Orbs ---------- */
(function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length || !window.matchMedia('(hover: hover)').matches) return;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    orbs.forEach((orb, i) => {
      const depth = (i + 1) * 8;
      orb.style.transform = `translate(${dx * depth}px, ${dy * depth}px)`;
    });
  }, { passive: true });
})();

/* ---------- Button Ripple Effect ---------- */
(function initRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn-primary');
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    const size = Math.max(rect.width, rect.height) * 2;

    ripple.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:rgba(255,255,255,0.2);
      top:${e.clientY - rect.top - size/2}px;
      left:${e.clientX - rect.left - size/2}px;
      transform:scale(0);
      animation:rippleAnim 0.5s linear forwards;
      pointer-events:none;
    `;

    // Inject keyframe once
    if (!document.getElementById('ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.textContent = '@keyframes rippleAnim{to{transform:scale(1);opacity:0}}';
      document.head.appendChild(style);
    }

    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
})();

/* ---------- Service Card Keyboard Enter ---------- */
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});
