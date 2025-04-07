'use strict';
const { validationResult } = require('express-validator');
var models = require("../models/");
const Metric = models.metric;

class MetricController {
    
    // POST: Crear nuevo registro
    async guardar(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ msg: "DATOS INCOMPLETOS", code: 400, errors: errors.array() });
            }

            const data = {
                date: req.body.date,
                time: req.body.time,
                value: req.body.value,
                geoLatitude: req.body.geoLatitude,
                geoLongitude: req.body.geoLongitude,
                sensorExternalId: req.body.sensorExternalId
            };

            const metric = await Metric.create(data);
            return res.status(201).json({ msg: "Registro guardado con éxito", code: 201, info: metric });

        } catch (error) {
            return res.status(500).json({ msg: "Error al guardar", code: 500, error: error.message });
        }
    }

    // GET: Listar todos los registros
    async listar(req, res) {
        try {
            const lista = await Metric.findAll();
            return res.status(200).json({ msg: "OK!", code: 200, info: lista });
        } catch (error) {
            return res.status(500).json({ msg: "Error al listar", code: 500, error: error.message });
        }
    }
}

module.exports = MetricController;