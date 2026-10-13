import { abrirBanco } from './banco.js';
const db = await abrirBanco();
const brinco = process.argv[2] || 'BR-002';
const sql = 'DELETE FROM animal WHERE brinco = ?';
const excluidos = db.executar(sql, [brinco]);
if (excluidos === 0) {
console.log('Nenhum animal com o brinco ' + brinco);
} else {
console.log('Animal excluído: ' + brinco);
}
console.table(db.consultar('SELECT brinco, raca, status FROM animal'))