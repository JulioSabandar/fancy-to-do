'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  class Todo extends Model {}
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: true
      }
    }
  }, {sequelize});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};