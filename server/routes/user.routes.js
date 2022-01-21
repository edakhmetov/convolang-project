const router = require('express').Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', authMiddleware, userController.logout);
router.get('/user', authMiddleware, userController.getUser);
router.get('/user/:id', authMiddleware, userController.getUser);
router.get('/user/:id/followers', userController.getFollowers);
router.post('/follow/:id', authMiddleware, userController.followUser);
router.post('/unfollow/:id', authMiddleware, userController.unfollowUser);
router.get('/nativeSpeakers', authMiddleware, userController.getNativeLanguageSpeaker);
router.get('/learningSpeakers', authMiddleware, userController.getLearningLanguageSpeaker);


module.exports = router;