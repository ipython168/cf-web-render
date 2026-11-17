// src/app/HomeClient.tsx
'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import StatsSection from '@/components/StatsSection';
import PostSection from '@/components/PostSection';
import Footer from '@/components/Footer';

interface HomeClientProps {
  config: any;
  langData: any;
  posts: any[];
  stats: any[];
}

export default function HomeClient({ config, langData, posts, stats }: HomeClientProps) {
  const [currentLang, setCurrentLang] = useState('zh');

  // 根據語言揀 t
  const t = langData[currentLang] || langData.zh || {};

  return (
    <>
      <Navbar
        siteConfig={config}
        langData={langData}
        currentLang={currentLang}
        onLangChange={setCurrentLang}
      />
      <main>
        <HeroSection siteConfig={config} t={t} />
        <FeatureSection siteConfig={config} t={t} />
        <StatsSection stats={stats} t={t} />
        <PostSection posts={posts} t={t} />
      </main>
      <Footer siteConfig={config} t={t} />
    </>
  );
}