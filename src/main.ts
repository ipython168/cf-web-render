import './style.css';

interface BacktestResult {
  strategy: string;
  returnRate: number;
  sharpeRatio: number;
}

// 模擬一個從 Python API 拎返嚟嘅回測結果
const mockData: BacktestResult = {
  strategy: "均線交叉 (MA Cross)",
  returnRate: 24.5,
  sharpeRatio: 1.8
};

const app = document.querySelector<HTMLDivElement>('#app')!;

app.innerHTML = `
  <h1>📈 Quant-Web 回測系統</h1>
  <div class="card">
    <h2>策略：${mockData.strategy}</h2>
    <p>預期年化回報：<strong class="positive">${mockData.returnRate}%</strong></p>
    <p>夏普比率：<strong>${mockData.sharpeRatio}</strong></p>
  </div>
  <p>呢個係一個用 TypeScript 寫嘅前端。</p>
`;

console.log("前端載入成功！");
