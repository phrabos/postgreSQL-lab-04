const { Router } = require('express');
const { getDefaultLibFileName } = require('typescript');
const TeaService = require('../services/TeaService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const result = await TeaService.create(req.body);
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const result = await TeaService.getAllTea(req.body);
      res.send(result);
    } catch (err) {
      next(err)
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const id = req.params.id
      const result = await TeaService.getById(id);
      res.send(result)
    } catch (err) {
      next(err)
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const result = await TeaService.removeTea(id)
      res.send(result)
    } catch (err) {
      next(err)
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const qty = req.body.quantity
      const result = await TeaService.editTeaQty(id, qty)
      res.send(result)
    } catch (err) {
      next(err)
    }
  })