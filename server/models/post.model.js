module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
    },
  });

  Post.associate = db => {
    db.Post.belongsTo(db.User, {sourceKey: 'authorId', foreignKey: 'id'});
  }

  return Post;
};