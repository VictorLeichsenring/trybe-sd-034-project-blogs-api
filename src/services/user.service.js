const { User } = require('../models');
const auth = require('../utils/auth');

async function login(userCredentials) {
  const user = await User.findOne({
    where: {
      email: userCredentials.email,
    },
  });

  if (!user || user.password !== userCredentials.password) {
    return { status: 'BAD_REQUEST', data: { message: 'Invalid fields' } };
  }

  const { email } = user;
  const token = auth.createToken({ email });
  return { status: 'SUCCESSFUL', data: { token } };
}

module.exports = {
  login,
};