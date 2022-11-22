const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, } = require('../controllers/usuariosController');
const { emailExiste, existeUsuarioID, validarRol } = require('../helpers/db-validators');
const { validarCampos, validarPassword, validarNombre } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');
const permiso = require('../helpers/validar-roles');

const router = Router();

router.use(validarJWT, permiso.restringir('ADMIN_ROLE'));


router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('nombre').custom(validarNombre),
    check('apellido', 'El apellido es obligatorio.').not().isEmpty(),
    check('apellido').custom(validarNombre),
    check('correo', 'El correo debe tener el caracter @ y un dominio.').isEmail(),
    check('correo').custom(emailExiste),
    check('password').custom(validarPassword),
    check('rol', 'El rol es obligatorio.').not().isEmpty(),
    check('rol').custom(validarRol),
    validarCampos
], usuariosPost);


router.put('/:id', [
    check('id').custom(existeUsuarioID),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id').custom(existeUsuarioID),
], usuariosDelete);



module.exports = router;