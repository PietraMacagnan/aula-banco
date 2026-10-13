// PASSO 8 - Juntando com a aula de Web: o servidor busca os dados no banco
// Rode assim:  node passo8.js   e abra http://localhost:3000/animais   (Ctrl+C desliga)
import express from 'express';
import { abrirBanco } from './banco.js';

const db = await abrirBanco();
const app = express();

app.get('/animais', (req, res) => {
  const animais = db.consultar('SELECT * FROM animal');
  res.json(animais);
});

app.get('/animais/:brinco', (req, res) => {
  const sql = 'SELECT * FROM animal WHERE brinco = ?';
  const lista = db.consultar(sql, [req.params.brinco]);
  if (lista.length === 0) {
    return res.status(404).send('Animal não encontrado.');
  }
  res.json(lista[0]);
});

app.listen(3000, () => {
  console.log('Servidor ligado: abra http://localhost:3000/animais');
});
