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

  // ---------- artist data (used by the detail modal) ----------
  const artistData = {
    kangls: {
      name: '康力升', nameEn: 'Kang Li Sheng', venue: '大洲城',
      nationality: '台湾', profession: 'アーティスト', specialty: '紙繊維彫刻、光と知覚の関係性',
      works: ['A《芯柱》', 'B《肱川流れ》', 'C《野面之光》', 'D《亀城の守り｜九重の光》'],
      concept: '紙繊維と光によって、大洲城の建築構造、土地の記憶、守護の象徴を転化。紙の繊維、孔、流動感が、この城が時間の中で支えられ、修復され、受け継がれてきた精神に呼応している。',
      bio: '制作の過程において、「紙」は媒体であると同時に、知覚と修復のための手立てでもある。紙繊維による彫刻を表現言語とし、素材・光・知覚の関係を探っている。',
      education: ['2023年 國立台南藝術大學大学院 応用芸術研究科（繊維専攻）修了 修士（芸術）', '2013年 華梵大學 工業デザイン学科 卒業 学士（デザイン）'],
      history: ['2025年 Maison & Objet（フランス・パリ）', '2024-2025年 Craft Trend Fair（韓国・ソウル）', '2018年 ユニコーンアートフェア「紙の個性」（中国・北京）'],
      awardsLabel: '受賞歴',
      awards: ['2025年 TCA台湾工芸賞 創作賞（工芸デザイン部門）入選'],
      images: ['images/artists/kangls-1.jpg', 'images/artists/kangls-2.jpg', 'images/artists/kangls-3.jpg']
    },
    dangami: {
      name: '團上祐志', nameEn: 'Dangami Yushi', venue: '臥龍山荘',
      nationality: '日本', profession: 'アーティスト／文化起業家／ポリネーター', specialty: '蜜蜂と自然素材を用いた作品、環境と生の再接続',
      works: ['A《壱是の間》', 'B《清吹の間》', 'C《霞月の間》', 'D《不老庵ふり》'],
      concept: '臥龍山荘の歴史空間と対話する形で、蝋という自然素材を用いた作品を展開。蜜蝋・木蝋で制作した壺作品を展示し、時代や素材、土地の文化を横断しながら、アートとクラフトの境界を問い、臥龍山荘と静かに呼応する展示。',
      bio: '1995年愛媛県生まれ。蜂の巣を素材に、蜜蜂と人類の古代からの関係を主題とする作品の制作を通じて、生と環境の再接続と治癒を探る。大洲新谷藩主・加藤家の後裔として、歴史的邸宅「團上邸麗楓館（Dangami House）」の運営にも携わり、地域の歴史・文化資源の継承と活用に取り組んでいる。',
      education: ['2019年 武蔵野美術大学 油絵学科油絵専攻 卒業'],
      history: ['2026年「世界の語り手 小さきものの崇高」（東京・神宮前）', '2026年「The conduit of life 生の流路」（東京・南青山）', '2025年「The double garden ―二つの庭―」（東京・銀座）'],
      awardsLabel: '受賞歴',
      awards: ['Young Creators Award 2016-17 準グランプリ・審査員特別賞', '第78回東光展 入選・入賞・新人賞（東京都美術館）'],
      images: ['images/artists/dangami-1.jpg', 'images/artists/dangami-2.jpg', 'images/artists/dangami-3.jpg']
    },
    changpc: {
      name: '張博傑', nameEn: 'Chang Po Chieh', venue: '盤泉荘',
      nationality: '台湾', profession: 'ガラスアーティスト', specialty: 'ステンドグラス、空間演出',
      works: ['インスタレーション《入林》'],
      concept: '台湾・昭和期・欧米初期のガラス表現を横断的に取り入れた作品。鑑賞者が作品に触れながら、「音の風景（サウンドスケープ）」を想像し、感覚的に空間へ参与する体験を想定。大洲地域で採取した枯れ枝や樹木を構造体として使用し、その上をガラスの葉が這うように展開。大洲の土地で採集した環境音を取り入れ、地域性と作品空間を接続する。',
      bio: '2018年に真真鑲嵌玻璃研究所（zhēnzhēn Stained glass lab）を設立。伝統的なステンドグラス技法と現代表現を融合させ、「ゆっくり」「大切に」「創造する」といった現代に失われつつある美意識を作品に込めている。',
      education: ['2016年 国立台北芸術大学新メディア 修士卒業', '2012年 実践大学 建築学科 卒業'],
      history: ['2026年「内光」（台湾・台北）', '2025年「Stained Connection 鑲嵌關係」（台湾・台北）', '2025年 tavon_kyoto（日本・京都）'],
      awardsLabel: '受賞歴',
      awards: ['2024年 Taiwan Design BEST 100 選出', '2023年 台湾工芸創作賞 入選', '2021年 台湾金点設計賞 受賞'],
      images: ['images/artists/changpc-1.jpg', 'images/artists/changpc-2.jpg', 'images/artists/changpc-3.jpg']
    },
    nessim: {
      name: 'ネシム・コーエン', nameEn: 'Nessim Cohen', venue: '旧平田邸',
      nationality: 'フランス', profession: 'アーティスト／バイオデザイナー', specialty: '茶道精神、瞑想、生と自然、植物との関係性',
      works: ['Garden of Tea - Chanoyu that becomes life itself'],
      concept: '菌類と植物で形作られた茶会へゲストを招待。濃茶や薄茶、そして主菓子を愉しむひとときの中で、「孤高の庭（マイコ・ボックス）」を中心に執り行われる儀式的体験。ボックスは「結界」であり、主客が交わり、響き合う境界の空間となる。宴の終わりには、茶の木やいくつかの植物の種が含まれた「シードオーブ（種の球）」がゲストのもとへ運ばれ、ゲストはボックスを自宅へと持ち帰り、茶会のなかで蒔かれた植物たちを、儀式のように慈しみ育てる時間へと続いていく。',
      bio: '日本とアメリカを往来しながら活動するフランス人アーティスト。10年以上にわたり日本茶道を学び、陶芸や書道の研鑽を重ねる中で、身体性を伴う実践を通じ、感覚・儀式・瞑想を融合した表現を展開している。',
      education: ['ソルボンヌ大学 哲学修士課程修了', 'Sciences Po Paris 政治理論修士課程修了'],
      history: ['2026年「De Natura Statuum」（フランス・パリ）', '2026年「Chinju no Mori」（日本・東京・渋谷）', '2026年「Acoustics of Seeds」（台湾・台北）'],
      awardsLabel: '主な活動',
      awards: ['2025-2026年 NHK World『New Japonism』出演', '2025年 慶應義塾大学大学院 KMD 登壇', '2020年-現在 Maastricht Academy of Architecture 客員講師'],
      images: ['images/artists/nessim-1.jpg', 'images/artists/nessim-2.jpg', 'images/artists/nessim-3.jpg']
    }
  };

  // ---------- artist modal ----------
  const artistModal = document.getElementById('artistModal');
  const artistModalBody = artistModal.querySelector('[data-artist-modal-body]');
  const artistModalGallery = artistModal.querySelector('[data-gallery]');
  const artistModalMainImg = artistModal.querySelector('[data-gallery-img]');
  const artistModalThumbs = artistModal.querySelector('[data-artist-thumbs]');

  document.querySelectorAll('.artist-tile[data-artist]').forEach(tile => {
    tile.addEventListener('click', () => {
      const data = artistData[tile.dataset.artist];
      if (!data) return;

      artistModalBody.innerHTML = `
        <p class="card-venue-tag">${data.venue}</p>
        <h3>${data.name}</h3>
        <span class="card-name-en">${data.nameEn}</span>
        <dl class="card-meta">
          <div><dt>国籍</dt><dd>${data.nationality}</dd></div>
          <div><dt>職業</dt><dd>${data.profession}</dd></div>
          <div><dt>専門分野</dt><dd>${data.specialty}</dd></div>
        </dl>
        <ul class="work-list">${data.works.map(w => `<li>${w}</li>`).join('')}</ul>
        <p class="card-concept">${data.concept}</p>
        <h4 class="card-subhead">プロフィール</h4>
        <p class="card-bio">${data.bio}</p>
        <h4 class="card-subhead">学歴</h4>
        <ul class="card-list">${data.education.map(e => `<li>${e}</li>`).join('')}</ul>
        <h4 class="card-subhead">主な展示歴</h4>
        <ul class="card-list">${data.history.map(h => `<li>${h}</li>`).join('')}</ul>
        <h4 class="card-subhead">${data.awardsLabel}</h4>
        <ul class="card-list">${data.awards.map(a => `<li>${a}</li>`).join('')}</ul>
      `;

      artistModalMainImg.src = data.images[0];
      artistModalMainImg.alt = data.name;
      artistModalThumbs.innerHTML = data.images.map((src, i) =>
        `<button class="card-gallery-thumb${i === 0 ? ' is-active' : ''}" data-src="${src}" style="background-image:url('${src}')" aria-label="写真${i + 1}"></button>`
      ).join('');
      artistModalThumbs.querySelectorAll('.card-gallery-thumb').forEach(thumb => {
        thumb.addEventListener('click', () => {
          artistModalMainImg.src = thumb.dataset.src;
          artistModalThumbs.querySelectorAll('.card-gallery-thumb').forEach(t => t.classList.toggle('is-active', t === thumb));
        });
      });

      artistModal.classList.add('is-open');
      artistModal.setAttribute('aria-hidden', 'false');
    });
  });

  artistModal.querySelectorAll('[data-artist-modal-close]').forEach(el => {
    el.addEventListener('click', () => {
      artistModal.classList.remove('is-open');
      artistModal.setAttribute('aria-hidden', 'true');
    });
  });

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
    opening: { title: 'オープニングレセプション＆アーティストトーク', date: '2026.10.10 sat', desc: 'フェスティバルの開幕を飾る特別セッション。国内外アーティストが一堂に会し、制作プロセスや「知覚の変容」について語ります。' },
    ukaibar: { title: '辻回バル／U-KAI BAR', date: '2026.10.10 sat – 10.12 mon', desc: '肱川沿いのほとりに、期間限定でオープンするバー。地元食材やクラフトフードとともに、アーティストとの交流を深めます。' },
    nightview: { title: '大洲城 夜間特別鑑賞会', date: '2026.10.24 sat', desc: '普段立ち入ることのない夜の大洲城を舞台に、篝火と月あかりのコントラストの中、選りすぐりの作品を鑑賞します。' },
    crosstalk: { title: 'レジデンス・アーティスト・クロストーク', date: '2026.10.18 sun', desc: '台湾と日本の作家がそれぞれの視点で、アジアの工芸、そして現代美術における「ローカリティ」について語り合います。' },
    textileworkshop: { title: '大洲の素材でつくる織物ワークショップ', date: '2026.10.17 sat', desc: '大洲で育つ天然素材を使い、豊かな自然の恵みを手仕事で編み出す体験プログラム。' },
    closing: { title: 'クロージング・アンビエントパフォーマンス', date: '2026.10.25 sun', desc: '最終日は環境音とアーティストのパフォーマンスが共演する音の演出で、閉幕の刻を静かに彩ります。' }
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
    if (e.key === 'Escape') {
      closeEventModal();
      artistModal.classList.remove('is-open');
      artistModal.setAttribute('aria-hidden', 'true');
    }
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
