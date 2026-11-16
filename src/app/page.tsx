import fs from 'fs';
import path from 'path';
import { useState } from 'react';

// 1. 定義一個 Component，接收 Props
interface GreetingProps {
  name: string;
  age: number;
}

const Greeting = ({ name, age }: GreetingProps) => {
  return (
    <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>你好，{name}！</h2>
      <p>你今年 {age} 歲。</p>
    </div>
  );
};

// 2. 定義一個有 State 嘅 Component
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div style={{ padding: '1rem', background: '#1e293b', borderRadius: '8px', marginBottom: '1rem' }}>
      <h2>計數機</h2>
      <p>你撳咗 <strong style={{ color: '#38bdf8', fontSize: '1.5rem' }}>{count}</strong> 次</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ padding: '0.5rem 1rem', background: '#38bdf8', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        撳我 +1
      </button>
      <button 
        onClick={() => setCount(0)}
        style={{ padding: '0.5rem 1rem', background: '#ef4444', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold', marginLeft: '0.5rem', color: 'white' }}
      >
        重置
      </button>
    </div>
  );
};

// 3. 主頁 Component
export default async function Home() {
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  return (
    <main style={{ padding: '4rem', fontFamily: 'sans-serif', background: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h1>{config.siteName} 測試頁</h1>
      
      {/* 用 Props 傳數據 */}
      <Greeting name="阿明" age={25} />
      <Greeting name="小美" age={30} />
      
      {/* State 互動例子 */}
      <Counter />
      
      <div style={{ marginTop: '2rem', padding: '1rem', background: '#1e293b', borderRadius: '8px' }}>
        <h2>Logo 測試：</h2>
        <img src={config.logoImage} alt="Logo" style={{ height: '60px' }} />
      </div>
    </main>
  );
}
