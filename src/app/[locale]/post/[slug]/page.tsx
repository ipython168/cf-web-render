import fs from 'fs';
import path from 'path';
import PostClient from '@/components/PostClient';

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
  const langPath = path.join(process.cwd(), 'public/lang.json');
  
  let post = null;
  let config = {};
  let langData = {};
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(data);
    
    // 從 slug 提取 id（最後的數字部分）
    const idMatch = slug.match(/-(\d+)$/);
    const postId = idMatch ? idMatch[1] : slug;
    post = posts.find((p: any) => String(p.id) === postId) || null;
    
    config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const fullLang = JSON.parse(fs.readFileSync(langPath, 'utf8'));
    langData = fullLang.zh || {};
  } catch (err) {
    console.error('Failed to load data:', err);
  }

  return (
    <main>
      <PostClient post={post} config={config} langData={langData} />
    </main>
  );
}