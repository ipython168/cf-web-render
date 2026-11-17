'use client';

import { useEffect } from 'react';

export function useScrollFade() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.fade-in');
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

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}
