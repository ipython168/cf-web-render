import fs from 'fs';
import path from 'path';
import HomeClient from './HomeClient';

export default async function Home() {
  const configPath = path.join(process.cwd(), 'public/site-config.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');
  const postsPath = path.join(process.cwd(), 'public/posts.json');
  
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

  return <HomeClient config={config} langData={langData} posts={posts} />;
}