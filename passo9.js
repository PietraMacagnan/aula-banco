// ============================================================
//  PASSO 9 - O servidor da aula de TERÇA com o banco da aula de SEXTA
//  É o mesmo servidor de talhões de Programação Web (passo8.js de terça).
//  Mudou só uma coisa: a lista "talhoes" virou a tabela talhao do banco.
//  Para rodar:  node passo9.js      Para desligar:  Ctrl+C
// ============================================================
import express from 'express';
import { abrirBanco } from './banco.js';

const db = await abrirBanco();          // abre o banco (arquivo fazenda.db)
const app = express();                  // cria o servidor
app.use(express.urlencoded({ extended: true }));  // deixa o servidor ler formulários

// a tabela de talhões (antes era uma lista na memória)
db.executar(`
  CREATE TABLE IF NOT EXISTS talhao (
    id      INTEGER PRIMARY KEY AUTOINCREMENT,
    nome    TEXT NOT NULL,
    cultura TEXT NOT NULL,
    area    REAL CHECK (area > 0)
  )
`);

// carga inicial: os mesmos 3 talhões de terça, só se a tabela estiver vazia
if (db.consultar('SELECT * FROM talhao').length === 0) {
  const sql = 'INSERT INTO talhao (nome, cultura, area) VALUES (?, ?, ?)';
  db.executar(sql, ['Talhão 1', 'soja', 120]);
  db.executar(sql, ['Talhão 2', 'milho', 80]);
  db.executar(sql, ['Talhão 3', 'soja', 95]);
}

// ROTA 3: devolve a lista de talhões em JSON
//         /talhoes               -> todos
//         /talhoes?cultura=soja  -> só os de soja
app.get('/talhoes', (req, res) => {
  const cultura = req.query.cultura;
  if (cultura) {
    const filtrados = db.consultar('SELECT * FROM talhao WHERE cultura = ?', [cultura]);
    return res.json(filtrados);
  }
  res.json(db.consultar('SELECT * FROM talhao'));
});

// ROTA 4: devolve UM talhão pelo id   ->  /talhoes/2
app.get('/talhoes/:id', (req, res) => {
  const id = Number(req.params.id);
  const lista = db.consultar('SELECT * FROM talhao WHERE id = ?', [id]);
  if (lista.length === 0) {
    return res.status(404).send('Talhão não encontrado.');
  }
  res.json(lista[0]);
});

// ROTA 5: GET /cadastro  -> mostra o formulário
app.get('/cadastro', (req, res) => {
  res.send(`<form method="post" action="/cadastro">
    Nome: <input name="nome"> Cultura: <input name="cultura">
    Área: <input name="area" type="number"> <button>Salvar</button>
  </form>`);
});

// ROTA 6: POST /cadastro -> recebe o formulário e GRAVA NO BANCO
app.post('/cadastro', (req, res) => {
  const sql = 'INSERT INTO talhao (nome, cultura, area) VALUES (?, ?, ?)';
  const gravou = db.executar(sql, [req.body.nome, req.body.cultura, Number(req.body.area)]);
  if (gravou === 0) {
    return res.status(400).send('O banco recusou o cadastro. Confira os campos.');
  }
  res.send('Talhão cadastrado: ' + req.body.nome);
});

// SEMPRE POR ÚLTIMO: nenhuma rota combinou -> 404
app.use((req, res) => {
  res.status(404).send('Página não encontrada: ' + req.url);
});

app.listen(3000, () => {
  console.log('Servidor ligado: abra http://localhost:3000/talhoes');
});
