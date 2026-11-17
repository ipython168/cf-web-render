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
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <div className={`overlay ${open ? 'active' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <button className="close-btn" onClick={onClose} aria-label="關閉">✕</button>
        <div className="sidebar-content">
          <div className="theme-section">
            <h4>主題設定</h4>
            <div className="icon-btn-group">
              <button className={`icon-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>☀️</button>
              <button className={`icon-btn ${theme === 'system' ? 'active' : ''}`} onClick={() => setTheme('system')}>💻</button>
              <button className={`icon-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>🌙</button>
            </div>
          </div>

          <nav className="sidebar-links">
            {siteConfig.navLinks?.map((link: any) => (
              <a key={link.href} href={link.href} onClick={onClose}>{link.label}</a>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="lang-switch-container">
              <LangSwitcher langData={langData} />
            </div>
            {siteConfig.social?.facebook && (
              <a href={siteConfig.social.facebook} target="_blank" rel="noopener" className="social-link">f</a>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
