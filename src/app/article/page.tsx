// src/app/article/page.tsx
import fs from 'node:fs/promises';
import path from 'node:path';
import ArticleClient from './ArticleClient'; // 引入客戶端互動組件

// 定義 Post 類型
type Post = {
  id: string;
  category: { zh: string; en: string };
  date: string;
  image?: string;
  zh: { title: string; excerpt: string };
  en: { title: string; excerpt: string };
};

// 服務端讀取 JSON
async function getPosts(): Promise<Post[]> {
  const filePath = path.join(process.cwd(), 'public/posts.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}

export default async function ArticlePage() {
  const posts = await getPosts();
  
  return (
    <main className="container archive-header">
      {/* 將數據傳遞給客戶端組件處理搜索同篩選 */}
      <ArticleClient initialPosts={posts} />
    </main>
  );
}