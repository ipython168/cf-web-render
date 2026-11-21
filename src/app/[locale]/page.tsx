import fs from 'fs';
import path from 'path';
import HomeClient from '@/components/HomeClient';

function readJson(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  return [
    { locale: 'zh' },
    { locale: 'en' },
  ];
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const config = readJson('site-config.json');
  const contentData = readJson('content.json');
  const stats = readJson('stats.json');
  const postsData = readJson('posts.json');
  const posts = postsData.posts || postsData || [];

  return (
    <HomeClient
      config={config}
      contentData={contentData}
      posts={posts}
      stats={stats}
      locale={locale}
    />
  );
}
