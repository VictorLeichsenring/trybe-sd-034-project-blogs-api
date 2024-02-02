const { postService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');
const { userService } = require('../services');

const isBodyValidNewPost = (title, content, categoryIds) => title && content && categoryIds;

const newPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const userEmail = req.locals.user;
  const user = await userService.getByEmail(userEmail.email);
  const userId = user.id;

  if (!isBodyValidNewPost(title, content, categoryIds)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const postData = { title, content, categoryIds, userId };
  const { status, data } = await postService.insert(postData);
  res.status(mapStatusHTTP(status)).json(data);
};

const getAll = async (req, res) => {
  const userEmail = req.locals.user;
  const user = await userService.getByEmail(userEmail.email);
  const userId = user.id;
  const { status, data } = await postService.getAll(userId);
  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  newPost,
  getAll,
};
