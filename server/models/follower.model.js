const db = require('./');

module.exports = (sequelize, DataTypes) => {
  const Follower = sequelize.define('Follower', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    followerId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    }
  });

  Follower.associate = db => {
    db.Follower.belongsTo(db.User, { foreignKey: 'userId' });
    db.Follower.belongsTo(db.User, { foreignKey: 'followerId' });
  };


  return Follower;
};