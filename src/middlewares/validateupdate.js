const { userService } = require('../services');

const isBodyValidUpPost = (title, content) => title && content;

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;  

  const userEmail = req.locals.user;
  const user = await userService.getByEmail(userEmail.email);
  const userId = user.id;

  if (!isBodyValidUpPost(title, content)) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  console.log('>>>>>>>>>>>>', id, userId);
  if (Number(id) !== userId) return res.status(401).json({ message: 'Unauthorized user' });

  next();
};