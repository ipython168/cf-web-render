import './style.css';

// === 1. 漢堡選單開關 ===
const menuBtn = document.getElementById('menu-btn')!;
const closeBtn = document.getElementById('close-btn')!;
const sidebar = document.getElementById('sidebar')!;
const overlay = document.getElementById('overlay')!;

const openSidebar = () => {
  sidebar.classList.add('open');
  overlay.classList.add('active');
};
const closeSidebar = () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
};

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// === 2. 主題切換 ===
const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
const htmlElement = document.documentElement;

const applyTheme = (theme: string) => {
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  } else {
    htmlElement.setAttribute('data-theme', theme);
  }
};

const savedTheme = localStorage.getItem('theme') || 'system';
themeSelect.value = savedTheme;
applyTheme(savedTheme);

themeSelect.addEventListener('change', (e) => {
  const newTheme = (e.target as HTMLSelectElement).value;
  localStorage.setItem('theme', newTheme);
  applyTheme(newTheme);
});

// === 3. Navbar Scroll ===
const navbar = document.querySelector('.navbar') as HTMLElement;
window.addEventListener('scroll', () => {
  if (window.scrollY > window.innerHeight - 150) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === 4. 資料與渲染 ===
let posts: any[] = [];

const loadPosts = async () => {
  try {
    const res = await fetch('/posts.json');
    posts = await res.json();
    renderPosts();
  } catch (err) {
    console.error("載入文章失敗", err);
  }
};

const renderPosts = () => {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  
  grid.innerHTML = posts.map(post => `
    <article class="post-card fade-in">
      <div class="post-category">${post.category}</div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-date">${post.date}</p>
      <p class="post-excerpt">${post.excerpt}</p>
      <a href="#post/${post.id}" class="read-more">閱讀更多 →</a>
    </article>
  `).join('');
  
  handleScrollFade();
};

// === 5. HTML 結構 ===
const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <div id="home-view">
    <section class="hero-section">
      <div class="hero-content fade-in" id="hero-content">
        <h1>用數據透視市場<br>用紀律執行交易</h1>
        <p>歡迎來到我的量化交易基地。這裡紀錄了我的回測結果與交易心得。</p>
        <div class="hero-btns"><a href="#features" class="btn-primary">開始了解</a></div>
      </div>
    </section>

    <section id="features" class="feature-section fade-in">
      <div class="container">
        <div class="feature-text">
          <h2 class="fade-in">隨時掌握<br>市場最新動態</h2>
          <p class="fade-in">支援即時回測數據、歷史圖表顯示。無論你用電腦定手機，都可以快速查閱策略表現。</p>
        </div>
        <div class="feature-visual fade-in"><div class="mockup-box">📊 回測圖表預覽</div></div>
      </div>
    </section>

    <section id="latest-posts" class="posts-section fade-in">
      <div class="container">
        <h2 class="fade-in">最新交易心得與回測</h2>
        <div class="posts-grid" id="posts-grid"></div>
      </div>
    </section>

    <footer class="site-footer fade-in">
      <div class="container">
        <div class="footer-content fade-in">
          <div class="footer-brand">
            <h3><img src="/logo.png" alt="Logo" class="logo-img-footer"> MyQuant</h3>
            <p>我哋係香港小型開發團隊...</p>
          </div>
          <div class="footer-links">
            <h4>快速連結</h4>
            <a href="#">關於我們</a><a href="#">回測結果</a><a href="#">交易心得</a><a href="#">私隱條例</a>
          </div>
          <div class="footer-contact">
            <h4>聯絡我們</h4>
            <p>info@myquant.hk</p><p>WhatsApp 技術支援</p>
          </div>
        </div>
        <div class="footer-bottom"><p>© ${new Date().getFullYear()} MyQuant. All rights reserved.</p></div>
      </div>
    </footer>
  </div>
  <div id="post-content" style="display: none;"></div>
`;

// === 6. 視差效果 ===
const heroSection = document.querySelector('.hero-section') as HTMLElement;
if (window.innerWidth > 768 && heroSection) {
  heroSection.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 30;
    const y = (window.innerHeight / 2 - e.pageY) / 30;
    heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
  });
}

// === 7. Scroll 滾動淡入淡出 (取代 IntersectionObserver) ===
const handleScrollFade = () => {
  const sections = document.querySelectorAll('#home-view .fade-in');
  const windowHeight = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    
    // 取得頂部同底部喺畫面嘅比例
    const topRatio = rect.top / windowHeight;
    const bottomRatio = rect.bottom / windowHeight;
    
    let opacity = 0;
    
    if (topRatio > 0.85) {
      // 1. 未入畫面：完全透明
      opacity = 0;
    } else if (topRatio > 0.5) {
      // 2. 出現時 (睇 Top)：由底部升到中間 (0.85 -> 0.5)，由 0 變 1
      opacity = (0.85 - topRatio) / (0.85 - 0.5);
    } else if (bottomRatio > 0.15) {
      // 3. 離開時 (睇 Bottom)：底部由中間升到頂部 (0.5 -> 0.15)，由 1 變 0
      opacity = (bottomRatio - 0.15) / (0.5 - 0.15);
    } else {
      // 4. 完全離開畫面：透明
      opacity = 0;
    }
    
    opacity = Math.max(0, Math.min(1, opacity));
    (section as HTMLElement).style.opacity = opacity.toString();
    
    // 位移效果：隨住透明度向上移
    const translateY = (1 - opacity) * 50;
    (section as HTMLElement).style.transform = `translateY(${translateY}px)`;
  });
};

window.addEventListener('scroll', handleScrollFade);

// === 8. Router ===
const renderApp = () => {
  const hash = window.location.hash;
  const postContainer = document.getElementById('post-content')!;
  const homeView = document.getElementById('home-view')!;

  if (hash.startsWith('#post/')) {
    const id = hash.replace('#post/', '');
    const post = posts.find(p => p.id === id);
    
    if (post) {
      postContainer.innerHTML = `
        <div class="container single-post">
          <a href="#" class="back-link" id="back-btn">← 返回首頁</a>
          <div class="post-category">${post.category}</div>
          <h1>${post.title}</h1>
          <p class="post-date">${post.date}</p>
          <div class="post-body">${post.content}</div>
        </div>
      `;
      
      homeView.style.display = 'none';
      postContainer.style.display = 'block';
      window.scrollTo(0, 0);

      // 強制顯示文章內頁，避免 Fade 隱形
      const singlePost = postContainer.querySelector('.single-post') as HTMLElement;
      if (singlePost) {
        setTimeout(() => {
          singlePost.style.opacity = '1';
          singlePost.style.transform = 'translateY(0)';
        }, 50);
      }

      // 綁定返回按鈕
      document.getElementById('back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
      });
    }
  } else {
    postContainer.style.display = 'none';
    homeView.style.display = 'block';
    // 返回首頁時重新計算 opacity
    handleScrollFade();
  }
};

// === 9. 初始化 ===
loadPosts().then(() => {
  renderApp();
  handleScrollFade();
});

window.addEventListener('hashchange', renderApp);