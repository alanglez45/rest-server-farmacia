const { Sequelize } = require('sequelize');

// Nombre de la base de datos, nombre de usuario, contraseña
/* const db = new Sequelize('farmacia', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
}); */
const db = new Sequelize(`${process.env.NODE_ENV_DB_NAME}`, `${process.env.NODE_ENV_DB_USER}`, `${process.env.NODE_ENV_DB_PASSWORD}`, {
    host: `${process.env.NODE_ENV_DB_HOST}`,
    dialect: 'mysql',
    port: `${process.env.NODE_ENV_DB_PORT}`
});

module.exports = db;