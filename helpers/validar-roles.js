const Role = require("../models/Roles");


const restringir = (...rolesValidos) => {

    return async (req, res, next) => {
        if (!req.usuarioAutenticado) {
            return res.status(500).json({
                ok: false,
                msj: 'Verificación de rol sin token.'
            });
        }

        const { code } = req.usuarioAutenticado.Role;

        const rolValido = await Role.findOne({
            where: { code: code }
        });


        if (!rolesValidos.includes(rolValido.tipo)) {
            return res.status(500).json({
                ok: false,
                msj: 'No tiene permiso para realizar esta acción.'
            });
        }

        next();
    }
}

module.exports = {
    restringir
}