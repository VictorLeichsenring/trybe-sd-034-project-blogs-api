const route = require('express').Router();
const { postController } = require('../controllers');
const authMiddleware = require('../middlewares/auth');
const validateUpdatePost = require('../middlewares/validateupdate');

route.post('/', authMiddleware, postController.newPost);
route.get('/', authMiddleware, postController.getAll);
route.get('/:id', authMiddleware, postController.getById);
route.put('/:id', authMiddleware, validateUpdatePost, postController.updatePost);

module.exports = route;