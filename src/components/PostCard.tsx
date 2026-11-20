'use client';

import Link from 'next/link';
import { getLocalizedContent, getLocalizedCategory, formatDate } from '@/lib/utils';

interface PostCardProps {
  post: any;
  lang: string;
}

export default function PostCard({ post, lang }: PostCardProps) {
  const content = getLocalizedContent(post, lang);
  const catName = getLocalizedCategory(post, lang);
  const readMore = lang === 'en' ? 'Read more' : '閱讀更多';

  return (
    <Link href={`/post/${post.id}`} className="block group">
      <article className="rounded-xl overflow-hidden bg-white dark:bg-zinc-800/50 border border-gray-200 dark:border-zinc-700 hover:shadow-lg transition-all duration-300 fade-in">
        {post.image && (
          <div className="overflow-hidden">
            <img
              src={post.image}
              alt={content.title}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-5">
          <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 mb-3">
            {catName}
          </div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-500 transition-colors">
            {content.title}
          </h3>
          <p className="text-sm opacity-50 mb-3">{formatDate(post.date)}</p>
          <p className="text-sm opacity-70 line-clamp-2 mb-4">{content.excerpt}</p>
          <span className="text-cyan-500 font-medium text-sm group-hover:underline">
            {readMore} →
          </span>
        </div>
      </article>
    </Link>
  );
}
