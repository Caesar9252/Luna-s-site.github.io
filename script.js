// Эффекты неба
function createClouds() {
    const container = document.querySelector('.clouds-container');
    for (let i = 0; i < 8; i++) {
      const cloud = document.createElement('div');
      cloud.className = 'cloud';
      cloud.style.cssText = 
        'top: ' + (Math.random() * 80) + '%;' +
        'left: ' + (Math.random() * 100) + '%;' +
        'width: ' + (60 + Math.random() * 100) + 'px;' +
        'height: ' + (30 + Math.random() * 50) + 'px;' +
        'animation-duration: ' + (40 + Math.random() * 80) + 's;';
      
      cloud.innerHTML = '<style>' +
        '.cloud:nth-child(' + (i+1) + ')::before {' +
          'width: ' + (40 + Math.random() * 30) + '%;' +
          'height: 80%;' +
          'top: -20%;' +
          'left: 10%;' +
        '}' +
        '.cloud:nth-child(' + (i+1) + ')::after {' +
          'width: ' + (40 + Math.random() * 30) + '%;' +
          'height: 60%;' +
          'top: -10%;' +
          'right: 10%;' +
        '}' +
        '</style>';
      container.appendChild(cloud);
    }
}
  
function createStars() {
    const container = document.querySelector('.stars-container');
    for (let i = 0; i < 100; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.cssText = 
        'top: ' + (Math.random() * 100) + '%;' +
        'left: ' + (Math.random() * 100) + '%;' +
        'width: ' + (Math.random() * 3) + 'px;' +
        'height: ' + (Math.random() * 3) + 'px;' +
        'animation-delay: ' + (Math.random() * 2) + 's;';
      container.appendChild(star);
    }
}
  
  // Переключение темы
  const themeSwitcher = document.querySelector('.theme-switcher');
  let isNight = false;
  
function toggleTheme() {
    isNight = !isNight;
    document.body.classList.toggle('night', isNight);
    document.querySelector('.clouds-container').style.display = isNight ? 'none' : 'block';
    document.querySelector('.stars-container').style.display = isNight ? 'block' : 'none';
}
  
  themeSwitcher.addEventListener('click', toggleTheme);
  
  // Следы от лапок
  const paws = [];
  const maxPaws = 3;
  let lastPosition = { x: 0, y: 0 };
  
  document.addEventListener('mousemove', (e) => {
    lastPosition = { x: e.clientX, y: e.clientY };
 });
  
  function createPaw() {
    const paw = document.createElement('div');
    paw.className = 'paw';
    const offset = 15;
    paw.style.left = (lastPosition.x + offset) + 'px';
    paw.style.top = (lastPosition.y + offset) + 'px';
    document.body.appendChild(paw);
    
    paws.push(paw);
    if(paws.length > maxPaws) {
      const oldPaw = paws.shift();
      oldPaw.style.opacity = '0';
      setTimeout(() => oldPaw.remove(), 500);
    }
    
    setTimeout(() => {
      paw.style.opacity = '0';
      setTimeout(() => paw.remove(), 500);
    }, 1000);
  }
  
  setInterval(createPaw, 200);
  
  // Ленивая загрузка изображений
  document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    for (let i = 0; i < images.length; i++) {
      images[i].setAttribute('loading', 'lazy');
    }
  });
  
  // Убрать размытие
  function removeBlur(event) {
    const clickedImage = event.currentTarget;
    clickedImage.classList.add('unblurred');
  }
  
  // Инициализация
  createClouds();
  createStars();
  setThemeByTime();
  
  // Автоопределение темы
  function setThemeByTime() {
    const hours = new Date().getHours();
    isNight = hours < 6 || hours >= 20;
    toggleTheme();
  }

// Обновите функцию setThemeByTime
function setThemeByTime() {
    const hours = new Date().getHours();
    const themeMessage = document.querySelector('.theme-message');
    isNight = hours < 6 || hours >= 20;
    
    let message = isNight 
      ? '🌙 Ночная тема: 6:00 - 20:00 (автовыбор)' 
      : '☀️ Дневная тема: 20:00 - 6:00 (автовыбор)';
    
    showThemeMessage(message);
    toggleTheme();
  }
  
  // Добавьте новые функции
  function showThemeMessage(text) {
    const messageBox = document.querySelector('.theme-message');
    messageBox.textContent = text;
    messageBox.classList.add('active');
    
    setTimeout(() => {
      messageBox.classList.remove('active');
    }, 4000);
  }
  
  // Обновите функцию toggleTheme
  function toggleTheme() {
    isNight = !isNight;
    document.body.classList.toggle('night', isNight);
    
    const message = isNight 
      ? '🌃 Ночная тема активирована!' 
      : '🌅 Дневная тема активирована!';
    
    showThemeMessage(message);
  }
  
  
  document.addEventListener('DOMContentLoaded', () => {
    
    setTimeout(() => {
      const initialMessage = isNight 
        ? 'Доброй ночи! Луна светит ярко 🌕' 
        : 'Доброго дня! Солнышко светит 🌞';
      showThemeMessage(initialMessage);
    }, 1000);
  });
  
  