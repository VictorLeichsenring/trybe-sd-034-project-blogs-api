const route = require('express').Router();
const { userController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

route.post('/', userController.newUser);
route.get('/', authMiddleware, userController.findAll);
route.get('/:id', authMiddleware, userController.findById);

module.exports = route;