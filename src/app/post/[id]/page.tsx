import fs from 'fs';
import path from 'path';
import PostClient from './PostClient';

export async function generateStaticParams() {
  const postsPath = path.join(process.cwd(), 'public/posts.json');
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  return posts.map((post: any) => ({ id: post.id }));
}

export default async function PostPage({ params }: { params: { id: string } }) {
  const postsPath = path.join(process.cwd(), 'public/posts.json');
  const langPath = path.join(process.cwd(), 'public/lang.json');
  const configPath = path.join(process.cwd(), 'public/site-config.json');

  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  const langData = JSON.parse(fs.readFileSync(langPath, 'utf8'));
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

  const post = posts.find((p: any) => p.id === params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return <PostClient post={post} langData={langData} config={config} />;
}
