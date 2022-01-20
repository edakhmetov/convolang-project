const postController = require('../controllers/post.controller');
const authMiddleware = require('../middleware/authMiddleware');
const router = require('express').Router();

router.post('/posts', authMiddleware, postController.createPost);
router.get('/posts', authMiddleware, postController.getUserFeed);
router.get('/posts/:id', authMiddleware, postController.getPost);
router.get('/followingPosts', authMiddleware, postController.getFollowingsPosts);


module.exports = router;