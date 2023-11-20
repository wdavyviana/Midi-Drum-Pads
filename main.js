function tocaSom (seletorAudio) {
   const elemento = document.querySelector(seletorAudio);

    if(elemento != null && elemento.localName === 'audio'){
        elemento.play();

    }
    else{
        console.log('Elemento não encontrado ou seletor invalido.')
    }

}
const listaDeTeclas = document.querySelectorAll('.tecla');


for (let contador = 0; contador < listaDeTeclas.length; contador++){ //while = enquanto , estou criando um laço para me dizer todas as teclas -------------

    const tecla = listaDeTeclas[contador]//me fala qual é o numero da tecla na lista -----------------------------------------
    const instrumento = tecla.classList[1]// me fala qual o instrumento/som da tecla -----------------------------------------
    const idAudio =`#som_${instrumento}`; //template string

    tecla.onclick = function(){
        tocaSom(idAudio);
    }

    tecla.onkeydown = function(evento){// Quando ele aperta a tecla ele adciona class ".ativa" do css
        
        if(evento.code === 'Space'|| evento.code === 'Enter'){

            tecla.classList.add('ativa');
        }
        
        
    }
    tecla.onkeyup = function(){
        tecla.classList.remove('ativa');// Quando o usuario solta o dedo da tecla ele remove a class ".ativa" do css
    }
}

