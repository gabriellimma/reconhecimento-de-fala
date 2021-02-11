
const botaoComecaGravar = document.getElementById('botaoComecaGravar');
const botaoParaGravar = document.getElementById('botaoParaGravar');
const botaoLerTexto = document.getElementById('botaoLerTexto');  
const texto = document.getElementById('texto');

let reconhecimento = new webkitSpeechRecognition();

reconhecimento.lang = 'pt-BR'
reconhecimento.continuous = true;
reconhecimento.interimResults = false;

reconhecimento.onresult = (evento) => {
  const resultados = evento.results;
  const sentenca = resultados[resultados.length - 1][0].transcript;
  texto.value += sentenca;
} 

reconhecimento.onend = (evento) => {
  console.log('A gravação do microfone foi encerrada');
}

reconhecimento.onerror = (evento) => {
  console.log(evento.error)
}

botaoComecaGravar.addEventListener('click', () => {
  reconhecimento.start();
});

botaoParaGravar.addEventListener('click', () => {
  reconhecimento.abort();
});

botaoLerTexto.addEventListener('click', () => {
  lerTexto(texto.value);
});

function lerTexto(texto) {
  const leitura = new SpeechSynthesisUtterance();
  leitura.text = texto;
  leitura.volume = 1;
  leitura.rate = 1;
  leitura.pitch = 1;
  window.speechSynthesis.speak(leitura);
}