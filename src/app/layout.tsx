import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import ThemeProvider from '../components/ThemeProvider';
import "./globals.css";

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');

  let title = '';
  let description = "";

  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    title = config.siteTitle || title;
    const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    const zhData = langData.zh || {};
    description = zhData.hero?.subtitle || description;
  } catch {}
  return { title, description };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK" data-theme="light" suppressHydrationWarning className="scroll-smooth">
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
