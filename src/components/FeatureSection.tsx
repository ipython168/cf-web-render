'use client';

interface FeatureSectionProps {
  siteConfig: any;
  t: any;
}

export default function FeatureSection({ siteConfig, t }: FeatureSectionProps) {
  return (
    <section id="features" className="feature-section py-20 fade-in">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
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
              className="feature-img w-full rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
