const { Router } = require('express');
const { cadastrarUsuario, listarUsuarios } = require('../controllers/controladores');
const { verificaEmailValido, intermediarioCadastrarUsuario } = require('../middlewares/intermediarios');
const { login } = require('../controllers/controladorLogin');
const { intermediarioLogin } = require('../middlewares/intermediarioLogin');
const { verificaTokenLogin } = require('../middlewares/verificaTokenLogin');

const rota = Router();

rota.post('/usuario', intermediarioCadastrarUsuario, verificaEmailValido, cadastrarUsuario);

rota.post('/login', intermediarioLogin, login);

rota.use(verificaTokenLogin)

rota.get('/usuario', listarUsuarios);

module.exports = rota;