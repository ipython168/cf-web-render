'use client';

interface FeatureSectionProps {
  siteConfig: any;
  t: any;
}

export default function FeatureSection({ siteConfig, t }: FeatureSectionProps) {
  return (
    <section id="features" className="feature-section">
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
            src={siteConfig.sections.featureImage}
            alt="Feature"
            className="feature-img"
          />
        </div>
      </div>
    </section>
  );
}