// src/app/article/ArticleClient.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link'; // 👈 引入 Next.js Link


// 定義 Post 類型（按你 JSON 結構調整）
type Post = {
  id: string;
  date: string;
  image?: string;
  category: { zh: string; en: string };
  zh: { title: string; excerpt: string };
  en?: { title: string; excerpt: string };
};

export default function ArticleClient({ initialPosts }: { initialPosts: Post[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [category, setCategory] = useState('all');
  
  // 👈 修復 TS2367：顯式宣告為 'zh' | 'en' 聯合類型
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  useEffect(() => {
    let filtered = initialPosts.filter(post => {
      const content = lang === 'en' && post.en ? post.en : post.zh;
      const matchSearch = content.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || post.category.en === category;
      return matchSearch && matchCategory;
    });

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setPosts(filtered);
  }, [search, sort, category, lang, initialPosts]);

  return (
    <div className="container archive-header">
      {/* Back to Home 用 Link */}
      <Link href="/" className="back-link">← Back to Home</Link>
      <h1>All Articles</h1>

      <div className="archive-controls">
        <input 
          type="text" 
          className="search-input"
          placeholder="Search..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="archive-sort-group">
        <button className={`sort-btn ${sort === 'newest' ? 'active' : ''}`} onClick={() => setSort('newest')}>Newest</button>
        <button className={`sort-btn ${sort === 'oldest' ? 'active' : ''}`} onClick={() => setSort('oldest')}>Oldest</button>
      </div>

      <div id="category-filters" className="category-filters">
        {['all', 'Backtest', 'Insights', 'Tutorial'].map(cat => (
          <button 
            key={cat} 
            className={`filter-btn ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat === 'all' ? 'All Articles' : cat}
          </button>
        ))}
      </div>

      <div className="posts-grid">
        {posts.map((post) => {
          const content = (lang === 'en' && post.en) ? post.en : post.zh;
          const catName = lang === 'en' ? post.category.en : post.category.zh;

          return (
            <Link key={post.id} href={`/articles/${post.id}`} className="post-card">
              {post.image && <img src={post.image} alt={content.title} className="post-cover-img" />}
              <div className="post-category">{catName}</div>
              <h3 className="post-title">{content.title}</h3>
              <p className="post-date">{post.date}</p>
              <p className="post-excerpt">{content.excerpt}</p>
              <span className="read-more">Read more →</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}