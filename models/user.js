'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class User extends Model {};
  User.init({
    email: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate : {
        notEmpty: true
      }
    }
  }, { sequelize });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};