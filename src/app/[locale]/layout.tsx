'use client';

import { useEffect, useState, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const [config, setConfig] = useState({});
  const [fullLang, setFullLang] = useState({});
  const [langData, setLangData] = useState({});

  useEffect(() => {
    Promise.all([
      fetch('/site-config.json').then(r => r.json()),
      fetch('/lang.json').then(r => r.json()),
    ]).then(([cfg, lang]) => {
      setConfig(cfg);
      setFullLang(lang);
      setLangData(lang[locale] || lang.zh || {});
    }).catch(err => console.error('Failed to load config:', err));
  }, [locale]);

  return (
    <>
      <Navbar
        siteConfig={config}
        langData={fullLang}
        currentLang={locale}
        onLangChange={() => {}}
      />
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <Footer siteConfig={config} langData={langData} />
    </>
  );
}
