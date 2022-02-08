"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    Username: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    Password: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Role: DataTypes.BOOLEAN,
    Email: DataTypes.STRING,
    Address: DataTypes.STRING,
  });

  User.associate = (models) => {
    User.hasMany(models.Invoice, {
      foreignKey: "Username",
      as: "Invoice",
    });
    User.hasMany(models.Cart, {
      foreignKey: "Username",
      as: "Cart",
    });
  };

  return User;
};
