const {
  addNewUserSchema,
} = require('./schemas');

const validateNewUser = (keysObjectToValidate) => {
  const { error } = addNewUserSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

module.exports = {
  validateNewUser,
};