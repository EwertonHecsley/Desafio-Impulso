const validador = require('email-validator');

const verificaEmailValido = (email) => {
    return validador.validate(email);
};

module.exports = verificaEmailValido