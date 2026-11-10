import './style.css';
import { initTheme } from './utils/theme';
import { initAnimations, handleScrollFade } from './utils/animations';
import { loadPosts } from './views/home';
import { renderApp } from './views/post';

// === 1. 漢堡選單開關 ===
const menuBtn = document.getElementById('menu-btn')!;
const closeBtn = document.getElementById('close-btn')!;
const sidebar = document.getElementById('sidebar')!;
const overlay = document.getElementById('overlay')!;

const openSidebar = () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
};
const closeSidebar = () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
};

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// === 2. 初始化 Theme 與 視差動畫 ===
initTheme();
initAnimations();

// === 3. 動態加載網站設定並渲染 ===
const initSite = async () => {
  try {
    const res = await fetch('/site-config.json');
    const config = await res.json();

    // 更新瀏覽器標題
    document.title = config.siteTitle;

    // 更新 Navbar Logo (只改字，圖暫時用死圖)
    const logoText = document.querySelector('.logo-text') as HTMLElement;
    if (logoText) logoText.textContent = config.siteName;

    // 更新 Sidebar 選單
    const sidebarLinks = document.querySelector('.sidebar-links')!;
    sidebarLinks.innerHTML = config.navLinks.map((link: any) => 
      `<a href="${link.url}">${link.name}</a>`
    ).join('');

    // 生成首頁 HTML
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.innerHTML = `
      <div id="home-view">
        <section class="hero-section">
          <div class="hero-content fade-in" id="hero-content">
            <h1>${config.hero.title}</h1>
            <p>${config.hero.subtitle}</p>
            <div class="hero-btns"><a href="${config.hero.buttonLink}" class="btn-primary">${config.hero.buttonText}</a></div>
          </div>
        </section>

        <section id="features" class="feature-section fade-in">
          <div class="container">
            <div class="feature-text">
              <h2 class="fade-in">隨時掌握<br>市場最新動態</h2>
              <p class="fade-in">支援即時回測數據、歷史圖表顯示。無論你用電腦定手機，都可以快速查閱策略表現。</p>
            </div>
            <div class="feature-visual fade-in"><div class="mockup-box">📊 回測圖表預覽</div></div>
          </div>
        </section>

        <section id="latest-posts" class="posts-section fade-in">
          <div class="container">
            <h2 class="fade-in">最新交易心得與回測</h2>
            <div class="posts-grid" id="posts-grid"></div>
          </div>
        </section>

        <footer class="site-footer fade-in">
          <div class="container">
            <div class="footer-content fade-in">
              <div class="footer-brand">
                <h3><img src="/logo.png" alt="Logo" class="logo-img-footer"> ${config.siteName}</h3>
                <p>${config.footer.brandDesc}</p>
              </div>
              <div class="footer-links">
                <h4>快速連結</h4>
                ${config.footer.quickLinks.map((link: any) => `<a href="${link.url}">${link.name}</a>`).join('')}
              </div>
              <div class="footer-contact">
                <h4>聯絡我們</h4>
                <p>${config.footer.contact.email}</p>
                <p>${config.footer.contact.support}</p>
              </div>
            </div>
            <div class="footer-bottom"><p>© ${new Date().getFullYear()} ${config.siteName}. All rights reserved.</p></div>
          </div>
        </footer>
      </div>
    `;

    // 載入文章並初始化 Router
    await loadPosts();
    renderApp();
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));

  } catch (err) {
    console.error("載入網站設定失敗", err);
  }
};

// === 4. 啟動 ===
initSite();

// 監聽網址變化同 Scroll
window.addEventListener('hashchange', renderApp);
window.addEventListener('scroll', handleScrollFade);
