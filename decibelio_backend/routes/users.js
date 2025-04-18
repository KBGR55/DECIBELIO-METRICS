var express = require('express');
var router = express.Router();
const { body } = require('express-validator');
const MetricController = require('../controls/MetricController.js');
const controller = new MetricController();

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// Validaciones
const metricValidation = [
    body('date').notEmpty().withMessage('La fecha es obligatoria'),
    body('time').notEmpty().withMessage('La hora es obligatoria'),
    body('value').isFloat().withMessage('El valor debe ser numérico')
];

// Rutas
router.post('/metric', metricValidation, (req, res) => controller.keep(req, res));
router.get('/metric', (req, res) => controller.list(req, res));
router.get('/metric/paginated', (req, res) => controller.list_paging(req, res));
router.put('/metric/unread', (req, res) => controller.read_and_mark(req, res));



module.exports = router;  