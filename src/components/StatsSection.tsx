'use client';

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
    { id: 'stat-win', target: stats?.win_rate || 75, suffix: '%' },
    { id: 'stat-trades', target: stats?.total_trades || 320, suffix: '' },
    { id: 'stat-dd', target: stats?.max_drawdown || 14, suffix: '%' },
    { id: 'stat-return', target: stats?.total_return || 40, suffix: '%' },
  ];

  useStatsAnimation(statItems);

  return (
    <section id="stats" className="stats-section py-20 fade-in">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.stats?.title || '實戰數據'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="stat-card text-center p-6 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-200 dark:border-zinc-700">
            <h3 id="stat-win" className="text-4xl font-bold text-cyan-500 mb-2">0</h3>
            <p className="opacity-70">{t.stats?.winRate || '勝率'}</p>
          </div>
          <div className="stat-card text-center p-6 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-200 dark:border-zinc-700">
            <h3 id="stat-trades" className="text-4xl font-bold text-cyan-500 mb-2">0</h3>
            <p className="opacity-70">{t.stats?.totalTrades || '總交易次數'}</p>
          </div>
          <div className="stat-card text-center p-6 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-200 dark:border-zinc-700">
            <h3 id="stat-dd" className="text-4xl font-bold text-cyan-500 mb-2">0</h3>
            <p className="opacity-70">{t.stats?.maxDrawdown || '最大回撤'}</p>
          </div>
          <div className="stat-card text-center p-6 rounded-xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-gray-200 dark:border-zinc-700">
            <h3 id="stat-return" className="text-4xl font-bold text-cyan-500 mb-2">0</h3>
            <p className="opacity-70">{t.stats?.totalReturn || '總回報'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
