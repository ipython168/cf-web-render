'use client';

import { useState, useEffect } from 'react';
import LangSwitcher from './LangSwitcher';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  siteConfig: any;
  langData: any;
}

export default function Navbar({ siteConfig, langData }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight - 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="logo">
          <img src={siteConfig.logoImage} alt="Logo" className="logo-img" />
        </a>
        <div className="flex items-center gap-3">
          <LangSwitcher langData={langData} />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
