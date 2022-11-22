const Usuario = require('../models/Usuario');
const Medicamento = require('../models/Medicamento');
const Role = require('../models/Roles');


const emailExiste = async (correo = '') => {
    // Verificar si el correo existe
    const existeCorreo = await Usuario.findOne({
        where: {
            correo: correo
        }
    });

    if (existeCorreo) {
        throw new Error(`Ya existe un usuario con el correo: ${correo}`);
    }
}
const noExisteEmail = async (correo = '') => {
    // Verificar si el correo existe
    const existeCorreo = await Usuario.findOne({
        where: {
            correo: correo
        }
    });

    if (!existeCorreo) {
        throw new Error(`No existe el usuario con el correo: ${correo}`);
    }
}

const existeUsuarioID = async (id) => {
    // Verificar si el usuario existe
    const existeID = await Usuario.findOne({
        where: {
            id: id
        }
    });

    if (!existeID) {
        throw new Error(`El ID: ${id}, no existe.`);
    }
}

//  Validaciones Medicamento
const existeMedicamentoID = async (id) => {
    // Verificar si el medicamento existe
    const existeID = await Medicamento.findOne({
        where: {
            id: id
        }
    });

    if (!existeID) {
        throw new Error(`No existe medicamento con el ID: ${id}.`);
    }
}

const validarRol = async (rol) => {

    const role = await Role.findOne({
        where: { tipo: rol }
    });
    if (!role) {
        throw new Error(`${rol}. No es un rol válido.`);
    } else {
        return true;
    }
}






module.exports = {
    emailExiste,
    noExisteEmail,
    existeUsuarioID,
    existeMedicamentoID,
    validarRol
}