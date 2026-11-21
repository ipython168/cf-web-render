import fs from 'node:fs/promises';
import path from 'node:path';
import { Suspense } from 'react'; 
import ArticleClient from '@/components/ArticleClient';

type Post = {
  id: string;
  category: { zh: string; en: string };
  date: string;
  image?: string;
  zh: { title: string; excerpt: string };
  en: { title: string; excerpt: string };
};

async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'public/posts.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export async function generateStaticParams() {
  return [
    { locale: 'zh' },
    { locale: 'en' },
  ];
}

export default async function ArticlePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = await getPosts();

  return (
    <main className="max-w-[1280px] mx-auto px-[5%] flex flex-col gap-4">
      <Suspense fallback={<div>Loading articles...</div>}>
        <ArticleClient initialPosts={posts} locale={locale as 'zh' | 'en'} />
      </Suspense>
    </main>
  );
}
