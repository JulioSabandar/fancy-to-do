const { Router } = require('express');
const Controller = require('../controllers/TodoController');
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')

const todoRouter = Router();
todoRouter.use(authentication);
todoRouter.get('/', Controller.showTodos);
todoRouter.post('/', Controller.addTodo);
todoRouter.get('/:id', authorization, Controller.showTodoById);
todoRouter.put('/:id', authorization, Controller.editTodoById);
todoRouter.delete('/:id', authorization, Controller.deleteTodoById);
module.exports = todoRouter;