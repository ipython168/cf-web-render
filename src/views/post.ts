import { marked } from 'marked';
import { posts } from './home';
import { handleScrollFade } from '../utils/animations';

// 將首頁嘅 HTML 暫存起嚟，方便返回時還原
let originalHomeHTML = '';

export const renderApp = () => {
  const hash = window.location.hash;
  const app = document.getElementById('app')!;

  if (hash.startsWith('#post/')) {
    const id = hash.replace('#post/', '');
    const post = posts.find(p => p.id === id);
    
    if (post) {
      // 第一次入文章，記低首頁個樣
      if (!originalHomeHTML) {
        originalHomeHTML = app.innerHTML;
      }

      // 直接將成個 #app 替換做文章內頁
      app.innerHTML = `
        <div class="container single-post">
          <a href="#" class="back-link" id="back-btn">← 返回首頁</a>
          <div class="post-category">${post.category}</div>
          <h1>${post.title}</h1>
          <p class="post-date">${post.date}</p>
          ${post.image ? `<img src="${post.image}" alt="${post.title}" class="single-post-img">` : ''}
          <div class="post-body">${marked.parse(post.content.replace(/\\n/g, '\n'))}</div>
        </div>
      `;
      
      window.scrollTo(0, 0);

      // 觸發文章內頁嘅 Fade-in
      const singlePost = app.querySelector('.single-post') as HTMLElement;
      if (singlePost) {
        setTimeout(() => {
          singlePost.style.opacity = '1';
          singlePost.style.transform = 'translateY(0)';
        }, 50);
      }

      // 綁定返回掣
      document.getElementById('back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '';
      });
    }
  } else {
    // 返回首頁：還原首頁 HTML
    if (originalHomeHTML) {
      app.innerHTML = originalHomeHTML;
      originalHomeHTML = ''; // 清空暫存
      
      // 重新觸發首頁嘅 Scroll 動畫
      handleScrollFade();
      window.dispatchEvent(new Event('scroll'));
    }
  }
};