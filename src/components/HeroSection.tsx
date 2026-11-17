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
    ? `linear-gradient(${siteConfig.theme.dark.heroBgOverlay}, ${siteConfig.theme.dark.heroBgOverlay}), url('/images/hero/hero-bg-dark.jpg')`
    : `linear-gradient(${siteConfig.theme.light.heroBgOverlay}, ${siteConfig.theme.light.heroBgOverlay}), url('/images/hero/hero-bg-light.jpg')`;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth > 768) {
      const x = -(window.innerWidth / 2 - e.pageX) / 15;
      const y = -(window.innerHeight / 2 - e.pageY) / 15;
      setMousePos({ x, y });
    }
  };

  return (
    <section
      className="hero-section"
      style={{
        backgroundImage: heroBg,
        backgroundPosition: `calc(50% + ${mousePos.x}px) calc(50% + ${mousePos.y}px)`,
      }}
      onMouseMove={handleMouseMove}
    >
      <div className="hero-content">
        <h1 dangerouslySetInnerHTML={{ __html: t.hero.title }} />
        <p>{t.hero.subtitle}</p>
        <div className="hero-btns">
          <a href={siteConfig.hero.buttonLink} className="btn-primary">
            {t.hero.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
