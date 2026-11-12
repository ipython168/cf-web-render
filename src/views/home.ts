import { handleScrollFade } from '../utils/animations';

export let posts: any[] = [];
let filteredPosts: any[] = [];
let displayCount = 6;

// 取得當前語言
const getLang = () => localStorage.getItem('lang') || 'zh';

// 1. 載入所有文章
export const loadPosts = async () => {
  try {
    const res = await fetch('/posts.json');
    const rawPosts = await res.json();
    
    // 按日期排序 (新到舊)
    posts = rawPosts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    initFilters();
    filterPosts('全部');
  } catch (err) {
    console.error("載入文章失敗", err);
  }
};

// 2. 初始化分類按鈕
const initFilters = () => {
  const filterContainer = document.getElementById('category-filters');
  if (!filterContainer) return;

  const categories = ['全部', ...new Set(posts.map(p => p.category))];
  
  filterContainer.innerHTML = categories.map(cat => `
    <button class="filter-btn ${cat === '全部' ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  const btns = filterContainer.querySelectorAll('.filter-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cat = (e.target as HTMLElement).dataset.category!;
      btns.forEach(b => b.classList.remove('active'));
      (e.target as HTMLElement).classList.add('active');
      filterPosts(cat);
    });
  });
};

// 3. 篩選文章
const filterPosts = (category: string) => {
  displayCount = 6; 

  if (category === '全部') {
    filteredPosts = posts;
  } else {
    filteredPosts = posts.filter(p => p.category === category);
  }
  renderPosts();
};

// 4. 渲染文章卡片
export const renderPosts = () => {
  const grid = document.getElementById('posts-grid');
  const loadMoreBtn = document.getElementById('load-more-btn');
  if (!grid) return;
  
  const lang = getLang();
  const postsToShow = filteredPosts.slice(0, displayCount);

  grid.innerHTML = postsToShow.map(post => {
    // 語言 Fallback 邏輯
    const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
    const catName = (lang === 'en') ? post.category.en : post.category.zh;

    return `
      <article class="post-card fade-in">
        ${post.image ? `<img src="${post.image}" alt="${content.title}" class="post-cover-img">` : ''}
        <div class="post-category">${catName}</div>
        <h3 class="post-title">${content.title}</h3>
        <p class="post-date">${post.date}</p>
        <p class="post-excerpt">${content.excerpt}</p>
        <a href="#post/${post.id}" class="read-more">${lang === 'en' ? 'Read more' : '閱讀更多'} →</a>
      </article>
    `;
  }).join('');
  
  // 處理「載入更多」按鈕顯示
  if (loadMoreBtn) {
    if (displayCount >= filteredPosts.length) {
      loadMoreBtn.style.display = 'none';
    } else {
      loadMoreBtn.style.display = 'inline-block';
      loadMoreBtn.textContent = '載入更多文章'; // 👈 確保文字正確
    }
  }

  handleScrollFade();
};

// 5. 綁定「載入更多」 (放喺最尾，確保 DOM 已經載入)
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('load-more-btn')?.addEventListener('click', () => {
    displayCount += 6;
    renderPosts();
  });
});