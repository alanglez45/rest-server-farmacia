const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const Role = require('../models/Roles');

const usuariosGet = async (req, res = response) => {
    /* const usuarios = await Usuario.findAll(
        {
            // where: { estado: true }
            attributes: ['id', 'nombre', 'apellido', 'correo', 'rol']
        }
    ); */

    const usuarios = await Usuario.findAll({
        attributes: { exclude: ['password', 'roleId', 'RoleId'] },
        include: [{
            model: Role,
            attributes: ['code'],
        }]
    });

    // include nos trae la información de la asociación. Para saber más buscar eager loading en la documentación de sequelize

    res.status(200).json({
        ok: true,
        usuarios
    });
}
const usuariosPost = async (req, res = response) => {
    const { password, rol } = req.body;
    const { body } = req;

    const role = await Role.findOne({
        where: { tipo: rol }
    });
    // const usuario = await Usuario.create(resto);

    const usuario = new Usuario(body);
    usuario.roleId = role.id;


    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); // por defecto da 10 vueltas de encriptacion
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB
    await usuario.save();

    delete usuario.dataValues.password;
    delete usuario.dataValues.roleId;

    const code = role.code;
    usuario.dataValues.Role = {};
    usuario.dataValues.Role.code = code;

    res.status(200).json({
        ok: true,
        msj: 'Usuario agregado con éxito.',
        usuario
    });
}

const usuariosPut = async (req, res = response) => {
    const id = req.params.id
    const { password, rol, ...resto } = req.body;

    const role = await Role.findOne({
        where: { tipo: rol }
    });

    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); // por defecto da 10 vueltas de encriptacion
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByPk(id);
    // const usuario = await Usuario.findByIdAndUpdate(id, resto);
    // usuario.roleId = role.id;
    resto.roleId = role.id;

    await usuario.update(resto);

    delete usuario.dataValues.password;
    delete usuario.dataValues.roleId;
    delete usuario.dataValues.RoleId;
    const code = role.code;
    usuario.dataValues.Role = {};
    usuario.dataValues.Role.code = code;

    res.status(200).json({
        ok: true,
        msj: 'Usuario modificado con éxito.',
        usuario
    });

}

const usuariosDelete = async (req, res = response) => {
    const { usuarioAutenticado } = req;


    const { id } = req.params;

    //  usuario a eliminar
    const usuario = await Usuario.findByPk(id);

    if (usuarioAutenticado.id === parseInt(id)) {
        return res.status(503).json({
            ok: false,
            msj: 'Acción no válida, no se puede eliminar así mismo',
        });
    }
    await usuario.destroy(); // Elimina fisicamente

    // Eliminar logicamente  estado = false
    // await usuario.update({ estado: false });

    res.status(200).json({
        ok: true,
        msj: 'Usuario eliminado con éxito.',
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}