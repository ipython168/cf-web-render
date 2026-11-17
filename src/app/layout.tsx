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
  let title = 'QuantBase';
  try {
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    title = config.siteTitle || title;
  } catch {}
  return { title, description: "用數據透視市場，用紀律執行交易" };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK" data-theme="light" suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
