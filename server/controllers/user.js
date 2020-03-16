const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const secret = 'SOME_SECRET';

exports.getAllUsers = async () => {
  return await User.findAll();
}

exports.getUserByUsername = async (username) => {
  return await User.findOne({ where: { username }});
}

exports.getUserByEmail = async (email) => {
  return await User.findOne({ where: { email }})
}

exports.signUpUser = async (userDetails) => {
  const { username, password, email } = userDetails;
  const hashedPassword = password;
  // const hashedPassword = await bcrypt.hash(password, 12);
 
  const userByUsername = await this.getUserByUsername(username);
  if (userByUsername) throw new Error('This username already exists');

  const userByEmail = await this.getUserByEmail(email);
  if (userByEmail) throw new Error('You are already registered with this email');

  await User.create({ 
    username,
    email,
    password: hashedPassword,
  });

  const payload = { username, email }
  return jwt.sign(payload, secret, { expiresIn: "10h" });
}

exports.getUserById = async (userId) => {
  const user = await User.findByPk(userId); 
  if (!user) throw new Error('Invalid user id provided');
  return user;
}

exports.deleteUser = async userId => {
  const user = await User.destroy({ where: { userId: userId }});
  if (!user) throw new Error('User with this id not found');
  return user;
}

exports.updateUser = async (userId, userDetails) => {
  const [ rowsAffected ] = await User.update({ ...userDetails }, { where: { userId } });
  console.log({ ...userDetails });
  // if (!rowsAffected) throw new Error('User with this id not found');
  return rowsAffected;
}

exports.signInUser = async (userDetails) => {
  const { username, password } = userDetails;
  const user = await User.findOne({ where: { username } });
  if (!user) throw new Error('Username or password is invalid')
  if(bcrypt.compare(password, user.dataValues.password)) {
    const payload = {username};
    return jwt.sign(payload, secret, { expiresIn: "10h" });
  }
}