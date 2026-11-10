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

// === 3. HTML 結構 (只保留首頁，文章會動態替換) ===
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div id="home-view">
    <section class="hero-section">
      <div class="hero-content fade-in" id="hero-content">
        <h1>用數據透視市場<br>用紀律執行交易</h1>
        <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
        <div class="hero-btns"><a href="#features" class="btn-primary">開始了解</a></div>
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
            <h3><img src="/logo.png" alt="Logo" class="logo-img-footer"> MyQuant</h3>
            <p>我哋係香港小型開發團隊...</p>
          </div>
          <div class="footer-links">
            <h4>快速連結</h4>
            <a href="#">關於我們</a><a href="#">回測結果</a><a href="#">交易心得</a><a href="#">私隱條例</a>
          </div>
          <div class="footer-contact">
            <h4>聯絡我們</h4>
            <p>info@myquant.hk</p>
            <p>WhatsApp 技術支援</p>
          </div>
        </div>
        <div class="footer-bottom"><p>© ${new Date().getFullYear()} MyQuant. All rights reserved.</p></div>
      </div>
    </footer>
  </div>
`;

// === 4. 初始化 ===
loadPosts().then(() => {
  renderApp();
  handleScrollFade();
  window.dispatchEvent(new Event('scroll'));
});

// 監聽網址變化同 Scroll
window.addEventListener('hashchange', renderApp);
window.addEventListener('scroll', handleScrollFade);
