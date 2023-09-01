const { Pool } = require('pg');

const conexao = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'postgres',
    port: 5432,
    database: 'impulso'
});

module.exports = conexao;
