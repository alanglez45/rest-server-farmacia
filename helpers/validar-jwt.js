const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Role = require('../models/Roles');
const Usuario = require('../models/Usuario');


const validarJWT = async (req = request, res = response, next) => {
    let token;
    token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            ok: false,
            msj: 'No hay token en la petición'
        });
    }
    token = token.split(' ')[1];
    try {

        const { uid } = jwt.verify(token, process.env.SECRETPRIVATEKEY);

        // Leer el usuario que corresponde al uid
        const usuarioAutenticado = await Usuario.findByPk(uid, {
            attributes: { exclude: ['roleId', 'RoleId'] },
            include: [{
                model: Role,
                attributes: ['code'],
            }]
        });

        // Si usuario no existe
        if (!usuarioAutenticado) {
            return res.status(404).json({
                ok: false,
                msj: 'El usuario no existe en la base de datos'
            });
        }
        delete usuarioAutenticado.dataValues.roleId;
        delete usuarioAutenticado.dataValues.RoleId;
        delete usuarioAutenticado.dataValues.password;
        req.usuarioAutenticado = usuarioAutenticado;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msj: 'Token no válido. Vuelva a iniciar sesión'
        });
    }
}

module.exports = {
    validarJWT
}