const { Router } = require('express');
const userRouter = Router();
const Controller = require('../controllers/UserController');
userRouter.post('/register', Controller.register);
userRouter.post('/login', Controller.login);
userRouter.post('/loginGoogle', Controller.loginGoogle);
module.exports = userRouter;