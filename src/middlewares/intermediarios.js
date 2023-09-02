const validador = require('email-validator');
const pool = require('../conexao')

const verificaEmailValido = (req, res, next) => {
    const { email } = req.body;

    if (!validador.validate(email)) {
        return res.status(400).json({ mensagem: 'Email inválido' });
    };

    next()
};

const intermediarioCadastrarUsuario = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensgem: 'Todos os campos devem ser preenchidos' })
    };

    try {
        const usuario = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

        if (usuario.rows.length > 0) {
            return res.status(401).json({ mensagem: 'Email já cadastrado' })
        };

        next()
    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
};

module.exports = { verificaEmailValido, intermediarioCadastrarUsuario }