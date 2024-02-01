const { userService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const isBodyValid = (email, password) => email && password;

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!isBodyValid(email, password)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const { status, data } = await userService.login({ email, password });
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  login,
};