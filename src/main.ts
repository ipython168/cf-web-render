import './style.css';
import { initTheme } from './utils/theme';
import { initUI } from './utils/ui';

import { handleScrollFade } from './utils/animations';
import { loadPosts } from './views/home';
import { renderApp } from './views/post';
import { renderArchive } from './views/archive';
import { renderHome } from './views/homeView';

import { renderDebug } from './views/debug';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// === 2. 初始化 Theme ===
initTheme(); 
initUI(); // 👈 新增：初始化 UI 事件（選單、Backspace）

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

    // 👈 新增：動態套用 JSON 主題色
    if (siteConfig.theme) {
      const lightTheme = siteConfig.theme.light;
      const darkTheme = siteConfig.theme.dark;
     
      // 建立一個 <style> 標籤塞入 HTML
      const styleTag = document.createElement('style');
      styleTag.innerHTML = `
        :root[data-theme="light"] {
          --bg-color: ${lightTheme.bgColor};
          --text-color: ${lightTheme.textColor};
          --card-bg: ${lightTheme.cardBg};
          --primary-color: ${lightTheme.primaryColor};
          --border-color: ${lightTheme.borderColor};
          --sidebar-bg: ${lightTheme.sidebarBg};
          --page-gradient: ${lightTheme.pageGradient};
          --hero-text-color: ${lightTheme.heroTextColor};
          --hero-bg-overlay: ${lightTheme.heroBgOverlay};
        }
        :root[data-theme="dark"] {
          --bg-color: ${darkTheme.bgColor};
          --text-color: ${darkTheme.textColor};
          --card-bg: ${darkTheme.cardBg};
          --primary-color: ${darkTheme.primaryColor};
          --border-color: ${darkTheme.borderColor};
          --sidebar-bg: ${darkTheme.sidebarBg};
          --page-gradient: ${darkTheme.pageGradient};
          --hero-text-color: ${darkTheme.heroTextColor};
          --hero-bg-overlay: ${darkTheme.heroBgOverlay};
        }
      `;
      document.head.appendChild(styleTag);
    }

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




