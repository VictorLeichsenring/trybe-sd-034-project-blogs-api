const route = require('express').Router();
const { categoryController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

route.post('/', authMiddleware, categoryController.newCategory);
route.get('/', authMiddleware, categoryController.findAll);
// route.get('/:id', authMiddleware, userController.findById);

module.exports = route;