const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

async function parseJwt(token) {
    try {

        const { uid, iat, exp } = jwt.verify(token, process.env.SECRETPRIVATEKEY);
        const usuarioAutenticado = await Usuario.findByPk(uid);

        const { nombre, apellido, correo, rol } = usuarioAutenticado;

        let administrador = false;
        if (rol === "ADMIN_ROLE") {
            administrador = true;
        }

        const nombreCompleto = `${nombre} ${apellido}`;

        return {
            nombre: nombreCompleto,
            correo,
            administrador
        }
    } catch (error) {
        return false;
    }


}
module.exports = {
    parseJwt
}