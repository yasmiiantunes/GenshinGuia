function responderPergunta(estado, qid, correta) {
  if (estado.respondidas[qid]) {
    return estado;
  }

  estado.respondidas[qid] = true;

  if (correta) {
    estado.pontuacao++;
  }

  return estado;
}

function terminouQuiz(estado, total) {
  return Object.keys(estado.respondidas).length === total;
}

module.exports = {
  responderPergunta,
  terminouQuiz
};