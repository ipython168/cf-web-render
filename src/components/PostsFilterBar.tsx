'use client';

type FilterBarProps = {
  locale: 'zh' | 'en';
  sort: 'newest' | 'oldest';
  category: string;
  filterCategories: { key: string; label: string }[];
  onSortChange: (s: 'newest' | 'oldest') => void;
  onCategoryChange: (c: string) => void;
};

export default function PostsFilterBar({
  locale, sort, category, filterCategories,
  onSortChange, onCategoryChange
}: FilterBarProps) {
  const btnClass = (isActive: boolean) =>
    `px-5 py-2 rounded-full border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-color)] cursor-pointer transition-all duration-200 text-sm hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] ${
      isActive ? 'bg-[var(--primary-color)] text-[#111] border-transparent' : ''
    }`;

  return (
    <div className="flex gap-4 flex-wrap items-center">
      <div className="flex gap-2 flex-wrap w-full">
        <button className={btnClass(sort === 'newest')} onClick={() => onSortChange('newest')}>
          {locale === 'zh' ? '最新發佈' : 'Newest'}
        </button>
        <button className={btnClass(sort === 'oldest')} onClick={() => onSortChange('oldest')}>
          {locale === 'zh' ? '最舊發佈' : 'Oldest'}
        </button>
      </div>
      <div className="flex gap-2 flex-wrap w-full">
        {filterCategories.map(cat => (
          <button key={cat.key} className={btnClass(category === cat.key)} onClick={() => onCategoryChange(cat.key)}>
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
