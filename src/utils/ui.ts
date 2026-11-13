export const initUI = () => {
  // 1. 漢堡選單開關
  const menuBtn = document.getElementById('menu-btn');
  const closeBtn = document.getElementById('close-btn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  if (menuBtn && closeBtn && sidebar && overlay) {
    const openSidebar = () => { sidebar.classList.add('open'); overlay.classList.add('active'); };
    const closeSidebar = () => { sidebar.classList.remove('open'); overlay.classList.remove('active'); };

    menuBtn.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);
  }

  // 2. Backspace 上一頁邏輯 (最簡潔版)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      const activeEl = document.activeElement;
      const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
     
      // 如果唔係喺輸入框打字，就執行瀏覽器原生上一頁
      if (!isInput) {
        e.preventDefault(); // 防止瀏覽器預設彈回上一頁（如果有衝突）
       window.history.back(); // 👈 最直接嘅 Browser 上一頁
      }
    }
  });
};
