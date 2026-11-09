import './style.css';

// === 1. 選單開關與遮罩 ===
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
overlay.addEventListener('click', closeSidebar); // 撳出面黑色遮罩都會關閉

// === 2. 主題切換邏輯 ===
const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
const htmlElement = document.documentElement;

const applyTheme = (theme: string) => {
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    htmlElement.setAttribute('data-theme', theme);
  }
};

const savedTheme = localStorage.getItem('theme') || 'system';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener('change', (e) => {
  const newTheme = (e.target as HTMLSelectElement).value;
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

// === 3. 加載首頁內容 ===
const posts = [
  { id: 1, title: "均線交叉策略回測報告", date: "2026-11-01", category: "回測結果", excerpt: "測試了 10 年港股數據，發現 20/50 均線喺牛市表現最好..." },
  { id: 2, title: "交易心理學：如何克服 FOMO", date: "2026-10-28", category: "交易心得", excerpt: "當見到隻股票係咁升，散戶最易冲動入市。分享幾個控制情緒嘅方法..." },
  { id: 3, title: "用 Python 打造自動化交易系統", date: "2026-10-15", category: "技術教學", excerpt: "由零開始建立 FastAPI 後端，配合 TypeScript 前端顯示即時數據..." }
];

const renderPosts = () => {
  return posts.map(post => `
    <article class="post-card">
      <div class="post-category">${post.category}</div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-date">${post.date}</p>
      <p class="post-excerpt">${post.excerpt}</p>
      <a href="#" class="read-more">閱讀更多 →</a>
    </article>
  `).join('');
};

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <section class="hero-section">
    <div class="hero-content fade-in" id="hero-content">
      <h1>用數據透視市場<br>用紀律執行交易</h1>
      <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
      <div class="hero-btns">
        <a href="#features" class="btn-primary">開始了解</a>
      </div>
    </div>
  </section>

  <section id="features" class="feature-section fade-in">
    <div class="container">
      <div class="feature-text">
        <h2>隨時掌握<br>市場最新動態</h2>
        <p>支援即時回測數據、歷史圖表顯示。無論你用電腦定手機，都可以快速查閱策略表現。</p>
      </div>
      <div class="feature-visual">
        <div class="mockup-box">📊 回測圖表預覽</div>
      </div>
    </div>
  </section>

  <section id="latest-posts" class="posts-section fade-in">
    <div class="container">
      <h2>最新交易心得與回測</h2>
      <div class="posts-grid">
        ${renderPosts()}
      </div>
    </div>
  </section>

  <footer class="site-footer fade-in">
    <div class="container">
      <div class="footer-content">
        <div class="footer-brand">
          <h3>
            <img src="/logo.png" alt="Logo" class="logo-img-footer">
            MyQuant
          </h3>
          <p>我哋係香港小型開發團隊...</p>
        </div>
        <div class="footer-links">
          <h4>快速連結</h4>
          <a href="#">關於我們</a>
          <a href="#">回測結果</a>
          <a href="#">交易心得</a>
          <a href="#">私隱條例</a>
        </div>
        <div class="footer-contact">
          <h4>聯絡我們</h4>
          <p>info@myquant.hk</p>
          <p>WhatsApp 技術支援</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>© ${new Date().getFullYear()} MyQuant. All rights reserved.</p>
      </div>
    </div>
  </footer>
`;

// === 4. 視差效果 ===
const heroSection = document.querySelector('.hero-section') as HTMLElement;
if (window.innerWidth > 768) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 30;
    const y = (window.innerHeight / 2 - e.pageY) / 30;
    heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}

// === 5. 滾動 Fade-in 監聽 ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 }); // 出現 15% 就觸發

document.querySelectorAll('.fade-in').forEach((el) => {
  observer.observe(el);
});