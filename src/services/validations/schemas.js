const Joi = require('joi');

const addNewUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  image: Joi.string().optional(),
});

const addNewCategorySchema = Joi.object({
  name: Joi.string().not().empty().required(),
});

module.exports = {
  addNewUserSchema,
  addNewCategorySchema,
};