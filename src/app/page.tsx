import fs from 'fs';
import path from 'path';
import HomeClient from './HomeClient'; // 👈 引入 Client Component

export default async function Home() {
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');

  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));

  // 將 config 傳俾 Client Component 
  return <HomeClient config={config} langData={langData} />;

}