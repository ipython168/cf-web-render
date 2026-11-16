'use client';

import { useState } from 'react';

interface GreetingProps {
  name: string;
  age: number;
}

const Greeting = ({ name, age }: GreetingProps) => {
  return (
    <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>你好，{name}！</h2>
      <p>你今年 {age} 歲。</p>
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>計數機</h2>
      <p>你撳咗 <strong style={{ color: '#38bdf8', fontSize: '1.5rem' }}>{count}</strong> 次</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '0.5rem 1rem', background: '#38bdf8', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        撳我 +1
      </button>
    </div>
  );
};

const Footer = ({ siteConfig, t }: { siteConfig: any, t: any }) => {
  return (
    <footer style={{ background: '#1e293b', borderTop: '1px solid #334155', padding: '4rem 0 2rem', marginTop: '4rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '4rem', marginBottom: '3rem' }}>
          
          {/* 品牌簡介 */}
          <div>
            <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', marginBottom: '1rem' }}>
              <img src={siteConfig.logoImage} alt="Logo" style={{ height: '48px', verticalAlign: 'middle' }} />
            </h3>
            <p style={{ lineHeight: '1.6', opacity: 0.7, fontSize: '0.95rem' }}>{t.footer.brandDesc}</p>
          </div>

          {/* 快速連結 */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t.footer.quickLinksTitle}</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>{t.footer.links.about}</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>{t.footer.links.backtest}</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>{t.footer.links.insights}</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', opacity: 0.7 }}>{t.footer.links.privacy}</a>
            </div>
          </div>

          {/* 聯絡我們 */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>{t.footer.contactTitle}</h4>
            <p style={{ opacity: 0.7, marginBottom: '0.8rem', fontSize: '0.95rem' }}>{siteConfig.footer.contact.email}</p>
            <p style={{ opacity: 0.7, marginBottom: '0.8rem', fontSize: '0.95rem' }}>WhatsApp 技術支援</p>
          </div>

        </div>
        <div style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid #334155', opacity: 0.5, fontSize: '0.85rem' }}>
          <p>© {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};




export default function HomeClient({ config, langData }: { config: any, langData: any }) {
  const t = langData.zh; // 暫時寫死用中文

  return (    
    <main style={{ padding: '4rem', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1>{config.siteName} 測試頁</h1>
      
      <Greeting name="阿明" age={25} />
      <Greeting name="小美" age={30} />
      
      <Counter />
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#1e293b', borderRadius: '8px' }}>
        <h2>Logo 測試：</h2>
        <img src={config.logoImage} alt="Logo" style={{ height: '60px' }} />
      </div> 
      
      <Footer siteConfig={config} t={t} />

    </main>
  );
} 