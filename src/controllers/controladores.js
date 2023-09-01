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

module.exports = {
    cadastrarUsuario
}