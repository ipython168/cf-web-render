// src/app/page.tsx
import fs from 'fs';
import path from 'path';
import HomeClient from './HomeClient';

function readJson(filePath: string) {
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch {
    return {};
  }
}

export default function HomePage() {
  const config = readJson('site-config.json');
  const langData = readJson('lang.json');
  const stats = readJson('stats.json');
  const postsData = readJson('posts.json');
  const posts = postsData.posts || postsData || [];

  return (
    <HomeClient
      config={config}
      langData={langData}
      posts={posts}
      stats={stats}
    />
  );
}