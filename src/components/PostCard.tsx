'use client';
import Link from 'next/link';
import { makeSlug } from '@/lib/utils';

type Post = {
  id: string;
  date: string;
  image?: string;
  category: { zh: string; en: string };
  zh: { title: string; excerpt: string };
  en?: { title: string; excerpt: string };
};

type Props = {
  post: Post;
  locale: 'zh' | 'en';
  currentQuery: string;
};

export default function PostCard({ post, locale, currentQuery }: Props) {
  const slug = makeSlug(post);
  const content = (locale === 'en' && post.en?.title ? post.en : post.zh);
  const catLabel = post.category[locale];
  const detailHref = `/${locale}/posts/${slug}?from=${encodeURIComponent(currentQuery)}`;

  return (
    <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg no-underline text-inherit">
      {post.image && (
        <Link href={detailHref} className="block no-underline">
          <img src={post.image} alt="" className="w-full h-[180px] object-cover rounded-lg mb-4" />
        </Link>
      )}
      <Link
        href={`/${locale}/posts?category=${encodeURIComponent(catLabel)}`}
        className="inline-block px-2 py-1 bg-[rgba(0,229,255,0.1)] text-[var(--primary-color)] rounded text-xs self-start no-underline transition-all duration-200 hover:bg-[var(--primary-color)] hover:text-[#111] mb-2"
      >
        {catLabel}
      </Link>
      <h3 className="text-xl font-bold mb-1 text-[var(--text-color)]">{content.title}</h3>
      <span className="text-sm text-gray-500 mb-3">{post.date}</span>
      <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow line-clamp-3">{content.excerpt}</p>
      <Link
        href={detailHref}
        className="text-[var(--primary-color)] text-sm font-bold mt-auto no-underline hover:underline"
      >
        {locale === 'zh' ? '閱讀更多 →' : 'Read more →'}
      </Link>
    </div>
  );
}
