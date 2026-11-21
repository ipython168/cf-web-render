 

## 🗺️ 總體路線圖
「Next.js + Tailwind CSS + FastAPI」路線

## 📍 Phase 1：建立 `cf-web-render` 骨架

**目標**：將你現有嘅 `quant-web` Fork 出嚟，改造成一個以 Next.js 為基礎、JSON 驅動、支援 SSG 嘅可換皮網站骨架。

### ✅ Step 1.1：Fork Repo 並改名
- 喺 GitHub 將 `quant-web` Fork 去一個新 Repo，改名做 `cf-web-render`。
- 喺 Colab Clone 新 Repo 落嚟。

### ✅ Step 1.2：初始化 Next.js 專案
- 喺新 Repo 入面行 `npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"`。
- 確認 Next.js 專案結構正常，`npm run dev` 跑到。

### ✅ Step 1.3：建立 JSON 驅動架構
- 建立 `sites/quantbase/` 資料夾，放入你現有嘅 `site-config.json`、`posts.json`、`content.json`、`stats.json`。
- 喺 `next.config.js` 設定 `publicDir` 指向對應嘅網站資料夾（同你之前 Vite 做法一樣）。
- 喺 Next.js App Router 入面，用 `fs.readFile` 讀取 JSON（因為 SSG 係喺 Build 時讀取，冇 CORS 問題）。

### ✅ Step 1.4：Cloudflare 部署測試
- 喺 Cloudflare 開新 Pages Project，連結 `cf-web-render` Repo。
- 設定 `VITE_SITE_DIR = quantbase`（或者用 Next.js 嘅環境變數）。
- 確認 Build 成功，網站上線。

---

## 📍 Phase 2：寫出 Datatone 級數嘅宣傳網站

**目標**：用 Next.js 重寫你現有嘅 `quant-web` 網站，做到 SEO 友善、載入快、有故事。

### ✅ Step 2.1：搬遷首頁（Hero + Features + Stats + Posts）
- 將 `homeView.ts` 入面嘅 HTML 改寫成 React Component（JSX）。
- 用 Next.js 嘅 `getStaticProps` 讀取 JSON，喺 Build 時生成靜態 HTML。

### ✅ Step 2.2：搬遷文章系統（Posts）
- 將 `quant-web` 的 `archive.ts` 同 `post.ts` 嘅邏輯改寫成 Next.js 動態路由（`/posts/[id]`）。
- 用 `generateStaticParams` 喺 Build 時生成所有文章頁面。

### ✅ Step 2.3：加入 SEO Meta Tag
- 每個頁面加入獨立嘅 `<title>`、`<meta name="description">`、`<meta property="og:image">`。
- 用 Next.js 嘅 `Metadata` API 動態生成。

### ✅ Step 2.4：加入故事包裝
- 喺首頁加入「關於我哋」區塊，用故事包裝產品（例如「我哋係香港小型開發團隊，用數據幫你解決交易痛點」）。
- 呢個區塊嘅文字放入 `content.json`，方便將來換皮。

---

## 📍 Phase 3：建立媒體渠道 + 故事包裝

**目標**：建立 FB / IG / Threads / YT 帳號，定期出 Post，用故事吸引用戶。

### ✅ Step 3.1：開設社交媒體帳號
- 開 FB Page、IG、Threads、YT。
- 統一人設（例如「執數佬」），用同一個 Logo 同 Banner。

### ✅ Step 3.2：建立內容日曆
- 每星期出 2-3 篇 Post，內容包括：
  - 產品功能介紹
  - 交易心得
  - 幕後開發日記（呢個最吸引人）

### ✅ Step 3.3：用 FB 宣傳網站
- 喺 FB Post 入面加網站連結，引導人去你個網站。
- 用 FB 廣告（少量預算）測試邊個 Post 最多人撳。

---

## 📍 Phase 4：寫 iOS + Android App（React Native）

**目標**：用 Expo + React Native 寫一個 MVP，同時出 iOS 同 Android，測試市場反應。

### ✅ Step 4.1：建立 Expo 專案
- 行 `npx create-expo-app@latest my-app --template`。
- 用 TypeScript 寫，確認 Expo Go 喺 iPhone 度跑到。

### ✅ Step 4.2：搬遷核心功能
- 將你網站嘅文章系統、回測結果顯示，搬去 App 入面。
- 用 `fetch` 呼叫你嘅 FastAPI 後端（或者直接讀 JSON）。

### ✅ Step 4.3：加入深度功能（可選）
- 如果時間許可，用 Expo 嘅 Widget 支援，加一個簡單嘅 iOS Widget。
- 如果太複雜，先跳過，專心做好 MVP。

### ✅ Step 4.4：上架測試
- 用 EAS Build 編譯 iOS 版，用 TestFlight 測試。
- 上架 App Store 同 Google Play，睇吓有幾多人下載。

--- 