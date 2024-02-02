const { BlogPost, PostCategory } = require('../../models');

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

module.exports = {
  createPost,
  associateCategories,
};