const {
  addNewUserSchema,
  addNewCategorySchema,
  addNewPostSchema,
} = require('./schemas');

const { Category } = require('../../models');

async function getAll() {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
}

const validateNewUser = (keysObjectToValidate) => {
  const { error } = addNewUserSchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

const validateNewCategory = (keysObjectToValidate) => {
  const { error } = addNewCategorySchema.validate(keysObjectToValidate);
  if (error) return { status: 'BAD_REQUEST', message: error.message };
};

async function validateCategoryIds(categoryIds) {
  const allCategories = await getAll();
  const validCategoryIds = allCategories.data.map((category) => category.id);
  const areAllCategoryIdsValid = categoryIds.every((id) => validCategoryIds.includes(id));
  return areAllCategoryIdsValid;
}
const validateNewPost = async (keysObjectToValidate) => {
  const { error } = addNewPostSchema.validate(keysObjectToValidate);
  if (error) {
    return { status: 'BAD_REQUEST', message: error.message };
  }

  const areAllCategoryIdsValid = await validateCategoryIds(keysObjectToValidate.categoryIds);
  if (!areAllCategoryIdsValid) {
    return { status: 'BAD_REQUEST', message: 'one or more "categoryIds" not found' };
  }
};

module.exports = {
  validateNewUser,
  validateNewCategory,
  validateNewPost,
};