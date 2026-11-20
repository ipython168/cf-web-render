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
      <header className={`flex justify-center py-3 bg-transparent fixed inset-x-0 top-0 z-[100] transition-all duration-300 ease-in-out ${scrolled ? 'scrolled' : ''}`}>
        <div className="w-full max-w-[1280px] mx-auto h-[45px] px-[1.5%] flex items-center justify-between gap-4">
          <a href={"/"+currentLang} className="flex items-center gap-3 no-underline">
            <img src={siteConfig.logoImage} alt="Logo" className="h-14 w-auto max-w-[60vw]" />
          </a>
          {/* 強制三小點 + 透明底 + Hover 效果 */}
          <button 
            id="menu-btn" 
            className="flex flex-col items-center justify-center gap-[4px] w-[35px] h-[35px] bg-transparent border border-[var(--primary-color)] rounded-xl cursor-pointer p-0 shrink-0 transition-all duration-300 ease-in-out z-[99] hover:bg-[var(--primary-color)] hover:border-[var(--primary-color)]" 
            onClick={() => setSidebarOpen(true)} 
            aria-label="選單"
          >
            <span className="block w-[5px] h-[5px] rounded-full bg-[var(--primary-color)] transition-colors duration-300 ease-in-out group-hover:bg-white"></span>
            <span className="block w-[5px] h-[5px] rounded-full bg-[var(--primary-color)] transition-colors duration-300 ease-in-out group-hover:bg-white"></span>
            <span className="block w-[5px] h-[5px] rounded-full bg-[var(--primary-color)] transition-colors duration-300 ease-in-out group-hover:bg-white"></span>
          </button>

        </div>
      </header>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} siteConfig={siteConfig} langData={langData} currentLang={currentLang} onLangChange={onLangChange} />
    </>
  );
}
