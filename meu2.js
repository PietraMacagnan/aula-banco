import { abrirBanco } from './banco.js';
const db = await abrirBanco();
db.executar(`
CREATE TABLE IF NOT EXISTS animal (
id   
   INTEGER PRIMARY KEY AUTOINCREMENT,
brinco  TEXT NOT NULL UNIQUE,
raca 
   TEXT NOT NULL,
peso_kg REAL CHECK (peso_kg > 0),
status  TEXT DEFAULT 'ATIVO',
pasto
   TEXT
)


`);
console.log('Tabela animal pronta.');