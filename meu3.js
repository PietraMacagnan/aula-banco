import { abrirBanco } from './banco.js';
const db = await abrirBanco();
const sql = `INSERT INTO animal (brinco, raca, peso_kg, pasto)
VALUES (?, ?, ?, ?)`;
let total = 0;
total = total + db.executar(sql, ['BR-001', 'Nelore', 450, 'Pasto 1']);
total = total + db.executar(sql, ['BR-002', 'Angus', 520, 'Pasto 2']);
total = total + db.executar(sql, ['BR-003', 'Nelore', 380, 'Pasto 1']);
total = total + db.executar(sql, ['BR-004', 'Brahman', 600, 'Pasto 3']);
console.log('Animais cadastrados agora:', total)