const express = require('express');
const cors = require('cors');
const db = require('../db/connection');
const login = require('../routes/authRoutes');
const usuarios = require('../routes/usuariosRoutes');
const medicamentos = require('../routes/medicamentosRoutes');
const notFound = require('../routes/notFound');

class Server {
    constructor() {
        this.app = express();

        this.paths = {
            login: '/api/login',
            usuarios: '/api/usuarios',
            medicamentos: '/api/medicamentos',
            noEncontrada: '*'
        }
        this.port = process.env.PORT;

        this.dbconnection(); // Conectar base de datos
        this.middlewares();
        this.routes();
    }
    middlewares() {
        // CORS
        const whitelist = [process.env.NODE_ENV_FRONT_END_URL]; //http://localhost:5173/ http://127.0.0.1:5173/

        const corsOptions = {
            origin: function (origin, callback) {
                if (whitelist.includes(origin)) {
                    // Puede consultar la API
                    callback(null, true);
                } else {
                    // No está permitido
                    callback(new Error('Error de Cors'))
                }
            },
        };
        this.app.use(cors(corsOptions));

        // Template engine

        // Parsear body
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // this.app.use(express.static('public'));

    }
    async dbconnection() {
        try {
            await db.authenticate();
            console.log('Database online');
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    routes() {
        this.app.use(this.paths.login, login);
        this.app.use(this.paths.usuarios, usuarios);
        this.app.use(this.paths.medicamentos, medicamentos);
        this.app.use(this.paths.noEncontrada, notFound);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', process.env.PORT);
        })
    }
}


module.exports = Server;