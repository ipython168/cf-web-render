import { handleScrollFade } from '../utils/animations';

let allPosts: any[] = [];
let filteredPosts: any[] = [];
let currentCategory = 'all';
let currentSort = 'newest';
let currentQuery = '';

export const renderArchive = async (t: any) => {
  const app = document.getElementById('app')!;
  const lang = localStorage.getItem('lang') || 'zh';
  
  const archiveT = t?.archive || {
    pageTitle: lang === 'en' ? "All Articles" : "所有文章",
    backToHome: lang === 'en' ? "Back to Home" : "返回首頁",
    searchPlaceholder: lang === 'en' ? "Search..." : "搜尋文章...",
    sortNewest: lang === 'en' ? "Newest" : "最新發佈",
    sortOldest: lang === 'en' ? "Oldest" : "最舊發佈",
    allCategory: lang === 'en' ? "All" : "全部"
  };

  // Reset 狀態
  currentCategory = 'all';
  currentSort = 'newest';
  currentQuery = '';

  app.innerHTML = `
    <div id="archive-view" class="container archive-header">
      <a href="#" class="back-link" id="back-home-btn">← ${archiveT.backToHome}</a>
      <h1>${archiveT.pageTitle}</h1>
      
      <div class="archive-controls">
        <input type="text" id="search-input" class="search-input" placeholder="${archiveT.searchPlaceholder}">
      </div>

      <div class="archive-sort-group" style="display: flex; gap: 1rem; margin-bottom: 1rem;">
        <button class="sort-btn active" data-sort="newest">${archiveT.sortNewest}</button>
        <button class="sort-btn" data-sort="oldest">${archiveT.sortOldest}</button>
      </div>

      <div id="category-filters" class="category-filters"></div>

      <div class="posts-grid" id="archive-grid">
        <p style="text-align:center; width:100%;">載入中...</p>
      </div>
    </div>
  `;

  document.getElementById('back-home-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.hash = '';
  });

  try {
    const res = await fetch('/posts.json');
    allPosts = await res.json();
    filteredPosts = [...allPosts];
    
    initFilters(archiveT, lang);
    renderCards(lang);
    bindEvents(archiveT, lang);

  } catch (err) {
    console.error("Archive Load Error:", err);
    document.getElementById('archive-grid')!.innerHTML = `<p>載入失敗，請查看 Console。</p>`;
  }

  setTimeout(() => {
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
  }, 100);
};

const initFilters = (archiveT: any, lang: string) => {
  const filterContainer = document.getElementById('category-filters');
  if (!filterContainer) return;

  const categories = [{ name: archiveT.allCategory, value: 'all' }];
  const uniqueCats = new Set();
  
  allPosts.forEach(p => {
    if (p.category && p.category.zh && p.category.en) {
      const catName = lang === 'en' ? p.category.en : p.category.zh;
      const catValue = p.category.en; // 用英文做 value 避免中英轉換問題
      if (!uniqueCats.has(catValue)) {
        uniqueCats.add(catValue);
        categories.push({ name: catName, value: catValue });
      }
    }
  });

  filterContainer.innerHTML = categories.map((cat, index) => `
    <button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${cat.value}">${cat.name}</button>
  `).join('');
};

const renderCards = (lang: string) => {
  const grid = document.getElementById('archive-grid');
  if (!grid) return;

  if (filteredPosts.length === 0) {
    grid.innerHTML = `<p style="text-align:center; width:100%;">沒有相關文章。</p>`;
    return;
  }

  grid.innerHTML = filteredPosts.map((post: any) => {
    const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
    const catName = (lang === 'en' && post.category?.en) ? post.category.en : (post.category?.zh || post.category);
    
    return `
      <a href="#post/${post.id}" class="post-card" style="text-decoration: none; color: inherit; display: block;">
        ${post.image ? `<img src="${post.image}" alt="${content.title}" class="post-cover-img">` : ''}
        <div class="post-category">${catName}</div>
        <h3 class="post-title">${content.title}</h3>
        <p class="post-date">${post.date}</p>
        <p class="post-excerpt">${content.excerpt}</p>
        <span class="read-more">${lang === 'en' ? 'Read more' : '閱讀更多'} →</span>
      </a>
    `;
  }).join('');
};

const bindEvents = (archiveT: any, lang: string) => {
  const searchInput = document.getElementById('search-input') as HTMLInputElement;

  const applyFilters = () => {
    let result = allPosts.filter(post => {
      const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
      const catValue = post.category?.en || post.category; // 統一用 en 做比對
      
      const matchesSearch = content.title.toLowerCase().includes(currentQuery) || content.excerpt.toLowerCase().includes(currentQuery);
      const matchesCategory = currentCategory === 'all' || catValue === currentCategory;
      
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return currentSort === 'newest' ? dateB - dateA : dateA - dateB;
    });

    filteredPosts = result;
    renderCards(lang);
  };

  // 搜尋
  searchInput?.addEventListener('input', (e) => {
    currentQuery = (e.target as HTMLInputElement).value.toLowerCase();
    applyFilters();
  });

  // 排序掣
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      currentSort = target.dataset.sort!;
      applyFilters();
    });
  });
  
  // 分類掣
  document.getElementById('category-filters')?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('filter-btn')) {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      target.classList.add('active');
      currentCategory = target.dataset.category!;
      applyFilters();
    }
  });
};
