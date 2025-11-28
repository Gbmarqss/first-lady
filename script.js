const imagensCapa = [ 'img/capa1.jpg', 'img/capa2.jpg', 'img/capa3.jpg' ];
let indiceAtual = 0;
const heroElement = document.getElementById('hero-carousel');

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

    let texto = `${anos} Ano${anos !== 1 ? 's' : ''}, ${meses} Mês${meses !== 1 ? 'es' : ''}, ${dias} Dia${dias !== 1 ? 's' : ''}, ${h} Horas, ${m} Minutos e ${s} Segundos`;

    const contadorElement = document.getElementById('contador');
    if (contadorElement) contadorElement.innerText = texto;
}
setInterval(atualizarContador, 1000);
atualizarContador();

function trocarImagemFundo() {
    if (!heroElement) return;
    indiceAtual = (indiceAtual + 1) % imagensCapa.length;
    heroElement.style.backgroundImage = `url('${imagensCapa[indiceAtual]}')`;
}
setInterval(trocarImagemFundo, 5000);

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
    });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

const audio = document.getElementById('bg-music');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
let isPlaying = false;

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
    } else {
        audio.play();
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
    }
    isPlaying = !isPlaying;
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
});