'use client';
import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export default function Sidebar({ open, onClose, siteConfig, langData, currentLang, onLangChange }: any) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div id="overlay" className={`overlay ${open ? 'active' : ''}`} onClick={onClose} />
      <div id="sidebar" className={`sidebar ${open ? 'open' : ''}`}>
        <button id="close-btn" className="close-btn" onClick={onClose}>✕</button>
        <div className="sidebar-content">
          <div className="theme-section">
            <h4 id="theme-title">主題設定</h4>
            <div className="icon-btn-group">
              <button className={`icon-btn ${theme==='light'?'active':''}`} onClick={()=>setTheme('light')}>☀️</button>
              <button className={`icon-btn ${theme==='system'?'active':''}`} onClick={()=>setTheme('system')}>💻</button>
              <button className={`icon-btn ${theme==='dark'?'active':''}`} onClick={()=>setTheme('dark')}>🌙</button>
            </div>
          </div>
          <div className="sidebar-links">
            <a href="#">{langData.nav?.about || '關於我們'}</a>
            <a href="#">{langData.nav?.news || '最新消息'}</a>
            <a href="#">{langData.nav?.help || '幫助中心'}</a>
            <a href="#">{langData.nav?.support || '支持我們'}</a>
          </div>
          <div className="sidebar-bottom">
            <div className="lang-switch-container">
              <div className="lang-switch">
                <button className={`lang-btn ${currentLang==='zh'?'active':''}`} onClick={()=>onLangChange('zh')}>中文</button>
                <button className={`lang-btn ${currentLang==='en'?'active':''}`} onClick={()=>onLangChange('en')}>EN</button>
              </div>
            </div>
            {siteConfig.social?.facebook && (
              <div style={{textAlign:'center'}}>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener" className="social-link">f</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}