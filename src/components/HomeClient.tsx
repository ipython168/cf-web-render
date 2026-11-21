'use client';

import { useScrollFade } from '@/hooks/useScrollFade';
import HeroSection from '@/components/HeroSection';
import FeatureSection from '@/components/FeatureSection';
import StatsSection from '@/components/StatsSection';
import PostGrid from '@/components/PostGrid';

interface HomeClientProps {
  config: any;
  contentData: any;
  posts: any[];
  stats: any;
  locale: string;
}

export default function HomeClient({ config, contentData, posts, stats, locale }: HomeClientProps) {
  const t = contentData[locale] || contentData.zh || {};

  useScrollFade();

  return (
    <main>
      <HeroSection siteConfig={config} t={t} />
      <FeatureSection siteConfig={config} t={t} />
      <StatsSection t={t} stats={stats} /> 
    </main>
  );
}
