"use strict";
const { validationResult } = require("express-validator");
var models = require("../models/");
const Metric = models.metric;

class MetricController {
  // POST: Crear nuevo registro
  async keep(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({
            msg: "DATOS INCOMPLETOS",
            code: 400,
            errors: errors.array(),
          });
      }

      const data = {
        date: req.body.date,
        time: req.body.time,
        value: req.body.value,
        geoLatitude: req.body.geoLatitude,
        geoLongitude: req.body.geoLongitude,
        sensorExternalId: req.body.sensorExternalId,
      };

      const metric = await Metric.create(data);
      return res
        .status(201)
        .json({ msg: "Registro guardado con éxito", code: 201, info: metric });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Error al guardar", code: 500, error: error.message });
    }
  }

  // GET: Listar todos los registros
  async list(req, res) {
    try {
      const lista = await Metric.findAll({
        order: [
          ["date", "DESC"],
          ["time", "DESC"],
        ],
      });
      return res.status(200).json({ msg: "OK!", code: 200, info: lista });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Error al listar", code: 500, error: error.message });
    }
  }

  // GET: Listar registros paginados, de más reciente a más antiguo
  async list_paging(req, res) {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await Metric.findAndCountAll({
        limit,
        offset,
        order: [
          ["date", "DESC"],
          ["time", "DESC"],
        ], // Orden reciente a antiguo
      });

      return res.status(200).json({
        msg: "OK!",
        code: 200,
        info: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / limit),
          currentPage: page,
          perPage: limit,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Error al listar", code: 500, error: error.message });
    }
  }

  // PUT: Obtener métricas no leídas y marcarlas como leídas
  async read_and_mark(req, res) {
    try {
      const unreadMetrics = await Metric.findAll({
        where: { read: false },
        order: [
          ["date", "DESC"],
          ["time", "DESC"],
        ],
      });

      if (!unreadMetrics.length) {
        return res.status(200).json({
          msg: "No hay nuevas métricas por leer.",
          code: 200,
          info: [],
        });
      }

      const ids = unreadMetrics.map((metric) => metric.id);
      await Metric.update({ read: true }, { where: { id: ids } });

      return res.status(200).json({
        msg: "Métricas leídas y actualizadas correctamente.",
        code: 200,
        info: unreadMetrics,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Error al consultar o actualizar las métricas.",
        code: 500,
        error: error.message,
      });
    }
  }
}

module.exports = MetricController;
