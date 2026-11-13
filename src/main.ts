import './style.css';
import { initTheme } from './utils/theme';
import { handleScrollFade } from './utils/animations';
import { loadPosts } from './views/home';
import { renderApp } from './views/post';
import { renderArchive } from './views/archive';
import { renderHome } from './views/homeView';

import { renderDebug } from './views/debug';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// === 1. 漢堡選單開關 ===
const menuBtn = document.getElementById('menu-btn')!;
const closeBtn = document.getElementById('close-btn')!;
const sidebar = document.getElementById('sidebar')!;
const overlay = document.getElementById('overlay')!;

const openSidebar = () => { sidebar.classList.add('open'); overlay.classList.add('active'); };
const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };

menuBtn.addEventListener('click', openSidebar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

// === 2. 初始化 Theme ===
initTheme(); 

// === 3. 全局變數 ===
let currentLang = localStorage.getItem('lang') || 'zh';
let siteConfig: any = null;
let langData: any = null;

// === 4. 渲染首頁 ===
// === 新增：更新 Sidebar 文字 ===
const updateSidebar = (t: any) => {
  // 更新主題設定同語言標籤
 document.getElementById('theme-title')!.textContent = t.sidebar.themeTitle;
 document.getElementById('lang-label')!.textContent = t.sidebar.langLabel;
  
  // 更新選單連結：直接由 siteConfig 讀取，保證 F5 都一定有
  const sidebarLinks = document.querySelector('.sidebar-links')!;
  if (t.nav) {
    sidebarLinks.innerHTML = `
      <a href="#">${t.nav.about}</a>
      <a href="#">${t.nav.news}</a>
      <a href="#">${t.nav.help}</a>
      <a href="#">${t.nav.support}</a>
    `;
  }
};


// === 5. 統一 Router ===
const handleRouting = async () => {
  if (!siteConfig || !langData) return;
  
  const hash = window.location.hash;
  const app = document.getElementById('app')!;
  
  // 每次切換頁面，先清空 app，避免舊事件干擾
  app.innerHTML = '';
  // 👈 每次轉頁或者 F5，都強制更新 Sidebar
  updateSidebar(langData[currentLang]);

  if (hash === '#archive') {
    await renderArchive(langData[currentLang]);
  } else if (hash === '#debug') {
    await renderDebug();

  } else if (hash.startsWith('#post/')) {
    await loadPosts(); // 確保文章數據已載入
    renderApp();
  } else {
    renderHome(siteConfig, langData[currentLang]);

  }
};

// === 6. 語言切換 ===
const setLanguage = (lang: string) => {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if ((btn as HTMLElement).dataset.lang === lang) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  handleRouting(); // 重新觸發當前頁面渲染
};

// === 7. 啟動 ===
const initSite = async () => {
  try {
    const [configRes, langRes] = await Promise.all([
      fetch('/site-config.json'),
      fetch('/lang.json')
    ]);
    siteConfig = await configRes.json();
    langData = await langRes.json();

    document.title = siteConfig.siteTitle;
    const logoImg = document.querySelector('.logo-img') as HTMLImageElement;
    if (logoImg) logoImg.src = siteConfig.logoImage;
    
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.href = siteConfig.BrandmarkImage || siteConfig.logoImage;
    document.head.appendChild(favicon);

    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const lang = (e.target as HTMLElement).dataset.lang!;
        setLanguage(lang);
      });
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
      if ((btn as HTMLElement).dataset.lang === currentLang) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    // 第一次入嚟，觸發 Router
    handleRouting();

    // 👈 新增：載入完成後，移除 loading class，顯示畫面
    setTimeout(() => {
        document.body.classList.remove('loading');
    }, 100);


  } catch (err) {
    console.error("載入失敗", err);
  }
};

initSite();

// 監聽網址變化同 Scroll
window.addEventListener('hashchange', handleRouting);
window.addEventListener('scroll', handleScrollFade);


// 👈 新增：完美處理 Backspace 上一頁
window.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') {
    const activeEl = document.activeElement;
    // 如果唔係喺輸入框或者文字區打字，先觸發
    const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
    
    if (!isInput) {
      e.preventDefault(); // 阻止瀏覽器預設行為
      window.history.back(); // 呼叫瀏覽器嘅「上一頁」
    }
  }
});
