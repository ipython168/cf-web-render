import { marked } from 'marked';
import { posts } from './home';
import { handleScrollFade } from '../utils/animations';

let savedHomeHTML = '';

export const renderApp = () => {
  const hash = window.location.hash;
  const app = document.getElementById('app')!;

  if (hash.startsWith('#post/')) {
    const id = hash.replace('#post/', '');
    const post = posts.find(p => p.id === id);
    
    if (post) {
      if (!savedHomeHTML) {
        savedHomeHTML = app.innerHTML;
      }
      // 語言 Fallback 邏輯
      const lang = localStorage.getItem('lang') || 'zh';
      // 只有當 en 入面「title, excerpt, content」全部都有嘢，先用 en，否則 fallback 中文
      const hasFullEnglish = lang === 'en' && post.en?.title && post.en?.content;
      const t = hasFullEnglish ? post.en : post.zh;

      app.innerHTML = `
        <div class="container single-post">
          <a href="#archive" class="back-link" id="back-btn">← ${lang === 'en' ? 'All Articles' : '所有文章'}</a>
          <div class="post-category">${post.category}</div> <!-- 如果你有 category 英文對照可以喺呢度加 -->


          <h1>${t.title}</h1>
          <p class="post-date">${post.date}</p>
          ${post.image ? `<img src="${post.image}" alt="${t.title}" class="single-post-img">` : ''}
          <div class="post-body">${marked.parse(t.content.replace(/\\\\n/g, '\\n'))}</div>
        </div>
      `;
      
      window.scrollTo(0, 0);

      const singlePost = app.querySelector('.single-post') as HTMLElement;
      if (singlePost) {
        setTimeout(() => {
          singlePost.style.opacity = '1';
          singlePost.style.transform = 'translateY(0)';
        }, 50);
      }

      document.getElementById('back-btn')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.hash = '#archive';

      });
    }
  } else {
    if (savedHomeHTML) {
      app.innerHTML = savedHomeHTML;
      savedHomeHTML = ''; 
      
      handleScrollFade();
      window.dispatchEvent(new Event('scroll'));
    }
  }
};
