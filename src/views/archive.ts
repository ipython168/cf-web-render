import { handleScrollFade } from '../utils/animations';

export const renderArchive = async (t: any) => {
  const app = document.getElementById('app')!;
  
  const archiveT = t?.archive || {
    pageTitle: "所有文章",
    backToHome: "返回首頁",
    searchPlaceholder: "搜尋文章...",
    sortNewest: "最新發佈",
    sortOldest: "最舊發佈"
  };

  app.innerHTML = `
    <div id="archive-view" class="container archive-header">
      <a href="#" class="back-link" id="back-home-btn">← ${archiveT.backToHome}</a>
      <h1>${archiveT.pageTitle}</h1>
      
      <div class="archive-controls">
        <input type="text" class="search-input" placeholder="${archiveT.searchPlaceholder}">
        <select class="sort-select">
          <option>${archiveT.sortNewest}</option>
          <option>${archiveT.sortOldest}</option>
        </select>
      </div>

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
    const posts = await res.json();
    posts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const grid = document.getElementById('archive-grid');
    if (grid) {
      const lang = localStorage.getItem('lang') || 'zh';
      
      grid.innerHTML = posts.map((post: any) => {
        const content = (lang === 'en' && post.en?.title) ? post.en : post.zh;
        return `
          <a href="#post/${post.id}" class="post-card" style="text-decoration: none; color: inherit; display: block;">
            ${post.image ? `<img src="${post.image}" alt="${content.title}" class="post-cover-img">` : ''}
            <div class="post-category">${post.category}</div>
            <h3 class="post-title">${content.title}</h3>
            <p class="post-date">${post.date}</p>
            <p class="post-excerpt">${content.excerpt}</p>
            <span class="read-more">閱讀更多 →</span>
          </a>
        `;
      }).join('');
    }
  } catch (err) {
    console.error(err);
    document.getElementById('archive-grid')!.innerHTML = "<p>載入失敗。</p>";
  }

  setTimeout(() => {
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
  }, 100);
};