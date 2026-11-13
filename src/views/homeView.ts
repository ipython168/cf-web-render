import { loadPosts } from './home';
import { handleScrollFade } from '../utils/animations';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const renderHome = (siteConfig: any, t: any) => {
  const app = document.getElementById('app')!;
  
  // 1. 將原本 renderHome 入面嗰大段 HTML 搬過嚟
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

  // 2. 將 Hero 背景圖切換、視差效果搬過嚟
  const updateHeroBg = () => {
    const hero = document.querySelector('.hero-section') as HTMLElement;
    if (!hero) return;
    
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      hero.style.backgroundImage = `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/images/hero/hero-bg-dark.jpg')`;
    } else {
      hero.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/images/hero/hero-bg-light.jpg')`;
    }
  };

  updateHeroBg();

  document.querySelectorAll('.theme-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      setTimeout(updateHeroBg, 50); 
    });
  });

  const heroSection = document.querySelector('.hero-section') as HTMLElement;
  if (window.innerWidth > 768 && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = -(window.innerWidth / 2 - e.pageX) / 15;
      const y = -(window.innerHeight / 2 - e.pageY) / 15;
      heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
  }

  const navbar = document.querySelector('.navbar') as HTMLElement;
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight - 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. 載入文章同 GSAP 數字動畫
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
