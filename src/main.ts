import './style.css';

// 1. 處理深淺色主題切換
const themeToggleBtn = document.getElementById('theme-toggle')!;
const htmlElement = document.documentElement;

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  htmlElement.setAttribute('data-theme', newTheme);
  themeToggleBtn.textContent = newTheme === 'light' ? '🌙 轉夜間' : '☀️ 轉日間';
});

// 2. 喺 Main 區域加入自我介紹（模擬首頁內容）
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <section class="hero">
    <h1>用數據透視市場，用紀律執行交易</h1>
    <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
    <button class="cta-btn">查看最新回測</button>
  </section>

  <section class="features">
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
