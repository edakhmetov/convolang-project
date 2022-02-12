const db = require('../models');
const { Op } = require("sequelize");

exports.createPost = async (req, res) => {
  try {
      await db.Post.create({
      content: req.body.content,
      userId: req.userId,
    });
    res.status(200).send({ message: 'created post' });
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Error while creating post' });
  };
};

exports.getUserFeed = async (req, res) => {
  try {
    const userId = req.userId;
    const followings = await db.Follower.findAll({ where: { userId }});
    const followingIds = followings.map(following => following.followerId);
    const userFeed = await db.Post.findAll({
      where: {
        userId: {
          [Op.in]: [...followingIds, userId]
        }
      },
      include: [
        {
          model: db.User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).send(userFeed);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Error while retrieving posts' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await db.Post.findOne({
      where: {
        id
      },
      include: [
        {
          model: db.User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName']
        },
        {
          model: db.Comment,
          where: {
            postId: id
          },
          required: false,
          include: [
            {
              model: db.User,
              as: 'owner',
              attributes: ['id', 'firstName', 'lastName'],
            }
          ],
          as: 'comments',
        },
      ],
    });
    res.status(200).send(post);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Error while retrieving posts' });
  }
};

exports.getMyPosts = async (req, res) => {
  try {
    const id = req.userId;
    const userPosts = await db.Post.findAll({
      where: {
        userId: id
      },
      include: [
        {
          model: db.User,
          as: 'owner',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    });
    res.status(200).send(userPosts);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Error while retrieving posts' });
  }
};

exports.getFollowingsPosts = async (req, res) => {
  try {
    const userId = req.userId
    const followings = await db.Follower.findAll({ where: { userId } });
    const followingIds = followings.map(following => following.followerId);
    const posts = await db.Post.findAll({
      where: {
        userId: {
          [Op.in]: followingIds
        }
      }
    });
    res.status(200).send(posts);
  } catch (e) {
    console.error(e);
    res.status(500).send({ error: '500', message: 'Error retrieving followings posts' });
  }
};

exports.createComment = async (req, res) => {
  try {
    const comment = await db.Comment.create({
      content: req.body.content,
      authorId: req.userId,
      postId: req.params.id
    });
    res.status(200).send('created');
  } catch(error) {
    console.error(error)
    res.status(500).send(error)
  }
}