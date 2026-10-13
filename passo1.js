// PASSO 1 - Abrir (conectar) o banco de dados
import { abrirBanco } from './banco.js';

const db = await abrirBanco();

console.log('Banco aberto! Olhe a pasta: apareceu o arquivo fazenda.db');
