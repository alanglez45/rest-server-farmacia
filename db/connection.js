const { Sequelize } = require('sequelize');

// Nombre de la base de datos, nombre de usuario, contraseña
/* const db = new Sequelize('farmacia', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
}); */
const db = new Sequelize(`${process.env.DB_NAME}`, `${process.env.DB_USER}`, `${process.env.DB_PASSWORD}`, {
    host: `${process.env.DB_HOST}`,
    dialect: 'mysql',
    port: `${process.env.DB_PORT}`
});

module.exports = db;