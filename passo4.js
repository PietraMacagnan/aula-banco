// PASSO 4 - Listar (SELECT): o banco devolve uma LISTA de OBJETOS
import { abrirBanco } from './banco.js';

const db = await abrirBanco();

const animais = db.consultar('SELECT * FROM animal');

console.log('Quantidade de animais:', animais.length);
console.table(animais);

for (const animal of animais) {
  console.log(animal.brinco, '-', animal.raca, '-', animal.peso_kg, 'kg');
}
