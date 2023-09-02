const funcoesExtra = require('../utils/funcoesExtras');
const bcrypt = require('bcrypt');
const pool = require('../conexao')

const intermediarioLogin = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' })
    }

    if (!funcoesExtra(email)) {
        return res.status(400).json({ mensagem: 'Email inválido' })
    };

    try {
        const usuario = (await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]));

        if (usuario.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado, Email inválido' })
        }

        const senhaHash = usuario.rows[0].senha

        const verificaSenha = await bcrypt.compare(senha, senhaHash);

        if (!verificaSenha) {
            return res.status(404).json({ mensagem: 'Senha inválida' })
        };

        req.usuario = usuario.rows[0];

        next()

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }
};


module.exports = { intermediarioLogin }