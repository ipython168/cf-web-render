export const renderDebug = async () => {
  const app = document.getElementById('app')!;
  
  app.innerHTML = `
    <div style="padding: 100px; font-family: monospace; background: #0f172a; color: #38bdf8; min-height: 100vh;">
      <h1>🛠️ JSON Debug Page</h1>
      <a href="#" style="color: white; text-decoration: underline;">← 返回首頁</a>
      <pre id="debug-output" style="margin-top: 2rem; white-space: pre-wrap; background: #1e293b; padding: 2rem; border-radius: 10px;">載入中...</pre>
    </div>
  `;

  document.querySelector('a')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });

  try {
    const res = await fetch('/posts.json');
    const posts = await res.json();
    
    let output = `總共有 ${posts.length} 篇文章\n\n`;

    posts.forEach((post: any, index: number) => {
      output += `--- 文章 ${index + 1} (ID: ${post.id}) ---\n`;
      output += `Date: ${post.date}\n`;
      output += `Image: ${post.image || '冇'}\n`;
      
      // 檢查 category
      output += `Category Type: ${typeof post.category}\n`;
      if (typeof post.category === 'object') {
        output += `Category (zh): ${post.category.zh}\n`;
        output += `Category (en): ${post.category.en}\n`;
      } else {
        output += `Category (Raw): ${post.category}\n`;
      }

      // 檢查 zh
      output += `Has zh: ${post.zh ? 'Yes' : 'No'}\n`;
      if (post.zh) output += `  zh.title: ${post.zh.title ? 'Yes' : 'No'}\n`;
      
      // 檢查 en
      output += `Has en: ${post.en ? 'Yes' : 'No'}\n`;
      if (post.en) output += `  en.title: ${post.en.title ? 'Yes' : 'No (Empty)'}\n`;
      
      output += `\n`;
    });

    document.getElementById('debug-output')!.textContent = output;

  } catch (err: any) {
    document.getElementById('debug-output')!.textContent = `Error: ${err.message}`;
  }
};
