const route = require('express').Router();
const { userController } = require('../controllers');

route.post('/', userController.login);

module.exports = route;