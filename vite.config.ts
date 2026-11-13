import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig(() => {
  // 預設用 photobase，如果喺 Cloudflare 設定咗 VITE_SITE_DIR=quantbase，就會用 quantbase
  const siteDir = process.env.VITE_SITE_DIR || 'photobase';

  return {
    // 將 publicDir 指向對應嘅網站資料夾
    publicDir: path.resolve(__dirname, `sites/${siteDir}`),
  };
});
