'use client';

import { useEffect, useRef } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
}

export function useStatsAnimation(stats: StatItems) {
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;
            
            stats.forEach(item => {
              const el = document.getElementById(item.id);
              if (!el) return;

              const duration = 2000;
              const startTime = performance.now();

              const animate = (currentTime: number) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease out quad
                const eased = 1 - (1 - progress) * (1 - progress);
                const currentVal = Math.round(item.target * eased);
                
                el.textContent = currentVal.toString() + item.suffix;

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };

              requestAnimationFrame(animate);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const statsSection = document.getElementById('stats');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, [stats]);
}
