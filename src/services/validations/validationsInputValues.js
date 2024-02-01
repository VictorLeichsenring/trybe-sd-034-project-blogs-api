const {
  addNewUserSchema,
  addNewCategorySchema,
} = require('./schemas');

const validateNewUser = (keysObjectToValidate) => {
  const { error } = addNewUserSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const validateNewCategory = (keysObjectToValidate) => {
  const { error } = addNewCategorySchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

module.exports = {
  validateNewUser,
  validateNewCategory,
};