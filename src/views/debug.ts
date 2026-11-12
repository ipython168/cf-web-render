export const renderArchive = async (t: any) => {
  const app = document.getElementById('app')!;
  const lang = localStorage.getItem('lang') || 'zh';

  // 1. 畫個最基本嘅外框
  app.innerHTML = `
    <div style="padding: 100px; text-align: center;">
      <h1>Archive 測試中</h1>
      <p id="debug-status">正在載入數據...</p>
      <a href="#" id="back-home-btn">← 返回首頁</a>
      <div id="archive-grid" style="margin-top: 2rem; text-align: left;"></div>
    </div>
  `;

  document.getElementById('back-home-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });

  // 2. Fetch 數據
  try {
    const res = await fetch('/posts.json');
    const posts = await res.json();
    
    const statusEl = document.getElementById('debug-status')!;
    statusEl.textContent = `成功載入 ${posts.length} 篇文章！`;

    const grid = document.getElementById('archive-grid')!;
    
    // 3. 直接印出最簡單嘅文字，唔用卡片，睇吓出唔出到
    grid.innerHTML = posts.map((post: any) => {
      // 確保語言 Fallback 正確
      const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
      const catName = (lang === 'en') ? post.category.en : post.category.zh;
      
      return `
        <div style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem;">
          <h3>${content.title}</h3>
          <p>分類：${catName}</p>
          <p>${content.excerpt}</p>
        </div>
      `;
    }).join('');

  } catch (err: any) {
    document.getElementById('debug-status')!.textContent = `❌ 出錯：${err.message}`;
  }
};