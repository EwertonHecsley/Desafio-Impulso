const jwt = require('jsonwebtoken');
const key = require('../key')

const login = (req, res) => {
    const { id, nome, email } = req.usuario;

    const token = jwt.sign({ id, nome, email }, key, { expiresIn: '1h' });

    const resposta = {
        mensagem: 'Usuário logado',
        usuario: { id, nome, email },
        token
    };

    return res.status(200).json(resposta)
};

module.exports = {
    login
}