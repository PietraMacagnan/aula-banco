// zerar.js - apaga o banco para começar tudo do zero
// Rode assim:  node zerar.js
import fs from 'node:fs';

if (fs.existsSync('fazenda.db')) {
  fs.rmSync('fazenda.db');
  console.log('Banco apagado. Comece de novo pelo passo 1.');
} else {
  console.log('Não havia banco para apagar.');
}
