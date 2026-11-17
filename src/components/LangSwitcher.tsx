'use client';

import { useLang } from '@/hooks/useLang';

interface LangSwitcherProps {
  langData: any;
}

export default function LangSwitcher({ langData }: LangSwitcherProps) {
  const { lang, changeLang, mounted } = useLang();

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        id="lang-btn-zh"
        data-lang="zh"
        onClick={() => changeLang('zh')}
        className={`lang-btn px-3 py-1 rounded-md text-sm transition-colors ${
          lang === 'zh' 
            ? 'bg-cyan-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        {langData?.zh?.languageName || '中文'}
      </button>
      <button
        id="lang-btn-en"
        data-lang="en"
        onClick={() => changeLang('en')}
        className={`lang-btn px-3 py-1 rounded-md text-sm transition-colors ${
          lang === 'en' 
            ? 'bg-cyan-500 text-white' 
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        {langData?.en?.languageName || 'EN'}
      </button>
    </div>
  );
}
