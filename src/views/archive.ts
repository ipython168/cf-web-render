import { handleScrollFade } from '../utils/animations';

let allPosts: any[] = [];
let filteredPosts: any[] = [];

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

  app.innerHTML = `
    <div id="archive-view" class="container archive-header fade-in">
      <a href="#" class="back-link" id="back-home-btn">← ${archiveT.backToHome}</a>
      <h1>${archiveT.pageTitle}</h1>
      
      <div class="archive-controls">
        <input type="text" id="search-input" class="search-input" placeholder="${archiveT.searchPlaceholder}">
        <select id="sort-select" class="sort-select">
          <option value="newest">${archiveT.sortNewest}</option>
          <option value="oldest">${archiveT.sortOldest}</option>
        </select>
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
    console.error(err);
  }

  setTimeout(() => {
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
  }, 100);
};

const initFilters = (archiveT: any, lang: string) => {
  const filterContainer = document.getElementById('category-filters');
  if (!filterContainer) return;

  // 收集所有獨特分類 (中英文)
  const categories = [archiveT.allCategory];
  const uniqueCats = new Set();
  allPosts.forEach(p => {
    const catName = lang === 'en' ? p.category.en : p.category.zh;
    if (!uniqueCats.has(catName)) {
      uniqueCats.add(catName);
      categories.push(catName);
    }
  });

  filterContainer.innerHTML = categories.map((cat, index) => `
    <button class="filter-btn ${index === 0 ? 'active' : ''}" data-category="${cat}">${cat}</button>
  `).join('');
};

const renderCards = (lang: string) => {
  const grid = document.getElementById('archive-grid');
  if (!grid) return;

  if (filteredPosts.length === 0) {
    grid.innerHTML = `<p style="text-align:center; width:100%;">冇搵到相關文章。</p>`;
    return;
  }

  grid.innerHTML = filteredPosts.map((post: any) => {
    const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
    const catName = (lang === 'en') ? post.category.en : post.category.zh;
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
  const sortSelect = document.getElementById('sort-select') as HTMLSelectElement;
  const filterBtns = document.querySelectorAll('.filter-btn');

  const applyFilters = () => {
    const query = searchInput.value.toLowerCase();
    const sortOrder = sortSelect.value;
    const activeCat = document.querySelector('.filter-btn.active')?.getAttribute('data-category');

    let result = allPosts.filter(post => {
      const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
      const catName = (lang === 'en') ? post.category.en : post.category.zh;
      
      // 搜尋 Title 或 Excerpt
      const matchesSearch = content.title.toLowerCase().includes(query) || content.excerpt.toLowerCase().includes(query);
      // 分類 Filter
      const matchesCategory = activeCat === archiveT.allCategory || catName === activeCat;
      
      return matchesSearch && matchesCategory;
    });

    // 排序
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    filteredPosts = result;
    renderCards(lang);
  };

  searchInput?.addEventListener('input', applyFilters);
  sortSelect?.addEventListener('change', applyFilters);
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      (e.target as HTMLElement).classList.add('active');
      applyFilters();
    });
  });
};
