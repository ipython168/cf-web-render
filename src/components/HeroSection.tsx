'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

interface HeroSectionProps {
  siteConfig: any;
  t: any;
}

export default function HeroSection({ siteConfig, t }: HeroSectionProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const heroBg = resolvedTheme === 'dark'
    ? `linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('/images/hero/hero-bg-dark.jpg')`
    : `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url('/images/hero/hero-bg-light.jpg')`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth > 768) {
      const x = -(window.innerWidth / 2 - e.pageX) / 25;
      const y = -(window.innerHeight / 2 - e.pageY) / 25;
      setMousePos({ x, y });
    }
  };

  return (
    <section
      className="hero-section min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center transition-all duration-500"
      style={{
        backgroundImage: heroBg,
        backgroundPosition: `calc(50% + ${mousePos.x}px) calc(50% + ${mousePos.y}px)`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="hero-content text-center max-w-3xl mx-auto px-4 fade-in">
        <h1
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          style={{ color: 'var(--hero-text-color)' }}
          dangerouslySetInnerHTML={{ __html: t.hero.title }}
        />
        <p className="text-xl md:text-2xl mb-8 opacity-80" style={{ color: 'var(--hero-text-color)' }}>
          {t.hero.subtitle}
        </p>
        <div className="hero-btns">
          <a
            href={siteConfig.hero.buttonLink}
            className="btn-primary inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-semibold transition-colors"
          >
            {t.hero.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
