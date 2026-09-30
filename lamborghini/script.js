/**
 * IMPORTANTE: os seletores aqui usam ".carousel-container article.slide"
 * (e não só ".slide") de propósito. Isso porque o carrossel hero (o de
 * vídeo/foto tela cheia) TAMBÉM usa a classe "slide" nas suas divs.
 * Se usássemos só ".slide" os dois carrosséis (o hero e o de modelos)
 * ficariam misturados e o script quebraria o carrossel hero.
 */

// Guarda o índice do slide de modelo atualmente exibido (começa em 0 = primeiro slide)
let currentModelSlide = 0;

// Busca todos os slides (article.slide) que estão dentro do carrossel de modelos,
// usando o seletor restrito para não pegar os slides do carrossel hero
function getModelSlides() {
  return document.querySelectorAll('.carousel-container article.slide');
}

// Busca todos os "dots" (bolinhas indicadoras) do carrossel de modelos
function getModelDots() {
  return document.querySelectorAll('.dots .dot');
}

// Sincroniza a tela com o valor de currentModelSlide:
// remove a classe "active" de todos os slides/dots e depois
// adiciona "active" apenas no slide e no dot correspondentes ao índice atual
function updateModelCarousel() {
  const articles = getModelSlides();
  const dotsList = getModelDots();

  // Passo 1: desativa todos os slides e dots
  articles.forEach((art, index) => {
    art.classList.remove('active');
    if (dotsList[index]) dotsList[index].classList.remove('active');
  });

  // Passo 2: ativa apenas o slide/dot do índice atual (com verificação de segurança)
  if (articles[currentModelSlide]) {
    articles[currentModelSlide].classList.add('active');
  }
  if (dotsList[currentModelSlide]) {
    dotsList[currentModelSlide].classList.add('active');
  }
}

// Avança para o próximo slide. O "% articles.length" faz o índice voltar
// para 0 automaticamente quando passa do último slide (efeito circular)
function nextSlide() {
  const articles = getModelSlides();
  if (!articles.length) return; // segurança: se não houver slides, não faz nada
  currentModelSlide = (currentModelSlide + 1) % articles.length;
  updateModelCarousel();
}

// Volta para o slide anterior. Somar "articles.length" antes do "%" evita
// que o índice fique negativo quando estamos no primeiro slide (efeito circular)
function prevSlide() {
  const articles = getModelSlides();
  if (!articles.length) return; // segurança: se não houver slides, não faz nada
  currentModelSlide = (currentModelSlide - 1 + articles.length) % articles.length;
  updateModelCarousel();
}

// Pula diretamente para um slide específico, chamado ao clicar em um dos dots
function setSlide(index) {
  currentModelSlide = index;
  updateModelCarousel();
}

/**
 * Alterna a imagem, a frase do slogan e o destaque das abas
 */
// Chamada pelos botões de aba (ex: "REVUELTO" / "REVUELTO SV") para trocar
// a foto do carro, o texto do slogan e marcar visualmente a aba clicada como ativa
function switchTab(btnClicked, imgId, newSrc, sloganId, newSloganText) {
  // Altera a imagem do carro, buscando o elemento pelo id recebido como parâmetro
  const carImg = document.getElementById(imgId);
  if (carImg) {
    carImg.src = newSrc;
  }

  // Altera o slogan, apenas se um id e um novo texto de slogan forem informados
  if (sloganId && newSloganText) {
    const sloganEl = document.getElementById(sloganId);
    if (sloganEl) {
      sloganEl.textContent = newSloganText;
    }
  }

  // Atualiza visualmente qual aba está ativa:
  // pega o elemento pai do botão clicado (o container das abas),
  // remove "active" de todas as abas irmãs e adiciona apenas no botão clicado
  const tabsContainer = btnClicked.parentElement;
  const tabs = tabsContainer.querySelectorAll('.tab-btn');
  tabs.forEach(tab => tab.classList.remove('active'));

  btnClicked.classList.add('active');
}