// Lista com os nomes das suas fotos da pasta img/
const imagensCapa = [
    'img/capa1.jpg',
    'img/capa2.jpg',
    'img/capa3.jpg'
];

let indiceAtual = 0;
const heroElement = document.getElementById('hero-carousel');

/* ================================
   1. CONTADOR DE TEMPO (PROGRESSIVO)
================================ */
const dataInicioNamoro = new Date(2025, 10, 22);

function atualizarContador() {
    const agora = new Date();
    let diferenca = agora - dataInicioNamoro;

    if (diferenca < 0) diferenca = 0;

    const segundosTotais = Math.floor(diferenca / 1000);
    const minutosTotais = Math.floor(segundosTotais / 60);
    const horasTotais = Math.floor(minutosTotais / 60);
    const diasTotais = Math.floor(horasTotais / 24);

    const anos = Math.floor(diasTotais / 365);
    const meses = Math.floor((diasTotais % 365) / 30);
    const dias = (diasTotais % 365) % 30;

    const horas = horasTotais % 24;
    const minutos = minutosTotais % 60;
    const segundos = segundosTotais % 60;

    const h = horas < 10 ? '0' + horas : horas;
    const m = minutos < 10 ? '0' + minutos : minutos;
    const s = segundos < 10 ? '0' + segundos : segundos;

    let texto = '';

    texto += `${anos} Ano${anos !== 1 ? 's' : ''}, `;
    texto += `${meses} Mês${meses !== 1 ? 'es' : ''}, `;
    texto += `${dias} Dia${dias !== 1 ? 's' : ''}, `;
    texto += `${h} Horas, ${m} Minutos e ${s} Segundos`;

    const contadorElement = document.getElementById('contador');
    if (contadorElement) {
        contadorElement.innerText = texto;
    }
}

setInterval(atualizarContador, 1000);
atualizarContador();

function trocarImagemFundo() {
    if (!heroElement) return;
    indiceAtual = (indiceAtual + 1) % imagensCapa.length;
    heroElement.style.backgroundImage = `url('${imagensCapa[indiceAtual]}')`;
}

setInterval(trocarImagemFundo, 5000);

/* ================================
   2. SCROLL REVEAL ANIMATION
================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    root: null,
    threshold: 0.15,
    rootMargin: "0px"
});

revealElements.forEach(el => revealObserver.observe(el));

/* ================================
   3. MUSIC PLAYER CONTROLS
================================ */
const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const timeBar = document.querySelector('.time-bar');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');

let isPlaying = false;

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        audio.play().catch(e => {
            console.log("Erro ao reproduzir áudio:", e);
            if (e.name === 'NotAllowedError') {
                alert('Clique em qualquer lugar da página para habilitar a reprodução de áudio.');
            }
        });
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
    isPlaying = !isPlaying;
}

function updateProgressBar() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

playPauseBtn.addEventListener('click', togglePlayPause);
audio.addEventListener('timeupdate', updateProgressBar);
timeBar.addEventListener('click', setProgress);

document.addEventListener('click', function() {
    if (audio.paused) {
        audio.load();
    }
}, { once: true });

/* ================================
   4. POLAROID CAROUSEL - RESPONSIVO
================================ */
const stackContainer = document.getElementById('polaroid-stack');
const polaroids = Array.from(document.querySelectorAll('.polaroid'));

let currentIndex = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let dragOffset = 0;

function updateStack() {
    if (!polaroids.length) return;

    polaroids.forEach(p => {
        p.style.transform = '';
        p.style.opacity = '';
        p.style.zIndex = '';
        p.style.display = 'block';
    });

    // Para mobile - carrossel com 1 polaroid por vez
    if (window.innerWidth <= 768) {
        polaroids.forEach((p, index) => {
            if (index === currentIndex) {
                p.style.transform = `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`;
                p.style.opacity = '1';
                p.style.zIndex = '10';
                p.style.display = 'block';
            } else {
                p.style.opacity = '0';
                p.style.zIndex = '0';
                p.style.display = 'none';
            }
        });
        
        // Atualizar indicadores
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentIndex);
        });
    } else {
        // Para desktop - mostra todos os polaroids
        polaroids.forEach((p, index) => {
            const rotation = index % 2 === 0 ? -2 : 2;
            p.style.transform = `rotate(${rotation}deg)`;
            p.style.opacity = '1';
            p.style.zIndex = '1';
        });
    }
}

// Criar indicadores do carrossel
function createCarouselIndicators() {
    if (window.innerWidth > 768) return;
    
    const existingIndicators = document.querySelector('.carousel-indicators');
    if (existingIndicators) existingIndicators.remove();
    
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'carousel-indicators';
    
    polaroids.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `carousel-indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateStack();
        });
        indicatorsContainer.appendChild(indicator);
    });
    
    stackContainer.parentNode.appendChild(indicatorsContainer);
}

// Swipe Logic
if (stackContainer) {
    stackContainer.addEventListener('touchstart', (e) => {
        if (window.innerWidth > 768) return;
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        dragOffset = 0;
    }, { passive: true });

    stackContainer.addEventListener('touchmove', (e) => {
        if (!isDragging || window.innerWidth > 768) return;
        currentX = e.touches[0].clientX;
        dragOffset = currentX - startX;
        updateStack();
    }, { passive: true });

    stackContainer.addEventListener('touchend', (e) => {
        if (!isDragging || window.innerWidth > 768) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;
        const threshold = 50;

        if (diffX > threshold) {
            currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
        } else if (diffX < -threshold) {
            currentIndex = (currentIndex + 1) % polaroids.length;
        }
        
        dragOffset = 0;
        updateStack();
    });
}

/* ================================
   5. INICIALIZAÇÃO E RESPONSIVIDADE
================================ */
function handleResize() {
    updateStack();
    createCarouselIndicators();
    
    // Ajustar layout do player
    const playerCard = document.querySelector('.player-card');
    if (window.innerWidth <= 768) {
        playerCard.style.position = 'fixed';
        playerCard.style.left = '50%';
        playerCard.style.transform = 'translateX(-50%)';
        playerCard.style.top = '15px';
    } else {
        playerCard.style.position = 'absolute';
        playerCard.style.left = '30px';
        playerCard.style.top = '30px';
        playerCard.style.transform = 'none';
    }
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    atualizarContador();
    updateStack();
    createCarouselIndicators();
    handleResize();
});

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);