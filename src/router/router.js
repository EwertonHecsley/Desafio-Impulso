const { Router } = require('express');
const { cadastrarUsuario } = require('../controllers/controladores');
const { verificaEmailValido, intermediarioCadastrarUsuario } = require('../middlewares/intermediarios');
const rota = Router();

rota.post('/usuario', intermediarioCadastrarUsuario, verificaEmailValido, cadastrarUsuario)

module.exports = rota;