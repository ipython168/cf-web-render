import Link from 'next/link';
import fs from 'fs/promises';
import path from 'path';

export async function generateStaticParams() {
  return [{ locale: 'zh' }, { locale: 'en' }];
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const filePath = path.join(process.cwd(), 'public/privacy.json');
  const rawData = await fs.readFile(filePath, 'utf8');
  const data = JSON.parse(rawData);
  const content = data[locale as keyof typeof data];

  return (
    <main className="text-[var(--text-color)] font-sans overflow-hidden">
      {/* Header */}
      <section className="max-w-[900px] mx-auto px-[5%] pt-20 pb-10">
        <div className="text-[#00A896] text-sm font-bold tracking-widest mb-4 uppercase">
          {locale === 'zh' ? '法律文件' : 'Legal'}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          {content.title}
        </h1>
        <p className="text-sm text-gray-500">{content.lastUpdated}</p>
      </section>

      {/* Sections */}
      <section className="max-w-[900px] mx-auto px-[5%] pb-20">
        <div className="space-y-12">
          {content.sections.map((section: { heading: string; content: string }) => (
            <div key={section.heading}>
              <h2 className="text-xl font-bold mb-4 text-[var(--text-color)]">
                {section.heading}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Note */}
        <div className="mt-16 p-6 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)]">
          <p className="text-gray-600">
            {content.contactNote}
          </p>
          <div className="flex gap-6 mt-4 flex-wrap">
            <Link href="mailto:info@quantBase.hk" className="text-[#00A896] font-bold hover:underline">
              info@quantBase.hk
            </Link>
            <Link href="https://wa.me/85269874523" className="text-[#00A896] font-bold hover:underline">
              +852 6987 4523
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
