const { Router } = require('express');
const todoRouter = Router();
const Controller = require('../controllers/TodoController');
todoRouter.get('/', Controller.showTodos);
todoRouter.post('/', Controller.addTodo);
todoRouter.get('/:id', Controller.showTodoById);
todoRouter.put('/:id', Controller.editTodoById);
todoRouter.delete('/:id', Controller.deleteTodoById);
module.exports = todoRouter;