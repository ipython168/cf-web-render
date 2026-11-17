// src/components/Sidebar.tsx
'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  siteConfig: any;
  langData: any;
  currentLang: string;
  onLangChange: (lang: 'zh' | 'en') => void;
}

export default function Sidebar({ open, onClose, siteConfig, langData, currentLang, onLangChange }: SidebarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // 未 mounted 前當 undefined 處理，避免 hydration mismatch
  const currentTheme = mounted ? theme : undefined;

  const t = langData[currentLang] || langData.zh || {};

  return (
    <>
      <div id="overlay" className={`overlay ${open ? 'active' : ''}`} onClick={onClose} />
      <div id="sidebar" className={`sidebar ${open ? 'open' : ''}`}>
        <button id="close-btn" className="close-btn" onClick={onClose}>✕</button>
        <div className="sidebar-content">
          <div className="theme-section">
            <h4 id="theme-title">{t.sidebar?.themeTitle || 'Theme Settings'}</h4>
            <div className="icon-btn-group">
              <button className={`icon-btn ${currentTheme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>☀️</button>
              <button className={`icon-btn ${currentTheme === 'system' ? 'active' : ''}`} onClick={() => setTheme('system')}>💻</button>
              <button className={`icon-btn ${currentTheme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>🌙</button>
            </div>
          </div>
          <div className="sidebar-links">
            {t.nav && (
              <>
                <a href="#">{t.nav.about}</a>
                <a href="#">{t.nav.news}</a>
                <a href="#">{t.nav.help}</a>
                <a href="#">{t.nav.support}</a>
              </>
            )}
          </div>
          <div className="sidebar-bottom">
            <div className="lang-switch-container">
              <div className="lang-switch">
                <button className={`lang-btn ${currentLang === 'zh' ? 'active' : ''}`} onClick={() => onLangChange('zh')}>中文</button>
                <button className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`} onClick={() => onLangChange('en')}>EN</button>
              </div>
            </div>
            {siteConfig.social?.facebook && (
              <a href={siteConfig.social.facebook} id="social-fb" target="_blank" rel="noopener noreferrer" className="sidebar-social-link" title="Facebook" style={{ display: 'inline-flex', alignItems: 'center', color: 'var(--text-color)', opacity: 0.7, transition: 'opacity 0.2s' }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
