const db = require('../models');
const bcrypt = require('bcrypt');
const saltRounts = process.env.SALT_ROUNDS || 10;

exports.register = async (req, res) => {
  try {
    const { password } = req.body;
    const hash = await bcrypt.hash(password, saltRounts);
    const user = await db.User.create({
      ...req.body,
      password: hash,
    })
    res.status(200).send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send('error');
  }
};

exports.login = async (req, res) => {

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
      }]
    });
    console.log(user);
    res.status(200).send(user);
  } catch (e) {
    console.error(e);
    res.status(500).send('error');
  }
};

exports.logout = async (req, res) => {

};

exports.followUser = async (req, res) => {
  const { id } = req.params;
  try {
    const follower = await db.Follower.create({
      userId: 1,
      followerId: id
    });
    // console.log(follower);
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