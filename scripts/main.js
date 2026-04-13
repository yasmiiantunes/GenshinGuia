import { responderPergunta, terminouQuiz } from './quizlogic.js';

let currentTab = 0;
const totalTabs = 5;

function goTab(n) {
  document.querySelectorAll('.section').forEach((s, i) => {
    s.classList.toggle('active', i === n);
  });

  document.querySelectorAll('.tab-btn').forEach((b, i) => {
    b.classList.toggle('active', i === n);
  });

  currentTab = n;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

let estado = {
  respondidas: {},
  pontuacao: 0
};

function answer(btn, qid, correct) {
  estado = responderPergunta(estado, qid, correct);

  const opts = btn.closest('.quiz-options').querySelectorAll('.quiz-opt');
  opts.forEach(o => o.disabled = true);

  btn.classList.add(correct ? 'correct' : 'wrong');

  if (!correct) {
    opts.forEach(o => {
      if (o.onclick.toString().includes('true')) {
        o.classList.add('correct');
      }
    });
  }

  const fb = document.getElementById('fb' + qid.replace('q',''));
  if (fb) fb.classList.add('show');

  if (terminouQuiz(estado, 4)) {
    setTimeout(() => {
      document.getElementById('quizResult').style.display = 'block';
    }, 600);
  }
}
module.exports = {
  goTab,
  showReaction,
  answer
};