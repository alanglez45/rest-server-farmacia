const { DataTypes } = require("sequelize");
const db = require('../db/connection');

const Medicamento = db.define('Medicamento', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "nombre es obligatorio" },
        }
    },
    principioActivo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "formula es obligatorio" },
        }
    },
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "tipo es obligatorio" },
        },
    },
    unidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "unidad es obligatorio" },
        }
    },
    lugar: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "lugar es obligatorio" },
        }
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "nivel es obligatorio" },
        }
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "precio es obligatorio" },
        }
    }
}, { timestamps: false });

module.exports = Medicamento;