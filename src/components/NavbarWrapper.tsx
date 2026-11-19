'use client';

import { useLanguage } from '@/context/LanguageContext';
import Navbar from '@/components/Navbar';

export default function NavbarWrapper({ siteConfig }: { siteConfig: any }) {
  const { currentLang, setCurrentLang, langData } = useLanguage();
  
  return (
    <Navbar
      siteConfig={siteConfig}
      langData={langData}
      currentLang={currentLang}
      onLangChange={setCurrentLang}
    />
  );
}
