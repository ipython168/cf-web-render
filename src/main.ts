import './style.css';

const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
const htmlElement = document.documentElement;

// 1. 初始化主題邏輯
const applyTheme = (theme: string) => {
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    htmlElement.setAttribute('data-theme', theme);
  }
};

// 讀取用戶之前嘅設定，預設為 system
const savedTheme = localStorage.getItem('theme') || 'system';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

// 監聽選單變化
themeSelect.addEventListener('change', (e) => {
  const newTheme = (e.target as HTMLSelectElement).value;
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

// 如果用戶揀咗 system，但系統設定變咗，都要跟住變
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
  if (themeSelect.value === 'system') {
    applyTheme('system');
  }
});

// 3. 加載首頁內容
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <!-- 區塊 1：首頁大圖 -->
  <section class="hero-section">
    <div class="hero-content">
      <h1>用數據透視市場<br>用紀律執行交易</h1>
      <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
      <div class="hero-btns">
        <a href="#features" class="btn-primary">開始了解</a>
      </div>
    </div>
  </section>

  <!-- 區塊 2：類似 Datatone 嘅左右排版 -->
  <section id="features" class="feature-section">
    <div class="feature-text">
      <h2>隨時掌握<br>市場最新動態</h2>
      <p>支援即時回測數據、歷史圖表顯示。無論你用電腦定手機，都可以快速查閱策略表現。</p>
    </div>
    <div class="feature-visual">
      <!-- 呢度將來可以放一張大圖或者手機 Mockup -->
      <div class="mockup-box">📊 回測圖表預覽</div>
    </div>
  </section>

  <!-- 區塊 3：文章列表 -->
  <section id="latest-posts" class="posts-section">
    <h2>最新交易心得與回測</h2>
    <div class="posts-grid">
      ${renderPosts()}
    </div>
  </section>
`;
