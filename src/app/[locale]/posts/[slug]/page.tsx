import fs from 'fs';
import path from 'path';
import OnePostClient from '@/components/OnePostClient';
import { Suspense } from 'react'; 

function makeSlug(post: any): string {
  const enTitle = post.en?.title || '';
  const cleanTitle = enTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const idPart = String(post.id);
  return cleanTitle ? `${cleanTitle}-${idPart}` : idPart;
}

export async function generateStaticParams() {
  const postsPath = path.join(process.cwd(), 'public/posts.json');
  let posts = [];
  try {
    const data = fs.readFileSync(postsPath, 'utf8');
    posts = JSON.parse(data);
  } catch (err) {
    console.error('Failed to load posts:', err);
  }

  const locales = ['zh', 'en'];
  const params = [];
  for (const locale of locales) {
    for (const post of posts) {
      params.push({ locale, slug: makeSlug(post) });
    }
  }
  return params;
}

export default async function PostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;

  const filePath = path.join(process.cwd(), 'public/posts.json');
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const contentPath = path.join(process.cwd(), 'public/content.json');
  
  let post = null;
  let config = {};
  let contentData = {};
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(data);
    const idMatch = slug.match(/-(\d+)$/);
    const postId = idMatch ? idMatch[1] : slug;
    post = posts.find((p: any) => String(p.id) === postId) || null;
    
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const fullContent = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
    contentData = fullContent.zh || {};
  } catch (err) {
    console.error('Failed to load data:', err);
  }

  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>  {/* 新增 Suspense 邊界 */}
        <OnePostClient post={post} config={config} contentData={contentData} />
      </Suspense>
    </main>
  );
} 








