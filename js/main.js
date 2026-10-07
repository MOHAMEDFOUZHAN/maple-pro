/**
 * MAPLE PRO & MAPLE CONNECT — MINIMAL PREMIUM INTERACTION ENGINE
 * Fast, Lightweight, Zero-Bloat
 */

document.addEventListener('DOMContentLoaded', () => {
  initFallingLeaves();
  initCounters();
  initConsultationModal();
});

/* --------------------------------------------------------------------------
   1. LUXURY FALLING MAPLE LEAVES
   -------------------------------------------------------------------------- */
function initFallingLeaves() {
  const container = document.getElementById('leaves-container');
  if (!container) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const colors = [
    'rgba(217, 164, 65, 0.65)',   // pure champagne gold
    'rgba(255, 216, 90, 0.7)',    // bright golden yellow
    'rgba(211, 32, 39, 0.55)',    // classic canadian maple red
    'rgba(230, 126, 34, 0.65)',   // warm autumn orange
    'rgba(179, 126, 36, 0.6)'     // antique brass gold
  ];

  const isMobile = window.innerWidth <= 768;
  const intervalTime = isMobile ? 900 : 500;
  let activeLeaves = 0;
  const maxLeaves = isMobile ? 12 : 22;

  function createLeaf() {
    if (document.hidden || activeLeaves >= maxLeaves) return;

    const leaf = document.createElement('i');
    leaf.className = 'fa-brands fa-canadian-maple-leaf leaf';
    leaf.style.left = (Math.random() * 95) + 'vw';

    const duration = Math.random() * 4 + 7; // 7s to 11s slow majestic drift
    leaf.style.animation = `fall ${duration}s linear forwards`;
    
    const size = Math.random() * 16 + 14; // 14px to 30px
    leaf.style.fontSize = size + 'px';
    leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
    leaf.style.animationDelay = (Math.random() * 1) + 's';

    container.appendChild(leaf);
    activeLeaves++;

    setTimeout(() => {
      leaf.remove();
      activeLeaves--;
    }, (duration + 1.5) * 1000);
  }

  setInterval(createLeaf, intervalTime);
  for (let i = 0; i < (isMobile ? 4 : 8); i++) {
    setTimeout(createLeaf, i * 200);
  }
}

/* --------------------------------------------------------------------------
   2. HERITAGE 11 COUNTER ANIMATION
   -------------------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-animate');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 11;
        let count = 0;
        const duration = 1200;
        const stepTime = Math.max(Math.floor(duration / target), 40);

        const timer = setInterval(() => {
          count += 1;
          el.textContent = count;
          if (count >= target) {
            clearInterval(timer);
            el.textContent = target;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counterElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   3. CONSULTATION MODAL & WHATSAPP DIRECT DISPATCH
   -------------------------------------------------------------------------- */
function initConsultationModal() {
  const modal = document.getElementById('consultation-modal');
  const openButtons = document.querySelectorAll('.open-consultation-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const form = document.getElementById('consultation-form');

  if (!modal) return;

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // Handle Form Submission -> WhatsApp Direct
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="client_name"]')?.value || 'Client';
      const phone = form.querySelector('[name="client_phone"]')?.value || '';
      const interest = form.querySelector('[name="brand_interest"]')?.value || 'Maple Pro & Maple Connect';
      const notes = form.querySelector('[name="client_notes"]')?.value || 'Interested in consultation';

      const whatsappText = encodeURIComponent(
        `Hello Maple Technology Team,\n\nI would like to request an executive conversation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Interest:* ${interest}\n*Requirements:* ${notes}\n\nLooking forward to speaking with your leadership team.`
      );

      // Official WhatsApp dispatch (+91 99948 75065)
      const whatsappUrl = `https://wa.me/919994875065?text=${whatsappText}`;

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Connecting to Maple Leadership...';
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          submitBtn.innerHTML = 'Consultation Dispatched';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            closeModal();
            form.reset();
          }, 1400);
        }, 500);
      }
    });
  }
}
