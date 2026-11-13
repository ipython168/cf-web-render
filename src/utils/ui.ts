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

  // 2. Backspace 上一頁邏輯
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      const activeEl = document.activeElement;
      const isInput = activeEl?.tagName === 'INPUT' || activeEl?.tagName === 'TEXTAREA';
      
      if (!isInput) {
        e.preventDefault();
        const hash = window.location.hash;
        
        if (hash.startsWith('#post/')) {
          const from = sessionStorage.getItem('post-from') || 'home';
          window.location.hash = from === 'home' ? '' : from;
        } else if (hash.startsWith('#archive')) {
          window.location.hash = '';
        } else {
          window.history.back();
        }
      }
    }
  });
};
