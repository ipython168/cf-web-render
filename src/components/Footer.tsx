'use client';

import { useLang } from '@/hooks/useLang';

interface FooterProps {
  siteConfig: any;
  langData: any;
}

export default function Footer({ siteConfig, langData }: FooterProps) {
  const { lang } = useLang();

  const t = (key: string) => {
    const keys = key.split('.');
    let obj = langData?.[lang] || langData?.zh || {};
    for (const k of keys) {
      obj = obj?.[k];
    }
    return obj || key;
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img
              src={siteConfig.logoImage}
              alt="QuantBase Logo"
              className="logo-img-footer"
            />
            <p>{t('footer.description')}</p>
          </div>
          <div className="footer-links">
            <h4>{t('footer.links.title')}</h4>
            {(siteConfig.navLinks || []).map((link: any, i: number) => (
              <a key={i} href={link.href}>{link.label}</a>
            ))}
          </div>
          <div className="footer-contact">
            <h4>{t('footer.contact.title')}</h4>
            <p>{t('footer.contact.email')}</p>
            <p>{t('footer.contact.phone')}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} QuantBase. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}
