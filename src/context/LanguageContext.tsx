'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  langData: any;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'zh',
  setCurrentLang: () => {},
  langData: {},
});

export function LanguageProvider({ children, langData }: { children: ReactNode; langData: any }) {
  const [currentLang, setCurrentLang] = useState('zh');
  
  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, langData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
