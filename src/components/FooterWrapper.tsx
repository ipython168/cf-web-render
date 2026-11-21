'use client';

import { useLanguage } from '@/context/LanguageContext';
import Footer from '@/components/Footer';

export default function FooterWrapper({ siteConfig }: { siteConfig: any }) {
  const { currentLang, contentData } = useLanguage();
  const t = contentData[currentLang] || contentData.zh || {};
  
  return (
    <Footer siteConfig={siteConfig} contentData={t} />
  );
}
