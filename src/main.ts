import './style.css';
import { marked } from 'marked';
import { initTheme } from './utils/theme';
import { initAnimations, handleScrollFade } from './utils/animations';

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

// === 2. 初始化 Theme 與 視差動畫 ===
initTheme();
initAnimations();

// === 3. 資料與渲染 ===
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
      ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-cover-img">` : ''}
      <div class="post-category">${post.category}</div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-date">${post.date}</p>
      <p class="post-excerpt">${post.excerpt}</p>
      <a href="#post/${post.id}" class="read-more">閱讀更多 →</a>
    </article>
  `).join('');
  
  handleScrollFade();
};

// === 4. HTML 結構 ===
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
            <p>info@myquant.hk</p>
            <p>WhatsApp 技術支援</p>
          </div>
        </div>
        <div class="footer-bottom"><p>© ${new Date().getFullYear()} MyQuant. All rights reserved.</p></div>
      </div>
    </footer>
  </div>
  <div id="post-content" style="display: none;"></div>
`;

// === 5. Router ===
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
          ${post.image ? `<img src="${post.image}" alt="${post.title}" class="single-post-img">` : ''}
          <div class="post-body">${marked.parse(post.content.replace(/\\n/g, '\n'))}</div>
        </div>
      `;
      
      homeView.style.display = 'none';
      postContainer.style.display = 'block';
      window.scrollTo(0, 0);

      // 強制顯示文章內頁
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
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
  }
};

// === 6. 初始化 ===
loadPosts().then(() => {
  renderApp();
  handleScrollFade();
  window.dispatchEvent(new Event('scroll'));
});

// 監聽網址變化同 Scroll
window.addEventListener('hashchange', renderApp);
window.addEventListener('scroll', handleScrollFade);
