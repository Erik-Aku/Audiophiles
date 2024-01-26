//
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // other user fields
  });

  User.associate = (models) => {
    User.belongsToMany(models.User, { through: 'Friendship', as: 'friends' });
  };

  return User;
};
