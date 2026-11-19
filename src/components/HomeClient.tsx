'use client';

import { useScrollFade } from '@/hooks/useScrollFade';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import StatsSection from '@/components/StatsSection';
import PostGrid from '@/components/PostGrid';

interface HomeClientProps {
  config: any;
  langData: any;
  posts: any[];
  stats: any;
  locale: string;
}

export default function HomeClient({ config, langData, posts, stats, locale }: HomeClientProps) {
  const t = langData[locale] || langData.zh || {};

  useScrollFade();

  return (
    <main>
      <HeroSection siteConfig={config} t={t} />
      <FeatureSection siteConfig={config} t={t} />
      <StatsSection t={t} stats={stats} /> 
    </main>
  );
}
