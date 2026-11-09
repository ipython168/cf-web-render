import './style.css';

// 1. 主題切換邏輯
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
if (themeSelect) {
  themeSelect.value = savedTheme;
  applyTheme(savedTheme);

  themeSelect.addEventListener('change', (e) => {
    const newTheme = (e.target as HTMLSelectElement).value;
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (themeSelect && themeSelect.value === 'system') {
    applyTheme('system');
  }
});

// 2. 模擬文章資料
const posts = [
  { id: 1, title: "均線交叉策略回測報告", date: "2026-11-01", category: "回測結果", excerpt: "測試了 10 年港股數據，發現 20/50 均線喺牛市表現最好..." },
  { id: 2, title: "交易心理學：如何克服 FOMO", date: "2026-10-28", category: "交易心得", excerpt: "當見到隻股票係咁升，散戶最易冲動入市。分享幾個控制情緒嘅方法..." },
  { id: 3, title: "用 Python 打造自動化交易系統", date: "2026-10-15", category: "技術教學", excerpt: "由零開始建立 FastAPI 後端，配合 TypeScript 前端顯示即時數據..." }
];

// 3. 將資料轉化為 HTML 卡片
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

// 4. 加載首頁內容
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <section class="hero-section">
    <div class="hero-content">
      <h1>用數據透視市場<br>用紀律執行交易</h1>
      <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
      <div class="hero-btns">
        <a href="#features" class="btn-primary">開始了解</a>
      </div>
    </div>
  </section>

  <section id="features" class="feature-section">
    <div class="feature-text">
      <h2>隨時掌握<br>市場最新動態</h2>
      <p>支援即時回測數據、歷史圖表顯示。無論你用電腦定手機，都可以快速查閱策略表現。</p>
    </div>
    <div class="feature-visual">
      <div class="mockup-box">📊 回測圖表預覽</div>
    </div>
  </section>

  <section id="latest-posts" class="posts-section">
    <h2>最新交易心得與回測</h2>
    <div class="posts-grid">
      ${renderPosts()}
    </div>
  </section>
`;