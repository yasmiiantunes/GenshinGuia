const { responderPergunta, terminouQuiz } = require('../scripts/quizlogic');

test('Deve marcar pergunta como respondida', () => {
  let estado = { respondidas: {}, pontuacao: 0 };

  estado = responderPergunta(estado, 'q1', true);

  expect(estado.respondidas['q1']).toBe(true);
});

test('Deve somar pontuação se correta', () => {
  let estado = { respondidas: {}, pontuacao: 0 };

  estado = responderPergunta(estado, 'q1', true);

  expect(estado.pontuacao).toBe(1);
});

test('Não deve contar resposta duplicada', () => {
  let estado = { respondidas: {}, pontuacao: 0 };

  estado = responderPergunta(estado, 'q1', true);
  estado = responderPergunta(estado, 'q1', true);

  expect(estado.pontuacao).toBe(1);
});

test('Deve detectar fim do quiz', () => {
  let estado = {
    respondidas: { q1: true, q2: true, q3: true, q4: true },
    pontuacao: 4
  };

  expect(terminouQuiz(estado, 4)).toBe(true);
});