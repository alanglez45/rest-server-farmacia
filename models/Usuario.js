const { DataTypes } = require("sequelize");
const db = require('../db/connection');
const Role = require("./Roles");

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "nombre es obligatorio" },
        }
    },
    apellido: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "apellido es obligatorio" },
        }
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "correo es obligatorio" },
        },
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "password es obligatorio" },
        }
    },
    estado: {
        // Apesar de haber seleccionado tinyint en la base de datos
        // sequelize lo tranforma en 0s y 1s
        type: DataTypes.BOOLEAN,
    },
}, { timestamps: false });

// timestamps, hace que nodejs no nos pida los columnas createdAt y updatedAt en la base de datos


/* Associations */
/* 
   Role es la tabla padre – Usuario es la tabla hijo
   La tabla usuario contiene la columna roleId que servirá donde la llave foránea es roles(id)
*/

Role.hasOne(Usuario, {
    foreignKey: 'roleId'
});
Usuario.belongsTo(Role);

// hasOne crea la llave foránea
// belongsTo crea la asociación entre las dos tablas


// Usuario.sync({ alter: true });

module.exports = Usuario;