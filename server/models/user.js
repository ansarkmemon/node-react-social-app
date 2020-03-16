const bcrypt = require('bcryptjs');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    website: Sequelize.STRING,
    bio: Sequelize.TEXT,
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: { min: 6 }
    },
  }, {
    hooks: {
      beforeCreate: (user) => {
        const hash = bcrypt.hashSync(user.password, 12);
        user.password = hash;
      }
    }
  });

  User.prototype.comparePassword = (user, password) => 
    bcrypt.compareSync(password, user.password);

  return User;
}
