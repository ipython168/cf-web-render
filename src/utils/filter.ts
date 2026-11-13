import { renderCards } from '../views/archive'; // 我哋需要叫 archive render 卡片

let currentCategory = 'all';
let currentSort = 'newest';
let currentQuery = '';

export const bindFilterEvents = (allPosts: any[], lang: string) => {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  const filterContainer = document.getElementById('category-filters');

  // 核心過濾邏輯
  const applyFilters = () => {
    let result = allPosts.filter(post => {
      const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
      const catValue = post.category?.en || post.category;
      
      const matchesSearch = content.title.toLowerCase().includes(currentQuery) || content.excerpt.toLowerCase().includes(currentQuery);
      const matchesCategory = currentCategory === 'all' || catValue === currentCategory;
      
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return currentSort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    renderCards(result, lang);
  };

  // 1. 搜尋
  searchInput?.addEventListener('input', (e) => {
    currentQuery = (e.target as HTMLInputElement).value.toLowerCase();
    applyFilters();
  });

  // 2. 排序掣
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      currentSort = target.dataset.sort!;
      applyFilters();
    });
  });
  
  // 3. 分類掣
  filterContainer?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      currentCategory = target.dataset.category!;
      applyFilters();
    }
  });

  // 初始化時執行一次
  applyFilters();
};
