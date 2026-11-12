export const renderDebug = async () => {
  const app = document.getElementById('app')!;
  const lang = localStorage.getItem('lang') || 'zh';

  app.innerHTML = `
    <div style="padding: 100px; font-family: monospace; background: #0f172a; color: #38bdf8; min-height: 100vh;">
      <h1>🛠️ Archive Debug Page</h1>
      <a href="#" id="back-btn" style="color: white; text-decoration: underline;">← 返回首頁</a>
      <p id="status" style="margin-top: 2rem; font-size: 1.2rem;">正在測試 Archive 數據...</p>
      <div id="result" style="margin-top: 2rem; background: #1e293b; padding: 2rem; border-radius: 10px; white-space: pre-wrap;"></div>
    </div>
  `;

  document.getElementById('back-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });

  try {
    const res = await fetch('/posts.json');
    const posts = await res.json();
    
    const statusEl = document.getElementById('status')!;
    const resultEl = document.getElementById('result')!;
    
    statusEl.textContent = `✅ 成功載入 ${posts.length} 篇文章！`;
    
    const html = posts.map((post: any) => {
      const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
      const catName = (lang === 'en' && post.category?.en) ? post.category.en : post.category?.zh;
      
      return `
        <div style="border: 1px solid #38bdf8; padding: 1rem; margin-bottom: 1rem;">
          <h3 style="color: white;">${content.title}</h3>
          <p>分類：${catName}</p>
          <p>摘要：${content.excerpt}</p>
        </div>
      `;
    }).join('');

    resultEl.innerHTML = html;

  } catch (err: any) {
    document.getElementById('status')!.textContent = `❌ 出錯：${err.message}`;
  }
};
