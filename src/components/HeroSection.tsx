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

  useEffect(() => { setMounted(true); }, []);
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
      className="h-screen flex items-center justify-center text-center bg-[length:110%_110%] bg-center text-[var(--hero-text-color)] relative overflow-hidden transition-[background-image] duration-500 ease-in-out"
      style={{ backgroundImage: heroBg, backgroundPosition: `calc(50% + ${mousePos.x}px) calc(50% + ${mousePos.y}px)` }}
      onMouseMove={handleMouseMove}
    >
      <div className="fade-in">
        <h1 className="text-7xl leading-tight mb-6 tracking-tighter" dangerouslySetInnerHTML={{ __html: t.hero.title }} />
        <p className="text-base lg:text-lg xl:text-xl opacity-80 mb-12 px-4">{t.hero.subtitle}</p>
        <div className="hero-btns">
          {/* 強制實色背景，Hover 透明 */}
          <a 
            href={siteConfig.hero.buttonLink} 
            className="inline-block bg-[var(--primary-color)] text-white border-2 border-[var(--primary-color)] py-3 px-12 text-lg font-bold rounded-full no-underline transition-all duration-300 ease-in-out hover:bg-transparent hover:text-[var(--primary-color)]"
          >
            {t.hero.buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
