const corDeFundo = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const imagemDeFundo = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const musica = new Audio('sons/luna-rise-part-one.mp3');
musica.loop = true;
const comecar = new Audio('sons/play.wav');
const pausar = new Audio('sons/pause.mp3');
const terminar = new Audio('sons/beep.mp3');
const imagemPauseAndStart = document.querySelector('.app__card-primary-butto-icon');
const temporizador = document.querySelector('#timer');


let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused) {
            musica.play()
        } else {
            musica.pause()
        }
});


focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active');
    })
    corDeFundo.setAttribute('data-contexto', contexto);
    imagemDeFundo.setAttribute('src', `/imagens/${contexto}.png`)
    switch (contexto) {
        case 'foco': 
            titulo.innerHTML = ` Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong> `
            break;
        case 'descanso-curto': 
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case 'descanso-longo': 
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;
    };
};

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0){
        terminar.play();
        alert('Tempo finalizado!');
        const focoAtivo = corDeFundo.getAttribute('data-contexto') == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1
    mostrarTempo()
}

startPauseBt.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar() {
    if (intervaloId) {
        pausar.play()
        zerar();
        return;
    }
    comecar.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    imagemPauseAndStart.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
    iniciarOuPausarBt.textContent = 'Começar';
    imagemPauseAndStart.setAttribute('src', './imagens/play_arrow.png');
}

function mostrarTempo() {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();

