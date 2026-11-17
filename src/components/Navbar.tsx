'use client';
import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import Sidebar from './Sidebar';

interface NavbarProps {
  siteConfig: any;
  langData: any;
  currentLang?: string;
  onLangChange?: (lang: 'zh' | 'en') => void;
}

export default function Navbar({ siteConfig, langData, currentLang: propLang, onLangChange: propOnChange }: NavbarProps) {
  const { lang, changeLang, mounted } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentLang = propLang ?? lang;
  const onLangChange = propOnChange ?? changeLang;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > window.innerHeight - 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href="/" className="logo">
            <img src={siteConfig.logoImage} alt="Logo" className="logo-img" />
          </a>
          <button 
            id="menu-btn" 
            className="menu-btn" 
            onClick={() => setSidebarOpen(true)} 
            aria-label="選單"
            style={{ background: 'transparent', border: '1px solid var(--border-color)', borderRadius: '6px', width: '38px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', cursor: 'pointer', transition: 'all 0.3s ease', padding: '0' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-color)'; e.currentTarget.style.borderColor = 'var(--primary-color)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
          >
            <span style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--text-color)', transition: 'background 0.3s ease' }}></span>
            <span style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--text-color)', transition: 'background 0.3s ease' }}></span>
            <span style={{ display: 'block', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--text-color)', transition: 'background 0.3s ease' }}></span>
          </button>
        </div>
      </header>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} siteConfig={siteConfig} langData={langData} currentLang={currentLang} onLangChange={onLangChange} />
    </>
  );
}
