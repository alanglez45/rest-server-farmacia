const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');
const Role = require('../models/Roles');

const login = async (req = request, res = response) => {
    const { correo, password } = req.body;
    try {
        // Verificar si el email existe
        const usuario = await Usuario.findOne({
            where: { correo: correo },
            attributes: { exclude: ['roleId', 'RoleId'] },
            include: [{
                model: Role,
                attributes: ['code'],
            }]
        });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msj: 'El usuario o la contraseña no son correctos.'
            });
        }

        // Verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(400).json({
                ok: false,
                msj: 'Contraseña incorrecta.'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        delete usuario.dataValues.password;

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msj: 'Algo salió mal'
        });
    }
}



module.exports = {
    login,
}