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

const addNewPostSchema = Joi.object({
  title: Joi.string().optional(),
  content: Joi.string().optional(),
  published: Joi.string().optional(),
  updated: Joi.string().optional(),
  categoryIds: Joi.array().required(),
  userId: Joi.number(),
});

module.exports = {
  addNewUserSchema,
  addNewCategorySchema,
  addNewPostSchema,
};