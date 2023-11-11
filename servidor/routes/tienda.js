const express = require('express');
const router = express.Router();
const tiendaController = require('../controllers/tiendaController');

// Rutas para tiendas
router.post('/', tiendaController.crearTienda);
router.get('/', tiendaController.obtenerTiendas);
router.put('/:id', tiendaController.actualizarTienda);
router.get('/:id', tiendaController.verTienda);
router.delete('/:id', tiendaController.eliminarTienda);

module.exports = router;