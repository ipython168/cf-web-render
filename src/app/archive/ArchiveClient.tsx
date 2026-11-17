'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import { useScrollFade } from '@/hooks/useScrollFade';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PostCard from '../../components/PostCard';
import { getLocalizedCategory, getUniqueCategories } from '@/lib/utils';

interface ArchiveClientProps {
  posts: any[];
  langData: any;
  config: any;
}

export default function ArchiveClient({ posts, langData, config }: ArchiveClientProps) {
  const { lang, mounted } = useLang();
  useScrollFade();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const handleLangChange = () => {
      // Force re-render when language changes
      setSearchQuery(prev => prev);
    };
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, []);

  if (!mounted) return null;

  const t = langData[lang];
  const archiveT = t.archive || {};
  const categories = getUniqueCategories(posts, lang);

  // Filter & sort
  let filtered = [...posts];

  // Search
  if (searchQuery) {
    filtered = filtered.filter(post => {
      const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
      return (
        content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }

  // Category
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(post => {
      const catValue = post.category?.en || post.category || '';
      return catValue === selectedCategory;
    });
  }

  // Sort
  filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div>
      <Navbar siteConfig={config} langData={langData} />

      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <a href="/" className="text-cyan-500 hover:underline mb-4 inline-block">
              ← {archiveT.backToHome || (lang === 'en' ? 'Back to Home' : '返回首頁')}
            </a>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">
              {archiveT.pageTitle || (lang === 'en' ? 'All Articles' : '所有文章')}
            </h1>
          </div>

          {/* Controls */}
          <div className="space-y-4 mb-8">
            {/* Search */}
            <input
              type="text"
              id="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={archiveT.searchPlaceholder || (lang === 'en' ? 'Search...' : '搜尋文章...')}
              className="w-full max-w-md px-4 py-2.5 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            {/* Sort + Categories */}
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setSortOrder('newest')}
                  className={`sort-btn px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    sortOrder === 'newest'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {archiveT.sortNewest || (lang === 'en' ? 'Newest' : '最新發佈')}
                </button>
                <button
                  onClick={() => setSortOrder('oldest')}
                  className={`sort-btn px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    sortOrder === 'oldest'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {archiveT.sortOldest || (lang === 'en' ? 'Oldest' : '最舊發佈')}
                </button>
              </div>

              <div className="flex flex-wrap gap-2" id="category-filters">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`filter-btn px-4 py-1.5 rounded-lg text-sm transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-cyan-500 text-white'
                      : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {archiveT.allCategory || (lang === 'en' ? 'All' : '全部')}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setSelectedCategory(cat.value)}
                    className={`filter-btn px-4 py-1.5 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat.value
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <p className="text-center py-12 opacity-50">
              {lang === 'en' ? 'No articles found.' : '沒有相關文章。'}
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <PostCard key={post.id} post={post} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer siteConfig={config} t={t} />
    </div>
  );
}
