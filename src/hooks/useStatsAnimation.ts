'use client';

import { useEffect, useRef } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
}

export function useStatsAnimation(stats: StatItem[]) {
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animated.current) {
            animated.current = true;

            stats.forEach((stat) => {
              const el = document.getElementById(stat.id);
              if (!el) return;

              const duration = 2000;
              const startTime = performance.now();

              function animate(currentTime: number) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(eased * stat.target);

                el!.textContent = current.toLocaleString() + stat.suffix;

                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              }

              requestAnimationFrame(animate);
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.querySelector('#stats-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, [stats]);
}
