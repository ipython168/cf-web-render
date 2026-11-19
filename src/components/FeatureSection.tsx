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


  // 等圖 load 完先 observe，避免 layout shift
  const handleLoad = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 延遲一幀，等瀏覽器 idle 先播
            requestAnimationFrame(() => {
              img.classList.add('spin-right');
            });
            observer.unobserve(img);
          }
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );
    observer.observe(img);
  };

  if (img.complete) {
    handleLoad();
  } else {
    img.addEventListener('load', handleLoad);
  }

    return () => {
    img.removeEventListener('load', handleLoad);
  };
  }, []);
  
  return (
    <section id="features" className="feature-section overflow-hidden">
      <div className="container">
        {/* 唔加任何 flex/grid class，全部交 CSS 控制 */}
        <div className="feature-text sticky-text">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 fade-in"
            dangerouslySetInnerHTML={{ __html: t.sections.featuresTitle }}
          />
          <p className="text-lg opacity-70 leading-relaxed fade-in">
            {t.sections.featuresDesc}
          </p>
        </div>
        <div className="feature-visual">
          <div className="feature-img fade-in">
            <img ref={imgRef} src={siteConfig.sections.featureImage} className="feature-img" />
          </div> 
        </div>
      </div>
    </section>
  );
}