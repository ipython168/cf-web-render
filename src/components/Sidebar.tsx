'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';
import LangSwitcher from './LangSwitcher';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  siteConfig: any;
  langData: any;
}

export default function Sidebar({ open, onClose, siteConfig, langData }: SidebarProps) {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Overlay — 點擊關閉 */}
      <div id="overlay" className={`overlay ${open ? 'active' : ''}`} onClick={onClose} />

      {/* Sidebar — 跟原版 HTML 結構 */}
      <div id="sidebar" className={`sidebar ${open ? 'open' : ''}`}>
        <button id="close-btn" className="close-btn" onClick={onClose}>✕</button>
        <div className="sidebar-content">
          {/* 主題設定 */}
          <div className="theme-section">
            <h4 id="theme-title">{langData.sidebar?.themeTitle || 'Theme Settings'}</h4>
            <select className="theme-select" value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* 選單連結 — 跟原版 sidebar.ts 結構 */}
          <div className="sidebar-links">
            {langData.nav && (
              <>
                <a href="#">{langData.nav.about}</a>
                <a href="#">{langData.nav.news}</a>
                <a href="#">{langData.nav.help}</a>
                <a href="#">{langData.nav.support}</a>
              </>
            )}
          </div>

          {/* 底部：語言切換 + 社交 */}
          <div className="sidebar-bottom">
            <div className="lang-switch-container">
              <LangSwitcher langData={langData} />
            </div>
            {siteConfig.social?.facebook && (
              <div style={{ textAlign: 'center' }}>
                <a href={siteConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                  f
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
