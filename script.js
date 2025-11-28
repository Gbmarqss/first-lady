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
// Data de início: 22 de Novembro de 2025
// Mês 10 = Novembro
const dataInicioNamoro = new Date(2025, 10, 22);

function atualizarContador() {
    const agora = new Date();
    let diferenca = agora - dataInicioNamoro;

    // Evita números negativos se a data for futura (apenas por segurança)
    if (diferenca < 0) diferenca = 0;

    // Cálculos matemáticos
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

    // Formatação "00"
    const h = horas < 10 ? '0' + horas : horas;
    const m = minutos < 10 ? '0' + minutos : minutos;
    const s = segundos < 10 ? '0' + segundos : segundos;

    // Monta a string no formato: "X Anos, Y Meses, Z Dias, H Horas, M Minutos e S Segundos"
    let texto = '';

    texto += `${anos} Ano${anos !== 1 ? 's' : ''}, `;
    texto += `${meses} Mês${meses !== 1 ? 'es' : ''}, `;
    texto += `${dias} Dia${dias !== 1 ? 's' : ''}, `;
    texto += `${h} Horas, ${m} Minutos e ${s} Segundos`;

    // Insere no HTML
    const contadorElement = document.getElementById('contador');
    if (contadorElement) {
        contadorElement.innerText = texto;
    }
}

// Atualiza a cada segundo
setInterval(atualizarContador, 1000);
// Roda imediatamente ao carregar
atualizarContador();

function trocarImagemFundo() {
    if (!heroElement) return;

    // Avança o índice (se chegar no fim, volta pro zero)
    indiceAtual = (indiceAtual + 1) % imagensCapa.length;

    // Troca a imagem de fundo do CSS
    heroElement.style.backgroundImage = `url('${imagensCapa[indiceAtual]}')`;
}

// Troca a imagem a cada 5 segundos (5000 milissegundos)
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
    threshold: 0.15, // Dispara quando 15% do elemento estiver visível
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

// Função para alternar entre play e pause
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        audio.play().catch(e => {
            console.log("Erro ao reproduzir áudio:", e);
            // Mostra um alerta amigável se o usuário não interagiu com a página
            if (e.name === 'NotAllowedError') {
                alert('Clique em qualquer lugar da página para habilitar a reprodução de áudio.');
            }
        });
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
    isPlaying = !isPlaying;
}

// Atualiza a barra de progresso
function updateProgressBar() {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
}

// Define a posição da música ao clicar na barra de progresso
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = (clickX / width) * duration;
}

// Event Listeners para o player de música
playPauseBtn.addEventListener('click', togglePlayPause);
audio.addEventListener('timeupdate', updateProgressBar);
timeBar.addEventListener('click', setProgress);

// Permite que o áudio seja tocado após interação do usuário
document.addEventListener('click', function() {
    // Este evento é necessário para desbloquear a reprodução automática em alguns navegadores
    if (audio.paused) {
        audio.load();
    }
}, { once: true });

/* ================================
   4. POLAROID CAROUSEL - MELHORADO
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

    // Reset transforms
    polaroids.forEach(p => {
        p.style.transform = '';
        p.style.opacity = '';
        p.style.zIndex = '';
        p.style.display = 'block';
    });

    // Para desktop - mostra todos os polaroids
    if (window.innerWidth > 768) {
        polaroids.forEach((p, index) => {
            const rotation = index % 2 === 0 ? -2 : 2;
            p.style.transform = `rotate(${rotation}deg)`;
        });
        return;
    }

    // Para mobile - carrossel com 1 polaroid por vez
    polaroids.forEach((p, index) => {
        if (index === currentIndex) {
            // Polaroid ativo - centralizado
            p.style.transform = `translateX(${dragOffset}px) rotate(${dragOffset * 0.05}deg)`;
            p.style.opacity = '1';
            p.style.zIndex = '10';
        } else {
            // Outros polaroids - escondidos
            p.style.opacity = '0';
            p.style.zIndex = '0';
            p.style.display = 'none';
        }
    });
}

// Initialize
updateStack();

// --- Swipe Logic Melhorada ---
if (stackContainer) {
    // Touch events
    stackContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        currentX = startX;
        isDragging = true;
        dragOffset = 0;
        stackContainer.style.cursor = 'grabbing';
    }, { passive: true });

    stackContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        dragOffset = currentX - startX;
        
        updateStack();
    }, { passive: true });

    stackContainer.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        stackContainer.style.cursor = 'grab';
        
        const endX = e.changedTouches[0].clientX;
        const diffX = endX - startX;
        const threshold = 50; // Min distance to trigger swipe
        const velocity = Math.abs(diffX) / 300; // Simple velocity calculation

        if (diffX > threshold || (diffX > 20 && velocity > 0.3)) {
            // Swipe Right -> Previous
            currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
        } else if (diffX < -threshold || (diffX < -20 && velocity > 0.3)) {
            // Swipe Left -> Next
            currentIndex = (currentIndex + 1) % polaroids.length;
        }
        
        dragOffset = 0;
        updateStack();
    });

    // Mouse events para desktop também
    stackContainer.addEventListener('mousedown', (e) => {
        startX = e.clientX;
        currentX = startX;
        isDragging = true;
        dragOffset = 0;
        stackContainer.style.cursor = 'grabbing';
    });
    
    stackContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        currentX = e.clientX;
        dragOffset = currentX - startX;
        
        updateStack();
    });
    
    stackContainer.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        stackContainer.style.cursor = 'grab';
        
        const endX = e.clientX;
        const diffX = endX - startX;
        const threshold = 50;
        const velocity = Math.abs(diffX) / 300;

        if (diffX > threshold || (diffX > 20 && velocity > 0.3)) {
            currentIndex = (currentIndex - 1 + polaroids.length) % polaroids.length;
        } else if (diffX < -threshold || (diffX < -20 && velocity > 0.3)) {
            currentIndex = (currentIndex + 1) % polaroids.length;
        }
        
        dragOffset = 0;
        updateStack();
    });
    
    stackContainer.addEventListener('mouseleave', () => {
        if(isDragging) {
            isDragging = false;
            stackContainer.style.cursor = 'grab';
            dragOffset = 0;
            updateStack();
        }
    });

    // Indicadores do carrossel para mobile
    function createCarouselIndicators() {
        if (window.innerWidth > 768) return;
        
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        indicatorsContainer.style.cssText = `
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            width: 100%;
        `;
        
        polaroids.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            indicator.style.cssText = `
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background: ${index === currentIndex ? 'var(--accent-color)' : 'rgba(255,255,255,0.3)'};
                cursor: pointer;
                transition: background 0.3s ease;
            `;
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateStack();
            });
            indicatorsContainer.appendChild(indicator);
        });
        
        stackContainer.parentNode.appendChild(indicatorsContainer);
        
        // Atualizar indicadores quando o carrossel mudar
        const originalUpdateStack = updateStack;
        updateStack = function() {
            originalUpdateStack();
            const indicators = document.querySelectorAll('.carousel-indicator');
            indicators.forEach((indicator, index) => {
                indicator.style.background = index === currentIndex ? 'var(--accent-color)' : 'rgba(255,255,255,0.3)';
            });
        };
    }
    
    createCarouselIndicators();
}

// Atualizar layout quando a janela for redimensionada
window.addEventListener('resize', updateStack);

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    atualizarContador();
    updateStack();
});
/* ================================
   5. AJUSTE DE LAYOUT PARA DESKTOP
================================ */
function ajustarLayoutDesktop() {
    const playerCard = document.querySelector('.player-card');
    const overlay = document.querySelector('.overlay');
    
    if (window.innerWidth > 768) {
        // No desktop, move o player para o canto esquerdo
        if (playerCard) {
            playerCard.style.left = '30px';
            playerCard.style.transform = 'none';
            playerCard.style.top = '30px';
        }
        
        // Garante que o overlay fique centralizado
        if (overlay) {
            overlay.style.marginTop = '0';
        }
    } else {
        // No mobile, volta ao layout original
        if (playerCard) {
            playerCard.style.left = '50%';
            playerCard.style.transform = 'translateX(-50%)';
            playerCard.style.top = '20px';
        }
        
        if (overlay) {
            overlay.style.marginTop = '140px';
        }
    }
}

// Executa quando a página carrega e quando redimensiona
window.addEventListener('load', ajustarLayoutDesktop);
window.addEventListener('resize', ajustarLayoutDesktop);