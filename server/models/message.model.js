module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
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
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  });

  Message.associate = db => {
    db.Message.belongsTo(db.User, {sourceKey: 'authorId', foreignKey: 'id'});
    db.Message.belongsTo(db.User, {sourceKey: 'receiverId', foreignKey: 'id'});
  }

  return Message;
};