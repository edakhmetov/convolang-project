const router = require('express').Router();
const userController = require('../controllers/user.controllers');


router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/user/:id', userController.getUser);
router.post('/logout', userController.logout);
router.post('/follow/:id', userController.followUser);
router.post('/unfollow/:id', userController.unfollowUser);

router.get('/nativeSpeakers', userController.getNativeLanguageSpeaker);


module.exports = router;