import './style.css';
import { marked } from 'marked';
import { initTheme } from './utils/theme';
import { loadPosts } from "./views/home";
import { renderApp } from "./views/post";
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
