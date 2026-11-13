export const updateSidebar = (t: any) => {
  // 更新主題設定同語言標籤
  document.getElementById('theme-title')!.textContent = t.sidebar.themeTitle;
  document.getElementById('lang-label')!.textContent = t.sidebar.langLabel;
  
  // 更新選單連結
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
