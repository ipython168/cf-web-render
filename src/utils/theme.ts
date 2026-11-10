export const initTheme = () => {
  const htmlElement = document.documentElement;
  const themeBtns = document.querySelectorAll('.theme-opt');

  const applyTheme = (theme: string) => {
    // 更新 UI Active 狀態
    themeBtns.forEach(btn => {
      if ((btn as HTMLElement).dataset.theme === theme) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      htmlElement.setAttribute('data-theme', theme);
    }
  };

  const savedTheme = localStorage.getItem('theme') || 'system';
  applyTheme(savedTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const newTheme = (e.currentTarget as HTMLElement).dataset.theme!;
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  });
};
