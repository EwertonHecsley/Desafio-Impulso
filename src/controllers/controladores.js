const pool = require('../conexao');
const bcrypc = require('bcrypt');
const funcoesExtras = require('../utils/funcoesExtras');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const senhaCriptografada = await bcrypc.hash(senha, 10);

        const usuario = await pool.query(`
        INSERT INTO usuarios(nome,email,senha)
        VALUES($1,$2,$3)
        RETURNING id,nome,email
        `, [nome, email, senhaCriptografada])

        return res.status(201).json(usuario.rows[0])

    } catch (error) {
        return res.status(500).json({ mensagem: error.message })
    }

};

const listarUsuarios = async (req, res) => {
    try {
        const usuarios = await pool.query(`SELECT id,nome,email,data_criacao FROM usuarios`);

        return res.status(200).json(usuarios.rows)
    } catch (error) {
        return res.status(500).json({ mesangem: error.message });
    }
};

const atualizarUsuario = async (req, res) => {
    const { id } = req.usuario;
    const { nome, email, senha } = req.body;

    const camposAtualizacao = {};
    const valores = [];
    let index = 1;

    if (nome !== undefined) {
        camposAtualizacao.nome = nome;
        valores.push(nome);
    };

    if (email !== undefined) {
        if (!funcoesExtras(email)) {
            return res.status(400).json({ mensagem: 'Email inválido para atualização' });
        };

        const usuarioEmail = await pool.query(`SELECT email FROM usuarios WHERE email = $1`, [email]);

        if (usuarioEmail.rows.length > 0) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        };

        camposAtualizacao.email = email;
        valores.push(email);
    };

    if (senha !== undefined) {
        const senhaHashed = await bcrypc.hash(senha, 10);
        camposAtualizacao.senha = senhaHashed;
        valores.push(senhaHashed);
    };

    const sets = Object.keys(camposAtualizacao).map((campo) => `"${campo}" = $${index++}`).join(', ');

    try {
        const query = `
        UPDATE usuarios
        SET ${sets}
        WHERE id = $${index++}
        RETURNING id, nome, email
        `;

        valores.push(id);

        const usuarioAtualizado = await pool.query(query, valores);

        return res.status(200).json({ mensagem: 'Usuário Atualizado', usuario: usuarioAtualizado.rows[0] });
    } catch (error) {
        return res.status(500).json({ mensagem: error.message });
    }
};


module.exports = {
    cadastrarUsuario,
    listarUsuarios,
    atualizarUsuario
}