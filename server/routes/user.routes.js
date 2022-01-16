const router = require('express').Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middleware/authMiddleware');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.getMe);
router.get('/user/:id', userController.getUser);
router.post('/logout', userController.logout);
router.post('/follow/:id', userController.followUser);
router.post('/unfollow/:id', userController.unfollowUser);

router.get('/nativeSpeakers', userController.getNativeLanguageSpeaker);


module.exports = router;