import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import ThemeProvider from '../components/ThemeProvider';
import "./globals.css";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  let title = 'QuantBase';
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    title = config.siteTitle || title;
  } catch {}
  return { title, description: "用數據透視市場，用紀律執行交易" };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 讀取 siteConfig 同 langData
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');
  
  let siteConfig = {};
  let langData = {};
  try {
    siteConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  } catch (err) {
    console.error('Failed to load config files:', err);
  }

  return (
    <html lang="zh-HK" data-theme="light" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          <Navbar siteConfig={siteConfig} langData={langData} />
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
          <Footer siteConfig={siteConfig} langData={langData} />
        </ThemeProvider>
      </body>
    </html>
  );
}