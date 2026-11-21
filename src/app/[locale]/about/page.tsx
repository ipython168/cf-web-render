import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const filePath = path.join(process.cwd(), 'public/about.json');
  const rawData = await fs.readFile(filePath, 'utf8');
  const aboutData = JSON.parse(rawData);
  const content = aboutData[locale as keyof typeof aboutData];

  return (
    <main className="text-[var(--text-color)] font-sans overflow-hidden">
      {/* Section 1: Hero */}
      <section className="relative max-w-[1280px] mx-auto px-[5%] py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 z-10">
          <div className="text-[var(--primary-color)] text-sm font-bold tracking-widest mb-4 uppercase">
            {content.heroBadge}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {content.heroTitle}
          </h1>
          <p className="text-[var(--text-color-2)] text-lg leading-relaxed mb-8">
            {content.heroDesc}
          </p>
          <div className="flex gap-4 flex-wrap">
            {content.tags.map((tag: string) => (
              <span key={tag} className="px-4 py-2 rounded-full border border-[var(--tertiary-color)] text-sm font-bold text-[var(--tertiary-color)]">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex-1 relative h-[400px] w-full bg-gradient-to-br from-[var(--secondary-color)] to-[var(--secondary-color)] rounded-3xl flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-center text-[var(--primary-color)] opacity-20 text-9xl font-bold">
            {content.heroCardIcon}
          </div>
          <div className="z-10 bg-[var(--card-bg)] p-4 rounded-2xl shadow-lg transform rotate-3">
            <div className="text-xs font-bold mb-2">{content.heroCardTag}</div>
            <div className="text-sm">{content.heroCardText}</div>
          </div>
        </div>
      </section>

      {/* Section 2: Why we started */}
      <section className="max-w-[1280px] mx-auto px-[5%] py-20 flex flex-col md:flex-row gap-12">
        <div className="md:w-1/3">
          <div className="text-[var(--primary-color)] text-sm font-bold tracking-widest mb-4 uppercase">
            {content.whySectionLabel}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            {content.whyTitle}
          </h2>
        </div>
        <div className="md:w-2/3 text-[var(--text-color-2)] text-lg leading-relaxed space-y-6">
          <p>{content.whyParagraph1}</p>
          <p>{content.whyParagraph2}</p>
          <div className="py-12 text-center md:text-left text-4xl md:text-6xl font-bold text-[var(--primary-color)] leading-tight"
               dangerouslySetInnerHTML={{ __html: content.quote }} />
        </div>
      </section>

      {/* Section 3: Contact */}
      <section className="max-w-[1180px] mx-auto px-[5%] py-20 bg-[var(--card-bg)] rounded-3xl my-12">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <div className="text-[var(--primary-color)] text-sm font-bold tracking-widest mb-4 uppercase">
              {content.contactLabel}
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6"
                dangerouslySetInnerHTML={{ __html: content.contactTitle }} />
            <p className="text-[var(--text-color-2)]">{content.contactDesc}</p>
          </div>
          <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {content.contacts.map((item: { label: string; value: string; href: string }) => (
              <Link key={item.label} href={item.href} target="_blank" className="block p-4 rounded-2xl border border-[var(--border-color)] shadow-sm hover:shadow-md transition-shadow bg-[var(--card-bg)] group">
                <div className="text-xs text-[var(--text-color-2)] mb-1">{item.label}</div>
                <div className="text-[var(--primary-color)] font-bold group-hover:underline">{item.value}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Footer Banner */}
      <section className="bg-[var(--bg-color)] text-[var(--text-color)] py-24 text-center px-[5%]">
        <div className="text-xs tracking-widest text-[var(--text-color-2)] mb-6 uppercase">
          {content.footerBadge}
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6">{content.footerTitle}</h2>
        <p className="text-[var(--text-color-2)] mb-12">{content.footerDesc}</p>
        <div className="text-2xl md:text-3xl text-[var(--primary-color)] font-bold">{content.footerSlogan}</div>
      </section>
    </main>
  );
}
