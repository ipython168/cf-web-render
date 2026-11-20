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
    <section id="features" className="py-20 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-[5%] flex flex-col md:flex-row items-center justify-between gap-10"> 
        <div className="flex-1 max-w-[500px] mt-0">
          <h2
            className="text-4xl md:text-5xl leading-tight mb-6 fade-in"
            dangerouslySetInnerHTML={{ __html: t.sections.featuresTitle }}
          />
          <p className="text-lg opacity-70 leading-relaxed mb-6 fade-in">
            {t.sections.featuresDesc}
          </p>
        </div>
        <div className="flex-1 flex justify-center md:justify-end pl-8 perspective-[1000px]">
          <div className="fade-in">
            <img 
              ref={imgRef} 
              src={siteConfig.sections.featureImage} 
              className="max-w-[400px] w-full h-auto object-cover rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] [transform:rotate(-4deg)_translateZ(0)] transition-transform duration-500 ease-out cursor-pointer hover:[transform:rotate(4deg)_translateY(-15px)_scale(1.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.15)]" 
            />
          </div> 
        </div>
      </div>
    </section>
  );
}