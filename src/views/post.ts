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
      
      // 移除首頁 active，加入文章 active
      homeView.classList.remove('active');
      postContainer.classList.add('active');
      
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
    // 移除文章 active，加入首頁 active
    postContainer.classList.remove('active');
    homeView.classList.add('active');
    
    handleScrollFade();
    window.dispatchEvent(new Event('scroll'));
  }
};