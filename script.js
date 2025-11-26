const video = document.getElementById('videoBackground');
const videoSource = document.getElementById('videoSource');
const menu = document.getElementById('menu');
const controls = document.getElementById('controls');
const loading = document.getElementById('loading');
const wallpaperBtns = document.querySelectorAll('.wallpaper-btn');

// --- LÓGICA DAS THUMBNAILS (HOVER) E CLIQUE DOS VÍDEOS PADRÃO ---
wallpaperBtns.forEach((btn) => {
  // Ignora o botão de adicionar vídeo
  if (btn.id === 'btnAddVideo') return;

  const thumb = btn.querySelector('.thumbnail');
  
  // 1. Lógica do Hover (Thumbnail)
  if(thumb) {
    btn.addEventListener('mouseenter', function() {
      thumb.currentTime = 0;
      thumb.play().catch(() => {});
    });
    
    btn.addEventListener('mouseleave', function() {
      thumb.pause();
      thumb.currentTime = 0;
    });
  }

  // 2. Lógica do Clique (Carregamento)
  btn.addEventListener('click', function() {
    const videoFile = this.getAttribute('data-video');
    if(videoFile) {
      loadVideo(videoFile);
    }
  });
});

// --- LÓGICA DO BOTÃO "ADICIONAR VÍDEO" ---
const btnAdd = document.getElementById('btnAddVideo');
const inputVideo = document.getElementById('videoInput');

if (btnAdd && inputVideo) {
  // Ao clicar no botão, aciona o input escondido
  btnAdd.addEventListener('click', () => {
    inputVideo.click();
  });

  // Ao selecionar um arquivo, carrega o vídeo
  inputVideo.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      loadVideo(fileURL);
      inputVideo.value = ''; 
    }
  });
}

// --- FUNÇÕES GERAIS ---

function loadVideo(filename) {
  loading.classList.add('active');
  menu.classList.add('hidden');

  video.pause();
  video.classList.remove('active');

  videoSource.src = filename;
  video.load();

  video.addEventListener('loadeddata', function onLoad() {
    video.removeEventListener('loadeddata', onLoad);
    loading.classList.remove('active');
    video.classList.add('active');
    video.play();
    controls.classList.add('visible');
    enterFullscreen();
  });

  video.addEventListener('error', function onError() {
    video.removeEventListener('error', onError);
    loading.classList.remove('active');
    alert('Erro ao carregar o vídeo. Verifique se o arquivo existe e o formato é compatível (mp4/webm).');
    menu.classList.remove('hidden');
  });
}

function goBack() {
  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => showMenu()).catch(() => showMenu());
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

function enterFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(err => {
      console.log('Não foi possível entrar em tela cheia automaticamente:', err.message);
    });
  }
}

// Atalhos de teclado
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' || e.key === 'm' || e.key === 'M') {
    e.preventDefault();
    if (menu.classList.contains('hidden')) {
      goBack();
    }
  }
});