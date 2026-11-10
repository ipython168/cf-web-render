import { handleScrollFade } from '../utils/animations';

export let posts: any[] = [];

export const loadPosts = async () => {
  try {
    const res = await fetch('/posts.json');
    posts = await res.json();
    renderPosts();
  } catch (err) {
    console.error("載入文章失敗", err);
  }
};

export const renderPosts = () => {
  const grid = document.getElementById('posts-grid');
  if (!grid) return;
  
  grid.innerHTML = posts.map(post => `
    <article class="post-card fade-in">
      ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-cover-img">` : ''}
      <div class="post-category">${post.category}</div>
      <h3 class="post-title">${post.title}</h3>
      <p class="post-date">${post.date}</p>
      <p class="post-excerpt">${post.excerpt}</p>
      <a href="#post/${post.id}" class="read-more">閱讀更多 →</a>
    </article>
  `).join('');
  
  handleScrollFade();
};
