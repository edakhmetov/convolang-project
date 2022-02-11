module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    content: {
      type: DataTypes.STRING(1234),
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Comment.associate = db => {
    db.Comment.belongsTo(db.User, {sourceKey: 'id', foreignKey: 'authorId', as: 'owner'});
    db.Comment.belongsTo(db.Post, {sourceKey: 'id', foreignKey: 'postId'});
  };

  return Comment;
};