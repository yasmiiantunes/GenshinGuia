let responderPergunta;
let terminouQuiz;

// =========================
// IMPORTAÇÃO PARA TESTES (NODE/JEST)
// =========================

if (typeof require !== 'undefined') {

  const quizLogic = require('./quizlogic');

  responderPergunta = quizLogic.responderPergunta;
  terminouQuiz = quizLogic.terminouQuiz;

}

// =========================
// IMPORTAÇÃO PARA NAVEGADOR
// =========================

if (typeof window !== 'undefined') {

  responderPergunta = window.responderPergunta;
  terminouQuiz = window.terminouQuiz;

}

let currentTab = 0;
const totalTabs = 5;

// =========================
// NAVEGAÇÃO ENTRE ABAS
// =========================

function goTab(n) {

  document.querySelectorAll('.section').forEach((s, i) => {
    s.classList.toggle('active', i === n);
  });

  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', i === n);
  });

  currentTab = n;

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });

}

// =========================
// REAÇÕES ELEMENTAIS
// =========================

const reactions = {

  anemo: {
    emoji: '🌀',
    text: '<strong>Anemo</strong> cria Swirl.'
  },

  geo: {
    emoji: '🪨',
    text: '<strong>Geo</strong> cria Crystallize.'
  },

  electro: {
    emoji: '⚡',
    text: '<strong>Electro</strong> reage com Hydro, Pyro, Cryo e Dendro.'
  },

  hydro: {
    emoji: '💧',
    text: '<strong>Hydro</strong> cria Vaporize, Frozen e Bloom.'
  },

  pyro: {
    emoji: '🔥',
    text: '<strong>Pyro</strong> cria Melt e Vaporize.'
  },

  cryo: {
    emoji: '❄️',
    text: '<strong>Cryo</strong> cria Frozen e Melt.'
  },

  dendro: {
    emoji: '🌿',
    text: '<strong>Dendro</strong> cria Bloom e Quicken.'
  }

};

function showReaction(el, elem) {

  document.querySelectorAll('.element-badge')
    .forEach(b => b.classList.remove('selected'));

  elem.classList.add('selected');

  const r = reactions[el];

  document.getElementById('reactionInfo').innerHTML = `
    <span class="r-emoji">${r.emoji}</span>
    <p>${r.text}</p>
  `;

}

// =========================
// QUIZ
// =========================

let estado = {
  respondidas: {},
  pontuacao: 0
};

function answer(btn, qid, correct) {

  estado = responderPergunta(
    estado,
    qid,
    correct
  );

  const opts = btn.closest('.quiz-options')
    .querySelectorAll('.quiz-opt');

  opts.forEach(o => o.disabled = true);

  btn.classList.add(
    correct ? 'correct' : 'wrong'
  );

  if (!correct) {

    opts.forEach(o => {

      if (
        o.onclick &&
        o.onclick.toString().includes('true')
      ) {
        o.classList.add('correct');
      }

    });

  }

  const fb = document.getElementById(
    'fb' + qid.replace('q', '')
  );

  if (fb) {
    fb.classList.add('show');
  }

  if (terminouQuiz(estado, 4)) {

    setTimeout(() => {

      document.getElementById(
        'quizResult'
      ).style.display = 'block';

    }, 600);

  }

}

// =========================
// API GENSHIN
// =========================

async function loadCharacter() {

  const card =
    document.getElementById("characterCard");

  if (!card) return;

  const characters = [
    "diluc",
    "venti",
    "raiden-shogun",
    "nahida",
    "furina",
    "xiao"
  ];

  const random =
    characters[
      Math.floor(Math.random() * characters.length)
    ];

  try {

    card.innerHTML = `
      <p>Carregando personagem...</p>
    `;

    const response = await fetch(
      `https://genshin.dev/characters/${random}`
    );

    if (!response.ok) {
      throw new Error('Erro na API');
    }

    const data = await response.json();

    card.innerHTML = `
      <h3>${data.name}</h3>

      <p>
        <strong>Elemento:</strong>
        ${data.vision}
      </p>

      <p>
        <strong>Arma:</strong>
        ${data.weapon}
      </p>

      <p>
        <strong>Nação:</strong>
        ${data.nation}
      </p>

      <img
        src="https://genshin.dev/characters/${random}/icon"
        width="120"
      >
    `;

    return data;

  } catch (error) {

    console.error(error);

    card.innerHTML = `
      <p>Erro ao carregar personagem.</p>
    `;

    return null;

  }

}

// =========================
// EXECUTA NO NAVEGADOR
// =========================

if (typeof window !== 'undefined') {

  window.goTab = goTab;
  window.showReaction = showReaction;
  window.answer = answer;
  window.loadCharacter = loadCharacter;

  loadCharacter();

}

// =========================
// EXPORTS PARA TESTES
// =========================

if (typeof module !== 'undefined') {

  module.exports = {
    goTab,
    showReaction,
    answer,
    loadCharacter
  };

}