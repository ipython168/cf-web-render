// 取得本地化內容（fallback 邏輯）
export function getLocalizedContent(post: any, lang: string) {
  return (lang === 'en' && post.en?.title && post.en?.content) ? post.en : post.zh;
}

// 取得本地化分類名
export function getLocalizedCategory(post: any, lang: string): string {
  if (lang === 'en' && post.category?.en) return post.category.en;
  return post.category?.zh || post.category || '';
}

// 格式化日期
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('zh-HK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// 從 posts array 拎 unique categories
export function getUniqueCategories(posts: any[], lang: string): { name: string; value: string }[] {
  const seen = new Set<string>();
  const cats: { name: string; value: string }[] = [];
  
  posts.forEach(post => {
    const value = post.category?.en || post.category || 'other';
    if (!seen.has(value)) {
      seen.add(value);
      const name = getLocalizedCategory(post, lang);
      cats.push({ name, value });
    }
  });
  
  return cats;
}
