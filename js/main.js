// JavaScript 功能脚本

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  
  // 导航栏滚动效果
  const header = document.querySelector('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('py-2');
      header.classList.remove('py-4');
    } else {
      header.classList.add('py-4');
      header.classList.remove('py-2');
    }
  });
  
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
  
  // 关于我区域交互
  const mainCard = document.getElementById('main-card');
  const aboutInitial = document.getElementById('about-initial');
  const aboutExpanded = document.getElementById('about-expanded');
  
  console.log('Elements found:', {
    mainCard: !!mainCard,
    aboutInitial: !!aboutInitial,
    aboutExpanded: !!aboutExpanded
  });
  
  if (mainCard && aboutInitial && aboutExpanded) {
    mainCard.addEventListener('click', function() {
      console.log('Main card clicked');
      // 隐藏初始状态，显示展开状态
      aboutInitial.classList.add('hidden');
      aboutExpanded.classList.remove('hidden');
    });
  } else {
    console.error('Some elements not found');
  }
  
  // 子卡片点击事件
  const subCards = document.querySelectorAll('[data-modal]');
  console.log('Sub cards found:', subCards.length);
  subCards.forEach(card => {
    card.addEventListener('click', function(e) {
      e.stopPropagation(); // 防止事件冒泡
      const modalId = this.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      console.log('Sub card clicked:', modalId, !!modal);
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
      }
    });
  });
  
  // 关闭模态框
  const closeButtons = document.querySelectorAll('.close-modal');
  console.log('Close buttons found:', closeButtons.length);
  closeButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation(); // 防止事件冒泡
      const modal = this.closest('[id^="modal-"]');
      console.log('Close button clicked:', !!modal);
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = ''; // 恢复背景滚动
      }
    });
  });
  
  // 点击模态框背景关闭
  const modals = document.querySelectorAll('[id^="modal-"]');
  console.log('Modals found:', modals.length);
  modals.forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        console.log('Modal background clicked');
        this.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });
});