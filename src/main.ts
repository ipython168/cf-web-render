import './style.css';

const themeToggleBtn = document.getElementById('theme-toggle')!;
const htmlElement = document.documentElement;

// 1. 檢查系統主題並預設
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  htmlElement.setAttribute('data-theme', savedTheme);
  themeToggleBtn.textContent = savedTheme === 'light' ? '🌙 轉夜間' : '☀️ 轉日間';
} else if (systemPrefersDark) {
  htmlElement.setAttribute('data-theme', 'dark');
  themeToggleBtn.textContent = '☀️ 轉日間';
} else {
  htmlElement.setAttribute('data-theme', 'light');
  themeToggleBtn.textContent = '🌙 轉夜間';
}

// 2. 處理切換
themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  themeToggleBtn.textContent = newTheme === 'light' ? '🌙 轉夜間' : '☀️ 轉日間';
  
  // 記住用戶嘅選擇
  localStorage.setItem('theme', newTheme);
});

// 3. 加載首頁內容
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <section class="hero">
    <div class="hero-content">
      <h1>用數據透視市場，用紀律執行交易</h1>
      <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
      <a href="#features" class="cta-btn">查看最新回測</a>
    </div>
  </section>

  <section id="features" class="features">
    <div class="card">
      <h3>📊 數據回測</h3>
      <p>分享不同策略的歷史回測表現，尋找超額回報 (Alpha)。</p>
    </div>
    <div class="card">
      <h3>📝 交易心得</h3>
      <p>紀錄實盤操作的心理狀態與市場觀察。</p>
    </div>
    <div class="card">
      <h3>🤖 自動化</h3>
      <p>研究如何利用 Python 與 TypeScript 建立自動化交易系統。</p>
    </div>
  </section>
`;
