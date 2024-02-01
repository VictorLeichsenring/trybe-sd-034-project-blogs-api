const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const isBodyValidLogin = (email, password) => email && password;
// const isBodyValidNewUser = (displayName, email, password, image) => displayName && email && password;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!isBodyValidLogin(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { status, data } = await userService.login({ email, password });
  res.status(mapStatusHTTP(status)).json(data);
};

const newUser = async (req, res) => {
  const { status, data } = await userService.createUser(req.body);
  res.status(mapStatusHTTP(status)).json(data);
};

const findAll = async (_req, res) => {
  const { status, data } = await userService.getAllUsers();
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  login,
  newUser,
  findAll,
};