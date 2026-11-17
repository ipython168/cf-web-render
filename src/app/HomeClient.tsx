'use client';

import { useLang } from '@/hooks/useLang';
import { useScrollFade } from '@/hooks/useScrollFade';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeatureSection from '../components/FeatureSection';
import StatsSection from '../components/StatsSection';
import PostGrid from '../components/PostGrid';
import Footer from '../components/Footer';

interface HomeClientProps {
  config: any;
  langData: any;
  posts: any[];
  stats: any;
}

export default function HomeClient({ config, langData, posts, stats }: HomeClientProps) {
  const { lang, mounted } = useLang();

  useScrollFade();

  if (!mounted) return null;

  const t = langData[lang];

  return (
    <div id="home-view">
      <Navbar siteConfig={config} langData={langData} />
      <HeroSection siteConfig={config} t={t} />
      <FeatureSection siteConfig={config} t={t} />
      <StatsSection t={t} stats={stats} />

      <section id="latest-posts" className="posts-section py-20 fade-in">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 clickable-title">
            <a href="/archive" className="hover:text-cyan-500 transition-colors">
              {t.sections.postsTitle}
            </a>
          </h2>
          <PostGrid initialPosts={posts} />
        </div>
      </section>

      <Footer siteConfig={config} t={t} />
    </div>
  );
}
