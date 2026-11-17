'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import StatsSection from '@/components/StatsSection';
import PostGrid from '@/components/PostGrid';
import Footer from '@/components/Footer';

interface HomeClientProps {
  config: any;
  langData: any;
  posts: any[];
  stats: any;
}

export default function HomeClient({ config, langData, posts, stats }: HomeClientProps) {
  const [currentLang, setCurrentLang] = useState('zh');
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
        <StatsSection t={t} stats={stats} />
        <PostGrid initialPosts={posts} />
      </main>
      <Footer siteConfig={config} t={t} />
    </>
  );
}
