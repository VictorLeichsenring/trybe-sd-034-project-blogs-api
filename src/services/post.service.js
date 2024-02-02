const { BlogPost, User, Category, sequelize } = require('../models');
const validation = require('./validations/validationsInputValues');
const { createPost, associateCategories } = require('./functions/postFunctions');
const update = require('./post.functions/update');

async function insert({ title, content, published, updated, categoryIds, userId }) {
  const error = await validation
    .validateNewPost({ title, content, published, updated, categoryIds });

  if (error) return { status: error.status, data: { message: error.message } };
  // let newPost;

  let newPostData;

  await sequelize.transaction(async (t) => {
    const newPost = await createPost({ title, content, published, updated, userId }, t);
    await associateCategories(newPost.id, categoryIds, t);
    newPostData = {
      id: newPost.id,
      title: newPost.title,
      content: newPost.content,
      userId: newPost.userId,
      published: newPost.published,
      updated: newPost.updated,
    };
  });
  return { status: 'CREATED', data: newPostData };
}

async function getAll(userId) {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
    attributes: { exclude: ['userId'] },
  });
  return { status: 'SUCCESSFUL', data: posts };
}

async function getById(id) {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories' },
    ],
  });

  if (!post) return { status: 'NOT_FOUND', data: { message: 'Post does not exist' } };
  return { status: 'SUCCESSFUL', data: post };
}

// async function update(id, updateData) {
//   const post = await BlogPost.findByPk(id);
//   if (!post) {
//     return { status: 'NOT_FOUND', message: 'Post not found' };
//   }
//   const updatedPost = await post.update(updateData);
//   return { status: 'SUCCESSFUL', data: updatedPost };
// }

module.exports = {
  insert,
  getAll,
  getById,
  update,
};