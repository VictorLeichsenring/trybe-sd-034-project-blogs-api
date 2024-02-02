const { BlogPost, User, Category } = require('../../models');

// Função auxiliar para buscar o post e suas associações
async function findPostWithAssociations(postId) {
  return BlogPost.findByPk(postId, {
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
        attributes: ['id', 'name'],
      },
    ],
  });
}

// Função auxiliar para construir o objeto de retorno
function buildReturnObject(post) {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    userId: post.userId,
    published: post.published,
    updated: post.updated,
    user: post.user,
    categories: post.categories,
  };
}

// Função de serviço atualizada e simplificada
async function update(id, updateData) {
  try {
    const post = await findPostWithAssociations(id);
    if (!post) {
      return { status: 'NOT_FOUND', message: 'Post not found' };
    }

    await post.update(updateData);
    await post.reload();

    const result = buildReturnObject(post);
    return { status: 'SUCCESSFUL', data: result };
  } catch (error) {
    console.error('Error updating post:', error);
    return { status: 'ERROR', message: 'Error updating post' };
  }
}

module.exports = update;
