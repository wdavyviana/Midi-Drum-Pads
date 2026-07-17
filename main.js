// Toca o som correspondente ao seletor de áudio informado.
// Reinicia o áudio (currentTime = 0) para permitir retrigger rápido,
// e trata a Promise retornada por play() (pode ser rejeitada por
// políticas de autoplay do navegador).
function tocaSom(seletorAudio) {
    const elemento = document.querySelector(seletorAudio);
 
    if (elemento != null && elemento.localName === 'audio') {
        elemento.currentTime = 0;
        elemento.play().catch(erro => {
            console.log('Erro ao tocar áudio:', erro);
        });
    } else {
        console.log('Elemento não encontrado ou seletor inválido.');
    }
}
 
const listaDeTeclas = document.querySelectorAll('.tecla');
 
// Percorre todas as teclas para configurar clique e toque via mouse/touch.
for (let contador = 0; contador < listaDeTeclas.length; contador++) {
    const tecla = listaDeTeclas[contador];
 
    // Usa data-instrumento em vez de depender da ordem das classes CSS.
    // Ex: <button class="tecla" data-instrumento="pom"></button>
    const instrumento = tecla.dataset.instrumento;
    const idAudio = `#som_${instrumento}`;
 
    tecla.addEventListener('click', () => {
        tocaSom(idAudio);
    });
 
    tecla.addEventListener('keydown', (evento) => {
        // Quando o usuário aperta Espaço ou Enter com a tecla focada,
        // adiciona a classe ".ativa" (feedback visual) e toca o som.
        if (evento.code === 'Space' || evento.code === 'Enter') {
            tecla.classList.add('ativa');
            tocaSom(idAudio);
        }
    });
 
    tecla.addEventListener('keyup', () => {
        tecla.classList.remove('ativa');
    });
}
 
// Listener global: permite tocar usando o teclado físico do computador
// (ex: Q, W, E...), sem precisar dar Tab até o botão para ele ganhar foco.
// Cada tecla precisa de um atributo data-key correspondente ao evento.code,
// por exemplo: <button class="tecla" data-instrumento="pom" data-key="KeyQ"></button>
document.addEventListener('keydown', (evento) => {
    const teclaFisica = document.querySelector(`[data-key="${evento.code}"]`);
 
    if (teclaFisica != null) {
        const instrumento = teclaFisica.dataset.instrumento;
        tocaSom(`#som_${instrumento}`);
 
        teclaFisica.classList.add('ativa');
    }
});
 
document.addEventListener('keyup', (evento) => {
    const teclaFisica = document.querySelector(`[data-key="${evento.code}"]`);
 
    if (teclaFisica != null) {
        teclaFisica.classList.remove('ativa');
    }
});
 

