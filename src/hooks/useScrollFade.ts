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
          
          const sectionRect = section.getBoundingClientRect();
          const sectionHeight = sectionRect.height;
          const sectionVisibleTop = Math.max(0, sectionRect.top);
          const sectionVisibleBottom = Math.min(windowHeight, sectionRect.bottom);
          const sectionVisibleHeight = Math.max(0, sectionVisibleBottom - sectionVisibleTop);
          const sectionVisibility = sectionHeight > 0 ? sectionVisibleHeight / sectionHeight : 0;
          
          // 用 section 的可見比例來控制 sticky 文字的淡入淡出
          // 當 section 剛出現時（visibility 從 0 到 0.3）：淡入
          // 當 section 完全可見時（visibility 0.3 到 0.7）：保持全透明
          // 當 section 快離開時（visibility 0.7 到 1）：淡出
          let opacity = 0;
          if (sectionVisibility < 0.3) {
            // 淡入階段
            opacity = sectionVisibility / 0.3;
          } else if (sectionVisibility > 0.7) {
            // 淡出階段
            opacity = (1 - sectionVisibility) / 0.3;
          } else {
            // 中間保持全透明
            opacity = 1;
          }

          opacity = Math.max(0, Math.min(1, opacity));
          (text as HTMLElement).style.opacity = opacity.toString();
          
          // Sticky 元素唔需要 translateY（佢自己 sticky 定位）
          // 但可以保留少少滑入效果
          const translateY = opacity < 1 ? (1 - opacity) * 20 : 0;

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
