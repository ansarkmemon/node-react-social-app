const express = require('express');
const _omit = require('lodash/omit');
const withAuth = require('../middlewares/withAuth');
const singleImageUploader = require('../utils/singleImageUploader');
const bookmarkController = require('../controllers/bookmark');

const upload = singleImageUploader('./uploads/avatars/');

const router = express.Router();
const userController = require('../controllers/user');
const postController = require('../controllers/post');

// Auth related routes
router.get('/verify', withAuth.verifyToken, (req, res) => {
  return res.status(200).send(req.user);
});

router.post('/register', async (req, res) => {
  try {
    const token = await userController.signUpUser(req.body);
    const user = await userController.getUserByUsername(req.body.username);
    res.cookie('auth_id', token).status(200).json(_omit(user.dataValues, ['password'])); 
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/login', async (req, res) => {
  try {
    const token = await userController.signInUser(req.body);
    const user = await userController.getUserByUsername(req.body.username);
    res.cookie('auth_id', token).status(200).json(_omit(user.dataValues, ['password']));
  } catch (error) {
    res.status(400).json(error.message);
  } 
});

router.get('/logout', async (req, res) => {
  res.clearCookie('auth_id').sendStatus(200);
});


router.get('/', async (req, res) => {
  try {
    const users = await userController.getAllUsers();
    return res.json(users);
  } catch (error) {
    console.error('err >>>> ', error.message); 
  }
});

router.get('/:userId', withAuth.verifyToken, async (req, res) => {
  try {
    const user = await userController.getUserById(req.params.userId);
    return res.status(200).json(user); 
  } catch (error) {
    return res.status(400).send({ error: error.message }) 
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const response = await userController.deleteUser(req.params.userId);
    return response && res.status(200).send({ message: 'User deleted successfully' }); 
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.put('/:userId', upload.single('image'), async (req, res) => {
  if (req.file)
    req.body.imageUrl = req.file.path;
  try {
    const rowsAffected = await userController.updateUser(req.params.userId, req.body);
    const updatedUser = await userController.getUserById(req.params.userId);
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
});

router.get('/:userId/posts', async (req, res) => {
  try {
    const posts = await postController.getPostByUser(req.params.userId);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
})


router.get('/:userId/bookmarks', withAuth.verifyToken, async (req, res) => {
  try {
    if (req.user.userId != req.params.userId) 
      res.status(403).json({ message: 'You need to login as the correct user' });
    const posts = await bookmarkController.getBookmarksByUserId(req.params.userId);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).send(error.message); 
  }
})

module.exports = router;