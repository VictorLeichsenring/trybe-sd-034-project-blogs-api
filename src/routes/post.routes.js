const route = require('express').Router();
const { postController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');

route.post('/', authMiddleware, postController.newPost);
route.get('/', authMiddleware, postController.getAll);

module.exports = route;