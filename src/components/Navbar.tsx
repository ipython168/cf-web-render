'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import LangSwitcher from './LangSwitcher';

interface NavbarProps {
  siteConfig: any;
  langData: any;
}

export default function Navbar({ siteConfig, langData }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <img 
            src={siteConfig.logoImage} 
            alt="Logo" 
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-4">
          <LangSwitcher langData={langData} />
          
          {/* Theme switcher */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="px-3 py-1.5 rounded-lg text-sm bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 text-gray-800 dark:text-gray-200 cursor-pointer"
          >
            <option value="system">💻 System</option>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-current transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 px-4 py-4 space-y-4">
          <LangSwitcher langData={langData} />
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full px-3 py-2 rounded-lg text-sm bg-gray-100 dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700"
          >
            <option value="system">💻 System</option>
            <option value="light">☀️ Light</option>
            <option value="dark">🌙 Dark</option>
          </select>
        </div>
      )}
    </header>
  );
}
