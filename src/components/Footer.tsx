import React from 'react';

interface FooterProps {
  siteConfig: any;
  t: any;
}

export default function Footer({ siteConfig, t }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          
          <div className="footer-brand">
            <h3>
              <img src={siteConfig.logoImage} alt="Logo" style={{ height: '48px', display: 'block' }} />
            </h3>
            <p>{t.footer.brandDesc}</p>
          </div>

          <div className="footer-links">
            <h4>{t.footer.quickLinksTitle}</h4>
            <a href="#">{t.footer.links.about}</a>
            <a href="#">{t.footer.links.backtest}</a>
            <a href="#">{t.footer.links.insights}</a>
            <a href="#">{t.footer.links.privacy}</a>
          </div>

          <div className="footer-contact">
            <h4>{t.footer.contactTitle}</h4>
            <p>{siteConfig.footer.contact.email}</p>
            {/* 👈 加返 support */}
            <p>{t.footer.support}</p> 
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}