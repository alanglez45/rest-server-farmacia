const { DataTypes } = require("sequelize");
const db = require('../db/connection');

const Role = db.define('Role', {
    tipo: {
        type: DataTypes.STRING,
    },
    code: {
        type: DataTypes.STRING,
    },

}, { timestamps: false });

module.exports = Role;