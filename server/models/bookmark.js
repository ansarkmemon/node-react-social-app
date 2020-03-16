module.exports = (sequelize, type) => {
  return sequelize.define('bookmark', {
    postId: {
      type: type.INTEGER,
      allowNull: false
    },
    userId: {
      type: type.INTEGER,
      allowNull: false
    }
  })
}