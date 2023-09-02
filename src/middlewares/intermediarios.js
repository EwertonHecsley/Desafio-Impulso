const pool = require('../conexao');
const funcaoVerificaEmail = require('../utils/funcoesExtras')

const verificaEmailValido = (req, res, next) => {
    const { email } = req.body;

    if (!funcaoVerificaEmail(email)) {
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

const intermediarioAtualizarUsuario = async (req, res, next) => {
    const corpo = Object.keys(req.body);
    const { id } = req.params;

    if (corpo.length === 0) {
        return res.status(400).json({ mensagem: 'Deve ser passado ao menos um campo para atualização' })
    }

    const camposPermitidos = ['nome', 'email', 'senha'];

    if (!corpo.every((elemento => camposPermitidos.includes(elemento)))) {
        return res.status(400).json({ mensagem: 'Permitido atualizar apenas os campos: nome,email e senha' })
    };

    try {
        const usuario = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);

        if (usuario.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Usuario não encontrado' });
        };

        const { ...usuarioEncontrado } = usuario.rows[0];

        req.usuario = usuarioEncontrado;

        next();

    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    };

}

module.exports = {
    verificaEmailValido,
    intermediarioCadastrarUsuario,
    intermediarioAtualizarUsuario
}