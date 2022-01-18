module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // upvotes: {
    //   type: DataTypes.INTEGER,
    //   // allowNull: false,
    //   default: 0,
    // },
  });

  Post.associate = db => {
    db.Post.belongsTo(db.User, { foreignKey: 'userId', sourceKey: 'id', as: 'owner' });
    db.Post.hasMany(db.Comment, { sourceKey: 'id', foreignKey: 'postId', as: 'comments' });
  }

  return Post;
};