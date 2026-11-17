import fs from 'fs';
import path from 'path';
import ArchiveClient from './ArchiveClient';

export default async function ArchivePage() {
  const postsPath = path.join(process.cwd(), 'public/posts.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');
  const configPath = path.join(process.cwd(), 'public/site-config.json');

  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  return <ArchiveClient posts={posts} langData={langData} config={config} />;
}
