'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';

interface NavbarProps {
  siteConfig: any;
}

export default function Navbar({ siteConfig }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // 1. 監聽 Scroll，用嚟轉 Navbar 顏色
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. 避免 Hydration 錯誤（主題切換掣需要）
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="/" className="logo">
          <img src={siteConfig.logoImage} alt="Logo" className="logo-img" />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* 👈 主題切換掣 (只在 Mount 之後顯示) */}
          {mounted && (
            <select 
              value={theme} 
              onChange={(e) => setTheme(e.target.value)}
              style={{ 
                padding: '0.5rem', 
                borderRadius: '8px', 
                background: 'var(--card-bg)', 
                color: 'var(--text-color)', 
                border: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}
            >
              <option value="system">💻 跟隨系統</option>
              <option value="light">☀️ 日間</option>
              <option value="dark">🌙 夜間</option>
            </select>
          )}

          <button className="menu-btn">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}