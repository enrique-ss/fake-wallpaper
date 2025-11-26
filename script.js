const video = document.getElementById('videoBackground');
const videoSource = document.getElementById('videoSource');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const loading = document.getElementById('loading');
const wallpaperBtns = document.querySelectorAll('.wallpaper-btn');
const thumbnails = document.querySelectorAll('.thumbnail');

// Iniciar reprodução das thumbnails ao passar o mouse
wallpaperBtns.forEach((btn, index) => {
  const thumb = btn.querySelector('.thumbnail');
  
  btn.addEventListener('mouseenter', function() {
    thumb.currentTime = 0;
    thumb.play().catch(() => {});
  });
  
  btn.addEventListener('mouseleave', function() {
    thumb.pause();
    thumb.currentTime = 0;
  });
});

// Configurar eventos dos botões
wallpaperBtns.forEach(btn => {
  btn.addEventListener('click', function() {
    const videoFile = this.getAttribute('data-video');
    loadVideo(videoFile);
  });
});

function loadVideo(filename) {
  // Mostrar loading
  loading.classList.add('active');
  menu.classList.add('hidden');

  // Parar vídeo atual
  video.pause();
  video.classList.remove('active');

  // Carregar novo vídeo
  videoSource.src = filename;
  video.load();

  video.addEventListener('loadeddata', function onLoad() {
    video.removeEventListener('loadeddata', onLoad);
    loading.classList.remove('active');
    video.classList.add('active');
    video.play();
    controls.classList.add('visible');
    
    // Entrar em tela cheia automaticamente
    enterFullscreen();
  });

  video.addEventListener('error', function onError() {
    video.removeEventListener('error', onError);
    loading.classList.remove('active');
    alert('Erro ao carregar o vídeo: ' + filename + '\n\nCertifique-se de que o arquivo existe na mesma pasta.');
    menu.classList.remove('hidden');
  });
}

function goBack() {
  // Sair da tela cheia se estiver
  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => {
      showMenu();
    }).catch(() => {
      showMenu();
    });
  } else {
    showMenu();
  }
}

function showMenu() {
  menu.classList.remove('hidden');
  video.classList.remove('active');
  video.pause();
  controls.classList.remove('visible');
}

function closeWallpaper() {
  if (confirm('Deseja realmente fechar o wallpaper?')) {
    video.pause();
    video.classList.remove('active');
    menu.classList.remove('hidden');
    controls.classList.remove('visible');
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }
}

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Não foi possível entrar em tela cheia automaticamente:', err.message);
    });
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      alert('Erro ao ativar tela cheia: ' + err.message);
    });
  } else {
    document.exitFullscreen();
  }
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (!menu.classList.contains('hidden')) {
      // Não fazer nada se já estiver no menu
    } else {
      goBack();
    }
  } else if (e.key === 'F11') {
    e.preventDefault();
    toggleFullscreen();
  } else if (e.key === 'm' || e.key === 'M') {
    goBack();
  }
});

// Detectar mudanças de fullscreen
document.addEventListener('fullscreenchange', function() {
  const btn = document.querySelector('.control-btn:last-child');
  if (document.fullscreenElement) {
    btn.textContent = '⛶ Sair Tela Cheia';
  } else {
    btn.textContent = '⛶ Tela Cheia';
  }
});