'use client';

import { useEffect, useState } from 'react';
import { useLang } from '@/hooks/useLang';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { getLocalizedContent, getLocalizedCategory, formatDate } from '@/lib/utils';

interface PostClientProps {
  post: any;
  langData: any;
  config: any;
}

export default function PostClient({ post, langData, config }: PostClientProps) {
  const { lang, mounted } = useLang();
  const [parsedContent, setParsedContent] = useState('');

  useEffect(() => {
    if (!mounted) return;

    const content = getLocalizedContent(post, lang);
    let html = content.content || '';

    html = html
      .replace(/### (.+)/g, '<h3 class="text-xl font-bold mt-6 mb-3">$1</h3>')
      .replace(/## (.+)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>')
      .replace(/# (.+)/g, '<h1 class="text-3xl font-bold mt-10 mb-5">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-zinc-800 p-4 rounded-lg overflow-x-auto my-4"><code>$2</code></pre>')
      .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm">$1</code>')
      .replace(/!\[(.+?)\]\((.+?)\)/g, '<img src="$2" alt="$1" class="my-4 rounded-lg max-w-full" />')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-cyan-500 hover:underline">$1</a>')
      .replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed">')
      .replace(/\n/g, '<br/>');

    setParsedContent(`<p class="mb-4 leading-relaxed">${html}</p>`);
  }, [post, lang, mounted]);

  if (!mounted) return null;

  const t = langData[lang];
  const content = getLocalizedContent(post, lang);
  const catName = getLocalizedCategory(post, lang);
  const backText = lang === 'en' ? '← All Articles' : '← 所有文章';
  const disclaimerText = lang === 'en'
    ? 'Disclaimer: The content above is for sharing and educational purposes only and does not constitute any investment advice.'
    : '免責聲明：以上內容純屬分享與教學用途，不構成任何投資建議。';

  return (
    <div>
      <Navbar siteConfig={config} langData={langData} />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="max-w-3xl mx-auto px-4">
          <a href="/archive" className="text-cyan-500 hover:underline mb-6 inline-block">
            {backText}
          </a>
          <article>
            <div className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 mb-4">
              {catName}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.title}</h1>
            <p className="text-sm opacity-50 mb-6">{formatDate(post.date)}</p>
            {post.image && (
              <img src={post.image} alt={content.title} className="w-full rounded-xl mb-8" />
            )}
            <div className="post-body prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: parsedContent }} />
            <div className="mt-12 p-4 bg-gray-100 dark:bg-zinc-800 rounded-lg text-sm opacity-70">
              {disclaimerText}
            </div>
          </article>
        </div>
      </main>
      <Footer siteConfig={config} langData={t} />
    </div>
  );
}
