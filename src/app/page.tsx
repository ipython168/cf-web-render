import fs from 'fs';
import path from 'path';

export default async function Home() {
  // 1. 喺 Build 時讀取 JSON
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  return (
    <main style={{ padding: '4rem', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1>SSG 測試成功！</h1>
      <p>網站名稱：<strong style={{ color: '#38bdf8' }}>{config.siteName}</strong></p>
      <p>網站標題：{config.siteTitle}</p>
      <p>呢個頁面係喺 Build 嗰陣，由 Server 讀取 JSON 生成嘅純靜態 HTML。</p>
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#1e293b', borderRadius: '8px' }}>
        <h2>Logo 測試：</h2>
        <img src={config.logoImage} alt="Logo" style={{ height: '60px' }} />
      </div>
    </main>
  );
}
  