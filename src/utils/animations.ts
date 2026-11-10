export const initAnimations = () => {
  const navbar = document.querySelector('.navbar') as HTMLElement;
  
  // Navbar 轉色
  window.addEventListener('scroll', () => {
    const isPostPage = window.location.hash.startsWith('#post/');
    if (isPostPage || window.scrollY > window.innerHeight * 0.9) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 視差效果
  const heroSection = document.querySelector('.hero-section') as HTMLElement;
  if (window.innerWidth > 768 && heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const x = (window.innerWidth / 2 - e.pageX) / 30;
      const y = (window.innerHeight / 2 - e.pageY) / 30;
      heroSection.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    });
  }
};

// Scroll 滾動淡入淡出
export const handleScrollFade = () => {
  const sections = document.querySelectorAll('#home-view .fade-in');
  const windowHeight = window.innerHeight;

  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    
    const topRatio = rect.top / windowHeight;
    const bottomRatio = rect.bottom / windowHeight;
    
    let opacity = 0;
    
    if (topRatio > 0.85) {
      opacity = 0;
    } else if (topRatio > 0.6) {
      opacity = (0.85 - topRatio) / (0.85 - 0.6);
    } else if (bottomRatio > 0.4) {
      opacity = 1;
    } else if (bottomRatio > 0.15) {
      opacity = (bottomRatio - 0.15) / (0.4 - 0.15);
    } else {
      opacity = 0;
    }
    
    opacity = Math.max(0, Math.min(1, opacity));
    (section as HTMLElement).style.opacity = opacity.toString();
    
    const translateY = (1 - opacity) * 50;
    (section as HTMLElement).style.transform = `translateY(${translateY}px)`;
  });
};
