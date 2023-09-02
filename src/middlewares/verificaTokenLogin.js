const jwt = require('jsonwebtoken');
const key = require('../key');
const pool = require('../conexao');

const verificaTokenLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' });
    };

    try {
        const token = authorization.split(' ')[1];

        const { id } = jwt.verify(token, key);

        const usuario = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);

        if (usuario.rows.length === 0) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado' });
        };

        const { nome, email } = usuario.rows[0];

        req.usuario = { id, nome, email };

        next();

    } catch (error) {
        if (error.message === 'invalid signature') {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado' });
        };

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ mensagem: 'Tempo excedido, faça login novamente' });
        };
    }
};

module.exports = { verificaTokenLogin }