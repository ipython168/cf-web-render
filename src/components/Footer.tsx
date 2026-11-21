'use client';
import Link from 'next/link'; 

interface FooterProps {
  siteConfig: any;
  contentData: any;
  currentLang: string;
}

export default function Footer({ siteConfig, contentData, currentLang }: FooterProps) {
  const t = (key: string) => {
    const keys = key.split('.');
    let obj: any = contentData;
    for (const k of keys) {
      if (obj && typeof obj === 'object') {
        obj = obj[k];
      } else {
        obj = undefined;
        break;
      }
    }
    return obj || key;
  };

  const links = t('footer.links');
  const contacts = siteConfig?.footer?.contact || [];

  return (
    <footer className="bg-[var(--secondary-color)] border-t border-white/10 pt-16 pb-8 text-[var(--text-color)] transition-colors duration-300">
      <div className="max-w-[1280px] mx-auto px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-8 md:gap-16 mb-12 opacity-100 transform-none">
          {/* 品牌資訊 */}
          <div>
            <img 
              src={siteConfig?.logoImage || '/images/branding/logo.png'} 
              alt="QuantBase" 
              className="max-w-[120px] h-auto"
            />
            <p className="leading-relaxed opacity-85 text-sm text-[var(--text-color)]">{t('footer.brandDesc')}</p>
          </div>
          {/* 快速連結 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[var(--text-color)]">{t('footer.quickLinksTitle')}</h4>
            {Array.isArray(links) && links.map((item: { label: string; href: string }) => (
              <Link key={item.href} href={`/${currentLang}${item.href}`} className="block font-bold no-underline mb-3 text-[var(--text-color)] transition-all duration-300 hover:text-[var(--primary-color)]">
                {item.label}
              </Link>
            ))}
          </div>
          {/* 聯絡我們 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[var(--text-color)]">{t('footer.contactTitle')}</h4>
            {Array.isArray(contacts) && contacts.map((item: { label: string; value: string; href: string }) => (
              <p key={item.label} className="mb-3 text-sm text-[var(--text-color)]">
                <span className="font-semibold mr-2">{item.label}:</span>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {item.value}
                </a>
              </p>
            ))}
          </div>
        </div>
        {/* 版權聲明 */}
        <div className="text-center pt-8 mt-8 border-t border-gray-500/30 opacity-90 text-sm text-[var(--text-color)]">
          <p>&copy; {new Date().getFullYear()} {siteConfig?.siteName || 'QuantBase'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
