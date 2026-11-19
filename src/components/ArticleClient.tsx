'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

type Post = {
  id: string;
  date: string;
  image?: string;
  category: { zh: string; en: string };
  zh: { title: string; excerpt: string };
  en?: { title: string; excerpt: string };
};

type Locale = 'zh' | 'en';

// 映射篩選分類
const categoryMap: Record<string, string> = {
  'All': 'all',
  'Backtest': '回測結果',
  'Insights': '交易心得',
  'Tutorial': '技術教學'
};

export default function ArticleClient({ initialPosts, locale }: { initialPosts: Post[]; locale: Locale }) {
  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<'newest' | 'oldest'>('newest');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    let filtered = initialPosts.filter(post => {
      const content = locale === 'en' && post.en ? post.en : post.zh;
      const matchSearch = content.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || post.category[locale] === category;
      return matchSearch && matchCategory;
    });

    if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    setPosts(filtered);
  }, [search, sort, category, initialPosts, locale]);

  const filterCategories = ['All', 'Backtest', 'Insights', 'Tutorial'];

  return (
    <div className="min-h-screen article-page-wrapper">
      <Link href={`/${locale}`} className="back-link">← {locale === 'zh' ? '返回首頁' : 'Back to Home'}</Link>
      
      <input 
        type="text" 
        placeholder={locale === 'zh' ? '搜尋文章...' : 'Search articles...'} 
        className="article-search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="filter-row">
        <div className="sort-group">
          <button className={`article-filter-btn ${sort === 'newest' ? 'active' : ''}`} onClick={() => setSort('newest')}>
            {locale === 'zh' ? '最新發佈' : 'Newest'}
          </button>
          <button className={`article-filter-btn ${sort === 'oldest' ? 'active' : ''}`} onClick={() => setSort('oldest')}>
            {locale === 'zh' ? '最舊發佈' : 'Oldest'}
          </button>
        </div>
        
        <div className="category-group">
          {filterCategories.map(cat => (
            <button 
              key={cat} 
              className={`article-filter-btn ${category === categoryMap[cat] ? 'active' : ''}`}
              onClick={() => setCategory(categoryMap[cat])}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="post-grid-archive">
        {posts.map(post => (
          <Link key={post.id} href={`/${locale}/post/${post.id}`} className="post-card-archive">
            {post.image && <img src={post.image} alt="" className="post-image" />}
            <span className="post-category">{post.category[locale]}</span>
            <h3 className="post-title">{ (locale === 'en' && post.en ? post.en : post.zh).title }</h3>
            <span className="post-date">{post.date}</span>
            <p className="post-excerpt">{ (locale === 'en' && post.en ? post.en : post.zh).excerpt }</p>
            <span className="read-more">{locale === 'zh' ? '閱讀更多 →' : 'Read more →'}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
