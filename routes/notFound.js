const { Router } = require('express');

const router = Router();

router.get('*', (req, res) => {
    res.status(501).json({
        ok: false,
        msj: 'Ruta no implementada.'
    });
});

module.exports = router;