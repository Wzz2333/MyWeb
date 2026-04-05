// JavaScript 功能脚本

// 生成星星
function generateStars() {
  const starsContainer = document.getElementById('stars');
  if (!starsContainer) return;
  
  const starCount = 200; // 星星数量
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // 随机大小
    const size = Math.random();
    if (size < 0.7) {
      star.classList.add('small');
    } else if (size < 0.9) {
      star.classList.add('medium');
    } else {
      star.classList.add('large');
    }
    
    // 随机位置
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    // 随机动画延迟
    star.style.animationDelay = `${Math.random() * 4}s`;
    
    starsContainer.appendChild(star);
  }
}

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  // 生成星星
  generateStars();
  
  // 移动端菜单开关
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('hidden');
    });
    
    // 点击移动端菜单项后关闭菜单
    const mobileMenuItems = mobileMenu.querySelectorAll('a');
    mobileMenuItems.forEach(item => {
      item.addEventListener('click', function() {
        mobileMenu.classList.add('hidden');
      });
    });
  }
  
  // 平滑滚动到锚点
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // 导航栏滚动效果
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // 表单提交提示
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 获取表单数据
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;
      
      // 简单验证
      if (!name || !email || !message) {
        alert('请填写所有必填字段');
        return;
      }
      
      // 输出到控制台
      console.log('表单提交数据:', {
        name,
        email,
        message
      });
      
      // 显示提示
      alert('消息已发送！我们会尽快回复您。');
      
      // 重置表单
      contactForm.reset();
    });
  }
  
  // 淡入动画
  function handleScrollAnimation() {
    const elements = document.querySelectorAll('section');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.classList.add('fade-in');
      }
    });
  }
  
  // 初始执行一次
  handleScrollAnimation();
  
  // 滚动时执行
  window.addEventListener('scroll', handleScrollAnimation);
});