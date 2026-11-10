import { marked } from 'marked';
import { posts } from './home';
import { handleScrollFade } from '../utils/animations';

export const renderApp = () => {
  const hash = window.location.hash;
  const postContainer = document.getElementById('post-content')!;
  const homeView = document.getElementById('home-view')!;

  if (hash.startsWith('#post/')) {
    const id = hash.replace('#post/', '');
    const post = posts.find(p => p.id === id);
    
    if (post) {
      postContainer.innerHTML = `
        <div class="container single-post">
          <a href="#" class="back-link" id="back-btn">← 返回首頁</a>
          <div class="post-category">${post.category}</div>
          <h1>${post.title}</h1>
          <p class="post-date">${post.date}</p>
          ${post.image ? `<img src="${post.image}" alt="${post.title}" class="single-post-img">` : ''}
          <div class="post-body">${marked.parse(post.content.replace(/\\n/g, '\n'))}</div>
        </div>
      `;
      
      // 用 Class 嚟隱藏，順便清走高度
      homeView.classList.add('hidden-view');
      postContainer.style.display = 'block';
      window.scrollTo(0, 0);

      const singlePost = postContainer.querySelector('.single-post') as HTMLElement;
      if (singlePost) {
        setTimeout(() => {
          singlePost.style.opacity = '1';
          singlePost.style.transform = 'translateY(0)';
        }, 50);
      }

      document.getElementById('back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
      });
    }
  } else {
    postContainer.style.display = 'none';
    // 移除 Class，還原首頁
    homeView.classList.remove('hidden-view');
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
  }
};
