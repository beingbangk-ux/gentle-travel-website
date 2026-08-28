const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.primary-nav');

menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'ปิดเมนู' : 'เปิดเมนู');
});

nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

// Local preview: keep future visa routes testable without opening a missing page.
document.querySelectorAll('.visa-destination').forEach((card) => {
  card.addEventListener('click', (event) => {
    const isLocalPreview = window.location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    if (!isLocalPreview) return;
    event.preventDefault();
    const route = card.dataset.futureRoute;
    const note = document.getElementById('visa-preview-note');
    note.textContent = `ลิงก์พร้อมใช้งาน: ${route} — หน้ารายละเอียดยังไม่ถูกสร้างในรอบนี้`;
  });
});

// Local preview: keep future Trust Bar routes clickable without opening missing pages.
document.querySelectorAll('.trust-item').forEach((item) => {
  item.addEventListener('click', (event) => {
    const isLocalPreview = window.location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    if (!isLocalPreview) return;
    event.preventDefault();
    const target = document.querySelector(item.dataset.localTarget);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const promotionData = (window.GENTLE_TRAVEL_PROMOTIONS || []).filter((promotion) => promotion.active);
const promotionTrack = document.getElementById('promotion-track');
const promotionCarousel = document.querySelector('.promotion-carousel');
const promotionDots = document.querySelector('.promotion-dots');
const promotionPrev = document.querySelector('.promotion-prev');
const promotionNext = document.querySelector('.promotion-next');
const promotionNote = document.getElementById('promotion-preview-note');
const promotionFallback = 'assets/promotions/promotion-fallback.svg';

if (promotionTrack && promotionData.length) {
  promotionTrack.innerHTML = promotionData.map((promotion, index) => `
    <a class="promotion-card" href="#promotions" data-promotion-route="${promotion.link}" aria-label="${promotion.title}: ${promotion.route}" aria-roledescription="slide">
      <div class="promotion-image">
        <img src="${promotion.image}" alt="ภาพตัวอย่างสำหรับ ${promotion.title}" loading="lazy">
        <span class="demo-badge">DEMO</span>
      </div>
      <div class="promotion-card-body">
        <p class="promotion-route">${promotion.route}</p>
        <h3>${promotion.title}</h3>
        <p class="promotion-description">${promotion.description}</p>
        <span class="promotion-detail">ดูรายละเอียด <span aria-hidden="true">→</span></span>
      </div>
    </a>
  `).join('');

  const promotionCards = [...promotionTrack.querySelectorAll('.promotion-card')];
  promotionCards.forEach((card) => {
    const image = card.querySelector('img');
    image.addEventListener('error', () => {
      if (!image.src.endsWith('promotion-fallback.svg')) image.src = promotionFallback;
    });
    card.addEventListener('click', (event) => {
      const isLocalPreview = window.location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(window.location.hostname);
      if (!isLocalPreview) return;
      event.preventDefault();
      promotionNote.textContent = `ลิงก์พร้อมใช้งาน: ${card.dataset.promotionRoute} — หน้ารายละเอียดยังไม่ถูกสร้างในรอบนี้`;
    });
  });

  let promotionIndex = 0;
  let autoplayTimer;
  let pointerStartX = null;
  let isPaused = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const visiblePromotions = () => window.matchMedia('(max-width: 600px)').matches ? 1 : window.matchMedia('(max-width: 900px)').matches ? 2 : 3;
  const maxPromotionIndex = () => Math.max(0, promotionCards.length - visiblePromotions());

  const buildPromotionDots = () => {
    promotionDots.innerHTML = '';
    for (let index = 0; index <= maxPromotionIndex(); index += 1) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'promotion-dot';
      dot.setAttribute('aria-label', `ไปยังชุดโปรโมชั่น ${index + 1}`);
      dot.addEventListener('click', () => {
        promotionIndex = index;
        updatePromotionCarousel();
        restartPromotionAutoplay();
      });
      promotionDots.appendChild(dot);
    }
  };

  const updatePromotionCarousel = () => {
    promotionIndex = Math.min(promotionIndex, maxPromotionIndex());
    const firstCard = promotionCards[0];
    const gap = Number.parseFloat(getComputedStyle(promotionTrack).gap) || 0;
    const offset = promotionIndex * (firstCard.getBoundingClientRect().width + gap);
    promotionTrack.style.transform = `translate3d(-${offset}px, 0, 0)`;
    promotionCards.forEach((card, index) => {
      const isVisible = index >= promotionIndex && index < promotionIndex + visiblePromotions();
      card.tabIndex = isVisible ? 0 : -1;
      card.setAttribute('aria-hidden', String(!isVisible));
    });
    [...promotionDots.children].forEach((dot, index) => {
      const isCurrent = index === promotionIndex;
      dot.classList.toggle('active', isCurrent);
      dot.setAttribute('aria-current', isCurrent ? 'true' : 'false');
    });
  };

  const movePromotion = (direction) => {
    const maxIndex = maxPromotionIndex();
    promotionIndex = direction > 0
      ? (promotionIndex >= maxIndex ? 0 : promotionIndex + 1)
      : (promotionIndex <= 0 ? maxIndex : promotionIndex - 1);
    updatePromotionCarousel();
  };

  const stopPromotionAutoplay = () => window.clearInterval(autoplayTimer);
  const startPromotionAutoplay = () => {
    stopPromotionAutoplay();
    if (!reduceMotion.matches && !isPaused && maxPromotionIndex() > 0) autoplayTimer = window.setInterval(() => movePromotion(1), 6000);
  };
  const restartPromotionAutoplay = () => {
    stopPromotionAutoplay();
    startPromotionAutoplay();
  };

  promotionPrev.addEventListener('click', () => { movePromotion(-1); restartPromotionAutoplay(); });
  promotionNext.addEventListener('click', () => { movePromotion(1); restartPromotionAutoplay(); });
  promotionCarousel.addEventListener('mouseenter', () => { isPaused = true; stopPromotionAutoplay(); });
  promotionCarousel.addEventListener('mouseleave', () => { isPaused = false; startPromotionAutoplay(); });
  promotionCarousel.addEventListener('focusin', () => { isPaused = true; stopPromotionAutoplay(); });
  promotionCarousel.addEventListener('focusout', (event) => {
    if (promotionCarousel.contains(event.relatedTarget)) return;
    isPaused = false;
    startPromotionAutoplay();
  });
  promotionCarousel.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') return;
    pointerStartX = event.clientX;
    isPaused = true;
    stopPromotionAutoplay();
  });
  promotionCarousel.addEventListener('pointerup', (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    if (Math.abs(distance) > 45) movePromotion(distance < 0 ? 1 : -1);
    pointerStartX = null;
    isPaused = false;
    startPromotionAutoplay();
  });
  promotionCarousel.addEventListener('pointercancel', () => {
    pointerStartX = null;
    isPaused = false;
    startPromotionAutoplay();
  });

  let promotionResizeTimer;
  window.addEventListener('resize', () => {
    window.clearTimeout(promotionResizeTimer);
    promotionResizeTimer = window.setTimeout(() => {
      buildPromotionDots();
      updatePromotionCarousel();
      restartPromotionAutoplay();
    }, 120);
  });
  reduceMotion.addEventListener?.('change', restartPromotionAutoplay);
  buildPromotionDots();
  updatePromotionCarousel();
  startPromotionAutoplay();
}

document.querySelectorAll('[data-local-promotion-link]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const isLocalPreview = window.location.protocol === 'file:' || ['127.0.0.1', 'localhost'].includes(window.location.hostname);
    if (!isLocalPreview) return;
    event.preventDefault();
    promotionNote.textContent = 'ลิงก์ /promotions พร้อมสำหรับหน้ารวมโปรโมชั่นในอนาคต';
  });
});
