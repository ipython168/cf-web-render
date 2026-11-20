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
      <header className={`flex justify-center py-3 bg-transparent ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <a href={"/"+currentLang} className="flex items-center gap-3 no-underline">
            <img src={siteConfig.logoImage} alt="Logo" className="h-14 w-auto max-w-[60vw]" />
          </a>
          {/* 強制三小點 + 透明底 + Hover 效果 */}
          <button 
            id="menu-btn" 
            className="menu-btn-final" 
            onClick={() => setSidebarOpen(true)} 
            aria-label="選單"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} siteConfig={siteConfig} langData={langData} currentLang={currentLang} onLangChange={onLangChange} />
    </>
  );
}
