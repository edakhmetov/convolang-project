const rootRouter = require('express').Router();
const postRoutes = require('./post.routes');
const userRoutes = require('./user.routes');

rootRouter.use(postRoutes);
rootRouter.use(userRoutes);

module.exports = rootRouter;

