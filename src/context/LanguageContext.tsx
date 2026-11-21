'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  currentLang: string;
  setCurrentLang: (lang: string) => void;
  contentData: any;
}

const LanguageContext = createContext<LanguageContextType>({
  currentLang: 'zh',
  setCurrentLang: () => {},
  contentData: {},
});

export function LanguageProvider({ children, contentData }: { children: ReactNode; contentData: any }) {
  const [currentLang, setCurrentLang] = useState('zh');
  
  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, contentData }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
