const { Router } = require('express');
const { cadastrarUsuario, listarUsuarios, atualizarUsuario } = require('../controllers/controladores');
const { verificaEmailValido, intermediarioCadastrarUsuario, intermediarioAtualizarUsuario } = require('../middlewares/intermediarios');
const { login } = require('../controllers/controladorLogin');
const { intermediarioLogin } = require('../middlewares/intermediarioLogin');
const { verificaTokenLogin } = require('../middlewares/verificaTokenLogin');

const rota = Router();

rota.post('/usuario', intermediarioCadastrarUsuario, verificaEmailValido, cadastrarUsuario);

rota.post('/login', intermediarioLogin, login);

rota.use(verificaTokenLogin)

rota.get('/usuario', listarUsuarios);
rota.put('/usuario/:id', intermediarioAtualizarUsuario, atualizarUsuario)

module.exports = rota;