const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;


exports.register = async (req, res) => {
  try {
    const { username, password, nativeLanguages, learningLanguages } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const foundUser = await db.User.findAll({ where: { username } });
    if (foundUser.length > 0) return res.status(409).send({ error: '409', message: 'User with this username already exists' });
    const user = await db.User.create({
      ...req.body,
      password: hash,
      learningLanguages: learningLanguages.toLowerCase(),
      nativeLanguages: nativeLanguages.toLowerCase()
    });
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await db.User.findOne({ where: { username } });
    if (user.length === 0) throw new Error();
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error();
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT);
    res.status(200).send({ accessToken });
  } catch (e) {
    console.error(e);
    res.status(401).send({ error: '401', message: 'Invalid username and/or password' });
  }
};

exports.getUser = async (req, res) => {
  try {
    let id = req.params.id ? req.params.id : req.userId;
    const user = await db.User.findOne({
      where: {
        id
      },
      include: [{
        model: db.Follower,
        as: 'followings'
      }, {
        model: db.Follower,
        as: 'followers'
      }, {
        model: db.Post,
        as: 'posts'
      }]
    });
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.getNativeLanguageSpeaker = async (req, res) => {
  try {
    const language = req.userId.learningLanguages;
    const users = await db.User.findAll({
      where: {
        nativeLanguages: {
          [Op.substring]: language
        }
      }
    });
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.getLearningLanguageSpeaker = async (req, res) => {
  try {
    const language = req.userId.nativeLanguages;
    const users = await db.User.findAll({
      where: {
        learningLanguages: {
          [Op.substring]: language
        }
      }
    });
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.logout = async (req, res) => {
  const { token } = req.body;
  try {
    await db.Blacklist.create({ token });
    res.status(200).send({ message: 'Successfully logged out' });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Could not logout, please try again.' })
  }

};

exports.followUser = async (req, res) => {
  const { id } = req.params;
  try {
    const follower = await db.Follower.create({
      userId: req.userId,
      followerId: id
    });
    res.status(200).send(follower);
  } catch (e) {
    console.error('error follow', e);
    res.status(500).send('error');
  }
};

exports.unfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Follower.destroy({
      where: {
        userId: req.userId,
        followerId: id
      }
    });
    res.status(200).send({ message: 'unfollowed' });
  } catch (e) {
    console.error('error unfollow', e);
    res.status(500).send('error');
  }
};

exports.getFollowers = async (req, res) => {
  try {
    const followers = await db.Follower.findAll({
      where: {
        followerId: 3,
      },
      include: [{
        model: db.User,
        as: 'followings',
        attributes: ['id', 'firstName', 'lastName']
      }]
    });
    res.status(200).send(followers.map(follower => follower.followings));
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Error retrieving followers' });
  }
};
