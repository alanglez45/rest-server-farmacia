const { response, request } = require('express');
const { validationResult } = require('express-validator');



const validarCampos = (req = request, res = response, next) => {
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        res.status(400).json({
            ok: false,
            errors
        });
        return;
    }

    next();
}

const validarNombre = (nombre) => {
    const regexpNombre = /^([A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    if (!regexpNombre.test(nombre)) {
        throw new Error(`Los nombres propios inician con mayúscula: ${nombre}`);
    } else {
        return true;
    }
}

const validarPassword = (pass) => {
    const er = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

    if (!er.test(pass)) {
        throw new Error(`Incluya al menos una mayúscula, una minúscula, un número y una extensión de 8 caracteres: ${pass}`);
    } else {
        return true;
    }
}



module.exports = {
    validarCampos,
    validarNombre,
    validarPassword,
}