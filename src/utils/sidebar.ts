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


export const updateLangButtons = (currentLang: string, langData: any) => {
  // 1. 更新掣嘅 Active 狀態
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if ((btn as HTMLElement).dataset.lang === currentLang) btn.classList.add('active');
    else btn.classList.remove('active');
  });

  // 2. 更新掣嘅文字 (由 JSON 讀取)
  const langBtnZh = document.getElementById('lang-btn-zh');
  const langBtnEn = document.getElementById('lang-btn-en');
  if (langBtnZh && langBtnEn) {
    langBtnZh.textContent = langData.zh.languageName || '中文';
    langBtnEn.textContent = langData.en.languageName || 'EN';
  }
};





