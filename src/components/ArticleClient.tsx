'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';


type Post = {
  id: string;
  date: string;
  image?: string;
  category: { zh: string; en: string };
  zh: { title: string; excerpt: string };
  en?: { title: string; excerpt: string };
};

type Locale = 'zh' | 'en';

const categoryMap: Record<string, string> = {
  'All': 'all',
  'Backtest': '回測結果',
  'Insights': '交易心得',
  'Tutorial': '技術教學'
};

function makeSlug(post: Post): string {
  const enTitle = post.en?.title || '';
  const cleanTitle = enTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const idPart = String(post.id);
  return cleanTitle ? `${cleanTitle}-${idPart}` : idPart;
}

export default function ArticleClient({ initialPosts, locale }: { initialPosts: Post[]; locale: Locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('search') || '';
  const initialSort = (searchParams.get('sort') as 'newest' | 'oldest') || 'newest';
  const initialCategory = searchParams.get('category') || 'all';

  const [posts, setPosts] = useState(initialPosts);
  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState<'newest' | 'oldest'>(initialSort);
  const [category, setCategory] = useState(initialCategory);

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


  useEffect(() => {
    const query = new URLSearchParams({ search, sort, category }).toString();
    const newUrl = `/${locale}/article?${query}`;
    router.replace(newUrl, { scroll: false });
  }, [search, sort, category, locale, router]);

  const filterCategories = ['All', 'Backtest', 'Insights', 'Tutorial'];
  const currentQuery = new URLSearchParams({ search, sort, category }).toString();

  return (
    <div className="min-h-screen pt-20 max-w-[1200px] mx-auto w-full">
      <Link 
        href={`/${locale}`} 
        className="inline-flex items-center px-4 py-2 bg-[var(--primary-color)] text-[#111] rounded-full no-underline font-bold transition-opacity duration-200 hover:opacity-80 hover:-translate-x-0.5 w-fit"
      >
        ← {locale === 'zh' ? '返回首頁' : 'Back to Home'}
      </Link>
      
      <input 
        type="text" 
        placeholder={locale === 'zh' ? '搜尋文章...' : 'Search articles...'} 
        className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] mt-4 mb-8 text-base focus:outline-none focus:border-[var(--primary-color)]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="flex gap-4 flex-wrap items-center">
        <div className="flex gap-2 flex-wrap">
          <button 
            className={`px-5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] cursor-pointer transition-all duration-200 text-sm hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] ${sort === 'newest' ? 'bg-[var(--primary-color)] text-[#111] border-transparent' : ''}`}
            onClick={() => setSort('newest')}
          >
            {locale === 'zh' ? '最新發佈' : 'Newest'}
          </button>
          <button 
            className={`px-5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] cursor-pointer transition-all duration-200 text-sm hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] ${sort === 'oldest' ? 'bg-[var(--primary-color)] text-[#111] border-transparent' : ''}`}
            onClick={() => setSort('oldest')}
          >
            {locale === 'zh' ? '最舊發佈' : 'Oldest'}
          </button>
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {filterCategories.map(cat => (
            <button 
              key={cat} 
              className={`px-5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] cursor-pointer transition-all duration-200 text-sm hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] ${category === categoryMap[cat] ? 'bg-[var(--primary-color)] text-[#111] border-transparent' : ''}`}
              onClick={() => setCategory(categoryMap[cat])}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 pt-6 md:pt-8 pb-12">
        {posts.map(post => {
          const slug = makeSlug(post);
          return (
            <Link 
              key={post.id} 
              href={`/${locale}/post/${slug}?from=${encodeURIComponent(currentQuery)}`}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg no-underline text-inherit"
            >
              {post.image && <img src={post.image} alt="" className="w-full h-[180px] object-cover rounded-lg mb-4" />}
              <span className="inline-block px-2 py-1 bg-[rgba(0,229,255,0.1)] text-[var(--primary-color)] rounded text-xs mb-2 self-start">
                {post.category[locale]}
              </span>
              <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">
                { (locale === 'en' && post.en ? post.en : post.zh).title }
              </h3>
              <span className="text-sm text-gray-500 mb-3">{post.date}</span>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                { (locale === 'en' && post.en ? post.en : post.zh).excerpt }
              </p>
              <span className="text-[var(--primary-color)] text-sm font-bold mt-auto">
                {locale === 'zh' ? '閱讀更多 →' : 'Read more →'}
              </span>
            </Link>
          );
        })} 
      </div>
    </div>
  );
}