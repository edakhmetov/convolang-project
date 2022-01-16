const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;


exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, saltRounds);
    const foundUser = await db.User.findAll({ where: { username } });
    if (foundUser.length > 0) return res.status(409).send({ error: '409', message: 'User with this username already exists' });
    const user = await db.User.create({
      ...req.body,
      password: hash,
    });
    // req.session.uid = user.id;

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
    // req.session.uid = user.id;
    // create JWT and sign it with USER_ID to identify user, and send it back to the client
    // rs. will send JWT back
    const accessToken = jwt.sign({user_id: user.id}, process.env.JWT);
    res.status(200).send({accessToken});
  } catch (e) {
    console.error(e);
    res.status(401).send({ error: '401', message: 'Invalid username and/or password' });
  }

};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findAll({
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
        model: db.Message,
        as: 'messages'
      }]
    });
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.getMe = async (req, res) => {
    res.status(200).send(req.user);
};

exports.getNativeLanguageSpeaker = async (req, res) => {
  try {
    const users = await db.User.findAll({
      where: {
        nativeLanguages: {
          [Op.substring]: 'russian'
        }
      }
    });
    console.log(users);
    res.status(200).send(users);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send({error: '500', message: 'Could not log out, please try again'});
    } else {
      res.clearCookie('sid');
      res.status(200).send({message: 'Logout successful'});
    }
  });
};

exports.followUser = async (req, res) => {
  const { id } = req.params;
  try {
    const follower = await db.Follower.create({
      userId: 1,
      followerId: id
    });
    res.status(200).send(follower);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.unfollowUser = async (req, res) => {
  const { id } = req.params;
  try {
    await db.Follower.destroy({
      where: {
        userId: 1,
        followerId: id
      }
    });
    res.status(200).send('deleted');
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};