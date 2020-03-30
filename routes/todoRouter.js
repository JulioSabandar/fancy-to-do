const { Router } = require('express');
const TodoRouter = Router();
const Controller = require('../controllers/TodoController');
TodoRouter.get('/', Controller.showTodos);
TodoRouter.post('/', Controller.addTodo);
TodoRouter.get('/:id', Controller.showTodoById);
TodoRouter.put('/:id', Controller.editTodoById);
TodoRouter.delete('/:id', Controller.deleteTodoById);
module.exports = TodoRouter;