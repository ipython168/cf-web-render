'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PostsFilterBar from './PostsFilterBar';
import PostCard from './PostCard';

type Post = {
  id: string;
  date: string;
  image?: string;
  category: { zh: string; en: string };
  zh: { title: string; excerpt: string };
  en?: { title: string; excerpt: string };
};

type Locale = 'zh' | 'en';

export default function PostsClient({ initialPosts, locale }: { initialPosts: Post[]; locale: Locale }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL 係唯一 source of truth
  const search = searchParams.get('search') || '';
  const sort = (searchParams.get('sort') as 'newest' | 'oldest') || 'newest';
  const category = searchParams.get('category') || 'all';

  const [posts, setPosts] = useState(initialPosts);

  const filterCategories = useMemo(() => {
    const seen = new Set<string>();
    const cats: { key: string; label: string }[] = [];
    cats.push({ key: 'all', label: locale === 'zh' ? '全部文章' : 'All Articles' });
    for (const post of initialPosts) {
      const label = post.category[locale];
      if (!seen.has(label)) {
        seen.add(label);
        cats.push({ key: label, label });
      }
    }
    return cats;
  }, [initialPosts, locale]);

  useEffect(() => {
    let filtered = initialPosts.filter(post => {
      const content = locale === 'en' && post.en?.title ? post.en : post.zh;
      const matchSearch = content.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === 'all' || post.category[locale] === category;
      return matchSearch && matchCategory;
    });

    if (sort === 'newest') {
      filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(a.date).getTime());
    }

    setPosts(filtered);
  }, [search, sort, category, initialPosts, locale]);

  const updateURL = (params: { search?: string; sort?: string; category?: string }) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (params.search !== undefined) newParams.set('search', params.search);
    if (params.sort !== undefined) newParams.set('sort', params.sort);
    if (params.category !== undefined) newParams.set('category', params.category);
    const query = newParams.toString();
    router.replace(`/${locale}/posts?${query}`, { scroll: false });
  };

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
        placeholder={locale === 'zh' ? '搜尋文章...' : 'Search posts...'} 
        className="w-full px-4 py-3 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] mt-4 mb-8 text-base focus:outline-none focus:border-[var(--primary-color)]"
        value={search}
        onChange={(e) => updateURL({ search: e.target.value })}
      />

      <PostsFilterBar
        locale={locale}
        sort={sort}
        category={category}
        filterCategories={filterCategories}
        onSortChange={(s) => updateURL({ sort: s })}
        onCategoryChange={(c) => updateURL({ category: c })}
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 pt-6 md:pt-8 pb-12">
        {posts.map(post => (
          <PostCard key={post.id} post={post} locale={locale} currentQuery={currentQuery} />
        ))} 
      </div>
    </div>
  );
}
