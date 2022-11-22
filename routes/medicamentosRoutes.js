const { Router } = require('express');
const { check } = require('express-validator');
const { existeMedicamentoID } = require('../helpers/db-validators');
const { medicamentosGet, medicamentosPost, medicamentosPut, medicamentosDelete, busqueda } = require('../controllers/medicamentosController');
const { validarCampos } = require('../helpers/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt');
const permiso = require('../helpers/validar-roles');

const router = Router();


router.get('/all', medicamentosGet);

router.get('/', busqueda);

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('principioActivo', 'El principio activo es obligatorio.').not().isEmpty(),
    check('tipo', 'El tipo es obligatorio.').not().isEmpty(),
    check('unidad', 'La unidad es obligatoria.').not().isEmpty(),
    check('lugar', 'El lugar es obligatorio.').not().isEmpty(),
    check('nivel', 'El nivel es obligatorio.').not().isEmpty(),
    check('precio', 'El precio es obligatorio.').not().isEmpty(),
    check('precio', 'Solamente se aceptan números.').isNumeric(),
    validarCampos,
    permiso.restringir('ADMIN_ROLE', 'USER_ROLE')
], medicamentosPost);


router.put('/:id', [
    validarJWT,
    check('id').custom(existeMedicamentoID),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('principioActivo', 'El principio activo es obligatorio.').optional().not().isEmpty(),
    check('tipo', 'El tipo es obligatorio.').optional().not().isEmpty(),
    check('unidad', 'La unidad es obligatoria.').optional().not().isEmpty(),
    check('lugar', 'El lugar es obligatorio.').optional().not().isEmpty(),
    check('nivel', 'El nivel es obligatorio.').optional().not().isEmpty(),
    check('precio', 'El precio es obligatorio.').optional().not().isEmpty(),
    check('precio', 'Solamente se aceptan números.').optional().isNumeric(),
    validarCampos,
    permiso.restringir('ADMIN_ROLE', 'USER_ROLE')
], medicamentosPut);

router.delete('/:id', [
    validarJWT,
    check('id').custom(existeMedicamentoID),
    validarCampos,
    permiso.restringir('ADMIN_ROLE', 'USER_ROLE')
], medicamentosDelete);



module.exports = router;