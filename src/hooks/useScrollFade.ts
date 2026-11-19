'use client';

import { useEffect } from 'react';

export function useScrollFade() {
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const sections = document.querySelectorAll('.fade-in');
        const stickyTexts = document.querySelectorAll('.sticky-text');
        const windowHeight = window.innerHeight;

        sections.forEach(section => {
          // Skip elements inside sticky-text (handled separately)
          if (section.closest('.sticky-text')) return;

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

        // Handle sticky text separately - fade based on parent section visibility
        stickyTexts.forEach(text => {
          const section = text.closest('section');
          if (!section) return;
          
          const rect = section.getBoundingClientRect();
          const visibleTop = Math.max(0, rect.top);
          const visibleBottom = Math.min(windowHeight, rect.bottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          const totalHeight = rect.height;
          const visibilityRatio = totalHeight > 0 ? visibleHeight / totalHeight : 0;
          
          let opacity = 0;
          if (visibilityRatio > 0.8) {
            opacity = 1;
          } else if (visibilityRatio > 0.3) {
            opacity = (visibilityRatio - 0.3) / (0.8 - 0.3);
          }
          
          opacity = Math.max(0, Math.min(1, opacity));
          (text as HTMLElement).style.opacity = opacity.toString();
          
          const translateY = (1 - opacity) * 30;
          (text as HTMLElement).style.transform = `translateY(${translateY}px)`;
        });        
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
}
