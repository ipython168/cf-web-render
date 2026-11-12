import './style.css';
import { initTheme } from './utils/theme';
import { initAnimations, handleScrollFade } from './utils/animations';
import { loadPosts } from './views/home';
import { renderApp } from './views/post';
import { renderArchive } from './views/archive';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// === 1. 漢堡選單開關 ===
const menuBtn = document.getElementById('menu-btn')!;
const closeBtn = document.getElementById('close-btn')!;
const sidebar = document.getElementById('sidebar')!;
const overlay = document.getElementById('overlay')!;

const openSidebar = () => { sidebar.classList.add('open'); overlay.classList.add('active'); };
const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// === 2. 初始化 Theme ===
initTheme();
initAnimations();

// === 3. 全局變數 ===
let currentLang = localStorage.getItem('lang') || 'zh';
let siteConfig: any = null;
let langData: any = null;

// === 4. 渲染首頁 ===
// === 新增：更新 Sidebar 文字 ===
const updateSidebar = (t: any) => {
  // 更新主題設定同語言標籤
  document.getElementById('theme-title')!.textContent = t.sidebar?.themeTitle || "主題設定";
  document.getElementById('lang-label')!.textContent = t.sidebar?.langLabel || "語言";
  
  // 更新選單連結：直接由 siteConfig 讀取，保證 F5 都一定有
  const sidebarLinks = document.querySelector('.sidebar-links')!;
  if (t.nav) {
    sidebarLinks.innerHTML = `
      <a href="#">${t.nav.about}</a>
      <a href="#">${t.nav.news}</a>
      <a href="#">${t.nav.help}</a>
      <a href="#">${t.nav.support}</a>
    `;
  }
};
const renderHome = () => {
  const t = langData[currentLang];
  const app = document.getElementById('app')!;
  
 
  app.innerHTML = `
    <div id="home-view">
      <section class="hero-section">
        <div class="hero-content fade-in" id="hero-content">
          <h1>${t.hero.title}</h1>
          <p>${t.hero.subtitle}</p>
          <div class="hero-btns"><a href="${siteConfig.hero.buttonLink}" class="btn-primary">${t.hero.buttonText}</a></div>
        </div>
      </section>
      <section id="features" class="feature-section fade-in">
        <div class="container">
          <div class="feature-text">
            <h2 class="fade-in">${t.sections.featuresTitle}</h2>
            <p class="fade-in">${t.sections.featuresDesc}</p>
          </div>
          <div class="feature-visual fade-in">
            <img src="${siteConfig.sections.featureImage}" alt="Feature" class="feature-img">
          </div>
        </div>
      </section>
      <section id="stats" class="stats-section fade-in">
        <div class="container">
          <h2 class="fade-in">${t.stats.title}</h2>
          <div class="stats-grid">
            <div class="stat-card"><h3 class="stat-number" id="stat-win">0</h3><p>${t.stats.winRate}</p></div>
            <div class="stat-card"><h3 class="stat-number" id="stat-trades">0</h3><p>${t.stats.totalTrades}</p></div>
            <div class="stat-card"><h3 class="stat-number" id="stat-dd">0</h3><p>${t.stats.maxDrawdown}</p></div>
            <div class="stat-card"><h3 class="stat-number" id="stat-return">0</h3><p>${t.stats.totalReturn}</p></div>
          </div>
        </div>
      </section>
      <section id="latest-posts" class="posts-section fade-in">
        <div class="container">
          <h2 class="fade-in clickable-title"><a href="#archive">${t.sections.postsTitle}</a></h2>
          <div class="posts-grid" id="posts-grid"></div>
        </div>
      </section>
      <footer class="site-footer fade-in">
        <div class="container">
          <div class="footer-content fade-in">
            <div class="footer-brand">
              <h3><img src="${siteConfig.logoImage}" alt="Logo" class="logo-img-footer"></h3>
              <p>${t.footer.brandDesc}</p>
            </div>
            <div class="footer-links">
              <h4>${t.footer.quickLinksTitle}</h4>
              ${siteConfig.footer.quickLinks.map((link: any) => `<a href="${link.url}">${link.name}</a>`).join('')}
            </div>
            <div class="footer-contact">
              <h4>${t.footer.contactTitle}</h4>
              <p>${siteConfig.footer.contact.email}</p>
              <p>${siteConfig.footer.contact.support}</p>
            </div>
          </div>
          <div class="footer-bottom"><p>© ${new Date().getFullYear()} ${siteConfig.siteName}. All rights reserved.</p></div>
        </div>
      </footer>
    </div>
  `;


  // 👇👇👇 係呢個位開始加 👇👇👇
  // 1. 新增：根據主題切換 Hero 背景圖
  const updateHeroBg = () => {
    const hero = document.querySelector('.hero-section') as HTMLElement;
    if (!hero) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      hero.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/hero-bg-dark.jpg')`;
    } else {
      hero.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('/hero-bg-light.jpg')`;
    }
  };

  // 初始化時執行一次
  updateHeroBg();

  // 監聽主題切換按鈕
  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateHeroBg, 50); 
    });
  });
  
  // 👈 新增：Hero 滑鼠視差效果
  const heroSection = document.querySelector('.hero-section') as HTMLElement;
  if (window.innerWidth > 768 && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      // 改為正數，而且除以 15 (之前係 30) 令郁動幅度大啲  
      const x = -(window.innerWidth / 2 - e.pageX) / 15;
      const y = -(window.innerHeight / 2 - e.pageY) / 15;
      heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
  }


  loadPosts().then(() => {
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
    ScrollTrigger.getAll().forEach(t => t.kill());
    fetch('/stats.json').then(res => res.json()).then(stats => {
      const statData = [
        { id: 'stat-win', target: stats.win_rate, suffix: '%' },
        { id: 'stat-trades', target: stats.total_trades, suffix: '' },
        { id: 'stat-dd', target: stats.max_drawdown, suffix: '%' },
        { id: 'stat-return', target: stats.total_return, suffix: '%' }
      ];
      statData.forEach(item => {
        const el = document.getElementById(item.id)!;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: item.target, duration: 2, ease: "power2.out",
          scrollTrigger: { trigger: "#stats", start: "top 80%" },
          onUpdate: () => el.textContent = Math.round(obj.val).toString() + item.suffix
        });
      });
    });
  });
};

// === 5. 統一 Router ===
const handleRouting = async () => {
  if (!siteConfig || !langData) return;
  
  const hash = window.location.hash;
  const app = document.getElementById('app')!;
  
  // 每次切換頁面，先清空 app，避免舊事件干擾
  app.innerHTML = '';
  // 👈 每次轉頁或者 F5，都強制更新 Sidebar
  updateSidebar(langData[currentLang]);

  if (hash === '#archive') {
    await renderArchive(langData[currentLang]);
  } else if (hash.startsWith('#post/')) {
    await loadPosts(); // 確保文章數據已載入
    renderApp();
  } else {
    renderHome();
  }
};

// === 6. 語言切換 ===
const setLanguage = (lang: string) => {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if ((btn as HTMLElement).dataset.lang === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  handleRouting(); // 重新觸發當前頁面渲染
};

// === 7. 啟動 ===
const initSite = async () => {
  try {
    const [configRes, langRes] = await Promise.all([
      fetch('/site-config.json'),
      fetch('/lang.json')
    ]);
    siteConfig = await configRes.json();
    langData = await langRes.json();

    document.title = siteConfig.siteTitle;
    const logoImg = document.querySelector('.logo-img') as HTMLImageElement;
    if (logoImg) logoImg.src = siteConfig.logoImage;
    
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = siteConfig.BrandmarkImage || siteConfig.logoImage;
    document.head.appendChild(favicon);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = (e.target as HTMLElement).dataset.lang!;
        setLanguage(lang);
      });
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      if ((btn as HTMLElement).dataset.lang === currentLang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // 第一次入嚟，觸發 Router
    handleRouting();

    // 👈 新增：載入完成後，移除 loading class，顯示畫面
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);


  } catch (err) {
    console.error("載入失敗", err);
  }
};

initSite();

// 監聽網址變化同 Scroll
window.addEventListener('hashchange', handleRouting);
window.addEventListener('scroll', handleScrollFade);