import './style.css';
import { initTheme } from './utils/theme';
import { initAnimations, handleScrollFade } from './utils/animations';
import { loadPosts } from './views/home';
import { renderApp } from './views/post';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

// === 3. HTML 結構 ===
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

    <!-- 新增：GSAP 數字跳動區塊 -->
    <section id="stats" class="stats-section fade-in">
      <div class="container">
        <h2 class="fade-in" id="stats-title">實戰數據</h2>
        <div class="stats-grid">
          <div class="stat-card">
            <h3 class="stat-number" id="stat-win">0</h3>
            <p id="label-win">勝率</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-number" id="stat-trades">0</h3>
            <p id="label-trades">總交易次數</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-number" id="stat-dd">0</h3>
            <p id="label-dd">最大回撤</p>
          </div>
          <div class="stat-card">
            <h3 class="stat-number" id="stat-return">0</h3>
            <p id="label-return">總回報</p>
          </div>
        </div>
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
  <div id="post-content" style="display: none;"></div>
`;

// === 4. 初始化與 GSAP 數據載入 ===
loadPosts().then(async () => {
  renderApp();
  handleScrollFade();
  window.dispatchEvent(new Event('scroll'));

  try {
    // 載入數據同語言
    const [statsRes, langRes] = await Promise.all([
      fetch('/stats.json'),
      fetch('/lang.json')
    ]);
    const stats = await statsRes.json();
    const lang = await langRes.json();
    const t = lang['zh']; // 預設中文

    // 更新文字
    document.getElementById('stats-title')!.textContent = t.stats_title;
    document.getElementById('label-win')!.textContent = t.win_rate;
    document.getElementById('label-trades')!.textContent = t.total_trades;
    document.getElementById('label-dd')!.textContent = t.max_drawdown;
    document.getElementById('label-return')!.textContent = t.total_return;

    // GSAP 數字跳動動畫
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
        val: item.target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#stats",
          start: "top 80%", // 當 stats 區塊升到畫面 80% 位置時觸發
          toggleActions: "play none none reverse"
        },
        onUpdate: () => {
          el.textContent = Math.round(obj.val).toString() + item.suffix;
        }
      });
    });
  } catch (err) {
    console.error("載入數據失敗", err);
  }
});

// 監聽網址變化同 Scroll
window.addEventListener('hashchange', renderApp);
window.addEventListener('scroll', handleScrollFade);
