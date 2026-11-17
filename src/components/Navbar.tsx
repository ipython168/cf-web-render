'use client';
import { useState, useEffect } from 'react';

export default function Navbar({ siteConfig, langData, currentLang, onLangChange }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <a href="/" className="logo-link">
            {/* 大一個碼：高度設 40px (原約 32px)，字體 1.8rem */}
            <span className="logo-text" style={{fontSize:'1.8rem', fontWeight:700, color:'var(--primary-color)'}}>QuantBase</span>
          </a>
          <button id="menu-btn" className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="選單">
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <SidebarWrapper open={sidebarOpen} onClose={()=>setSidebarOpen(false)} siteConfig={siteConfig} langData={langData} currentLang={currentLang} onLangChange={onLangChange} />
    </>
  );
}

// 動態 import 避免 SSR 問題，或直接在上面 import Sidebar
import SidebarWrapper from './Sidebar';