const { User, Bookmark, Post } = require('../db');

exports.createBookmark = async (postId, userId) => {
  const bookmarked = await Bookmark.findOne({ where: {
    postId, userId
  }});
  if (bookmarked)
    return Promise.resolve(bookmarked);

  return await Bookmark.create({ postId, userId });
}

exports.getBookmarksByUserId = async (userId) => {
  console.log(userId)
  return await Bookmark.findAll({ 
    where: { userId },
    include: [{ 
      model: Post, 
      include: [{
        model: User, attributes: ['username', 'name', 'imageUrl']
      }]
    }]
  });
}


exports.destroy = async (postId, userId) => {
  return await Bookmark.destroy({
    where: { userId, postId }
  });
}