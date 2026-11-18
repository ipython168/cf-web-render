'use client';

import { useEffect, useRef } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
}

export function useStatsAnimation(stats: StatItem[]) {
  const statsRef = useRef(stats);
  statsRef.current = stats;

  useEffect(() => {
    const section = document.querySelector('#stats-section');
    if (!section) return;

    // 存放每個 stat 的 animation frame ID，keyed by stat id
    const animFrames: Record<string, number> = {};

    const animate = (el: HTMLElement, target: number, suffix: string, statId: string) => {
      // 如果該 stat 已有進行中的動畫，先取消它
      if (animFrames[statId]) {
        cancelAnimationFrame(animFrames[statId]);
      }

      const duration = 1500;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;

        if (progress < 1) {
          animFrames[statId] = requestAnimationFrame(tick);
        } else {
          delete animFrames[statId];
        }
      };
      animFrames[statId] = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        // 進入視口：重置數字並開始動畫
        statsRef.current.forEach(stat => {
          const el = document.getElementById(stat.id);
          if (!el) return;
          el.textContent = '0' + stat.suffix;
          animate(el, stat.target, stat.suffix, stat.id);
        });
      });
    }, { threshold: 0.3 });

    observer.observe(section);

    return () => {
      observer.disconnect();
      // 清理所有進行中的動畫
      Object.values(animFrames).forEach(id => cancelAnimationFrame(id));
    };
  }, []); // 依賴為空，只掛載一次
}