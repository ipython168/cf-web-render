'use client';

import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';

export default function FooterWrapper({ siteConfig }: { siteConfig: any }) {
  const { currentLang, langData } = useLanguage();
  const t = langData[currentLang] || langData.zh || {};
  
  return (
    <Footer siteConfig={siteConfig} langData={t} />
  );
}
