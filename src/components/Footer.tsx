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
    <footer className="site-footer footer-final">
      <div className="container">
        <div className="footer-content fade-in-visible">
          <div className="footer-brand">
            <img 
              src={siteConfig?.logoImage || '/images/branding/logo.png'} 
              alt="QuantBase" 
              className="footer-logo-final"
              style={{ maxWidth: '120px', height: 'auto' }}
            />
            <p>{t('footer.brandDesc')}</p>
          </div>
          
          <div className="footer-links">
            <h4>{t('footer.quickLinksTitle')}</h4>
            {links && typeof links === 'object' ? (
              Object.entries(links)
                .filter(([key]) => key !== 'support')
                .map(([key, label]) => (
                <a key={key} href={linkMap[key] || '#'}>{label as string}</a>
              ))
            ) : null}
          </div>
          
          <div className="footer-contact">
            <h4>{t('footer.contactTitle')}</h4>
            <p><a href={`mailto:${email}`}>{email}</a></p>
            {siteConfig?.footer?.contact?.whatsapp && (
                <p>
                <a 
                    href={`https://wa.me/${siteConfig.footer.contact.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {t('footer.links.support')}
                </a>
                </p>
            )}

          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {siteConfig?.siteName || 'QuantBase'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
