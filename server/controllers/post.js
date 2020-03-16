const { Post, User, Bookmark } = require('../db');

exports.getAllPosts = async () => {
  return await Post.findAll({
    include: [{ model: User, as: 'user', attributes: ['name', 'imageUrl'] }],
    order: [['createdAt', 'DESC']]
  });
};

// @TODO: Add to add logic for actual user after login
exports.createNewPost = async (postDetails) => {
  return await Post.create({ ...postDetails });
};

exports.getPostByUser = async userId => {
  const posts = await Post.findAll({ 
    where: { userId}, 
    order: [['createdAt', 'DESC']]});
  if (!posts) throw new Error(`This user doesn't have any posts`);
  return posts;
}


exports.deletePost = async (postId, user) => {
    const post = await Post.findOne({ 
      where: { postId }
    });

    if (!post) throw new Error('Post not found');
    if (post.userId !== user.userId) throw new Error('Unauthorized operation');

    return await Post.destroy({ where: { postId }});
}