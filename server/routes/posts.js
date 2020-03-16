const express = require('express');
const router = express.Router();
const singleImageUploader = require('../utils/singleImageUploader');
const postController = require('../controllers/post');
const bookmarkController = require('../controllers/bookmark');

const withAuth = require('../middlewares/withAuth')

const upload = singleImageUploader('./uploads/posts/');

router.get('/', async (req, res) => {
  try {
    const posts = await postController.getAllPosts();
    return res.json(posts);
  } catch (error) {
    console.error(error); 
  }
});

router.post('/', withAuth.verifyToken, upload.single('image'), async (req, res) => {
  if (req.file) 
    req.body.imageUrl = req.file.path;
  try {
    const post = await postController.createNewPost(req.body);
    return res.status(200).json(post); 
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:postId', withAuth.verifyToken, async (req, res) => {
  try {
    await postController.deletePost(req.params.postId, req.user); 
    return res.status(200).json({ "message": "Post deleted successfully"});
  } catch (error) {
    return res.status(400).json({ "message": error.message })
  }
})


router.post('/:postId/bookmark', withAuth.verifyToken ,async (req, res) => {
  try {
    const bookmarked = await bookmarkController.createBookmark(req.params.postId, req.user.userId);
    res.status(200).send('Success');
  } catch (error) {
    res.status(500).send(error.message);
  }
})

router.delete('/:postId/bookmark', withAuth.verifyToken, async (req, res) => {
  try {
    await bookmarkController.destroy(req.params.postId, req.user.userId);
    res.status(200).send('Bookmark deleted');
  } catch (error) {
    console.error(error);
  }
})

module.exports = router;