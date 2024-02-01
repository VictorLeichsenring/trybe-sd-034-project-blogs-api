const { User } = require('../models');
const auth = require('../utils/auth');
const validation = require('./validations/validationsInputValues');

async function getByEmail(inputEmail) {
  const user = await User.findOne({
    where: {
      email: inputEmail,
    },
  });
  return user;
}

async function login(userCredentials) {
  const user = await getByEmail(userCredentials.email);

  if (!user || user.password !== userCredentials.password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const { email } = user;
  const token = auth.createToken({ email });
  return { status: 'SUCCESSFUL', data: { token } };
}

async function createUser(userData) {
  const error = validation.validateNewUser(userData);
  if (error) return { status: error.status, data: { message: error.message } };

  const { email } = userData;

  const user = await getByEmail(email);
  if (user) {
    return { status: 'CONFLICT', data: { message: 'User already registered' } };
  }

  await User.create(userData);

  const token = auth.createToken(email);
  return { status: 'CREATED', data: { token } };
}

module.exports = {
  login,
  createUser,
};