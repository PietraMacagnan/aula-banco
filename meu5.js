import { abrirBanco } from './banco.js';
const db = await abrirBanco();
const raca = process.argv[2] || 'Nelore';
const sql = 'SELECT brinco, raca, peso_kg FROM animal WHERE raca = ?';
const animais = db.consultar(sql, [raca]);
console.log('Raça pesquisada:', raca);
console.table(animais);