const { Category } = require('../models');
const validation = require('./validations/validationsInputValues');

async function insert(data) {
  const error = validation.validateNewCategory(data);
  if (error) return { status: error.status, data: { message: error.message } };

  const result = await Category.create(data);
  return { status: 'CREATED', data: result };
}

async function getAll() {
  const categories = await Category.findAll();
  return { status: 'SUCCESSFUL', data: categories };
}

module.exports = {
  insert,
  getAll,
};