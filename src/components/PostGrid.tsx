'use client';

import { useState, useEffect } from 'react';
import PostCard from './PostCard';
import { useLang } from '@/hooks/useLang';
import { getLocalizedCategory } from '@/lib/utils';

interface PostGridProps {
  initialPosts: any[];
  showLoadMore?: boolean;
}

export default function PostGrid({ initialPosts, showLoadMore = true }: PostGridProps) {
  const { lang, mounted } = useLang();
  const [displayCount, setDisplayCount] = useState(6);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);

  // Listen for language changes
  useEffect(() => {
    const handleLangChange = () => {
      setFilteredPosts([...initialPosts]); // Trigger re-render with new lang
    };
    window.addEventListener('langchange', handleLangChange);
    return () => window.removeEventListener('langchange', handleLangChange);
  }, [initialPosts]);

  if (!mounted) return null;

  const postsToShow = filteredPosts.slice(0, displayCount);
  const hasMore = displayCount < filteredPosts.length;

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow.map(post => (
          <PostCard key={post.id} post={post} lang={lang} />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={() => setDisplayCount(prev => prev + 6)}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors"
          >
            {lang === 'en' ? 'Load More Articles' : '載入更多文章'}
          </button>
        </div>
      )}
    </div>
  );
}
