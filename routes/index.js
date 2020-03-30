const { Router } = require('express');
indexRouter = Router();
const todoRouter = require('./todoRouter');
const Controller = require('../constollers/Controller');
indexRouter.get('/', Controller.goHome);
indexRouter.use('/todos', todoRouter);
module.exports = indexRouter;