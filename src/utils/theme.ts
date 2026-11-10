export const initTheme = () => {
  const themeSelect = document.getElementById('theme-select') as HTMLSelectElement;
  const htmlElement = document.documentElement;

  const applyTheme = (theme: string) => {
    if (theme === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      htmlElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    } else {
      htmlElement.setAttribute('data-theme', theme);
    }
  };

  const savedTheme = localStorage.getItem('theme') || 'system';
  if (themeSelect) {
    themeSelect.value = savedTheme;
    themeSelect.addEventListener('change', (e) => {
      const newTheme = (e.target as HTMLSelectElement).value;
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }
  applyTheme(savedTheme);
};
