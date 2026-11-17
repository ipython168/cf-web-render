'use client';

interface FooterProps {
  siteConfig: any;
  t: any;
}

export default function Footer({ siteConfig, t }: FooterProps) {
  return (
    <footer className="site-footer bg-white dark:bg-zinc-900 border-t border-gray-200 dark:border-zinc-800 pt-16 pb-8 fade-in">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-cyan-500 mb-4">
              <img src={siteConfig.logoImage} alt="Logo" className="h-12" />
            </h3>
            <p className="opacity-70 leading-relaxed">{t.footer.brandDesc}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.quickLinksTitle}</h4>
            <div className="space-y-2">
              <a href="#" className="block opacity-70 hover:opacity-100 transition-opacity">{t.footer.links.about}</a>
              <a href="#" className="block opacity-70 hover:opacity-100 transition-opacity">{t.footer.links.backtest}</a>
              <a href="#" className="block opacity-70 hover:opacity-100 transition-opacity">{t.footer.links.insights}</a>
              <a href="#" className="block opacity-70 hover:opacity-100 transition-opacity">{t.footer.links.privacy}</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">{t.footer.contactTitle}</h4>
            <div className="space-y-2 opacity-70">
              <p>{siteConfig.footer?.contact?.email || ''}</p>
              <p>{siteConfig.footer?.contact?.support || ''}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-zinc-800 pt-8 text-center opacity-50 text-sm">
          <p>© {new Date().getFullYear()} {siteConfig.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
