const { BlogPost, User, Category, sequelize, PostCategory } = require('../models');
const validation = require('./validations/validationsInputValues');

async function createPost({ title, content, userId }, transaction) {
  return BlogPost.create({
    title,
    content,
    published: new Date(),
    updated: new Date(),
    userId,
  }, { transaction });
}
async function associateCategories(postId, categoryIds, transaction) {
  const categoryAssociations = categoryIds.map((categoryId) => PostCategory.create({
    postId,
    categoryId,
  }, { transaction }));
  await Promise.all(categoryAssociations);
}

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
module.exports = {
  insert,
  getAll,
};