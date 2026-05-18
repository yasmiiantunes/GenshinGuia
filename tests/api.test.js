const { loadCharacter } = require('../scripts/main');

beforeEach(() => {
  fetch.resetMocks();
});

test('deve carregar personagem da API', async () => {

  document.body.innerHTML = `
    <div id="characterCard"></div>
  `;

  fetch.mockResponseOnce(JSON.stringify({
    name: 'Diluc',
    vision: 'Pyro',
    weapon: 'Claymore',
    nation: 'Mondstadt'
  }));

  await loadCharacter();

  expect(
    document.getElementById('characterCard').innerHTML
  ).toContain('Diluc');

});