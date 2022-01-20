const jwt = require('jsonwebtoken');
const db = require('../models');

module.exports = authMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error();
    const accessToken = authorization.split(' ')[1];
    const tokenInBlacklist = await db.Blacklist.findOne({
      where: {
        token: accessToken
      }
    });
    if (tokenInBlacklist) throw new Error();
    const { userId } = jwt.verify(accessToken, process.env.JWT);
    req.userId = userId;
    next();
  } catch (e) {
    res.status(403).send({ error: '403', message: 'Permission denied!' });
  }
};
