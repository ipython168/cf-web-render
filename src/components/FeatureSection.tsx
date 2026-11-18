'use client';

interface FeatureSectionProps {
  siteConfig: any;
  t: any;
}

export default function FeatureSection({ siteConfig, t }: FeatureSectionProps) {
  return (
    <section id="features" className="feature-section py-20 fade-in overflow-hidden">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center" style={{ perspective: '1000px' }}>
          {/* 左邊文字 */}
          <div className="feature-text">
            <h2
              className="text-3xl md:text-4xl font-bold mb-6"
              dangerouslySetInnerHTML={{ __html: t.sections.featuresTitle }}
            />
            <p className="text-lg opacity-70 leading-relaxed">
              {t.sections.featuresDesc}
            </p>
          </div>
          {/* 右邊圖片 */}
          <div className="feature-visual">
            <img
              src={siteConfig.sections.featureImage}
              alt="Feature"
              className="feature-img w-full rounded-xl shadow-lg transition-transform duration-600 ease-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
