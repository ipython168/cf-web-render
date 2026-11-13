import { renderHome } from './views/homeView';
import { renderApp } from './views/post';
import { renderArchive } from './views/archive';
import { renderDebug } from './views/debug';
import { loadPosts } from './views/home';
import { updateSidebar } from './utils/sidebar';

export const handleRouting = async (siteConfig: any, langData: any, currentLang: string) => {
  if (!siteConfig || !langData) return;
  
  const hash = window.location.hash || 'home';
  const app = document.getElementById('app')!;
  
  // 攞返上一個 Hash
  const lastHash = (window as any)._lastHash || 'home';

  // 判斷係咪「上一頁」操作
  // 如果新 Hash 係空 (首頁) 或者係 #archive，而我哋之前喺文章/其他頁，通常就係上一頁
  const isGoingBack = (
    (hash === 'home' && lastHash !== 'home') || 
    (hash === '#archive' && lastHash.startsWith('#post/'))
  );

  // 1. 轉頁前，記低舊頁面嘅 Scroll 位置
  sessionStorage.setItem(`scroll-${lastHash}`, window.scrollY.toString());
  
  // 2. 如果係「點擊」去新頁面 (唔係上一頁)，清空目標頁嘅舊紀錄，強制由頂部開始
  if (!isGoingBack) {
    sessionStorage.removeItem(`scroll-${hash}`);
  }
  
  // 更新當前 Hash 紀錄
  (window as any)._lastHash = hash;

  // 3. 清空畫面同更新 Sidebar
  app.innerHTML = '';
  updateSidebar(langData[currentLang]);

  // 4. 根據 Hash 決定 Render 邊一頁
  if (hash.startsWith('#archive')) {
    await renderArchive(langData[currentLang]);
  } else if (hash === '#debug') {
    await renderDebug();
  } else if (hash.startsWith('#post/')) {
    await loadPosts();
    renderApp();
  } else {
    renderHome(siteConfig, langData[currentLang]);
  }

  // 5. 還原 Scroll 位置
  // 如果係「點擊」新頁，因為上面清空咗，所以會係 0（去頂部）
  // 如果係「上一頁」，因為有紀錄，會彈返去之前個位
  const savedScrollY = Number(sessionStorage.getItem(`scroll-${hash}`)) || 0;
  
  setTimeout(() => {
    window.scrollTo(0, savedScrollY);
  }, 50);
};