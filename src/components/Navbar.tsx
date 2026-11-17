'use client';

import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';

interface NavbarProps {
  siteConfig: any;
  langData: any;
}

export default function Navbar({ siteConfig, langData }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <button id="menu-btn" className="menu-btn" onClick={() => setSidebarOpen(true)} aria-label="選單">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} siteConfig={siteConfig} langData={langData} />
    </>
  );
}
