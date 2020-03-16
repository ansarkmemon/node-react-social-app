module.exports = (sequelize, Sequelize) => {
  return sequelize.define('tag', {
    tagId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'tag_id'
    },
    hashTag: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  })
}