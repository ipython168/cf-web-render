'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const currentTheme = mounted ? theme : undefined;
  const t = langData[currentLang] || langData.zh || {};

  const switchLang = (newLang: 'zh' | 'en') => {
    localStorage.setItem('lang', newLang);
    const newPath = pathname.replace(/^\/(zh|en)/, `/${newLang}`);
    router.push(newPath);
    onLangChange(newLang);
    onClose();
  };

  return (
    <>
      <div id="overlay" className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-150 transition-opacity duration-400 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={onClose} />
      <div id="sidebar" className={`fixed top-0 right-0 w-[320px] h-screen bg-[var(--sidebar-bg)] z-200 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <button id="close-btn" className="self-end mt-1 mr-4 text-base bg-transparent border-none text-[var(--text-color)] cursor-pointer" onClick={onClose}>✕</button>
        <div className="flex-1 px-8 pb-8 flex flex-col">
          <div className="mb-2">
            <h4 id="theme-title" className="mt-0 mb-2 text-base opacity-70">{t.sidebar?.themeTitle || 'Theme Settings'}</h4>
            <div className="flex gap-2.5">
              <button className={`flex-1 py-1 px-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg cursor-pointer text-xl ${currentTheme === 'light' ? 'bg-[var(--primary-color)] border-[var(--primary-color)]' : ''}`} onClick={() => setTheme('light')}>☀️</button>
              <button className={`flex-1 py-1 px-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg cursor-pointer text-xl ${currentTheme === 'system' ? 'bg-[var(--primary-color)] border-[var(--primary-color)]' : ''}`} onClick={() => setTheme('system')}>💻</button>
              <button className={`flex-1 py-1 px-2 bg-[var(--bg-color)] border border-[var(--border-color)] rounded-lg cursor-pointer text-xl ${currentTheme === 'dark' ? 'bg-[var(--primary-color)] border-[var(--primary-color)]' : ''}`} onClick={() => setTheme('dark')}>🌙</button>            </div>
          </div>
          <div className="flex flex-col gap-6 my-4 mb-8">
            {t.nav && (
              <>
                <a href={`/${currentLang}`} className="text-lg text-[var(--text-color)] no-underline font-bold">{t.nav.about}</a>
                <a href={`/${currentLang}/article`} className="text-lg text-[var(--text-color)] no-underline font-bold">{t.nav.news}</a>
                <a href={`/${currentLang}`} className="text-lg text-[var(--text-color)] no-underline font-bold">{t.nav.help}</a>
                <a href={`/${currentLang}`} className="text-lg text-[var(--text-color)] no-underline font-bold">{t.nav.support}</a>              </>
            )}
          </div>
          <div className="mt-auto border-t border-[var(--border-color)] pt-6 pb-[env(safe-area-inset-bottom)]">
            <div className="flex justify-center mb-6">
              <div className="flex bg-[var(--bg-color)] border border-[var(--border-color)] rounded-[30px] p-1 w-[200px]">
                <button className={`flex-1 py-2 border-none bg-transparent text-[var(--text-color)] font-bold rounded-[25px] cursor-pointer ${currentLang === 'zh' ? 'bg-[var(--primary-color)] text-white' : ''}`} onClick={() => switchLang('zh')}>中文</button>
                <button className={`flex-1 py-2 border-none bg-transparent text-[var(--text-color)] font-bold rounded-[25px] cursor-pointer ${currentLang === 'en' ? 'bg-[var(--primary-color)] text-white' : ''}`} onClick={() => switchLang('en')}>EN</button>
              </div>
            </div>
            {siteConfig.social?.facebook && (
              <a href={siteConfig.social.facebook} id="social-fb" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[var(--bg-color)] text-[var(--text-color)] no-underline hover:opacity-100 transition-opacity duration-200" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 12.073z"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
