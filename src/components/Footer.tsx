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

  // 快速連結映射（對應 lang.json 的 footer.links）
  const linkMap: Record<string, string> = {
    about: '/about',
    backtest: '/backtest',
    insights: '/insights',
    privacy: '/privacy',
    support: '/support'
  };

  const links = t('footer.links');
  const email = siteConfig?.footer?.contact?.email || 'info@myquant.hk';

  return (
    <footer className="site-footer footer-final">
      <div className="container">
        <div className="footer-content fade-in">
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
              Object.entries(links).map(([key, label]) => (
                <a key={key} href={linkMap[key] || '#'}>{label as string}</a>
              ))
            ) : null}
          </div>
          
          <div className="footer-contact">
            <h4>{t('footer.contactTitle')}</h4>
            <p>{email}</p>
            {/* 已移除 phone，因 site-config.json 無此欄位，避免出 undefined */}
          </div>
        </div>
        
        <div className="footer-bottom fade-in">
          <p>&copy; {new Date().getFullYear()} QuantBase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}