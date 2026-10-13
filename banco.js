// banco.js - a "ponte" entre o JavaScript e o banco de dados (SQLite).
// Hoje você NÃO precisa mexer neste arquivo. Nos passos você só usa:
//   abrirBanco()                -> abre o arquivo fazenda.db
//   db.executar(sql, valores)   -> CREATE, INSERT, UPDATE, DELETE (devolve quantas linhas mudaram)
//   db.consultar(sql, valores)  -> SELECT (devolve uma lista de objetos)
import fs from 'node:fs';
import initSqlJs from 'sql.js';

const ARQUIVO = 'fazenda.db';

function traduzir(msg) {
  if (msg.includes('UNIQUE constraint failed')) return 'valor repetido em campo UNIQUE (' + msg.split(': ')[1] + ')';
  if (msg.includes('NOT NULL constraint failed')) return 'campo obrigatório vazio, NOT NULL (' + msg.split(': ')[1] + ')';
  if (msg.includes('CHECK constraint failed')) return 'o valor não passou na regra CHECK (' + msg.split(': ')[1] + ')';
  if (msg.includes('no such table')) return 'a tabela não existe (' + msg.split(': ')[1] + '). Rodou o passo 2?';
  if (msg.includes('no such column')) return 'a coluna não existe (' + msg.split(': ')[1] + '). Confira o nome.';
  if (msg.includes('syntax error')) return 'erro de digitação no SQL: ' + msg;
  return msg;
}

export async function abrirBanco() {
  const SQL = await initSqlJs();
  const existe = fs.existsSync(ARQUIVO);
  const db = existe ? new SQL.Database(fs.readFileSync(ARQUIVO)) : new SQL.Database();
  if (!existe) fs.writeFileSync(ARQUIVO, Buffer.from(db.export()));

  return {
    executar(sql, valores = []) {
      try {
        db.run(sql, valores);
        const linhas = db.getRowsModified();
        fs.writeFileSync(ARQUIVO, Buffer.from(db.export()));
        return linhas;
      } catch (erro) {
        console.log('ERRO - o banco recusou o comando: ' + traduzir(erro.message));
        return 0;
      }
    },

    consultar(sql, valores = []) {
      try {
        const comando = db.prepare(sql);
        comando.bind(valores);
        const linhas = [];
        while (comando.step()) linhas.push(comando.getAsObject());
        comando.free();
        return linhas;
      } catch (erro) {
        console.log('ERRO - o banco recusou a consulta: ' + traduzir(erro.message));
        return [];
      }
    },
  };
}
