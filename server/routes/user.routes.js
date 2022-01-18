const router = require('express').Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.getMe);
router.get('/user/:id', authMiddleware, userController.getUser);
router.post('/logout', authMiddleware, userController.logout);

router.get('/posts', authMiddleware, userController.getUserPosts);
router.post('/posts', authMiddleware, userController.createPost);
router.get('/followingPosts', authMiddleware, userController.getFollowingsPosts);
// router.get('/posts/:id', authMiddleware, userController.getUserPosts);

router.post('/follow/:id', authMiddleware, userController.followUser);
router.post('/unfollow/:id', authMiddleware, userController.unfollowUser);

router.get('/followers', userController.getFollowers);

router.get('/nativeSpeakers', authMiddleware, userController.getNativeLanguageSpeaker);
router.get('/learningSpeakers', authMiddleware, userController.getLearningLanguageSpeaker);


module.exports = router;