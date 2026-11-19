import fs from 'fs';
import path from 'path';
import PostClient from '@/components/PostClient';

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
      params.push({ locale, id: String(post.id) });
    }
  }
  return params;
}

export default async function PostPage({ params }: { params: { locale: string, id: string } }) {
  const filePath = path.join(process.cwd(), 'public/posts.json');
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');
  
  let post = null;
  let config = {};
  let langData = {};
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const posts = JSON.parse(data);
    post = posts.find((p: any) => String(p.id) === params.id) || null;
    
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
