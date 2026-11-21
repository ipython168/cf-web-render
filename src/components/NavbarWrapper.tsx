'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';

export default function NavbarWrapper({ siteConfig }: { siteConfig: any }) {
  const { currentLang, setCurrentLang, contentData } = useLanguage();
  
  return (
    <Navbar
      siteConfig={siteConfig}
      contentData={contentData}
      currentLang={currentLang}
      onLangChange={setCurrentLang}
    />
  );
}
