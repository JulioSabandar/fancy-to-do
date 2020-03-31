const { Router } = require('express');
indexRouter = Router();
const todoRouter = require('./todoRouter');
const Controller = require('../controllers/Controller');
indexRouter.get('/', Controller.goHome);
indexRouter.use('/todos', todoRouter);
indexRouter.use('/', authRouter);
module.exports = indexRouter;