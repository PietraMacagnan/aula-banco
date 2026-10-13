import { abrirBanco } from './banco.js';
const db = await abrirBanco();
const brinco = process.argv[2] || 'BR-003';
const novoPeso = Number(process.argv[3] || 410);
const sql = 'UPDATE animal SET peso_kg = ? WHERE brinco = ?';
const alterados = db.executar(sql, [novoPeso, brinco]);
console.log('Linhas alteradas:', alterados);
console.table(db.consultar('SELECT brinco, raca, peso_kg FROM animal'))