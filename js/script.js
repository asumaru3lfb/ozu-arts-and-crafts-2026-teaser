document.addEventListener('DOMContentLoaded', () => {

  // ---------- header scroll shadow ----------
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10 ? '0 6px 24px rgba(0,0,0,.25)' : 'none';
  });

  // ---------- mobile menu ----------
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mainNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- language switch ----------
  const langSwitch = document.getElementById('langSwitch');
  const langButton = document.getElementById('langButton');
  const langOptions = document.getElementById('langOptions');
  const langCurrentLabel = document.getElementById('langCurrentLabel');
  const toast = document.getElementById('langToast');

  const readyMessages = {
    'zh-Hant': '繁體中文版は準備中です。ネイティブ翻訳の確定後に公開します。',
    'en': 'English version is coming soon.'
  };

  langButton.addEventListener('click', (e) => {
    e.stopPropagation();
    langSwitch.classList.toggle('open');
    langButton.setAttribute('aria-expanded', langSwitch.classList.contains('open'));
  });

  document.addEventListener('click', () => {
    langSwitch.classList.remove('open');
    langButton.setAttribute('aria-expanded', 'false');
  });

  let toastTimer;
  langOptions.querySelectorAll('li').forEach(li => {
    li.addEventListener('click', (e) => {
      e.stopPropagation();
      const lang = li.dataset.lang;
      const ready = li.dataset.ready === 'true';
      langSwitch.classList.remove('open');

      if (ready) {
        langCurrentLabel.textContent = li.textContent.trim();
        return;
      }
      showToast(readyMessages[lang] || '準備中です。');
    });
  });

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  // ---------- artist card image gallery ----------
  document.querySelectorAll('[data-gallery]').forEach(gallery => {
    const mainImg = gallery.querySelector('[data-gallery-img]');
    const thumbs = gallery.querySelectorAll('.card-gallery-thumb');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.stopPropagation();
        mainImg.src = thumb.dataset.src;
        thumbs.forEach(t => t.classList.toggle('is-active', t === thumb));
      });
    });
  });

  // ---------- artist carousel (Swiper) ----------
  if (window.Swiper) {
    new Swiper('.artist-swiper', {
      slidesPerView: 1.15,
      centeredSlides: true,
      spaceBetween: 24,
      keyboard: { enabled: true },
      pagination: { el: '.artist-pagination', clickable: true },
      navigation: { nextEl: '.artist-nav-next', prevEl: '.artist-nav-prev' },
      breakpoints: {
        960: { slidesPerView: 1.6, spaceBetween: 40 }
      },
      on: {
        setTranslate(swiper) {
          swiper.slides.forEach((slide, i) => {
            slide.style.opacity = i === swiper.activeIndex ? '1' : '.2';
          });
        }
      }
    });
  }

  // ---------- venue map / panel sync ----------
  const venuePins = document.querySelectorAll('.venue-pin');
  const venuePanelItems = document.querySelectorAll('.venue-panel-item');
  venuePins.forEach(pin => {
    pin.addEventListener('click', () => {
      const target = pin.dataset.venue;
      venuePins.forEach(p => p.classList.toggle('is-selected', p === pin));
      venuePanelItems.forEach(item => {
        item.classList.toggle('is-active', item.dataset.venuePanel === target);
      });
      const activeItem = document.querySelector(`.venue-panel-item[data-venue-panel="${target}"]`);
      if (activeItem && window.innerWidth < 960) {
        activeItem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  if (venuePins.length) venuePins[0].classList.add('is-selected');

  // ---------- event modal ----------
  const eventData = {
    normal: { title: '通常開放', date: '2026.10.10 sat – 10.25 sun', desc: '4会場を通常料金にて公開。会期中は毎日9:00〜17:00にご覧いただけます。' },
    night: { title: '夜間鑑賞', date: '2026.10.23 fri – 10.24 sat', desc: '17:30／18:30／19:30の3回開催（各回20名・要予約）。対象：大洲城・臥龍山荘・盤泉荘。夜間鑑賞は3施設共通パス ¥2,800、1施設 ¥1,100 を予定。' },
    tour: { title: '特別鑑賞ツアー', date: '会期中 各施設 8:00–9:00', desc: 'アーティスト・企画者による朝の特別案内。NIPPONIA HOTEL 大洲など宿泊施設と連携。料金は別途調整中です。' },
    bansen100: { title: '盤泉荘100周年記念イベント', date: '2026.10.17 sat – 10.18 sun', desc: '宵の盤泉荘（迂回バル連携）、出張簡易茶会、大正時代の服飾貸出など。' },
    workshop: { title: 'ワークショップ・トークショー', date: '日程調整中', desc: 'アーティストによるワークショップ、キュレーター・企画者によるトークショー。詳細は決まり次第公開します。' },
    stamp: { title: 'スタンプラリー', date: '会期中随時', desc: '4会場を巡るスタンプラリー。3施設以上達成で連携事業者プレゼント（詳細調整中）。' }
  };

  const eventModal = document.getElementById('eventModal');
  const eventModalTitle = document.getElementById('eventModalTitle');
  const eventModalDate = document.getElementById('eventModalDate');
  const eventModalDesc = document.getElementById('eventModalDesc');

  document.querySelectorAll('.event-card-9[data-event]').forEach(card => {
    card.addEventListener('click', () => {
      const data = eventData[card.dataset.event];
      if (!data) return;
      eventModalTitle.textContent = data.title;
      eventModalDate.textContent = data.date;
      eventModalDesc.textContent = data.desc;
      eventModal.classList.add('is-open');
      eventModal.setAttribute('aria-hidden', 'false');
    });
  });

  eventModal.querySelectorAll('[data-modal-close]').forEach(el => {
    el.addEventListener('click', closeEventModal);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeEventModal();
  });
  function closeEventModal() {
    eventModal.classList.remove('is-open');
    eventModal.setAttribute('aria-hidden', 'true');
  }

  // ---------- access tabs ----------
  const tabButtons = document.querySelectorAll('.access-tab-btn');
  const tabPanels = document.querySelectorAll('.access-tab-panel');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabButtons.forEach(b => {
        b.classList.toggle('is-active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      tabPanels.forEach(p => p.classList.toggle('is-active', p.dataset.tabPanel === target));
    });
  });

});
