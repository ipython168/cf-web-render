'use client';
import { useEffect } from 'react';

import { useStatsAnimation } from '@/hooks/useStatsAnimation';

interface StatsSectionProps {
  t: any;
  stats?: {
    win_rate: number;
    total_trades: number;
    max_drawdown: number;
    total_return: number;
  };
}

export default function StatsSection({ t, stats }: StatsSectionProps) { 

  const statItems = [
    { id: 'stat-win', target: stats?.win_rate ?? 76, suffix: '%' },
    { id: 'stat-trades', target: stats?.total_trades ?? 1453, suffix: '+' },
    { id: 'stat-dd', target: stats?.max_drawdown ?? 24, suffix: '%' },
    { id: 'stat-return', target: stats?.total_return ?? 318, suffix: '%' },
  ];

  useStatsAnimation(statItems);

  return (
    <section id="stats-section" className="stats-section fade-in">
      <div className="max-w-[1280px] mx-auto px-[5%]">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 fade-in">
          {t.stats?.title || '實戰數據'}
        </h2>
        <div className="stats-grid">
          <StatCard id="stat-win" target={statItems[0].target} suffix={statItems[0].suffix} label={t.stats?.winRate || '勝率'} />
          <StatCard id="stat-trades" target={statItems[1].target} suffix={statItems[1].suffix} label={t.stats?.totalTrades || '總交易次數'} />
          <StatCard id="stat-dd" target={statItems[2].target} suffix={statItems[2].suffix} label={t.stats?.maxDrawdown || '最大回撤'} />
          <StatCard id="stat-return" target={statItems[3].target} suffix={statItems[3].suffix} label={t.stats?.totalReturn || '總回報'} />
 
        </div>
      </div>
    </section>
  );
}
function StatCard({ id, target, suffix, label }: { id: string; target: number; suffix: string; label: string }) {
  return (
    <div className="stat-card fade-in">
      <div className="stat-number fade-in" id={id}>0{suffix}</div>
      <p>{label}</p>
    </div>
  );
}
