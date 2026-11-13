import { renderHome } from './views/homeView';
import { renderApp } from './views/post';
import { renderArchive } from './views/archive';
import { renderDebug } from './views/debug';
import { loadPosts } from './views/home';
import { updateSidebar } from './utils/sidebar';

// 呢個 function 會喺 main.ts 嘅 setLanguage 度叫用
export const handleRouting = async (siteConfig: any, langData: any, currentLang: string) => {
  if (!siteConfig || !langData) return;
  
  const hash = window.location.hash;
  const app = document.getElementById('app')!;
  
  // 1. 記憶 Scroll 位置
  const oldHash = (window as any)._currentHash || 'home';
  sessionStorage.setItem(`scroll-${oldHash}`, window.scrollY.toString());
  (window as any)._currentHash = hash || 'home';

  // 2. 清空畫面同更新 Sidebar
  app.innerHTML = '';
  updateSidebar(langData[currentLang]);

  // 3. 根據 Hash 決定 Render 邊一頁
  if (hash === '#archive' || hash.startsWith('#archive?')) {
    sessionStorage.removeItem('post-from');
    await renderArchive(langData[currentLang]);
  } else if (hash === '#debug') {
    await renderDebug();
  } else if (hash.startsWith('#post/')) {
    await loadPosts();
    renderApp();
  } else {
    sessionStorage.removeItem('post-from');
    renderHome(siteConfig, langData[currentLang]);
  }

  // 4. 還原 Scroll 位置
  const targetHash = hash || 'home';
  const savedScrollY = Number(sessionStorage.getItem(`scroll-${targetHash}`)) || 0;
  
  setTimeout(() => {
    window.scrollTo(0, savedScrollY);
  }, 50);
};
