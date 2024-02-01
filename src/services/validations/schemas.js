const Joi = require('joi');

const addNewUserSchema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  image: Joi.string().optional(),
});

module.exports = {
  addNewUserSchema,
};