// JavaScript 功能脚本

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
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
  
  // 深色模式切换并本地存储
  const themeToggle = document.getElementById('theme-toggle');
  
  // 初始化主题
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  // 切换主题
  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
  }
  
  // 初始化主题
  initTheme();
  
  // 绑定主题切换事件
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
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