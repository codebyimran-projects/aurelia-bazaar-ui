
(function(){
  'use strict';

  /* hamburger */
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('mainNavbar');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', e => {
      e.stopPropagation();
      navLinks.classList.toggle('open');
      hamburger.querySelector('i').className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target)) {
        navLinks.classList.remove('open');
        hamburger.querySelector('i').className = 'fas fa-bars';
      }
    });
  }

  /* drag-to-scroll helper */
  function enableDrag(el) {
    if (!el) return;
    let isDown = false, startX, scrollStart;
    el.addEventListener('mousedown', e => { isDown = true; el.style.cursor = 'grabbing'; startX = e.pageX; scrollStart = el.scrollLeft; });
    window.addEventListener('mouseup', () => { isDown = false; el.style.cursor = 'grab'; });
    window.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); el.scrollLeft = scrollStart - (e.pageX - startX) * 1.2; });
    let touchStartX, touchScrollStart;
    el.addEventListener('touchstart', e => { touchStartX = e.touches[0].pageX; touchScrollStart = el.scrollLeft; }, {passive:true});
    el.addEventListener('touchmove', e => { el.scrollLeft = touchScrollStart - (e.touches[0].pageX - touchStartX) * 1.2; }, {passive:true});
  }
  enableDrag(document.getElementById('stallsScroll'));
  enableDrag(document.getElementById('dealsScroll'));

  /* confetti burst */
  function burstConfetti(x, y) {
    const colors = ['#FF5C8A', '#FFC94D', '#15C9A7', '#8C6FE6'];
    for (let i = 0; i < 16; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-piece';
      const dx = (Math.random() - 0.5) * 160;
      const rot = (Math.random() - 0.5) * 480;
      p.style.setProperty('--dx', dx + 'px');
      p.style.setProperty('--rot', rot + 'deg');
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.background = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 950);
    }
  }

  /* add to cart */
  const cartCount = document.getElementById('cartCount');
  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const rect = this.getBoundingClientRect();
      burstConfetti(rect.left + rect.width / 2, rect.top);
      const original = this.innerHTML;
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      cartCount.textContent = (parseInt(cartCount.textContent) + 1);
      cartCount.style.animation = 'none';
      requestAnimationFrame(() => cartCount.style.animation = 'badgeThrob 0.5s ease-in-out 2');
      setTimeout(() => { this.innerHTML = original; }, 1600);
    });
  });

  /* wishlist toggle */
  document.querySelectorAll('.wish').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const icon = this.querySelector('i');
      icon.classList.toggle('far');
      icon.classList.toggle('fas');
      this.style.color = icon.classList.contains('fas') ? '#FF5C8A' : '';
    });
  });

  /* countdown timer */
  let t = 24*3600;
  const hh = document.getElementById('hh'), mm = document.getElementById('mm'), ss = document.getElementById('ss');
  function tick() {
    const h = Math.floor(t/3600), m = Math.floor((t%3600)/60), s = t%60;
    hh.textContent = String(h).padStart(2,'0');
    mm.textContent = String(m).padStart(2,'0');
    ss.textContent = String(s).padStart(2,'0');
    t = t > 0 ? t - 1 : 24*3600;
  }
  tick(); setInterval(tick, 1000);

  /* newsletter */
  document.getElementById('newsletterForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const btn = this.querySelector('button');
    const rect = btn.getBoundingClientRect();
    burstConfetti(rect.left + rect.width/2, rect.top);
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Joined!';
    setTimeout(() => { btn.innerHTML = original; input.value = ''; }, 1800);
  });

  /* see-all placeholders */
  document.querySelectorAll('.see-all').forEach(a => a.addEventListener('click', e => e.preventDefault()));

  /* scroll reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

})();