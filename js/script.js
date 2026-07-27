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

});
