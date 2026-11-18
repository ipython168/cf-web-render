'use client';
import { useEffect, useRef } from 'react';

interface FeatureSectionProps {
  siteConfig: any;
  t: any;
}

export default function FeatureSection({ siteConfig, t }: FeatureSectionProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            img.classList.add('spin-right');
          } else {
            img.classList.remove('spin-right');
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(img);
    return () => observer.disconnect();
  }, []);
  
  return (
    <section id="features" className="feature-section py-20 fade-in overflow-hidden">
      <div className="container">
        {/* 唔加任何 flex/grid class，全部交 CSS 控制 */}
        <div className="feature-text">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            dangerouslySetInnerHTML={{ __html: t.sections.featuresTitle }}
          />
          <p className="text-lg opacity-70 leading-relaxed">
            {t.sections.featuresDesc}
          </p>
        </div>
        <div className="feature-visual">
          <img
            ref={imgRef}
            src={siteConfig.sections.featureImage}
            alt="Feature"
            className="feature-img"
          />
        </div>
      </div>
    </section>
  );
}