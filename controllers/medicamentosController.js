const { response, request } = require('express');
const Medicamento = require('../models/medicamento');
const { Op } = require("sequelize");


const medicamentosGet = async (req, res = response) => {
    try {
        const medicamentos = await Medicamento.findAll(
            {
                attributes: ['id', 'nombre', 'principioActivo', 'tipo', 'unidad', 'lugar', 'nivel', 'precio']
            }
        );

        if (medicamentos.length < 1) {
            return res.status(404).json({
                ok: false,
                msj: 'No hay resultados'
            });
        }

        res.status(200).json({
            ok: true,
            medicamentos
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: error.message
        });
    }
}
const busqueda = async (req, res = response) => {
    const { input } = req.headers;
    let parametro = `%${input}%`

    try {

        const medicamentos = await Medicamento.findAll(
            {
                where: {

                    [Op.or]: {
                        nombre: {
                            [Op.like]: parametro
                        },
                        principioActivo: {
                            [Op.like]: parametro
                        }
                    }

                },
                attributes: ['id', 'nombre', 'principioActivo', 'tipo', 'unidad', 'lugar', 'nivel', 'precio']
            }
        );

        if (medicamentos.length < 1) {
            return res.status(404).json({
                ok: false,
                msj: 'No hay resultados. Intenta con otra búsqueda diferente.'
            });
        }


        res.status(200).json({
            ok: true,
            medicamentos
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: error.message
        });
    }
}

const medicamentosPost = async (req, res = response) => {
    /* const { nombre, formula, tipo, unidad, lugar, nivel, precio } = req.body;

    const parametros = {
        nombre,
        formula,
        tipo,
        unidad,
        lugar,
        nivel,
        precio
    } */

    const { body } = req;

    try {
        const medicamento = new Medicamento(body);

        // Guardar en DB
        await medicamento.save();

        res.status(200).json({
            ok: true,
            msj: 'Medicamento agregado con éxito.',
            medicamento
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: error.message
        });
    }

}

const medicamentosPut = async (req, res = response) => {
    const id = req.params.id
    const body = req.body;

    try {
        const medicamento = await Medicamento.findByPk(id);
        await medicamento.update(body);

        res.status(200).json({
            ok: true,
            msj: 'Medicamento actualizado con éxito.',
            medicamento
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: error.message
        });
    }
}

const medicamentosDelete = async (req, res = response) => {
    const { id } = req.params;

    try {
        const medicamento = await Medicamento.findByPk(id);
        await medicamento.destroy(); // Elimina fisicamente

        res.status(200).json({
            ok: true,
            msj: 'Medicamento eliminado con éxito.',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msj: error.message
        });
    }
}

module.exports = {
    medicamentosGet,
    busqueda,
    medicamentosPost,
    medicamentosPut,
    medicamentosDelete
}