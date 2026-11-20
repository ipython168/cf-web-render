'use client';

interface FooterProps {
  siteConfig: any;
  langData: any;
}

export default function Footer({ siteConfig, langData }: FooterProps) {
  const t = (key: string) => {
    const keys = key.split('.');
    let obj: any = langData;
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

  const linkMap: Record<string, string> = {
    about: '/about',
    backtest: '/backtest',
    insights: '/insights',
    privacy: '/privacy' 
  };

  const links = t('footer.links');
  const email = siteConfig?.footer?.contact?.email || 'info@myquant.hk';
  const whatsapp = siteConfig?.footer?.contact?.whatsapp || '';

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
            {links && typeof links === 'object' ? (
              Object.entries(links)
                .filter(([key]) => key !== 'support')
                .map(([key, label]) => (
                <a key={key} href={linkMap[key] || '#'} className="block font-bold no-underline mb-3 text-[var(--text-color)] transition-all duration-300 hover:text-[var(--primary-color)]">{label as string}</a>
              ))
            ) : null}
          </div>
          {/* 聯絡我們 */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-[var(--text-color)]">{t('footer.contactTitle')}</h4>
            <p className="mb-3 text-sm text-[var(--text-color)]"><a href={`mailto:${email}`} className="block font-bold no-underline mb-3 text-[var(--text-color)] transition-all duration-300 hover:text-[var(--primary-color)]">{email}</a></p>
            {siteConfig?.footer?.contact?.whatsapp && (
                <p className="mb-3 text-sm text-[var(--text-color)]">
                <a 
                    href={`https://wa.me/${siteConfig.footer.contact.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block font-bold no-underline mb-3 text-[var(--text-color)] transition-all duration-300 hover:text-[var(--primary-color)]"
                >
                    {t('footer.links.support')}
                </a>
                </p>
            )}
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





