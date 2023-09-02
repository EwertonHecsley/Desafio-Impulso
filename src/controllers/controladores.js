const pool = require('../conexao');
const bcrypc = require('bcrypt');


const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaCriptografada = await bcrypc.hash(senha, 10);

        const usuario = await pool.query(`
        INSERT INTO usuarios(nome,email,senha)
        VALUES($1,$2,$3)
        RETURNING id,nome,email
        `, [nome, email, senhaCriptografada])

        return res.status(201).json(usuario.rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await pool.query(`SELECT id,nome,email,data_criacao FROM usuarios`);

        return res.status(200).json(usuarios.rows)
    } catch (error) {
        return res.status(500).json({ mesangem: error.message });
    }
}

module.exports = {
    cadastrarUsuario,
    listarUsuarios
}