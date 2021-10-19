'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Invoice,{
        foreignKey: "UserId"
      })
    }
  };
  User.init({
    Username: DataTypes.STRING,
    Password: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Role: DataTypes.STRING,
    Email: DataTypes.STRING,
    Address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};