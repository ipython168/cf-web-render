'use client';

import { useState, useEffect, useCallback } from 'react';

export function useLang() {
  const [lang, setLangState] = useState<'zh' | 'en'>('zh');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = (localStorage.getItem('lang') || 'zh') as 'zh' | 'en';
    setLangState(saved);
    setMounted(true);
  }, []);

  const changeLang = useCallback((newLang: 'zh' | 'en') => {
    setLangState(newLang);
    localStorage.setItem('lang', newLang);
    // Trigger 全頁重新 render（因為 lang 影響好多 component）
    window.dispatchEvent(new CustomEvent('langchange', { detail: newLang }));
  }, []);

  return { lang, changeLang, mounted };
}
