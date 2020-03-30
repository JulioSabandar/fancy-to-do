'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Todo extends Model {}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        allowNull:false,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        allowNull:false,
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        allowNull:false,
        notEmpty: true
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        allowNull:false,
        notEmpty: true
      }
    }

  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};