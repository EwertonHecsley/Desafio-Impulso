const { Router } = require('express');
const { cadastrarUsuario } = require('../controllers/controladores');
const rota = Router();

rota.post('/usuario', cadastrarUsuario)

module.exports = rota;