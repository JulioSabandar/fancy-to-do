const { Router } = require('express');
const todoRouter = require('./todoRouter');
const userRouter = require('./userRouter');
const Controller = require('../controllers/Controller');
indexRouter = Router();
indexRouter.get('/', Controller.goHome);
indexRouter.use('/', userRouter);
indexRouter.use('/todos', todoRouter);
module.exports = indexRouter;