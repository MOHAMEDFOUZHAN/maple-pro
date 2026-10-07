/**
 * MAPLE PRO & MAPLE CONNECT — CORPORATE INTERACTION ENGINE
 * Premium Animation, Canvas Particle Constellation & Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initFallingLeaves();
  initNavigation();
  initCounters();
  initAIFlowVisualizer();
  initMarketingPipeline();
  initContactModals();
  initScrollAnimations();
});

/* --------------------------------------------------------------------------
   1. PARTICLE CONSTELLATION & GOLD MESH CANVAS
   -------------------------------------------------------------------------- */
function initParticleCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const numParticles = Math.min(Math.floor((width * height) / 22000), 55);

  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.8 + 0.8,
      color: Math.random() > 0.4 ? 'rgba(217, 164, 65, ' : 'rgba(0, 163, 255, ',
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  let mouseX = width / 2;
  let mouseY = height / 2;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          const lineAlpha = (1 - dist / 140) * 0.14;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(217, 164, 65, ${lineAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
      }
    }

    // Draw particle nodes
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Mouse influence
      const mdx = mouseX - p.x;
      const mdy = mouseY - p.y;
      const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mdist < 120) {
        p.x -= (mdx / mdist) * 0.5;
        p.y -= (mdy / mdist) * 0.5;
      }

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${p.color}${p.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'rgba(217, 164, 65, 0.4)';
      ctx.fill();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* --------------------------------------------------------------------------
   2. NAVIGATION & MOBILE DRAWER
   -------------------------------------------------------------------------- */
function initNavigation() {
  const nav = document.querySelector('.site-nav');
  const toggle = document.querySelector('.mobile-toggle');
  const menu = document.querySelector('.nav-menu');
  const links = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('mobile-open');
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('mobile-open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   3. ANIMATED NUMBER COUNTERS
   -------------------------------------------------------------------------- */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-animate');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10) || 11;
        const suffix = el.getAttribute('data-suffix') || '';
        let count = 0;
        const duration = 1600;
        const stepTime = Math.max(Math.floor(duration / target), 30);

        const timer = setInterval(() => {
          count += 1;
          el.textContent = `${count}${suffix}`;
          if (count >= target) {
            clearInterval(timer);
            el.textContent = `${target}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE AI ARCHITECTURE FLOW VISUALIZER
   -------------------------------------------------------------------------- */
function initAIFlowVisualizer() {
  const steps = document.querySelectorAll('.ai-step-row');
  if (!steps.length) return;

  let currentIndex = 0;
  let autoTimer;

  function setActiveStep(index) {
    steps.forEach((step, idx) => {
      if (idx === index) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });
  }

  function startCycle() {
    autoTimer = setInterval(() => {
      currentIndex = (currentIndex + 1) % steps.length;
      setActiveStep(currentIndex);
    }, 2800);
  }

  steps.forEach((step, idx) => {
    step.addEventListener('click', () => {
      clearInterval(autoTimer);
      currentIndex = idx;
      setActiveStep(currentIndex);
      startCycle();
    });
  });

  setActiveStep(0);
  startCycle();
}

/* --------------------------------------------------------------------------
   5. INTERACTIVE MARKETING GROWTH PIPELINE
   -------------------------------------------------------------------------- */
function initMarketingPipeline() {
  const funnelSteps = document.querySelectorAll('.growth-funnel-step');
  if (!funnelSteps.length) return;

  funnelSteps.forEach((step) => {
    step.addEventListener('mouseenter', () => {
      funnelSteps.forEach(s => s.style.opacity = '0.65');
      step.style.opacity = '1';
    });

    step.addEventListener('mouseleave', () => {
      funnelSteps.forEach(s => s.style.opacity = '1');
    });
  });
}

/* --------------------------------------------------------------------------
   6. CONTACT MODAL & CONSULTATION ROUTER (WHATSAPP & PHONE)
   -------------------------------------------------------------------------- */
function initContactModals() {
  const openButtons = document.querySelectorAll('.open-consultation-btn');
  const modal = document.getElementById('consultation-modal');
  const closeBtn = document.querySelector('.modal-close-btn');

  if (modal) {
    openButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Handle Quick Contact Forms (Direct submission + WhatsApp dispatch)
  const forms = document.querySelectorAll('.contact-inquiry-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="client_name"]')?.value || 'Client';
      const phone = form.querySelector('[name="client_phone"]')?.value || '';
      const brandInterest = form.querySelector('[name="brand_interest"]')?.value || 'Maple Pro & Maple Connect Solutions';
      const notes = form.querySelector('[name="client_notes"]')?.value || 'Interested in consultation';

      const whatsappText = encodeURIComponent(
        `Hello Maple Technology Team,\n\nI would like to request an executive consultation.\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Interest:* ${brandInterest}\n*Requirements:* ${notes}\n\nLooking forward to speaking with your leadership team.`
      );

      // Official WhatsApp dispatch to primary number +91 99948 75065
      const whatsappUrl = `https://wa.me/919994875065?text=${whatsappText}`;
      
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Connecting to Maple Executive...';
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          submitBtn.innerHTML = 'Consultation Dispatched';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            if (modal) modal.classList.remove('active');
            document.body.style.overflow = '';
          }, 1500);
        }, 600);
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. SCROLL-BASED REVEAL OBSERVER
   -------------------------------------------------------------------------- */
function initScrollAnimations() {
  const animElements = document.querySelectorAll('[data-reveal]');
  if (!animElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.15 });

  animElements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   8. LUXURY FALLING MAPLE LEAVES ENGINE
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
    'rgba(179, 126, 36, 0.6)',    // antique brass gold
    'rgba(192, 57, 43, 0.5)'      // deep wine crimson
  ];

  const isMobile = window.innerWidth <= 768;
  const intervalTime = isMobile ? 850 : 450;
  let activeLeaves = 0;
  const maxLeaves = isMobile ? 14 : 26;

  function createLeaf() {
    if (document.hidden || activeLeaves >= maxLeaves) return;

    const leaf = document.createElement('i');
    leaf.className = 'fa-brands fa-canadian-maple-leaf leaf';
    leaf.style.left = (Math.random() * 96) + 'vw';

    const duration = Math.random() * 5 + 6; // 6s to 11s slow majestic drift
    leaf.style.animation = `fall ${duration}s linear forwards`;
    
    const size = Math.random() * 20 + 15; // 15px to 35px
    leaf.style.fontSize = size + 'px';
    leaf.style.color = colors[Math.floor(Math.random() * colors.length)];
    leaf.style.animationDelay = (Math.random() * 1.5) + 's';

    container.appendChild(leaf);
    activeLeaves++;

    setTimeout(() => {
      leaf.remove();
      activeLeaves = Math.max(0, activeLeaves - 1);
    }, (duration + 2) * 1000);
  }

  // Periodic creation
  setInterval(createLeaf, intervalTime);

  // Initial gentle seed
  const initialCount = isMobile ? 4 : 8;
  for (let i = 0; i < initialCount; i++) {
    setTimeout(createLeaf, i * 200);
  }
}

