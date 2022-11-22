const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/loginController');
const { noExisteEmail } = require('../helpers/db-validators');
const { validarCampos, validarPassword } = require('../helpers/validar-campos');

const router = Router();


router.post('/', [
    check('correo', 'El correo debe contener el caracter  @ y un dominio.').isEmail(),
    check('correo').custom(noExisteEmail),
    check('password').custom(validarPassword),
    validarCampos
], login);



module.exports = router;