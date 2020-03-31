const { Router } = require('express');
const AuthRouter = Router();
const Controller = require('../controllers/AuthController');
AuthRouter.post('/register', Controller.register);
AuthRouter.post('/login', Controller.login);
module.exports = AuthRouter;