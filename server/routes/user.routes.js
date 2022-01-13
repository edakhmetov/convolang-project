const router = require('express').Router();
const userController = require('../controllers/user.controllers');

router.get('/', userController.getAll);

module.exports = router;