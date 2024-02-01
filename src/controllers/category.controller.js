const { categoryService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const newCategory = async (req, res) => {
  const { status, data } = await categoryService.insert(req.body);
  res.status(mapStatusHTTP(status)).json(data);
};

const findAll = async (_req, res) => {
  const { status, data } = await categoryService.getAll();
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  newCategory,
  findAll,
};