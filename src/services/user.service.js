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

  const { email, displayName } = user;
  
  const token = auth.createToken({ email, displayName });
  return { status: 'SUCCESSFUL', data: { token } };
}
async function createUser(userData) {
  const error = validation.validateNewUser(userData);
  if (error) return { status: error.status, data: { message: error.message } };
  
  const { email, displayName } = userData;
 
  const user = await getByEmail(email);
  if (user) return { status: 'CONFLICT', data: { message: 'User already registered' } };

  await User.create(userData);
  const token = auth.createToken({ email, displayName });
  return { status: 'CREATED', data: { token } };
}
async function getAllUsers() {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return { status: 'SUCCESSFUL', data: users };
}
async function getByid(id) {
  const user = await User.findOne({
    where: { id },
    attributes: { exclude: ['password'] },
  });
  if (!user) return { status: 'NOT_FOUND', data: { message: 'User does not exist' } };
  
  return { status: 'SUCCESSFUL', data: user };
}

module.exports = {
  login,
  createUser,
  getAllUsers,
  getByid,
  getByEmail,
};