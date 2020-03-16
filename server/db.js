const fs = require('fs');
const Sequelize = require('sequelize');
const UserModel = require('./models/user'); 
const PostModel = require('./models/post');
const TagModel = require('./models/tag');
const BookmarkModel = require('./models/bookmark');

const sequelize = new Sequelize('social', 'root', 'root', { dialect: 'mysql', host: 'localhost', port: 3307  });

const User = UserModel(sequelize, Sequelize);
const Post = PostModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const Bookmark = BookmarkModel(sequelize, Sequelize);


Post.belongsTo(User, { 
  foreignKey: { name: 'userId', allowNull: false },
  onDelete: 'CASCADE' 
});
User.hasMany(Post, { 
  foreignKey: { name: 'userId' },
});

Post.belongsToMany(Tag, {through: 'post_tags', foreignKey: 'postId' });
Tag.belongsToMany(Post, { through: 'post_tags', foreignKey: 'tagId' });

Bookmark.belongsTo(User, {foreignKey: 'userId', onDelete: 'CASCADE'});
Bookmark.belongsTo(Post, {foreignKey: 'postId', onDelete: 'CASCADE'});  

sequelize.sync().then(() => console.log(`Your Database is all setup`));

module.exports = {
  User,
  Post, 
  Tag,
  Bookmark,
};