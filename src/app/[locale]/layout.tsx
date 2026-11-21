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
  const [fullContent, setFullContent] = useState({});
  const [contentData, setContentData] = useState({});

  useEffect(() => {
    Promise.all([ 
      fetch('/site-config.json').then(r => r.json()),
      fetch('/content.json').then(r => r.json()),
    ]).then(([cfg, content]) => {
      setConfig(cfg);
      setFullContent(content);
      setContentData(content[locale] || content.zh || {});
    }).catch(err => console.error('Failed to load config:', err));
  }, [locale]);

  return (
    <>
      <Navbar
        siteConfig={config}
        contentData={fullContent}
        currentLang={locale}
        onLangChange={() => {}}
      />
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
      <Footer siteConfig={config} contentData={contentData} />
    </>
  );
}
