import type { Metadata } from "next";
import fs from 'fs';
import path from 'path';
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from '../components/ThemeProvider';

// 引入 CSS
import "../styles/base.css";
import "../styles/layout.css";
import "../styles/post.css";
import "../styles/archive.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  return {
    title: config.siteTitle,
    description: "用數據透視市場，用紀律執行交易",
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-HK" data-theme="light" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}