module.exports = (sequelize, type) => {
  return sequelize.define('post', {
    postId: {
      type: type.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
      field: 'postId',
    },
    content: {
      type: type.TEXT,
      allowNull: false,
    },
    imageUrl: type.STRING,
  });

  return Post;
}