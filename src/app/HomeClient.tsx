'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface HomeClientProps {
  config: any;
  langData: any;
  posts: any[];
}

export default function HomeClient({ config, langData, posts }: HomeClientProps) {
  const t = langData.zh;
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const heroBg = resolvedTheme === 'dark' 
    ? "linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/images/hero/hero-bg-dark.jpg')"
    : "linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/images/hero/hero-bg-light.jpg')";

  return (
    <div id="home-view">
      <Navbar siteConfig={config} />
      
      {/* 1. Hero */}
      <main className="hero-section" style={{ backgroundImage: heroBg }}>
        <div className="hero-content">
          <h1 dangerouslySetInnerHTML={{ __html: t.hero.title }} />
          <p>{t.hero.subtitle}</p>
          <div className="hero-btns">
            <a href={config.hero.buttonLink} className="btn-primary">
              {t.hero.buttonText}
            </a>
          </div>
        </div>
      </main>

      {/* 2. Features */}
      <section id="features" className="feature-section fade-in">
        <div className="container">
          <div className="feature-text">
            <h2 className="fade-in" dangerouslySetInnerHTML={{ __html: t.sections.featuresTitle }} />
            <p className="fade-in">{t.sections.featuresDesc}</p>
          </div>
          <div className="feature-visual fade-in">
            <img src={config.sections.featureImage} alt="Feature" className="feature-img" />
          </div>
        </div>
      </section>

      {/* 3. Stats */}
      <section id="stats" className="stats-section fade-in">
        <div className="container">
          <h2 className="fade-in">{t.stats?.title || "實戰數據"}</h2>
          <div className="stats-grid">
            <div className="stat-card"><h3 className="stat-number">65%</h3><p>勝率</p></div>
            <div className="stat-card"><h3 className="stat-number">248</h3><p>總交易次數</p></div>
            <div className="stat-card"><h3 className="stat-number">13%</h3><p>最大回撤</p></div>
            <div className="stat-card"><h3 className="stat-number">34%</h3><p>總回報</p></div>
          </div>
        </div>
      </section>

      {/* 4. Posts */}
      <section id="latest-posts" className="posts-section fade-in">
        <div className="container">
          <h2 className="fade-in clickable-title">
            <a href="#archive">{t.sections.postsTitle}</a>
          </h2>
          <div className="posts-grid">
            {posts.slice(0, 3).map((post) => {
              const content = (t === langData.zh) ? post.zh : (post.en?.title ? post.en : post.zh);
              const catName = post.category.zh;
              return (
                <article key={post.id} className="post-card fade-in">
                  {post.image && <img src={post.image} alt={content.title} className="post-cover-img" />}
                  <div className="post-category">{catName}</div>
                  <h3 className="post-title">{content.title}</h3>
                  <p className="post-date">{post.date}</p>
                  <p className="post-excerpt">{content.excerpt}</p>
                  <a href={`#post/${post.id}`} className="read-more">閱讀更多 →</a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Footer */}
      <Footer siteConfig={config} t={t} />
    </div>
  );
}